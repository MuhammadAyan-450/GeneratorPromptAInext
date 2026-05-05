import PasswordGenerator from './PasswordGenerator'

export const metadata = {
  title: 'Generate Strong Random Password Online Free – Secure Password Maker with Strength Meter',
  description: 'Free online password generator using cryptographically secure crypto API. Create strong random passwords or memorable passphrases with real-time strength meter and time-to-crack estimate. No signup required.',
  keywords: "how to generate a strong random password online free, secure password generator with strength meter no signup, create unbreakable password with symbols and numbers, random passphrase generator for master password free, bulk password generator 10 passwords at once free, password generator exclude ambiguous characters online, cryptographically secure random password generator browser, free password generator with time to crack estimate, memorable passphrase generator random words online, best free password maker for every account 2026",
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/password-generator',
  },
  openGraph: {
    title: 'Generate Strong Random Password Online Free – Secure Password Maker',
    description: 'Create strong random passwords or passphrases with real-time strength meter and time-to-crack estimate. Free, secure, no signup.',
    url: 'https://www.generatorpromptai.com/tools/password-generator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Password Generator – Strong Random Passwords with Strength Meter',
    description: 'Generate cryptographically secure passwords with real-time strength analysis. Free online tool, no signup.',
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
  "name": "Generate Strong Random Password Online Free – Secure Password Maker with Strength Meter",
  "url": "https://www.generatorpromptai.com/tools/password-generator",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "All",
  "description": "Free online password generator using cryptographically secure crypto API. Create strong random passwords or memorable passphrases with real-time strength meter and time-to-crack estimate. No signup required.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Password Generator", "item": "https://www.generatorpromptai.com/tools/password-generator" }
  ]
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to generate a strong random password online free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Set the password length to 16 or more, enable all character types (uppercase, lowercase, numbers, symbols), and click Generate. Copy or download the result. No signup needed."
      }
    },
    {
      "@type": "Question",
      "name": "Is this password generator safe to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Our tool uses the browser's crypto.getRandomValues() API which produces cryptographically secure random numbers. Passwords are generated entirely in your browser and are never sent to any server."
      }
    },
    {
      "@type": "Question",
      "name": "What is a passphrase and when should I use one?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A passphrase is a string of random words separated by hyphens (e.g. 'tiger-castle-river-lamp'). Use passphrases for master passwords — they are easier to remember and type while still being highly secure."
      }
    },
    {
      "@type": "Question",
      "name": "How many characters should a secure password be?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A minimum of 12 characters for standard accounts. For high-security accounts like banking, email, or crypto wallets, use 16–20+ characters with a mix of uppercase, lowercase, numbers, and symbols."
      }
    },
    {
      "@type": "Question",
      "name": "Can I generate multiple passwords at once free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Select '5 at once' or '10 at once' in the Generate Mode section before clicking Generate. All passwords will appear in a list that you can copy or download as a text file."
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
      
      <PasswordGenerator />
    </>
  )
}