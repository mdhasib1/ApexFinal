import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('user'));

  const value = {
    token,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
