import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // perform you login logic
        // find out user from db
        if (email !== "djo@gmail.com" || password !== "bp8XT@MMsNV$Z*Jz") {
          throw new Error("invalid credentials");
        }
        // if everything is fine
        return {
          id: "1234",
          name: "djamel",
          email: "djo@gmail.com",
          role: "admin",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signin",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  callbacks: {
    jwt(params) {
      // update token
      if (params.user?.email) {
        params.token.role = params.user.email;
      }
      // return final_token
      return params.token;
    },
  },
};

export default NextAuth(authOptions);
