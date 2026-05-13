import CpmCalculator from './CpmCalculator'

export const metadata = {
  title: 'Free CPM Calculator | Calculate Cost Per 1000 Impressions',
  description: 'Free online CPM calculator. Calculate cost per 1000 impressions, total campaign cost, or total impressions instantly. No signup, no limits.',
  keywords: 'calculate the cpm online free, cpm calculator online free, cost per 1000 impressions calculator, how to calculate cpm for ads, calculate campaign cost from cpm, cpm formula calculator, digital advertising cpm calculator, calculate impressions from cpm and cost, free cpm calculator tool, what is my cpm calculator',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/cpm-calculator',
  },
  openGraph: {
    title: 'Free CPM Calculator | Calculate Cost Per 1000 Impressions',
    description: 'Free CPM calculator. Calculate cost per 1000 impressions, campaign cost, or impressions instantly.',
    url: 'https://www.generatorpromptai.com/tools/cpm-calculator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free CPM Calculator | Calculate Cost Per 1000 Impressions',
    description: 'Free CPM calculator to calculate cost per 1000 impressions instantly.',
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
  "name": "Calculate the CPM Online Free – CPM Calculator Tool",
  "url": "https://www.generatorpromptai.com/tools/cpm-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "description": "Free online CPM calculator. Calculate cost per 1000 impressions, total campaign cost, or total impressions instantly. No signup required.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" },
}

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
      "name": "CPM Calculator",
      "item": "https://www.generatorpromptai.com/tools/cpm-calculator"
    },
  ],
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to calculate CPM online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Divide your total campaign cost by total impressions, then multiply by 1000. CPM = (Cost / Impressions) × 1000. Or use this free CPM calculator — just enter cost and impressions."
      },
    },
    {
      "@type": "Question",
      "name": "What is a good CPM for digital advertising?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A good CPM varies by platform and industry. Display ads average $2-5 CPM, social media $5-12, Google Search $10-30. Finance and tech niches have higher CPMs."
      },
    },
    {
      "@type": "Question",
      "name": "What does CPM stand for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CPM stands for Cost Per Mille (Mille = thousand in Latin). It means the cost an advertiser pays for 1,000 impressions of their ad."
      },
    },
    {
      "@type": "Question",
      "name": "What is the difference between CPM and CPC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CPM is cost per 1,000 impressions — you pay for views. CPC is cost per click — you pay only when someone clicks your ad. CPM is better for brand awareness, CPC for direct response."
      },
    },
    {
      "@type": "Question",
      "name": "How to calculate campaign cost from CPM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multiply CPM by number of impressions, then divide by 1000. Cost = (CPM × Impressions) / 1000. Example: $5 CPM × 100,000 impressions = $500 cost."
      },
    },
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
      <CpmCalculator />
    </>
  )
}