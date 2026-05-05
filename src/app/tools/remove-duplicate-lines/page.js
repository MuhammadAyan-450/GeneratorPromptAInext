import RemoveDuplicateLines from './RemoveDuplicateLines'

export const metadata = {
  title: 'Remove Duplicate Lines from Text List Online Free – Sort and Clean Data Instantly',
  description: 'Free online tool to remove duplicate lines from text lists. Sort alphabetically, remove empty lines, and clean up data instantly. Download result as .txt. No signup required.',
  keywords: "how to remove duplicate lines from text list online free, delete repeated lines from large list instantly, remove blank empty lines from text file online, sort lines alphabetically after removing duplicates free, clean up email list remove duplicates online tool, text deduplication tool no signup free download, remove duplicate entries from csv data free online, free online list cleaner remove duplicates sort download, deduplicate text lines keep first occurrence free tool, best free duplicate line remover with sort and download 2026",
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/remove-duplicate-lines',
  },
  openGraph: {
    title: 'Remove Duplicate Lines Free – Sort & Clean Text Lists Instantly',
    description: 'Remove duplicate lines, sort alphabetically, delete blank lines. Download cleaned list as .txt. Free, private, no signup.',
    url: 'https://www.generatorpromptai.com/tools/remove-duplicate-lines',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Duplicate Line Remover – Sort & Clean Text Lists',
    description: 'Instantly remove duplicate lines and clean up text lists. Free online tool, no signup.',
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
  "name": "Remove Duplicate Lines from Text List Online Free – Sort and Clean Data Instantly",
  "url": "https://www.generatorpromptai.com/tools/remove-duplicate-lines",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Free online tool to remove duplicate lines from text lists. Sort alphabetically, remove empty lines, and clean up data instantly. Download result as .txt. No signup required.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Remove Duplicate Lines", "item": "https://www.generatorpromptai.com/tools/remove-duplicate-lines" }
  ]
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to remove duplicate lines from a text list online free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste your list into the text area and click 'Remove Duplicates Only'. The tool instantly scans every line, keeps the first occurrence, and deletes all repeated lines. Copy or download the cleaned result."
      }
    },
    {
      "@type": "Question",
      "name": "Can I remove duplicate lines and empty lines at the same time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Click 'Remove Duplicates & Empty Lines' to perform both actions in one step. This removes all repeated entries and all blank lines, giving you a completely clean list."
      }
    },
    {
      "@type": "Question",
      "name": "How to sort lines alphabetically after removing duplicates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "First click 'Remove Duplicates' to clean the list, then click 'Sort A-Z' to alphabetize. The result in the output block will be both deduplicated and sorted in ascending order."
      }
    },
    {
      "@type": "Question",
      "name": "Is my text data safe when using this tool?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All processing happens entirely in your browser using JavaScript. No text is ever sent to any server. Your data remains 100% private."
      }
    },
    {
      "@type": "Question",
      "name": "Can I remove duplicates from a large list with thousands of lines?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The tool handles large lists efficiently. For extremely large files (multiple megabytes), there is no strict limit, though very large inputs may cause a slight delay depending on your device."
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
      
      <RemoveDuplicateLines />
    </>
  )
}