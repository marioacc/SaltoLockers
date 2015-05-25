# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Lockers', '0012_auto_20150211_1522'),
    ]

    operations = [
        migrations.CreateModel(
            name='Currency',
            fields=[
                ('currency_id', models.AutoField(serialize=False, primary_key=True)),
                ('currency_name', models.CharField(max_length=20)),
                ('currency_quantity', models.IntegerField()),
            ],
        ),
    ]
