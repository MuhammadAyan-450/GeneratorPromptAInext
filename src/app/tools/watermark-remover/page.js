import WatermarkRemover from './WatermarkRemover'

export const metadata = {
  title: 'Remove Watermark from Photo Online Free – Inpainting Tool No Signup',
  description: 'Free online watermark remover with inpainting algorithm. Auto-detect light watermarks or manually brush over any area. Processes in browser — no server upload. No signup.',
  keywords: 'how to remove watermark from photo online free, remove watermark from image without losing quality free tool, free online watermark remover with inpainting algorithm, brush tool to remove watermark from any image free, remove logo text timestamp from photo online free, best free watermark remover no signup no upload, remove semi transparent watermark from png jpg free, inpaint tool remove object from photo online free, watermark remover for ecommerce product photos free, free browser based watermark removal tool 2026',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/watermark-remover',
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  openGraph: {
    type: 'website',
    siteName: 'GeneratorPromptAI',
    title: 'Remove Watermark from Photo Free – Inpainting Tool | No Signup',
    description: 'Auto-detect or brush over watermarks. Inpainting fills the area. 100% browser-based, no upload.',
    url: 'https://www.generatorpromptai.com/tools/watermark-remover',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Watermark Remover – Inpainting Tool | No Server Upload',
    description: 'Remove watermarks with auto-detect or manual brush. Inpainting fills areas. Free, private.',
  },
}

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Remove Watermark from Photo Online Free – Inpainting Tool No Signup",
  "url": "https://www.generatorpromptai.com/tools/watermark-remover",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "All",
  "description": "Free online watermark remover with inpainting algorithm. Auto-detect light watermarks or manually brush over any watermark area. Processes images in your browser — no upload to servers. No signup.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Watermark Remover", "item": "https://www.generatorpromptai.com/tools/watermark-remover" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How to remove watermark from photo online free?", "acceptedAnswer": { "@type": "Answer", "text": "Upload your image, choose Auto mode and click Remove Watermark. The tool detects light-colored watermarks and fills them using a neighbor-sampling inpainting algorithm. Or switch to Brush mode and paint over the watermark area manually for more control." } },
    { "@type": "Question", "name": "Is this watermark remover safe and private?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All image processing happens entirely in your browser using the Canvas API. Your images are never uploaded to any server. 100% private." } },
    { "@type": "Question", "name": "What is the difference between Auto and Brush mode?", "acceptedAnswer": { "@type": "Answer", "text": "Auto mode automatically detects light-colored, low-saturation areas (typical text/logo watermarks) and removes them. Brush mode lets you manually paint over any watermark — works on any color or pattern." } },
    { "@type": "Question", "name": "What does Repair Radius do?", "acceptedAnswer": { "@type": "Answer", "text": "Repair Radius controls how far the algorithm looks for replacement pixels when filling a masked area. A larger radius produces smoother results on uniform backgrounds. A smaller radius preserves more detail but may show artifacts." } },
    { "@type": "Question", "name": "Can I remove dark or complex watermarks?", "acceptedAnswer": { "@type": "Answer", "text": "Use Brush mode to manually mark the watermark area regardless of color. The inpainting algorithm fills the area with surrounding pixels. For best results, the area around the watermark should have a relatively uniform texture." } }
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
      <WatermarkRemover />
    </>
  )
}