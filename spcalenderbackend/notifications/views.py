from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Notification
from .serializers import NotificationSerializer, CreateNotificationSerializer

class NotificationListCreateView(generics.ListCreateAPIView):
    """
    Список уведомлений текущего пользователя и создание нового уведомления.
    """
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = CreateNotificationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        notification = serializer.save(user=request.user)
        return Response(NotificationSerializer(notification).data, status=status.HTTP_201_CREATED)


class NotificationDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Получение, обновление или удаление конкретного уведомления.
    """
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)
