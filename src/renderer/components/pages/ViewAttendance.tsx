import React, { useEffect, Fragment } from "react";

import NavBar from "../layout/NavBar";
import Loader from "../layout/Loader";

import { useAlert } from "react-alert";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  viewAttendance,
  clearErrors,
} from "../../redux/dispatchers/attendanceDispatcher";

const ViewAttendance = () => {
  const alert = useAlert();
  const dispatch = useAppDispatch();

  const { error, loading, attendance } = useAppSelector(
    (state) => state.attendance
  );

  const { user, loading: authLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!authLoading) {
      dispatch(viewAttendance(user.userName));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, authLoading, user.userName]);
  return (
    <Fragment>
      {loading || authLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="container">
            <NavBar />
            <div className="content-container">
              <h1 className="admin-old-attendance-headings">
                {user && user.userName}
              </h1>
              {/* // TODO: add a way to get total students in the classNameName */}
              <h1 className="admin-old-attendance-headings">
                Total Students in className = 45
              </h1>
              <div className="admin-old-attendance-tables">
                <table className="admin-old-attendance-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Girls</th>
                      <th>Boys</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance &&
                      attendance.map((record) => (
                        <tr>
                          <td>{record.date}</td>
                          <td>{record.boys}</td>
                          <td>{record.girls}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ViewAttendance;
