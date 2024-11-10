import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '../context/theme';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

// Rest of your MapScreen code remains the same... 