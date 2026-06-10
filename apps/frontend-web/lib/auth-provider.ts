import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * NextAuth placeholder configuration.
 * Wire the Credentials provider to API Gateway auth when implementing business logic.
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "ordella-gateway",
      name: "Ordella",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        // Placeholder: delegate to authClient.login in a future implementation.
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as typeof session.user;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
