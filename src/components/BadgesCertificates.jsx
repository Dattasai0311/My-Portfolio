import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, ExternalLink, X } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { portfolioData } from "../data/portfolio";

const BadgesCertificates = ({ theme }) => {
  const items = portfolioData.badgesAndCertificates || [];
  const isProfessional = theme.name === "Executive Trust";
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="badges-certificates"
      className={`py-24 ${isProfessional ? "bg-slate-100" : "bg-black"} ${theme.text}`}
    >
      <div className="container mx-auto px-6">
        <SectionHeader title="Badges and Certificates" theme={theme} />

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-8 ${theme.cardBg} rounded-2xl border ${theme.border} text-center`}
          >
            <Award size={28} className={`mx-auto mb-3 ${theme.accent}`} />
            <p className={`${theme.textSecondary}`}>
              Add your first badge or certificate in <code>src/data/portfolio.js</code>.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`group cursor-pointer text-left ${index === 3 ? "md:col-start-2" : ""}`}
                onClick={() => setSelected(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full aspect-square object-contain rounded-xl transition-transform duration-300 group-hover:scale-105`}
                  style={{ transform: item.issuer?.includes("Cisco") ? "scale(0.64)" : "scale(0.8)" }}
                  loading="lazy"
                />
                <h3 className={`text-sm md:text-base font-bold ${theme.text} mt-3 text-center`}>{item.title}</h3>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md p-4 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-4xl rounded-2xl border ${theme.border} ${
                isProfessional ? "bg-white/45 border-white/50" : "bg-slate-900/45 border-white/20"
              } backdrop-blur-2xl p-6 md:p-8 relative shadow-[0_20px_60px_rgba(0,0,0,0.45)]`}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                aria-label="Close badge details"
              >
                <X size={18} />
              </button>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className={`w-full rounded-xl border ${theme.border} object-cover`}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Award size={18} className={theme.accent} />
                    <h3 className={`text-xl font-bold ${theme.text}`}>{selected.title}</h3>
                  </div>

                  <div className={`text-sm ${theme.textSecondary} mb-4`}>
                    {selected.issuer || "Issuer not specified"} {selected.date ? `• ${selected.date}` : ""}
                  </div>

                  <div className={`w-24 rounded-lg border ${theme.border} p-1 mb-4`}>
                    <img
                      src={selected.image}
                      alt={`${selected.title} thumbnail`}
                      className="w-full h-auto rounded object-cover"
                    />
                  </div>

                  <h4 className={`font-semibold ${theme.text} mb-2`}>Skills Acquired</h4>
                  <p className={`text-sm ${theme.textSecondary} mb-6`}>
                    {Array.isArray(selected.skills) ? selected.skills.join(", ") : selected.skills || "Not specified"}
                  </p>

                  <a
                    href={selected.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-opacity ${
                      selected.link
                        ? `${theme.accentBg} text-white hover:opacity-90`
                        : "bg-gray-500/40 text-gray-200 pointer-events-none"
                    }`}
                  >
                    Verify Authenticity <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BadgesCertificates;
