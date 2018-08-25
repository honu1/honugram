from django.urls import path

from honugram.users import views

app_name = "users"
urlpatterns = [
    path("explore", view=views.ExploreUser.as_view(), name="explore"),
]
