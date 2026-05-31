import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { featuredTestimonial, testimonials } from "../data/testimonials";

const smallCaps: React.CSSProperties = {
  fontVariant: "small-caps",
  letterSpacing: "0.08em",
  color: "#8c8680",
  fontSize: "0.8rem",
  fontWeight: 500,
};

export function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{ padding: "96px 24px", backgroundColor: "#faf8f5" }}
    >
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
            marginBottom: "64px",
          }}
        >
          What people are{" "}
          <span style={{ fontStyle: "italic" }}>saying.</span>
        </motion.h2>

        {/* Featured pull-quote */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
          style={{ maxWidth: "780px", margin: "0 auto 96px" }}
        >
          <Quote
            size={36}
            style={{
              color: "#b45309",
              opacity: 0.35,
              margin: "0 auto 24px",
            }}
            aria-hidden="true"
          />
          <blockquote
            className="font-display text-text-primary"
            style={{
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 3vw, 2.125rem)",
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
            }}
          >
            “{featuredTestimonial.quote}”
          </blockquote>
          <figcaption style={{ ...smallCaps, marginTop: "28px" }}>
            {featuredTestimonial.name}, {featuredTestimonial.title}
          </figcaption>
        </motion.figure>

        {/* Practitioner grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "48px 40px" }}
        >
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.quote}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: "easeOut" }}
              style={{ paddingTop: "20px", borderTop: "1px solid rgba(180, 83, 9, 0.18)" }}
            >
              <blockquote
                className="text-text-secondary"
                style={{
                  fontStyle: "italic",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                }}
              >
                {t.quote}
              </blockquote>
              <figcaption style={{ ...smallCaps, marginTop: "16px" }}>
                {t.attribution}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
