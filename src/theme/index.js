export const THEMES = {
  cyber: {
    name: "Cyber Intelligence",
    bg: "bg-gray-950",
    text: "text-white",
    textSecondary: "text-gray-400",
    accent: "text-blue-400",
    accentBg: "bg-blue-500",
    border: "border-gray-800",
    cardBg: "bg-gray-900",
    gradient: "from-blue-400 to-purple-600",
    navBg: "bg-black/30",
    terminalText: "text-green-400",
    etherColors: ["#5227FF", "#FF9FFC", "#B19EEF"]
  },
  professional: {
    name: "Executive Trust",
    bg: "bg-slate-50",
    text: "text-slate-900",
    textSecondary: "text-slate-500",
    accent: "text-indigo-600",
    accentBg: "bg-indigo-600",
    border: "border-slate-200",
    cardBg: "bg-white",
    gradient: "from-indigo-600 to-blue-500",
    navBg: "bg-white/70",
    terminalText: "text-slate-800",
    etherColors: ["#1D4ED8", "#60A5FA", "#A5B4FC"]
  },
  hacker: {
    name: "Terminal Mastery",
    bg: "bg-black",
    text: "text-green-50",
    textSecondary: "text-green-800",
    accent: "text-green-500",
    accentBg: "bg-green-600",
    border: "border-green-900",
    cardBg: "bg-gray-900",
    gradient: "from-green-400 to-emerald-600",
    navBg: "bg-green-900/20",
    terminalText: "text-green-500",
    etherColors: ["#10B981", "#34D399", "#22D3EE"]
  }
};

export const getNextThemeKey = (currentKey) => {
  const keys = Object.keys(THEMES);
  const nextIndex = (keys.indexOf(currentKey) + 1) % keys.length;
  return keys[nextIndex];
};
