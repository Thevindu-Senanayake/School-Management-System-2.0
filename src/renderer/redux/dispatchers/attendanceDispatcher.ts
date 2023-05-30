import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  request,
  success,
  failure,
  markAttendanceSuccess,
  clearError,
} from "../features/attendance";
import { APIBaseURI, axiosPostConfig, cookiesConfig } from "../types/const";
import {
  AttendanceType,
  MarkAttendance,
  Response,
} from "../types/reducerTypes";

// Mark attendance
export const markAttendance =
  (userData: MarkAttendance) => async (dispatch: Dispatch) => {
    try {
      dispatch(request());

      const { data } = await axios.post(
        `${APIBaseURI}/api/v1/attendance/mark`,
        userData,
        axiosPostConfig
      );

      dispatch(markAttendanceSuccess(data.success));
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(failure(error.response?.data));
      }
    }
  };

// View attendance
export const viewAttendance =
  (className: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(request());

      const userData = {
        className: className,
      };

      const { data } = await axios.post(
        `${APIBaseURI}/api/v1/attendance/old`,
        userData,
        axiosPostConfig
      );

      dispatch(success(data.attendance));
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(failure(error.response?.data.message));
      }
    }
  };

// Admin attendance
export const adminAttendance = () => async (dispatch: Dispatch) => {
  try {
    dispatch(request());

    let response: Response = {};

    const { data } = await axios.get(
      `${APIBaseURI}/api/v1/attendance/admin`,
      cookiesConfig
    );

    for (let i = 6; i < 10; i++) {
      const gradeName = `Grade ${i}`;
      response[gradeName] = [];
      data["attendance"].forEach((record: AttendanceType) => {
        if (record["className"].indexOf(String(i)) > -1) {
          response[gradeName].push(record);
        }
      });
    }

    dispatch(success(data.attendace));
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(failure(error.response?.data.message));
    }
  }
};

// Admin all attendance
export const viewAllAttendance = () => async (dispatch: Dispatch) => {
  try {
    dispatch(request());

    let response: Response = {};

    const { data } = await axios.get(
      `${APIBaseURI}/api/v1/attendance/admin/all`,
      cookiesConfig
    );

    for (let i = 6; i < 10; i++) {
      const gradeName = `Grade ${i}`;
      response[gradeName] = [];
      data["attendance"].forEach((record: AttendanceType) => {
        if (record["className"].indexOf(String(i)) > -1) {
          response[gradeName].push(record);
        }
      });
    }

    dispatch(success(data.attendance));
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(failure(error.response?.data.message));
    }
  }
};

// clear errors
export const clearErrors = () => async (dispatch: Dispatch) => {
  dispatch(clearError());
};
