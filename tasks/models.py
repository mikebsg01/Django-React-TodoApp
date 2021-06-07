from django.db import models
from datetime import timedelta

# Create your models here.
class Task(models.Model):
    DURATION_TYPE = (
        ('short', '0 - 30min'),
        ('medium', '31 - 45 min'),
        ('long', '46 - 60 min'),
    )

    description = models.CharField(max_length=150, blank=False)
    duration = models.CharField(max_length=6, choices=DURATION_TYPE, blank=False, null=False)
    recorded_time = models.DurationField(default=timedelta())
    '''
        "Status" field: False = Pending, True = Completed
    '''
    status = models.BooleanField(default=False, blank=True, null=True)

    def __str__(self):
        return self.description