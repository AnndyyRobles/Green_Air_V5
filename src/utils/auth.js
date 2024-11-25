import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:8000/api';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/me/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/token/`, {
      username,
      password
    });
    
    localStorage.setItem('token', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export const register = async (userData) => {
  try {
    await axios.post(`${API_URL}/users/`, userData);
    return await login(userData.username, userData.password);
  } catch (error) {
    console.error('Registration error:', error);
    return false;
  }
};