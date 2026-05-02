'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const modes = [
  { value: 'light', icon: Sun },
  { value: 'dark', icon: Moon },
  { value: 'system', icon: Monitor },
] as const

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const currentTheme = mounted ? (theme ?? 'system') : 'system'
  const currentMode =
    modes.find((mode) => mode.value === currentTheme) ?? modes[2]
  const CurrentIcon = currentMode.icon

  return (
    <div
      ref={containerRef}
      className="fixed bottom-24 md:bottom-4 right-4 z-[999]"
      aria-label="Theme"
    >
      <button
        type="button"
        aria-label={`Theme: ${currentMode.value}`}
        aria-expanded={open}
        aria-haspopup="menu"
        title="Theme"
        data-cursor="hover"
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg/75 text-text shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-colors duration-200 hover:border-border-2"
      >
        <CurrentIcon aria-hidden size={17} strokeWidth={2} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full right-0 mb-2 w-fit rounded-2xl border border-border bg-bg/86 p-1.5 shadow-[0_18px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl"
            role="menu"
            aria-label="Theme options"
          >
            {modes.map(({ value, icon: Icon }) => {
              const active = currentTheme === value

              return (
                <button
                  key={value}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  data-cursor="hover"
                  onClick={() => {
                    setTheme(value)
                    setOpen(false)
                  }}
                  className={`flex h-10 w-full items-center gap-3 rounded-xl px-3 text-left font-mono text-xs transition-colors duration-200 ${
                    active
                      ? 'bg-text text-bg'
                      : 'text-text-2 hover:bg-card hover:text-text'
                  }`}
                >
                  <Icon aria-hidden size={16} strokeWidth={2} />
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
