import { terminalsAvailable } from "../terminalsData";
import {
  ADD_SHIPMENT,
  ADD_SHIPMENT_NO_TRACKING,
  ADD_TERMINAL_TO_SHIPMENT,
  GET_SHIPMENTS,
  GET_SHIPMENT_BY_ID,
  GET_SHIPPING_LINES,
  REFRESHE_SHIPMENT,
  REMOVE_SHIPMENT,
  SET_LOADING_SHIPMENTS,
  SET_REQUEST_NUMBER,
  SET_SHIPPING_LINES,
  ShipmentListAction,
  shipmentState,
  TRACKING_REQUEST_AT_TERMINAL,
} from "../types";

const initialState: shipmentState = {
  data: null,
  loadingShipments: false,
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
    case SET_LOADING_SHIPMENTS:
      return {
        ...state,
        loadingShipments: action.payload,
      };

    default:
      return state;
  }
};
