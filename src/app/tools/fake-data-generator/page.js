import FakeDataGenerator from './FakeDataGenerator'

export const metadata = {
  title: 'Generate Fake Pakistani Names & Emails for Testing – Free CSV JSON Download',
  description: 'Free fake data generator with Pakistani names, emails, phone numbers, and addresses. Generate dummy test data for database seeding and API testing. Download as CSV or JSON instantly – no signup required.',
  keywords: 'how to generate fake pakistani names for testing, dummy data generator with pakistani addresses, fake email and phone number generator for api testing, create test data for database seeding free, mock data generator csv json download, random pakistani name and address generator, fake data for ui testing free tool, generate dummy user data for demo accounts, test data generator with karachi lahore islamabad addresses, free mock data generator no signup',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/fake-data-generator',
  },
  openGraph: {
    type: 'website',
    siteName: 'GeneratorPromptAI',
    title: 'Generate Fake Pakistani Names & Emails for Testing – CSV JSON Download',
    description: 'Free fake data generator with Pakistani names, emails, phones, addresses. Download as CSV or JSON for database seeding and API testing.',
    url: 'https://www.generatorpromptai.com/tools/fake-data-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Fake Data Generator – Pakistani Names, Emails, Addresses – CSV JSON',
    description: 'Generate realistic dummy data for testing. Pakistani & international names, emails, phones, addresses. Download as CSV or JSON.',
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
}

// ── JSON-LD Schemas ──
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Generate Fake Pakistani Names, Emails & Addresses for Testing – CSV JSON Download",
  "url": "https://www.generatorpromptai.com/tools/fake-data-generator",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "All",
  "description": "Free online tool to generate realistic fake data for testing — Pakistani names, emails, phone numbers, addresses, companies. Download as CSV or JSON instantly. No signup required.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Fake Data Generator", "item": "https://www.generatorpromptai.com/tools/fake-data-generator" }
  ]
}

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
      <FakeDataGenerator />
    </>
  )
}