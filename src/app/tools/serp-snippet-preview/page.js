import SerpSnippetPreviewClient from './SerpSnippetPreview'
 
export const metadata = {
  title: 'Free SERP Snippet Preview Tool | Google Search Result Preview Online',
  description: 'Preview exactly how your page appears in Google search results. Check meta title pixel width, description length, URL breadcrumb & bold keywords. Free, no signup.',
  keywords: 'serp snippet preview tool, google search result preview, meta title length checker, meta description preview, google snippet checker online, seo preview tool free, serp preview online, meta tag preview tool, google serp simulator, title tag preview',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/serp-snippet-preview',
  },
  openGraph: {
    title: 'Free SERP Snippet Preview Tool | Google Search Result Preview Online',
    description: 'Preview exactly how your page appears in Google search results. Check meta title pixel width, description length & bold keywords. Free, no signup.',
    url: 'https://www.generatorpromptai.com/tools/serp-snippet-preview',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [{ url: 'https://www.generatorpromptai.com/og-serp-snippet-preview.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free SERP Snippet Preview Tool | Google Search Result Preview',
    description: 'Preview how your page looks in Google search. Check title length, meta description & keywords. Free online SEO tool!',
    images: ['https://www.generatorpromptai.com/og-serp-snippet-preview.png'],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}
 
// ── Schema: WebApplication ──────────────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "SERP Snippet Preview Tool",
  "url": "https://www.generatorpromptai.com/tools/serp-snippet-preview",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Preview exactly how your page appears in Google search results. Check meta title pixel width, description length, URL breadcrumb and bold keywords instantly.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI", "url": "https://www.generatorpromptai.com" }
}
 
// ── Schema: BreadcrumbList ──────────────────────────────────────────────────
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "SERP Snippet Preview", "item": "https://www.generatorpromptai.com/tools/serp-snippet-preview" }
  ]
}
 
// ── Schema: FAQPage ─────────────────────────────────────────────────────────
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a SERP snippet preview tool?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A SERP snippet preview tool shows you how your webpage will appear in Google search results before you publish. It displays the meta title, meta description, and URL exactly as Google would show them — including any truncation if your title or description is too long."
      }
    },
    {
      "@type": "Question",
      "name": "How long should my meta title be for Google?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google truncates titles that exceed approximately 600 pixels in width. This is roughly 50-60 characters for typical text. Our tool calculates the exact pixel width so you can optimize your title to display in full without guessing."
      }
    },
    {
      "@type": "Question",
      "name": "How long should my meta description be?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google typically shows up to 960 pixels of meta description on desktop, which is around 155-160 characters. On mobile it is shorter at around 680 pixels. Keep your most important information and keywords within the first 155 characters."
      }
    },
    {
      "@type": "Question",
      "name": "Why does Google bold certain words in search results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google automatically bolds words in your meta description that match the search query typed by the user. This is why including your target keywords naturally in your description can improve click-through rates — matched words stand out visually."
      }
    },
    {
      "@type": "Question",
      "name": "Does this SERP preview tool show mobile results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Toggle between Desktop and Mobile preview to see how your snippet appears on both screen sizes. Mobile results have a narrower display, so titles and descriptions may appear slightly shorter."
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
      <SerpSnippetPreviewClient />
    </>
  )
}
