import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

const galleryImages = [
  {
    id: 1,
    url: "/IMG_0220.jpg",
    title: "Modern Architecture",
    category: "Architecture"
  },
  {
    id: 2,
    url: "/IMG_0237.jpg",
    title: "Luxury Interior",
    category: "Interior"
  },
  {
    id: 3,
    url: "/IMG_0675.jpg",
    title: "Mountain Estate",
    category: "Aerial"
  },
  {
    id: 4,
    url: "/IMG_0773.jpg",
    title: "Ocean View Villa",
    category: "Aerial"
  },
  {
    id: 5,
    url: "/IMG_1141.jpg",
    title: "Contemporary Design",
    category: "Architecture"
  },
  {
    id: 6,
    url: "/IMG_1143.jpg",
    title: "Forest Retreat",
    category: "Aerial"
  },
  {
    id: 7,
    url: "/IMG_1307.jpg",
    title: "Urban Skyline",
    category: "Aerial"
  },
  {
    id: 8,
    url: "/IMG_1308.jpg",
    title: "Desert Modern",
    category: "Architecture"
  },
  {
    id: 9,
    url: "/IMG_1318.jpg",
    title: "Minimalist Space",
    category: "Interior"
  },
  {
    id: 10,
    url: "/IMG_1772.jpg",
    title: "Coastal Luxury",
    category: "Aerial"
  },
  {
    id: 11,
    url: "/IMG_2611.jpg",
    title: "Glass Pavilion",
    category: "Architecture"
  },
  {
    id: 12,
    url: "/IMG_1281.PNG",
    title: "Sky Garden",
    category: "Interior"
  },
  {
    id: 13,
    url: "/IMG_2613.jpg",
    title: "Island Paradise",
    category: "Aerial"
  },
  {
    id: 14,
    url: "/IMG_4042.jpg",
    title: "Grand Entrance",
    category: "Architecture"
  },
  {
    id: 15,
    url: "/IMG_4793.jpg",
    title: "Sunset Estate",
    category: "Aerial"
  }
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextLightbox = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevLightbox = () => {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-white/20 selection:text-white overflow-hidden">
      <Navigation />

      {/* HERO SECTION */}
      <section className="relative py-32 px-6">
        <div className="container mx-auto text-center">
          <SectionHeading title="Visual Gallery" subtitle="Portfolio" align="center" />
          <p className="mt-8 text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            A curated collection of our finest aerial cinematography, architectural photography, and immersive visual experiences.
          </p>
        </div>
      </section>

      {/* MAIN CAROUSEL */}
      <section className="relative py-16 px-6">
        <div className="container mx-auto">
          <div className="relative max-w-6xl mx-auto">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
              <AnimatePresence>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative w-full h-full group cursor-pointer"
                  onClick={() => openLightbox(currentIndex)}
                >
                  {/* 3D Frame effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <img
                    src={galleryImages[currentIndex].url}
                    alt={galleryImages[currentIndex].title}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Overlay with info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-white text-2xl font-display font-semibold mb-2">
                        {galleryImages[currentIndex].title}
                      </h3>
                      <p className="text-white/70 font-mono text-sm uppercase tracking-widest">
                        {galleryImages[currentIndex].category}
                      </p>
                    </div>
                  </div>

                  {/* Zoom indicator */}
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md rounded-full p-3 text-white hover:bg-black/60 transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md rounded-full p-3 text-white hover:bg-black/60 transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Enhanced thumbnail strip */}
            <div className="mt-12 relative">
              {/* Gradient fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black/50 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black/50 to-transparent z-10 pointer-events-none" />
              
              <div className="flex gap-3 overflow-x-auto pb-6 px-4 scrollbar-hide">
                {galleryImages.map((image, index) => (
                  <motion.button
                    key={image.id}
                    onClick={() => setCurrentIndex(index)}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 relative group",
                      index === currentIndex
                        ? "border-white/50 scale-110 shadow-2xl shadow-white/20 ring-2 ring-white/30 ring-offset-2 ring-offset-black/50"
                        : "border-white/20 hover:border-white/40 hover:shadow-xl hover:shadow-white/10"
                    )}
                  >
                    {/* Image overlay effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Active indicator */}
                    {index === currentIndex && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 border-2 border-white/50 rounded-2xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transform transition-transform duration-200 group-hover:scale-110"
                    />
                    
                    {/* Image number badge */}
                    <div className="absolute top-2 left-2 w-6 h-6 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-[10px] text-white font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {index + 1}
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Navigation dots below thumbnails */}
              <div className="flex justify-center gap-2 mt-4">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      index === currentIndex
                        ? "w-8 bg-white shadow-lg shadow-white/30"
                        : "bg-white/30 hover:bg-white/50 hover:w-4"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-7xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[lightboxIndex].url}
                alt={galleryImages[lightboxIndex].title}
                className="w-full h-full object-contain rounded-2xl"
              />

              {/* Lightbox controls */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-full p-2 text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={prevLightbox}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-md rounded-full p-3 text-white hover:bg-black/80 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextLightbox}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-md rounded-full p-3 text-white hover:bg-black/80 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image info */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <h3 className="text-white text-xl font-display font-semibold mb-1">
                  {galleryImages[lightboxIndex].title}
                </h3>
                <p className="text-white/70 font-mono text-sm uppercase tracking-widest">
                  {galleryImages[lightboxIndex].category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

// Add CSS for custom scrollbar
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(style);
