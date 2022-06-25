from django.urls import path, re_path
from .views import *


urlpatterns = [
    path('add_address/', add_address),
    path('add_code/', add_code),
    path('category/', category_list),
    path('category/<slug:slug>', category_product_list),
    path('create_order/', create_order),
    path('get_last_order/', get_last_order),
    path('get_opinions/<int:pk>', get_opinions),
    path('orders/', orders_list),
    path('products/', products_list),
    path('products/<int:pk>', product_detail),
    path('pay_order/', pay_order),
    path('post_opinion/<int:pk>', post_opinion),
    path('save-stripe-info/', save_stripe_info),
    path('search/<str:query>', products_search),
    path('test_payment/', test_payment),
    path('type/<str:type>', products_by_type),
    path('user/', user_id_view),
    path('user_by_token/', get_user_by_token),
]
