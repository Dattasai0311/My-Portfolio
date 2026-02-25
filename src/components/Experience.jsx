import { motion } from "framer-motion";
import { Briefcase, User } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { portfolioData } from "../data/portfolio";

const Experience = ({ theme }) => (
  <section
    id="experience"
    className={`py-24 ${theme.name === "Executive Trust" ? "bg-slate-100" : "bg-black"} ${
      theme.text
    } relative`}
  >
    <div className="container mx-auto px-4 sm:px-6">
      <SectionHeader title="Experience & Education" theme={theme} />

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className={`text-xl font-bold ${theme.textSecondary} mb-8 flex items-center gap-2`}>
            <Briefcase size={20} /> Work History
          </h3>
          <div className={`relative border-l-2 ${theme.border} ml-4 space-y-12`}>
            {portfolioData.experience.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative pl-8"
              >
                <div
                  className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${theme.accentBg} border-4 ${
                    theme.name === "Executive Trust" ? "border-slate-100" : "border-black"
                  }`}
                />

                <h3 className={`text-lg font-bold ${theme.text}`}>{job.role}</h3>
                <div className={`${theme.accent} font-mono text-sm mb-1`}>{job.company}</div>
                <div className={`text-xs ${theme.textSecondary} font-mono mb-4`}>{job.period}</div>
                <p className={`${theme.textSecondary} leading-relaxed`}>{job.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className={`text-xl font-bold ${theme.textSecondary} mb-8 flex items-center gap-2`}>
            <User size={20} /> Education
          </h3>
          <div className="space-y-6">
            {portfolioData.education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`p-6 ${theme.cardBg} rounded-xl border ${theme.border} hover:border-opacity-50 transition-colors shadow-sm`}
              >
                <h4 className={`text-lg font-bold ${theme.text} mb-2`}>{edu.school}</h4>
                <div className={`${theme.accent} text-sm mb-2`}>{edu.degree}</div>
                <div className={`flex justify-between text-xs ${theme.textSecondary} font-mono`}>
                  <span>{edu.year}</span>
                  {edu.gpa && <span>GPA: {edu.gpa}</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Experience;
