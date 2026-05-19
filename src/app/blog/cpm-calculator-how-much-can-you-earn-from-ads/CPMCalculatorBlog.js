'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Eye,
  ChevronRight,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Copy,
  Calculator,
  TrendingUp,
  BarChart3,
  DollarSign,
  Target,
  Zap,
} from "lucide-react";

import { getPostBySlug } from "../../data/blogData";

// ─── TOC ──────────────────────────────────────────────────────────────────────
const TOC_ITEMS = [
  { id: "what-is-cpm", label: "What is CPM?" },
  { id: "how-cpm-calculator-works", label: "How Does a CPM Calculator Work?" },
  { id: "calculate-adsense-earnings", label: "Calculate Your AdSense Earnings (Step-by-Step)" },
  { id: "real-examples", label: "Real Examples: Blog vs YouTube vs Display Ads" },
  { id: "increase-cpm", label: "5 Ways to Increase Your CPM (Without More Traffic)" },
  { id: "cpm-vs-rpm", label: "CPM vs RPM: What's the Difference for AdSense?" },
  { id: "common-mistakes", label: "Mistakes That Lower Your CPM" },
  { id: "faq", label: "FAQs" },
];

// ─── FAQ Component ───────────────────────────────────────────────────────────
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <details open={open} onToggle={(e) => setOpen(e.target.open)} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <summary className="px-5 py-4 cursor-pointer font-semibold text-gray-900 text-sm flex items-center justify-between hover:bg-gray-50 transition list-none">
        {question}
        <ChevronDown size={18} className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ml-4 ${open ? "rotate-180" : ""}`} />
      </summary>
      <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{answer}</div>
    </details>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function CPMCalculatorBlog() {
  const blogData = getPostBySlug("cpm-calculator-how-much-can-you-earn-from-ads");
  const [activeTOC, setActiveTOC] = useState("");
  const [copiedFormula, setCopiedFormula] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headings = TOC_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
      let current = "";
      headings.forEach((h) => { if (window.scrollY >= h.offsetTop - 120) current = h.id; });
      setActiveTOC(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyFormula = () => {
    navigator.clipboard.writeText("Earnings = (Impressions ÷ 1,000) × CPM Rate");
    setCopiedFormula(true);
    setTimeout(() => setCopiedFormula(false), 2000);
  };

  const relatedPosts = [
    { id: 6, slug: "how-to-calculate-cpm", title: "How to Calculate CPM: Step-by-Step Formula & Examples", category: "Digital Marketing", color: "from-sky-500 to-blue-600", emoji: "📊", readTime: 8, date: "January 15, 2025" },
    { id: 7, slug: "how-to-increase-adsense-earnings", title: "How to Increase AdSense Earnings (RPM Secrets & Ad Placements That Work)", category: "Monetization", color: "from-emerald-500 to-teal-600", emoji: "💰", readTime: 9, date: "May 10, 2026" },
  ];

  if (!blogData) return <div className="p-10 text-center text-gray-500">Post not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Breadcrumb ── */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/blog" className="hover:text-emerald-600 transition-colors">Blog</Link>
          <ChevronRight size={12} />
          <span className="text-gray-600 truncate max-w-[150px] inline-block align-bottom">CPM Calculator Guide</span>
        </nav>
      </div>

      {/* ── Layout ── */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex gap-10">
        {/* ── TOC (desktop) ── */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-20">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">On this page</p>
            <div className="flex flex-col gap-0.5">
              {TOC_ITEMS.map((item) => (
                <a key={item.id} href={`#${item.id}`}
                  className={`text-sm py-1.5 px-3 rounded-r-lg transition-all border-l-2 ${activeTOC === item.id ? "border-l-emerald-600 text-emerald-600 bg-emerald-50 font-medium" : "border-l-transparent text-gray-500 hover:text-emerald-600 hover:bg-gray-50"}`}
                >{item.label}</a>
              ))}
            </div>
            <div className="mt-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white">
              <p className="text-sm font-bold mb-1">Try Our Free Tool</p>
              <p className="text-xs text-emerald-100 mb-3">Calculate your potential AdSense earnings in seconds — no signup.</p>
              <Link href="/tools/cpm-calculator" className="block text-center py-2 bg-white text-emerald-700 text-xs font-semibold rounded-lg hover:bg-emerald-50 transition-colors">Open CPM Calculator →</Link>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Related Tools</p>
              <Link href="/tools/adsense-revenue-calculator" className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors py-1"><BarChart3 size={14} /> AdSense Revenue</Link>
              <Link href="/tools/youtube-ad-revenue-calculator" className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors py-1"><TrendingUp size={14} /> YouTube Revenue</Link>
              <Link href="/tools/cpc-calculator" className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors py-1"><DollarSign size={14} /> CPC Calculator</Link>
            </div>
          </div>
        </aside>

        {/* ── Article ── */}
        <article className="flex-1 max-w-3xl">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">{blogData.category}</span>
              <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">#{blogData.tag}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">{blogData.title}</h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-5">{blogData.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 border-t border-gray-100 pt-4">
              <span className="flex items-center gap-1.5"><Clock size={14} /> {blogData.readTime} min read</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {blogData.date}</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> 15.2K views</span>
            </div>
          </header>

          {/* Hero */}
          <div className={`bg-gradient-to-br ${blogData.color} rounded-2xl h-56 sm:h-64 md:h-80 flex items-center justify-center mb-10`}>
            <span className="text-7xl sm:text-8xl md:text-9xl">{blogData.emoji}</span>
          </div>

          {/* ═══════════════ CONTENT ═══════════════ */}
          <div className="text-gray-600 leading-relaxed space-y-6">
            <p className="text-lg">
              Last month, a blogger friend showed me his AdSense dashboard. He had 50,000 pageviews last month… and earned $87. "Is that normal?" he asked. Honestly? It depends — but he had no way to know if his CPM was low, or if he was just in a tough niche. That's why I built a simple <strong>CPM calculator for Google AdSense</strong>. No fluff, no signup — just plug in your numbers and see what you <em>could</em> be earning.
            </p>
            <p>
              In this guide, I'll walk you through exactly how a CPM calculator works, show you real examples for blogs, YouTube, and display ads, and share 5 proven ways to increase your CPM — even if your traffic stays the same.
            </p>

            {/* Inline CTA */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-5 sm:p-6 my-8">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Calculator size={28} className="text-emerald-600" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-bold text-gray-900 mb-0.5">Want to calculate your earnings now?</p>
                  <p className="text-sm text-gray-500">Use our free CPM calculator for Google AdSense — instant results, no email required.</p>
                </div>
                <Link href="/tools/cpm-calculator" className="flex-shrink-0 px-6 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 whitespace-nowrap">
                  Calculate Now <Zap size={16} />
                </Link>
              </div>
            </div>

            {/* What is CPM */}
            <h2 id="what-is-cpm" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">What is CPM, Anyway?</h2>
            <p><strong>CPM = Cost Per Mille</strong> ("Mille" = thousand in Latin). In advertising, it's the amount an advertiser pays for <strong>1,000 impressions</strong> (views) of their ad.</p>
            <p>For publishers (that's you!), CPM is the <strong>revenue you earn per 1,000 ad views</strong>. If your CPM is $5, you make $5 every time your ads are shown 1,000 times.</p>
            <div className="bg-gray-900 text-green-400 rounded-2xl p-5 mb-5 font-mono text-center text-sm md:text-base font-bold relative">
              Earnings = (Impressions ÷ 1,000) × CPM Rate
              <button onClick={handleCopyFormula} className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors" title="Copy formula">
                {copiedFormula ? <CheckCircle2 size={16} className="text-green-400" /> : <Copy size={16} />}
              </button>
            </div>
            <p>Simple, right? But here's the catch: your actual AdSense earnings depend on more than just CPM. That's where a <strong>CPM calculator for Google AdSense</strong> comes in handy — it helps you estimate realistic revenue based on your niche, traffic source, and ad placements.</p>

            {/* How Calculator Works */}
            <h2 id="how-cpm-calculator-works" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">How Does a CPM Calculator Work? (It's Easier Than You Think)</h2>
            <p className="mb-4">Most CPM calculators ask for just two inputs:</p>
            <ol className="list-decimal list-inside text-gray-600 space-y-3 text-base mb-6">
              <li><strong>Your monthly impressions</strong> (how many times your ads were shown)</li>
              <li><strong>Your average CPM rate</strong> (what advertisers pay per 1,000 views in your niche)</li>
            </ol>
            <p className="mb-4">Then it does the math:</p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-6">
              <p className="font-mono text-sm mb-2">(50,000 impressions ÷ 1,000) × $3.50 CPM = $175/month</p>
              <p className="text-xs text-emerald-700">That's your estimated AdSense revenue before fees or taxes.</p>
            </div>
            <p>Our free <Link href="/tools/cpm-calculator" className="text-emerald-600 hover:underline">CPM calculator</Link> goes a step further: it also estimates your RPM (Revenue Per Mille), which is what you actually keep after Google's cut (~32%).</p>

            {/* Calculate AdSense Earnings */}
            <h2 id="calculate-adsense-earnings" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">Calculate Your AdSense Earnings: Step-by-Step</h2>
            <p className="mb-4">Not sure what numbers to plug in? Here's how to find them:</p>
            <div className="space-y-4 my-6">
              {[
                { step: "1", title: "Find Your Impressions", desc: "In Google AdSense, go to Reports → select 'Impressions' for your desired date range. For blogs, this is usually pageviews × ads per page." },
                { step: "2", title: "Estimate Your CPM", desc: "Check your AdSense dashboard for 'Page CPM'. No account yet? Use niche benchmarks: finance ($10-30), tech ($5-15), lifestyle ($2-8), entertainment ($1-4)." },
                { step: "3", title: "Plug Into the Calculator", desc: "Enter your numbers in our free CPM calculator for Google AdSense. It'll show daily, monthly, and yearly estimates — plus your estimated RPM." },
                { step: "4", title: "Adjust for Reality", desc: "Not all impressions are monetized. Multiply your result by 0.7-0.9 to account for ad blockers, non-monetized pages, and policy restrictions." },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-9 h-9 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-bold">{item.step}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-1">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Real Examples */}
            <h2 id="real-examples" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">Real Examples: Blog vs YouTube vs Display Ads</h2>
            <p className="mb-4">CPM varies wildly by platform. Here's what $10,000 monthly impressions could earn:</p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm text-left border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
                  <tr><th className="px-4 py-3 font-bold">Platform</th><th className="px-4 py-3 font-bold">Avg. CPM</th><th className="px-4 py-3 font-bold">Est. Monthly Earnings</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="text-gray-600"><td className="px-4 py-3 font-medium">Personal Finance Blog</td><td className="px-4 py-3">$12-25</td><td className="px-4 py-3">$120-250</td></tr>
                  <tr className="text-gray-600"><td className="px-4 py-3 font-medium">Tech Review Blog</td><td className="px-4 py-3">$6-14</td><td className="px-4 py-3">$60-140</td></tr>
                  <tr className="text-gray-600"><td className="px-4 py-3 font-medium">YouTube (Long-form)</td><td className="px-4 py-3">$3-8</td><td className="px-4 py-3">$30-80</td></tr>
                  <tr className="text-gray-600"><td className="px-4 py-3 font-medium">Display Ads (General)</td><td className="px-4 py-3">$1-4</td><td className="px-4 py-3">$10-40</td></tr>
                  <tr className="bg-emerald-50 font-bold text-emerald-700"><td className="px-4 py-3">Your Niche?</td><td className="px-4 py-3">Use our calculator</td><td className="px-4 py-3">Get your estimate →</td></tr>
                </tbody>
              </table>
            </div>
            <p>See the difference? A finance blog with the same traffic as an entertainment blog can earn 5-10x more. That's why knowing your <strong>niche-specific CPM</strong> matters — and why our CPM calculator for Google AdSense lets you adjust the rate to match your audience.</p>

            {/* Increase CPM */}
            <h2 id="increase-cpm" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">5 Ways to Increase Your CPM (Without More Traffic)</h2>
            <p className="mb-4">You don't always need more visitors to earn more. Try these proven tactics:</p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              {[
                { title: "Target High-Value Keywords", desc: "Write about topics advertisers pay more for: insurance, loans, software, legal advice. Use our keyword research tips to find low-competition, high-CPM phrases." },
                { title: "Optimize Ad Placements", desc: "Place ads above the fold, in-content, and near CTAs. Avoid cluttering — too many ads lower viewability and CPM." },
                { title: "Improve Page Speed", desc: "Slow pages = lower viewability = lower CPM. Compress images, lazy-load, and use a CDN. Our image compressor tool can help." },
                { title: "Focus on Tier-1 Traffic", desc: "Visitors from US, UK, Canada, Australia generate 3-5x higher CPMs. Create content that attracts these audiences." },
                { title: "Use Responsive Ad Units", desc: "Auto-sized ads perform better across devices. In AdSense, enable 'Auto ads' or use responsive manual units." },
              ].map((item, i) => (
                <div key={i} className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                  <p className="font-semibold text-gray-900 text-sm mb-2">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CPM vs RPM */}
            <h2 id="cpm-vs-rpm" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">CPM vs RPM: What's the Difference for AdSense Publishers?</h2>
            <p className="mb-4">This trips up a lot of new publishers. Here's the simple breakdown:</p>
            <div className="bg-white border border-gray-200 rounded-xl p-5 my-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <p className="font-bold text-blue-800 text-sm mb-2">CPM (Cost Per Mille)</p>
                  <p className="text-sm text-gray-600">What <strong>advertisers pay</strong> per 1,000 ad impressions. This is the "list price" before Google's cut.</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                  <p className="font-bold text-emerald-800 text-sm mb-2">RPM (Revenue Per Mille)</p>
                  <p className="text-sm text-gray-600">What <strong>you actually earn</strong> per 1,000 pageviews. This is CPM minus Google's ~32% share + other adjustments.</p>
                </div>
              </div>
            </div>
            <p><strong>Rule of thumb:</strong> Your RPM is typically 60-80% of your CPM. Our CPM calculator for Google AdSense automatically estimates your RPM so you know what to expect in your bank account.</p>

            {/* Common Mistakes */}
            <h2 id="common-mistakes" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">3 Mistakes That Lower Your CPM (And How to Fix Them)</h2>
            <div className="space-y-3 my-6">
              {[
                { title: "Ignoring Ad Viewability", desc: "If your ads load below the fold or on pages users bounce from, they're not seen — and advertisers pay less. Fix: Place at least one ad above the fold, and improve content engagement to keep users scrolling." },
                { title: "Using Too Many Ad Networks", desc: "Running AdSense + Mediavine + Ezoic at once can cause ad conflicts, slow pages, and lower CPMs. Fix: Start with one network, master it, then test others one at a time." },
                { title: "Not Updating Old Content", desc: "Outdated posts attract low-value traffic. Advertisers pay less for audiences that don't convert. Fix: Refresh top-performing posts yearly with current info, new keywords, and updated ad placements." },
              ].map((item, i) => (
                <div key={i} className="bg-red-50 border border-red-100 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle size={16} className="text-red-500" />
                    <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                  </div>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* TL;DR */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 text-white my-8">
              <h2 className="text-xl font-bold mb-4">TL;DR</h2>
              <div className="bg-white/10 rounded-xl p-4 mb-4 text-center">
                <p className="text-base sm:text-lg font-semibold font-mono">Earnings = (Impressions ÷ 1,000) × CPM Rate</p>
              </div>
              <ul className="space-y-2 text-sm text-gray-300 list-disc pl-5 mb-6">
                <li>CPM = what advertisers pay per 1,000 ad views; RPM = what you keep after Google's cut</li>
                <li>Finance, tech, and legal niches have the highest CPMs ($10-30+); entertainment and general content are lower ($1-8)</li>
                <li>Use our free <strong className="text-white">CPM calculator for Google AdSense</strong> to estimate your earnings with your actual numbers</li>
                <li>Increase CPM by targeting high-value keywords, optimizing ad placements, and focusing on Tier-1 traffic</li>
                <li>Always track RPM, not just CPM — that's what actually hits your bank account</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/tools/cpm-calculator" className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors">Open CPM Calculator →</Link>
                <Link href="/tools/adsense-revenue-calculator" className="inline-flex items-center justify-center px-5 py-2.5 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20">AdSense Revenue Tool →</Link>
              </div>
            </div>

            {/* FAQ */}
            <h2 id="faq" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20">Questions People Actually Ask</h2>
            <div className="space-y-4 my-6">
              <FAQItem question="What is a good CPM for Google AdSense?" answer="It depends on your niche and traffic source. For blogs: finance ($10-30), tech ($6-15), lifestyle ($3-8), entertainment ($1-4). For YouTube: $3-8 for long-form content. Use our CPM calculator for Google AdSense to estimate based on your actual numbers." />
              <FAQItem question="How accurate is a CPM calculator?" answer="Very — if you use real data from your AdSense dashboard. Estimates based on niche averages are directional, not exact. Our calculator lets you input your actual CPM for precise results." />
              <FAQItem question="Why is my AdSense CPM so low?" answer="Common reasons: traffic from low-CPM countries, low ad viewability, poor ad placements, or a niche with low advertiser demand. Try targeting Tier-1 countries, improving page speed, and placing ads above the fold." />
              <FAQItem question="Does CPM include Google's cut?" answer="No. CPM is what advertisers pay. Your actual earnings (RPM) are typically 60-80% of CPM after Google's ~32% share and other adjustments. Our calculator estimates both." />
              <FAQItem question="Can I use this calculator for YouTube AdSense?" answer="Yes! YouTube uses CPM too. Just enter your video views as 'impressions' and your YouTube CPM rate. Note: YouTube CPMs are usually lower than blog CPMs due to different ad formats." />
              <FAQItem question="How often should I recalculate my CPM?" answer="Check monthly. CPM fluctuates with seasonality (Q4 is highest), advertiser demand, and your content mix. Recalculating helps you spot trends and adjust your strategy." />
            </div>
          </div>
          {/* ═══════════════ CONTENT END ═══════════════ */}

          {/* ── Related Posts ── */}
          <div className="mt-16 border-t border-gray-200 pt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Continue Reading</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/blog/${rp.slug}`} className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className={`flex items-center justify-center bg-gradient-to-br ${rp.color} h-32`}><span className="text-5xl">{rp.emoji}</span></div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{rp.category}</span>
                    <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mt-2 mb-1">{rp.title}</h3>
                    <p className="text-xs text-gray-400">{rp.readTime} min read · {rp.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-600 transition-colors">
              <ArrowLeft size={14} /> Back to all articles
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}