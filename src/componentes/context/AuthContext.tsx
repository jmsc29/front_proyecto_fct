import Cookies from 'js-cookie';
import React, { useState, useEffect, createContext } from 'react';
import { urlBase } from '../../endpoints';
import Departamento from '../../models/Departamento';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [miUsuario, setMiUsuario] = useState(window.localStorage.getItem("user"));
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [departamentoEditar, setDepartamentoEditar] = useState<Departamento>(null);
  const [registroEditar, setRegistroEditar] = useState(null);
  const [load, setLoad] = useState(false);
  const [fechaRegistros, setFechaRegistros] = useState<string>();

  //obtengo el usuario que ha iniciado sesión
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
      }
    )();
    setLoad(true);
    const token = Cookies.get('jwt');
    if (token) {
      setAuthToken(token)
    } else {
      window.localStorage.removeItem('user');
    };
  }, []);

  return (

    <AuthContext.Provider value={
      {
        authToken, setAuthToken,
        miUsuario, setMiUsuario,
        load, setLoad,
        usuarioEditar, setUsuarioEditar,
        registroEditar, setRegistroEditar,
        departamentoEditar, setDepartamentoEditar,
        fechaRegistros, setFechaRegistros
      }
    }>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
