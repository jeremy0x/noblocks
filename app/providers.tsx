"use client";
import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";

const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}

      <ToastContainer
        position="bottom-left"
        theme="dark"
        stacked
        draggable
        pauseOnHover
        pauseOnFocusLoss
        bodyClassName="font-sans"
      />
    </ThemeProvider>
  );
}
