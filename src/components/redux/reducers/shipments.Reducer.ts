import { terminalsAvailable } from "../terminalsData";
import {
  ADD_SHIPMENT,
  GET_SHIPMENTS,
  GET_SHIPPING_LINES,
  REFRESHE_SHIPMENT,
  SET_LOADING_SHIPMENTS,
  SET_REQUEST_NUMBER,
  SET_SHIPPING_LINES,
  ShipmentListAction,
  shipmentState,
} from "../types";

const initialState: shipmentState = {
  data: null,
  loadingShipments: false,
  error: "",
  success: "",
  message: "",
  shipping_line_name: "",
  request_number: "",
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
    case REFRESHE_SHIPMENT:
      return {
        ...state,
        //  loading: false,
      };

    case REFRESHE_SHIPMENT:
      return {
        ...state,
        //  loading: false,
      };
    case SET_REQUEST_NUMBER:
      return {
        ...state,
        request_number: action.payload,
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
