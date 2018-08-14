from django.urls import path
from . import views

from .views import (
    list_all_images_view,
    list_all_comments_view,
    list_all_likes_view,
)

app_name = "images"
urlpatterns = [    
    path("all", view=list_all_images_view, name="all_images"),
    path("comments", view=list_all_comments_view, name="all_comments"),
    path("likes", view=list_all_likes_view, name="all_likes"),
]