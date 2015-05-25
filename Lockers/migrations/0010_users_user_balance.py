# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Lockers', '0009_auto_20150205_1229'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='user_balance',
            field=models.DecimalField(default=0, max_digits=20, decimal_places=2),
            preserve_default=True,
        ),
    ]
