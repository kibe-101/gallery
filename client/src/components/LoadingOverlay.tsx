import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const statusMessages = [
  "Calibrating optics",
  "Loading aerial frames", 
  "Synchronizing camera arrays",
  "Mapping spatial depth",
  "Preparing cinematic environment"
];

interface LoadingOverlayProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

export function LoadingOverlay({ isLoading, onLoadingComplete }: LoadingOverlayProps) {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [showReticle, setShowReticle] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Cycle through status messages
  useEffect(() => {
    if (!isLoading || isComplete) return;

    const interval = setInterval(() => {
      setCurrentStatusIndex((prev) => (prev + 1) % statusMessages.length);
    }, 800);

    return () => clearInterval(interval);
  }, [isLoading, isComplete]);

  // Handle loading completion sequence
  useEffect(() => {
    if (!isLoading && !isComplete) {
      // Start focus lock sequence
      setShowReticle(true);
      
      // After reticle animation, complete the sequence
      const timer = setTimeout(() => {
        setIsComplete(true);
        setTimeout(onLoadingComplete, 600); // Wait for fade out
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isLoading, isComplete, onLoadingComplete]);

  return (
    <AnimatePresence>
      {(isLoading || !isComplete) && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] overflow-hidden"
        >
          {/* Background with gradient and effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#050507] via-[#070709] to-[#0a0a0f]">
            {/* Subtle animated gradient overlay */}
            <motion.div
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 20%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)"
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 opacity-30"
            />
            
            {/* Vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40" />
          </div>

          {/* Slow zoom effect */}
          <motion.div
            initial={{ scale: 0.98 }}
            animate={{ scale: 1.00 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="relative h-full flex items-center justify-center"
          >
            {/* Center content container */}
            <div className="relative z-10 text-center px-4">
              {/* Liquid glass card - mobile responsive */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="px-6 py-8 md:px-16 md:py-12 rounded-2xl md:rounded-3xl backdrop-blur-2xl bg-white/[0.08] border border-white/20 shadow-2xl shadow-black/40 relative overflow-hidden max-w-sm mx-auto md:max-w-none"
              >
                {/* Animated border glow */}
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                      "linear-gradient(225deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                      "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 opacity-60"
                />
                
                {/* Subtle glow */}
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-40" />
                
                <div className="relative z-10">
                  {/* Company name with responsive typography */}
                  <motion.h1
                    initial={{ opacity: 0, filter: "blur(10px)", letterSpacing: "0.5em" }}
                    animate={{ opacity: 1, filter: "blur(0px)", letterSpacing: "0.2em" }}
                    transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin tracking-[0.15em] md:tracking-[0.2em] text-white mb-4 md:mb-6 font-display leading-tight"
                  >
                    ESTATE<br className="md:hidden" />AERIAL
                  </motion.h1>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="text-xs sm:text-sm md:text-sm text-white/60 font-mono uppercase tracking-widest mb-2"
                  >
                    CO.
                  </motion.div>
                  
                  {/* Initial status */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.6 }}
                    className="text-xs sm:text-sm md:text-sm text-white/50 font-mono uppercase tracking-widest mb-6 md:mb-10 mt-4"
                  >
                    Initializing visual systems…
                  </motion.p>

                  {/* Enhanced cinematic scan bar - mobile responsive */}
                  <div className="mb-6 md:mb-8">
                    <div className="relative w-[200px] sm:w-[260px] md:w-[320px] h-[2px] mx-auto bg-white/10 rounded-full overflow-hidden">
                      {/* Ambient glow */}
                      <motion.div
                        animate={{
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm"
                      />
                      
                      {/* Scanning bar */}
                      <motion.div
                        initial={{ x: -200 }}
                        animate={{ x: 200 }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute top-0 left-0 w-[60px] sm:w-[70px] md:w-[80px] h-full bg-gradient-to-r from-transparent via-white to-transparent rounded-full"
                      >
                        {/* Bright center with glow */}
                        <div className="absolute inset-0 bg-white shadow-lg shadow-white/80 blur-sm" />
                        <div className="absolute inset-0 bg-white" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Enhanced status message - mobile responsive */}
                  <motion.div
                    key={currentStatusIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="text-xs sm:text-xs md:text-xs text-white/40 font-mono uppercase tracking-widest px-2"
                  >
                    {statusMessages[currentStatusIndex]}
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Focus lock reticle - mobile responsive */}
            <AnimatePresence>
              {showReticle && (
                <motion.div
                  initial={{ opacity: 0, scale: 2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  {/* Crosshair reticle */}
                  <div className="relative">
                    {/* Outer ring */}
                    <motion.div
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.6 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border border-white/30 rounded-full"
                    />
                    
                    {/* Inner ring */}
                    <motion.div
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.8 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="absolute inset-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border border-white/50 rounded-full"
                    />
                    
                    {/* Center dot */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"
                    />
                    
                    {/* Flash effect */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0.8 }}
                      animate={{ scale: 4, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="absolute inset-0 w-2 h-2 bg-white rounded-full"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Add CSS for radial gradient
const style = document.createElement('style');
style.textContent = `
  .bg-radial-gradient {
    background: radial-gradient(circle at center, transparent 0%, transparent 60%, rgba(0,0,0,0.4) 100%);
  }
`;
document.head.appendChild(style);
