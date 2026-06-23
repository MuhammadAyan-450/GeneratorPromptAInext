import UnixTimestamp from './UnixTimestamp'

// ✅ SEO Metadata — Title: 59 chars, Description: 158 chars
export const metadata = {
  title: 'Unix Timestamp Converter – Free Epoch Time to Human Date Tool',
  
  description: 'Free Unix timestamp converter to convert epoch time into readable date and time. Fast and easy online developer tool.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/unix-timestamp' },
  
  openGraph: {
    title: 'Unix Timestamp Converter – Free Epoch Time to Human Date Tool',
    description: 'Free Unix timestamp converter to convert epoch time into readable date and time. Fast and easy online developer tool.',
    url: 'https://www.generatorpromptai.com/tools/unix-timestamp',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/unix-timestamp.png',
        width: 1200,
        height: 630,
        alt: 'Unix Timestamp Converter – Convert Epoch Time Free',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Unix Timestamp Converter – Free Epoch Time to Human Date Tool',
    description: 'Free Unix timestamp converter to convert epoch time into readable date and time. Fast and easy online developer tool.',
    images: ['https://www.generatorpromptai.com/og/unix-timestamp.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'unix timestamp converter, epoch time converter, convert unix timestamp to date, convert date to unix timestamp, live unix clock, epoch seconds to date, year 2038 problem calculator, free unix timestamp tool, developer time converter, no signup epoch converter',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Unix Timestamp Converter – Free Epoch Time to Human Date Tool",
  "url": "https://www.generatorpromptai.com/tools/unix-timestamp",
  "applicationCategory": "DeveloperTools",
  "operatingSystem": "All",
  "description": "Free Unix timestamp converter to convert epoch time into readable date and time. Fast and easy online developer tool.",
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
  "featureList": "Live Unix clock (updates every second), bidirectional conversion (timestamp ↔ date), epoch stats dashboard, copy-to-clipboard and download .txt, 100% client-side privacy, no signup required"
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
      "name": "Unix Timestamp Converter", 
      "item": "https://www.generatorpromptai.com/tools/unix-timestamp" 
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
      "name": "How to convert Unix timestamp to human readable date online free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste the Unix timestamp (epoch seconds) into the 'Unix Timestamp to Date' input and click Convert. The tool shows the full human-readable date and time in your browser's local timezone."
      }
    },
    {
      "@type": "Question",
      "name": "What is a Unix timestamp and why does it start from 1970?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Unix timestamp (epoch time) is the number of seconds elapsed since January 1, 1970 at 00:00:00 UTC. This date is called the Unix Epoch and was chosen as the standard reference point for Unix operating systems."
      }
    },
    {
      "@type": "Question",
      "name": "Is Unix timestamp affected by timezone?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Unix timestamps are always in UTC and are timezone-agnostic. However, when converting to a readable date, the result is displayed in your browser's local timezone for convenience."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between seconds and milliseconds timestamp?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard Unix timestamps are in seconds. Some systems like JavaScript's Date.now() use milliseconds. To convert milliseconds to seconds, divide by 1000. To convert seconds to milliseconds, multiply by 1000."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Year 2038 problem in Unix timestamps?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "32-bit signed Unix timestamps will overflow on January 19, 2038 at 03:14:07 UTC (timestamp 2147483647). Most modern 64-bit systems are not affected. This tool uses 64-bit integers and works correctly far beyond 2038."
      }
    },
    {
      "@type": "Question",
      "name": "Is my timestamp data stored or shared?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Never. All calculations happen locally in your browser. Your inputs are never sent to servers, stored, or tracked."
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
      <UnixTimestamp />
    </>
  )
}