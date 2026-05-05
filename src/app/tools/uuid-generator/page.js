import UUIDGenerator from './UUIDGenerator'

export const metadata = {
  title: 'Generate Random UUID v4 Online Free – Bulk Unique Identifier Maker No Hyphens',
  description: 'Free online UUID v4 generator. Create unique 128-bit identifiers instantly. Bulk generation up to 5000, uppercase, no-hyphen formats. Uses cryptographically secure crypto API. No signup.',
  keywords: 'how to generate random uuid v4 online free, bulk uuid generator 5000 ids at once free, create unique identifier for database keys free tool, uuid generator without hyphens 32 character hex string, generate uppercase uuid for api keys free online, free online guid generator for developers no signup, uuid v4 generator cryptographically secure random, generate multiple uuids for database seeding free, best free uuid generator with download txt format 2026, random unique id maker for session tokens primary keys free',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/uuid-generator',
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  openGraph: {
    type: 'website',
    siteName: 'GeneratorPromptAI',
    title: 'Generate Random UUID v4 Free – Bulk Unique ID Maker | No Hyphens',
    description: 'Generate unique UUID v4 identifiers instantly. Bulk up to 5000, uppercase, no-hyphen. Cryptographically secure. Free.',
    url: 'https://www.generatorpromptai.com/tools/uuid-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free UUID v4 Generator – Bulk Unique Identifiers',
    description: 'Generate random UUIDs instantly. Bulk generation, uppercase, no-hyphens. Free developer tool.',
  },
}

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Generate Random UUID v4 Online Free – Bulk Unique Identifier Maker No Hyphens",
  "url": "https://www.generatorpromptai.com/tools/uuid-generator",
  "applicationCategory": "DeveloperTools",
  "operatingSystem": "All",
  "description": "Free online UUID v4 generator. Create unique 128-bit identifiers instantly. Bulk generation up to 5000, uppercase, no-hyphen formats. Uses cryptographically secure crypto API. No signup.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "UUID Generator", "item": "https://www.generatorpromptai.com/tools/uuid-generator" }
  ]
}

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
        "text": "A UUID (Universally Unique Identifier) is a 128-bit number. Version 4 UUIDs are randomly generated. While collisions are theoretically possible, the probability is so infinitesimally small (1 in 2^122) that they are considered practically unique."
      }
    },
    {
      "@type": "Question",
      "name": "Can I generate multiple UUIDs at once for database seeding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Set the quantity field to the number of UUIDs you need (up to 5000) and click Generate. All UUIDs will appear in the output block, one per line, ready to copy or download as a .txt file for database seeding."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between UUID and GUID?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Functionally they are the same. UUID is the standard term (RFC 4122), while GUID (Globally Unique Identifier) is Microsoft's term. Version 4 UUIDs and GUIDs have identical structure — 32 hex digits in 5 groups separated by hyphens."
      }
    },
    {
      "@type": "Question",
      "name": "Why would I remove hyphens from a UUID?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Some systems, APIs, and databases require IDs without hyphens — a continuous 32-character hex string (e.g. 550e8400e29b41d4a716446655440000). Our tool generates this format when 'Remove Hyphens' is checked."
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
      <UUIDGenerator />
    </>
  )
}