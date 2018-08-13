from django.contrib import admin
from . import models
# Register your models here.

@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):

    # this admin model can modified image file link
    list_display_links = (
        'location',
    )

    search_fileds = (
        'location',
        'caption',
    )

    list_filter = (
        'location',
        'caption',
    )

    list_display = (
        'file',
        'location',
        'caption',
        'creator',
        'created_at',
        'updated_at',
    )

@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = (
        'creator',
        'image',
        'created_at',
        'updated_at',
    )

@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = (
        'message',
        'creator',
        'image',
        'created_at',
        'updated_at',
    )