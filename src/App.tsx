import { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MetaMaskInpageProvider } from '@metamask/providers'

import CdpFinder from './pages/CdpFinder'
import Header from './components/Header'
import CdpPage from './pages/CdpPage/CdpPage'
import ErrorPage from './pages/ErrorPage'

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

export default function Home(): ReactElement {
  return (
    <div className="flex flex-col gap-10 items-center pt-10 pb-10 h-full bg-gradient-to-r from-[#0093E9] to-[#80D0C7] text-white">
      <Header />
      <Routes>
        <Route path="/" element={<CdpFinder />} />
        <Route path="/cdp/:cdpId" element={<CdpPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}
