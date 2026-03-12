import { useRef, useEffect, Suspense, lazy } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PaintCanScene = lazy(() => import('./PaintCanScene'))

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const timelineItems = [
  {
    year: '1978',
    title: 'Founded in Dun Laoghaire',
    body: 'Dycon was established with a vision of strong Irish manufacturing, creating premium quality products built to perform in Irish conditions.',
  },
  {
    year: '1981',
    title: 'Moved to Kilcoole, Co. Wicklow',
    body: 'The company relocated to realise its manufacturing ambitions, building a purpose-built facility that would grow to over 2,000 square metres.',
  },
  {
    year: 'Today',
    title: "Ireland's Trusted Trade Partner",
    body: 'Now home to 8 leading brands and serving trade professionals and DIYers across Ireland. Our foundation has never changed: Quality Manufacturing and Quality Branding.',
  },
]

export default function About() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const aboutScrollRef = useRef(1)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const heading = headingRef.current
      const entries = section.querySelectorAll('[data-timeline-entry]')

      if (prefersReducedMotion()) {
        if (heading) gsap.set(heading, { opacity: 1, y: 0 })
        gsap.set('[data-dot]', { scale: 1, opacity: 1 })
        gsap.set('[data-year]', { x: 0, opacity: 1 })
        gsap.set('[data-copy]', { opacity: 1 })
        const canContainer = section.querySelector('[data-about-can]')
        if (canContainer) gsap.set(canContainer, { opacity: 1 })
        return
      }

      if (heading) {
        gsap.fromTo(
          heading,
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

      const canContainer = section.querySelector('[data-about-can]')
      if (canContainer) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 25%',
          onEnter: () => {
            gsap.set(canContainer, { opacity: 1 })
          },
          onLeaveBack: () => {
            gsap.set(canContainer, { opacity: 0 })
          },
        })
      }

      entries.forEach((entry) => {
        const dot = entry.querySelector('[data-dot]')
        const year = entry.querySelector('[data-year]')
        const copy = entry.querySelector('[data-copy]')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: entry,
            start: 'top 80%',
          },
        })

        tl.fromTo(
          dot,
          { scale: 0, opacity: 0, transformOrigin: 'center center' },
          { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.7)' }
        )
          .fromTo(
            year,
            { x: 30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
            0.05
          )
          .fromTo(
            copy,
            { opacity: 0 },
            { opacity: 1, duration: 0.6, ease: 'power2.out' },
            0.2
          )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="cream-section relative min-h-screen bg-[#F5F0EB] py-32 lg:py-36"
    >
      <div className="relative z-10 mx-auto max-w-[1600px] px-[8%]">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-0">
          <div className="hidden lg:block lg:w-[45%]">
            <div className="sticky top-[10vh]" style={{ height: '80vh', opacity: 0 }} data-about-can>
              <div style={{ width: '100%', height: '100%' }}>
                <Suspense fallback={null}>
                  <PaintCanScene scrollProgressRef={aboutScrollRef} />
                </Suspense>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[55%] lg:pl-12">
            <div ref={headingRef} className="mb-16">
              <div className="mb-6 h-[3px] w-10 bg-[#4CAF50]" />
              <h2
                className="text-3xl font-bold uppercase leading-[0.95] tracking-tight text-[#1A1A1A] sm:text-4xl lg:text-5xl"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                OUR STORY
              </h2>
            </div>

            <div className="relative">
              <div
                className="pointer-events-none absolute left-[5px] top-[6px] h-[calc(100%-28px)] w-[2px] bg-[#2D5A27]"
                aria-hidden="true"
              />
              <div className="space-y-16">
                {timelineItems.map((item) => (
                  <article key={item.year} data-timeline-entry className="relative flex gap-6">
                    <div className="relative z-10 mt-2">
                      <div data-dot className="h-3 w-3 rounded-full bg-[#2D5A27]" />
                    </div>

                    <div className="min-w-0">
                      <h3
                        data-year
                        className="mb-1 text-4xl font-bold uppercase leading-none text-[#1A1A1A]"
                        style={{ fontFamily: 'Oswald, sans-serif' }}
                      >
                        {item.year}
                      </h3>
                      <p data-copy className="mb-3 text-base leading-relaxed text-[#555]">
                        {item.title}
                      </p>
                      <p data-copy className="max-w-2xl text-base leading-relaxed text-[#555] lg:text-lg">
                        {item.body}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
