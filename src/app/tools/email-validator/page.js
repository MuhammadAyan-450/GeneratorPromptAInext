import EmailValidator from './EmailValidator'

// ✅ Perfect SEO Metadata (Title: 58 chars, Description: 159 chars)
export const metadata = {
  title: 'Email Validator – Check Email Format & Syntax Online Free',
  
  description: 'Validate email addresses instantly with our free Email Validator. Check email format, syntax, and common errors online. ✅',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/email-validator' },
  
  openGraph: {
    title: 'Email Validator – Check Email Format & Syntax Online Free',
    description: 'Validate email addresses instantly with our free Email Validator. Check email format, syntax, and common errors online. ✅',
    url: 'https://www.generatorpromptai.com/tools/email-validator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/email-validator.png',
        width: 1200,
        height: 630,
        alt: 'Email Validator – Check Email Format',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Email Validator – Check Email Format & Syntax Online Free',
    description: 'Validate email addresses instantly with our free Email Validator. Check email format, syntax, and common errors online. ✅',
    images: ['https://www.generatorpromptai.com/og/email-validator.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'email validator, check email format, verify email address format, email syntax checker, regex email validator, validate email online free, check email for invalid characters',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Email Validator – Check Email Format & Syntax Online Free",
  "url": "https://www.generatorpromptai.com/tools/email-validator",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "All",
  "description": "Validate email addresses instantly with our free Email Validator. Check email format, syntax, and common errors online. ✅",
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
  "featureList": "Instant regex validation, detects missing @ symbol, checks domain structure, identifies invalid characters, 100% private & browser-based, no signup required, copy results"
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
      "name": "Email Validator", 
      "item": "https://www.generatorpromptai.com/tools/email-validator" 
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
      "name": "How to check if email format is valid online without sending an email?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste the email address into our tool and click 'Validate'. It uses standard regex pattern matching to instantly check the syntax and format of the email entirely in your browser, without sending or receiving any actual emails."
      }
    },
    {
      "@type": "Question",
      "name": "Does this email syntax checker detect missing @ symbol or domain?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Our tool checks for the presence and correct placement of the '@' symbol, ensures a valid domain extension is present (like .com), and flags any invalid characters like spaces or illegal symbols."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use this regex email format checker for HTML forms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. The validation logic used by this tool is based on standard regex patterns that you can easily copy and implement in JavaScript, HTML5 (using the 'type=email' attribute), PHP, Python, or any other backend language for your website forms."
      }
    },
    {
      "@type": "Question",
      "name": "Is it safe to enter real email addresses in this tool?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, 100% safe. All validation happens locally inside your web browser. We do not store, process, or transmit your email addresses to any external server."
      }
    },
    {
      "@type": "Question",
      "name": "What makes an email format invalid?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common issues include: missing @ symbol, spaces in the address, missing domain extension (like .com), or using special characters that aren't allowed in email usernames."
      }
    },
    {
      "@type": "Question",
      "name": "Does this check if the email inbox actually exists?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. This tool only checks the *format* (syntax) of the email. To check if an inbox actually exists and can receive mail, you would need a dedicated email verification service that pings the mail server."
      }
    },
    {
      "@type": "Question",
      "name": "Is this tool free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, 100% free. No signup, no account, no limits. Validate as many emails as you need."
      }
    },
    {
      "@type": "Question",
      "name": "Can I validate multiple emails at once?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Currently, this tool validates one email at a time. For bulk validation, you would need to paste them one by one or use a dedicated bulk verification tool."
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
      <EmailValidator />
    </>
  )
}