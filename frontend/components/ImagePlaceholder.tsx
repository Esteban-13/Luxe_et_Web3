export default function ImagePlaceholder() {
  return (
    <div className="w-full h-full min-h-[100px] bg-[#ede0b5] rounded-xl flex flex-col items-center justify-center gap-2">
      <svg width="32" height="25" viewBox="0 0 36 28" fill="none" className="opacity-25">
        <rect x="0.5" y="0.5" width="35" height="27" rx="3" stroke="#1a1a2e" />
        <circle cx="13" cy="12" r="4" stroke="#1a1a2e" />
        <path d="M0 20L10 13L18 18L26 10L36 17" stroke="#1a1a2e" />
      </svg>
      <span className="text-[9px] text-[#3a3a5c] uppercase tracking-widest">Photo</span>
    </div>
  )
}