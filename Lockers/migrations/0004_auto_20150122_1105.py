# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Lockers', '0003_auto_20150116_1152'),
    ]

    operations = [
        migrations.RenameField(
            model_name='lockers',
            old_name='locker_assignment_type',
            new_name='locker_rent_type',
        ),
    ]
