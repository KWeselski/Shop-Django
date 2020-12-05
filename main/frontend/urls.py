from django.urls import path
from .views import index
urlpatterns = [
    path('',index),
    path('home/',index),
    path('product/<int:id>',index),
    path('category/<slug:slug>',index),
    path('cart',index)
]