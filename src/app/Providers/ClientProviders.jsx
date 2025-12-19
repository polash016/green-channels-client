"use client";

import { PageFade } from "@/components/PageFade";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";

const ClientProviders = ({ children }) => {
  return (
    <>
      <Toaster position="top-center" richColors />
      <ThemeProvider>
        <PageFade>{children}</PageFade>
      </ThemeProvider>
    </>
  );
};

export default ClientProviders;
