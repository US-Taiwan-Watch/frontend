import { dark } from "@material-ui/core/styles/createPalette";
import { getThemeProps } from "@material-ui/styles";
import {
  createTheme,
  Duration,
  Palette,
  PaletteColor,
  PaletteOptions,
  responsiveFontSizes,
  Theme,
  ThemeOptions,
  Transitions,
  TypographyStyle,
} from "@mui/material/styles";
import { createStyled } from "@mui/system";
import type {} from "@mui/x-date-pickers/themeAugmentation";

// Create a theme instance.
const color = {
  yellow: {
    100: "#F2B705",
    200: "#F29F05",
    300: "#FAC012",
    400: "#D4A002",
  },
  purple: {
    100: "#D6D8EB",
    200: "#949FF2",
    300: "#7C86C8",
    400: "#4551B1",
    500: "#36409B",
  },
  blue: {
    100: "#035283",
    200: "#0E81B8",
    300: "#1FA2D9",
  },
  blueGrey: {
    100: "#366A83",
    200: "#044564",
    300: "#03344B",
    400: "#5D879C",
    500: "#546E7A",
    600: "#455A64",
    700: "#37474F",
    800: "#263238",
    900: "#1C262A",
    1000: "#0D1619",
    1100: "#000F15",
    1200: "#1D262B",
    1300: "#29373E",
    1400: "#2D3C43",
    1500: "#222D32",
  },
  white: {
    100: "#FFFFFF",
    200: "#AAAAB2",
    300: "#DADADA",
    400: "#C4D2D7",
  },
  black: {
    100: "#323233",
    200: "#242426",
    300: "#000000",
  },
  orange: {
    100: "#FF5C00",
  },
} as const;

export interface USTWDuration extends Duration {
  navigationBarFadingOut: number;
}

export interface USTWTransitions extends Transitions {
  duration: USTWDuration;
}

export interface MeetingTheme {
  footerHeight: number;
  mobileFooterHeight: number;
  sidebarWidth: number;
  sidebarMobileHeight: number;
  sidebarMobilePadding: number;
  participantBorderWidth: number;
  mobileTopBarHeight: number;
}

interface USTWThemeColor {
  color: typeof color & {
    carousel: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
    };
  };
}

export interface USTWTheme extends Theme, USTWThemeColor {
  transitions: USTWTransitions;
  meetings: MeetingTheme;
}

interface USTWThemeOptions extends ThemeOptions, USTWThemeColor {
  transitions: USTWTransitions;
  meetings: MeetingTheme;
}

export const darkPalette: PaletteOptions = {
  mode: "dark",
  // text: {
  //   primary: color.yellow[200],
  //   secondary: color.yellow[100],
  // },
  primary: {
    light: color.yellow[100],
    main: color.yellow[200],
    dark: color.yellow[300],
  },
  secondary: {
    light: color.purple[200],
    main: color.purple[300],
    dark: color.purple[400],
  },
  info: {
    light: color.white[100],
    main: color.white[200],
    dark: color.white[300],
  },
  background: {
    default: color.blueGrey[900],
    // paper: color.blueGrey[1000],
  },
};

export const lightPalette: PaletteOptions = {
  mode: "light",
  // text: {
  //   primary: color.blueGrey[200],
  //   secondary: color.blueGrey[100],
  // },
  secondary: {
    light: color.blue[100],
    main: color.blue[200],
    dark: color.blue[300],
  },
  primary: {
    light: color.purple[300],
    main: color.purple[400],
    dark: color.purple[500],
  },
  info: {
    light: color.blueGrey[100],
    main: color.blueGrey[200],
    dark: color.blueGrey[300],
  },
  common: {
    black: color.black[300],
    white: color.white[100],
  },
  text: {
    primary: color.black[300],
    // secondary: color.white[100],
    disabled: "#828282",
  },
  background: {
    default: color.white[100],
    // paper: color.white[200],
  },
  getContrastText: (background: string): string => {
    // Convert the background color to RGB
    const r = parseInt(background.slice(1, 3), 16);
    const g = parseInt(background.slice(3, 5), 16);
    const b = parseInt(background.slice(5, 7), 16);

    // Calculate the contrast using the WCAG formula
    const contrast = (r * 299 + g * 587 + b * 114) / 1000;

    // Return black or white based on the contrast
    return contrast >= 128 ? "#000" : "#fff";
  },
};

const _theme: USTWThemeOptions = {
  color: {
    ...color,
    carousel: {
      100: color.blueGrey[1400],
      200: color.blueGrey[1300],
      300: color.blueGrey[800],
      400: color.blueGrey[1500],
      500: color.blueGrey[1200],
    },
  },
  typography: {
    h5: {
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      fontWeight: 500,
      fontSize: "1.875rem",
      lineHeight: 1.334,
      letterSpacing: "0em",
    },
  },
  transitions: <USTWTransitions>{
    duration: <USTWDuration>{
      navigationBarFadingOut: 2500,
    },
  },
  meetings: {
    footerHeight: 72,
    mobileFooterHeight: 56,
    sidebarWidth: 300,
    sidebarMobileHeight: 90,
    sidebarMobilePadding: 8,
    participantBorderWidth: 0,
    mobileTopBarHeight: 52,
  },
  components: {
    MuiDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: "red",
        },
      },
    },
  },
};

export const theme = responsiveFontSizes(createTheme(_theme)) as USTWTheme;

export const darkTheme = responsiveFontSizes(createTheme({
  ..._theme,
  palette: darkPalette,
})) as USTWTheme;

export const lightTheme = responsiveFontSizes(createTheme({
  ..._theme,
  palette: lightPalette,
})) as USTWTheme;

export const styled = createStyled<USTWTheme>({ defaultTheme: theme });
