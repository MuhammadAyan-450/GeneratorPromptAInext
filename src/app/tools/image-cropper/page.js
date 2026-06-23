import ImageCropper from "./ImageCropper";

// ✅ SEO Metadata (Title: 59 chars, Description: 159 chars)
export const metadata = {
  title: "Free Image Cropper – Crop Photos for Instagram TikTok",

  description:
    "Free image cropper for Instagram, TikTok & YouTube. Crop photos instantly with perfect sizes for social media posts.",

  alternates: {
    canonical: "https://www.generatorpromptai.com/tools/image-cropper",
  },

  openGraph: {
    title: "Free Image Cropper – Crop Photos for Instagram TikTok",
    description:
      "Free image cropper for Instagram, TikTok & YouTube. Crop photos instantly with perfect sizes for social media posts.",
    url: "https://www.generatorpromptai.com/tools/image-cropper",
    siteName: "GeneratorPromptAI",
    type: "website",
    images: [
      {
        url: "https://www.generatorpromptai.com/og/image-cropper.png",
        width: 1200,
        height: 630,
        alt: "Image Cropper – Crop Photos for Social Media Platforms",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free Image Cropper – Crop Photos for Instagram TikTok",
    description:
      "Free image cropper for Instagram, TikTok & YouTube. Crop photos instantly with perfect sizes for social media posts.",
    images: ["https://www.generatorpromptai.com/og/image-cropper.png"],
  },

  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },

  keywords:
    "image cropper, crop image online, instagram crop tool, tiktok image cropper, youtube thumbnail cropper, aspect ratio crop, free image editor, browser image crop, social media presets, photo cropper online",
};

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Image Cropper – Crop Photos for Instagram TikTok YouTube Free",
  url: "https://www.generatorpromptai.com/tools/image-cropper",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "All",
  description:
    "Free image cropper for Instagram, TikTok & YouTube. Crop photos instantly with perfect sizes for social media posts.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  creator: {
    "@type": "Organization",
    name: "GeneratorPromptAI",
    url: "https://www.generatorpromptai.com",
  },
  featureList:
    "12 social media presets (1:1, 9:16, 16:9, etc.), live crop preview with rule-of-thirds grid, rotate 90° left/right, export to JPG/PNG/WebP, quality control for lossy formats, 100% client-side processing, no signup required",
};

// ─── JSON-LD: BreadcrumbList Schema ─────────────────────────────────────────
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.generatorpromptai.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "All Free Tools",
      item: "https://www.generatorpromptai.com/pages/all-tools",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Image Cropper",
      item: "https://www.generatorpromptai.com/tools/image-cropper",
    },
  ],
};

// ─── JSON-LD: FAQPage Schema ────────────────────────────────────────────────
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How to crop image to 1:1 for Instagram profile picture online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your photo, click the Instagram Post or Square 1:1 preset, then drag to adjust the crop area. The tool locks the 1:1 aspect ratio automatically so your profile picture fits perfectly. Download as JPG, PNG or WebP.",
      },
    },
    {
      "@type": "Question",
      name: "What aspect ratio for YouTube thumbnail 1280x720?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "YouTube thumbnails use 16:9 aspect ratio at 1280x720 pixels. Select the YouTube Thumb preset in our tool and it automatically sets the correct 16:9 crop ratio.",
      },
    },
    {
      "@type": "Question",
      name: "How to crop image to 9:16 for TikTok video cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your image, click the TikTok preset (9:16), and drag to position the crop area. The 9:16 vertical ratio matches TikTok's full-screen format perfectly.",
      },
    },
    {
      "@type": "Question",
      name: "Can I crop and rotate image at the same time online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Use the rotate buttons to turn your image 90 degrees left or right, then drag the crop handles to select the area. Both rotation and cropping happen in real-time with a live preview.",
      },
    },
    {
      "@type": "Question",
      name: "Does this image cropper upload my photos to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All cropping and rotation happens entirely in your browser using JavaScript and the HTML5 Canvas API. Your images are never uploaded, stored, or sent to any server.",
      },
    },
    {
      "@type": "Question",
      name: "How to crop WhatsApp profile picture to square without cutting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your photo and select the WhatsApp DP preset (1:1 square). Position the crop box over the area you want to keep — the face should be centered. Download and set as your WhatsApp profile picture.",
      },
    },
  ],
};

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
      <ImageCropper />
    </>
  );
}
