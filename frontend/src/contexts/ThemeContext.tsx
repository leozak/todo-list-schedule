import { createContext, useContext, useState, type ReactNode } from "react";

export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Create the context
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

let storedTheme: string | null = localStorage.getItem("theme");
if (storedTheme === null) {
  localStorage.setItem("theme", "light");
}

// Create the provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">(
    storedTheme as "dark" | "light"
  );

  const toggleTheme = (theme?: "light" | "dark") => {
    if (theme) {
      setTheme(theme);
      localStorage.setItem("theme", theme);
    } else {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
      localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    }
  };

  // The actual value passed to consumers
  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Create hook to use the context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
