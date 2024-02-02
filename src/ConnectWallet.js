import './App.css';
import React, { useEffect, useState } from 'react';

const GATEWAY_URL = 'https://ipfs.io/ipfs/';

function ConnectWallet({setCurrentAccount}) {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return;

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("window.ethereum.selectedAddress", window.ethereum.selectedAddress);

      const account = accounts[0];
      console.log("Connnected", account);
      setCurrentAccount(account);
      setAccount(account);
    } catch (error) {
      console.log(error)
    }
  }

  const disconnectWallet = async () => {
    setCurrentAccount(null);
    setAccount(null);
  };

  return (
    <div className="App">
        <div className="header">
        { 
          account
          ? (
              <div className="headerContainer">
                <button className="btnHeader" onClick={disconnectWallet}>Logout</button>
              </div>

            )
          : (
              <div className="headerContainer">
                <button className=" btnHeader" onClick={connectWallet}>Connect wallet</button>
              </div>
            )
        }
        </div>
    </div>
  );
}

export default ConnectWallet;
