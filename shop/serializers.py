from rest_framework import serializers
from .models import Product, Category, Order, OrderItem, Address,Opinion
from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer):
    category = serializers.CharField(read_only=True)
    class Meta:
        model = Category
        fields = ('id','name','category','slug')

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    rating = serializers.SerializerMethodField('get_ratings')

    class Meta:
        model = Product
        fields = ('id','name','category_name','image','description',
        'price','on_discount','discount_price','available','rating')

    def get_ratings(self,obj):
        rating = 0
        opinions = Opinion.objects.filter(product = obj)
        for opinion in opinions:
            rating += opinion.rating
        if(len(opinions) == 0):
            return 0
        else:
            return rating / len(opinions)


class OrderItemSerializer(serializers.ModelSerializer):
    #item = serializers.SerializerMethodField()
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

    def get_order_items(self,obj):
        return OrderItemSerializer(obj.items.all(), many=True).data

    def get_total(self, obj):
        return obj.get_total()


class AddressSerializer(serializers.ModelSerializer):
     
     class Meta:
         model = Address
         fields = (
             'id','street_address','apartment_address','city',
             'postal_code','delivery_type'
         )


class OpinionSerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField('get_user')

    class Meta:
        model= Opinion
        fields = (
            'id','user','product','opinion','rating'
        )

    def get_user(self,obj):
        return obj.user.username

    
     
    
