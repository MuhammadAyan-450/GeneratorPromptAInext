import MidjourneyPromptGenerator from './MidjourneyPromptGenerator'

export const metadata = {
  title: 'Generate Realistic Midjourney Prompts for Cinematic Photos – Free AI Art Prompt Builder',
  description: 'Free Midjourney prompt generator with mood, lighting, camera angle, detail level and aspect ratio controls. Create realistic, cinematic, fantasy and artistic AI art prompts instantly. Save favorites. No signup required.',
  keywords: "how to write good midjourney prompt for realistic photos, best detail level for midjourney v6 free, generate cinematic midjourney prompts with lighting and mood, midjourney prompt generator with aspect ratio free, create midjourney prompts for fantasy art free online, best lighting settings for cinematic midjourney images, free midjourney prompt builder no sign up, midjourney prompt generator with save favorites feature, ai art prompt generator for beginners free",
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/midjourney-prompt-generator',
  },
  openGraph: {
    title: 'Generate Realistic Midjourney Prompts – Free AI Art Prompt Builder',
    description: 'Create cinematic, realistic, fantasy Midjourney prompts with mood, lighting, angle & detail controls. Save favorites.',
    url: 'https://www.generatorpromptai.com/tools/midjourney-prompt-generator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Midjourney Prompt Generator – Cinematic, Realistic, Fantasy',
    description: 'Build optimized Midjourney prompts with lighting, mood & detail controls. Save favorites.',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

// JSON-LD Schemas
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Generate Realistic Midjourney Prompts for Cinematic Photos – Free AI Art Prompt Builder",
  "url": "https://www.generatorpromptai.com/tools/midjourney-prompt-generator",
  "applicationCategory": "AIApplication",
  "operatingSystem": "All",
  "description": "Free Midjourney prompt generator with mood, lighting, camera angle, detail level and aspect ratio controls. Create realistic, cinematic, fantasy and artistic AI art prompts instantly.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Midjourney Prompt Generator", "item": "https://www.generatorpromptai.com/tools/midjourney-prompt-generator" }
  ]
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to write a good Midjourney prompt for realistic photos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Describe your subject clearly, select Realistic mode, choose Dramatic or Golden Hour lighting, set detail to Ultra or Masterpiece, and pick a cinematic aspect ratio like 16:9. Our prompt builder combines all these automatically into an optimized prompt string."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best detail level for Midjourney v6?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For Midjourney v6, Ultra Detailed or Masterpiece detail level produces the best results. These settings add keywords like '8k resolution', 'razor sharp focus', and 'HDR' that help the AI render maximum detail and quality."
      }
    },
    {
      "@type": "Question",
      "name": "Can I save and organize my Midjourney prompts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Our tool saves your favorite prompts in your browser's local storage. You can save as many as you want and remove them anytime. No account or signup required."
      }
    },
    {
      "@type": "Question",
      "name": "What aspect ratio should I use for Midjourney?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use 16:9 for cinematic landscapes, 3:2 for classic photos, 1:1 for Instagram posts, 9:16 for vertical stories, and 2:3 or 4:5 for portrait images. Our tool adds the --ar parameter automatically."
      }
    },
    {
      "@type": "Question",
      "name": "What lighting works best for cinematic Midjourney images?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dramatic lighting with strong shadows and highlights creates the most cinematic look. Golden Hour lighting gives warm, natural-looking results. Backlit creates striking silhouettes. Soft or Neutral lighting works best for product photos and portraits."
      }
    }
  ]
};

export default function Page() {
  return (
    <>
      {/* Structured Data Scripts */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      
      <MidjourneyPromptGenerator />
    </>
  )
}