import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useTheme } from '../../src/context/theme';

export default function MapScreen() {
  const params = useLocalSearchParams();
  const { colors } = useTheme();
  const mapRef = useRef(null);
  const navigation = useNavigation();

  // Debug log
  console.log('Map Screen Params:', params);

  const [mapRegion, setMapRegion] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Listen for focus events
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const newLat = Number(params.lat);
      const newLon = Number(params.lon);
      
      console.log('Focusing map with coordinates:', { newLat, newLon });

      if (!isNaN(newLat) && !isNaN(newLon)) {
        const newRegion = {
          latitude: newLat,
          longitude: newLon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        
        setMapRegion(newRegion);
        
        // Animate map after a short delay
        setTimeout(() => {
          // Handle null case explicitly
          if (mapRef.current) {
            (mapRef.current as MapView).animateToRegion(newRegion, 1000);
          }
        }, 100);
      }
    });

    return unsubscribe;
  }, [params.lat, params.lon]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={mapRegion}
      >
        <Marker
          coordinate={{
            latitude: Number(params.lat) || mapRegion.latitude,
            longitude: Number(params.lon) || mapRegion.longitude,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
}); 