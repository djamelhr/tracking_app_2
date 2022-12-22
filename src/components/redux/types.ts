export const GET_TERMINAL = "GET_TERMINAL";
export const SET_LOADING = "SET_LOADING";
export const SET_LOADING_NEW_TR = "SET_LOADING_NEW_TR";
export const UPDATE_SHIPPING_LINES = "UPDATE_SHIPPING_LINES";
export const SAVE_SHIPPING_LINES = "SAVE_SHIPPING_LINES";
export const SET_SELECTED_LOCATION = "SET_SELECTED_LOCATION";
export const SET_SELECTED_TERMINAL = "SET_SELECTED_TERMINAL";
export const SET_ERROR = "SET_ERROR";
export const SET_SUCCESS = "SET_SUCCESS";
export const SET_TERMINAL_NAME = "SET_TERMINAL_NAME";
export const SET_TERMINAL_FIRMS = "SET_TERMINAL_FIRMS";
export const SET_BOL = "SET_BOL";
export const SET_CONTAINER_NUMBER = "SET_CONTAINER_NUMBER";
export const GET_SHIPMENTS = "GET_SHIPMENTS";
export const REFRESH_SHIPMENT = "REFRESH_SHIPMENT";
export const SET_SHIPPING_LINES = "SET_SHIPPING_LINES";
export const GET_SHIPPING_LINES = "GET_SHIPPING_LINES";
export const SET_REQUEST_NUMBER = "SET_REQUEST_NUMBER";
export const ADD_SHIPMENT = "ADD_SHIPMENT";
export const GET_TRACKING_REQUESTS = "GET_TRACKING_REQUESTS";
export const SET_LOADING_TRACKING_REQUESTS = "SET_LOADING_TRACKING_REQUESTS";
export const SET_ERROR_TRACKING_REQUESTS = "SET_ERROR_TRACKING_REQUESTS";
export const SET_TRACKING_REQUEST_SUCCESS = "SET_ERROR_TRACKING_REQUESTS";
export const SET_LOADING_SHIPMENTS = "SET_LOADING_SHIPMENTS";
export const REFRESHE_SHIPMENT = "REFRESHE_SHIPMENT";
export const REMOVE_SHIPMENT = "REMOVE_SHIPMENT";
export const TRACKING_REQUEST_AT_TERMINAL = "TRACKING_REQUEST_AT_TERMINAL";
export const ADD_SHIPMENT_NO_TRACKING = "ADD_SHIPMENT_NO_TRACKING";
export const SET_NOTIFICATION = "SET_NOTIFICATION";
export const ADD_TERMINAL_TO_SHIPMENT = "ADD_TERMINAL_TO_SHIPMENT";
export const GET_SHIPMENT_BY_ID = "GET_SHIPMENT_BY_ID";
export const GET_TERMINAL_OTHER_NAMES = "GET_TERMINAL_OTHER_NAMES";
export const SET_LOADING_OTHER_NAME = "SET_LOADING_OTHER_NAME";
export const ADD_TERMINAL_OTHER_NAMES = "ADD_TERMINAL_OTHER_NAMES";
export const GET_ALL_TERMINALS = "GET_ALL_TERMINALS";
export const GET_PORT_OTHER_NAMES = "GET_PORT_OTHER_NAMES";
export const ADD_PORT_OTHER_NAMES = "ADD_PORT_OTHER_NAMES";
export const GET_ALL_PORTS = "GET_ALL_PORTS";
export const SET_LOADING_PORT_NAME = "SET_LOADING_PORT_NAME";
export const GET_RAILS_OTHER_NAMES = "GET_RAILS_OTHER_NAMES";
export const ADD_RAILS_OTHER_NAMES = "ADD_RAILS_OTHER_NAMES";
export const GET_ALL_RAILS = "GET_ALL_RAILS";
export const GET_ALL_METRO = "GET_ALL_METRO";
export const ADD_METRO = "ADD_METRO";
export const SET_LOADING_RAILS_NAME = "SET_LOADING_RAILS_NAME";
export const SET_TYPE = "SET_TYPE";
export const SET_RAILS = "SET_RAILS";
export const SET_TERMINALS = "SET_TERMINALS";
export const GET_ALL_SHIPPING_LINES = "GET_ALL_SHIPPING_LINES";

export const COUNT_PORTS = "COUNT_PORTS";
export const COUNT_METRO = "COUNT_METRO";
export const GET_MORE_SHIPMENTS = "GET_MORE_SHIPMENTS";

export interface ResponseData {
  request_type: string;
  request_number: string;
  bol?: string;
  scac?: string;
  firms_code?: string;
  status: number;
  response: any;
}

export interface TerminalRequestattributes {
  request_type: string;
  request_number: string;
  bol?: string;
  firms_code?: string;
}
export interface TerminalRequest {
  type: string;
  attributes: TerminalRequestattributes;
}
export interface Holds_Released {
  description: string;
  name: string;
  status: string;
}
export interface shipmentState {
  data: any[];
  loadingShipments: boolean;
  loadingNewTr: boolean;
  error: string;
  success: string;
  message: string;
  shipping_line_name?: string;
  shipping_lines: any[];
  request_number?: string;
  shipment: any;
  res: any;
  selected_locations: string | null;
  selected_terminal: string | null;
}

export interface trackingRequestsState {
  TrackingRequestsdata: any[] | null;
  trackingRequestsLoading: boolean;
  trackingRequestsError: string;
  trackingRequestsSuccess: string;
  trackingRequestsMessage: string;
}
export interface terminalState {
  PortsNumber: number;
  MetroNumber: number;

  allTerminals: any;
  allPorts: any;
  allRails: any;
  allMetro: any;
  railsNames: any;
  portsNames: any;
  names: any;
  data: any;
  loading: boolean;
  error: string;
  success: string;
  message: string;
  terminal_name?: string;
  terminal_frims?: string;
  terminal_description?: string;
  contianer_number?: string;
  bol?: string;
  loadingOtherNames: boolean;
  loadingOtherNamesPort: boolean;
  loadingOtherNamesRail: boolean;
  type: string;
}
export interface TerminalData {
  last_free_day_on: string | null;
  holds: Holds_Released[] | null;
  released: Holds_Released[] | null;
  available_for_pickup: number | null;
  not_available_reason: string | null;
  location?: string | null;
  pickup_at?: string | null;
}

interface AddMetro {
  type: typeof ADD_METRO;
  payload: any;
}
interface GetMetro_Area {
  type: typeof GET_ALL_METRO;
  payload: any;
}
interface GetShipments {
  type: typeof GET_SHIPMENTS;
  payload: any;
}
interface GetMoreShipments {
  type: typeof GET_MORE_SHIPMENTS;
  payload: any;
}
interface GetAllTerminals {
  type: typeof GET_ALL_TERMINALS;
  payload: any;
}
interface GetAllPorts {
  type: typeof GET_ALL_PORTS;
  payload: any;
}
interface CountPorts {
  type: typeof COUNT_PORTS;
  payload: number;
}
interface CountMetro {
  type: typeof COUNT_METRO;
  payload: number;
}
interface GetAllRails {
  type: typeof GET_ALL_RAILS;
  payload: any;
}
interface SetRails {
  type: typeof SET_RAILS;
  payload: any;
}
interface SetTerminals {
  type: typeof SET_TERMINALS;
  payload: any;
}
interface SetSelectedLocations {
  type: typeof SET_SELECTED_LOCATION;
  payload: any;
}
interface SetSelectedTerminal {
  type: typeof SET_SELECTED_TERMINAL;
  payload: any;
}
interface GetShippinsLines {
  type: typeof GET_ALL_SHIPPING_LINES;
  payload: any;
}
interface updateShippinsLines {
  type: typeof UPDATE_SHIPPING_LINES;
  payload: any;
}
interface saveShippinsLines {
  type: typeof SAVE_SHIPPING_LINES;
  payload: any;
}

interface getShipmentById {
  type: typeof GET_SHIPMENT_BY_ID;
  payload: any;
}
interface tracking_requests_at_terminal {
  type: typeof TRACKING_REQUEST_AT_TERMINAL;
  payload: any;
}
interface GetTracking_requests {
  type: typeof GET_TRACKING_REQUESTS;
  payload: any;
}
interface AddShipment {
  type: typeof ADD_SHIPMENT;
}
interface AddTermialToShipment {
  type: typeof ADD_TERMINAL_TO_SHIPMENT;
}

interface AddShipmentNotracking {
  type: typeof ADD_SHIPMENT_NO_TRACKING;
}
interface RemoveShipment {
  type: typeof REMOVE_SHIPMENT;
}
interface SetShippingLinesName {
  type: typeof SET_SHIPPING_LINES;
  payload: string;
}

interface SetRequestNumber {
  type: typeof SET_REQUEST_NUMBER;
  payload: string;
}
interface RefreshShipment {
  type: typeof REFRESH_SHIPMENT;
}
interface setType {
  type: typeof SET_TYPE;
  payload: string;
}
interface GetTerminals {
  type: typeof GET_TERMINAL;
  payload: any;
}
interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}
interface SetLoadingTrAction {
  type: typeof SET_LOADING_NEW_TR;
  payload: boolean;
}

interface SetLoadingShipmentsAction {
  type: typeof SET_LOADING_SHIPMENTS;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}
interface SetSuccessAction {
  type: typeof SET_SUCCESS;
  payload: string;
}
interface SetTerminalName {
  type: typeof SET_TERMINAL_NAME;
  payload: string;
}
interface SetTerminalFirms {
  type: typeof SET_TERMINAL_FIRMS;
  payload: string;
}
interface SetBol {
  type: typeof SET_BOL;
  payload: string;
}
interface refresheShipment {
  type: typeof REFRESHE_SHIPMENT;
}

interface SetContainerNumber {
  type: typeof SET_CONTAINER_NUMBER;
  payload: string;
}
interface SetTrackingRequestSuccessAction {
  type: typeof SET_TRACKING_REQUEST_SUCCESS;
  payload: string;
}
interface SetTrackingRequestErrorAction {
  type: typeof SET_ERROR_TRACKING_REQUESTS;
  payload: string;
}
interface SetTrackingRequestLoadingAction {
  type: typeof SET_LOADING_TRACKING_REQUESTS;
  payload: boolean;
}

interface SetNotificationAction {
  type: typeof SET_NOTIFICATION;
  payload: {
    msg: string;
    type: string;
  };
}
interface GetTerminalsOtherNames {
  type: typeof GET_TERMINAL_OTHER_NAMES;
  payload: any;
}
interface AddTerminalsOtherNames {
  type: typeof ADD_TERMINAL_OTHER_NAMES;
}
interface GetPortsOtherNames {
  type: typeof GET_PORT_OTHER_NAMES;
  payload: any;
}
interface GetRailsOtherNames {
  type: typeof GET_RAILS_OTHER_NAMES;
  payload: any;
}
interface AddRailsOtherNames {
  type: typeof ADD_RAILS_OTHER_NAMES;
}
interface AddPortsOtherNames {
  type: typeof ADD_PORT_OTHER_NAMES;
}
interface SetLoadingOtherName {
  type: typeof SET_LOADING_OTHER_NAME;
  payload: boolean;
}
interface SetLoadingPortName {
  type: typeof SET_LOADING_PORT_NAME;
  payload: boolean;
}
interface SetLoadingRailsName {
  type: typeof SET_LOADING_RAILS_NAME;
  payload: boolean;
}
export type TerminalListAction =
  | GetTerminals
  | SetErrorAction
  | SetLoadingAction
  | SetSuccessAction
  | SetTerminalFirms
  | SetTerminalName
  | SetBol
  | GetTerminalsOtherNames
  | SetLoadingOtherName
  | AddTerminalsOtherNames
  | GetAllTerminals
  | GetAllPorts
  | SetTerminals
  | SetContainerNumber
  | GetPortsOtherNames
  | SetLoadingPortName
  | AddRailsOtherNames
  | SetLoadingRailsName
  | GetRailsOtherNames
  | GetAllRails
  | setType
  | AddPortsOtherNames
  | AddMetro
  | GetMetro_Area
  | CountPorts
  | CountMetro
  | SetRails;

export type ShipmentListAction =
  | GetShipments
  | GetMoreShipments
  | SetShippingLinesName
  | SetRequestNumber
  | RefreshShipment
  | SetErrorAction
  | SetLoadingShipmentsAction
  | SetSuccessAction
  | refresheShipment
  | AddShipment
  | saveShippinsLines
  | tracking_requests_at_terminal
  | AddShipmentNotracking
  | SetNotificationAction
  | AddTermialToShipment
  | getShipmentById
  | GetShippinsLines
  | updateShippinsLines
  | SetLoadingTrAction
  | SetSelectedLocations
  | SetSelectedTerminal
  | RemoveShipment;
export type TrackingRequestsListAction =
  | GetTracking_requests
  | SetTrackingRequestErrorAction
  | SetTrackingRequestLoadingAction
  | SetTrackingRequestSuccessAction;

export type NotificationAction = SetNotificationAction;

export interface NotificationState {
  message: string;
  type: string;
}
