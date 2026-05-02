'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import SectionRevealer from '../section-revealer'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { AboutData } from '@/types/about'

export default function About({ data }: { data: AboutData }) {
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true })
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section id="about" className="py-32 border-t border-border bg-bg">
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Section label */}
        <SectionRevealer>
          <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-text-3 mb-16">
            01 — About Me
          </p>
        </SectionRevealer>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          {/* Left: Image + Stats */}
          <SectionRevealer delay={0.1}>
            <div className="sticky top-24">
              {/* Photo */}
              <div
                className="relative aspect-[3/4] max-w-[360px] overflow-hidden bg-card border border-border"
                data-cursor="hover"
              >
                {data.photo ? (
                  <Image
                    src={data.photo}
                    alt={data.name}
                    fill
                    unoptimized // since it's a local image, no need for optimization
                    className={cn(
                      'object-cover',
                      mounted && resolvedTheme === 'dark' && 'grayscale'
                    )}
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl text-text-3 font-bold tracking-[-0.04em]">
                    {data.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                )}

                {/* Available badge */}
                {data.available && (
                  <div className="absolute top-4 right-4 flex items-center gap-[6px] px-2.5 py-1 bg-bg/80 border border-border backdrop-blur-md text-[0.65rem] font-mono tracking-[0.1em] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80] animate-pulse" />
                    Available
                  </div>
                )}
              </div>

              {/* Stats */}
              <div
                ref={statsRef}
                className="grid grid-cols-3 gap-[1px] bg-border mt-[1px] border border-border"
              >
                {data.stats.map((stat, i) => (
                  <div key={stat.label} className="p-6 bg-card text-center">
                    <AnimatedCount
                      value={stat.value}
                      suffix={stat.suffix ?? ''}
                      trigger={statsInView}
                      delay={i * 0.1}
                    />
                    <p className="text-[0.65rem] text-text-3 font-mono tracking-[0.1em] uppercase mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SectionRevealer>

          {/* Right: Content */}
          <SectionRevealer delay={0.2}>
            <div className="flex flex-col gap-10">
              {/* Name + title */}
              <div>
                <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.05] mb-3">
                  {data.name}
                </h2>
                <p className="text-base text-text-2 font-mono">
                  {data.title} — {data.location}
                </p>
              </div>

              {/* Bio */}
              <div
                className="text-[1.05rem] leading-[1.8] text-text-2 border-l border-border-2 pl-6"
                dangerouslySetInnerHTML={{ __html: data.bodyHtml }}
              />

              {/* Skills */}
              <div>
                <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-text-3 mb-4">
                  Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: i * 0.04, duration: 0.4 }}
                      whileHover={{
                        borderColor: 'var(--color-text)',
                        color: 'var(--color-text)',
                      }}
                      className="px-3.5 py-1.5 text-[0.75rem] font-mono text-text-2 border border-border-2 tracking-[0.05em] cursor-default transition-colors duration-200"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Socials */}
              <div className="flex gap-4">
                {data.socials.github && (
                  <SocialLink href={data.socials.github} label="GitHub" />
                )}
                {data.socials.linkedin && (
                  <SocialLink href={data.socials.linkedin} label="LinkedIn" />
                )}
                {data.socials.email && (
                  <SocialLink
                    href={`mailto:${data.socials.email}`}
                    label="Email"
                  />
                )}
              </div>
            </div>
          </SectionRevealer>
        </div>
      </div>
    </section>
  )
}

function AnimatedCount({
  value,
  suffix,
  trigger,
  delay,
}: {
  value: number
  suffix: string
  trigger: boolean
  delay: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (trigger && !hasRun.current && ref.current) {
      hasRun.current = true
      let start = 0
      const duration = 1200
      const startTime = performance.now()

      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        start = Math.round(eased * value)
        if (ref.current) ref.current.textContent = `${start}${suffix}`
        if (progress < 1) requestAnimationFrame(step)
      }

      const timer = setTimeout(() => requestAnimationFrame(step), delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [trigger, value, suffix, delay])

  return (
    <span
      ref={ref}
      className="text-[1.75rem] font-bold tracking-[-0.03em] text-text block"
    >
      0{suffix}
    </span>
  )
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="hover"
      whileHover={{ y: -2 }}
      className="font-mono text-[0.75rem] tracking-[0.1em] uppercase text-text-3 border-b border-border-2 pb-0.5 transition-colors duration-200 hover:text-text hover:border-text"
    >
      {label} ↗
    </motion.a>
  )
}
