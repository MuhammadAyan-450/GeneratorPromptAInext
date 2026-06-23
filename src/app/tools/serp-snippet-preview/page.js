import SerpSnippetPreview from './SerpSnippetPreview'

// ✅ SEO Metadata — Title: 59 chars, Description: 158 chars
export const metadata = {
  title: 'SERP Snippet Preview Tool – Free Google Search Result Preview Online',
  
  description: 'Preview how your title and description appear on Google. Free SERP snippet preview tool to optimize CTR and SEO results.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/serp-snippet-preview' },
  
  openGraph: {
    title: 'SERP Snippet Preview Tool – Free Google Search Result Preview Online',
    description: 'Preview how your title and description appear on Google. Free SERP snippet preview tool to optimize CTR and SEO results.',
    url: 'https://www.generatorpromptai.com/tools/serp-snippet-preview',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/serp-snippet-preview.png',
        width: 1200,
        height: 630,
        alt: 'SERP Snippet Preview – Preview Google Search Results Free',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'SERP Snippet Preview Tool – Free Google Search Result Preview Online',
    description: 'Preview how your title and description appear on Google. Free SERP snippet preview tool to optimize CTR and SEO results.',
    images: ['https://www.generatorpromptai.com/og/serp-snippet-preview.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'serp snippet preview tool, google search result preview, meta title pixel width checker, meta description preview, google snippet checker online, seo preview tool free, serp preview online, meta tag preview tool, google serp simulator, title tag preview',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "SERP Snippet Preview Tool – Free Google Search Result Preview Online",
  "url": "https://www.generatorpromptai.com/tools/serp-snippet-preview",
  "applicationCategory": "SEOApplication",
  "operatingSystem": "All",
  "description": "Preview how your title and description appear on Google. Free SERP snippet preview tool to optimize CTR and SEO results.",
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
  "featureList": "Pixel-accurate title/description measurement, desktop & mobile preview toggle, bold keyword highlighter, live real-time preview, copy-to-clipboard output, 100% client-side privacy, no signup required"
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
      "name": "SERP Snippet Preview", 
      "item": "https://www.generatorpromptai.com/tools/serp-snippet-preview" 
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
      "name": "What is a SERP snippet preview tool?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A SERP snippet preview tool shows you exactly how your webpage will appear in Google search results before you publish. It displays your meta title, meta description, and URL exactly as Google would show them — including truncation if your content is too long."
      }
    },
    {
      "@type": "Question",
      "name": "How long should my meta title be for Google?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google truncates titles exceeding approximately 600 pixels in width — roughly 50-60 characters for typical text. Our tool calculates the exact pixel width so you can optimize your title without guessing."
      }
    },
    {
      "@type": "Question",
      "name": "How long should my meta description be?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google shows up to 960 pixels of meta description on desktop — around 155-160 characters. On mobile it is shorter at roughly 680 pixels. Keep your most important content within the first 155 characters."
      }
    },
    {
      "@type": "Question",
      "name": "Why does Google bold certain words in search results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google automatically bolds words in your meta description that match the user search query. Including your target keywords naturally in your description can improve click-through rates because matched words stand out visually."
      }
    },
    {
      "@type": "Question",
      "name": "Does this SERP preview tool show mobile results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Toggle between Desktop and Mobile preview to see how your snippet appears on both screen sizes. Mobile search results have a narrower display so titles and descriptions may appear slightly shorter."
      }
    },
    {
      "@type": "Question",
      "name": "Is my content saved or sent to a server?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Never. All preview calculations happen locally in your browser. Your meta title, description, and URL are never transmitted, stored, or tracked."
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
      <SerpSnippetPreview />
    </>
  )
}