import BlogPostCompressImage from './BlogPostCompressImage'

const POST_TITLE = "How to Compress Image to 100KB Online Free (2026)"
const POST_EXCERPT = "Compress any image to exactly 100KB without losing quality. Free online tool — no signup, no watermark, no software. Works with JPG, PNG, WebP. Step-by-step guide."
const POST_SLUG = "compress-image-to-100kb-online-free"
const POST_DATE_ISO = "2026-04-10"
const POST_IMAGE = "https://www.generatorpromptai.com/og-compress-image-100kb.png"
const SITE_URL = "https://www.generatorpromptai.com"

export const metadata = {
    title: `${POST_TITLE} | GeneratorPromptAI`,
    description: POST_EXCERPT,
    keywords: "compress image to 100kb, compress image to 100kb online, reduce image size to 100kb, image compressor 100kb, compress photo to 100kb free, image size reducer online, compress jpg to 100kb, compress png to 100kb",
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
        tags: ["Images", "Image Compression"],
    },
    twitter: {
        card: "summary_large_image",
        title: "How to Compress Image to 100KB Online Free",
        description: "Compress any image to exactly 100KB without losing quality. Free tool.",
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
            name: "How to compress image to 100KB without losing quality?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Use our free online image compressor. Upload your image, set the target size to 100KB, and click compress. The tool uses smart lossy compression that maintains visual quality while reducing file size. It works with JPG, PNG, and WebP formats.",
            },
        },
        {
            "@type": "Question",
            name: "Can I compress multiple images to 100KB at once?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Our image compressor supports bulk compression. You can upload multiple images at once and they will all be compressed to your target size simultaneously. There's no limit on the number of images.",
            },
        },
        {
            "@type": "Question",
            name: "Does compressing to 100KB reduce image quality?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "It depends on the original size. If your image is 500KB+, compressing to 100KB will have minimal visible quality loss. If the original is already 120KB, the quality drop will be more noticeable. For photos, JPG compression to 100KB usually looks fine. For graphics with text, you might notice slight blurring.",
            },
        },
        {
            "@type": "Question",
            name: "What is the best image format for 100KB file size?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "JPG is the best format for keeping photos under 100KB while maintaining quality. WebP is even better — it produces smaller files at the same quality level. PNG is not ideal for 100KB because it uses lossless compression, so a 100KB PNG will look worse than a 100KB JPG for photos. Use WebP if your platform supports it, otherwise JPG.",
            },
        },
        {
            "@type": "Question",
            name: "Why do websites require images under 100KB?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Most websites and platforms set 100KB limits for profile pictures, document uploads, and form attachments because large images slow down page loading, increase bandwidth costs, and hurt SEO rankings. Google specifically uses page speed as a ranking factor, so keeping images small directly helps your site rank higher.",
            },
        },
        {
            "@type": "Question",
            name: "Is this image compressor really free?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, 100% free. No signup required, no watermark added, no limit on how many images you can compress, and no hidden charges. Your images are processed in your browser and are never uploaded to any server.",
            },
        },
    ],
}

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
            name: "Compress Image to 100KB",
            item: `${SITE_URL}/blog/${POST_SLUG}`,
        },
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
            <BlogPostCompressImage />
        </>
    )
}