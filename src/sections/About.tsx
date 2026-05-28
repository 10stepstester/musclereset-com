import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { siteContent } from "../data/content";

const { about } = siteContent;

export function About() {
  return (
    <section
      id="about"
      style={{ padding: "80px 24px", backgroundColor: "#f7f3ee" }}
    >
      <div className="max-w-4xl mx-auto">
        <div
          className="flex flex-col md:flex-row items-start"
          style={{ gap: "40px" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="shrink-0"
          >
            <img
              src="/dr-ladd-headshot.jpg"
              alt="Dr. Ladd Carlston"
              className="rounded-2xl object-cover"
              style={{ width: "200px", height: "200px" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2
              className="font-display text-text-primary"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              {about.heading}
            </h2>
            <p
              className="text-text-secondary"
              style={{
                fontSize: "1rem",
                lineHeight: 1.75,
                marginBottom: "20px",
              }}
            >
              {about.bio}
            </p>
            <a
              href={about.clinicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-medium no-underline transition-colors hover:opacity-80"
              style={{ color: "#b45309", gap: "6px", fontSize: "0.95rem" }}
            >
              {about.clinicLabel}
              <ExternalLink size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
