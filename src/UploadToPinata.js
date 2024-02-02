import React, { useState } from 'react';
import axios from 'axios';

const UploadToPinata = ({ cid }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [upload, setUpload] = useState(false);
  
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError('Please select an image to upload.');
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

      console.log("Asset uploaded with CID: ",response.data.IpfsHash);
      setError(null);
      setUpload(false);
    } catch (error) {
      console.error('Error uploading to Pinata:', error);
      setError('An error occurred while uploading the image.');
    }
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
          <label htmlFor="file">Select a file:</label>
          <input type="file" id="file" onChange={handleFileChange} />
          <button type="submit">Upload file</button>
          {error && <p className="error">{error}</p>}
        </form>
      }
    </div>
  );
};

export default UploadToPinata;