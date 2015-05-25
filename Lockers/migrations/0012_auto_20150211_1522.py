# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Lockers', '0011_periods'),
    ]

    operations = [
        migrations.AlterField(
            model_name='periods',
            name='period_id',
            field=models.AutoField(serialize=False, primary_key=True),
            preserve_default=True,
        ),
    ]
