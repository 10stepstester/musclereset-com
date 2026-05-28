import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { siteContent } from "../data/content";

const { faq } = siteContent;

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left bg-transparent border-none cursor-pointer"
        style={{ padding: "20px 0" }}
        aria-expanded={isOpen}
      >
        <span
          className="font-medium text-text-primary"
          style={{ fontSize: "1rem", paddingRight: "16px" }}
        >
          {question}
        </span>
        <ChevronDown
          size={20}
          className="shrink-0 text-text-muted transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p
              className="text-text-secondary"
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.65,
                paddingBottom: "20px",
              }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" style={{ padding: "80px 24px" }}>
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-center text-text-primary"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            letterSpacing: "-0.02em",
            marginBottom: "40px",
          }}
        >
          Frequently asked questions
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {faq.map((item, i) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() =>
                setOpenIndex(openIndex === i ? null : i)
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
