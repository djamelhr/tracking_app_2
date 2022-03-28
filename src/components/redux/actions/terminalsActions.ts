import { ThunkAction } from "redux-thunk";
import { proxy } from "../proxy";

import { RootState } from "../store";

import {
  GET_TERMINAL,
  TerminalListAction,
  SET_LOADING,
  SET_ERROR,
  SET_TERMINAL_NAME,
  SET_TERMINAL_FIRMS,
  SET_BOL,
  SET_CONTAINER_NUMBER,
} from "../types";

export const getContainer = (
  data: any
): ThunkAction<void, RootState, null, TerminalListAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      const res = await fetch(`${proxy}/v2/terminal`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const content = await res.json();

      dispatch({
        type: GET_TERMINAL,
        payload: content,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: SET_ERROR,
        payload: error,
      });
    }
  };
};

/// set terminal name
export const SetTerminalName = (
  terminalName: string
): ThunkAction<void, RootState, null, TerminalListAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_TERMINAL_NAME,
        payload: terminalName,
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};

export const SetTerminalFirms = (
  terminalFrims: string
): ThunkAction<void, RootState, null, TerminalListAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_TERMINAL_FIRMS,
        payload: terminalFrims,
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};

export const SetContainerNumber = (
  contianer_number: string
): ThunkAction<void, RootState, null, TerminalListAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_CONTAINER_NUMBER,
        payload: contianer_number,
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};

export const SetBol = (
  bol: string
): ThunkAction<void, RootState, null, TerminalListAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_BOL,
        payload: bol,
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};
