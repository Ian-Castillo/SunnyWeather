import axios from 'axios';

const API_KEY = '125dbcd19377cf114b1c8c786a01e18f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeather = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}; 