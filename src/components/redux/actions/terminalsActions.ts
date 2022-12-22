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
  GET_TERMINAL_OTHER_NAMES,
  SET_LOADING_OTHER_NAME,
  ADD_TERMINAL_OTHER_NAMES,
  GET_ALL_TERMINALS,
  GET_PORT_OTHER_NAMES,
  GET_ALL_PORTS,
  SET_LOADING_PORT_NAME,
  SET_TYPE,
  SET_LOADING_RAILS_NAME,
  GET_RAILS_OTHER_NAMES,
  GET_ALL_RAILS,
  GET_ALL_METRO,
  SET_RAILS,
  COUNT_PORTS,
  COUNT_METRO,
  SET_TERMINALS,
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

export const AddOtherNames = (
  data: any
): ThunkAction<void, RootState, null, TerminalListAction> => {
  return async (dispatch) => {
    try {
      // dispatch({
      //   type: SET_LOADING_OTHER_NAME,
      //   payload: true,
      // });
      const res = await fetch(`${proxy}/v2/terminals/addnames`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      dispatch({
        type: ADD_TERMINAL_OTHER_NAMES,
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};
export const getAllTerminals = (): ThunkAction<
  void,
  RootState,
  null,
  TerminalListAction
> => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${proxy}/v2/terminals/all`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: GET_ALL_TERMINALS,
        payload: await res.json(),
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};
export const getAllPorts = (): ThunkAction<
  void,
  RootState,
  null,
  TerminalListAction
> => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${proxy}/v1/ports/all`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: GET_ALL_PORTS,
        payload: await res.json(),
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};
export const getAllPortsPaginate = (
  page: number,
  per_page: number
): ThunkAction<void, RootState, null, TerminalListAction> => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `${proxy}/v1/ports/page/${page}/per_page/${per_page}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: GET_ALL_PORTS,
        payload: await res.json(),
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};
export const countPorts = (): ThunkAction<
  void,
  RootState,
  null,
  TerminalListAction
> => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${proxy}/v1/ports/count_ports`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: COUNT_PORTS,
        payload: Number(await res.json()),
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};

export const countMetros = (): ThunkAction<
  void,
  RootState,
  null,
  TerminalListAction
> => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${proxy}/v1/ports/count_metro`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: COUNT_METRO,
        payload: Number(await res.json()),
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};

export const getAllRails = (): ThunkAction<
  void,
  RootState,
  null,
  TerminalListAction
> => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${proxy}/v2/terminal_rail/all`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: GET_ALL_RAILS,
        payload: await res.json(),
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};
export const getAllMetro = (): ThunkAction<
  void,
  RootState,
  null,
  TerminalListAction
> => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${proxy}/v1/ports/metro_area`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: GET_ALL_METRO,
        payload: await res.json(),
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};
export const SetRails = (
  data: any
): ThunkAction<void, RootState, null, TerminalListAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_RAILS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};
export const SetTerminals = (
  data: any
): ThunkAction<void, RootState, null, TerminalListAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_TERMINALS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};
export const getPortNames = (
  option: string
): ThunkAction<void, RootState, null, TerminalListAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_LOADING_PORT_NAME,
        payload: true,
      });
      const res = await fetch(`${proxy}/v1/ports/names/${option}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: GET_PORT_OTHER_NAMES,
        payload: await res.json(),
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};
export const getRailsNames = (
  option: string
): ThunkAction<void, RootState, null, TerminalListAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_LOADING_RAILS_NAME,
        payload: true,
      });
      const res = await fetch(`${proxy}/v2/rails/names/${option}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: GET_RAILS_OTHER_NAMES,
        payload: await res.json(),
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};

export const setType = (
  type: string
): ThunkAction<void, RootState, null, TerminalListAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_TYPE,
        payload: type,
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};

export const getOtherNames = (
  option: string
): ThunkAction<void, RootState, null, TerminalListAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_LOADING_OTHER_NAME,
        payload: true,
      });
      const res = await fetch(`${proxy}/v2/terminals/names/${option}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const content = await res.json();
      // console.log("this is content");

      dispatch({
        type: GET_TERMINAL_OTHER_NAMES,
        payload: content,
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
