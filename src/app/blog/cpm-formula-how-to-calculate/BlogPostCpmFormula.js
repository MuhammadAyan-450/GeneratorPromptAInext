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
} from "lucide-react";

const post = {
  id: 11,
  slug: "cpm-formula-how-to-calculate",
  title: "CPM Formula — How to Calculate Cost Per Mille",
  excerpt:
    "The first time an advertiser offered me a $5 CPM, I had to Google it in the bathroom. Here’s the dead-simple formula and real examples.",
  category: "Advertising",
  tag: "CPM",
  readTime: 5,
  date: "May 20, 2026",
  dateISO: "2026-05-20",
  featured: false,
  color: "from-emerald-500 to-teal-600",
  emoji: "🧮",
  views: "6.1K",
};

const TOC_ITEMS = [
  { id: "what-is-cpm", label: "What is CPM?" },
  { id: "the-formula", label: "The Formula" },
  { id: "advertiser-example", label: "Example: Buying Ads" },
  { id: "publisher-example", label: "Example: Selling Ads" },
  { id: "why-it-matters", label: "Why CPM Matters" },
  { id: "faq", label: "FAQs" },
];

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

const BlogPostCpmFormula = () => {
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
      slug: "claude-vs-chatgpt-which-is-better",
      title: "Claude vs ChatGPT in 2026: Which AI is Actually Better?",
      category: "AI Comparison",
      color: "from-orange-500 to-red-500",
      emoji: "⚔️",
      readTime: 12,
      date: "April 5, 2026",
    },
    {
      id: 2,
      slug: "how-to-generate-xml-sitemap-free",
      title: "How to Generate XML Sitemap Free (3 Easy Methods)",
      category: "SEO",
      color: "from-cyan-500 to-blue-600",
      emoji: "🗺️",
      readTime: 5,
      date: "May 12, 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Breadcrumb ── */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link
            href="/blog"
            className="hover:text-indigo-600 transition-colors"
          >
            Blog
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-600 truncate max-w-xs inline-block align-bottom">
            CPM Formula
          </span>
        </nav>
      </div>

      {/* ── Layout ── */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex gap-10">
        {/* ── TOC Sidebar ── */}
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
                  className={`text-sm py-1.5 px-3 rounded-r-lg transition-all border-l-2 ${
                    activeTOC === item.id
                      ? "border-l-indigo-600 text-indigo-600 bg-indigo-50 font-medium"
                      : "border-l-transparent text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white">
              <p className="text-sm font-bold mb-1">Free AI Text Humanizer</p>
              <p className="text-xs text-emerald-100 mb-3">
                Make any AI text sound naturally human-written.
              </p>
              <Link
                href="/tools/ai-text-humanizer"
                className="block text-center py-2 bg-white text-emerald-700 text-xs font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Try Free →
              </Link>
            </div>
          </div>
        </aside>

        {/* ── Article ── */}
        <article className="flex-1 max-w-3xl">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                #{post.tag}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              CPM Formula:{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                How to Calculate Cost Per Mille
              </span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-5">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400 border-t border-gray-100 pt-4">
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {post.readTime} min read
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye size={14} /> {post.views} views
              </span>
            </div>
          </header>

          {/* Hero */}
          <div
            className={`bg-gradient-to-br ${post.color} rounded-2xl h-64 md:h-80 flex items-center justify-center mb-10`}
          >
            <span className="text-8xl md:text-9xl">{post.emoji}</span>
          </div>

          {/* ═══════════════ CONTENT ═══════════════ */}
          <div className="text-gray-600 leading-relaxed space-y-5">
            {/* Intro */}
            <p className="text-lg">
              The first time an advertiser offered me a $5 CPM for a banner ad
              on my blog, I had no idea what that meant. I smiled, nodded, and
              immediately Googled it in the bathroom.
            </p>

            <p>
              Turns out, it’s incredibly simple. But if you’re running ads or
              trying to monetize a website, misunderstanding CPM can cost you
              real money.
            </p>

            <p>
              Let’s break down exactly what CPM is, the formula to calculate it,
              and two real-world examples so you never have to fake it in a
              meeting again.
            </p>

            {/* What is CPM */}
            <h2
              id="what-is-cpm"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-emerald-600">01.</span> What is CPM?
            </h2>

            <p>
              CPM stands for <strong>Cost Per Mille</strong>.
            </p>

            <p>
              Mille is just the Latin word for thousand. So CPM literally
              translates to "Cost Per Thousand." It tells you how much you pay
              (or earn) for every 1,000 times an ad is shown.
            </p>

            <p>
              Notice I said <em>shown</em>, not clicked. CPM is all about
              impressions. Whether someone clicks the ad or ignores it
              completely, the impression still counts. That’s what makes it
              different from CPC (Cost Per Click).
            </p>

            {/* The Formula */}
            <h2
              id="the-formula"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-emerald-600">02.</span> The CPM Formula
            </h2>

            <div className="bg-gray-900 text-white rounded-2xl p-6 my-6 text-center">
              <p className="text-sm text-gray-400 mb-2 font-medium">
                THE FORMULA
              </p>
              <p className="text-2xl md:text-3xl font-extrabold font-mono tracking-wide">
                CPM = (Total Cost ÷ Total Impressions) × 1,000
              </p>
            </div>

            <p>
              That’s it. You take the total amount of money spent, divide it by
              the total number of impressions, and multiply by 1,000 to get a
              clean dollar amount.
            </p>

            <p>
              Let’s look at how this works in real life from both sides of the
              table.
            </p>

            {/* Advertiser Example */}
            <h2
              id="advertiser-example"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-emerald-600">03.</span> Example 1: You Are
              Buying Ads
            </h2>

            <p>
              Let’s say you run a Facebook ad campaign to promote your new SaaS
              tool. You set a budget of $500. At the end of the week, the ad was
              displayed 125,000 times.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-emerald-800 mb-3">
                🧮 The Math:
              </p>
              <ul className="text-sm text-emerald-700 space-y-1 font-mono">
                <li>• Total Cost: $500</li>
                <li>• Total Impressions: 125,000</li>
                <li>• CPM = ($500 ÷ 125,000) × 1,000</li>
                <li>• CPM = 0.004 × 1,000</li>
                <li className="font-bold text-emerald-900 text-base mt-2">
                  • Final CPM = $4.00
                </li>
              </ul>
            </div>

            <p>
              You are paying $4 for every 1,000 times your ad shows up in
              someone’s feed. For the software industry, a $4 CPM is actually
              pretty solid. If you were targeting lawyers or real estate agents,
              that same $4 CPM would be an absolute steal.
            </p>

            {/* Publisher Example */}
            <h2
              id="publisher-example"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-emerald-600">04.</span> Example 2: You Are
              Selling Ads
            </h2>

            <p>
              Now let’s flip it. You own a niche newsletter with 20,000
              subscribers. A company wants to sponsor your email and offers you
              $150 for one blast.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-emerald-800 mb-3">
                🧮 The Math:
              </p>
              <ul className="text-sm text-emerald-700 space-y-1 font-mono">
                <li>• Total Cost: $150</li>
                <li>• Total Impressions: 20,000</li>
                <li>• CPM = ($150 ÷ 20,000) × 1,000</li>
                <li>• CPM = 0.0075 × 1,000</li>
                <li className="font-bold text-emerald-900 text-base mt-2">
                  • Final CPM = $7.50
                </li>
              </ul>
            </div>

            <p>
              You are earning $7.50 per thousand impressions. Knowing this
              number is powerful. If another sponsor comes along and offers $100
              for the same spot, you can instantly calculate that their CPM is
              only $5. You can confidently push back and ask for more money
              because you know your inventory is worth $7.50.
            </p>

            {/* Why it matters */}
            <h2
              id="why-it-matters"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-emerald-600">05.</span> Why CPM is the Great
              Equalizer
            </h2>

            <p>Without CPM, comparing ad deals is impossible.</p>

            <p>
              If Site A charges $100 for an ad and Site B charges $500, Site B
              sounds way more expensive. But what if Site A has 500,000 monthly
              views and Site B only has 20,000?
            </p>

            <p>
              Site A’s CPM is $0.20. Site B’s CPM is $25.00. Site A is actually
              125 times more expensive relative to the audience size. CPM gives
              you an apples-to-apples way to compare completely different
              platforms and deals.
            </p>

            <p className="text-lg font-semibold text-gray-900 mt-8">
              Next time someone throws a CPM number at you, you won’t need to
              hide in the bathroom. Just run the formula, figure out if it makes
              sense for your niche, and make the call.
            </p>

            {/* ── FAQ ── */}
            <h2
              id="faq"
              className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20"
            >
              <span className="text-emerald-600">06.</span> Frequently Asked
              Questions
            </h2>

            <div className="space-y-4 my-6">
              <FAQItem
                question="What is a good CPM?"
                answer="It completely depends on your industry. A 'good' CPM for a cheap e-commerce product might be $2, while a good CPM for B2B software targeting CEOs might be $50+. Generally, lower is better if you're buying, and higher is better if you're selling."
              />
              <FAQItem
                question="Is CPM the same as RPM?"
                answer="No. CPM (Cost Per Mille) is what advertisers pay. RPM (Revenue Per Mille) is what publishers earn. They are often different because ad networks like Google AdSense take a cut. You might have a $5 CPM but only a $3.50 RPM."
              />
              <FAQItem
                question="Should I use CPM or CPC?"
                answer="Use CPM when your goal is brand awareness—getting your name in front of as many eyeballs as possible. Use CPC (Cost Per Click) when your goal is direct response, like getting people to sign up for a free trial or buy a product."
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
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      {rp.category}
                    </span>
                    <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mt-2 mb-1">
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
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft size={14} /> Back to all articles
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostCpmFormula;
