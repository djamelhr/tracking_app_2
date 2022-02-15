import { terminalsAvailable } from "../terminalsData";
import {
  GET_TRACKING_REQUESTS,
  SET_ERROR,
  SET_ERROR_TRACKING_REQUESTS,
  SET_LOADING,
  SET_LOADING_TRACKING_REQUESTS,
  TrackingRequestsListAction,
  trackingRequestsState,
} from "../types";

const initialState: trackingRequestsState = {
  TrackingRequestsdata: null,
  trackingRequestsLoading: false,
  trackingRequestsError: "",
  trackingRequestsSuccess: "",
  trackingRequestsMessage: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = initialState,
  action: TrackingRequestsListAction
): trackingRequestsState => {
  switch (action.type) {
    case GET_TRACKING_REQUESTS:
      return {
        ...state,
        TrackingRequestsdata: action.payload,
        trackingRequestsLoading: false,
      };

    case SET_LOADING_TRACKING_REQUESTS:
      return {
        ...state,
        trackingRequestsLoading: action.payload,
      };

    case SET_ERROR_TRACKING_REQUESTS:
      return {
        ...state,
        trackingRequestsError: action.payload,
      };
    default:
      return state;
  }
};
