import LoremIpsumGenerator from './LoremIpsumGenerator'

export const metadata = {
  title: 'Generate Placeholder Text for Website Design Free – Lorem Ipsum with HTML Tags',
  description: 'Free Lorem Ipsum generator with customizable paragraphs, word count, and HTML tag wrapping. Create placeholder text for wireframes, mockups, and prototypes instantly. No signup required.',
  keywords: "how to generate placeholder text for website design free, lorem ipsum generator with html tags free online, generate dummy text for wireframe mockup free, placeholder text generator for ui ux design, free lorem ipsum paragraphs with specific word count, create filler text for website prototype online, random placeholder text generator no signup, generate lorem ipsum with heading tags html, dummy text generator for print layout free, best free placeholder text tool for designers",
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/lorem-ipsum-generator',
  },
  openGraph: {
    title: 'Generate Placeholder Text for Website Design Free – Lorem Ipsum',
    description: 'Custom Lorem Ipsum with paragraphs, word count, and HTML tags. Free placeholder text for wireframes and mockups.',
    url: 'https://www.generatorpromptai.com/tools/lorem-ipsum-generator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Lorem Ipsum Generator – Placeholder Text with HTML Tags',
    description: 'Generate customizable placeholder text for wireframes and mockups. HTML support included.',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

// JSON-LD Schemas
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Generate Placeholder Text for Website Design Free – Lorem Ipsum with HTML Tags",
  "url": "https://www.generatorpromptai.com/tools/lorem-ipsum-generator",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Free online Lorem Ipsum generator with customizable paragraphs, word count, and HTML tag wrapping. Create placeholder text for wireframes, mockups, and prototypes instantly.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Lorem Ipsum Generator", "item": "https://www.generatorpromptai.com/tools/lorem-ipsum-generator" }
  ]
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to generate placeholder text for website design free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Set the number of paragraphs and words per paragraph in our Lorem Ipsum generator, then click Generate Text. Copy or download the result and paste it directly into your design mockup or prototype."
      }
    },
    {
      "@type": "Question",
      "name": "Can I generate Lorem Ipsum with HTML tags?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Check the 'Wrap in HTML tags' option and the tool will output your paragraphs wrapped in <p> tags with randomly generated <h2>, <h3>, or <h4> headings between sections."
      }
    },
    {
      "@type": "Question",
      "name": "What is Lorem Ipsum and why do designers use it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lorem Ipsum is dummy text used in the printing and web design industries since the 1500s. Designers use it to fill layouts with realistic-looking text so clients and stakeholders focus on the visual design rather than reading the content."
      }
    },
    {
      "@type": "Question",
      "name": "How many paragraphs of Lorem Ipsum should I use for a wireframe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For a typical website wireframe, 3-5 paragraphs per section works well. For a full-page mockup, 10-20 paragraphs total gives a realistic feel. Use shorter paragraphs (40-60 words) for tighter layouts."
      }
    },
    {
      "@type": "Question",
      "name": "Can I generate dummy text with a specific word count?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Set the 'Words per Paragraph' input to your desired count (20-300 words) and the tool will generate paragraphs that match that target as closely as possible."
      }
    }
  ]
};

export default function Page() {
  return (
    <>
      {/* Structured Data Scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      
      <LoremIpsumGenerator />
    </>
  )
}