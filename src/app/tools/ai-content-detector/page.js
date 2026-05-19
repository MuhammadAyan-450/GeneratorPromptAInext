import AiContentDetector from './AiContentDetector'

export const metadata = {
  title: 'AI Detector - Free AI Checker for ChatGPT, GPT-5, Gemini & Claude',
  description: 'Detect if content was written by ChatGPT, Claude, Gemini, or other AI. Free AI detector with instant analysis, detailed breakdown, no signup. Quick & Deep modes.',
  keywords: 'ai content detector free, check if text is ai generated, chatgpt detector online, claude ai detector, gemini content checker, ai writing detector no signup, detect ai text free online, gptzero alternative free, ai plagiarism checker free, human vs ai text detector',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/ai-content-detector',
  },
  openGraph: {
    title: 'AI Detector - Free AI Checker for ChatGPT, GPT-5, Gemini & Claude',
    description: 'Detect if content was written by ChatGPT, Claude, Gemini, or other AI. Free AI detector with instant analysis, detailed breakdown, no signup.',
    url: 'https://www.generatorpromptai.com/tools/ai-content-detector',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Detector - Free AI Checker for ChatGPT, GPT-5, Gemini & Claude',
    description: 'Detect if content was written by ChatGPT, Claude, Gemini, or other AI. Free AI detector with instant analysis, detailed breakdown, no signup.',
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
  "name": "AI Content Detector – Check If Text Is AI-Generated",
  "url": "https://www.generatorpromptai.com/tools/ai-content-detector",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Free online tool to detect if text was written by AI (ChatGPT, Claude, Gemini) or a human. Features quick client-side analysis and optional deep AI-powered detection via Groq. Includes detailed breakdown of AI indicators, confidence scoring, and 100% privacy in Quick mode.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" },
  "featureList": "Quick client-side analysis, Deep Groq-powered detection, detailed AI indicators, confidence scoring, copy results, 100% private in Quick mode, mobile responsive"
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "AI Content Detector", "item": "https://www.generatorpromptai.com/tools/ai-content-detector" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How accurate is this AI detector?", "acceptedAnswer": { "@type": "Answer", "text": "No AI detector is 100% accurate. Our tool combines heuristic analysis with optional AI-powered detection for best results. For short texts (<100 words) or heavily edited AI content, confidence may be lower. Use results as guidance, not definitive proof." } },
    { "@type": "Question", "name": "Is my text stored or shared?", "acceptedAnswer": { "@type": "Answer", "text": "In Quick mode, analysis happens entirely in your browser — your text never leaves your device. In Deep mode, text is sent to Groq's API for analysis but is not stored. We never log, save, or share your content." } },
    { "@type": "Question", "name": "Can this detect ChatGPT, Claude, or Gemini content?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The detector looks for patterns common across major AI models: overused transition phrases, uniform sentence structure, lack of contractions, and generic examples. It works best on unedited AI output." } },
    { "@type": "Question", "name": "Why does my human writing get flagged as AI?", "acceptedAnswer": { "@type": "Answer", "text": "Formal, well-edited human writing can share traits with AI output (perfect grammar, formal transitions). If your text is flagged, check the indicators — you may simply write in a clear, structured style. Consider adding more personal voice or specific examples." } },
    { "@type": "Question", "name": "How can I make AI text undetectable?", "acceptedAnswer": { "@type": "Answer", "text": "We don't recommend trying to bypass detection for academic or professional dishonesty. However, if you're using AI as a drafting tool, always edit output heavily: add your voice, specific examples, personal anecdotes, and varied sentence structure. The goal should be authentic human-AI collaboration." } },
    { "@type": "Question", "name": "Does this work for all languages?", "acceptedAnswer": { "@type": "Answer", "text": "Currently, the detector is optimized for English text. Support for other languages is planned. For non-English content, results may be less reliable." } }
  ]
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      <AiContentDetector />
    </>
  )
}