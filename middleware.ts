import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  console.log("req.headers hostname", req.headers.get("host"));
  //   const hostname = req.headers.get("host")!;

  const hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  console.log("req.headers hostname1", hostname);

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname;
  //console.log("path", path);

  // Check if hostname is localhost:3000 or NEXT_PUBLIC_ROOT_DOMAIN
  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    console.log("inside first if");
    return NextResponse.next();
  }

  // rewrites for app pages
  if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    // const session = await getToken({ req });
    // if (!session && path !== "/login") {
    //   return NextResponse.redirect(new URL("/login", req.url));
    // } else if (session && path == "/login") {
    //   return NextResponse.redirect(new URL("/", req.url));
    // }
    let url = new URL(`/app${path === "/" ? "" : path}`, req.url);
    console.log("second if new url, path", req.url, path);
    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, req.url)
    );
  }

  console.log("last section");

  // rewrite everything else to `/[domain]/[path] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
