import ImageResizer from './ImageResizer'

export const metadata = {
  title: 'Resize Image to 1080x1080 for Instagram Post Online – Free Pixel Dimension Tool',
  description: 'Free online image resizer — change JPG, PNG and WebP to any pixel dimension or percentage. Platform presets for Instagram 1080x1080, YouTube 1280x720, Twitter 1500x500. Aspect ratio lock. No upload to server.',
  keywords: 'how to resize image to 1080x1080 for instagram post online, resize photo to specific pixel dimensions free no upload, resize image to 50 percent online free tool, resize image for youtube thumbnail 1280x720 free, change image dimensions without losing quality online, resize photo for whatsapp profile picture 500x500, free online image resizer with aspect ratio lock, resize image to exact pixels for website free, resize jpg png webp to custom dimensions free, best free image resizer for social media 2026',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/image-resizer',
  },
  openGraph: {
    type: 'website',
    siteName: 'GeneratorPromptAI',
    title: 'Resize Image to 1080x1080 for Instagram Post Online – Free Tool',
    description: 'Resize images to any pixel dimension or percentage. Instagram, YouTube, Twitter presets. Aspect ratio lock. No server upload.',
    url: 'https://www.generatorpromptai.com/tools/image-resizer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image Resizer – Resize to 1080x1080, 1280x720, Custom Pixels',
    description: 'Resize images online to any dimension. Instagram, YouTube, Twitter presets. Aspect ratio lock. Free, no upload.',
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
}

// ── JSON-LD Schemas ──
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Resize Image to 1080x1080 for Instagram Post Online – Free Pixel Dimension Tool",
  "url": "https://www.generatorpromptai.com/tools/image-resizer",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Free online image resizer to change JPG, PNG and WebP to any pixel dimension or percentage. Platform presets for Instagram 1080x1080, YouTube 1280x720, Twitter 1500x500. Aspect ratio lock, no upload.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Image Resizer", "item": "https://www.generatorpromptai.com/tools/image-resizer" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to resize image to 1080x1080 for Instagram post online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upload your photo, click the Instagram Post preset (1080x1080), then click Resize Image. The tool automatically sets the correct dimensions and you can download the resized image as JPG, PNG or WebP."
      }
    },
    {
      "@type": "Question",
      "name": "Can I resize an image without losing quality?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, when resizing down (making smaller) quality is preserved very well with high quality output settings. Resizing up (enlarging) will cause some blurriness because pixels are being interpolated — this is a fundamental limitation of all image resizers."
      }
    },
    {
      "@type": "Question",
      "name": "How to resize image to 50 percent online for free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upload your image and click the 50% quick scale button. The width and height fields update automatically to half the original dimensions. Then click Resize Image to process and download."
      }
    },
    {
      "@type": "Question",
      "name": "What size for YouTube thumbnail 1280x720?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "YouTube thumbnails should be 1280x720 pixels in 16:9 aspect ratio. Select the YouTube Thumb preset in our tool and it sets 1280x720 automatically."
      }
    },
    {
      "@type": "Question",
      "name": "Does this image resizer upload my photos to a server?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. All resizing happens entirely in your browser using the HTML5 Canvas API. Your images are never uploaded, stored, or sent to any server."
      }
    },
    {
      "@type": "Question",
      "name": "How to resize photo for WhatsApp profile picture 500x500?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upload your photo, click the WhatsApp DP preset (500x500), then click Resize Image. Download the result and set it as your WhatsApp profile picture."
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
      <ImageResizer />
    </>
  )
}