import Web3, { Contract } from 'web3'
import { AbiObject, Cdp, CdpInfo, COLLATERAL_TYPE } from './types'
import { RegisteredSubscription } from 'node_modules/web3-eth/lib/types/web3_eth'
import { stringToBytes } from './helpers'

/**
 * Fetches twenty CDPs closest to the given CDP ID.
 *
 * @param {Contract<AbiObject[]>} cdpManager - The CDP manager contract instance.
 * @param {string} cdpId - The ID of the CDP to search around.
 * @param {COLLATERAL_TYPE} collateralType - The type of collateral to filter by.
 * @param {(progress: number) => void} onProgress - Callback function to report progress.
 * @returns {Promise<Cdp[]>} - A promise that resolves to an array of CDPs closest to the given ID.
 */
export async function getCdpDataClosestToId(
  cdpManager: Contract<AbiObject[]>,
  cdpId: string,
  collateralType: COLLATERAL_TYPE,
  onProgress: (progress: number) => void,
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

        const cdpInfo = (await cdpManager.methods.getCdpInfo(currentCdpId).call()) as CdpInfo

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
    console.error('Error fetching CDP data:', error)
    onProgress(0)
    return []
  }
}

/**
 * Fetches the rate for a given ilk from the vat contract.
 *
 * @param {Contract<AbiObject[]>} vatContract - The vat contract instance.
 * @param {Web3<RegisteredSubscription>} web3 - The Web3 instance.
 * @param {string} ilk - The ilk identifier.
 * @returns {Promise<string | undefined>} - A promise that resolves to the rate in ether, or undefined if an error occurs.
 */
export async function getRateForIlk(
  vatContract: Contract<AbiObject[]>,
  web3: Web3<RegisteredSubscription>,
  ilk: string,
) {
  try {
    const rateInfo = await vatContract.methods
      .ilks(web3.utils.padRight(web3.utils.asciiToHex(ilk), 64))
      .call()
    // @ts-expect-error rateInfo has weird type
    const rate = rateInfo.rate
    return web3.utils.fromWei(rate, 'ether')
  } catch (error) {
    console.error('Error fetching rate for ilk:', error)
  }
}
