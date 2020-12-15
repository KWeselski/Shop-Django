from django.urls import path,re_path
from .views import products_list, category_product_list, category_list,product_detail,user_id_view,orders_list,create_order,add_code,get_last_order,add_address

urlpatterns = [
    path('products/', products_list),
    path('category/', category_list),
    path('category/<slug:slug>', category_product_list),
    path('products/<int:pk>',product_detail),
    path('user/',user_id_view),
    path('orders/',orders_list),
    path('create_order/',create_order),
    path('add_code/',add_code),
    path('get_last_order/',get_last_order),
    path('add_address/',add_address)
]
