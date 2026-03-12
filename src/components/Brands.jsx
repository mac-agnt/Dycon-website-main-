import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const brands = [
  { name: 'Panabond',          logo: '/Panabond-logo.png' },
  { name: 'Akfix',             logo: '/akfix-logo (1).png' },
  { name: 'Rust-Oleum',        logo: '/rust-oleum-logo (1).png' },
  { name: 'Seal-Guard',        logo: '/seal_guard_logo.png' },
  { name: 'Schomburg',         logo: '/schomburg.png' },
  { name: 'Mellerud',          logo: '/mellerud-logo.png' },
  { name: 'Metolux',           logo: '/metolux-logo.png' },
  { name: 'Progress Profiles', logo: '/Progress_Profiles-logo.png' },
]

const row1 = brands.slice(0, 4)
const row2 = brands.slice(4, 8)

function MarqueeRow({ items, direction = 'left', duration = 30 }) {
  const tripled = [...items, ...items, ...items]
  const animationName = direction === 'left' ? 'marqueeLeft' : 'marqueeRight'

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex w-max gap-16 lg:gap-24"
        style={{ animation: `${animationName} ${duration}s linear infinite` }}
      >
        {tripled.map((brand, i) => (
          <div
            key={`${brand.name}-${i}`}
            className="flex flex-shrink-0 flex-col items-center justify-center px-4"
          >
            <div className="flex h-[80px] w-[160px] items-center justify-center lg:h-[100px] lg:w-[200px]">
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-[45px] w-auto max-w-[140px] object-contain grayscale transition-all duration-500 hover:scale-110 hover:grayscale-0 lg:max-h-[55px] lg:max-w-[170px]"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Brands() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (prefersReducedMotion()) {
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const pauseMarquees = (el) => {
    el.querySelectorAll('[style*="animation"]').forEach((node) => {
      node.style.animationPlayState = 'paused'
    })
  }

  const resumeMarquees = (el) => {
    el.querySelectorAll('[style*="animation"]').forEach((node) => {
      node.style.animationPlayState = 'running'
    })
  }

  return (
    <section
      ref={sectionRef}
      id="brands"
      className="cream-section sticky top-0 overflow-hidden bg-[#F5F0EB] py-24 lg:py-32"
      style={{ zIndex: 10 }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="mx-auto mb-20 max-w-[1400px] px-[8%] text-center"
        style={{ opacity: 0 }}
      >
        <div className="mx-auto mb-6 h-[3px] w-10 bg-[#4CAF50]" />
        <h2
          className="text-4xl font-bold uppercase leading-[0.95] tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl"
          style={{ fontFamily: 'Oswald, sans-serif' }}
        >
          TRUSTED BRANDS
        </h2>
        <p
          className="mx-auto mt-5 max-w-md text-base text-[#8A8A8A] lg:text-lg"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Proven quality from world-leading manufacturers
        </p>
      </div>

      {/* Marquee rows */}
      <div
        className="space-y-8 lg:space-y-12"
        onMouseEnter={(e) => pauseMarquees(e.currentTarget)}
        onMouseLeave={(e) => resumeMarquees(e.currentTarget)}
      >
        <MarqueeRow items={row1} direction="left" duration={35} />
        <MarqueeRow items={row2} direction="right" duration={40} />
      </div>

      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[100px] bg-gradient-to-r from-[#F5F0EB] to-transparent lg:w-[200px]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[100px] bg-gradient-to-l from-[#F5F0EB] to-transparent lg:w-[200px]" />
    </section>
  )
}
