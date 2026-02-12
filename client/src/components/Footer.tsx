import { motion } from "framer-motion";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="py-20 px-6 md:px-12 border-t border-white/5 bg-black text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold uppercase tracking-tighter">Estate Aerial Co.</h2>
          <p className="text-white/40 font-light text-sm max-w-xs">
            Cinematic documentation for exceptional spaces.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Menu</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/"><a className="text-sm text-white/60 hover:text-white transition-colors">Home</a></Link>
              <Link href="/work"><a className="text-sm text-white/60 hover:text-white transition-colors">Work</a></Link>
              <Link href="/about"><a className="text-sm text-white/60 hover:text-white transition-colors">About</a></Link>
              <Link href="/services"><a className="text-sm text-white/60 hover:text-white transition-colors">Services</a></Link>
              <Link href="/contact"><a className="text-sm text-white/60 hover:text-white transition-colors">Contact</a></Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Connect</h3>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Vimeo</a>
            </nav>
          </div>
        </div>

        <div className="md:text-right flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-white/30 font-mono text-[10px] uppercase tracking-widest">Inquiries</p>
            <a href="mailto:hello@estateaerial.co" className="text-lg hover:text-white/70 transition-colors">hello@estateaerial.co</a>
          </div>
        </div>
      </div>

      <div className="container mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">
          © {new Date().getFullYear()} Estate Aerial Co. All rights reserved.
        </p>
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">
          Built for the future
        </p>
      </div>
    </footer>
  );
}
