import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference text-white"
      >
        <Link href="/">
          <a className="text-xl font-bold tracking-tighter uppercase font-display cursor-pointer select-none">
            Estate Aerial<span className="opacity-50"> Co.</span>
          </a>
        </Link>

        <nav className="hidden md:flex gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className={cn(
                "text-sm uppercase tracking-widest font-mono transition-colors hover:text-white/80 relative group cursor-pointer",
                location === link.href ? "text-white" : "text-white/60"
              )}>
                {link.label}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-full h-[1px] bg-white transform origin-left transition-transform duration-300",
                  location === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </a>
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-sm font-mono uppercase border border-white/20 px-4 py-2 rounded-full"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-0 right-0 z-40 px-6 md:hidden"
          >
            <nav className="bg-black/80 backdrop-blur-lg border border-white/10 rounded-lg p-6">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a 
                    className={cn(
                      "block py-3 text-sm uppercase tracking-widest font-mono transition-colors hover:text-white/80 cursor-pointer",
                      location === link.href ? "text-white" : "text-white/60"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
