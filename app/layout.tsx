import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { PageTransition } from "@/components/providers/page-transition";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { ChatBubble } from "@/components/shared/chat-bubble";
import { SITE } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "recruitment",
    "talent acquisition",
    "candidate sourcing",
    "executive search",
    "Nexellence",
    "staffing solutions",
    "market mapping",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    title: SITE.tagline,
    description: SITE.description,
    images: [{ url: SITE.logo, width: 800, height: 300, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.tagline,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/images/Nexellence-logo.png",
    apple: "/images/Nexellence-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-black font-sans text-white antialiased">
        <ThemeProvider>
          <SmoothScrollProvider>
            <LoadingScreen />
            <ScrollProgress />
            <CustomCursor />
            <Navbar />
            <PageTransition>
              <main className="min-h-screen">{children}</main>
            </PageTransition>
            <Footer />
            <ChatBubble />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
