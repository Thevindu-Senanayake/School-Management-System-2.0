import React, { Fragment, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import {
  getAllUsers,
  updateUser,
  clearErrors,
} from '../../../redux/dispatchers/userDispatcher';
import { loadUser } from '../../../redux/dispatchers/authDispatcher';

import NavBar from '../../layout/NavBar';
import Loader from '../../layout/Loader';
import avatarImg from '../../../../public/images/avatar.png';
import { User } from '../../../redux/types/reducerTypes';

const AllUsers = () => {
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, users, error, success } = useAppSelector(
    (state) => state.user
  );
  const { user } = useAppSelector((state) => state.auth);

  const changeRole = (
    e: React.ChangeEvent<HTMLSelectElement>,
    user: User,
    role: 'admin' | 'user'
  ) => {
    e.preventDefault();
    const userData = {
      userName: user.userName,
      role: role,
    };

    dispatch(updateUser(userData, user._id));
  };

  useEffect(() => {
    if (user.role !== 'admin' && user.role !== 'god') {
      navigate('/');
    }

    dispatch(getAllUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('successfully updated');
      dispatch(getAllUsers());
      dispatch(loadUser());
    }
  }, [dispatch, alert, error, success, user.role, navigate]);

  //Settings for slider
  const settings = {
    dots: true,
    infinite: false,
    speed: 850,
    slidesToShow: 4,
    slidesToScroll: 3,
  };

  // Filter the users by role
  const admins = users.filter(
    (user) => user.role === 'admin' || user.role === 'god'
  );
  const Users = users.filter((user) => user.role === 'user');

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="all-users-container">
            <NavBar />
            <div className="all-users-content-container">
              <div className="all-users-header">
                <h1 className="headings">All-Users</h1>
                <h1 className="headings">
                  Total-Users = {users && users.length}
                </h1>
                <div className="user-card-header">
                  <h2>Admins = {admins && admins.length}</h2>
                </div>
                <br />
              </div>
              <Slider {...settings}>
                {admins.map((user) => (
                  <div className="all-users-body" key={user._id}>
                    <div className="user-account-card">
                      <img src={avatarImg} alt="avatar" />
                      <h4 className="all-users-username">{user.userName}</h4>
                      <div className="per">
                        <select
                          id="all-users-standard-select"
                          onChange={(e) =>
                            changeRole(
                              e,
                              user,
                              e.target.value as 'admin' | 'user'
                            )
                          }
                        >
                          <option>
                            {user.role === 'god' ? 'admin' : user.role}
                          </option>
                          <option>
                            {user.role === 'admin' || user.role === 'god'
                              ? 'user'
                              : user.role === 'user' && 'admin'}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
              <br />
              <br />
              <br />
              <div className="user-card-header">
                <h2>Users = {Users && Users.length}</h2>
              </div>
              <br />
              <Slider {...settings}>
                {Users.map((user) => (
                  <div className="all-users-body" key={user._id}>
                    <div className="user-account-card">
                      <img src={avatarImg} alt="avatar" />
                      <h4 className="all-users-username">{user.userName}</h4>
                      <div className="per">
                        <select
                          id="all-users-standard-select"
                          onChange={(e) =>
                            changeRole(
                              e,
                              user,
                              e.target.value as 'admin' | 'user'
                            )
                          }
                        >
                          <option>
                            {user.role === 'god' ? 'admin' : user.role}
                          </option>
                          <option>
                            {user.role === 'admin' || user.role === 'god'
                              ? 'user'
                              : user.role === 'user' && 'admin'}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AllUsers;
