import React, { useEffect, useRef, useState } from "react";
import Layout from "@theme/Layout";

declare global {
  interface Window {
    onTurnstileSuccess?: (token: string) => void;
    onTurnstileExpired?: () => void;
    onTurnstileError?: () => void;
    turnstileToken?: string;
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
    };
  }
}

export default function Contact() {
  const startedAt = useRef(Date.now());
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
    docUrl: "",
    docDetails: "",
    command: "",
    botDetails: "",
    botDiscordUsername: "",
    botDiscordId: "",
    privacyType: "",
    privacyDiscordUsername: "",
    privacyDiscordId: "",
    turnstile: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [topic, setTopic] = useState("");

  useEffect(() => {
    let intervalId: number | undefined;
    let cancelled = false;

    const handleSuccess = (token: string) => {
      window.turnstileToken = token;
    };
    const handleReset = () => {
      window.turnstileToken = "";
    };

    const renderTurnstile = () => {
      if (cancelled || !turnstileRef.current || turnstileWidgetId.current) {
        return;
      }
      if (!window.turnstile) {
        return;
      }
      turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: "0x4AAAAAACYk5ddZi3zkHH_r",
        callback: handleSuccess,
        "expired-callback": handleReset,
        "error-callback": handleReset,
      });
    };

    renderTurnstile();
    intervalId = window.setInterval(() => {
      if (turnstileWidgetId.current) {
        if (intervalId) {
          window.clearInterval(intervalId);
        }
        return;
      }
      renderTurnstile();
    }, 500);

    return () => {
      cancelled = true;
      if (intervalId) {
        window.clearInterval(intervalId);
      }
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const topicValue = String(formData.get("topic") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const docUrl = String(formData.get("docUrl") || "").trim();
    const docDetails = String(formData.get("docDetails") || "").trim();
    const command = String(formData.get("command") || "").trim();
    const botDetails = String(formData.get("botDetails") || "").trim();
    const botDiscordUsername = String(formData.get("botDiscordUsername") || "").trim();
    const botDiscordId = String(formData.get("botDiscordId") || "").trim();
    const privacyType = String(formData.get("privacyType") || "").trim();
    const privacyDiscordUsername = String(formData.get("privacyDiscordUsername") || "").trim();
    const privacyDiscordId = String(formData.get("privacyDiscordId") || "").trim();
    const turnstileToken = String(
      window.turnstileToken || formData.get("cf-turnstile-response") || ""
    ).trim();
    const nextErrors = {
      name: "",
      email: "",
      topic: "",
      message: "",
      docUrl: "",
      docDetails: "",
      command: "",
      botDetails: "",
      botDiscordUsername: "",
      botDiscordId: "",
      privacyType: "",
      privacyDiscordUsername: "",
      privacyDiscordId: "",
      turnstile: "",
    };

    if (name.length < 2) nextErrors.name = "Please enter at least 2 characters.";
    if (name.length > 80) nextErrors.name = "Please keep your name under 80 characters.";

    if (!email) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!topicValue) nextErrors.topic = "Please choose a topic.";

    if (message.length < 10) nextErrors.message = "Please add at least 10 characters.";
    if (message.length > 1000) nextErrors.message = "Please keep your message under 1000 characters.";

    if (topicValue === "documentation") {
      if (!docUrl) nextErrors.docUrl = "Please share the docs page URL.";
      if (docDetails.length < 10) nextErrors.docDetails = "Please add a few details about the issue.";
    }

    if (topicValue === "bot-issue") {
      if (!command) nextErrors.command = "Please share the command you used.";
      if (botDetails.length < 10) nextErrors.botDetails = "Please add a few details about the issue.";
      if (!botDiscordUsername) nextErrors.botDiscordUsername = "Please add your Discord username.";
      if (!botDiscordId) nextErrors.botDiscordId = "Please add your Discord ID.";
    }

    if (topicValue === "privacy") {
      if (!privacyType) nextErrors.privacyType = "Please select a privacy request type.";
      if (!privacyDiscordUsername) nextErrors.privacyDiscordUsername = "Please add your Discord username.";
      if (!privacyDiscordId) nextErrors.privacyDiscordId = "Please add your Discord ID.";
    }

    if (document.querySelector(".cf-turnstile") && !turnstileToken) {
      nextErrors.turnstile = "Please complete the verification.";
    }

    if (
      nextErrors.name ||
      nextErrors.email ||
      nextErrors.topic ||
      nextErrors.message ||
      nextErrors.docUrl ||
      nextErrors.docDetails ||
      nextErrors.command ||
      nextErrors.botDetails ||
      nextErrors.botDiscordUsername ||
      nextErrors.botDiscordId ||
      nextErrors.privacyType ||
      nextErrors.privacyDiscordUsername ||
      nextErrors.privacyDiscordId ||
      nextErrors.turnstile
    ) {
      setErrors(nextErrors);
      setStatus("Please fix the highlighted fields.");
      return;
    }

    setErrors({
      name: "",
      email: "",
      topic: "",
      message: "",
      docUrl: "",
      docDetails: "",
      command: "",
      botDetails: "",
      botDiscordUsername: "",
      botDiscordId: "",
      privacyType: "",
      privacyDiscordUsername: "",
      privacyDiscordId: "",
      turnstile: "",
    });
    setStatus("Sending...");
    setIsSubmitting(true);

    const payload = {
      name,
      email,
      topic: topicValue,
      message,
      docUrl,
      docDetails,
      command,
      botDetails,
      botDiscordUsername,
      botDiscordId,
      privacyType,
      privacyDiscordUsername,
      privacyDiscordId,
      website: String(formData.get("website") || ""), // honeypot
      startedAt: startedAt.current,
      turnstileToken,
    };

    const endpoint =
      process.env.NODE_ENV === "development"
        ? "https://stenbot.benwhybrow.com/api/contact"
        : "/api/contact";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setStatus(res.ok ? "Sent! We'll be in touch soon." : "Error. Please try again.");
      if (res.ok) {
        form.reset();
        window.turnstileToken = "";
        setTopic("");
      }
    } catch (error) {
      setStatus("Error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout title="Contact">
      <main className="container margin-vert--lg contact-page">
        <div className="contact-hero">
          <h1>Contact</h1>
          <p>Tell us what you need and we'll get back to you within 1-2 business days.</p>
        </div>

        <form className="contact-form-card" onSubmit={onSubmit} noValidate>
          {/* honeypot */}
          <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

          <div className="contact-grid">
            <div className="contact-field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                minLength={2}
                maxLength={80}
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
              />
              {errors.name && (
                <p className="contact-error" id="contact-name-error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="contact-field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
              />
              {errors.email && (
                <p className="contact-error" id="contact-email-error">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="contact-field">
            <label htmlFor="contact-topic">What can we help with?</label>
            <select
              id="contact-topic"
              name="topic"
              required
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              aria-invalid={Boolean(errors.topic)}
              aria-describedby={errors.topic ? "contact-topic-error" : "contact-topic-help"}
            >
              <option value="">Select a topic</option>
              <option value="general">General question or feedback</option>
              <option value="documentation">Report incorrect documentation</option>
              <option value="bot-issue">Report an issue with the bot</option>
              <option value="privacy">Privacy request (UK GDPR)</option>
            </select>
            <p className="contact-helper" id="contact-topic-help">
              We'll ask a few follow-up questions based on your choice.
            </p>
            {errors.topic && (
              <p className="contact-error" id="contact-topic-error">
                {errors.topic}
              </p>
            )}
          </div>

          {topic === "documentation" && (
            <div className="contact-field-group">
              <div className="contact-field">
                <label htmlFor="contact-doc-url">Docs page URL</label>
                <input
                  id="contact-doc-url"
                  name="docUrl"
                  type="url"
                  placeholder="https://stenbot.benwhybrow.com/docs/..."
                  aria-invalid={Boolean(errors.docUrl)}
                  aria-describedby={errors.docUrl ? "contact-doc-url-error" : undefined}
                  required
                />
                {errors.docUrl && (
                  <p className="contact-error" id="contact-doc-url-error">
                    {errors.docUrl}
                  </p>
                )}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-doc-details">What's incorrect?</label>
                <textarea
                  id="contact-doc-details"
                  name="docDetails"
                  rows={4}
                  minLength={10}
                  required
                  aria-invalid={Boolean(errors.docDetails)}
                  aria-describedby={errors.docDetails ? "contact-doc-details-error" : undefined}
                />
                {errors.docDetails && (
                  <p className="contact-error" id="contact-doc-details-error">
                    {errors.docDetails}
                  </p>
                )}
              </div>
            </div>
          )}

          {topic === "bot-issue" && (
            <div className="contact-field-group">
              <div className="contact-grid">
                <div className="contact-field">
                  <label htmlFor="contact-bot-discord-username">Discord username</label>
                  <input
                    id="contact-bot-discord-username"
                    name="botDiscordUsername"
                    placeholder="username or username#0000"
                    aria-invalid={Boolean(errors.botDiscordUsername)}
                    aria-describedby={errors.botDiscordUsername ? "contact-bot-discord-username-error" : undefined}
                    required
                  />
                  {errors.botDiscordUsername && (
                    <p className="contact-error" id="contact-bot-discord-username-error">
                      {errors.botDiscordUsername}
                    </p>
                  )}
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-bot-discord-id">
                    Discord ID (
                    <a
                      href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID"
                      target="_blank"
                      rel="noreferrer"
                    >
                      how to find it
                    </a>
                    )
                  </label>
                  <input
                    id="contact-bot-discord-id"
                    name="botDiscordId"
                    inputMode="numeric"
                    placeholder="123456789012345678"
                    aria-invalid={Boolean(errors.botDiscordId)}
                    aria-describedby={errors.botDiscordId ? "contact-bot-discord-id-error" : undefined}
                    required
                  />
                  {errors.botDiscordId && (
                    <p className="contact-error" id="contact-bot-discord-id-error">
                      {errors.botDiscordId}
                    </p>
                  )}
                </div>
              </div>
              <div className="contact-field">
                <label htmlFor="contact-command">Command used</label>
                <input
                  id="contact-command"
                  name="command"
                  placeholder="/command or !command"
                  aria-invalid={Boolean(errors.command)}
                  aria-describedby={errors.command ? "contact-command-error" : undefined}
                  required
                />
                {errors.command && (
                  <p className="contact-error" id="contact-command-error">
                    {errors.command}
                  </p>
                )}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-bot-details">What happened?</label>
                <textarea
                  id="contact-bot-details"
                  name="botDetails"
                  rows={4}
                  minLength={10}
                  required
                  aria-invalid={Boolean(errors.botDetails)}
                  aria-describedby={errors.botDetails ? "contact-bot-details-error" : undefined}
                />
                {errors.botDetails && (
                  <p className="contact-error" id="contact-bot-details-error">
                    {errors.botDetails}
                  </p>
                )}
              </div>
            </div>
          )}

          {topic === "privacy" && (
            <div className="contact-field-group">
              <div className="contact-grid">
                <div className="contact-field">
                  <label htmlFor="contact-privacy-discord-username">Discord username</label>
                  <input
                    id="contact-privacy-discord-username"
                    name="privacyDiscordUsername"
                    placeholder="username or username#0000"
                    aria-invalid={Boolean(errors.privacyDiscordUsername)}
                    aria-describedby={
                      errors.privacyDiscordUsername ? "contact-privacy-discord-username-error" : undefined
                    }
                    required
                  />
                  {errors.privacyDiscordUsername && (
                    <p className="contact-error" id="contact-privacy-discord-username-error">
                      {errors.privacyDiscordUsername}
                    </p>
                  )}
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-privacy-discord-id">
                    Discord ID (
                    <a
                      href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID"
                      target="_blank"
                      rel="noreferrer"
                    >
                      how to find it
                    </a>
                    )
                  </label>
                  <input
                    id="contact-privacy-discord-id"
                    name="privacyDiscordId"
                    inputMode="numeric"
                    placeholder="123456789012345678"
                    aria-invalid={Boolean(errors.privacyDiscordId)}
                    aria-describedby={errors.privacyDiscordId ? "contact-privacy-discord-id-error" : undefined}
                    required
                  />
                  {errors.privacyDiscordId && (
                    <p className="contact-error" id="contact-privacy-discord-id-error">
                      {errors.privacyDiscordId}
                    </p>
                  )}
                </div>
              </div>
              <div className="contact-field">
                <label htmlFor="contact-privacy-type">Request type</label>
                <select
                  id="contact-privacy-type"
                  name="privacyType"
                  required
                  aria-invalid={Boolean(errors.privacyType)}
                  aria-describedby={errors.privacyType ? "contact-privacy-type-error" : undefined}
                >
                  <option value="">Select a request</option>
                  <option value="access">Access my data</option>
                  <option value="delete">Delete my data</option>
                  <option value="correction">Correct my data</option>
                  <option value="restriction">Restrict processing</option>
                  <option value="other">Other privacy request</option>
                </select>
                {errors.privacyType && (
                  <p className="contact-error" id="contact-privacy-type-error">
                    {errors.privacyType}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="contact-field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              minLength={10}
              maxLength={1000}
              required
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
            />
            <div className="contact-helper">
              <span>Share a few details so we can help quickly.</span>
              <span>10-1000 characters</span>
            </div>
            {errors.message && (
              <p className="contact-error" id="contact-message-error">
                {errors.message}
              </p>
            )}
          </div>

          <div className="cf-turnstile" ref={turnstileRef} />

          {errors.turnstile && <p className="contact-error">{errors.turnstile}</p>}

          <div className="contact-actions">
            <button className="button button--primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send"}
            </button>
            <p className="contact-privacy">We only use your info to respond to your request.</p>
          </div>

          {status && <p className="contact-status">{status}</p>}
        </form>
      </main>
    </Layout>
  );
}
