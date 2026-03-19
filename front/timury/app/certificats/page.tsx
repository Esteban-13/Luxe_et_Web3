import Navbar from "@/components/Navbar"
import { products } from "@/lib/data"
import Link from "next/link"

export default function CertificatsPage() {
  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto">
      <Navbar />
      <main className="flex-1 px-4 py-8">
        <h1 className="font-serif text-3xl font-light text-[#1a1a2e] mb-6">
          Mes certificats
        </h1>
        {products.map((p) => (
          <div key={p.id} className="bg-[#f5eccd] border border-[#e0d5b0] rounded-2xl p-4 mb-4">
            <div className="h-[90px] mb-3 bg-[#ede0b5] rounded-xl flex items-center justify-center">
              <svg width="32" height="25" viewBox="0 0 36 28" fill="none" className="opacity-25">
                <rect x="0.5" y="0.5" width="35" height="27" rx="3" stroke="#1a1a2e" />
                <circle cx="13" cy="12" r="4" stroke="#1a1a2e" />
                <path d="M0 20L10 13L18 18L26 10L36 17" stroke="#1a1a2e" />
              </svg>
            </div>
            <h3 className="font-serif text-[16px] font-medium text-[#1a1a2e] mb-1">{p.name}</h3>
            <div className="text-[10px] text-[#3a3a5c] leading-relaxed mb-3">
              Série — <strong className="font-normal text-[#252540]">{p.serial}</strong><br />
              Propriétaire — <strong className="font-normal text-[#252540]">{p.owner}</strong>
            </div>
            <Link
              href={`/certificat/${p.id}`}
              className="inline-flex items-center px-4 py-2 bg-[#1a1a2e] text-[#e8c96a] rounded-full text-[9px] uppercase tracking-widest hover:opacity-85 transition-opacity"
            >
              Voir le certificat →
            </Link>
          </div>
        ))}
      </main>
    </div>
  )
}