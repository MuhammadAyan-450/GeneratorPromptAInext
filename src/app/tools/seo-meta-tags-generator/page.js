import SEOMetaTagsGenerator from './SEOMetaTagsGenerator'

// ✅ SEO Metadata — Title: 59 chars, Description: 158 chars
export const metadata = {
  title: 'SEO Title & Description Generator – Free SERP Preview Tool',
  
  description: 'Free SEO meta tags generator to create title & description with live SERP preview. Improve clicks and search visibility fast.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/seo-meta-tags-generator' },
  
  openGraph: {
    title: 'SEO Title & Description Generator – Free SERP Preview Tool',
    description: 'Free SEO meta tags generator to create title & description with live SERP preview. Improve clicks and search visibility fast.',
    url: 'https://www.generatorpromptai.com/tools/seo-meta-tags-generator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/seo-meta-tags-generator.png',
        width: 1200,
        height: 630,
        alt: 'SEO Meta Tags Generator – Create Optimized Meta Tags Free',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Title & Description Generator – Free SERP Preview Tool',
    description: 'Free SEO meta tags generator to create title & description with live SERP preview. Improve clicks and search visibility fast.',
    images: ['https://www.generatorpromptai.com/og/seo-meta-tags-generator.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'seo meta tags generator, meta title creator, meta description generator, open graph tag generator, twitter card creator, serp preview tool, free seo tags generator, no signup meta tag tool, client-side seo generator, google meta tags optimizer',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "SEO Meta Tags Generator – Free Title & Description Creator with SERP Preview",
  "url": "https://www.generatorpromptai.com/tools/seo-meta-tags-generator",
  "applicationCategory": "SEOApplication",
  "operatingSystem": "All",
  "description": "Free SEO meta tags generator to create title & description with live SERP preview. Improve clicks and search visibility fast.",
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
  "featureList": "Live SERP preview for Google/Facebook/Twitter, character + pixel width counters, Open Graph & Twitter Card tag generation, copy-to-clipboard HTML output, real-time validation, 100% client-side privacy, no signup required"
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
      "name": "SEO Meta Tags Generator", 
      "item": "https://www.generatorpromptai.com/tools/seo-meta-tags-generator" 
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
      "name": "What's the ideal length for a meta title?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aim for 50-60 characters (or ~600 pixels). Google typically displays the first 50-60 characters in search results. Titles longer than this may get cut off with '...'. Our tool shows both character and pixel count to help you stay safe."
      }
    },
    {
      "@type": "Question",
      "name": "Do meta descriptions affect SEO rankings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not directly — but they heavily impact click-through rate (CTR). A compelling meta description can double your CTR, which sends positive signals to Google. Think of it as your ad copy in search results."
      }
    },
    {
      "@type": "Question",
      "name": "Should I include keywords in my meta tags?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, but naturally. Include your primary keyword in the title (preferably near the start) and once in the description. Avoid keyword stuffing — write for humans first, search engines second."
      }
    },
    {
      "@type": "Question",
      "name": "What are Open Graph tags and do I need them?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open Graph (OG) tags control how your page looks when shared on social media (Facebook, LinkedIn, etc.). While not required for SEO, they dramatically improve social CTR. Our generator creates them automatically."
      }
    },
    {
      "@type": "Question",
      "name": "Is my content saved or sent to a server?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Never. This tool runs entirely in your browser using client-side JavaScript. Your page title, description, and URL are never transmitted, stored, or tracked. Your privacy is guaranteed."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use the generated meta tags on my website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Copy the HTML code and paste it into the <head> section of your webpage. For WordPress, use an SEO plugin like Yoast or Rank Math. For static sites, edit your HTML file directly."
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
      <SEOMetaTagsGenerator />
    </>
  )
}