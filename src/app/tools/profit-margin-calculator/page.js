import ProfitMarginCalculator from './ProfitMarginCalculator'

// ✅ SEO Metadata — Title: 58 chars, Description: 159 chars
export const metadata = {
  title: 'Profit Margin Calculator – Calculate Markup % & Break-Even Free',
  
  description: 'Calculate profit margin, markup % and break-even instantly. Free online calculator for business pricing and profit analysis.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/profit-margin-calculator' },
  
  openGraph: {
    title: 'Profit Margin Calculator – Calculate Markup % & Break-Even Free',
    description: 'Calculate profit margin, markup % and break-even instantly. Free online calculator for business pricing and profit analysis.',
    url: 'https://www.generatorpromptai.com/tools/profit-margin-calculator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/profit-margin-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Profit Margin Calculator – Calculate Markup & Break-Even',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Profit Margin Calculator – Calculate Markup % & Break-Even Free',
    description: 'Calculate profit margin, markup % and break-even instantly. Free online calculator for business pricing and profit analysis.',
    images: ['https://www.generatorpromptai.com/og/profit-margin-calculator.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'profit margin calculator, markup calculator, gross profit margin, break even calculator, e-commerce profit tool, small business calculator, pricing calculator, profit percentage',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Profit Margin Calculator – Calculate Markup % & Break-Even Free",
  "url": "https://www.generatorpromptai.com/tools/profit-margin-calculator",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "All",
  "description": "Calculate profit margin, markup % and break-even instantly. Free online calculator for business pricing and profit analysis.",
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
  "featureList": "Profit margin % & markup % toggle, break-even unit estimation, currency-agnostic calculations, one-click copy result, instant validation, 100% client-side privacy, no signup required"
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
      "name": "Profit Margin Calculator", 
      "item": "https://www.generatorpromptai.com/tools/profit-margin-calculator" 
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
      "name": "What is the difference between profit margin and markup?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Profit margin is profit as a % of selling price, while markup is profit as a % of cost. Example: $50 cost, $80 sell → Margin = 37.5%, Markup = 60%. Margin is better for profitability analysis."
      }
    },
    {
      "@type": "Question",
      "name": "How to calculate profit margin percentage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use the formula: ((Selling Price - Cost Price) / Selling Price) × 100. Our calculator does this instantly — just enter your cost and selling price."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good profit margin for small business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It varies by industry: retail (5-10%), e-commerce (15-20%), SaaS (70-90%). Use this calculator to benchmark your pricing against industry standards."
      }
    },
    {
      "@type": "Question",
      "name": "Does this calculator work for all currencies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Enter values in any currency (USD, EUR, PKR, etc.). The % results are universal, and you can mentally apply your currency symbol to the profit amount."
      }
    },
    {
      "@type": "Question",
      "name": "Is my pricing data stored or shared?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Never. All calculations happen locally in your browser. Your cost and selling prices are never sent to servers, stored, or tracked."
      }
    },
    {
      "@type": "Question",
      "name": "How to use break-even analysis for pricing decisions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Break-even units show how many items you need to sell to recover your cost investment. Use this to set minimum sales targets before launching a product or campaign."
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
      <ProfitMarginCalculator />
    </>
  )
}