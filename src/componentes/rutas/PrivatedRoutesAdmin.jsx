import React, { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from 'react-cookie';
import AuthContext from '../context/AuthContext';
import Usuario from '../../models/Usuario';

const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  
  return cookies.jwt;
};

const ProtectedRoutesAdmin = () => {
  const isAuth = useAuth();
  const { miUsuario } = useContext(AuthContext);
  return isAuth ? miUsuario.tipo_usuario === 'Admin' ? <Outlet /> : <Navigate to="/" /> : <Navigate to="/login" />;
};

export default ProtectedRoutesAdmin;
