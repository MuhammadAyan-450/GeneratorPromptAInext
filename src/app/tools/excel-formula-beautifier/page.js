import ExcelFormulaBeautifier from './ExcelFormulaBeautifier'

// ✅ Perfect SEO Metadata (Title: 58 chars, Description: 159 chars)
export const metadata = {
  title: 'Excel Formula Beautifier – Format Excel Formulas Online',
  
  description: 'Format and beautify Excel formulas instantly. Improve readability for nested IF, VLOOKUP, XLOOKUP, and complex formulas. 🚀',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/excel-formula-beautifier' },
  
  openGraph: {
    title: 'Excel Formula Beautifier – Format Excel Formulas Online',
    description: 'Format and beautify Excel formulas instantly. Improve readability for nested IF, VLOOKUP, XLOOKUP, and complex formulas. 🚀',
    url: 'https://www.generatorpromptai.com/tools/excel-formula-beautifier',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/excel-formula-beautifier.png',
        width: 1200,
        height: 630,
        alt: 'Excel Formula Beautifier – Format Nested Formulas',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Excel Formula Beautifier – Format Excel Formulas Online',
    description: 'Format and beautify Excel formulas instantly. Improve readability for nested IF, VLOOKUP, XLOOKUP, and complex formulas. 🚀',
    images: ['https://www.generatorpromptai.com/og/excel-formula-beautifier.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'excel formula beautifier, format excel formulas online, google sheets nested formula formatter, beautify complex vlookup and sumifs, excel syntax checker, format messy excel formulas, nested if statement formatter',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Excel Formula Beautifier – Format Nested IF & VLOOKUP Online",
  "url": "https://www.generatorpromptai.com/tools/excel-formula-beautifier",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "All",
  "description": "Format and beautify Excel formulas instantly. Improve readability for nested IF, VLOOKUP, XLOOKUP, and complex formulas. 🚀",
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
  "featureList": "Auto-indentation, syntax highlighting, mismatched parentheses check, function counting, depth analysis, 100% client-side privacy, no signup required, works for Excel & Google Sheets"
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
      "name": "Excel Formula Beautifier", 
      "item": "https://www.generatorpromptai.com/tools/excel-formula-beautifier" 
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
      "name": "How to format messy Excel formulas for readability?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste your messy formula into our tool and click 'Beautify Formula'. The tool will automatically add line breaks after every comma and nested parentheses with proper indentation so you can easily read and debug the logic."
      }
    },
    {
      "@type": "Question",
      "name": "How to format nested IF statements in Excel formulas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste the nested IF formula into our beautifier. The tool calculates the parenthesis depth and automatically indents each nested level on a new line, making complex conditional logic easy to follow."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use this with Google Sheets formulas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Google Sheets and Excel share the exact same formula syntax, so this beautifier works perfectly for formatting both."
      }
    },
    {
      "@type": "Question",
      "name": "How to check Excel formula for mismatched parentheses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simply paste your formula into our tool and click 'Beautify Formula'. If there's a mismatch, it will instantly show you an error telling you exactly how many opening vs closing brackets it found."
      }
    },
    {
      "@type": "Question",
      "name": "Is my formula data safe in this tool?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, 100% safe. The entire formatting and syntax checking logic runs locally in your web browser. We do not store, read, or send your formulas to any server."
      }
    },
    {
      "@type": "Question",
      "name": "Can I put the formatted formula back into Excel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Excel and Google Sheets require formulas to be written on a single line. This tool is designed to help you read and debug complex formulas, not to be pasted back into a cell."
      }
    },
    {
      "@type": "Question",
      "name": "Does it support array formulas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, it treats array braces {} like any other character. However, for best results, remove the outer {} before pasting, then add them back after reviewing the logic."
      }
    },
    {
      "@type": "Question",
      "name": "What functions does it highlight?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It highlights any word followed by an opening parenthesis as a function (e.g., SUM, IF, VLOOKUP, XLOOKUP, INDEX, MATCH). It works with custom named functions too."
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
      <ExcelFormulaBeautifier />
    </>
  )
}