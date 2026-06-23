import QRCodeGenerator from './QrCodeGenerator'

// ✅ SEO Metadata — Title: 59 chars, Description: 158 chars
export const metadata = {
  title: 'QR Code Generator Online – Create WiFi & WhatsApp QR Free',
  
  description: 'Free QR code generator to create WiFi, website and WhatsApp QR codes. Simple, fast and secure online tool.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/qr-code-generator' },
  
  openGraph: {
    title: 'QR Code Generator Online – Create WiFi & WhatsApp QR Free',
    description: 'Free QR code generator to create WiFi, website and WhatsApp QR codes. Simple, fast and secure online tool.',
    url: 'https://www.generatorpromptai.com/tools/qr-code-generator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/qr-code-generator.png',
        width: 1200,
        height: 630,
        alt: 'QR Code Generator – Create Custom QR Codes Free',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'QR Code Generator Online – Create WiFi & WhatsApp QR Free',
    description: 'Free QR code generator to create WiFi, website and WhatsApp QR codes. Simple, fast and secure online tool.',
    images: ['https://www.generatorpromptai.com/og/qr-code-generator.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'qr code generator, wifi qr code, whatsapp qr code, url qr code, vcard qr code, free qr generator, custom qr code, png svg download, qr code with logo',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "QR Code Generator – Create WiFi URL WhatsApp QR Free Online",
  "url": "https://www.generatorpromptai.com/tools/qr-code-generator",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Free QR code generator to create WiFi, website and WhatsApp QR codes. Simple, fast and secure online tool.s",
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
  "featureList": "8 content type presets (URL/WiFi/WhatsApp/vCard/etc), real-time contrast ratio checker, 4 error correction levels, PNG & SVG download, clipboard copy, customizable colors, 100% client-side privacy, no signup required"
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
      "name": "QR Code Generator", 
      "item": "https://www.generatorpromptai.com/tools/qr-code-generator" 
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
    },
    {
      "@type": "Question",
      "name": "Is my QR code data stored or shared?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Never. All QR generation happens locally in your browser. Your URLs, WiFi passwords, and contact info are never sent to servers, stored, or tracked."
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
      <QRCodeGenerator />
    </>
  )
}