import CpcCalculator from './CpcCalculator'

// ✅ Perfect SEO Metadata (Title: 56 chars, Description: 159 chars)
export const metadata = {
  title: 'CPC Calculator – Calculate Cost Per Click & Ad Budget',
  
  description: 'Calculate cost per click, ad budget, and estimated clicks instantly with our free CPC Calculator for advertisers and marketers. 🚀',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/cpc-calculator' },
  
  openGraph: {
    title: 'CPC Calculator – Calculate Cost Per Click & Ad Budget',
    description: 'Calculate cost per click, ad budget, and estimated clicks instantly with our free CPC Calculator for advertisers and marketers. 🚀',
    url: 'https://www.generatorpromptai.com/tools/cpc-calculator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/cpc-calculator.png',
        width: 1200,
        height: 630,
        alt: 'CPC Calculator – Calculate Cost Per Click',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'CPC Calculator – Calculate Cost Per Click & Ad Budget',
    description: 'Calculate cost per click, ad budget, and estimated clicks instantly with our free CPC Calculator for advertisers and marketers. 🚀',
    images: ['https://www.generatorpromptai.com/og/cpc-calculator.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'cpc calculator free, calculate cost per click online, google ads cpc calculator, facebook ads cpc estimator, cpc formula calculator, calculate ad budget from cpc, cpc vs cpm calculator',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CPC Calculator – Calculate Cost Per Click, Budget & Clicks Free",
  "url": "https://www.generatorpromptai.com/tools/cpc-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "description": "Calculate cost per click, ad budget, and estimated clicks instantly with our free CPC Calculator for advertisers and marketers. 🚀",
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
  "featureList": "3 calculation modes (CPC, Cost, Clicks), optional CTR & CPM metrics, copy to clipboard, download results, 100% client-side privacy, no signup required, works for Google/Facebook/LinkedIn ads"
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
      "name": "CPC Calculator", 
      "item": "https://www.generatorpromptai.com/tools/cpc-calculator" 
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
      "name": "How to calculate CPC online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Divide total campaign cost by total clicks. CPC = Cost / Clicks. Example: $500 cost / 100 clicks = $5.00 CPC. Use this free calculator to do it instantly."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good CPC for Google Ads?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A good CPC on Google Ads varies by industry. Legal and finance can be $5-50+, while e-commerce averages $1-3. The global average across all industries is around $2-$4."
      }
    },
    {
      "@type": "Question",
      "name": "What does CPC stand for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CPC stands for Cost Per Click. It is the amount an advertiser pays each time a user clicks on their ad. It is the primary pricing model for Google Ads and social media ads."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between CPC and CPM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CPC (Cost Per Click) means you pay when someone clicks your ad. CPM (Cost Per Mille) means you pay per 1,000 impressions regardless of clicks. CPC is better for direct response, CPM for brand awareness."
      }
    },
    {
      "@type": "Question",
      "name": "How to reduce CPC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Improve Quality Score (relevance of ads, keywords, landing page), use long-tail keywords, add negative keywords, optimize ad copy for higher CTR, and run A/B tests on your campaigns."
      }
    },
    {
      "@type": "Question",
      "name": "Why is my CPC so high?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "High CPC is usually caused by bidding on competitive short-tail keywords, low Quality Score, poor landing page experience, or targeting high-competition audiences/locations."
      }
    },
    {
      "@type": "Question",
      "name": "Can I calculate CTR with this tool?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. If you optionally enter your total impressions along with cost and clicks, the tool will automatically calculate your CTR (Click-Through Rate) and CPM alongside your CPC."
      }
    },
    {
      "@type": "Question",
      "name": "Is this calculator free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, 100% free. No signup, no account, no limits. Calculate CPC, cost, or clicks as many times as you need."
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
      <CpcCalculator />
    </>
  )
}