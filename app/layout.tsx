import { ThemeSwitcher } from "@/components/theme-switcher";
import { Merriweather, Merriweather_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Link from "next/link";
import Logo from "@/components/HeaderLogo";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Pho Restaurants",
  description: "Find your next meal",
};

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
              <nav className="w-full flex justify-center border-b border-b-orange-400 h-16">
                <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
                  <Link href="/" passHref>
                    <Logo />
                  </Link>
                  <div className="flex flex-row gap-4">
                    {/* <Button asChild variant="ghost">
                      <Link href="/search" passHref>
                        <Search className="w-10 h-5" />
                        Search
                      </Link>
                    </Button> */}
                    <ThemeSwitcher />
                  </div>
                </div>
              </nav>
              <div className="flex flex-col gap-20 max-w-7xl w-full ">
                {children}
              </div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
