from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    UserViewSet, RegionViewSet, StationViewSet,
    MeasurementViewSet, WeatherConditionViewSet,
    AlertViewSet, UserProfileViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'regions', RegionViewSet)
router.register(r'stations', StationViewSet)
router.register(r'measurements', MeasurementViewSet)
router.register(r'weather', WeatherConditionViewSet)
router.register(r'alerts', AlertViewSet)
router.register(r'profiles', UserProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]