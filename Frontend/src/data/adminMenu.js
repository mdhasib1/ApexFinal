import { AiFillQuestionCircle, AiOutlinePercentage } from 'react-icons/ai';
import { BiBookReader } from "react-icons/bi";
import { FaNetworkWired, FaTh, FaUsers } from "react-icons/fa";

const adminmenu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "ALL COURSE",
    icon: <BiBookReader />,
    path: "/allcourse",
  },
  {
    title: "Add Quiz",
    icon: <AiFillQuestionCircle />,
    path: "/add-quiz",
  },
  {
    title: "Network",
    icon: <FaNetworkWired />,
    path: "/network",
  },
  {
    title: "Coupon",
    icon: <AiOutlinePercentage />,
    path: "/coupon",
  },

  {
    title: "Users",
    icon: <FaUsers />,
    path: "/users",
  },

  {
    title: "MEMBER ID",
    icon: <FaUsers />,
    path: "/member",
  },

];

export default adminmenu;
