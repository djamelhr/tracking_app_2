export const GET_TERMINAL = "GET_TERMINAL";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const SET_SUCCESS = "SET_SUCCESS";
export const SET_TERMINAL_NAME = "SET_TERMINAL_NAME";
export const SET_TERMINAL_FIRMS = "SET_TERMINAL_FIRMS";
export const SET_BOL = "SET_BOL";
export const SET_CONTAINER_NUMBER = "SET_CONTAINER_NUMBER";

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
export interface terminalState {
  data: any;
  loading: boolean;
  error: string;
  success: string;
  message: string;
  terminal_name?: string;
  terminal_frims?: string;
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

interface GetTerminals {
  type: typeof GET_TERMINAL;
  payload: any;
}
interface SetLoadingAction {
  type: typeof SET_LOADING;
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
interface SetContainerNumber {
  type: typeof SET_CONTAINER_NUMBER;
  payload: string;
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
