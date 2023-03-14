import { Navigate, Outlet, useLocation } from "react-router-dom";


const ProtectedRouter = () => {
  const isAuth = localStorage.getItem("token") ? true : false;
  const location = useLocation()

  return (isAuth ? <Outlet /> : <Navigate to='/sign-in' state={{from: location}} replace/>)
};

export default ProtectedRouter;
