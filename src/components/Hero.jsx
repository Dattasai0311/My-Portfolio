import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { TypewriterText } from "./common/TypewriterText";
import CyclingTypewriter from "./common/CyclingTypewriter";
import { portfolioData } from "../data/portfolio";

const Hero = ({ theme }) => {
  const profileImage = "/profile-new.png";

  return (
    <section
      id="about"
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden ${theme.bg} pt-20 px-4 sm:px-6`}
    >
      <div
        className={`absolute top-[-20%] left-[-10%] w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-full blur-[120px] opacity-40 ${
          theme.name === "Executive Trust" ? "bg-indigo-200" : "bg-purple-900"
        }`}
      />
      <div
        className={`absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-full blur-[120px] opacity-30 ${
          theme.name === "Executive Trust" ? "bg-blue-200" : "bg-blue-900"
        }`}
      />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center mb-8"
        >
          <div
            className={`relative w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-full border-4 ${theme.border} overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.4)] group ${theme.cardBg} mb-6`}
          >
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover transition-transform duration-700"
            />
          </div>

          <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ${theme.textSecondary} tracking-wide`}>
            {portfolioData.name}
          </h2>
        </motion.div>

        <div className="h-28 sm:h-32 md:h-48 flex flex-col items-center justify-start">
          <h1 className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold ${theme.text} leading-tight mb-6`}>
            <TypewriterText text="Architecting" delay={1.5} /> <br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient}`}>
              <CyclingTypewriter
                words={["Intelligence.", "Security.", "Scalability."]}
                delay={2.2}
              />
            </span>
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.5 }}
          className="max-w-2xl"
        >
          <div
            className={`inline-block px-3 py-1 mb-6 text-xs font-mono ${theme.accent} border ${theme.border} rounded-full bg-opacity-10`}
          >
            Available for Hire
          </div>
          <p className={`${theme.textSecondary} text-lg mb-8`}>{portfolioData.bio}</p>

          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 ${
                theme.bg === "bg-slate-50" ? "bg-slate-900 text-white" : "bg-white text-black"
              } font-bold rounded-lg flex items-center gap-2`}
              onClick={() =>
                document.getElementById("projects").scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects <ChevronDown size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 border ${theme.border} ${theme.text} font-bold rounded-lg hover:bg-white/5 transition-colors`}
              onClick={() =>
                document.getElementById("chat-section").scrollIntoView({ behavior: "smooth" })
              }
            >
              Ask My AI
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
