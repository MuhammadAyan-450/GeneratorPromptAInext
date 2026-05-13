import MetaDescriptionChecker from './Metadescriptionchecker'

export const metadata = {
  title: 'Free Meta Description Checker | Check SEO Score & Length Instantly',
  description: 'Check your meta description length, pixel width and SEO score instantly. Analyze power words, keyword placement and CTR potential. Free online meta description analyzer — no signup!',
  keywords: 'meta description checker, meta description length checker, check meta description seo, meta description analyzer free, meta description pixel width checker, meta description too long checker, seo meta description tool, check meta description online, meta description character count, meta description optimizer free',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/meta-description-checker',
  },
  openGraph: {
    title: 'Free Meta Description Checker | Check SEO Score & Length Instantly',
    description: 'Check your meta description length, pixel width and SEO score instantly. Analyze power words, keyword placement and CTR potential. Free — no signup!',
    url: 'https://www.generatorpromptai.com/tools/meta-description-checker',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Meta Description Checker | SEO Score & Length Analyzer',
    description: 'Check meta description length, pixel width, keyword placement and SEO score instantly. Free online tool — no signup required!',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

// ─── Schema: WebApplication ───────────────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Meta Description Checker",
  "url": "https://www.generatorpromptai.com/tools/meta-description-checker",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Check your meta description length, pixel width and SEO score instantly. Analyze power words, keyword placement and CTR potential. Free online meta description analyzer.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI", "url": "https://www.generatorpromptai.com" }
}

// ─── Schema: BreadcrumbList ───────────────────────────────────────────────────
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Meta Description Checker", "item": "https://www.generatorpromptai.com/tools/meta-description-checker" }
  ]
}

// ─── Schema: FAQPage ─────────────────────────────────────────────────────────
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the ideal meta description length for SEO?",
      "acceptedAnswer": { "@type": "Answer", "text": "The ideal meta description length is between 120 and 158 characters. Google typically shows up to 155-160 characters on desktop and around 120 characters on mobile before truncating." }
    },
    {
      "@type": "Question",
      "name": "Does meta description length affect Google rankings?",
      "acceptedAnswer": { "@type": "Answer", "text": "Meta descriptions do not directly affect Google rankings but significantly impact click-through rate. A well-written, properly-length meta description with relevant keywords and a clear call-to-action can increase clicks from search results." }
    },
    {
      "@type": "Question",
      "name": "Should I include the target keyword in my meta description?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Including your target keyword in the meta description is recommended because Google often bolds matching words when a user searches for that keyword, making your result stand out and improving click-through rates." }
    },
    {
      "@type": "Question",
      "name": "What are power words in meta descriptions?",
      "acceptedAnswer": { "@type": "Answer", "text": "Power words are persuasive words that increase emotional impact and click rates — examples include free, instant, proven, easy, best, new, trusted, and fast. Including 1-2 power words in your meta description can make your result more compelling." }
    },
    {
      "@type": "Question",
      "name": "Why does Google sometimes rewrite my meta description?",
      "acceptedAnswer": { "@type": "Answer", "text": "Google rewrites meta descriptions when it finds a better snippet from page content that matches the user query. This happens most often when descriptions are too short, too generic, keyword-stuffed, or do not adequately describe the page content." }
    }
  ]
}

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