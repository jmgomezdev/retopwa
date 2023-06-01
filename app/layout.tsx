import "@/styles/globals.css"
import { ReactNode } from "react"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import RecoilRootWrapper from "@/components/RecoilRootWrapper"
import SiteFooter from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { TailwindIndicator } from "@/components/TailwindIndicator"
import { ThemeProvider } from "@/components/ThemeProvider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <RecoilRootWrapper>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <div className="flex-1">{children}</div>
                <SiteFooter />
              </div>
              <TailwindIndicator />
            </ThemeProvider>
          </RecoilRootWrapper>
        </body>
      </html>
    </>
  )
}
