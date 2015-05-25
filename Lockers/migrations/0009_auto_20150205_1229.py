# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Lockers', '0008_auto_20150205_1214'),
    ]

    operations = [
        migrations.AlterField(
            model_name='log',
            name='log_time_charged',
            field=models.DecimalField(default=0, null=True, max_digits=5, decimal_places=2, blank=True),
            preserve_default=True,
        ),
    ]
