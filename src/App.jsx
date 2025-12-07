import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Palette } from "lucide-react";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import InlineAI from "./components/InlineAI";
import ChatWidget from "./components/ChatWidget";
import Footer from "./components/Footer";
import IntroOverlay from "./components/IntroOverlay";
import ThemeSelect from "./components/ThemeSelect";
import SplashCursor from "./components/common/SplashCursor";
import { THEMES, getNextThemeKey } from "./theme";

export default function App() {
  const [currentTheme, setCurrentTheme] = useState("cyber");
  const [phase, setPhase] = useState("intro"); // intro -> theme-select -> site
  const theme = THEMES[currentTheme];
  const cursorBlendClass = currentTheme === "professional" ? "mix-blend-multiply" : "mix-blend-screen";
  const cursorBack =
    currentTheme === "professional" ? { r: 0.96, g: 0.97, b: 1 } : { r: 0, g: 0, b: 0 };

  const toggleTheme = () => setCurrentTheme(getNextThemeKey(currentTheme));

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      const previous = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      return () => {
        window.history.scrollRestoration = previous;
      };
    }
    window.scrollTo(0, 0);
  }, []);

  const handleIntroContinue = () => setPhase("theme-select");

  const handleThemeChoice = (key) => {
    setCurrentTheme(key);
    setPhase("site");
    window.scrollTo(0, 0);
  };

  return (
    <div
      className={`${theme.bg} min-h-screen transition-colors duration-300 selection:${theme.accentBg} selection:text-white relative overflow-hidden`}
    >
      {phase === "site" && (
        <>
          <div className={`pointer-events-none fixed inset-0 z-40 ${cursorBlendClass}`}>
            <SplashCursor TRANSPARENT BACK_COLOR={cursorBack} />
          </div>
          <Nav theme={theme} />
          <Hero theme={theme} />
          <Experience theme={theme} />
          <Projects theme={theme} />
          <InlineAI theme={theme} />
          <Footer theme={theme} />
          <ChatWidget theme={theme} />
        </>
      )}

      {phase === "intro" && (
        <IntroOverlay
          onContinue={handleIntroContinue}
          profileImage="/profile-new.png"
          name="Datta Sai Adithya Vinjamuri"
        />
      )}

      {phase === "theme-select" && <ThemeSelect onSelect={handleThemeChoice} />}

      {phase === "site" && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="fixed bottom-6 left-6 z-50 p-4 bg-white text-black rounded-full shadow-xl border border-gray-200 flex items-center gap-2 font-bold text-xs"
          title="Switch Color Theme"
        >
          <Palette size={16} />
          <span className="hidden md:inline">{theme.name}</span>
        </motion.button>
      )}
    </div>
  );
}
