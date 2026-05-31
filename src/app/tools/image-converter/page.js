import ImageConverter from './ImageConverter'

// ✅ SEO Metadata (Title: 58 chars, Description: 159 chars)
export const metadata = {
  title: 'Image Converter – Convert JPG PNG WebP Format Free Online',
  
  description: 'Convert JPG, PNG & WebP images instantly with free online tool. Fast, easy and high-quality image format converter.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/image-converter' },
  
  openGraph: {
    title: 'Image Converter – Convert JPG PNG WebP Format Free Online',
    description: 'Convert JPG, PNG & WebP images instantly with free online tool. Fast, easy and high-quality image format converter.',
    url: 'https://www.generatorpromptai.com/tools/image-converter',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/image-converter.png',
        width: 1200,
        height: 630,
        alt: 'Image Converter – Convert Between JPG PNG WebP Formats',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Image Converter – Convert JPG PNG WebP Format Free Online',
    description: 'Convert JPG, PNG & WebP images instantly with free online tool. Fast, easy and high-quality image format converter.',
    images: ['https://www.generatorpromptai.com/og/image-converter.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'image converter, jpg to png, png to webp, webp to jpg, convert image format, batch image converter, browser image converter, free format converter, html5 canvas converter, online image tool',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Image Converter – Convert JPG PNG WebP Format Free Online",
  "url": "https://www.generatorpromptai.com/tools/image-converter",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "All",
  "description": "Convert JPG, PNG & WebP images instantly with free online tool. Fast, easy and high-quality image format converter.",
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
  "featureList": "Browser-based conversion (no upload), batch process up to 10 images, convert between JPG/PNG/WebP, quality slider for lossy formats, side-by-side preview with size comparison, one-click download all, 100% client-side privacy"
}

// ─── JSON-LD: BreadcrumbList Schema ─────────────────────────────────────────
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Image Converter", "item": "https://www.generatorpromptai.com/tools/image-converter" }
  ]
}

// ─── JSON-LD: FAQPage Schema ────────────────────────────────────────────────
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to convert JPG to PNG without losing quality online for free?",
      "acceptedAnswer": { "@type": "Answer", "text": "Upload your JPG image and select PNG as the output format. The conversion happens in your browser using the HTML5 Canvas API, so no quality is lost during the process. The converted PNG preserves the exact pixel data of your original image." }
    },
    {
      "@type": "Question",
      "name": "Does converting PNG to WebP reduce file size?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. WebP typically produces files 25-35% smaller than PNG and JPEG at equivalent visual quality. This makes it the best format for websites and apps where loading speed matters." }
    },
    {
      "@type": "Question",
      "name": "How to convert WebP to JPG for email attachment?",
      "acceptedAnswer": { "@type": "Answer", "text": "Upload your WebP image, select JPG as the output format, and download. JPG is universally supported by all email clients and most software, making it ideal for email attachments." }
    },
    {
      "@type": "Question",
      "name": "Can I batch convert multiple images to a different format at once?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Upload up to 10 images at once and they will all be converted to your chosen format simultaneously. Use the Download All button to save every converted image in one click." }
    },
    {
      "@type": "Question",
      "name": "Does this image converter upload my files to a server?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. All conversion happens locally in your browser using the HTML5 Canvas API. Your images are never uploaded, stored, or sent to any server. They stay on your device at all times." }
    },
    {
      "@type": "Question",
      "name": "Will converting JPG to PNG improve image quality?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. Converting JPG to PNG cannot restore quality that was already lost during JPEG compression. However, PNG will preserve the current quality without any further loss and adds support for transparent backgrounds." }
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
      <ImageConverter />
    </>
  )
}