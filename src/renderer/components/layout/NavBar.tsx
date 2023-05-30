import React, { Fragment, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { useAlert } from 'react-alert';
import { useNavigate, Link } from 'react-router-dom';
import { io } from 'socket.io-client';

import { logOut, clearErrors } from '../../redux/dispatchers/authDispatcher';
import Loader from './Loader';
import avatarImg from '../../../public/images/avatar.png';

const NavBar = () => {
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, user, loading } = useAppSelector(
    (state) => state.auth
  );

  const logoutHandler = () => {
    dispatch(logOut());
    const socket = io(window.electron.APIBASEURI as string);
    socket.disconnect();
    alert.success('Logged out successfully');
  };

  useEffect(() => {
    if (loading === false && !isAuthenticated) {
      navigate('/login');
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, alert, error, navigate, loading]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="navbar-container">
            <nav className="navbar">
              <div className="navbar-content">
                <div className="navbar-heading-container">
                  <img src={avatarImg} alt="avatar" className="navbar-avatar" />
                  <span className="username">{user && user.userName}</span>
                </div>
                <div className="nav-elements">
                  <ul>
                    <li className="nav-item">
                      <Link to="/">
                        <i className="fas fa-comments navbar-icon"></i>
                        <span className="nav-item-text">Message</span>
                      </Link>
                    </li>
                    {user && user.role === 'user' ? (
                      <Fragment>
                        <li className="nav-item">
                          <Link to="/attendance/mark">
                            <i className="fas fa-marker navbar-icon"></i>
                            <span className="nav-item-text nav-item-text-resized">
                              Mark Attendance
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/attendance/view">
                            <i className="fas fa-users navbar-icon"></i>
                            <span className="nav-item-text nav-item-text-resized">
                              View Attendance
                            </span>
                          </Link>
                        </li>
                      </Fragment>
                    ) : (
                      (user.role === 'admin' || user.role === 'god') && (
                        <Fragment>
                          <li className="nav-item">
                            <Link to="/all-users">
                              <i className="fas fa-users navbar-icon"></i>
                              <span className="nav-item-text">Users</span>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/attendance">
                              <i className="fas fa-chart-bar navbar-icon"></i>
                              <span className="nav-item-text">Attendance</span>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/edit-profile">
                              <i className="fas fa-user-edit navbar-icon"></i>
                              <span className="nav-item-text">
                                Edit Profile
                              </span>
                            </Link>
                          </li>
                        </Fragment>
                      )
                    )}
                  </ul>
                  <div className="nav-item logout">
                    <button
                      className="logout-button"
                      type="submit"
                      onClick={logoutHandler}
                    >
                      <i className="fas fa-sign-out-alt navbar-icon"></i>
                      <span className="nav-item-text">Log out</span>
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default NavBar;
