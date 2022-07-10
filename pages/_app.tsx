import { getAnalytics, Analytics, logEvent } from "firebase/analytics";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AppProvider } from "../app.context";
import { appFirebase } from "../firebase";
import "../styles/global.scss";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false, staleTime: Infinity } } }),
  );
  useEffect(() => {
    if (typeof window !== "undefined") {
      const analytics = getAnalytics(appFirebase);
      logEvent(analytics, 'notification_received');
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
