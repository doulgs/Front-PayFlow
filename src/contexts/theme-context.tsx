import React, { createContext, useContext, useState } from "react";
import { useColorScheme as nativeWindColorScheme } from "nativewind";

interface ThemeContextProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setColorScheme } = nativeWindColorScheme(); // Atualiza o Nativewind
  const [theme, setTheme] = useState<"light" | "dark">("light"); // Define o tema inicial como "light"

  // Alterna entre "light" e "dark"
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setColorScheme(newTheme);
    console.log(`🔄 Tema atualizado para: ${newTheme}`);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("❌ useTheme deve ser usado dentro de um ThemeProvider!");
  }
  return context;
};
