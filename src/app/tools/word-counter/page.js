import WordCounter from './WordCounter'

// ✅ SEO Metadata — Title: 59 chars, Description: 158 chars
export const metadata = {
  title: 'Free Word Counter – Character Count & Reading Time Tool',
  
  description: 'Count words, characters and reading time instantly. Free online word counter tool for writers, students and developers.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/word-counter' },
  
  openGraph: {
    title: 'Free Word Counter – Character Count & Reading Time Tool',
    description: 'Count words, characters and reading time instantly. Free online word counter tool for writers, students and developers.',
    url: 'https://www.generatorpromptai.com/tools/word-counter',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/word-counter.png',
        width: 1200,
        height: 630,
        alt: 'Word Counter – Count Words & Characters Free',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Free Word Counter – Character Count & Reading Time Tool',
    description: 'Count words, characters and reading time instantly. Free online word counter tool for writers, students and developers.',
    images: ['https://www.generatorpromptai.com/og/word-counter.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'word counter, character counter, reading time calculator, keyword density checker, count words online, free word count tool, seo keyword analysis, sentence counter, paragraph counter, no signup word counter',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Word Counter – Free Online Character Count & Reading Time Tool",
  "url": "https://www.generatorpromptai.com/tools/word-counter",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Count words, characters and reading time instantly. Free online word counter tool for writers, students and developers.",
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
  "featureList": "Real-time word/char/sentence/paragraph counting, reading time estimation (225 wpm), top 5 keyword density analysis, copy-to-clipboard stats, 100% client-side privacy, no signup required"
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
      "name": "Word Counter", 
      "item": "https://www.generatorpromptai.com/tools/word-counter" 
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
      "name": "How to count words and characters in text online free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste or type your text into the word counter. Words, characters (with and without spaces), sentences, paragraphs, and reading time are calculated instantly in real-time as you type."
      }
    },
    {
      "@type": "Question",
      "name": "How is reading time calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reading time is estimated at 225 words per minute — the standard average adult reading speed used by Medium and most publishing platforms. This gives a reliable estimate for most English text."
      }
    },
    {
      "@type": "Question",
      "name": "What is keyword density and why does it matter for SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Keyword density is the percentage of times a word appears compared to total word count. For SEO, a primary keyword density of 1–2% is generally recommended. Our tool shows your top 5 keywords with their density percentage automatically."
      }
    },
    {
      "@type": "Question",
      "name": "Does this tool count characters with or without spaces?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Both. Characters with spaces is the total string length. Characters without spaces counts only letters, numbers, and symbols — excluding all whitespace. This covers the two most common character count formats used by different platforms."
      }
    },
    {
      "@type": "Question",
      "name": "Is my text data private when using this word counter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All counting happens entirely in your browser using JavaScript. Your text is never sent to any server. The tool is 100% private and secure — safe for confidential documents."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use this for academic essays or blog posts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. It’s perfect for checking word limits on assignments, optimizing blog post length for SEO, or ensuring social media posts fit within character limits like Twitter/X or LinkedIn."
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
      <WordCounter />
    </>
  )
}