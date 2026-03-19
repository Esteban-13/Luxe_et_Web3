import Navbar from "@/components/Navbar"
import { products } from "@/lib/data"
import Link from "next/link"

const user = {
  name: "Jérémy Gauthier",
  email: "jeremy@timury.com",
  avatar: null,
}

const historique = [
  { id: "lux-100-350", name: "Rolex Submariner", date: "Mars 2024", prix: 12500 },
  { id: "lux-200-112", name: "Patek Philippe Nautilus", date: "Juin 2023", prix: 38000 },
]

export default function ProfilPage() {
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
          <h1 className="font-serif text-2xl font-medium text-[#1a1a2e] mb-1">{user.name}</h1>
          <p className="text-[11px] text-[#3a3a5c]">{user.email}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#f5eccd] border border-[#e0d5b0] rounded-2xl p-4 text-center">
            <p className="font-serif text-3xl text-[#1a1a2e] mb-1">{products.length}</p>
            <p className="text-[9px] uppercase tracking-widest text-[#3a3a5c]">Produits</p>
          </div>
          <div className="bg-[#f5eccd] border border-[#e0d5b0] rounded-2xl p-4 text-center">
            <p className="font-serif text-3xl text-[#1a1a2e] mb-1">{products.filter(p => p.verified).length}</p>
            <p className="text-[9px] uppercase tracking-widest text-[#3a3a5c]">Certificats</p>
          </div>
        </div>

        {/* Historique achats */}
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-widest text-[#3a3a5c] mb-3">Historique des achats</p>
          {historique.map((item) => (
            <Link href={`/certificat/${item.id}`} key={item.id}>
              <div className="flex items-center justify-between bg-[#f5eccd] border border-[#e0d5b0] rounded-2xl p-4 mb-3 hover:border-[#b8860b] transition-colors">
                <div>
                  <p className="font-serif text-[14px] font-medium text-[#1a1a2e]">{item.name}</p>
                  <p className="text-[9px] text-[#3a3a5c] mt-0.5">{item.date}</p>
                </div>
                <p className="font-serif text-[14px] text-[#1a1a2e]">{item.prix.toLocaleString("fr-FR")} €</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Déconnexion */}
        <button className="w-full py-3 border border-[#1a1a2e] rounded-full text-[10px] uppercase tracking-widest text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-[#e8c96a] transition-all">
          Se déconnecter
        </button>

      </main>
    </div>
  )
}