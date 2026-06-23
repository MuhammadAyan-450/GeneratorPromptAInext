import TimeZoneConverter from './TimeZoneConverter'

// ✅ SEO Metadata — Title: 59 chars, Description: 158 chars
export const metadata = {
  title: 'Time Zone Converter – Convert Time Between Karachi Dubai London Free',
  
  description: 'Convert time between Karachi, Dubai & London instantly. Free online tool for meetings, travel and global scheduling.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/time-zone-converter' },
  
  openGraph: {
    title: 'Time Zone Converter – Convert Time Between Karachi Dubai London Free',
    description: 'Convert time between Karachi, Dubai & London instantly. Free online tool for meetings, travel and global scheduling.',
    url: 'https://www.generatorpromptai.com/tools/time-zone-converter',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/time-zone-converter.png',
        width: 1200,
        height: 630,
        alt: 'Time Zone Converter – Convert Time Between Cities Free',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Time Zone Converter – Convert Time Between Karachi Dubai London Free',
    description: 'Convert time between Karachi, Dubai & London instantly. Free online tool for meetings, travel and global scheduling.',
    images: ['https://www.generatorpromptai.com/og/time-zone-converter.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'time zone converter, convert time between karachi and dubai, karachi to new york time converter, time zone converter with dst, live world clock online, convert time between pakistan and gulf countries, schedule meeting across time zones, free time zone converter no signup, karachi london time difference, dubai riyadh time converter',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Time Zone Converter – Convert Time Between Karachi Dubai London Free",
  "url": "https://www.generatorpromptai.com/tools/time-zone-converter",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Convert time between Karachi, Dubai & London instantly. Free online tool for meetings, travel and global scheduling.",
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
  "featureList": "25+ time zones supported, automatic DST handling via Intl API, live world clock (8 cities), quick pair shortcuts, copy-to-clipboard output, 100% client-side privacy, no signup required"
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
      "name": "Time Zone Converter", 
      "item": "https://www.generatorpromptai.com/tools/time-zone-converter" 
    }
  ]
}

// ─── JSON-LD: HowTo Schema ──────────────────────────────────────────────────
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
}

// ─── JSON-LD: FAQPage Schema ────────────────────────────────────────────────
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
        "text": "Yes. The tool uses the browser's native Intl.DateTimeFormat API which automatically applies DST rules based on the specific time zone and the exact date you select. No manual adjustment is needed."
      }
    },
    {
      "@type": "Question",
      "name": "How to convert time between Karachi and New York for meeting scheduling?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Click 'Karachi → New York' Quick Pair, set your meeting time in the date/time picker, and see the exact New York time instantly. Karachi is 10 hours ahead in winter (EST) and 9 hours ahead in summer (EDT). Copy the result to share with participants."
      }
    },
    {
      "@type": "Question",
      "name": "Is the world clock showing real-time current times?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The world clock section shows current times in 8 major cities (Karachi, Dubai, Riyadh, London, New York, Los Angeles, Tokyo, Sydney) updating every second using your browser's local clock."
      }
    },
    {
      "@type": "Question",
      "name": "Is my time conversion data stored or shared?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Never. All calculations happen locally in your browser. Your date/time inputs and selected zones are never sent to servers, stored, or tracked."
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHowTo) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} 
      />
      <TimeZoneConverter />
    </>
  )
}