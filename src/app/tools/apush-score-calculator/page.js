import APUSHScoreCalculator from "./APUSHScoreCalculator";

export const metadata = {
  title: "APUSH Score Calculator – Estimate Your AP History Score",
  description:
    "Estimate your APUSH exam score instantly with our free APUSH Score Calculator. Predict your AP U.S. History score from 1 to 5. 🚀",
  keywords:
    "apush score calculator, ap us history score calculator, estimate apush score, apush composite score calculator, apush mcq saq dbq leq calculator, ap history exam score predictor, apush practice test score converter, apush score converter 1-5, calculate apush exam score online free",
  alternates: {
    canonical:
      "https://www.generatorpromptai.com/tools/apush-score-calculator",
  },
  openGraph: {
    title:
      "APUSH Score Calculator – Estimate Your AP History Score",
    description:
      "Estimate your APUSH exam score instantly with our free APUSH Score Calculator. Predict your AP U.S. History score from 1 to 5. 🚀",
    url: "https://www.generatorpromptai.com/tools/apush-score-calculator",
    siteName: "GeneratorPromptAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "APUSH Score Calculator – Estimate Your AP History Score",
    description:
      "Estimate your APUSH exam score instantly with our free APUSH Score Calculator. Predict your AP U.S. History score from 1 to 5. 🚀",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "APUSH Score Calculator – AP U.S. History Exam Score Estimator",
  url: "https://www.generatorpromptai.com/tools/apush-score-calculator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "All",
  description:
    "Estimate your APUSH exam score instantly with our free APUSH Score Calculator. Predict your AP U.S. History score from 1 to 5. 🚀",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  creator: {
    "@type": "Organization",
    name: "GeneratorPromptAI",
  },
  featureList:
    "MCQ/SAQ/DBQ/LEQ input, weighted composite calculation, AP score prediction (1-5), section-by-section breakdown, personalized study tips, mobile responsive, no signup required",
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
      name: "APUSH Score Calculator",
      item: "https://www.generatorpromptai.com/tools/apush-score-calculator",
    },
  ],
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How accurate is this APUSH score calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We use official College Board section weights and historical composite-to-AP score mappings. However, actual exam cutoffs vary yearly. Use this as an estimate, not a guarantee.",
      },
    },
    {
      "@type": "Question",
      name: "What's considered a good APUSH score for college credit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A score of 3+ is considered 'passing' and may earn college credit. A 4 or 5 is competitive for selective colleges. Aim for 69+ composite for a 4, or 86+ for a 5.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find my raw scores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After a practice exam: MCQ = number correct (no penalty for wrong). SAQ = points earned per rubric (0-3 each). DBQ/LEQ = score using official rubrics (DBQ 0-7, LEQ 0-6).",
      },
    },
    {
      "@type": "Question",
      name: "Does this calculator work for other AP exams?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool is specific to AP U.S. History. Other AP exams have different structures and scoring. We're adding more AP calculators soon!",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this during the real AP exam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — this is for practice and study planning only. The real AP exam is proctored and does not allow external tools.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my composite score out of 115, not 100?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The composite scale (0-115) reflects the weighted sum of all sections. It's then converted to the 1-5 AP scale. Don't compare it directly to a percentage.",
      },
    },
    {
      "@type": "Question",
      name: "Is it possible to get a 5 with weak essays but strong MCQ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If you get 50-52/55 on MCQ (around 90%+) but only mediocre essays (maybe 12-14 combined out of 13 possible points), you can still hit 86+ composite. That's why MCQ is so important.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between DBQ and LEQ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DBQ gives you 7 documents and asks you to write an argument using them plus outside knowledge. The rubric specifically scores how well you use and analyze those documents. LEQ gives you a choice between two prompts — pick the one you're more confident about.",
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
      <APUSHScoreCalculator />
    </>
  );
}