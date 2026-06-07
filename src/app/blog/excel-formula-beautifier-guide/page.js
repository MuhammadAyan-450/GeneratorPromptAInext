import BlogPostExcelFormulaBeautifier from "./BlogPostExcelFormulaBeautifier";
// Apne project ke hisaab se yahan Navbar aur Footer ka path set karna hai

const POST_TITLE = "Excel Formula Beautifier Guide: How to Read Messy Formulas";
const POST_EXCERPT =
  "I once stared at a 400-character nested IF statement and cried a little inside. Here’s how formula beautifiers saved my sanity.";
const POST_SLUG = "excel-formula-beautifier-guide";
const POST_DATE_ISO = "2026-06-02";
const POST_IMAGE = "https://www.generatorpromptai.com/og-excel-formula-beautifier.png";
const SITE_URL = "https://www.generatorpromptai.com";

export const metadata = {
  title: `${POST_TITLE} | GeneratorPromptAI`,
  description: POST_EXCERPT,
  keywords:
    "excel formula beautifier, format excel formulas, excel formula indentation, excel labs add-in, nested if statement excel, read excel formulas, clean up excel formulas",
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
    section: "Excel",
    tags: ["Excel", "Formulas", "Productivity"],
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
      name: "Will adding line breaks break my Excel formula?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Excel fully supports line breaks inside formulas using Alt + Enter. The formula will calculate exactly the same way it did on a single line. It just looks better to you while you're editing it.",
      },
    },
    {
      "@type": "Question",
      name: "Can I beautify an entire worksheet at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not automatically. Most beautifiers work on a single formula at a time. If you have a sheet with 50 messy formulas, you'll need to format them one by one. Excel Labs makes this faster since you don't have to leave the spreadsheet.",
      },
    },
    {
      "@type": "Question",
      name: "Does this work in Google Sheets?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes and no. The manual method (Alt + Enter) works perfectly in Google Sheets. The online beautifier tools will also format the text for you to paste back in. However, the Excel Labs add-in obviously only works in Microsoft Excel.",
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

      <BlogPostExcelFormulaBeautifier />
    </>
  );
}