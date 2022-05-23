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
  SET_ERROR,
  GET_TERMINAL_OTHER_NAMES,
  SET_LOADING_OTHER_NAME,
  ADD_TERMINAL_OTHER_NAMES,
  GET_ALL_TERMINALS,
  GET_PORT_OTHER_NAMES,
  GET_ALL_PORTS,
  ADD_PORT_OTHER_NAMES,
  SET_LOADING_PORT_NAME,
  SET_TYPE,
  GET_RAILS_OTHER_NAMES,
  GET_ALL_RAILS,
  ADD_RAILS_OTHER_NAMES,
  SET_LOADING_RAILS_NAME,
  GET_ALL_METRO,
  SET_RAILS,
  COUNT_PORTS,
  COUNT_METRO,
  SET_TERMINALS,
} from "../types";

const initialState: terminalState = {
  MetroNumber: 0,
  PortsNumber: 0,
  allPorts: [],
  allMetro: [],
  loadingOtherNamesPort: false,
  type: "rail_ramp",
  portsNames: [],
  allTerminals: [],
  data: {},
  loading: false,
  names: [],
  loadingOtherNames: false,
  error: "",
  success: "",
  message: "",
  terminal_name: "",
  terminal_frims: "",
  terminal_description: "",
  contianer_number: "",
  bol: "",
  allRails: [],
  loadingOtherNamesRail: false,
  railsNames: [],
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
    case GET_TERMINAL_OTHER_NAMES: {
      return {
        ...state,
        names: action.payload,
        loadingOtherNames: false,
      };
    }
    case SET_TYPE: {
      return {
        ...state,
        type: action.payload,
      };
    }
    case COUNT_PORTS: {
      return {
        ...state,
        PortsNumber: action.payload,
      };
    }
    case COUNT_METRO: {
      return {
        ...state,
        MetroNumber: action.payload,
      };
    }
    case GET_ALL_TERMINALS: {
      return {
        ...state,
        allTerminals: action.payload,
      };
    }
    case ADD_TERMINAL_OTHER_NAMES: {
      return {
        ...state,
      };
    }
    case GET_PORT_OTHER_NAMES: {
      return {
        ...state,
        portsNames: action.payload,
        loadingOtherNamesPort: false,
      };
    }
    case GET_ALL_PORTS: {
      return {
        ...state,
        allPorts: action.payload,
        loadingOtherNamesPort: false,
      };
    }
    case GET_ALL_METRO: {
      return {
        ...state,
        allMetro: action.payload,
      };
    }
    case ADD_PORT_OTHER_NAMES: {
      return {
        ...state,
      };
    }

    case GET_RAILS_OTHER_NAMES: {
      return {
        ...state,
        railsNames: action.payload,
        loadingOtherNamesRail: false,
      };
    }
    case GET_ALL_RAILS: {
      return {
        ...state,
        allRails: action.payload,
        loadingOtherNamesRail: false,
      };
    }
    case SET_RAILS: {
      return {
        ...state,
        allRails: action.payload,
      };
    }
    case SET_TERMINALS: {
      return {
        ...state,
        allTerminals: action.payload,
      };
    }
    case ADD_RAILS_OTHER_NAMES: {
      return {
        ...state,
      };
    }
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
    case SET_LOADING_OTHER_NAME:
      return {
        ...state,
        loadingOtherNames: action.payload,
      };
    case SET_LOADING_PORT_NAME:
      return {
        ...state,
        loadingOtherNamesPort: action.payload,
      };
    case SET_LOADING_RAILS_NAME:
      return {
        ...state,
        loadingOtherNamesRail: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
