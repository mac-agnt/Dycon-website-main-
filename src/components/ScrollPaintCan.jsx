import { useRef, useEffect, useState, Suspense, lazy } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PaintCanScene = lazy(() => import('./PaintCanScene'))

export default function ScrollPaintCan({ scrollProgressRef }) {
  const wrapperRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!isDesktop || !wrapperRef.current) return

    const hero = document.getElementById('hero')
    const about = document.getElementById('about')
    const aboutCanTarget = document.querySelector('[data-about-can]')
    if (!hero || !about || !aboutCanTarget) return

    const wrapper = wrapperRef.current
    const vh = window.innerHeight
    const vw = window.innerWidth

    const heroContentWidth = vw * 0.45
    const startX = vw - heroContentWidth + (heroContentWidth - 550) / 2
    const startY = (vh - 600) / 2

    const targetLeft = aboutCanTarget.getBoundingClientRect().left + window.scrollX
    const targetWidth = aboutCanTarget.offsetWidth
    const endX = targetLeft + (targetWidth - 550) / 2
    const endY = vh * 0.1

    gsap.set(wrapper, { x: startX, y: startY, opacity: 1 })

    const ctx = gsap.context(() => {
      gsap.to(wrapper, {
        x: endX,
        y: endY,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'center center',
          endTrigger: about,
          end: 'top 25%',
          scrub: 0.8,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress
          },
        },
      })

      ScrollTrigger.create({
        trigger: about,
        start: 'top 25%',
        onEnter: () => {
          gsap.set(wrapper, { opacity: 0 })
        },
        onLeaveBack: () => {
          gsap.set(wrapper, { opacity: 1 })
        },
      })
    })

    document.fonts?.ready?.then(() => ScrollTrigger.refresh())

    return () => ctx.revert()
  }, [isDesktop, scrollProgressRef])

  if (!isDesktop) return null

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 20 }}>
      <div
        ref={wrapperRef}
        className="absolute"
        style={{
          width: 550,
          height: 600,
          left: 0,
          top: 0,
          pointerEvents: 'none',
        }}
      >
        <Suspense fallback={null}>
          <PaintCanScene scrollProgressRef={scrollProgressRef} />
        </Suspense>
      </div>
    </div>
  )
}
