import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteContent } from "../data/content";

const { hero } = siteContent;

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{ padding: "120px 24px 80px" }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="label-sm"
          style={{ marginBottom: "24px", letterSpacing: "0.12em" }}
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-text-primary"
          style={{
            fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "24px",
          }}
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-secondary"
          style={{
            fontSize: "1.125rem",
            lineHeight: 1.7,
            maxWidth: "640px",
            margin: "0 auto 40px",
          }}
        >
          {hero.subhead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center"
          style={{ gap: "16px" }}
        >
          <a
            href="#practitioners"
            className="inline-flex items-center text-white font-medium no-underline rounded-lg transition-all hover:opacity-90"
            style={{
              backgroundColor: "#b45309",
              padding: "14px 28px",
              fontSize: "1rem",
              gap: "8px",
            }}
          >
            {hero.primaryCta}
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
