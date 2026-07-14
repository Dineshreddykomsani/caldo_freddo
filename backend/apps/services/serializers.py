from rest_framework import serializers

from .models import Service


class ServiceSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="slug", read_only=True)
    longDescription = serializers.CharField(source="long_description", read_only=True)
    iconName = serializers.CharField(source="icon_name", read_only=True)
    image = serializers.CharField(source="image_url", read_only=True)

    class Meta:
        model = Service
        fields = (
            "id",
            "title",
            "description",
            "longDescription",
            "features",
            "iconName",
            "image",
            "display_order",
        )
