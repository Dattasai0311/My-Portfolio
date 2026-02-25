import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Layers, Sparkles, X } from "lucide-react";
import SectionHeader from "./SectionHeader";
import ProjectCard from "./projects/ProjectCard";
import { portfolioData } from "../data/portfolio";

const ProjectModal = ({ project, theme, onClose, onImageClick }) => {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastFocusedRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    lastFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const timer = window.setTimeout(() => closeBtnRef.current?.focus(), 0);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
      lastFocusedRef.current?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  const openImages = (imagesArray, startIndex = 0) => {
    if (!onImageClick) return;
    const imgs = Array.isArray(imagesArray) ? imagesArray : [imagesArray];
    onImageClick(imgs, startIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border ${
          theme.name === "Executive Trust" ? "bg-white/45 border-white/50" : "bg-slate-900/45 border-white/20"
        } backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] relative scrollbar-hide`}
      >
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
          aria-label="Close project details"
        >
          <X size={24} />
        </button>

        <div className="relative h-64 md:h-80 w-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => openImages([project.image, ...(project.gallery || [])], 0)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
          <div className="absolute bottom-6 left-6 md:left-10">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${theme.accentBg} text-white`}>
                Project Details
              </span>
            </div>
            <h2 id="project-modal-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {project.title}
            </h2>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-10">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className={`text-xl font-bold ${theme.text} mb-4 flex items-center gap-2`}>
                  <Layers size={20} className={theme.accent} /> Overview
                </h3>
                <p className={`${theme.textSecondary} leading-relaxed text-sm sm:text-base`}>
                  {project.details || project.desc}
                </p>
              </div>

              {project.features && (
                <div>
                  <h3 className={`text-xl font-bold ${theme.text} mb-4 flex items-center gap-2`}>
                    <Sparkles size={20} className={theme.accent} /> Key Features
                  </h3>
                  <ul className="space-y-3">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className={`flex items-start gap-3 ${theme.textSecondary}`}>
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${theme.accentBg} shrink-0`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.gallery && (
                <div>
                  <h3 className={`text-xl font-bold ${theme.text} mb-4`}>Interface Gallery</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {project.gallery.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="Gallery"
                        onClick={() => openImages([project.image, ...(project.gallery || [])], idx + 1)}
                        className={`rounded-lg border ${theme.border} hover:opacity-90 transition-opacity cursor-pointer object-cover w-full h-full`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div
                className={`p-6 rounded-xl border ${theme.border} ${
                  theme.bg === "bg-gray-950" || theme.bg === "bg-black" ? "bg-white/5" : "bg-slate-50"
                }`}
              >
                <h4 className={`text-sm font-bold ${theme.text} uppercase tracking-wider mb-4`}>Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className={`px-3 py-1 text-xs font-mono rounded-lg border ${theme.border} ${theme.textSecondary} bg-transparent`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
// Simple fade/slide variants for carousel transitions
const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 30 : -30,
    scale: 0.995
  }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -30 : 30,
    scale: 0.995
  })
};

const Projects = ({ theme }) => {
  // Keep a stable reference to project data for carousel operations
  const projects = useMemo(() => portfolioData.projects, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightbox, setLightbox] = useState(null); // { images: string[], index: number }
  const lightboxRef = useRef(null);
  const lightboxLastFocusedRef = useRef(null);

  useEffect(() => {
    if (!lightbox) return undefined;
    lightboxLastFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const timer = window.setTimeout(() => lightboxRef.current?.focus(), 0);

    const handleLightboxKeyDown = (e) => {
      if (e.key === "Escape") {
        setLightbox(null);
        return;
      }
      if (e.key === "ArrowLeft") {
        setLightbox((prev) =>
          prev
            ? {
                images: prev.images,
                index: (prev.index - 1 + prev.images.length) % prev.images.length
              }
            : prev
        );
        return;
      }
      if (e.key === "ArrowRight") {
        setLightbox((prev) =>
          prev
            ? {
                images: prev.images,
                index: (prev.index + 1) % prev.images.length
              }
            : prev
        );
        return;
      }
      if (e.key !== "Tab" || !lightboxRef.current) return;

      const focusable = lightboxRef.current.querySelectorAll(
        'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleLightboxKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", handleLightboxKeyDown);
      lightboxLastFocusedRef.current?.focus();
    };
  }, [lightbox]);

  const nextIndex = (activeIndex + 1) % projects.length;
  const prevIndex = (activeIndex - 1 + projects.length) % projects.length;

  // Step carousel index forward/backward and remember direction for animations
  const paginate = (dir) => {
    setDirection(dir);
    setActiveIndex((prev) => (prev + dir + projects.length) % projects.length);
  };

  const surface =
    theme.name === "Executive Trust" ? "bg-white/70 backdrop-blur-xl" : "bg-black/60 backdrop-blur-xl";

  const handleDragEnd = (_, info) => {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    const threshold = 120;
    if (swipe < -threshold) paginate(1);
    if (swipe > threshold) paginate(-1);
  };

  return (
    <section id="projects" className={`py-24 ${theme.text}`}>
      <div className={`container mx-auto px-6 ${surface}`}>
        <SectionHeader title="Featured Projects" theme={theme} />

        <div className="relative flex items-center justify-center md:h-[640px] h-[560px] px-2 sm:px-4">
          <button
            onClick={() => paginate(-1)}
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg items-center justify-center hover:scale-105 transition-transform"
            aria-label="Previous project"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="relative w-full flex items-center justify-center gap-4 sm:gap-8 overflow-hidden h-full">
            <div className="hidden lg:block w-[35%] h-full">
              <motion.div
                key={`prev-${projects[prevIndex].id}`}
                className="pointer-events-none h-full"
                initial={{ opacity: 0.25, scale: 0.9, x: -20 }}
                animate={{ opacity: 0.35, scale: 0.92, x: 0 }}
                transition={{ duration: 0.4 }}
                style={{ filter: "blur(6px)" }}
              >
                <ProjectCard project={projects[prevIndex]} theme={theme} />
              </motion.div>
            </div>

            <div className="w-full max-w-4xl h-full flex items-center justify-center px-2">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={projects[activeIndex].id}
                  className="w-full"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.9 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.08}
                  dragMomentum={false}
                  onDragEnd={handleDragEnd}
                  whileHover={{ scale: 1.002 }}
                  style={{ perspective: 1200 }}
                >
                  <ProjectCard
                    project={projects[activeIndex]}
                    theme={theme}
                    onSelect={setSelectedProject}
                    onImageClick={(images, idx) => setLightbox({ images, index: idx })}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="hidden lg:block w-[35%] h-full">
              <motion.div
                key={`next-${projects[nextIndex].id}`}
                className="pointer-events-none h-full"
                initial={{ opacity: 0.25, scale: 0.9, x: 20 }}
                animate={{ opacity: 0.35, scale: 0.92, x: 0 }}
                transition={{ duration: 0.4 }}
                style={{ filter: "blur(6px)" }}
              >
                <ProjectCard
                  project={projects[nextIndex]}
                  theme={theme}
                  onSelect={setSelectedProject}
                  onImageClick={(images, idx) => setLightbox({ images, index: idx })}
                />
              </motion.div>
            </div>
          </div>

          <button
            onClick={() => paginate(1)}
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg items-center justify-center hover:scale-105 transition-transform"
            aria-label="Next project"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            theme={theme}
            onClose={() => setSelectedProject(null)}
            onImageClick={(images, idx) => {
              const imgs = Array.isArray(images) ? images : [images];
              setLightbox({ images: imgs, index: idx ?? 0 });
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {lightbox && Array.isArray(lightbox.images) && lightbox.images.length > 0 && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Project image viewer"
            tabIndex={0}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((prev) =>
                  prev
                    ? {
                        images: prev.images,
                        index: (prev.index - 1 + prev.images.length) % prev.images.length
                      }
                    : prev
                );
              }}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition flex"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
            <motion.img
              key={`${lightbox.index}-${lightbox.images[lightbox.index]}`}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={lightbox.images[lightbox.index]}
              alt="Project preview"
              className="max-h-[85vh] max-w-5xl w-auto object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((prev) =>
                  prev
                    ? {
                        images: prev.images,
                        index: (prev.index + 1) % prev.images.length
                      }
                    : prev
                );
              }}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition flex"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
              aria-label="Close image viewer"
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
