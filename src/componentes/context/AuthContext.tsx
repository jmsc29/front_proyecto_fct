import Cookies from 'js-cookie';
import React, { useState, useEffect, createContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [miUsuario, setMiUsuario] = useState(null);
  
  useEffect(() => {
    const token = Cookies.get('jwt');
    if (token) setAuthToken(token);
  }, []);

  return (
      
    <AuthContext.Provider value={{ authToken, setAuthToken, miUsuario, setMiUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
