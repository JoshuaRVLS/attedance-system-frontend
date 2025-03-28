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
        const user: User = {
          username: "admin",
          password: "09071982",
        };
        if (
          credentials.username === user.username &&
          credentials.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  trustHost: true,
});
