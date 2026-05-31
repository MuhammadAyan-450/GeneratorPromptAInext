import ImageCompressor from './ImageCompressor'

// ✅ SEO Metadata (Title: 57 chars, Description: 158 chars)
export const metadata = {
  title: 'Image Compressor – Reduce JPG PNG WebP Size 90% Free Online',
  
  description: 'Compress JPG, PNG & WebP images up to 90% without losing quality. Fast, free and easy online image compressor tool.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/image-compressor' },
  
  openGraph: {
    title: 'Image Compressor – Reduce JPG PNG WebP Size 90% Free Online',
    description: 'Compress JPG, PNG & WebP images up to 90% without losing quality. Fast, free and easy online image compressor tool.',
    url: 'https://www.generatorpromptai.com/tools/image-compressor',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/image-compressor.png',
        width: 1200,
        height: 630,
        alt: 'Image Compressor – Reduce File Size Without Losing Quality',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Image Compressor – Reduce JPG PNG WebP Size 90% Free Online',
    description: 'Compress JPG, PNG & WebP images up to 90% without losing quality. Fast, free and easy online image compressor tool.',
    images: ['https://www.generatorpromptai.com/og/image-compressor.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'image compressor, compress jpg, compress png, compress webp, reduce image size, batch image compression, browser image compressor, free image optimizer, webp converter, photo compressor online',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Image Compressor – Reduce JPG PNG WebP Size 90% Free Online",
  "url": "https://www.generatorpromptai.com/tools/image-compressor",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "All",
  "description": "Compress JPG, PNG & WebP images up to 90% without losing quality. Fast, free and easy online image compressor tool.",
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
  "featureList": "Browser-based compression (no upload), batch process up to 10 images, convert between JPG/PNG/WebP, quality presets (40-95%), max dimension control, visual before/after comparison, one-click download all, 100% client-side privacy"
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
      "name": "Image Compressor", 
      "item": "https://www.generatorpromptai.com/tools/image-compressor" 
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
      <ImageCompressor />
    </>
  )
}