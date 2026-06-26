import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CookieConsent from "../components/CookieConsent";
import Script from "next/script";
import { Inter } from "next/font/google";

// ─── FONT SETUP ───────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.generatorpromptai.com"),

  title: {
    default: "GeneratorPromptAI – Free AI Prompt Generator & Smart AI Tools",
    template: "%s | GeneratorPromptAI",
  },

  description:
    "Free AI prompt generators and 30+ online AI tools. Create prompts for ChatGPT, Claude, Gemini, Grok and use powerful productivity tools online.",

  applicationName: "GeneratorPromptAI",

  creator: "GeneratorPromptAI",

  publisher: "GeneratorPromptAI",

  authors: [{ name: "GeneratorPromptAI" }],

  category: "Technology",

  keywords: [
    "AI Prompt Generator",
    "Free AI Tools",
    "ChatGPT Prompt Generator",
    "Claude Prompt Generator",
    "Gemini Prompt Generator",
    "Online AI Tools",
    "GeneratorPromptAI",
  ],

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://www.generatorpromptai.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.generatorpromptai.com",
    siteName: "GeneratorPromptAI",
    title: "GeneratorPromptAI – Free AI Prompt Generator & Smart AI Tools",
    description:
      "Create AI prompts and use 30+ free online AI tools instantly.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "GeneratorPromptAI – Free AI Prompt Generator & Smart AI Tools",
    description:
      "Create AI prompts and use 30+ free online AI tools instantly.",
    images: ["/twitter-image.jpg"],
  },

  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },

  other: {
    "google-adsense-account": "ca-pub-1355040226257068",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* ✅ Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MKQLLNTX67"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MKQLLNTX67');
          `}
        </Script>

        {/* ✅ Adsterra Social Bar Ad Unit — Global */}
        <Script
          src="https://pl29796843.effectivecpmnetwork.com/f6/64/f7/f664f77c096247f67cc367716bce6ccf.js"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${inter.className} min-h-screen flex flex-col antialiased`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
