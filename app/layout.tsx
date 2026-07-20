import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NetworkBackground from "./components/NetworkBackground";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abhay Kushwah | System Administrator & Software Builder",
  description: "Portfolio of Abhay Kushwah — Microsoft 365, infrastructure, security, backup, and software development.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NetworkBackground />
        <div className="page-content">{children}</div>
      </body>
    </html>
  );
}
