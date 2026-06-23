import BlogPostLoremIpsum from './BlogPostLoremIpsum'
// Apne project ke hisaab se yahan Navbar aur Footer ka path set karna hai

const POST_TITLE = "How to Generate Lorem Ipsum Text of Any Length (2026)"
const POST_EXCERPT = "Generate Lorem Ipsum text with exact word count, paragraph count, or sentence count — free, instant, no signup. Plus: when to use it, when NOT to, and realistic alternatives."
const POST_SLUG = "how-to-generate-lorem-ipsum-text-custom-length"
const POST_DATE_ISO = "2026-04-18"
const POST_IMAGE = "https://www.generatorpromptai.com/og-lorem-ipsum-generator.png"
const SITE_URL = "https://www.generatorpromptai.com"

export const metadata = {
  title: `${POST_TITLE} | GeneratorPromptAI`,
  description: POST_EXCERPT,
  keywords: "lorem ipsum generator, lorem ipsum generator with word count, generate lorem ipsum, lorem ipsum paragraphs, lorem ipsum sentences, placeholder text generator, dummy text generator, lorem ipsum no repeat, free lorem ipsum, custom length lorem ipsum, lorem ipsum 500 words, lorem ipsum 1000 words",
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
    section: "Web Tips",
    tags: ["Text Tools", "Lorem Ipsum"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Generate Lorem Ipsum Text of Any Length",
    description: "Generate Lorem Ipsum with exact word count — free and instant.",
    image: POST_IMAGE,
  },
}

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description: POST_EXCERPT,
  image: POST_IMAGE,
  datePublished: POST_DATE_ISO,
  dateModified: POST_DATE_ISO,
  author: { "@type": "Organization", name: "GeneratorPromptAI", url: SITE_URL },
  publisher: {
    "@type": "Organization",
    name: "GeneratorPromptAI",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${POST_SLUG}` },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Lorem Ipsum?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lorem Ipsum is placeholder text used in printing, graphic design, and web development since the 1500s. It's derived from a work by Cicero called 'de Finibus Bonorum et Malorum'. The text has been scrambled over centuries and doesn't mean anything in any language — it's specifically designed to look like readable text without distracting from the visual layout.",
      },
    },
    {
      "@type": "Question",
      name: "How to generate Lorem Ipsum with specific word count?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use GeneratorPromptAI's Lorem Ipsum generator. Open the tool, enter your desired word count (like 500 or 1000), and click generate. You can also specify paragraph count or sentence count instead of words. The tool generates the exact amount you need instantly — no signup required.",
      },
    },
    {
      "@type": "Question",
      name: "Can I generate Lorem Ipsum without repeating paragraphs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Most basic Lorem Ipsum generators repeat the same paragraph over and over. GeneratorPromptAI's generator produces unique paragraphs — each paragraph is different, so you don't get that obvious copy-paste pattern that looks fake in designs.",
      },
    },
    {
      "@type": "Question",
      name: "Is Lorem Ipsum bad for SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lorem Ipsum itself doesn't directly hurt SEO, but it doesn't help either. Google can recognize Lorem Ipsum as placeholder text. For pages that are live and indexable, real content is always better for SEO. Lorem Ipsum should only be used during the design phase — replace it with real content before publishing.",
      },
    },
    {
      "@type": "Question",
      name: "What are better alternatives to Lorem Ipsum?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For design mockups, realistic content is better — use real-sounding names, actual topic-relevant sentences, or tools that generate contextual placeholder text. For web development, some developers use generators that produce text relevant to their project's topic.",
      },
    },
    {
      "@type": "Question",
      name: "Why is Lorem Ipsum still used in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because it solves a specific problem well: it fills space with text-like content without distracting stakeholders from the design. When a client reviews a mockup, you want them to focus on layout, typography, and spacing — not read the text. Lorem Ipsum is the fastest way to achieve this.",
      },
    },
  ],
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    { "@type": "ListItem", position: 3, name: "Lorem Ipsum Generator Guide", item: `${SITE_URL}/blog/${POST_SLUG}` },
  ],
}

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
      <BlogPostLoremIpsum />
    </>
  )
}