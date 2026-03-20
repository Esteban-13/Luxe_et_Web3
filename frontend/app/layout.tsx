import type { Metadata } from "next"
import { Cormorant_Garamond, Jost } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/CartContext"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
})

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
})

export const metadata: Metadata = {
  title: "Timury",
  description: "Certification de luxe",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${cormorant.variable} ${jost.variable} font-sans bg-[#fdf6e3] text-[#1a1a2e] antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}