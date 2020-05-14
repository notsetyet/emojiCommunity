import os
import sys
import django

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(base_dir)

# 将配置文件的路径写到 DJANGO_SETTINGS_MODULE 环境变量中
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "JO.settings")
django.setup()

from api import models
for i in range(20):
    models.UserInfo.objects.create(
        nickname='大卫-{0}'.format(i),
        avatar='http://miniprogram-1301929965.cos.ap-beijing.myqcloud.com/dlmmv53r1589124436493.jpg'
    )