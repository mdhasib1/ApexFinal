import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import { registerUser, validateEmail } from "../../services/authService";


const initialState = {
  address : "",
  name: "",
  email: "",
  password: "",
};

const ProfileSetupModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const location = useLocation()
  const { address } = location.state;
  const { name, email, password } = formData;



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    if (!address||!name || !email || !password  ) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }


    const userData = {
      address,
      name,
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/profile");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  

      return (
        <div className="container p-5">
          <Form onSubmit={register}>
          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Control
              type="hidden"
              required
              value={address}
              name="address"
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="text-light fs-5">Name:</Form.Label>
            <Form.Control
              type="text"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-light fs-5">Email:</Form.Label>
            <Form.Control
              type="email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-light fs-5">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </Form.Group>
                <Button
                variant="primary"
                type="submit"
              >
                Setup Complete
              </Button>
              </Form>
        </div>
     
      );

};

export default ProfileSetupModal;
