import tools, { toolCategories } from '../../data/tools'
import AllToolsContent from '../all-tools/AllToolsContent'
// BreadcrumbList Schema
const breadcrumbSchema = {
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
      "name": "All Free Online Tools",
      "item": "https://www.generatorpromptai.com/pages/all-tools"
    }
  ]
}

// Main ItemList Schema
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Complete Collection of Free Online Tools",
  "description": "35+ free browser-based tools for image editing, text processing, code formatting, password generation, unit conversion, and AI prompt building",
  "numberOfItems": tools.length,
  "itemListElement": tools.map((tool, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": tool.name,
    "description": tool.description,
    "url": `https://www.generatorpromptai.com${tool.path}`
  }))
}

// Category-wise ItemList schemas
const categorySchemas = toolCategories
  .filter(cat => cat.tools.length > 0)
  .map(cat => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Free ${cat.category}`,
    "numberOfItems": cat.tools.length,
    "itemListElement": cat.tools.map((tool, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": tool.name,
      "url": `https://www.generatorpromptai.com${tool.path}`
    }))
  }))

// Next.js SEO Metadata
export const metadata = {
  title: '35+ Free Online Tools – JSON Formatter, Image Compressor, QR Generator, AI Prompts',
  description: 'Browse 35+ free online tools: JSON formatter & validator, image compressor without losing quality, QR code generator with logo, password generator, word counter, Base64 encoder decoder, UUID generator, age calculator, currency converter, and AI prompt builders for ChatGPT, Claude & Midjourney. No signup, no install – works in browser.',
  alternates: { canonical: 'https://www.generatorpromptai.com/pages/all-tools' },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    type: 'website',
    url: 'https://www.generatorpromptai.com/pages/all-tools',
    title: '35+ Free Online Tools – JSON Formatter, Image Compressor, QR Generator & More',
    description: 'Browse our complete collection of 35+ free browser-based tools. JSON formatter, image tools, generators, calculators, AI prompt builders – no signup needed.',
    images: ['https://www.generatorpromptai.com/og-image.jpg'],
    siteName: 'Generator Prompt AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: '35+ Free Online Tools – No Signup Required',
    description: 'JSON formatter, image compressor, QR generator, password maker, AI prompt builders and 30+ more free tools.',
    images: ['https://www.generatorpromptai.com/twitter-image.jpg'],
  },
}

export default function AllToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      {categorySchemas.map((schema, i) => (
        <script key={`cat-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <AllToolsContent />
    </>
  )
}