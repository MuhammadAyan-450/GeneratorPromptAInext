"use client";

import { useState, memo } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  ArrowRight,
  Zap,
  TrendingUp,
  Clock,
  Star,
  ChevronDown,
  Shield,
  Globe,
  Code,
  Image,
  FileText,
  Calculator,
  Palette,
  Terminal,
  ArrowUpRight,
  CheckCircle2,
  Users,
  Tool,
  Layout,
  Lock,
  Wifi,
  Type,
  Hash,
  BarChart3,
  DollarSign,
  Eye,
  Timer,
  Copy,
  Smile,
  Scissors,
  FileCode2,
  ShieldCheck,
  Mail,
  Globe2,
  RotateCcw,
} from "lucide-react";

// ─── TOOLS DATA ───────────────────────────────────────────────────────────────
const toolsData = [
  {
    slug: "ad-revenue-calculator",
    name: "Ad Revenue Calculator",
    desc: "Estimate website ad income from pageviews, RPM, and CPM. Plan your monetization strategy.",
    cat: "Calculators",
    emoji: "💰",
  },
  {
    slug: "adsense-revenue-calculator",
    name: "AdSense Revenue Calculator",
    desc: "Calculate Google AdSense earnings based on impressions, CTR, and CPC. Accurate estimates.",
    cat: "Calculators",
    emoji: "💵",
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    desc: "Calculate exact age in years, months, and days from your date of birth.",
    cat: "Calculators",
    emoji: "🎂",
  },
  {
    slug: "ai-agent",
    name: "ChatGPT Prompt Generator",
    desc: "Build powerful AI prompts for ChatGPT with custom tone, role, and output format.",
    cat: "AI Tools",
    emoji: "🤖",
  },
  {
    slug: "base64-encode",
    name: "Base64 Encode & Decode",
    desc: "Encode text to Base64 or decode Base64 strings instantly in your browser.",
    cat: "Developer",
    emoji: "🔐",
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    desc: "Convert text to uppercase, lowercase, title case, sentence case, and more.",
    cat: "Text Tools",
    emoji: "🔤",
  },
  {
    slug: "chatgpt-prompt-generator",
    name: "ChatGPT Prompt Builder",
    desc: "Create structured, high-quality prompts for ChatGPT with framework selection.",
    cat: "AI Tools",
    emoji: "✨",
  },
  {
    slug: "claude-prompt-generator",
    name: "Claude Prompt Generator",
    desc: "Generate optimized prompts specifically tuned for Claude AI by Anthropic.",
    cat: "AI Tools",
    emoji: "🧠",
  },
  {
    slug: "cpc-calculator",
    name: "CPC Calculator",
    desc: "Calculate Cost Per Click from total ad spend and number of clicks received.",
    cat: "Calculators",
    emoji: "🖱️",
  },
  {
    slug: "cpm-calculator",
    name: "CPM Calculator",
    desc: "Calculate Cost Per Mille (thousand impressions) for your ad campaigns.",
    cat: "Calculators",
    emoji: "📊",
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    desc: "Convert between 50+ world currencies with live exchange rates.",
    cat: "Calculators",
    emoji: "💱",
  },
  {
    slug: "ebay-charges-calculator",
    name: "eBay Charges Calculator",
    desc: "Calculate eBay final value fees, listing fees, and net profit from sales.",
    cat: "Calculators",
    emoji: "🛒",
  },
  {
    slug: "email-validator",
    name: "Email Validator",
    desc: "Verify if an email address is valid, check format, and detect disposable emails.",
    cat: "SEO & Web",
    emoji: "📧",
  },
  {
    slug: "emoji-picker",
    name: "Emoji Picker",
    desc: "Browse and copy 3000+ emojis for social media, messages, and documents.",
    cat: "Text Tools",
    emoji: "😀",
  },
  {
    slug: "excel-formula-beautifier",
    name: "Excel Formula Beautifier",
    desc: "Format messy Excel formulas into readable, indented, multi-line code.",
    cat: "Developer",
    emoji: "📈",
  },
  {
    slug: "fake-data-generator",
    name: "Fake Data Generator",
    desc: "Generate realistic names, emails, addresses, phone numbers for testing.",
    cat: "Developer",
    emoji: "🧪",
  },
  {
    slug: "hashtag-generator",
    name: "Hashtag Generator",
    desc: "Generate trending and relevant hashtags for Instagram, TikTok, and Twitter.",
    cat: "Text Tools",
    emoji: "#️⃣",
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    desc: "Compress PNG, JPG, WebP images without losing quality. Reduce size by 80%.",
    cat: "Image Tools",
    emoji: "🖼️",
  },
  {
    slug: "image-converter",
    name: "Image Converter",
    desc: "Convert images between PNG, JPG, WebP, GIF, BMP formats instantly.",
    cat: "Image Tools",
    emoji: "🔄",
  },
  {
    slug: "image-cropper",
    name: "Image Cropper",
    desc: "Crop images to custom dimensions, aspect ratios, or social media sizes.",
    cat: "Image Tools",
    emoji: "✂️",
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    desc: "Resize images to exact pixel dimensions for web, social media, or print.",
    cat: "Image Tools",
    emoji: "📐",
  },
  {
    slug: "image-to-text",
    name: "Image to Text (OCR)",
    desc: "Extract text from images using OCR technology. Copy text from screenshots.",
    cat: "Image Tools",
    emoji: "📝",
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter & Validator",
    desc: "Format, validate, minify, and beautify JSON data with syntax highlighting.",
    cat: "Developer",
    emoji: "📋",
  },
  {
    slug: "json-validator",
    name: "JSON Validator",
    desc: "Validate JSON syntax and find errors with line numbers and fix suggestions.",
    cat: "Developer",
    emoji: "✅",
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    desc: "Generate placeholder text in paragraphs, sentences, or words. Custom length.",
    cat: "Text Tools",
    emoji: "📄",
  },
  {
    slug: "midjourney-prompt-generator",
    name: "Midjourney Prompt Builder",
    desc: "Build detailed Midjourney prompts with style, aspect ratio, and parameters.",
    cat: "AI Tools",
    emoji: "🎨",
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    desc: "Generate strong, secure passwords with custom length and character options.",
    cat: "Security",
    emoji: "🔒",
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    desc: "Calculate percentage, percentage change, percentage increase/decrease easily.",
    cat: "Calculators",
    emoji: "%",
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    desc: "Create QR codes for URLs, text, WiFi, contacts. Custom colors and logo.",
    cat: "Image Tools",
    emoji: "📱",
  },
  {
    slug: "remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    desc: "Remove duplicate lines from text. Keep unique values, sort alphabetically.",
    cat: "Text Tools",
    emoji: "🧹",
  },
  {
    slug: "sitemap-generator",
    name: "XML Sitemap Generator",
    desc: "Generate XML sitemaps for Google. Submit to Search Console for faster indexing.",
    cat: "SEO & Web",
    emoji: "🗺️",
  },
  {
    slug: "time-zone-converter",
    name: "Time Zone Converter",
    desc: "Convert time between 100+ time zones worldwide. Compare multiple zones.",
    cat: "Utilities",
    emoji: "🌍",
  },
  {
    slug: "unix-timestamp",
    name: "Unix Timestamp Converter",
    desc: "Convert Unix timestamps to human-readable dates and vice versa.",
    cat: "Developer",
    emoji: "⏱️",
  },
  {
    slug: "uppercase-to-lowercase",
    name: "Uppercase to Lowercase",
    desc: "Quickly convert UPPERCASE text to lowercase or vice versa in one click.",
    cat: "Text Tools",
    emoji: "🔠",
  },
  {
    slug: "url-encoder",
    name: "URL Encoder & Decoder",
    desc: "Encode or decode URLs with special characters for safe web usage.",
    cat: "Developer",
    emoji: "🔗",
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    desc: "Generate random UUID v4 identifiers for databases, APIs, and testing.",
    cat: "Developer",
    emoji: "🆔",
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    desc: "Count words, characters, sentences, paragraphs, and estimate reading time.",
    cat: "Text Tools",
    emoji: "📝",
  },
  {
    slug: "youtube-ad-revenue-calculator",
    name: "YouTube Ad Revenue Calculator",
    desc: "Estimate YouTube earnings from views, CPM, and niche. Plan channel income.",
    cat: "Calculators",
    emoji: "▶️",
  },
  {
    slug: "youtube-script-prompt-generator",
    name: "YouTube Script Prompt Generator",
    desc: "Generate engaging YouTube video script prompts with hooks and CTAs.",
    cat: "AI Tools",
    emoji: "🎬",
  },
  {
    slug: "markdown-to-html",
    name: "Markdown to HTML",
    desc: "Convert Markdown syntax to clean HTML code. Preview rendered output.",
    cat: "Developer",
    emoji: "📝",
  },
  {
    slug: "serp-snippet-preview",
    name: "SERP Snippet Preview",
    desc: "Preview how your page title and description will look in Google search results.",
    cat: "SEO & Web",
    emoji: "🔍",
  },
];

// ─── MOCK BLOG POSTS ──────────────────────────────────────────────────────────
const blogPosts = [
  {
    slug: "how-to-increase-adsense-earnings",
    title: "How to Increase AdSense Earnings (RPM Secrets)",
    category: "Monetization",
    color: "from-emerald-500 to-teal-600",
    emoji: "💰",
    date: "May 10, 2025",
  },
  {
    slug: "best-free-seo-tools-for-beginners",
    title: "Best Free SEO Tools for Beginners (No Signup)",
    category: "SEO",
    color: "from-sky-500 to-blue-600",
    emoji: "🧰",
    date: "May 12, 2025",
  },
  {
    slug: "how-to-calculate-cpm",
    title: "How to Calculate CPM: Formula & Benchmarks",
    category: "Digital Marketing",
    color: "from-violet-500 to-purple-600",
    emoji: "📊",
    date: "Jan 15, 2025",
  },
  {
    slug: "how-to-generate-lorem-ipsum-text-custom-length",
    title: "How to Generate Lorem Ipsum Text (Custom Length)",
    category: "Tutorials",
    color: "from-orange-500 to-red-500",
    emoji: "📄",
    date: "Mar 20, 2025",
  },
  {
    slug: "json-formatter-guide",
    title: "How to Format & Validate JSON Like a Pro",
    category: "Developer",
    color: "from-emerald-500 to-teal-600",
    emoji: "📋",
    date: "Apr 5, 2025",
  },
  {
    slug: "midjourney-prompt-guide",
    title: "Midjourney Prompt Guide: From Beginner to Pro",
    category: "AI",
    color: "from-purple-500 to-indigo-600",
    emoji: "🎨",
    date: "Apr 22, 2025",
  },
];

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────
const faqItems = [
  {
    q: "How to generate AI prompts for ChatGPT without signup?",
    a: "Visit our AI Prompt Builder tool, select your AI model, choose a category, describe your goal, and click generate. The entire process is free with no account creation needed.",
  },
  {
    q: "What is the best free JSON formatter and validator online?",
    a: "Our JSON Formatter lets you paste, format, validate, and minify JSON instantly in your browser. It highlights errors with line numbers and your data never leaves your device.",
  },
  {
    q: "How to compress images without losing quality online?",
    a: "Use our Image Compressor to reduce file size while maintaining visual quality. Upload PNG, JPG, or WebP images and download optimized versions instantly.",
  },
  {
    q: "How to convert image to base64 encoding for free?",
    a: "Our Image to Base64 Converter lets you drag-and-drop any image and instantly get the base64 string. Supports PNG, JPG, SVG, GIF, and WebP formats.",
  },
  {
    q: "Can I generate QR codes with custom logo for free?",
    a: "Yes, our QR Code Generator creates QR codes for URLs, text, Wi-Fi, and more. You can customize colors, add a logo, and download in PNG or SVG — completely free.",
  },
  {
    q: "How to calculate AdSense revenue from pageviews?",
    a: "Use our AdSense Revenue Calculator. Enter your pageviews, CTR, and CPC to get estimated earnings. You can also use RPM-based calculation for quick estimates.",
  },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
const ToolCard = memo(({ tool, index, variant = "popular" }) => {
  if (variant === "latest") {
    return (
      <Link
        href={`/tools/${tool.slug}`}
        className="group relative bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:border-emerald-300 transition-all duration-500 hover:-translate-y-2"
      >
        <div className="absolute top-3 right-3">
          <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md shadow-emerald-200/60">
            NEW
          </span>
        </div>
        <div className="text-3xl mb-3">{tool.emoji}</div>
        <h3 className="font-semibold text-[15px] text-gray-900 group-hover:text-emerald-700 mb-2 pr-14 transition-colors duration-300 tracking-tight">
          {tool.name}
        </h3>
        <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-2 mb-5">
          {tool.desc}
        </p>
        <div className="text-emerald-600 font-semibold text-[13px] inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
          Try Free <ArrowRight size={14} />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:border-indigo-300 transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-2"
    >
      {index < 3 && (
        <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md shadow-orange-200/60">
          #{index + 1}
        </div>
      )}
      <div className="text-3xl mb-3">{tool.emoji}</div>
      <h3 className="font-semibold text-[15px] text-gray-900 group-hover:text-indigo-700 transition-colors duration-300 mb-2 pr-10 tracking-tight">
        {tool.name}
      </h3>
      <p className="text-gray-500 text-[13px] leading-relaxed flex-grow line-clamp-2">
        {tool.desc}
      </p>
      <div className="mt-auto pt-4 text-indigo-600 font-semibold text-[13px] inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
        Use Free <ArrowRight size={14} />
      </div>
    </Link>
  );
});
ToolCard.displayName = "ToolCard";

const BlogCard = memo(({ post }) => (
  <Link
    href={`/blog/${post.slug}`}
    className="group bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
  >
    <div
      className={`h-36 flex items-center justify-center bg-gradient-to-br ${post.color} relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      <span className="text-5xl relative z-10">{post.emoji}</span>
    </div>
    <div className="p-5">
      <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full tracking-wide">
        {post.category}
      </span>
      <h3 className="text-[15px] font-semibold text-gray-900 mt-3 mb-2 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2 tracking-tight leading-snug">
        {post.title}
      </h3>
      <div className="flex justify-between items-center text-[12px] text-gray-400 mt-4 tracking-wide">
        <span>{post.date}</span>
        <span className="text-indigo-500 font-semibold group-hover:underline flex items-center gap-1">
          Read <ArrowRight size={11} />
        </span>
      </div>
    </div>
  </Link>
));
BlogCard.displayName = "BlogCard";

const HeroAnimation = memo(() => (
  <div
    className="relative w-44 h-44 mx-auto mb-8 select-none pointer-events-none"
    aria-hidden="true"
  >
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 opacity-10 animate-ping" />
    <div
      className="absolute inset-5 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 opacity-20 animate-pulse"
      style={{ animationDuration: "2s" }}
    />
    <div className="absolute inset-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl flex items-center justify-center">
      <Sparkles size={44} className="text-white drop-shadow-lg" />
    </div>
    <div
      className="absolute inset-0 animate-spin"
      style={{ animationDuration: "8s" }}
    >
      <div className="absolute top-0 left-1/2 w-2.5 h-2.5 bg-indigo-400 rounded-full -translate-x-1/2 shadow-md" />
      <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full -translate-x-1/2 shadow-md" />
    </div>
    <div
      className="absolute inset-0 animate-spin"
      style={{ animationDuration: "12s", animationDirection: "reverse" }}
    >
      <div className="absolute top-1/2 left-0 w-2 h-2 bg-pink-400 rounded-full -translate-y-1/2 shadow-md" />
      <div className="absolute top-1/2 right-0 w-2.5 h-2.5 bg-cyan-400 rounded-full -translate-y-1/2 shadow-md" />
    </div>
  </div>
));
HeroAnimation.displayName = "HeroAnimation";

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function HomeContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const filteredTools = searchTerm.trim()
    ? toolsData.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.cat.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  const popularTools = toolsData.slice(0, 8);
  const latestTools = toolsData.slice(-6).reverse();

  return (
    <div className="bg-gray-50/40 min-h-screen flex flex-col">
      {/* ════════════════ HERO ════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50/70 to-purple-50/40 pt-16 pb-20 md:pt-20 md:pb-36">
        <div className="absolute -left-20 top-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 pointer-events-none" />
        <div className="absolute right-10 bottom-20 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-20 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-3xl opacity-10 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-5 text-center">
          <HeroAnimation />

          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-indigo-200/50 rounded-full text-[13px] font-medium text-indigo-700 mb-8 shadow-lg shadow-indigo-100/50 tracking-wide">
            <Sparkles size={15} className="text-indigo-500" />
             Free online Tools — AI Prompts, JSON Formatter, Image Tools & More
          </div>

          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold text-gray-900 tracking-tight leading-[1.08] mb-7">
            Free AI Prompt Generator <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              and Smart Tools for Everyone
            </span>
          </h1>

          <p className="text-[clamp(1.05rem,2vw,1.3rem)] text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-normal">
            Use our free AI Prompt Generator to create high-quality prompts for
            ChatGPT, Claude, SEO, writing, coding, marketing, and more. Fast,
            free, and easy to use.{" "}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link
              href="/tools/ai-agent"
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-9 py-4 rounded-2xl font-semibold text-[15px] shadow-2xl shadow-indigo-300/40 transition-all duration-300 hover:-translate-y-1 tracking-wide"
            >
              <Zap size={19} />
              AI Prompt Builder
              <ArrowRight
                size={17}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
            <Link
              href="/pages/all-tools"
              className="group inline-flex items-center justify-center gap-3 bg-white/95 border-2 border-gray-200 hover:border-indigo-400 text-gray-800 hover:text-indigo-700 px-9 py-4 rounded-2xl font-semibold text-[15px] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 tracking-wide"
            >
              Browse All 40+ Tools
              <ArrowRight
                size={17}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-[13px] text-gray-600 tracking-wide">
            {[
              { dot: "bg-emerald-500", label: "100% Free Forever" },
              { dot: "bg-blue-500", label: "No Login Required" },
              { dot: "bg-purple-500", label: "Browser-Based — No Install" },
              { dot: "bg-orange-500", label: "40+ Tools Available" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 ${b.dot} rounded-full`} />
                <span className="font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ SEARCH ════════════════ */}
      <section className="py-16 md:py-20 px-5 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-gray-900 mb-3 tracking-tight">
            Search Free Online Tools Instantly
          </h2>
          <p className="text-[15px] text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed tracking-wide">
            Find JSON formatter, image compressor, base64 converter, QR code
            maker, and more
          </p>

          <div className="relative max-w-3xl mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Try 'JSON formatter', 'image compressor', 'password generator'..."
              className="w-full px-7 py-5 pl-16 text-[16px] bg-white border-2 border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-300 tracking-wide"
              aria-label="Search free online tools"
            />
            <Search
              size={22}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

          {!searchTerm.trim() && (
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {[
                "JSON Formatter",
                "Image Compressor",
                "AI Prompt",
                "QR Code",
                "Password Generator",
                "AdSense Calculator",
              ].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="px-4 py-2 bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-700 text-[13px] font-medium rounded-full transition-colors duration-200 tracking-wide"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {searchTerm.trim() && (
            <div className="mt-14">
              <div className="flex items-center justify-center gap-3 mb-8">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                  {filteredTools.length} result
                  {filteredTools.length !== 1 ? "s" : ""}
                </h3>
                <span className="text-gray-400 text-[15px]">for</span>
                <span className="px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full font-semibold text-[13px] tracking-wide">
                  &quot;{searchTerm}&quot;
                </span>
              </div>

              {filteredTools.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredTools.slice(0, 6).map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="group bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:border-indigo-300 hover:-translate-y-1.5 transition-all duration-500"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl flex-shrink-0">
                          {tool.emoji}
                        </span>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors mb-1 truncate text-[15px] tracking-tight">
                            {tool.name}
                          </h4>
                          <p className="text-gray-500 text-[13px] line-clamp-2 mb-3 leading-relaxed">
                            {tool.desc}
                          </p>
                          <span className="text-indigo-600 font-semibold text-[13px] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all tracking-wide">
                            Open Free <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-12 border border-gray-200">
                  <p className="text-gray-500 text-[16px] mb-2 font-medium">
                    No matching tools found
                  </p>
                  <p className="text-gray-400 text-[14px]">
                    Try different keywords or{" "}
                    <button
                      onClick={() => setSearchTerm("")}
                      className="text-indigo-600 hover:underline font-semibold"
                    >
                      browse all 40+ tools
                    </button>
                  </p>
                </div>
              )}

              {filteredTools.length > 6 && (
                <div className="mt-10">
                  <Link
                    href="/pages/all-tools"
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold bg-indigo-50 hover:bg-indigo-100 px-7 py-3 rounded-full transition-all duration-200 text-[14px] tracking-wide"
                  >
                    See all {filteredTools.length} results{" "}
                    <ArrowRight size={15} />
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ════════════════ POPULAR TOOLS ════════════════ */}
      <section
        className="py-16 md:py-20 px-5 bg-gray-50/40"
        style={{ contentVisibility: "auto", containIntrinsicSize: "0 900px" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-medium text-[13px] mb-4 tracking-wide">
              <TrendingUp size={14} />
              Most Used This Month
            </div>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-gray-900 mb-3 tracking-tight">
              Popular Free Online Tools
            </h2>
            <p className="text-[15px] text-gray-500 max-w-2xl mx-auto leading-relaxed tracking-wide">
              Trusted by thousands — format JSON, compress images, generate QR
              codes, and more
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {popularTools.map((tool, index) => (
              <ToolCard
                key={tool.slug}
                tool={tool}
                index={index}
                variant="popular"
              />
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/pages/all-tools"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl font-semibold text-[15px] shadow-2xl hover:shadow-indigo-300/50 transition-all duration-300 hover:-translate-y-1 tracking-wide"
            >
              View All {toolsData.length} Free Tools
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1.5 transition-transform"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════ LATEST TOOLS ════════════════ */}
      <section
        className="py-16 md:py-20 px-5 bg-white border-y border-gray-100"
        style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-medium text-[13px] mb-4 tracking-wide">
              <Clock size={14} />
              Just Added
            </div>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-gray-900 mb-3 tracking-tight">
              New Free Tools Added
            </h2>
            <p className="text-[15px] text-gray-500 max-w-2xl mx-auto leading-relaxed tracking-wide">
              Fresh tools added regularly — try the latest free online utilities
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} variant="latest" />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ FEATURES ════════════════ */}
      <section
        className="py-16 md:py-20 px-5 bg-gray-50/40"
        style={{ contentVisibility: "auto", containIntrinsicSize: "0 600px" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-gray-900 mb-3 tracking-tight">
              Why Use Our Free Online Tools?
            </h2>
            <p className="text-[15px] text-gray-500 max-w-2xl mx-auto leading-relaxed tracking-wide">
              Built for speed, privacy, and simplicity — no installs, no
              accounts, no catch
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Zap size={22} />,
                title: "Lightning Fast",
                desc: "All tools run in your browser for instant results. No server processing delays.",
                color: "from-amber-500 to-orange-500",
              },
              {
                icon: <Lock size={22} />,
                title: "Private & Secure",
                desc: "Your files and data never leave your device. No uploads, no tracking, no logs.",
                color: "from-emerald-500 to-teal-500",
              },
              {
                icon: <Users size={22} />,
                title: "No Signup Needed",
                desc: "Open any tool and start immediately. No account, no email, no friction.",
                color: "from-blue-500 to-indigo-500",
              },
              {
                icon: <DollarSign size={22} />,
                title: "Free Forever",
                desc: "No hidden fees, no premium tiers, no subscriptions. Every tool stays 100% free.",
                color: "from-purple-500 to-pink-500",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group bg-white border border-gray-200/80 rounded-2xl p-7 text-center hover:border-indigo-300 hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
              >
                <div
                  className={`w-13 h-13 mx-auto mb-5 bg-gradient-to-r ${f.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  style={{ width: "52px", height: "52px" }}
                >
                  {f.icon}
                </div>
                <h3 className="text-[16px] font-semibold text-gray-900 mb-2 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-[13px] leading-relaxed tracking-wide">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ FAQ ════════════════ */}
      <section
        className="py-16 md:py-20 px-5 bg-white border-y border-gray-100"
        style={{ contentVisibility: "auto", containIntrinsicSize: "0 700px" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-gray-900 mb-3 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-[15px] text-gray-500 max-w-2xl mx-auto leading-relaxed tracking-wide">
              Quick answers about our free tools, AI prompt builder, and how to
              use them
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200/80 rounded-2xl overflow-hidden hover:border-indigo-200 transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                  aria-expanded={openFaq === index}
                >
                  <h3 className="text-[15px] font-semibold text-gray-900 pr-4 leading-snug tracking-tight">
                    {item.q}
                  </h3>
                  <ChevronDown
                    size={18}
                    className={`text-indigo-500 flex-shrink-0 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6">
                    <p className="text-gray-600 leading-relaxed text-[14px] tracking-wide">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ BLOG ════════════════ */}
      <section
        className="py-16 md:py-20 px-5 bg-gradient-to-br from-indigo-50/60 via-purple-50/30 to-pink-50/30"
        style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium text-[13px] mb-4 tracking-wide">
              <FileText size={14} />
              Guides & Tutorials
            </div>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-gray-900 mb-3 tracking-tight">
              Free Tools Guides & Tutorials
            </h2>
            <p className="text-[15px] text-gray-500 max-w-2xl mx-auto leading-relaxed tracking-wide">
              Learn how to use JSON formatter, compress images, build AI
              prompts, and get the most from our tools
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3.5 rounded-xl font-semibold text-[14px] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 tracking-wide"
            >
              View All Guides{" "}
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════ QUICK LINKS STRIP ════════════════ */}
      <section className="py-10 px-5 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-4 text-center">
            Popular Tool Pages
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {toolsData.slice(0, 20).map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="px-3.5 py-1.5 bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-700 text-[12px] font-medium rounded-full transition-colors duration-200 tracking-wide"
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ CTA ════════════════ */}
      <section className="relative py-16 md:py-20 px-5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTMwVjBoLTEydjRoMTJ6TTI0IDI0aDEydi0ySDI0djJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-extrabold text-white mb-5 leading-tight tracking-tight">
            Start Using 40+ Free Tools Now
          </h2>
          <p className="text-[clamp(1rem,2vw,1.2rem)] mb-10 text-white/80 max-w-2xl mx-auto leading-relaxed tracking-wide">
            Open JSON formatter, image compressor, AI prompt builder, and 39
            more tools. Zero signup, zero cost.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools/ai-agent"
              className="group inline-flex items-center justify-center gap-3 bg-white text-indigo-600 hover:bg-gray-50 px-9 py-4 rounded-2xl font-semibold text-[15px] shadow-2xl transition-all duration-300 hover:-translate-y-1 tracking-wide"
            >
              <Zap size={19} />
              Open AI Prompt Builder
              <ArrowRight
                size={17}
                className="group-hover:translate-x-1.5 transition-transform"
              />
            </Link>
            <Link
              href="/pages/all-tools"
              className="inline-flex items-center justify-center gap-3 bg-white/10 border-2 border-white/30 hover:bg-white/20 text-white px-9 py-4 rounded-2xl font-semibold text-[15px] backdrop-blur transition-all duration-300 hover:-translate-y-1 tracking-wide"
            >
              Browse All 40+ Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
