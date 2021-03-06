from django.urls import path
from . import views

from .views import (
    images_view,
    # list_all_images_view,
    # list_all_comments_view,
    # list_all_likes_view,
    image_detail_view,
    like_image_view,
    unlike_image_view,
    comment_on_image_view,
    comment_view,
    search_view,
    moderate_comment_view,
)

app_name = "images"
urlpatterns = [    
    path("", view=images_view, name="feed"),
    path("<int:image_id>/", view=image_detail_view, name="image_detail"),
    path("<int:image_id>/likes/", view=like_image_view, name="like_image"),
    path("<int:image_id>/unlikes/", view=unlike_image_view, name="unlike_image"),
    path("<int:image_id>/comments/", view=comment_on_image_view, name="comment_image"),
    path("<int:image_id>/comments/<int:comment_id>/", view=moderate_comment_view, name="comment_image"),
    path("comments/<int:comment_id>/", view=comment_view, name="comment"),
    path("search/", view=search_view, name="search"),
    # path("all", view=list_all_images_view, name="all_images"),
    # path("comments", view=list_all_comments_view, name="all_comments"),
    # path("likes", view=list_all_likes_view, name="all_likes"),
]