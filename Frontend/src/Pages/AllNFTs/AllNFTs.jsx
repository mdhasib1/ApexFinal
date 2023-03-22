import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { SpinnerImg } from '../../Components/loader/Loader';
import { shortenAddress } from "../../utils/shortenAddress";
const API_URL = `http://localhost:8000/api/nfts`
const AllNFTs = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [nfts , setNfts] = useState([]);

  useEffect(()=>{
   axios.get(API_URL)
   .then((response)=>{
     setNfts(response.data.nfts)
   })
  })
  return (
    <div className="Course-list">
    <hr />
    <div className="table">
      <div className="--flex-between --flex-dir-column">
        <span>
          <h3>All NFTs </h3>
        </span>
      </div>

      {isLoading && <SpinnerImg />}

      <div className="table mt-5">
        {!isLoading && nfts.length === 0 ? (
          <p>-- No nfts found, please add a nfts...</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>TokenID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Collection</th>
                <th>Description</th>
                <th>Author</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {nfts.map((NFT, index) => {
                const { tokenId, name, price,description,nftcollection,author,image } = NFT;
                return (
                  <tr key={index + 1}>
                    <td>{tokenId}</td>
                    <td width={200}><img src={image} className="w-25 m-auto" alt={name} /></td>
                    <td>{name}</td>
                    <td>{nftcollection}</td>
                    <td>{description}</td>
                    <td>{shortenAddress(author)}</td>
                    <td>
                      {"$"}
                      {price}
                    </td>
                    <td>
                    <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  </div>
  );
};

export default AllNFTs;
