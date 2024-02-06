import React, { useState } from 'react';
import axios from 'axios';
import { ethers } from "ethers";
const DataCategory = { PUBLIC: 1, PRIVATE: 2, CONFIDENTIAL: 3 }

const UploadToPinata = ({ cid, contractAddress, contractABI }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [upload, setUpload] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError('Please select an image to upload.');
      return;
    }
    if (!selectedItem) {
      setError('Please select an access level.');
      return;
    }

    const pinataApiKey = 'd594fefe92011c25a5a5'; // Replace with your API key
    const pinataSecretApiKey = 'c01b9e6a8362279143ff1a83f52ea79badafe00c4b4dea5f59a2b7f6f7d96c6e'; // Replace with your secret key

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'pinata_api_key': pinataApiKey,
            'pinata_secret_api_key': pinataSecretApiKey,
          },
        }
      );
      const ipfsHash = response.data.IpfsHash;
      console.log("Asset uploaded with CID: ",ipfsHash);

      const { ethereum } = window;
      if (!ethereum) { 
        console.log("Ethereum object not found!")
        return;
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const decentralizedDataMarketContract = new ethers.Contract(contractAddress, contractABI, signer);
      const mintTx = await decentralizedDataMarketContract.mintDataToken(
        ipfsHash,
        selectedItem,
        { value: ethers.utils.parseEther('0.001') }
      );
      await mintTx.wait();
      console.log("Mined tx ->", mintTx.hash);
      setError(null);
      setUpload(false);
    } catch (error) {
      console.error('Error uploading to Pinata:', error);
      setError('An error occurred while uploading the image.');
    }
  };

  const handleSelectChange = (event) => {
    setSelectedItem(event.target.value);
  };

  return (
    <div>
      <p>
        Mint your data asset
      </p>
      { (!cid && !upload) && <button onClick={() => setUpload(true)}>Mint</button>}
      {
        upload && 
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="file">Select a file:</label>
            <input type="file" id="file" onChange={handleFileChange} />
          </div>
          <div>
            <label htmlFor="items">Access Level:</label>
            <select id="items" value={selectedItem} onChange={handleSelectChange}>
              <option value="">Select...</option>
              <option value={DataCategory.PUBLIC}>PUBLIC</option>
              <option value={DataCategory.PRIVATE}>PRIVATE</option>
              <option value={DataCategory.CONFIDENTIAL}>CONFIDENTIAL</option>
            </select>
          </div>
          <button type="submit">Upload file</button>
          {error && <p className="error">{error}</p>}
        </form>
      }
    </div>
  );
};

export default UploadToPinata;