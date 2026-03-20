"use client"

import Navbar from "@/components/Navbar"
import Link from "next/link"
import ImagePlaceholder from "@/components/ImagePlaceholder"
import { useWatches } from "@/lib/useWatches"

export default function CertificatsPage() {
  const { watches, loading } = useWatches()

  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto">
      <Navbar />
      <main className="flex-1 px-4 py-8">
        <h1 className="font-serif text-3xl font-light text-[#1a1a2e] mb-6">
          Mes certificats
        </h1>

        {loading ? (
          <div className="text-center py-16 text-[#3a3a5c] text-sm font-light">
            Chargement...
          </div>
        ) : (
          watches.map((watch) => (
            <div key={watch.tokenId} className="bg-[#f5eccd] border border-[#e0d5b0] rounded-2xl p-4 mb-4">
              <div className="h-[90px] mb-3">
                <ImagePlaceholder />
              </div>
              <h3 className="font-serif text-[16px] font-medium text-[#1a1a2e] mb-1">{watch.name}</h3>
              <div className="text-[10px] text-[#3a3a5c] leading-relaxed mb-3">
                Série — <strong className="font-normal text-[#252540]">{watch.serialNumber}</strong><br />
                Propriétaire — <strong className="font-normal text-[#252540] truncate">{watch.owner}</strong>
              </div>
              <Link
                href={`/certificat/${watch.tokenId}`}
                className="inline-flex items-center px-4 py-2 bg-[#1a1a2e] text-[#e8c96a] rounded-full text-[9px] uppercase tracking-widest hover:opacity-85 transition-opacity"
              >
                Voir le certificat →
              </Link>
            </div>
          ))
        )}
      </main>
    </div>
  )
}