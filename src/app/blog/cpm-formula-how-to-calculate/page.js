import BlogPostCpmFormula from "./BlogPostCpmFormula";
// Apne project ke hisaab se yahan Navbar aur Footer ka path set karna hai

const POST_TITLE = "CPM Formula — How to Calculate Cost Per Mille";
const POST_EXCERPT =
  "The first time an advertiser offered me a $5 CPM, I had to Google it in the bathroom. Here’s the dead-simple formula and real examples.";
const POST_SLUG = "cpm-formula-how-to-calculate";
const POST_DATE_ISO = "2026-05-20";
const POST_IMAGE = "https://www.generatorpromptai.com/og-cpm-formula.png";
const SITE_URL = "https://www.generatorpromptai.com";

export const metadata = {
  title: `${POST_TITLE} | GeneratorPromptAI`,
  description: POST_EXCERPT,
  keywords:
    "cpm formula, how to calculate cpm, cost per mille, what is cpm, cpm advertising, cpm vs cpc, rpm vs cpm, ad pricing formula",
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
    tags: ["CPM", "Advertising", "Math"],
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
      name: "What is a good CPM?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It completely depends on your industry. A 'good' CPM for a cheap e-commerce product might be $2, while a good CPM for B2B software targeting CEOs might be $50+. Generally, lower is better if you're buying, and higher is better if you're selling.",
      },
    },
    {
      "@type": "Question",
      name: "Is CPM the same as RPM?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. CPM (Cost Per Mille) is what advertisers pay. RPM (Revenue Per Mille) is what publishers earn. They are often different because ad networks like Google AdSense take a cut. You might have a $5 CPM but only a $3.50 RPM.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use CPM or CPC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use CPM when your goal is brand awareness—getting your name in front of as many eyeballs as possible. Use CPC (Cost Per Click) when your goal is direct response, like getting people to sign up for a free trial or buy a product.",
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

      <BlogPostCpmFormula />
    </>
  );
}