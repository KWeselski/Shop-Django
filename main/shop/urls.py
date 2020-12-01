from django.urls import path,re_path
from .views import products_list, category_product_list, category_list,product_detail

urlpatterns = [
    path('products/', products_list),
    path('category/', category_list),
    path('category/<int:pk>', category_product_list),
    path('products/<int:pk>',product_detail)
]
