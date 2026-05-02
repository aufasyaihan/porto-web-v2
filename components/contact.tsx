"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import SectionRevealer from "./section-revealer";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || status === "loading") return;

    setStatus("loading");
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      );
      setStatus("success");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const fields = [
    { name: "from_name", label: "Your Name", type: "text", placeholder: "John Doe" },
    { name: "reply_to", label: "Email Address", type: "email", placeholder: "john@example.com" },
  ];

  return (
    <section
      id="contact"
      className="py-32 border-t border-border bg-bg"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          {/* Left copy */}
          <SectionRevealer>
            <div>
              <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-text-3 mb-8">
                06 — Contact
              </p>
              <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-[-0.04em] leading-none mb-6">
                Let&apos;s work
                <br />
                <span className="text-text-2">together.</span>
              </h2>
              <p className="text-base leading-[1.8] text-text-2 max-w-[380px] mb-12">
                Have a project in mind, a question, or just want to say hello?
                Fill out the form and I&apos;ll get back to you within 24 hours.
              </p>

              {/* Contact details */}
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:you@example.com"
                  data-cursor="hover"
                  className="flex items-center gap-3 font-mono text-[0.8rem] text-text-2 transition-colors duration-200 hover:text-white"
                >
                  <span className="text-text-3">✉</span>
                  you@example.com
                </a>
                <p className="flex items-center gap-3 font-mono text-[0.8rem] text-text-2">
                  <span className="text-text-3">📍</span>
                  Indonesia — Available Remotely
                </p>
              </div>
            </div>
          </SectionRevealer>

          {/* Form */}
          <SectionRevealer delay={0.15}>
            <form
              ref={formRef}
              onSubmit={send}
              className="flex flex-col"
            >
              {fields.map((field) => (
                <div
                  key={field.name}
                  className={`border-b transition-colors duration-300 mb-8 ${
                    focused === field.name ? "border-white/50" : "border-border-2"
                  }`}
                >
                  <label
                    htmlFor={field.name}
                    className="block font-mono text-[0.6rem] tracking-[0.2em] uppercase text-text-3 mb-2"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-transparent border-none outline-none text-white text-base py-2 font-sans caret-white placeholder:text-text-3"
                  />
                </div>
              ))}

              {/* Message */}
              <div
                className={`border-b transition-colors duration-300 mb-10 ${
                  focused === "message" ? "border-white/50" : "border-border-2"
                }`}
              >
                <label
                  htmlFor="message"
                  className="block font-mono text-[0.6rem] tracking-[0.2em] uppercase text-text-3 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  required
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent border-none outline-none text-white text-base py-2 font-sans caret-white resize-none leading-[1.7] placeholder:text-text-3"
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "loading" || status === "success"}
                data-cursor="hover"
                whileHover={
                  status === "idle" ? { backgroundColor: "#fff", color: "#000" } : {}
                }
                whileTap={{ scale: 0.98 }}
                className={`self-start flex items-center gap-3 px-8 py-3.5 text-[0.8rem] font-semibold tracking-[0.1em] uppercase font-mono transition-colors duration-300 border ${
                  status === "success"
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white border-white/30"
                } ${status === "loading" ? "cursor-wait" : "cursor-none"}`}
              >
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Send Message →
                    </motion.span>
                  )}
                  {status === "loading" && (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Spinner /> Sending...
                    </motion.span>
                  )}
                  {status === "success" && (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      ✓ Message Sent!
                    </motion.span>
                  )}
                  {status === "error" && (
                    <motion.span
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      ✕ Failed — Try Again
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {status === "error" && (
                <p className="mt-3 font-mono text-[0.7rem] text-red-400/80">
                  Something went wrong. Please check your EmailJS configuration.
                </p>
              )}
            </form>
          </SectionRevealer>
        </div>
      </div>
    </section>
  );
}

function Spinner() {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full shrink-0"
    />
  );
}
