import "./globals.css";

export const metadata = {
    title: "KingSquare — Wellness for Kings",
    description:
          "A comprehensive wellness platform for Black men 50+ combining health tracking, culturally relevant nutrition, mental health support, AI food scanning, exercise programs, and community connection.",
    manifest: "/manifest.json",
    appleWebApp: {
          capable: true,
          statusBarStyle: "black-translucent",
          title: "KingSquare",
    },
    openGraph: {
          title: "KingSquare — Wellness for Kings",
          description:
                  "Health tracking, AI food scanning, meal planning, exercise programs, and community for Black men 50+.",
          type: "website",
          locale: "en_US",
          siteName: "KingSquare",
    },
};

export const viewport = {
    themeColor: "#0D1117",
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
};

export default function RootLayout({ children }) {
    return (
          <html lang="en">
            <head>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
                      <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Cormorant+Garamond:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
                      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
                      <meta name="apple-mobile-web-app-capable" content="yes" />
                      <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
              </head>
        <body>{children}</body>
              </html>
    );
}
