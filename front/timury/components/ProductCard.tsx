"use client"

import Link from "next/link"
import ImagePlaceholder from "./ImagePlaceholder"

interface Product {
  id: string
  name: string
  serial: string
  owner: string
  price: number
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-[#f5eccd] border border-[#e0d5b0] rounded-2xl p-4 mb-4">
      <div className="h-[90px] mb-3">
        <ImagePlaceholder />
      </div>
      <h3 className="font-serif text-[16px] font-medium text-[#1a1a2e] mb-1">
        {product.name}
      </h3>
      <div className="text-[10px] text-[#3a3a5c] leading-relaxed mb-2">
        Série — <strong className="font-normal text-[#252540]">{product.serial}</strong><br />
        Propriétaire — <strong className="font-normal text-[#252540]">{product.owner}</strong>
      </div>
      <p className="font-serif text-[17px] text-[#1a1a2e] mb-3">
        {product.price.toLocaleString("fr-FR")} €
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onAddToCart(product)}
          className="flex-1 py-2 bg-[#1a1a2e] text-[#e8c96a] rounded-full text-[9px] uppercase tracking-widest hover:opacity-85 transition-opacity"
        >
          + Ajouter au panier
        </button>
        <Link
          href={`/certificat/${product.id}`}
          className="px-3 py-2 border border-[#1a1a2e] rounded-full text-[9px] uppercase tracking-widest text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-[#e8c96a] transition-all"
        >
          Certificat
        </Link>
      </div>
    </div>
  )
}