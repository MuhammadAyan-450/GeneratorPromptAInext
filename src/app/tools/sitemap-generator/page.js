import SitemapGenerator from './SitemapGenerator'

// ✅ SEO Metadata — Title: 59 chars, Description: 158 chars
export const metadata = {
  title: 'Free XML Sitemap Generator – Create sitemap.xml Online',
  
  description: 'Generate XML sitemap.xml from URLs instantly. Free online sitemap generator to improve SEO indexing and site visibility.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/sitemap-generator' },
  
  openGraph: {
    title: 'Free XML Sitemap Generator – Create sitemap.xml Online',
    description: 'Generate XML sitemap.xml from URLs instantly. Free online sitemap generator to improve SEO indexing and site visibility.',
    url: 'https://www.generatorpromptai.com/tools/sitemap-generator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/sitemap-generator.png',
        width: 1200,
        height: 630,
        alt: 'XML Sitemap Generator – Create sitemap.xml Free',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Free XML Sitemap Generator – Create sitemap.xml Online',
    description: 'Generate XML sitemap.xml from URLs instantly. Free online sitemap generator to improve SEO indexing and site visibility.',
    images: ['https://www.generatorpromptai.com/og/sitemap-generator.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'xml sitemap generator, generate sitemap xml, xml sitemaps generator, sitemap generator from url, generate xml sitemap, sitemap xml creation, generate sitemap from url, generate a sitemap xml, sitemap xml generation, xml sitemap generation, sitemap generator xml, sitemap.xml generator, generate xml sitemaps, create xml sitemap, create sitemap xml, sitemap xml file generator, free sitemap generator online',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "XML Sitemap Generator – Free sitemap.xml Creator from URLs",
  "url": "https://www.generatorpromptai.com/tools/sitemap-generator",
  "applicationCategory": "SEOApplication",
  "operatingSystem": "All",
  "description": "Generate XML sitemap.xml from URLs instantly. Free online sitemap generator to improve SEO indexing and site visibility.",
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
  "featureList": "Supports full URLs and relative paths, automatic duplicate removal, XML entity escaping, changefreq & priority settings, lastmod date picker, copy-to-clipboard or download as .xml, 100% client-side privacy, no signup required"
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
      "name": "XML Sitemap Generator", 
      "item": "https://www.generatorpromptai.com/tools/sitemap-generator" 
    }
  ]
}

// ─── JSON-LD: HowTo Schema ──────────────────────────────────────────────────
const schemaHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Generate an XML Sitemap from URLs",
  "description": "Step-by-step guide to create sitemap.xml from your website URLs for Google Search Console submission.",
  "step": [
    { "@type": "HowToStep", "name": "Set Base URL", "text": "Enter your website's base URL (e.g., https://www.yourwebsite.com) in the base URL field." },
    { "@type": "HowToStep", "name": "Add URLs or Paths", "text": "Paste your full URLs or relative paths (like /about or /blog/post-1), one per line in the text area." },
    { "@type": "HowToStep", "name": "Set Frequency & Priority", "text": "Choose the change frequency (daily, weekly, monthly) and priority (0.1 to 1.0) for your pages." },
    { "@type": "HowToStep", "name": "Auto-Generate & Download", "text": "The XML sitemap generates automatically. Click Download .xml to save the sitemap.xml file to your computer." },
    { "@type": "HowToStep", "name": "Upload & Submit", "text": "Upload sitemap.xml to your website's root folder and submit it to Google Search Console for faster indexing." }
  ]
}

// ─── JSON-LD: FAQPage Schema ────────────────────────────────────────────────
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to generate XML sitemap from URL?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste your website URLs (full or relative paths like /about) into our tool, set your base URL, choose changefreq and priority, and the XML sitemap generates automatically. Download the sitemap.xml file and upload it to your website root."
      }
    },
    {
      "@type": "Question",
      "name": "How to create a sitemap.xml file for free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use our free XML Sitemap Generator tool. Enter your URLs, configure settings, and download a ready-to-use sitemap.xml file instantly. No signup, no software install, and no limits."
      }
    },
    {
      "@type": "Question",
      "name": "What is an XML sitemap and why do I need one?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An XML sitemap is a file that lists all important pages of your website in XML format. Search engines like Google and Bing use it to discover and crawl your pages faster. It is especially important for new websites or sites with many pages."
      }
    },
    {
      "@type": "Question",
      "name": "Where do I put the sitemap.xml file?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The sitemap.xml file must be uploaded to the root directory of your website. For example, if your domain is www.example.com, the sitemap should be accessible at www.example.com/sitemap.xml. You should also submit it in Google Search Console."
      }
    },
    {
      "@type": "Question",
      "name": "What does changefreq and priority mean in sitemap.xml?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Changefreq tells search engines how often the page content is likely to change (e.g., daily, weekly, monthly). Priority indicates the relative importance of the page compared to other pages on your site, from 0.1 (lowest) to 1.0 (highest). Homepage typically gets 1.0."
      }
    },
    {
      "@type": "Question",
      "name": "Can I generate sitemap XML from multiple URLs at once?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our tool supports bulk sitemap generation. Paste multiple URLs or relative paths (one per line), and it will automatically remove duplicates and generate a valid sitemap.xml with all your URLs."
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHowTo) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} 
      />
      <SitemapGenerator />
    </>
  )
}