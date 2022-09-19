import { useRouter } from "next/router";
import React from "react";
import LocalizedStrings from "react-localization";
import en from "./i18n-en";
import zh from "./i18n-zh";
import { I18NText } from "../../common/models";
import { resolveI18NText } from "../utils/graphql-util";

type I18nStrings = {
  strings: typeof en;
};

const reactI18n = new LocalizedStrings<I18nStrings>({
  en: { strings: { ...en } },
  zh: { strings: { ...zh } as typeof en },
  "zh-TW": { strings: { ...zh } as typeof en },
});

export interface Ii18nContext {
  i18n: typeof reactI18n;
  lang: string;
  setLanguage: (lang: string) => void;
  displayI18NText: (i18nText?: I18NText) => string | undefined;
}

export const I18nContext = React.createContext<Ii18nContext>({
  i18n: reactI18n,
  lang: reactI18n.getLanguage(),
  setLanguage: (lang) => reactI18n.setLanguage(lang),
  displayI18NText: () => undefined,
});

export const useI18n = () => React.useContext(I18nContext);

const getLang = (lang?: string) => {
  if (!lang || lang === "default") {
    if (typeof window !== "undefined") {
      return navigator.language;
    } else {
      return "zh";
    }
  }
  return lang;
};

export const I18nProvider = React.memo(({ children }) => {
  const { i18n } = useI18n();
  const { locale, replace, pathname, query, asPath } = useRouter();

  const [lang, setLang] = React.useState(getLang(locale));

  React.useEffect(() => {
    setLang((currLang) => (currLang !== locale ? getLang(locale) : currLang));
    document.cookie = `preferred-language=${locale}`;
  }, [locale]);

  i18n.setLanguage(lang);

  const setLanguage = (locale: string) => {
    replace({ pathname, query }, asPath, { locale });
  };

  const displayI18NText = (i18nText?: I18NText) =>
    i18nText ? resolveI18NText(lang, i18nText, true) : undefined;

  const value: Ii18nContext = {
    i18n,
    lang,
    setLanguage,
    displayI18NText,
  };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
});
