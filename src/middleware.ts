export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard"] }


// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req: any) {
//   const token = await getToken({ req });
//   const url = req.nextUrl;

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   // Protect routes based on role
//   if (url.pathname.startsWith("/dashboard/admin") && token.role !== "admin") {
//     return NextResponse.redirect(new URL("/unauthorized", req.url));
//   }

//   if (url.pathname.startsWith("/dashboard/superadmin") && token.role !== "superadmin") {
//     return NextResponse.redirect(new URL("/unauthorized", req.url));
//   }

//   if (url.pathname.startsWith("/dashboard/user") && token.role !== "user") {
//     return NextResponse.redirect(new URL("/unauthorized", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"], // apply to all dashboard routes
// };
