import ClaudePromptGenerator from './ClaudePromptGenerator'

export const metadata = {
  title: 'Claude Prompt Generator – Create Powerful AI Prompts Free',
  description: 'Generate powerful Claude AI prompts instantly with our free Claude Prompt Generator. Create better prompts for writing, coding, SEO, marketing, and more',
  keywords: 'how to write prompts for claude 3.5 sonnet, claude ai prompt builder with xml tags, claude prompt format with thinking and output tags, generate claude prompts for coding and analysis, custom claude prompt template generator free, claude 3 opus sonnet prompt engineering tool, claude xml tags format prompt',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/claude-prompt-generator',
  },
  openGraph: {
    title: 'Claude Prompt Generator – Create Powerful AI Prompts Free',
    description: 'Generate powerful Claude AI prompts instantly with our free Claude Prompt Generator. Create better prompts for writing, coding, SEO, marketing, and more',
    url: 'https://www.generatorpromptai.com/tools/claude-prompt-generator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Prompt Generator – Create Powerful AI Prompts Free',
    description: 'Generate powerful Claude AI prompts instantly with our free Claude Prompt Generator. Create better prompts for writing, coding, SEO, marketing, and more',
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
  "name": "Custom Claude AI Prompt Builder with XML Tags",
  "url": "https://www.generatorpromptai.com/tools/claude-prompt-generator",
  "applicationCategory": "AIApplication",
  "operatingSystem": "All",
  "description": "Generate powerful Claude AI prompts instantly with our free Claude Prompt Generator. Create better prompts for writing, coding, SEO, marketing, and more",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Claude Prompt Builder", "item": "https://www.generatorpromptai.com/tools/claude-prompt-generator" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to write prompts for Claude 3.5 Sonnet and Opus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To write effective prompts for Claude 3.5 Sonnet or Opus, clearly define a role, provide context, specify the output format (like XML tags), and state your goal. Our tool automatically structures these elements for you."
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
      "name": "Can I generate Claude prompts for coding and data analysis?",
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
      <ClaudePromptGenerator />
    </>
  )
}