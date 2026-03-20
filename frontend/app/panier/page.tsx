"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import ImagePlaceholder from "@/components/ImagePlaceholder"
import { useCart } from "@/lib/CartContext"

export default function PanierPage() {
  const router = useRouter()
  const { cart, updateQty, remove, total } = useCart()
  const tva = Math.round(total * 0.2)
  const totalTTC = total + tva

  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto">
      <Navbar leftLabel="Catalogue" leftHref="/home" showCart={false} />
      <main className="flex-1 px-4 py-8">
        <h1 className="font-serif text-3xl font-light text-[#1a1a2e] mb-1">
          Mon panier
        </h1>
        <p className="text-[10px] text-[#3a3a5c] mb-6">
          {cart.length} article{cart.length > 1 ? "s" : ""}
        </p>

        {cart.length === 0 ? (
          <div className="text-center py-16 text-[#3a3a5c] text-sm font-light">
            Votre panier est vide.
            <Link href="/home" className="block mt-4 text-[#b8860b] underline underline-offset-2 text-[12px]">
              Retour au catalogue
            </Link>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.tokenId} className="flex gap-3 bg-[#f5eccd] border border-[#e0d5b0] rounded-2xl p-3 mb-3">
                <div className="w-16 h-16 flex-shrink-0">
                  <ImagePlaceholder />
                </div>
                <div className="flex-1">
                  <p className="font-serif text-[14px] font-medium text-[#1a1a2e]">{item.name}</p>
                  <p className="text-[9px] text-[#3a3a5c] mb-2">{item.serialNumber}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-serif text-[14px] text-[#1a1a2e]">
                      {(item.price * item.quantity).toLocaleString("fr-FR")} €
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.tokenId, -1)}
                        className="w-5 h-5 rounded-full border border-[#3a3a5c] flex items-center justify-center text-[12px] text-[#3a3a5c]"
                      >−</button>
                      <span className="text-[11px] text-[#1a1a2e]">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.tokenId, 1)}
                        className="w-5 h-5 rounded-full border border-[#3a3a5c] flex items-center justify-center text-[12px] text-[#3a3a5c]"
                      >+</button>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(item.tokenId)}
                    className="text-[9px] text-[#3a3a5c] underline underline-offset-2 mt-1"
                  >
                    Retirer
                  </button>
                </div>
              </div>
            ))}

            <div className="bg-[#f5eccd] border border-[#e0d5b0] rounded-2xl p-4 mt-2">
              <p className="text-[9px] uppercase tracking-widest text-[#3a3a5c] mb-3">Récapitulatif</p>
              <div className="flex justify-between py-2 border-b border-[#e0d5b0]">
                <span className="text-[11px] text-[#3a3a5c]">Sous-total</span>
                <span className="text-[11px] text-[#252540]">{total.toLocaleString("fr-FR")} €</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#e0d5b0]">
                <span className="text-[11px] text-[#3a3a5c]">Livraison</span>
                <span className="text-[11px] text-[#252540]">Offerte</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#e0d5b0]">
                <span className="text-[11px] text-[#3a3a5c]">TVA (20%)</span>
                <span className="text-[11px] text-[#252540]">{tva.toLocaleString("fr-FR")} €</span>
              </div>
              <div className="flex justify-between pt-3">
                <span className="text-[12px] font-medium text-[#1a1a2e] uppercase tracking-wider">Total</span>
                <span className="font-serif text-[18px] text-[#1a1a2e]">{totalTTC.toLocaleString("fr-FR")} €</span>
              </div>
            </div>

            <button
              onClick={() => router.push("/paiement")}
              className="mt-4 w-full py-3 bg-[#1a1a2e] text-[#e8c96a] rounded-full text-[11px] uppercase tracking-widest hover:opacity-85 transition-opacity"
            >
              Procéder au paiement →
            </button>
          </>
        )}
      </main>
    </div>
  )
}