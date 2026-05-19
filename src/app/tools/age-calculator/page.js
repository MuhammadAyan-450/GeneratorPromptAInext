import AgeCalculator from "./AgeCalculator";

export const metadata = {
  title: "Age Calculator – Calculate Exact Age in Years, Months & Days",
  description:
    "Free age calculator to find your exact age in years, months, days, hours, and minutes. Includes birthday countdown, zodiac sign, and leap year support. No signup.",
  alternates: {
    canonical: "https://www.generatorpromptai.com/tools/age-calculator",
  },
  openGraph: {
    title: "Age Calculator – Calculate Exact Age in Years, Months & Days",
    description:
      "Free age calculator to find your exact age in years, months, days, hours, and minutes. Includes birthday countdown and zodiac sign.",
    url: "https://www.generatorpromptai.com/tools/age-calculator",
    siteName: "GeneratorPromptAI",
    type: "website",
    images: [
      {
        url: "https://www.generatorpromptai.com/og/age-calculator.png",
        width: 1200,
        height: 630,
        alt: "Age Calculator – Calculate Exact Age",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Age Calculator – Calculate Exact Age in Years, Months & Days",
    description:
      "Free age calculator. Find exact age in years, months, days, hours, minutes. Birthday countdown included.",
    images: ["https://www.generatorpromptai.com/og/age-calculator.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  keywords:
    "age calculator, calculate my age, how many days old am I, exact age calculator, age in years months days, birthday countdown calculator, chronological age calculator, age calculator by date of birth",
};

const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Age Calculator",
  url: "https://www.generatorpromptai.com/tools/age-calculator",
  applicationCategory: "UtilityApplication",
  operatingSystem: "All",
  description:
    "Free online age calculator that computes exact age in years, months, days, hours, and minutes. Includes birthday countdown, zodiac sign detection, and leap year support. 100% private — no data sent to servers.",
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
    "Exact age in years/months/days, total days/hours/minutes lived, birthday countdown, zodiac sign, leap year support, 100% private, no signup",
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
      name: "Age Calculator",
      item: "https://www.generatorpromptai.com/tools/age-calculator",
    },
  ],
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I calculate my exact age in years, months, and days?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter your date of birth in the calculator above and click 'Calculate Age'. The tool handles all edge cases — month boundaries, leap years, varying month lengths — so you get a precise result without doing any math yourself.",
      },
    },
    {
      "@type": "Question",
      name: "How many days old am I?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Just enter your birth date and the calculator will show your total days lived. For example, if you're 30 years old, you've lived roughly 10,950 to 10,958 days depending on how many leap years fell in that period.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find out how many days until my next birthday?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The calculator does this automatically. After you enter your birth date and hit calculate, look for the 'Next Birthday In' card in the results — it shows the exact number of days until your next birthday.",
      },
    },
    {
      "@type": "Question",
      name: "Does this calculator handle leap years correctly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. It uses JavaScript's native Date object, which correctly accounts for leap years (years divisible by 4, except century years not divisible by 400). February 29 birthdays and calculations spanning leap years are all accurate.",
      },
    },
    {
      "@type": "Question",
      name: "What if I was born on February 29?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your age is calculated normally — you don't stay the same age for 4 years. In non-leap years, the calculator treats your birthday as having passed on March 1 for age calculation purposes.",
      },
    },
    {
      "@type": "Question",
      name: "Is my date of birth stored or sent anywhere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The entire calculation runs in your browser using JavaScript. Your birth date never leaves your device — it's not sent to a server, not stored in a database, not logged anywhere.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my age show different days than I expected?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This usually happens when your birthday is near a month boundary. If you were born on the 30th and the current month only has 28 or 29 days, the calculator has to 'borrow' days from the previous month. The result is mathematically correct.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this to calculate someone else's age?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. There's no verification or login — just enter any date of birth and you'll get the age as of today. It works for anyone: your kids, your parents, historical figures, fictional characters.",
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

      <AgeCalculator />
    </>
  );
}