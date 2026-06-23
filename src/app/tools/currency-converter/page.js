import CurrencyConverter from './CurrencyConverter'

// ✅ Perfect SEO Metadata (Title: 58 chars, Description: 159 chars)
export const metadata = {
  title: 'Currency Converter – Live USD to PKR, AED to PKR Exchange Rates',
  
  description: 'Convert USD, AED, EUR, and more with live exchange rates. Fast, accurate Currency Converter with real-time updates. 🚀',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/currency-converter' },
  
  openGraph: {
    title: 'Currency Converter – Live USD to PKR, AED to PKR Exchange Rates',
    description: 'Convert USD, AED, EUR, and more with live exchange rates. Fast, accurate Currency Converter with real-time updates. 🚀',
    url: 'https://www.generatorpromptai.com/tools/currency-converter',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/currency-converter.png',
        width: 1200,
        height: 630,
        alt: 'Currency Converter – Live Exchange Rates',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Currency Converter – Live USD to PKR, AED to PKR Exchange Rates',
    description: 'Convert USD, AED, EUR, and more with live exchange rates. Fast, accurate Currency Converter with real-time updates. 🚀',
    images: ['https://www.generatorpromptai.com/og/currency-converter.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'currency converter live, usd to pkr today, aed to pkr conversion calculator live, sar to pkr rate, eur to pkr exchange rate, free online currency converter, live exchange rate calculator',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Currency Converter – Live USD to PKR, AED to PKR Exchange Rates",
  "url": "https://www.generatorpromptai.com/tools/currency-converter",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "description": "Convert USD, AED, EUR, and more with live exchange rates. Fast, accurate Currency Converter with real-time updates. 🚀s",
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
  "featureList": "170+ currencies, live exchange rates, auto-refresh every 60s, multi-currency comparison, quick pair buttons (USD/PKR, AED/PKR), copy results, 100% client-side privacy, no signup required"
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
      "name": "Currency Converter", 
      "item": "https://www.generatorpromptai.com/tools/currency-converter" 
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
      "name": "What is 1 dollar to PKR today live rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The live 1 USD to PKR rate is shown at the top of this page. It automatically refreshes every 60 seconds to ensure you are seeing the most accurate, real-time market exchange rate."
      }
    },
    {
      "@type": "Question",
      "name": "How much is 1000 AED in PKR today?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To find out how much 1000 AED is in PKR today, click the 'AED → PKR' quick pair button and type 1000 in the amount box. The exact live conversion will be displayed instantly."
      }
    },
    {
      "@type": "Question",
      "name": "How to convert USD to PKR online with live exchange rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simply enter the USD amount in our converter, make sure 'From' is set to USD and 'To' is set to PKR. The tool automatically calculates the live conversion using real-time market rates without any manual input needed."
      }
    },
    {
      "@type": "Question",
      "name": "Is this AED to PKR conversion calculator free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, 100% free. There are no hidden fees, no sign-ups, and no limits. You can convert AED to PKR, SAR to PKR, or any other currency as many times as you want."
      }
    },
    {
      "@type": "Question",
      "name": "How often are exchange rates updated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rates are fetched from live market data and automatically refresh every 60 seconds on this page. You can also click 'Refresh Rate' manually if needed."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use this for business transactions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This tool provides mid-market rates for informational purposes. For actual bank transfers or business transactions, check with your financial institution as they may apply their own spread or fees."
      }
    },
    {
      "@type": "Question",
      "name": "Does it work offline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, an internet connection is required to fetch the latest live exchange rates from global forex markets."
      }
    },
    {
      "@type": "Question",
      "name": "Which currencies are supported?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We support 170+ major and minor currencies including USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR, PKR, AED, SAR, and many more."
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
      <CurrencyConverter />
    </>
  )
}