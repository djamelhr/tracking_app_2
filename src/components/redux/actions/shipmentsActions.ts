import { ThunkAction } from "redux-thunk";
import { proxy } from "../proxy";
import Router from "next/router";

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
  REMOVE_SHIPMENT,
  TRACKING_REQUEST_AT_TERMINAL,
  ADD_SHIPMENT_NO_TRACKING,
  SET_NOTIFICATION,
  NotificationAction,
  ADD_TERMINAL_TO_SHIPMENT,
  GET_SHIPMENT_BY_ID,
  GET_MORE_SHIPMENTS,
  GET_ALL_SHIPPING_LINES,
  SET_LOADING_NEW_TR,
  UPDATE_SHIPPING_LINES,
  SAVE_SHIPPING_LINES,
  SET_SELECTED_LOCATION,
} from "../types";
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
      const res = await fetch(
        `${proxy}/v2/shipments/page_number/1/page_size/5`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
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
export const getMoreShipments = (
  page_number: number,
  page_size: number
): ThunkAction<void, RootState, null, ShipmentListAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_LOADING_SHIPMENTS,
        payload: true,
      });
      const res = await fetch(
        `${proxy}/v2/shipments/page_number/${page_number}/page_size/${page_size}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const content = await res.json();

      dispatch({
        type: GET_MORE_SHIPMENTS,
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
export const UpdateShippingLine = (
  data: any
): ThunkAction<void, RootState, null, ShipmentListAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_SHIPPING_LINES,
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
export const SaveShippingLine = (
  data: any
): ThunkAction<void, RootState, null, ShipmentListAction> => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${proxy}/v1/ports/shipping_lines/update`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const content = await res.json();
      if (res.status === 200) {
        dispatch({
          type: SAVE_SHIPPING_LINES,
          payload: content,
        });
        Router.replace(Router.asPath);
        window.location.reload();
      } else {
        dispatch({
          type: SET_NOTIFICATION,
          payload: {
            msg: res.statusText,
            type: "danger",
          },
        });
        dispatch({
          type: SET_ERROR,
          payload: "error.message",
        });
      }
      console.log("rresss", content);
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};

export const getAllShippingLines = (): ThunkAction<
  void,
  RootState,
  null,
  ShipmentListAction
> => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${proxy}/v1/ports/shipping_lines`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const content = await res.json();
      console.log("rresss", content);

      if (res.status === 200) {
        dispatch({
          type: GET_ALL_SHIPPING_LINES,
          payload: content,
        });
      } else {
        dispatch({
          type: SET_NOTIFICATION,
          payload: {
            msg: res.statusText,
            type: "danger",
          },
        });
        dispatch({
          type: SET_ERROR,
          payload: "error.message",
        });
      }
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};

export const getShippingLines = (): ThunkAction<
  void,
  RootState,
  null,
  ShipmentListAction
> => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `${proxy}/v2/tracking_requests/shipping_lines_trackable`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const content = await res.json();
      console.log("rresss", content);

      if (res.status === 200) {
        dispatch({
          type: GET_ALL_SHIPPING_LINES,
          payload: content,
        });
      } else {
        dispatch({
          type: SET_NOTIFICATION,
          payload: {
            msg: res.statusText,
            type: "danger",
          },
        });
        dispatch({
          type: SET_ERROR,
          payload: "error.message",
        });
      }
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};
export const tracking_requests_at_terminal = (
  data: any
): ThunkAction<void, RootState, null, ShipmentListAction> => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `${proxy}/v2/cargo/${data.request_type}/${data.shipmentId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const content = await res.json();
      console.log("rresss", content);

      if (res.status === 200) {
        dispatch({
          type: TRACKING_REQUEST_AT_TERMINAL,
          payload: res,
        });
        dispatch({
          type: SET_NOTIFICATION,
          payload: {
            msg: "updated!!",
            type: "succss",
          },
        });
      } else {
        dispatch({
          type: SET_NOTIFICATION,
          payload: {
            msg: res.statusText,
            type: "danger",
          },
        });
        dispatch({
          type: SET_ERROR,
          payload: "error.message",
        });
      }
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};

export const removeShipment = (
  id: string
): ThunkAction<void, RootState, null, ShipmentListAction> => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${proxy}/v2/shipments/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res) {
        dispatch({
          type: REMOVE_SHIPMENT,
        });
        dispatch({
          type: SET_NOTIFICATION,
          payload: {
            msg: "deleted !!",
            type: "danger",
          },
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: "error.message",
        });
      }
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};
export const getShipmentById = (
  id: string
): ThunkAction<void, RootState, null, ShipmentListAction> => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${proxy}/v2/shipments/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const content = await res.json();
      dispatch({
        type: GET_SHIPMENT_BY_ID,
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
      const res = await fetch(`${proxy}/v2/shipments/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: REFRESH_SHIPMENT,
      });
      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          msg: "updated !!",
          type: "succss",
        },
      });
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};
export const addShipmentNotracking = (
  data: any
): ThunkAction<void, RootState, null, ShipmentListAction> => {
  return async (dispatch) => {
    try {
      // dispatch({
      //   type: SET_LOADING,
      //   payload: true,
      // });
      const res = await fetch(`${proxy}/v2/shipments/addshipment`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const content = await res.json();

      if (content.status === 200) {
        dispatch({
          type: ADD_SHIPMENT_NO_TRACKING,
        });
        dispatch({
          type: SET_NOTIFICATION,
          payload: {
            msg: "added !!",
            type: "succss",
          },
        });
      } else {
        dispatch({
          type: SET_NOTIFICATION,
          payload: {
            msg: content.errors[0].detail,
            type: "danger",
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};
export const AddTermialToShipment = (
  data: any
): ThunkAction<void, RootState, null, ShipmentListAction> => {
  return async (dispatch) => {
    try {
      // dispatch({
      //   type: SET_LOADING,
      //   payload: true,
      // });
      const res = await fetch(`${proxy}/v2/shipments/addTerminal`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      dispatch({
        type: ADD_TERMINAL_TO_SHIPMENT,
      });
      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          msg: "added !!",
          type: "succss",
        },
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
      dispatch({
        type: SET_LOADING_NEW_TR,
        payload: true,
      });
      const res = await fetch(`${proxy}/v2/tracking_requests`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const content = await res.json();

      if (content.errors) {
        dispatch({
          type: SET_LOADING_NEW_TR,
          payload: false,
        });
        dispatch({
          type: SET_NOTIFICATION,
          payload: {
            msg: content.errors[0].code,
            type: "danger",
          },
        });
      } else if (content.data) {
        dispatch({
          type: SET_LOADING_NEW_TR,
          payload: false,
        });
        dispatch({
          type: ADD_SHIPMENT,
        });
        if (content.data.status === "created") {
          dispatch({
            type: SET_NOTIFICATION,
            payload: {
              msg: content.data.status,
              type: "succss",
            },
          });
        } else {
          dispatch({
            type: SET_LOADING_NEW_TR,
            payload: false,
          });
          dispatch({
            type: SET_NOTIFICATION,
            payload: {
              msg: content.data.failed_reason,
              type: "danger",
            },
          });
        }
      }
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
export const SetSelectedLocation = (
  id: string
): ThunkAction<void, RootState, null, ShipmentListAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_SELECTED_LOCATION,
        payload: id,
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
