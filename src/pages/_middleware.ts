import { NextRequest, NextResponse } from "next/server";
import { parse } from "accept-language-parser"

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const shouldHandleLocale =
    !PUBLIC_FILE.test(request.nextUrl.pathname) &&
    !request.nextUrl.pathname.includes("/api/") &&
    request.nextUrl.locale === "default";

  if (shouldHandleLocale) {
    let langs = [];
    if ('preferred-language' in request.cookies) {
      langs.push(request.cookies['preferred-language']);
    }
    const acceptLang = request.headers.get("accept-language");
    if (acceptLang) {
      langs = [...langs, ...parse(acceptLang).map(lang => lang.code)];
    }
    let finalLang = 'en'; // default one
    for (const lang of langs) {
      if (['zh', 'en'].includes(lang)) {
        finalLang = lang;
        break;
      }
    }
    return NextResponse.redirect(`/${finalLang}${request.nextUrl.pathname}`);
  }
}
