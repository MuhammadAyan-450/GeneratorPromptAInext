import MarkdownToHtml from "./MarkdownToHtml";

const POST_TITLE =
  "Free Online Markdown to HTML Converter – Instant & Secure | GeneratorPromptAI";
const POST_DESCRIPTION =
  "Convert Markdown to clean, sanitized HTML code instantly. Live preview, copy to clipboard, or download as .html file. 100% free, no signup, runs in your browser.";
const POST_URL = "https://www.generatorpromptai.com/tools/markdown-to-html";
const SITE_URL = "https://www.generatorpromptai.com";

export const metadata = {
  title: POST_TITLE,
  description: POST_DESCRIPTION,
  keywords:
    "markdown to html converter, md to html online, convert markdown to html free, markdown to html tool, gfm to html, github flavored markdown converter, markdown parser online, free markdown converter no signup",
  alternates: { canonical: POST_URL },
  robots: "index, follow",
  openGraph: {
    type: "website",
    siteName: "GeneratorPromptAI",
    title: "Free Online Markdown to HTML Converter",
    description:
      "Convert Markdown to HTML instantly with live preview. 100% free & secure.",
    url: POST_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Markdown to HTML Converter",
    description:
      "Convert Markdown to HTML instantly. No server upload required.",
  },
};

const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Markdown to HTML Converter",
  url: POST_URL,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description:
    "Free online tool to convert Markdown text into clean, sanitized HTML code with live preview.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  creator: { "@type": "Organization", name: "GeneratorPromptAI" },
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I convert Markdown to HTML?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste your Markdown text into the left editor. The HTML code will be instantly generated on the right side. Copy it or download it as an HTML file.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to convert Markdown to HTML online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The entire conversion happens inside your browser. Your text is never sent to any server, ensuring complete privacy.",
      },
    },
    {
      "@type": "Question",
      name: "Does this support GitHub Flavored Markdown?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, it fully supports GFM including tables, task lists, strikethrough, and fenced code blocks.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the generated HTML in my website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. The generated HTML is clean and standard. You can copy it directly into your CMS or static site generator.",
      },
    },
  ],
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "All Tools",
      item: `${SITE_URL}/pages/all-tools`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Markdown to HTML",
      item: POST_URL,
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
      />
      <MarkdownToHtml />
    </>
  );
}
