import { NextRequest, NextResponse } from "next/server";

/** Private-preview gate: every page requires the access cookie set by
 *  /api/unlock. Static assets, the gate itself, and the unlock endpoint
 *  stay reachable so the gate page can render. */

const ACCESS_COOKIE = "forth_access";
const ACCESS_TOKEN = "granted-2026";

export function middleware(req: NextRequest) {
  const ok = req.cookies.get(ACCESS_COOKIE)?.value === ACCESS_TOKEN;
  if (ok) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/gate";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except: the gate, the unlock API, Next internals, and any
  // path with a file extension (photos, renderings, fonts, favicon…).
  matcher: ["/((?!gate|api/unlock|_next|.*\\..*).*)"],
};
