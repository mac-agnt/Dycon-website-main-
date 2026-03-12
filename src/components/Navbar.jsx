import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Brands', href: '#brands' },
  { label: 'Products', href: '#products' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    if (!navRef.current) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo(
      navRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, delay: 0.3, ease: 'power3.out' }
    )
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ease-out ${
          scrolled ? 'bg-[rgba(245,240,235,0.95)] shadow-sm backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-[5%] py-4">
          <a href="#" className="flex items-center gap-3">
            {!logoError ? (
              <img
                src="/dycon-logo.png"
                alt="Dycon"
                className="h-9 w-auto"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span
                className="text-2xl font-bold tracking-tight text-[var(--text-primary)]"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                DYCON
              </span>
            )}
          </a>

          <div className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#1A1A1A] transition-colors duration-300 ease-out hover:text-[#4CAF50]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#"
              className="rounded-full border-2 border-[#4CAF50] px-5 py-2 text-sm font-medium text-[#4CAF50] transition-all duration-300 ease-out hover:bg-[#4CAF50] hover:text-white"
            >
              Retailer Login
            </a>
          </div>

          <button
            className="relative z-50 flex flex-col gap-1.5 p-2 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span className={`block h-0.5 w-6 bg-[var(--text-primary)] transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-[var(--text-primary)] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-[var(--text-primary)] transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-[var(--bg-cream)] transition-all duration-500 ease-out lg:hidden ${
          mobileOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible'
        }`}
        aria-hidden={!mobileOpen}
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-3xl font-bold text-[var(--text-primary)] transition-colors duration-300 hover:text-[#4CAF50]"
            style={{ fontFamily: 'Oswald, sans-serif' }}
            onClick={() => setMobileOpen(false)}
            tabIndex={mobileOpen ? 0 : -1}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#"
          className="mt-4 rounded-full border-2 border-[#4CAF50] px-8 py-3.5 text-base font-medium text-[#4CAF50] transition-all duration-300 hover:bg-[#4CAF50] hover:text-white"
          tabIndex={mobileOpen ? 0 : -1}
        >
          Retailer Login
        </a>
      </div>
    </>
  )
}
