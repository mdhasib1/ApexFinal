import jwt_decode from 'jwt-decode';
import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';

function ProtectedRoute({ roles }) {
  const { token } = useContext(AuthContext); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/lock-screen", { replace: true });
      return;
    }

    try {
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);

      if (!roles.includes(decodedToken.role)) {
        navigate("/", { replace: true });
        return;
      }
    } catch (error) {
      console.error('Invalid token:', error);
      navigate("/lock-screen", { replace: true });
      return;
    }
  }, [token, roles, navigate]);

  return <Outlet />;
}

export default React.memo(ProtectedRoute);
