from rest_framework import serializers

from .models import Company, Industry, Partner, Testimonial


class CompanySerializer(serializers.ModelSerializer):
    companyName = serializers.CharField(source="company_name", read_only=True)
    mapEmbedUrl = serializers.CharField(source="google_maps_url", read_only=True)
    facebook = serializers.CharField(source="facebook_url", read_only=True)
    linkedin = serializers.CharField(source="linkedin_url", read_only=True)
    instagram = serializers.CharField(source="instagram_url", read_only=True)
    youtube = serializers.CharField(source="youtube_url", read_only=True)

    class Meta:
        model = Company
        fields = (
            "companyName",
            "email",
            "phone",
            "whatsapp",
            "address",
            "mapEmbedUrl",
            "facebook",
            "linkedin",
            "instagram",
            "youtube",
        )


class IndustrySerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="slug", read_only=True)
    iconName = serializers.CharField(source="icon_name", read_only=True)
    bgImage = serializers.CharField(source="background_image_url", read_only=True)

    class Meta:
        model = Industry
        fields = ("id", "name", "description", "iconName", "bgImage")


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ("id", "quote", "author", "company", "location", "rating", "tag")


class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = ("id", "name")
