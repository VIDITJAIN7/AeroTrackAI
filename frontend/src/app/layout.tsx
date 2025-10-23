import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatProvider } from "@/contexts/chat-context";
import { MaintenanceProvider } from "@/contexts/maintenance-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlightTracker - Flight Management Dashboard",
  description: "Modern flight management dashboard for tracking and managing airline operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
              <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
              >
                <ChatProvider>
                  <MaintenanceProvider>
                    {children}
                  </MaintenanceProvider>
                </ChatProvider>
              </body>
    </html>
  );
}
