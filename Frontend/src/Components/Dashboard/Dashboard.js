import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { FcBiotech, FcSalesPerformance } from 'react-icons/fc';
import { MdCollections } from 'react-icons/md';
import { RiAuctionFill } from 'react-icons/ri';
import InfoBox from "../infoBox/InfoBox";
import "./Dashboard.scss";

// Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const FaUser = <FaUsers size={40} color="#fff" />;
const FcBiote = <FcBiotech size={40} color="#fff" />;
const RiAuction = <RiAuctionFill size={40} color="#fff" />;
const Collections = <MdCollections size={40} color="#fff" />;
const SalesPerformance = <FcSalesPerformance size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Analytices = () => {


  const [creator,setCreator] = useState([])
  const [collection,setCollection] = useState([])

  useEffect(()=>{
     axios.get(`${BACKEND_URL}/api/creator`)
     .then((res)=>{
      setCreator(res.data.numberOfCreator)
     })
  },[])
  useEffect(()=>{
     axios.get(`${BACKEND_URL}/api/collection/totalCollection`)
     .then((res)=>{
      setCollection(res.data.numberOfCollection)
     })
  },[])


  return (
    <div className="product-summary">
      <h3 className="bar text-dark">Dashboard </h3>
      <div className="info-summary">

            <InfoBox
            icon={earningIcon}
            title={"Total Revenue"}
            count={10}
            bgColor="card2"
            className="card"
          />
            <InfoBox
            icon={FcBiote}
            title={"Total NFTs"}
            count={10}
            bgColor="card2"
            className="card"
          />

          <InfoBox
          icon={RiAuction}
          title={"Total Auction"}
          count={20 }
          bgColor="card2"
          className="card"
        />

    
        <InfoBox
          icon={FaUser}
          title={"Total Users"}
          bgColor="card3"
          count={creator }
          className="card"
        />
        <InfoBox
          icon={Collections}
          title={"Total Collection"}
          bgColor="card3"
          count={collection }
          className="card"
        />
        <InfoBox
          icon={SalesPerformance}
          title={"Total Sales"}
          bgColor="card3"
          count={200 }
          className="card"
        />

      </div>
    </div>
  );
};

export default Analytices;
