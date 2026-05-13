import CurrencyConverter from './CurrencyConverter'

export const metadata = {
  title: 'USD to PKR Rate Today – Live Dollar to PKR Calculator',
  description: 'Convert USD to PKR instantly with our live currency calculator. Check real-time USD to PKR exchange rates, currency conversion, and latest dollar prices online.',
  keywords: 'convert usd to pkr online with live exchange rate, 1 dollar to pkr today live rate calculator, aed to pkr conversion calculator live, how much is 1000 aed in pkr today, sar to pkr live rate converter, gbp to pkr exchange rate today calculator, live currency exchange rate calculator for pkr',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/currency-converter',
  },
  openGraph: {
    title: 'USD to PKR Rate Today – Live Dollar to PKR Calculator',
    description: 'Convert USD to PKR instantly with our live currency calculator. Check real-time USD to PKR exchange rates, currency conversion, and latest dollar prices online.',
    url: 'https://www.generatorpromptai.com/tools/currency-converter',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USD to PKR Rate Today – Live Dollar to PKR Calculator',
    description: 'Convert USD to PKR instantly with our live currency calculator. Check real-time USD to PKR exchange rates, currency conversion, and latest dollar prices online.',
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
  "name": "Convert USD to PKR Online with Live Exchange Rate",
  "url": "https://www.generatorpromptai.com/tools/currency-converter",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "description": "Convert USD to PKR instantly with our live currency calculator. Check real-time USD to PKR exchange rates, currency conversion, and latest dollar prices online.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Currency Converter", "item": "https://www.generatorpromptai.com/tools/currency-converter" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is 1 dollar to PKR today live rate?",
      "acceptedAnswer": { "@type": "Answer", "text": "The live 1 USD to PKR rate is shown at the top of this page. It automatically refreshes every 60 seconds to ensure you are seeing the most accurate, real-time market exchange rate." }
    },
    {
      "@type": "Question",
      "name": "How much is 1000 AED in PKR today?",
      "acceptedAnswer": { "@type": "Answer", "text": "To find out how much 1000 AED is in PKR today, click the 'AED → PKR' quick pair button and type 1000 in the amount box. The exact live conversion will be displayed instantly." }
    },
    {
      "@type": "Question",
      "name": "How to convert USD to PKR online with live exchange rate?",
      "acceptedAnswer": { "@type": "Answer", "text": "Simply enter the USD amount in our converter, make sure 'From' is set to USD and 'To' is set to PKR. The tool automatically calculates the live conversion using real-time market rates." }
    },
    {
      "@type": "Question",
      "name": "Is this AED to PKR conversion calculator free?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, 100% free. There are no hidden fees, no sign-ups, and no limits. You can convert AED to PKR, SAR to PKR, or any other currency as many times as you want." }
    }
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