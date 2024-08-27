import { useState, useEffect } from 'react'

import { getRateForIlk } from '../utils/functions'
import { vatContract, web3 } from './data'

export const useRates = () => {
  const [rates, setRates] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const rateEth = await getRateForIlk(vatContract, web3, 'ETH-A')
        const rateBtc = await getRateForIlk(vatContract, web3, 'WTBC-A')
        const rateUsdt = await getRateForIlk(vatContract, web3, 'USDT-A')
        setRates({
          'ETH-A': Number(rateEth) / 10 ** 9,
          'WTBC-A': Number(rateBtc) / 10 ** 9, // rate for btc is 0
          'USDT-A': Number(rateUsdt) / 10 ** 9,
        })
      } catch (error) {
        console.error('Error fetching rates:', error)
      }
    }

    fetchRates()
  }, [vatContract, web3])

  return rates
}
