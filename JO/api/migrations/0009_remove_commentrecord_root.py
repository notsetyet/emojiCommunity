# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2020-05-11 10:37
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_commentrecord_root'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='commentrecord',
            name='root',
        ),
    ]
