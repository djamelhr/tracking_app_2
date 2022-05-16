import { ThunkAction } from "redux-thunk";
import { proxy } from "../proxy";

import { RootState } from "../store";

import {
  SET_LOADING,
  SET_ERROR,
  GET_TRACKING_REQUESTS,
  TrackingRequestsListAction,
  SET_LOADING_TRACKING_REQUESTS,
  SET_ERROR_TRACKING_REQUESTS,
} from "../types";

export const getTrackingRequests = (): ThunkAction<
  void,
  RootState,
  null,
  TrackingRequestsListAction
> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_LOADING_TRACKING_REQUESTS,
        payload: true,
      });
      const res = await fetch(`${proxy}/v2/tracking_requests`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const content = await res.json();

      dispatch({
        type: GET_TRACKING_REQUESTS,
        payload: content,
      });
      console.log("ferr", content);
    } catch (error: any) {
      dispatch({
        type: SET_ERROR_TRACKING_REQUESTS,
        payload: error.message,
      });
    }
  };
};
