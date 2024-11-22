from django.db import models

class SportType(models.Model):
    name = models.CharField(max_length=50)

class Event(models.Model):
    title = models.CharField(max_length=255)
    sport_type = models.ForeignKey(SportType, on_delete=models.CASCADE)
    location = models.CharField(max_length=255)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    participants = models.PositiveIntegerField()
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female'), ('mixed', 'Mixed')])
    age_group = models.CharField(max_length=50)
    event_type = models.CharField(max_length=50)  # e.g., 'Championship', 'Cup'
    description = models.TextField(blank=True, null=True)
    is_cancelled = models.BooleanField(default=False)
    last_updated = models.DateTimeField(auto_now=True)
