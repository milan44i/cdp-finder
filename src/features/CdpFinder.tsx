import { ReactElement, useState } from "react"
import Web3 from "web3"

import CollateralSelection from "./CollateralSection"
import CdpSearch from "./CdpSearch"
import CdpList from "./CdpList"
import { Progress } from "../ui/progress/Progress"

import { getCdpDataClosestToId, getRateForIlk } from "../utils/functions"
import { Cdp, COLLATERAL_TYPE } from "../utils/types"
import {
  apiKey,
  baseUrl,
  cdpManagerAbi,
  cdpManagerAddress,
  vatAbi,
  vatContractAddress,
} from "../utils/data"

import "./style.css"

const web3 = new Web3(new Web3.providers.HttpProvider(`${baseUrl}/${apiKey}`))
const cdpManager = new web3.eth.Contract(cdpManagerAbi, cdpManagerAddress)
const vatContract = new web3.eth.Contract(vatAbi, vatContractAddress)

const rateEth = await getRateForIlk(vatContract, web3, "ETH-A")
const rateBtc = await getRateForIlk(vatContract, web3, "WTBC-A")
const rateUsdt = await getRateForIlk(vatContract, web3, "USDT-A")
const rates = {
  "ETH-A": Number(rateEth) / 10 ** 9,
  "WTBC-A": Number(rateBtc) / 10 ** 9, // rate for btc is 0
  "USDT-A": Number(rateUsdt) / 10 ** 9,
}

export default function CdpFinder(): ReactElement {
  const [collateralType, setCollateralType] = useState<COLLATERAL_TYPE>(
    COLLATERAL_TYPE.ETH
  )

  const [cdps, setCdps] = useState<Cdp[]>([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleSelectCollateral = (type: COLLATERAL_TYPE) => {
    setCollateralType(type)
  }

  const handleSearchCdp = async (cdpId: string) => {
    setLoading(true)
    const closestCdps = await getCdpDataClosestToId(
      cdpManager,
      cdpId,
      collateralType,
      setProgress
    )

    setCdps(closestCdps)
    setLoading(false)
  }

  console.log(cdps[7])

  return (
    <main className="flex flex-col gap-4 w-3/4 h-[90%]">
      <CollateralSelection onSelect={handleSelectCollateral} />
      <CdpSearch onSearch={handleSearchCdp} />
      {loading ? (
        <Progress value={progress} />
      ) : (
        <CdpList cdps={cdps} rates={rates} />
      )}
    </main>
  )
}
