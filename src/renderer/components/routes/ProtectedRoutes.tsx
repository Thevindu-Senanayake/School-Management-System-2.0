import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { loadUser } from "../../redux/dispatchers/authDispatcher";

import Loader from "../layout/Loader";

type Props = {
  isAdmin?: boolean;
  children: JSX.Element;
};

const ProtectedRoutes = ({ children, isAdmin }: Props) => {
  const {
    isAuthenticated = false,
    loading = true,
    user,
  } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      dispatch(loadUser());
    }
  }, [isAuthenticated, loading, user, dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (!loading && isAuthenticated) {
    if (isAdmin === true && user.role !== "admin" && user.role !== "god") {
      return <Navigate to="/" />;
    }
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoutes;
