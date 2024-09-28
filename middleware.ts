import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

const customMiddleware = withAuth(
  (req) => {
    if (!req.nextauth.token) {
      return NextResponse.redirect("/auth");
    }
  },
  {
    pages: {
      signIn: "/auth",
    },
  }
);

export default customMiddleware;

export const config = { matcher: ["/products", "/cart", "/products/:path*", "/favorite", "/api/:path*", "/profile", "/setting"] };