import { createContext, useContext, useState } from 'react';

interface PreferencesContextType {
  preferences: {
    isDark: boolean;
    useCelsius: boolean;
  };
  toggleTheme: () => void;
  toggleTemperatureUnit: () => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState({
    isDark: false,
    useCelsius: true,
  });

  const toggleTheme = () => {
    setPreferences(prev => ({
      ...prev,
      isDark: !prev.isDark,
    }));
  };

  const toggleTemperatureUnit = () => {
    setPreferences(prev => ({
      ...prev,
      useCelsius: !prev.useCelsius,
    }));
  };

  return (
    <PreferencesContext.Provider 
      value={{ 
        preferences, 
        toggleTheme, 
        toggleTemperatureUnit 
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
} 