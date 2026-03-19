import Link from "next/link"
import Image from "next/image"

interface NavbarProps {
  leftLabel?: string
  leftHref?: string
  showCart?: boolean
  isHome?: boolean
}

export default function Navbar({ leftLabel, leftHref, showCart = true, isHome = false }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between h-14 px-4 bg-[#1a1a2e] border-b border-[#3a3a5c]">
      <div className="w-24">
        {leftLabel && leftHref ? (
          <Link href={leftHref} className="text-[10px] uppercase tracking-widest text-[#fdf6e3]/50 hover:text-[#e8c96a] transition-colors">
            ← {leftLabel}
          </Link>
        ) : isHome ? (
          <div />
        ) : (
          <Link href="/certificats" className="text-[10px] uppercase tracking-widest text-[#fdf6e3]/50 hover:text-[#e8c96a] transition-colors">
            Certificats
          </Link>
        )}
      </div>

      <Link href="/">
        <Image src="/logo.png" alt="Timury" width={36} height={36} className="object-contain" />
      </Link>

      <div className="w-24 flex items-center justify-end gap-3">
        {showCart && (
          <Link href="/panier" className="relative">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8c96a" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </Link>
        )}
        <Link href="/profil">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8c96a" strokeWidth="1.5">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
        </Link>
      </div>
    </nav>
  )
}