import "../styles/index.scss";

import { AppProps } from "next/app";
import { AppWrapper } from "../context/state";

function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default App;
