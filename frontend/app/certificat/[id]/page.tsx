"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import Navbar from "@/components/Navbar"
import ImagePlaceholder from "@/components/ImagePlaceholder"
import { useWatches } from "@/lib/useWatches"

export default function CertificatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { watches, loading } = useWatches()

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col max-w-sm mx-auto">
        <Navbar leftLabel="Retour" leftHref="/" />
        <main className="flex-1 px-4 py-8 flex items-center justify-center">
          <p className="text-[#3a3a5c] text-sm font-light">Chargement...</p>
        </main>
      </div>
    )
  }

  const watch = watches.find((w) => w.tokenId === parseInt(id))
  if (!watch) notFound()

  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto">
      <Navbar leftLabel="Retour" leftHref="/" />
      <main className="flex-1 px-4 py-8">
        <h1 className="font-serif text-3xl font-light text-[#1a1a2e] mb-6">
          Certificat
        </h1>
        <div className="bg-[#f5eccd] border border-[#e0d5b0] rounded-2xl p-4">
          <div className="h-[110px] mb-4">
            <ImagePlaceholder />
          </div>
          <h2 className="font-serif text-xl font-medium text-[#1a1a2e] mb-4">
            {watch.name}
          </h2>
          {[
            { label: "Modèle", value: watch.model },
            { label: "Série", value: watch.serialNumber },
            { label: "Année de fabrication", value: watch.yearOfManufacture },
            { label: "Matière", value: watch.materials },
            { label: "Calibre", value: watch.calibre },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center py-2 border-b border-[#e0d5b0]">
              <span className="text-[10px] uppercase tracking-widest text-[#3a3a5c]">{row.label}</span>
              <span className="text-[11px] text-[#252540]">{row.value}</span>
            </div>
          ))}
          <div className="flex justify-between items-center py-2 border-b border-[#e0d5b0]">
            <span className="text-[10px] uppercase tracking-widest text-[#3a3a5c]">Propriétaire</span>
            <span className="text-[11px] text-[#252540] truncate max-w-[160px]">{watch.owner}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-[10px] uppercase tracking-widest text-[#3a3a5c]">Authenticité</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded-full text-[9px] text-emerald-700 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
              Vérifié ✓
            </span>
          </div>
          <button className="mt-4 w-full py-2 bg-[#1a1a2e] text-[#e8c96a] rounded-full text-[10px] uppercase tracking-widest hover:opacity-85 transition-opacity">
            Télécharger
          </button>
        </div>
      </main>
    </div>
  )
}