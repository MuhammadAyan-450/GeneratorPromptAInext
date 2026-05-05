import WordCounter from './WordCounter'

export const metadata = {
  title: 'Count Words Characters and Reading Time Online Free – Keyword Density Checker Tool',
  description: 'Free online word counter. Instantly count words, characters (with/without spaces), sentences, paragraphs, reading time and top keyword density. No signup required. 100% private.',
  keywords: 'how to count words and characters in text online free, free online word counter with keyword density checker, count characters with and without spaces online tool, calculate reading time for blog post free online, sentence and paragraph counter free no signup, seo keyword density checker top words tool, free online word count tool for writers and students, check word limit for essay assignment free online, real time word character counter no upload, best free word counter with reading time estimate 2026, online text analysis tool count words sentences paragraphs',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/word-counter',
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  openGraph: {
    type: 'website',
    siteName: 'GeneratorPromptAI',
    title: 'Count Words, Characters & Reading Time Free – Keyword Density Checker',
    description: 'Real-time word count, character count, reading time and keyword density. Free, private, no signup.',
    url: 'https://www.generatorpromptai.com/tools/word-counter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Word Counter – Words, Characters, Reading Time, Keywords',
    description: 'Real-time word count, keyword density & reading time estimate. Free online tool.',
  },
}

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Count Words Characters and Reading Time Online Free – Keyword Density Checker Tool",
  "url": "https://www.generatorpromptai.com/tools/word-counter",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Free online word counter. Instantly count words, characters (with/without spaces), sentences, paragraphs, reading time and top keyword density. No signup required. 100% private.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" },
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Word Counter", "item": "https://www.generatorpromptai.com/tools/word-counter" },
  ],
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to count words and characters in text online free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste or type your text into the word counter tool. Words, characters (with and without spaces), sentences, paragraphs, and reading time are calculated instantly in real-time as you type.",
      },
    },
    {
      "@type": "Question",
      "name": "How is reading time calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reading time is estimated at an average speed of 225 words per minute, which is the standard reading speed for adults. This is the same formula used by Medium and most publishing platforms.",
      },
    },
    {
      "@type": "Question",
      "name": "What is keyword density and why does it matter for SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Keyword density is the percentage of times a word appears compared to the total word count. For SEO, a primary keyword density of 1-2% is generally recommended. Our tool shows your top 5 keywords with their density percentage.",
      },
    },
    {
      "@type": "Question",
      "name": "Does this tool count characters with or without spaces?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Both. The tool shows characters with spaces (total length) and characters without spaces (letters, numbers, and symbols only). This covers the two most common character count formats used by different platforms.",
      },
    },
    {
      "@type": "Question",
      "name": "Is my text data private when using this word counter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All counting happens entirely in your browser using JavaScript. Your text is never sent to any server. The tool is 100% private and secure.",
      },
    },
  ],
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
      <WordCounter />
    </>
  )
}