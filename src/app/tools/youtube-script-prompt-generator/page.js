import YoutubeScriptGenerator from './YoutubeScriptGenerator'

export const metadata = {
  title: 'Viral YouTube Script Generator – Viral Video Ideas & Scripts',
  description: 'Generate powerful YouTube video scripts, titles, hooks & thumbnail ideas instantly. Choose format (Shorts, long-form), tone, CTA strength. Perfect for Pakistani & global creators. Free, no signup, browser-based – built in Karachi.',
  keywords: 'youtube script generator, youtube video prompt, viral youtube ideas, youtube titles generator, youtube shorts script, free youtube tool 2026',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/youtube-prompt-generator',
  },
  openGraph: {
    title: 'YouTube Script & Prompt Generator – Viral Content 2026',
    description: 'Create high-retention scripts, titles & ideas for YouTube long-form & Shorts.',
    type: 'website',
    url: 'https://www.generatorpromptai.com/tools/youtube-prompt-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube Script Generator',
    description: 'Viral scripts, titles, hooks & Shorts prompts – instant & free.',
  },
}

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "YouTube Prompt Generator",
  "url": "https://www.generatorpromptai.com/tools/youtube-prompt-generator",
  "description": "Free tool to generate YouTube video scripts, titles, hooks and ideas for viral content.",
  "applicationCategory": "ContentCreation",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }}
      />
      <YoutubeScriptGenerator />
    </>
  )
}