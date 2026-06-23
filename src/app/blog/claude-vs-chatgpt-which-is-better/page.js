import BlogPostClaudeVsChatGPT from "./BlogPostClaudeVsChatGPT";
// Apne project ke hisaab se yahan Navbar aur Footer ka path set karna hai

const POST_TITLE = "Claude vs ChatGPT in 2026: Which AI is Actually Better?";
const POST_EXCERPT =
  "We tested both AI models across 20 real-world tasks — writing, coding, analysis, creativity. Here's the honest breakdown with scores, examples, and a clear winner for each use case.";
const POST_SLUG = "claude-vs-chatgpt-which-is-better";
const POST_DATE_ISO = "2026-04-05";
const POST_IMAGE = "https://www.generatorpromptai.com/og-claude-vs-chatgpt.png";
const SITE_URL = "https://www.generatorpromptai.com";

export const metadata = {
  title: `${POST_TITLE} | GeneratorPromptAI`,
  description: POST_EXCERPT,
  keywords:
    "claude vs chatgpt, claude vs gpt, claude ai comparison, chatgpt vs claude 2026, which ai is better, claude review, chatgpt review, claude vs chatgpt coding, claude vs chatgpt writing, best ai 2026",
  alternates: {
    canonical: `${SITE_URL}/blog/${POST_SLUG}`,
  },
  robots: "index, follow",
  openGraph: {
    type: "article",
    siteName: "GeneratorPromptAI",
    title: POST_TITLE,
    description: POST_EXCERPT,
    url: `${SITE_URL}/blog/${POST_SLUG}`,
    image: POST_IMAGE,
    publishedTime: POST_DATE_ISO,
    section: "AI Comparison",
    tags: ["Claude", "ChatGPT"],
  },
  twitter: {
    card: "summary_large_image",
    title: POST_TITLE,
    description: POST_EXCERPT,
    image: POST_IMAGE,
  },
};

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description: POST_EXCERPT,
  image: POST_IMAGE,
  datePublished: POST_DATE_ISO,
  dateModified: POST_DATE_ISO,
  author: {
    "@type": "Organization",
    name: "GeneratorPromptAI",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "GeneratorPromptAI",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/${POST_SLUG}`,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Claude better than ChatGPT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the task. Claude is better at long-form writing, coding accuracy, following complex instructions, and analyzing documents. ChatGPT is better at creative brainstorming, plugin ecosystem, voice conversations, and general versatility. Neither is universally better.",
      },
    },
    {
      "@type": "Question",
      name: "Is Claude free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Claude offers a free tier with limited usage (Claude Sonnet). For heavy use, Claude Pro costs $20/month. ChatGPT also has a free tier (GPT-4o mini) and Plus plan at $20/month. Both have similar pricing structures.",
      },
    },
    {
      "@type": "Question",
      name: "Which AI is better for coding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In our testing, Claude 3.5 Sonnet scored 9.2/10 for coding vs ChatGPT's 8.4/10. Claude produces fewer bugs, better documentation, and follows instructions more precisely. However, ChatGPT with plugins can access current documentation and run code, which Claude cannot.",
      },
    },
    {
      "@type": "Question",
      name: "Can Claude access the internet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Claude can search the web when you use Claude.ai, but it doesn't have a plugin ecosystem like ChatGPT. ChatGPT has browse, DALL-E, code interpreter, and third-party plugins which give it more versatility for certain tasks.",
      },
    },
    {
      "@type": "Question",
      name: "Which is better for Pakistani freelancers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For Pakistani freelancers doing content writing, Claude is the better choice because its writing sounds more natural and less AI-generated. For freelancers doing web research, data analysis, or creative tasks, ChatGPT's plugin ecosystem gives it an edge. Ideally, use both for different tasks.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${SITE_URL}/blog`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: POST_TITLE,
      item: `${SITE_URL}/blog/${POST_SLUG}`,
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <BlogPostClaudeVsChatGPT />
    </>
  );
}
