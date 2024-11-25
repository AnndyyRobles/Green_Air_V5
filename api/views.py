from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .models import (
    Region, Station, Pollutant, Measurement,
    WeatherCondition, Alert, UserProfile, StationSubscription
)
from .serializers import (
    UserSerializer, RegionSerializer, StationSerializer,
    PollutantSerializer, MeasurementSerializer, WeatherConditionSerializer,
    AlertSerializer, UserProfileSerializer, StationSubscriptionSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['GET'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class RegionViewSet(viewsets.ModelViewSet):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
    permission_classes = [AllowAny]

class StationViewSet(viewsets.ModelViewSet):
    queryset = Station.objects.all()
    serializer_class = StationSerializer
    permission_classes = [AllowAny]

    @action(detail=True, methods=['POST'])
    def subscribe(self, request, pk=None):
        station = self.get_object()
        user_profile = request.user.userprofile
        
        if StationSubscription.objects.filter(user=user_profile, station=station).exists():
            return Response({'detail': 'Already subscribed'}, status=status.HTTP_400_BAD_REQUEST)
        
        subscription = StationSubscription.objects.create(user=user_profile, station=station)
        serializer = StationSubscriptionSerializer(subscription)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class MeasurementViewSet(viewsets.ModelViewSet):
    queryset = Measurement.objects.all()
    serializer_class = MeasurementSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        station_id = self.request.query_params.get('station', None)
        if station_id:
            queryset = queryset.filter(station_id=station_id)
        return queryset

class WeatherConditionViewSet(viewsets.ModelViewSet):
    queryset = WeatherCondition.objects.all()
    serializer_class = WeatherConditionSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        station_id = self.request.query_params.get('station', None)
        if station_id:
            queryset = queryset.filter(station_id=station_id)
        return queryset

class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        station_id = self.request.query_params.get('station', None)
        if station_id:
            queryset = queryset.filter(measurement__station_id=station_id)
        return queryset

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['GET'])
    def my_profile(self, request):
        profile = request.user.userprofile
        serializer = self.get_serializer(profile)
        return Response(serializer.data)