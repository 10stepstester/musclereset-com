import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteContent } from "../data/content";

const { nav } = siteContent;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-border shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div
        className="max-w-6xl mx-auto flex items-center justify-between"
        style={{ padding: "16px 24px" }}
      >
        <a
          href="#"
          className="font-display text-xl tracking-tight text-text-primary no-underline"
          style={{ letterSpacing: "-0.02em" }}
        >
          {nav.brand}
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center" style={{ gap: "32px" }}>
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors no-underline"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#practitioners"
            className="text-sm font-medium text-white no-underline rounded-lg transition-all hover:opacity-90"
            style={{
              backgroundColor: "#b45309",
              padding: "8px 20px",
            }}
          >
            {nav.cta}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-bg/95 backdrop-blur-md border-b border-border overflow-hidden"
          >
            <div className="flex flex-col" style={{ padding: "16px 24px", gap: "16px" }}>
              {nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base text-text-secondary hover:text-text-primary transition-colors no-underline"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#practitioners"
                className="text-sm font-medium text-white no-underline rounded-lg text-center transition-all hover:opacity-90"
                style={{
                  backgroundColor: "#b45309",
                  padding: "10px 20px",
                }}
                onClick={() => setMobileOpen(false)}
              >
                {nav.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
