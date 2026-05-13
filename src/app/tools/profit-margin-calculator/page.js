import ProfitMarginCalculator from './ProfitMarginCalculator'

export const metadata = {
  title: 'Profit Margin Calculator – Calculate Profit % & Markup Online Free',
  description: 'Calculate gross profit margin percentage, markup %, and profit amount from cost & selling price. Free business calculator for e-commerce & small business.',
  keywords: 'profit margin calculator by cost and selling price, how to calculate profit margin percentage online, gross profit margin calculator free, markup vs profit margin calculator, calculate profit percentage from cost and revenue, business profit margin tool online, retail profit margin calculator with examples, e-commerce profit calculator free',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/profit-margin-calculator',
  },
  openGraph: {
    title: 'Profit Margin Calculator – Calculate Profit % & Markup Online Free',
    description: 'Calculate gross profit margin percentage, markup %, and profit amount from cost & selling price. Free business calculator for e-commerce & small business.',
    url: 'https://www.generatorpromptai.com/tools/profit-margin-calculator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profit Margin Calculator – Calculate Profit % & Markup Online Free',
    description: 'Calculate gross profit margin percentage, markup %, and profit amount from cost & selling price. Free business calculator for e-commerce & small business.',
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
  "name": "Profit Margin Calculator by Cost and Selling Price",
  "url": "https://www.generatorpromptai.com/tools/profit-margin-calculator",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "All",
  "description": "Calculate gross profit margin percentage, markup %, profit amount, and break-even analysis from cost price and selling price. Free, private, and instant.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Profit Margin Calculator", "item": "https://www.generatorpromptai.com/tools/profit-margin-calculator" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between profit margin and markup?",
      "acceptedAnswer": { "@type": "Answer", "text": "Profit margin is profit as a % of selling price, while markup is profit as a % of cost. Example: $50 cost, $80 sell → Margin = 37.5%, Markup = 60%. Margin is better for profitability analysis." }
    },
    {
      "@type": "Question",
      "name": "How to calculate profit margin percentage?",
      "acceptedAnswer": { "@type": "Answer", "text": "Use the formula: ((Selling Price - Cost Price) / Selling Price) × 100. Our calculator does this instantly — just enter your cost and selling price." }
    },
    {
      "@type": "Question",
      "name": "What is a good profit margin for small business?",
      "acceptedAnswer": { "@type": "Answer", "text": "It varies by industry: retail (5-10%), e-commerce (15-20%), SaaS (70-90%). Use this calculator to benchmark your pricing against industry standards." }
    },
    {
      "@type": "Question",
      "name": "Does this calculator work for all currencies?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes! Enter values in any currency (USD, EUR, PKR, etc.). The % results are universal, and you can mentally apply your currency symbol to the profit amount." }
    },
    {
      "@type": "Question",
      "name": "Is my pricing data stored or shared?",
      "acceptedAnswer": { "@type": "Answer", "text": "Never. All calculations happen locally in your browser. Your cost and selling prices are never sent to servers, stored, or tracked." }
    }
  ]
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      <ProfitMarginCalculator />
    </>
  )
}