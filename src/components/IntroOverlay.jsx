import { motion } from "framer-motion";

const IntroOverlay = ({ onContinue, profileImage, name }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onContinue}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black"
    >
      <div className="relative flex flex-col items-center text-center gap-6 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-700/20 to-black opacity-60 blur-3xl" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden ring-4 ring-white/20 shadow-[0_0_80px_20px_rgba(59,130,246,0.35)]">
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-blue-300/80 mb-3">Portfolio</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{name}</h1>
          <div className="mt-6 animate-pulse text-xs text-gray-400">Tap to continue</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IntroOverlay;
