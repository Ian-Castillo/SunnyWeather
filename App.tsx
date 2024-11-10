import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import WeatherScreen from './app/(tabs)/index';
import MapScreen from './app/(tabs)/map';
import SettingsScreen from './app/(tabs)/settings';
import { PreferencesProvider } from './src/context/preferences';
import { ThemeProvider } from './src/context/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PreferencesProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#0096FF',
              tabBarInactiveTintColor: 'gray',
            }}
          >
           <Tab.Screen 
              name="Map" 
              component={MapScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="map" size={size} color={color} />
                ),
              }}
            />
            
            <Tab.Screen 
              name="Weather" 
              component={WeatherScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="weather-sunny" size={size} color={color} />
                ),
              }}
            />
           
            <Tab.Screen 
              name="Settings" 
              component={SettingsScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="cog" size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </PreferencesProvider>
  );
} 