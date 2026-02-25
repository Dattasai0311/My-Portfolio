import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageSquare, Send, X } from "lucide-react";
import { callGeminiAPI } from "../utils/ai";
import { ResponseFormatter } from "../utils/format.jsx";

const ChatWidget = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: `Hi! I'm Datta's virtual assistant. Ask me about his projects, AWS skills, or education!` }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

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
    } catch (_err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Sorry, I'm having trouble connecting to the server." }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 ${theme.accentBg} text-white rounded-full shadow-lg flex items-center justify-center`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-24 right-6 w-80 md:w-96 h-[500px] ${theme.cardBg} border ${theme.border} rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden`}
          >
            <div
              className={`p-4 ${theme.name === "Executive Trust" ? "bg-slate-100" : "bg-gray-800"} border-b ${theme.border} flex items-center gap-3`}
            >
              <div className={`w-8 h-8 rounded-full ${theme.accentBg} bg-opacity-20 flex items-center justify-center ${theme.accent}`}>
                <Bot size={18} />
              </div>
              <div>
                <h3 className={`font-bold ${theme.text} text-sm`}>Datta's Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className={`text-xs ${theme.textSecondary}`}>Powered by Gemini</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? `${theme.accentBg} text-white rounded-br-none`
                        : `${
                            theme.name === "Executive Trust" ? "bg-slate-100 text-slate-800" : "bg-gray-800 text-gray-200"
                          } rounded-bl-none`
                    }`}
                  >
                    <ResponseFormatter text={msg.text} theme={theme} />
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div
                    className={`p-3 rounded-2xl rounded-bl-none flex gap-1 ${
                      theme.name === "Executive Trust" ? "bg-slate-100" : "bg-gray-800"
                    }`}
                  >
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75" />
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className={`p-4 border-t ${theme.border} ${theme.cardBg}`}>
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my resume..."
                  className={`w-full ${
                    theme.name === "Executive Trust" ? "bg-slate-100 text-slate-900" : "bg-gray-800 text-white"
                  } text-sm rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 ${theme.accent} hover:opacity-80 transition-colors disabled:opacity-50`}
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
