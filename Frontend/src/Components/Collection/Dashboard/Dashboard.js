import React from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import InfoBox from "../infoBox/InfoBox";
import "./Dashboard.scss";

// Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const FaUser = <FaUsers size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Analytices = () => {


  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [user , setUser] = useState(null)



  // useEffect(() => {
  //   async function getUserData() {
  //     const data = await getUser();
  //     setUser(data)
  //     await dispatch(SET_USER(data));
  //     await dispatch(SET_NAME(data.name));
  //   }
  //   getUserData();
  // }, [dispatch]);

  return (
    <div className="product-summary">
      <h3 className="bar">Dashboard </h3>
      <div className="info-summary">

            <InfoBox
            icon={earningIcon}
            title={"Total Revenue"}
            count={10}
            bgColor="card2"
            className="card"
          />

          <InfoBox
          icon={earningIcon}
          title={"Total NFTs"}
          count={20 }
          bgColor="card2"
          className="card"
        />

    
        <InfoBox
          icon={FaUser}
          title={"Total Users"}
          bgColor="card3"
          className="card"
        />
          <InfoBox
          icon={FaUser}
          title={"Total Users"}
          bgColor="card2"
          className="card"
        />

      </div>
    </div>
  );
};

export default Analytices;
