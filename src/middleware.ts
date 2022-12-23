import { withAuth } from "next-auth/middleware";
import { matcherRoutes } from "./components/redux/proxy";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role
      if (req.nextUrl.pathname === "/") {
        return token?.userRole === "admin";
      }
      // `/me` only requires the user to be logged in
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/",
    "/shipments",
    "/shipments/:path*",
    "/settings",
    "/tracking_requests",
    "/terminals",
    "/new_bl_cntnrs",
    "/terminals_rails_names",
    "/new_bl",
    "/locations_names",
    "/locations",
    "/rails",
    "/terminals_names",
  ],
};
