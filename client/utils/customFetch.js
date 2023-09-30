import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const customFetch = axios.create({
  // baseURL: 'http://192.168.0.109:5000/api/v1',
  baseURL: 'https://react-native-chatapp.onrender.com/api/v1',
});

customFetch.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export { customFetch };
