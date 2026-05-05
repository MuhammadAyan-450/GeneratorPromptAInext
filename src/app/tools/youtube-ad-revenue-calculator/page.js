import YoutubeAdRevenueCalculator from './YoutubeAdRevenueCalculator'
// Apne project ke hisaab se yahan Navbar aur Footer ka path set karna hai
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'YouTube Ad Revenue Calculator – Estimate YouTube Earnings by Category',
  description: 'Free YouTube ad revenue calculator. Estimate YouTube earnings from views, CPM, video category, video length, and audience location tier. Compare revenue across 12+ categories.',
  keywords: 'youtube ad revenue calculator, how much does youtube pay per 1000 views, youtube cpm calculator by category, estimate youtube earnings by niche, youtube money calculator for gaming channel, youtube revenue for finance videos, youtube ad income estimator by video length, how to calculate youtube ad revenue from views, youtube cpm by country tier, free youtube earnings calculator online',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/youtube-ad-revenue-calculator',
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  openGraph: {
    type: 'website',
    siteName: 'GeneratorPromptAI',
    title: 'YouTube Ad Revenue Calculator – Estimate YouTube Earnings by Category',
    description: 'Estimate YouTube monthly and yearly ad revenue by video category, length, and audience location.',
    url: 'https://www.generatorpromptai.com/tools/youtube-ad-revenue-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Ad Revenue Calculator – Estimate YouTube Earnings by Category',
    description: 'Estimate YouTube monthly and yearly ad revenue by video category, length, and audience location.',
  },
}

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "YouTube Ad Revenue Calculator – Estimate YouTube Earnings by Category",
  "url": "https://www.generatorpromptai.com/tools/youtube-ad-revenue-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "description": "Free YouTube ad revenue calculator. Estimate YouTube earnings from views, CPM, video category, length, and audience location tier.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does YouTube pay per 1000 views?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "YouTube typically pays $3-15 per 1000 monetized views depending on niche, audience location, and video length. Finance niches can earn $15-30 per 1000 views."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good YouTube CPM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A good YouTube CPM ranges from $5-20. Finance and education niches have higher CPMs ($10-30), while entertainment and music have lower CPMs ($1-5)."
      }
    },
    {
      "@type": "Question",
      "name": "Does video length affect YouTube revenue?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Videos over 8 minutes can include mid-roll ads, which typically increase revenue by 50-100% compared to pre-roll only videos."
      }
    },
    {
      "@type": "Question",
      "name": "How does audience location affect YouTube CPM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tier 1 countries (US, UK, Canada, Australia) have the highest CPMs. Tier 2 (India, Brazil) are lower, and Tier 3 countries have the lowest CPMs."
      }
    },
    {
      "@type": "Question",
      "name": "What percentage of YouTube views are monetized?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typically around 40-60% of YouTube views are monetized due to ad blockers, YouTube Premium, and skipped ads. This calculator uses 55% as default."
      }
    }
  ]
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
      />
      <Navbar />
      <YoutubeAdRevenueCalculator />
      <Footer />
    </>
  )
}