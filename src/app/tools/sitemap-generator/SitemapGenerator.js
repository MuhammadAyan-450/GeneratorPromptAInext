"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Download,
  Eraser,
  Code,
  Map,
  Home,
  ChevronDown,
  Zap,
  Shield,
  HelpCircle,
  CheckCircle2,
  FileText,
  Globe,
  RefreshCw,
} from "lucide-react";

// ─── Helper Functions (Outside Component) ─────────────────────────────────────
const escapeXml = (unsafe) => {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
};

const buildSitemapXml = (urls, baseUrl, lastmod, changefreq, priority) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  urls.forEach((line) => {
    let fullUrl = line;
    if (!line.startsWith("http")) {
      fullUrl =
        baseUrl.replace(/\/$/, "") + (line.startsWith("/") ? "" : "/") + line;
    }
    try {
      new URL(fullUrl);
      xml += `  <url>\n`;
      xml += `    <loc>${escapeXml(fullUrl)}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>${changefreq}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;
      xml += `  </url>\n`;
    } catch {
      // skip invalid URLs silently
    }
  });
  xml += `</urlset>`;
  return xml;
};

// ─── FAQ Data (Sync with page.js JSON-LD) ─────────────────────────────────────
const FAQS = [
  {
    q: "How to generate XML sitemap from URL?",
    a: "Paste your website URLs (full or relative paths like /about) into our tool, set your base URL, choose changefreq and priority, and the XML sitemap generates automatically. Download the sitemap.xml file and upload it to your website root.",
  },
  {
    q: "How to create a sitemap.xml file for free?",
    a: "Use our free XML Sitemap Generator tool. Enter your URLs, configure settings, and download a ready-to-use sitemap.xml file instantly. No signup, no software install, and no limits.",
  },
  {
    q: "What is an XML sitemap and why do I need one?",
    a: "An XML sitemap is a file that lists all important pages of your website in XML format. Search engines like Google and Bing use it to discover and crawl your pages faster. It is especially important for new websites or sites with many pages.",
  },
  {
    q: "Where do I put the sitemap.xml file?",
    a: "The sitemap.xml file must be uploaded to the root directory of your website. For example, if your domain is www.example.com, the sitemap should be accessible at www.example.com/sitemap.xml. You should also submit it in Google Search Console.",
  },
  {
    q: "What does changefreq and priority mean in sitemap.xml?",
    a: "Changefreq tells search engines how often the page content is likely to change (e.g., daily, weekly, monthly). Priority indicates the relative importance of the page compared to other pages on your site, from 0.1 (lowest) to 1.0 (highest). Homepage typically gets 1.0.",
  },
  {
    q: "Can I generate sitemap XML from multiple URLs at once?",
    a: "Yes, our tool supports bulk sitemap generation. Paste multiple URLs or relative paths (one per line), and it will automatically remove duplicates and generate a valid sitemap.xml with all your URLs.",
  },
];

// ─── Related Tools (6 Items from your tools array) ────────────────────────────
const RELATED_TOOLS = [
  {
    href: "/tools/fake-data-generator",
    title: "Fake Data Generator",
    desc: "Generate realistic dummy data for testing your sitemaps or APIs – names, emails, addresses.",
  },
  {
    href: "/tools/json-formatter",
    title: "JSON Formatter & Validator",
    desc: "Beautify, minify and validate JSON structures for web development and API testing.",
  },
  {
    href: "/tools/word-counter",
    title: "Word Counter",
    desc: "Analyze text length, keyword density and reading time for SEO optimization.",
  },
  {
    href: "/tools/seo-meta-tags-generator",
    title: "SEO Meta Tags Generator",
    desc: "Create optimized meta titles, descriptions, and Open Graph tags with live preview.",
  },
  {
    href: "/tools/serp-snippet-preview",
    title: "SERP Snippet Preview",
    desc: "Preview how your page appears in Google search results before publishing.",
  },
  {
    href: "/tools/url-encoder",
    title: "URL Encoder",
    desc: "Encode special characters in URLs for safe web use.",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const SitemapGenerator = () => {
  const [urlsInput, setUrlsInput] = useState("");
  const [baseUrl, setBaseUrl] = useState("https://www.yourwebsite.com");
  const [defaultFreq, setDefaultFreq] = useState("weekly");
  const [defaultPriority, setDefaultPriority] = useState("0.8");
  const [generatedSitemap, setGeneratedSitemap] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [lastmodDate, setLastmodDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [openFaq, setOpenFaq] = useState(null);

  const frequencies = [
    "always",
    "hourly",
    "daily",
    "weekly",
    "monthly",
    "yearly",
    "never",
  ];

  const generateSitemap = useCallback(() => {
    let currentError = "";
    let xmlOutput = "";

    const lines = urlsInput
      .trim()
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"));

    if (lines.length === 0) {
      currentError = "Please enter at least one valid URL or path";
    } else if (
      !baseUrl.startsWith("http://") &&
      !baseUrl.startsWith("https://")
    ) {
      currentError = "Base URL must start with http:// or https://";
    } else {
      const uniqueUrls = [...new Set(lines)];
      xmlOutput = buildSitemapXml(
        uniqueUrls,
        baseUrl,
        lastmodDate,
        defaultFreq,
        defaultPriority,
      );
    }

    setError(currentError);
    setGeneratedSitemap(xmlOutput);
  }, [urlsInput, baseUrl, defaultFreq, defaultPriority, lastmodDate]);

  useEffect(() => {
    if (urlsInput.trim()) {
      generateSitemap();
    } else {
      setGeneratedSitemap("");
      setError("");
    }
  }, [generateSitemap, urlsInput.trim()]);

  const copySitemap = () => {
    if (!generatedSitemap) return;
    navigator.clipboard.writeText(generatedSitemap);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const downloadSitemap = () => {
    if (!generatedSitemap) return;
    const blob = new Blob([generatedSitemap], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sitemap.xml";
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetAll = () => {
    setUrlsInput("");
    setGeneratedSitemap("");
    setError("");
    setCopied(false);
  };

  const stats = generatedSitemap
    ? [
        {
          icon: Code,
          label: "URLs Processed",
          value: urlsInput.trim().split("\n").filter(Boolean).length,
          color: "text-gray-800",
        },
        {
          icon: CheckCircle2,
          label: "Valid Entries",
          value: generatedSitemap.split("<url>").length - 1,
          color: "text-emerald-600",
        },
        {
          icon: FileText,
          label: "File Size",
          value: `${Math.round(generatedSitemap.length / 1024)}KB`,
          color: "text-gray-800",
        },
        {
          icon: Shield,
          label: "Privacy",
          value: "100% Local",
          color: "text-emerald-600",
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Breadcrumb ── */}
      <div className="max-w-6xl mx-auto w-full px-4 pt-6">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 hover:text-sky-600 transition-colors"
              >
                <Home size={14} /> Home
              </Link>
            </li>
            <li>
              <span className="text-gray-300">/</span>
            </li>
            <li>
              <Link
                href="/pages/all-tools"
                className="hover:text-sky-600 transition-colors"
              >
                All Tools
              </Link>
            </li>
            <li>
              <span className="text-gray-300">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-semibold">
                XML Sitemap Generator
              </span>
            </li>
          </ol>
        </nav>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-sky-600 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>

      <div className="flex-grow max-w-6xl mx-auto w-full px-4 pb-20">
        {/* ── Hero ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-100 mb-4">
            <Map className="text-orange-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Generate XML Sitemap from URL{" "}
            <span className="text-sky-600">Free</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Create <strong>sitemap.xml</strong> instantly from your URLs. Set
            changefreq &amp; priority, download Google-ready XML sitemap – no
            signup, no limits.
          </p>
        </div>

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-12">
          <div className="p-6 md:p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left – Inputs */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Base URL (for relative paths)
                  </label>
                  <input
                    type="url"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    placeholder="https://www.yourwebsite.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    URLs (one per line – full or relative paths)
                  </label>
                  <textarea
                    value={urlsInput}
                    onChange={(e) => setUrlsInput(e.target.value)}
                    placeholder="/&#10;/about&#10;/blog/my-first-post&#10;/contact&#10;https://www.another-site.com/page"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent min-h-[200px] font-mono text-sm resize-y text-gray-800"
                  />
                  {error && (
                    <p className="mt-2 text-red-600 text-sm font-medium">
                      {error}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Change Frequency
                    </label>
                    <select
                      value={defaultFreq}
                      onChange={(e) => setDefaultFreq(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 bg-white"
                    >
                      {frequencies.map((freq) => (
                        <option key={freq} value={freq}>
                          {freq.charAt(0).toUpperCase() + freq.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Priority (0.0 – 1.0)
                    </label>
                    <input
                      type="number"
                      value={defaultPriority}
                      onChange={(e) => setDefaultPriority(e.target.value)}
                      min="0"
                      max="1"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Lastmod Date (YYYY-MM-DD)
                  </label>
                  <input
                    type="date"
                    value={lastmodDate}
                    onChange={(e) => setLastmodDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={generateSitemap}
                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Zap size={20} />
                    Generate Sitemap
                  </button>
                  <button
                    onClick={resetAll}
                    disabled={!urlsInput}
                    className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition font-medium flex items-center justify-center gap-2 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Eraser size={18} />
                    Clear
                  </button>
                </div>
              </div>

              {/* Right – Result */}
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">
                  Generated XML Sitemap
                </h3>

                {generatedSitemap ? (
                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden flex flex-col">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 border-b border-gray-200 bg-white">
                      {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                          <div className="flex justify-center text-sky-500 mb-1">
                            <stat.icon size={16} />
                          </div>
                          <p className={`text-sm font-bold ${stat.color}`}>
                            {stat.value}
                          </p>
                          <p className="text-xs text-gray-500">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 border-b border-gray-200 bg-white">
                      <span className="font-medium text-gray-800 text-sm">
                        sitemap.xml (
                        {urlsInput.trim().split("\n").filter(Boolean).length}{" "}
                        URLs)
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={copySitemap}
                          className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition text-sm font-medium text-gray-700"
                        >
                          <Copy size={14} />
                          {copied ? "Copied!" : "Copy"}
                        </button>
                        <button
                          onClick={downloadSitemap}
                          className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 rounded-lg transition text-sm font-medium"
                        >
                          <Download size={14} />
                          .xml
                        </button>
                      </div>
                    </div>

                    <pre className="p-5 flex-1 max-h-[500px] overflow-auto font-mono text-sm bg-gray-900 text-green-300 whitespace-pre-wrap leading-relaxed m-0">
                      {generatedSitemap}
                    </pre>
                  </div>
                ) : (
                  <div className="flex-1 h-full min-h-[300px] flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500">
                    <Code size={40} className="mb-3 opacity-30" />
                    <p className="text-sm text-center px-6">
                      Enter URLs on the left to auto-generate your sitemap
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── How to Use ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Generate Sitemap XML from URLs in 5 Steps
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Input Website Base URL",
                desc: "To make sure that all relative URLs are converted into absolute URLs, enter your site base URL (e.g., https://www.yourwebsite.com).",
              },
              {
                step: "2",
                title: "Enter URLs/Pages",
                desc: "Input your full URLs or relative paths (/about, /blog/post-1, etc.), one URL/path per line, in the provided text box.",
              },
              {
                step: "3",
                title: "Select Settings",
                desc: "Select page update frequency (daily, weekly, monthly) and priority (from 0.1 to 1.0).",
              },
              {
                step: "4",
                title: "Create XML Automatically",
                desc: "Once you have selected settings and input URLs, the sitemap will be generated automatically without any action on your part.",
              },
              {
                step: "5",
                title: "Download & Submit",
                desc: 'Click "Download .xml" to receive your XML file, which can then be uploaded to your website root and Google Webmaster Tools.',
              },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="w-8 h-8 bg-sky-100 text-sky-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">
                    {item.title}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── How It Works ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How XML Sitemap Generation Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Simple logic, valid output. Here's what happens behind the scenes.
          </p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Zap size={16} className="text-sky-600" />
                URL Validation & Deduplication
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                [...new Set(lines)] → unique URLs only
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                We parse your input, remove duplicates using JavaScript Set, and
                validate each URL using the native URL constructor. Invalid
                entries are silently skipped to ensure a clean, valid sitemap.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Code size={16} className="text-sky-600" />
                XML Escaping & Structure
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                escapeXml() → &lt; &gt; &amp; &apos; &quot;
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Special characters in URLs are escaped to valid XML entities.
                Each URL is wrapped in &lt;url&gt; tags with loc, lastmod,
                changefreq, and priority elements per the sitemaps.org schema.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2 flex items-center gap-2">
                <Shield size={16} className="text-sky-600" />
                Privacy Note
              </h3>
              <p className="text-sky-800 text-xs leading-relaxed">
                All sitemap generation happens locally in your browser. No URLs
                or website data are ever sent to any server. 100% private.
              </p>
            </div>
          </div>
        </section>

        {/* ── Sample Results ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Real Example: Blog Sitemap XML
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            See how the generated XML looks in practice.
          </p>

          <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Input
                </p>
                <p className="font-mono text-xs text-gray-800">
                  /&#10;/about&#10;/blog/post-1&#10;/blog/post-2&#10;/contact
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Output (snippet)
                </p>
                <p className="font-mono text-xs text-gray-800 break-all">
                  &lt;url&gt;&#10;
                  &lt;loc&gt;https://www.yoursite.com/blog/post-1&lt;/loc&gt;&#10;
                  &lt;lastmod&gt;2026-01-15&lt;/lastmod&gt;&#10;
                  &lt;changefreq&gt;weekly&lt;/changefreq&gt;&#10;
                  &lt;priority&gt;0.8&lt;/priority&gt;&#10;&lt;/url&gt;
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Result: Valid XML with proper escaping, unique URLs, and
              Google-ready structure. Ready to upload to your website root.
            </p>
          </div>
        </section>

        {/* ── Use Cases ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses XML Sitemap Generators?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            From developers to marketers – sitemaps work for everyone who wants
            to be indexed quickly.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Zap size={20} className="text-sky-600" />,
                title: "Web Developers",
                desc: "Generate a sitemap for a new site or modify an existing one without manually editing XML – simply enter URLs and download.",
              },
              {
                icon: <Map size={20} className="text-sky-600" />,
                title: "SEO Experts",
                desc: "Make sure that all necessary pages are included in the sitemap.xml file in order to index them by Google faster.",
              },
              {
                icon: <Globe size={20} className="text-sky-600" />,
                title: "Small Businesses Owners",
                desc: "Generate a sitemap for your local business site quickly – no programming knowledge or installation needed.",
              },
              {
                icon: <HelpCircle size={20} className="text-sky-600" />,
                title: "Content Creators",
                desc: "Manage your blog or portfolio sitemap as you create new pages – submit to Google Search Console immediately.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl p-5 hover:border-sky-200 transition-colors"
              >
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEO Content ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Does XML Sitemap Help With SEO In 2026
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Instantly generate a valid <strong>XML sitemap</strong> from your website links. For
            both creating sitemap.xml for new websites or updating current ones,
            you can use this <strong>XML sitemap generator</strong>  that only requires you to
            provide your URLs in absolute or relative formats and then set
            changefreq and priority for them. After that, simply download your
            Google Search Console-friendly XML sitemap.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The XML sitemap generation tool works entirely within your browser.
            All of your website URLs will be kept completely private and never
            transferred anywhere else. It even deletes duplicates from your list
            and ignores invalid URLs.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Fast and private — all processing happens on your computer. Your
            URLs are not uploaded anywhere.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Privacy Note
          </h3>
          <p className="text-gray-600 leading-relaxed">
            This tool processes your URLs entirely within your browser using
            JavaScript. No URLs or any other website information gets uploaded
            anywhere, and no tracking is done whatsoever.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need more SEO tools? Try the{" "}
            <Link
              href="/tools/seo-meta-tags-generator"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              SEO Meta Tags Generator
            </Link>{" "}
            for tag creation, or the{" "}
            <Link
              href="/tools/serp-snippet-preview"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              SERP Snippet Preview
            </Link>{" "}
            for visual testing.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {FAQS.map((item, i) => (
              <div
                key={i}
                className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-sky-200 transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={openFaq === i}
                >
                  <h3 className="text-sm md:text-base font-bold text-gray-900 pr-4">
                    {item.q}
                  </h3>
                  <ChevronDown
                    size={22}
                    className={`text-sky-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related Tools ── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related Free Developer &amp; SEO Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RELATED_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-sky-400 transition-all"
              >
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-sky-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {tool.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SitemapGenerator;
