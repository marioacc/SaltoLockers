from django.db import models
from django.db.models.signals import post_save


class Users(models.Model):
    user_id = models.CharField(max_length=10, primary_key=True)
    user_name = models.CharField(max_length=50)
    user_ap = models.CharField(max_length=50)
    user_am = models.CharField(max_length=50)
    user_matricula = models.CharField(max_length=9)
    user_discount = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    user_balance = models.DecimalField(max_digits=20, decimal_places=2, default=0)

    def __str__(self):
        return self.user_name


class Areas(models.Model):
    area_id = models.IntegerField(primary_key=True)
    area_name = models.CharField(max_length=20, null=True, blank=True)
    area_description = models.CharField(max_length=40, null=True, blank=True)
    area_enable = models.BooleanField(default=True)

    def __str__(self):
        return self.area_name


class Lockers(models.Model):
    locker_id = models.IntegerField(primary_key=True)
    locker_name = models.CharField(max_length=20, null=True, blank=True)
    locker_rent_confirmed = models.BooleanField(default=False)
    locker_rent_type = models.CharField(max_length=20, null=True, blank=True)
    locker_status = models.CharField(max_length=20, null=True, blank=True)
    locker_start_time = models.DateTimeField('%Y-%m-%d %H:%M', null=True, blank=True)
    locker_end_time = models.DateTimeField('%Y-%m-%d %H:%M', null=True, blank=True)
    fk_area = models.ForeignKey('Areas')
    fk_user = models.ForeignKey('Users', null=True)

    def __str__(self):
        return self.locker_name


class Rates(models.Model):
    rate_id = models.IntegerField(primary_key=True)
    rate_name = models.CharField(max_length=50, null=True, blank=True)
    rate_rate = models.DecimalField(max_digits=10, decimal_places=6, default=0)
    rate_unit = models.CharField(max_length=10, default='h')
    rate_currency = models.CharField(max_length=10, default='MXN', null=True, blank=True)

    def __unicode__(self):
        return self.rate_name


class Periods(models.Model):
    period_id = models.AutoField(primary_key=True)
    period_name = models.CharField(max_length=50, null=True, blank=True)
    period_start_time = models.DateTimeField('%Y-%m-%d %H:%M', null=True, blank=True)
    period_end_time = models.DateTimeField('%Y-%m-%d %H:%M', null=True, blank=True)

    def __unicode__(self):
        return self.period_name


class Log(models.Model):
    log_id = models.AutoField(primary_key=True)
    log_timestamp = models.DateTimeField(auto_now=True, null=True, blank=True)
    log_start_time = models.DateTimeField(null=True, blank=True)
    log_end_time = models.DateTimeField(null=True, blank=True)
    log_time_charged = models.DecimalField(max_digits=5, decimal_places=2, default=0, null=True, blank=True)
    log_rent_type = models.CharField(max_length=20, null=True, blank=True)
    log_rate = models.DecimalField(max_digits=3, decimal_places=2, default=0, null=True, blank=True)
    log_discount = models.DecimalField(max_digits=3, decimal_places=1, default=0, null=True, blank=True)
    log_total_pay = models.FloatField(default=0, null=True, blank=True)
    log_comments = models.CharField(max_length=150, null=True, blank=True)
    fk_locker_id = models.ForeignKey('Lockers')
    fk_user_id = models.ForeignKey('Users', null=True)

    def __str__(self):
        return self.fk_locker_id


class Currency(models.Model):
    currency_id = models.AutoField(primary_key=True)
    currency_name = models.CharField(max_length=20, null=False)
    currency_quantity = models.IntegerField(null=False)

    def __str__(self):
        return self.currency_name
