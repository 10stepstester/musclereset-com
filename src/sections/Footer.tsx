import { Mail, Phone, MapPin } from "lucide-react";
import { siteContent } from "../data/content";

const { footer } = siteContent;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: "48px 24px 32px",
        backgroundColor: "#f7f3ee",
        borderTop: "1px solid rgba(0, 0, 0, 0.07)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          className="grid grid-cols-1 sm:grid-cols-3"
          style={{ gap: "32px", marginBottom: "40px" }}
        >
          {/* Contact */}
          <div>
            <p
              className="label-sm"
              style={{ marginBottom: "16px" }}
            >
              CONTACT
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                href={`mailto:${footer.email}`}
                className="flex items-center text-text-secondary hover:text-text-primary no-underline transition-colors"
                style={{ gap: "8px", fontSize: "0.875rem" }}
              >
                <Mail size={16} className="text-text-muted" />
                {footer.email}
              </a>
              <a
                href={`tel:${footer.phone.replace(/-/g, "")}`}
                className="flex items-center text-text-secondary hover:text-text-primary no-underline transition-colors"
                style={{ gap: "8px", fontSize: "0.875rem" }}
              >
                <Phone size={16} className="text-text-muted" />
                {footer.phone}
              </a>
            </div>
          </div>

          {/* Address */}
          <div>
            <p
              className="label-sm"
              style={{ marginBottom: "16px" }}
            >
              LOCATION
            </p>
            <p
              className="flex text-text-secondary"
              style={{ gap: "8px", fontSize: "0.875rem", lineHeight: 1.5 }}
            >
              <MapPin size={16} className="shrink-0 text-text-muted" style={{ marginTop: "2px" }} />
              {footer.address}
            </p>
          </div>

          {/* Social */}
          <div>
            <p
              className="label-sm"
              style={{ marginBottom: "16px" }}
            >
              SOCIAL
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {footer.social.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary no-underline transition-colors"
                  style={{ fontSize: "0.875rem" }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="border-t border-border text-center text-text-muted"
          style={{ paddingTop: "20px", fontSize: "0.8rem" }}
        >
          &copy; {year} Muscle Reset &middot; Dr. Ladd Carlston, DC
        </div>
      </div>
    </footer>
  );
}
