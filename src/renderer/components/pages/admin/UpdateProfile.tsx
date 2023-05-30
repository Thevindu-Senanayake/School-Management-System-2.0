import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks';

import NavBar from '../../layout/NavBar';
import NotFound from '../../layout/NotFound';
import avatarImg from '../../../../public/images/avatar.png';

import {
  clearErrors,
  updateUser,
} from '../../../redux/dispatchers/userDispatcher';

import { loadUser } from '../../../redux/dispatchers/authDispatcher';

const UpdateProfile = () => {
  const [name, setName] = useState('');

  const alert = useAlert();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error, success } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setName(user.userName);

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('User Details updated successfully');
    }
  }, [dispatch, alert, error, user.userName, success]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      updateUser(
        {
          userName: name,
          role: user.role as 'admin' | 'user',
        },
        user._id
      )
    );
    dispatch(loadUser());
  };

  const cancelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (user.role === 'admin' || user.role === 'god') {
      navigate('/admin/chat');
    } else if (user.role === 'admin') {
      navigate('/admin/chat');
    } else {
      return <NotFound />;
    }
  };

  return (
    <Fragment>
      <div className="edit-profile-container">
        <NavBar />
        <div className="content">
          <div className="input-box">
            <form onSubmit={submitHandler}>
              <div className="avatar-container">
                <img src={avatarImg} className="avatar" alt="Avatar" />
              </div>
              <h2 className="heading">Edit Profile</h2>
              <div className="input-with-label">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label>Username</label>
              </div>
              <div className="btn-group">
                <button className="btn" onClick={cancelHandler}>
                  Cancel
                </button>
                <button className="btn" type="submit">
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
