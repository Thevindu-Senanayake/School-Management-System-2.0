import React, { useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { clearErrors } from "../redux/dispatchers/authDispatcher";

import Loader from "./layout/Loader";

const Home = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useAppDispatch();

  const { user, loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    if (!loading && (user.role === "admin" || user.role === "god")) {
      navigate("/admin/chat");
    }

    if (!loading && user.role === "user") {
      navigate("/chat");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [loading, navigate, user.role, alert, dispatch, error, isAuthenticated]);

  return (
    <Fragment>
      {loading && <Loader />}
      <Loader />
    </Fragment>
  );
};

export default Home;
