"use client"

import Link from "next/link"
import Navbar from "@/components/Navbar"
import Image from "next/image"

export default function ScanPage() {
  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto">
      <Navbar isHome />
      <main className="flex-1 px-4 flex flex-col items-center justify-center text-center">

        {/* Animation NFC */}
        <div className="relative flex items-center justify-center mb-10">
          {/* Cercles animés */}
          <div className="absolute w-64 h-64 rounded-full border border-[#b8860b]/20 animate-ping" style={{ animationDuration: "2s" }} />
          <div className="absolute w-48 h-48 rounded-full border border-[#b8860b]/30 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.3s" }} />
          <div className="absolute w-32 h-32 rounded-full border border-[#b8860b]/50 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.6s" }} />

          {/* Logo au centre */}
          <div className="relative z-10 w-24 h-24 rounded-full bg-[#1a1a2e] flex items-center justify-center border border-[#b8860b]/40">
            <Image
              src="/logo.png"
              alt="Timury"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
        </div>

        {/* Texte */}
        <h1 className="font-serif text-3xl font-light text-[#1a1a2e] mb-3">
          Approchez votre téléphone
        </h1>
        <div className="w-8 h-px bg-[#b8860b] mx-auto mb-4" />
        <p className="text-[12px] text-[#3a3a5c] leading-relaxed font-light max-w-[220px]">
          Placez votre appareil près du tag NFC de votre produit pour le scanner
        </p>

        {/* Retour */}
        <Link
          href="/"
          className="mt-12 text-[10px] uppercase tracking-widest text-[#3a3a5c] underline underline-offset-4"
        >
          Retour à l'accueil
        </Link>

      </main>
    </div>
  )
}