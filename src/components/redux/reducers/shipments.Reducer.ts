import { terminalsAvailable } from "../terminalsData";
import {
  ADD_SHIPMENT,
  ADD_SHIPMENT_NO_TRACKING,
  ADD_TERMINAL_TO_SHIPMENT,
  GET_ALL_SHIPPING_LINES,
  GET_MORE_SHIPMENTS,
  GET_SHIPMENTS,
  GET_SHIPMENT_BY_ID,
  GET_SHIPPING_LINES,
  REFRESHE_SHIPMENT,
  REMOVE_SHIPMENT,
  SAVE_SHIPPING_LINES,
  SET_LOADING_NEW_TR,
  SET_LOADING_SHIPMENTS,
  SET_REQUEST_NUMBER,
  SET_SELECTED_LOCATION,
  SET_SELECTED_TERMINAL,
  SET_SHIPPING_LINES,
  ShipmentListAction,
  shipmentState,
  TRACKING_REQUEST_AT_TERMINAL,
  UPDATE_SHIPPING_LINES,
} from "../types";

const initialState: shipmentState = {
  data: [],
  shipping_lines: [],
  selected_locations: null,
  selected_terminal: null,
  loadingShipments: false,
  loadingNewTr: false,

  error: "",
  success: "",
  message: "",
  shipping_line_name: "",
  request_number: "",
  shipment: null,
  res: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = initialState,
  action: ShipmentListAction
): shipmentState => {
  switch (action.type) {
    case GET_SHIPMENTS:
      return {
        ...state,
        data: action.payload,
        loadingShipments: false,
      };
    case GET_MORE_SHIPMENTS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
        loadingShipments: false,
      };
    case ADD_SHIPMENT:
    case ADD_TERMINAL_TO_SHIPMENT:
    case ADD_SHIPMENT_NO_TRACKING:
    case REFRESHE_SHIPMENT:
    case REMOVE_SHIPMENT:
    case TRACKING_REQUEST_AT_TERMINAL:
      return {
        ...state,
        //  loading: false,
      };

    case TRACKING_REQUEST_AT_TERMINAL:
      return {
        ...state,
        res: action.payload,
      };

    case SET_REQUEST_NUMBER:
      return {
        ...state,
        request_number: action.payload,
      };
    case SET_SELECTED_LOCATION:
      return {
        ...state,
        selected_locations: action.payload,
      };
    case SET_SELECTED_TERMINAL:
      return {
        ...state,
        selected_terminal: action.payload,
      };
    case GET_SHIPMENT_BY_ID:
      return {
        ...state,
        shipment: action.payload,
      };
    case SET_SHIPPING_LINES:
      return {
        ...state,
        shipping_line_name: action.payload,
      };
    case GET_ALL_SHIPPING_LINES:
      return {
        ...state,
        shipping_lines: action.payload,
      };

    case SET_LOADING_SHIPMENTS:
      return {
        ...state,
        loadingShipments: action.payload,
      };
    case UPDATE_SHIPPING_LINES:
      const copyShippingLines = state.shipping_lines;

      const newState = copyShippingLines.map((obj) =>
        obj.id === action.payload
          ? { ...obj, is_trackable: !obj.is_trackable }
          : obj
      );

      return {
        ...state,
        shipping_lines: newState,
      };
    case SAVE_SHIPPING_LINES:
      return {
        ...state,
        shipping_lines: action.payload,
      };

    case SET_LOADING_NEW_TR:
      return {
        ...state,
        loadingNewTr: action.payload,
      };

    default:
      return state;
  }
};
