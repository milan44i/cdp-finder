import { useState, useEffect, ReactElement } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Web3 from 'web3'
import { Buffer } from 'buffer'

import { calculateCollateral, calculateDebt, formatNumber } from '../../utils/helpers'
import { Cdp, COLLATERAL_TYPE } from '../../utils/types'
import { getCollateralPrice, getLiquidationRatio } from '../../utils/helpers'
// @ts-expect-error ?react
import ChevronSmallDownIcon from '../../assets/icons/chevron-small-down.svg?react'
import { InfoItem } from './InfoItem'
import ErrorPage from '../ErrorPage'

// has to be defined here because of Buffer import
function bytesToString(hex: string): string {
  return (
    Buffer.from(hex.replace(/^0x/, ''), 'hex')
      .toString()
      // eslint-disable-next-line no-control-regex
      .replace(/\x00/g, '')
  )
}

export default function CdpPage(): ReactElement {
  const { state } = useLocation()
  const [isConnected, setIsConnected] = useState(false)
  const [signature, setSignature] = useState('')

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(() => {
          setIsConnected(true)
        })
        .catch((error) => {
          console.error('Error connecting to MetaMask:', error)
        })
    }
  }, [])

  if (!state) return <ErrorPage />

  const cdp = state.cpdData as Cdp
  const rates = state.rates as Record<string, number>

  const collateralType = bytesToString(cdp.info.ilk) as COLLATERAL_TYPE
  const collateralPrice = getCollateralPrice(collateralType as COLLATERAL_TYPE)
  const liquidationRatio = getLiquidationRatio(collateralType as COLLATERAL_TYPE)
  const collateralAmount = calculateCollateral(cdp.info.collateral)
  const debtAmount = calculateDebt(cdp.info.debt, rates[collateralType])
  const collateralValue = collateralAmount * collateralPrice
  const collateralizationRatio = (collateralValue / debtAmount) * 100
  const maxDebtWithoutLiquidation = Number(collateralValue / liquidationRatio)
  const maxCollateralWithoutLiquidation = Number((debtAmount * liquidationRatio) / collateralPrice)

  const signMessage = async () => {
    if (isConnected && window.ethereum) {
      const web3 = new Web3(window.ethereum)
      const accounts = await web3.eth.getAccounts()
      const message = 'This is my CDP'
      const signature = await web3.eth.personal.sign(message, accounts[0], '')
      setSignature(signature)
    }
  }

  const items = [
    {
      label: 'Collateral Type',
      value: collateralType,
      className: 'col-span-2 md:col-span-3',
    },
    {
      label: 'Collateral Amount',
      value: `${formatNumber(collateralAmount)} ${collateralType.slice(0, -2)}`,
    },
    { label: 'Debt Amount', value: `${formatNumber(debtAmount)} DAI` },
    {
      label: 'Collateralization Ratio',
      value: `${isNaN(collateralizationRatio) ? '0.00' : formatNumber(collateralizationRatio)}%`,
    },
    { label: 'Liquidation Ratio', value: `${liquidationRatio * 100}%` },
    {
      label: 'Max Debt Without Liquidation',
      value: `${formatNumber(maxDebtWithoutLiquidation)} DAI`,
    },
    {
      label: 'Max Collateral Without Liquidation',
      value: `${formatNumber(maxCollateralWithoutLiquidation)} ${collateralType.slice(0, -2)}`,
    },
  ]

  return (
    <>
      <div className="container flex flex-col gap-4 mx-auto sm:px-8 px-4 py-4 bg-white rounded-lg">
        <h1 className="text-2xl font-semibold text-blue-950 py-4 border-b">CDP {cdp.id} Details</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 border-b">
          {items.map((item, index) => (
            <InfoItem key={index} label={item.label} value={item.value} className={item.className || ''} />
          ))}
        </div>
        {isConnected ? (
          <div className="py-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
              disabled={!!signature}
              onClick={signMessage}
            >
              Sign "This is my CDP"
            </button>
            {signature && (
              <div className="mt-4 text-blue-950">
                <p>Signature:</p>
                <p className="break-words">{signature}</p>
              </div>
            )}
          </div>
        ) : (
          <p>Please connect to MetaMask to sign the message.</p>
        )}
      </div>
      <Link
        to="/"
        className="flex items-center bg-white text-blue-500 hover:text-blue-400 p-2 pr-4 rounded-lg font-medium w-fit"
      >
        <ChevronSmallDownIcon className="rotate-90 w-5 h-5" />
        Back to homepage
      </Link>
    </>
  )
}
