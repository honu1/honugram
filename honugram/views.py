from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings
import os

from rest_framework import status

class ReactAppView(View):
    def get(self, request):
        try:
            with open(os.path.join(str(settings.ROOT_DIR), 'frontend', 'build', 'index.html')) as file:
                return HttpResponse(file.read())
        except:
            return HttpResponse(
                """
            index.html not found ! build your React app !!
            """,
                status=status.HTTP_501_NOT_IMPLEMENTED,
            )
