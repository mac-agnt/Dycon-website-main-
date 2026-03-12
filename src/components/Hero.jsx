import { lazy, Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'

const PaintCanScene = lazy(() => import('./PaintCanScene'))

export default function Hero() {
  const headingLinesRef = useRef([])
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lines = headingLinesRef.current.filter(Boolean)
    if (lines.length === 0 || !subtitleRef.current || !ctaRef.current) return

    if (prefersReducedMotion) {
      gsap.set(lines, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, y: 0 })
      gsap.set([subtitleRef.current, ctaRef.current], { opacity: 1, y: 0 })
      return
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.to(lines, {
      clipPath: 'inset(0% 0% 0% 0%)',
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.12,
    })
      .to(
        subtitleRef.current,
        { opacity: 1, y: 0, duration: 0.6 },
        0.5
      )
      .to(
        ctaRef.current,
        { opacity: 1, y: 0, duration: 0.6 },
        0.7
      )

    return () => tl.kill()
  }, [])

  return (
    <section
      id="hero"
      className="cream-section relative min-h-screen overflow-hidden bg-[#F5F0EB]"
    >
      <span
        className="pointer-events-none absolute right-[10%] top-1/2 z-0 -translate-y-1/2 select-none text-[18rem] leading-none tracking-tight text-[#E8E3DD]"
        style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}
        aria-hidden="true"
      >
        1978
      </span>

      <div className="relative z-10 flex min-h-screen items-center py-28 lg:py-36">
        <div className="w-full px-[8%] lg:w-[55%] lg:pl-[120px] lg:pr-10">
          <h1
            className="text-[clamp(3.2rem,8vw,7rem)] leading-[0.95] tracking-tight text-[#1A1A1A]"
            style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}
          >
            <span
              ref={(el) => { headingLinesRef.current[0] = el }}
              className="block uppercase"
              style={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, transform: 'translateY(18px)' }}
            >
              BUILDING
            </span>
            <span
              ref={(el) => { headingLinesRef.current[1] = el }}
              className="block uppercase"
              style={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, transform: 'translateY(18px)' }}
            >
              IRELAND
            </span>
            <span
              ref={(el) => { headingLinesRef.current[2] = el }}
              className="block uppercase"
              style={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, transform: 'translateY(18px)' }}
            >
              SINCE 1978
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-8 max-w-lg text-base leading-relaxed text-[#555] sm:text-lg"
            style={{ opacity: 0, transform: 'translateY(16px)' }}
          >
            Premium paints, coatings &amp; building solutions for Irish trade
            professionals and DIYers.
          </p>

          <a
            ref={ctaRef}
            href="#products"
            className="mt-10 inline-block rounded-full bg-[#4CAF50] px-10 py-4 text-base font-medium text-white transition-all duration-300 ease-out hover:scale-105 hover:bg-[#43A047]"
            style={{ opacity: 0, transform: 'translateY(16px)' }}
          >
            Explore Our Products
          </a>

          {/* Mobile-only static paint can */}
          <div className="mt-12 flex justify-center lg:hidden">
            <div style={{ width: 280, height: 350 }}>
              <Suspense fallback={null}>
                <PaintCanScene />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="hidden w-[45%] lg:block" />
      </div>
    </section>
  )
}
