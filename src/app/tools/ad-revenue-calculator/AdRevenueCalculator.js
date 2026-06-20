"use client";

import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import {
  Copy,
  RefreshCw,
  Home,
  ChevronDown,
  Download,
  DollarSign,
  BarChart3,
  Zap,
  Shield,
  Eye,
  MousePointerClick,
  Target,
  CheckCircle2,
  Calculator,
  TrendingUp,
  Users,
  Monitor,
} from "lucide-react";
import AIHelper from "../../../components/AIHelper";
import ResponsiveAd from "../../../components/ResponsiveAd";

const AdRevenueCalculator = () => {
  const [impressions, setImpressions] = useState("");
  const [cpm, setCpm] = useState("");
  const [cpc, setCpc] = useState("");
  const [ctr, setCtr] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    {
      id: "display",
      name: "Display Ads",
      icon: "🖥️",
      cpmMult: 1.0,
      cpcMult: 1.0,
    },
    {
      id: "native",
      name: "Native Ads",
      icon: "📰",
      cpmMult: 1.3,
      cpcMult: 1.5,
    },
    { id: "video", name: "Video Ads", icon: "🎬", cpmMult: 2.2, cpcMult: 1.8 },
    { id: "popup", name: "Popup Ads", icon: "📢", cpmMult: 0.8, cpcMult: 0.7 },
    {
      id: "interstitial",
      name: "Interstitial Ads",
      icon: "📱",
      cpmMult: 1.8,
      cpcMult: 1.2,
    },
    {
      id: "rich",
      name: "Rich Media Ads",
      icon: "🎨",
      cpmMult: 2.5,
      cpcMult: 2.0,
    },
  ];

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const calculate = () => {
    if (!impressions || !cpm) {
      setError("Please enter at least impressions and CPM");
      return;
    }
    if (selectedCategories.length === 0) {
      setError("Please select at least one ad category");
      return;
    }

    const imp = parseFloat(impressions);
    const baseCpm = parseFloat(cpm);
    const baseCpc = parseFloat(cpc) || 0;
    const baseCtr = parseFloat(ctr) || 0;

    const results = selectedCategories.map((catId) => {
      const cat = categories.find((c) => c.id === catId);
      const effectiveCpm = baseCpm * cat.cpmMult;
      const effectiveCpc = baseCpc * cat.cpcMult;
      const clicks = (imp * baseCtr) / 100;
      const cpmRevenue = (imp / 1000) * effectiveCpm;
      const cpcRevenue = clicks * effectiveCpc;
      const totalRevenue = cpmRevenue + cpcRevenue;
      return {
        ...cat,
        effectiveCpm: effectiveCpm.toFixed(2),
        effectiveCpc: effectiveCpc.toFixed(2),
        clicks: Math.round(clicks),
        cpmRevenue: cpmRevenue.toFixed(2),
        cpcRevenue: cpcRevenue.toFixed(2),
        totalRevenue: totalRevenue.toFixed(2),
      };
    });

    const grandTotal = results.reduce(
      (sum, r) => sum + parseFloat(r.totalRevenue),
      0,
    );

    setError("");
    setResult({ results, grandTotal: grandTotal.toFixed(2) });
  };

  const copyResult = () => {
    if (!result) return;
    const text = result.results
      .map((r) => `${r.name}: $${r.totalRevenue} (CPM: $${r.effectiveCpm})`)
      .join("\n");
    navigator.clipboard.writeText(
      `Ad Revenue Estimate\n\n${text}\n\nGrand Total: $${result.grandTotal}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    const text = result.results
      .map(
        (r) =>
          `${r.name}: $${r.totalRevenue} (CPM: $${r.effectiveCpm}, CPC: ${r.effectiveCpc}, Clicks: ${r.clicks})`,
      )
      .join("\n");
    const file = new Blob(
      [
        `Ad Revenue Calculation\n\n${text}\n\nGrand Total: $${result.grandTotal}`,
      ],
      { type: "text/plain" },
    );
    const el = document.createElement("a");
    el.href = URL.createObjectURL(file);
    el.download = "ad-revenue-calculation.txt";
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  };

  const reset = () => {
    setImpressions("");
    setCpm("");
    setCpc("");
    setCtr("");
    setSelectedCategories([]);
    setResult(null);
    setError("");
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto w-full px-4 pt-6">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-gray-500"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-sky-600 transition-colors"
          >
            <Home size={14} /> Home
          </Link>
          <span className="text-gray-300">/</span>
          <Link
            href="/pages/all-tools"
            className="hover:text-sky-600 transition-colors"
          >
            All Tools
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-semibold">
            Ad Revenue Calculator
          </span>
        </nav>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-2xl mb-4">
            <BarChart3 className="text-sky-600" size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Website Ad Revenue Calculator — Estimate Your Advertising Earnings
            Free
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            The most complete online ad revenue estimator for websites, apps,
            and mobile. Enter your impressions, CPM, and CPC — get a full
            advertising revenue breakdown across 6 ad formats instantly. No
            signup, no cost, works for display, video, native, and more.
          </p>
        </div>

        <ResponsiveAd />

        {/* Tool Card */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 md:p-10 mb-8">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Total Impressions
              </label>
              <div className="relative">
                <Eye
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="number"
                  placeholder="e.g. 500000"
                  value={impressions}
                  onChange={(e) => setImpressions(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 bg-gray-50 placeholder:text-gray-400"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1.5">
                Find this in your AdSense, Mediavine, or Ezoic dashboard under
                impressions or pageviews.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  CPM ($)
                </label>
                <div className="relative">
                  <DollarSign
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="number"
                    placeholder="e.g. 5.00"
                    value={cpm}
                    onChange={(e) => setCpm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 bg-gray-50 placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  CPC ($){" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <MousePointerClick
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="number"
                    placeholder="e.g. 0.50"
                    value={cpc}
                    onChange={(e) => setCpc(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 bg-gray-50 placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  CTR (%){" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <Target
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 1.5"
                    value={ctr}
                    onChange={(e) => setCtr(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 bg-gray-50 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Category Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Ad Format <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`p-3.5 rounded-xl border-2 text-left transition-all text-sm font-medium ${
                      selectedCategories.includes(cat.id)
                        ? "border-sky-500 bg-sky-50 text-sky-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-sky-300 hover:bg-sky-50/50"
                    }`}
                  >
                    <span className="text-lg block mb-1">{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <AIHelper
              toolName="Ad Revenue Calculator"
              prompt={`User has calculated ad revenue.
Please tell me:
1. How to increase website ad revenue?
2. How to get a better CPM rate?
3. What is the best website monetization strategy?
Give practical earning tips and tricks.`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={calculate}
                disabled={
                  !impressions || !cpm || selectedCategories.length === 0
                }
                className="bg-sky-600 hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2.5"
              >
                <BarChart3 size={18} /> Calculate Ad Revenue
              </button>
              <button
                onClick={reset}
                className="bg-white border-2 border-sky-200 text-sky-700 hover:bg-sky-50 font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2.5"
              >
                <RefreshCw size={18} /> Reset
              </button>
            </div>

            {/* Results */}
            {result && (
              <div className="border border-gray-100 rounded-2xl overflow-hidden">
                <div className="bg-sky-50 border-b border-sky-100 px-5 py-3 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-sky-600" />
                  <span className="text-sm font-bold text-sky-700">
                    Ad Revenue Breakdown by Format
                  </span>
                </div>
                <div className="p-5">
                  <div className="space-y-3 mb-5">
                    {result.results.map((r) => (
                      <div
                        key={r.id}
                        className="bg-gray-50 border border-gray-100 rounded-xl p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{r.icon}</span>
                            <span className="font-bold text-gray-900 text-sm">
                              {r.name}
                            </span>
                          </div>
                          <span className="text-lg font-bold text-green-600">
                            ${r.totalRevenue}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                          <span>CPM: ${r.effectiveCpm}</span>
                          <span>CPC: ${r.effectiveCpc}</span>
                          <span>Clicks: {r.clicks.toLocaleString()}</span>
                          <span>CPM Rev: ${r.cpmRevenue}</span>
                          {parseFloat(r.cpcRevenue) > 0 && (
                            <span>CPC Rev: ${r.cpcRevenue}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center mb-5">
                    <p className="text-xs text-green-500 uppercase font-bold tracking-wider mb-1">
                      Total Estimated Ad Revenue
                    </p>
                    <p className="text-3xl md:text-4xl font-extrabold text-green-700">
                      ${result.grandTotal}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-5">
                    <button
                      onClick={copyResult}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
                    >
                      <Copy size={15} /> {copied ? "Copied!" : "Copy Result"}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold transition-all"
                    >
                      <Download size={15} /> Download .txt
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Native ad — position unchanged */}
          <script
            async="async"
            data-cfasync="false"
            src="https://pl29796844.effectivecpmnetwork.com/4c385cac6f0784aa3165d3a9e7478f20/invoke.js"
          ></script>
          <div id="container-4c385cac6f0784aa3165d3a9e7478f20"></div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              {
                icon: <Zap size={20} className="text-amber-500" />,
                title: "6 Ad Formats",
                desc: "Compare display, native, video, popup, interstitial, and rich media side by side.",
              },
              {
                icon: <BarChart3 size={20} className="text-green-600" />,
                title: "CPM + CPC Together",
                desc: "Most calculators do one or the other. This one handles both in a single estimate.",
              },
              {
                icon: <Shield size={20} className="text-sky-600" />,
                title: "100% Free",
                desc: "No account, no signup, no limits. Calculate as many times as you need.",
              },
              {
                icon: <Target size={20} className="text-violet-600" />,
                title: "Works for Apps Too",
                desc: "Mobile app ad revenue, AdMob estimates, in-app advertising — all supported.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-sky-300 transition-all"
              >
                <div className="mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          {/* ─── What Is This ─── */}
          <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What Is a Website Ad Revenue Calculator?
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              A website ad revenue calculator — also called a website
              advertising revenue estimator — is a tool that takes your traffic
              and ad metrics and tells you how much money your site could earn
              from ads. You plug in your impressions, your CPM rate, and
              optionally your CPC and CTR, and you get an estimated advertising
              revenue figure broken down by ad format.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              This particular online ad revenue calculator goes further than
              most. Instead of giving you a single blended number, it calculates
              estimated revenue separately for display ads, native ads, video
              ads, popup ads, interstitial ads, and rich media ads — using real
              industry multipliers for each format. So you can see not just how
              much your site earns now, but how much it could earn if you
              switched to a higher-paying format.
            </p>
            <p className="text-gray-600 leading-relaxed">
              It also works as a mobile ad revenue calculator and app
              advertising revenue calculator — the same CPM and CPC logic
              applies to mobile inventory, whether you're running Google AdMob,
              Unity Ads, or any other mobile ad network.
            </p>
          </section>

          {/* ─── How to Use ─── */}
          <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              How to Calculate Ad Revenue for Your Website
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Four inputs, one click, and you have a complete advertising
              revenue estimate across every format.
            </p>
            <ol className="space-y-5">
              {[
                {
                  step: "1",
                  title: "Enter your monthly impressions",
                  desc: "Open your ad network dashboard — AdSense, Mediavine, Ezoic, AdMob, or whatever you use — and find your monthly impression count. If you only have pageview data from Google Analytics, use that as your starting point. One pageview typically generates 2–4 ad impressions depending on how many ad units you show per page.",
                },
                {
                  step: "2",
                  title: "Enter your CPM — and optionally CPC and CTR",
                  desc: "CPM is what your network pays per 1,000 impressions. Find this in your dashboard under Page RPM or eCPM. If you also run click-based ads, enter your CPC and the CTR percentage — the calculator will use those to estimate additional click revenue on top of your impression revenue. Leave CPC and CTR at zero if you only run impression-based ads.",
                },
                {
                  step: "3",
                  title: "Select your ad formats",
                  desc: "Choose every format you currently run, or every format you're considering. The calculator applies a different multiplier to each one — video ads earn roughly 2.2x what display ads earn at the same CPM, rich media earns 2.5x. This is how you see the actual revenue difference between staying on display banners versus switching to video or native ads.",
                },
                {
                  step: "4",
                  title: "Click Calculate and read your ad revenue estimate",
                  desc: "Each selected format gets its own revenue line — CPM revenue, CPC revenue, and total. Below that, you get a grand total across all formats. Use this to compare scenarios: what happens to your monthly ad revenue if you add a video unit? What if you move from display to native? The numbers give you a concrete answer instead of a guess.",
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

          {/* ─── Formulas ─── */}
          <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              How to Calculate Ad Revenue — The Exact Formula
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              No hidden logic. Here's exactly how this website ad revenue
              estimator calculates every number.
            </p>

            <div className="space-y-5">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-2">
                  Revenue Per 1000 Impressions (CPM Revenue)
                </h3>
                <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                  CPM Revenue = (Impressions ÷ 1,000) × Effective CPM
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Effective CPM = your base CPM × the format multiplier. Display
                  ads use 1.0x (no change). Video uses 2.2x — so a $5 CPM
                  becomes $11 effective CPM for video inventory. Rich media uses
                  2.5x, making that same $5 CPM worth $12.50 per 1,000
                  impressions.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-2">
                  Click Revenue (CPC Revenue)
                </h3>
                <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                  Clicks = (Impressions × CTR%) ÷ 100{"\n"}
                  CPC Revenue = Clicks × Effective CPC
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  If you leave CPC at zero, this part equals zero and only CPM
                  revenue is calculated. Effective CPC also uses a format
                  multiplier — native ads typically pay more per click than
                  display, so they use a 1.5x CPC multiplier.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-2">
                  Total Advertising Revenue
                </h3>
                <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                  Total = CPM Revenue + CPC Revenue
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  The grand total sums all selected formats. This is your
                  estimated website advertising revenue for the impression
                  volume you entered.
                </p>
              </div>
            </div>

            <div className="mt-6 bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-800 text-sm mb-3">
                Ad Format Multipliers Used in This Calculator
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center gap-2 text-sky-700"
                  >
                    <span>{cat.icon}</span>
                    <span className="font-medium">{cat.name}:</span>
                    <span className="text-sky-500">
                      {cat.cpmMult}x CPM / {cat.cpcMult}x CPC
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── Real Examples ─── */}
          <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Website Ad Revenue Examples — Real Numbers by Traffic Level
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Three scenarios showing how much websites make from ads at
              different traffic levels and CPMs.
            </p>

            <div className="space-y-5">
              {[
                {
                  label: "Example 1",
                  title: "Small Blog — 30K Monthly Impressions",
                  inputs: [
                    ["Impressions", "30,000"],
                    ["CPM", "$1.50"],
                    ["CPC", "$0.10"],
                    ["CTR", "0.8%"],
                  ],
                  result:
                    "Display ads: $45/mo | Native (1.3x): $58.50/mo | All 6 formats combined: ~$150/mo",
                  note: "New sites with modest traffic still earn something. As traffic grows, the monthly ad revenue scales directly with it.",
                },
                {
                  label: "Example 2",
                  title: "Mid-Traffic Site — 200K Monthly Impressions",
                  inputs: [
                    ["Impressions", "200,000"],
                    ["CPM", "$4.00"],
                    ["CPC", "$0.30"],
                    ["CTR", "1.2%"],
                  ],
                  result:
                    "Display: $800 CPM + $720 CPC = $1,520/mo | Video (2.2x): $3,344/mo | Rich Media (2.5x): $3,800/mo",
                  note: "At this traffic level, the format you choose matters enormously. Video earns more than double what display earns on the same impressions.",
                },
                {
                  label: "Example 3",
                  title: "High-Traffic Site — 1M Monthly Impressions",
                  inputs: [
                    ["Impressions", "1,000,000"],
                    ["CPM", "$6.00"],
                    ["CPC", "$0"],
                    ["CTR", "0%"],
                  ],
                  result:
                    "Display: $6,000/mo | Video: $13,200/mo | Rich Media: $15,000/mo | Difference between display and rich media: $9,000/mo",
                  note: "A $9,000/month difference from the same traffic, just by switching ad formats. This is why format selection is the biggest lever on website ad revenue.",
                },
              ].map((item, i) => (
                <div key={i} className="border border-gray-100 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                      {item.label}
                    </span>
                    <h3 className="font-bold text-gray-900 text-sm">
                      {item.title}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    {item.inputs.map(([label, val], j) => (
                      <div key={j} className="bg-gray-50 rounded-lg p-3">
                        <p className="text-[11px] text-gray-400 uppercase font-bold">
                          {label}
                        </p>
                        <p className="text-sm font-bold text-gray-900">{val}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-lg p-3 mb-2">
                    <p className="text-xs font-semibold text-green-700">
                      {item.result}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Average Ad Revenue ─── */}
          <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How Much Do Websites Make From Ads? Average Ad Revenue Benchmarks
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              This is one of the most common questions new publishers ask, and
              the honest answer is: it varies enormously. But there are real
              benchmarks worth knowing.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              The average ad revenue for a website running display ads sits
              somewhere between $1 and $10 per 1,000 pageviews, depending on
              niche and traffic geography. Finance, legal, and insurance sites
              hit the high end. Entertainment and general lifestyle blogs sit at
              the low end. US and UK traffic pays 3–5x more than traffic from
              South or Southeast Asia because advertisers bid more for those
              audiences.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="text-left px-4 py-3 font-semibold">
                      Site Type / Niche
                    </th>
                    <th className="text-center px-4 py-3 font-semibold">
                      Avg CPM (Display)
                    </th>
                    <th className="text-center px-4 py-3 font-semibold">
                      100K Views/Month
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Finance & Insurance", "$8–$15", "$800–$1,500"],
                    ["Legal & Business", "$10–$20", "$1,000–$2,000"],
                    ["Health & Medical", "$5–$10", "$500–$1,000"],
                    ["Technology", "$3–$6", "$300–$600"],
                    ["Travel", "$3–$7", "$300–$700"],
                    ["Food & Recipes", "$2–$4", "$200–$400"],
                    ["Entertainment", "$1–$3", "$100–$300"],
                    ["General / Mixed", "$1.50–$4", "$150–$400"],
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={`${i % 2 === 1 ? "bg-gray-50" : "bg-white"} border-b border-gray-100`}
                    >
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {row[0]}
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-sky-600">
                        {row[1]}
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-green-600">
                        {row[2]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">
              These are display ad benchmarks. If you switch to video or rich
              media, multiply those figures by 2–2.5x to estimate your potential
              with higher-paying formats. Use the calculator above to run those
              comparisons with your actual traffic numbers.
            </p>

            <h3 className="text-lg font-bold text-gray-900 mb-3 mt-6">
              How to Generate Ad Revenue From a Website — What Actually Works
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Getting ad revenue from a website is straightforward in concept:
              sign up with an ad network, place their code on your site, and
              earn when visitors see or click ads. The real question is how to
              maximize what you earn from the traffic you already have.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              The biggest lever is ad format. A publisher earning $300/month
              from display ads on 100K monthly pageviews can often reach
              $600–$700 by adding a single video ad unit without gaining any
              additional traffic. The second biggest lever is ad placement — ads
              inside the content body, at natural reading pause points,
              outperform sidebar and footer placements by 2–3x in both CPM and
              CTR.
            </p>
            <p className="text-gray-600 leading-relaxed">
              After format and placement, the next variable is your ad network.
              Google AdSense is the easiest to start with. Mediavine and Raptive
              pay higher RPMs but require 50,000+ monthly sessions to qualify.
              For mobile apps, AdMob is the standard. The calculator above works
              for estimating revenue across all of these — just enter the CPM
              your network pays and select the format you're running.
            </p>
          </section>

          {/* ─── App Ad Revenue ─── */}
          <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Mobile App Ad Revenue Calculator — How It Works for Apps
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              This tool works just as well as a mobile app ad revenue calculator
              or an AdMob calculator. The underlying math is identical — you're
              still calculating revenue per 1,000 impressions or per click. The
              difference is the CPM rates and the ad formats available in apps
              versus websites.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              For in-app advertising revenue, interstitial ads are the dominant
              format — they show between game levels or app screens and command
              significantly higher CPMs than display banners. That's why the
              interstitial option in this calculator uses a 1.8x multiplier.
              Rewarded video ads (a type of video ad) are even higher in gaming
              apps, which is why video carries a 2.2x multiplier.
            </p>
            <p className="text-gray-600 leading-relaxed">
              To use this as an app monetization calculator: enter your monthly
              ad impressions from your AdMob or ironSource dashboard, your eCPM
              as the CPM field, and select the format your app uses
              (interstitial or video for most games, display for utility apps).
              The revenue estimate you get will be close to what your dashboard
              shows at the end of the month.
            </p>
          </section>

          {/* ─── Who Uses This ─── */}
          <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Who Uses This Online Advertising Revenue Calculator?
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Anyone who earns from online ads — or is deciding whether to.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: <Monitor size={20} className="text-sky-600" />,
                  title: "Bloggers & Content Publishers",
                  desc: "You're getting traffic but not sure if ads are worth the user experience tradeoff. Run your numbers through this website ad revenue estimator first. Seeing a concrete monthly figure for your actual traffic level makes the decision a lot clearer.",
                },
                {
                  icon: <TrendingUp size={20} className="text-green-600" />,
                  title: "Monetization & Product Teams",
                  desc: "Use this to model what happens to ad revenue when you change formats, add units, or shift traffic mix. It's faster than waiting for an A/B test to run, and useful for building business cases for format changes.",
                },
                {
                  icon: <Users size={20} className="text-violet-600" />,
                  title: "Marketing Agencies & Freelancers",
                  desc: "When a client asks how much their site could earn from ads, this gives you a defensible estimate in seconds. Walk them through the format comparison — showing them the gap between display and video earnings is often more persuasive than any written proposal.",
                },
                {
                  icon: <Calculator size={20} className="text-amber-600" />,
                  title: "Anyone Planning a New Site or App",
                  desc: "Before you spend six months building something, use this as an ad revenue website calculator to check if the numbers work. If your niche pays $2 CPM and you need $3,000/month to make it worthwhile, you know you need roughly 1.5 million monthly impressions. That's your goal from day one.",
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

          {/* ─── CPM vs CPC vs RPM ─── */}
          <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              CPM vs CPC vs RPM — What's the Difference and Which One Matters?
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              These three terms get mixed up constantly. Here's a clear
              breakdown of what each means and how they relate to your actual ad
              income.
            </p>

            <div className="space-y-4 mb-6">
              {[
                {
                  term: "CPM",
                  full: "Cost Per Mille (per 1,000 impressions)",
                  color: "sky",
                  desc: "What the advertiser pays — or what your ad network reports — for every 1,000 ad impressions served. This is the most common metric for display, video, and native ads. When your network says your CPM is $5, it means they pay $5 for every 1,000 times that ad appears.",
                },
                {
                  term: "CPC",
                  full: "Cost Per Click",
                  color: "green",
                  desc: "What you earn each time a visitor clicks an ad. More relevant for search-style ads and some native formats. CPC revenue only matters if you have a meaningful CTR — at 0.5% CTR and $0.50 CPC, 10,000 impressions generates 50 clicks and $25. At the same CPM of $5 per 1,000, those same 10,000 impressions would earn $50 from CPM alone.",
                },
                {
                  term: "RPM",
                  full: "Revenue Per Mille (per 1,000 pageviews)",
                  color: "violet",
                  desc: "Your actual realized earnings per 1,000 pageviews, after accounting for fill rate, ad blockers, and unsold inventory. RPM is what shows up in your AdSense or Mediavine dashboard and is the most honest measure of what you're actually making. A $10 CPM with 70% fill rate and 20% ad blocker usage means your effective RPM is closer to $5.60.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`border border-${item.color}-100 bg-${item.color}-50 rounded-xl p-5`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`font-mono font-bold text-${item.color}-700 bg-${item.color}-100 px-3 py-1 rounded-lg text-sm`}
                    >
                      {item.term}
                    </span>
                    <span className="text-gray-600 text-sm font-medium">
                      {item.full}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-gray-600 leading-relaxed">
              For this calculator, enter your CPM or RPM in the CPM field —
              either works. If you know your RPM from your dashboard, that's
              actually the more accurate input because it already reflects
              real-world conditions rather than the theoretical rate.
            </p>
          </section>

          {/* ─── FAQ ─── */}
          <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Frequently Asked Questions — Ad Revenue Calculator
            </h2>
            <div className="space-y-3 max-w-4xl mx-auto">
              {[
                {
                  q: "How do I calculate ad revenue for my website?",
                  a: "The formula is: Ad Revenue = (Impressions ÷ 1,000) × CPM. If you also run click-based ads, add: Clicks × CPC, where Clicks = Impressions × CTR%. Enter your numbers into the calculator above and it handles this automatically for each ad format. Your total estimated ad revenue appears instantly.",
                },
                {
                  q: "How much do websites make from ads per 1,000 views?",
                  a: "The average website earns between $1 and $10 per 1,000 pageviews from display ads, depending on niche and traffic source. Finance and legal sites hit the high end. Entertainment and lifestyle blogs sit at the low end. Video and rich media ads earn 2–2.5x more per 1,000 views than display ads at the same traffic level.",
                },
                {
                  q: "What is a good CPM for website ads?",
                  a: "For display ads with US traffic, a good CPM is $3–$7 for general content, $8–$15 for finance or insurance, and $2–$4 for entertainment. For video ads, multiply those figures by 2–2.5x. If you're below $1 CPM, your traffic is likely from low-bid geographies or your niche has weak advertiser demand.",
                },
                {
                  q: "How do I find my website's actual CPM?",
                  a: "Log into your ad network dashboard — AdSense, Mediavine, Ezoic, or whatever you use. Look for 'Page RPM' or 'eCPM' in your reports. That's your effective CPM. If your dashboard only shows total earnings and impressions, calculate it yourself: CPM = (Total Earnings ÷ Total Impressions) × 1,000.",
                },
                {
                  q: "Can I use this as a mobile app ad revenue calculator?",
                  a: "Yes. Enter your app's monthly impressions from your AdMob or mobile ad network dashboard, use your eCPM as the CPM input, and select interstitial or video ads — those are the dominant formats in mobile apps. The revenue estimate will be close to your actual monthly earnings from in-app advertising.",
                },
                {
                  q: "Why does the calculator show different amounts for different ad formats?",
                  a: "Because advertisers pay different rates for different formats. A video pre-roll is harder to ignore than a banner in a sidebar — so advertisers bid more for it. Based on industry data, video ads earn roughly 2.2x what display banners earn at the same base CPM, and rich media earns about 2.5x. The calculator applies these multipliers to give you a realistic comparison across formats.",
                },
                {
                  q: "How is ad revenue different from AdSense revenue?",
                  a: "AdSense is one specific ad network run by Google. Ad revenue is the broader concept — money earned from any ad network or format. This calculator works for any ad network. For AdSense specifically, you can also use our AdSense Revenue Calculator, which uses niche-specific RPM data for 12 content categories instead of requiring you to enter your own CPM.",
                },
                {
                  q: "How much ad revenue does a website with 10,000 visitors make?",
                  a: "It depends on how many pages per visit and what CPM you get. If 10,000 visitors each view 2 pages, that's 20,000 pageviews. At 2 ad impressions per page and a $3 CPM, that's 40,000 impressions × ($3 ÷ 1,000) = $120/month. At a higher CPM like $8 in a good niche, that's $320/month. Use the calculator above with your actual numbers for a more precise estimate.",
                },
                {
                  q: "What's the difference between CPM revenue and CPC revenue?",
                  a: "CPM revenue is what you earn based on impressions — every time your ad loads, you earn a fraction of the CPM rate. CPC revenue is what you earn when someone clicks. Some ad networks pay primarily on impressions (CPM), others primarily on clicks (CPC). Google AdSense uses a combination. This calculator handles both — enter CPC and CTR to include click revenue alongside your impression revenue.",
                },
                {
                  q: "Are these ad revenue estimates accurate?",
                  a: "They're estimates based on the numbers you provide and standard industry multipliers. Your real earnings depend on fill rate (not all impressions fill with paid ads), ad viewability, ad blocker usage among your audience, seasonality (Q4 is always higher), and your specific network's rates. Treat the estimates as a planning tool and comparison aid, not a guarantee. Your actual RPM from your dashboard is always the most accurate source.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="border border-gray-100 rounded-2xl overflow-hidden hover:border-sky-200 transition-colors duration-300"
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
                      size={20}
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

          {/* ─── Related Tools ─── */}
          <section className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Related Tools You Might Need
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  href: "/tools/adsense-revenue-calculator",
                  title: "AdSense Revenue Calculator",
                  desc: "Calculate Google AdSense earnings by niche with RPM data for 12+ categories.",
                },
                {
                  href: "/tools/youtube-ad-revenue-calculator",
                  title: "YouTube Ad Revenue Calculator",
                  desc: "Estimate YouTube earnings by video category, CPM, and audience tier.",
                },
                {
                  href: "/tools/cpm-calculator",
                  title: "CPM Calculator",
                  desc: "Calculate cost per 1,000 impressions, total campaign cost, or impression count.",
                },
                {
                  href: "/tools/cpc-calculator",
                  title: "CPC Calculator",
                  desc: "Find cost per click, total clicks, or campaign spend with CTR and CPM metrics.",
                },
                {
                  href: "/tools/profit-margin-calculator",
                  title: "Profit Margin Calculator",
                  desc: "Calculate profit margin %, markup %, and profit from cost and selling price.",
                },
                {
                  href: "/tools/ebay-charges-calculator",
                  title: "eBay Fee Calculator",
                  desc: "Calculate eBay final value fees, listing fees, and net profit on sales.",
                },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-sky-400 transition-all"
                >
                  <h3 className="font-bold text-gray-800 text-sm mb-1.5 group-hover:text-sky-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {tool.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdRevenueCalculator;
