import { ReactElement, useState } from 'react'

import CollateralSelection from './CollateralSection'
import CdpSearch from './CdpSearch'
import CdpList from './CdpList'
import { Progress } from '../../ui/progress/Progress'

import { getCdpDataClosestToId } from '../../utils/functions'
import { Cdp, COLLATERAL_TYPE } from '../../utils/types'
import { useRates } from '../../utils/hooks'
import { cdpManager } from '../../utils/data'

import './style.css'

export default function CdpFinder(): ReactElement {
  const [collateralType, setCollateralType] = useState<COLLATERAL_TYPE>(COLLATERAL_TYPE.ETH)
  const [cdps, setCdps] = useState<Cdp[]>([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const rates = useRates()

  const handleSelectCollateral = (type: COLLATERAL_TYPE) => {
    setCollateralType(type)
  }

  const handleSearchCdp = async (cdpId: string) => {
    setLoading(true)

    const closestCdps = await getCdpDataClosestToId(cdpManager, cdpId, collateralType, setProgress)

    setCdps(closestCdps)
    setLoading(false)
  }

  return (
    <main className="flex flex-col gap-4 w-3/4 h-[90%]">
      <CollateralSelection onSelect={handleSelectCollateral} />
      <CdpSearch onSearch={handleSearchCdp} />
      {loading ? <Progress value={progress} /> : <CdpList cdps={cdps} rates={rates} />}
    </main>
  )
}
