"use client"

import { ReactElement, useState } from "react"
import CollateralSelection from "./CollateralSection"
import CdpSearch from "./CdpSearch"
import CdpList from "./CdpList"
import Web3 from "web3"
import "./style.css"
import { getCdpDataClosestToId } from "../utils/functions"
import { COLLATERAL_TYPE } from "../utils/types"
import { cdpManagerAbi, cdpManagerAddress } from "../utils/data"

// const web3 = new Web3(new Web3.providers.HttpProvider(`${baseUrl}/${apiKey}`))
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://mainnet.infura.io/v3/1e536adfba674240898ab240ea8066cd"
  )
)

const cdpManager = new web3.eth.Contract(cdpManagerAbi, cdpManagerAddress)

export default function CdpFinder(): ReactElement {
  const [collateralType, setCollateralType] = useState<COLLATERAL_TYPE>(
    COLLATERAL_TYPE.ETH
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cdps, setCdps] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSelectCollateral = (type: COLLATERAL_TYPE) => {
    setCollateralType(type)
  }

  const handleSearchCdp = async (cdpId: string) => {
    setLoading(true)
    const closestCdps = await getCdpDataClosestToId(
      cdpManager,
      cdpId,
      collateralType
    )

    setCdps(closestCdps)
    setLoading(false)
  }

  console.log(cdps)

  return (
    <div className="flex flex-col w-3/4">
      <CollateralSelection onSelect={handleSelectCollateral} />
      <CdpSearch onSearch={handleSearchCdp} />
      {loading ? (
        <p className="progress-bar">Loading...</p>
      ) : (
        <CdpList cdps={cdps} />
      )}
    </div>
  )
}
