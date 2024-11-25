import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Función para obtener los datos de una estación
export const getStationData = async (stationId) => {
  try {
    const [station, measurements, weather, alerts] = await Promise.all([
      api.get(`/stations/${stationId}/`),
      api.get(`/measurements/?station=${stationId}`),
      api.get(`/weather/?station=${stationId}`),
      api.get(`/alerts/?station=${stationId}`),
    ]);

    return {
      ...station.data,
      measurements: measurements.data,
      weather: weather.data,
      alerts: alerts.data,
    };
  } catch (error) {
    console.error('Error fetching station data:', error);
    return null;
  }
};

// Función para obtener todas las regiones
export const getRegions = async () => {
  try {
    const response = await api.get('/regions/');
    return response.data;
  } catch (error) {
    console.error('Error fetching regions:', error);
    return [];
  }
};

// Función para obtener las estaciones de una región
export const getStationsByRegion = async (regionId) => {
  try {
    const response = await api.get(`/stations/?region=${regionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stations:', error);
    return [];
  }
};