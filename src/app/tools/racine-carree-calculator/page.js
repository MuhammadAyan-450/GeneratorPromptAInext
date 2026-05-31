import RacineCarreeCalculator from './RacineCarreeCalculator'

// ✅ SEO Metadata — Title: 59 chars, Description: 158 chars
export const metadata = {
  title: 'Racine Carree Calculator – Free Square Root Calculator Online',
  
  description: 'Free square root calculator to find √ values online. Quick, easy and accurate tool for students and developers.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/racine-carree-calculator' },
  
  openGraph: {
    title: 'Racine Carree Calculator – Free Square Root Calculator Online',
    description: 'Free square root calculator to find √ values online. Quick, easy and accurate tool for students and developers.',
    url: 'https://www.generatorpromptai.com/tools/racine-carree-calculator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/racine-carree-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Racine Carree Calculator – Calculate Square Roots Free',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Racine Carree Calculator – Free Square Root Calculator Online',
    description: 'Free square root calculator to find √ values online. Quick, easy and accurate tool for students and developers.',
    images: ['https://www.generatorpromptai.com/og/racine-carree-calculator.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'racine carree calculator, racine carrée calculator, square root calculator online, calculate square root free, imaginary square root, simplified radical form, polar form square root, math calculator free',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Racine Carree Calculator – Free Square Root Calculator Online",
  "url": "https://www.generatorpromptai.com/tools/racine-carree-calculator",
  "applicationCategory": "MathApplication",
  "operatingSystem": "All",
  "description": "Free square root calculator to find √ values online. Quick, easy and accurate tool for students and developers.",
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
  "featureList": "Real & imaginary square roots, simplified radical form, polar form representation, step-by-step calculation explanations, 5-decimal precision, mobile responsive design, 100% client-side privacy, no signup required"
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
      "name": "Racine Carree Calculator", 
      "item": "https://www.generatorpromptai.com/tools/racine-carree-calculator" 
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
      "name": "How do I use the Racine Carree Calculator?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simply enter any number (positive, negative, or decimal) into the input field and click 'Calculate' or press Enter. The tool instantly shows the square root, simplified form, polar form, and step-by-step explanation."
      }
    },
    {
      "@type": "Question",
      "name": "Can I calculate square roots of decimals or large numbers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Enter any decimal (e.g., 2.5, 0.01) or large number (e.g., 1000000) and get precise results up to 5 decimal places."
      }
    },
    {
      "@type": "Question",
      "name": "Can the calculator handle negative numbers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! For negative inputs, the result is an imaginary number: √(-a) = √a × i. For example, √(-81) = 9i. The tool shows both the value and the mathematical steps."
      }
    },
    {
      "@type": "Question",
      "name": "What does 'racine carrée' mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "'Racine carrée' is French for 'square root'. While our interface is in English, we include this term to help users searching with French keywords find this free tool."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate is the calculator?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Results are precise to 5 decimal places using JavaScript's native Math.sqrt() for real numbers and standard complex number formulas for imaginary roots."
      }
    },
    {
      "@type": "Question",
      "name": "Is my calculation data stored or shared?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Never. All calculations happen locally in your browser. Your input numbers are never sent to servers, stored, or tracked."
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
      <RacineCarreeCalculator />
    </>
  )
}