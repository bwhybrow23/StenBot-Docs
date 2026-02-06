import React, { useEffect, useRef, useState } from "react";
import Layout from "@theme/Layout";

declare global {
  interface Window {
    onTurnstileSuccess?: (token: string) => void;
    turnstileToken?: string;
  }
}

export default function Contact() {
  const startedAt = useRef(Date.now());
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    window.onTurnstileSuccess = (token: string) => {
      window.turnstileToken = token;
    };
    return () => {
      delete window.onTurnstileSuccess;
    };
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Sending...");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""), // honeypot
      startedAt: startedAt.current,
      turnstileToken: window.turnstileToken || "",
    };

    const endpoint =
      process.env.NODE_ENV === "development"
        ? "https://stenbot.benwhybrow.com/api/contact"
        : "/api/contact";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setStatus(res.ok ? "Sent!" : "Error. Please try again.");
    if (res.ok) form.reset();
  }

  return (
    <Layout title="Contact">
      <main className="container margin-vert--lg">
        <h1>Contact</h1>

        <form onSubmit={onSubmit}>
          {/* honeypot */}
          <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

          <div className="margin-bottom--md">
            <label>
              Name
              <input name="name" required />
            </label>
          </div>

          <div className="margin-bottom--md">
            <label>
              Email
              <input name="email" type="email" required />
            </label>
          </div>

          <div className="margin-bottom--md">
            <label>
              Message
              <textarea name="message" rows={6} required />
            </label>
          </div>

          <div
            className="cf-turnstile"
            data-sitekey="YOUR_TURNSTILE_SITE_KEY"
            data-callback="onTurnstileSuccess"
          />

          <button className="button button--primary" type="submit">
            Send
          </button>

          {status && <p className="margin-top--md">{status}</p>}
        </form>
      </main>
    </Layout>
  );
}
