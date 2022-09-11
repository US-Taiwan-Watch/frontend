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
    if (request.cookies.has('preferred-language')) {
      langs.push(request.cookies.get('preferred-language') as string);
    }
    const acceptLang = request.headers.get("accept-language");
    if (acceptLang) {
      langs = [...langs, ...parse(acceptLang).map(lang => lang.code)];
    }
    let finalLang = 'zh'; // default one
    for (const lang of langs) {
      if (['zh', 'en'].includes(lang)) {
        finalLang = lang;
        break;
      }
    }

    const url = request.nextUrl.clone();
    url.pathname = `/${finalLang}${request.nextUrl.pathname}`;
    return NextResponse.redirect(url);
  }
}
