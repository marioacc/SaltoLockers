__author__ = 'luishoracio'
from rest_framework import serializers
from Lockers.models import *


class UsersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Users
        fields = ('user_id', 'user_name', 'user_ap', 'user_am', 'user_matricula', 'user_discount',
                  'user_balance')
        # fields = ('user_id', 'user_name', 'user_ap', 'user_am', 'user_times', 'user_discount',
        #          'user_match', 'user_has_assigned_key')


class AreasSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Areas
        fields = ('area_id', 'area_name', 'area_description', 'area_enable')


class LockersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Lockers
        fields = ('locker_id', 'locker_name', 'locker_rent_confirmed', 'locker_rent_type', 'locker_status',
                  'locker_start_time', 'locker_end_time', 'fk_area', 'fk_user')
        # fields = ('locker_id', 'locker_name', 'locker_match', 'locker_status', 'fk_area')


class RatesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Rates
        fields = ('rate_id', 'rate_name', 'rate_rate', 'rate_unit', 'rate_currency')


class PeriodsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Periods
        fields = ('period_id', 'period_name', 'period_start_time', 'period_end_time')


class LogSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Log
        fields = (
            'log_id', 'log_timestamp', 'log_start_time', 'log_end_time', 'log_time_charged', 'log_rent_type',
            'log_rate', 'log_discount', 'log_total_pay', 'log_comments', 'fk_locker_id', 'fk_user_id')


class CurrencySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Currency
        fields = (
            'currency_id', 'currency_name', 'currency_quantity')
