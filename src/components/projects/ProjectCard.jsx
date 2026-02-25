import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Sparkles, Bot, Loader2 } from "lucide-react";
import { callGeminiAPI } from "../../utils/ai";

// Single project tile; keeps AI analysis inline and bubbles image clicks to the lightbox
const ProjectCard = ({ project, theme, onSelect, onImageClick }) => {
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const analyzeStack = async () => {
    if (aiAnalysis) return;
    setIsLoading(true);
    const prompt = `
      Briefly explain the technical architecture of a project titled "${project.title}" that uses this tech stack: ${project.tech.join(
        ", "
      )}. 
      The project description is: "${project.desc}". 
      Explain how these specific technologies likely interact (e.g. how Flask works with Docker here).
      Keep it to 2 concise sentences. Start with "Technically, this stack..."
    `;
    const response = await callGeminiAPI(
      prompt,
      "You are a senior software architect explaining tech stacks."
    );
    setAiAnalysis(response);
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      className={`group relative flex flex-col h-full min-h-[500px] md:min-h-[580px] rounded-2xl overflow-hidden border ${theme.border} ${theme.cardBg} shadow-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all duration-500 cursor-pointer w-full`}
      onClick={() => onSelect && onSelect(project)}
      role="article"
      aria-label={`Project card for ${project.title}`}
    >
      <div className="relative h-56 overflow-hidden cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
          width="800"
          height="320"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
            onClick={(e) => {
              e.stopPropagation();
              if (onImageClick) onImageClick([project.image, ...(project.gallery || [])], 0);
            }}
        />
        <div className="absolute bottom-4 left-6 z-20">
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-2 rounded-lg ${theme.accentBg} text-white shadow-lg`}>
              <Code size={16} />
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
              {project.tech[0]}
            </span>
          </div>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow relative">
        <h3 className={`text-2xl font-bold ${theme.text} group-hover:${theme.accent} transition-colors mb-4`}>
          {project.title}
        </h3>

        <p className={`${theme.textSecondary} text-base mb-6 leading-relaxed flex-grow`}>
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.slice(1).map((t) => (
            <span
              key={t}
              className={`px-3 py-1 text-xs font-mono ${
                theme.bg === "bg-slate-50" ? "bg-slate-200 text-slate-700" : "bg-gray-800 text-gray-300"
              } rounded-full border ${theme.border}`}
            >
              {t}
            </span>
          ))}
        </div>

        <div className={`mt-auto pt-4 border-t ${theme.border}`}>
          {!aiAnalysis ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                analyzeStack();
              }}
              disabled={isLoading}
              aria-label={`Analyze tech stack for ${project.title}`}
              className={`w-full py-2 flex items-center justify-center gap-2 text-xs font-bold rounded-lg ${
                theme.bg === "bg-slate-50" ? "bg-slate-100 hover:bg-slate-200" : "bg-white/5 hover:bg-white/10"
              } ${theme.accent} transition-all`}
            >
              {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
              {isLoading ? "Analyzing Architecture..." : "AI: Analyze Tech Stack"}
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className={`text-xs ${theme.accent} p-4 rounded-xl border ${theme.border} bg-gradient-to-br ${
                theme.name === "Executive Trust" ? "from-indigo-50 to-white" : "from-blue-900/20 to-gray-900"
              }`}
            >
              <div className="flex items-center gap-2 mb-2 font-bold border-b border-current pb-2 border-opacity-20">
                <Bot size={14} /> Architect's Insight:
              </div>
              {aiAnalysis}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
