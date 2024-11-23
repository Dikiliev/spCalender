from django.db import models
from django.core.management.base import BaseCommand
from django.utils.timezone import now

from users.models import User
from events.models import Event


class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='subscriptions')
    created_at = models.DateTimeField(auto_now_add=True)

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    notify_time = models.DateTimeField(default=now)
    created_at = models.DateTimeField(auto_now_add=True)
    is_sent = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification for {self.user.username} on {self.notify_time}"


class Command(BaseCommand):
    help = 'Отправка запланированных уведомлений'

    def handle(self, *args, **kwargs):
        tasks = Notification.objects.filter(notify_time__lte=now(), is_sent=False)

        for task in tasks:
            self.send_notification(task)

    def send_notification(self, task):
        print(f"Отправлено уведомление для события {task.event.title}")
        task.is_sent = True
        task.save()
