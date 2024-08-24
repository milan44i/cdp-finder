import { COLLATERAL_TYPE } from "./types"

export const getCollateralPrice = (collateralType: COLLATERAL_TYPE) => {
  switch (collateralType) {
    case COLLATERAL_TYPE.ETH:
      return 2800
    case COLLATERAL_TYPE.WBTC:
      return 64000
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

export function calculateDebt(debt: bigint, rate: number) {
  return Number(((Number(debt) * rate) / 10 ** 18).toFixed(4))
}

export function calculateCollateral(collateral: bigint) {
  return Number((Number(collateral) / 10 ** 18).toFixed(4))
}
