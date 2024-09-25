// in auth.ts

import { AuthOptions, getServerSession } from "next-auth"

const authOptions: AuthOptions = {
    // Configure one or more authentication providers
  providers: [
  
    // ...add more providers here
  ],
}

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }