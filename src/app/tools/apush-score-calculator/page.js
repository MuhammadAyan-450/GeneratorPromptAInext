import APUSHScoreCalculator from './APUSHScoreCalculator'

export const metadata = {
  title: 'APUSH Score Calculator – Predict Your AP History Exam Score (1-5)',
  description: 'Free APUSH score calculator. Enter MCQ, SAQ, DBQ & LEQ scores to get instant composite score, AP grade prediction (1-5), and personalized study tips. Based on 2024-2026 exam structure.',
  keywords: 'apush score calculator, ap us history score calculator, estimate apush score, apush composite score calculator, apush mcq saq dbq leq calculator, ap history exam score predictor, apush practice test score converter, apush score converter 1-5, calculate apush exam score online free',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/apush-score-calculator',
  },
  openGraph: {
    title: 'APUSH Score Calculator – Predict Your AP History Exam Score (1-5)',
    description: 'Free APUSH score calculator. Enter MCQ, SAQ, DBQ & LEQ scores to get instant composite score & AP grade prediction. Based on official exam weights.',
    url: 'https://www.generatorpromptai.com/tools/apush-score-calculator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APUSH Score Calculator – Predict Your AP History Exam Score (1-5)',
    description: 'Free APUSH score calculator. Enter MCQ, SAQ, DBQ & LEQ scores to get instant composite score & AP grade prediction.',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "APUSH Score Calculator – AP U.S. History Exam Score Estimator",
  "url": "https://www.generatorpromptai.com/tools/apush-score-calculator",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "description": "Free online calculator to estimate AP U.S. History (APUSH) exam scores. Input Multiple Choice, Short Answer, DBQ, and LEQ raw scores to get composite score (0-115) and predicted AP score (1-5). Includes section breakdown, study tips, and historical cutoff references.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" },
  "featureList": "MCQ/SAQ/DBQ/LEQ input, weighted composite calculation, AP score prediction (1-5), section-by-section breakdown, personalized study tips, mobile responsive, no signup required"
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "APUSH Score Calculator", "item": "https://www.generatorpromptai.com/tools/apush-score-calculator" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How accurate is this APUSH score calculator?", "acceptedAnswer": { "@type": "Answer", "text": "This tool uses official College Board section weights and historical composite-to-AP score mappings. However, actual exam cutoffs vary yearly. Use this as an estimate, not a guarantee." } },
    { "@type": "Question", "name": "What is a good APUSH score?", "acceptedAnswer": { "@type": "Answer", "text": "A score of 3+ is considered 'passing' and may earn college credit. A 4 or 5 is competitive for selective colleges. Aim for 69+ composite for a 4, or 86+ for a 5." } },
    { "@type": "Question", "name": "How do I find my raw scores?", "acceptedAnswer": { "@type": "Answer", "text": "After a practice exam: MCQ = number correct (no penalty for wrong). SAQ = points earned per rubric (0-3 each). DBQ/LEQ = score using official rubrics (DBQ 0-7, LEQ 0-6)." } },
    { "@type": "Question", "name": "Does this calculator work for other AP exams?", "acceptedAnswer": { "@type": "Answer", "text": "This tool is specific to AP U.S. History. Other AP exams have different structures and scoring. We're adding more AP calculators soon!" } }
  ]
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      <APUSHScoreCalculator />
    </>
  )
}