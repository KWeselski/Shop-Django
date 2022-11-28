import stripe
from datetime import datetime, timedelta
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User, AnonymousUser
from django.db.models import Q
from django.http.response import JsonResponse
from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from .forms import OrderForm

from .models import (
    Product,
    Category,
    OrderItem,
    Order,
    Address,
    Opinion,
    Wishlist
)
from .forms import CouponForm
from .serializers import *


stripe.api_key = settings.STRIPE_SECRET_KEY


def get_user_from_token(request):
    return User.objects.get(id=Token.objects.get(key=request.headers['Authorization']).user_id)


@api_view(['GET', 'POST'])
def products_list(request):
    if request.method == "GET":
        data = Product.objects.all()
        serializer = ProductListSerializer(
            data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = ProductListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def product_detail(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = ProductSerializer(
            product, context={'request': request})
        return Response(serializer.data)


@api_view(['GET'])
def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(
            categories, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def category_product_list(request, slug):
    try:
        category = Category.objects.get(slug=slug)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = ProductSerializer(
            Product.objects.filter(category=category), context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def products_by_type(request, type):
    if (type == 'discount'):
        products = Product.objects.filter(on_discount=True)
    else:
        products = Product.objects.filter(
            created__gte=datetime.today() - timedelta(days=14))
    serializer = ProductSerializer(
        products, context={'request': request}, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def products_search(request, query):
    serializer = ProductSerializer(
        Product.objects.filter(name__contains=query), context={'request': request}, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def user_id_view(request):
    return Response({'userID': request.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
def orders_list(request):
    serializer = OrderSerializer(
        Order.objects.all(), context={'request': request}, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST', 'PUT'])
def create_order(request):
    if request.method == 'POST':
        user = get_user_from_token(request)
        customer_info = request.data['customer_info']

        phone_number = customer_info.pop("phoneNumber")
        country_code = customer_info.pop("countryCode")
        customer_info['phone'] = "+" + country_code + phone_number

        order_form = OrderForm(customer_info)
        if order_form.is_valid():
            order = Order.objects.create(
                user=user,
                name=customer_info['name'],
                surname=customer_info['surname'],
                company=customer_info['company'],
                street=customer_info['street'],
                city=customer_info['city'],
                phone=customer_info['phone'],
                zip_code=customer_info['zip_code']
            )
            for item in request.data['items']:
                OrderItem.objects.create(
                    order_id=order.pk,
                    product_id=item['id'],
                    quantity=item['quantity']
                )
            return JsonResponse({'success': True}, status=200)
        return JsonResponse({'error': order_form.errors}, status=500)

    if request.method == "PUT":
        user = get_user_from_token(request)
        try:
            order = Order.objects.filter(user=user).last()
            order.items.clear()
            try:
                order.coupon.clear()
            except AttributeError:
                pass
            for idx, order_item in enumerate(request.data['order_items']):
                data = {"item": order_item["id"],
                        "quantity": order_item["quantity"]}
                item_ = OrderItemSerializer(data=data)
                if item_.is_valid():
                    item_.save(user=user)
                    ord_item = OrderItem.objects.filter(id=item_.data["id"])
                    order.items.add(ord_item[0])
            return Response(item_.data)
        except ObjectDoesNotExist:
            return Response('Cant find order')

    if request.method == "GET":
        serializer = OrderItemSerializer(
            OrderItem.objects.all(), context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['PUT', ])
def pay_order(request):
    if request.method == "PUT":
        try:
            order = Order.objects.filter(
                user=get_user_from_token(request), ordered=True).last()
            order.paid = True
            order.save()
            return Response("Order payed")
        except ObjectDoesNotExist:
            return Response("Error paid")


def get_coupon(request, code):
    try:
        return Coupon.objects.get(code=code)
    except ObjectDoesNotExist:
        return None


@api_view(['POST'])
def add_code(request):
    if CouponForm(request.data).is_valid():
        try:
            code = form.cleaned_data.get('code')
            order = Order.objects.filter(
                user=get_user_from_token(request), ordered=False
            ).last()
            coupon = get_coupon(request, code)
            if coupon:
                order.coupon = coupon
                order.discount = coupon.discount
                order.save()
                return Response()
            return Response('No coupon')
        except ObjectDoesNotExist:
            return Response()
    else:
        print('Error')


@api_view(['GET'])
def get_last_order(request):
    order = Order.objects.filter(
        user=get_user_from_token(request), ordered=False
    ).last()
    return (Response({'discount': order.coupon.discount, 'total_after_discount': order.get_total()}, status=status.HTTP_200_OK))


@api_view(['POST'])
def add_address(request):
    serializer = AddressSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=user)
        order = Order.objects.filter(
            user=get_user_from_token(request), ordered=False
        ).last()
        address = Address.objects.filter(id=serializer.data["id"])
        order.delivery_address = address[0]
        order.ordered = True
        order.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'POST'])
def post_opinion(request, pk):
    user = get_user_from_token(request)
    if request.method == "POST":
        serializer = OpinionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == "PUT":
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        opinion = Opinion.objects.filter(user=user, product=product).first()
        serializer = OpinionSerializer(
            opinion, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_opinions(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    opinions = Opinion.objects.filter(product=product)
    serializer = OpinionSerializer(
        opinions, context={'request': request}, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_user_by_token(request):
    return Response(User.objects.get(id=Token.objects.get(key=request.headers['Authorization']).user_id).username)


@api_view(['POST'])
def test_payment():
    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000, currency='pln',
        payment_method_types=['card'],
        receipt_email='test@example.com')
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)


@api_view(['POST'])
def create_payment(request):
    data = request.data
    email = data['email']
    payment_method_id = data['payment_method_id']
    extra_msg = ''  # add new variable to response message  # checking if customer with provided email already exists
    customer_data = stripe.Customer.list(email=email).data
    if customer_data:
        customer = customer_data[0]
        extra_msg = "Customer already existed."
    else:
        customer = stripe.Customer.create(
            email=email, payment_method=payment_method_id)
    stripe.PaymentIntent.create(
        customer=customer,
        payment_method=payment_method_id,
        currency='usd',
        amount=str(data['amount']).replace('.', ''), confirm=True)
    return Response(status=status.HTTP_200_OK,
                    data={'success': True, 'data': {
                        'customer_id': customer.id, 'extra_msg': extra_msg}
                    })


@api_view(['GET'])
def get_wishlist(request):
    try:
        user = get_user_from_token(request)
    except user.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ProductSerializer(
        Product.objects.filter(wishlists__user=user), context={'request': request}, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
def add_to_wishlist(request, pk):
    user = get_user_from_token(request)
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    wishlist = Wishlist.objects.get(user=user)
    product.wishlists.add(wishlist)
    return Response(None, status=status.HTTP_200_OK)


@api_view(['PUT'])
def delete_from_wishlist(request, pk):
    user = get_user_from_token(request)
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        wishlist = Wishlist.objects.get(user=user)
    except Wishlist.DoesNotExist:
        return Response(False, status=status.HTTP_404_NOT_FOUND)
    product.wishlists.remove(wishlist)
    return Response(True, status=status.HTTP_200_OK)
