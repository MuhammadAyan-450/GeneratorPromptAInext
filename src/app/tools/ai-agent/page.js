import AiAgent from "./AiAgent";

export const metadata = {
  title: "Free AI Agent Prompt Generator – Create Prompts Instantly",
  description:
    "Create high-quality AI agent prompts in seconds. Generate custom prompts for ChatGPT, Claude, Gemini, and more. ✅",
  alternates: {
    canonical: "https://www.generatorpromptai.com/tools/ai-agent",
  },
  openGraph: {
    title: "Free AI Agent Prompt Generator – Create Prompts Instantly",
    description:
      "Create high-quality AI agent prompts in seconds. Generate custom prompts for ChatGPT, Claude, Gemini, and more. ✅",
    url: "https://www.generatorpromptai.com/tools/ai-agent",
    siteName: "GeneratorPromptAI",
    type: "website",
    images: [
      {
        url: "https://www.generatorpromptai.com/og/ai-agent.png",
        width: 1200,
        height: 630,
        alt: "Free AI Agent – Generate Prompts & Brainstorm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Agent Prompt Generator – Create Prompts Instantly",
    description:
      "Create high-quality AI agent prompts in seconds. Generate custom prompts for ChatGPT, Claude, Gemini, and more. ✅",
    images: ["https://www.generatorpromptai.com/og/ai-agent.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  keywords:
    "free AI agent, AI chatbot no signup, free AI chat, generate AI prompts, ChatGPT prompt generator, Midjourney prompt generator, brainstorm ideas AI, AI content writer free",
};

const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free AI Agent",
  url: "https://www.generatorpromptai.com/tools/ai-agent",
  applicationCategory: "UtilityApplication",
  operatingSystem: "All",
  description:
    "Create high-quality AI agent prompts in seconds. Generate custom prompts for ChatGPT, Claude, Gemini, and more. ✅",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  creator: {
    "@type": "Organization",
    name: "GeneratorPromptAI",
    url: "https://www.generatorpromptai.com",
  },
  featureList:
    "Prompt generation, content writing, code debugging, brainstorming, save favorites, copy responses, no signup, no limits",
};

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
      name: "AI Agent",
      item: "https://www.generatorpromptai.com/tools/ai-agent",
    },
  ],
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this AI agent actually free, or is there a catch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It's free. No signup, no credit card, no message limits. The page loads, you type a question, you get an answer. We monetize through ads, not by charging you.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this to generate prompts for ChatGPT, Claude, and Midjourney?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Tell the AI what you need a prompt for and it'll generate a structured prompt you can paste directly into that tool.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from just using ChatGPT directly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ChatGPT requires an account and has usage limits on the free tier. This AI agent has no login requirement and no hard message caps. Use this for quick answers without friction; use ChatGPT for maximum quality.",
      },
    },
    {
      "@type": "Question",
      name: "Are my conversations saved or used for training?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your chats aren't permanently stored in a database tied to your identity. The AI processes your message to generate a response, and that's it.",
      },
    },
    {
      "@type": "Question",
      name: "Can this AI agent write code and debug errors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can paste code and ask it to find bugs, explain what a function does, or write new code from scratch. It handles Python, JavaScript, and most common languages.",
      },
    },
    {
      "@type": "Question",
      name: "Why does it take a few seconds to respond?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The AI needs to read your message, process it, and generate a response token by token. That takes a few seconds depending on length and complexity.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this for work or commercial projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The responses are yours to use however you want — in blog posts, marketing materials, code, emails. No licensing restriction on the output.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I click 'New Chat'?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It clears the conversation history and starts fresh. The AI won't remember anything from the previous chat. Saved favorites stay even after starting a new chat.",
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

      <AiAgent />
    </>
  );
}