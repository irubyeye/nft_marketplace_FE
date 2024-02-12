import "./globals.css";

import { Web3Modal } from "../context/Web3Modal";
import { ReactNode } from "react";
import { ReactQueryClientProvider } from "@/app/components/reactqueryclientprovider/ReactQueryClientProvider";

export const metadata = {
  title: "NFT Marketplace",
  description: "This is a NFT marketplace",
};

export default function RootLayout({ children }: { children?: ReactNode }) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body>
          <Web3Modal>{children}</Web3Modal>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
