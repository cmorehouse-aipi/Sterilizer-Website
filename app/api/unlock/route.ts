import { NextRequest, NextResponse } from "next/server";

const PASSWORD = "Aipidemoforth2026";
const ACCESS_COOKIE = "forth_access";
const ACCESS_TOKEN = "granted-2026";

export async function POST(req: NextRequest) {
  let password = "";
  try {
    ({ password } = await req.json());
  } catch {
    /* fall through to failure */
  }

  if (password !== PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ACCESS_COOKIE, ACCESS_TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
  return res;
}
