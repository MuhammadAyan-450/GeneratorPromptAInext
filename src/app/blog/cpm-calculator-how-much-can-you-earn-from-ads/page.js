import CPMCalculatorBlog from './CPMCalculatorBlog';
import { getPostBySlug } from '../../data/blogData';

const blogData = getPostBySlug("cpm-calculator-how-much-can-you-earn-from-ads");

export const metadata = {
  title: blogData?.title || 'CPM Calculator: How Much Can You Earn from Ads?',
  description: blogData?.excerpt || 'Use our free CPM calculator for Google AdSense to estimate your ad revenue accurately.',
  keywords: 'cpm calculator for google adsense, calculate adsense revenue, free cpm estimator for bloggers, how to calculate cpm for youtube, cpm vs rpm adsense calculator, estimate monthly ad earnings, google adsense revenue calculator cpm based, cpm calculator for website monetization',
  alternates: {
    canonical: `https://www.generatorpromptai.com/blog/${blogData?.slug || 'cpm-calculator-how-much-can-you-earn-from-ads'}`,
  },
  openGraph: {
    title: blogData?.title || 'CPM Calculator: How Much Can You Earn from Ads?',
    description: blogData?.excerpt || 'Use our free CPM calculator for Google AdSense to estimate your ad revenue accurately.',
    url: `https://www.generatorpromptai.com/blog/${blogData?.slug || 'cpm-calculator-how-much-can-you-earn-from-ads'}`,
    siteName: 'GeneratorPromptAI',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: blogData?.title || 'CPM Calculator: How Much Can You Earn from Ads?',
    description: blogData?.excerpt || 'Use our free CPM calculator for Google AdSense to estimate your ad revenue accurately.',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
  },
};

const schemaArticle = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": blogData?.title || 'CPM Calculator: How Much Can You Earn from Ads?',
  "description": blogData?.excerpt || 'Use our free CPM calculator for Google AdSense to estimate your ad revenue accurately.',
  "datePublished": blogData?.dateISO || '2026-05-17',
  "dateModified": blogData?.dateISO || '2026-05-17',
  "author": { "@type": "Organization", "name": "GeneratorPromptAI" },
  "publisher": {
    "@type": "Organization",
    "name": "GeneratorPromptAI",
    "logo": { "@type": "ImageObject", "url": "https://www.generatorpromptai.com/logo.png" }
  },
  "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.generatorpromptai.com/blog/${blogData?.slug || 'cpm-calculator-how-much-can-you-earn-from-ads'}` }
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.generatorpromptai.com/blog" },
    { "@type": "ListItem", "position": 3, "name": blogData?.title || 'CPM Calculator Guide', "item": `https://www.generatorpromptai.com/blog/${blogData?.slug || 'cpm-calculator-how-much-can-you-earn-from-ads'}` }
  ]
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is a good CPM for Google AdSense?", "acceptedAnswer": { "@type": "Answer", "text": "It depends on your niche and traffic source. For blogs: finance ($10-30), tech ($6-15), lifestyle ($3-8), entertainment ($1-4). For YouTube: $3-8 for long-form content. Use our CPM calculator for Google AdSense to estimate based on your actual numbers." } },
    { "@type": "Question", "name": "How accurate is a CPM calculator?", "acceptedAnswer": { "@type": "Answer", "text": "Very — if you use real data from your AdSense dashboard. Estimates based on niche averages are directional, not exact. Our calculator lets you input your actual CPM for precise results." } },
    { "@type": "Question", "name": "Why is my AdSense CPM so low?", "acceptedAnswer": { "@type": "Answer", "text": "Common reasons: traffic from low-CPM countries, low ad viewability, poor ad placements, or a niche with low advertiser demand. Try targeting Tier-1 countries, improving page speed, and placing ads above the fold." } },
    { "@type": "Question", "name": "Does CPM include Google's cut?", "acceptedAnswer": { "@type": "Answer", "text": "No. CPM is what advertisers pay. Your actual earnings (RPM) are typically 60-80% of CPM after Google's ~32% share and other adjustments. Our calculator estimates both." } },
    { "@type": "Question", "name": "Can I use this calculator for YouTube AdSense?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! YouTube uses CPM too. Just enter your video views as 'impressions' and your YouTube CPM rate. Note: YouTube CPMs are usually lower than blog CPMs due to different ad formats." } },
    { "@type": "Question", "name": "How often should I recalculate my CPM?", "acceptedAnswer": { "@type": "Answer", "text": "Check monthly. CPM fluctuates with seasonality (Q4 is highest), advertiser demand, and your content mix. Recalculating helps you spot trends and adjust your strategy." } }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      <CPMCalculatorBlog />
    </>
  );
}