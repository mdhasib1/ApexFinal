import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { dragon } from '../../Components/imageImport/index';
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import { loginUser } from "../../services/authService";

const initialState = {
  address: "",
  password: "",
};

const LockScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const { address } = location.state;
  const [formData, setformData] = useState(initialState);
  const { password } = formData;
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };


  const login = async (e) => {
    e.preventDefault();

    if (!address || !password) {
      return toast.error("All fields are required");
    }


    const userData = {
      address,
      password,
    };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.token));
  
      // Check the user's role and navigate accordingly
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
  
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="position-relative">
        <div className="bg-overlay bg-linear-gradient-2"></div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <div className="d-flex flex-column min-vh-100 p-4">


                {/* Start Content */}
                <div className="title-heading text-center my-auto">
                  <div className="form-signin w-50 m-auto px-4 py-5 bg-white rounded-md shadow-sm">
                    <form onSubmit={login}>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="mb-3 text-center">
                            <img
                              src={dragon}
                              className="avatar avatar-md-md rounded-pill mx-auto d-block shadow"
                              alt=""
                            />

                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="LoginAddress"
                              required
                              name="address"
                              value={address}
                              readOnly
                            />
                            <label htmlFor="LoginPassword">Address:</label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              type="password"
                              className="form-control"
                              id="LoginPassword"
                              placeholder="Password"
                              required
                              name="password"
                              value={password}
                              onChange={handleInputChange}
                            />
                            <label htmlFor="LoginPassword">Password:</label>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="d-flex justify-content-between">
                            <div className="mb-3">
                              <div className="form-check align-items-center d-flex mb-0">
                                <input
                                  className="form-check-input mt-0"
                                  type="checkbox"
                                  value=""
                                  id="RememberMe"
                                />
                                <label
                                  className="form-check-label text-muted ms-2"
                                  htmlFor="RememberMe"
                                >
                                  Remember me
                                </label>
                              </div>
                            </div>
                            <small className="text-muted mb-0">
                              <Link
                                to="/reset-password"
                                onClick={e => {
                                  e.preventDefault()
                                  navigate('/reset-password')
                                }}
                                className="text-muted fw-semibold"
                              >
                                Forgot password ?
                              </Link>
                            </small>
                          </div>
                        </div>
                        <div className="col-lg-12 mb-0">
                          <div className="d-grid">
                            <button className="btn btn-primary rounded-md">
                              Login
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* End Content */}

                {/* Start Footer */}
                <div className="text-center">
                <p className="mb-0">
                  <script>document.write(new Date().getFullYear())</script>{' '}
                    © All Rights Reserved Alchemy Studios™, LLC{' '}

                  </p>
                </div>
                {/* End Footer */}
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
      </section>
      {/*end section*/}
      {/* Hero End */}
    </>
  )
}

export default LockScreen
