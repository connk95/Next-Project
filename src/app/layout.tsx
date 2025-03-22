"use client";

import { ParallaxProvider } from "react-scroll-parallax";
import Navbar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <ParallaxProvider>
          <Navbar />
          {children}
        </ParallaxProvider>
      </body>
    </html>
  );
}
