import { useState, useEffect, ReactElement } from "react"
import { useLocation } from "react-router-dom"
import Web3 from "web3"
import { Buffer } from "buffer"

import { calculateCollateral, calculateDebt } from "../utils/helpers"
import { Cdp, COLLATERAL_TYPE } from "../utils/types"
import { getCollateralPrice, getLiquidationRatio } from "../utils/helpers"

// has to be defined here because of Buffer import
function bytesToString(hex: string): string {
  return (
    Buffer.from(hex.replace(/^0x/, ""), "hex")
      .toString()
      // eslint-disable-next-line no-control-regex
      .replace(/\x00/g, "")
  )
}

export default function CdpPage(): ReactElement {
  const { state } = useLocation()
  const cdp = state.cpdData as Cdp
  const rates = state.rates as Record<string, number>
  const [isConnected, setIsConnected] = useState(false)
  const [signature, setSignature] = useState("")
  // const [cdp, setCdp] = useState<Cdp | null>(null)

  const collateralType = bytesToString(cdp.info.ilk) as COLLATERAL_TYPE
  const collateralPrice = getCollateralPrice(collateralType as COLLATERAL_TYPE)
  const liquidationRatio = getLiquidationRatio(
    collateralType as COLLATERAL_TYPE
  )

  const collateralAmount = calculateCollateral(cdp.info.collateral)
  const debtAmount = calculateDebt(cdp.info.debt, rates[collateralType])
  const collateralValue = collateralAmount * collateralPrice
  const collateralizationRatio = (collateralValue / debtAmount) * 100
  const maxDebtWithoutLiquidation = (
    collateralValue / liquidationRatio
  ).toFixed(2)
  const maxCollateralWithoutLiquidation = (
    (debtAmount * liquidationRatio) /
    collateralPrice
  ).toFixed(2)

  useEffect(() => {
    // Check if the user is connected through Metamask
    if (window.ethereum) {
      // const web3 = new Web3(window.ethereum)
      window.ethereum.enable().then(() => {
        setIsConnected(true)
      })
    }
  }, [])

  const signMessage = async () => {
    if (isConnected && window.ethereum) {
      const web3 = new Web3(window.ethereum)
      const accounts = await web3.eth.getAccounts()
      const message = "This is my CDP"
      const signature = await web3.eth.personal.sign(message, accounts[0], "")
      setSignature(signature)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CDP Details - ID: {cdp.id}</h1>
      <div className="mb-4">
        <p>Collateral Type: {collateralType}</p>
        <p>
          Collateral Amount: {collateralAmount} {collateralType.slice(0, -2)}
        </p>
        <p>Debt Amount: {debtAmount} DAI</p>
        <p>
          Collateralization Ratio:{" "}
          {isNaN(collateralizationRatio)
            ? "0.00"
            : collateralizationRatio.toFixed(2)}
          %
        </p>
        <p>Liquidation Ratio: {liquidationRatio * 100}%</p>
        <p>Max Debt Without Liquidation: {maxDebtWithoutLiquidation} DAI</p>
        <p>
          Max Collateral Without Liquidation: {maxCollateralWithoutLiquidation}{" "}
          {collateralType.slice(0, -2)}
        </p>
      </div>
      {isConnected ? (
        <div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={signMessage}
          >
            Sign "This is my CDP"
          </button>
          {signature && (
            <div className="mt-4">
              <p>Signature:</p>
              <p className="break-words">{signature}</p>
            </div>
          )}
        </div>
      ) : (
        <p>Please connect to MetaMask to sign the message.</p>
      )}
    </div>
  )
}
