import { motion } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { portfolioData } from "../data/portfolio";

const PastPublications = ({ theme }) => {
  const publications = portfolioData.pastPublications || [];
  const isProfessional = theme.name === "Executive Trust";

  return (
    <section
      id="past-publications"
      className={`py-24 ${isProfessional ? "bg-slate-100" : "bg-black"} ${theme.text}`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader title="Past Publications" theme={theme} />

        <div className="space-y-6">
          {publications.map((pub, index) => (
            <motion.article
              key={pub.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`rounded-2xl border ${
                isProfessional ? "bg-white/45 border-white/50" : "bg-slate-900/45 border-white/20"
              } backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-6`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3">
                  <BookOpen size={18} className={`${theme.accent} mt-1`} />
                  <div>
                    <h3 className={`text-lg sm:text-xl font-bold ${theme.text}`}>{pub.title}</h3>
                    <p className={`text-sm ${theme.textSecondary} mt-1`}>
                      {pub.venue || "Venue not specified"}
                    </p>
                    {pub.keywords && (
                      <p className={`text-sm ${theme.textSecondary} mt-2`}>
                        <span className="font-semibold">Keywords:</span> {pub.keywords}
                      </p>
                    )}
                  </div>
                </div>
                <span className={`text-xs font-mono ${theme.textSecondary}`}>{pub.year}</span>
              </div>

              {pub.description && <p className={`${theme.textSecondary} text-sm sm:text-base mb-4`}>{pub.description}</p>}

              {pub.link && (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-sm font-semibold ${theme.accent}`}
                >
                  View publication <ExternalLink size={14} />
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastPublications;
