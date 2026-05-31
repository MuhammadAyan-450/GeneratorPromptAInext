import YoutubeScriptGenerator from './YoutubeScriptGenerator'

// ✅ SEO Metadata — Title: 59 chars, Description: 158 chars
export const metadata = {
  title: 'YouTube Script Generator – Viral Video Ideas & Prompts Free',
  
  description: 'Free YouTube script generator to create viral video ideas and prompts. Fast AI tool for content creators and influencers.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/youtube-script-prompt-generator' },
  
  openGraph: {
    title: 'YouTube Script Generator – Viral Video Ideas & Prompts Free',
    description: 'Free YouTube script generator to create viral video ideas and prompts. Fast AI tool for content creators and influencers.',
    url: 'https://www.generatorpromptai.com/tools/youtube-script-prompt-generator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/youtube-script-generator.png',
        width: 1200,
        height: 630,
        alt: 'YouTube Script Generator – Create Viral Prompts Free',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Script Generator – Viral Video Ideas & Prompts Free',
    description: 'Free YouTube script generator to create viral video ideas and prompts. Fast AI tool for content creators and influencers.',
    images: ['https://www.generatorpromptai.com/og/youtube-script-generator.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'youtube script generator, youtube video prompt, viral youtube ideas, youtube titles generator, youtube shorts script, free youtube tool 2026, ai youtube script writer, chatgpt youtube prompts, claude youtube scripts, pakistani youtuber tools',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "YouTube Script Generator – Viral Video Ideas & Prompts Free",
  "url": "https://www.generatorpromptai.com/tools/youtube-script-prompt-generator",
  "applicationCategory": "ContentCreationApplication",
  "operatingSystem": "All",
  "description": "Free YouTube script generator to create viral video ideas and prompts. Fast AI tool for content creators and influencers.",
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
  "featureList": "15+ viral script templates, Shorts & long-form support, tone & CTA customization, title & thumbnail idea generation, local favorites storage, 100% client-side privacy, no signup required"
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
      "name": "YouTube Script Generator", 
      "item": "https://www.generatorpromptai.com/tools/youtube-script-prompt-generator" 
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
      "name": "How to generate viral YouTube video scripts free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enter your video topic, choose format (Shorts, Tutorial, Vlog, etc.), select tone and length, then click Generate. The tool creates a highly detailed prompt optimized for ChatGPT/Claude to write a viral-ready script."
      }
    },
    {
      "@type": "Question",
      "name": "Does this tool work for YouTube Shorts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Select \"YouTube Shorts\" in the Video Format dropdown or choose \"Shorts (60s)\" in Target Length. The generated prompt will specifically request a fast-paced, vertical format with strong hooks."
      }
    },
    {
      "@type": "Question",
      "name": "Can I save my favorite prompts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Click the Star icon next to any generated prompt to save it to your Favorites list. These are stored locally in your browser, so they remain private and persist across sessions."
      }
    },
    {
      "@type": "Question",
      "name": "What makes these prompts \"viral\"?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our templates are based on 2025-2026 best practices: strong hooks in the first 5 seconds, pattern interrupts, high-retention structures, and psychological triggers for clicks (CTR) and watch time."
      }
    },
    {
      "@type": "Question",
      "name": "Is my data stored or shared?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Never. All generation happens locally in your browser. Your topics and prompts are never sent to any server. 100% private."
      }
    },
    {
      "@type": "Question",
      "name": "Which AI models work best with these prompts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "These prompts are optimized for advanced LLMs like ChatGPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro. They provide enough structural detail to prevent generic outputs."
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
      <YoutubeScriptGenerator />
    </>
  )
}