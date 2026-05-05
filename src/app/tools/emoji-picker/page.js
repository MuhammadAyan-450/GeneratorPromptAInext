import EmojiPicker from './EmojiPicker'

export const metadata = {
  title: 'Free Emoji Picker Online – Copy & Paste 500+ Emojis Instantly',
  description: 'Free online emoji picker to search, select, and copy emojis instantly. Includes heart emoji copy paste, flag emoji copy paste, smiley face emoji copy paste, whatsapp emoji copy paste, instagram emoji copy, tiktok emoji copy, cute emoji copy paste, emoji list copy paste, emoji search tool online',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/emoji-picker',
  },
  openGraph: {
    title: 'Free Emoji Picker Online – Copy & Paste 500+ Emojis Instantly',
    description: 'Search, select and copy 500+ emojis instantly. Heart emoji, flag emoji, smiley faces & more. Works for WhatsApp, Instagram & Discord.',
    url: 'https://www.generatorpromptai.com/tools/emoji-picker',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Emoji Picker Online – Copy & Paste Emojis Instantly',
    description: 'Search and copy 500+ emojis for WhatsApp, Instagram, TikTok & Discord. Free online emoji picker tool.',
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
  "name": "Free Emoji Picker Online – Copy & Paste Emojis",
  "url": "https://www.generatorpromptai.com/tools/emoji-picker",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Free online emoji picker to search, select and copy emojis instantly. Includes heart, flag, smiley face, and food emojis.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Emoji Picker", "item": "https://www.generatorpromptai.com/tools/emoji-picker" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I copy and paste emojis from this picker?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Click any emoji to add it to your collection at the bottom, then click 'Copy All Emojis' to copy them all at once. You can also hover over any emoji and click the copy icon for an instant single copy."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use these emojis on WhatsApp and Instagram?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Simply copy the emojis from our picker and paste them directly into WhatsApp, Instagram, Facebook, Twitter/X, Discord, Telegram, Slack, or any other app that supports emojis."
      }
    },
    {
      "@type": "Question",
      "name": "Does this emoji picker work on mobile phones?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our emoji picker is fully responsive and works perfectly on all mobile phones, tablets, and desktop browsers without needing to install any app."
      }
    },
    {
      "@type": "Question",
      "name": "How to find the Pakistan flag emoji to copy and paste?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Click the 'Flags' category tab or search 'pakistan' in the search bar above. You will find the Pakistan flag emoji (🇵🇰) which you can copy with one click."
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
      <EmojiPicker />
    </>
  )
}