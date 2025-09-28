"use client";

import { PageFade } from "@/components/PageFade";
import { ThemeProvider } from "@/components/ThemeProvider";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

const ClientProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <Toaster position="top-center" richColors />
      <ThemeProvider>
        <PageFade>{children}</PageFade>
      </ThemeProvider>
    </Provider>
  );
};

export default ClientProviders;
