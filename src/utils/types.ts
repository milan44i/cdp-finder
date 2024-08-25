export type CdpInfo = {
  collateral: bigint
  debt: bigint
  ilk: string
  owner: string
  urn: string
  userAddr: string
}

export type Cdp = {
  id: number
  info: CdpInfo
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
  ETH = 'ETH-A',
  WBTC = 'WBTC-A',
  USDC = 'USDC-A',
}
