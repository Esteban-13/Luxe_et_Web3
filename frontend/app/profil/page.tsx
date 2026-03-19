"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import { useWatches } from "@/lib/useWatches"
import Link from "next/link"

export default function ProfilPage() {
  const router = useRouter()
  const { watches } = useWatches()
  const [email, setEmail] = useState("")

  useEffect(() => {
    const user = localStorage.getItem("timury_user")
    if (!user) {
      router.push("/")
      return
    }
    setEmail(user)
  }, [router])

  function handleLogout() {
    localStorage.removeItem("timury_user")
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto">
      <Navbar />
      <main className="flex-1 px-4 py-8">

        {/* Avatar + infos */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-[#1a1a2e] flex items-center justify-center mb-3">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e8c96a" strokeWidth="1">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </div>
          <h1 className="font-serif text-2xl font-medium text-[#1a1a2e] mb-1">Mon compte</h1>
          <p className="text-[11px] text-[#3a3a5c]">{email}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#f5eccd] border border-[#e0d5b0] rounded-2xl p-4 text-center">
            <p className="font-serif text-3xl text-[#1a1a2e] mb-1">{watches.length}</p>
            <p className="text-[9px] uppercase tracking-widest text-[#3a3a5c]">Montres</p>
          </div>
          <div className="bg-[#f5eccd] border border-[#e0d5b0] rounded-2xl p-4 text-center">
            <p className="font-serif text-3xl text-[#1a1a2e] mb-1">{watches.length}</p>
            <p className="text-[9px] uppercase tracking-widest text-[#3a3a5c]">Certificats</p>
          </div>
        </div>

        {/* Mes certificats */}
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-widest text-[#3a3a5c] mb-3">Mes certificats</p>
          {watches.map((watch) => (
            <Link href={`/certificat/${watch.tokenId}`} key={watch.tokenId}>
              <div className="flex items-center justify-between bg-[#f5eccd] border border-[#e0d5b0] rounded-2xl p-4 mb-3 hover:border-[#b8860b] transition-colors">
                <div>
                  <p className="font-serif text-[14px] font-medium text-[#1a1a2e]">{watch.name}</p>
                  <p className="text-[9px] text-[#3a3a5c] mt-0.5">{watch.serialNumber}</p>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded-full text-[9px] text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                  Vérifié ✓
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Déconnexion */}
        <button
          onClick={handleLogout}
          className="w-full py-3 border border-[#1a1a2e] rounded-full text-[10px] uppercase tracking-widest text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-[#e8c96a] transition-all"
        >
          Se déconnecter
        </button>

      </main>
    </div>
  )
}