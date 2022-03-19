import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const shouldHandleLocale =
    !PUBLIC_FILE.test(request.nextUrl.pathname) &&
    !request.nextUrl.pathname.includes("/api/") &&
    request.nextUrl.locale === "default";

  if (shouldHandleLocale) {
    const acceptLang = request.headers.get("accept-language");
    const lang = acceptLang?.startsWith("zh") ? "zh-TW" : "en";
    return NextResponse.redirect(`/${lang}${request.nextUrl.pathname}`);
  }
}
