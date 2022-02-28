import React, { createContext, useMemo, useState } from 'react';

type ThemeType = 'light' | 'dark';

type ThemeContextType = {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
};

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType,
);

export const ThemeConsumer = ThemeContext.Consumer;

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('light');

  const value = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme],
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
