import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../layout/NavBar';
import avatarImg from '../../../public/images/avatar.png';

import { useAlert } from 'react-alert';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import {
  markAttendance,
  clearErrors,
} from '../../redux/dispatchers/attendanceDispatcher';

const MarkAttendance = () => {
  const [girls, setGirls] = useState(0);
  const [boys, setBoys] = useState(0);
  const [className, setClassName] = useState('');

  const alert = useAlert();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error, loading, success } = useAppSelector(
    (state) => state.attendance
  );
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user.role === 'admin' || user.role === 'god') {
      navigate('/admin/chat');
    }

    setClassName(user.userName);

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      if (error === 'You have already submitted the attendance for today') {
        navigate('/chat');
      }
    }

    if (success) {
      alert.success('Attendance successfully submitted');
      navigate('/chat');
    }
  }, [dispatch, alert, error, user.userName, user.role, navigate, success]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: ask what to do
    if (girls === 0 || boys === 0) {
      alert.error('Attendance should be provided');
    } else if (girls > 50 || boys > 50) {
      alert.error('Attendance should not be greater than 50');
    } else if (girls % 1 !== 0 || boys % 1 !== 0) {
      alert.error('Attendance should not be a decimal values');
    } else {
      dispatch(
        markAttendance({ boys: boys, girls: girls, className: className })
      );
    }
  };

  return (
    <div className="user-attendance-container">
      <NavBar />
      <div className="content">
        <div className="input-box">
          <form onSubmit={submitHandler}>
            <div className="avatar-container">
              <img src={avatarImg} className="avatar" alt="avatar" />
            </div>
            <h2 className="heading">{user.userName}</h2>
            <div className="user-attendance-input-group">
              <div id="boys-input" className="input-with-label">
                <input
                  type="number"
                  name="boys"
                  value={boys}
                  onChange={(e) => setBoys(Number(e.target.value))}
                  required
                />
                <label>Boys</label>
              </div>
              <div className="input-with-label">
                <input
                  type="number"
                  name="girls"
                  value={girls}
                  onChange={(e) => setGirls(Number(e.target.value))}
                  required
                />
                <label>Girls</label>
              </div>
            </div>
            <div className="btn-group">
              <button
                id="submit-btn"
                type="submit"
                disabled={loading ? true : false}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MarkAttendance;
