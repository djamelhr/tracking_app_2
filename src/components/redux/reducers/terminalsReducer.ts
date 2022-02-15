import { terminalsAvailable } from "../terminalsData";
import {
  GET_TERMINAL,
  SET_TERMINAL_FIRMS,
  SET_TERMINAL_NAME,
  TerminalListAction,
  terminalState,
  SET_CONTAINER_NUMBER,
  SET_BOL,
  SET_LOADING,
} from "../types";

const initialState: terminalState = {
  data: {},
  loading: false,
  error: "",
  success: "",
  message: "",
  terminal_name: "",
  terminal_frims: "",
  terminal_description: "",
  contianer_number: "",
  bol: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = initialState,
  action: TerminalListAction
): terminalState => {
  switch (action.type) {
    case GET_TERMINAL:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case SET_TERMINAL_NAME:
      let objNames = terminalsAvailable.find(
        ({ name }: any) => name === action.payload
      );
      console.log(objNames);

      return {
        ...state,
        terminal_name: action.payload,
        terminal_frims: objNames?.firms,
        terminal_description: objNames?.description,
      };
    case SET_TERMINAL_FIRMS:
      let objFirms = terminalsAvailable.find(
        ({ firms }: any) => firms === action.payload
      );
      return {
        ...state,
        terminal_frims: action.payload,
        terminal_name: objFirms?.name,
        terminal_description: objFirms?.description,
      };
    case SET_BOL:
      return {
        ...state,
        bol: action.payload,
      };
    case SET_CONTAINER_NUMBER:
      return {
        ...state,
        contianer_number: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
