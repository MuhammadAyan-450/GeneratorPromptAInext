import ImageCropper from './ImageCropper'

export const metadata = {
  title: 'Crop Image to 1:1 for Instagram Profile Picture Online – Free Aspect Ratio Tool',
  description: 'Free online image cropper with social media presets. Crop to 1:1 for Instagram, 9:16 for TikTok, 16:9 for YouTube thumbnails. Rotate, preview and download as JPG, PNG or WebP. No server upload.',
  keywords: 'how to crop image to 1 1 for instagram profile picture online, what aspect ratio for youtube thumbnail 1280x720, crop image to 9 16 for tiktok video cover free, crop whatsapp profile picture to square online, free image cropper with custom aspect ratio no upload, crop photo for instagram story without app, online image cropper with rotate and preview, crop image for facebook cover photo size, crop to specific aspect ratio online free tool, best free online image cropper for social media 2026',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/image-cropper',
  },
  openGraph: {
    type: 'website',
    siteName: 'GeneratorPromptAI',
    title: 'Crop Image to 1:1 for Instagram Profile Picture Online – Free Tool',
    description: 'Free image cropper with Instagram, TikTok, YouTube presets. Crop, rotate, preview and download. No server upload.',
    url: 'https://www.generatorpromptai.com/tools/image-cropper',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image Cropper – 1:1 Instagram, 9:16 TikTok, 16:9 YouTube',
    description: 'Crop images online with social media aspect ratio presets. Rotate, preview, download. No server upload.',
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
}

// ── JSON-LD Schemas ──
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Crop Image to 1:1 for Instagram Profile Picture Online – Free Aspect Ratio Tool",
  "url": "https://www.generatorpromptai.com/tools/image-cropper",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Free online image cropper with social media presets. Crop to 1:1 for Instagram, 9:16 for TikTok, 16:9 for YouTube thumbnails. Rotate, preview and download as JPG, PNG or WebP. No server upload.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Image Cropper", "item": "https://www.generatorpromptai.com/tools/image-cropper" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to crop image to 1:1 for Instagram profile picture online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upload your photo, click the Instagram Post or Square 1:1 preset, then drag to adjust the crop area. The tool locks the 1:1 aspect ratio automatically so your profile picture fits perfectly. Download as JPG, PNG or WebP."
      }
    },
    {
      "@type": "Question",
      "name": "What aspect ratio for YouTube thumbnail 1280x720?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "YouTube thumbnails use 16:9 aspect ratio at 1280x720 pixels. Select the YouTube Thumb preset in our tool and it automatically sets the correct 16:9 crop ratio."
      }
    },
    {
      "@type": "Question",
      "name": "How to crop image to 9:16 for TikTok video cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upload your image, click the TikTok preset (9:16), and drag to position the crop area. The 9:16 vertical ratio matches TikTok's full-screen format perfectly."
      }
    },
    {
      "@type": "Question",
      "name": "Can I crop and rotate image at the same time online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Use the rotate buttons to turn your image 90 degrees left or right, then drag the crop handles to select the area. Both rotation and cropping happen in real-time with a live preview."
      }
    },
    {
      "@type": "Question",
      "name": "Does this image cropper upload my photos to a server?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. All cropping and rotation happens entirely in your browser using JavaScript and the HTML5 Canvas API. Your images are never uploaded, stored, or sent to any server."
      }
    },
    {
      "@type": "Question",
      "name": "How to crop WhatsApp profile picture to square without cutting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upload your photo and select the WhatsApp DP preset (1:1 square). Position the crop box over the area you want to keep — the face should be centered. Download and set as your WhatsApp profile picture."
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
      <ImageCropper />
    </>
  )
}