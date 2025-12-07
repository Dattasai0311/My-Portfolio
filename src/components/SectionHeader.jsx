import { motion } from "framer-motion";

const SectionHeader = ({ title, theme }) => (
  <div className="mb-12">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-4xl font-bold ${theme.text} mb-2`}
    >
      {title}
    </motion.h2>
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: 60 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className={`h-1 ${theme.accentBg} rounded-full`}
    />
  </div>
);

export default SectionHeader;
