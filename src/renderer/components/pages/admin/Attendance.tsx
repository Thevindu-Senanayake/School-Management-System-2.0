import React, { Fragment, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks';

import Slider from 'react-slick';

import { adminAttendance } from '../../../redux/dispatchers/attendanceDispatcher';

import NavBar from '../../layout/NavBar';
import Loader from '../../layout/Loader';
import avatarImg from '../../../../public/images/avatar.png';

import NoAttendance from '../../layout/NoAttendance';
import { AttendanceType, Response } from '../../../redux/types/reducerTypes';

const Attendance = () => {
  const dispatch = useAppDispatch();

  const { attendance, loading } = useAppSelector((state) => state.attendance);

  let response: Response = {};

  // TODO: find a better way to do this (more merory-efficient and time-efficient)
  // loop through grades
  for (let i = 6; i < 10; i++) {
    // make s key string for response object
    const gradeName = `Grade ${i}`;
    // make new key vlue pair in response object using above gradename and assing a empty array as initial value
    response[gradeName] = [];
    // loop through attendance
    attendance.forEach((record: AttendanceType) => {
      // if className contains the current value in loop push it to its grade array
      if (record['className'].indexOf(String(i)) > -1) {
        response[gradeName].push(record);
      }
    });
  }

  // get key that only contains attendance in it and assign it to grades
  let grades: string[] = Object.entries(response)
    .filter(([, v]) => !(v.length === 0))
    .map(([k]) => k);

  useEffect(() => {
    dispatch(adminAttendance());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <NavBar />
          <div className="content-container">
            {grades ? (
              grades.map((grade) => (
                <Fragment key={grade}>
                  <br />
                  <br />
                  <div className="users">
                    <section className="main-3 users">
                      <div className="main-top-3">
                        <h1 className="grade">{grade}</h1>
                      </div>
                      <div className="users">
                        <Slider {...settings}>
                          {attendance &&
                            response[grade].map((record) => (
                              <div className="card" key={record._id}>
                                <div className="admin-attendance-avatar">
                                  <img src={avatarImg} alt="avatar" />
                                </div>
                                <h4>{record.className}</h4>
                                <div className="per">
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <button className="admin-attendance-value-button">
                                            {record.boys}
                                          </button>
                                        </td>
                                        <td>
                                          <button className="admin-attendance-value-button">
                                            {record.girls}
                                          </button>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Girls</td>
                                        <td>Boys</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <button
                                  type="submit"
                                  className="admin-attendance-view-button"
                                >
                                  View
                                </button>
                              </div>
                            ))}
                        </Slider>
                      </div>
                    </section>
                  </div>
                </Fragment>
              ))
            ) : (
              <NoAttendance />
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Attendance;
