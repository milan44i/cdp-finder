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

type IOType = {
  internalType: string
  name: string
  type: string
}

export type AbiObject = {
  inputs: IOType[]
  name: string
  outputs: IOType[]
  stateMutability: string
  type: string
}

export enum COLLATERAL_TYPE {
  ETH = 'ETH-A',
  WBTC = 'WBTC-A',
  USDC = 'USDC-A',
}
