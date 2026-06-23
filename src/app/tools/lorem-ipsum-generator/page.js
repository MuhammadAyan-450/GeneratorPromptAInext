import LoremIpsumGenerator from './LoremIpsumGenerator'

// ✅ SEO Metadata (Title: 59 chars, Description: 159 chars)
export const metadata = {
  title: 'Lorem Ipsum Generator Online – Dummy Text Generator Free Tool',
  
  description: 'Generate Lorem Ipsum placeholder text instantly for web design. Free online dummy text generator for developers and designers.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/lorem-ipsum-generator' },
  
  openGraph: {
    title: 'Lorem Ipsum Generator Online – Dummy Text Generator Free Tool',
    description: 'Generate Lorem Ipsum placeholder text instantly for web design. Free online dummy text generator for developers and designers.',
    url: 'https://www.generatorpromptai.com/tools/lorem-ipsum-generator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/lorem-ipsum-generator.png',
        width: 1200,
        height: 630,
        alt: 'Lorem Ipsum Generator – Create Placeholder Text for Design',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Lorem Ipsum Generator Online – Dummy Text Generator Free Tool',
    description: 'Generate Lorem Ipsum placeholder text instantly for web design. Free online dummy text generator for developers and designers.',
    images: ['https://www.generatorpromptai.com/og/lorem-ipsum-generator.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'lorem ipsum generator, placeholder text, dummy text generator, html lorem ipsum, wireframe text, mockup filler text, free lorem ipsum, browser lorem generator, design placeholder, web prototype text',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Lorem Ipsum Generator – Placeholder Text for Web Design Free",
  "url": "https://www.generatorpromptai.com/tools/lorem-ipsum-generator",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "All",
  "description": "Generate Lorem Ipsum placeholder text instantly for web design. Free online dummy text generator for developers and designers.",
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
  "featureList": "Custom paragraph count (1-20) and words per paragraph (20-300), classic 'Lorem ipsum' opening toggle, HTML tag wrapping mode with &lt;h&gt; and &lt;p&gt; tags, real-time stats (words, chars, sentences), copy to clipboard or download as .txt, 100% client-side processing with pure JavaScript, no signup required"
}

// ─── JSON-LD: BreadcrumbList Schema ─────────────────────────────────────────
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Lorem Ipsum Generator", "item": "https://www.generatorpromptai.com/tools/lorem-ipsum-generator" }
  ]
}

// ─── JSON-LD: FAQPage Schema ────────────────────────────────────────────────
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to generate placeholder text for website design free?",
      "acceptedAnswer": { "@type": "Answer", "text": "Set the number of paragraphs and words per paragraph in our Lorem Ipsum generator, then click Generate Text. Copy or download the result and paste it directly into your design mockup or prototype." }
    },
    {
      "@type": "Question",
      "name": "Can I generate Lorem Ipsum with HTML tags?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Check the 'Wrap in HTML tags' option and the tool will output your paragraphs wrapped in <p> tags with randomly generated <h2>, <h3>, or <h4> headings between sections." }
    },
    {
      "@type": "Question",
      "name": "What is Lorem Ipsum and why do designers use it?",
      "acceptedAnswer": { "@type": "Answer", "text": "Lorem Ipsum is dummy text used in the printing and web design industries since the 1500s. Designers use it to fill layouts with realistic-looking text so clients and stakeholders focus on the visual design rather than reading the content." }
    },
    {
      "@type": "Question",
      "name": "How many paragraphs of Lorem Ipsum should I use for a wireframe?",
      "acceptedAnswer": { "@type": "Answer", "text": "For a typical website wireframe, 3-5 paragraphs per section works well. For a full-page mockup, 10-20 paragraphs total gives a realistic feel. Use shorter paragraphs (40-60 words) for tighter layouts." }
    },
    {
      "@type": "Question",
      "name": "Can I generate dummy text with a specific word count?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Set the 'Words per Paragraph' input to your desired count (20-300 words) and the tool will generate paragraphs that match that target as closely as possible." }
    },
    {
      "@type": "Question",
      "name": "Is my generated text sent to a server?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. All text generation happens entirely inside your browser using JavaScript. Your content never leaves your device." }
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
      <LoremIpsumGenerator />
    </>
  )
}