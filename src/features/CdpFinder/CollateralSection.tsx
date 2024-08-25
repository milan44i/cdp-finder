import { ReactElement, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select/Select'
import { COLLATERAL_TYPE } from '../../utils/types'

type CollateralSelectionProps = {
  onSelect: (collateral: COLLATERAL_TYPE) => void
}

export default function CollateralSelection({ onSelect }: CollateralSelectionProps): ReactElement {
  const handleChange = (value: string) => {
    onSelect(value as COLLATERAL_TYPE)
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Select Collateral Type</label>
      <Select defaultValue={COLLATERAL_TYPE.ETH} onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={COLLATERAL_TYPE.ETH} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={COLLATERAL_TYPE.ETH} className="border-b border-gray-300">
            {COLLATERAL_TYPE.ETH}
          </SelectItem>
          <SelectItem value={COLLATERAL_TYPE.WBTC} className="border-b border-gray-300">
            {COLLATERAL_TYPE.WBTC}
          </SelectItem>
          <SelectItem value={COLLATERAL_TYPE.USDC}>{COLLATERAL_TYPE.USDC}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
