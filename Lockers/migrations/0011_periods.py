# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Lockers', '0010_users_user_balance'),
    ]

    operations = [
        migrations.CreateModel(
            name='Periods',
            fields=[
                ('period_id', models.IntegerField(serialize=False, primary_key=True)),
                ('period_name', models.CharField(max_length=50, null=True, blank=True)),
                ('period_start_time', models.DateTimeField(null=True, verbose_name=b'%Y-%m-%d %H:%M', blank=True)),
                ('period_end_time', models.DateTimeField(null=True, verbose_name=b'%Y-%m-%d %H:%M', blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
