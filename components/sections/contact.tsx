'use client'

import { useActionState, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionRevealer from '../section-revealer'
import { PORTOFOLIO } from '@/lib/constant'
import { Check, Mail, MapPin, X } from 'lucide-react'
import { sendContactAction, type ContactState } from '@/app/actions/contact'
import Link from 'next/link'

const initialState: ContactState = { status: 'idle' }

const fields = [
  {
    name: 'from_name' as const,
    label: 'Your Name',
    type: 'text',
    placeholder: 'John Cow Wee',
  },
  {
    name: 'reply_to' as const,
    label: 'Email Address',
    type: 'email',
    placeholder: 'hedopejohncowwee@gmail.com',
  },
]

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [focused, setFocused] = useState<string | null>(null)
  const [state, formAction, isPending] = useActionState(
    sendContactAction,
    initialState
  )
  const [displayStatus, setDisplayStatus] =
    useState<ContactState['status']>('idle')

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset()
      setTimeout(() => setDisplayStatus('success'), 1)

      const timer = setTimeout(() => setDisplayStatus('idle'), 5000)
      return () => clearTimeout(timer)
    }
    if (state.status === 'error') {
      setTimeout(() => setDisplayStatus('error'), 1)
      const timer = setTimeout(() => setDisplayStatus('idle'), 5000)
      return () => clearTimeout(timer)
    }
    if (state.status === 'validation_error') {
      setTimeout(() => setDisplayStatus('validation_error'), 1)
      const timer = setTimeout(() => setDisplayStatus('idle'), 5000)
      return () => clearTimeout(timer)
    }
  }, [state.status])

  const status = isPending
    ? 'loading'
    : displayStatus === 'idle' || displayStatus === 'validation_error'
      ? 'idle'
      : displayStatus

  return (
    <section
      id="contact"
      className="py-32 pb-10 md:pb-32 border-t border-border bg-bg"
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
                <Link
                  href={`mailto:${PORTOFOLIO.EMAIL}`}
                  data-cursor="hover"
                  className="flex items-center gap-3 font-mono text-[0.8rem] text-text-2 transition-colors duration-200 hover:text-text"
                >
                  <span className="text-text-3">
                    <Mail />
                  </span>
                  {PORTOFOLIO.EMAIL}
                </Link>
                <p className="flex items-center gap-3 font-mono text-[0.8rem] text-text-2">
                  <span className="text-text-3">
                    <MapPin />
                  </span>
                  Indonesia — Available Remotely
                </p>
              </div>
            </div>
          </SectionRevealer>

          {/* Form */}
          <SectionRevealer delay={0.15}>
            <form ref={formRef} action={formAction} className="flex flex-col">
              {fields.map((field) => (
                <div key={field.name} className="mb-8">
                  <div
                    className={`border-b transition-colors duration-300 ${
                      focused === field.name ? 'border-text' : 'border-border-2'
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
                      defaultValue={state.fields?.[field.name] ?? ''}
                      key={state.status}
                      onFocus={() => setFocused(field.name)}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-transparent border-none outline-none text-text text-base py-2 font-sans caret-text placeholder:text-text-3"
                    />
                  </div>
                  {displayStatus === 'validation_error' &&
                    state.errors?.[field.name]?.map((err) => (
                      <p
                        key={err}
                        className="mt-1.5 font-mono text-[0.65rem] text-red-400/80"
                      >
                        {err}
                      </p>
                    ))}
                </div>
              ))}

              {/* Message */}
              <div className="mb-10">
                <div
                  className={`border-b transition-colors duration-300 ${
                    focused === 'message' ? 'border-text' : 'border-border-2'
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
                    defaultValue={state.fields?.message ?? ''}
                    key={state.status}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-transparent border-none outline-none text-text text-base py-2 font-sans caret-text resize-none leading-[1.7] placeholder:text-text-3"
                  />
                </div>
                {displayStatus === 'validation_error' &&
                  state.errors?.message?.map((err) => (
                    <p
                      key={err}
                      className="mt-1.5 font-mono text-[0.65rem] text-red-400/80"
                    >
                      {err}
                    </p>
                  ))}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isPending || status === 'success'}
                data-cursor="hover"
                whileHover={
                  !isPending && status !== 'success'
                    ? {
                        backgroundColor: 'var(--color-text)',
                        color: 'var(--color-bg)',
                      }
                    : {}
                }
                whileTap={{ scale: 0.98 }}
                className={`self-start flex items-center gap-3 px-8 py-3.5 text-[0.8rem] font-semibold tracking-[0.1em] uppercase font-mono transition-colors duration-300 border ${
                  status === 'success'
                    ? 'bg-text text-bg border-text'
                    : 'bg-transparent text-text border-border-2'
                } ${isPending ? 'cursor-wait' : 'cursor-none'}`}
              >
                <AnimatePresence mode="wait">
                  {!isPending && status === 'idle' && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Send Message →
                    </motion.span>
                  )}
                  {isPending && (
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
                  {!isPending && status === 'success' && (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Check /> Message Sent!
                    </motion.span>
                  )}
                  {!isPending && status === 'error' && (
                    <motion.span
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <X /> Failed, Please Try Again
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Global server error */}
              <AnimatePresence>
                {!isPending && status === 'error' && state.message && (
                  <motion.p
                    key="err-msg"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 font-mono text-[0.7rem] text-red-400/80"
                  >
                    {state.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </SectionRevealer>
        </div>
      </div>
    </section>
  )
}

function Spinner() {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      className="inline-block w-3 h-3 border-2 border-border-2 border-t-text rounded-full shrink-0"
    />
  )
}
