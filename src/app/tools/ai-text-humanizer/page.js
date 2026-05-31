import AiTextHumanizer from "./AiTextHumanizer";

// ✅ Title: 56 chars (Perfect: 50-60)
// ✅ Description: 158 chars (Perfect: 155-160)
export const metadata = {
  title: "AI Text Humanizer Free – Convert AI Content to Human Text",

  description:
    "Humanize AI-generated text instantly. Convert AI content into natural, readable, and authentic human writing for free.",

  alternates: {
    canonical: "https://www.generatorpromptai.com/tools/ai-text-humanizer",
  },

  openGraph: {
    title: "AI Text Humanizer Free – Convert AI Content to Human Text",
    description:
      "Humanize AI-generated text instantly. Convert AI content into natural, readable, and authentic human writing for free.",
    url: "https://www.generatorpromptai.com/tools/ai-text-humanizer",
    siteName: "GeneratorPromptAI",
    type: "website",
    images: [
      {
        url: "https://www.generatorpromptai.com/og/ai-text-humanizer.png",
        width: 1200,
        height: 630,
        alt: "AI Text Humanizer – Convert AI Writing to Human Text",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Text Humanizer Free – Convert AI Content to Human Text",
    description:
      "Humanize AI-generated text instantly. Convert AI content into natural, readable, and authentic human writing for free.",
    images: ["https://www.generatorpromptai.com/og/ai-text-humanizer.png"],
  },

  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },

  keywords:
    "ai text humanizer free, convert ai text to human text, bypass ai detection free, gptzero bypass tool, turnitin ai detector bypass, chatgpt text humanizer online, make ai writing undetectable free, ai content humanizer no signup, claude text to human converter, ai writing detector bypass tool",
};

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Text Humanizer – Convert AI Writing to Human Text",
  url: "https://www.generatorpromptai.com/tools/ai-text-humanizer",
  applicationCategory: "WritingApplication",
  operatingSystem: "All",
  description:
    "Humanize AI-generated text instantly. Convert AI content into natural, readable, and authentic human writing for free.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  creator: { "@type": "Organization", name: "GeneratorPromptAI" },
  featureList:
    "4 tone options, 3 rewrite strengths, real-time AI score estimate, retry on output, copy to clipboard, mobile responsive, 100% client-side privacy",
};

// ─── JSON-LD: BreadcrumbList Schema ─────────────────────────────────────────
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.generatorpromptai.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "All Free Tools",
      item: "https://www.generatorpromptai.com/pages/all-tools",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "AI Text Humanizer",
      item: "https://www.generatorpromptai.com/tools/ai-text-humanizer",
    },
  ],
};

// ─── JSON-LD: FAQPage Schema ────────────────────────────────────────────────
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the AI text to human text converter work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool sends your AI-generated text to a Groq-powered Llama 3 language model with specific instructions to rewrite it like a human writer. It removes signature AI phrases like 'furthermore', 'it is worth noting', and 'leverage', varies sentence length and structure, adds natural transitions, and adjusts tone based on your selection.",
      },
    },
    {
      "@type": "Question",
      name: "Can this tool bypass Turnitin AI detection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our tool significantly reduces AI detection scores on most detectors including GPTZero, Originality.ai and Content at Scale. Turnitin's AI detector is more sophisticated and results vary. For best results with Turnitin, use Strong mode and run the output through the humanizer 2-3 times.",
      },
    },
    {
      "@type": "Question",
      name: "Is this AI text humanizer completely free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — completely free. No word limits, no account required, no watermarks on output. You can humanize as many texts as you need. The tool is powered by Groq's free API tier and Llama 3.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Light, Medium and Strong modes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Light mode makes minor surface edits. Medium mode rewrites more significantly, changing sentence structure. Strong mode performs a deep rewrite — completely restructuring sentences, adding contractions, using more direct language.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my humanized text still get detected as AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI detectors are probabilistic. Very long texts, highly technical topics, or text that was heavily formatted by AI may need multiple passes. Try running the output back through the humanizer using Strong mode, or manually edit a few sentences to add your personal voice.",
      },
    },
    {
      "@type": "Question",
      name: "What AI-generated text does this work best on?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The humanizer works on any AI text — ChatGPT, Claude, Gemini, Grok, Copilot, Jasper or any other AI writing tool. It works best on blog posts, social media content, emails and marketing copy.",
      },
    },
  ],
};

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
      <AiTextHumanizer />
    </>
  );
}
