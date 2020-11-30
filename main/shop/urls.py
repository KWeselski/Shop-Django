from django.urls import path,re_path
from .views import products_list

urlpatterns = [
    path('products/', products_list)
]
