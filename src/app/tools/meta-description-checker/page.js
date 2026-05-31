import MetaDescriptionChecker from './Metadescriptionchecker'

// ✅ SEO Metadata (Title: 59 chars, Description: 159 chars)
export const metadata = {
  title: 'Free Meta Description Checker – SEO Score & Length Tool',
  
  description: 'Free meta description checker to analyze length, SEO score and optimize for better CTR. Fast and easy online tool.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/meta-description-checker' },
  
  openGraph: {
    title: 'Free Meta Description Checker – SEO Score & Length Tool',
    description: 'Free meta description checker to analyze length, SEO score and optimize for better CTR. Fast and easy online tool.',
    url: 'https://www.generatorpromptai.com/tools/meta-description-checker',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/meta-description-checker.png',
        width: 1200,
        height: 630,
        alt: 'Meta Description Checker – Analyze SEO Score & Length',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Free meta description checker to analyze length, SEO score and optimize for better CTR. Fast and easy online tool.',
    description: 'Free meta description checker with real-time SEO score. Analyze length, pixel width, power words, CTA. Desktop & mobile preview. 100% browser-based.',
    images: ['https://www.generatorpromptai.com/og/meta-description-checker.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'meta description checker, seo description analyzer, meta description length, google preview tool, pixel width calculator, power words checker, cta analyzer, free seo tool, browser meta checker, description optimizer',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Meta Description Checker – Free SEO Score & Length Analyzer",
  "url": "https://www.generatorpromptai.com/tools/meta-description-checker",
  "applicationCategory": "SEOApplication",
  "operatingSystem": "All",
  "description": "Free meta description checker to analyze length, SEO score and optimize for better CTR. Fast and easy online tool.",
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
  "featureList": "Real-time SEO scoring (0-100), pixel width estimation for desktop/mobile, ideal length guidance (120-158 chars), power word and CTA detection, keyword placement check, live Google preview toggle, actionable suggestions, copy to clipboard, 100% client-side processing with pure JavaScript, no signup required"
}

// ─── JSON-LD: BreadcrumbList Schema ─────────────────────────────────────────
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Meta Description Checker", "item": "https://www.generatorpromptai.com/tools/meta-description-checker" }
  ]
}

// ─── JSON-LD: FAQPage Schema ────────────────────────────────────────────────
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the ideal meta description length for SEO?",
      "acceptedAnswer": { "@type": "Answer", "text": "The ideal meta description length is between 120 and 158 characters. Google typically shows up to 155-160 characters on desktop and around 120 characters on mobile before truncating. Descriptions that are too short miss an opportunity to attract clicks, while those that are too long get cut off mid-sentence in search results." }
    },
    {
      "@type": "Question",
      "name": "Does meta description length affect Google rankings?",
      "acceptedAnswer": { "@type": "Answer", "text": "Meta descriptions do not directly affect Google rankings, but they significantly impact click-through rate (CTR). A well-written, properly-length meta description with relevant keywords and a clear call-to-action can increase clicks from search results, which indirectly signals quality to Google." }
    },
    {
      "@type": "Question",
      "name": "What are power words in meta descriptions?",
      "acceptedAnswer": { "@type": "Answer", "text": "Power words are persuasive words that increase emotional impact and click rates. Examples include 'free', 'instant', 'proven', 'easy', 'best', 'new', 'trusted', and 'fast'. Including 1-2 power words in your meta description can make your search result listing more compelling and increase CTR." }
    },
    {
      "@type": "Question",
      "name": "Should I include the target keyword in my meta description?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Including your target keyword in the meta description is recommended because Google often bolds matching words when a user searches for that keyword. This visual highlight makes your result stand out and can improve click-through rates. Our tool lets you check if your keyword is included." }
    },
    {
      "@type": "Question",
      "name": "Why does Google sometimes rewrite my meta description?",
      "acceptedAnswer": { "@type": "Answer", "text": "Google may rewrite your meta description when it determines that a different snippet from your page content better matches the user search query. This happens most often when the meta description is too short, too generic, keyword-stuffed, or does not adequately describe the page content." }
    },
    {
      "@type": "Question",
      "name": "Does this tool work offline?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Once the page loads, all analysis happens locally in your browser. You can use it without an internet connection after the initial load." }
    }
  ]
}

// ─── Page Component ─────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      <MetaDescriptionChecker />
    </>
  )
}