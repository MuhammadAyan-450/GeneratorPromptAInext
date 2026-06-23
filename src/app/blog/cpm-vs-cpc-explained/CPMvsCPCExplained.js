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
  Target,
  MousePointerClick,
  BarChart3,
  TrendingUp,
} from "lucide-react";

import { getPostBySlug } from "../../data/blogData";

// ─── TOC ──────────────────────────────────────────────────────────────────────
const TOC_ITEMS = [
  { id: "quick-answer", label: "Quick Answer: CPM vs CPC" },
  { id: "what-is-cpm", label: "What is CPM?" },
  { id: "what-is-cpc", label: "What is CPC?" },
  { id: "key-differences", label: "Key Differences (Side-by-Side)" },
  { id: "when-to-use-cpm", label: "When Should You Use CPM?" },
  { id: "when-to-use-cpc", label: "When Should You Use CPC?" },
  { id: "decision-framework", label: "How to Choose: Simple Framework" },
  { id: "real-example", label: "Real Campaign Comparison" },
  { id: "calculate-cheaper", label: "Which is Actually Cheaper for You?" },
  { id: "common-mistakes", label: "Mistakes That Cost You Money" },
  { id: "platform-tips", label: "Platform-Specific Tips" },
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
export default function CPMvsCPCExplained() {
  const blogData = getPostBySlug("cpm-vs-cpc-explained");
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
    navigator.clipboard.writeText("Break-even CPC = CPM ÷ (CTR × 10)");
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
          <span className="text-gray-600 truncate max-w-[150px] inline-block align-bottom">CPM vs CPC Guide</span>
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
              <p className="text-sm font-bold mb-1">Need Help Deciding?</p>
              <p className="text-xs text-emerald-100 mb-3">Use our free calculators to compare CPM vs CPC for your campaign.</p>
              <div className="space-y-2">
                <Link href="/tools/cpm-calculator" className="block text-center py-2 bg-white text-emerald-700 text-xs font-semibold rounded-lg hover:bg-emerald-50 transition-colors">CPM Calculator →</Link>
                <Link href="/tools/cpc-calculator" className="block text-center py-2 bg-white/20 text-white text-xs font-medium rounded-lg hover:bg-white/30 transition-colors border border-white/30">CPC Calculator →</Link>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Related Tools</p>
              <Link href="/tools/adsense-revenue-calculator" className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors py-1"><BarChart3 size={14} /> AdSense Revenue</Link>
              <Link href="/tools/youtube-ad-revenue-calculator" className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors py-1"><TrendingUp size={14} /> YouTube Revenue</Link>
              <Link href="/tools/percentage-calculator" className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors py-1"><Target size={14} /> Percentage Calc</Link>
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
              <span className="flex items-center gap-1.5"><Eye size={14} /> 8.4K views</span>
            </div>
          </header>

          {/* Hero */}
          <div className={`bg-gradient-to-br ${blogData.color} rounded-2xl h-56 sm:h-64 md:h-80 flex items-center justify-center mb-10`}>
            <span className="text-7xl sm:text-8xl md:text-9xl">{blogData.emoji}</span>
          </div>

          {/* ═══════════════ CONTENT ═══════════════ */}
          <div className="text-gray-600 leading-relaxed space-y-6">
            <p className="text-lg">
              Last week, a friend who runs a small e-commerce store called me in a panic. She'd spent $300 on Facebook ads using CPM pricing, got tons of views, but zero sales. "Did I waste my money?" she asked. The truth? Not necessarily — but she picked the wrong pricing model for her goal. That's the problem with CPM vs CPC: everyone talks about the formulas, but nobody explains <em>when</em> to actually use each one.
            </p>
            <p>
              This guide cuts through the noise. No jargon, no fluff. Just a clear, practical breakdown of CPM vs CPC — with real examples, a simple decision framework, and the exact questions to ask before you spend another dollar on ads.
            </p>

            {/* Inline CTA */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-5 sm:p-6 my-8">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Calculator size={28} className="text-emerald-600" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-bold text-gray-900 mb-0.5">Not sure which model fits your campaign?</p>
                  <p className="text-sm text-gray-500">Use our free calculators to compare costs and break-even points instantly.</p>
                </div>
                <div className="flex-shrink-0 flex gap-2">
                  <Link href="/tools/cpm-calculator" className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors">CPM Calc</Link>
                  <Link href="/tools/cpc-calculator" className="px-4 py-2 bg-white text-emerald-700 text-xs font-semibold rounded-lg hover:bg-emerald-50 transition-colors border border-emerald-200">CPC Calc</Link>
                </div>
              </div>
            </div>

            {/* Quick Answer */}
            <h2 id="quick-answer" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">Quick Answer: CPM vs CPC in 30 Seconds</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-5 my-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                  <p className="font-bold text-emerald-800 text-sm mb-2">✅ Use CPM when:</p>
                  <ul className="text-sm text-gray-600 space-y-1.5 list-disc pl-4">
                    <li>Your goal is <strong>brand awareness</strong></li>
                    <li>You're running <strong>video or display ads</strong></li>
                    <li>You want <strong>maximum reach</strong> on a budget</li>
                    <li>You're <strong>retargeting</strong> warm audiences</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <p className="font-bold text-blue-800 text-sm mb-2">✅ Use CPC when:</p>
                  <ul className="text-sm text-gray-600 space-y-1.5 list-disc pl-4">
                    <li>Your goal is <strong>clicks or conversions</strong></li>
                    <li>You're running <strong>search or shopping ads</strong></li>
                    <li>You have a <strong>limited budget</strong> and need ROI</li>
                    <li>You're <strong>testing new audiences</strong></li>
                  </ul>
                </div>
              </div>
            </div>
            <p>Still not sure? Keep reading — we'll walk through exactly how to decide, with numbers you can actually use.</p>

            {/* What is CPM */}
            <h2 id="what-is-cpm" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">What is CPM, Really?</h2>
            <p><strong>CPM = Cost Per Mille</strong> ("Mille" = thousand in Latin). You pay for every <strong>1,000 times your ad is shown</strong> — whether anyone clicks or not.</p>
            <div className="bg-gray-900 text-green-400 rounded-2xl p-5 mb-5 font-mono text-center text-sm md:text-base font-bold">CPM = (Total Cost ÷ Impressions) × 1,000</div>
            <p className="mb-4">Think of CPM like renting a billboard: you pay for the space and the eyeballs that pass by. You don't control who stops to look — you just pay for the exposure.</p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-emerald-800"><strong>Pro tip:</strong> CPM works best when your creative is strong enough to grab attention <em>without</em> needing a click. If your ad is boring, you'll pay for views that go nowhere.</p>
            </div>

            {/* What is CPC */}
            <h2 id="what-is-cpc" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">What is CPC, Really?</h2>
            <p><strong>CPC = Cost Per Click</strong>. You only pay when someone actually <strong>clicks your ad</strong>. Impressions are free — you're paying for action.</p>
            <div className="bg-gray-900 text-green-400 rounded-2xl p-5 mb-5 font-mono text-center text-sm md:text-base font-bold">CPC = Total Cost ÷ Total Clicks</div>
            <p className="mb-4">CPC is like paying for foot traffic into your store: you only spend money when someone shows real interest by walking through the door.</p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800"><strong>Watch out:</strong> Cheap CPC doesn't always mean cheap conversions. If your landing page is weak, you'll pay for clicks that bounce. Always track CPA (cost per acquisition) alongside CPC.</p>
            </div>

            {/* Key Differences */}
            <h2 id="key-differences" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">CPM vs CPC: Side-by-Side Comparison</h2>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm text-left border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
                  <tr><th className="px-4 py-3 font-bold">Factor</th><th className="px-4 py-3 font-bold">CPM</th><th className="px-4 py-3 font-bold">CPC</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="text-gray-600"><td className="px-4 py-3 font-medium">You pay for</td><td className="px-4 py-3">Impressions (views)</td><td className="px-4 py-3">Clicks</td></tr>
                  <tr className="text-gray-600"><td className="px-4 py-3 font-medium">Best for</td><td className="px-4 py-3">Brand awareness, video ads</td><td className="px-4 py-3">Conversions, lead gen</td></tr>
                  <tr className="text-gray-600"><td className="px-4 py-3 font-medium">Risk</td><td className="px-4 py-3">Pay for unengaged views</td><td className="px-4 py-3">Pay for low-quality clicks</td></tr>
                  <tr className="text-gray-600"><td className="px-4 py-3 font-medium">Control</td><td className="px-4 py-3">Less control over who sees it</td><td className="px-4 py-3">More control via targeting</td></tr>
                  <tr className="bg-emerald-50 font-bold text-emerald-700"><td className="px-4 py-3">Start with this if...</td><td className="px-4 py-3">You're building brand recognition</td><td className="px-4 py-3">You need immediate actions</td></tr>
                </tbody>
              </table>
            </div>

            {/* When to Use CPM */}
            <h2 id="when-to-use-cpm" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">When Should You Actually Use CPM?</h2>
            <p className="mb-4">CPM isn't "worse" than CPC — it's just built for different goals. Here's when it shines:</p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              {[
                { title: "Launching a new brand", desc: "You need eyeballs, not clicks. CPM gets your name in front of thousands fast." },
                { title: "Running video ads", desc: "Platforms like YouTube and Facebook reward video completion with lower CPMs. Perfect for storytelling." },
                { title: "Retargeting warm audiences", desc: "People who already know you are more likely to engage. CPM lets you stay top-of-mind cheaply." },
                { title: "Testing ad creatives", desc: "Want to see which image or headline gets more attention? CPM gives you reach to gather data fast." },
              ].map((item, i) => (
                <div key={i} className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                  <p className="font-semibold text-gray-900 text-sm mb-2">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* When to Use CPC */}
            <h2 id="when-to-use-cpc" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">When Should You Actually Use CPC?</h2>
            <p className="mb-4">CPC is your go-to when every dollar needs to drive action:</p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              {[
                { title: "Running a sale or promo", desc: "You need clicks to a landing page <em>now</em>. CPC ensures you only pay for interested visitors." },
                { title: "Limited ad budget", desc: "If you can only spend $100, CPC protects you from paying for views that don't convert." },
                { title: "Testing new audiences", desc: "Not sure if this demographic will convert? CPC lets you test cheaply before scaling." },
                { title: "E-commerce or lead gen", desc: "When your goal is a purchase or signup, CPC aligns cost with actual business outcomes." },
              ].map((item, i) => (
                <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <p className="font-semibold text-gray-900 text-sm mb-2">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Decision Framework */}
            <h2 id="decision-framework" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">How to Choose: A Simple 3-Question Framework</h2>
            <p className="mb-4">Stuck? Ask yourself these three questions before picking a pricing model:</p>
            <div className="space-y-4 my-6">
              {[
                { q: "1. What's my primary goal?", a: "If it's awareness → CPM. If it's action (click, signup, buy) → CPC. Be honest — don't pick CPM just because it looks cheaper." },
                { q: "2. Do I have a strong creative?", a: "CPM rewards eye-catching visuals and video. If your ad is text-heavy or boring, CPC is safer — you only pay when someone cares enough to click." },
                { q: "3. What's my break-even point?", a: "Use this formula: <code className='font-mono bg-gray-100 px-1 rounded'>Break-even CPC = CPM ÷ (CTR × 10)</code>. If your actual CPC is lower than this, CPC is cheaper. If higher, CPM might win." },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
                  <p className="font-bold text-gray-900 text-sm mb-2">{item.q}</p>
                  <p className="text-sm text-gray-600">{item.a}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-900 text-green-400 rounded-2xl p-5 mb-5 font-mono text-center text-sm relative">
              Break-even CPC = CPM ÷ (CTR × 10)
              <button onClick={handleCopyFormula} className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors" title="Copy formula">
                {copiedFormula ? <CheckCircle2 size={16} className="text-green-400" /> : <Copy size={16} />}
              </button>
            </div>

            {/* Real Example */}
            <h2 id="real-example" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">Real Campaign Comparison: Same Budget, Different Models</h2>
            <p className="mb-4">Let's say you have $200 to spend on Facebook ads for a new eco-friendly water bottle.</p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm text-left border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
                  <tr><th className="px-4 py-3 font-bold">Metric</th><th className="px-4 py-3 font-bold">CPM Campaign</th><th className="px-4 py-3 font-bold">CPC Campaign</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="text-gray-600"><td className="px-4 py-3 font-medium">Budget</td><td className="px-4 py-3">$200</td><td className="px-4 py-3">$200</td></tr>
                  <tr className="text-gray-600"><td className="px-4 py-3 font-medium">Avg. CPM / CPC</td><td className="px-4 py-3">$8.00 CPM</td><td className="px-4 py-3">$1.20 CPC</td></tr>
                  <tr className="text-gray-600"><td className="px-4 py-3 font-medium">Result</td><td className="px-4 py-3">25,000 impressions</td><td className="px-4 py-3">167 clicks</td></tr>
                  <tr className="text-gray-600"><td className="px-4 py-3 font-medium">CTR</td><td className="px-4 py-3">1.2%</td><td className="px-4 py-3">N/A (you only pay for clicks)</td></tr>
                  <tr className="bg-emerald-50 font-bold text-emerald-700"><td className="px-4 py-3">Best for...</td><td className="px-4 py-3">Brand recall, video views</td><td className="px-4 py-3">Website traffic, conversions</td></tr>
                </tbody>
              </table>
            </div>
            <p>See the difference? The CPM campaign reached 25,000 people — great if you want your brand seen. The CPC campaign drove 167 targeted visitors — better if you need sales <em>today</em>. Neither is "wrong" — it depends on your goal.</p>

            {/* Calculate Cheaper */}
            <h2 id="calculate-cheaper" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">Which is Actually Cheaper for YOU?</h2>
            <p className="mb-4">Don't guess — calculate. Here's how to compare apples to apples:</p>
            <ol className="list-decimal list-inside text-gray-600 space-y-3 text-base mb-6">
              <li>Find your target CPM and CPC from past campaigns or industry benchmarks.</li>
              <li>Estimate your expected CTR (click-through rate). For display ads, 0.5-2% is typical. For search, 2-5%.</li>
              <li>Plug into the break-even formula: <code className="font-mono bg-gray-100 px-1 rounded">Break-even CPC = CPM ÷ (CTR × 10)</code></li>
              <li>If your actual CPC is <strong>lower</strong> than break-even → CPC is cheaper. If <strong>higher</strong> → CPM wins.</li>
            </ol>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-6">
              <p className="font-bold text-emerald-800 text-sm mb-2">Example:</p>
              <p className="text-sm text-gray-600 mb-2">Your CPM = $10 | Your CTR = 1.5% (0.015)</p>
              <p className="text-sm font-mono bg-white p-3 rounded-lg mb-2">Break-even CPC = 10 ÷ (0.015 × 10) = 10 ÷ 0.15 = <strong>$0.67</strong></p>
              <p className="text-sm text-gray-600">If your actual CPC is $0.50 → CPC is cheaper. If it's $0.80 → CPM is cheaper.</p>
            </div>
            <p>Still unsure? Use our free <Link href="/tools/cpm-calculator" className="text-emerald-600 hover:underline">CPM Calculator</Link> and <Link href="/tools/cpc-calculator" className="text-emerald-600 hover:underline">CPC Calculator</Link> to run the numbers for your exact campaign.</p>

            {/* Common Mistakes */}
            <h2 id="common-mistakes" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">4 Mistakes That Make CPM vs CPC Cost You Money</h2>
            <div className="space-y-3 my-6">
              {[
                { title: "Picking CPM because it 'looks cheaper'", desc: "A $5 CPM sounds great — until you realize your CTR is 0.2%, meaning you're paying $2.50 per click indirectly. Always calculate effective CPC before deciding." },
                { title: "Using CPC for brand campaigns", desc: "If your goal is awareness, CPC punishes you for low CTR. You'll pay more per impression than if you'd just used CPM from the start." },
                { title: "Not tracking beyond the click", desc: "CPC gets you clicks, but what happens after? If your landing page converts at 1%, you're paying $120 per conversion on a $1.20 CPC. Track CPA, not just CPC." },
                { title: "Ignoring platform differences", desc: "Facebook CPMs aren't comparable to Google Search CPCs. Compare pricing models <em>within the same platform and campaign type</em> for fair decisions." },
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

            {/* Platform Tips */}
            <h2 id="platform-tips" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">Platform-Specific Tips: Facebook, Google, YouTube</h2>
            <div className="space-y-4 my-6">
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 size={18} className="text-emerald-600" />
                  <h3 className="font-bold text-gray-900 text-sm">Facebook / Instagram Ads</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <strong>Use CPM</strong> for video views, brand awareness, or retargeting warm audiences.</li>
                  <li>• <strong>Use CPC</strong> for traffic campaigns, lead forms, or conversion objectives.</li>
                  <li>• <strong>Pro tip:</strong> Start with CPC to test audiences, then switch to CPM for scaling once you know what works.</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Target size={18} className="text-blue-600" />
                  <h3 className="font-bold text-gray-900 text-sm">Google Ads (Search & Display)</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <strong>Search campaigns</strong> almost always use CPC — you're paying for high-intent clicks.</li>
                  <li>• <strong>Display campaigns</strong> can use CPM for broad reach or CPC for performance.</li>
                  <li>• <strong>Pro tip:</strong> Use Target CPA bidding (a CPC variant) once you have conversion data — it automates the CPM vs CPC decision for you.</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={18} className="text-violet-600" />
                  <h3 className="font-bold text-gray-900 text-sm">YouTube Ads</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <strong>TrueView (skippable) ads</strong> use CPV (cost per view), which behaves like CPC.</li>
                  <li>• <strong>Bumper ads (6-sec)</strong> use CPM — perfect for quick brand messages.</li>
                  <li>• <strong>Pro tip:</strong> For YouTube, CPM works best for top-of-funnel awareness. Switch to CPV/CPC when you want viewers to take action.</li>
                </ul>
              </div>
            </div>

            {/* TL;DR */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 text-white my-8">
              <h2 className="text-xl font-bold mb-4">TL;DR</h2>
              <div className="bg-white/10 rounded-xl p-4 mb-4 text-center">
                <p className="text-base sm:text-lg font-semibold font-mono">Break-even CPC = CPM ÷ (CTR × 10)</p>
              </div>
              <ul className="space-y-2 text-sm text-gray-300 list-disc pl-5 mb-6">
                <li><strong className="text-white">CPM</strong> = pay for 1,000 views. Best for <strong className="text-white">awareness, video, retargeting</strong>.</li>
                <li><strong className="text-white">CPC</strong> = pay per click. Best for <strong className="text-white">conversions, lead gen, testing</strong>.</li>
                <li>Don't pick based on price alone — pick based on <strong className="text-white">your campaign goal</strong>.</li>
                <li>Use the break-even formula to compare fairly: <code className="font-mono bg-white/20 px-1 rounded">CPM ÷ (CTR × 10)</code>.</li>
                <li>Track <strong className="text-white">CPA (cost per acquisition)</strong>, not just CPM or CPC — that's what actually matters for profit.</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/tools/cpm-calculator" className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors">CPM Calculator →</Link>
                <Link href="/tools/cpc-calculator" className="inline-flex items-center justify-center px-5 py-2.5 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20">CPC Calculator →</Link>
              </div>
            </div>

            {/* FAQ */}
            <h2 id="faq" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20">Questions People Actually Ask</h2>
            <div className="space-y-4 my-6">
              <FAQItem question="Is CPM or CPC better for small businesses?" answer="For most small businesses with limited budgets, CPC is safer because you only pay for engaged users. However, if your goal is local brand awareness (like a new cafe), CPM on Facebook/Instagram can be very cost-effective for reaching nearby people." />
              <FAQItem question="Can I switch between CPM and CPC in the same campaign?" answer="Yes! Many advertisers start with CPC to test audiences and creatives, then switch to CPM for scaling once they know what works. Just don't change pricing models mid-test — it skews your data." />
              <FAQItem question="Why is my CPM so high on Facebook?" answer="High CPM usually means: narrow targeting (less inventory = higher prices), low ad relevance score, seasonal competition (Q4 is expensive), or poor creative fatigue. Broaden your audience, improve your ad quality, or rotate creatives to lower CPM." />
              <FAQItem question="Does Google Ads use CPM or CPC?" answer="Google Search Ads primarily use CPC. Google Display Network offers both CPM and CPC. YouTube uses CPV (cost per view) for skippable ads and CPM for bumper ads. Always check the campaign type before assuming." />
              <FAQItem question="How do I know if my CPM or CPC is 'good'?" answer="Compare to industry benchmarks: Facebook CPM averages $5-12, Google Search CPC averages $1-3 for most niches. But 'good' depends on your CPA — a $20 CPC is great if each conversion is worth $200. Always measure ROI, not just CPM/CPC." />
              <FAQItem question="Should I use CPM or CPC for YouTube ads?" answer="Use CPM for short bumper ads (brand awareness). Use CPV (cost per view, similar to CPC) for TrueView skippable ads when you want viewers to watch and take action. YouTube's algorithm often optimizes better with CPV for performance campaigns." />
            </div>
          </div>

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