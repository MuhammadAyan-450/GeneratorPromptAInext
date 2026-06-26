import HomeContent from "../components/HomeContent";

// JSON-LD Schemas
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Generator Prompt AI - Free Online Tools",
  url: "https://www.generatorpromptai.com/",
  description:
    "Use our free AI Prompt Generator to create high-quality prompts for ChatGPT, Claude, SEO, and more. Fast, free, and easy to use.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.generatorpromptai.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en",
  publisher: {
    "@type": "Organization",
    name: "GeneratorPromptAI",
  },

  keywords: [
    "AI Prompt Generator",
    "Free AI Tools",
    "ChatGPT Prompt Generator",
    "Claude Prompt Generator",
    "AI Prompt Builder",
    "Free Online Tools",
    "GeneratorPromptAI",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How to generate AI prompts for ChatGPT without signup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply visit our AI Prompt Builder tool, select your AI model, choose a category, describe your goal, and click generate.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best free JSON formatter and validator online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our JSON Formatter tool lets you paste, format, validate, and minify JSON data instantly in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "How to compress image without losing quality online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use our Image Compressor tool to reduce file size while maintaining visual quality.",
      },
    },
    {
      "@type": "Question",
      name: "How to convert image to base64 encoding for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our Image to Base64 Converter lets you drag and drop any image file and instantly get the base64 encoded string.",
      },
    },
    {
      "@type": "Question",
      name: "Can I generate QR code with custom logo for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our QR Code Generator allows you to create QR codes for URLs, text, Wi-Fi, and more with custom logo.",
      },
    },
    {
      "@type": "Question",
      name: "How to convert timestamp to human readable date online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our Unix Timestamp Converter tool converts Unix timestamps to readable dates and vice versa.",
      },
    },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Online Tools Collection",
  description: "A curated collection of 30+ free online tools",
  numberOfItems: 8,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Free AI Image Generator",
      url: "https://www.generatorpromptai.com/tools/ai-image-generator",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Base64 Encoder & Decoder",
      url: "https://www.generatorpromptai.com/tools/base64-encode",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Lorem Ipsum Generator",
      url: "https://www.generatorpromptai.com/tools/lorem-ipsum-generator",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "AdSense Revenue Calculator",
      url: "https://www.generatorpromptai.com/tools/adsense-revenue-calculator",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "PDF Compressor",
      url: "https://www.generatorpromptai.com/tools/pdf-compressor",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "JSON Formatter",
      url: "https://www.generatorpromptai.com/tools/json-formatter",
    },
    {
      "@type": "ListItem",
      position: 7,
      name: "QR Code Generator",
      url: "https://www.generatorpromptai.com/tools/qr-code-generator",
    },
    {
      "@type": "ListItem",
      position: 8,
      name: "Password Generator",
      url: "https://www.generatorpromptai.com/tools/password-generator",
    },
  ],
};



const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GeneratorPromptAI",
  url: "https://www.generatorpromptai.com",
  logo: "https://www.generatorpromptai.com/icon.png",
  sameAs: [
    "https://x.com/tool_prompt",
    "https://www.linkedin.com/in/generator-promptai-a4a297412",
    "https://www.pinterest.com/generatorpromptai/",
  ],
};

export const metadata = {
  title: "Free AI Prompt Generator | Smart Tools & Prompt Generators",
  description:
    "Use our free AI Prompt Generator to create high-quality prompts for ChatGPT, Claude, SEO, and more. Fast, free, and easy to use.",
  alternates: {
    canonical: "https://www.generatorpromptai.com",
  },
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    type: "website",
    url: "https://www.generatorpromptai.com/",
    title: "Free AI Prompt Generator | Smart Tools & Prompt Generators",
    description:
      "Use our free AI Prompt Generator to create high-quality prompts for ChatGPT, Claude, SEO, and more. Fast, free, and easy to use.",
    images: ["https://www.generatorpromptai.com/og-image.jpg"],
    siteName: "Generator Prompt AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Prompt Generator | Smart Tools & Prompt Generators",
    description:
      "Use our free AI Prompt Generator to create high-quality prompts for ChatGPT, Claude, SEO, and more. Fast, free, and easy to use.",
    images: ["https://www.generatorpromptai.com/twitter-image.jpg"],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <HomeContent />
    </>
  );
}
