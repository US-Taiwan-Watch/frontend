import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { darkPalette, lightPalette } from "../styles/theme";
import { createEmotionCache } from "../utils/create-emotion-cache";
import "../styles/global.scss";
import { I18nProvider } from "../context/i18n";
import { useInitApolloClient } from "../lib/with-apollo";
import { ApolloProvider } from "@apollo/client";
import { useMediaQuery } from "@mui/material";
import { UserRoleProvider } from "../context/user-role";
import { LicenseInfo } from "@mui/x-license-pro";
import { useRouter } from "next/router";
import { createGenerateClassName } from '@material-ui/core/styles';
import { createMuiTheme as createThemeV4 } from '@material-ui/core/styles';
import { createTheme as createThemeV5 } from '@mui/material/styles';
import { ThemeProvider as ThemeProviderV5 } from '@mui/material/styles';
import { ThemeProvider as ThemeProviderV4, StylesProvider } from '@material-ui/core/styles';

// Fix the glitches on react-page according to: https://react-page.github.io/beta/docs/#/quick-start?id=using-material-ui-4-in-parallel
const themeV4Light = createThemeV4({
  palette: lightPalette,
});

const themeV4Dark = createThemeV4({
  palette: darkPalette,
});

const themeV5Light = createThemeV5({
  palette: themeV4Light.palette,
});

const themeV5Dark = createThemeV5({
  palette: themeV4Dark.palette,
});

const generateClassName = createGenerateClassName({
  // By enabling this option, if you have non-MUI elements (e.g. `<div />`)
  // using MUI classes (e.g. `.MuiButton`) they will lose styles.
  // Make sure to convert them to use `styled()` or `<Box />` first.
  disableGlobal: true,
  // Class names will receive this seed to avoid name collisions.
  seed: 'mui-jss',
});

// Material UI X-Pro license  
const licenseKey = process.env.NEXT_PUBLIC_MUI_X_LICENSE_KEY;
if (licenseKey) {
  LicenseInfo.setLicenseKey(licenseKey);
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export const ColorModeContext = React.createContext({ toggleColorMode: () => { /* do nothing. */ } });

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const client = useInitApolloClient();
  const [darkMode, setDarkMode] = React.useState(false);
  const isDarkMode = React.useMemo(
    () => ({
      toggleColorMode: () =>
        setDarkMode((prevMode) => !prevMode),
    }),
    [],
  );

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const themeV4 = React.useMemo(
    () => darkMode ? themeV4Dark : themeV4Light,
    [darkMode],
  );
  const themeV5 = React.useMemo(
    () => darkMode ? themeV5Dark : themeV5Light,
    [darkMode],
  );
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const handleStart = (url: string) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (_url: string) => setLoading(false);

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return (
    <ColorModeContext.Provider value={isDarkMode}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        {/* Build a better loading page */}
        {loading ? <div>Loading</div> :
          <ApolloProvider client={client}>
            <UserRoleProvider>
              <StylesProvider generateClassName={generateClassName}>
                <ThemeProviderV4 theme={themeV4}>
                  <ThemeProviderV5 theme={themeV5}>
                    <I18nProvider>
                      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                      <CssBaseline />
                      <Component {...pageProps} />
                    </I18nProvider>
                  </ThemeProviderV5>
                </ThemeProviderV4>
              </StylesProvider>
            </UserRoleProvider>
          </ApolloProvider>}
      </CacheProvider>
    </ColorModeContext.Provider>
  );
}
