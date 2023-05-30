import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  request,
  getMessagesSccess,
  sendMessageSuccess,
  failure,
  clearError,
} from "../features/message";
import { APIBaseURI, axiosPostConfig } from "../types/const";

export const getOldMessages =
  (to: string, from: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(request());

      const { data } = await axios.post(
        `${APIBaseURI}/api/v1/msg/get-msg`,
        { from: from, to: to },
        axiosPostConfig
      );

      dispatch(getMessagesSccess(data));
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(failure(error.response?.data.message));
      }
    }
  };

export const sendMessages =
  (to: string, from: string, message: string, time: string) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(request());

      const { data } = await axios.post(
        `${APIBaseURI}/api/v1/msg/add-msg`,
        { from: from, to: to, message: message, time: time },
        axiosPostConfig
      );

      dispatch(sendMessageSuccess(data.success));
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
