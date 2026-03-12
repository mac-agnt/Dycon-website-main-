import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[80] transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
      }}
    >
      <div className="mx-auto flex max-w-[1440px] items-center px-10 py-5 lg:px-14">
        {/* Logo — far left */}
        <a href="#" className="flex-shrink-0">
          <img src="/dycon-logo.png" alt="Dycon" className="h-8 w-auto" />
        </a>

        {/* Nav links — centered */}
        <div className="hidden flex-1 items-center justify-center gap-10 md:flex">
          {['Home', 'About us', 'Contact', 'Products'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[14px] text-[#666] transition-colors duration-200 hover:text-[#1A1A1A]"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA — far right */}
        <a
          href="#"
          className="hidden rounded-full border-[1.5px] border-[#1A1A1A] px-7 py-2.5 text-[13px] text-[#1A1A1A] transition-all duration-300 hover:bg-[#1A1A1A] hover:text-white md:inline-block"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
        >
          Get Quote
        </a>
      </div>
    </nav>
  )
}
