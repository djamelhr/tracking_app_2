export const GET_TERMINAL = "GET_TERMINAL";
export const SET_LOADING = "SET_LOADING";
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
  data: any[] | null;
  loadingShipments: boolean;
  error: string;
  success: string;
  message: string;
  shipping_line_name?: string;
  request_number?: string;
}

export interface trackingRequestsState {
  TrackingRequestsdata: any[] | null;
  trackingRequestsLoading: boolean;
  trackingRequestsError: string;
  trackingRequestsSuccess: string;
  trackingRequestsMessage: string;
}
export interface terminalState {
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

interface GetShipments {
  type: typeof GET_SHIPMENTS;
  payload: any;
}
interface GetTracking_requests {
  type: typeof GET_TRACKING_REQUESTS;
  payload: any;
}
interface AddShipment {
  type: typeof ADD_SHIPMENT;
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

interface GetTerminals {
  type: typeof GET_TERMINAL;
  payload: any;
}
interface SetLoadingAction {
  type: typeof SET_LOADING;
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
export type TerminalListAction =
  | GetTerminals
  | SetErrorAction
  | SetLoadingAction
  | SetSuccessAction
  | SetTerminalFirms
  | SetTerminalName
  | SetBol
  | SetContainerNumber;

export type ShipmentListAction =
  | GetShipments
  | SetShippingLinesName
  | SetRequestNumber
  | RefreshShipment
  | SetErrorAction
  | SetLoadingShipmentsAction
  | SetSuccessAction
  | refresheShipment
  | AddShipment;
export type TrackingRequestsListAction =
  | GetTracking_requests
  | SetTrackingRequestErrorAction
  | SetTrackingRequestLoadingAction
  | SetTrackingRequestSuccessAction;
