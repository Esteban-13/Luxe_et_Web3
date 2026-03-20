"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"

interface PurchasedItem {
  tokenId: number
  name: string
  serialNumber: string
  price: number
  quantity: number
}

export default function ConfirmationPage() {
  const router = useRouter()
  const [items, setItems] = useState<PurchasedItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("timury_last_purchase")
    if (!saved) {
      router.push("/home")
      return
    }
    setItems(JSON.parse(saved))
  }, [router])

  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto">
      <Navbar showCart={false} />
      <main className="flex-1 px-4 py-8">

        {/* Succès */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h1 className="font-serif text-3xl font-light text-[#1a1a2e] mb-2">
            Achat confirmé
          </h1>
          <div className="w-8 h-px bg-[#b8860b] mx-auto mb-4" />
          <p className="text-[12px] text-[#3a3a5c] leading-relaxed font-light">
            Votre certificat d'authenticité a été créé sur la blockchain et vous appartient désormais.
          </p>
        </div>

        {/* Montres achetées */}
        {items.map((item) => (
          <div key={item.tokenId} className="bg-[#f5eccd] border border-[#e0d5b0] rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-serif text-[16px] font-medium text-[#1a1a2e]">{item.name}</h3>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded-full text-[9px] text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                Vérifié ✓
              </span>
            </div>
            <div className="text-[10px] text-[#3a3a5c] leading-relaxed mb-3">
              Série — <strong className="font-normal text-[#252540]">{item.serialNumber}</strong>
            </div>
            <Link
              href={`/certificat/${item.tokenId}`}
              className="inline-flex items-center px-4 py-2 bg-[#1a1a2e] text-[#e8c96a] rounded-full text-[9px] uppercase tracking-widest hover:opacity-85 transition-opacity"
            >
              Voir le certificat →
            </Link>
          </div>
        ))}

        <Link
          href="/home"
          className="block text-center mt-4 text-[10px] uppercase tracking-widest text-[#3a3a5c] underline underline-offset-4"
        >
          Retour au catalogue
        </Link>

      </main>
    </div>
  )
}