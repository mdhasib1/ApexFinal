import axios from "axios";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUser(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const getUser = async (token) => {
    try {
      const response = await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  const register = async (email, walletAddress, bio, password) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/user", {
        email,
        walletAddress,
        bio,
        password,
      });

      localStorage.setItem("token", response.data.token);

      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  const authenticate = async (walletAddress, password) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/user", {
        walletAddress,
        password,
      });

      localStorage.setItem("token", response.data.token);

      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  return {
    register,
    authenticate,
    getUser,
    user,
    loading,
    error,
    isLoading,
  };
};

export default useAuth;
