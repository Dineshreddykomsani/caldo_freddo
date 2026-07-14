from rest_framework import serializers

from .models import Product, ProductCategory


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ("id", "name", "slug", "display_order")


class ProductSerializer(serializers.ModelSerializer):
    slNo = serializers.IntegerField(source="display_order", read_only=True)
    category = serializers.CharField(source="category.name", read_only=True)
    manufacturerName = serializers.CharField(source="manufacturer_name", read_only=True)
    manufacturerUrl = serializers.CharField(source="manufacturer_url", read_only=True)
    isOwnProduct = serializers.BooleanField(source="is_own_product", read_only=True)
    isOwnService = serializers.BooleanField(source="is_own_service", read_only=True)
    description = serializers.CharField(source="short_description", read_only=True)
    image = serializers.CharField(source="image_url", read_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "slNo",
            "category",
            "name",
            "manufacturerName",
            "manufacturerUrl",
            "isOwnProduct",
            "isOwnService",
            "competitors",
            "description",
            "image",
        )
