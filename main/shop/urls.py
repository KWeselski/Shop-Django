from django.urls import path,re_path
from .views import products_list, category_product_list, category_list,product_detail,user_id_view,orders_list

urlpatterns = [
    path('products/', products_list),
    path('category/', category_list),
    path('category/<slug:slug>', category_product_list),
    path('products/<int:pk>',product_detail),
    path('user/',user_id_view),
    path('orders/',orders_list)
]
