import TimeZoneConverter from './TimeZoneConverter'

export const metadata = {
  title: 'Convert Time Between Karachi Dubai London New York Online Free – Time Zone Converter with DST',
  description: 'Free online time zone converter — convert time between Karachi, Dubai, London, New York, Toronto, Riyadh and 25+ cities. DST auto-handled, live world clock. No signup required.',
  keywords: "how to convert time between karachi and dubai online free, convert time between karachi and new york for meeting, time zone converter with daylight saving time auto handled, what time is it in london when it is 12pm in karachi, free online world clock current time multiple cities, convert time between pakistan and canada toronto online, time difference between karachi and riyadh doha kuwait, schedule meeting across time zones karachi dubai london free tool, best free time zone converter 25 cities no signup 2026, convert time between gulf countries and pakistan india online",
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/time-zone-converter',
  },
  openGraph: {
    title: 'Convert Time Between Cities Free – Karachi, Dubai, London, New York | DST Auto',
    description: 'Convert time between 25+ cities instantly. Karachi to Dubai, London, New York, Toronto, Riyadh. DST auto-handled. Live world clock.',
    url: 'https://www.generatorpromptai.com/tools/time-zone-converter',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Time Zone Converter – Karachi, Dubai, London, New York & 25+ Cities',
    description: 'Convert time between any cities. 25+ time zones, DST auto-handled, live world clock. Free online tool.',
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
  "name": "Convert Time Between Karachi Dubai London New York Online Free – Time Zone Converter with DST",
  "url": "https://www.generatorpromptai.com/tools/time-zone-converter",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Free online time zone converter. Convert time between 25+ cities — Karachi, Dubai, London, New York, Toronto, Riyadh and more. DST auto-handled, live world clock. No signup required.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Time Zone Converter", "item": "https://www.generatorpromptai.com/tools/time-zone-converter" }
  ]
};

const schemaHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Convert Time Between Time Zones Online Free",
  "description": "Steps to convert time between different cities and time zones online.",
  "step": [
    { "@type": "HowToStep", "name": "Select Date & Time", "text": "Pick the date and time you want to convert using the date/time picker." },
    { "@type": "HowToStep", "name": "Choose Zones", "text": "Select the From and To time zones from the dropdown menus, or use a Quick Pair button." },
    { "@type": "HowToStep", "name": "View Result", "text": "The converted time appears instantly in the dark output block with full stats. Click Copy to save." }
  ]
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to convert time between Karachi and Dubai online free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Select 'Karachi → Dubai' from the Quick Pairs or manually set From to Asia/Karachi and To to Asia/Dubai. Pick your date and time — the converted Dubai time appears instantly. Dubai is always 1 hour behind Karachi."
      }
    },
    {
      "@type": "Question",
      "name": "What time is it in London when it is 12pm in Karachi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In winter (GMT, UTC+0), London is 5 hours behind Karachi so 12pm PKT = 7am GMT. In summer (BST, UTC+1), London is 4 hours behind so 12pm PKT = 8am BST. Our tool adjusts automatically for Daylight Saving Time."
      }
    },
    {
      "@type": "Question",
      "name": "Does this time zone converter handle Daylight Saving Time automatically?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The tool uses the browser's native Intl.DateTimeFormat API which automatically applies DST rules based on the specific time zone and the exact date you select."
      }
    },
    {
      "@type": "Question",
      "name": "How to convert time between Karachi and New York for meeting scheduling?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Click 'Karachi → New York' Quick Pair, set your meeting time in the date/time picker, and see the exact New York time instantly. Karachi is 10 hours ahead in winter (EST) and 9 hours ahead in summer (EDT)."
      }
    },
    {
      "@type": "Question",
      "name": "Is the world clock showing real-time current times?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The world clock section shows current times in 8 major cities (Karachi, Dubai, Riyadh, London, New York, Los Angeles, Tokyo, Sydney) updating every second using your browser's local clock."
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHowTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      
      <TimeZoneConverter />
    </>
  )
}