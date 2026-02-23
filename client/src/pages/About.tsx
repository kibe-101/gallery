import { ReactLenis } from "@studio-freight/react-lenis";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
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
                src="/IMG_0773.jpg" 
                alt="Estate Aerial Architecture" 
                className="w-full h-[80vh] object-cover grayscale opacity-80"
                loading="lazy"
              />
            </motion.div>

            <div className="flex flex-col justify-center">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-8"
              >
                Estate Aerial Co.
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] text-white mb-12"
              >
                CAPTURING <br />
                <span className="text-white/30">SPATIAL</span> <br />
                STORIES.
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="space-y-8 text-white/60 font-light leading-relaxed text-lg"
              >
                <p>
                  Estate Aerial Co. creates visual content that transcends traditional property documentation. We specialize in capturing architecture, interiors, and design through a cinematic lens, combining aerial perspectives, immersive 360° experiences, and refined photography to tell compelling spatial stories.
                </p>
                <p>
                  Our work goes beyond the structure. We're drawn to the details, textures, patterns, colors, and the subtle interplay of light that defines a space. We capture not just what a place looks like, but how it feels, translating atmosphere and emotion into every frame.
                </p>
                <p>
                  From construction documentation to marketing luxury spaces, we deliver imagery that resonates with discerning audiences. Our approach is rooted in storytelling: every frame is composed to highlight detail, context, and atmosphere.
                </p>
                <p>
                  We work with architects, designers, developers, and property owners who understand that exceptional spaces deserve exceptional documentation.
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
        <Footer />
      </div>
    </ReactLenis>
  );
}
