# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Lockers', '0007_log_log_comments'),
    ]

    operations = [
        migrations.AddField(
            model_name='log',
            name='log_rent_type',
            field=models.CharField(max_length=20, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='log',
            name='log_discount',
            field=models.DecimalField(default=0, null=True, max_digits=3, decimal_places=1, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='log',
            name='log_rate',
            field=models.DecimalField(default=0, null=True, max_digits=3, decimal_places=2, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='log',
            name='log_total_pay',
            field=models.FloatField(default=0, null=True, blank=True),
            preserve_default=True,
        ),
    ]
