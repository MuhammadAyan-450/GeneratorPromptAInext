import YoutubeAdRevenueCalculator from './YoutubeAdRevenueCalculator'

// ✅ SEO Metadata — Title: 59 chars, Description: 158 chars
export const metadata = {
  title: 'YouTube Ad Revenue Calculator – Estimate Earnings by Niche & CPM',
  
  description: 'Estimate YouTube ad revenue based on views, niche and CPM. Free calculator for creators to predict earnings easily.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/youtube-ad-revenue-calculator' },
  
  openGraph: {
    title: 'YouTube Ad Revenue Calculator – Estimate Earnings by Niche & CPM',
    description: 'Estimate YouTube ad revenue based on views, niche and CPM. Free calculator for creators to predict earnings easily.',
    url: 'https://www.generatorpromptai.com/tools/youtube-ad-revenue-calculator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/youtube-ad-revenue-calculator.png',
        width: 1200,
        height: 630,
        alt: 'YouTube Ad Revenue Calculator – Estimate Earnings Free',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Ad Revenue Calculator – Estimate Earnings by Niche & CPM',
    description: 'Estimate YouTube ad revenue based on views, niche and CPM. Free calculator for creators to predict earnings easily.',
    images: ['https://www.generatorpromptai.com/og/youtube-ad-revenue-calculator.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'youtube ad revenue calculator, youtube earnings estimator, calculate youtube income by niche, youtube cpm calculator, youtube rpm estimator, youtube money calculator by category, estimate youtube earnings by views, youtube partner program earnings calculator, youtube mid-roll revenue calculator, free youtube income estimator no signup',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "YouTube Ad Revenue Calculator – Estimate Earnings by Niche & CPM",
  "url": "https://www.generatorpromptai.com/tools/youtube-ad-revenue-calculator",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "All",
  "description": "Estimate YouTube ad revenue based on views, niche and CPM. Free calculator for creators to predict earnings easily.",
  "offers": { 
    "@type": "Offer", 
    "price": "0", 
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "creator": { 
    "@type": "Organization", 
    "name": "GeneratorPromptAI",
    "url": "https://www.generatorpromptai.com"
  },
  "featureList": "Multi-category revenue comparison, mid-roll ad detection, tiered location multipliers, 55% monetization rate assumption, copy-to-clipboard and download .txt, 100% client-side privacy, no signup required"
}

// ─── JSON-LD: BreadcrumbList Schema ─────────────────────────────────────────
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { 
      "@type": "ListItem", 
      "position": 1, 
      "name": "Home", 
      "item": "https://www.generatorpromptai.com/" 
    },
    { 
      "@type": "ListItem", 
      "position": 2, 
      "name": "All Free Tools", 
      "item": "https://www.generatorpromptai.com/pages/all-tools" 
    },
    { 
      "@type": "ListItem", 
      "position": 3, 
      "name": "YouTube Ad Revenue Calculator", 
      "item": "https://www.generatorpromptai.com/tools/youtube-ad-revenue-calculator" 
    }
  ]
}

// ─── JSON-LD: FAQPage Schema ────────────────────────────────────────────────
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
    },
    {
      "@type": "Question",
      "name": "Is my channel data stored or shared?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Never. All calculations happen locally in your browser. Your view counts and earnings estimates are never sent to servers, stored, or tracked."
      }
    }
  ]
}

// ─── Page Component ─────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} 
      />
      <YoutubeAdRevenueCalculator />
    </>
  )
}