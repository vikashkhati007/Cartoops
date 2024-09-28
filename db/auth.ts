import NextAuth, { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid email or password");
          }

          // Fetch user from the database using Prisma
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.password) {
            throw new Error("Invalid email or password");
          }

          // Compare the provided password with the stored hashed password
          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isMatch) {
            throw new Error("Invalid password");
          }

          // Return user if authentication is successful
          return user;
        } catch (error) {
          console.error("Authorize error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, token }) {
      try {
        // Fetch the user from the database using Prisma
        const user = await prisma.user.findUnique({
          // @ts-ignore
          where: { email: session.user.email },
        });

        if (user) {
          // Add user data to session
          // @ts-ignore

          session.user.id = user.id;
          // @ts-ignore

          session.user.name = user.name;
          // @ts-ignore
          session.user.profileImage = user.profileImage;
        }

        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        throw new Error("Failed to load session");
      }
    },
  },
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
