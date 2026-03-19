import { notFound } from "next/navigation"
import Navbar from "@/components/Navbar"
import { products } from "@/lib/data"

export default function CertificatPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)
  if (!product) notFound()

  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto">
      <Navbar leftLabel="Retour" leftHref="/" />
      <main className="flex-1 px-4 py-8">
        <h1 className="font-serif text-3xl font-light text-[#1a1a2e] mb-6">
          Certificat
        </h1>
        <div className="bg-[#f5eccd] border border-[#e0d5b0] rounded-2xl p-4">
          <div className="h-[110px] mb-4 bg-[#ede0b5] rounded-xl flex items-center justify-center">
            <svg width="32" height="25" viewBox="0 0 36 28" fill="none" className="opacity-25">
              <rect x="0.5" y="0.5" width="35" height="27" rx="3" stroke="#1a1a2e" />
              <circle cx="13" cy="12" r="4" stroke="#1a1a2e" />
              <path d="M0 20L10 13L18 18L26 10L36 17" stroke="#1a1a2e" />
            </svg>
          </div>
          <h2 className="font-serif text-xl font-medium text-[#1a1a2e] mb-4">
            {product.name}
          </h2>
          {[
            { label: "Marque", value: product.brand },
            { label: "Série", value: product.serial },
            { label: "Propriétaire", value: product.owner },
            { label: "Token ID", value: product.tokenId, mono: true },
            { label: "Matériaux", value: product.materials },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center py-2 border-b border-[#e0d5b0]">
              <span className="text-[10px] uppercase tracking-widest text-[#3a3a5c]">{row.label}</span>
              <span className={`text-[11px] text-[#252540] ${row.mono ? "font-mono text-[10px]" : ""}`}>
                {row.value}
              </span>
            </div>
          ))}
          <div className="flex justify-between items-center py-2">
            <span className="text-[10px] uppercase tracking-widest text-[#3a3a5c]">Authenticité</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded-full text-[9px] text-emerald-700 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
              Vérifié
            </span>
          </div>
          <div className="mt-4 pt-4 border-t border-[#e0d5b0]">
            <p className="text-[10px] uppercase tracking-widest text-[#3a3a5c] mb-3">Historique</p>
            {product.history.map((entry, i) => (
              <div key={i} className="flex items-center gap-2 py-2 border-b border-[#e0d5b0] last:border-none">
                <span className="w-2 h-2 rounded-full bg-[#b8860b] flex-shrink-0" />
                <span className="text-[11px] text-[#252540]">{entry.label}</span>
                <span className="text-[10px] text-[#3a3a5c] ml-auto">{entry.date}</span>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2 bg-[#1a1a2e] text-[#e8c96a] rounded-full text-[10px] uppercase tracking-widest hover:opacity-85 transition-opacity">
            Télécharger
          </button>
        </div>
      </main>
    </div>
  )
}

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}