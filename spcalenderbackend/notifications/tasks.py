import time

from django.core.mail import send_mail
from django.utils.timezone import now

from config import settings
from .models import Notification

from django.conf import settings
import datetime

def notification_scheduler():
    while True:
        try:
            notifications = Notification.objects.filter(notify_time__lte=now(), is_sent=False)
            for notification in notifications:
                send_notification(notification)
                notification.is_sent = True
                notification.save()
        except Exception as e:
            print(f"Ошибка в notification_scheduler: {e}")

        time.sleep(60)


def send_notification(notification):
    time_left = notification.notify_time - now()

    subject = f'Напоминание: "{notification.event.title}" начинается скоро!'

    if time_left < datetime.timedelta(days=1):
        message = f'Мероприятие "{notification.event.title}" начнется менее чем через 24 часа.'
    elif time_left < datetime.timedelta(days=3):
        message = f'Мероприятие "{notification.event.title}" начнется через несколько дней.'
    else:
        days_left = time_left.days
        message = f'До начала мероприятия "{notification.event.title}" осталось {days_left} дней.'

    message += f'\n\nДетали мероприятия:\n' \
               f'Название: {notification.event.title}\n' \
               f'Дата и время начала: {notification.event.start_date.strftime("%d.%m.%Y %H:%M")}\n' \
               f'Локация: {notification.event.location}\n' \
               f'\nНе пропустите!'

    from_email = settings.EMAIL_HOST_USER

    try:
        send_mail(
            subject,
            message,
            from_email,
            [notification.user.email],
            fail_silently=False
        )
        print(f"Уведомление успешно отправлено: {notification.user.username} - {notification.event.title}")
    except Exception as e:
        print(f"Ошибка при отправке уведомления: {e}")

