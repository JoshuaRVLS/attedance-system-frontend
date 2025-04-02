import NextAuth from "next-auth";
import { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log(credentials.username);
        if (
          credentials.username === process.env.ADMIN_USERNAME &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          return {
            username: credentials.username,
            password: credentials.password,
          } as User;
        } else {
          return null;
        }
      },
    }),
  ],
  trustHost: true,
});
