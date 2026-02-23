import { ReactLenis } from "@studio-freight/react-lenis";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { useProjects } from "@/hooks/use-projects";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Work() {
  const { data: projects, isLoading } = useProjects();

  // Fallback data if API is empty
  const dummyProjects = [
    {
      id: 1,
      title: "Neon Horizon",
      category: "Drone Cinematography",
      description: "Night aerials capturing the pulse of Tokyo.",
      imageUrl: "/IMG_1282.PNG"
    },
    {
      id: 2,
      title: "Concrete Dreams",
      category: "Architecture",
      description: "Brutalist structures reimagined through light.",
      imageUrl: "/IMG_1283.PNG"
    },
    {
      id: 3,
      title: "Arctic Silence",
      category: "360° Experience",
      description: "VR journey through Icelandic glaciers.",
      imageUrl: "/IMG_0896.PNG"
    },
    {
      id: 4,
      title: "Vertical Forest",
      category: "Photography",
      description: "Documenting sustainable high-rise living.",
      imageUrl: "/IMG_1281.PNG"
    }
  ];

  const displayProjects = projects?.length ? projects : dummyProjects;

  return (
    <ReactLenis root>
      <div className="bg-background min-h-screen text-foreground">
        <Navigation />
        
        <div className="pt-40 pb-20 container mx-auto px-6">
          <SectionHeading title="Selected Works" subtitle="Archive 2024-2025" />
          
          <div className="flex flex-col gap-24 md:gap-40">
            {isLoading ? (
              <div className="text-white/30 font-mono animate-pulse">Loading archive...</div>
            ) : (
              displayProjects.map((project, index) => (
                <ProjectItem key={project.id} project={project} index={index} />
              ))
            )}
          </div>
        </div>
        <Footer />
      </div>
    </ReactLenis>
  );
}

function ProjectItem({ project, index }: { project: any, index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center group`}
    >
      <div className="w-full md:w-2/3 overflow-hidden relative aspect-video">
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
        />
      </div>

      <div className="w-full md:w-1/3 space-y-6">
        <div className="border-t border-white/20 pt-6">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-foreground block mb-2">0{index + 1} / {project.category}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">{project.title}</h2>
          <p className="text-white/50 leading-relaxed font-light">{project.description}</p>
        </div>
        
        <button className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-white/80 hover:text-white transition-colors group/btn">
          View Case Study 
          <ArrowUpRight className="w-4 h-4 transform transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
        </button>
      </div>
    </motion.div>
  );
}
