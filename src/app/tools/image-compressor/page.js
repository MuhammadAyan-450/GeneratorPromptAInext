import ImageCompressor from './ImageCompressor'

export const metadata = {
  title: 'Compress Images Without Losing Quality Online – Free JPG PNG WebP Compressor',
  description: 'Free online image compressor — reduce JPG, PNG and WebP file size by up to 90% without losing quality. Works entirely in your browser, no upload to any server. Batch compress up to 10 images.',
  keywords: 'how to compress image without losing quality online free, compress image for website without uploading to server, reduce jpg file size for whatsapp without losing quality, batch compress images online free no upload, compress png to webp for faster website loading, make image file smaller for email attachment free, compress photo for instagram without losing quality, free image compressor for website optimization, reduce image size for faster website loading free, compress high resolution photos for web free online tool',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/image-compressor',
  },
  openGraph: {
    type: 'website',
    siteName: 'GeneratorPromptAI',
    title: 'Compress Images Without Losing Quality Online – Free JPG PNG WebP Compressor',
    description: 'Reduce image file size by up to 90% without quality loss. Works in your browser — no server upload. Batch compress up to 10 images.',
    url: 'https://www.generatorpromptai.com/tools/image-compressor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image Compressor – Compress JPG PNG WebP Without Losing Quality',
    description: 'Reduce image file size up to 90% in your browser. No upload to server. Batch compress up to 10 images free.',
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
}

// ── JSON-LD Schemas ──
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Compress Images Without Losing Quality Online – Free JPG PNG WebP Compressor",
  "url": "https://www.generatorpromptai.com/tools/image-compressor",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Free online image compressor that works entirely in your browser. Compress JPG, PNG and WebP images without uploading to any server. Reduce file size by up to 90% with no quality loss.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Image Compressor", "item": "https://www.generatorpromptai.com/tools/image-compressor" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to compress image without losing quality online for free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upload your image to our tool and select the Maximum (92%) or Balanced (80%) quality preset. The tool compresses the image in your browser without uploading to any server, preserving visual quality while reducing file size significantly."
      }
    },
    {
      "@type": "Question",
      "name": "Does this image compressor upload my photos to a server?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Our tool works 100% in your browser using JavaScript. Your images never leave your device. No data is uploaded, stored, or sent to any server."
      }
    },
    {
      "@type": "Question",
      "name": "How to reduce JPG file size for WhatsApp without losing quality?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upload your JPG photo, select Balanced (80%) quality and 1200px max dimension, then compress and download. The result will be a much smaller file that WhatsApp sends instantly without visible quality loss."
      }
    },
    {
      "@type": "Question",
      "name": "Can I batch compress multiple images at once for free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. You can upload up to 10 images at once and they will all be compressed simultaneously with the same quality and dimension settings. Use the Download All button to save them all at once."
      }
    },
    {
      "@type": "Question",
      "name": "How to compress PNG to WebP for faster website loading?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upload your PNG images, select WebP as the output format, choose Balanced or Aggressive quality, and compress. WebP produces files 25-35% smaller than PNG at the same visual quality and is supported by all modern browsers."
      }
    },
    {
      "@type": "Question",
      "name": "How much can I reduce image file size?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Depending on the original image and settings, you can reduce file size by 50-90%. Most photos compress 60-80% with the Balanced (80%) preset while maintaining excellent visual quality."
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
      <ImageCompressor />
    </>
  )
}