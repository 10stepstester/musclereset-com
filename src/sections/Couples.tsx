import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { GlassCard } from "../components/GlassCard";
import { siteContent } from "../data/content";

const { couples } = siteContent;

type FormStatus = "idle" | "sending" | "success" | "error";

export function Couples() {
  const [form, setForm] = useState({
    name: "",
    partnerName: "",
    email: "",
    phone: "",
    whatHurts: "",
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
          subject: `[Couples Workshop] ${form.name}`,
          message: `Partner: ${form.partnerName}\nPhone: ${form.phone}\n\nWhat hurts:\n${form.whatHurts}`,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", partnerName: "", email: "", phone: "", whatHurts: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="couples" style={{ padding: "80px 24px" }}>
      <div className="max-w-5xl mx-auto">
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: "48px" }}
        >
          {/* Left: pitch */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="flex items-center"
                style={{ gap: "12px", marginBottom: "16px" }}
              >
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "rgba(3, 105, 161, 0.08)",
                  }}
                >
                  <Heart size={20} style={{ color: "#0369a1" }} />
                </div>
                <p className="label-sm" style={{ color: "#0369a1" }}>
                  NEW
                </p>
              </div>

              <h2
                className="font-display text-text-primary"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  letterSpacing: "-0.02em",
                  marginBottom: "8px",
                }}
              >
                {couples.heading}
              </h2>

              <p
                className="text-text-secondary"
                style={{
                  fontSize: "1.125rem",
                  lineHeight: 1.6,
                  marginBottom: "32px",
                }}
              >
                {couples.subhead}
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  marginBottom: "32px",
                }}
              >
                {couples.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-text-secondary"
                    style={{ fontSize: "0.95rem", lineHeight: 1.7 }}
                  >
                    {p}
                  </p>
                ))}
              </div>

              <p className="text-text-muted" style={{ fontSize: "0.875rem", marginBottom: "8px" }}>
                {couples.format}
              </p>
              <p className="text-text-muted font-medium" style={{ fontSize: "0.95rem" }}>
                {couples.pricing}
              </p>
            </motion.div>
          </div>

          {/* Right: signup form */}
          <div>
            <GlassCard accentColor="#0369a1">
              <h3
                className="font-display text-text-primary"
                style={{
                  fontSize: "1.25rem",
                  letterSpacing: "-0.02em",
                  marginBottom: "8px",
                }}
              >
                Sign up for the couples workshop
              </h3>
              <p
                className="text-text-muted"
                style={{ fontSize: "0.875rem", marginBottom: "24px" }}
              >
                We'll reach out with dates and details as they're confirmed.
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
                    style={{ color: "#0369a1", margin: "0 auto 12px" }}
                  />
                  <p className="font-medium text-text-primary">You're signed up.</p>
                  <p className="text-text-muted" style={{ fontSize: "0.875rem" }}>
                    We'll be in touch with workshop dates soon.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                >
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted transition-colors focus:border-border-glow"
                    style={{ padding: "12px 16px", fontSize: "0.95rem" }}
                  />
                  <input
                    type="text"
                    placeholder="Partner's name"
                    required
                    value={form.partnerName}
                    onChange={(e) =>
                      setForm({ ...form, partnerName: e.target.value })
                    }
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
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted transition-colors focus:border-border-glow"
                    style={{ padding: "12px 16px", fontSize: "0.95rem" }}
                  />
                  <textarea
                    placeholder="What hurts? (optional)"
                    rows={3}
                    value={form.whatHurts}
                    onChange={(e) =>
                      setForm({ ...form, whatHurts: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted transition-colors focus:border-border-glow resize-none"
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
                      backgroundColor: "#0369a1",
                      padding: "14px 24px",
                      fontSize: "1rem",
                      gap: "8px",
                    }}
                  >
                    {status === "sending" ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        Sign up
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
