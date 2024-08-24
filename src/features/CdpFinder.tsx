import { ReactElement, useState } from "react"
import Web3 from "web3"

import CollateralSelection from "./CollateralSection"
import CdpSearch from "./CdpSearch"
import CdpList from "./CdpList"
import { Progress } from "../ui/progress/Progress"

import { getCdpDataClosestToId, getRateForIlk } from "../utils/functions"
import { COLLATERAL_TYPE } from "../utils/types"
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cdps, setCdps] = useState<any[]>([])
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

  console.log(cdps, rates)

  return (
    <div className="flex flex-col w-3/4">
      <CollateralSelection onSelect={handleSelectCollateral} />
      <CdpSearch onSearch={handleSearchCdp} />
      {loading ? (
        <Progress value={progress} />
      ) : (
        <CdpList cdps={cdps} rates={rates} />
      )}
    </div>
  )
}
