import { NextRequest, NextResponse } from "next/server";
import { parse } from "accept-language-parser"
import { NextURL } from "next/dist/server/web/next-url";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const shouldHandleLocale =
    !PUBLIC_FILE.test(request.nextUrl.pathname) &&
    !request.nextUrl.pathname.startsWith("/api/") &&
    !request.nextUrl.pathname.startsWith("/_next/") &&
    request.nextUrl.locale === "default";

  if (request.nextUrl.searchParams.has("draft")) {
    return NextResponse.redirect(
      new NextURL(
        `${request.nextUrl.origin}/api/thematrix?redirect=${
          request.nextUrl.pathname
        }${request.nextUrl.searchParams.get("draft") === "0" ? "&bye=1" : ""}`
      )
    );
  }

  if (shouldHandleLocale) {
    let langs = [];
    if (request.cookies.has("preferred-language")) {
      langs.push(request.cookies.get("preferred-language")!.value);
    }
    const acceptLang = request.headers.get("accept-language");
    if (acceptLang) {
      langs = [...langs, ...parse(acceptLang).map((lang) => lang.code)];
    }
    let finalLang = "zh"; // default one
    for (const lang of langs) {
      if (["zh", "en"].includes(lang)) {
        finalLang = lang;
        break;
      }
    }

    const url = request.nextUrl.clone();
    url.pathname = `/${finalLang}${request.nextUrl.pathname}`;
    return NextResponse.redirect(url);
  }
}
