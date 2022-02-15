import { ThunkAction } from "redux-thunk";

import { RootState } from "../store";

import {
  GET_SHIPMENTS,
  SET_LOADING,
  SET_ERROR,
  GET_SHIPPING_LINES,
  REFRESH_SHIPMENT,
  SET_SHIPPING_LINES,
  ShipmentListAction,
  ADD_SHIPMENT,
  SET_REQUEST_NUMBER,
  SET_LOADING_SHIPMENTS,
} from "../types";

const proxy =
  process.env.NODE_ENV === "production"
    ? "https://us-central1-djomake.cloudfunctions.net/nbl_function/api/v2"
    : "http://localhost:4005/djomake/us-central1/nbl_function/api/v2";

export const getShipments = (): ThunkAction<
  void,
  RootState,
  null,
  ShipmentListAction
> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_LOADING_SHIPMENTS,
        payload: true,
      });
      const res = await fetch(`${proxy}/shipments`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const content = await res.json();

      dispatch({
        type: GET_SHIPMENTS,
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
export const refresheShipment = (
  id: string
): ThunkAction<void, RootState, null, ShipmentListAction> => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${proxy}/shipments/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: REFRESH_SHIPMENT,
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};
export const addShipment = (
  data: any
): ThunkAction<void, RootState, null, ShipmentListAction> => {
  return async (dispatch) => {
    try {
      // dispatch({
      //   type: SET_LOADING,
      //   payload: true,
      // });
      const res = await fetch(`${proxy}/tracking_requests`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      dispatch({
        type: ADD_SHIPMENT,
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};

export const SetRequestNumber = (
  Name: string
): ThunkAction<void, RootState, null, ShipmentListAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_REQUEST_NUMBER,
        payload: Name,
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};
export const SetShippingLinesName = (
  Name: string
): ThunkAction<void, RootState, null, ShipmentListAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_SHIPPING_LINES,
        payload: Name,
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};
