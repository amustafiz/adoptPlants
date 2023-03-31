import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectToDatabase } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email: credentialEmail, password: credentialPassword } =
          credentials as { email: string; password: string };

        const client = await connectToDatabase();

        const db = client.db("plantsDatabase");

        const user = await db
          .collection("users")
          .findOne({ email: credentialEmail });

        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await verifyPassword(credentialPassword, user.password);

        if (!isValid) {
          throw new Error("Could not log you in!");
        }
        client.close();

        if (user && isValid)
          return { id: user._id.toString(), email: user.email };
        else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/ad",
  },
};

export default NextAuth(authOptions);
