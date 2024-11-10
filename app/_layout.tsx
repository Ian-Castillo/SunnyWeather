import { PreferencesProvider } from '../src/context/preferences';
import { ThemeProvider } from '../src/context/theme';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'DMMono-Regular': require('../assets/fonts/DMMono-Regular.ttf'),
    'DMMono-Medium': require('../assets/fonts/DMMono-Medium.ttf'),
    'DMMono-Light': require('../assets/fonts/DMMono-Light.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PreferencesProvider>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </PreferencesProvider>
  );
}
