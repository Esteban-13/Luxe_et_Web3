"use client"

import { useState } from "react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import ProductCard from "@/components/ProductCard"
import { products } from "@/lib/data"

interface CartItem {
  id: string
  name: string
  serial: string
  owner: string
  price: number
  quantity: number
}

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])

  function addToCart(product: { id: string; name: string; serial: string; owner: string; price: number }) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

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
            « L&#39;authenticité ne devrait pas être une question. Elle devrait être une certitude.»
          </p>
          <Link href="/scan" className="px-6 py-2 bg-[#1a1a2e] text-[#e8c96a] rounded-full text-[10px] uppercase tracking-widest">
            Scannez votre article ici
          </Link>
        </div>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
        ))}
      </main>
    </div>
  )
}