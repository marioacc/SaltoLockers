# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Lockers', '0005_auto_20150122_1129'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='log',
            name='log_used_time',
        ),
        migrations.AddField(
            model_name='log',
            name='log_end_time',
            field=models.DateTimeField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='log',
            name='log_time_charged',
            field=models.DecimalField(default=0, max_digits=5, decimal_places=2),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='log',
            name='log_timestamp',
            field=models.DateTimeField(auto_now=True, null=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='log',
            name='log_start_time',
            field=models.DateTimeField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='log',
            name='log_total_pay',
            field=models.FloatField(default=0),
            preserve_default=True,
        ),
    ]
