import { Contract } from "web3"
import { AbiObject, COLLATERAL_TYPE } from "./types"
import { Buffer } from "buffer"

export function stringToBytes(str: string): string {
  let n = Buffer.from(str).toString("hex")
  while (n.length < 64) n = `${n}0`
  return `0x${n}`
}

export async function getCdpData(
  cdpManager: Contract<AbiObject[]>,
  cdpId: string
) {
  try {
    const urn = await cdpManager.methods.urns(cdpId).call()
    const owner = await cdpManager.methods.owns(cdpId).call()
    const vatAddress = await cdpManager.methods.vat().call()

    console.log(`CDP ${cdpId} is owned by: ${owner}`)
    console.log(`Vault Address (Urn): ${urn}`)
    console.log(`Vat Contract Address: ${vatAddress}`)

    // Additional calls can be made to the Vat contract to get more detailed data
  } catch (error) {
    console.error("Error fetching CDP data:", error)
  }
}

export async function initializeWeb3() {
  const provider = window.ethereum

  if (provider) {
    // const web3 = new Web3(provider)
    // Request account access if needed
    await provider.request({ method: "eth_requestAccounts" })
  } else {
    console.error("Please install Metamask!")
  }
}

export async function getCdpDataClosestToId(
  cdpManager: Contract<AbiObject[]>,
  cdpId: string,
  collateralType: COLLATERAL_TYPE
) {
  try {
    const closestCdps = []
    const maxSearchRange = 10

    for (let i = -maxSearchRange; i <= maxSearchRange; i++) {
      const currentCdpId = parseInt(cdpId) + i
      const cdpInfo = await cdpManager.methods.getCdpInfo(currentCdpId).call()

      // @ts-expect-error cdpInfo has wierd type
      if (cdpInfo[3] === stringToBytes(collateralType)) {
        closestCdps.push({ id: currentCdpId, info: cdpInfo })
      }

      if (closestCdps.length >= 20) {
        break
      }
    }
    return closestCdps
  } catch (error) {
    console.error("Error fetching CDP data:", error)
    return []
  }
}
