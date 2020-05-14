import uuid

from rest_framework.views import APIView
from rest_framework.response import Response

from api import models


class OssCredentialView(APIView):

    def get(self, request, *args, **kwargs):
        from utils.tencent.oss import get_credential

        return Response(get_credential())

class LoginView(APIView):

    def post(self, request, *args, **kwargs):
        """

        :param request:
        :param args:
        :param kwargs:
        :return:
        """

        """
        ser = LoginSerializer(data=request.data)
        if not ser.is_valid():
            return Response({"status": False, 'detail': ser.errors,'message':"验证码错误"})
        # 2. 获取或创建用户
        phone = ser.validated_data.get('phone')
        """
        ava = request.data.get('avatar')
        nick = request.data.get('nickName')
        user_object, flag = models.UserInfo.objects.get_or_create(nickname=nick, avatar=ava)
        user_object.token = str(uuid.uuid4())
        user_object.save()

        """
        # 获取微信 session_key 和 openid
        params = {
            'appid': 'wx55cca0b94f723dc7',
            'secret': 'c000e3ddc95d2ef723b9b010f0ae05d5',
            'js_code': request.data.get('code'),
            'grant_type': 'authorization_code'

        }
        res = requests.get('https://api.weixin.qq.com/sns/jscode2session', params=params).json()
        # {'session_key': '8m1jCCqA2x+enLdoEmFAXg==', 'openid': 'ofuZp5MaP33ezAlO8gcsgEY_jpac'}
        """

        return Response({'status': True, 'data': {'token': user_object.token, 'nickName': user_object.nickname, 'avatar':user_object.avatar}})
