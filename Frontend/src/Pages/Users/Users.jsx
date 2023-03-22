import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserList from "../../components/UsersList/UsersList.jsx";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn, SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
import { getProducts } from "../../redux/features/Course/CourseSlice";
import { getUser } from "../../services/authService";

const AllUsers = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const {  isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useRedirectLoggedOutUser("/login");
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [user , setUser] = useState(null)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    async function getUserData() {
      const data = await getUser();
      setUser(data._id)
      setProfile(data.role);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/order/${user}`)
    .then((res)=>{
      setStatus(res.data.order.status)
    })
  },[user])

  const redirect = async(e)=>{
    if(profile==='student' || profile==='affiliater'){
      navigate('/profile')
    }
  }

  redirect()

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="dashboard">

      <UserList isLoading={isLoading} />
    </div>
  );
};

export default AllUsers;
