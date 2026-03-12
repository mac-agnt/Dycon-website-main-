export default function StickyBar() {
  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-[95%] max-w-[600px] -translate-x-1/2">
      <div className="flex items-center justify-between rounded-2xl bg-[#2A2A2A] px-6 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
        <p className="text-sm text-white/80" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Need a fast quote?
        </p>
        <a
          href="#"
          className="rounded-xl bg-[#4CAF50] px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#43A047]"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Get Quote
        </a>
      </div>
    </div>
  )
}
