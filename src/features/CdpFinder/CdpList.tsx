import { ReactElement } from 'react'

import './style.css'
import { Buffer } from 'buffer'
import { Link } from 'react-router-dom'
import { Cdp } from '@/utils/types'
import { calculateDebt, formatNumber } from '../../utils/helpers'

type CdpListProps = {
  cdps: Cdp[]
  rates: Record<string, number>
}

// has to be defined here because of Buffer import
function bytesToString(hex: string): string {
  return (
    Buffer.from(hex.replace(/^0x/, ''), 'hex')
      .toString()
      // eslint-disable-next-line no-control-regex
      .replace(/\x00/g, '')
  )
}

export default function CdpList({ cdps, rates }: CdpListProps): ReactElement {
  if (cdps.length === 0) {
    return <p className="text-gray-200">No CDPs found.</p>
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md rounded-lg hide-scrollbar">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="sticky top-0 z-10 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 sm:px-6 py-3 text-nowrap">
                CDP ID
              </th>
              <th scope="col" className="px-3 sm:px-6 py-3">
                Collateral
              </th>
              <th scope="col" className="px-3 sm:px-6 py-3">
                Debt
              </th>
            </tr>
          </thead>
          <tbody>
            {cdps.map((cdp, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-3 sm:px-6 py-4">
                  <Link to={`/cdp/${cdp.id}`} state={{ cpdData: cdp, rates }}>
                    {cdp.id}
                  </Link>
                </td>
                <td className="px-3 sm:px-6 py-4">{bytesToString(cdp.info.ilk)}</td>
                <td className="px-3 sm:px-6 py-4">
                  {formatNumber(calculateDebt(cdp.info.debt, rates[bytesToString(cdp.info.ilk)]))} DAI
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 animate-bounce">scroll to see more!</p>
    </>
  )
}
