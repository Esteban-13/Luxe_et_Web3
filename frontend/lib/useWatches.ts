import { useState, useEffect } from "react"
import { createPublicClient, http } from "viem"
import { hardhat } from "viem/chains"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contract"

export interface Watch {
  tokenId: number
  serialNumber: string
  model: string
  metadataURI: string
  owner: string
  name: string
  materials: string
  yearOfManufacture: string
  calibre: string
  price: number
}

const client = createPublicClient({
  chain: hardhat,
  transport: http("http://127.0.0.1:8545"),
})

const PRICES: Record<number, number> = {
  1: 18500,
  2: 24000,
  3: 42000,
  4: 15000,
  5: 68000,
  6: 22000,
}

export function useWatches() {
  const [watches, setWatches] = useState<Watch[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWatches() {
      try {
        const results: Watch[] = []

        for (let tokenId = 1; tokenId <= 6; tokenId++) {
          const data = await client.readContract({
            address: CONTRACT_ADDRESS as `0x${string}`,
            abi: CONTRACT_ABI,
            functionName: "getWatch",
            args: [BigInt(tokenId)],
          })

          const [serialNumber, model, metadataURI, owner] = data as [string, string, string, string]

          // Récupérer les métadonnées depuis IPFS
          const cid = metadataURI.replace("ipfs://", "")
          const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${cid}`
          const response = await fetch(ipfsUrl)
          const metadata = await response.json()

          const materials = metadata.attributes?.find((a: { trait_type: string }) => a.trait_type === "Matière")?.value || "—"
          const yearOfManufacture = metadata.attributes?.find((a: { trait_type: string }) => a.trait_type === "Année de fabrication")?.value || "—"
          const calibre = metadata.attributes?.find((a: { trait_type: string }) => a.trait_type === "Calibre")?.value || "—"

          results.push({
            tokenId,
            serialNumber,
            model,
            metadataURI,
            owner,
            name: metadata.name,
            materials,
            yearOfManufacture,
            calibre,
            price: PRICES[tokenId],
          })
        }

        setWatches(results)
      } catch (error) {
        console.error("Erreur fetch watches:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWatches()
  }, [])

  return { watches, loading }
}