# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2020-05-11 06:26
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20200510_2141'),
    ]

    operations = [
        migrations.AddField(
            model_name='commentrecord',
            name='root',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='roots', to='api.CommentRecord', verbose_name='根评论'),
        ),
    ]
