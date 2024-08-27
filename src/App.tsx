import { ReactElement, Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MetaMaskInpageProvider } from '@metamask/providers'

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

const CdpFinder = lazy(() => import('./pages/CdpFinder'))
const CdpPage = lazy(() => import('./pages/CdpPage/CdpPage'))
const ErrorPage = lazy(() => import('./pages/ErrorPage'))
const Header = lazy(() => import('./components/Header'))

export default function Home(): ReactElement {
  return (
    <div className="flex flex-col gap-10 items-center pt-10 pb-10 h-full bg-gradient-to-r from-[#0093E9] to-[#80D0C7] text-white">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Routes>
          <Route path="/" element={<CdpFinder />} />
          <Route path="/cdp/:cdpId" element={<CdpPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}
