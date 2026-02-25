import { motion } from "framer-motion";

const Nav = ({ theme }) => (
  <motion.nav
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.5 }}
    className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-3 sm:px-6 py-3 sm:py-4 backdrop-blur-md ${theme.navBg} border-b ${theme.border}`}
  >
    <div
      className={`text-sm sm:text-xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent max-w-[55vw] sm:max-w-none truncate`}
    >
      Datta Sai Adithya
    </div>
    <a
      href="/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className={`px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-bold ${
        theme.bg === "bg-slate-50" ? "bg-slate-900 text-white" : "bg-white text-black"
      } rounded-full hover:opacity-80 transition-opacity`}
    >
      Resume
    </a>
  </motion.nav>
);

export default Nav;
