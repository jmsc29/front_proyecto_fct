import Cookies from 'js-cookie';
import React, { useState, useEffect, createContext } from 'react';
import { urlBase } from '../../endpoints';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  console.log();
  const [authToken, setAuthToken] = useState(null);
  const [miUsuario, setMiUsuario] = useState(window.localStorage.getItem("user"));
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [load, setLoad] = useState(false);
  
  useEffect(() => {
    (
      async () => {
        const response = await fetch(`${urlBase}/user`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        
        const content = await response.json();
        setMiUsuario(content);
        console.log('EL USUARIO ES ' + content.nombre)
      }
    )();  
    setLoad(true);  
    const token = Cookies.get('jwt');
    if (token){
      setAuthToken(token)
    }else{
      window.localStorage.removeItem('user');
    };
  }, []);

  return (
      
    <AuthContext.Provider value={{ authToken, setAuthToken, miUsuario, setMiUsuario, load, setLoad, usuarioEditar, setUsuarioEditar }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
