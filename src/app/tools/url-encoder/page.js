import URLEncoder from './URLEncoder'

export const metadata = {
  title: 'Encode URL Special Characters Online Free – Percent Encoding Decoder Tool',
  description: 'Free online URL encoder and decoder. Convert special characters to percent-encoded format and back. Safe for query params, APIs, and web transmission. No signup required.',
  keywords: "how to encode url special characters online free, percent encoding decoder tool free no signup, encode decode url query parameters online, convert space to percent twenty in url free tool, url encode decode for api requests free online, what is url encoding percent encoding explained, free online urlencode urldecode javascript tool, encode special characters in url for seo free, fix malformed url encoded characters online free, best free url encoder decoder with copy download 2026",
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/url-encoder',
  },
  openGraph: {
    title: 'Encode URL Special Characters Free – Percent Encoding & Decoder',
    description: 'Convert URLs to percent-encoded format and back. Safe for query params and APIs. Free, no signup.',
    url: 'https://www.generatorpromptai.com/tools/url-encoder',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free URL Encoder / Decoder – Percent Encoding Tool',
    description: 'Encode and decode URLs instantly. Percent-encode special characters. Free online developer tool.',
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
  "name": "Encode URL Special Characters Online Free – Percent Encoding Decoder Tool",
  "url": "https://www.generatorpromptai.com/tools/url-encoder",
  "applicationCategory": "DeveloperTools",
  "operatingSystem": "All",
  "description": "Free online URL encoder and decoder. Convert special characters to percent-encoded format and back. Safe for query params, APIs, and web transmission. No signup required.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "URL Encoder / Decoder", "item": "https://www.generatorpromptai.com/tools/url-encoder" }
  ]
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to encode URL special characters online free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste your URL or text into the input area and click 'Encode URL'. The tool converts all unsafe characters (spaces, ?, &, =, etc.) into percent-encoded format (e.g. space becomes %20). Copy or download the result."
      }
    },
    {
      "@type": "Question",
      "name": "What is URL encoding or percent encoding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "URL encoding (percent encoding) converts unsafe ASCII characters into a % followed by two hexadecimal digits so they can be safely transmitted over the Internet. For example, a space becomes %20, ? becomes %3F, and & becomes %26."
      }
    },
    {
      "@type": "Question",
      "name": "When should I URL-encode a string?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use URL encoding whenever you pass user input as part of a URL query parameter — like search queries, form data, or API request parameters. This prevents browsers from misinterpreting special characters."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between encodeURI and encodeURIComponent?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "encodeURI() encodes characters not allowed in a full URL but leaves URL structure characters like /, :, ?, &, = intact. encodeURIComponent() encodes ALL special characters including these — making it safe for query parameter values. Our tool uses encodeURIComponent for maximum safety."
      }
    },
    {
      "@type": "Question",
      "name": "How to decode a percent-encoded URL back to readable text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste the encoded URL (e.g. 'hello%20world%3F') into the input area and click 'Decode URL'. The tool converts all %XX sequences back to their original characters (e.g. 'hello world?')."
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
      
      <URLEncoder />
    </>
  )
}