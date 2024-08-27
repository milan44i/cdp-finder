import { ReactElement, useEffect, useState } from 'react'

import CollateralSelection from '../components/CollateralSection'
import CdpSearch from '../components/CdpSearch'
import CdpList from '../components/CdpList/CdpList'
import { Progress } from '../components/Progress'

import { getCdpDataClosestToId } from '../utils/functions'
import { Cdp, COLLATERAL_TYPE, SerializedCdp } from '../utils/types'
import { useRates } from '../utils/hooks'
import { cdpManager } from '../utils/data'

const handleBeforeUnload = () => {
  localStorage.removeItem('cdps')
}

export default function CdpFinder(): ReactElement {
  const [collateralType, setCollateralType] = useState<COLLATERAL_TYPE>(COLLATERAL_TYPE.ETH)
  const [cdps, setCdps] = useState<Cdp[]>([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const rates = useRates()

  // preserve cdps across navigation (going back from CdpPage)
  useEffect(() => {
    const savedCdps = localStorage.getItem('cdps')
    if (savedCdps) {
      const parsedCdps = JSON.parse(savedCdps).map((cdp: SerializedCdp) => ({
        ...cdp,
        info: {
          ...cdp.info,
          collateral: BigInt(cdp.info.collateral),
          debt: BigInt(cdp.info.debt),
        },
      }))
      setCdps(parsedCdps)
    }

    // this is to clear the saved cdps when the user refreshes the page
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  const handleSelectCollateral = (type: COLLATERAL_TYPE) => {
    setCollateralType(type)
  }

  const handleSearchCdp = async (cdpId: string) => {
    setLoading(true)
    try {
      const closestCdps = await getCdpDataClosestToId(cdpManager, cdpId, collateralType, setProgress)
      setCdps(closestCdps)
      const serializedCdps = closestCdps.map((cdp) => ({
        id: cdp.id,
        info: {
          collateral: cdp.info.collateral.toString(),
          debt: cdp.info.debt.toString(),
          ilk: cdp.info.ilk,
          owner: cdp.info.owner,
          urn: cdp.info.urn,
          userAddr: cdp.info.userAddr,
        },
      }))
      localStorage.setItem('cdps', JSON.stringify(serializedCdps))
    } catch (error) {
      console.error('Error fetching CDP data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-col gap-4 w-3/4 h-[90%]">
      <CollateralSelection onSelect={handleSelectCollateral} />
      <CdpSearch loading={loading} onSearch={handleSearchCdp} />
      {loading ? <Progress value={progress} /> : <CdpList cdps={cdps} rates={rates} />}
    </main>
  )
}
