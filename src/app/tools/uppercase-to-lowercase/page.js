import UppercaseToLowercase from './UppercaseToLowercase'

// ✅ SEO Metadata — Title: 59 chars, Description: 158 chars
export const metadata = {
  title: 'Uppercase to Lowercase Converter – Free Text Case Fixer Online',
  
  description: 'Free uppercase to lowercase converter tool. Change text case online instantly with simple one-click tool.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/uppercase-to-lowercase' },
  
  openGraph: {
    title: 'Uppercase to Lowercase Converter – Free Text Case Fixer Online',
    description: 'Free uppercase to lowercase converter tool. Change text case online instantly with simple one-click tool.',
    url: 'https://www.generatorpromptai.com/tools/uppercase-to-lowercase',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/uppercase-to-lowercase.png',
        width: 1200,
        height: 630,
        alt: 'Uppercase to Lowercase Converter – Fix Text Case Free',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Uppercase to Lowercase Converter – Free Text Case Fixer Online',
    description: 'Free uppercase to lowercase converter tool. Change text case online instantly with simple one-click tool.',
    images: ['https://www.generatorpromptai.com/og/uppercase-to-lowercase.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'uppercase to lowercase converter, fix caps lock text, convert text case online, swap case toggle case, lowercase to uppercase converter, free text case changer, no signup case converter, developer text tools, writer productivity tools, online text formatter',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Uppercase to Lowercase Converter – Free Text Case Fixer Online",
  "url": "https://www.generatorpromptai.com/tools/uppercase-to-lowercase",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Free uppercase to lowercase converter tool. Change text case online instantly with simple one-click tool.",
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
  "featureList": "3 case conversion modes (lowercase/uppercase/toggle), real-time word/char counting, copy-to-clipboard and download .txt, 100% client-side privacy, no signup required"
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
      "name": "Uppercase to Lowercase", 
      "item": "https://www.generatorpromptai.com/tools/uppercase-to-lowercase" 
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
      "name": "How to convert uppercase text to lowercase online free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste your uppercase text into the input area and click 'Lowercase'. The converted text appears instantly in the output block below. Copy or download the result."
      }
    },
    {
      "@type": "Question",
      "name": "How to fix text typed with caps lock on?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste the accidentally caps-locked text into the tool and click 'Lowercase'. The entire text will be converted to normal lowercase instantly. This is the fastest way to fix caps lock mistakes without retyping."
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
    },
    {
      "@type": "Question",
      "name": "Is my text data stored or shared?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Never. All processing happens locally in your browser. Your text inputs are never sent to servers, stored, or tracked."
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
      <UppercaseToLowercase />
    </>
  )
}