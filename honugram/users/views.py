from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
from honugram.notifications import views as notifications_views

class ExploreUser(APIView):

    def get(self, request, format=None):
        last_five = models.User.objects.all().order_by('-date_joined')[:5]

        serilizer = serializers.ListUserSerializer(last_five, many=True)

        return Response(data=serilizer.data, status=status.HTTP_200_OK)

class FollowUser(APIView):

    def post(self, request, user_id, format=None):

        user = request.user

        try:
            user_to_follow  = models.User.objects.get(id=user_id)
        except models.user.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user.following.add(user_to_follow)
        user.save()

        notifications_views.create_notification(user, user_to_follow, 'follow')
        
        return Response(status=status.HTTP_200_OK)

class UnFollowUser(APIView):

    def get(self, request, user_id, format=None):

        user = request.user

        try:
            user_to_follow  = models.User.objects.get(id=user_id)
        except models.user.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
            
        user.following.remove(user_to_follow)

        return Response(status=status.HTTP_200_OK)

class UserProfile(APIView):

    def get_user(self, username):
        try:
            found_user = models.User.objects.get(username=username)
            return found_user
        except models.user.DoesNotExist:
            return None

    def get(self, request, username, format=None):

        user = request.user

        found_user = self.get_user(username)

        if found_user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.UserProfileSerializer(found_user)
        return Response(data=serializer.data, status=status.HTTP_200_OK)    

    def put(self, request, username, format=None):

        user = request.user

        found_user = self.get_user(username)

        if found_user is None:

            return Response(status=status.HTTP_404_NOT_FOUND)

        elif found_user.username !=  user.username:

            return Response(status=status.HTTP_401_UNAUTHORIZED)

        else:

            serializer = serializers.UserProfileSerializer(found_user, data=request.data, partial=True)

            if serializer.is_valid():

                serializer.save()
                return Response(data=serializer.data, status=status.HTTP_200_OK)

            else:

                return Response(data=serializer.data, status=status.HTTP_400_BAD_REQUEST)

class UserFollowers(APIView):
    def get(self, request, username, format=None):
        try:
            found_user = models.User.objects.get(username=username)
        except models.user.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_followers = found_user.followers.all()
        serializer = serializers.ListUserSerializer(user_followers, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

class UserFollowing(APIView):

    def get(self, request, username, format=None):
        try:
            found_user = models.User.objects.get(username=username)
        except models.user.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_following = found_user.following.all()
        serializer = serializers.ListUserSerializer(user_following, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

class Search(APIView):

    def get(self, request, format=None):
             
        username = request.query_params.get('username', None)
        
        if username is not None:
            print("this is user search api" + username)

            users = models.User.objects.filter(username__istartswith=username)

            serializer = serializers.ListUserSerializer(users, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class ChangePassword(APIView):

    def put(self, request, username, format=None):

        user = request.user

        if username == user.username:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        current_password = request.data.get('current_password', None)

        if current_password is not None:
            password_match = user.check_password(current_password)
            
            if password_match:

                new_password = request.data.get('new_password', None)

                if new_password is not None:
                    user.set_password(new_password)
                    user.save()

                    return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)