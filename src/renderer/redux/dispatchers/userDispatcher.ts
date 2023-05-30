import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  request,
  success,
  updateUserSuccess,
  failure,
  clearError,
} from "../features/user";
import { APIBaseURI, axiosPostConfig, cookiesConfig } from "../types/const";
import { UpdateUser } from "../types/reducerTypes";

// Get All Users (Admin)
export const getAllUsers = () => async (dispatch: Dispatch) => {
  try {
    dispatch(request());

    const { data } = await axios.get(
      `${APIBaseURI}/api/v1/auth/admin/users`,
      cookiesConfig
    );

    dispatch(success(data.users));
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(failure(error.response?.data.message));
    }
  }
};

// Get Admin Contacts (Admin)
export const getAdminContacts =
  (userId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(request());

      const userData = {
        userId: userId,
      };

      const { data } = await axios.post(
        `${APIBaseURI}/api/v1/auth/admin/contacts`,
        userData,
        axiosPostConfig
      );

      dispatch(success(data.users));
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(failure(error.response?.data.message));
      }
    }
  };

// Get Admins
export const getAdmins = () => async (dispatch: Dispatch) => {
  try {
    dispatch(request());

    const { data } = await axios.get(
      `${APIBaseURI}/api/v1/auth/admins`,
      cookiesConfig
    );

    dispatch(success(data.admins));
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(failure(error.response?.data.message));
    }
  }
};

// Get User Details (Admin)
export const getUserDetails = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(request());

    const { data } = await axios.get(
      `${APIBaseURI}/api/v1/auth/admin/user/${id}`,
      cookiesConfig
    );

    dispatch(success(data.user));
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(failure(error.response?.data.message));
    }
  }
};

// Update User Details (Admin)
export const updateUser =
  (userData: UpdateUser, id: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(request());

      const { data } = await axios.put(
        `${APIBaseURI}/api/v1/auth/admin/user/${id}`,
        userData,
        axiosPostConfig
      );

      dispatch(updateUserSuccess(data.success));
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
