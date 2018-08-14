from django.urls import path
from . import views

from .views import (
    list_all_view,    
)

app_name = "images"
urlpatterns = [    
    path("all", view=list_all_view, name="all_images"),
]