import stripe
from datetime import datetime, timedelta
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User, AnonymousUser
from django.db.models import Q
from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from django.utils.html import escape
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
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


@api_view(['GET', 'POST'])
def products_list(request):
    if request.method == "GET":
        data = Product.objects.all()
        serializer = ProductSerializer(
            data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = ProductSerializer(data=request.data)
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
        serializer = ProductSerializer(product, context={'request': request})
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


def get_user_from_token(request):
    return User.objects.get(id=Token.objects.get(key=request.headers['Authorization']).user_id)


@api_view(['GET'])
def orders_list(request):
    serializer = OrderSerializer(
        Order.objects.all(), context={'request': request}, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST', 'PUT'])
def create_order(request):
    if request.method == 'POST':
        user = get_user_from_token(request)
        order = Order.objects.create(user=user, ordered_date=timezone.now())
        for idx, order_item in enumerate(request.data['order_items']):
            data = {"item": order_item["id"],
                    "quantity": order_item["quantity"]}
            item_ = OrderItemSerializer(data=data)
            if item_.is_valid():
                item_.save(user=user)
                ord_item = OrderItem.objects.filter(id=item_.data["id"])
                order.items.add(ord_item[0])
        return Response(item_.data)

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
    import pdb
    pdb.set_trace()
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
def save_stripe_info(request):
    data = request.data
    payment_method_id = data['payment_method_id']
    extra_msg = ''  # add new variable to response message  # checking if customer with provided email already exists
    customer_data = stripe.Customer.list(email=data['email']).data
    amount = str(data['amount']).replace('.', '')
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
        amount=amount, confirm=True)
    return Response(status=status.HTTP_200_OK,
                    data={'message': 'Success', 'data': {
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
    wishlist = Wishlist.objects.filter(user=user).first()
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
        wishlist = Wishlist.objects.filter(user=user).first()
    except Wishlist.DoesNotExist:
        return Response(False, status=status.HTTP_404_NOT_FOUND)
    product.wishlists.remove(wishlist)
    return Response(True, status=status.HTTP_200_OK)
