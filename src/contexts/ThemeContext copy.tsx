import React, { createContext, useContext, useState } from "react";

type Theme = "default" | "teal-theme" | "purple-theme";

type ThemeContext = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeContext = createContext<ThemeContext | null>(null);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>("default");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
