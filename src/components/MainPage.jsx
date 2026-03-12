import { Suspense, lazy } from 'react'

const PaintCanScene = lazy(() => import('./PaintCanScene'))

const products = [
  { name: 'Panabond Rapid-Set', tags: ['IRFA', 'SooDM'], brand: 'Panabond' },
  { name: 'Schomburg Soloplan', tags: ['Healt Day', 'Dispatch'], brand: 'Schomburg' },
  { name: 'Schomburg Saniflex', tags: [], brand: 'Schomburg' },
  { name: 'Seal-Guard Aerosol', tags: [], brand: 'Seal-Guard' },
  { name: 'Rust-Oleum CombiColor', tags: [], brand: 'Rust-Oleum' },
  { name: "Painter's Touch", tags: [], brand: 'Rust-Oleum' },
  { name: 'Akfix PU Foam', tags: [], brand: 'Akfix' },
  { name: 'Level Pro X80', tags: [], brand: 'Panabond' },
]

const industries = [
  { name: 'Construction' },
  { name: 'Manufacturing' },
  { name: 'Facilities' },
  { name: 'Events' },
  { name: 'Retail-Fit out' },
  { name: 'Automotive' },
]

const faqs = ['Delivery', 'MOQ', 'Warranty', 'Returns', 'Support']

const brands = [
  { name: 'Seal-Guard', logo: '/seal_guard_logo.png' },
  { name: 'Schomburg', logo: '/schomburg.png' },
  { name: 'Mellerud', logo: '/mellerud-logo.png' },
  { name: 'Panabond', logo: '/Panabond-logo.png' },
  { name: 'Akfix', logo: '/akfix-logo (1).png' },
  { name: 'Rust-Oleum', logo: '/rust-oleum-logo (1).png' },
]

const steps = [
  { label: 'Connect', path: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z' },
  { label: 'Manufacture', path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { label: 'Condition', path: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' },
  { label: 'Dispatch', path: 'M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z' },
]

export default function MainPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAFAFA] pb-24 pt-16">
      {/* Green ambient gradient — top right */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[90vh] w-[70vw]"
        style={{
          background: 'radial-gradient(ellipse at 68% 20%, rgba(165,205,158,0.72) 0%, rgba(188,218,182,0.5) 20%, rgba(212,232,206,0.32) 38%, rgba(235,245,232,0.14) 58%, transparent 72%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-8 lg:px-16">
        {/* ===== HERO ===== */}
        <div className="flex flex-col gap-8 pb-8 pt-36 lg:flex-row lg:items-start lg:gap-0 lg:pb-12 lg:pt-[34vh]">
          {/* Left content */}
          <div className="w-full lg:w-[52%] lg:pr-12">
            <h1
              className="text-[clamp(1.9rem,3.1vw,2.55rem)] leading-[1.18] text-[#1A1A1A]"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: '-0.015em' }}
            >
              Delivering Solutions Across Ireland & the UK Since 1978
            </h1>

            <p
              className="mt-6 max-w-[440px] text-[13.5px] leading-[1.75] text-[#999]"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
            >
              Trusted by contractors and businesses nationwide for reliable stock, trade pricing, and rapid dispatch
            </p>

            {/* Trust badges with line separators */}
            <div className="mt-10 flex flex-wrap items-center gap-y-3">
              {['ISO Certified', 'Rapid Dispatch', 'Ireland/UK Support', 'Trade Pricing'].map((badge, i) => (
                <div key={badge} className="flex items-center">
                  {i > 0 && <div className="mx-5 h-[14px] w-px bg-[#D5D5D5]" />}
                  <span
                    className="whitespace-nowrap text-[12.5px] text-[#888]"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, letterSpacing: '0.01em' }}
                  >
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — 3D Paint Can */}
          <div className="relative flex w-full items-start justify-center lg:w-[48%]">
            <div className="relative -mt-8 h-[360px] w-[360px] lg:-mr-20 lg:-mt-16 lg:h-[500px] lg:w-[500px]">
              <Suspense fallback={null}>
                <PaintCanScene />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="w-full overflow-hidden rounded-2xl border border-[#F0F0F0] bg-white p-6 shadow-[0_1px_12px_rgba(0,0,0,0.04)] lg:w-[60%] lg:p-7">
            <div className="mb-5 flex items-center justify-between">
              <h2
                className="text-lg font-bold text-[#1A1A1A] lg:text-xl"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Products
              </h2>
              <div className="relative">
                <select
                  className="appearance-none rounded-full border border-[#E8E8E8] bg-white px-4 py-1.5 pr-8 text-xs font-medium text-[#1A1A1A] outline-none"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  <option>All Categories</option>
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {products.slice(0, 6).map((product) => (
                <div key={product.name} className="overflow-hidden rounded-xl border border-[#F0F0F0] bg-white transition-all duration-200 hover:shadow-md">
                  <div className="flex h-[100px] items-center justify-center rounded-lg bg-[#F4F4F4] lg:h-[120px]">
                    <span className="text-xs font-medium uppercase tracking-wider text-[#1A1A1A]/10" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {product.brand}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="mb-1 text-xs font-semibold text-[#1A1A1A] lg:text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {product.name}
                    </h3>
                    {product.tags.length > 0 && (
                      <div className="mb-2 flex flex-wrap gap-1">
                        {product.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-[#EEEEEE] px-2 py-0.5 text-[10px] text-[#999]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <a href="#" className="mt-2 block w-full rounded-lg bg-[#2D5A27] py-2 text-center text-xs font-semibold text-white transition-all duration-200 hover:bg-[#234A1F]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Buy Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col gap-6 lg:w-[40%]">
            <div className="rounded-2xl border border-[#F0F0F0] bg-white p-5 shadow-[0_1px_12px_rgba(0,0,0,0.04)] lg:p-6">
              <h3 className="mb-4 text-base font-bold text-[#1A1A1A] lg:text-lg" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Industries
              </h3>
              <div className="space-y-1">
                {industries.map((item) => (
                  <a key={item.name} href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] text-[#555] transition-colors hover:bg-[#F5F5F5]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#F4F4F4]">
                      <svg className="h-3.5 w-3.5 text-[#888]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#F0F0F0] bg-white p-5 shadow-[0_1px_12px_rgba(0,0,0,0.04)] lg:p-6">
              <h3 className="mb-4 text-base font-bold text-[#1A1A1A] lg:text-lg" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                FAQs
              </h3>
              <div className="space-y-0.5">
                {faqs.map((faq) => (
                  <a key={faq} href="#" className="flex items-center justify-between rounded-lg px-2 py-2.5 text-sm text-[#555] transition-colors hover:bg-[#F5F5F5]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {faq}
                    <svg className="h-4 w-4 text-[#CCC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-8 px-2">
          {brands.map((brand) => (
            <img key={brand.name} src={brand.logo} alt={brand.name} className="h-[28px] w-auto object-contain opacity-70 transition-opacity hover:opacity-100 lg:h-[34px]" loading="lazy" />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A] lg:text-3xl" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Ready in 24–72 hours.
            </h2>
            <p className="mt-2 text-sm text-[#888]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Send your spec — we'll quote today.
            </p>
          </div>
          <div className="flex items-center gap-6">
            {steps.map((step) => (
              <div key={step.label} className="flex flex-col items-center gap-1.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                  <svg className="h-5 w-5 text-[#2D5A27]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d={step.path} />
                  </svg>
                </div>
                <span className="text-[10px] font-medium text-[#999]" style={{ fontFamily: 'DM Sans, sans-serif' }}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-[#E8E3DD] pt-6 text-center">
          <p className="text-xs text-[#BBB]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            © 2025 Dycon Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  )
}
