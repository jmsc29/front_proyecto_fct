import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from 'react-cookie';

const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  return cookies.jwt;
};

//En caso de estar loogeado muestra los componentes correspondientes, en caso contrario redirije a login
const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
