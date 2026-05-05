  import React, { useState, useEffect } from "react";
  import { useTheme } from "../../context/ThemeContext";
  import "./Hero.css";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isKids, setIsKids] = useState(false);

  // Apply theme class to <body>
  useEffect(function () {
    document.body.classList.toggle('theme-kids', isKids);
    document.body.classList.toggle('theme-dark', !isKids);
  }, [isKids]);

  // Set initial class on mount
  useEffect(function () {
    document.body.classList.add('theme-dark');
  }, []);

  function toggleTheme() {
    setIsKids(function (prev) { return !prev; });
  }

  return (
    <ThemeContext.Provider value={{ isKids, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}