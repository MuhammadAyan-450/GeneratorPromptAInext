import ImageToText from './ImageToText'

// ✅ SEO Metadata (Title: 59 chars, Description: 159 chars)
export const metadata = {
  title: 'Free Image to Text OCR – Extract Urdu & English Text',
  
  description: 'Extract Urdu & English text from images instantly with free OCR tool. Fast, accurate and easy image to text converter online.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/image-to-text' },
  
  openGraph: {
    title: 'Free Image to Text OCR – Extract Urdu & English Text',
    description: 'Extract Urdu & English text from images instantly with free OCR tool. Fast, accurate and easy image to text converter online.',
    url: 'https://www.generatorpromptai.com/tools/image-to-text',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/image-to-text.png',
        width: 1200,
        height: 630,
        alt: 'Image to Text OCR – Extract Text from Photos in Urdu & English',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image to Text OCR – Extract Urdu & English Text',
    description: 'Extract Urdu & English text from images instantly with free OCR tool. Fast, accurate and easy image to text converter online.',
    images: ['https://www.generatorpromptai.com/og/image-to-text.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'image to text, ocr tool, extract text from image, urdu ocr, english ocr, screenshot to text, scanned document ocr, free ocr online, tesseract js, browser ocr',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Image to Text OCR – Extract Urdu English Text from Photos Free",
  "url": "https://www.generatorpromptai.com/tools/image-to-text",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Extract Urdu & English text from images instantly with free OCR tool. Fast, accurate and easy image to text converter online.",
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
  "featureList": "10+ language support including Urdu + English bilingual, editable output with real-time word/char counts, confidence scoring (0-100%), copy to clipboard or download as .txt, OCR tips for best results, 100% client-side processing with Tesseract.js WebAssembly, no signup required"
}

// ─── JSON-LD: BreadcrumbList Schema ─────────────────────────────────────────
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Image to Text", "item": "https://www.generatorpromptai.com/tools/image-to-text" }
  ]
}

// ─── JSON-LD: FAQPage Schema ────────────────────────────────────────────────
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to extract Urdu text from image online for free?",
      "acceptedAnswer": { "@type": "Answer", "text": "Upload your image containing Urdu text, select 'English + Urdu' as the language, and click Extract Text. Our OCR tool uses Tesseract.js to recognize Urdu characters directly in your browser without uploading to any server." }
    },
    {
      "@type": "Question",
      "name": "Can I extract text from scanned document without uploading?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our OCR tool runs entirely in your browser. Take a photo or scan of your document, upload it, and the text extraction happens locally. The image is never sent to any server." }
    },
    {
      "@type": "Question",
      "name": "Does this OCR tool support Arabic and Hindi text?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our tool supports Arabic, Hindi, Urdu, English, French, German, Spanish, Chinese (Simplified), and Russian. Select the appropriate language from the dropdown before extracting text." }
    },
    {
      "@type": "Question",
      "name": "How to convert screenshot to text online free?",
      "acceptedAnswer": { "@type": "Answer", "text": "Take a screenshot, upload it to our tool, and click Extract Text. Screenshots with clear, typed text give the best OCR results. You can then edit, copy, or download the extracted text as a .txt file." }
    },
    {
      "@type": "Question",
      "name": "What is OCR and how accurate is it?",
      "acceptedAnswer": { "@type": "Answer", "text": "OCR (Optical Character Recognition) reads text from images by analyzing pixel patterns. Accuracy depends on image quality — clear, high-resolution, high-contrast images with printed text typically achieve 80-95% accuracy. Our tool shows the confidence score after extraction." }
    },
    {
      "@type": "Question",
      "name": "Can I edit the extracted text before downloading?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. The extracted text appears in an editable text area. You can correct any OCR errors manually before copying to clipboard or downloading as a .txt file." }
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
      <ImageToText />
    </>
  )
}