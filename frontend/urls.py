from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('cart/', index),
    path('category/<slug:slug>', index),
    path('checkout/', index),
    path('home/', index),
    path('login', index),
    path('product/<int:id>', index),
    path('register/', index),
    path('rest-auth/password/reset/confirm/<uidb64>/<token>/',
         index, name='password_reset_confirm'),
    path('sign/', index),
    path('search/<str:query>', index),
    path('type/<str:type>', index),
    path('wishlist/', index)
]
