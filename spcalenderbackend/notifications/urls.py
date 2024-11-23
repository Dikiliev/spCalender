from django.urls import path
from .views import NotificationListCreateView, NotificationDetailView

urlpatterns = [
    path('list/', NotificationListCreateView.as_view(), name='notification-list-create'),
    path('list/<int:pk>/', NotificationDetailView.as_view(), name='notification-detail'),
]
