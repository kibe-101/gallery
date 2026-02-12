import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Video, Camera, Box, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { ReactLenis } from "@studio-freight/react-lenis";
import { Navigation } from "@/components/Navigation";
import { GlassButton } from "@/components/GlassButton";
import { SectionHeading } from "@/components/SectionHeading";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <ReactLenis root>
      <div className="bg-background min-h-screen text-foreground selection:bg-white/20 selection:text-white overflow-hidden">
        <Navigation />

        {/* HERO SECTION */}
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="absolute inset-0 z-0"
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />
            
            {/* Cinematic architectural video background */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-60 grayscale-[30%] scale-105"
            >
               {/* Drone footage of modern architecture */}
              <source src="https://player.vimeo.com/external/371836774.sd.mp4?s=d9406450682829b351897d25377f374775d78a87&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
            </video>
          </motion.div>

          <div className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl md:text-8xl lg:text-[10rem] font-medium tracking-tighter text-white leading-[0.85] mb-8 mix-blend-overlay"
            >
              FUTURE <br /> VISIONS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-mono text-sm md:text-base text-white/70 max-w-md uppercase tracking-widest mb-12"
            >
              Cinematic Reality Capture & Digital Environments
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link href="/work">
                <GlassButton>
                  Explore Work
                </GlassButton>
              </Link>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 animate-bounce"
          >
            <ChevronDown size={24} />
          </motion.div>
        </section>

        {/* SERVICES SECTION */}
        <section className="py-32 px-6 container mx-auto">
          <SectionHeading title="Our Expertise" subtitle="Services" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Video className="w-8 h-8" />}
              title="Drone Cinematography"
              description="High-altitude 6K capture for architectural visualization and cinematic productions."
              index={0}
            />
            <ServiceCard 
              icon={<Box className="w-8 h-8" />}
              title="Immersive 360°"
              description="Interactive VR experiences and digital twin generation for remote presence."
              index={1}
            />
            <ServiceCard 
              icon={<Camera className="w-8 h-8" />}
              title="Photography & Film"
              description="Editorial grade photography with a focus on light, texture, and composition."
              index={2}
            />
          </div>
        </section>

        {/* SELECTED WORK PREVIEW */}
        <section className="py-32 bg-zinc-950 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-16">
              <SectionHeading title="Selected Work" subtitle="Portfolio" />
              <Link href="/work">
                <a className="hidden md:flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-white/50 hover:text-white transition-colors pb-24">
                  View All <ArrowRight size={16} />
                </a>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              {/* Project 1 */}
              <WorkCard 
                image="https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=2073&auto=format&fit=crop"
                title="The Glass House"
                category="Architecture"
                index={0}
              />
              {/* Project 2 */}
              <WorkCard 
                image="https://images.unsplash.com/photo-1486739985386-d4fae04ca6f7?q=80&w=2072&auto=format&fit=crop"
                title="Urban Pulse"
                category="Drone"
                index={1}
                className="md:mt-32"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 flex flex-col items-center justify-center border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/[0.02]" />
          <SectionHeading title="Ready to Create?" align="center" />
          <Link href="/contact">
            <GlassButton className="mt-8">Start a Project</GlassButton>
          </Link>
        </section>

      </div>
    </ReactLenis>
  );
}

function ServiceCard({ icon, title, description, index }: { icon: any, title: string, description: string, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="group p-8 border border-white/5 hover:border-white/20 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.04]"
    >
      <div className="mb-6 text-white/60 group-hover:text-white transition-colors">{icon}</div>
      <h3 className="font-display text-2xl font-semibold mb-4 text-white">{title}</h3>
      <p className="text-white/40 leading-relaxed font-light">{description}</p>
    </motion.div>
  );
}

function WorkCard({ image, title, category, index, className }: { image: string, title: string, category: string, index: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      className={cn("group cursor-pointer", className)}
    >
      <div className="overflow-hidden mb-6 aspect-[4/5] md:aspect-[3/4]">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
        />
      </div>
      <div className="flex justify-between items-baseline border-b border-white/10 pb-4 group-hover:border-white/40 transition-colors">
        <h3 className="font-display text-2xl md:text-3xl text-white">{title}</h3>
        <span className="font-mono text-xs uppercase tracking-widest text-white/40">{category}</span>
      </div>
    </motion.div>
  );
}
