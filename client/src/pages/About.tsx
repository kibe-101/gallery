import { ReactLenis } from "@studio-freight/react-lenis";
import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";

export default function About() {
  return (
    <ReactLenis root>
      <div className="bg-background min-h-screen text-foreground">
        <Navigation />
        
        <div className="container mx-auto px-6 pt-40 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
               {/* Minimal architecture detail */}
              <img 
                src="https://pixabay.com/get/g0c3a9faf93223a9b59a334b2ddded09de200a6c0c63a0f9bd1fbc070cf22ceb9d67b2b4208779a7862f88b07cf0f0868833bf37e52696c82dbb4729c986b840e_1280.jpg" 
                alt="Studio Atmosphere" 
                className="w-full h-[80vh] object-cover grayscale opacity-80"
              />
            </motion.div>

            <div className="flex flex-col justify-center">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-8"
              >
                About The Studio
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] text-white mb-12"
              >
                WE CRAFT <br />
                <span className="text-white/30">CINEMATIC</span> <br />
                REALITIES.
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="space-y-8 text-white/60 font-light leading-relaxed text-lg"
              >
                <p>
                  Aether Studio operates at the intersection of technology and art. We are a collective of cinematographers, drone pilots, and 3D artists dedicated to capturing the world from impossible angles.
                </p>
                <p>
                  Through a cinematic lens, we explore textures, patterns, and light. Our work is not just documentation; it is an interpretation of space and structure. We believe that every environment has a rhythm, and our mission is to visualize it.
                </p>
                <p>
                  Specializing in architectural visualization, immersive 360° experiences, and high-end drone cinematography, we deliver visuals that feel futuristic, technical, and undeniably human.
                </p>
              </motion.div>

              <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <div>
                  <h4 className="font-display text-2xl text-white mb-2">150+</h4>
                  <p className="font-mono text-xs uppercase text-white/40">Projects Completed</p>
                </div>
                <div>
                  <h4 className="font-display text-2xl text-white mb-2">12</h4>
                  <p className="font-mono text-xs uppercase text-white/40">International Awards</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </ReactLenis>
  );
}
