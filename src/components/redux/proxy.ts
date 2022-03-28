export const proxy =
  process.env.NODE_ENV === "production"
    ? "https://us-central1-djomake.cloudfunctions.net/nbl_function/api"
    : "https://us-central1-djomake.cloudfunctions.net/nbl_function/api";
