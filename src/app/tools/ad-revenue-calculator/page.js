import AdRevenueCalculator from "./AdRevenueCalculator";

export const metadata = {
  title: "Ad Revenue Calculator – Estimate Website Earnings by Ad Format",
  description:
    "Free ad revenue calculator to estimate website earnings across display, video, native, popup, interstitial, and rich media ads. Compare CPM & CPC revenue side by side.",
  alternates: {
    canonical: "https://www.generatorpromptai.com/tools/ad-revenue-calculator",
  },
  openGraph: {
    title: "Ad Revenue Calculator – Estimate Website Earnings by Ad Format",
    description:
      "Free ad revenue calculator to estimate website earnings across display, video, native, popup, interstitial, and rich media ads. Compare CPM & CPC revenue side by side.",
    url: "https://www.generatorpromptai.com/tools/ad-revenue-calculator",
    siteName: "GeneratorPromptAI",
    type: "website",
    images: [
      {
        url: "https://www.generatorpromptai.com/og/ad-revenue-calculator.png",
        width: 1200,
        height: 630,
        alt: "Ad Revenue Calculator – Estimate Website Earnings by Ad Format",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ad Revenue Calculator – Estimate Website Earnings by Ad Format",
    description:
      "Free ad revenue calculator to estimate website earnings across display, video, native, popup, interstitial, and rich media ads.",
    images: ["https://www.generatorpromptai.com/og/ad-revenue-calculator.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  keywords:
    "ad revenue calculator, website earnings calculator, cpm calculator free, cpc revenue estimator, rpm calculator online, adsense revenue calculator free, calculate ad earnings, website monetization calculator, ad income estimator",
};

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Ad Revenue Calculator",
  url: "https://www.generatorpromptai.com/tools/ad-revenue-calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  description:
    "Free online calculator to estimate website advertising revenue across 6 ad formats. Input impressions, CPM, CPC, and CTR to compare earnings from display, native, video, popup, interstitial, and rich media ads.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  creator: {
    "@type": "Organization",
    name: "GeneratorPromptAI",
    url: "https://www.generatorpromptai.com",
  },
  featureList:
    "CPM/CPC revenue calculation, 6 ad format comparison, category-specific multipliers, copy and download results, instant calculation, mobile responsive, no signup required",
};

// ─── JSON-LD: BreadcrumbList Schema ─────────────────────────────────────────
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.generatorpromptai.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "All Free Tools",
      item: "https://www.generatorpromptai.com/pages/all-tools",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Ad Revenue Calculator",
      item: "https://www.generatorpromptai.com/tools/ad-revenue-calculator",
    },
  ],
};

// ─── JSON-LD: FAQPage Schema ────────────────────────────────────────────────
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I find my website's actual CPM?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Log into your ad network dashboard — AdSense, Mediavine, Ezoic, whatever you use. Look for 'Page RPM' or 'Estimated earnings per 1000 pageviews.' That's your effective CPM. If your network shows CPM directly, use that number. If it only shows total earnings and impressions, divide earnings by (impressions ÷ 1000) to get your CPM.",
      },
    },
    {
      "@type": "Question",
      name: "Why does the calculator use different multipliers for each ad format?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because advertisers pay different rates for different formats. A video pre-roll ad is more engaging and harder to ignore than a 728x90 banner — so advertisers bid more for it. Video ads typically earn 2-2.5x what display banners earn, rich media earns 2-2.5x, and native earns about 1.3x.",
      },
    },
    {
      "@type": "Question",
      name: "Are these revenue estimates guaranteed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. These are estimates based on the numbers you provide and standard industry multipliers. Your actual earnings depend on fill rate, ad viewability, ad blocker usage, traffic quality, seasonality, and your specific ad network's rates.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use CPM or CPC — which model earns more?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your traffic and content. CPM is predictable — you know roughly what you'll earn per 1,000 impressions. CPC can outperform CPM if you have high click-through rates (2%+), especially on product-focused content. Most publishers earn through a mix of both.",
      },
    },
    {
      "@type": "Question",
      name: "What's a realistic CPM for a new blog with 10K monthly pageviews?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For a new blog, expect $0.50 to $2.00 CPM on display ads. Tier-1 traffic (US, UK, CA, AU) pushes it higher. Tech and finance niches sit at the top end; entertainment and general news at the lower end. At 10K pageviews with a $1.50 CPM, you're looking at roughly $15/month from display alone.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from the AdSense Revenue Calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The AdSense Revenue Calculator uses niche-specific RPM data and is built specifically for Google AdSense publishers. This Ad Revenue Calculator is format-agnostic — it compares earnings across display, video, native, popup, interstitial, and rich media ads.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this for YouTube ad revenue?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not directly — YouTube has its own CPM structure that depends on video category, watch time, and audience geography. Use the YouTube Ad Revenue Calculator for that. This tool is designed for website and app ad inventory.",
      },
    },
    {
      "@type": "Question",
      name: "I only know my RPM, not my CPM. What do I do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your ad network reports RPM (revenue per 1,000 pageviews), you can use that number as your CPM input. RPM and CPM are close enough for estimation purposes — RPM actually accounts for fill rate and ad blockers, making it a more realistic input.",
      },
    },
  ],
};

// ─── Page Component ─────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
      />

      <AdRevenueCalculator />
    </>
  );
}