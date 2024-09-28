import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

const customMiddleware = withAuth(
  (req) => {
    if (!req.nextauth.token) {
      return NextResponse.redirect("/products");
    }
  },
  {
    pages: {
      signIn: "/products",
    },
  }
);

export default customMiddleware;

export const config = { matcher: ["/products", "/products/:path*", "/api/:path*"] };