// in app/api/auth/[...nextauth]/route.ts
import { authOptions } from "@/db/auth"
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }