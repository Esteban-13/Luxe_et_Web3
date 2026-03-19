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

      {/* Badge disponibilité */}
      <div className="mb-3">
        {watch.forSale ? (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded-full text-[9px] text-emerald-700 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            Disponible
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-[9px] text-gray-500 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
            Vendue
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {watch.forSale && (
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
        )}
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