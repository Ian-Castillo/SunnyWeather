import { createContext, useContext, useState } from 'react';

interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  card: string;
  border: string;
  subText: string;
}

interface Typography {
  mono: {
    regular: string;
    medium: string;
    light: string;
  };
}

interface Theme {
  colors: ThemeColors;
  typography: Typography;
}

const lightTheme: Theme = {
  colors: {
    background: '#FFFFFF',
    text: '#000000',
    primary: '#007AFF',
    card: '#F2F2F2',
    border: '#E5E5E5',
    subText: '#666666',
  },
  typography: {
    mono: {
      regular: 'DMMono-Regular',
      medium: 'DMMono-Medium',
      light: 'DMMono-Light',
    },
  },
};

const darkTheme: Theme = {
  colors: {
    background: '#000000',
    text: '#FFFFFF',
    primary: '#0A84FF',
    card: '#1C1C1E',
    border: '#38383A',
    subText: '#999999',
  },
  typography: {
    mono: {
      regular: 'DMMono-Regular',
      medium: 'DMMono-Medium',
      light: 'DMMono-Light',
    },
  },
};

const ThemeContext = createContext<{
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return {
    ...context.theme,
    isDark: context.isDark,
    toggleTheme: context.toggleTheme,
  };
} 