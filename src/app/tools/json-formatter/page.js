import JsonFormatter from './JsonFormatter'

export const metadata = {
  title: 'Fix JSON Formatting Errors Online – Free Beautify Minify Validate Tool',
  description: 'Free online JSON formatter to beautify, minify and validate JSON with real-time error detection showing exact line and column. Syntax highlighted output. Copy and download. No signup.',
  keywords: 'how to fix json formatting errors online, fix json syntax error with line and column number, minify json for production api free online, beautify json with syntax highlighting free tool, validate json online without uploading to server, pretty print json for readability free, json error checker with exact position free online, format large json files online free, free json formatter no sign up required, online json validator with line number',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/json-formatter',
  },
  openGraph: {
    type: 'website',
    siteName: 'GeneratorPromptAI',
    title: 'Fix JSON Formatting Errors Online – Free Beautify Minify Validate Tool',
    description: 'Beautify, minify, validate JSON with real-time line/column error detection. Syntax highlighted output. Free, private, no signup.',
    url: 'https://www.generatorpromptai.com/tools/json-formatter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free JSON Formatter – Fix Errors, Beautify, Minify Online',
    description: 'Format and debug JSON with exact error positions. Syntax highlighted output. Free and private.',
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
}

// ── JSON-LD Schemas ──
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Fix JSON Formatting Errors Online – Free Beautify Minify Validate Tool",
  "url": "https://www.generatorpromptai.com/tools/json-formatter",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "All",
  "description": "Free online JSON formatter to beautify, minify and validate JSON with real-time error detection showing exact line and column. Syntax highlighted output, copy and download.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "JSON Formatter", "item": "https://www.generatorpromptai.com/tools/json-formatter" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to fix JSON formatting errors online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste your broken JSON into our formatter. If there is a syntax error, the tool will show the exact issue with the line and column number where it is invalid, such as a missing comma, extra comma, or unclosed quote. Fix the error in the input editor and the output updates in real-time."
      }
    },
    {
      "@type": "Question",
      "name": "How to minify JSON for production API?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste your JSON, click the Minified toggle, and the tool removes all unnecessary whitespace and line breaks to produce the smallest possible file size. Copy or download the minified JSON for use in production APIs and web applications."
      }
    },
    {
      "@type": "Question",
      "name": "Is my JSON data safe in this formatter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, 100% safe. Our JSON formatter runs entirely in your browser using JavaScript. Your data is never sent to any server, making it completely private and secure. This is important when formatting JSON that contains API keys, tokens, or sensitive data."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between pretty print and minified JSON?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pretty Print adds indentation and line breaks to make JSON readable for humans. Minified JSON removes all unnecessary whitespace to produce the smallest possible file size, which is ideal for production APIs, reducing bandwidth and improving load times."
      }
    },
    {
      "@type": "Question",
      "name": "Can I format very large JSON files online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Because the tool runs entirely in your browser without server-side processing limits, it can handle large JSON arrays and nested objects smoothly without timing out. Very large files may be slightly slower depending on your device."
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
      <JsonFormatter />
    </>
  )
}