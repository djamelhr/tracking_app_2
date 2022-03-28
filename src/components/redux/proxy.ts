export const proxy =
  process.env.NODE_ENV === "production"
    ? "https://us-central1-djomake.cloudfunctions.net/nbl_function/api"
    : "http://localhost:4005/djomake/us-central1/nbl_function/api";
