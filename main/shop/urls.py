from django.urls import path,re_path
from .views import *


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
    path('add_address/',add_address),
    path('post_opinion/<int:pk>', post_opinion),
    path('get_opinions/<int:pk>',get_opinions),
    path('user_by_token/',get_user_by_token),
    path('test_payment/',test_payment),
    path('save-stripe-info/', save_stripe_info),
    path('type/<str:type>', products_by_type)
]
