from django.apps import AppConfig
import threading

class NotificationsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "notifications"

    def ready(self):
        if threading.current_thread().name == "MainThread":
            from .tasks import notification_scheduler
            threading.Thread(target=notification_scheduler, daemon=True).start()
