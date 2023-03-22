import React from "react";
import './header.css';

const Header = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const name = useSelector(selectName);
  // const [profile, setProfile] = useState(false);
  // const [user, setUser] = useState(null);
  // const logout = async () => {
  //   await logoutUser();
  //   await dispatch(SET_LOGIN(false));
  //   navigate("/login");
  // };

  // useEffect(() => {
  //   async function getUserData() {
  //     const data = await getUser();
  //     setUser(data);
  //     await dispatch(SET_USER(data));
  //     await dispatch(SET_NAME(data.name));
  //   }
  //   getUserData();
  // }, [dispatch]);

  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcome, </span>
            <>
            <span className="--color-danger">{'ADMIN'}</span>
            </>

          
        </h3>
        {/* <div  className="avatar">
        <FaUserCircle onClick={()=> setProfile(!profile)}/>
        {profile && (
          <div className="profiledropdown" >
            <ul>
              <li ><Link to="/profile">Profile</Link></li>
              <li onClick={logout}>logout</li>
            </ul>
          </div>
        )}
        </div> */}
      </div>
      <hr />
    </div>
  );
};

export default Header;
