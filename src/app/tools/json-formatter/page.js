import JsonFormatter from './JsonFormatter'

// ✅ SEO Metadata (Title: 58 chars, Description: 159 chars)
export const metadata = {
  title: 'Free JSON Formatter – Beautify, Minify & Validate JSON',
  
  description: 'Free JSON formatter to beautify, minify and validate JSON code. Clean, fast and simple online tool for developers.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/json-formatter' },
  
  openGraph: {
    title: 'Free JSON Formatter – Beautify, Minify & Validate JSON',
    description: 'Free JSON formatter to beautify, minify and validate JSON code. Clean, fast and simple online tool for developers.',
    url: 'https://www.generatorpromptai.com/tools/json-formatter',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/json-formatter.png',
        width: 1200,
        height: 630,
        alt: 'JSON Formatter – Beautify Minify Validate JSON Code',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Free JSON Formatter – Beautify, Minify & Validate JSON',
    description: 'Free JSON formatter to beautify, minify and validate JSON code. Clean, fast and simple online tool for developers.',
    images: ['https://www.generatorpromptai.com/og/json-formatter.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'json formatter, json beautifier, json minifier, json validator, format json online, fix json errors, syntax highlight json, browser json tool, pretty print json, json parser',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JSON Formatter – Beautify Minify Validate JSON Online Free",
  "url": "https://www.generatorpromptai.com/tools/json-formatter",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "All",
  "description": "Free JSON formatter to beautify, minify and validate JSON code. Clean, fast and simple online tool for developers.",
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
  "featureList": "Syntax highlighting with color-coded tokens, exact line/column error position for invalid JSON, pretty print and minified output toggle, real-time stats (keys, depth, chars, lines), auto-format on typing, copy to clipboard or download as .json file, 100% client-side processing, no signup required"
}

// ─── JSON-LD: BreadcrumbList Schema ─────────────────────────────────────────
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "JSON Formatter", "item": "https://www.generatorpromptai.com/tools/json-formatter" }
  ]
}

// ─── JSON-LD: FAQPage Schema ────────────────────────────────────────────────
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to fix JSON formatting errors online?",
      "acceptedAnswer": { "@type": "Answer", "text": "Paste your broken JSON into our formatter. If there is a syntax error, the tool will show the exact issue with the line and column number where it is invalid, such as a missing comma, extra comma, or unclosed quote. Fix the error in the input editor and the output updates in real-time." }
    },
    {
      "@type": "Question",
      "name": "How to minify JSON for production API?",
      "acceptedAnswer": { "@type": "Answer", "text": "Paste your JSON, click the Minified toggle, and the tool removes all unnecessary whitespace and line breaks to produce the smallest possible file size. Copy or download the minified JSON for use in production APIs and web applications." }
    },
    {
      "@type": "Question",
      "name": "Is my JSON data safe in this formatter?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, 100% safe. Our JSON formatter runs entirely in your browser using JavaScript. Your data is never sent to any server, making it completely private and secure. This is important when formatting JSON that contains API keys, tokens, or sensitive data." }
    },
    {
      "@type": "Question",
      "name": "What is the difference between pretty print and minified JSON?",
      "acceptedAnswer": { "@type": "Answer", "text": "Pretty Print adds indentation and line breaks to make JSON readable for humans. Minified JSON removes all unnecessary whitespace to produce the smallest possible file size, which is ideal for production APIs, reducing bandwidth and improving load times." }
    },
    {
      "@type": "Question",
      "name": "Can I format very large JSON files online?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Because the tool runs entirely in your browser without server-side processing limits, it can handle large JSON arrays and nested objects smoothly without timing out. Very large files may be slightly slower depending on your device." }
    },
    {
      "@type": "Question",
      "name": "Does this tool support JSON5 or other extensions?",
      "acceptedAnswer": { "@type": "Answer", "text": "This tool follows the official JSON specification (RFC 8259). It does not support JSON5 features like comments or trailing commas. For strict JSON validation and formatting, this is the correct tool to use." }
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
      <JsonFormatter />
    </>
  )
}