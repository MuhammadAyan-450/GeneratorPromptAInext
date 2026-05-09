import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Script from 'next/script'

export const metadata = {
  title: {
    default: 'GeneratorPromptAI - Free AI Tools & Prompt Generators Online',
    template: '%s | GeneratorPromptAI',
  },
  description: 'Free AI prompt generators and 30+ online tools for ChatGPT, Claude & Midjourney. No signup needed!',
  metadataBase: new URL('https://www.generatorpromptai.com'),
  icons: {
    icon: '/icon.png',
  },
  // ✅ AdSense Meta Tag
  other: {
    'google-adsense-account': 'ca-pub-1355040226257068',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}