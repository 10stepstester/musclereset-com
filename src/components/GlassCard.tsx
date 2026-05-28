import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  accentColor?: string;
}

export function GlassCard({
  children,
  className = "",
  delay = 0,
  accentColor,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
      className={`relative bg-white/80 backdrop-blur-md border border-border rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_12px_40px_rgba(0,0,0,0.05)] transition-shadow duration-500 ${className}`}
      style={{ padding: "28px 32px" }}
    >
      {accentColor && (
        <div
          className="absolute top-0 left-6 right-6 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
