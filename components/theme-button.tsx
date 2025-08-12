import { MoonIcon, SunIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ThemeButton = () => {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check localStorage first
    const savedTheme = localStorage.getItem("darkMode");

    if (savedTheme === "true") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      setIsDark(true);
    } else if (savedTheme === "false") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      // No saved preference, check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);

      if (prefersDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }

    localStorage.setItem("darkMode", newIsDark.toString());
    setIsDark(newIsDark);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 w-10 h-10" />
    );
  }

  return (
     <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      animate={{
        backgroundColor: isDark ? "#080808" : "#fff1e6",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="relative w-21 h-10 rounded-full shadow-inner flex items-center"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Toggle Knob */}
      <motion.div
        className="absolute top-1 left-1 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
        animate={{
          x: isDark ? 40 : 0,
          backgroundColor: isDark ? "#1a1a1a" : "#FFD700",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
        }}
      >
        {/* Icon Animation */}
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.3 }}
            >
              <MoonIcon className="w-5 h-5 text-background" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
              transition={{ duration: 0.3 }}
            >
              <SunIcon className="w-5 h-5 text-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
};

export default ThemeButton;
