import { motion } from "framer-motion";

export function SectionDivider({ flipped = false }: { flipped?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="relative z-10 h-24 sm:h-32 flex items-center justify-center overflow-hidden"
    >
      <div
        className="w-full max-w-md h-px"
        style={{
          background: flipped
            ? "linear-gradient(90deg, transparent, rgba(3,105,161,0.2), rgba(180,83,9,0.15), transparent)"
            : "linear-gradient(90deg, transparent, rgba(180,83,9,0.2), rgba(3,105,161,0.15), transparent)",
        }}
      />
      <div
        className="absolute w-1.5 h-1.5 rounded-full"
        style={{
          backgroundColor: flipped
            ? "rgba(3, 105, 161, 0.3)"
            : "rgba(180, 83, 9, 0.3)",
        }}
      />
    </motion.div>
  );
}
