from django.urls import path

from honugram.users import views

app_name = "users"
urlpatterns = [
    path("explore", view=views.ExploreUser.as_view(), name="explore"),
    path("<int:user_id>/follow", view=views.FollowUser.as_view(), name="follow_user"),
    path("<int:user_id>/unfollow", view=views.UnFollowUser.as_view(), name="unfollow_user"),
    path("<username>", view=views.UserProfile.as_view(), name="user_profile"),
]
