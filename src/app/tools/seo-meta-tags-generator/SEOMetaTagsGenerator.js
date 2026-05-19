"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, RefreshCw, Search, Home, ChevronDown, Share2, MessageSquare } from "lucide-react";

const SEOMetaTagsGenerator = () => {
  const [formData, setFormData] = useState({
    pageTitle: "",
    pageDescription: "",
    pageKeywords: "",
    pageUrl: "",
    siteName: "",
    author: "",
  });
  const [generatedTags, setGeneratedTags] = useState(null);
  const [activePreview, setActivePreview] = useState("google");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [errors, setErrors] = useState({});

  const titleLength = formData.pageTitle.length;
  const descLength = formData.pageDescription.length;
  const titlePixels = Math.ceil(titleLength * 0.6);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const generateMetaTags = () => {
    const newErrors = {};
    if (!formData.pageTitle.trim()) newErrors.pageTitle = "Page title is required";
    if (!formData.pageDescription.trim()) newErrors.pageDescription = "Description is required";
    if (formData.pageUrl && !formData.pageUrl.startsWith("http")) {
      newErrors.pageUrl = "URL should start with http:// or https://";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const optimizedTitle = formData.pageTitle.trim().slice(0, 60);
    const optimizedDesc = formData.pageDescription.trim().slice(0, 160);
    const keywordsArray = formData.pageKeywords
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k)
      .slice(0, 10);

    setGeneratedTags({
      title: optimizedTitle,
      description: optimizedDesc,
      keywords: keywordsArray.join(", "),
      canonical: formData.pageUrl || "",
      robots: "index, follow",
      ogTitle: optimizedTitle,
      ogDescription: optimizedDesc,
      ogType: "website",
      ogUrl: formData.pageUrl || "",
      ogSiteName: formData.siteName || "GeneratorPromptAI",
      twitterCard: "summary_large_image",
      twitterTitle: optimizedTitle,
      twitterDescription: optimizedDesc,
      author: formData.author || "",
    });
  };

  const copyToClipboard = () => {
    if (!generatedTags) return;
    const htmlOutput = `<!-- Primary Meta Tags -->
<title>${generatedTags.title}</title>
<meta name="title" content="${generatedTags.title}" />
<meta name="description" content="${generatedTags.description}" />
<meta name="keywords" content="${generatedTags.keywords}" />
<meta name="author" content="${generatedTags.author}" />
<meta name="robots" content="${generatedTags.robots}" />
<link rel="canonical" href="${generatedTags.canonical}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="${generatedTags.ogType}" />
<meta property="og:url" content="${generatedTags.ogUrl}" />
<meta property="og:title" content="${generatedTags.ogTitle}" />
<meta property="og:description" content="${generatedTags.ogDescription}" />
<meta property="og:site_name" content="${generatedTags.ogSiteName}" />

<!-- Twitter -->
<meta property="twitter:card" content="${generatedTags.twitterCard}" />
<meta property="twitter:url" content="${generatedTags.ogUrl}" />
<meta property="twitter:title" content="${generatedTags.twitterTitle}" />
<meta property="twitter:description" content="${generatedTags.twitterDescription}" />`;

    navigator.clipboard.writeText(htmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setFormData({
      pageTitle: "",
      pageDescription: "",
      pageKeywords: "",
      pageUrl: "",
      siteName: "",
      author: "",
    });
    setGeneratedTags(null);
    setErrors({});
    setCopied(false);
  };

  const getTitleStatus = () => {
    if (titleLength === 0) return { color: "text-gray-400", text: "Start typing..." };
    if (titleLength <= 50) return { color: "text-emerald-600", text: "Perfect length ✓" };
    if (titleLength <= 60) return { color: "text-amber-600", text: "Good, but keep it short" };
    return { color: "text-red-600", text: "Too long — may get cut off" };
  };

  const getDescStatus = () => {
    if (descLength === 0) return { color: "text-gray-400", text: "Add a compelling description..." };
    if (descLength <= 120) return { color: "text-amber-600", text: "Good, but you can add more" };
    if (descLength <= 160) return { color: "text-emerald-600", text: "Perfect length ✓" };
    return { color: "text-red-600", text: "Too long — may get truncated" };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto w-full px-4 pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="inline-flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                <Home size={14} /> Home
              </Link>
            </li>
            <li><span className="text-gray-300">/</span></li>
            <li>
              <Link href="/pages/all-tools" className="hover:text-indigo-600 transition-colors">All Tools</Link>
            </li>
            <li><span className="text-gray-300">/</span></li>
            <li><span className="text-gray-900 font-semibold">SEO Meta Tags Generator</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-5xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-100 mb-4">
            <Search className="text-indigo-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Generate <span className="text-indigo-600">SEO Meta Tags</span> That Actually Get Clicks
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Create optimized <strong>meta titles, descriptions, and Open Graph tags</strong> with live SERP preview. 
            Free, no signup, and works instantly in your browser.
          </p>
        </div>

        {/* Generator Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          {/* Input Grid */}
          <div className="grid md:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Page Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pageTitle"
                value={formData.pageTitle}
                onChange={handleInputChange}
                placeholder="e.g., Best Running Shoes for Marathon Training in 2026"
                maxLength={70}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 ${errors.pageTitle ? "border-red-300" : "border-gray-300"}`}
              />
              <div className="flex justify-between mt-1.5 text-xs">
                <span className={getTitleStatus().color}>{titleLength}/60 chars</span>
                <span className="text-gray-400">~{titlePixels}/600 px</span>
              </div>
              {errors.pageTitle && <p className="text-red-500 text-xs mt-1">{errors.pageTitle}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Page URL (Optional)</label>
              <input
                type="url"
                name="pageUrl"
                value={formData.pageUrl}
                onChange={handleInputChange}
                placeholder="https://yoursite.com/your-page"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 ${errors.pageUrl ? "border-red-300" : "border-gray-300"}`}
              />
              {errors.pageUrl && <p className="text-red-500 text-xs mt-1">{errors.pageUrl}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Meta Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="pageDescription"
                value={formData.pageDescription}
                onChange={handleInputChange}
                placeholder="Write a compelling summary that makes people want to click..."
                rows={4}
                maxLength={200}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 resize-none ${errors.pageDescription ? "border-red-300" : "border-gray-300"}`}
              />
              <div className="flex justify-between mt-1.5 text-xs">
                <span className={getDescStatus().color}>{descLength}/160 chars</span>
                <span className="text-gray-400">Keep it under 160 for full display</span>
              </div>
              {errors.pageDescription && <p className="text-red-500 text-xs mt-1">{errors.pageDescription}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Keywords (Optional)</label>
              <input
                type="text"
                name="pageKeywords"
                value={formData.pageKeywords}
                onChange={handleInputChange}
                placeholder="seo, meta tags, google ranking"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Site Name / Author</label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) => setFormData(prev => ({ ...prev, siteName: e.target.value, author: e.target.value }))}
                placeholder="YourBrand or Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button onClick={generateMetaTags} className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all text-white font-semibold px-8 py-3 rounded-xl">
              Generate Meta Tags
            </button>
            <button onClick={resetForm} className="inline-flex items-center gap-2 px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors">
              <RefreshCw size={15} /> Reset
            </button>
          </div>

          {/* Live Preview Tabs */}
          {generatedTags && (
            <>
              <div className="flex gap-2 mb-4 border-b border-gray-200">
                {[
                  { id: "google", label: "Google Preview", icon: <Search size={16} /> },
                  { id: "facebook", label: "Social/OG", icon: <Share2 size={16} /> },
                  { id: "twitter", label: "Twitter/X", icon: <MessageSquare size={16} /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePreview(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                      activePreview === tab.id ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {/* Preview Box */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
                {activePreview === "google" && (
                  <div className="max-w-2xl">
                    <p className="text-xs text-gray-400 mb-2">SERP Preview</p>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">{formData.pageUrl || "yoursite.com"}</p>
                      <h3 className="text-lg font-semibold text-sky-700 hover:underline cursor-pointer mb-1">
                        {generatedTags.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{generatedTags.description}</p>
                    </div>
                  </div>
                )}
                {activePreview === "facebook" && (
                  <div className="max-w-md">
                    <p className="text-xs text-gray-400 mb-2">Open Graph Preview</p>
                    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                      <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 text-sm">[OG Image]</div>
                      <div className="p-4">
                        <p className="text-xs text-gray-500 uppercase mb-1">{formData.pageUrl?.replace("https://", "") || "yoursite.com"}</p>
                        <h3 className="font-semibold text-gray-900 mb-1">{generatedTags.ogTitle}</h3>
                        <p className="text-sm text-gray-600">{generatedTags.ogDescription}</p>
                      </div>
                    </div>
                  </div>
                )}
                {activePreview === "twitter" && (
                  <div className="max-w-md">
                    <p className="text-xs text-gray-400 mb-2">Twitter Card Preview</p>
                    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                      <div className="h-40 bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center text-gray-400 text-sm">[Twitter Image]</div>
                      <div className="p-4">
                        <p className="text-xs text-gray-500 mb-1">{formData.pageUrl?.replace("https://", "") || "yoursite.com"}</p>
                        <h3 className="font-semibold text-gray-900 mb-1">{generatedTags.twitterTitle}</h3>
                        <p className="text-sm text-gray-600">{generatedTags.twitterDescription}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Generated Code */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">Your Generated HTML Code</h4>
                  <button onClick={copyToClipboard} className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-sm font-medium text-indigo-700 transition-colors">
                    <Copy size={14} /> {copied ? "Copied!" : "Copy Code"}
                  </button>
                </div>
                <pre className="bg-gray-900 text-gray-100 text-xs md:text-sm p-4 rounded-xl overflow-x-auto max-h-80">
                  {`<!-- Primary Meta Tags -->
<title>${generatedTags.title}</title>
<meta name="description" content="${generatedTags.description}" />
<meta name="keywords" content="${generatedTags.keywords}" />
<meta name="robots" content="${generatedTags.robots}" />
<link rel="canonical" href="${generatedTags.canonical}" />

<!-- Open Graph -->
<meta property="og:title" content="${generatedTags.ogTitle}" />
<meta property="og:description" content="${generatedTags.ogDescription}" />
<meta property="og:type" content="${generatedTags.ogType}" />
<meta property="og:url" content="${generatedTags.ogUrl}" />
<meta property="og:site_name" content="${generatedTags.ogSiteName}" />

<!-- Twitter -->
<meta name="twitter:card" content="${generatedTags.twitterCard}" />
<meta name="twitter:title" content="${generatedTags.twitterTitle}" />
<meta name="twitter:description" content="${generatedTags.twitterDescription}" />`}
                </pre>
              </div>

              {/* Pro Tips */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                <h5 className="font-semibold text-indigo-900 mb-2">💡 Pro Tips for Better CTR</h5>
                <ul className="text-sm text-indigo-800 space-y-1.5">
                  <li>• Put your main keyword near the start of the title</li>
                  <li>• Use numbers, brackets, or power words ("Free", "2026", "Guide")</li>
                  <li>• End descriptions with a soft CTA: "Learn more", "Get started"</li>
                  <li>• Keep titles under 60 chars to avoid truncation</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* SEO Content Sections */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Free SEO Meta Tags Generator with Live SERP Preview</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Struggling to write meta tags that actually get clicks? Our <strong>free SEO meta tags generator</strong> helps you create optimized title tags, meta descriptions, and social sharing tags in seconds — no signup, no watermarks, no nonsense.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Whether you're optimizing a <strong>blog post, product page, or landing page</strong>, this tool gives you real-time feedback on character counts, pixel width, and shows exactly how your tags will appear in Google, Facebook, and Twitter. All calculations happen in your browser, so your content stays 100% private.
          </p>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Generate Meta Tags That Rank & Get Clicks</h2>
          <ol className="list-decimal list-inside text-gray-600 space-y-3 text-base">
            <li>Enter your <strong>page title</strong> (aim for 50-60 characters).</li>
            <li>Write a <strong>compelling meta description</strong> (under 160 characters).</li>
            <li>(Optional) Add your page URL, keywords, and site name.</li>
            <li>Click <strong>"Generate Meta Tags"</strong> to see live previews.</li>
            <li>Preview how your tags look in <strong>Google, Facebook, and Twitter</strong>.</li>
            <li>Copy the code and paste it into your website's <code>&lt;head&gt;</code>.</li>
          </ol>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why This Meta Tag Generator Actually Works</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: "Live SERP Preview", desc: "See exactly how your title and description will appear in Google search results." },
              { title: "Character + Pixel Counter", desc: "Google truncates titles around 600 pixels. Our tool shows both." },
              { title: "Open Graph & Twitter Ready", desc: "Generate social sharing tags in the same flow." },
              { title: "100% Private & Free", desc: "No data leaves your browser. No email required. No hidden paywalls." },
            ].map((f, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">SEO Meta Tags Generator – FAQs</h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              { q: "What's the ideal length for a meta title?", a: "Aim for 50-60 characters (~600 pixels). Google displays the first 50-60 chars. Our tool shows both counts to keep you safe." },
              { q: "Do meta descriptions affect SEO rankings?", a: "Not directly — but they heavily impact CTR. A compelling description can double clicks, which sends positive signals to Google." },
              { q: "Should I include keywords in meta tags?", a: "Yes, but naturally. Include your primary keyword in the title (near start) and once in description. Write for humans first." },
              { q: "What are Open Graph tags?", a: "OG tags control how your page looks when shared on social media. Not required for SEO, but they dramatically improve social CTR." },
              { q: "Is my content saved or sent to a server?", a: "Never. This tool runs entirely in your browser. Your data is never transmitted, stored, or tracked." },
            ].map((item, i) => (
              <div key={i} className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-indigo-200 transition-colors">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 pr-4">{item.q}</h3>
                  <ChevronDown size={22} className={`text-indigo-500 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all ${openFaq === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="px-5 pb-5 text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Free SEO Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/tools/serp-snippet-preview", title: "SERP Snippet Preview", desc: "Preview how your page appears in Google before publishing." },
              { href: "/tools/word-counter", title: "Word Counter + SEO", desc: "Count words, characters, reading time, and keyword density." },
              { href: "/tools/sitemap-generator", title: "XML Sitemap Generator", desc: "Create SEO-friendly sitemaps for Google Search Console." },
            ].map((tool) => (
              <Link key={tool.href} href={tool.href} className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-indigo-400 transition-all">
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-indigo-600">{tool.title}</h3>
                <p className="text-gray-500 text-sm">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SEOMetaTagsGenerator;