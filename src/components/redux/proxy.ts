export const proxy =
  process.env.NODE_ENV === "production"
    ? "https://us-central1-fifth-compiler-357712.cloudfunctions.net/nbl_function/api"
    : "https://us-central1-fifth-compiler-357712.cloudfunctions.net/nbl_function/api";
