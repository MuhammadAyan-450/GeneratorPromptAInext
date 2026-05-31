'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Copy, RefreshCw, Search, Home, ChevronDown, Share2, MessageSquare,
  Zap, Shield, HelpCircle, CheckCircle2, FileText, Globe, ArrowRight
} from 'lucide-react';

// ─── Helper Functions (Outside Component) ─────────────────────────────────────
const validateForm = (formData) => {
  const errors = {};
  if (!formData.pageTitle.trim()) errors.pageTitle = 'Page title is required';
  if (!formData.pageDescription.trim()) errors.pageDescription = 'Description is required';
  if (formData.pageUrl && !formData.pageUrl.startsWith('http')) {
    errors.pageUrl = 'URL should start with http:// or https://';
  }
  return errors;
};

const optimizeText = (text, maxLength) => text.trim().slice(0, maxLength);

const generateMetaTags = (formData) => {
  const optimizedTitle = optimizeText(formData.pageTitle, 60);
  const optimizedDesc = optimizeText(formData.pageDescription, 160);
  const keywordsArray = formData.pageKeywords
    .split(',')
    .map((k) => k.trim())
    .filter((k) => k)
    .slice(0, 10);

  return {
    title: optimizedTitle,
    description: optimizedDesc,
    keywords: keywordsArray.join(', '),
    canonical: formData.pageUrl || '',
    robots: 'index, follow',
    ogTitle: optimizedTitle,
    ogDescription: optimizedDesc,
    ogType: 'website',
    ogUrl: formData.pageUrl || '',
    ogSiteName: formData.siteName || 'GeneratorPromptAI',
    twitterCard: 'summary_large_image',
    twitterTitle: optimizedTitle,
    twitterDescription: optimizedDesc,
    author: formData.author || '',
  };
};

const getTitleStatus = (length) => {
  if (length === 0) return { color: 'text-gray-400', text: 'Start typing...' };
  if (length <= 50) return { color: 'text-emerald-600', text: 'Perfect length ✓' };
  if (length <= 60) return { color: 'text-amber-600', text: 'Good, but keep it short' };
  return { color: 'text-red-600', text: 'Too long — may get cut off' };
};

const getDescStatus = (length) => {
  if (length === 0) return { color: 'text-gray-400', text: 'Add a compelling description...' };
  if (length <= 120) return { color: 'text-amber-600', text: 'Good, but you can add more' };
  if (length <= 160) return { color: 'text-emerald-600', text: 'Perfect length ✓' };
  return { color: 'text-red-600', text: 'Too long — may get truncated' };
};

// ─── FAQ Data (Sync with page.js JSON-LD) ─────────────────────────────────────
const FAQS = [
  {
    q: "What's the ideal length for a meta title?",
    a: 'Aim for 50-60 characters (or ~600 pixels). Google typically displays the first 50-60 characters in search results. Titles longer than this may get cut off with "...". Our tool shows both character and pixel count to help you stay safe.',
  },
  {
    q: 'Do meta descriptions affect SEO rankings?',
    a: 'Not directly — but they heavily impact click-through rate (CTR). A compelling meta description can double your CTR, which sends positive signals to Google. Think of it as your ad copy in search results.',
  },
  {
    q: 'Should I include keywords in my meta tags?',
    a: 'Yes, but naturally. Include your primary keyword in the title (preferably near the start) and once in the description. Avoid keyword stuffing — write for humans first, search engines second.',
  },
  {
    q: 'What are Open Graph tags and do I need them?',
    a: 'Open Graph (OG) tags control how your page looks when shared on social media (Facebook, LinkedIn, etc.). While not required for SEO, they dramatically improve social CTR. Our generator creates them automatically.',
  },
  {
    q: 'Is my content saved or sent to a server?',
    a: 'Never. This tool runs entirely in your browser using client-side JavaScript. Your page title, description, and URL are never transmitted, stored, or tracked. Your privacy is guaranteed.',
  },
  {
    q: 'How do I use the generated meta tags on my website?',
    a: 'Copy the HTML code and paste it into the <head> section of your webpage. For WordPress, use an SEO plugin like Yoast or Rank Math. For static sites, edit your HTML file directly.',
  },
];

// ─── Related Tools (6 Items from your tools array) ────────────────────────────
const RELATED_TOOLS = [
  { href: '/tools/serp-snippet-preview', title: 'SERP Snippet Preview', desc: 'Preview how your page appears in Google before publishing.' },
  { href: '/tools/word-counter', title: 'Word Counter + SEO', desc: 'Count words, characters, reading time, and keyword density.' },
  { href: '/tools/sitemap-generator', title: 'XML Sitemap Generator', desc: 'Create SEO-friendly sitemaps for Google Search Console.' },
  { href: '/tools/meta-description-checker', title: 'Meta Description Checker', desc: 'Analyze and optimize your meta descriptions for length and impact.' },
  { href: '/tools/url-encoder', title: 'URL Encoder', desc: 'Encode special characters in URLs for safe web use.' },
  { href: '/tools/case-converter', title: 'Case Converter', desc: 'Format text to Title Case, Uppercase, or Lowercase for consistent headings.' },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const SEOMetaTagsGenerator = () => {
  const [formData, setFormData] = useState({
    pageTitle: '',
    pageDescription: '',
    pageKeywords: '',
    pageUrl: '',
    siteName: '',
    author: '',
  });
  const [generatedTags, setGeneratedTags] = useState(null);
  const [activePreview, setActivePreview] = useState('google');
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
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleGenerate = () => {
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    const tags = generateMetaTags(formData);
    setGeneratedTags(tags);
    setCopied(false);
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

  const resetAll = () => {
    setFormData({
      pageTitle: '',
      pageDescription: '',
      pageKeywords: '',
      pageUrl: '',
      siteName: '',
      author: '',
    });
    setGeneratedTags(null);
    setErrors({});
    setCopied(false);
  };

  const stats = generatedTags
    ? [
        { icon: Search, label: 'Title Length', value: `${titleLength}/60`, color: getTitleStatus(titleLength).color },
        { icon: FileText, label: 'Desc Length', value: `${descLength}/160`, color: getDescStatus(descLength).color },
        { icon: Share2, label: 'OG Tags', value: '5 fields', color: 'text-indigo-600' },
        { icon: Shield, label: 'Privacy', value: '100% Local', color: 'text-emerald-600' },
      ]
    : [];

  const labelCls = 'block text-sm font-semibold text-gray-700 mb-2';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* ── Breadcrumb ── */}
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
        
        {/* ── Hero ── */}
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

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          
          {/* Input Grid */}
          <div className="grid md:grid-cols-2 gap-5 mb-6">
            <div>
              <label className={labelCls}>
                Page Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pageTitle"
                value={formData.pageTitle}
                onChange={handleInputChange}
                placeholder="e.g., Best Running Shoes for Marathon Training in 2026"
                maxLength={70}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 ${errors.pageTitle ? 'border-red-300' : 'border-gray-300'}`}
              />
              <div className="flex justify-between mt-1.5 text-xs">
                <span className={getTitleStatus(titleLength).color}>{titleLength}/60 chars</span>
                <span className="text-gray-400">~{titlePixels}/600 px</span>
              </div>
              {errors.pageTitle && <p className="text-red-500 text-xs mt-1">{errors.pageTitle}</p>}
            </div>

            <div>
              <label className={labelCls}>Page URL (Optional)</label>
              <input
                type="url"
                name="pageUrl"
                value={formData.pageUrl}
                onChange={handleInputChange}
                placeholder="https://yoursite.com/your-page"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 ${errors.pageUrl ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.pageUrl && <p className="text-red-500 text-xs mt-1">{errors.pageUrl}</p>}
            </div>

            <div className="md:col-span-2">
              <label className={labelCls}>
                Meta Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="pageDescription"
                value={formData.pageDescription}
                onChange={handleInputChange}
                placeholder="Write a compelling summary that makes people want to click..."
                rows={4}
                maxLength={200}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 resize-none ${errors.pageDescription ? 'border-red-300' : 'border-gray-300'}`}
              />
              <div className="flex justify-between mt-1.5 text-xs">
                <span className={getDescStatus(descLength).color}>{descLength}/160 chars</span>
                <span className="text-gray-400">Keep it under 160 for full display</span>
              </div>
              {errors.pageDescription && <p className="text-red-500 text-xs mt-1">{errors.pageDescription}</p>}
            </div>

            <div>
              <label className={labelCls}>Keywords (Optional)</label>
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
              <label className={labelCls}>Site Name / Author</label>
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
            <button onClick={handleGenerate} className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all text-white font-semibold px-8 py-3 rounded-xl flex items-center gap-2">
              <Zap size={18} /> Generate Meta Tags
            </button>
            <button onClick={resetAll} className="inline-flex items-center gap-2 px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors">
              <RefreshCw size={15} /> Reset
            </button>
          </div>

          {/* ── Results Section ── */}
          {generatedTags && (
            <div className="mt-8">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                    <div className="flex justify-center text-indigo-500 mb-1"><stat.icon size={20} /></div>
                    <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Live Preview Tabs */}
              <div className="flex gap-2 mb-4 border-b border-gray-200">
                {[
                  { id: 'google', label: 'Google Preview', icon: <Search size={16} /> },
                  { id: 'facebook', label: 'Social/OG', icon: <Share2 size={16} /> },
                  { id: 'twitter', label: 'Twitter/X', icon: <MessageSquare size={16} /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePreview(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                      activePreview === tab.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {/* Preview Box */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
                {activePreview === 'google' && (
                  <div className="max-w-2xl">
                    <p className="text-xs text-gray-400 mb-2">SERP Preview</p>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">{formData.pageUrl || 'yoursite.com'}</p>
                      <h3 className="text-lg font-semibold text-sky-700 hover:underline cursor-pointer mb-1">
                        {generatedTags.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{generatedTags.description}</p>
                    </div>
                  </div>
                )}
                {activePreview === 'facebook' && (
                  <div className="max-w-md">
                    <p className="text-xs text-gray-400 mb-2">Open Graph Preview</p>
                    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                      <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 text-sm">[OG Image]</div>
                      <div className="p-4">
                        <p className="text-xs text-gray-500 uppercase mb-1">{formData.pageUrl?.replace('https://', '') || 'yoursite.com'}</p>
                        <h3 className="font-semibold text-gray-900 mb-1">{generatedTags.ogTitle}</h3>
                        <p className="text-sm text-gray-600">{generatedTags.ogDescription}</p>
                      </div>
                    </div>
                  </div>
                )}
                {activePreview === 'twitter' && (
                  <div className="max-w-md">
                    <p className="text-xs text-gray-400 mb-2">Twitter Card Preview</p>
                    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                      <div className="h-40 bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center text-gray-400 text-sm">[Twitter Image]</div>
                      <div className="p-4">
                        <p className="text-xs text-gray-500 mb-1">{formData.pageUrl?.replace('https://', '') || 'yoursite.com'}</p>
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
                    <Copy size={14} /> {copied ? 'Copied!' : 'Copy Code'}
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

              {/* Actions */}
              <div className="flex justify-center gap-3">
                <button onClick={copyToClipboard} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors">
                  <Copy size={15} /> {copied ? 'Copied!' : 'Copy Result'}
                </button>
                <button onClick={resetAll} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors">
                  <RefreshCw size={15} /> Reset
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!generatedTags && (
            <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mt-4">
              <Search size={32} className="mx-auto mb-3 text-gray-300" />
              <p>Enter your page details, then click <strong className="text-gray-500">Generate Meta Tags</strong></p>
            </div>
          )}
        </div>

        {/* ── How to Use ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Generate Meta Tags That Rank & Get Clicks
          </h2>
          <ol className="space-y-5">
            {[
              { step: '1', title: 'Enter Page Details', desc: 'Add your page title (50-60 chars) and a compelling meta description (under 160 chars).' },
              { step: '2', title: 'Preview Live Results', desc: 'See exactly how your tags will appear in Google, Facebook, and Twitter before publishing.' },
              { step: '3', title: 'Optimize for CTR', desc: 'Use the character/pixel counters and pro tips to craft tags that get more clicks.' },
              { step: '4', title: 'Copy & Implement', desc: 'Copy the generated HTML code and paste it into your website\'s <head> section.' },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">{item.step}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── How It Works ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How SEO Meta Tag Optimization Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">Smart logic, better rankings. Here's what happens behind the scenes.</p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Zap size={16} className="text-indigo-600" />
                Character + Pixel Truncation
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                title.slice(0, 60) + pixelWidth ≈ 600px
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Google truncates titles around 600 pixels (~60 characters). Our tool calculates both to ensure your title displays fully in search results without getting cut off.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Share2 size={16} className="text-indigo-600" />
                Multi-Platform Tag Generation
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                og:title, twitter:card, canonical, robots → all in one output
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                We generate primary meta tags, Open Graph tags for Facebook/LinkedIn, and Twitter Card tags simultaneously — so your content looks great everywhere it's shared.
              </p>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
              <h3 className="font-bold text-indigo-900 text-sm mb-2 flex items-center gap-2">
                <Shield size={16} className="text-indigo-600" />
                Privacy Note
              </h3>
              <p className="text-indigo-800 text-xs leading-relaxed">
                All processing happens locally in your browser. No page content, titles, or URLs are ever sent to any server. 100% private.
              </p>
            </div>
          </div>
        </section>

        {/* ── Sample Results ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Real Example: Blog Post Meta Tags
          </h2>
          <p className="text-gray-500 text-sm mb-6">See how optimized tags look in practice.</p>

          <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Input</p>
                <p className="font-mono text-xs text-gray-800">
                  Title: Best Running Shoes for Marathon Training in 2026<br />
                  Desc: Discover top-rated running shoes for marathon training. Expert reviews, comfort ratings, and buying guide for serious runners.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Output (Google Preview)</p>
                <p className="text-sm text-gray-800">
                  <strong className="text-sky-700">Best Running Shoes for Marathon Training in 2026</strong><br />
                  <span className="text-gray-600">Discover top-rated running shoes for marathon training. Expert reviews, comfort ratings, and buying guide for serious runners.</span>
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Result: Title fits within 60 chars, description under 160 chars — both display fully in Google SERP with no truncation.
            </p>
          </div>
        </section>

        {/* ── Use Cases ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses SEO Meta Tag Generators?
          </h2>
          <p className="text-gray-500 text-sm mb-6">From bloggers to agencies — better meta tags drive more traffic.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Zap size={20} className="text-indigo-600" />, title: 'Bloggers & Content Creators', desc: 'Optimize every post for search visibility and social sharing without manual tag writing.' },
              { icon: <Search size={20} className="text-indigo-600" />, title: 'Small Business Owners', desc: 'Improve local SEO and click-through rates for product pages, services, and landing pages.' },
              { icon: <Globe size={20} className="text-indigo-600" />, title: 'SEO Agencies', desc: 'Generate consistent, optimized meta tags for multiple client sites in seconds — no copy-paste errors.' },
              { icon: <HelpCircle size={20} className="text-indigo-600" />, title: 'WordPress Users', desc: 'Create meta tags to paste into Yoast, Rank Math, or All in One SEO plugins for instant optimization.' },
            ].map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-5 hover:border-indigo-200 transition-colors">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEO Content ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Meta Tags Still Matter for SEO in 2026
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Struggling to write meta tags that actually get clicks? Our <strong>free SEO meta tags generator</strong> helps you create optimized title tags, meta descriptions, and social sharing tags in seconds — no signup, no watermarks, no nonsense.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Whether you're optimizing a <strong>blog post, product page, or landing page</strong>, this tool gives you real-time feedback on character counts, pixel width, and shows exactly how your tags will appear in Google, Facebook, and Twitter.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Built for speed and privacy — all processing happens in your browser using JavaScript. Your content never leaves your device. Just optimized tags, instantly.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">Privacy Note</h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No page content, titles, or URLs are uploaded to any server. No data is stored or tracked. Your info stays on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need more SEO tools? Try the{' '}
            <Link href="/tools/serp-snippet-preview" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">SERP Snippet Preview</Link> for visual testing, or the{' '}
            <Link href="/tools/word-counter" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">Word Counter</Link> for content analysis.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {FAQS.map((item, i) => (
              <div key={i} className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-indigo-200 transition-colors duration-300">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={openFaq === i}
                >
                  <h3 className="text-sm md:text-base font-bold text-gray-900 pr-4">{item.q}</h3>
                  <ChevronDown size={22} className={`text-indigo-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related Tools ── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related Free SEO Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RELATED_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-indigo-400 transition-all"
              >
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-indigo-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default SEOMetaTagsGenerator;