"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import { useCart } from "@/lib/CartContext"
import { createWalletClient, http } from "viem"
import { hardhat } from "viem/chains"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract"

export default function PaiementPage() {
  const router = useRouter()
  const { cart, total, remove } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const tva = Math.round(total * 0.2)
  const totalTTC = total + tva
  const email = typeof window !== "undefined" ? localStorage.getItem("timury_user") || "" : ""

  async function handlePaiement() {
    setLoading(true)
    setError("")
    try {
      const smartAddress = localStorage.getItem("timury_smart_address")
      const buyerAddress = smartAddress || "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"

      const walletClient = createWalletClient({
        chain: hardhat,
        transport: http("http://127.0.0.1:8545"),
      })

      for (const item of cart) {
        await walletClient.writeContract({
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: CONTRACT_ABI,
          functionName: "buyWatch",
          args: [BigInt(item.tokenId), buyerAddress as `0x${string}`],
          account: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        })
      }

      localStorage.setItem("timury_last_purchase", JSON.stringify(cart))
      cart.forEach(item => remove(item.tokenId))
      router.push("/confirmation")

    } catch (e) {
      console.error(e)
      setError("Une erreur est survenue lors du paiement")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto">
      <Navbar leftLabel="Panier" leftHref="/panier" showCart={false} />
      <main className="flex-1 px-4 py-8">
        <h1 className="font-serif text-3xl font-light text-[#1a1a2e] mb-6">Paiement</h1>
        <div className="bg-[#f5eccd] border border-[#e0d5b0] rounded-2xl p-4 mb-4">
          <p className="text-[10px] uppercase tracking-widest text-[#3a3a5c] mb-3">Récapitulatif</p>
          {cart.map((item) => (
            <div key={item.tokenId} className="flex justify-between py-2 border-b border-[#e0d5b0]">
              <span className="text-[11px] text-[#1a1a2e]">{item.name}</span>
              <span className="text-[11px] text-[#252540]">{item.price.toLocaleString("fr-FR")} €</span>
            </div>
          ))}
          <div className="flex justify-between py-2 border-b border-[#e0d5b0]">
            <span className="text-[11px] text-[#3a3a5c]">TVA (20%)</span>
            <span className="text-[11px] text-[#252540]">{tva.toLocaleString("fr-FR")} €</span>
          </div>
          <div className="flex justify-between pt-3">
            <span className="text-[12px] font-medium text-[#1a1a2e] uppercase tracking-wider">Total</span>
            <span className="font-serif text-[18px] text-[#1a1a2e]">{totalTTC.toLocaleString("fr-FR")} €</span>
          </div>
        </div>
        <div className="bg-[#f5eccd] border border-[#e0d5b0] rounded-2xl p-4 mb-6">
          <p className="text-[10px] uppercase tracking-widest text-[#3a3a5c] mb-2">Compte</p>
          <p className="text-[13px] text-[#1a1a2e]">{email}</p>
          <p className="text-[9px] text-[#3a3a5c] mt-1">
            Votre certificat sera créé automatiquement après l'achat
          </p>
        </div>
        {error && <p className="text-[10px] text-red-500 text-center mb-4">{error}</p>}
        <button
          onClick={handlePaiement}
          disabled={loading || cart.length === 0}
          className="w-full py-3 bg-[#1a1a2e] text-[#e8c96a] rounded-full text-[11px] uppercase tracking-widest hover:opacity-85 transition-opacity disabled:opacity-50"
        >
          {loading ? "Création du certificat..." : "Confirmer et payer →"}
        </button>
      </main>
    </div>
  )
}