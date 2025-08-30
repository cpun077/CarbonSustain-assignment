from django.contrib import admin
from django.urls import path
from actions.views import ListView, DetailView, DownloadView

urlpatterns = [
    path('admin/', admin.site.urls), # admin view on server
    path('api/actions/', ListView.as_view(), name='action-list'), # general endpoint
    path('api/actions/<int:id>/', DetailView.as_view(), name='action-detail'), # specific id endpoint
    path('api/actions/download', DownloadView.as_view(), name='action-download') # download endpoint
]