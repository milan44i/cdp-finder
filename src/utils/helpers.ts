import { Cdp, COLLATERAL_TYPE, SerializedCdp } from './types'
import { Buffer } from 'buffer'

export const getCollateralPrice = (collateralType: COLLATERAL_TYPE) => {
  switch (collateralType) {
    case COLLATERAL_TYPE.ETH:
      return 2682
    case COLLATERAL_TYPE.WBTC:
      return 62945
    case COLLATERAL_TYPE.USDC:
      return 1
    default:
      return 0
  }
}

export const getLiquidationRatio = (collateralType: COLLATERAL_TYPE) => {
  switch (collateralType) {
    case COLLATERAL_TYPE.ETH:
    case COLLATERAL_TYPE.WBTC:
      return 1.45
    case COLLATERAL_TYPE.USDC:
      return 1.01
    default:
      return 0
  }
}

export function formatNumber(number: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(number)
}

export function calculateDebt(debt: bigint, rate: number) {
  return Number((Number(debt) * rate) / 10 ** 18)
}

export function calculateCollateral(collateral: bigint) {
  return Number(Number(collateral) / 10 ** 18)
}

export function bytesToString(hex: string): string {
  return Buffer.from(hex.replace(/^0x/, ''), 'hex').toString().replace(/\x00/g, '')
}

export function stringToBytes(str: string): string {
  let n = Buffer.from(str).toString('hex')
  while (n.length < 64) n = `${n}0`
  return `0x${n}`
}
