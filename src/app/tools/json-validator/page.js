import JsonValidator from './JsonValidator'

export const metadata = {
  title: 'Check If JSON Is Valid Online with Line and Column Number – Free Syntax Checker',
  description: 'Free online JSON validator to check syntax correctness with exact line and column error positions. Real-time validation. 100% browser-based, no data sent to server. No signup.',
  keywords: 'how to check if json is valid online free, validate json with line and column number online, json syntax error checker with exact position, check json validity without uploading to server, free online json lint tool no sign up, debug json syntax errors free tool, find missing comma in json online, json validation tool for api responses, check if api response is valid json free, online json validator for large files free',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/json-validator',
  },
  openGraph: {
    type: 'website',
    siteName: 'GeneratorPromptAI',
    title: 'Check If JSON Is Valid Online – Free JSON Syntax Checker',
    description: 'Validate JSON with exact line/column error positions. Real-time checking. Free, private, no signup.',
    url: 'https://www.generatorpromptai.com/tools/json-validator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free JSON Validator – Check Syntax with Line & Column',
    description: 'Validate JSON instantly with exact error positions. Free and private.',
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
}

// ── JSON-LD Schemas ──
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Check If JSON Is Valid Online with Line and Column Number – Free Syntax Checker",
  "url": "https://www.generatorpromptai.com/tools/json-validator",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "All",
  "description": "Free online JSON validator to check syntax correctness with exact line and column error positions. Real-time validation runs entirely in your browser — no data sent to any server.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "JSON Validator", "item": "https://www.generatorpromptai.com/tools/json-validator" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to check if JSON is valid online with line and column number?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste your JSON into our validator and it automatically checks syntax in real-time. If the JSON is invalid, the tool shows the exact error message along with the precise line and column number where the problem occurs."
      }
    },
    {
      "@type": "Question",
      "name": "What does Invalid JSON mean and how to fix it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Invalid JSON means the text does not follow strict JSON syntax rules. Common causes include missing commas between key-value pairs, extra trailing commas at the end of arrays or objects, single quotes instead of double quotes, and unmatched curly braces or square brackets."
      }
    },
    {
      "@type": "Question",
      "name": "Is my JSON data sent to a server when I validate it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The validation runs entirely inside your browser using native JavaScript. Your data never leaves your device, making it completely safe for validating API responses that contain sensitive information like tokens and keys."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between JSON Validator and JSON Formatter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A JSON Validator only checks whether the syntax is correct or not. A JSON Formatter does the same check but also re-indents and spaces the JSON to make it easily readable by humans."
      }
    },
    {
      "@type": "Question",
      "name": "Can I validate large JSON files online for free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Since the validation runs in your browser without server limits, it can handle large JSON payloads. Performance depends on your device, but most files validate instantly."
      }
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
      <JsonValidator />
    </>
  )
}