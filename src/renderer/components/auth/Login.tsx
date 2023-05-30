import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';

import Loader from '../layout/Loader';
import avatarImg from '../../../public/images/avatar.png';
import { login, clearErrors } from '../../redux/dispatchers/authDispatcher';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const alert = useAlert();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, alert, error, navigate]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(userName, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="loginWrapper">
          <form action="" className="form" onSubmit={submitHandler}>
            <img src={avatarImg} alt="avatar" />
            <h2>Login</h2>
            <div className="inputGroup">
              <input
                type="text"
                name="loginUser"
                id="loginUser"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <label htmlFor="loginUser">User Name</label>
            </div>
            <div className="inputGroup">
              <input
                type="password"
                name="loginPassword"
                id="loginPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="loginPassword">Password</label>
              <button type="submit" className="submitBtn">
                Login
              </button>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
