# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Lockers', '0002_auto_20150115_1009'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lockers',
            name='locker_match',
        ),
        migrations.AddField(
            model_name='lockers',
            name='locker_rent_confirmed',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
