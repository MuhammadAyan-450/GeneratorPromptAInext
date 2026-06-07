import BlogPostCalculateCpc from "./BlogPostCalculateCpc";
// Apne project ke hisaab se yahan Navbar aur Footer ka path set karna hai

const POST_TITLE = "How to Calculate CPC Online (Without Wasting Ad Budget)";
const POST_EXCERPT =
  "I blew $200 on 10 clicks before I understood CPC. Here's the dead-simple formula and the free tools to track it.";
const POST_SLUG = "how-to-calculate-cpc-online";
const POST_DATE_ISO = "2026-06-28";
const POST_IMAGE = "https://www.generatorpromptai.com/og-calculate-cpc.png";
const SITE_URL = "https://www.generatorpromptai.com";

export const metadata = {
  title: `${POST_TITLE} | GeneratorPromptAI`,
  description: POST_EXCERPT,
  keywords:
    "how to calculate cpc online, cpc formula, cost per click calculator, cpc advertising, what is cpc, reduce cpc, ppc calculator online",
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
    section: "Advertising",
    tags: ["CPC", "Advertising", "Math"],
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
      name: "Is CPC the same as PPC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. PPC (Pay-Per-Click) is the name of the advertising model where you pay for clicks. CPC (Cost Per Click) is the actual metric—the dollar amount you end up paying for each of those clicks.",
      },
    },
    {
      "@type": "Question",
      name: "Should I aim for the lowest CPC possible?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not always. A super low CPC might mean your ad is showing to the wrong audience who aren't actually interested in buying. A slightly higher CPC with a high conversion rate is much better than a rock-bottom CPC with zero sales.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my CPC so high?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usually, it comes down to three things: your industry is highly competitive (like insurance or legal), your ad relevance score is low, or your targeting is too broad. Tighten your audience and rewrite your ad copy to match their search intent.",
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

      <BlogPostCalculateCpc />
    </>
  );
}