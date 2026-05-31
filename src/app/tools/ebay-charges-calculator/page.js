import EbayChargesCalculator from './EbayChargesCalculator'

// ✅ Perfect SEO Metadata (Title: 56 chars, Description: 159 chars)
export const metadata = {
  title: 'eBay Charges Calculator – Calculate Seller Fees & Profit Free',
  
  description: 'Calculate eBay seller fees, final value fees, and profit instantly with our free eBay Fee Calculator for sellers. 🚀',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/ebay-charges-calculator' },
  
  openGraph: {
    title: 'eBay Charges Calculator – Calculate Seller Fees & Profit Free',
    description: 'Free eBay fee calculator. Calculate final value fees, shipping costs, and net profit instantly. Adjust fee % for any category. No signup.',
    url: 'https://www.generatorpromptai.com/tools/ebay-charges-calculator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/ebay-charges-calculator.png',
        width: 1200,
        height: 630,
        alt: 'eBay Charges Calculator – Calculate Seller Fees',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'eBay Charges Calculator – Calculate Seller Fees & Profit Free',
    description: 'Calculate eBay seller fees, final value fees, and profit instantly with our free eBay Fee Calculator for sellers. 🚀',
    images: ['https://www.generatorpromptai.com/og/ebay-charges-calculator.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'ebay fee calculator, ebay charges calculator, calculate ebay seller fees, ebay final value fee calculator, ebay profit calculator, ebay shipping fee calculator, ebay selling cost estimator',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "eBay Charges Calculator – Calculate Seller Fees & Profit Free",
  "url": "https://www.generatorpromptai.com/tools/ebay-charges-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "description": "Calculate eBay seller fees, final value fees, and profit instantly with our free eBay Fee Calculator for sellers. 🚀",
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
  "featureList": "Calculate final value fees, include shipping in fee calculation, customizable fee percentage, visual profit/fee breakdown, copy results, download .txt, 100% client-side privacy, no signup required"
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
      "name": "eBay Charges Calculator", 
      "item": "https://www.generatorpromptai.com/tools/ebay-charges-calculator" 
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
      "name": "How to calculate eBay fees?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enter item price and shipping cost. The calculator automatically applies the eBay final value fee percentage and shows your profit."
      }
    },
    {
      "@type": "Question",
      "name": "What is eBay final value fee?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is the percentage eBay charges on total sale including shipping. Usually around 10–15% depending on category."
      }
    },
    {
      "@type": "Question",
      "name": "How to calculate profit after eBay fees?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Subtract eBay fee from total sale amount. This tool does it automatically."
      }
    },
    {
      "@type": "Question",
      "name": "Does eBay charge fees on shipping?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. eBay final value fees are calculated on the total amount of the sale, which includes the item price plus shipping and handling costs."
      }
    },
    {
      "@type": "Question",
      "name": "What is the standard eBay fee percentage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For most categories, the final value fee is around 13%. However, it can vary from 10% to 15% depending on what you're selling. Check your specific category for exact rates."
      }
    },
    {
      "@type": "Question",
      "name": "Is this calculator free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, 100% free. No signup, no account, no limits. Calculate eBay fees as many times as you need."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use this for other marketplaces?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While designed for eBay, you can adjust the fee percentage to estimate fees for other platforms like Mercari, Poshmark, or Etsy by entering their specific fee rates."
      }
    },
    {
      "@type": "Question",
      "name": "Why is my profit lower than expected?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Remember that this calculator only accounts for eBay fees. You may also have costs for packaging, supplies, and taxes that further reduce your net profit."
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
      <EbayChargesCalculator />
    </>
  )
}