import { motion } from "framer-motion";
import { THEMES } from "../theme";

const PREVIEWS = [
  {
    key: "cyber",
    label: THEMES.cyber.name,
    blurb: "Neon gradients, high contrast, tech flourish.",
    image: "/cyber-intelligence.png"
  },
  {
    key: "professional",
    label: THEMES.professional.name,
    blurb: "Crisp whites, executive polish, reassuring tone.",
    image: "/professional.png"
  },
  {
    key: "hacker",
    label: THEMES.hacker.name,
    blurb: "Terminal aesthetic, deep greens, focused minimalism.",
    image: "/terminal-mastery.png"
  }
];

const ThemeSelect = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 z-[80] bg-black text-white flex items-center justify-center px-4 py-8 sm:px-6 overflow-y-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800/30 via-indigo-700/20 to-black blur-3xl" />
      <div className="relative max-w-5xl w-full space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {PREVIEWS.map((preview, idx) => (
            <motion.button
              key={preview.key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.4 }}
              onClick={() => onSelect(preview.key)}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="h-32 sm:h-40 w-full overflow-hidden">
                <img
                  src={preview.image}
                  alt={`${preview.label} preview`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 sm:p-5 text-left space-y-2">
                <div className="text-sm text-blue-200/80 font-mono">{preview.label}</div>
                <p className="text-sm text-gray-300">{preview.blurb}</p>
              </div>
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-400/60 transition-colors" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelect;
