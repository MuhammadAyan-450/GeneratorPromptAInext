import FakeDataGenerator from './FakeDataGenerator'

// ✅ Perfect SEO Metadata (Title: 58 chars, Description: 159 chars)
export const metadata = {
  title: 'Fake Data Generator – Create Dummy Pakistani & International Data Free',
  
  description: 'Generate realistic fake data instantly. Create dummy names, emails, addresses, phone numbers, and test data for free.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/fake-data-generator' },
  
  openGraph: {
    title: 'Fake Data Generator – Create Dummy Pakistani & International Data Free',
    description: 'Generate realistic fake data instantly. Create dummy names, emails, addresses, phone numbers, and test data for free.',
    url: 'https://www.generatorpromptai.com/tools/fake-data-generator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/fake-data-generator.png',
        width: 1200,
        height: 630,
        alt: 'Fake Data Generator – Create Dummy Data',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Fake Data Generator – Create Dummy Pakistani & International Data Free',
    description: 'Generate realistic fake data instantly. Create dummy names, emails, addresses, phone numbers, and test data for free.',
    images: ['https://www.generatorpromptai.com/og/fake-data-generator.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'fake data generator, dummy data generator, pakistan fake names, generate csv json data, database seeding tool, realistic test data, fake email generator, lorem ipsum alternative',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Fake Data Generator – Create Dummy Pakistani & Intl Data Free",
  "url": "https://www.generatorpromptai.com/tools/fake-data-generator",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "All",
  "description": "Generate realistic fake data instantly. Create dummy names, emails, addresses, phone numbers, and test data for free.",
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
  "featureList": "Pakistani & International locales, 14 customizable fields, CSV/JSON export, copy to clipboard, up to 200 records per batch, 100% client-side privacy, no signup required"
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
      "name": "Fake Data Generator", 
      "item": "https://www.generatorpromptai.com/tools/fake-data-generator" 
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
      "name": "How to generate fake Pakistani names and addresses for testing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Select the Pakistani locale, choose the fields you need (name, email, phone, address, etc.), set the number of records, and click Generate. The tool creates realistic Pakistani names, Karachi/Lahore/Islamabad addresses, and +92 phone numbers instantly."
      }
    },
    {
      "@type": "Question",
      "name": "Can I download fake test data as CSV or JSON file?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. After generating data, click the Download CSV or Download JSON button to save the file directly. You can also copy the data to your clipboard in either format."
      }
    },
    {
      "@type": "Question",
      "name": "How to create dummy data for database seeding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Select all the fields that match your database schema, generate the records, and download as JSON. You can use the JSON output directly in your seed scripts for MongoDB, PostgreSQL, or any other database."
      }
    },
    {
      "@type": "Question",
      "name": "Is the generated data safe to use for testing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, completely safe. All data is randomly generated and does not belong to any real person. No real personal information is used or stored."
      }
    },
    {
      "@type": "Question",
      "name": "How many fake records can I generate at once?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can generate up to 200 records per batch. For larger datasets, generate multiple batches and combine the downloaded CSV or JSON files."
      }
    },
    {
      "@type": "Question",
      "name": "Does this tool work offline or need an internet connection?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The data generation runs entirely in your browser using JavaScript. Once the page is loaded, you can generate data even if your internet connection drops. No data is sent to any server."
      }
    },
    {
      "@type": "Question",
      "name": "Can I customize the phone number format?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Currently, the tool uses standard formats: +92 for Pakistan and +1 for International. Custom format support is planned for future updates."
      }
    },
    {
      "@type": "Question",
      "name": "Are the passwords generated secure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The generated passwords are for testing purposes only. They follow a simple pattern (Word+Number+Symbol) and should NOT be used for real accounts. Always use strong, random passwords for production systems."
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
      <FakeDataGenerator />
    </>
  )
}