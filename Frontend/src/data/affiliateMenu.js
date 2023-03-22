import { AiOutlineBarChart } from 'react-icons/ai';
import { FaNetworkWired, FaPaw, FaTh } from "react-icons/fa";
import { FcDocument } from 'react-icons/fc';

const affiliater = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "PAW COURSE",
    icon: <FaPaw />,
    path: "/PawCourse",
  },
  {
    title: "Affiliate COURSE",
    icon: <AiOutlineBarChart />,
    path: "/affiliate-course",
  },
  {
    title: "Network",
    icon: <FaNetworkWired />,
    path: "/network",
  },
  {
    title: "W9-FORM",
    icon: <FcDocument />,
    path: "/w9-form",
  },


];

export default affiliater;
