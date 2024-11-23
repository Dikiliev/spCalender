from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'event', 'notify_time', 'is_sent', 'is_read', 'created_at']
        read_only_fields = ['is_sent', 'created_at']

class CreateNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['user', 'event', 'notify_time']
