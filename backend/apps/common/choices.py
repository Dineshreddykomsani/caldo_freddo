from django.db import models


class LeadStatus(models.TextChoices):
    NEW = "new", "New"
    CONTACTED = "contacted", "Contacted"
    CLOSED = "closed", "Closed"
