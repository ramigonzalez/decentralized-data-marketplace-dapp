import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
const GATEWAY_URL = 'https://ipfs.io/ipfs/';

function ShowAsset({ cid, setCid, contractAddress, contractABI, imageUrl, setImageUrl }) {
  const [tokenId, setTokenId] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);
  const [error, setError] = useState(null);

  const fileName = "file";

  useEffect(() => {
    if(cid) {
      setImageUrl(`${GATEWAY_URL}${cid}`);
      (async () => {
        try {
          const response = await fetch(`${GATEWAY_URL}${cid}`, { mode: 'no-cors' });
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setDownloadURL(url);
        } catch (error) {
          console.error('Error fetching file from IPFS:', error);
          setError('An error occurred while fetching the file.');
        }
      })();
    }
  }, [cid]);

  const showAssetCIDByTokenId = async () => {
    if(!tokenId) {
      alert("Name cannot be empty");
      return;
    }
    try {
      debugger
      const { ethereum } = window;
      if (!ethereum) { 
        console.log("Ethereum object not found!")
        return;
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const decentralizedDataMarketContract = new ethers.Contract(contractAddress, contractABI, signer);
      const ipfsHash = await decentralizedDataMarketContract.getDataURI(parseInt(tokenId));
      console.log("IPFS hash is:", ipfsHash);
      setCid(ipfsHash);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <div>
      <input type="text" value={tokenId} onChange={e=>setTokenId(e.target.value)}/>
      <button onClick={showAssetCIDByTokenId}>Show Minted Asset (tokenId: {tokenId})</button>
      { cid &&
        <>
          <div>
            {downloadURL && (<a href={downloadURL} download={fileName}> Download {fileName}</a>)}
          </div>
          <div>
            {imageUrl && <img src={imageUrl} style={{height:500, width:500}} alt="from IPFS" />}
          </div>
          {error && <p className="error">{error}</p>}
        </>
      }

    </div>
  );
}

export default ShowAsset;