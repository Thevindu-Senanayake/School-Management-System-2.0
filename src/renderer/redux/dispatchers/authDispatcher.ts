import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  request,
  success,
  failure,
  logout,
  logoutFail,
  clearError,
} from "../features/auth";
import { APIBaseURI, axiosPostConfig, cookiesConfig } from "../types/const";

// Login
export const login =
  (username: string, password: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(request());

      const { data } = await axios.post(
        `${APIBaseURI}/api/v1/auth/login`,
        { userName: username, password },
        axiosPostConfig
      );

      dispatch(success(data.user));
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(failure(error?.response?.data?.message));
      }
    }
  };

// Register
export const register =
  (username: string, password: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(request());

      const { data } = await axios.post(
        `${APIBaseURI}/api/v1/auth/register`,
        {
          username,
          password,
        },
        axiosPostConfig
      );

      dispatch(success(data.user));
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(failure(error?.response?.data?.message));
      }
    }
  };

// Load user Details
export const loadUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch(request());

    const { data } = await axios.get(`${APIBaseURI}/api/v1/auth/me`, cookiesConfig);

    dispatch(success(data.user));
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(failure(error?.response?.data?.message));
    }
  }
};

// Logout
export const logOut = () => async (dispatch: Dispatch) => {
  try {
    await axios.get(`${APIBaseURI}/api/v1/auth/logout`, cookiesConfig);

    dispatch(logout());
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(logoutFail(error?.response?.data?.message));
    }
  }
};

// clear errors
export const clearErrors = () => async (dispatch: Dispatch) => {
  dispatch(clearError());
};
