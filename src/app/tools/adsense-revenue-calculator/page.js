import AdsenseRevenueCalculator from "./AdsenseRevenueCalculator";

export const metadata = {
  title: "AdSense Revenue Calculator – Estimate Google AdSense Earnings",
  description:
    "Free AdSense revenue calculator to estimate monthly and yearly Google AdSense income by niche category.",
  alternates: {
    canonical: "https://www.generatorpromptai.com/tools/adsense-revenue-calculator",
  },
  openGraph: {
    title: "AdSense Revenue Calculator – Estimate Google AdSense Earnings",
    description:
      "Free AdSense revenue calculator to estimate monthly and yearly Google AdSense income by niche category.",
    url: "https://www.generatorpromptai.com/tools/adsense-revenue-calculator",
    siteName: "GeneratorPromptAI",
    type: "website",
    images: [
      {
        url: "https://www.generatorpromptai.com/og/adsense-revenue-calculator.png",
        width: 1200,
        height: 630,
        alt: "AdSense Revenue Calculator – Estimate Earnings by Niche",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AdSense Revenue Calculator – Estimate Google AdSense Earnings",
    description:
      "Free AdSense revenue calculator to estimate monthly and yearly Google AdSense income by niche category.",
    images: ["https://www.generatorpromptai.com/og/adsense-revenue-calculator.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  keywords:
    "adsense revenue calculator, google adsense calculator, adsense earnings estimator, adsense rpm by niche, how much does adsense pay, adsense niche rpm, calculate adsense income, adsense page rpm calculator",
};

const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AdSense Revenue Calculator",
  url: "https://www.generatorpromptai.com/tools/adsense-revenue-calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  description:
    "Free AdSense revenue calculator to estimate monthly and yearly Google AdSense income by niche category.",
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
    "12+ niche RPM data, custom RPM mode, daily/monthly/yearly breakdown, per-page revenue, copy and download results, mobile responsive",
};

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
      name: "AdSense Revenue Calculator",
      item: "https://www.generatorpromptai.com/tools/adsense-revenue-calculator",
    },
  ],
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I calculate my AdSense revenue manually?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Take your monthly page views, divide by 1,000, and multiply by your RPM. Example: 100,000 page views × $5 RPM ÷ 1,000 = $500/month.",
      },
    },
    {
      "@type": "Question",
      name: "What's a good AdSense RPM in 2024?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "$1-3 is normal for entertainment and sports. $4-8 is solid for tech, education, and travel. $10-25 is achievable in finance, legal, real estate, and insurance.",
      },
    },
    {
      "@type": "Question",
      name: "Which niche pays the most for Google AdSense?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Legal and finance consistently top the charts. Legal content can hit $15-25 RPM. Finance and insurance ($10-18 RPM) and real estate ($8-14 RPM) follow close behind.",
      },
    },
    {
      "@type": "Question",
      name: "How much does AdSense pay per 1,000 page views?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anywhere from $1 to $25 depending on niche. The average across all niches is roughly $3-5 per 1,000 views. A finance site at $15 RPM earns 10x more per 1,000 views than an entertainment site at $1.50 RPM.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my actual AdSense income lower than this calculator shows?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ad blockers reduce actual impressions by 20-40%. Fill rate isn't always 100%. Traffic from low-value countries drags down RPM. And poor ad placement earns less than well-placed in-content ads.",
      },
    },
    {
      "@type": "Question",
      name: "Should I pick a niche based on AdSense RPM alone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. High RPM niches are competitive and hard to rank for. A finance blog competing with Forbes will struggle for traffic. Pick a niche you can actually compete in, then maximize RPM through good ad placement.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from the Ad Revenue Calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Ad Revenue Calculator compares earnings across ad formats (display, video, native) using CPM and CPC. This AdSense Revenue Calculator is niche-focused — it uses RPM data for 12+ content categories.",
      },
    },
    {
      "@type": "Question",
      name: "Does the number of ad units per page actually affect my RPM?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "More ad units means more total impressions per pageview, increasing total revenue. But too many ads results in cheap ads dragging down average RPM, and Google penalizes pages with excessive ads. Stick to 3-4 well-placed units.",
      },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
      />

      <AdsenseRevenueCalculator />
    </>
  );
}