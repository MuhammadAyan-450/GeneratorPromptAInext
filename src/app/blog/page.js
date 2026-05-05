import BlogContent from '../../components/BlogContent'
import { BLOG_POSTS } from '../data/blogData'

// Blog Schema
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Free Online Tools Guides & AI Prompt Tutorials",
  "url": "https://www.generatorpromptai.com/blog",
  "description": "Step-by-step guides on how to use JSON formatter, image compressor, Base64 encoder, and AI prompt builders for ChatGPT, Claude, and Midjourney.",
  "publisher": {
    "@type": "Organization",
    "name": "GeneratorPromptAI",
    "url": "https://www.generatorpromptai.com",
  },
  "blogPost": BLOG_POSTS.map((post) => ({
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.dateISO || post.date,
    "url": `https://www.generatorpromptai.com/blog/${post.slug}`,
    "author": {
      "@type": "Organization",
      "name": "GeneratorPromptAI"
    },
  })),
}

// Breadcrumb Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.generatorpromptai.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Tools Guides & AI Tutorials Blog",
      "item": "https://www.generatorpromptai.com/blog"
    }
  ]
}

// SEO Metadata (Next.js App Router way)
export const metadata = {
  title: 'Free Tools Guides & AI Prompt Engineering Tutorials – Step-by-Step How-To Articles',
  description: 'Learn how to use JSON formatter, compress images without losing quality, encode Base64, and write AI prompts for ChatGPT & Claude. Step-by-step free tools tutorials and prompt engineering guides.',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/blog'
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  openGraph: {
    type: 'website',
    siteName: 'GeneratorPromptAI',
    title: 'Free Tools Guides & AI Prompt Engineering Tutorials',
    description: 'Step-by-step guides on JSON formatting, image compression, Base64 encoding, and building AI prompts for ChatGPT & Claude.',
    url: 'https://www.generatorpromptai.com/blog',
    images: ['https://www.generatorpromptai.com/og-blog.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Tools Guides & AI Prompt Tutorials',
    description: 'Learn how to use free online tools and write better AI prompts with our step-by-step tutorials.',
    images: ['https://www.generatorpromptai.com/og-blog.png'],
  },
}

export default function BlogPage() {
  return (
    <>
      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <BlogContent />
    </>
  )
}