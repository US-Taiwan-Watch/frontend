import { Button, ButtonGroup } from "@mui/material";
import { useRouter } from "next/router";
import { useI18n } from "../context/i18n";
import LanguageIcon from "@mui/icons-material/Language";

export const LocaleSwitcher: React.FC = () => {
  const router = useRouter();
  const { locales = [], locale: activeLocale } = router;
  const otherLocales = locales.filter((locale) => locale !== activeLocale);
  const { setLanguage } = useI18n();

  return (
    <ButtonGroup
      size="small"
      color="inherit"
      aria-label="small button group"
      variant={"text"}
      sx={{ alignItems: "center" }}
    >
      <LanguageIcon color="inherit" />
      <Button
        color="inherit"
        onClick={() => setLanguage("zh")}
        disabled={activeLocale?.startsWith("zh")}
      >
        {"中文"}
      </Button>
      <Button
        color="inherit"
        onClick={() => setLanguage("en")}
        disabled={activeLocale?.startsWith("en")}
      >
        {"en"}
      </Button>
    </ButtonGroup>
  );
};
