import type { Metadata } from "next";
import { DM_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title:
    "CipherForge - Free Password Generator Tool for Secure and Strong Passwords",
  description:
    " Generate secure and strong passwords effortlessly with CipherForge. Our free online password generator tool ensures your accounts remain protected against cyber threats.",
  keywords:
    "password generator, secure passwords, online tool, cybersecurity, password strength, random password, password security, password strength meter, CipherForge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased dark",
          fontSans.variable,
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
