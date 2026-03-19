"use client"

import Link from "next/link"
import ImagePlaceholder from "./ImagePlaceholder"
import { Watch } from "@/lib/useWatches"

interface ProductCardProps {
  watch: Watch
  onAddToCart: (watch: { tokenId: number; name: string; serialNumber: string; price: number }) => void
}

export default function ProductCard({ watch, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-[#f5eccd] border border-[#e0d5b0] rounded-2xl p-4 mb-4">
      <div className="h-[90px] mb-3">
        <ImagePlaceholder />
      </div>
      <h3 className="font-serif text-[16px] font-medium text-[#1a1a2e] mb-1">
        {watch.name}
      </h3>
      <div className="text-[10px] text-[#3a3a5c] leading-relaxed mb-2">
        Série — <strong className="font-normal text-[#252540]">{watch.serialNumber}</strong><br />
        Modèle — <strong className="font-normal text-[#252540]">{watch.model}</strong>
      </div>
      <p className="font-serif text-[17px] text-[#1a1a2e] mb-3">
        {watch.price.toLocaleString("fr-FR")} €
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onAddToCart({
            tokenId: watch.tokenId,
            name: watch.name,
            serialNumber: watch.serialNumber,
            price: watch.price,
          })}
          className="flex-1 py-2 bg-[#1a1a2e] text-[#e8c96a] rounded-full text-[9px] uppercase tracking-widest hover:opacity-85 transition-opacity"
        >
          + Ajouter au panier
        </button>
        <Link
          href={`/certificat/${watch.tokenId}`}
          className="px-3 py-2 border border-[#1a1a2e] rounded-full text-[9px] uppercase tracking-widest text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-[#e8c96a] transition-all"
        >
          Certificat
        </Link>
      </div>
    </div>
  )
}