# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Lockers', '0006_auto_20150205_1039'),
    ]

    operations = [
        migrations.AddField(
            model_name='log',
            name='log_comments',
            field=models.CharField(max_length=150, null=True, blank=True),
            preserve_default=True,
        ),
    ]
