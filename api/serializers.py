from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Region, Station, Pollutant, Measurement,
    WeatherCondition, Alert, UserProfile, StationSubscription
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = '__all__'

class StationSerializer(serializers.ModelSerializer):
    region = RegionSerializer(read_only=True)

    class Meta:
        model = Station
        fields = '__all__'

class PollutantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pollutant
        fields = '__all__'

class MeasurementSerializer(serializers.ModelSerializer):
    station = StationSerializer(read_only=True)
    pollutant = PollutantSerializer(read_only=True)

    class Meta:
        model = Measurement
        fields = '__all__'

class WeatherConditionSerializer(serializers.ModelSerializer):
    station = StationSerializer(read_only=True)

    class Meta:
        model = WeatherCondition
        fields = '__all__'

class AlertSerializer(serializers.ModelSerializer):
    measurement = MeasurementSerializer(read_only=True)

    class Meta:
        model = Alert
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    region = RegionSerializer(read_only=True)
    subscribed_stations = StationSerializer(many=True, read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'

class StationSubscriptionSerializer(serializers.ModelSerializer):
    station = StationSerializer(read_only=True)
    user = UserProfileSerializer(read_only=True)

    class Meta:
        model = StationSubscription
        fields = '__all__'