export type Cdp = {
  id: string
  collateral: string
  debt: string
  liquidationRatio: string
}

export type AbiObject = {
  inputs: {
    internalType: string
    name: string
    type: string
  }[]
  name: string
  outputs: {
    internalType: string
    name: string
    type: string
  }[]
  stateMutability: string
  type: string
}

export enum COLLATERAL_TYPE {
  ETH = "ETH-A",
  WBTC = "WBTC-A",
  USDC = "USDC-A",
}
