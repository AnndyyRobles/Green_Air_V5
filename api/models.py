from django.db import models
from django.contrib.auth.models import User

class Region(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name}, {self.country}"

class Station(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    latitude = models.DecimalField(max_digits=10, decimal_places=7)
    longitude = models.DecimalField(max_digits=10, decimal_places=7)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Pollutant(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.name

class Measurement(models.Model):
    date = models.DateTimeField()
    station = models.ForeignKey(Station, on_delete=models.CASCADE)
    pollutant = models.ForeignKey(Pollutant, on_delete=models.CASCADE)
    concentration_value = models.DecimalField(max_digits=5, decimal_places=2)
    quality_index = models.CharField(max_length=50)
    quality_value = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.station.name} - {self.date}"

class WeatherCondition(models.Model):
    date = models.DateTimeField()
    station = models.ForeignKey(Station, on_delete=models.CASCADE)
    temperature = models.DecimalField(max_digits=5, decimal_places=2)
    humidity = models.DecimalField(max_digits=5, decimal_places=2)
    wind_speed = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.station.name} - {self.date}"

class Alert(models.Model):
    measurement = models.ForeignKey(Measurement, on_delete=models.CASCADE)
    alert_level = models.CharField(max_length=50)
    message = models.CharField(max_length=255)
    recommendations = models.TextField()

    def __str__(self):
        return f"{self.alert_level} - {self.measurement.station.name}"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15)
    address = models.CharField(max_length=255)
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True)
    subscribed_stations = models.ManyToManyField(Station, through='StationSubscription')

    def __str__(self):
        return self.user.username

class StationSubscription(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    station = models.ForeignKey(Station, on_delete=models.CASCADE)
    subscription_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'station')