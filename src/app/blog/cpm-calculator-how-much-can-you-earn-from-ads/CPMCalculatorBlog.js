"use client";

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
  {
    id: "calculate-adsense-earnings",
    label: "Calculate Your AdSense Earnings (Step-by-Step)",
  },
  {
    id: "real-examples",
    label: "Real Examples: Blog vs YouTube vs Display Ads",
  },
  {
    id: "increase-cpm",
    label: "5 Ways to Increase Your CPM (Without More Traffic)",
  },
  { id: "cpm-vs-rpm", label: "CPM vs RPM: What's the Difference for AdSense?" },
  { id: "common-mistakes", label: "Mistakes That Lower Your CPM" },
  { id: "faq", label: "FAQs" },
];

// ─── FAQ Component ───────────────────────────────────────────────────────────
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <details
      open={open}
      onToggle={(e) => setOpen(e.target.open)}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden"
    >
      <summary className="px-5 py-4 cursor-pointer font-semibold text-gray-900 text-sm flex items-center justify-between hover:bg-gray-50 transition list-none">
        {question}
        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ml-4 ${open ? "rotate-180" : ""}`}
        />
      </summary>
      <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
        {answer}
      </div>
    </details>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function CPMCalculatorBlog() {
  const blogData = getPostBySlug(
    "cpm-calculator-how-much-can-you-earn-from-ads",
  );
  const [activeTOC, setActiveTOC] = useState("");
  const [copiedFormula, setCopiedFormula] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headings = TOC_ITEMS.map((item) =>
        document.getElementById(item.id),
      ).filter(Boolean);
      let current = "";
      headings.forEach((h) => {
        if (window.scrollY >= h.offsetTop - 120) current = h.id;
      });
      setActiveTOC(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyFormula = () => {
    navigator.clipboard.writeText(
      "Earnings = (Impressions ÷ 1,000) × CPM Rate",
    );
    setCopiedFormula(true);
    setTimeout(() => setCopiedFormula(false), 2000);
  };

  const relatedPosts = [
    {
      id: 6,
      slug: "how-to-calculate-cpm",
      title: "How to Calculate CPM: Step-by-Step Formula & Examples",
      category: "Digital Marketing",
      color: "from-sky-500 to-blue-600",
      emoji: "📊",
      readTime: 8,
      date: "January 15, 2025",
    },
    {
      id: 7,
      slug: "how-to-increase-adsense-earnings",
      title:
        "How to Increase AdSense Earnings (RPM Secrets & Ad Placements That Work)",
      category: "Monetization",
      color: "from-emerald-500 to-teal-600",
      emoji: "💰",
      readTime: 9,
      date: "May 10, 2026",
    },
  ];

  if (!blogData)
    return <div className="p-10 text-center text-gray-500">Post not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Breadcrumb ── */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-emerald-600 transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link
            href="/blog"
            className="hover:text-emerald-600 transition-colors"
          >
            Blog
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-600 truncate max-w-[150px] inline-block align-bottom">
            CPM Calculator Guide
          </span>
        </nav>
      </div>

      {/* ── Layout ── */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex gap-10">
        {/* ── TOC (desktop) ── */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-20">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              On this page
            </p>
            <div className="flex flex-col gap-0.5">
              {TOC_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-sm py-1.5 px-3 rounded-r-lg transition-all border-l-2 ${activeTOC === item.id ? "border-l-emerald-600 text-emerald-600 bg-emerald-50 font-medium" : "border-l-transparent text-gray-500 hover:text-emerald-600 hover:bg-gray-50"}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white">
              <p className="text-sm font-bold mb-1">Try Our Free Tool</p>
              <p className="text-xs text-emerald-100 mb-3">
                Calculate your potential AdSense earnings in seconds — no
                signup.
              </p>
              <Link
                href="/tools/cpm-calculator"
                className="block text-center py-2 bg-white text-emerald-700 text-xs font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Open CPM Calculator →
              </Link>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Related Tools
              </p>
              <Link
                href="/tools/adsense-revenue-calculator"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors py-1"
              >
                <BarChart3 size={14} /> AdSense Revenue
              </Link>
              <Link
                href="/tools/youtube-ad-revenue-calculator"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors py-1"
              >
                <TrendingUp size={14} /> YouTube Revenue
              </Link>
              <Link
                href="/tools/cpc-calculator"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors py-1"
              >
                <DollarSign size={14} /> CPC Calculator
              </Link>
            </div>
          </div>
        </aside>

        {/* ── Article ── */}
        <article className="flex-1 max-w-3xl">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                {blogData.category}
              </span>
              <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                #{blogData.tag}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              {blogData.title}
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-5">
              {blogData.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 border-t border-gray-100 pt-4">
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {blogData.readTime} min read
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {blogData.date}
              </span>
            </div>
          </header>

          {/* Hero */}
          <div
            className={`bg-gradient-to-br ${blogData.color} rounded-2xl h-56 sm:h-64 md:h-80 flex items-center justify-center mb-10`}
          >
            <span className="text-7xl sm:text-8xl md:text-9xl">
              {blogData.emoji}
            </span>
          </div>

          {/* ═══════════════ CONTENT ═══════════════ */}
          <div className="text-gray-600 leading-relaxed space-y-6">
            <p className="text-lg">
              My blogging buddy last month took me around to view his AdSense
              stats dashboard. He made 50,000 pageviews for the month… and only
              earned $87 from those views. “Is this usual?” he wondered. To be
              honest, maybe – but he couldn’t tell if his CPM is low or if it’s
              just that he's operating in a hard-to-make-money niche. That's why
              I've put together this easy AdSense CPM calculator.
            </p>
            <p>
              In this article, you’ll learn how a CPM calculator works, examples
              for different kinds of sites and ad types, and five foolproof ways
              to raise your CPM – no matter how many pageviews you have.
            </p>

            {/* Inline CTA */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-5 sm:p-6 my-8">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Calculator size={28} className="text-emerald-600" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-bold text-gray-900 mb-0.5">
                    Want to calculate your earnings now?
                  </p>
                  <p className="text-sm text-gray-500">
                    Use our free CPM calculator for Google AdSense — instant
                    results, no email required.
                  </p>
                </div>
                <Link
                  href="/tools/cpm-calculator"
                  className="flex-shrink-0 px-6 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  Calculate Now <Zap size={16} />
                </Link>
              </div>
            </div>

            {/* What is CPM */}
            <h2
              id="what-is-cpm"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              What is CPM?
            </h2>
            <p>
              CPM means cost per mille, where "mille" means thousand in Latin.
              It refers to how much money the advertiser pays out for each 1,000
              views of their advertisement.
            </p>
            <p>
              From the point of view of publishers (which would be you), CPM is
              the rate at which you earn money for every 1,000 ad views that you
              get.
            </p>
            <div className="bg-gray-900 text-green-400 rounded-2xl p-5 mb-5 font-mono text-center text-sm md:text-base font-bold relative">
              Earnings = (Impressions ÷ 1,000) × CPM Rate
              <button
                onClick={handleCopyFormula}
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                title="Copy formula"
              >
                {copiedFormula ? (
                  <CheckCircle2 size={16} className="text-green-400" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
            <p>
              Sounds easy enough? The truth is that your net profit from Google
              AdSense depends on more than one thing. And what you'll need is a
              CPM calculator for AdSense to figure out how much profit you could
              expect from this particular niche.
            </p>

            {/* How Calculator Works */}
            <h2
              id="how-cpm-calculator-works"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              How Does a CPM Calculator Work? (It's Easier Than You Think)
            </h2>
            <p className="mb-4">
              Most CPM calculators ask for just two inputs:
            </p>
            <ol className="list-decimal list-inside text-gray-600 space-y-3 text-base mb-6">
              <li>
                <strong>Your monthly impressions</strong> (how many times your
                ads were shown)
              </li>
              <li>
                <strong>Your average CPM rate</strong> (what advertisers pay per
                1,000 views in your niche)
              </li>
            </ol>
            <p className="mb-4">Then it does the math:</p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-6">
              <p className="font-mono text-sm mb-2">
                (50,000 impressions ÷ 1,000) × $3.50 CPM = $175/month
              </p>
              <p className="text-xs text-emerald-700">
                That's your estimated AdSense revenue before fees or taxes.
              </p>
            </div>
            <p>
              Our free{" "}
              <Link
                href="/tools/cpm-calculator"
                className="text-emerald-600 hover:underline"
              >
                CPM calculator
              </Link>{" "}
              goes a step further: it also estimates your RPM (Revenue Per
              Mille), which is what you actually keep after Google's cut (~32%).
            </p>

            {/* Calculate AdSense Earnings */}
            <h2
              id="calculate-adsense-earnings"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              How to Calculate AdSense Revenue: Guide
            </h2>
            <p className="mb-4">
              Need help calculating? Find your figures below:
            </p>
            <div className="space-y-4 my-6">
              {[
                {
                  step: "1",
                  title: "Find Your Impressions",
                  desc: "Go to the Google AdSense menu, click Reports → choose 'Impressions', depending on the period you need. On blogs, it would be page views multiplied by the number of ads per page.",
                },
                {
                  step: "2",
                  title: "Estimate Your CPM",
                  desc: "Look up 'Page CPM' in your AdSense account. Have no AdSense account? Use niche standards: financial niche $10-$30, tech niche $5-$15, lifestyle niche $2-$8, entertainment niche $1-$4.",
                },
                {
                  step: "3",
                  title: "Plug Into the Calculator",
                  desc: "Enter your data in the free RPM calculator for AdSense. You will receive estimates of daily, monthly, and yearly earnings along with your RPM.",
                },
                {
                  step: "4",
                  title: "Adjust for Reality",
                  desc: "All impressions do not mean earnings. To calculate the final result, multiply it by 0.7 or 0.9, depending on the actual number of impressions monetized.",
                },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-9 h-9 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-1">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Real Examples */}
            <h2
              id="real-examples"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              Real Examples: Blog vs YouTube vs Display Ads
            </h2>
            <p className="mb-4">
              CPM varies wildly by platform. Here's what $10,000 monthly
              impressions could earn:
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm text-left border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-4 py-3 font-bold">Platform</th>
                    <th className="px-4 py-3 font-bold">Avg. CPM</th>
                    <th className="px-4 py-3 font-bold">
                      Est. Monthly Earnings
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="text-gray-600">
                    <td className="px-4 py-3 font-medium">
                      Personal Finance Blog
                    </td>
                    <td className="px-4 py-3">$12-25</td>
                    <td className="px-4 py-3">$120-250</td>
                  </tr>
                  <tr className="text-gray-600">
                    <td className="px-4 py-3 font-medium">Tech Review Blog</td>
                    <td className="px-4 py-3">$6-14</td>
                    <td className="px-4 py-3">$60-140</td>
                  </tr>
                  <tr className="text-gray-600">
                    <td className="px-4 py-3 font-medium">
                      YouTube (Long-form)
                    </td>
                    <td className="px-4 py-3">$3-8</td>
                    <td className="px-4 py-3">$30-80</td>
                  </tr>
                  <tr className="text-gray-600">
                    <td className="px-4 py-3 font-medium">
                      Display Ads (General)
                    </td>
                    <td className="px-4 py-3">$1-4</td>
                    <td className="px-4 py-3">$10-40</td>
                  </tr>
                  <tr className="bg-emerald-50 font-bold text-emerald-700">
                    <td className="px-4 py-3">Your Niche?</td>
                    <td className="px-4 py-3">Use our calculator</td>
                    <td className="px-4 py-3">Get your estimate →</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Did you notice the difference? An online finance blog generating
              the same traffic as an entertainment blog could make 5-10 times
              more money. This is why the knowledge of your niche-specific CPM
              is important, which is why our CPM calculator for Google AdSense
              allows you to change the rate.
            </p>

            {/* Increase CPM */}
            <h2
              id="increase-cpm"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              5 CPM Boosting Methods That Don't Require More Traffic
            </h2>
            <p className="mb-4">
              Sometimes, you don't have to get more traffic to earn more. Try
              these methods instead:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              {[
                {
                  title: "Target High-Value Keywords",
                  desc: "Talk about topics that have high prices: insurance, loans, software, and legal assistance. Find such phrases by using our tips on doing keyword research.",
                },
                {
                  title: "Make Proper Placement of Ads",
                  desc: "Put your ads above the fold, in-content, and close to CTAs. Do not stuff them, as this will hurt CPM.",
                },
                {
                  title: "Improve Page Speed",
                  desc: "Fast pages mean better viewability, which means higher CPMs. Compress images, implement lazy loading, and use a CDN. Use our free image compressor tool for that.",
                },
                {
                  title: "Focus on Tier-1 Traffic",
                  desc: "US, UK, Canada, and Australia visitors give 3-5 times higher CPM than others. Learn to make content for these niches.",
                },
                {
                  title: "Choose Responsive Ads",
                  desc: "Responsive ads perform better across all screens. Enable the 'Auto ads' feature or create responsive manual ad units in AdSense.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-emerald-50 border border-emerald-100 rounded-xl p-5"
                >
                  <p className="font-semibold text-gray-900 text-sm mb-2">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CPM vs RPM */}
            <h2
              id="cpm-vs-rpm"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              CPM or RPM: What Is the Difference for AdSense Publishers?
            </h2>
            <p className="mb-4">
              This often confuses many beginner publishers. Below is the quick
              explanation.
            </p>
            <div className="bg-white border border-gray-200 rounded-xl p-5 my-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <p className="font-bold text-blue-800 text-sm mb-2">
                    CPM (Cost Per Mille)
                  </p>
                  <p className="text-sm text-gray-600">
                    How much advertisers will pay for every thousand ads shown.
                    This is your list price, before taking into account Google's
                    portion.
                  </p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                  <p className="font-bold text-emerald-800 text-sm mb-2">
                    RPM (Revenue Per Mille)
                  </p>
                  <p className="text-sm text-gray-600">
                    Your actual earnings from one thousand page views. It equals
                    your CPM, minus Google's roughly 32% commission and other
                    factors.
                  </p>
                </div>
              </div>
            </div>
            <p>
              Quick trick: Your RPM will normally be between 60-80% of your CPM.
              With our free AdSense CPM calculator, you can estimate how much
              you will earn from it in cash.
            </p>

            {/* Common Mistakes */}
            <h2
              id="common-mistakes"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              Three Ways to Reduce Your CPM (And What to Do Instead)
            </h2>
            <div className="space-y-3 my-6">
              {[
                {
                  title: "Neglecting Ad Visibility",
                  desc: "Ads that fail to load above the fold or appear on sites where people leave immediately are unseen and generate lower revenue. Solution: Include at least one ad above the fold; increase page engagement to encourage more scrolling.",
                },
                {
                  title: "Employing Multiple Ad Networks",
                  desc: "Having three ad networks active simultaneously (such as AdSense, Mediavine, and Ezoic) creates issues like ad conflict and slower page loading, all contributing to reduced CPM. Solution: Begin with one network, learn how to use it effectively, then gradually integrate others.",
                },
                {
                  title: "Failing to Update Outdated Content",
                  desc: "Stale content generates traffic that lacks value. Advertisers will spend less money on traffic with lower conversion rates. Solution: Make annual updates to your highest-performing posts by ensuring up-to-date information and ad placement.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-red-50 border border-red-100 rounded-xl p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle size={16} className="text-red-500" />
                    <p className="font-semibold text-gray-900 text-sm">
                      {item.title}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* TL;DR */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 text-white my-8">
              <h2 className="text-xl font-bold mb-4">TL;DR</h2>
              <div className="bg-white/10 rounded-xl p-4 mb-4 text-center">
                <p className="text-base sm:text-lg font-semibold font-mono">
                  Earnings = (Impressions ÷ 1,000) × CPM Rate
                </p>
              </div>
              <ul className="space-y-2 text-sm text-gray-300 list-disc pl-5 mb-6">
                <li>
                  CPM = what advertisers pay per 1,000 ad views; RPM = what you
                  keep after Google's cut
                </li>
                <li>
                  Finance, tech, and legal niches have the highest CPMs
                  ($10-30+); entertainment and general content are lower ($1-8)
                </li>
                <li>
                  Use our free{" "}
                  <strong className="text-white">
                    CPM calculator for Google AdSense
                  </strong>{" "}
                  to estimate your earnings with your actual numbers
                </li>
                <li>
                  Increase CPM by targeting high-value keywords, optimizing ad
                  placements, and focusing on Tier-1 traffic
                </li>
                <li>
                  Always track RPM, not just CPM — that's what actually hits
                  your bank account
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/tools/cpm-calculator"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Open CPM Calculator →
                </Link>
                <Link
                  href="/tools/adsense-revenue-calculator"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                >
                  AdSense Revenue Tool →
                </Link>
              </div>
            </div>

            {/* FAQ */}
            <h2
              id="faq"
              className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20"
            >
              Questions People Actually Ask
            </h2>
            <div className="space-y-4 my-6">
              <FAQItem
                question="What is a good CPM for Google AdSense?"
                answer="It depends on your niche and traffic source. For blogs: finance ($10-30), tech ($6-15), lifestyle ($3-8), entertainment ($1-4). For YouTube: $3-8 for long-form content. Use our CPM calculator for Google AdSense to estimate based on your actual numbers."
              />
              <FAQItem
                question="How accurate is a CPM calculator?"
                answer="Very — if you use real data from your AdSense dashboard. Estimates based on niche averages are directional, not exact. Our calculator lets you input your actual CPM for precise results."
              />
              <FAQItem
                question="Why is my AdSense CPM so low?"
                answer="Common reasons: traffic from low-CPM countries, low ad viewability, poor ad placements, or a niche with low advertiser demand. Try targeting Tier-1 countries, improving page speed, and placing ads above the fold."
              />
              <FAQItem
                question="Does CPM include Google's cut?"
                answer="No. CPM is what advertisers pay. Your actual earnings (RPM) are typically 60-80% of CPM after Google's ~32% share and other adjustments. Our calculator estimates both."
              />
              <FAQItem
                question="Can I use this calculator for YouTube AdSense?"
                answer="Yes! YouTube uses CPM too. Just enter your video views as 'impressions' and your YouTube CPM rate. Note: YouTube CPMs are usually lower than blog CPMs due to different ad formats."
              />
              <FAQItem
                question="How often should I recalculate my CPM?"
                answer="Check monthly. CPM fluctuates with seasonality (Q4 is highest), advertiser demand, and your content mix. Recalculating helps you spot trends and adjust your strategy."
              />
            </div>
          </div>
          {/* ═══════════════ CONTENT END ═══════════════ */}

          {/* ── Related Posts ── */}
          <div className="mt-16 border-t border-gray-200 pt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Continue Reading
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/blog/${rp.slug}`}
                  className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`flex items-center justify-center bg-gradient-to-br ${rp.color} h-32`}
                  >
                    <span className="text-5xl">{rp.emoji}</span>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {rp.category}
                    </span>
                    <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mt-2 mb-1">
                      {rp.title}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {rp.readTime} min read · {rp.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft size={14} /> Back to all articles
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
