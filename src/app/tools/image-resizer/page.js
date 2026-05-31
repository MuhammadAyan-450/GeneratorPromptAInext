import ImageResizer from './ImageResizer'

// ✅ SEO Metadata (Title: 58 chars, Description: 159 chars)
export const metadata = {
  title: 'Free Image Resizer – Resize Photos for Social Media',
  
  description: 'Free image resizer to set exact dimensions for social media. Resize photos quickly for Instagram, TikTok & YouTube.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/image-resizer' },
  
  openGraph: {
    title: 'Free Image Resizer – Resize Photos for Social Media',
    description: 'Free image resizer to set exact dimensions for social media. Resize photos quickly for Instagram, TikTok & YouTube.',
    url: 'https://www.generatorpromptai.com/tools/image-resizer',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/image-resizer.png',
        width: 1200,
        height: 630,
        alt: 'Image Resizer – Resize Photos to Exact Pixel Dimensions',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image Resizer – Resize Photos for Social Media',
    description: 'Free image resizer to set exact dimensions for social media. Resize photos quickly for Instagram, TikTok & YouTube.',
    images: ['https://www.generatorpromptai.com/og/image-resizer.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'image resizer, resize image online, instagram image resizer, youtube thumbnail resizer, pixel dimension tool, aspect ratio lock, free image editor, browser image resize, social media presets, photo resizer online',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Image Resizer – Resize Photos to Exact Pixels for Social Media Free",
  "url": "https://www.generatorpromptai.com/tools/image-resizer",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "All",
  "description": "Free image resizer to set exact dimensions for social media. Resize photos quickly for Instagram, TikTok & YouTube.",
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
  "featureList": "8 platform size presets (1080x1080, 1280x720, etc.), aspect ratio lock/unlock toggle, quick percentage scaling (25-200%), export to JPG/PNG/WebP, quality slider for lossy formats, side-by-side preview with file size comparison, 100% client-side processing, no signup required"
}

// ─── JSON-LD: BreadcrumbList Schema ─────────────────────────────────────────
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Image Resizer", "item": "https://www.generatorpromptai.com/tools/image-resizer" }
  ]
}

// ─── JSON-LD: FAQPage Schema ────────────────────────────────────────────────
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to resize image to 1080x1080 for Instagram post online?",
      "acceptedAnswer": { "@type": "Answer", "text": "Upload your photo, click the Instagram Post preset (1080x1080), then click Resize Image. The tool automatically sets the correct dimensions and you can download the resized image as JPG, PNG or WebP." }
    },
    {
      "@type": "Question",
      "name": "Can I resize an image without losing quality?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, when resizing down (making smaller) quality is preserved very well with high quality output settings. Resizing up (enlarging) will cause some blurriness because pixels are being interpolated — this is a fundamental limitation of all image resizers." }
    },
    {
      "@type": "Question",
      "name": "How to resize image to 50 percent online for free?",
      "acceptedAnswer": { "@type": "Answer", "text": "Upload your image and click the 50% quick scale button. The width and height fields update automatically to half the original dimensions. Then click Resize Image to process and download." }
    },
    {
      "@type": "Question",
      "name": "What size for YouTube thumbnail 1280x720?",
      "acceptedAnswer": { "@type": "Answer", "text": "YouTube thumbnails should be 1280x720 pixels in 16:9 aspect ratio. Select the YouTube Thumb preset in our tool and it sets 1280x720 automatically." }
    },
    {
      "@type": "Question",
      "name": "Does this image resizer upload my photos to a server?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. All resizing happens entirely in your browser using the HTML5 Canvas API. Your images are never uploaded, stored, or sent to any server." }
    },
    {
      "@type": "Question",
      "name": "How to resize photo for WhatsApp profile picture 500x500?",
      "acceptedAnswer": { "@type": "Answer", "text": "Upload your photo, click the WhatsApp DP preset (500x500), then click Resize Image. Download the result and set it as your WhatsApp profile picture." }
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
      <ImageResizer />
    </>
  )
}