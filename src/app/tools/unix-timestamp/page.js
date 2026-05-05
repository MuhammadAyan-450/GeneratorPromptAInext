import UnixTimestamp from './UnixTimestamp'

export const metadata = {
  title: 'Convert Unix Timestamp to Human Readable Date Online Free – Epoch Time Converter',
  description: 'Free online Unix timestamp converter. Convert epoch seconds to human-readable dates and vice versa. Live Unix clock with stats. No signup required.',
  keywords: "how to convert unix timestamp to human readable date online free, epoch time converter seconds to date free tool, convert human date to unix epoch timestamp online, what is unix timestamp and why 1970 epoch explained, unix timestamp milliseconds vs seconds difference converter, check year 2038 problem unix timestamp overflow free, live unix epoch clock current timestamp online, free online unix timestamp converter for developers no signup, convert timestamp to date javascript php python format, best free epoch time converter with download and copy 2026",
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/unix-timestamp',
  },
  openGraph: {
    title: 'Convert Unix Timestamp to Date Free – Epoch Time Converter with Live Clock',
    description: 'Convert epoch seconds to readable dates and vice versa. Live Unix clock, stats, copy and download. Free developer tool.',
    url: 'https://www.generatorpromptai.com/tools/unix-timestamp',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Unix Timestamp Converter – Epoch to Date & Back',
    description: 'Convert Unix timestamps to readable dates instantly. Live clock included. Free online tool.',
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
  "name": "Convert Unix Timestamp to Human Readable Date Online Free – Epoch Time Converter",
  "url": "https://www.generatorpromptai.com/tools/unix-timestamp",
  "applicationCategory": "DeveloperTools",
  "operatingSystem": "All",
  "description": "Free online Unix timestamp converter. Convert epoch seconds to human-readable dates and vice versa. Live Unix clock with stats. No signup required.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Unix Timestamp Converter", "item": "https://www.generatorpromptai.com/tools/unix-timestamp" }
  ]
};

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
      
      <UnixTimestamp />
    </>
  )
}