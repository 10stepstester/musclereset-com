interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let payload: ContactPayload = {};

  const contentType = req.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/json")) {
      payload = (await req.json()) as ContactPayload;
    } else {
      const formData = await req.formData();
      payload = {
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        subject: String(formData.get("subject") || ""),
        message: String(formData.get("message") || ""),
        website: String(formData.get("website") || ""),
      };
    }
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim();
  const subject = (payload.subject || "").trim() || "Website inquiry";
  const message = (payload.message || "").trim();
  const honeypot = (payload.website || "").trim();

  if (honeypot) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ error: "Name, email, and message are required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: "Invalid email." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "info@painreliefkc.com";
  const from = process.env.CONTACT_FROM || "hello@musclereset.com";

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error:
          "Email service is not configured. Set RESEND_API_KEY in Vercel env vars.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;line-height:1.5;color:#1c1917;">
      <p><strong>New message from musclereset.com</strong></p>
      <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <hr style="border:none;border-top:1px solid #e5e0d8;margin:16px 0;" />
      <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Muscle Reset <${from}>`,
        to: [to],
        reply_to: email,
        subject: `[MuscleReset] ${subject}`,
        html,
        text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
      }),
    });

    if (!resendResponse.ok) {
      const errBody = await resendResponse.text();
      console.error("Resend error:", resendResponse.status, errBody);
      return new Response(
        JSON.stringify({ error: "Email service failed to send." }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Contact handler exception:", err);
    return new Response(JSON.stringify({ error: "Unexpected error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const config = {
  runtime: "edge",
};
