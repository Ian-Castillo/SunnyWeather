import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/theme';
import { usePreferences } from '../context/preferences';

export default function SettingsScreen() {
  const { colors, typography } = useTheme();
  const { preferences, toggleTheme, toggleTemperatureUnit } = usePreferences();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.section, { borderBottomColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Theme
        </Text>
        <TouchableOpacity 
          style={[styles.option, { backgroundColor: colors.card }]} 
          onPress={toggleTheme}
        >
          <Text style={[styles.optionText, { color: colors.text }]}>
            {preferences.isDark ? 'Dark Mode' : 'Light Mode'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.section, { borderBottomColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Temperature Unit
        </Text>
        <TouchableOpacity 
          style={[styles.option, { backgroundColor: colors.card }]} 
          onPress={toggleTemperatureUnit}
        >
          <Text style={[styles.optionText, { color: colors.text }]}>
            {preferences.useCelsius ? 'Celsius' : 'Fahrenheit'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  option: {
    padding: 16,
    borderRadius: 12,
  },
  optionText: {
    fontSize: 16,
  },
}); 