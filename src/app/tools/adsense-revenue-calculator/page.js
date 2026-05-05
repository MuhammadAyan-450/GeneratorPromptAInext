import AdsenseRevenueCalculator from './AdsenseRevenueCalculator'

export const metadata = {
  title: 'Free AdSense Revenue Calculator | Estimate Google AdSense Earnings | GeneratorPromptAI',
  description: 'Estimate your Google AdSense earnings instantly. Free AdSense revenue calculator tool.',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/adsense-revenue-calculator',
  },
  openGraph: {
    title: 'Free AdSense Revenue Calculator | Estimate Google AdSense Earnings',
    description: 'Estimate your Google AdSense earnings instantly. Free AdSense revenue calculator tool.',
    url: 'https://www.generatorpromptai.com/tools/adsense-revenue-calculator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AdSense Revenue Calculator | Estimate Google AdSense Earnings',
    description: 'Estimate your Google AdSense earnings instantly. Free AdSense revenue calculator tool.',
  },
}

export default function Page() {
  return <AdsenseRevenueCalculator />
}