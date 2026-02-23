import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";

interface GlassButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> {
  variant?: "primary" | "ghost";
  children: React.ReactNode;
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, variant = "primary", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "px-8 py-4 rounded-full font-mono text-sm uppercase tracking-widest transition-all duration-300",
          variant === "primary" && "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]",
          variant === "ghost" && "bg-transparent border border-white/10 hover:border-white/30 text-white/80 hover:text-white",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

GlassButton.displayName = "GlassButton";
