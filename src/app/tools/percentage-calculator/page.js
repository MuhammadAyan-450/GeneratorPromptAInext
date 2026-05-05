import PercentageCalculator from './PercentageCalculator'

export const metadata = {
  title: 'Calculate Percentage of a Number Online Free – Discount Tax Reverse Percentage Calculator',
  description: 'Free online percentage calculator with 7 modes — X% of Y, percentage change, reverse percentage, discount, tax/VAT, add/subtract %. Real-time results, copy and download. No signup required.',
  keywords: "how to calculate percentage of a number online free, percentage increase decrease calculator between two numbers, reverse percentage calculator find original value free, discount percentage calculator sale price saved amount online, add gst vat to price calculator free online tool, what percent of a number is another number calculator, percentage change from old to new value calculator free, free online percentage calculator all types no signup, calculate discount and savings percentage instantly online, best free percentage calculator with copy and download 2026",
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/percentage-calculator',
  },
  openGraph: {
    title: 'Calculate Percentage Online Free – Discount, Tax, Reverse % Calculator',
    description: '7-in-1 percentage calculator — X% of Y, % change, discount, tax/VAT, reverse %. Real-time results, copy and download.',
    url: 'https://www.generatorpromptai.com/tools/percentage-calculator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Percentage Calculator – All Types Online',
    description: 'Calculate any percentage instantly. Discount, tax, % change, reverse % and more. Free online tool.',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

// JSON-LD Schemas
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Calculate Percentage of a Number Online Free – Discount Tax Reverse Percentage Calculator",
  "url": "https://www.generatorpromptai.com/tools/percentage-calculator",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Free online percentage calculator with 7 modes — X% of Y, percentage change, reverse percentage, discount, tax/VAT, add/subtract %. Real-time results, copy and download. No signup required.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Percentage Calculator", "item": "https://www.generatorpromptai.com/tools/percentage-calculator" }
  ]
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to calculate percentage of a number online free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Select the 'X% of Y' tab, enter the percentage and the number. The result appears instantly. For example, 20% of 500 = 100. No signup or download needed."
      }
    },
    {
      "@type": "Question",
      "name": "How to calculate percentage increase or decrease between two numbers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use the '% Change' tab. Enter the original value and the new value. The calculator shows the percentage change with a positive (increase) or negative (decrease) sign. Formula: ((New − Old) ÷ |Old|) × 100."
      }
    },
    {
      "@type": "Question",
      "name": "How to calculate discount percentage and sale price?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use the 'Discount' tab. Enter the original price and discount percentage. The calculator shows both the sale price and the amount you save. For example, 30% off Rs. 2500 = Rs. 1750 (save Rs. 750)."
      }
    },
    {
      "@type": "Question",
      "name": "What is reverse percentage and how to calculate it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reverse percentage finds the original value before a percentage change. Formula: Original = Final ÷ (1 + % ÷ 100). Example: If a price is 120 after a 20% increase, the original was 100. Use the 'Reverse %' tab."
      }
    },
    {
      "@type": "Question",
      "name": "How to add GST or VAT to a price using percentage calculator?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use the 'Tax / VAT' tab. Enter the base price and the tax rate. The calculator shows the tax amount and the total price including tax. For example, 17% GST on Rs. 5000 = Rs. 850 tax, total Rs. 5850."
      }
    }
  ]
};

export default function Page() {
  return (
    <>
      {/* Structured Data Scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      
      <PercentageCalculator />
    </>
  )
}