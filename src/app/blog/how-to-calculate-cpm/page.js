import HowToCalculateCpmBlog from './HowToCalculateCpmBlog'

const POST_TITLE = "How to Calculate CPM: Step-by-Step Formula, Examples & Benchmarks"
const POST_EXCERPT = "Learn the exact CPM formula, follow a step-by-step calculation tutorial, see real-world ad campaign examples, and check 2025 CPM benchmarks by platform."
const POST_SLUG = "how-to-calculate-cpm"
const POST_DATE_ISO = "2025-01-15"
const POST_MODIFIED_ISO = "2025-06-20"
const POST_IMAGE = "https://www.generatorpromptai.com/og-cpm-calculator.png"
const SITE_URL = "https://www.generatorpromptai.com"

export const metadata = {
  title: `${POST_TITLE} | GeneratorPromptAI`,
  description: "Learn how to calculate CPM (Cost Per 1000 Impressions) with the simple formula. Step-by-step tutorial with real-world examples, industry benchmarks, and tips to lower your CPM.",
  keywords: "how to calculate cpm, cpm formula, cost per mille formula, calculate cpm from cost and impressions, what is cpm in digital marketing, how to calculate cost per 1000 impressions, cpm calculation example, how to find cpm, calculate cpm for facebook ads, calculate cpm for google ads",
  alternates: {
    canonical: `${SITE_URL}/blog/${POST_SLUG}`,
  },
  robots: "index, follow",
  openGraph: {
    type: "article",
    siteName: "GeneratorPromptAI",
    title: "How to Calculate CPM: Step-by-Step Formula & Examples",
    description: "Master the CPM formula. Learn to calculate cost per 1000 impressions for Google, Facebook, and display ads with real examples.",
    url: `${SITE_URL}/blog/${POST_SLUG}`,
    image: POST_IMAGE,
    publishedTime: POST_DATE_ISO,
    modifiedTime: POST_MODIFIED_ISO,
    section: "Digital Marketing",
    tags: ["Ad Calculators", "CPM"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Calculate CPM: Formula & Examples",
    description: "Free step-by-step guide to calculating CPM for your ad campaigns.",
    image: POST_IMAGE,
  },
}

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description: "Learn exactly how to calculate CPM for your digital ad campaigns. Includes the CPM formula, real-world examples, industry benchmarks for 2025, and tips to lower your CPM.",
  image: POST_IMAGE,
  datePublished: POST_DATE_ISO,
  dateModified: POST_MODIFIED_ISO,
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
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the formula to calculate CPM?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The formula to calculate CPM is: CPM = (Total Campaign Cost / Total Impressions) x 1,000. For example, if you spend $500 and get 100,000 impressions, your CPM is ($500 / 100,000) x 1,000 = $5.00.",
      },
    },
    {
      "@type": "Question",
      name: "What does CPM stand for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CPM stands for Cost Per Mille. 'Mille' is the Latin word for thousand. In digital advertising, it represents the cost an advertiser pays for 1,000 impressions of their ad.",
      },
    },
    {
      "@type": "Question",
      name: "Is a $5 CPM good?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, a $5 CPM is generally considered good for most digital advertising campaigns. It sits right in the middle of average display ad CPMs ($2-$5). However, 'good' depends on your industry — B2B tech might see $15 CPMs, while entertainment might see $1 CPMs.",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate CPM from CPC and CTR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To calculate CPM from CPC and CTR, use the formula: CPM = CPC x CTR x 1,000. For example, if your CPC is $2.00 and your CTR is 2% (0.02), your CPM is 2.00 x 0.02 x 1,000 = $40.00.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good CPM for Facebook ads?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good CPM for Facebook and Instagram ads in 2025 ranges from $5 to $12. During Q4 (holiday season), CPMs can spike to $15-$20 due to heavy competition. B2B niches tend to have higher CPMs than B2C.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my CPM so high?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "High CPM is usually caused by: narrow audience targeting (less inventory = higher prices), low ad relevance scores, seasonal competition (Q4 is always expensive), expensive geographies (US/UK cost more), or ad fatigue from not rotating creatives.",
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
    { "@type": "ListItem", position: 3, name: "CPM Calculation Guide", item: `${SITE_URL}/blog/${POST_SLUG}` },
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
      <HowToCalculateCpmBlog />
    </>
  )
}