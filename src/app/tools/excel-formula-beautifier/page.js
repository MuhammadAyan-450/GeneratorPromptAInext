import ExcelFormulaBeautifier from './ExcelFormulaBeautifier'

export const metadata = {
  title: 'Format Messy Excel Formulas Online – Nested IF Statement Formatter',
  description: 'Format messy Excel and Google Sheets formulas for readability. Add proper indentation, line breaks, and check for mismatched parentheses instantly. Free online formula beautifier tool – no signup.',
  keywords: 'how to format messy excel formulas, format nested if statement in excel online, excel formula beautifier with syntax highlighting, google sheets nested formula formatter, readable nested if statement formatter, excel formula line breaker tool, check excel formula for mismatched parentheses online, beautify complex vlookup and sumifs formulas, format long excel formulas for debugging, make unreadable excel formulas readable',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/excel-formula-beautifier',
  },
  openGraph: {
    title: 'Format Messy Excel Formulas Online – Nested IF Statement Formatter',
    description: 'Format messy Excel and Google Sheets formulas with proper indentation and line breaks. Check for mismatched parentheses.',
    url: 'https://www.generatorpromptai.com/tools/excel-formatter',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Excel Formula Beautifier – Format Messy Formulas for Readability',
    description: 'Format messy Excel and Google Sheets formulas with proper indentation. Check for mismatched parentheses.',
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
  "name": "Format Messy Excel Formulas with Proper Indentation Online",
  "url": "https://www.generatorpromptai.com/tools/excel-formula-beautifier",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "All",
  "description": "Free online tool to beautify messy Excel and Google Sheets formulas. Adds proper indentation, line breaks, and catches mismatched parentheses instantly.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Excel Formula Beautifier", "item": "https://www.generatorpromptai.com/tools/excel-formula-beautifier" }
  ]
}

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
        "Text": "Paste the nested IF formula into our beautifier. The tool calculates the parenthesis depth and automatically indents each nested level on a new line, making complex conditional logic easy to follow."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use this with Google Sheets formulas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "Text": "Yes. Google Sheets and Excel share the exact same formula syntax, so this beautifier works perfectly for formatting both."
      }
    },
    {
      "@type": "Question",
      "name": "How to check Excel formula for mismatched parentheses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "Text": "Simply paste your formula into our tool and click 'Beautify Formula'. If there's a mismatch, it will instantly show you an error telling you exactly how many opening vs closing brackets it found."
      }
    },
    {
      "@type": "Question",
      "name": "Is my formula data safe in this tool?",
      "acceptedAnswer": {
        "@type": "Answer",
        "Text": "Yes, 100% safe. The entire formatting and syntax checking logic runs locally in your web browser. We do not store, read, or send your formulas to any server."
      }
    },
    {
      "@type": "Question",
      "name": "Can I put the formatted formula back into Excel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "Text": "No. Excel and Google Sheets require formulas to be written on a single line. This tool is designed to help you read and debug complex formulas, not to be pasted back into a cell."
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
      <ExcelFormulaBeautifier />
    </>
  )
}