export type CdpInfo = {
  collateral: bigint
  debt: bigint
  ilk: string
  owner: string
  urn: string
  userAddr: string
}

export type SerializedCdpInfo = {
  collateral: string
  debt: string
  ilk: string
  owner: string
  urn: string
  userAddr: string
}

export type Cdp = {
  id: number
  info: CdpInfo
}

export type SerializedCdp = {
  id: number
  info: SerializedCdpInfo
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
