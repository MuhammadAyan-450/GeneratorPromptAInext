import ChatGptPromptGenerator from './ChatGptPromptGenerator'

export const metadata = {
  title: 'Generate ChatGPT Prompts for Coding & Writing – Custom Tone & Depth Builder',
  description: 'Build custom ChatGPT prompts for coding, blog writing, and marketing instantly. Set depth (Detailed/Expert) and tone (Professional/Academic) to write better prompts for GPT-4. Free online tool.',
  keywords: 'how to write better prompts for chatgpt for coding, generate chatgpt prompts for blog writing with tone, custom chatgpt prompt builder with depth and tone settings, prompt engineering template generator for gpt-4, create structured prompts for chatgpt free, chatgpt prompt ideas for content writing and marketing, best prompt format for chatgpt coding',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/chatgpt-prompt-generator',
  },
  openGraph: {
    title: 'Generate ChatGPT Prompts for Coding & Writing – Custom Tone Builder',
    description: 'Build custom prompts for ChatGPT with tone and depth settings. Get better results for coding, writing, and marketing tasks.',
    url: 'https://www.generatorpromptai.com/tools/chatgpt-prompt-generator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom ChatGPT Prompt Builder with Tone & Depth Settings',
    description: 'Generate structured prompts for ChatGPT. Set tone, depth, and format for GPT-4. Free online tool.',
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
  "name": "Custom ChatGPT Prompt Builder with Tone & Depth Settings",
  "url": "https://www.generatorpromptai.com/tools/chatgpt-prompt-generator",
  "applicationCategory": "AIApplication",
  "operatingSystem": "All",
  "description": "Free tool to generate custom ChatGPT prompts for coding, blog writing, and marketing. Set tone, depth, and style to write better prompts for GPT-4.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "ChatGPT Prompt Builder", "item": "https://www.generatorpromptai.com/tools/chatgpt-prompt-generator" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to write better prompts for ChatGPT for coding and writing?",
      "acceptedAnswer": { "@type": "Answer", "text": "To write better prompts, be specific about your goal, provide context, and specify the output format. Use our tool to automatically add depth (Detailed, Comprehensive, Expert) and tone (Professional, Academic, Friendly) to your basic topic." }
    },
    {
      "@type": "Question",
      "name": "Can I generate ChatGPT prompts for blog writing with a specific tone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Enter your blog topic, select 'Detailed' or 'Comprehensive' depth, and choose a tone like 'Professional' or 'Friendly'. The tool will generate a structured prompt tailored for blog writing." }
    },
    {
      "@type": "Question",
      "name": "Does this prompt builder work with GPT-4 and GPT-4o?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. The prompts generated are optimized for all OpenAI models including GPT-3.5, GPT-4, and GPT-4o. They also work well with Claude and Gemini." }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Detailed, Comprehensive, and Expert depth?",
      "acceptedAnswer": { "@type": "Answer", "text": "Detailed gives a clear, structured answer. Comprehensive adds examples, pros/cons, and comparisons. Expert provides PhD-level analysis with case studies and advanced techniques." }
    },
    {
      "@type": "Question",
      "name": "Can I save and copy the generated prompts?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can copy any generated prompt to your clipboard with one click, or save it to your favorites list within the tool for quick access later." }
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
      <ChatGptPromptGenerator />
    </>
  )
}