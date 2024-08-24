import Web3, { Contract } from "web3"
import { AbiObject, Cdp, CdpInfo, COLLATERAL_TYPE } from "./types"
import { Buffer } from "buffer"
import { RegisteredSubscription } from "node_modules/web3-eth/lib/types/web3_eth"

// can I somehow reuse this and bytesToString?
function stringToBytes(str: string): string {
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
  collateralType: COLLATERAL_TYPE,
  onProgress: (progress: number) => void
) {
  try {
    const closestCdps: Cdp[] = []
    const baseCdpId = parseInt(cdpId)
    const maxSearchRange = 20
    const targetElements = 20

    for (let i = 0; i <= maxSearchRange; i++) {
      const currentCdpIds = [baseCdpId + i, baseCdpId - i]
      if (i === 0) currentCdpIds.pop() // remove duplicate ID

      for (const currentCdpId of currentCdpIds) {
        if (currentCdpId < 0) continue // Skip negative IDs

        const cdpInfo = (await cdpManager.methods
          .getCdpInfo(currentCdpId)
          .call()) as CdpInfo

        if (cdpInfo.ilk === stringToBytes(collateralType)) {
          closestCdps.push({ id: currentCdpId, info: cdpInfo })
          onProgress((closestCdps.length / targetElements) * 100)

          if (closestCdps.length >= targetElements) {
            onProgress(0)
            return closestCdps
          }
        }
      }
    }

    onProgress(0)
    return closestCdps
  } catch (error) {
    console.error("Error fetching CDP data:", error)
    return []
  }
}

export async function getRateForIlk(
  vatContract: Contract<AbiObject[]>,
  web3: Web3<RegisteredSubscription>,
  ilk: string
) {
  try {
    const rateInfo = await vatContract.methods
      .ilks(web3.utils.padRight(web3.utils.asciiToHex(ilk), 64))
      .call()
    // @ts-expect-error rateInfo has weird type
    const rate = rateInfo.rate
    return web3.utils.fromWei(rate, "ether")
  } catch (error) {
    console.error("Error fetching rate for ilk:", error)
  }
}
