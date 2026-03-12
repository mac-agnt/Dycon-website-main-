import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    name: 'CombiColor',
    brand: 'Rust-Oleum',
    category: 'Metal Paint',
    description: 'Direct-to-rust metal paint. No primer needed. Interior and exterior use.',
  },
  {
    name: "Painter's Touch",
    brand: 'Rust-Oleum',
    category: 'Spray Paint',
    description: 'Multi-purpose spray paint with superior coverage and lasting durability.',
  },
  {
    name: 'Tile Adhesive',
    brand: 'Panabond',
    category: 'Adhesive',
    description: 'Professional-grade tile adhesive for walls and floors. Irish manufactured.',
  },
  {
    name: 'Level Pro X80',
    brand: 'Panabond',
    category: 'Self-Levelling',
    description: 'Fast-setting self-levelling compound. Walk-on ready in just 3 hours.',
  },
  {
    name: 'Système Grout',
    brand: 'Panabond',
    category: 'Grout',
    description: 'Flexible anti-mould grout available in 40+ colours. Stain resistant finish.',
  },
  {
    name: 'Aerosol Sealer',
    brand: 'Seal-Guard',
    category: 'Sealer',
    description: 'Invisible nano-protection for natural stone, brick, and concrete surfaces.',
  },
  {
    name: 'Universal',
    brand: 'Rust-Oleum',
    category: 'All-Surface Paint',
    description: 'Paint and primer in one. Any angle spray technology for all surfaces.',
  },
  {
    name: 'PU Foam',
    brand: 'Akfix',
    category: 'Expanding Foam',
    description: 'Professional polyurethane expanding foam for gaps, cracks, and insulation.',
  },
]

function ProductCard({ product, index }) {
  return (
    <div
      className="group flex w-[280px] flex-shrink-0 flex-col rounded-[20px] bg-[#F5F0EB] shadow-[0_4px_30px_rgba(0,0,0,0.15)] lg:w-[340px]"
      style={{
        transition: 'transform 400ms cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 400ms cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)'
      }}
    >
      {/* Image placeholder */}
      <div
        className="flex h-[220px] items-center justify-center rounded-t-[20px] overflow-hidden"
        style={{ backgroundColor: '#E8E3DD' }}
      >
        <span
          className="text-center text-[2.5rem] font-bold uppercase leading-none tracking-tight text-[#1A1A1A]"
          style={{ fontFamily: 'Oswald, sans-serif', opacity: 0.12 }}
        >
          {product.category}
        </span>
      </div>

      {/* Text area */}
      <div className="flex flex-1 flex-col p-6 pt-5">
        <p
          className="mb-1 text-xs font-medium uppercase tracking-wider text-[#4CAF50]"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {product.brand}
        </p>
        <h3
          className="mb-2 text-xl font-bold uppercase leading-tight text-[#1A1A1A] lg:text-2xl"
          style={{ fontFamily: 'Oswald, sans-serif' }}
        >
          {product.name}
        </h3>
        <span
          className="mb-3 inline-block self-start rounded-full bg-[#2D5A27]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#2D5A27]"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {product.category}
        </span>
        <p
          className="mb-5 line-clamp-2 flex-1 text-sm leading-relaxed text-[#666]"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {product.description}
        </p>

        {/* CTA */}
        <div className="group/btn flex cursor-pointer items-center gap-2">
          <span
            className="text-sm font-medium text-[#1A1A1A] transition-colors duration-300 group-hover/btn:text-[#4CAF50]"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Learn More
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
            aria-hidden="true"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#1A1A1A] transition-colors duration-300 group-hover/btn:text-[#4CAF50]"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const sectionRef = useRef(null)
  const wipeRef = useRef(null)
  const cardsContainerRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const wipe = wipeRef.current
    const cardsContainer = cardsContainerRef.current
    if (!section || !wipe || !cardsContainer) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(wipe, { scaleX: 1 })
      gsap.set('[data-products-header]', { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      const totalScrollWidth = cardsContainer.scrollWidth - window.innerWidth

      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${window.innerHeight + totalScrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // Phase 1: Paint wipe sweeps right → left (0% → 20%)
      masterTL.fromTo(
        wipe,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', duration: 0.2 },
        0
      )

      // Phase 2: Header fades in (15% → 25%)
      masterTL.fromTo(
        '[data-products-header]',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: 'power2.out', duration: 0.1 },
        0.15
      )

      // Phase 3: Cards scroll horizontally (25% → 100%)
      masterTL.to(
        cardsContainer,
        { x: -totalScrollWidth, ease: 'none', duration: 0.75 },
        0.25
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative h-screen overflow-hidden bg-[#2D5A27]"
      style={{ zIndex: 30 }}
    >
      {/* Green paint wipe — sweeps from right to left */}
      <div
        ref={wipeRef}
        className="absolute inset-0 bg-[#2D5A27]"
        style={{ transformOrigin: 'right center', scaleX: 0, zIndex: 1 }}
      />

      {/* Content layer */}
      <div className="relative flex h-full flex-col justify-center" style={{ zIndex: 2 }}>
        {/* Header */}
        <div
          data-products-header
          className="px-[8%] pb-8 pt-14"
          style={{ opacity: 0 }}
        >
          <div className="mb-5 h-[3px] w-10 bg-[#4CAF50]" />
          <h2
            className="text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white lg:text-5xl"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            MOST POPULAR PRODUCTS
          </h2>
          <p
            className="mt-4 max-w-lg text-base text-white/60 lg:text-lg"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Ireland&rsquo;s trade professionals trust these every day.
          </p>
        </div>

        {/* Horizontal scroll track */}
        <div className="flex-1 overflow-hidden">
          <div
            ref={cardsContainerRef}
            className="flex h-full items-center px-[8%]"
            style={{ width: 'max-content', gap: '28px' }}
          >
            {products.map((product, i) => (
              <ProductCard key={product.name + i} product={product} index={i} />
            ))}
            {/* End spacer */}
            <div className="h-1 w-[8vw] flex-shrink-0" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
