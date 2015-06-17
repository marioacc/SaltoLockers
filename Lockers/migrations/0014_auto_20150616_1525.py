# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Lockers', '0013_currency'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lockers',
            name='fk_user',
            field=models.ForeignKey(to='Lockers.Users', null=True),
        ),
        migrations.AlterField(
            model_name='log',
            name='fk_user_id',
            field=models.ForeignKey(to='Lockers.Users', null=True),
        ),
    ]
