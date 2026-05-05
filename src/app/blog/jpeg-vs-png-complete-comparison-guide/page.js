import BlogPostJpegVsPng from './BlogPostJpegVsPng'
// Apne project ke hisaab se yahan Navbar aur Footer ka path set karna hai

const POST_TITLE = "JPEG vs PNG — Complete Comparison Guide (When to Use Which in 2026)"
const POST_EXCERPT = "JPEG vs PNG: which format should you use? Complete comparison of file size, quality, transparency, and use cases. With real data, examples, and a simple decision rule."
const POST_SLUG = "jpeg-vs-png-complete-comparison-guide"
const POST_DATE_ISO = "2026-04-14"
const POST_IMAGE = "https://www.generatorpromptai.com/og-jpeg-vs-png.png"
const SITE_URL = "https://www.generatorpromptai.com"

export const metadata = {
  title: `${POST_TITLE} | GeneratorPromptAI`,
  description: POST_EXCERPT,
  keywords: "jpeg vs png, jpeg vs png difference, jpeg vs png quality, jpeg vs png for web, jpeg vs png for photos, jpeg vs png for logos, when to use jpeg vs png, jpeg vs png file size, jpeg vs png transparency, png vs jpeg comparison, jpeg vs png which is better, jpeg vs png 2026",
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
    tags: ["Images", "JPEG", "PNG"],
  },
  twitter: {
    card: "summary_large_image",
    title: "JPEG vs PNG — Complete Comparison Guide",
    description: "JPEG vs PNG: which format should you use? Real data and a simple decision rule.",
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
      name: "Which is better quality, JPEG or PNG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PNG has better quality than JPEG for images with text, sharp edges, and few colors because it uses lossless compression — no data is lost. However, for photographs, JPEG at high quality (90%+) looks identical to PNG while being 5-10x smaller in file size. So 'better quality' depends on what you're comparing.",
      },
    },
    {
      "@type": "Question",
      name: "When should I use JPEG vs PNG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use JPEG for photographs, social media images, email attachments, and any image with many colors and gradients. Use PNG for logos, icons, screenshots, graphics with text, and any image that needs a transparent background. Simple rule: photos = JPEG, graphics = PNG.",
      },
    },
    {
      "@type": "Question",
      name: "Is PNG higher quality than JPEG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PNG is lossless (no quality loss ever) while JPEG is lossy (loses quality each time you save). So technically yes, PNG preserves exact quality. But in practice, a JPEG saved at 95% quality looks identical to PNG for photos — you'd need to zoom to 200-300% to see any difference, while the JPEG file is 5-10x smaller.",
      },
    },
    {
      "@type": "Question",
      name: "Why are PNG files so large?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PNG files are large because they use lossless compression — they store every single pixel's exact data without throwing anything away. A 4000x3000 photo saved as PNG can be 15-30MB, while the same photo as JPEG might be 1-3MB. PNG was designed for graphics, not photos. For photos, JPEG or WebP are much more efficient formats.",
      },
    },
    {
      "@type": "Question",
      name: "Can I convert JPEG to PNG without losing quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can convert JPEG to PNG, but it won't improve quality. JPEG has already discarded some image data during compression. Converting to PNG just stores the already-degraded image in a bigger file. Think of it like taking a photocopy of a photocopy and putting it in a more expensive frame — the content doesn't improve, only the container changes.",
      },
    },
    {
      "@type": "Question",
      name: "Which format is better for websites, JPEG or PNG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For website speed, JPEG is generally better because smaller files = faster loading. But the best approach is using the right format for each image: JPEG for photos, PNG for logos and graphics. Even better, use WebP format if possible — it's 25-35% smaller than JPEG with the same quality and supports transparency like PNG.",
      },
    },
    {
      "@type": "Question",
      name: "Does JPEG support transparency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, standard JPEG does not support transparency. JPEG images always have a solid background (usually white or black). If you need a transparent background — for logos, overlays, stickers — you must use PNG, WebP, GIF, or SVG. There is a rarely-used format called JPEG 2000 that supports transparency, but it's not supported by web browsers.",
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
    { "@type": "ListItem", position: 3, name: "JPEG vs PNG", item: `${SITE_URL}/blog/${POST_SLUG}` },
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
      <BlogPostJpegVsPng />
    </>
  )
}