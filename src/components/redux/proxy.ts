export const proxy =
  process.env.NODE_ENV === "production"
    ? "https://us-central1-fifth-compiler-357712.cloudfunctions.net/nbl_function2/api"
    : "http://localhost:4007/fifth-compiler-357712/us-central1/nbl_function2/api";

export const findLocations = async (value: string | null) => {
  if (value) {
    const response = await fetch(`${proxy}/v1/locations/name/${value}`);
    const json = await response.json();
    console.log("this json", json);
    return json;
  } else {
    return [];
  }
};
export const matcherRoutes = [
  "/",
  "/terminals_rails_names",
  "/shipments",
  "/shipments/[slug]",
  "/terminals_rails",
  "/settings",
  "/tracking_requests",
  "/terminals",
  "/new_bl_cntnrs",
  "/new_bl",
  "/locations_names",
  "/locations",
  "/rails",
  "/terminals_names",
];
