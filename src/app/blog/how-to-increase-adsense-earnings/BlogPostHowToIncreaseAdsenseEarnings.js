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
  FileText,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  XCircle,
  DollarSign,
  TrendingUp,
  Layout,
  MousePointerClick,
  Zap,
  BarChart3,
} from "lucide-react";

// ─── POST DATA ────────────────────────────────────────────────────────────────
const post = {
  slug: "how-to-increase-adsense-earnings",
  title:
    "How to Increase AdSense Earnings (RPM Secrets & Ad Placements That Work)",
  excerpt:
    "Trying to increase AdSense revenue? Stop chasing traffic. Here’s exactly how to optimize your RPM, fix ad placements, and switch to high-CPC niches to 3x your earnings.",
  category: "Monetization",
  tag: "AdSense",
  readTime: 9,
  date: "May 10, 2025",
  dateISO: "2025-05-10",
  color: "from-emerald-500 to-teal-600",
  emoji: "💰",
};

// ─── TOC ──────────────────────────────────────────────────────────────────────
const TOC_ITEMS = [
  { id: "the-math", label: "The Math: Why Traffic Isn't Everything" },
  { id: "best-placements", label: "5 Ad Placements That Actually Make Money" },
  { id: "ad-types", label: "Which Ad Type Pays the Most?" },
  { id: "high-cpc-niches", label: "High-CPC Niches (Switch If You Can)" },
  { id: "content-length", label: "Content Length & Session Time" },
  { id: "core-web-vitals", label: "Core Web Vitals (The Silent Killer)" },
  { id: "mistakes", label: "Mistakes Killing Your Earnings" },
  { id: "faq", label: "FAQs" },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
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
const BlogPostHowToIncreaseAdsenseEarnings = () => {
  const [activeTOC, setActiveTOC] = useState("");

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

  const relatedPosts = [
    {
      id: 1,
      slug: "how-to-calculate-cpm",
      title: "How to Calculate CPM: Formula & Benchmarks",
      category: "Digital Marketing",
      color: "from-sky-500 to-blue-600",
      emoji: "📊",
      readTime: 8,
      date: "Jan 15, 2025",
    },
    {
      id: 5,
      slug: "how-to-generate-lorem-ipsum-text-custom-length",
      title: "How to Generate Lorem Ipsum Text of Any Length (2026 Guide)",
      category: "Web Tools", // Changed
      tag: "Text Tools",
      readTime: 5,
      date: "April 18, 2026",
      color: "from-violet-500 to-purple-600",
      emoji: "📝",
    },
  ];

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
          <span className="text-gray-600 truncate max-w-[160px] inline-block align-bottom">
            AdSense Earnings Guide
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
              <p className="text-sm font-bold mb-1">CPC Calculator</p>
              <p className="text-xs text-emerald-100 mb-3">
                Find out what you should pay per click.
              </p>
              <Link
                href="/tools/cpc-calculator"
                className="block text-center py-2 bg-white text-emerald-700 text-xs font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Calculate Now →
              </Link>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Related Tools
              </p>
              <Link
                href="/tools/cpm-calculator"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors py-1"
              >
                <BarChart3 size={14} /> CPM Calculator
              </Link>
              <Link
                href="/tools/ad-revenue-calculator"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors py-1"
              >
                <DollarSign size={14} /> Ad Revenue Calculator
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
                {post.category}
              </span>
              <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                #{post.tag}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              How to Increase AdSense Earnings{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                (RPM Secrets That Work)
              </span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-5">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 border-t border-gray-100 pt-4">
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {post.readTime} min read
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {post.date}
              </span>
            </div>
          </header>

          {/* Hero */}
          <div
            className={`bg-gradient-to-br ${post.color} rounded-2xl h-56 sm:h-64 md:h-80 flex items-center justify-center mb-10`}
          >
            <span className="text-7xl sm:text-8xl md:text-9xl">
              {post.emoji}
            </span>
          </div>

          {/* ═══════════════ CONTENT ═══════════════ */}
          <div className="text-gray-600 leading-relaxed space-y-6">
            <p className="text-lg">
              Last year I hit 50,000 monthly pageviews on a blog and was making
              a pathetic $120/month from AdSense. That’s a $2.40 RPM — literally
              pocket change. I thought I needed more traffic. So I pushed to
              100,000 pageviews. My earnings? $240. Same terrible RPM. That’s
              when I realized that chasing traffic without optimizing RPM is
              like trying to fill a bucket with a hole in it.
            </p>

            <p>
              After obsessively reading AdSense documentation, running A/B tests
              for three months, and analyzing what actually worked on my sites,
              I finally cracked the code. I’m going to share exactly what moved
              the needle — no fluff, no generic &quot;write quality
              content&quot; advice.
            </p>

            {/* Inline Tool CTA */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-5 sm:p-6 my-8">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <DollarSign size={28} className="text-emerald-600" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-bold text-gray-900 mb-0.5">
                    Check your earnings potential
                  </p>
                  <p className="text-sm text-gray-500">
                    Use our free Ad Revenue Calculator to estimate income by RPM
                    and impressions.
                  </p>
                </div>
                <Link
                  href="/tools/ad-revenue-calculator"
                  className="flex-shrink-0 px-6 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  Calculate Now <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* ── The Math ── */}
            <h2
              id="the-math"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              The Math: Why Traffic Isn’t Everything
            </h2>

            <p>
              AdSense earnings come down to one formula:{" "}
              <strong>Earnings = Pageviews × RPM</strong>. Most beginners obsess
              over the left side (traffic) and completely ignore the right side
              (RPM). Let me show you why that’s a mistake.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
                <p className="text-xs font-bold text-red-500 uppercase mb-2">
                  Site A (Traffic Obsessed)
                </p>
                <p className="text-3xl font-extrabold text-red-600 mb-1">
                  100K
                </p>
                <p className="text-xs text-gray-500 mb-3">Monthly Pageviews</p>
                <p className="text-sm text-gray-600">RPM: $2.40</p>
                <p className="text-lg font-bold text-red-700 mt-2">$240/mo</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
                <p className="text-xs font-bold text-emerald-500 uppercase mb-2">
                  Site B (RPM Optimized)
                </p>
                <p className="text-3xl font-extrabold text-emerald-600 mb-1">
                  30K
                </p>
                <p className="text-xs text-gray-500 mb-3">Monthly Pageviews</p>
                <p className="text-sm text-gray-600">RPM: $18.00</p>
                <p className="text-lg font-bold text-emerald-700 mt-2">
                  $540/mo
                </p>
              </div>
            </div>

            <p>
              Site B has <strong>70% less traffic</strong> but makes{" "}
              <strong>2.25x more money</strong> because their RPM is nearly 8x
              higher. That’s the power of RPM optimization. Stop writing 50
              articles a month hoping one goes viral. Fix your RPM first, then
              scale traffic.
            </p>

            {/* ── Best Placements ── */}
            <h2
              id="best-placements"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              5 Ad Placements That Actually Make Money
            </h2>

            <p>
              Ad placement is the single biggest lever you can pull for AdSense
              RPM. After testing dozens of configurations, here are the ones
              that consistently perform:
            </p>

            <div className="space-y-4 my-6">
              {[
                {
                  num: "1",
                  title: "Below the Header (Above the Fold)",
                  desc: "Place a horizontal ad right below your site logo/navigation. This is the highest-visibility placement. Make it a leaderboard (728x90) or responsive ad unit. Don't put it above the header — Google penalizes that.",
                },
                {
                  num: "2",
                  title: "After Paragraph 2 (In-Content)",
                  desc: "This is the sweet spot. The user has read enough to be engaged, and the ad feels natural in the content flow. Use an in-article or fluid ad unit. This single placement often accounts for 40% of my total AdSense income.",
                },
                {
                  num: "3",
                  title: "Mid-Article (After Paragraph 5 or 6)",
                  desc: "On long articles (1500+ words), place another in-content ad halfway through. By this point, the user is deeply engaged, and ad visibility is high. Don't place them back-to-back — space them out.",
                },
                {
                  num: "4",
                  title: "Sticky Ad on Mobile (Bottom Anchor)",
                  desc: "Enable the 'Anchor' ad type in AdSense for mobile. It sticks to the bottom of the screen and gets massive visibility. This alone can boost mobile RPM by 30-50%. Don't use sticky sidebars — they hurt user experience.",
                },
                {
                  num: "5",
                  title: "End of Post (Below Content)",
                  desc: "When a user finishes an article, they pause to decide what to do next. An ad here gets high viewability. Pair it with an in-feed ad showing related articles for a double win.",
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4"
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-bold">
                    {item.num}
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

            {/* ── Ad Types ── */}
            <h2
              id="ad-types"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              Which Ad Type Pays the Most?
            </h2>

            <p>
              AdSense offers several ad types, and they perform very differently
              depending on the device. Here’s what I’ve found after months of
              testing:
            </p>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden my-6">
              <div className="grid grid-cols-3 bg-gray-900 text-white text-sm">
                <div className="px-4 py-3 font-semibold">Ad Type</div>
                <div className="px-4 py-3 font-semibold text-center text-emerald-300">
                  Desktop
                </div>
                <div className="px-4 py-3 font-semibold text-center text-emerald-300">
                  Mobile
                </div>
              </div>
              <div className="divide-y divide-gray-100 px-4">
                {[
                  { type: "Display", desktop: "Good", mobile: "Low" },
                  { type: "In-Feed", desktop: "Low", mobile: "Good" },
                  { type: "In-Article", desktop: "Best", mobile: "Good" },
                  { type: "Anchor (Sticky)", desktop: "N/A", mobile: "Best" },
                  { type: "Side Rail", desktop: "Okay", mobile: "N/A" },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-3 text-sm py-3">
                    <div className="font-medium text-gray-800">{row.type}</div>
                    <div
                      className={`text-center ${row.desktop === "Best" ? "text-emerald-600 font-bold" : row.desktop === "Low" ? "text-red-400" : "text-gray-600"}`}
                    >
                      {row.desktop}
                    </div>
                    <div
                      className={`text-center ${row.mobile === "Best" ? "text-emerald-600 font-bold" : row.mobile === "Low" ? "text-red-400" : "text-gray-600"}`}
                    >
                      {row.mobile}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p>
              <strong>Pro tip:</strong> Use "Auto Ads" but manually place your
              top 2-3 units. Let Auto Ads fill in the rest. Manual placement for
              critical spots + Auto Ads for long-tail pages is the winning
              combo.
            </p>

            {/* ── High CPC Niches ── */}
            <h2
              id="high-cpc-niches"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              High-CPC Niches (Switch If You Can)
            </h2>

            <p>
              If you’re writing about entertainment, quotes, or memes, your CPC
              will be $0.10-$0.50. No amount of optimization will fix a
              fundamentally low-CPC niche. Here’s what pays:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              {[
                {
                  niche: "Finance / Insurance",
                  cpc: "$8 - $25+",
                  color: "bg-emerald-50 border-emerald-200 text-emerald-700",
                },
                {
                  niche: "Software / SaaS",
                  cpc: "$5 - $15",
                  color: "bg-emerald-50 border-emerald-200 text-emerald-700",
                },
                {
                  niche: "Health / Medical",
                  cpc: "$4 - $12",
                  color: "bg-sky-50 border-sky-200 text-sky-700",
                },
                {
                  niche: "Legal / Attorney",
                  cpc: "$6 - $20",
                  color: "bg-emerald-50 border-emerald-200 text-emerald-700",
                },
                {
                  niche: "Technology / B2B",
                  cpc: "$3 - $10",
                  color: "bg-sky-50 border-sky-200 text-sky-700",
                },
                {
                  niche: "Lifestyle / Quotes",
                  cpc: "$0.10 - $0.50",
                  color: "bg-red-50 border-red-200 text-red-600",
                },
              ].map((item) => (
                <div
                  key={item.niche}
                  className={`border rounded-xl p-4 ${item.color}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-sm">{item.niche}</p>
                    <p className="text-sm font-bold">{item.cpc}</p>
                  </div>
                  <p className="text-xs text-gray-500">Average CPC Range</p>
                </div>
              ))}
            </div>

            <p>
              You don’t need to abandon your current niche entirely. Add a
              &quot;Finance&quot; or &quot;Software&quot; sub-category to your
              site. Even 20% of your traffic coming from high-CPC content will
              noticeably lift your overall RPM.
            </p>

            {/* ── Content Length ── */}
            <h2
              id="content-length"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              Content Length & Session Time (The Hidden RPM Factor)
            </h2>

            <p>
              Here’s something most AdSense guides don’t tell you:{" "}
              <strong>longer content = more ad impressions per session.</strong>
            </p>

            <p>
              If a user reads a 500-word article and leaves after 45 seconds,
              they might see 2-3 ads. If they read a 2,000-word comprehensive
              guide and spend 4 minutes on the page, they’ll see 5-8 ads — maybe
              even click one. Same user, but 2-3x the ad revenue.
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-5 my-6">
              <p className="font-bold text-gray-900 text-sm mb-3">
                The sweet spot for AdSense content:
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500 flex-shrink-0 mt-0.5"
                  />
                  <span>
                    <strong>Minimum 1,500 words.</strong> Anything shorter
                    doesn’t generate enough scroll depth for multiple ad
                    impressions.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500 flex-shrink-0 mt-0.5"
                  />
                  <span>
                    <strong>Ideal: 2,000 - 3,000 words.</strong> This gives you
                    room for 3-4 well-spaced in-content ads without feeling
                    spammy.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500 flex-shrink-0 mt-0.5"
                  />
                  <span>
                    <strong>Internal links keep them on-site.</strong> Every
                    additional pageview in a session is another ad impression
                    opportunity.
                  </span>
                </li>
              </ul>
            </div>

            {/* ── Core Web Vitals ── */}
            <h2
              id="core-web-vitals"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              Core Web Vitals (The Silent RPM Killer)
            </h2>

            <p>
              Google doesn’t just pay you more for better ads — they literally
              pay you <strong>less</strong> if your site is slow. This is
              official. AdSense uses &quot;Ad Speed&quot; metrics, and if your
              Core Web Vitals are bad, you get shoved into the low-paying ad
              auction pool.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              {[
                {
                  metric: "LCP",
                  full: "Largest Contentful Paint",
                  target: "< 2.5s",
                  icon: <Zap size={18} className="text-amber-500" />,
                },
                {
                  metric: "CLS",
                  full: "Cumulative Layout Shift",
                  target: "< 0.1",
                  icon: <Layout size={18} className="text-red-500" />,
                },
                {
                  metric: "INP",
                  full: "Interaction to Next Paint",
                  target: "< 200ms",
                  icon: (
                    <MousePointerClick size={18} className="text-sky-500" />
                  ),
                },
              ].map((item) => (
                <div
                  key={item.metric}
                  className="bg-white border border-gray-200 rounded-xl p-5 text-center"
                >
                  <div className="flex justify-center mb-2">{item.icon}</div>
                  <p className="text-2xl font-extrabold text-gray-900 mb-1">
                    {item.metric}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">{item.full}</p>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Target: {item.target}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-5 my-6">
              <div className="flex items-start gap-2">
                <AlertCircle
                  size={18}
                  className="text-red-600 flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-sm font-semibold text-red-800 mb-1">
                    CLS is the #1 AdSense killer
                  </p>
                  <p className="text-sm text-red-700">
                    If your ads push content down when they load (layout shift),
                    Google will tank your RPM. Always specify width/height for
                    your ad containers so the browser reserves the space before
                    the ad loads.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Mistakes ── */}
            <h2
              id="mistakes"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              Mistakes That Are Killing Your AdSense Earnings
            </h2>

            <div className="space-y-3 my-6">
              {[
                {
                  title: "Putting too many ads above the fold",
                  fix: "Google allows maximum 3 ads above the fold on mobile. If you exceed this, they all compete with each other, CPC drops, and users bounce. Use 1 above the fold, and push the rest into the content.",
                  isBad: true,
                },
                {
                  title: "Blending ads perfectly with content",
                  fix: "In 2025, overly blended ads get flagged as deceptive. Make sure ads are clearly distinguishable from content. Use a subtle border or a small 'Advertisement' label above them.",
                  isBad: true,
                },
                {
                  title: "Not using Auto Ads at all",
                  fix: "Manual placement is great for your top 3 spots, but Auto Ads uses machine learning to find additional high-converting spots you'd never think of. Use both together.",
                  isBad: true,
                },
                {
                  title: "Ignoring page-level ads exclusion",
                  fix: "If you have a privacy policy or contact page getting ad impressions, exclude them in AdSense. Low-quality page views drag down your site-wide RPM.",
                  isBad: true,
                },
                {
                  title: "Checking earnings every 2 hours",
                  fix: "AdSense earnings fluctuate wildly hour-by-hour. Checking constantly leads to bad decisions (changing placements that needed more time). Check once a week, make changes once a month.",
                  isBad: true,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-xl p-5"
                >
                  <p className="text-sm font-bold text-red-600 mb-1">
                    ❌ {item.title}
                  </p>
                  <p className="text-sm text-emerald-700 font-medium mb-0.5">
                    ✅ Fix:
                  </p>
                  <p className="text-sm text-gray-600">{item.fix}</p>
                </div>
              ))}
            </div>

            {/* ── TL;DR ── */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 text-white my-8">
              <h2 className="text-xl font-bold mb-4">TL;DR</h2>
              <ul className="space-y-2 text-sm text-gray-300 list-disc pl-5 mb-6">
                <li>
                  <strong className="text-white">
                    Focus on RPM, not just traffic.
                  </strong>{" "}
                  30K views at $18 RPM beats 100K views at $2 RPM.
                </li>
                <li>
                  <strong className="text-white">Place in-content ads</strong>{" "}
                  after paragraph 2 and paragraph 5 — these are your money
                  makers.
                </li>
                <li>
                  <strong className="text-white">
                    Enable Anchor ads on mobile
                  </strong>{" "}
                  — they can boost mobile RPM by 30-50%.
                </li>
                <li>
                  <strong className="text-white">
                    Write 2,000+ word articles
                  </strong>{" "}
                  to increase session time and ad impressions per visit.
                </li>
                <li>
                  <strong className="text-white">Fix CLS immediately.</strong>{" "}
                  Layout shifts literally reduce your RPM by putting you in
                  worse ad auctions.
                </li>
                <li>
                  <strong className="text-white">Add high-CPC content</strong>{" "}
                  (finance, software) even if your main niche is low-CPC.
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/tools/cpc-calculator"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  CPC Calculator →
                </Link>
                <Link
                  href="/tools/ad-revenue-calculator"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                >
                  Ad Revenue Calculator →
                </Link>
              </div>
            </div>

            {/* ── FAQ ── */}
            <h2
              id="faq"
              className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20"
            >
              Questions People Actually Ask
            </h2>

            <div className="space-y-4 my-6">
              <FAQItem
                question="How do I increase my AdSense RPM?"
                answer="The fastest way is fixing ad placements: put an in-content ad after paragraph 2, enable mobile anchor ads, and remove excessive above-the-fold ads. Then work on content length (2000+ words) to increase impressions per session. Finally, fix Core Web Vitals (especially CLS) to get into better ad auctions."
              />
              <FAQItem
                question="Why is my AdSense RPM so low?"
                answer="Low RPM is usually caused by: low-CPC niche (entertainment/lifestyle), bad ad placements (all ads above the fold), poor Core Web Vitals (especially CLS), or low-quality traffic (social media bounce traffic vs search intent traffic). Search traffic almost always has higher RPM than social traffic."
              />
              <FAQItem
                question="Does more traffic increase AdSense earnings?"
                answer="Yes, but only linearly. If your RPM is $2, doubling traffic doubles earnings. But if you spend that same time doubling your RPM from $2 to $8 (which is very achievable with better placements and niches), you 4x your earnings without a single extra visitor. Fix RPM first, then chase traffic."
              />
              <FAQItem
                question="How many ads should I put on a page?"
                answer="For a 2000+ word article, 5-7 ads is the sweet spot: 1 above the fold, 2-3 in-content, 1 at the end, and 1 sidebar or anchor ad on mobile. Going above 8-10 ads creates ad blindness, hurts user experience, and actually decreases CPC because advertisers bid less for low-quality placements."
              />
              <FAQItem
                question="What is a good RPM for AdSense?"
                answer="A good RPM depends on your niche and traffic source. For display ads on content sites: $5-$10 RPM is average, $10-$25 is good, and $25+ is excellent. Search traffic RPMs are typically 2-3x higher than display/social RPMs. Finance and tech niches regularly see $15-$30 RPMs."
              />
              <FAQItem
                question="Does page speed affect AdSense earnings?"
                answer="Yes, significantly. Google uses Ad Speed as a factor in ad auctions. Slow sites (poor LCP, high CLS) get placed in lower-quality ad auctions, which means cheaper ads and lower CPC. Fixing your CLS alone can boost RPM by 10-20%."
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
};

export default BlogPostHowToIncreaseAdsenseEarnings;
