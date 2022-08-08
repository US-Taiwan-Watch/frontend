import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { darkTheme, lightTheme } from "../styles/theme";
import { createEmotionCache } from "../utils/create-emotion-cache";
import "../styles/global.scss";
import { I18nProvider } from "../context/i18n";
import { useInitApolloClient } from "../lib/with-apollo";
import { ApolloProvider } from "@apollo/client";
import { useMediaQuery } from "@mui/material";
import { UserRoleContext, UserRoleProvider } from "../context/user-role";

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
  const theme = React.useMemo(
    () => darkMode ? darkTheme : lightTheme,
    [darkMode],
  );

  return (
    <ColorModeContext.Provider value={isDarkMode}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Change title in _app.tsx</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ApolloProvider client={client}>
          <UserRoleProvider>
            <ThemeProvider theme={theme}>
              <I18nProvider>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...pageProps} />
              </I18nProvider>
            </ThemeProvider>
          </UserRoleProvider>
        </ApolloProvider>
      </CacheProvider>
    </ColorModeContext.Provider>
  );
}
