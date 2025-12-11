import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GlobalContext } from "../../globalContextCreate";

export const PrivateRouteWrapper = () => {
  const { loginCredential } = useContext(GlobalContext);

  if (loginCredential === undefined) return (<Navigate to={"/"} replace={true} />);
  else return (<Outlet />);
};