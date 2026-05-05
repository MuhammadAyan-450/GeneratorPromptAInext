import QRCodeGenerator from './QRCodeGenerator'

export const metadata = {
  title: 'Create Custom QR Code for WiFi URL WhatsApp Free Online – Download PNG SVG',
  description: 'Free online QR code generator — create custom QR codes for URLs, WiFi, WhatsApp, vCard contacts, email and SMS. Custom colors, sizes, error correction. Download as PNG or SVG. No signup required.',
  keywords: "how to create a qr code for a website url free online, make wifi qr code for guests free no signup, custom qr code with logo and colors download free, whatsapp chat qr code generator with pre filled message, vcard contact qr code maker free online tool, create qr code for email and sms free download png, free qr code generator with error correction levels, best qr code size for printing business cards free, qr code generator download svg png high resolution, free online qr maker for restaurants menus and events 2026",
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/qr-code-generator',
  },
  openGraph: {
    title: 'Create Custom QR Code Free – WiFi, URL, WhatsApp, vCard | Download PNG SVG',
    description: 'Generate custom QR codes for any purpose. URLs, WiFi, WhatsApp, contacts. Download PNG or SVG. Free, private, no signup.',
    url: 'https://www.generatorpromptai.com/tools/qr-code-generator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free QR Code Generator – URL, WiFi, WhatsApp, vCard',
    description: 'Create custom QR codes instantly. Download as PNG or SVG. Free online tool, no signup.',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

// JSON-LD Schemas
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Create Custom QR Code for WiFi URL WhatsApp Free Online – Download PNG SVG",
  "url": "https://www.generatorpromptai.com/tools/qr-code-generator",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Free online QR code generator. Create custom QR codes for URLs, WiFi, vCard contacts, WhatsApp, email, SMS and more. Custom colors, sizes, error correction. Download as PNG or SVG. 100% private, no signup.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "QR Code Generator", "item": "https://www.generatorpromptai.com/tools/qr-code-generator" }
  ]
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to create a QR code for a website URL free online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Select the URL preset, paste your website link in the input box, and the QR code generates instantly. Choose your size and error correction level, then download as PNG or SVG. No signup required."
      }
    },
    {
      "@type": "Question",
      "name": "How to make a WiFi QR code for guests?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Select the WiFi preset, replace 'NetworkName' with your WiFi SSID and 'Password' with your WiFi password. Guests can scan the QR to connect automatically without typing the password."
      }
    },
    {
      "@type": "Question",
      "name": "What error correction level should I use for QR code with logo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use High (25%) if adding a logo overlay in the center. Use Max (30%) for printed QR codes on curved surfaces like cups, bottles, or outdoor signage. Medium (15%) is fine for general digital use."
      }
    },
    {
      "@type": "Question",
      "name": "Can I create a WhatsApp chat QR code free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Select the WhatsApp preset, replace the phone number with your number including country code (e.g. 923001234567 for Pakistan), and optionally customize the pre-filled message. Download and share the QR."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best QR code size for printing on business cards?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Download at 512px for business cards and small print items. For A5-A4 prints use 1024px. For best quality on any size, download as SVG format which scales infinitely without quality loss."
      }
    }
  ]
};

export default function Page() {
  return (
    <>
      {/* Structured Data Scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      
      <QRCodeGenerator />
    </>
  )
}