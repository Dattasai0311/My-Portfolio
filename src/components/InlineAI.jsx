import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Sparkles } from "lucide-react";
import { callGeminiAPI } from "../utils/ai";
import { ResponseFormatter } from "../utils/format.jsx";

const InlineAI = ({ theme }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await callGeminiAPI(userMsg);
      setMessages((prev) => [...prev, { role: "ai", text: response }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "ai", text: "Connection failed." }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Triggers an interview-style question from the model
  const startChallenge = async () => {
    const prompt = `Generate a challenging interview question for a Machine Learning Engineer with expertise in Python, AWS SageMaker, and Random Forest models. Do not answer it yet.`;
    setMessages((prev) => [...prev, { role: "user", text: "✨ Challenge Me" }]);
    setIsTyping(true);
    try {
      const response = await callGeminiAPI(prompt, "You are a tough technical interviewer.");
      setMessages((prev) => [...prev, { role: "ai", text: response }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section
      id="chat-section"
      className={`py-24 ${theme.bg === "bg-slate-50" ? "bg-white" : "bg-gray-900"} border-t ${theme.border}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 max-w-4xl"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className={`w-16 h-16 ${theme.accentBg} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 ${theme.accent}`}
          >
            <BrainCircuit size={32} />
          </motion.div>
          <h2 className={`text-3xl font-bold ${theme.text} mb-4`}>Interrogate the Database</h2>
          <p className={`${theme.textSecondary}`}>
            Use the terminal below to ask specific questions, or challenge your own knowledge.
          </p>
        </div>

        <div className="bg-black border border-gray-800 rounded-lg overflow-hidden shadow-2xl font-mono text-sm md:text-base">
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-gray-400 text-xs">datta_portfolio_ai -- -bash</span>
            </div>
            <button
              onClick={startChallenge}
              className="flex items-center gap-2 text-xs text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              <Sparkles size={12} /> Challenge Me
            </button>
          </div>

          <div className="p-6 h-[400px] overflow-y-auto space-y-4">
            <div className="text-gray-400">
              Last login: {new Date().toDateString()} on ttys001 <br />
              Gemini v1.5 [Connected] <br />
              Type "help" for assistance.
            </div>

            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 mb-4 ${msg.role === "ai" ? theme.accent : theme.terminalText}`}>
                <span className="opacity-50 shrink-0 mt-1 font-mono select-none">
                  {msg.role === "user" ? ">" : "$"}
                </span>
                <div className="flex-grow overflow-hidden">
                  <ResponseFormatter text={msg.text} theme={theme} />
                </div>
              </div>
            ))}

            {isTyping && (
              <div className={`flex gap-3 ${theme.accent}`}>
                <span className="opacity-50 mt-1 select-none">$</span>
                <span className="animate-pulse">Processing query...</span>
              </div>
            )}

            <form
              onSubmit={handleSend}
              className={`flex gap-2 ${theme.terminalText} mt-4 border-t border-gray-800 pt-4`}
            >
              <span className="animate-pulse">{">"}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`bg-transparent border-none outline-none flex-grow ${theme.terminalText} placeholder-gray-600`}
                placeholder="Ask a question..."
              />
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default InlineAI;
