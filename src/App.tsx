import { ReactElement } from "react"
import { MetaMaskInpageProvider } from "@metamask/providers"
import CdpFinder from "./features/CdpFinder"

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

export default function Home(): ReactElement {
  return (
    <div className="flex justify-center pt-10 pb-10 h-full bg-gradient-to-r from-[#0093E9] to-[#80D0C7] text-white">
      <CdpFinder />
    </div>
  )
}
