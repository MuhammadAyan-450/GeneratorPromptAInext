import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}