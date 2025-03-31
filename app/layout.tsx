import { ThemeSwitcher } from "@/components/theme-switcher";
import { Merriweather, Merriweather_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Link from "next/link";
import Logo from "@/components/HeaderLogo";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const merriSans = Merriweather_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-merriweather_sans",
});

const merriweather = Merriweather({
  display: "swap",
  subsets: ["latin"],
  weight: "900",
  variable: "--font-merriweather",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={merriSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center">
              <nav className="relative w-full flex justify-center border-b border-b-primary h-16">
                <div className="max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
                  <Link href="/" passHref>
                    <Logo />
                  </Link>
                  <div className=" absolute right-6">
                    <ThemeSwitcher />
                  </div>
                </div>
              </nav>
              <div className="flex flex-col gap-20 max-w-7xl w-full ">
                {children}
              </div>
              <footer className="max-w-7xl w-full p-6 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <Logo />
                  <div className="flex flex-row gap-4">
                    <Link href="#">Privacy Policy</Link>
                    <Link href="#">Contact</Link>
                    <Link href="#">About us</Link>
                  </div>
                </div>
                <div className="bg-primary w-full h-[1px]"/>
                <div className="w-full flex items-center justify-center">
                  <p className="text-sm text-center">
                    © 2025 Pho Restaurants. All rights reserved.
                  </p>
                </div>
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
