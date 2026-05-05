import AgeCalculator from './AgeCalculator'

export const metadata = {
  title: 'Calculate Exact Age in Years, Months, Days – How Many Days Old Am I?',
  description: 'Calculate your exact age in years, months, days, hours, and minutes. Find out how many days old you are and days until your next birthday. Free online chronological age calculator by date of birth.',
  keywords: 'calculate exact age in years months days, how many days old am i calculator, chronological age calculator by date of birth, age in days hours minutes calculator, days until next birthday calculator, calculate my age from date of birth online, exact age calculator free, age calculator with zodiac sign',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/age-calculator',
  },
  openGraph: {
    title: 'Calculate Exact Age in Years, Months, Days – Free Online Tool',
    description: 'Find your exact age breakdown and total days lived. Includes next birthday countdown and zodiac sign.',
    url: 'https://www.generatorpromptai.com/tools/age-calculator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exact Age Calculator – Years, Months, Days, Hours',
    description: 'Calculate your precise age and days until your next birthday. 100% free online tool.',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Chronological Age Calculator by Date of Birth",
  "url": "https://www.generatorpromptai.com/tools/age-calculator",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Calculate exact age in years, months, days, hours, and minutes from date of birth. Find how many days old you are and days until next birthday.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Age Calculator", "item": "https://www.generatorpromptai.com/tools/age-calculator" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to calculate my exact age in years, months, and days?",
      "acceptedAnswer": { "@type": "Answer", "text": "Enter your date of birth in the age calculator above and click 'Calculate Age'. The tool uses precise calendar logic to compute your exact age in years, months, and days, accounting for leap years and different month lengths." }
    },
    {
      "@type": "Question",
      "name": "How many days old am I?",
      "acceptedAnswer": { "@type": "Answer", "text": "To find out how many days old you are, enter your date of birth into our calculator. It will instantly show your total days lived, along with total weeks, hours, and minutes." }
    },
    {
      "@type": "Question",
      "name": "How to find days until my next birthday?",
      "acceptedAnswer": { "@type": "Answer", "text": "Simply enter your date of birth and calculate your age. Our tool automatically calculates and displays the exact number of days remaining until your next birthday." }
    },
    {
      "@type": "Question",
      "name": "Does this age calculator account for leap years?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, our calculator uses JavaScript's native Date object which correctly handles leap years, ensuring your age in days and hours is 100% accurate." }
    },
    {
      "@type": "Question",
      "name": "Is my date of birth saved or stored?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. The calculation happens entirely in your browser. Your date of birth is never sent to any server, stored, or tracked. Your privacy is fully protected." }
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
      <AgeCalculator />
    </>
  )
}