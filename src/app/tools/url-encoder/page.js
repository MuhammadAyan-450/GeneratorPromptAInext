import URLEncoder from './UrlEncoder'

// ✅ SEO Metadata — Title: 59 chars, Description: 158 chars
export const metadata = {
  title: 'URL Encoder / Decoder – Free Percent Encoding Tool Online',
  
  description: 'Encode or decode URLs instantly with free percent encoding tool. Fast, simple and easy online utility for developers.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/url-encoder' },
  
  openGraph: {
    title: 'URL Encoder / Decoder – Free Percent Encoding Tool Online',
    description: 'Encode or decode URLs instantly with free percent encoding tool. Fast, simple and easy online utility for developers.',
    url: 'https://www.generatorpromptai.com/tools/url-encoder',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/url-encoder.png',
        width: 1200,
        height: 630,
        alt: 'URL Encoder / Decoder – Encode URLs Free',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'URL Encoder / Decoder – Free Percent Encoding Tool Online',
    description: 'Encode or decode URLs instantly with free percent encoding tool. Fast, simple and easy online utility for developers.',
    images: ['https://www.generatorpromptai.com/og/url-encoder.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'url encoder, url decoder, percent encoding tool, encode url special characters, decode percent encoded url, free url encoder online, api query parameter encoder, javascript urlencode, no signup url encoder, developer url tools',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "URL Encoder / Decoder – Free Percent Encoding Tool Online",
  "url": "https://www.generatorpromptai.com/tools/url-encoder",
  "applicationCategory": "DeveloperTools",
  "operatingSystem": "All",
  "description": "Encode or decode URLs instantly with free percent encoding tool. Fast, simple and easy online utility for developers.",
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
  "featureList": "Bidirectional encode/decode, encodeURIComponent for maximum safety, real-time char count stats, error handling, copy-to-clipboard and download .txt, 100% client-side privacy, no signup required"
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
      "name": "URL Encoder / Decoder", 
      "item": "https://www.generatorpromptai.com/tools/url-encoder" 
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
    },
    {
      "@type": "Question",
      "name": "Is my URL data stored or shared?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Never. All processing happens locally in your browser. Your URL inputs are never sent to servers, stored, or tracked."
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
      <URLEncoder />
    </>
  )
}