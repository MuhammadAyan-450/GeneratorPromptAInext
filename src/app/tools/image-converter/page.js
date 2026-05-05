import ImageConverter from './ImageConverter'

export const metadata = {
  title: 'Convert JPG to PNG Without Losing Quality Online – Free Image Format Converter',
  description: 'Free online image converter — change JPG to PNG, PNG to WebP, WebP to JPG instantly in your browser. Batch convert up to 10 images. No server upload, 100% private. No sign-up needed.',
  keywords: 'how to convert jpg to png without losing quality online free, convert png to webp for faster website loading free tool, change webp to jpg for email attachment free online, batch convert images to webp format free no upload, convert image format online without uploading to server, free image format converter no sign up required, how to convert png to jpg for smaller file size, online image converter that works in browser offline, convert multiple images to different format at once free, jpg to png converter for transparent background online',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/image-converter',
  },
  openGraph: {
    type: 'website',
    siteName: 'GeneratorPromptAI',
    title: 'Convert JPG to PNG Without Losing Quality Online – Free Image Converter',
    description: 'Change image formats instantly in your browser. JPG to PNG, PNG to WebP, WebP to JPG. Batch convert up to 10 images. No server upload.',
    url: 'https://www.generatorpromptai.com/tools/image-converter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image Converter – JPG to PNG, PNG to WebP Without Losing Quality',
    description: 'Convert image formats online free. JPG to PNG, PNG to WebP, WebP to JPG. Batch up to 10. No server upload.',
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
}

// ── JSON-LD Schemas ──
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Convert JPG to PNG Without Losing Quality Online – Free Image Format Converter",
  "url": "https://www.generatorpromptai.com/tools/image-converter",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Free online image converter to change JPG to PNG, PNG to WebP, WebP to JPG instantly in your browser. Batch convert up to 10 images. No server upload, 100% private.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Image Converter", "item": "https://www.generatorpromptai.com/tools/image-converter" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to convert JPG to PNG without losing quality online for free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upload your JPG image to our tool and select PNG as the output format. The conversion happens in your browser using the HTML5 Canvas API, so no quality is lost during the process. The converted PNG preserves the exact pixel data of your original image."
      }
    },
    {
      "@type": "Question",
      "name": "Does converting PNG to WebP reduce file size?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. WebP typically produces files 25-35% smaller than PNG and JPEG at equivalent visual quality. This makes it the best format for websites and apps where loading speed matters."
      }
    },
    {
      "@type": "Question",
      "name": "How to convert WebP to JPG for email attachment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upload your WebP image, select JPG as the output format, and download. JPG is universally supported by all email clients and most software, making it ideal for email attachments."
      }
    },
    {
      "@type": "Question",
      "name": "Can I batch convert multiple images to a different format at once?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Upload up to 10 images at once and they will all be converted to your chosen format simultaneously. Use the Download All button to save every converted image in one click."
      }
    },
    {
      "@type": "Question",
      "name": "Does this image converter upload my files to a server?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. All conversion happens locally in your browser using the HTML5 Canvas API. Your images are never uploaded, stored, or sent to any server. They stay on your device at all times."
      }
    },
    {
      "@type": "Question",
      "name": "Will converting JPG to PNG improve image quality?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Converting JPG to PNG cannot restore quality that was already lost during JPEG compression. However, PNG will preserve the current quality without any further loss and adds support for transparent backgrounds."
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
      <ImageConverter />
    </>
  )
}