import { Button, ButtonGroup } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useI18n } from "../context/i18n";

export const LocaleSwitcher: React.FC = () => {
  const router = useRouter();
  const { locales = [], locale: activeLocale } = router;
  const otherLocales = locales.filter((locale) => locale !== activeLocale);
  const { setLanguage } = useI18n();

  return (
    <ButtonGroup size="small" aria-label="small button group"
      variant={"contained"}>
      <Button
        onClick={() => setLanguage("zh-TW")}
        disabled={activeLocale?.startsWith("zh")}
      >
        {"zh-TW"}
      </Button>
      <Button
        onClick={() => setLanguage("en")}
        disabled={activeLocale?.startsWith("en")}
      >
        {"en"}
      </Button>
    </ButtonGroup>
  );
};
