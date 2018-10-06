from django.apps import AppConfig


class UsersAppConfig(AppConfig):

    name = "honugram.users"
    verbose_name = "Users"

    def ready(self):
        try:
            from .signals import user_signed_up
            # import users.signals  # noqa F401
        except ImportError:
            pass
