import EbayChargesCalculator from './EbayChargesCalculator'

export const metadata = {
  title: 'eBay Charges Calculator – Calculate eBay Fees & Profit Free',
  description: 'Free eBay charges calculator. Calculate eBay seller fees, final value fees, and profit instantly. Best eBay fee calculator online.',
  keywords: 'ebay charges calculator, ebay fee calculator 2026, ebay profit calculator, final value fee ebay calculator',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/ebay-charges-calculator',
  },
  openGraph: {
    title: 'eBay Charges Calculator – Calculate eBay Fees & Profit Free',
    description: 'Free eBay charges calculator. Calculate eBay seller fees, final value fees, and profit instantly. Best eBay fee calculator online.',
    url: 'https://www.generatorpromptai.com/tools/ebay-charges-calculator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eBay Charges Calculator – Calculate eBay Fees & Profit Free',
    description: 'Free eBay charges calculator. Calculate eBay seller fees, final value fees, and profit instantly.',
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
  "name": "eBay Charges Calculator Free Online",
  "url": "https://www.generatorpromptai.com/tools/ebay-charges-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "description": "Free eBay charges calculator to calculate seller fees, final value fees, and profit instantly.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}

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
      },
    },
    {
      "@type": "Question",
      "name": "What is eBay final value fee?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is the percentage eBay charges on total sale including shipping. Usually around 10–15% depending on category."
      },
    },
    {
      "@type": "Question",
      "name": "How to calculate profit after eBay fees?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Subtract eBay fee from total sale amount. This tool does it automatically."
      },
    },
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
      <EbayChargesCalculator />
    </>
  )
}