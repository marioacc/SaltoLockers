# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Areas',
            fields=[
                ('area_id', models.IntegerField(serialize=False, primary_key=True)),
                ('area_name', models.CharField(max_length=20, null=True, blank=True)),
                ('area_description', models.CharField(max_length=40, null=True, blank=True)),
                ('area_enable', models.BooleanField(default=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Lockers',
            fields=[
                ('locker_id', models.IntegerField(serialize=False, primary_key=True)),
                ('locker_name', models.CharField(max_length=20, null=True, blank=True)),
                ('locker_match', models.CharField(max_length=50, null=True, blank=True)),
                ('locker_locker_assignment_type', models.CharField(max_length=20, null=True, blank=True)),
                ('locker_status', models.CharField(max_length=20, null=True, blank=True)),
                ('locker_start_time', models.DateTimeField(null=True, verbose_name=b'%Y-%m-%d %H:%M', blank=True)),
                ('locker_end_time', models.DateTimeField(null=True, verbose_name=b'%Y-%m-%d %H:%M', blank=True)),
                ('fk_area', models.ForeignKey(to='Lockers.Areas')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Log',
            fields=[
                ('log_id', models.AutoField(serialize=False, primary_key=True)),
                ('log_start_time', models.DateTimeField(auto_now=True)),
                ('log_total_pay', models.FloatField()),
                ('log_rate', models.DecimalField(default=0, max_digits=3, decimal_places=2)),
                ('log_discount', models.DecimalField(default=0, max_digits=3, decimal_places=1)),
                ('log_used_time', models.TimeField()),
                ('fk_locker_id', models.ForeignKey(to='Lockers.Lockers')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Rates',
            fields=[
                ('rate_id', models.IntegerField(serialize=False, primary_key=True)),
                ('rate_name', models.CharField(max_length=50, null=True, blank=True)),
                ('rate_rate', models.DecimalField(default=0, max_digits=5, decimal_places=2)),
                ('rate_unit', models.CharField(max_length=10)),
                ('rate_currency', models.CharField(default=b'MXN', max_length=10, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('user_id', models.CharField(max_length=10, serialize=False, primary_key=True)),
                ('user_name', models.CharField(max_length=50)),
                ('user_ap', models.CharField(max_length=50)),
                ('user_am', models.CharField(max_length=50)),
                ('user_matricula', models.CharField(max_length=9)),
                ('user_discount', models.DecimalField(default=0, max_digits=3, decimal_places=1)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='log',
            name='fk_user_id',
            field=models.ForeignKey(to='Lockers.Users'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='lockers',
            name='fk_user',
            field=models.ForeignKey(blank=True, to='Lockers.Users', null=True),
            preserve_default=True,
        ),
    ]
