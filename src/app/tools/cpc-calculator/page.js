import CpcCalculator from './CpcCalculator'

export const metadata = {
  title: 'Calculate CPC Online Free – Cost Per Click Calculator',
  description: 'Free online CPC calculator. Calculate cost per click, total campaign cost, or total clicks instantly. No signup, no limits.',
  keywords: 'calculate cpc online free, cost per click calculator, how to calculate cpc for ads, cpc formula calculator, calculate campaign cost from cpc, free cpc calculator tool, digital advertising cpc calculator, what is my cpc, calculate clicks from cpc and budget, google ads cpc calculator',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/cpc-calculator',
  },
  openGraph: {
    title: 'Calculate CPC Online Free – Cost Per Click Calculator',
    description: 'Free CPC calculator to calculate cost per click, campaign cost, or total clicks instantly.',
    url: 'https://www.generatorpromptai.com/tools/cpc-calculator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculate CPC Online Free – CPC Calculator',
    description: 'Free CPC calculator to calculate cost per click instantly.',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Calculate CPC Online Free – Cost Per Click Calculator",
  "url": "https://www.generatorpromptai.com/tools/cpc-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "description": "Free online CPC calculator. Calculate cost per click, total campaign cost, or total clicks instantly. Includes CTR and CPM metrics.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" },
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "CPC Calculator", "item": "https://www.generatorpromptai.com/tools/cpc-calculator" },
  ],
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How to calculate CPC online?", "acceptedAnswer": { "@type": "Answer", "text": "Divide total campaign cost by total clicks. CPC = Cost / Clicks. Example: $500 cost / 100 clicks = $5.00 CPC. Use this free calculator to do it instantly." } },
    { "@type": "Question", "name": "What is a good CPC for Google Ads?", "acceptedAnswer": { "@type": "Answer", "text": "A good CPC on Google Ads varies by industry. Legal and finance can be $5-50+, while e-commerce averages $1-3. The global average across all industries is around $2-$4." } },
    { "@type": "Question", "name": "What does CPC stand for?", "acceptedAnswer": { "@type": "Answer", "text": "CPC stands for Cost Per Click. It is the amount an advertiser pays each time a user clicks on their ad. It is the primary pricing model for Google Ads and social media ads." } },
    { "@type": "Question", "name": "What is the difference between CPC and CPM?", "acceptedAnswer": { "@type": "Answer", "text": "CPC (Cost Per Click) means you pay when someone clicks your ad. CPM (Cost Per Mille) means you pay per 1,000 impressions regardless of clicks. CPC is better for direct response, CPM for brand awareness." } },
    { "@type": "Question", "name": "How to reduce CPC?", "acceptedAnswer": { "@type": "Answer", "text": "Improve Quality Score (relevance of ads, keywords, landing page), use long-tail keywords, add negative keywords, optimize ad copy for higher CTR, and run A/B tests on your campaigns." } },
  ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
      />
      <CpcCalculator />
    </>
  )
}