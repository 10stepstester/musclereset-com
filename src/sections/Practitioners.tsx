import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, BookOpen, ArrowRight, Loader2 } from "lucide-react";
import { GlassCard } from "../components/GlassCard";
import { siteContent } from "../data/content";

const { practitioners } = siteContent;

type FormStatus = "idle" | "sending" | "success" | "error";

export function Practitioners() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    profession: "",
    city: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: `[Waitlist] Practitioner — ${form.profession}`,
          message: `Profession: ${form.profession}\nCity: ${form.city}\n\nJoined the practitioner waitlist.`,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", profession: "", city: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="practitioners"
      style={{ padding: "80px 24px", backgroundColor: "#f7f3ee" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-text-primary"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            letterSpacing: "-0.02em",
            marginBottom: "8px",
          }}
        >
          {practitioners.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-secondary"
          style={{
            fontSize: "1.125rem",
            marginBottom: "48px",
          }}
        >
          {practitioners.subheading}
        </motion.p>

        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: "48px" }}
        >
          {/* Left: info */}
          <div>
            <h3
              className="font-display text-text-primary"
              style={{
                fontSize: "1.25rem",
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              Who it's for
            </h3>
            <ul
              className="list-none"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                marginBottom: "40px",
              }}
            >
              {practitioners.whoItsFor.map((item) => (
                <li
                  key={item}
                  className="flex text-text-secondary"
                  style={{ gap: "12px", fontSize: "0.95rem", lineHeight: 1.6 }}
                >
                  <CheckCircle
                    size={20}
                    className="shrink-0"
                    style={{ color: "#b45309", marginTop: "2px" }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3
              className="font-display text-text-primary"
              style={{
                fontSize: "1.25rem",
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              What you'll learn
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              {practitioners.modules.map((mod) => (
                <div key={mod.number} className="flex" style={{ gap: "14px" }}>
                  <div
                    className="flex items-center justify-center shrink-0 rounded-lg"
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "rgba(180, 83, 9, 0.08)",
                    }}
                  >
                    <BookOpen size={18} style={{ color: "#b45309" }} />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary" style={{ fontSize: "0.95rem" }}>
                      Module {mod.number}: {mod.title}
                    </p>
                    <p
                      className="text-text-muted"
                      style={{ fontSize: "0.875rem", lineHeight: 1.5 }}
                    >
                      {mod.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-text-muted" style={{ fontSize: "0.875rem", marginBottom: "8px" }}>
              {practitioners.format}
            </p>
            <p className="text-text-primary font-medium" style={{ fontSize: "1rem" }}>
              ${practitioners.pricing.regular} regular · ${practitioners.pricing.earlyBird} early-bird
            </p>
          </div>

          {/* Right: waitlist form */}
          <div>
            <GlassCard accentColor="#b45309">
              <h3
                className="font-display text-text-primary"
                style={{
                  fontSize: "1.25rem",
                  letterSpacing: "-0.02em",
                  marginBottom: "8px",
                }}
              >
                Join the practitioner waitlist
              </h3>
              <p
                className="text-text-muted"
                style={{ fontSize: "0.875rem", marginBottom: "24px" }}
              >
                No dates yet — we'll notify you first when the next cohort opens.
              </p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                  style={{ padding: "24px 0" }}
                >
                  <CheckCircle
                    size={40}
                    style={{ color: "#b45309", margin: "0 auto 12px" }}
                  />
                  <p className="font-medium text-text-primary">You're on the list.</p>
                  <p className="text-text-muted" style={{ fontSize: "0.875rem" }}>
                    We'll reach out when the next cohort is ready.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                >
                  <input
                    type="text"
                    placeholder="Full name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted transition-colors focus:border-border-glow"
                    style={{ padding: "12px 16px", fontSize: "0.95rem" }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted transition-colors focus:border-border-glow"
                    style={{ padding: "12px 16px", fontSize: "0.95rem" }}
                  />
                  <select
                    required
                    value={form.profession}
                    onChange={(e) =>
                      setForm({ ...form, profession: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-white text-text-primary transition-colors focus:border-border-glow appearance-none"
                    style={{ padding: "12px 16px", fontSize: "0.95rem" }}
                  >
                    <option value="" disabled>
                      Profession
                    </option>
                    {practitioners.professionOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="City"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted transition-colors focus:border-border-glow"
                    style={{ padding: "12px 16px", fontSize: "0.95rem" }}
                  />

                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ position: "absolute", left: "-9999px" }}
                    aria-hidden="true"
                  />

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full flex items-center justify-center text-white font-medium rounded-lg transition-all hover:opacity-90 disabled:opacity-60"
                    style={{
                      backgroundColor: "#b45309",
                      padding: "14px 24px",
                      fontSize: "1rem",
                      gap: "8px",
                    }}
                  >
                    {status === "sending" ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        Join the waitlist
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <p style={{ color: "#dc2626", fontSize: "0.875rem" }}>
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
