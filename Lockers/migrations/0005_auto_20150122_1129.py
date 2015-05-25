# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Lockers', '0004_auto_20150122_1105'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rates',
            name='rate_rate',
            field=models.DecimalField(default=0, max_digits=10, decimal_places=6),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='rates',
            name='rate_unit',
            field=models.CharField(default=b'h', max_length=10),
            preserve_default=True,
        ),
    ]
