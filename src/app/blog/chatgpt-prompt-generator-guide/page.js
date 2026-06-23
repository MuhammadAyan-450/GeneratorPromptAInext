import BlogPostChatGPTPromptGenerator from "./BlogPostChatGPTPromptGenerator";
// Apne project ke hisaab se yahan Navbar aur Footer ka path set karna hai

const POST_TITLE = "ChatGPT Prompt Generator Guide: Stop Guessing, Start Controlling";
const POST_EXCERPT =
  "I used to spend 20 minutes rewriting the same prompt. Then I figured out how prompt generators actually work. Here's the exact framework.";
const POST_SLUG = "chatgpt-prompt-generator-guide";
const POST_DATE_ISO = "2026-06-15";
const POST_IMAGE = "https://www.generatorpromptai.com/og-chatgpt-prompt-generator.png";
const SITE_URL = "https://www.generatorpromptai.com";

export const metadata = {
  title: `${POST_TITLE} | GeneratorPromptAI`,
  description: POST_EXCERPT,
  keywords:
    "chatgpt prompt generator, prompt generator, ai prompt generator, how to write chatgpt prompts, prompt engineering guide, chatgpt prompts, best chatgpt prompts",
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
    section: "Prompt Engineering",
    tags: ["ChatGPT", "Prompt Generator", "Prompt Engineering"],
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
      name: "Are ChatGPT prompt generators free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many are, including ours. Some advanced tools charge a subscription for specialized templates (like coding or specific marketing frameworks), but you absolutely do not need to pay money to get 90% of the value.",
      },
    },
    {
      "@type": "Question",
      name: "Can ChatGPT generate its own prompts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, actually. You can ask ChatGPT to 'act as a prompt generator' and give it a topic. It will interview you and build a prompt. It's a bit slower than using a dedicated tool, but it works surprisingly well.",
      },
    },
    {
      "@type": "Question",
      name: "Do prompt generators work with Claude too?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Completely. The 5-part framework (Role, Task, Context, Constraints, Format) works flawlessly with Claude. In fact, Claude follows constraints even better than ChatGPT, so a well-structured prompt goes a lot further with Claude.",
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

      <BlogPostChatGPTPromptGenerator />
    </>
  );
}