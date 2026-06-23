import PercentageCalculator from './PercentageCalculator'

// ✅ SEO Metadata (Title: 59 chars, Description: 159 chars)
export const metadata = {
  title: 'Percentage Calculator – Free Discount Tax Reverse % Tool Online',
  
  description: 'Free percentage calculator for discount, tax and reverse %. Solve calculations instantly with easy online tool.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/percentage-calculator' },
  
  openGraph: {
    title: 'Percentage Calculator – Free Discount Tax Reverse % Tool Online',
    description: 'Free percentage calculator for discount, tax and reverse %. Solve calculations instantly with easy online tool.',
    url: 'https://www.generatorpromptai.com/tools/percentage-calculator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/percentage-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Percentage Calculator – Calculate Discounts, Tax, and More',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Percentage Calculator – Free Discount Tax Reverse % Tool Online',
    description: 'Free percentage calculator for discount, tax and reverse %. Solve calculations instantly with easy online tool.',
    images: ['https://www.generatorpromptai.com/og/percentage-calculator.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'percentage calculator, discount calculator, tax calculator, vat calculator, reverse percentage, percent change calculator, x percent of y, free percentage tool, online calculator, smart rounding calculator',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Percentage Calculator – Free Discount Tax Reverse % Tool Online",
  "url": "https://www.generatorpromptai.com/tools/percentage-calculator",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Free percentage calculator for discount, tax and reverse %. Solve calculations instantly with easy online tool.",
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
  "featureList": "7 calculation modes (X% of Y, % Change, Discount, Tax/VAT, etc.), real-time results as you type, smart rounding engine (up to 4 decimals), copy to clipboard or download as .txt, session history, 100% client-side processing with pure JavaScript, no signup required"
}

// ─── JSON-LD: BreadcrumbList Schema ─────────────────────────────────────────
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Percentage Calculator", "item": "https://www.generatorpromptai.com/tools/percentage-calculator" }
  ]
}

// ─── JSON-LD: FAQPage Schema ────────────────────────────────────────────────
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to calculate percentage of a number online free?",
      "acceptedAnswer": { "@type": "Answer", "text": "Select the 'X% of Y' tab, enter the percentage and the number. The result appears instantly. For example, 20% of 500 = 100. No signup or download needed." }
    },
    {
      "@type": "Question",
      "name": "How to calculate percentage increase or decrease between two numbers?",
      "acceptedAnswer": { "@type": "Answer", "text": "Use the '% Change' tab. Enter the original value and the new value. The calculator shows the percentage change with a positive (increase) or negative (decrease) sign. Formula: ((New − Old) ÷ |Old|) × 100." }
    },
    {
      "@type": "Question",
      "name": "How to calculate discount percentage and sale price?",
      "acceptedAnswer": { "@type": "Answer", "text": "Use the 'Discount' tab. Enter the original price and discount percentage. The calculator shows both the sale price and the amount you save. For example, 30% off Rs. 2500 = Rs. 1750 (save Rs. 750)." }
    },
    {
      "@type": "Question",
      "name": "What is reverse percentage and how to calculate it?",
      "acceptedAnswer": { "@type": "Answer", "text": "Reverse percentage finds the original value before a percentage change. Formula: Original = Final ÷ (1 + % ÷ 100). Example: If a price is 120 after a 20% increase, the original was 100. Use the 'Reverse %' tab." }
    },
    {
      "@type": "Question",
      "name": "How to add GST or VAT to a price using percentage calculator?",
      "acceptedAnswer": { "@type": "Answer", "text": "Use the 'Tax / VAT' tab. Enter the base price and the tax rate. The calculator shows the tax amount and the total price including tax. For example, 17% GST on Rs. 5000 = Rs. 850 tax, total Rs. 5850." }
    },
    {
      "@type": "Question",
      "name": "Does this tool work offline?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Once the page loads, all calculations happen locally in your browser. You can use it without an internet connection after the initial load." }
    }
  ]
}

// ─── Page Component ─────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      <PercentageCalculator />
    </>
  )
}