# CDP Finder

Welcome to the CDP Finder, a frontend tool designed to search for Collateralized Debt Positions (CDPs) on the Ethereum blockchain. This application allows users to query CDPs by ID and collateral type, providing detailed information about each CDP, including collateralization ratio, liquidation ratio, maximum debt without liquidation, and maximum collateral without liquidation.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Search for CDPs by ID and collateral type.
- Display the 20 CDPs with the closest IDs to the search query.
- View detailed information about each CDP.
- Integration with Infura and Web3.js for blockchain data retrieval.
- Responsive design with Tailwind CSS.
- Code-splitting and lazy loading for optimized performance.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A fast build tool and development server.
- **Tailwind CSS**: A utility-first CSS framework.
- **Radix UI**: A set of accessible and customizable UI components.
- **React Router DOM**: A collection of navigational components for React.
- **Web3.js**: A JavaScript library for interacting with the Ethereum blockchain.
- **Infura**: A suite of tools for building on Ethereum.
- **MetaMask**: A browser extension for interacting with the Ethereum blockchain.

## Installation

1. Clone the repository:

```sh
  git clone https://github.com/milan44i/cdp-finder.git
  cd cdp-finder
```

2. Install dependencies:

```sh
  npm install
```

## Usage

1. Start the development server:

```sh
  npm run dev
```

2. Open your browser and navigate to http://localhost:3000.

## Environment Variables

The following environment variables are required:

- `VITE_INFURA_API_BASE_URL`: The base URL for Infura API.
- `VITE_INFURA_API_KEY`: Your Infura API key.

<img width="1920" alt="Screenshot 2024-08-27 at 11 46 11" src="https://github.com/user-attachments/assets/a7ccfc52-a074-4eaa-b068-9b476cbdd8c3">
