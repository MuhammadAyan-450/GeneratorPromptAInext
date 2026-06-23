import BlogPostHowToIncreaseAdsenseEarnings from './BlogPostHowToIncreaseAdsenseEarnings'

const POST_TITLE = "How to Increase AdSense Earnings (RPM Secrets & Ad Placements That Work)"
const POST_EXCERPT = "Stop chasing traffic. Learn how to optimize your AdSense RPM with proven ad placements, high-CPC niches, and Core Web Vitals fixes to 3x your earnings."
const POST_SLUG = "how-to-increase-adsense-earnings"
const POST_DATE_ISO = "2025-05-10"
const POST_IMAGE = "https://www.generatorpromptai.com/og-adsense-earnings.png"
const SITE_URL = "https://www.generatorpromptai.com"

export const metadata = {
  title: `${POST_TITLE} | GeneratorPromptAI`,
  description: POST_EXCERPT,
  keywords: "how to increase adsense earnings, adsense rpm optimization, best ad placement for adsense, how to get high cpc on adsense, adsense earnings tricks, increase page rpm without traffic, adsense anchor ads, adsense in-content ads, why is my adsense rpm so low",
  alternates: { canonical: `${SITE_URL}/blog/${POST_SLUG}` },
  robots: "index, follow",
  openGraph: {
    type: "article",
    siteName: "GeneratorPromptAI",
    title: POST_TITLE,
    description: "RPM secrets & ad placements that actually work to increase AdSense earnings.",
    url: `${SITE_URL}/blog/${POST_SLUG}`,
    image: POST_IMAGE,
    publishedTime: POST_DATE_ISO,
    section: "Monetization",
    tags: ["AdSense", "RPM", "Monetization"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Increase AdSense Earnings (RPM Secrets)",
    description: "Real data on ad placements, niches, and tricks to 3x your AdSense RPM.",
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description: POST_EXCERPT,
  image: POST_IMAGE,
  datePublished: POST_DATE_ISO,
  dateModified: POST_DATE_ISO,
  author: { "@type": "Organization", name: "GeneratorPromptAI", url: SITE_URL },
  publisher: { "@type": "Organization", name: "GeneratorPromptAI", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${POST_SLUG}` },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How do I increase my AdSense RPM?", acceptedAnswer: { "@type": "Answer", text: "Fix ad placements: in-content ad after paragraph 2, enable mobile anchor ads, remove excessive above-the-fold ads. Write 2000+ word articles to increase impressions per session. Fix Core Web Vitals (especially CLS) to get into better ad auctions." } },
    { "@type": "Question", name: "Why is my AdSense RPM so low?", acceptedAnswer: { "@type": "Answer", text: "Low RPM is usually caused by: low-CPC niche (entertainment/lifestyle), bad ad placements (all ads above the fold), poor Core Web Vitals (especially CLS), or low-quality traffic (social media bounce traffic vs search intent traffic)." } },
    { "@type": "Question", name: "Does more traffic increase AdSense earnings?", acceptedAnswer: { "@type": "Answer", text: "Yes, but only linearly. If your RPM is $2, doubling traffic doubles earnings. But if you spend that same time doubling your RPM from $2 to $8, you 4x your earnings without a single extra visitor. Fix RPM first, then chase traffic." } },
    { "@type": "Question", name: "How many ads should I put on a page?", acceptedAnswer: { "@type": "Answer", text: "For a 2000+ word article, 5-7 ads is the sweet spot: 1 above the fold, 2-3 in-content, 1 at the end, and 1 sidebar or anchor ad on mobile. Going above 8-10 ads creates ad blindness and actually decreases CPC." } },
    { "@type": "Question", name: "What is a good RPM for AdSense?", acceptedAnswer: { "@type": "Answer", text: "$5-$10 RPM is average, $10-$25 is good, and $25+ is excellent for content sites. Search traffic RPMs are typically 2-3x higher than display/social RPMs. Finance and tech niches regularly see $15-$30 RPMs." } },
    { "@type": "Question", name: "Does page speed affect AdSense earnings?", acceptedAnswer: { "@type": "Answer", text: "Yes, significantly. Slow sites get placed in lower-quality ad auctions, meaning cheaper ads and lower CPC. Fixing your CLS alone can boost RPM by 10-20%." } },
  ]
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    { "@type": "ListItem", position: 3, name: "AdSense Earnings", item: `${SITE_URL}/blog/${POST_SLUG}` },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BlogPostHowToIncreaseAdsenseEarnings />
    </>
  )
}