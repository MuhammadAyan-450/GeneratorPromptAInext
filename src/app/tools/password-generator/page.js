import PasswordGenerator from './PasswordGenerator'

// ✅ SEO Metadata (Title: 58 chars, Description: 159 chars)
export const metadata = {
  title: 'Free Password Generator – Secure Random Password Tool',
  
  description: 'Generate strong and secure random passwords instantly. Free online password generator for safe accounts and privacy protection.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/password-generator' },
  
  openGraph: {
    title: 'Free Password Generator – Secure Random Password Tool',
    description: 'Generate strong and secure random passwords instantly. Free online password generator for safe accounts and privacy protection.',
    url: 'https://www.generatorpromptai.com/tools/password-generator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/password-generator.png',
        width: 1200,
        height: 630,
        alt: 'Password Generator – Create Secure Random Passwords',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Free Password Generator – Secure Random Password Tool',
    description: 'Generate strong and secure random passwords instantly. Free online password generator for safe accounts and privacy protection.',
    images: ['https://www.generatorpromptai.com/og/password-generator.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'password generator, secure password maker, random password generator, passphrase generator, crypto password tool, strength meter password, bulk password generator, free password tool, browser password generator, cryptographically secure passwords',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Password Generator – Free Secure Random Password Maker Online",
  "url": "https://www.generatorpromptai.com/tools/password-generator",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "All",
  "description": "Generate strong and secure random passwords instantly. Free online password generator for safe accounts and privacy protection.",
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
  "featureList": "Cryptographically secure generation with crypto.getRandomValues(), real-time strength meter (0-100%), time-to-crack estimate, passphrase mode with 60+ word pool, bulk generation (1/5/10 at once), customizable length (8-64 chars) and character types, ambiguous character exclusion, copy to clipboard or download as .txt, 100% client-side processing with pure JavaScript, no signup required"
}

// ─── JSON-LD: BreadcrumbList Schema ─────────────────────────────────────────
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Password Generator", "item": "https://www.generatorpromptai.com/tools/password-generator" }
  ]
}

// ─── JSON-LD: FAQPage Schema ────────────────────────────────────────────────
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to generate a strong random password online free?",
      "acceptedAnswer": { "@type": "Answer", "text": "Set the password length to 16 or more, enable all character types (uppercase, lowercase, numbers, symbols), and click Generate. Copy or download the result. No signup or installation needed." }
    },
    {
      "@type": "Question",
      "name": "Is this password generator safe to use?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our tool uses the browser's crypto.getRandomValues() API which produces cryptographically secure random numbers. Passwords are generated entirely in your browser and are never transmitted to any server." }
    },
    {
      "@type": "Question",
      "name": "What is a passphrase and when should I use one?",
      "acceptedAnswer": { "@type": "Answer", "text": "A passphrase is a string of random words separated by hyphens (e.g. 'tiger-castle-river-lamp'). Use passphrases for master passwords — they are easier to remember and type while still being highly secure against brute-force attacks." }
    },
    {
      "@type": "Question",
      "name": "How many characters should a secure password be?",
      "acceptedAnswer": { "@type": "Answer", "text": "A minimum of 12 characters for standard accounts. For high-security accounts like banking, email, or crypto wallets, use 16–20+ characters with a mix of uppercase, lowercase, numbers, and symbols." }
    },
    {
      "@type": "Question",
      "name": "Can I generate multiple passwords at once free?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Select '5 at once' or '10 at once' in the Generate Mode section before clicking Generate. All passwords will appear in a list that you can copy individually or download as a text file." }
    },
    {
      "@type": "Question",
      "name": "Does this tool work offline?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Once the page loads, all password generation happens locally in your browser. You can use it without an internet connection after the initial load." }
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
      <PasswordGenerator />
    </>
  )
}