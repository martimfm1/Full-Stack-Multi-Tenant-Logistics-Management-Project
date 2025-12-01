import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TenantProvider } from "@/lib/store/tenant-context";
import { LogisticsProvider } from "@/lib/store/logistics-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LogisticaPro - Sistema de Gestão Logística",
  description: "Sistema completo e realista de gestão logística multi-tenant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TenantProvider>
          <LogisticsProvider>
            {children}
          </LogisticsProvider>
        </TenantProvider>
      </body>
    </html>
  );
}
