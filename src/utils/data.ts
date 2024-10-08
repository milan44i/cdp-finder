import Web3 from 'web3'

export const cdpManagerAddress = '0x68C61AF097b834c68eA6EA5e46aF6c04E8945B2d'

export const cdpManagerAbi = [
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: '_getProxyOwner',
    outputs: [{ internalType: 'address', name: 'userAddr', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_cdpId', type: 'uint256' }],
    name: 'getCdpInfo',
    outputs: [
      { internalType: 'address', name: 'urn', type: 'address' },
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'userAddr', type: 'address' },
      { internalType: 'bytes32', name: 'ilk', type: 'bytes32' },
      { internalType: 'uint256', name: 'collateral', type: 'uint256' },
      { internalType: 'uint256', name: 'debt', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

export const vatContractAddress = '0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b'
export const vatAbi = [
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: true,
    inputs: [
      { indexed: true, internalType: 'bytes4', name: 'sig', type: 'bytes4' },
      { indexed: true, internalType: 'bytes32', name: 'arg1', type: 'bytes32' },
      { indexed: true, internalType: 'bytes32', name: 'arg2', type: 'bytes32' },
      { indexed: true, internalType: 'bytes32', name: 'arg3', type: 'bytes32' },
      { indexed: false, internalType: 'bytes', name: 'data', type: 'bytes' },
    ],
    name: 'LogNote',
    type: 'event',
  },
  {
    constant: true,
    inputs: [],
    name: 'Line',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'cage',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'can',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'dai',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'debt',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ internalType: 'address', name: 'usr', type: 'address' }],
    name: 'deny',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'bytes32', name: 'ilk', type: 'bytes32' },
      { internalType: 'bytes32', name: 'what', type: 'bytes32' },
      { internalType: 'uint256', name: 'data', type: 'uint256' },
    ],
    name: 'file',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'bytes32', name: 'what', type: 'bytes32' },
      { internalType: 'uint256', name: 'data', type: 'uint256' },
    ],
    name: 'file',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'bytes32', name: 'ilk', type: 'bytes32' },
      { internalType: 'address', name: 'src', type: 'address' },
      { internalType: 'address', name: 'dst', type: 'address' },
      { internalType: 'uint256', name: 'wad', type: 'uint256' },
    ],
    name: 'flux',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'bytes32', name: 'i', type: 'bytes32' },
      { internalType: 'address', name: 'u', type: 'address' },
      { internalType: 'int256', name: 'rate', type: 'int256' },
    ],
    name: 'fold',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'bytes32', name: 'ilk', type: 'bytes32' },
      { internalType: 'address', name: 'src', type: 'address' },
      { internalType: 'address', name: 'dst', type: 'address' },
      { internalType: 'int256', name: 'dink', type: 'int256' },
      { internalType: 'int256', name: 'dart', type: 'int256' },
    ],
    name: 'fork',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'bytes32', name: 'i', type: 'bytes32' },
      { internalType: 'address', name: 'u', type: 'address' },
      { internalType: 'address', name: 'v', type: 'address' },
      { internalType: 'address', name: 'w', type: 'address' },
      { internalType: 'int256', name: 'dink', type: 'int256' },
      { internalType: 'int256', name: 'dart', type: 'int256' },
    ],
    name: 'frob',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { internalType: 'bytes32', name: '', type: 'bytes32' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'gem',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'bytes32', name: 'i', type: 'bytes32' },
      { internalType: 'address', name: 'u', type: 'address' },
      { internalType: 'address', name: 'v', type: 'address' },
      { internalType: 'address', name: 'w', type: 'address' },
      { internalType: 'int256', name: 'dink', type: 'int256' },
      { internalType: 'int256', name: 'dart', type: 'int256' },
    ],
    name: 'grab',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ internalType: 'uint256', name: 'rad', type: 'uint256' }],
    name: 'heal',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ internalType: 'address', name: 'usr', type: 'address' }],
    name: 'hope',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    name: 'ilks',
    outputs: [
      { internalType: 'uint256', name: 'Art', type: 'uint256' },
      { internalType: 'uint256', name: 'rate', type: 'uint256' },
      { internalType: 'uint256', name: 'spot', type: 'uint256' },
      { internalType: 'uint256', name: 'line', type: 'uint256' },
      { internalType: 'uint256', name: 'dust', type: 'uint256' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ internalType: 'bytes32', name: 'ilk', type: 'bytes32' }],
    name: 'init',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'live',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'src', type: 'address' },
      { internalType: 'address', name: 'dst', type: 'address' },
      { internalType: 'uint256', name: 'rad', type: 'uint256' },
    ],
    name: 'move',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ internalType: 'address', name: 'usr', type: 'address' }],
    name: 'nope',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ internalType: 'address', name: 'usr', type: 'address' }],
    name: 'rely',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'sin',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'bytes32', name: 'ilk', type: 'bytes32' },
      { internalType: 'address', name: 'usr', type: 'address' },
      { internalType: 'int256', name: 'wad', type: 'int256' },
    ],
    name: 'slip',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'u', type: 'address' },
      { internalType: 'address', name: 'v', type: 'address' },
      { internalType: 'uint256', name: 'rad', type: 'uint256' },
    ],
    name: 'suck',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { internalType: 'bytes32', name: '', type: 'bytes32' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'urns',
    outputs: [
      { internalType: 'uint256', name: 'ink', type: 'uint256' },
      { internalType: 'uint256', name: 'art', type: 'uint256' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'vice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'wards',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
]

export const baseUrl = import.meta.env.VITE_INFURA_API_BASE_URL
export const apiKey = import.meta.env.VITE_INFURA_API_KEY

export const web3 = new Web3(new Web3.providers.HttpProvider(`${baseUrl}/${apiKey}`))
export const cdpManager = new web3.eth.Contract(cdpManagerAbi, cdpManagerAddress)
export const vatContract = new web3.eth.Contract(vatAbi, vatContractAddress)
