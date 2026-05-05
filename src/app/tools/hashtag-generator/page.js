import HashtagGenerator from './HashtagGenerator'

export const metadata = {
  title: 'Generate Low Competition Hashtags for Instagram Reels – Free Viral Hashtag Tool',
  description: 'Free hashtag generator for Instagram reels, TikTok, YouTube and Twitter. Get trending and low competition hashtags sorted by tier. Pakistani and English styles. Copy all with one click – no signup.',
  keywords: 'how to get more impressions on instagram reels with hashtags, best hashtags for instagram reels to go viral 2026, low competition hashtags for instagram growth, instagram hashtag strategy for small accounts, free instagram hashtag generator with copy button, tiktok hashtag generator for more views, how many hashtags for instagram reels 2026, trending hashtags for tiktok pakistan, urdu hashtags for instagram reels pakistan, desi hashtags for tiktok viral videos, niche hashtags generator for small accounts, hashtag competition checker free online',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/hashtag-generator',
  },
  openGraph: {
    type: 'website',
    siteName: 'GeneratorPromptAI',
    title: 'Generate Low Competition Hashtags for Instagram Reels – Free Tool',
    description: 'Get trending and low competition hashtags sorted by tier for Instagram, TikTok, YouTube. Copy all with one click.',
    url: 'https://www.generatorpromptai.com/tools/hashtag-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Hashtag Generator – Low Competition Hashtags for Instagram Reels',
    description: 'Generate trending and niche hashtags for Instagram, TikTok, YouTube. Sorted by competition tier. Copy all instantly.',
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
}

// ── JSON-LD Schemas ──
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Generate Low Competition Hashtags for Instagram Reels – Free Viral Hashtag Tool",
  "url": "https://www.generatorpromptai.com/tools/hashtag-generator",
  "applicationCategory": "SocialMediaApplication",
  "operatingSystem": "All",
  "description": "Free hashtag generator for Instagram, TikTok, YouTube and Twitter/X. Generate trending and low competition hashtags sorted by tier. Pakistani and English styles. Copy all with one click.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Hashtag Generator", "item": "https://www.generatorpromptai.com/tools/hashtag-generator" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to get more impressions on Instagram reels with hashtags?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use a mix of 5 high-competition viral hashtags, 15 medium-competition relevant hashtags, and 5-10 low-competition niche hashtags. Place them in the first comment, not the caption. Our tool automatically sorts your hashtags into these three tiers."
      }
    },
    {
      "@type": "Question",
      "name": "How many hashtags for Instagram reels to go viral in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Instagram allows up to 30 hashtags per post. The best strategy in 2026 is using 25-30 hashtags with a mix of all three competition tiers. Avoid using only viral hashtags — niche tags help the algorithm understand your content."
      }
    },
    {
      "@type": "Question",
      "name": "What are low competition hashtags and why do they matter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Low competition hashtags have fewer posts but a highly targeted audience. When you use them, your post is much more likely to appear on the Explore page for that specific tag. They matter because they bring in views from people actually interested in your niche."
      }
    },
    {
      "@type": "Question",
      "name": "How to find trending hashtags for TikTok Pakistan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enter your topic keywords in our tool, select TikTok as the platform, and choose Mixed or Urdu Romanized language style. The tool will generate hashtags including Pakistani trending tags like #tiktokpakistan, #desi, and niche-specific tags for your content."
      }
    },
    {
      "@type": "Question",
      "name": "Best hashtag strategy for small Instagram accounts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Small accounts should focus heavily on low and medium competition hashtags. Use only 3-5 high-competition tags and fill the rest with niche-specific tags. This maximizes the chance of appearing in search results for your specific niche."
      }
    },
    {
      "@type": "Question",
      "name": "Can I generate Urdu or Romanized Pakistani hashtags?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Select Urdu Romanized or Mixed language style to include desi modifiers like #desi, #pakistani, #subhanallah, #zindagi, #pyar, #dil and more. These work well for Pakistani audience content on Instagram and TikTok."
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
      <HashtagGenerator />
    </>
  )
}