import UppercaseToLowercase from './UppercaseToLowercase'

export const metadata = {
  title: 'Convert Uppercase to Lowercase Text Online Free – Fix Caps Lock Instantly',
  description: 'Free online uppercase to lowercase converter. Change text to lowercase, uppercase, or swap case of every letter instantly. Fix caps lock errors, download result as .txt. No signup required.',
  keywords: "how to convert uppercase text to lowercase online free, fix caps lock text instantly online tool, convert lowercase to uppercase letters free no signup, swap case toggle case text converter online free, change text case without losing formatting online, free online uppercase lowercase converter download txt, convert entire paragraph from caps to normal text, text case changer for headers and code constants free, best free online tool to fix accidental caps lock 2026, uppercase to lowercase converter with word character count",
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/uppercase-to-lowercase',
  },
  openGraph: {
    title: 'Convert Uppercase to Lowercase Free – Fix Caps Lock Instantly',
    description: 'Change text to lowercase, uppercase, or swap case instantly. Fix caps lock errors. Download .txt. Free, no signup.',
    url: 'https://www.generatorpromptai.com/tools/uppercase-to-lowercase',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Uppercase to Lowercase Converter – Fix Caps Lock',
    description: 'Convert text case instantly. Lowercase, uppercase, or swap case. Free online tool.',
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
  "name": "Convert Uppercase to Lowercase Text Online Free – Fix Caps Lock Instantly",
  "url": "https://www.generatorpromptai.com/tools/uppercase-to-lowercase",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Free online uppercase to lowercase converter. Change text to lowercase, uppercase, or swap case of every letter instantly. Fix caps lock errors, download result as .txt. No signup required.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Uppercase to Lowercase Converter", "item": "https://www.generatorpromptai.com/tools/uppercase-to-lowercase" }
  ]
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to convert uppercase text to lowercase online free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste your uppercase text into the input area and click 'Lowercase'. The converted text appears instantly in the output block. Copy or download the result."
      }
    },
    {
      "@type": "Question",
      "name": "How to fix text typed with caps lock on?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste the accidentally caps-locked text into the tool and click 'Lowercase'. The entire text will be converted to normal lowercase instantly. This is the fastest way to fix caps lock mistakes."
      }
    },
    {
      "@type": "Question",
      "name": "What does swap case or toggle case do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Swap Case (Toggle Case) inverts every letter — uppercase becomes lowercase and lowercase becomes uppercase. For example, 'Hello World' becomes 'hELLO wORLD'. Useful for reversing accidental case changes."
      }
    },
    {
      "@type": "Question",
      "name": "Can I convert lowercase to uppercase as well?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Click 'Uppercase' to convert any text to all capital letters. This is useful for formatting headers, constants in programming code, or emphasizing important text."
      }
    },
    {
      "@type": "Question",
      "name": "Does this tool remove formatting from my text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The tool only changes the letter case (uppercase/lowercase). It does not remove bold, italics, links, or any other formatting. Only alphabetical characters are affected — numbers and symbols stay unchanged."
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
      
      <UppercaseToLowercase />
    </>
  )
}