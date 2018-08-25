from django.urls import path
from . import views

from .views import (
    feed_view,
    # list_all_images_view,
    # list_all_comments_view,
    # list_all_likes_view,
    like_image_view,
    comment_on_image_view,
    comment_view,
)

app_name = "images"
urlpatterns = [    
    path("", view=feed_view, name="feed"),
    path("<int:image_id>/likes/", view=like_image_view, name="like_image"),
    path("<int:image_id>/comments/", view=comment_on_image_view, name="comment_image"),
    path("comments/<int:comment_id>/", view=comment_view, name="comment"),
    # path("all", view=list_all_images_view, name="all_images"),
    # path("comments", view=list_all_comments_view, name="all_comments"),
    # path("likes", view=list_all_likes_view, name="all_likes"),
]