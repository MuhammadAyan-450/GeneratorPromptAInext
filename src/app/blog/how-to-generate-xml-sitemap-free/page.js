import BlogPostXmlSitemap from "./BlogPostXmlSitemap";
// Apne project ke hisaab se yahan Navbar aur Footer ka path set karna hai

const POST_TITLE = "How to Generate XML Sitemap Free (3 Easy Methods)";
const POST_EXCERPT =
  "Stop overcomplicating XML sitemaps. Here are three completely free ways to generate a sitemap in under 5 minutes, no coding required.";
const POST_SLUG = "how-to-generate-xml-sitemap-free";
const POST_DATE_ISO = "2026-05-12";
const POST_IMAGE = "https://www.generatorpromptai.com/og-xml-sitemap.png";
const SITE_URL = "https://www.generatorpromptai.com";

export const metadata = {
  title: `${POST_TITLE} | GeneratorPromptAI`,
  description: POST_EXCERPT,
  keywords:
    "generate xml sitemap free, free xml sitemap generator, how to create sitemap, next.js sitemap, wordpress sitemap, xml sitemaps, google search console sitemap",
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
    section: "SEO",
    tags: ["SEO", "Sitemap", "Next.js"],
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
      name: "Do I really need an XML sitemap?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your site is small (under 100 pages) and all pages are linked internally, Google can probably find them without a sitemap. However, having one is still best practice because it tells Google exactly when pages were last updated, speeding up the indexing process.",
      },
    },
    {
      "@type": "Question",
      name: "How often should I update my XML sitemap?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you are using a CMS like WordPress or a framework like Next.js, it updates automatically every time you publish or edit a post. If you used a static online generator, you should regenerate and re-upload it whenever you add a new page or blog post.",
      },
    },
    {
      "@type": "Question",
      name: "Where do I submit my sitemap URL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You should submit it to Google Search Console (under the 'Sitemaps' tab) and Bing Webmaster Tools. Most other search engines (like DuckDuckGo) rely on Bing's index anyway.",
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

      <BlogPostXmlSitemap />
    </>
  );
}