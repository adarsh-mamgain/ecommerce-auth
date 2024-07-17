import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce Auth",
  description: "Created with ❤️ by https://x.com/adarsh_mamgain",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  authors: [{ name: "Adarsh Mamgain", url: "https://x.com/adarsh_mamgain" }],
  openGraph: {
    siteName: "Ecommerce Auth",
    title: "Ecommerce Auth",
    description: "Created with ❤️ by https://x.com/adarsh_mamgain",
    images: [{ url: "/assets/og-image.webp" }],
    url: process.env.VERCEL_URL,
  },
  twitter: {
    site: process.env.VERCEL_URL,
    creatorId: "@adarsh_mamgain",
    description: "Created with ❤️ by https://x.com/adarsh_mamgain",
    images: "/assets/og-image.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </html>
  );
}
