export interface Voyage {
  id: string;
  destination_ata_at?: string | null;
  destination_eta_at?: string | null;
  destination_original_eta_at?: string | null;
  last_status_refresh_at: Date;
  pod_ata_at: string | null;
  pod_eta_at: string | null;
  pod_original_eta_at: string | null;
  pol_atd_at: string | null;
  pol_etd_at: string | null;
  pol_original_etd_at: string | null;
  voyage_number: string | null;
}

export interface ShippingLines {
  id: string;
  scac: string | null;
  name: string | null;
  nickname: string | null;
  tracking_url: string | null;
  is_trackable: boolean | null;
  contact_url?: string | null;
  bol_prefix: string | null;
  bill_of_lading_tracking_support?: boolean | null;
  booking_number_tracking_support?: boolean | null;
  container_number_tracking_support?: boolean | null;
}

export interface Vessel {
  id: string;
  imo: string | null;
  name: string | null;
  callsign: string | null;
  mmsi: string | null;
  sizes: string | null;
}

export interface CargoShipmentEvent {
  id: string;
  actual_at: string | null;
  actual_on?: string | null;
  estimated: boolean | null;
  estimated_at?: string | null;
  event: string | null;
  index: string | null;
  location_raw: string | null;
  original_event: string | null;
  time_zone?: string | null;
  voyage_num: string | null;
  timestamp?: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface ContainersUpdate {
  id: string;
  last_free_day_on: string;
  last_seen?: any;
  location: string;
  source: string;
  status: string;
  timestamp?: any;
  created_at: Date;
  holds: any[];
  released: any[];
}

export interface Cntnr {
  id: string;
  last_refresh: Date;
  containers_update: ContainersUpdate[];
}

export interface Container {
  id: string;
  number: string;
  picked_up_at: string;
  delivered_at?: any;
  seal_number: string;
  chassis_number?: any;
  equipment_height?: any;
  equipment_length: string;
  equipment_type: string;
  current_status: string;
  current_status_at?: any;
  customer_ref_number?: any;
  delivery_appointment_at?: any;
  delivery_appointment_on?: any;
  drayed_by_shifl?: any;
  empty_returned_at?: any;
  empty_pickdrop_location?: any;
  last_status_refresh_at: Date;
  notes?: any;
  pickup_appointment_at?: any;
  pickup_appointment_on?: any;
  tare_weight?: any;
  weight: string;
  cargo_shipment_events: CargoShipmentEvent[];
  cntnr: Cntnr;
}

export interface PodTerminal {
  id: string;
  name: string;
  frims_code: string;
  nickname: string;
}

export interface Ishipment {
  id: string;
  number: string | null;
  port_of_discharge_name: string | null;
  port_of_lading_name: string | null;
  pod_terminal_name: string | null;
  destination_name?: string | null;
  created_at: Date;
  updated_at: Date;
  voyage: Voyage | null;
  shipping_lines: ShippingLines | null;
  vessel: Vessel | null;
  containers: Container[];
  pod_terminal: PodTerminal | null;
}
