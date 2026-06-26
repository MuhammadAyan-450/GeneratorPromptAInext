import ProportionCalculator from './ProportionCalculator'

// ✅ SEO Metadata — Title 60 chars | Description 155 chars
export const metadata = {
  title: 'Proportion Calculator — Solve Proportions Online Free',

  description: 'Solve any proportion instantly. Enter 3 values in a/b = c/d, leave one blank, and get the answer with step-by-step cross multiplication. Free online proportion solver.',

  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/proportion-calculator',
  },

  openGraph: {
    title: 'Proportion Calculator — Solve Proportions Online Free',
    description: 'Solve any proportion instantly. Enter 3 values in a/b = c/d, leave one blank, and get the answer with step-by-step cross multiplication. Free online proportion solver.',
    url: 'https://www.generatorpromptai.com/tools/proportion-calculator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/proportion-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Proportion Calculator — Solve a/b = c/d Online Free',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Proportion Calculator — Solve Proportions Online Free',
    description: 'Solve any proportion instantly. Enter 3 values in a/b = c/d, leave one blank, and get the answer with step-by-step cross multiplication.',
    images: ['https://www.generatorpromptai.com/og/proportion-calculator.png'],
  },

  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },

  keywords: 'proportion calculator, solve proportions, proportion solver, how to solve proportions, proportion formula, cross multiplication calculator, ratio and proportion calculator, direct proportion calculator, inverse proportion calculator, solve for x proportion, missing value proportion, a/b = c/d calculator',
}

// ─── JSON-LD: WebApplication ─────────────────────────────────────────────────
const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Proportion Calculator — Solve Proportions Online",
  "url": "https://www.generatorpromptai.com/tools/proportion-calculator",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "description": "Solve any proportion problem (a/b = c/d) by entering three values and leaving the unknown blank. Get the missing value with full step-by-step cross multiplication working shown. Works for direct proportions, ratio problems, recipe scaling, map distances, and more.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "creator": {
    "@type": "Organization",
    "name": "GeneratorPromptAI",
    "url": "https://www.generatorpromptai.com"
  },
  "featureList": "Solve for any unknown (a, b, c, or d), step-by-step cross multiplication solution, supports decimals and negative numbers, copy result to clipboard, 100% browser-based and private, no signup required"
}

// ─── JSON-LD: BreadcrumbList ──────────────────────────────────────────────────
const schemaBreadcrumb = {
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
      "name": "All Free Tools",
      "item": "https://www.generatorpromptai.com/pages/all-tools"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Proportion Calculator",
      "item": "https://www.generatorpromptai.com/tools/proportion-calculator"
    }
  ]
}

// ─── JSON-LD: FAQPage ─────────────────────────────────────────────────────────
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do you solve a proportion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Set up the proportion as a/b = c/d with the unknown in one position. Cross multiply (a × d = b × c), then divide both sides by the number next to the unknown to isolate it. For example, to solve 3/4 = x/12: cross multiply to get 3 × 12 = 4 × x, then x = 36 ÷ 4 = 9."
      }
    },
    {
      "@type": "Question",
      "name": "What is the proportion formula?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The proportion formula is a/b = c/d, which via cross multiplication becomes a × d = b × c. To solve for each variable: a = (b × c) ÷ d, b = (a × d) ÷ c, c = (a × d) ÷ b, d = (b × c) ÷ a."
      }
    },
    {
      "@type": "Question",
      "name": "What is cross multiplication?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cross multiplication is the technique for solving proportions. When you have a/b = c/d, multiply diagonally: a × d = b × c. This works because multiplying both sides by b × d gives a × d = b × c."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between a ratio and a proportion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A ratio compares two quantities (like 3:5). A proportion is a statement that two ratios are equal (like 3/5 = 6/10). You need a proportion when solving for a missing value using two equal ratios."
      }
    },
    {
      "@type": "Question",
      "name": "What is a direct proportion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A direct proportion means that as one quantity increases, the other increases at the same rate. The formula is a/b = c/d or y = kx where k is the constant of proportionality. If you double one quantity, the other doubles too."
      }
    },
    {
      "@type": "Question",
      "name": "What is an inverse proportion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An inverse proportion means that as one quantity increases, the other decreases so that their product stays constant. The formula is x₁y₁ = x₂y₂. Example: if 5 workers finish a job in 12 days, 4 workers take 15 days (5 × 12 = 4 × 15 = 60)."
      }
    },
    {
      "@type": "Question",
      "name": "How do I check if two ratios form a proportion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Two ratios a/b and c/d form a proportion if their cross products are equal: a × d = b × c. For example, 3/4 and 9/12: 3 × 12 = 36 and 4 × 9 = 36. Equal products confirm it's a proportion."
      }
    },
    {
      "@type": "Question",
      "name": "Can proportions have decimals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Proportions work with any real numbers including decimals and negative numbers. The cross multiplication method works the same way. This calculator accepts decimal inputs and returns precise decimal answers."
      }
    }
  ]
}

// ─── JSON-LD: HowTo ───────────────────────────────────────────────────────────
const schemaHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Solve a Proportion Using Cross Multiplication",
  "description": "Solve any proportion problem (a/b = c/d) by finding the missing fourth value using cross multiplication.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Set up the proportion",
      "text": "Write the proportion as a/b = c/d. Identify which three values you know and which one is unknown."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Cross multiply",
      "text": "Multiply the numerator of the first ratio by the denominator of the second, and vice versa: a × d = b × c."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Solve for the unknown",
      "text": "Divide both sides by the coefficient of the unknown variable. For example, if solving for x in 3 × x = 36, divide both sides by 3 to get x = 12."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Check your answer",
      "text": "Substitute the answer back into the original proportion and verify both sides are equal."
    }
  ]
}

// ─── Page Component ───────────────────────────────────────────────────────────
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHowTo) }}
      />
      <ProportionCalculator />
    </>
  )
}