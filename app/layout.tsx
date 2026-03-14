import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RADE MACHINE",
  description: "Play the RADE MACHINE snake game and unlock the whitelist.",

  openGraph: {
    title: "RADE MACHINE",
    description: "Play the RADE MACHINE snake game and unlock the whitelist.",
    url: "https://rademachine.com", // change if different
    siteName: "RADE MACHINE",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "RADE MACHINE",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "RADE MACHINE",
    description: "Play the RADE MACHINE snake game and unlock the whitelist.",
    images: ["/twitter-image.png"],
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}