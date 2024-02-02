import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { routes } from "./routes";

const PrivateRoute = () => {
  const { isLoggedIn } = useContext(UserContext);

  return isLoggedIn ? <Outlet /> : <Navigate to={routes.HEADER} />;
};

export default PrivateRoute;
