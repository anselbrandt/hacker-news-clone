import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import theme from "../theme";

function App({ Component, pageProps, initialColorMode }: any) {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider value={initialColorMode}>
        <CSSReset />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  //   const { isDarkMode = "false" } = cookies(ctx);
  return {
    pageProps,
    //     initialColorMode: isDarkMode === "true" ? "dark" : "light",
    initialColorMode: "light",
  };
};

export default App;
