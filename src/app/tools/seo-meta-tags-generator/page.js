import SEOMetaTagsGenerator from './SEOMetaTagsGenerator'

export const metadata = {
  title: 'SEO Meta Tags Generator – Free Title & Description Creator with SERP Preview',
  description: 'Generate SEO-optimized meta titles, descriptions & Open Graph tags with live Google/Facebook/Twitter preview. Free, no signup, client-side privacy.',
  keywords: 'free seo meta tags generator no signup, meta title and description generator with serp preview, generate meta tags for blog posts free, seo meta tag creator with character counter, open graph meta tag generator free online, meta description checker with pixel width, free tool to create seo title tags, google meta tags generator with live preview',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/seo-meta-tags-generator',
  },
  openGraph: {
    title: 'SEO Meta Tags Generator – Free Title & Description Creator with SERP Preview',
    description: 'Generate SEO-optimized meta titles, descriptions & Open Graph tags with live Google/Facebook/Twitter preview. Free, no signup, client-side privacy.',
    url: 'https://www.generatorpromptai.com/tools/seo-meta-tags-generator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Meta Tags Generator – Free Title & Description Creator with SERP Preview',
    description: 'Generate SEO-optimized meta titles, descriptions & Open Graph tags with live Google/Facebook/Twitter preview. Free, no signup, client-side privacy.',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "SEO Meta Tags Generator with Live SERP Preview",
  "url": "https://www.generatorpromptai.com/tools/seo-meta-tags-generator",
  "applicationCategory": "SEOApplication",
  "operatingSystem": "All",
  "description": "Free online tool to generate SEO-optimized meta titles, descriptions, Open Graph, and Twitter Card tags with live preview for Google, Facebook, and Twitter. No signup, 100% client-side, privacy-focused.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" },
  "featureList": "Live SERP preview, character & pixel counter, Open Graph & Twitter Card generator, copy-to-clipboard HTML output, mobile-responsive design"
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "SEO Meta Tags Generator", "item": "https://www.generatorpromptai.com/tools/seo-meta-tags-generator" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What's the ideal length for a meta title?",
      "acceptedAnswer": { "@type": "Answer", "text": "Aim for 50-60 characters (or ~600 pixels). Google typically displays the first 50-60 characters in search results. Titles longer than this may get cut off with '...'. Our tool shows both character and pixel count to help you stay safe." }
    },
    {
      "@type": "Question",
      "name": "Do meta descriptions affect SEO rankings?",
      "acceptedAnswer": { "@type": "Answer", "text": "Not directly — but they heavily impact click-through rate (CTR). A compelling meta description can double your CTR, which sends positive signals to Google. Think of it as your ad copy in search results." }
    },
    {
      "@type": "Question",
      "name": "Should I include keywords in my meta tags?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, but naturally. Include your primary keyword in the title (preferably near the start) and once in the description. Avoid keyword stuffing — write for humans first, search engines second." }
    },
    {
      "@type": "Question",
      "name": "What are Open Graph tags and do I need them?",
      "acceptedAnswer": { "@type": "Answer", "text": "Open Graph (OG) tags control how your page looks when shared on social media (Facebook, LinkedIn, etc.). While not required for SEO, they dramatically improve social CTR. Our generator creates them automatically." }
    },
    {
      "@type": "Question",
      "name": "Is my content saved or sent to a server?",
      "acceptedAnswer": { "@type": "Answer", "text": "Never. This tool runs entirely in your browser using client-side JavaScript. Your page title, description, and URL are never transmitted, stored, or tracked. Your privacy is guaranteed." }
    }
  ]
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      <SEOMetaTagsGenerator />
    </>
  )
}