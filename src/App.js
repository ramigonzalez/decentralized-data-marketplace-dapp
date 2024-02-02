import logo from './logo.svg';
import './App.css';
import UploadToPinata from './UploadToPinata';
import React, { useEffect, useState } from 'react';
import ConnectWallet from './ConnectWallet';
import ShowAsset from './ShowAsset';

import DecentralizedDataMarketJson from './utils/DecentralizedDataMarket.json';
const contractABI = DecentralizedDataMarketJson.abi;

const GATEWAY_URL = 'https://ipfs.io/ipfs/';

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contractAddress, setContractAddress] = useState(null);

  const [cid, setCid] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <p>👋 Welcome to Decentralized Data Marketplace</p>
        <ConnectWallet setCurrentAccount={setCurrentAccount}/>
        {
          currentAccount
          &&
          <div>
            <p>Current address: {currentAccount}</p>
            <img src={logo} className="App-logo" alt="logo" style={{height:200, width:200}} />
            <UploadToPinata cid={cid} />
            <ShowAsset 
              cid={cid} 
              setCid={setCid} 
              contractAddress={contractAddress}
              contractABI={contractABI}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
            />
          </div>
        }
      </header>
    </div>
  );
}

export default App;
