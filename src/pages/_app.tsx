import type { AppProps } from "next/app";
import { AppProvider } from "@/context/AppContext";
import "@/styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
};

export default App;
