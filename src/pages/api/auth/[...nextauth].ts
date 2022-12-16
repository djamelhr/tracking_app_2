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
        if (email !== "djamel@shifl.com" || password !== "bp8XT@MMsNV$Z*Jz") {
          throw new Error("invalid credentials");
        }
        // if everything is fine
        return {
          id: "1234",
          name: "djamel",
          email: "djamel@shifl.com",
          userRole: "admin",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signin",
    // error: '/auth/error',
  },
  callbacks: {
    jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
  },
};

export default NextAuth(authOptions);
