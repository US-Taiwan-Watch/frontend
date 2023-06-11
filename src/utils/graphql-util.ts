import { I18NText } from "../../common/models";
import * as _ from "lodash";

export const secondsToHMS = (
  seconds: number
): { hr: number; min: number; sec: number } => ({
  hr: Math.floor(seconds / 3600.0),
  min: Math.floor((seconds % 3600.0) / 60.0),
  sec: (seconds % 3600.0) % 60.0,
});

export const resolveI18NText = (
  lang: string,
  src?: I18NText,
  ignoreServerLang?: boolean
): string | undefined => {
  if (src) {
    if (src.text && !ignoreServerLang) {
      return src.text;
    } else {
      let s = src.zh || src.en || "";
      switch (lang.toLowerCase().substring(0, 2)) {
        case "en":
          s = src.en ?? s;
          break;

        case "zh":
        default:
          s = src.zh ?? s;
      }
      return s;
    }
  }
  return undefined;
};
