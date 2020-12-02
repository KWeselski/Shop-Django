from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Product, Category
from .serializers import *

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

