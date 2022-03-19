import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useI18n } from "../context/i18n";

export const LocaleSwitcher: React.FC = () => {
  const router = useRouter();
  const { locales = [], locale: activeLocale } = router;
  const otherLocales = locales.filter((locale) => locale !== activeLocale);
  const { setLanguage } = useI18n();

  return (
    <div>
      <p>Locale switcher:</p>

      <Button
        onClick={() => setLanguage("zh-TW")}
        disabled={activeLocale?.startsWith("zh")}
        variant={"contained"}
      >
        {"zh-TW"}
      </Button>

      <Button
        onClick={() => setLanguage("en")}
        disabled={activeLocale?.startsWith("en")}
        variant={"contained"}
      >
        {"en"}
      </Button>

      <ul>
        {otherLocales.map((locale) => {
          const { pathname, query, asPath } = router;
          return (
            <li key={locale}>
              <Link href={{ pathname, query }} as={asPath} locale={locale}>
                <a>{locale}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
