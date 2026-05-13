import AdRevenueCalculator from './AdRevenueCalculator'

export const metadata = {
  title: 'Free Ad Revenue Calculator – Calculate Website Earnings',
  description: 'Use our free Ad Revenue Calculator to estimate website advertising earnings instantly. Calculate CPM, CPC, RPM, and AdSense revenue for your website traffic.',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/ad-revenue-calculator',
  },
  openGraph: {
    title: 'Free Ad Revenue Calculator – Calculate Website Earnings',
    description: 'Use our free Ad Revenue Calculator to estimate website advertising earnings instantly. Calculate CPM, CPC, RPM, and AdSense revenue for your website traffic.',
    url: 'https://www.generatorpromptai.com/tools/ad-revenue-calculator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Ad Revenue Calculator – Calculate Website Earnings',
    description: 'Use our free Ad Revenue Calculator to estimate website advertising earnings instantly. Calculate CPM, CPC, RPM, and AdSense revenue for your website traffic.',
  },
}

export default function Page() {
  return <AdRevenueCalculator />
}
