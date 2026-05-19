import CPMvsCPCExplained from './CPMvsCPCExplained';
import { getPostBySlug } from '../../data/blogData';

const blogData = getPostBySlug("cpm-vs-cpc-explained");

export const metadata = {
  title: blogData?.title || 'CPM vs CPC Explained',
  description: blogData?.excerpt || 'Learn the difference between CPM and CPC advertising models.',
  keywords: 'cpm vs cpc which is better for small business, cpm vs cpc calculator difference explained, when to use cpm vs cpc in facebook ads, cpm vs cpc for youtube ads 2026, cost per mille vs cost per click comparison, how to choose between cpm and cpc advertising, cpm vs cpc break even formula, ad pricing model comparison guide',
  alternates: {
    canonical: `https://www.generatorpromptai.com/blog/${blogData?.slug || 'cpm-vs-cpc-explained'}`,
  },
  openGraph: {
    title: blogData?.title || 'CPM vs CPC Explained',
    description: blogData?.excerpt || 'Learn the difference between CPM and CPC advertising models.',
    url: `https://www.generatorpromptai.com/blog/${blogData?.slug || 'cpm-vs-cpc-explained'}`,
    siteName: 'GeneratorPromptAI',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: blogData?.title || 'CPM vs CPC Explained',
    description: blogData?.excerpt || 'Learn the difference between CPM and CPC advertising models.',
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
  "headline": blogData?.title || 'CPM vs CPC Explained',
  "description": blogData?.excerpt || 'Learn the difference between CPM and CPC advertising models.',
  "datePublished": blogData?.dateISO || '2026-05-16',
  "dateModified": blogData?.dateISO || '2026-05-16',
  "author": { "@type": "Organization", "name": "GeneratorPromptAI" },
  "publisher": {
    "@type": "Organization",
    "name": "GeneratorPromptAI",
    "logo": { "@type": "ImageObject", "url": "https://www.generatorpromptai.com/logo.png" }
  },
  "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.generatorpromptai.com/blog/${blogData?.slug || 'cpm-vs-cpc-explained'}` }
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.generatorpromptai.com/blog" },
    { "@type": "ListItem", "position": 3, "name": blogData?.title || 'CPM vs CPC Explained', "item": `https://www.generatorpromptai.com/blog/${blogData?.slug || 'cpm-vs-cpc-explained'}` }
  ]
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Is CPM or CPC better for small businesses?", "acceptedAnswer": { "@type": "Answer", "text": "For most small businesses with limited budgets, CPC is safer because you only pay for engaged users. However, if your goal is local brand awareness (like a new cafe), CPM on Facebook/Instagram can be very cost-effective for reaching nearby people." } },
    { "@type": "Question", "name": "Can I switch between CPM and CPC in the same campaign?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Many advertisers start with CPC to test audiences and creatives, then switch to CPM for scaling once they know what works. Just don't change pricing models mid-test — it skews your data." } },
    { "@type": "Question", "name": "Why is my CPM so high on Facebook?", "acceptedAnswer": { "@type": "Answer", "text": "High CPM usually means: narrow targeting (less inventory = higher prices), low ad relevance score, seasonal competition (Q4 is expensive), or poor creative fatigue. Broaden your audience, improve your ad quality, or rotate creatives to lower CPM." } },
    { "@type": "Question", "name": "Does Google Ads use CPM or CPC?", "acceptedAnswer": { "@type": "Answer", "text": "Google Search Ads primarily use CPC. Google Display Network offers both CPM and CPC. YouTube uses CPV (cost per view) for skippable ads and CPM for bumper ads. Always check the campaign type before assuming." } },
    { "@type": "Question", "name": "How do I know if my CPM or CPC is 'good'?", "acceptedAnswer": { "@type": "Answer", "text": "Compare to industry benchmarks: Facebook CPM averages $5-12, Google Search CPC averages $1-3 for most niches. But 'good' depends on your CPA — a $20 CPC is great if each conversion is worth $200. Always measure ROI, not just CPM/CPC." } },
    { "@type": "Question", "name": "Should I use CPM or CPC for YouTube ads?", "acceptedAnswer": { "@type": "Answer", "text": "Use CPM for short bumper ads (brand awareness). Use CPV (cost per view, similar to CPC) for TrueView skippable ads when you want viewers to watch and take action. YouTube's algorithm often optimizes better with CPV for performance campaigns." } }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      <CPMvsCPCExplained />
    </>
  );
}