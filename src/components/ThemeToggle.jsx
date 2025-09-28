"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="h-9 w-9 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-neutral-800">
        <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200 dark:bg-neutral-700" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex justify-center items-center rounded-md p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative h-4 w-4">
        {/* Sun */}
        <span
          className={`absolute inset-0 rotate-0 transform transition-transform duration-200 ${
            theme === "dark" ? "scale-100" : "scale-0"
          }`}
        >
          <Sun className="h-4 w-4" />
        </span>
        {/* Moon */}
        <span
          className={`absolute inset-0 rotate-90 transform transition-transform duration-200 ${
            theme === "dark" ? "scale-0" : "scale-100"
          }`}
        >
          <Moon className="h-4 w-4" />
        </span>
      </div>
    </button>
  );
}
