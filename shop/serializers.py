from django.db.models import Sum
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Product, Category, Order, OrderItem, Address, Opinion, Wishlist


class CategorySerializer(serializers.ModelSerializer):
    category = serializers.CharField(read_only=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'category', 'slug')


class ProductListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source='category.name', read_only=True)
    image = serializers.SerializerMethodField('get_image_path')

    class Meta:
        model = Product
        fields = ('id', 'name', 'category_name', 'image')

    def get_image_path(self, obj):
        return obj.image.url.split('frontend')[1]


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source='category.name', read_only=True)
    rating = serializers.SerializerMethodField('get_ratings')
    image = serializers.SerializerMethodField('get_image_path')
    in_wishlist = serializers.SerializerMethodField('product_in_wishlist')

    class Meta:
        model = Product
        fields = ('id', 'name', 'category_name', 'image', 'description',
                  'price', 'on_discount', 'discount_price', 'available', 'rating', 'in_wishlist')

    def get_ratings(self, obj):
        rating = 0
        opinions = Opinion.objects.filter(product=obj)
        for opinion in opinions:
            rating += opinion.rating
        if len(opinions) > 0:
            rating / len(opinions)
        return 0

    def get_image_path(self, obj):
        return obj.image.url.split('frontend')[1]

    def product_in_wishlist(self, obj):
        token = self.context['request'].headers.get('Authorization')
        if token:
            return bool(obj.wishlists.filter(user_id=Token.objects.get(key=token).user_id))
        return False


class OrderItemSerializer(serializers.ModelSerializer):
    item = serializers.SerializerMethodField()
    final_price = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = (
            'id',
            'item',
            'quantity',
            'final_price'
        )

    def get_final_price(self, obj):
        return obj.get_final_price()


class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = (
            'order_items',
            'total'
        )

    def create(self, validated_data):
        return Order.objects.create(**validated_data)

    def get_order_items(self, obj):
        return OrderItemSerializer(obj.items.all(), many=True).data

    def get_total(self, obj):
        return obj.get_total()


class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = (
            'id', 'street_address', 'apartment_address', 'city',
            'postal_code', 'delivery_type'
        )


class OpinionSerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField('get_user')

    class Meta:
        model = Opinion
        fields = (
            'date', 'user', 'opinion', 'rating'
        )

    def get_user(self, obj):
        return obj.user.username
