'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  Mail,
  MoreHorizontal,
  UserRound,
} from 'lucide-react'
import { PORTOFOLIO } from '@/lib/constant'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Awards', href: '#awards' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

const mobilePrimaryLinks = [
  { label: 'About', href: '#about', icon: UserRound },
  { label: 'Work', href: '#experience', icon: BriefcaseBusiness },
  { label: 'Projects', href: '#projects', icon: FolderKanban },
  { label: 'Contact', href: '#contact', icon: Mail },
]

const mobileMoreLinks = [
  { label: 'Certifications', href: '#certifications', icon: BadgeCheck },
  { label: 'Awards', href: '#awards', icon: Award },
  { label: 'Education', href: '#education', icon: GraduationCap },
]

const initials = PORTOFOLIO.NAME.split(' ')
  .map((n) => n[0])
  .join('')
  .toUpperCase()

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const ticking = useRef(false)

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40)
          ticking.current = false
        })
        ticking.current = true
      }

      if (!document.body.classList.contains('is-scrolling')) {
        document.body.classList.add('is-scrolling')
      }
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling')
      }, 150)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  useEffect(() => {
    const sections = navLinks.map(
      (l) => document.querySelector(l.href) as HTMLElement | null
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    // Separate observer for the hero section with looser margin
    const heroEl = document.querySelector('#hero') as HTMLElement | null
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive('')
      },
      { threshold: 0.3 } // reset when 30% of hero is visible
    )

    sections.forEach((s) => s && observer.observe(s))
    if (heroEl) heroObserver.observe(heroEl)

    return () => {
      observer.disconnect()
      heroObserver.disconnect()
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const moreActive = mobileMoreLinks.some((link) => active === link.href)

  return (
    <>
      <header className="pointer-events-none fixed left-0 right-0 top-0 z-[1000] hidden md:block">
        <motion.nav
          layout
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Primary"
          className={`pointer-events-auto mx-auto flex items-center justify-between transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? 'mt-4 h-14 w-[min(880px,calc(100vw-2rem))] gap-8 rounded-full border border-border bg-bg/70 px-5 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-sm'
              : 'mt-0 h-16 w-[min(1200px,calc(100vw-4rem))] gap-10 rounded-none border-b border-transparent bg-transparent px-8 shadow-none backdrop-blur-none'
          }`}
        >
          <Link href="#hero" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-mono text-base font-medium tracking-[0.05em] text-text"
            >
              {initials}
            </motion.div>
          </Link>

          <ul className="flex list-none items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  isActive={active === link.href}
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </motion.nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeMenu}
            className="fixed inset-0 z-[1100] bg-bg/55 backdrop-blur-sm md:hidden"
          >
            <motion.div
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="absolute bottom-24 left-4 right-4 border border-border bg-bg/82 p-3 shadow-[0_18px_70px_rgba(0,0,0,0.36)] backdrop-blur-xl"
              aria-label="More navigation"
            >
              <div className="grid gap-1">
                {mobileMoreLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    className={`flex h-12 items-center gap-3 px-3 font-mono text-sm transition-colors duration-200 ${
                      active === href
                        ? 'bg-text text-bg'
                        : 'text-text-2 hover:bg-card hover:text-text'
                    }`}
                  >
                    <Icon aria-hidden size={18} strokeWidth={2} />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>

      <nav
        className="fixed bottom-4 left-4 right-4 z-[1000] mx-auto flex h-16 max-w-[440px] items-center justify-between border border-border bg-bg/78 px-2 shadow-[0_18px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl md:hidden"
        aria-label="Mobile primary"
      >
        {mobilePrimaryLinks.map(({ label, href, icon: Icon }) => (
          <MobileNavLink
            key={href}
            href={href}
            label={label}
            active={active === href}
            onClick={closeMenu}
          >
            <Icon aria-hidden size={20} strokeWidth={2} />
          </MobileNavLink>
        ))}

        <button
          type="button"
          aria-label="More sections"
          aria-expanded={menuOpen}
          data-cursor="hover"
          onClick={() => setMenuOpen((v) => !v)}
          className={`flex h-12 min-w-0 flex-1 flex-col items-center justify-center gap-1 border transition-colors duration-200 ${
            menuOpen || moreActive
              ? 'border-text bg-text text-bg'
              : 'border-transparent text-text-2 hover:border-border-2 hover:text-text'
          }`}
        >
          <MoreHorizontal aria-hidden size={21} strokeWidth={2} />
          <span className="text-[0.625rem] font-medium leading-none">More</span>
        </button>
      </nav>
    </>
  )
}

function NavLink({
  href,
  isActive,
  onClick,
  children,
}: {
  href: string
  isActive: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link href={href} onClick={onClick} className="relative inline-block">
      <motion.span
        className={`font-mono text-sm font-normal tracking-[0.05em] transition-colors duration-200 ${
          isActive ? 'text-text' : 'text-text-2'
        }`}
        whileHover={{ color: 'var(--color-text)' }}
      >
        {children}
      </motion.span>
      {isActive && (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-0.5 left-0 right-0 h-[1px] bg-text"
        />
      )}
    </Link>
  )
}

function MobileNavLink({
  href,
  label,
  active,
  onClick,
  children,
}: {
  href: string
  label: string
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      onClick={onClick}
      className={cn(
        'flex h-12 min-w-0 flex-1 flex-col items-center justify-center gap-1 border transition-colors duration-200',
        active
          ? 'border-text bg-text text-bg'
          : 'border-transparent text-text-2 hover:border-border-2 hover:text-text'
      )}
    >
      {children}
      <span className="max-w-full truncate text-[0.625rem] font-medium leading-none">
        {label}
      </span>
    </Link>
  )
}
