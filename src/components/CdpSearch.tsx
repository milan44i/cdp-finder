import { ReactElement, useState } from 'react'
import debounce from 'lodash/debounce'

type CdpSearchProps = {
  loading: boolean
  onSearch: (cdpId: string) => void
}

export default function CdpSearch({ loading, onSearch }: CdpSearchProps): ReactElement {
  const [cdpId, setCdpId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (value: string) => {
    setCdpId(value)
  }

  const handleSearch = debounce(() => {
    if (loading) return
    setErrorMessage('')
    if (cdpId && !isNaN(Number(cdpId))) {
      onSearch(cdpId)
    } else if (cdpId.length === 0) {
      setErrorMessage('Please fill in the ID')
    } else {
      setErrorMessage('Please type in numbers only')
    }
  }, 300)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Enter Rough CDP ID</label>
      <input
        type="text"
        value={cdpId}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="block w-full pl-3 pr-10 py-2 text-base text-black border-gray-300 sm:text-sm focus:outline-none rounded-md"
        placeholder="e.g., 1234"
      />
      {errorMessage && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
      <button
        onClick={handleSearch}
        className="mt-4 w-full inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Search
      </button>
    </div>
  )
}
