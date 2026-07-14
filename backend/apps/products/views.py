from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Product
from .serializers import ProductSerializer


class ProductListAPIView(APIView):
    def get(self, request):
        products = (
            Product.objects.select_related("category")
            .filter(is_active=True, category__is_active=True)
            .order_by("display_order", "name")
        )
        serializer = ProductSerializer(products, many=True)
        return Response(
            {
                "success": True,
                "message": "Products retrieved successfully.",
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )
