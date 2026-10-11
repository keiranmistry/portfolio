"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { isDarkInToronto } from "@/lib/sunTimes";

const ThemeContext = createContext(null);

function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeProvider({ children }) {
  // Always start at "light" so the client's first render matches the server's —
  // the pre-hydration inline script in layout.js already applied the real theme
  // class to <html> before React ever mounted, so there's no visible flash. This
  // effect just brings React's state in sync with that class *after* hydration,
  // which is a normal post-mount update rather than a hydration mismatch.
  const [theme, setTheme] = useState("light");
  // Once the visitor manually flips the toggle, that choice is pinned in
  // localStorage and we stop following Toronto's sunrise/sunset.
  const isPinnedRef = useRef(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    isPinnedRef.current = stored === "light" || stored === "dark";
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Live-follow Toronto's sunrise/sunset while nothing has been manually pinned.
  useEffect(() => {
    const check = () => {
      if (isPinnedRef.current) return;
      setTheme(isDarkInToronto() ? "dark" : "light");
    };
    const id = setInterval(check, 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      window.localStorage.setItem("theme", next);
      return next;
    });
    isPinnedRef.current = true;
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
