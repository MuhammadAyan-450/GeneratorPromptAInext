export default function sitemap() {

  const tools = [
    "ad-revenue-calculator",
    "adsense-revenue-calculator",
    "age-calculator",
    "ai-agent",
    "base64-encode",
    "case-converter",
    "chatgpt-prompt-generator",
    "claude-prompt-generator",
    "cpc-calculator",
    "cpm-calculator",
    "currency-converter",
    "ebay-charges-calculator",
    "email-validator",
    "emoji-picker",
    "excel-formula-beautifier",
    "fake-data-generator",
    "hashtag-generator",
    "image-compressor",
    "image-converter",
    "image-cropper",
    "image-resizer",
    "image-to-text",
    "json-formatter",
    "json-validator",
    "lorem-ipsum-generator",
    "midjourney-prompt-generator",
    "password-generator",
    "percentage-calculator",
    "qr-code-generator",
    "remove-duplicate-lines",
    "sitemap-generator",
    "time-zone-converter",
    "unix-timestamp",
    "uppercase-to-lowercase",
    "url-encoder",
    "uuid-generator",
    "word-counter",
    "youtube-ad-revenue-calculator",
    "youtube-script-prompt-generator",
    "markdown-to-html",
    "serp-snippet-preview",
    "profit-margin-calculator",
    "meta-description-checker",
    "seo-meta-tags-generator",
    "ai-content-detector",
    "ai-text-humanizer",
    "apush-score-calculator",
    "racine-carree-calculator"
  ];

 
  const blogPosts = [
    "claude-vs-chatgpt-which-is-better",
    "compress-image-to-100kb-online-free",
    "how-to-calculate-cpm",
    "how-to-generate-lorem-ipsum-text-custom-length",
    "jpeg-vs-png-complete-comparison-guide",
    "how-to-increase-adsense-earnings",
    "cpm-vs-cpc-explained",
    "cpm-calculator-how-much-can-you-earn-from-ads",
    "how-to-calculate-cpc-online",
    "chatgpt-prompt-generator-guide",
    "excel-formula-beautifier-guide",
    "cpm-formula-how-to-calculate",
    "how-to-generate-xml-sitemap-free"
  ];

  return [

    {
      url: "https://www.generatorpromptai.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://www.generatorpromptai.com/pages/all-tools",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.generatorpromptai.com/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://www.generatorpromptai.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.generatorpromptai.com/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.generatorpromptai.com/privacy-policy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://www.generatorpromptai.com/terms-of-service",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    // ═══════════════════════════════════════
    // ALL 40 TOOLS
    // ═══════════════════════════════════════
    ...tools.map((tool) => ({
      url: `https://www.generatorpromptai.com/tools/${tool}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })),

    // ═══════════════════════════════════════
    // ALL 14 BLOG POSTS
    // ═══════════════════════════════════════
    ...blogPosts.map((post) => ({
      url: `https://www.generatorpromptai.com/blog/${post}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    })),
  ];
}
