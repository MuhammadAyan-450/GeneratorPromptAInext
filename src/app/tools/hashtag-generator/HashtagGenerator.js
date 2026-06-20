"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Copy,
  RefreshCw,
  Hash,
  Home,
  ChevronDown,
  Zap,
  BarChart2,
  Target,
  Clock,
  Code,
  HelpCircle,
  Shield,
  Globe,
  FileText,
  Download,
} from "lucide-react";
import ResponsiveAd from "../../../components/ResponsiveAd";

// ─── Data ─────────────────────────────────────────────────────────────────────
const PLATFORMS = [
  {
    value: "instagram",
    label: "Instagram",
    maxTags: 30,
    tip: "Use 20-30 hashtags in first comment for best reach",
  },
  {
    value: "tiktok",
    label: "TikTok",
    maxTags: 10,
    tip: "5-10 hashtags work best on TikTok",
  },
  {
    value: "youtube",
    label: "YouTube",
    maxTags: 15,
    tip: "Use 3-5 relevant tags in description",
  },
  {
    value: "twitter",
    label: "Twitter/X",
    maxTags: 3,
    tip: "1-3 hashtags get the most engagement",
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    maxTags: 10,
    tip: "3-10 professional hashtags work best",
  },
];

const CATEGORIES = [
  {
    label: "Food",
    keywords:
      "food, foodie, karachi food, street food, recipe, cooking, iftar, biryani, desi food",
  },
  {
    label: "Travel",
    keywords:
      "travel, wanderlust, pakistan travel, lahore, karachi, islamabad, hunza, explore",
  },
  {
    label: "Fashion",
    keywords:
      "fashion, style, ootd, outfit, clothing, streetstyle, trending fashion, desi fashion",
  },
  {
    label: "Fitness",
    keywords:
      "fitness, workout, gym, motivation, health, exercise, bodybuilding, fit lifestyle",
  },
  {
    label: "Tech",
    keywords:
      "tech, programming, coding, software, AI, developer, javascript, python, startup",
  },
  {
    label: "Business",
    keywords:
      "business, entrepreneur, startup, money, success, hustle, marketing, growth",
  },
  {
    label: "Ramadan",
    keywords:
      "ramadan, iftar, sehri, ramadan mubarak, ramadan2026, fasting, dua, quran",
  },
  {
    label: "Eid",
    keywords:
      "eid, eid mubarak, eid2026, celebration, eid ul fitr, eid outfit, eid vibes",
  },
  {
    label: "Photography",
    keywords:
      "photography, photo, portrait, landscape, camera, photographer, shotoniphone",
  },
  {
    label: "Gaming",
    keywords:
      "gaming, gamer, esports, pubg, freefire, valorant, minecraft, twitch, stream",
  },
];

const MODIFIERS = {
  trending: [
    "2026",
    "trending",
    "viral",
    "fyp",
    "explorepage",
    "trendingnow",
    "reels",
    "viralvideo",
    "instareels",
    "tiktokpakistan",
  ],
  common: [
    "love",
    "daily",
    "best",
    "pro",
    "tips",
    "life",
    "style",
    "vibes",
    "goals",
    "inspiration",
    "motivation",
    "beautiful",
    "happy",
    "fun",
    "instagood",
    "photooftheday",
    "follow",
  ],
  desi: [
    "dil",
    "pyar",
    "zindagi",
    "khushi",
    "desi",
    "pakistani",
    "subhanallah",
    "alhamdulillah",
    "mashallah",
    "dua",
    "sukoon",
    "junoon",
    "yaar",
    "maza",
    "swag",
  ],
  niche: [
    "official",
    "community",
    "creator",
    "content",
    "network",
    "hub",
    "world",
    "nation",
    "lovers",
    "addicts",
    "fanatics",
    "culture",
    "squad",
  ],
};

function buildHashtags(words, language, maxLength) {
  const generated = new Set();

  words.forEach((w) => {
    generated.add(`#${w}`);
    generated.add(`#${w.charAt(0).toUpperCase()}${w.slice(1)}`);
  });

  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
      const a = words[i],
        b = words[j];
      generated.add(`#${a}${b.charAt(0).toUpperCase()}${b.slice(1)}`);
      generated.add(`#${b}${a.charAt(0).toUpperCase()}${a.slice(1)}`);
    }
  }

  const mods =
    language === "urdu-roman"
      ? [...MODIFIERS.trending, ...MODIFIERS.desi]
      : language === "mixed"
        ? [
            ...MODIFIERS.trending,
            ...MODIFIERS.common,
            ...MODIFIERS.desi,
            ...MODIFIERS.niche,
          ]
        : [...MODIFIERS.trending, ...MODIFIERS.common, ...MODIFIERS.niche];

  mods.forEach((mod) => {
    words.forEach((word) => {
      const M = mod.charAt(0).toUpperCase() + mod.slice(1);
      const W = word.charAt(0).toUpperCase() + word.slice(1);
      generated.add(`#${word}${M}`);
      generated.add(`#${M}${W}`);
      generated.add(`#${mod}${word}`);
    });
  });

  let list = Array.from(generated).sort(() => Math.random() - 0.5);

  if (maxLength !== "all") {
    list = list.filter((tag) => {
      const len = tag.length - 1;
      if (maxLength === "short") return len <= 12;
      if (maxLength === "medium") return len > 12 && len <= 20;
      if (maxLength === "long") return len > 20;
      return true;
    });
  }

  return list;
}

function getTier(tag) {
  const t = tag.toLowerCase().replace("#", "");
  const isTrending = MODIFIERS.trending.some((m) => t.includes(m));
  const isCommon = MODIFIERS.common.some((m) => t.includes(m));
  const isShort = t.length <= 8;
  if (isTrending || isShort) return "high";
  if (isCommon) return "medium";
  return "low";
}

const HashtagGenerator = () => {
  const [keywords, setKeywords] = useState("");
  const [excludeWords, setExcludeWords] = useState("");
  const [numHashtags, setNumHashtags] = useState(30);
  const [maxLength, setMaxLength] = useState("all");
  const [language, setLanguage] = useState("english");
  const [platform, setPlatform] = useState("instagram");
  const [hashtags, setHashtags] = useState([]);
  const [copied, setCopied] = useState("");
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const currentPlatform = PLATFORMS.find((p) => p.value === platform);

  const generateHashtags = () => {
    setError("");
    if (!keywords.trim()) {
      setError("Please enter some keywords or a topic.");
      return;
    }

    const exclude = excludeWords
      .toLowerCase()
      .split(/[\s,]+/)
      .filter(Boolean);
    const words = keywords
      .toLowerCase()
      .split(/[\s,]+/)
      .map((w) => w.trim().replace(/[^a-z0-9]/g, ""))
      .filter((w) => w.length > 2 && !exclude.includes(w));

    if (!words.length) {
      setError("No valid keywords found. Try different words.");
      return;
    }

    const limit = Math.min(numHashtags, currentPlatform.maxTags * 2);
    const list = buildHashtags(words, language, maxLength).slice(0, limit);
    setHashtags(list);
  };

  const copyGroup = (group) => {
    const tags = hashtags.filter((t) => getTier(t) === group).join(" ");
    navigator.clipboard.writeText(tags);
    setCopied(group);
    setTimeout(() => setCopied(""), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(hashtags.join(" "));
    setCopied("all");
    setTimeout(() => setCopied(""), 2000);
  };

  const charCount = hashtags.join(" ").length;
  const highTags = hashtags.filter((t) => getTier(t) === "high");
  const medTags = hashtags.filter((t) => getTier(t) === "medium");
  const lowTags = hashtags.filter((t) => getTier(t) === "low");

  const reset = () => {
    setKeywords("");
    setExcludeWords("");
    setHashtags([]);
    setError("");
    setCopied("");
    setNumHashtags(30);
    setMaxLength("all");
    setLanguage("english");
    setPlatform("instagram");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-6">
        <nav aria-label="Breadcrumb">
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
                Hashtag Generator
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <Hash className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Hashtag Generator
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Generate low competition hashtags for Instagram Reels, TikTok, and
            YouTube. Sorted by viral, medium, and niche tiers. Includes Urdu
            Romanized & Desi tags.
          </p>
        </div>

        <ResponsiveAd />

        {/* Tool Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          {/* Platform Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Platform
            </label>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => {
                    setPlatform(p.value);
                    setNumHashtags(Math.min(numHashtags, p.maxTags));
                  }}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${platform === p.value ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-600 border-gray-200 hover:border-sky-400"}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            {currentPlatform && (
              <p className="text-xs text-gray-400 mt-2">
                {currentPlatform.tip}
              </p>
            )}
          </div>

          {/* Category Presets */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Quick Category Presets
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setKeywords(cat.keywords)}
                  className="px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 transition-all"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Keywords / Topic
              </label>
              <textarea
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. karachi food, street eats, pakistani cuisine, iftar ideas"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 text-sm resize-y"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Hashtags
              </label>
              <select
                value={numHashtags}
                onChange={(e) => setNumHashtags(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-800"
              >
                {[10, 15, 20, 25, 30, 50]
                  .filter((n) => n <= currentPlatform.maxTags * 2)
                  .map((n) => (
                    <option key={n} value={n}>
                      {n} hashtags
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Length Filter
              </label>
              <select
                value={maxLength}
                onChange={(e) => setMaxLength(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-800"
              >
                <option value="all">All lengths</option>
                <option value="short">Short (≤12 chars)</option>
                <option value="medium">Medium (13-20)</option>
                <option value="long">Long (21+)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Language Style
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-800"
              >
                <option value="english">English</option>
                <option value="urdu-roman">Urdu Romanized</option>
                <option value="mixed">Mixed (English + Desi)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Exclude Words
              </label>
              <input
                type="text"
                value={excludeWords}
                onChange={(e) => setExcludeWords(e.target.value)}
                placeholder="e.g. spam, nsfw"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-800 text-sm"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={generateHashtags}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <Zap size={18} /> Generate Hashtags
            </button>
            <button
              onClick={reset}
              className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Clear All
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Results Section */}
          {hashtags.length > 0 && (
            <div className="mt-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                  <div className="flex justify-center text-sky-500 mb-1">
                    <Hash size={20} />
                  </div>
                  <p className="text-lg font-bold text-gray-800">
                    {hashtags.length}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Total Tags</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                  <div className="flex justify-center text-sky-500 mb-1">
                    <Zap size={20} />
                  </div>
                  <p className="text-lg font-bold text-gray-800">
                    {highTags.length}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">High Comp</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                  <div className="flex justify-center text-sky-500 mb-1">
                    <BarChart2 size={20} />
                  </div>
                  <p className="text-lg font-bold text-gray-800">
                    {medTags.length}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Medium Comp</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                  <div className="flex justify-center text-sky-500 mb-1">
                    <Target size={20} />
                  </div>
                  <p className="text-lg font-bold text-gray-800">
                    {lowTags.length}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Low Comp</p>
                </div>
              </div>

              {/* Copy All & Char Count */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>
                    <strong className="text-gray-800">{charCount}</strong> /
                    2,200 chars{" "}
                    {charCount > 2200 && (
                      <span className="text-red-500 ml-1">(over limit)</span>
                    )}
                  </span>
                </div>
                <button
                  onClick={copyAll}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  <Copy size={14} />{" "}
                  {copied === "all" ? "Copied!" : `Copy All ${hashtags.length}`}
                </button>
              </div>

              {/* Tiered Groups */}
              {[
                {
                  id: "high",
                  label: "High Competition (Viral Reach)",
                  tags: highTags,
                  borderColor: "border-sky-200",
                  bgColor: "bg-sky-50",
                  badgeBg: "bg-sky-100 text-sky-700",
                  copyBg: "bg-sky-600 hover:bg-sky-700 text-white",
                },
                {
                  id: "medium",
                  label: "Medium Competition (Sweet Spot)",
                  tags: medTags,
                  borderColor: "border-amber-200",
                  bgColor: "bg-amber-50",
                  badgeBg: "bg-amber-100 text-amber-700",
                  copyBg: "bg-amber-600 hover:bg-amber-700 text-white",
                },
                {
                  id: "low",
                  label: "Low Competition (Niche Reach)",
                  tags: lowTags,
                  borderColor: "border-green-200",
                  bgColor: "bg-green-50",
                  badgeBg: "bg-green-100 text-green-700",
                  copyBg: "bg-green-600 hover:bg-green-700 text-white",
                },
              ].map(
                ({ id, label, tags, borderColor, bgColor, badgeBg, copyBg }) =>
                  tags.length > 0 && (
                    <div
                      key={id}
                      className={`border rounded-2xl p-5 mb-4 ${borderColor} ${bgColor}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-sm font-semibold text-gray-800">
                            {label}
                          </span>
                          <span
                            className={`ml-2 text-xs px-2 py-0.5 rounded-full font-medium ${badgeBg}`}
                          >
                            {tags.length} tags
                          </span>
                        </div>
                        <button
                          onClick={() => copyGroup(id)}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-colors ${copyBg}`}
                        >
                          <Copy size={12} />{" "}
                          {copied === id ? "Copied!" : "Copy Group"}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              navigator.clipboard.writeText(tag);
                            }}
                            className="px-3 py-1.5 bg-white border border-gray-200 hover:border-sky-400 rounded-full text-sm text-gray-700 hover:text-sky-600 transition-all hover:scale-105 active:scale-95"
                            title="Click to copy"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  ),
              )}

              {/* Character Warning */}
              {charCount > 2200 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-2">
                  <p className="text-sm text-red-600">
                    <strong>Instagram character limit exceeded.</strong> Your
                    hashtags total {charCount} characters but Instagram caps at
                    2,200. Reduce the count or remove some long tags.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!hashtags.length && !error && (
            <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mt-4">
              <Hash size={32} className="mx-auto mb-3 text-gray-300" />
              <p>
                Enter keywords or pick a category preset, then click{" "}
                <strong className="text-gray-500">Generate Hashtags</strong>
              </p>
            </div>
          )}
        </div>

        {/* Native ad here */}

        <script
          async="async"
          data-cfasync="false"
          src="https://pl29796844.effectivecpmnetwork.com/4c385cac6f0784aa3165d3a9e7478f20/invoke.js"
        ></script>
        <div id="container-4c385cac6f0784aa3165d3a9e7478f20"></div>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Get More Impressions on Reels
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Pick Platform & Category",
                desc: "Select Instagram/TikTok and choose a preset like Food or Travel, or enter custom keywords.",
              },
              {
                step: "2",
                title: "Set Language & Filters",
                desc: "Choose English, Urdu Romanized, or Mixed. Filter by length if needed.",
              },
              {
                step: "3",
                title: "Generate & Copy",
                desc: "Click Generate. Copy High/Medium/Low tiers separately for a balanced mix.",
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

        {/* ─── Formulas / How It Works ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How Hashtag Generation Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            It combines your keywords with trending modifiers. Here's the logic.
          </p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Keyword Expansion
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                #food + #trending = #foodtrending
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Combines your input keywords with popular modifiers like
                'trending', 'viral', and '2026' to create high-volume tags.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Competition Tiering
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                if (isShort || isTrending) return "high";
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Classifies tags based on length and popularity. Short/viral tags
                are High Comp, niche-specific ones are Low Comp.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">
                Privacy Note
              </h3>
              <p className="text-sky-800 text-xs leading-relaxed">
                All generation happens locally in your browser. No data is sent
                to any server. 100% private.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Real Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sample Hashtag Sets
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            See how different locales produce different results.
          </p>

          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-lg">
                  English Locale
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="font-mono text-sm text-gray-800 break-all">
                  #Food #Foodie #KarachiFood #StreetFood #Recipe #Cooking #Iftar
                  #Biryani #DesiFood #FoodLovers #InstaFood #Yummy #Delicious
                  #FoodPorn #Chef #HomeCooking #FoodBlogger #Tasty #Eat
                  #FoodStagram
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded-lg">
                  Urdu Romanized Locale
                </span>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="font-mono text-sm text-gray-800 break-all">
                  #Dil #Pyar #Zindagi #Khushi #Desi #Pakistani #Subhanallah
                  #Alhamdulillah #Mashallah #Dua #Sukoon #Junoon #Yaar #Maza
                  #Swag #DesiVibes #PakistaniCulture #UrduPoetry #Shayari #Love
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses Hashtag Generators?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Not just influencers. Here's where smart tagging matters.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Zap size={20} className="text-sky-600" />,
                title: "Content Creators",
                desc: "Boost reach on Instagram Reels and TikTok by using the right mix of viral and niche tags.",
              },
              {
                icon: <BarChart2 size={20} className="text-green-600" />,
                title: "Social Media Managers",
                desc: "Save hours of research by generating platform-specific tag sets for clients instantly.",
              },
              {
                icon: <Globe size={20} className="text-violet-600" />,
                title: "Small Businesses",
                desc: "Get discovered by local customers using location-based and industry-specific hashtags.",
              },
              {
                icon: <HelpCircle size={20} className="text-amber-600" />,
                title: "Influencers",
                desc: "Stay ahead of trends with auto-generated viral tags for maximum engagement.",
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

        {/* ─── SEO Content ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Smart Hashtag Strategy Matters
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Most hashtag tools dump a random list of tags and leave you guessing
            which ones will actually get views. Our free hashtag generator is
            different — it automatically sorts every hashtag into{" "}
            <strong>high</strong>, <strong>medium</strong>, and{" "}
            <strong>low competition</strong> tiers so you know exactly which
            tags will bring viral reach and which ones will help you get
            discovered in your niche.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Whether you are posting Instagram reels, TikTok videos, YouTube
            Shorts, or Twitter threads, the strategy is the same: mix a few
            viral hashtags with targeted niche tags. Our tool makes this easy by
            giving you copy buttons for each tier separately.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Built with Pakistani creators in mind — choose{" "}
            <strong>Urdu Romanized</strong> or <strong>Mixed</strong> language
            style to get desi hashtags like{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
              #desi
            </code>
            ,{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
              #zindagi
            </code>
            ,{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
              #subhanallah
            </code>{" "}
            alongside trending English tags.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Privacy Note
          </h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser. No data is sent to any server.
            Your keyword inputs are never stored or tracked. Close the tab and
            it's gone. That's how it should be.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need emojis for your captions? Try the{" "}
            <Link
              href="/tools/emoji-picker"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              Emoji Picker
            </Link>
            . Counting characters for bio limits? The{" "}
            <Link
              href="/tools/word-counter"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              Word Counter
            </Link>{" "}
            has your back.
          </p>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              {
                q: "How to get more impressions on Instagram reels with hashtags?",
                a: "Use a mix of 5 high-competition viral hashtags, 15 medium-competition relevant hashtags, and 5-10 low-competition niche hashtags. Place them in the first comment, not the caption. Our tool automatically sorts your hashtags into these three tiers.",
              },
              {
                q: "How many hashtags for Instagram reels to go viral in 2026?",
                a: "Instagram allows up to 30 hashtags per post. The best strategy in 2026 is using 25-30 hashtags with a mix of all three competition tiers. Avoid using only viral hashtags — niche tags help the algorithm understand your content.",
              },
              {
                q: "What are low competition hashtags and why do they matter?",
                a: "Low competition hashtags have fewer posts but a highly targeted audience. When you use them, your post is much more likely to appear on the Explore page for that specific tag. They matter because they bring in views from people actually interested in your niche.",
              },
              {
                q: "How to find trending hashtags for TikTok Pakistan?",
                a: "Enter your topic keywords in our tool, select TikTok as the platform, and choose Mixed or Urdu Romanized language style. The tool will generate hashtags including Pakistani trending tags like #tiktokpakistan, #desi, and niche-specific tags for your content.",
              },
              {
                q: "Best hashtag strategy for small Instagram accounts?",
                a: "Small accounts should focus heavily on low and medium competition hashtags. Use only 3-5 high-competition tags and fill the rest with niche-specific tags. This maximizes the chance of appearing in search results for your specific niche.",
              },
              {
                q: "Can I generate Urdu or Romanized Pakistani hashtags?",
                a: "Yes. Select Urdu Romanized or Mixed language style to include desi modifiers like #desi, #pakistani, #subhanallah, #zindagi, #pyar, #dil and more. These work well for Pakistani audience content on Instagram and TikTok.",
              },
              {
                q: "Does this tool work for YouTube and Twitter?",
                a: "Yes. Select YouTube or Twitter/X from the platform dropdown. The tool adjusts the maximum number of hashtags recommended for each platform (15 for YouTube, 3 for Twitter) to ensure optimal performance.",
              },
              {
                q: "Is this hashtag generator free?",
                a: "Yes, 100% free. No signup, no account, no limits. Generate as many hashtag sets as you need for your social media content.",
              },
            ].map((item, i) => (
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

        {/* ─── Related Tools (Short Descriptions) ─── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related Social Media Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/emoji-picker",
                title: "Emoji Picker",
                desc: "Search & copy emojis.",
              },
              {
                href: "/tools/word-counter",
                title: "Word Counter",
                desc: "Count chars for bios.",
              },
              {
                href: "/tools/midjourney-prompt-generator",
                title: "Midjourney Prompts",
                desc: "Create AI image prompts.",
              },
              {
                href: "/tools/case-converter",
                title: "Case Converter",
                desc: "Change text case.",
              },
              {
                href: "/tools/remove-duplicate-lines",
                title: "Remove Duplicates",
                desc: "Clean up text lists.",
              },
              {
                href: "/tools/json-formatter",
                title: "JSON Formatter",
                desc: "Beautify JSON code.",
              },
            ].map((tool) => (
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

export default HashtagGenerator;
