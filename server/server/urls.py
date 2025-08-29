from django.contrib import admin
from django.urls import path
from actions.views import ActionListView, ActionDetailView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/actions/', ActionListView.as_view(), name='action-list'),
    path('api/actions/<int:id>/', ActionDetailView.as_view(), name='action-detail'),
]