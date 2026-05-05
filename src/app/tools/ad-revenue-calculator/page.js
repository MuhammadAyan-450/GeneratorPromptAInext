import AdRevenueCalculator from './AdRevenueCalculator'

export const metadata = {
  title: 'Free Ad Revenue Calculator | Calculate Website Ad Earnings | GeneratorPromptAI',
  description: 'Calculate your website ad revenue instantly. Estimate CPM, CPC earnings. Free online tool.',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/ad-revenue-calculator',
  },
  openGraph: {
    title: 'Free Ad Revenue Calculator | Calculate Website Ad Earnings',
    description: 'Calculate your website ad revenue instantly. Estimate CPM, CPC earnings. Free online tool.',
    url: 'https://www.generatorpromptai.com/tools/ad-revenue-calculator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Ad Revenue Calculator | Calculate Website Ad Earnings',
    description: 'Calculate your website ad revenue instantly. Estimate CPM, CPC earnings. Free online tool.',
  },
}

export default function Page() {
  return <AdRevenueCalculator />
}
