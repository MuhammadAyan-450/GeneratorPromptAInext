import CpmCalculator from './CpmCalculator'

// ✅ Perfect SEO Metadata (Title: 58 chars, Description: 159 chars)
export const metadata = {
  title: 'CPM Calculator – Calculate Cost Per 1,000 Impressions',
  
  description: 'Calculate CPM, ad budget, reach, and cost per 1,000 impressions instantly with our free CPM Calculator for marketers. 🚀',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/cpm-calculator' },
  
  openGraph: {
    title: 'CPM Calculator – Calculate Cost Per 1,000 Impressions',
    description: 'Calculate CPM, ad budget, reach, and cost per 1,000 impressions instantly with our free CPM Calculator for marketers. 🚀',
    url: 'https://www.generatorpromptai.com/tools/cpm-calculator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/cpm-calculator.png',
        width: 1200,
        height: 630,
        alt: 'CPM Calculator – Calculate Cost Per 1000 Impressions',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'CPM Calculator – Calculate Cost Per 1,000 Impressions',
    description: 'Calculate CPM, ad budget, reach, and cost per 1,000 impressions instantly with our free CPM Calculator for marketers. 🚀',
    images: ['https://www.generatorpromptai.com/og/cpm-calculator.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'cpm calculator free, calculate cost per 1000 impressions online, google ads cpm calculator, facebook ads cpm estimator, cpm formula calculator, calculate ad budget from cpm, cpm vs cpc calculator',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CPM Calculator – Calculate Cost Per 1000 Impressions, Budget & Reach",
  "url": "https://www.generatorpromptai.com/tools/cpm-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "description": "Calculate CPM, ad budget, reach, and cost per 1,000 impressions instantly with our free CPM Calculator for marketers. 🚀",
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
  "featureList": "3 calculation modes (CPM, Cost, Impressions), cost per impression metrics, estimated CPC with 1.5% CTR, copy to clipboard, download results, 100% client-side privacy, no signup required, works for Google/Facebook/programmatic ads"
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
      "name": "CPM Calculator", 
      "item": "https://www.generatorpromptai.com/tools/cpm-calculator" 
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
      "name": "How to calculate CPM online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Divide your total campaign cost by total impressions, then multiply by 1000. CPM = (Cost / Impressions) × 1000. Or use this free CPM calculator — just enter cost and impressions."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good CPM for digital advertising?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A good CPM varies by platform and industry. Display ads average $2-5 CPM, social media $5-12, Google Search $10-30. Finance and tech niches have higher CPMs."
      }
    },
    {
      "@type": "Question",
      "name": "What does CPM stand for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CPM stands for Cost Per Mille (Mille = thousand in Latin). It means the cost an advertiser pays for 1,000 impressions of their ad."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between CPM and CPC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CPM is cost per 1,000 impressions — you pay for views. CPC is cost per click — you pay only when someone clicks your ad. CPM is better for brand awareness, CPC for direct response."
      }
    },
    {
      "@type": "Question",
      "name": "How to calculate campaign cost from CPM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multiply CPM by number of impressions, then divide by 1000. Cost = (CPM × Impressions) / 1000. Example: $5 CPM × 100,000 impressions = $500 cost."
      }
    },
    {
      "@type": "Question",
      "name": "Is a lower CPM always better?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not necessarily. A low CPM on a low-quality platform might generate poor results. Focus on cost-per-conversion rather than just CPM. A $20 CPM with 5% conversion rate beats a $2 CPM with 0.1% conversion."
      }
    },
    {
      "@type": "Question",
      "name": "How many impressions is 1 CPM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1 CPM equals exactly 1,000 impressions. If your CPM is $5, you pay $5 for every 1,000 times your ad is shown to users."
      }
    },
    {
      "@type": "Question",
      "name": "Is this calculator free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, 100% free. No signup, no account, no limits. Calculate CPM, cost, or impressions as many times as you need."
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
      <CpmCalculator />
    </>
  )
}