# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2020-05-10 13:41
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20200510_1515'),
    ]

    operations = [
        migrations.AlterField(
            model_name='news',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to='api.UserInfo', verbose_name='发布者'),
        ),
    ]
