'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import SectionRevealer from '../section-revealer'
import { EducationEntry } from '@/types/education'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export default function Education({ data }: { data: EducationEntry[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section id="education" className="py-32 border-t border-border bg-surface">
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionRevealer>
          <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-text-3 mb-16">
            06 - Education
          </p>
        </SectionRevealer>

        <div className="flex flex-col">
          {data.map((edu, i) => (
            <SectionRevealer key={i} delay={i * 0.1}>
              <div
                className={`border-b border-border transition-colors duration-300 ${
                  open === i ? 'bg-card' : 'bg-transparent'
                }`}
              >
                {/* Header */}
                <motion.button
                  onClick={() => setOpen(open === i ? null : i)}
                  data-cursor="hover"
                  className="w-full bg-transparent border-none cursor-none p-8 flex justify-between items-center gap-4 text-left transition-all duration-300 ease-in-out hover:pl-10"
                >
                  <div className="flex items-center gap-5">
                    {/* Institution logo */}
                    {edu.logo ? (
                      <div className="w-[44px] h-[44px] relative shrink-0 overflow-hidden rounded-[2px]">
                        <Image
                          src={edu.logo}
                          alt={edu.institution}
                          fill
                          className={cn(
                            'object-cover',
                            mounted && resolvedTheme === 'dark' && 'grayscale'
                          )}
                          sizes="44px"
                          onError={() => {}}
                        />
                      </div>
                    ) : (
                      <div className="w-[44px] h-[44px] bg-border flex items-center justify-center text-[1.1rem] shrink-0">
                        🎓
                      </div>
                    )}

                    <div>
                      <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em] mb-1">
                        {edu.degree}
                      </h3>
                      <p className="font-mono text-[0.75rem] text-text-2">
                        {edu.institution}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-mono text-[0.7rem] text-text-3 tracking-[0.05em]">
                      {edu.period}
                    </span>
                    <motion.span
                      animate={{
                        rotate: open === i ? 45 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="inline-block text-[1.2rem] text-text-3 leading-none"
                    >
                      +
                    </motion.span>
                  </div>
                </motion.button>

                {/* Expandable body */}
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: 'auto',
                      }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="px-8 pb-8 pl-8 min-[480px]:pl-[6rem] text-[0.95rem] leading-[1.8] text-text-2 whitespace-pre-line">
                        {edu.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SectionRevealer>
          ))}
        </div>
      </div>
    </section>
  )
}
