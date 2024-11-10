import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
  Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../src/context/theme';
import { usePreferences } from '../../src/context/preferences';
import * as Location from 'expo-location';
import { ENV } from '../../src/config/env';
import { router } from 'expo-router';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

export default function WeatherScreen() {
  const { colors } = useTheme();
  const { preferences } = usePreferences();
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<{lat: number, lon: number} | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Please enable location permissions in your settings');
          return;
        }

        setLoading(true);
        const location = await Location.getCurrentPositionAsync({});
        await fetchWeatherByCoords(location.coords.latitude, location.coords.longitude);
      } catch (err) {
        setError('Error getting weather for your location');
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      const units = preferences.useCelsius ? 'metric' : 'imperial';
      const url = `${ENV.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${ENV.OPENWEATHER_API_KEY}&units=${units}`;
      
      console.log('Fetching weather from:', url); // Debug log
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('API Response:', data); // Debug log
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch weather data');
      }
      
      setWeather(data);
      setCoordinates({ lat, lon });
      updateMap(lat, lon);
      setError(null);
    } catch (err) {
      console.error('Detailed error:', err); // Debug log
      setError('Error fetching weather data');
    }
  };

  const fetchWeatherByLocation = async (searchTerm: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const isZipCode = /^\d{5}(-\d{4})?$/.test(searchTerm);
      const units = preferences.useCelsius ? 'metric' : 'imperial';
      
      let url;
      if (isZipCode) {
        url = `${ENV.BASE_URL}/weather?zip=${searchTerm},us&appid=${ENV.OPENWEATHER_API_KEY}&units=${units}`;
      } else {
        url = `${ENV.BASE_URL}/weather?q=${searchTerm}&appid=${ENV.OPENWEATHER_API_KEY}&units=${units}`;
      }
      
      console.log('Fetching weather from:', url); // Debug log
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('API Response:', data); // Debug log
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch weather data');
      }
      
      setWeather(data);
      const newLat = data.coord.lat;
      const newLon = data.coord.lon;
      setCoordinates({ lat: newLat, lon: newLon });
      updateMap(newLat, newLon);
      setLocation('');
    } catch (err) {
      console.error('Detailed error:', err); // Debug log
      setError('Location not found');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Please enable location permissions in your settings');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      await fetchWeatherByCoords(location.coords.latitude, location.coords.longitude);
    } catch (err) {
      setError('Error getting your location');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateMap = (lat: number, lon: number) => {
    // Navigate to the map tab with new coordinates
    router.push({
      pathname: '/(tabs)/map',
      params: { lat, lon }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { 
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border
          }]}
          placeholder="Enter city name or ZIP code"
          placeholderTextColor={colors.subText}
          value={location}
          onChangeText={setLocation}
          onSubmitEditing={() => location && fetchWeatherByLocation(location)}
        />
        <TouchableOpacity 
          style={[styles.locationButton, { backgroundColor: colors.primary }]}
          onPress={getCurrentLocation}
        >
          <MaterialCommunityIcons name="crosshairs-gps" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Error Message */}
  

      {/* Weather Display */}
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      ) : weather ? (
        <View style={[styles.weatherContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.cityName, { color: colors.text }]}>
            {weather.name}
          </Text>
          <Text style={[styles.temperature, { color: colors.text }]}>
            {Math.round(weather.main.temp)}°{preferences.useCelsius ? 'C' : 'F'}
          </Text>
          <Text style={[styles.description, { color: colors.text }]}>
            {weather.weather[0].description}
          </Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons 
                name="thermometer" 
                size={24} 
                color={colors.subText} 
              />
              <Text style={[styles.detailText, { color: colors.subText }]}>
                Feels like: {Math.round(weather.main.feels_like)}°{preferences.useCelsius ? 'C' : 'F'}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons 
                name="water-percent" 
                size={24} 
                color={colors.subText} 
              />
              <Text style={[styles.detailText, { color: colors.subText }]}>
                Humidity: {weather.main.humidity}%
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <Text style={[styles.noDataText, { color: colors.subText }]}>
          Enter a location to see weather
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    borderWidth: 1,
    fontSize: 16,
  },
  locationButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  weatherContainer: {
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 72,
    fontWeight: '200',
    marginBottom: 10,
  },
  description: {
    fontSize: 20,
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  detailsContainer: {
    width: '100%',
    gap: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailText: {
    fontSize: 16,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
