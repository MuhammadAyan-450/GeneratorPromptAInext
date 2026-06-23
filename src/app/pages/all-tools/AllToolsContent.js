"use client";
import { useState, useEffect } from "react"; // useEffect import kiya hai
import Link from "next/link";
import tools, { toolCategories } from "../../data/tools";

import {
  ArrowLeft,
  Search,
  ChevronDown,
  ArrowRight,
  Layout,
} from "lucide-react";
import ResponsiveAd from "../../../components/ResponsiveAd";

// ─── EMOJI MAPPER ─────────────────────────────────────────────────────────────
const getToolEmoji = (path) => {
  if (path.includes("json")) return "📋";
  if (path.includes("image-compressor")) return "🖼️";
  if (path.includes("image-converter")) return "🔄";
  if (path.includes("image-cropper")) return "✂️";
  if (path.includes("image-resizer")) return "📐";
  if (path.includes("image-to-text")) return "📝";
  if (path.includes("qr-code")) return "📱";
  if (path.includes("password")) return "🔒";
  if (path.includes("uuid")) return "🆔";
  if (path.includes("base64")) return "🔐";
  if (path.includes("word-counter")) return "📝";
  if (path.includes("lorem")) return "📄";
  if (path.includes("ai-agent") || path.includes("chatgpt-prompt")) return "🤖";
  if (path.includes("claude")) return "🧠";
  if (path.includes("midjourney")) return "🎨";
  if (path.includes("youtube")) return "▶️";
  if (
    path.includes("adsense") ||
    path.includes("ad-revenue") ||
    path.includes("cpm") ||
    path.includes("cpc")
  )
    return "💰";
  if (path.includes("age-calc")) return "🎂";
  if (path.includes("currency")) return "💱";
  if (path.includes("percentage")) return "%";
  if (path.includes("time-zone")) return "🌍";
  if (path.includes("markdown")) return "📝";
  if (path.includes("serp")) return "🔍";
  if (path.includes("fake-data")) return "🧪";
  if (path.includes("excel")) return "📈";
  if (path.includes("case-converter") || path.includes("uppercase"))
    return "🔤";
  if (path.includes("emoji")) return "😀";
  if (path.includes("hashtag")) return "#️⃣";
  if (path.includes("remove-duplicate")) return "🧹";
  if (path.includes("sitemap")) return "🗺️";
  if (path.includes("unix")) return "⏱️";
  if (path.includes("url-encoder")) return "🔗";
  if (path.includes("watermark")) return "💧";
  if (path.includes("ebay")) return "🛒";
  if (path.includes("email-validator")) return "📧";
  return "⚡";
};

const faqItems = [
  {
    question: "How many free online tools are available on this website?",
    answer:
      "We offer 35+ free online tools across 12 categories including image tools (compressor, resizer, cropper, converter, OCR), text tools (JSON formatter, word counter, case converter), generators (QR code, password, UUID, Lorem Ipsum), calculators (age, currency, percentage, time zone), AI tools (ChatGPT, Claude, Midjourney prompt generators), and developer tools (Base64 encoder, URL encoder, timestamp converter, fake data generator). All tools are 100% free and work directly in your browser.",
  },
  {
    question: "Do I need to create an account to use these free tools?",
    answer:
      "No, none of our tools require any signup, login, or account creation. Simply open any tool and start using it immediately. There are no hidden paywalls or premium tiers – every tool is completely free forever.",
  },
  {
    question: "Are my files and data safe when using these online tools?",
    answer:
      "Yes, your privacy is our priority. Most of our tools (like JSON formatter, password generator, Base64 encoder, case converter, and all calculators) process everything directly in your browser – your data never leaves your device. For image tools that require file uploads, files are processed in your browser session and are not stored on any server.",
  },
  {
    question: "What is the best free image compressor without losing quality?",
    answer:
      "Our Image Compressor tool reduces JPG, PNG, and WebP file sizes by up to 90% without noticeable quality loss. You can adjust the compression level with a slider and compare the original vs compressed image side by side before downloading. It works entirely in your browser with no server upload required.",
  },
  {
    question: "Can I use these tools on mobile phones and tablets?",
    answer:
      "Yes, all our tools are fully responsive and work on any device with a modern web browser – including smartphones, tablets, laptops, and desktops. There is no app to download; just open the tool URL in your mobile browser and start using it.",
  },
  {
    question:
      "How to generate strong passwords with special characters for free?",
    answer:
      "Use our Password Generator tool to create secure random passwords. You can customize the length (up to 128 characters), and toggle uppercase letters, lowercase letters, numbers, and special characters on or off. The tool also shows a real-time password strength meter so you know how secure your password is. Copy it with one click.",
  },
];

export default function AllToolsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState(null);

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tool.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (tool.seoTitle || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50/40 flex flex-col">
      {/* Back link */}
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8 pt-4 pb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-medium transition-colors group text-[14px] tracking-wide"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Home
        </Link>
      </div>

      <div className="flex-grow max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8 pb-20">
        {/* HERO SECTION */}
        <div className="text-center mb-12 md:mb-16 pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full font-medium text-[13px] mb-6 tracking-wide">
            <Layout size={14} />
            {tools.length} Free Tools Available
          </div>

          <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold text-gray-900 tracking-tight mb-5 leading-tight">
            All Free Online Tools –{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              No Signup Required
            </span>
          </h1>

          <p className="text-[15px] text-gray-500 max-w-3xl mx-auto leading-relaxed tracking-wide">
            Explore our entire set of free online tools, ranging from JSON
            formatter & validator to image optimizer, QR code creator, password
            generator, word counter, Base64 encoder, and AI prompt generators.
            Absolutely free, no registration, ready to use right away!
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mt-8 text-[13px] text-gray-500 tracking-wide">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
              <span className="font-medium text-gray-700">
                {tools.length} Tools
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
              <span className="font-medium text-gray-700">
                {toolCategories.length} Categories
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span className="font-medium text-gray-700">0 Signups</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
              <span className="font-medium text-gray-700">100% Free</span>
            </div>
          </div>
        </div>

        {/* Banner ad here */}

        <ResponsiveAd />

        {/* SEARCH + CATEGORY FILTERS */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-15 transition duration-300"></div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search tools — 'JSON formatter', 'image compressor'..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-14 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition text-[15px] tracking-wide"
                aria-label="Search free online tools"
              />
              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 tracking-wide ${
                selectedCategory === "All"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-200/50"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-indigo-300 hover:shadow-sm"
              }`}
            >
              All ({tools.length})
            </button>

            {toolCategories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setSelectedCategory(cat.category)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 tracking-wide ${
                  selectedCategory === cat.category
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-200/50"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-indigo-300 hover:shadow-sm"
                }`}
              >
                {cat.category} ({cat.tools.length})
              </button>
            ))}
          </div>
        </div>

        {/* CATEGORY HEADING */}
        {selectedCategory !== "All" && !searchTerm.trim() && (
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Free {selectedCategory}
            </h2>
            <p className="text-[14px] text-gray-500 mt-1 tracking-wide">
              {filteredTools.length} tools available – click any tool to start
              using it instantly
            </p>
          </div>
        )}

        {/* SEARCH RESULTS HEADING */}
        {searchTerm.trim() && (
          <div className="mb-8 flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              {filteredTools.length} result
              {filteredTools.length !== 1 ? "s" : ""}
            </h2>
            <span className="text-gray-400 text-[14px]">for</span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-semibold text-[13px] tracking-wide">
              &quot;{searchTerm}&quot;
            </span>
          </div>
        )}

        {/* TOOLS GRID */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-200/80">
            <div className="text-6xl mb-6 opacity-40">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3 tracking-tight">
              No tools found
            </h3>
            <p className="text-gray-500 text-[14px] max-w-md mx-auto tracking-wide mb-6">
              Try adjusting your search term or select a different category.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="text-indigo-600 hover:text-indigo-800 font-semibold text-[14px] tracking-wide"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredTools.map((tool, index) => (
              <Link
                key={tool.path}
                href={tool.path}
                className="group relative bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-1.5"
              >
                {index < 3 &&
                  selectedCategory === "All" &&
                  !searchTerm.trim() && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md shadow-orange-200/60 z-10">
                      #{index + 1}
                    </div>
                  )}

                <div className="text-3xl mb-3">{getToolEmoji(tool.path)}</div>

                <div className="mb-2">
                  <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full tracking-wide">
                    {tool.category}
                  </span>
                </div>

                <h3 className="font-semibold text-[15px] text-gray-900 group-hover:text-indigo-700 transition-colors mb-2 tracking-tight line-clamp-2 min-h-[2.5rem]">
                  {tool.name}
                </h3>

                <p className="text-gray-500 text-[13px] flex-grow mb-5 line-clamp-2 leading-relaxed tracking-wide">
                  {tool.description || "Free online tool – no signup required"}
                </p>

                <div className="mt-auto text-indigo-600 font-semibold text-[13px] inline-flex items-center gap-2 group-hover:gap-3 transition-all tracking-wide">
                  Use Free <ArrowRight size={14} />
                </div>

                {/* Hover Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-purple-50/0 to-pink-50/0 group-hover:from-indigo-50/60 group-hover:via-purple-50/40 group-hover:to-pink-50/40 transition-all duration-500 -z-10 rounded-2xl"></div>
              </Link>
            ))}
          </div>
        )}

        {/* FAQ SECTION */}
        {!searchTerm.trim() && (
          <section className="mt-24 mb-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-14">
                <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-gray-900 mb-3 tracking-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-[15px] text-gray-500 max-w-2xl mx-auto leading-relaxed tracking-wide">
                  Common questions about our free online tools – how they work,
                  privacy, and device support
                </p>
              </div>

              <div className="space-y-3">
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden hover:border-indigo-200 transition-colors duration-300"
                  >
                    <button
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                      className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                      aria-expanded={openFaq === index}
                    >
                      <h3 className="text-[15px] font-semibold text-gray-900 pr-4 leading-snug tracking-tight">
                        {item.question}
                      </h3>
                      <ChevronDown
                        size={18}
                        className={`text-indigo-500 flex-shrink-0 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <p className="px-5 md:px-6 pb-5 md:pb-6 text-gray-600 leading-relaxed text-[14px] tracking-wide">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Native ad here */}

      <script
        async="async"
        data-cfasync="false"
        src="https://pl29796844.effectivecpmnetwork.com/4c385cac6f0784aa3165d3a9e7478f20/invoke.js"
      ></script>
      <div id="container-4c385cac6f0784aa3165d3a9e7478f20"></div>
    </div>
  );
}
