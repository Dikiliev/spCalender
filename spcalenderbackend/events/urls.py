# events/urls.py
from django.urls import path
from .views import EventListView, StatisticsView

urlpatterns = [
    path('list/', EventListView.as_view(), name='event-list'),
    path('statistics/', StatisticsView.as_view(), name='statistics'),
]
