import { keccak256, toHex } from "viem"

export function getSmartAccountAddress(email: string): `0x${string}` {
  const hash = keccak256(toHex(email.toLowerCase().trim()))
  return `0x${hash.slice(-40)}` as `0x${string}`
}