import { ReactElement, useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Header(): ReactElement {
  const [account, setAccount] = useState<string | null>(null)

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = (await window.ethereum.request({
          method: "eth_requestAccounts",
        })) as string[]
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0])
        } else {
          setAccount(null)
        }
      } catch (error) {
        console.error("Failed to connect to MetaMask", error)
      }
    } else {
      console.log(
        "MetaMask is not installed. Please install MetaMask and try again."
      )
    }
  }

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length > 0) {
      setAccount(accounts[0])
    } else {
      setAccount(null)
    }
  }

  useEffect(() => {
    connectWallet()
    // @ts-expect-error wierd type
    window.ethereum?.on("accountsChanged", handleAccountsChanged)

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged)
    }
  }, [])

  return (
    <header className="hidden sm:flex justify-between w-full px-20">
      <Link to="/">
        <h1 className="text-3xl font-bold">CDP Finder</h1>
      </Link>
      <div>
        {account ? (
          <p>Connected account: {account}</p>
        ) : (
          <button onClick={connectWallet}>
            Please connect your MetaMask wallet.
          </button>
        )}
      </div>
    </header>
  )
}
