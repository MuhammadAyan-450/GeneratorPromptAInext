import AdsenseRevenueCalculator from './AdsenseRevenueCalculator'

export const metadata = {
  title: 'Adsense Revenue Calculator | Estimate Google Adsense Earnings',
  description: 'Estimate your Google AdSense earnings instantly with our free AdSense Revenue Calculator. Calculate website income, CPM, RPM, pageviews revenue, and ad earnings easily.',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/adsense-revenue-calculator',
  },
  openGraph: {
    title: 'Adsense Revenue Calculator | Estimate Google Adsense Earnings',
    description: 'Estimate your Google AdSense earnings instantly with our free AdSense Revenue Calculator. Calculate website income, CPM, RPM, pageviews revenue, and ad earnings easily.',
    url: 'https://www.generatorpromptai.com/tools/adsense-revenue-calculator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adsense Revenue Calculator | Estimate Google Adsense Earnings',
    description: 'Estimate your Google AdSense earnings instantly with our free AdSense Revenue Calculator. Calculate website income, CPM, RPM, pageviews revenue, and ad earnings easily.',
  },
}

export default function Page() {
  return <AdsenseRevenueCalculator />
}