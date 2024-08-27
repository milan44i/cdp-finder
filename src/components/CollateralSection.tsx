import { ReactElement, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select'
import { COLLATERAL_TYPE } from '../utils/types'

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
          {Object.values(COLLATERAL_TYPE).map((type) => (
            <SelectItem key={type} value={type} className="border-b border-gray-200 last:border-none">
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
