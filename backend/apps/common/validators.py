from django.core.validators import RegexValidator


phone_validator = RegexValidator(
    regex=r"^\+?[0-9][0-9\s().-]{7,19}$",
    message=(
        "Enter a valid phone number using digits and optional spaces, "
        "hyphens, parentheses, periods, or a leading plus sign."
    ),
)
