import EmailValidator from './EmailValidator'

export const metadata = {
  title: 'Check if Email Format is Valid Online – Email Syntax Checker for Forms',
  description: 'Verify email address format and structure online without sending an email. Check for missing @ symbols, invalid domains, and bad characters instantly. Free email syntax checker for developers and HTML forms.',
  keywords: 'how to check if email format is valid online, email syntax checker for html forms, verify email address format without sending email, check email address for invalid characters online, regex email format checker tool, is this email format valid test, email structure validator free',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/email-validator',
  },
  openGraph: {
    title: 'Check if Email Format is Valid Online – Email Syntax Checker',
    description: 'Verify email address format and structure instantly. Check for missing @, invalid domains, and bad characters. Free online tool.',
    url: 'https://www.generatorpromptai.com/tools/email-validator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Email Syntax Checker – Verify Email Format Without Sending',
    description: 'Check if an email address format is valid instantly. Safe, private, browser-based validation tool.',
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
  "name": "Check if Email Format is Valid Online Without Sending",
  "url": "https://www.generatorpromptai.com/tools/email-validator",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Free email syntax checker tool. Verify email address format and structure for HTML forms instantly in your browser without sending an email.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Email Validator", "item": "https://www.generatorpromptai.com/tools/email-validator" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to check if email format is valid online without sending an email?",
      "acceptedAnswer": { "@type": "Answer", "text": "Paste the email address into our tool and click 'Validate'. It uses standard regex pattern matching to instantly check the syntax and format of the email entirely in your browser, without sending or receiving any actual emails." }
    },
    {
      "@type": "Question",
      "name": "Does this email syntax checker detect missing @ symbol or domain?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our tool checks for the presence and correct placement of the '@' symbol, ensures a valid domain extension is present (like .com), and flags any invalid characters like spaces or illegal symbols." }
    },
    {
      "@type": "Question",
      "name": "Can I use this regex email format checker for HTML forms?",
      "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. The validation logic used by this tool is based on standard regex patterns that you can easily copy and implement in JavaScript, HTML5 (using the 'type=email' attribute), PHP, Python, or any other backend language for your website forms." }
    },
    {
      "@type": "Question",
      "name": "Is it safe to enter real email addresses in this tool?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, 100% safe. All validation happens locally inside your web browser. We do not store, process, or transmit your email addresses to any external server." }
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
      <EmailValidator />
    </>
  )
}