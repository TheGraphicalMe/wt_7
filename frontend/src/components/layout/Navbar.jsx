import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Platforms', href: '#platforms' },
  { label: 'Resources', href: '#blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/90 backdrop-blur-xl border-b border-white/[0.08] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-display text-xl font-bold text-gold-light tracking-wide"
        >
          Wizard Trader 7
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-[0.82rem] font-medium uppercase tracking-widest text-muted hover:text-[#f0ede6] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Button
            variant="nav"
            onClick={() => window.location.href = "https://courses.wizardtrader7.com"}
            className="self-start"
            >
            Login
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-[#f0ede6] transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2.5' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-[#f0ede6] transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-[#f0ede6] transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2.5' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-white/[0.08] px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm uppercase tracking-widest text-muted hover:text-[#f0ede6] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button
            variant="nav"
            onClick={() => window.location.href = "https://courses.wizardtrader7.com"}
            className="self-start"
            >
            Login
          </Button>
        </div>
      )}
    </header>
  )
}
