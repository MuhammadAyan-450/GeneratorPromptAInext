import CaseConverter from './CaseConverter'

export const metadata = {
  title: 'Case Converter | Convert Uppercase To Lowercase & More',
  description: 'Transform your text to any case—UPPERCASE, lowercase, Title Case, and more—with our free online converter. Quick, easy, and no signup required',
  keywords: 'convert text to uppercase lowercase title case online, change text case to sentence case free, camelcase text converter online free, fix caps lock text online tool, inverse case text converter, free online text case changer, uppercase to lowercase converter without paste',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/case-converter',
  },
  openGraph: {
    title: 'Case Converter | Convert Uppercase To Lowercase & More',
    description: 'Transform your text to any case—UPPERCASE, lowercase, Title Case, and more—with our free online converter. Quick, easy, and no signup required',
    url: 'https://www.generatorpromptai.com/tools/case-converter',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Converter | Convert Uppercase To Lowercase & More',
    description: 'Transform your text to any case—UPPERCASE, lowercase, Title Case, and more—with our free online converter. Quick, easy, and no signup required',
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
  "name": "Convert Text to Uppercase Lowercase Title Case Online",
  "url": "https://www.generatorpromptai.com/tools/case-converter",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Transform your text to any case—UPPERCASE, lowercase, Title Case, and more—with our free online converter. Quick, easy, and no signup required",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Case Converter", "item": "https://www.generatorpromptai.com/tools/case-converter" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to change text to Title Case online?",
      "acceptedAnswer": { "@type": "Answer", "text": "Paste your text into the tool above and click the 'Title Case' button. It will automatically capitalize the first letter of every word, which is perfect for headings and titles." }
    },
    {
      "@type": "Question",
      "name": "How to fix caps lock text online?",
      "acceptedAnswer": { "@type": "Answer", "text": "If you accidentally typed something with caps lock on, paste it into our tool and click 'lowercase' to instantly convert it back to normal text. You can also use 'Sentence case' to fix it properly." }
    },
    {
      "@type": "Question",
      "name": "How to convert text to camelCase for programming?",
      "acceptedAnswer": { "@type": "Answer", "text": "Paste your text with spaces or underscores into the tool and click 'camelCase'. It will remove spaces, lowercase the first word, and capitalize the first letter of each subsequent word (e.g., 'my variable name' becomes 'myVariableName')." }
    },
    {
      "@type": "Question",
      "name": "Is my text saved when I use this converter?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. All text conversion happens locally in your web browser using JavaScript. We do not store, save, or transmit your text to any server." }
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
      <CaseConverter />
    </>
  )
}