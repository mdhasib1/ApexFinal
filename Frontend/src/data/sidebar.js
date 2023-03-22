import { FaTh, FaUsers } from "react-icons/fa";
import { FcBiotech, FcDocument } from 'react-icons/fc';
import { HiNewspaper } from 'react-icons/hi';
import { MdCollections } from 'react-icons/md';
import { RiAuctionFill } from 'react-icons/ri';

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/admin",
  },
  {
    title: "ALL NFT",
    icon: <FcBiotech />,
    path: "/allcourse",
  },

  {
    title: "Users",
    icon: <FaUsers />,
    path: "/users",
  },
  {
    title: "Collection",
    icon: <MdCollections />,
    path: "/users",
  },

  {
    title: "ALL Auction",
    icon: <RiAuctionFill />,
    path: "/users",
  },

  {
    title: "News",
    icon: <HiNewspaper />,
    path: "/admin/add-blog",
  },

  {
    title: "About US",
    icon: <FcDocument />,
    path: "/allcourse",
  },
  {
    title: "Slider",
    icon: <FcDocument />,
    path: "/allcourse",
  },
  {
    title: "Terms and condition",
    icon: <FcDocument />,
    path: "/allcourse",
  },
  {
    title: "Privecy Polciy",
    icon: <FcDocument />,
    path: "/allcourse",
  },
  {
    title: "Partner Logo",
    icon: <FcDocument />,
    path: "/allcourse",
  },
  {
    title: "Partner Logo",
    icon: <FcDocument />,
    path: "/allcourse",
  },
  // {
  //   title: "Add Quiz",
  //   icon: <AiFillQuestionCircle />,
  //   path: "/add-quiz",
  // },
  // {
  //   title: "Network",
  //   icon: <FaNetworkWired />,
  //   path: "/network",
  // },
  // {
  //   title: "Coupon",
  //   icon: <AiOutlinePercentage />,
  //   path: "/coupon",
  // },



  // {
  //   title: "MEMBER ID",
  //   icon: <FaUsers />,
  //   path: "/member",
  // },

];

export default menu;
