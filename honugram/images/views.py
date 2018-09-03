from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from honugram.notifications import views as notification_views

# viewing all image in database.
# this practic test. service dev is not adjust to it.

class ListAllImages(APIView):

    def get(self, request, format=None):

        print(request.scheme)
        print(request.body)

        all_images =  models.Image.objects.all()

        serializer = serializers.ImageSerializer(all_images, many=True)

        return Response(data=serializer.data)

list_all_images_view = ListAllImages.as_view()

class ListAllComments(APIView):

    def get(self, request, format=None):

        all_comments =  models.Comment.objects.all()

        serializer = serializers.CommentSerializer(all_comments, many=True)

        return Response(data=serializer.data)

list_all_comments_view = ListAllComments.as_view()


class ListAllLikes(APIView):

    def get(self, request, format=None):

        all_likes =  models.Like.objects.all()

        print(request.user.website)

        serializer = serializers.LikeSerializer(all_likes, many=True)

        return Response(data=serializer.data)

list_all_likes_view = ListAllLikes.as_view()

class Feed(APIView):
    def get(self, request, format=None):

        user = request.user

        following_users = user.following.all()
        followers_users = user.followers.all()

        print(following_users)
        print(followers_users)

        image_list = []

        for following_user in following_users:

            user_image = following_user.images.all()[:2]

            for image in user_image:
                image_list.append(image)
        
        sorted_image = sorted(image_list, key=lambda image: image.created_at , reverse=True)
        print(sorted_image)

        serializer = serializers.ImageSerializer(sorted_image, many=True)

        return Response(serializer.data)

    class Meta():
        ordering = ['-created_at']

# this function changed ramda experssion ( ex> 70 lines)
# def get_key(image):
#     return image.created_at

feed_view = Feed.as_view()

class LikeImage(APIView):
    def post(self, request, image_id, format=None):
        
        user = request.user

        try:
            found_image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)  

        try:
            preexisting_like = models.Like.objects.get(
                creator=user,
                image=found_image,
            )

            return Response(status=status.HTTP_304_NOT_MODIFIED)

        except models.Like.DoesNotExist:

            new_like = models.Like.objects.create(
                creator=user,
                image=found_image,
            )

            new_like.save()

            notification_views.create_notification(
            user, found_image.creator, 'like', found_image)
            
            return Response(status=status.HTTP_201_CREATED)

like_image_view = LikeImage.as_view()

class UnlikeImage(APIView):
    def delete(self, request, image_id, format=None):
        
        user = request.user

        try:
            found_image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)  

        try:
            preexisting_like = models.Like.objects.get(
                creator=user,
                image=found_image,
            )

            preexisting_like.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        except models.Like.DoesNotExist:
            
            return Response(status=status.HTTP_304_NOT_MODIFIED)

unlike_image_view = UnlikeImage.as_view()

class CommentOnImage(APIView):

    def post(self, request, image_id, format=None):

        user = request.user

        try:
            found_image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)  
        
        serializer = serializers.CommentSerializer(data=request.data)

        if serializer.is_valid() :

            serializer.save(creator=user, image=found_image)

            notification_views.create_notification(
                user, found_image.creator, 'comment', found_image, serializer.data['message']
            )

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

comment_on_image_view = CommentOnImage.as_view()

class Comment(APIView):
    def delete(self, request, comment_id, format=None):

        user = request.user

        try:
            found_comment = models.Comment.objects.get(id=comment_id, creator=user
            )
            found_comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except models.Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

comment_view = Comment.as_view()

class Search(APIView):
    def get(self, request, format=None):
        
        hashtags = request.query_params.get('hashtags', None)
        
        if hashtags is not None:
                
            hashtags = hashtags.split(",")
            print(hashtags)

            images = models.Image.objects.filter(tags__name__in=hashtags).distinct()
            print(images)

            serializer = serializers.CountImageSerializer(images, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

search_view = Search.as_view()

class ModerateComment(APIView):
    def delete(self, request, image_id, comment_id, format=None):

        user = request.user

        try:
            comment_to_delete = models.Comment.obejctes.get(
                id=comment_id, image__id=image_id, image__creator=user)

            comment_to_delete.delete()

        except models.Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)
    

moderate_comment_view = ModerateComment.as_view()