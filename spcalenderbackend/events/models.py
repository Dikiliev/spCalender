from django.db import models


class SportType(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Event(models.Model):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('mixed', 'Mixed'),
    ]

    title = models.CharField(max_length=255)
    sport_type = models.ForeignKey(SportType, on_delete=models.CASCADE)
    country = models.CharField(max_length=150, default='')
    region = models.CharField(max_length=150, default='')
    city = models.CharField(max_length=150, default='')
    location = models.TextField(default='')
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    participants = models.PositiveIntegerField()
    gender = models.TextField(choices=GENDER_CHOICES)
    age_group = models.CharField(max_length=150)
    event_type = models.CharField(max_length=150)  # e.g., 'Championship', 'Cup'
    description = models.TextField(blank=True, null=True)
    program = models.TextField(blank=True, null=True)  # Новое поле для дисциплины/программы
    is_cancelled = models.BooleanField(default=False)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
