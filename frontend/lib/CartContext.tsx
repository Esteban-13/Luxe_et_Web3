"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface CartItem {
  tokenId: number
  name: string
  serialNumber: string
  price: number
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  updateQty: (tokenId: number, delta: number) => void
  remove: (tokenId: number) => void
  total: number
  count: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    const saved = localStorage.getItem("timury_cart")
    if (saved) setCart(JSON.parse(saved))
  }, [])

  // Sauvegarder le panier dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("timury_cart", JSON.stringify(cart))
  }, [cart])

  function addToCart(item: Omit<CartItem, "quantity">) {
    setCart((prev) => {
      const existing = prev.find((i) => i.tokenId === item.tokenId)
      if (existing) {
        return prev.map((i) =>
          i.tokenId === item.tokenId ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  function updateQty(tokenId: number, delta: number) {
    setCart((prev) =>
      prev
        .map((i) => i.tokenId === tokenId ? { ...i, quantity: i.quantity + delta } : i)
        .filter((i) => i.quantity > 0)
    )
  }

  function remove(tokenId: number) {
    setCart((prev) => prev.filter((i) => i.tokenId !== tokenId))
  }

  const total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0)
  const count = cart.reduce((acc, i) => acc + i.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, remove, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}