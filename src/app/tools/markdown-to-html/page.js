import MarkdownToHtml from './MarkdownToHtml'

// ✅ SEO Metadata (Title: 58 chars, Description: 159 chars)
export const metadata = {
  title: 'Markdown to HTML Converter Online – Free & Secure Tool',
  
  description: 'Free Markdown to HTML converter to transform text instantly. Secure online tool for fast and accurate HTML output.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/markdown-to-html' },
  
  openGraph: {
    title: 'Markdown to HTML Converter Online – Free & Secure Tool',
    description: 'Free Markdown to HTML converter to transform text instantly. Secure online tool for fast and accurate HTML output.',
    url: 'https://www.generatorpromptai.com/tools/markdown-to-html',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/markdown-to-html.png',
        width: 1200,
        height: 630,
        alt: 'Markdown to HTML Converter – Convert Markdown to Clean HTML',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Markdown to HTML Converter Online – Free & Secure Tool',
    description: 'Free Markdown to HTML converter to transform text instantly. Secure online tool for fast and accurate HTML output.',
    images: ['https://www.generatorpromptai.com/og/markdown-to-html.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'markdown to html, markdown converter, md to html, github flavored markdown, gfm converter, sanitize html, browser markdown tool, free markdown converter, live html preview, copy html code',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Markdown to HTML Converter – Free Online Instant & Secure",
  "url": "https://www.generatorpromptai.com/tools/markdown-to-html",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "All",
  "description": "Free Markdown to HTML converter to transform text instantly. Secure online tool for fast and accurate HTML output.",
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
  "featureList": "GitHub Flavored Markdown (GFM) support, live preview and raw HTML code tabs, DOMPurify sanitization for XSS protection, real-time stats (words, chars, lines, HTML length), copy to clipboard or download as .html file with DOCTYPE, 100% client-side processing with marked.js, no signup required"
}

// ─── JSON-LD: BreadcrumbList Schema ─────────────────────────────────────────
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Markdown to HTML", "item": "https://www.generatorpromptai.com/tools/markdown-to-html" }
  ]
}

// ─── JSON-LD: FAQPage Schema ────────────────────────────────────────────────
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I convert Markdown to HTML?",
      "acceptedAnswer": { "@type": "Answer", "text": "Simply paste your Markdown text into the left editor on this page. The HTML code will be instantly generated on the right side. You can then copy it or download it as an HTML file." }
    },
    {
      "@type": "Question",
      "name": "Is it safe to convert Markdown to HTML here?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. The entire conversion happens inside your web browser. Your text is never sent to any external server, ensuring complete privacy for sensitive documents." }
    },
    {
      "@type": "Question",
      "name": "Does this support GitHub Flavored Markdown?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, our converter fully supports GFM (GitHub Flavored Markdown), including tables, task lists, strikethrough text, and fenced code blocks with syntax highlighting capabilities." }
    },
    {
      "@type": "Question",
      "name": "Why is my HTML sanitized?",
      "acceptedAnswer": { "@type": "Answer", "text": "Markdown can contain raw HTML. To protect you from accidental XSS (cross-site scripting) vulnerabilities if you paste untrusted text, we automatically sanitize the output HTML to remove malicious scripts." }
    },
    {
      "@type": "Question",
      "name": "Can I use the generated HTML in my website?",
      "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. The generated HTML is clean and standard. You can copy it directly into your HTML files, CMS, or static site generator." }
    },
    {
      "@type": "Question",
      "name": "Does this tool work offline?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Once the page loads, all conversion happens locally in your browser. You can use it without an internet connection after the initial load." }
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
      <MarkdownToHtml />
    </>
  )
}