import ImageToText from './ImageToText'

export const metadata = {
  title: 'Extract Urdu Text from Image Online Free – OCR Tool for English & Urdu Documents',
  description: 'Free online OCR tool — extract Urdu and English text from images, scanned documents and screenshots. Supports 10+ languages. Edit, copy or download extracted text. 100% browser-based, no server upload.',
  keywords: 'how to extract urdu text from image online free, extract text from scanned document without uploading, urdu ocr online free no server upload, convert screenshot to text online free tool, arabic ocr online free browser based, hindi text extraction from image free, photo to text converter for pakistani documents, extract text from image without losing formatting free, free online ocr tool for multiple languages, best free ocr for urdu and english mixed documents',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/image-to-text',
  },
  openGraph: {
    type: 'website',
    siteName: 'GeneratorPromptAI',
    title: 'Extract Urdu Text from Image Online Free – OCR Tool',
    description: 'Extract Urdu, English, Arabic, Hindi text from images. Edit, copy, download. 100% browser-based, no server upload.',
    url: 'https://www.generatorpromptai.com/tools/image-to-text',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free OCR – Extract Urdu & English Text from Image Online',
    description: 'Extract text from images in 10+ languages. Urdu, Arabic, Hindi supported. Edit, copy, download. No server upload.',
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
}

// ── JSON-LD Schemas ──
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Extract Urdu Text from Image Online Free – OCR Tool for English and Urdu Documents",
  "url": "https://www.generatorpromptai.com/tools/image-to-text",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Free online OCR tool to extract Urdu and English text from images, scanned documents and screenshots. Edit, copy or download extracted text. 100% browser-based, no upload to server.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Image to Text", "item": "https://www.generatorpromptai.com/tools/image-to-text" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to extract Urdu text from image online for free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upload your image containing Urdu text, select 'English + Urdu' as the language, and click Extract Text. Our OCR tool uses Tesseract.js to recognize Urdu characters directly in your browser without uploading to any server."
      }
    },
    {
      "@type": "Question",
      "name": "Can I extract text from scanned document without uploading?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Our OCR tool runs entirely in your browser. Take a photo or scan of your document, upload it, and the text extraction happens locally. The image is never sent to any server."
      }
    },
    {
      "@type": "Question",
      "name": "Does this OCR tool support Arabic and Hindi text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Our tool supports Arabic, Hindi, Urdu, English, French, German, Spanish, Chinese (Simplified), and Russian. Select the appropriate language from the dropdown before extracting text."
      }
    },
    {
      "@type": "Question",
      "name": "How to convert screenshot to text online free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Take a screenshot, upload it to our tool, and click Extract Text. Screenshots with clear, typed text give the best OCR results. You can then edit, copy, or download the extracted text as a .txt file."
      }
    },
    {
      "@type": "Question",
      "name": "What is OCR and how accurate is it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "OCR (Optical Character Recognition) reads text from images by analyzing pixel patterns. Accuracy depends on image quality — clear, high-resolution, high-contrast images with printed text typically achieve 80-95% accuracy. Our tool shows the confidence score after extraction."
      }
    },
    {
      "@type": "Question",
      "name": "Can I edit the extracted text before downloading?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The extracted text appears in an editable text area. You can correct any OCR errors manually before copying to clipboard or downloading as a .txt file."
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
      <ImageToText />
    </>
  )
}