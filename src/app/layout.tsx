import type { Metadata } from "next";
import { DM_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { BASE_URL } from "@/lib/constants";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  metadataBase: new URL(BASE_URL),
  applicationName: "CipherForge",
  title:
    "CipherForge - Free Password Generator Tool for Secure and Strong Passwords",
  description:
    "Generate secure and strong passwords effortlessly with CipherForge. Our free online password generator tool ensures your accounts remain protected against cyber threats.",
  keywords:
    "password generator, secure passwords, online tool, cybersecurity, password strength, random password, password security, password strength meter, CipherForge",
  openGraph: {
    title:
      "CipherForge - Free Password Generator Tool for Secure and Strong Passwords",
    description:
      "Generate secure and strong passwords effortlessly with CipherForge. Our free online password generator tool ensures your accounts remain protected against cyber threats.",
    url: "/",
    siteName: "CipherForge",
    countryName: "India",
    locale: "en_IN",
    type: "website",
  },
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
          "min-h-svh bg-background font-sans antialiased px-4",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
