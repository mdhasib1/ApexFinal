import React from "react";
import DashboardCom from "../../Components/Dashboard/Dashboard";
const Dashboard = () => {
  // useRedirectLoggedOutUser("/login");
  // const dispatch = useDispatch();
  // const [user,setUser] = useState(null)


  // const isLoggedIn = useSelector(selectIsLoggedIn);
  // const { course,  isError, message } = useSelector(
  //   (state) => state.course
  // );

  // const navigate = useNavigate();
  // const goProfile = () => {
  //   navigate("/course");
  // };


  // useEffect(() => {
  //   async function getUserData() {
  //     const data = await getUser();
  //     setUser(data)
  //     await dispatch(SET_USER(data));
  //     await dispatch(SET_NAME(data.name));
  //     if(data?.status==="paid" & data?.role === "admin" || data?.role !== "student"|| data?.role === "affiliater"   ){
  //       return true;
  //     }else{
  //       if(data?.status==="paid"){
  //         navigate("/pawCourse");
  //       }else{
  //         goProfile()
  //       }
  //     }
  //   }

  //   getUserData();
  // });


  // useEffect(() => {
  //   if (isLoggedIn === true) {
  //     dispatch(getCourses());
  //   }

  //   if (isError) {
  //     console.log(message);
  //   }
  // }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="dashboard">
 <DashboardCom />
    </div>
  );
};

export default Dashboard;
