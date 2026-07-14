import logging

from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import exception_handler


logger = logging.getLogger(__name__)


def _as_list(value):
    if isinstance(value, list):
        return [str(item) for item in value]
    return [str(value)]


def _normalize_errors(data):
    if isinstance(data, dict):
        return {field: _as_list(messages) for field, messages in data.items()}
    return {"non_field_errors": _as_list(data)}


def _first_error_message(errors):
    for messages in errors.values():
        if messages:
            return messages[0]
    return "Please correct the highlighted fields."


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is None:
        logger.exception("Unhandled API exception.", exc_info=exc)
        return Response(
            {
                "success": False,
                "message": "Unable to process the request.",
                "errors": {"server": ["An unexpected error occurred."]},
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    if isinstance(exc, ValidationError):
        errors = _normalize_errors(response.data)
        response.data = {
            "success": False,
            "message": _first_error_message(errors),
            "errors": errors,
        }
        return response

    response.data = {
        "success": False,
        "message": "Unable to process the request.",
        "errors": _normalize_errors(response.data),
    }
    return response
