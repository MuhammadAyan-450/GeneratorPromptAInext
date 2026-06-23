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
  id: 10,
  slug: "how-to-generate-xml-sitemap-free",
  title: "How to Generate XML Sitemap Free (3 Easy Methods)",
  excerpt:
    "Stop overcomplicating XML sitemaps. Here are three completely free ways to generate a sitemap in under 5 minutes, no coding required.",
  category: "SEO",
  tag: "Sitemap",
  readTime: 5,
  date: "May 12, 2026",
  dateISO: "2026-05-12",
  featured: false,
  color: "from-cyan-500 to-blue-600",
  emoji: "🗺️",
  views: "4.2K",
};

const TOC_ITEMS = [
  { id: "method-1", label: "Method 1: Online Generator" },
  { id: "method-2", label: "Method 2: CMS Automatic" },
  { id: "method-3", label: "Method 3: Next.js Sitemaps" },
  { id: "tell-google", label: "Tell Google" },
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

const BlogPostXmlSitemap = () => {
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
      id: 8,
      slug: "cpm-vs-cpc-explained",
      title:
        "CPM vs CPC Explained: Which Ad Pricing Model Actually Saves You Money in 2026?",
      category: "Digital Marketing", // Changed
      tag: "Ad Strategy",
      readTime: 10,
      date: "May 16, 2026",
      color: "from-emerald-500 to-teal-600",
      emoji: "⚖️",
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
            Generate XML Sitemap
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

            <div className="mt-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-5 text-white">
              <p className="text-sm font-bold mb-1">Free AI Text Humanizer</p>
              <p className="text-xs text-cyan-100 mb-3">
                Make any AI text sound naturally human-written.
              </p>
              <Link
                href="/tools/ai-text-humanizer"
                className="block text-center py-2 bg-white text-cyan-700 text-xs font-semibold rounded-lg hover:bg-cyan-50 transition-colors"
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
              How to Generate XML Sitemap Free:{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                3 Easy Methods
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
              I spent an embarrassing amount of time dreading XML sitemaps.
            </p>

            <p>
              Early in my blogging journey, I treated them like some advanced
              developer tool. I’d read SEO guides saying{" "}
              <em>“submit your sitemap to Google”</em> and immediately feel
              overwhelmed.
            </p>

            <p>I was totally wrong.</p>

            <p>
              Generating an XML sitemap is incredibly simple now. You don't need
              to write a single line of code. You don't even need to touch your
              website's backend.
            </p>

            <p>
              Here are the three easiest ways I’ve found to generate an XML
              sitemap for free, depending on how your site is built.
            </p>

            {/* Method 1 */}
            <h2
              id="method-1"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-blue-600">01.</span> Method 1: The 10-Second
              Online Generator
            </h2>

            <p>
              If you have a small static site, a portfolio, or a simple brochure
              website, just use a free online tool.
            </p>

            <p>
              My go-to is{" "}
              <a
                href="https://www.xml-sitemaps.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline font-medium"
              >
                XML-Sitemaps.com
              </a>
              .
            </p>

            <p>
              You literally just type your homepage URL into the box, hit start,
              and wait about thirty seconds. It crawls your links, organizes
              them by priority, and spits out a ready-to-download XML file.
            </p>

            <p>
              You just save that file, upload it to your website’s root folder
              (so it lives at{" "}
              <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm">
                yourdomain.com/sitemap.xml
              </code>
              ), and you’re done.
            </p>

            <p>
              I used this exact method for my first client site. The whole thing
              took less than five minutes, including the time it took to upload
              the file via FTP.
            </p>

            {/* Method 2 */}
            <h2
              id="method-2"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-blue-600">02.</span> Method 2: Let Your CMS
              Do It Automatically
            </h2>

            <p>This is how 90% of people should handle it.</p>

            <p>
              If you use WordPress, Shopify, Wix, or Squarespace, you already
              have a sitemap. You just don't know it yet.
            </p>

            <p>
              These platforms generate and update your sitemap automatically
              every time you publish or delete a page.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-blue-800 mb-2">
                💡 WordPress Example
              </p>
              <p className="text-sm text-blue-700">
                On WordPress, installing a free SEO plugin like Rank Math or
                Yoast creates one instantly. You don't even have to click a
                button. Just install the plugin, go to{" "}
                <code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs">
                  yourdomain.com/sitemap_index.xml
                </code>
                , and watch the magic happen.
              </p>
            </div>

            <p>
              Shopify is the same way. Your sitemap lives at{" "}
              <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm">
                yourdomain.com/sitemap.xml
              </code>{" "}
              right out of the box.
            </p>

            <p>
              When I moved my blog to WordPress, I spent two hours looking for a
              sitemap generator before realizing Rank Math had already made one
              for me. Don't be like me. Check your platform first.
            </p>

            {/* Method 3 */}
            <h2
              id="method-3"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-blue-600">03.</span> Method 3: Next.js
              Dynamic Sitemaps
            </h2>

            <p>
              Since I build a lot of sites with Next.js now, I use their
              built-in sitemap function. It’s completely free and handles
              everything dynamically.
            </p>

            <p>
              You just create a file called{" "}
              <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm">
                sitemap.ts
              </code>{" "}
              inside your{" "}
              <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm">
                app
              </code>{" "}
              folder.
            </p>

            <p>
              You write a quick async function that fetches all your blog posts
              or product pages. You map through that data to return an array of
              URLs with their last modified dates.
            </p>

            <p>
              Next.js automatically turns that into perfect XML and serves it at{" "}
              <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm">
                /sitemap.xml
              </code>
              .
            </p>

            <p>
              The best part? It updates itself. When I publish a new blog post,
              the sitemap instantly includes it without me running any scripts
              or rebuilding anything.
            </p>

            {/* Tell Google */}
            <h2
              id="tell-google"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-blue-600">04.</span> The Last Step: Tell
              Google
            </h2>

            <p>
              Generating the file is only half the battle. You need to hand it
              over to Google.
            </p>

            <p>
              Go to Google Search Console. If you don't have an account, verify
              your domain (which takes two minutes using your DNS provider).
            </p>

            <p>
              Once you're in, look for <strong>"Sitemaps"</strong> in the left
              sidebar. Paste your sitemap URL into the box and hit submit.
            </p>

            <p>
              Google won't rank you higher just because you have a sitemap. But
              it guarantees Google actually finds your pages. Without one,
              Google relies entirely on following links to discover your
              content, which can take weeks for newer sites.
            </p>

            <p>
              With a sitemap submitted, I usually see Google index my new blog
              posts within 24 to 48 hours.
            </p>

            <p className="text-lg font-semibold text-gray-900 mt-8">
              Stop overthinking it. Pick the method that matches your setup,
              grab your free sitemap, and submit it to Search Console. Your
              future self will thank you.
            </p>

            {/* ── FAQ ── */}
            <h2
              id="faq"
              className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20"
            >
              <span className="text-blue-600">05.</span> Frequently Asked
              Questions
            </h2>

            <div className="space-y-4 my-6">
              <FAQItem
                question="Do I really need an XML sitemap?"
                answer="If your site is small (under 100 pages) and all pages are linked internally, Google can probably find them without a sitemap. However, having one is still best practice because it tells Google exactly when pages were last updated, speeding up the indexing process."
              />
              <FAQItem
                question="How often should I update my XML sitemap?"
                answer="If you are using a CMS like WordPress or a framework like Next.js, it updates automatically every time you publish or edit a post. If you used a static online generator, you should regenerate and re-upload it whenever you add a new page or blog post."
              />
              <FAQItem
                question="Where do I submit my sitemap URL?"
                answer="You should submit it to Google Search Console (under the 'Sitemaps' tab) and Bing Webmaster Tools. Most other search engines (like DuckDuckGo) rely on Bing's index anyway."
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

export default BlogPostXmlSitemap;
