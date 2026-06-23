import EmojiPicker from './EmojiPicker'

// ✅ Perfect SEO Metadata (Title: 56 chars, Description: 159 chars)
export const metadata = {
  title: 'Emoji Picker – Copy & Paste 500+ Emojis Online Free',
  
  description: 'Browse, search, and copy 500+ emojis instantly with our free Emoji Picker. Perfect for WhatsApp, Instagram, TikTok, and more. 🚀',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/tools/emoji-picker' },
  
  openGraph: {
    title: 'Emoji Picker – Copy & Paste 500+ Emojis Online Free',
    description: 'Browse, search, and copy 500+ emojis instantly with our free Emoji Picker. Perfect for WhatsApp, Instagram, TikTok, and more. 🚀',
    url: 'https://www.generatorpromptai.com/tools/emoji-picker',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/emoji-picker.png',
        width: 1200,
        height: 630,
        alt: 'Emoji Picker – Copy & Paste Emojis',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Emoji Picker – Copy & Paste 500+ Emojis Online Free',
    description: 'Browse, search, and copy 500+ emojis instantly with our free Emoji Picker. Perfect for WhatsApp, Instagram, TikTok, and more. 🚀',
    images: ['https://www.generatorpromptai.com/og/emoji-picker.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'emoji picker, copy paste emojis, free emoji keyboard, whatsapp emojis, instagram emojis, discord emojis, search emojis by name, pakistan flag emoji',
}

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Emoji Picker – Copy & Paste 500+ Emojis Online Free",
  "url": "https://www.generatorpromptai.com/tools/emoji-picker",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "description": "Browse, search, and copy 500+ emojis instantly with our free Emoji Picker. Perfect for WhatsApp, Instagram, TikTok, and more. 🚀",
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
  "featureList": "500+ emojis, 8 categories, smart search by name, recent emojis history, bulk copy functionality, instant single copy, mobile responsive, 100% client-side privacy, no signup required"
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
      "name": "Emoji Picker", 
      "item": "https://www.generatorpromptai.com/tools/emoji-picker" 
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
      "name": "How do I copy and paste emojis from this picker?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Click any emoji to add it to your collection at the bottom, then click 'Copy All Emojis' to copy them at once. Or hover over any emoji and click the tiny copy icon for an instant single copy."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use these emojis on WhatsApp and Instagram?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Simply copy the emojis and paste them directly into WhatsApp, Instagram, Facebook, Twitter/X, Discord, Telegram, Slack, or anywhere else that supports emojis."
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
    },
    {
      "@type": "Question",
      "name": "Are these emojis free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, emojis are standard Unicode characters and are free to use anywhere. There are no copyright restrictions on using standard emojis in personal or commercial communication."
      }
    },
    {
      "@type": "Question",
      "name": "Why do some emojis look different on my phone?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Emojis are rendered by your device's operating system (iOS, Android, Windows). While the character code is the same, the visual design varies between Apple, Google, Samsung, and Microsoft."
      }
    },
    {
      "@type": "Question",
      "name": "Can I search for emojis by color?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Currently, you can search by name (e.g., 'red heart', 'blue circle'). We are working on adding color-based filtering in future updates."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a limit to how many emojis I can copy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No limit. You can add as many emojis as you like to your collection and copy them all at once. However, some platforms may have character limits for messages."
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
      <EmojiPicker />
    </>
  )
}