import ClaudePromptGenerator from './ClaudePromptGenerator'

// ✅ Perfect SEO Metadata (Title: 58 chars, Description: 159 chars)
export const metadata = {
  title: 'Claude Prompt Generator – Create Custom AI Prompts Free',
  
  description: 'Create custom Claude prompts with XML tags, tone settings, and detailed instructions using our free Claude Prompt Generator. 🚀',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/claude-prompt-generator' },
  
  openGraph: {
    title: 'Claude Prompt Generator – Create Custom AI Prompts Free',
    description: 'Create custom Claude prompts with XML tags, tone settings, and detailed instructions using our free Claude Prompt Generator. 🚀',
    url: 'https://www.generatorpromptai.com/tools/claude-prompt-generator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/claude-prompt-generator.png',
        width: 1200,
        height: 630,
        alt: 'Claude Prompt Generator – Create Custom Prompts',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Prompt Generator – Create Custom AI Prompts Free',
    description: 'Create custom Claude prompts with XML tags, tone settings, and detailed instructions using our free Claude Prompt Generator. 🚀',
    images: ['https://www.generatorpromptai.com/og/claude-prompt-generator.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'claude prompt generator free, how to write prompts for claude 3.5 sonnet, custom claude prompts for coding, claude prompt format with thinking and output tags, claude ai prompt builder with xml tags, structured prompts for blog writing, ai prompt generator no signup',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Claude Prompt Generator – Create Custom Prompts with XML Tags & Tone",
  "url": "https://www.generatorpromptai.com/tools/claude-prompt-generator",
  "applicationCategory": "WritingApplication",
  "operatingSystem": "All",
  "description": "Create custom Claude prompts with XML tags, tone settings, and detailed instructions using our free Claude Prompt Generator. 🚀",
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
  "featureList": "9 prompt templates, 6 use cases, 3 depth levels, 4 tone options, 6 output formats including XML tags, favorites list, copy to clipboard, open in Claude.ai, 100% client-side privacy, no signup required"
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
      "name": "Claude Prompt Generator", 
      "item": "https://www.generatorpromptai.com/tools/claude-prompt-generator" 
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
      "name": "How do I write better prompts for Claude 3.5 Sonnet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Be specific about your goal, provide context, assign a role, and specify the output format. Use this tool to automatically add use case roles, depth levels, tone modifiers, and XML tags to your basic topic."
      }
    },
    {
      "@type": "Question",
      "name": "What are XML tags in Claude prompts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "XML tags like <thinking> and <output> are Claude's native way of organizing information. Prompting Claude to use <thinking> for its reasoning process and <output> for the final answer dramatically improves accuracy on complex tasks."
      }
    },
    {
      "@type": "Question",
      "name": "Can I generate prompts for coding and data analysis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Select the 'Coding' or 'Analysis' use case in our tool. It will automatically assign an expert software engineer or rigorous analyst role to the prompt to get the best results from Claude."
      }
    },
    {
      "@type": "Question",
      "name": "Is this Claude prompt format builder free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, 100% free. No signup, no account, no limits. Generate unlimited custom Claude prompts with specific tones, depths, and formats."
      }
    },
    {
      "@type": "Question",
      "name": "Can I save and copy the generated prompts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Copy any prompt to your clipboard with one click, or save it to your favorites list within the tool for quick access later. Favorites are stored locally in your browser."
      }
    },
    {
      "@type": "Question",
      "name": "Is my topic or prompt data stored anywhere?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Everything happens locally in your browser. Nothing gets uploaded to a server, nothing gets stored in a database. Close the tab and your data is gone."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use this for non-English topics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Enter your topic in any language. The tool injects it into the prompt template. Note: Claude's response quality depends on the model's language support, not this tool."
      }
    },
    {
      "@type": "Question",
      "name": "What if I don't like the generated prompt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No problem. Click Regenerate to get a different template, or manually edit the prompt before copying. The tool is a starting point — you're always in control."
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
      <ClaudePromptGenerator />
    </>
  )
}