import AgeCalculator from "./AgeCalculator";

// ✅ Perfect SEO Metadata
export const metadata = {
  title: "Age Calculator – Calculate Exact Age in Years, Months & Days Instantly",

  description:
    "age calculator. Find your exact age in years, months, days, hours, and minutes. Includes birthday countdown instanaly",

  alternates: {
    canonical: "https://www.generatorpromptai.com/tools/age-calculator",
  },

  openGraph: {
    title: "Age Calculator – Calculate Exact Age in Years, Months & Days Instantly",
    description:
      "age calculator. Find your exact age in years, months, days, hours, and minutes. Includes birthday countdown instanaly",
    url: "https://www.generatorpromptai.com/tools/age-calculator",
    siteName: "GeneratorPromptAI",
    type: "website",
    images: [
      {
        url: "https://www.generatorpromptai.com/og/age-calculator.png",
        width: 1200,
        height: 630,
        alt: "Age Calculator – Exact Age Finder",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Age Calculator – Calculate Exact Age in Years, Months & Days Instantly",
    description:
      "age calculator. Find your exact age in years, months, days, hours, and minutes. Includes birthday countdown instanaly",
    images: ["https://www.generatorpromptai.com/og/age-calculator.png"],
  },

  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },

  keywords:
    "age calculator, exact age calculator, calculate my age, birthday calculator, age in days calculator, age finder online, leap year age calculator, calculate age in years months days, birthday countdown calculator, zodiac sign calculator",
};

// ─── JSON-LD: WebApplication Schema ─────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Age Calculator – Calculate Exact Age in Years, Months & Days Instantly",
  url: "https://www.generatorpromptai.com/tools/age-calculator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "All",
  description:
    "age calculator. Find your exact age in years, months, days, hours, and minutes. Includes birthday countdown instanaly",
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
    "Exact age calculation, total days lived, hours and minutes lived, birthday countdown, zodiac sign, leap year support, copy results, privacy-friendly, no signup required",
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
      name: "Age Calculator",
      item: "https://www.generatorpromptai.com/tools/age-calculator",
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
      name: "How do I calculate my exact age?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter your date of birth and click Calculate Age. The tool automatically calculates your exact age in years, months, and days while accounting for leap years and month differences.",
      },
    },
    {
      "@type": "Question",
      name: "Can this calculator show how many days old I am?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The calculator shows total days lived along with weeks, hours, and minutes based on your birth date.",
      },
    },
    {
      "@type": "Question",
      name: "Does this age calculator handle leap years correctly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The calculator uses JavaScript's native Date object, which automatically accounts for leap years and varying month lengths.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I was born on February 29?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The calculator correctly handles February 29 birthdays. In non-leap years, your birthday is treated according to standard date calculations so your age remains accurate.",
      },
    },
    {
      "@type": "Question",
      name: "Can I find out how many days are left until my next birthday?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The calculator includes a birthday countdown feature that shows the exact number of days remaining until your next birthday.",
      },
    },
    {
      "@type": "Question",
      name: "Is my birth date stored or shared?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Everything runs directly in your browser. Your birth date is never uploaded, stored, or shared.",
      },
    },
    {
      "@type": "Question",
      name: "Can I calculate someone else's age?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can enter any valid birth date to calculate the age of another person instantly.",
      },
    },
    {
      "@type": "Question",
      name: "Does this work on mobile devices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The age calculator is fully responsive and works on phones, tablets, laptops, and desktop browsers.",
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaWebApp),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaBreadcrumb),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaFaq),
        }}
      />

      <AgeCalculator />
    </>
  );
}
