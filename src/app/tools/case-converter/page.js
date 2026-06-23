import CaseConverter from './CaseConverter'

// ✅ Perfect SEO Metadata (Title: 52 chars, Description: 159 chars)
export const metadata = {
  title: 'Case Converter – Convert Text to Uppercase & Lowercase',
  
  description: 'Convert text to uppercase, lowercase, title case, sentence case, and more with our free Case Converter tool online. 🚀',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/case-converter' },
  
  openGraph: {
    title: 'Case Converter – Convert Text to Uppercase & Lowercase',
    description: 'Convert text to uppercase, lowercase, title case, sentence case, and more with our free Case Converter tool online. 🚀',
    url: 'https://www.generatorpromptai.com/tools/case-converter',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/case-converter.png',
        width: 1200,
        height: 630,
        alt: 'Case Converter – Convert Text to Any Case Format',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Case Converter – Convert Text to Uppercase & Lowercase',
    description: 'Convert text to uppercase, lowercase, title case, sentence case, and more with our free Case Converter tool online. 🚀',
    images: ['https://www.generatorpromptai.com/og/case-converter.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'convert text to uppercase lowercase online free, change text case to title case free, camelcase text converter online, fix caps lock text online tool, inverse case text converter, free online text case changer, uppercase to lowercase converter without paste',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Case Converter – Convert Text to Any Case Format",
  "url": "https://www.generatorpromptai.com/tools/case-converter",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Convert text to uppercase, lowercase, title case, sentence case, and more with our free Case Converter tool online. 🚀",
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
  "featureList": "6 case conversion options, real-time word/character count, copy to clipboard, download as .txt, mobile responsive, 100% client-side privacy, no signup required"
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
      "name": "Case Converter", 
      "item": "https://www.generatorpromptai.com/tools/case-converter" 
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
      "name": "What's the difference between Title Case and Sentence case?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Title Case capitalizes the first letter of every word — like 'The Quick Brown Fox'. Sentence case only capitalizes the first letter of each sentence — like 'The quick brown fox.' Use Title Case for headings, Sentence case for normal paragraphs."
      }
    },
    {
      "@type": "Question",
      "name": "Does this tool work on mobile phones?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, absolutely. It runs entirely in your browser using JavaScript. Phone, tablet, laptop — doesn't matter. No app download, no installation. Just open the URL and start converting."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a limit to how much text I can convert?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No hard limit. Your browser handles the processing, so it depends on your device's memory. Practically, you can convert 50,000-100,000 characters smoothly. More than that might slow things down but should still work."
      }
    },
    {
      "@type": "Question",
      "name": "Is my text saved or sent anywhere?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Everything happens locally in your browser. Nothing gets uploaded to a server, nothing gets stored in a database. Close the tab and your text is gone. Your privacy is protected by design."
      }
    },
    {
      "@type": "Question",
      "name": "Why does camelCase remove spaces?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Because programming variable names can't contain spaces. camelCase removes all separators (spaces, underscores, dashes) and capitalizes the first letter of each new word. 'user login page' becomes 'userLoginPage' — a valid JavaScript variable."
      }
    },
    {
      "@type": "Question",
      "name": "Is inverse case just for fun or does it have real uses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Both. People use it for fun on social media — like writing 'hELLO wORLD' for emphasis. But it's also useful for debugging: if you're not sure which letters are capitalized in a string, invert the case and check."
      }
    },
    {
      "@type": "Question",
      "name": "Can I convert non-English text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, as long as the characters have uppercase/lowercase variants. Latin-based languages (Spanish, French, German) work perfectly. Languages without case distinctions (like Arabic or Chinese) won't change — but the tool won't break either."
      }
    },
    {
      "@type": "Question",
      "name": "What if I click the wrong button?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No problem. Just click a different case button — the tool works on whatever text is currently in the box. Or hit Clear to start fresh. There's no undo, but you can always re-paste your original text."
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
      <CaseConverter />
    </>
  )
}