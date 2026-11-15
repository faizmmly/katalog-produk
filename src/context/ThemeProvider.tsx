import { useEffect } from "react";
import type { ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ThemeContext } from "./themeContext";
import type { Theme } from "./themeContext";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>("katalog-theme", "light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark") }}
    >
      {children}
    </ThemeContext.Provider>
  );
}