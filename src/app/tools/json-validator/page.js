import JsonValidator from './JsonValidator'

// ✅ SEO Metadata (Title: 57 chars, Description: 159 chars)
export const metadata = {
  title: 'Free JSON Validator – Check Syntax with Line Numbers',
  
  description: 'Free JSON validator to check syntax errors with line numbers. Debug and fix JSON quickly with easy online tool.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/json-validator' },
  
  openGraph: {
    title: 'Free JSON Validator – Check Syntax with Line Numbers',
    description: 'Free JSON validator to check syntax errors with line numbers. Debug and fix JSON quickly with easy online tool.',
    url: 'https://www.generatorpromptai.com/tools/json-validator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/json-validator.png',
        width: 1200,
        height: 630,
        alt: 'JSON Validator – Check JSON Syntax with Exact Error Position',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Free JSON Validator – Check Syntax with Line Numbers',
    description: 'Free JSON validator to check syntax errors with line numbers. Debug and fix JSON quickly with easy online tool.',
    images: ['https://www.generatorpromptai.com/og/json-validator.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'json validator, check json online, validate json syntax, json syntax checker, json error detection, line column error, browser json validator, free json tool, api json validator, json parser',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JSON Validator – Check JSON Syntax Online Free with Line Number",
  "url": "https://www.generatorpromptai.com/tools/json-validator",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "All",
  "description": "Free JSON validator to check syntax errors with line numbers. Debug and fix JSON quickly with easy online tool.",
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
  "featureList": "Real-time validation with Auto mode, exact line and column error position for invalid JSON, structure stats (keys, depth, chars, lines), copy to clipboard or clear input, Ctrl+Enter shortcut for manual validation, 100% client-side processing with native JSON.parse(), no signup required"
}

// ─── JSON-LD: BreadcrumbList Schema ─────────────────────────────────────────
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "JSON Validator", "item": "https://www.generatorpromptai.com/tools/json-validator" }
  ]
}

// ─── JSON-LD: FAQPage Schema ────────────────────────────────────────────────
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to check if JSON is valid online with line and column number?",
      "acceptedAnswer": { "@type": "Answer", "text": "Paste your JSON into our validator and it automatically checks syntax in real-time. If invalid, the tool shows the exact error message along with the precise line and column number." }
    },
    {
      "@type": "Question",
      "name": "What does Invalid JSON mean and how to fix it?",
      "acceptedAnswer": { "@type": "Answer", "text": "Invalid JSON means the text does not follow strict JSON syntax rules. Common causes include missing commas, extra trailing commas, single quotes instead of double quotes, and unmatched brackets." }
    },
    {
      "@type": "Question",
      "name": "Is my JSON data sent to a server when I validate it?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. The validation runs entirely inside your browser using native JavaScript. Your data never leaves your device." }
    },
    {
      "@type": "Question",
      "name": "What is the difference between JSON Validator and JSON Formatter?",
      "acceptedAnswer": { "@type": "Answer", "text": "A JSON Validator only checks whether the syntax is correct. A JSON Formatter does the same check but also re-indents the JSON to make it readable." }
    },
    {
      "@type": "Question",
      "name": "Can I validate large JSON files online for free?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Since the validation runs in your browser without server limits, it can handle large JSON payloads. Performance depends on your device." }
    },
    {
      "@type": "Question",
      "name": "Does this tool support JSON5 or other extensions?",
      "acceptedAnswer": { "@type": "Answer", "text": "This tool follows the official JSON specification (RFC 8259). It does not support JSON5 features like comments or trailing commas. For strict JSON validation, this is the correct tool to use." }
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
      <JsonValidator />
    </>
  )
}