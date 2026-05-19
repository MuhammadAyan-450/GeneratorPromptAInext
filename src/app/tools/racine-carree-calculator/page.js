import RacineCarreeCalculator from './RacineCarreeCalculator'

export const metadata = {
  title: 'Racine Carree Calculator – Free Square Root Calculator Online (Real & Imaginary)',
  description: 'Calculate racine carrée (square root) instantly — real numbers, imaginary roots, simplified form & polar form. Free online tool, no signup, 5-decimal precision.',
  keywords: 'racine carree calculator, racine carrée calculator, square root calculator online, calculate square root free, √ calculator, imaginary square root calculator, simplified radical form calculator, polar form square root, racine carrée en ligne, calculatrice racine carrée gratuite',
  alternates: {
    canonical: 'https://www.generatorpromptai.com/tools/racine-carree-calculator',
  },
  openGraph: {
    title: 'Racine Carree Calculator – Free Square Root Calculator Online',
    description: 'Calculate racine carrée (square root) instantly — real numbers, imaginary roots, simplified form & polar form. Free, no signup.',
    url: 'https://www.generatorpromptai.com/tools/racine-carree-calculator',
    siteName: 'GeneratorPromptAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Racine Carree Calculator – Free Square Root Calculator Online',
    description: 'Calculate racine carrée (square root) instantly — real numbers, imaginary roots, simplified form & polar form. Free, no signup.',
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
  "name": "Racine Carree Calculator – Square Root Calculator",
  "url": "https://www.generatorpromptai.com/tools/racine-carree-calculator",
  "applicationCategory": "MathApplication",
  "operatingSystem": "All",
  "description": "Free online square root calculator (racine carrée). Calculate real and imaginary square roots with simplified radical form, polar form, and step-by-step explanations. Supports positive numbers, negative numbers (complex results), decimals, and fractions.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "GeneratorPromptAI" },
  "featureList": "Real & imaginary square roots, simplified radical form, polar form, step-by-step calculations, 5-decimal precision, mobile responsive, no signup required"
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "All Free Tools", "item": "https://www.generatorpromptai.com/pages/all-tools" },
    { "@type": "ListItem", "position": 3, "name": "Racine Carree Calculator", "item": "https://www.generatorpromptai.com/tools/racine-carree-calculator" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I use the Racine Carree Calculator?", "acceptedAnswer": { "@type": "Answer", "text": "Simply enter any number (positive, negative, or decimal) into the input field and click 'Calculate' or press Enter. The tool instantly shows the square root, simplified form, polar form, and step-by-step explanation." } },
    { "@type": "Question", "name": "Can I calculate square roots of decimals or large numbers?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Enter any decimal (e.g., 2.5, 0.01) or large number (e.g., 1000000) and get precise results up to 5 decimal places." } },
    { "@type": "Question", "name": "Can the calculator handle negative numbers?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! For negative inputs, the result is an imaginary number: √(-a) = √a × i. For example, √(-81) = 9i. The tool shows both the value and the mathematical steps." } },
    { "@type": "Question", "name": "What does 'racine carrée' mean?", "acceptedAnswer": { "@type": "Answer", "text": "'Racine carrée' is French for 'square root'. While our interface is in English, we include this term to help users searching with French keywords find this free tool." } },
    { "@type": "Question", "name": "How accurate is the calculator?", "acceptedAnswer": { "@type": "Answer", "text": "Results are precise to 5 decimal places using JavaScript's native Math.sqrt() for real numbers and standard complex number formulas for imaginary roots." } }
  ]
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      <RacineCarreeCalculator />
    </>
  )
}