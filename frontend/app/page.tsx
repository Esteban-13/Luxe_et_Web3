"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { getSmartAccountAddress } from "@/lib/smartAccount"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email) {
      setError("Veuillez entrer votre adresse électronique")
      return
    }
    setLoading(true)
    setError("")
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const smartAddress = getSmartAccountAddress(email)
      localStorage.setItem("timury_user", email)
      localStorage.setItem("timury_smart_address", smartAddress)
      router.push("/home")
    } catch {
      setError("Une erreur est survenue, veuillez réessayer")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-end max-w-sm mx-auto overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/bg-login.png" alt="Timury background" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10">
        <Image src="/logo.png" alt="Timury" width={120} height={120} className="object-contain" />
      </div>
      <div className="relative z-10 w-full px-6 pb-12 flex flex-col gap-4">
        <p className="text-center text-[#e8c96a] text-[18px] font-bold uppercase tracking-widest mb-1">
          Connectez-vous
        </p>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-widest text-[#e8c96a]/70">
            Adresse électronique
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className="w-full px-5 py-4 bg-black/30 border border-[#b8860b]/60 rounded-full text-[13px] text-white placeholder-white/30 focus:outline-none focus:border-[#b8860b] transition-colors backdrop-blur-sm"
          />
        </div>
        {error && <p className="text-[10px] text-red-400 text-center">{error}</p>}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-[#c9a84c] to-[#e8c96a] text-[#1a1a2e] rounded-full text-[11px] font-medium uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Connexion en cours..." : "Connexion"}
        </button>
      </div>
    </div>
  )
}