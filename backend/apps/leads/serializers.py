from django.core.exceptions import ValidationError as DjangoValidationError
from django.core.validators import validate_email as django_validate_email
from rest_framework import serializers

from .models import CallbackRequest, ContactMessage, QuoteRequest


class LeadInputMixin:
    min_name_length = 2
    max_name_length = 120
    min_project_length = 10
    min_phone_digits = 8
    max_phone_digits = 15

    def _clean_text(self, value):
        return value.strip() if isinstance(value, str) else value

    def _first_input(self, attrs, *field_names):
        for field_name in field_names:
            if field_name in self.initial_data:
                return self.initial_data.get(field_name)
            if field_name in attrs:
                return attrs.get(field_name)
        return None

    def _require_text(self, value, message):
        value = self._clean_text(value)
        if value in (None, ""):
            raise serializers.ValidationError(message)
        return value

    def _validate_person_name(self, value, field_label):
        value = value.strip()
        if len(value) < self.min_name_length:
            raise serializers.ValidationError(
                f"{field_label} must be at least {self.min_name_length} characters."
            )
        if len(value) > self.max_name_length:
            raise serializers.ValidationError(
                f"{field_label} must be no more than {self.max_name_length} characters."
            )
        return value

    def validate_full_name(self, value):
        return self._validate_person_name(value, "Full Name")

    def validate_service(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Required Solution is required.")
        return value

    def validate_phone_value(self, value):
        value = self._require_text(value, "Phone Number is required.")
        digits = "".join(character for character in value if character.isdigit())
        allowed_separators = set(" +().-")
        has_invalid_character = any(
            not character.isdigit() and character not in allowed_separators
            for character in value
        )
        if (
            has_invalid_character
            or len(digits) < self.min_phone_digits
            or len(digits) > self.max_phone_digits
        ):
            raise serializers.ValidationError("Please enter a valid phone number.")
        return value

    def validate_email_value(self, value, *, required):
        value = self._clean_text(value)
        if value in (None, ""):
            if required:
                raise serializers.ValidationError("Email is required.")
            return ""
        try:
            django_validate_email(value)
        except DjangoValidationError:
            raise serializers.ValidationError("Please enter a valid email address.")
        return value.lower()

    def validate_project_text(self, value, field_label):
        value = self._require_text(value, f"{field_label} is required.")
        if len(value) < self.min_project_length:
            raise serializers.ValidationError(
                f"{field_label} must be at least {self.min_project_length} characters."
            )
        return value


class CallbackRequestSerializer(LeadInputMixin, serializers.ModelSerializer):
    name = serializers.CharField(required=False, allow_blank=True, write_only=True)
    gccCountry = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = CallbackRequest
        fields = (
            "id",
            "name",
            "full_name",
            "gccCountry",
            "gcc_country",
            "phone",
            "email",
            "service",
            "message",
            "status",
            "created_at",
        )
        read_only_fields = ("id", "status", "created_at")
        extra_kwargs = {
            "full_name": {"required": False, "allow_blank": False},
            "gcc_country": {"required": False, "allow_blank": True},
            "phone": {"required": False, "allow_blank": True, "validators": []},
            "service": {"required": False, "allow_blank": True},
            "message": {"required": False, "allow_blank": True},
            "email": {"required": False, "allow_blank": True},
        }

    def validate(self, attrs):
        attrs.pop("name", None)
        attrs.pop("gccCountry", None)

        errors = {}

        raw_name = self._first_input(attrs, "name", "full_name")
        try:
            attrs["full_name"] = self.validate_full_name(
                self._require_text(raw_name, "Full Name is required.")
            )
        except serializers.ValidationError as exc:
            errors["full_name"] = exc.detail

        raw_country = self._first_input(attrs, "gccCountry", "gcc_country") or ""
        attrs["gcc_country"] = self._clean_text(raw_country) or ""

        try:
            attrs["phone"] = self.validate_phone_value(attrs.get("phone"))
        except serializers.ValidationError as exc:
            errors["phone"] = exc.detail

        try:
            attrs["service"] = self.validate_service(
                self._require_text(attrs.get("service"), "Required Solution is required.")
            )
        except serializers.ValidationError as exc:
            errors["service"] = exc.detail

        try:
            attrs["email"] = self.validate_email_value(attrs.get("email"), required=False)
        except serializers.ValidationError as exc:
            errors["email"] = exc.detail

        if errors:
            raise serializers.ValidationError(errors)

        return attrs


class QuoteRequestSerializer(LeadInputMixin, serializers.ModelSerializer):
    name = serializers.CharField(required=False, allow_blank=True, write_only=True)
    company = serializers.CharField(required=False, allow_blank=True, write_only=True)
    requirements = serializers.CharField(required=False, allow_blank=True, write_only=True)
    project_scope = serializers.CharField(required=False, allow_blank=True, write_only=True)
    facility_location = serializers.CharField(required=False, allow_blank=True, write_only=True)
    required_solution = serializers.CharField(required=False, allow_blank=True, write_only=True)
    corporate_email = serializers.CharField(required=False, allow_blank=True, write_only=True)
    direct_contact = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = QuoteRequest
        fields = (
            "id",
            "name",
            "full_name",
            "company",
            "company_name",
            "email",
            "phone",
            "service",
            "required_solution",
            "corporate_email",
            "direct_contact",
            "location",
            "facility_location",
            "requirements",
            "project_scope",
            "project_details",
            "status",
            "created_at",
        )
        read_only_fields = ("id", "status", "created_at")
        extra_kwargs = {
            "full_name": {"required": False, "allow_blank": False},
            "company_name": {"required": False, "allow_blank": False},
            "email": {"required": False, "allow_blank": True},
            "phone": {"required": False, "allow_blank": True, "validators": []},
            "service": {"required": False, "allow_blank": True},
            "location": {"required": False, "allow_blank": True},
            "project_details": {"required": False, "allow_blank": True},
        }

    def validate(self, attrs):
        attrs.pop("name", None)
        attrs.pop("company", None)
        attrs.pop("requirements", None)
        attrs.pop("project_scope", None)
        attrs.pop("facility_location", None)
        attrs.pop("required_solution", None)
        attrs.pop("corporate_email", None)
        attrs.pop("direct_contact", None)

        errors = {}

        raw_name = self._first_input(attrs, "name", "full_name")
        try:
            attrs["full_name"] = self.validate_full_name(
                self._require_text(raw_name, "Full Name is required.")
            )
        except serializers.ValidationError as exc:
            errors["full_name"] = exc.detail

        raw_company = self._first_input(attrs, "company", "company_name")
        try:
            attrs["company_name"] = self._require_text(
                raw_company,
                "Company Name is required.",
            )
        except serializers.ValidationError as exc:
            errors["company_name"] = exc.detail

        raw_email = self._first_input(attrs, "corporate_email", "email")
        email_error_field = self._resolve_input_field("corporate_email", "email")
        try:
            attrs["email"] = self.validate_email_value(raw_email, required=True)
        except serializers.ValidationError as exc:
            errors[email_error_field] = exc.detail

        raw_phone = self._first_input(attrs, "direct_contact", "phone")
        phone_error_field = self._resolve_input_field("direct_contact", "phone")
        try:
            attrs["phone"] = self.validate_phone_value(raw_phone)
        except serializers.ValidationError as exc:
            errors[phone_error_field] = exc.detail

        raw_service = self._first_input(attrs, "required_solution", "service")
        service_error_field = self._resolve_input_field("required_solution", "service")
        try:
            attrs["service"] = self.validate_service(
                self._require_text(raw_service, "Required Solution is required.")
            )
        except serializers.ValidationError as exc:
            errors[service_error_field] = exc.detail

        raw_location = self._first_input(attrs, "facility_location", "location")
        location_error_field = self._resolve_input_field("facility_location", "location")
        try:
            attrs["location"] = self._require_text(
                raw_location,
                "Facility Location is required.",
            )
        except serializers.ValidationError as exc:
            errors[location_error_field] = exc.detail

        raw_details = self._first_input(
            attrs,
            "project_scope",
            "requirements",
            "project_details",
            "message",
        )
        project_error_field = self._resolve_input_field("project_scope", "project_details")
        try:
            attrs["project_details"] = self.validate_project_text(
                raw_details,
                "Project Scope",
            )
        except serializers.ValidationError as exc:
            errors[project_error_field] = exc.detail

        if errors:
            raise serializers.ValidationError(errors)

        return attrs

    def _resolve_input_field(self, *field_names):
        for field_name in field_names:
            if field_name in self.initial_data:
                return field_name
        return field_names[0]

    def validate_project_details(self, value):
        return self.validate_project_text(value, "Project Scope")


class ContactMessageSerializer(LeadInputMixin, serializers.ModelSerializer):
    full_name = serializers.CharField(required=False, allow_blank=True, write_only=True)
    company_name = serializers.CharField(required=False, allow_blank=True, write_only=True)
    message = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = ContactMessage
        fields = (
            "id",
            "name",
            "full_name",
            "company",
            "company_name",
            "email",
            "phone",
            "product",
            "query",
            "message",
            "status",
            "created_at",
        )
        read_only_fields = ("id", "status", "created_at")
        extra_kwargs = {
            "name": {"required": False, "allow_blank": True},
            "company": {"required": False, "allow_blank": True},
            "email": {"required": False, "allow_blank": True},
            "phone": {"required": False, "allow_blank": True, "validators": []},
            "product": {"required": False, "allow_blank": True},
            "query": {"required": False, "allow_blank": True},
        }

    def validate(self, attrs):
        attrs.pop("full_name", None)
        attrs.pop("company_name", None)
        attrs.pop("message", None)

        errors = {}

        raw_name = self._first_input(attrs, "name", "full_name")
        try:
            attrs["name"] = self._validate_person_name(
                self._require_text(raw_name, "Full Name is required."),
                "Full Name",
            )
        except serializers.ValidationError as exc:
            errors["name"] = exc.detail

        try:
            attrs["email"] = self.validate_email_value(attrs.get("email"), required=True)
        except serializers.ValidationError as exc:
            errors["email"] = exc.detail

        try:
            attrs["phone"] = self.validate_phone_value(attrs.get("phone"))
        except serializers.ValidationError as exc:
            errors["phone"] = exc.detail

        attrs["company"] = self._clean_text(
            self._first_input(attrs, "company", "company_name") or ""
        )

        raw_query = self._first_input(attrs, "query", "message", "project_scope")
        try:
            attrs["query"] = self.validate_query(raw_query)
        except serializers.ValidationError as exc:
            errors["query"] = exc.detail

        if errors:
            raise serializers.ValidationError(errors)

        return attrs

    def validate_query(self, value):
        return self.validate_project_text(value, "Message")
