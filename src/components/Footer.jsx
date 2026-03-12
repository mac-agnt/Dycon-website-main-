import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const socials = [
  { label: 'Facebook', ariaLabel: 'Dycon on Facebook' },
  { label: 'Twitter', ariaLabel: 'Dycon on Twitter' },
  { label: 'Instagram', ariaLabel: 'Dycon on Instagram' },
  { label: 'LinkedIn', ariaLabel: 'Dycon on LinkedIn' },
]

export default function Footer() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const els = sectionRef.current.querySelectorAll('[data-reveal]')
      gsap.from(els, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="bg-[#1A1A1A] py-24"
      style={{ position: 'relative', zIndex: 25 }}
    >
      <div className="mx-auto max-w-[1600px] px-[8%] text-center">
        <h2
          data-reveal
          className="text-3xl font-bold uppercase leading-[0.95] tracking-tight text-[#F5F0EB] sm:text-4xl lg:text-5xl"
          style={{ fontFamily: 'Oswald, sans-serif' }}
        >
          READY TO BUILD SOMETHING?
        </h2>

        <p data-reveal className="mt-8 text-base leading-relaxed text-[#8A8A8A]">
          +353 (0) 1 287 5738 &nbsp;|&nbsp; sales@dycon.ie &nbsp;|&nbsp; Kilcoole, Co. Wicklow
        </p>

        <div data-reveal className="mt-8 flex flex-wrap items-center justify-center gap-8">
          {socials.map((s) => (
            <a
              key={s.label}
              href="#"
              aria-label={s.ariaLabel}
              className="text-base text-[#8A8A8A] transition-colors duration-300 ease-out hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div data-reveal className="mt-4">
          <a
            href="#"
            className="text-base text-[#4CAF50] transition-colors duration-300 ease-out hover:text-white"
          >
            Retailer Login
          </a>
        </div>

        <p data-reveal className="mt-16 text-sm text-[#555]">
          &copy; 2025 Dycon Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
