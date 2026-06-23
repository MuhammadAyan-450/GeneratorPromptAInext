import MidjourneyPromptGenerator from './MidjourneyPromptGenerator'

// ✅ SEO Metadata (Title: 59 chars, Description: 159 chars)
export const metadata = {
  title: 'Midjourney AI Prompt Generator – Create Art Prompts Free',
  
  description: 'Generate high-quality Midjourney AI art prompts instantly. Free online prompt builder for creative images and AI artwork ideas.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/midjourney-prompt-generator' },
  
  openGraph: {
    title: 'Midjourney AI Prompt Generator – Create Art Prompts Free',
    description: 'Generate high-quality Midjourney AI art prompts instantly. Free online prompt builder for creative images and AI artwork ideas.',
    url: 'https://www.generatorpromptai.com/tools/midjourney-prompt-generator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/midjourney-prompt-generator.png',
        width: 1200,
        height: 630,
        alt: 'Midjourney Prompt Generator – Create AI Art Prompts',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Midjourney AI Prompt Generator – Create Art Prompts Free',
    description: 'Generate high-quality Midjourney AI art prompts instantly. Free online prompt builder for creative images and AI artwork ideas.',
    images: ['https://www.generatorpromptai.com/og/midjourney-prompt-generator.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'midjourney prompt generator, ai art prompts, midjourney v6 prompts, cinematic prompts, realistic ai art, artistic prompts, mood lighting prompts, camera angle prompts, aspect ratio prompts, free midjourney tool',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Midjourney Prompt Generator – Free AI Art Prompt Builder Online",
  "url": "https://www.generatorpromptai.com/tools/midjourney-prompt-generator",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "All",
  "description": "Generate high-quality Midjourney AI art prompts instantly. Free online prompt builder for creative images and AI artwork ideas.",
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
  "featureList": "Realistic/Artistic style modes, 6 mood presets, 6 lighting presets, 5 camera angles, 4 detail levels, 6 aspect ratios, Midjourney v6 parameter optimization (--v 6 --stylize 750 --q 2 --chaos 15), real-time stats (words, chars, parameters), copy to clipboard, save favorites to localStorage, 100% client-side processing with pure JavaScript, no signup required"
}

// ─── JSON-LD: BreadcrumbList Schema ─────────────────────────────────────────
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Midjourney Prompt Generator", "item": "https://www.generatorpromptai.com/tools/midjourney-prompt-generator" }
  ]
}

// ─── JSON-LD: FAQPage Schema ────────────────────────────────────────────────
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to write a good Midjourney prompt for realistic photos?",
      "acceptedAnswer": { "@type": "Answer", "text": "Describe your subject clearly, select Realistic mode, choose Dramatic or Golden Hour lighting, set detail to Ultra or Masterpiece, and pick a cinematic aspect ratio like 16:9. Our prompt builder combines all these automatically into an optimized prompt string." }
    },
    {
      "@type": "Question",
      "name": "What is the best detail level for Midjourney v6?",
      "acceptedAnswer": { "@type": "Answer", "text": "For Midjourney v6, Ultra Detailed or Masterpiece detail level produces the best results. These settings add keywords like '8k resolution', 'razor sharp focus', and 'HDR' that help the AI render maximum detail and quality." }
    },
    {
      "@type": "Question",
      "name": "Can I save and organize my Midjourney prompts?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our tool saves your favorite prompts in your browser's local storage. You can save as many as you want and remove them anytime. No account or signup required." }
    },
    {
      "@type": "Question",
      "name": "What aspect ratio should I use for Midjourney?",
      "acceptedAnswer": { "@type": "Answer", "text": "Use 16:9 for cinematic landscapes, 3:2 for classic photos, 1:1 for Instagram posts, 9:16 for vertical stories, and 2:3 or 4:5 for portrait images. Our tool adds the --ar parameter automatically." }
    },
    {
      "@type": "Question",
      "name": "What lighting works best for cinematic Midjourney images?",
      "acceptedAnswer": { "@type": "Answer", "text": "Dramatic lighting with strong shadows and highlights creates the most cinematic look. Golden Hour lighting gives warm, natural-looking results. Backlit creates striking silhouettes. Soft or Neutral lighting works best for product photos and portraits." }
    },
    {
      "@type": "Question",
      "name": "Does this tool work offline?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Once the page loads, all prompt generation happens locally in your browser. You can use it without an internet connection after the initial load." }
    }
  ]
}

// ─── Page Component ─────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      <MidjourneyPromptGenerator />
    </>
  )
}