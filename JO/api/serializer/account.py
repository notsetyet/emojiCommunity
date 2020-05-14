from abc import ABC

from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django_redis import get_redis_connection

from .validators import phone_validator


class MessageSerializer(serializers.Serializer, ABC):
    phone = serializers.CharField(label='手机号', validators=[phone_validator, ])


class LoginSerializer(serializers.Serializer, ABC):
    phone = serializers.CharField(label='手机号', validators=[phone_validator, ])
    code = serializers.CharField(label='密码')

    def validate_code(self, value):
        # if len(value) != 4:
        #     raise ValidationError('短信格式错误')
        # if not value.isdecimal():
        #     raise ValidationError('短信格式错误')

        phone = self.initial_data.get('phone')
        conn = get_redis_connection()
        code = conn.get(phone)
        if not code:
            raise ValidationError('密码不能为空')
        if value != code.decode('utf-8'):
            raise ValidationError('密码错误')

        return value
