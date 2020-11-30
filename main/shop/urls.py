from django.urls import path,re_path
from .views import products_list, category_product_list

urlpatterns = [
    path('products/', products_list),
    path('category/<int:pk>', category_product_list)
]
