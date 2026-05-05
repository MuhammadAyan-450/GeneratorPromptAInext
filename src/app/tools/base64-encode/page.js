import Base64Encoder from './Base64Encoder'

export const metadata = {
  title: 'Encode Text to Base64 Online Free – Decode Base64 to UTF-8 String',
  description: 'Encode text to Base64 and decode Base64 strings back to UTF-8 text instantly. Supports emojis, special characters, and unicode. Free online Base64 converter – no signup.',
  keywords: 'encode text to base64 online, decode base64 to utf-8 text, base64 string converter with emojis, how to convert text to base64 manually, base64 encoding for utf-8 special characters, decode base64 string to readable text, free base64 encoder decoder tool, base64 to text converter online',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/base64-encode',
  },
  openGraph: {
    title: 'Encode Text to Base64 Online Free – Decode Base64 to UTF-8',
    description: 'Convert text to Base64 and decode Base64 strings back to readable UTF-8 text. Supports emojis and special characters.',
    url: 'https://www.generatorpromptai.com/tools/base64-encode',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Encode Text to Base64 Online – UTF-8 & Emoji Support',
    description: 'Free Base64 encoder and decoder. Convert text to Base64 and back. Supports emojis and special characters.',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Encode Text to Base64 Online & Decode Base64 to UTF-8",
  "url": "https://www.generatorpromptai.com/tools/base64-encode",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "All",
  "description": "Free online tool to encode text to Base64 and decode Base64 strings back to UTF-8 text. Supports emojis and special characters.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Base64 Encoder Decoder", "item": "https://www.generatorpromptai.com/tools/base64-encode" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to encode text to Base64 online?",
      "acceptedAnswer": { "@type": "Answer", "text": "Paste your plain text into the tool above and click 'Encode to Base64'. Your text will instantly be converted into a Base64 string that you can copy or download." }
    },
    {
      "@type": "Question",
      "name": "How to decode a Base64 string back to readable text?",
      "acceptedAnswer": { "@type": "Answer", "text": "Paste your Base64 encoded string into the tool and click 'Decode from Base64'. The tool will convert it back to readable plain text instantly." }
    },
    {
      "@type": "Question",
      "name": "Does this Base64 converter support emojis and UTF-8?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Unlike basic encoders that break on special characters, our tool uses advanced UTF-8 encoding logic. You can safely encode and decode emojis, non-English text, and special symbols without any corruption." }
    },
    {
      "@type": "Question",
      "name": "Is Base64 the same as encryption?",
      "acceptedAnswer": { "@type": "Answer", "text": "No, Base64 is an encoding format, not encryption. It simply converts data into a different format using a public algorithm. Anyone can easily decode a Base64 string, so never use it to hide sensitive data like passwords." }
    },
    {
      "@type": "Question",
      "name": "Can I encode special characters to Base64?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our tool handles all special characters, symbols, and unicode text properly. It converts them into Base64 format accurately and decodes them back without losing any data." }
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
      <Base64Encoder />
    </>
  )
}