import UUIDGenerator from './UUIDGenerator'

// ✅ SEO Metadata — Title: 59 chars, Description: 158 chars
export const metadata = {
  title: 'UUID Generator – Free Random v4 Unique Identifier Maker Online',
  
  description: 'Generate random UUID v4 instantly with free online tool. Create unique identifiers for apps, databases and development.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/uuid-generator' },
  
  openGraph: {
    title: 'UUID Generator – Free Random v4 Unique Identifier Maker Online',
    description: 'Generate random UUID v4 instantly with free online tool. Create unique identifiers for apps, databases and development.',
    url: 'https://www.generatorpromptai.com/tools/uuid-generator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/uuid-generator.png',
        width: 1200,
        height: 630,
        alt: 'UUID Generator – Create Unique IDs Free',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'UUID Generator – Free Random v4 Unique Identifier Maker Online',
    description: 'Generate random UUID v4 instantly with free online tool. Create unique identifiers for apps, databases and development.',
    images: ['https://www.generatorpromptai.com/og/uuid-generator.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'uuid generator, uuid v4 generator, bulk uuid generator, unique identifier maker, guid generator, random uuid online, no hyphen uuid, uppercase uuid, crypto secure uuid, developer id tools',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "UUID Generator – Free Random v4 Unique Identifier Maker Online",
  "url": "https://www.generatorpromptai.com/tools/uuid-generator",
  "applicationCategory": "DeveloperTools",
  "operatingSystem": "All",
  "description": "Generate random UUID v4 instantly with free online tool. Create unique identifiers for apps, databases and development.",
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
  "featureList": "Bulk generation (up to 5000), cryptographically secure via crypto API, uppercase and no-hyphen formats, copy-to-clipboard and download .txt, 100% client-side privacy, no signup required"
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
      "name": "UUID Generator", 
      "item": "https://www.generatorpromptai.com/tools/uuid-generator" 
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
      "name": "How to generate a random UUID v4 online free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Set the quantity (default 1), optionally check Uppercase or Remove Hyphens, then click Generate UUID. The tool uses the browser's crypto.randomUUID() API for cryptographically secure random generation. Copy or download the result."
      }
    },
    {
      "@type": "Question",
      "name": "What is a UUID and is it truly unique?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A UUID (Universally Unique Identifier) is a 128-bit number. Version 4 UUIDs are randomly generated. While collisions are theoretically possible, the probability is so infinitesimally small (1 in 2^122) that they are considered practically unique for all real-world use cases."
      }
    },
    {
      "@type": "Question",
      "name": "Can I generate multiple UUIDs at once for database seeding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Set the quantity field to the number you need (up to 5000) and click Generate. All UUIDs appear one per line, ready to copy or download as a .txt file for direct use in SQL INSERT statements or seed scripts."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between UUID and GUID?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Functionally they are the same. UUID is the standard term (RFC 4122), while GUID (Globally Unique Identifier) is Microsoft's terminology. Version 4 UUIDs and GUIDs have identical structure — 32 hex digits in 5 groups separated by hyphens."
      }
    },
    {
      "@type": "Question",
      "name": "Why would I remove hyphens from a UUID?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Some systems, APIs, and databases require IDs without hyphens — a continuous 32-character hex string (e.g. 550e8400e29b41d4a716446655440000). Check \"Remove Hyphens\" to generate this compact format."
      }
    },
    {
      "@type": "Question",
      "name": "Is my generated UUID data stored or shared?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Never. All generation happens locally in your browser using the native crypto API. Your UUIDs are never sent to servers, stored, or tracked."
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
      <UUIDGenerator />
    </>
  )
}