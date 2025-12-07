import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { portfolioData } from "../data/portfolio";

const Footer = ({ theme }) => (
  <footer id="contact" className={`bg-black py-12 border-t ${theme.border}`}>
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="container mx-auto px-6 text-center"
    >
      <h3 className="text-2xl font-bold text-white mb-8">Ready to collaborate?</h3>
      <p className="text-gray-400 mb-8 max-w-lg mx-auto">
        I'm always open to discussing new machine learning projects or cloud architecture opportunities.
      </p>
      <div className="flex justify-center mb-10">
        <a
          href={`mailto:${portfolioData.contact.email}`}
          className="px-5 py-2.5 rounded-full border border-white/30 text-white font-bold text-sm shadow-lg hover:bg-white/10 transition-colors"
        >
          Contact Me
        </a>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8 text-gray-300">
        <a
          href={`mailto:${portfolioData.contact.email}`}
          className="flex items-center gap-2 hover:text-white transition-colors"
        >
          <Mail size={18} /> {portfolioData.contact.email}
        </a>
        <span className="hidden md:block">|</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/datta-sai-adithya-vinjamuri-647837190"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
      <p className="text-gray-600 text-sm">
        © {new Date().getFullYear()} Datta Sai Adithya. All rights reserved. <br />
        Built with React, Tailwind & Framer Motion.
      </p>
    </motion.div>
  </footer>
);

export default Footer;
