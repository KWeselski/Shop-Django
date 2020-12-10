from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Product, Category, OrderItem, Order, Profile
from .serializers import *
from django.utils import timezone

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


@api_view(["GET"])
def user_id_view(request):
    return Response({'userID': request.user.id}, status=status.HTTP_200_OK)

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
        order = Order.objects.create(ordered_date=ordered_date)
        for idx,order_item in enumerate(request.data['order_items']):
            data = {"item": order_item["id"] , "quantity": order_item["quantity"]} 
            print(data)     
            item_serializer = OrderItemSerializer(data=data)
            if item_serializer.is_valid():
        #    serializer.create(request.data)
               item_serializer.save()
               ord_item = OrderItem.objects.filter(item= order_item["id"], quantity=order_item["quantity"])
               print(ord_item)
               order.items.add(ord_item[0])
               print('Serializer:',item_serializer.data)
        return Response(item_serializer.data)

    if request.method == "GET":
        order_items = OrderItem.objects.all()
        serializer = OrderItemSerializer(order_items, context={'request': request}, many=True)
        return Response(serializer.data)
