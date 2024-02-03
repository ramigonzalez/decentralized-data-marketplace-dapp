import logo from './logo.svg';
import './App.css';
import UploadToPinata from './UploadToPinata';
import React, { useState } from 'react';
import ConnectWallet from './ConnectWallet';
import ShowAsset from './ShowAsset';

import DecentralizedDataMarketJson from './utils/DecentralizedDataMarket.json';
const contractABI = DecentralizedDataMarketJson.abi;
const CONTRACT_ADDRESS = '0xD5a640fAC82FD990D8594b4618baE3ED56ADE066';

function App() {

  const [currentAccount, setCurrentAccount] = useState(null);
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
            <UploadToPinata 
              cid={cid} 
              contractAddress={CONTRACT_ADDRESS}
              contractABI={contractABI}
            />
            <ShowAsset 
              cid={cid} 
              setCid={setCid} 
              contractAddress={CONTRACT_ADDRESS}
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
