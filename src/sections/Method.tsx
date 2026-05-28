import { motion } from "framer-motion";
import { Crosshair, Zap, Shield } from "lucide-react";
import { GlassCard } from "../components/GlassCard";
import { siteContent } from "../data/content";

const { method } = siteContent;

const icons = [Crosshair, Zap, Shield];

export function Method() {
  return (
    <section id="method" style={{ padding: "0 24px 80px" }}>
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-center text-text-primary"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            letterSpacing: "-0.02em",
            marginBottom: "48px",
          }}
        >
          {method.heading}
        </motion.h2>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: "24px" }}
        >
          {method.cards.map((card, i) => {
            const Icon = icons[i];
            return (
              <GlassCard key={card.title} delay={i * 0.1} accentColor="#b45309">
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{
                    width: "48px",
                    height: "48px",
                    marginBottom: "20px",
                    backgroundColor: "rgba(180, 83, 9, 0.08)",
                  }}
                >
                  <Icon size={24} style={{ color: "#b45309" }} />
                </div>
                <h3
                  className="font-display text-text-primary"
                  style={{
                    fontSize: "1.5rem",
                    letterSpacing: "-0.02em",
                    marginBottom: "12px",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-text-secondary"
                  style={{ fontSize: "0.95rem", lineHeight: 1.65 }}
                >
                  {card.description}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
