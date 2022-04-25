import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from 'react-cookie';

const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  return cookies.jwt;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
