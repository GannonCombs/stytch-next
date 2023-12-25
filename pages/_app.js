import { StytchProvider } from '@stytch/nextjs';
import "../styles/globals.css";
import { createStytchUIClient } from '@stytch/nextjs/ui';

const stytch = createStytchUIClient("public-token-test-b73b79f5-bea9-4ccf-b44d-6a49ca542574");


function MyApp({ Component, pageProps }) {
  return (
    <StytchProvider stytch={stytch}>
      <Component {...pageProps} />
      </StytchProvider>
  );
}

export default MyApp;
