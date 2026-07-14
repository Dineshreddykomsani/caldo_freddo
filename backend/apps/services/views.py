from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Service
from .serializers import ServiceSerializer


class ServiceListAPIView(APIView):
    def get(self, request):
        services = Service.objects.filter(is_active=True).order_by(
            "display_order",
            "title",
        )
        serializer = ServiceSerializer(services, many=True)
        return Response(
            {
                "success": True,
                "message": "Services retrieved successfully.",
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )
