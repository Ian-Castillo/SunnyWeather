import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../src/context/theme';
import { usePreferences } from '../../src/context/preferences';

export default function SettingsScreen() {
  const { colors, typography } = useTheme();
  const { preferences, toggleTheme, toggleTemperatureUnit } = usePreferences();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Profile Section */}
      <View style={[styles.section, { borderBottomColor: colors.border }]}>
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: 'https://ui-avatars.com/api/?name=User&background=random' }} 
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>
              John Doe
            </Text>
            <Text style={[styles.profileEmail, { color: colors.text }]}>
              john.doe@example.com
            </Text>
          </View>
        </View>
      </View>

      {/* Appearance Section */}
      <View style={[styles.section, { borderBottomColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Appearance
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

      {/* Units Section */}
      <View style={[styles.section, { borderBottomColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Units
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

      {/* App Info Section */}
      <View style={[styles.section, { borderBottomColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          About
        </Text>
        <View style={[styles.option, { backgroundColor: colors.card }]}>
          <Text style={[styles.optionText, { color: colors.text }]}>
            Version 1.0.0
          </Text>
        </View>
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
    fontWeight: '600',
    marginBottom: 16,
  },
  option: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    opacity: 0.8,
  },
}); 