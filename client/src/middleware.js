import { NextResponse } from "next/server";

export async function middleware(req) {
   const { pathname = "", origin } = req.nextUrl;

   if (pathname.startsWith("/checkout")) {
      const token = req.cookies.get("token")?.value || "";
      const cart = req.cookies.get("cart")?.value || "";

      const parsedCart = JSON.parse(cart);

      if (parsedCart.length === 0) {
         return NextResponse.redirect(`${origin}`);
      }

      const url = `${process.env.NEXT_PUBLIC_API_URL}/user/renew-session`;

      try {
         const res = await fetch(url, {
            method: "GET",
            headers: { "x-token": token },
         });

         const data = await res.json();

         if (data.ok === false) throw new Error();

         NextResponse.next();
      } catch (error) {
         return NextResponse.redirect(`${origin}/auth/login?p=${pathname}`);
      }

      return NextResponse.next();
   }

   // if (pathname.startsWith("/admin")) {
   //    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
   //    const { origin, pathname } = req.nextUrl;
   //    if (!session) {
   //       return NextResponse.redirect(`${origin}/auth/login?p=${pathname}`);
   //    }
   //    const validRoles = ["admin"];
   //    if (!validRoles.includes(session.user.user.role)) {
   //       return NextResponse.redirect(origin);
   //    }
   //    return NextResponse.next();
   // }
}
