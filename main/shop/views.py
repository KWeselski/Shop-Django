from django.shortcuts import render, get_object_or_404
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Product, Category, OrderItem, Order, Profile,Coupon,Address, Opinion
from .serializers import *
from django.utils import timezone
from datetime import datetime, timedelta
from rest_framework.authtoken.models import Token
from django.utils.html import escape
from django.contrib.auth.models import User, AnonymousUser
from .forms import CouponForm
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
import stripe


stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(['GET', 'POST'])
def products_list(request):
    if request.method == "GET":
        data = Product.objects.all()
        serializer = ProductSerializer(data, context={'request': request},many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def product_detail(request,pk):
    try:
        product_d = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET": 
        serializer = ProductSerializer(product_d, context={'request': request})
        return Response(serializer.data)  

@api_view(['GET'])
def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, context={'request': request}, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def category_product_list(request,slug):
    try:
        category_ = Category.objects.get(slug=slug)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        products = Product.objects.filter(category=category_)
        serializer = ProductSerializer(products, context={'request':request},many=True)
        return Response(serializer.data)

@api_view(['GET'])
def products_by_type(request,type):
    if request.method == 'GET':
        if(type == 'discount'):
            products = Product.objects.filter(on_discount=True)
        if(type == 'new'):
            last_month = datetime.today() - timedelta(days=14)
            products = Product.objects.filter(created__gte=last_month)
        serializer = ProductSerializer(products, context={'request':request},many=True)
        return Response(serializer.data)

@api_view(['GET'])
def products_search(request,query):   
    print('HELLLO')
    if request.method == "GET":
        products = Product.objects.filter(name__contains=query)
    serializer = ProductSerializer(products, context={'request': request}, many=True)
    print(products)
    return Response(serializer.data)

@api_view(["POST"])
def user_id_view(request):
    print(request.user)
    return Response({'userID': request.data}, status=status.HTTP_200_OK)

def get_user_from_token(request):
    token = request.headers['Authorization']
    user_id = Token.objects.get(key=token).user_id
    user = User.objects.get(id=user_id)
    return user


@api_view(['GET','POST'])
def orders_list(request):
    if request.method == "GET":
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, context={'request': request}, many=True)
        return Response(serializer.data)

@api_view(['GET','POST'])
def create_order(request):
    if request.method == 'POST':
        ordered_date = timezone.now()     
        user = get_user_from_token(request)
        order = Order.objects.create(user=user, ordered_date=ordered_date)
        for idx,order_item in enumerate(request.data['order_items']):
            data = {"item": order_item["id"] , "quantity": order_item["quantity"]}      
            item_ = OrderItemSerializer(data=data)
            if item_.is_valid():
                item_.save(user=user)
               #order_item = OrderItem.objects.create(user = user,item_serializer
                ord_item = OrderItem.objects.filter(id=item_.data["id"])
                order.items.add(ord_item[0])
         
        return Response(item_.data)

    if request.method == "GET":
        order_items = OrderItem.objects.all()
        serializer = OrderItemSerializer(order_items, context={'request': request}, many=True)
        return Response(serializer.data)

def get_coupon(request, code):
    try:
        coupon = Coupon.objects.get(code=code)
        print('coupon:', coupon)
        return coupon
    except ObjectDoesNotExist:        
        print(request, "This coupon does not exist")
        return None


@api_view(['POST'])
def add_code(request):
    if request.method == 'POST':
        form = CouponForm(request.data)
        user = get_user_from_token(request)
        if form.is_valid():
            try:
                code= form.cleaned_data.get('code')
                order = Order.objects.filter(
                    user = user, ordered=False
                ).last()
                coupon_ = get_coupon(request, code)
                if coupon_ == None:
                    return Response('No coupon')
                order.coupon = coupon_
                order.discount = coupon_.discount
                order.save()              
                return Response()
            except ObjectDoesNotExist:
                return Response()
        else:
            print('Error')

@api_view(['GET'])
def get_last_order(request):
    if request.method == "GET":
        user = get_user_from_token(request)
        order = Order.objects.filter(
                user=user,ordered=False
                ).last()
        return(Response({'discount': order.coupon.discount, 'total_after_discount': order.get_total()},status=status.HTTP_200_OK))
       
@api_view(['POST'])
def add_address(request):
    if request.method == 'POST':
        user = get_user_from_token(request)
        serializer = AddressSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save(user=user)
            order = Order.objects.filter(
                    user = user, ordered=False
                    ).last()
            address = Address.objects.filter(id=serializer.data["id"])
            order.delivery_address = address[0]
            order.ordered = True
            order.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_products_by_search(request):
    if request.method == 'GET':
        print(request)
        query = request.get('q')
        data = Product.objects.filter(Q(name__icontains=query) | Q(state__icontains=query))
        serializer = ProductSerializer(data, context={'request': request},many=True)
        return Response(serializer.data)

@api_view(['PUT','POST'])
def post_opinion(request,pk):
    if request.method == "POST":
        user = get_user_from_token(request)
        serializer = OpinionSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == "PUT":
        try:
            product_ = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        user = get_user_from_token(request)
        opinion = Opinion.objects.filter(user = user, product=product_).first()
        serializer = OpinionSerializer(opinion, data = request.data ,context={'request': request})
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_opinions(request,pk): 
    try:
        product_ = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        opinions = Opinion.objects.filter(product=product_)
        serializer = OpinionSerializer(opinions, context={'request':request},many=True)
        return Response(serializer.data)
    

@api_view(['GET'])
def get_user_by_token(request):
    token = request.headers['Authorization']
    user_id = Token.objects.get(key=token).user_id
    user = User.objects.get(id=user_id)
    return Response(user.username)

@api_view(['POST'])
def test_payment(request):
    print(settings.STRIPE_SECRET_KEY)
    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000, currency='pln', 
        payment_method_types=['card'],
        receipt_email='test@example.com')
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)

@api_view(['POST'])
def save_stripe_info(request):
    data = request.data   
    email = data['email']
    payment_method_id = data['payment_method_id']
    amount = data['amount']
    extra_msg = '' # add new variable to response message  # checking if customer with provided email already exists
    customer_data = stripe.Customer.list(email=email).data      
    amount = str(amount).replace('.','')
    # if the array is empty it means the email has not been used yet  
    if len(customer_data) == 0:
    # creating customer
        customer = stripe.Customer.create(email=email, payment_method=payment_method_id)
    else:
        customer = customer_data[0]
        extra_msg = "Customer already existed."

    stripe.PaymentIntent.create(
        customer=customer, 
        payment_method=payment_method_id,  
        currency='usd', # you can provide any currency you want
        amount=amount,confirm=True)
    return Response(status=status.HTTP_200_OK, 
    data={'message': 'Success', 'data': {
      'customer_id': customer.id, 'extra_msg': extra_msg}
   })
