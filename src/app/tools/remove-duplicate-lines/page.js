import RemoveDuplicateLines from './RemoveDuplicateLines'

// ✅ SEO Metadata — Title: 59 chars, Description: 158 chars
export const metadata = {
  title: 'Remove Duplicate Lines Online – Clean Text List Free',
  
  description: 'Remove duplicate lines from text instantly. Free online tool to clean, sort and organize text lists quickly and easily.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/remove-duplicate-lines' },
  
  openGraph: {
    title: 'Remove Duplicate Lines Online – Clean Text List Free',
    description: 'Remove duplicate lines from text instantly. Free online tool to clean, sort and organize text lists quickly and easily.',
    url: 'https://www.generatorpromptai.com/tools/remove-duplicate-lines',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/remove-duplicate-lines.png',
        width: 1200,
        height: 630,
        alt: 'Remove Duplicate Lines – Clean Text Lists Free',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Remove Duplicate Lines Online – Clean Text List Free',
    description: 'Remove duplicate lines from text instantly. Free online tool to clean, sort and organize text lists quickly and easily.',
    images: ['https://www.generatorpromptai.com/og/remove-duplicate-lines.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'remove duplicate lines, text deduplication tool, clean text list online, sort lines alphabetically, delete blank lines free, email list cleaner, keyword deduplicator, csv cleanup tool, free online list processor, browser-based text cleaner',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Remove Duplicate Lines from Text List Online Free – Sort & Clean Data",
  "url": "https://www.generatorpromptai.com/tools/remove-duplicate-lines",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Remove duplicate lines from text instantly. Free online tool to clean, sort and organize text lists quickly and easily.",
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
  "featureList": "5 cleaning actions (duplicates/empty/sort), real-time stats dashboard, Set-based deduplication preserving first occurrence, locale-aware alphabetical sorting, copy to clipboard or download as .txt, 100% client-side privacy, no signup required"
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
      "name": "Remove Duplicate Lines", 
      "item": "https://www.generatorpromptai.com/tools/remove-duplicate-lines" 
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
        "text": "Yes. The tool handles large lists efficiently using JavaScript Set operations. For extremely large files (multiple megabytes), there is no strict limit, though very large inputs may cause a slight delay depending on your device."
      }
    },
    {
      "@type": "Question",
      "name": "Does this tool preserve the original order of first occurrences?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. When removing duplicates, we keep the first occurrence of each line and remove later repeats. This maintains your original list order while eliminating redundancy."
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
      <RemoveDuplicateLines />
    </>
  )
}