"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import ProductCard from "@/components/ProductCard"
import { useWatches } from "@/lib/useWatches"
import { useCart } from "@/lib/CartContext"

export default function Home() {
  const router = useRouter()
  const { watches, loading } = useWatches()
  const { addToCart } = useCart()

  useEffect(() => {
    const user = localStorage.getItem("timury_user")
    if (!user) router.push("/")
  }, [router])

  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto">
      <Navbar isHome />
      <main className="flex-1 px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-light text-[#1a1a2e] mb-4">
            Bienvenue chez Timury
          </h1>
          <div className="w-8 h-px bg-[#b8860b] mx-auto mb-4" />
          <p className="text-[12px] text-[#3a3a5c] leading-relaxed font-light mb-5">
            « L&#39;authenticité ne devrait pas être une question. Elle devrait être une certitude. »
          </p>
          <Link href="/scan" className="px-6 py-2 bg-[#1a1a2e] text-[#e8c96a] rounded-full text-[10px] uppercase tracking-widest">
            Scannez votre article ici
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-16 text-[#3a3a5c] text-sm font-light">
            Chargement des montres...
          </div>
        ) : (
          watches.map((watch) => (
            <ProductCard key={watch.tokenId} watch={watch} onAddToCart={addToCart} />
          ))
        )}
      </main>
    </div>
  )
}