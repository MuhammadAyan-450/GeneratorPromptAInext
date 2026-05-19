"use client";

import { useState } from "react";
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
            Ad Revenue Calculator
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Figuring out how much your website can actually make from ads? Stop
            guessing. Put in your impressions, CPM, and CPC — this calculator
            breaks down estimated earnings across 6 ad formats so you can see
            exactly where the money is.
          </p>
        </div>

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
                  CPC ($)
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
                  CTR (%)
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
                Select Ad Categories
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
3. What are the best website monetization strategies?
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
                <BarChart3 size={18} /> Calculate Revenue
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
                    Revenue Breakdown by Category
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
                      Grand Total Estimated Revenue
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

          {/* Features */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              {
                icon: <Zap size={20} className="text-amber-500" />,
                title: "Instant Estimate",
                desc: "Get ad revenue estimates in milliseconds for all categories.",
              },
              {
                icon: <BarChart3 size={20} className="text-green-600" />,
                title: "Category-Wise",
                desc: "See revenue breakdown for display, native, video, and more.",
              },
              {
                icon: <Shield size={20} className="text-sky-600" />,
                title: "100% Free",
                desc: "No signup, no limits, completely free to use.",
              },
              {
                icon: <Target size={20} className="text-violet-600" />,
                title: "CPM + CPC",
                desc: "Calculate revenue from both CPM and CPC models together.",
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

          {/* ─── How to Use ─── */}
          <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How to Use This Ad Revenue Calculator
            </h2>
            <ol className="space-y-5">
              {[
                {
                  step: "1",
                  title: "Enter your total impressions",
                  desc: 'Open your Google Analytics or AdSense dashboard and pick your monthly ad impressions. Type that number in — for example, "500000" for half a million impressions. If you only know pageviews, use that as a rough starting point.',
                },
                {
                  step: "2",
                  title: "Fill in your CPM, CPC, and CTR",
                  desc: 'Your base CPM is what your ad network pays per 1,000 impressions — check your AdSense or Mediavine report. CPC is optional but handy if you run click-based ads. CTR goes with CPC — if your CTR is 1.5% and you have 500K impressions, that means 7,500 clicks.',
                },
                {
                  step: "3",
                  title: "Pick the ad formats you run 'or want to test'",
                  desc: "Select one or more categories — display, native, video, popup, interstitial, or rich media. The calculator applies realistic multipliers to each format so you can compare earnings side by side. Pick all six if you want the full picture.",
                },
                {
                  step: "4",
                  title: "Hit calculate and check the breakdown",
                  desc: "You'll see estimated revenue for every selected format plus a grand total. Copy the results or download them as a text file. Run the numbers again with different CPMs to compare scenarios.",
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
              Ad Revenue Formulas — The Math Behind It
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              No hidden calculations. Here's exactly what this tool does with
              your numbers.
            </p>

            <div className="space-y-5">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-2">
                  CPM Revenue Formula
                </h3>
                <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                  CPM Revenue = (Impressions ÷ 1000) × Effective CPM
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Effective CPM = your base CPM × category multiplier. For
                  example, video ads use a 2.2x multiplier, so a $5 base CPM
                  becomes $11 for video.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-2">
                  CPC Revenue Formula
                </h3>
                <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                  Clicks = (Impressions × CTR) ÷ 100
                  <br />
                  CPC Revenue = Clicks × Effective CPC
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  If you leave CPC at 0, this part equals zero and only CPM
                  revenue is calculated. Effective CPC also uses the category
                  multiplier.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-2">
                  Total Revenue Formula
                </h3>
                <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                  Total Revenue = CPM Revenue + CPC Revenue
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Grand total is the sum of all selected categories' total
                  revenue. Simple addition, no tricks.
                </p>
              </div>
            </div>

            <div className="mt-6 bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-800 text-sm mb-2">
                Category Multipliers Used
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
              Ad Revenue Calculation Examples
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Walk through these real scenarios to see how the numbers work
              before you plug in your own.
            </p>

            <div className="space-y-5">
              <div className="border border-gray-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                    Example 1
                  </span>
                  <h3 className="font-bold text-gray-900 text-sm">
                    Mid-Traffic Blog with Display Ads Only
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[11px] text-gray-400 uppercase font-bold">
                      Impressions
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      200,000
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[11px] text-gray-400 uppercase font-bold">
                      CPM
                    </p>
                    <p className="text-sm font-bold text-gray-900">$4.00</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[11px] text-gray-400 uppercase font-bold">
                      CPC
                    </p>
                    <p className="text-sm font-bold text-gray-900">$0.30</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[11px] text-gray-400 uppercase font-bold">
                      CTR
                    </p>
                    <p className="text-sm font-bold text-gray-900">1.2%</p>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                  <p className="text-xs text-gray-500">
                    CPM Rev: (200,000 ÷ 1,000) × $4.00 ={" "}
                    <span className="font-bold text-green-700">$800</span>
                    &nbsp;|&nbsp; Clicks: 2,400 × $0.30 ={" "}
                    <span className="font-bold text-green-700">$720</span>
                    &nbsp;|&nbsp; Total:{" "}
                    <span className="font-bold text-green-700 text-base">
                      $1,520
                    </span>
                  </p>
                </div>
              </div>

              <div className="border border-gray-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                    Example 2
                  </span>
                  <h3 className="font-bold text-gray-900 text-sm">
                    High-Traffic Site — Video + Rich Media Compared
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[11px] text-gray-400 uppercase font-bold">
                      Impressions
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      1,000,000
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[11px] text-gray-400 uppercase font-bold">
                      CPM
                    </p>
                    <p className="text-sm font-bold text-gray-900">$6.00</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[11px] text-gray-400 uppercase font-bold">
                      CPC
                    </p>
                    <p className="text-sm font-bold text-gray-900">$0</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[11px] text-gray-400 uppercase font-bold">
                      CTR
                    </p>
                    <p className="text-sm font-bold text-gray-900">0%</p>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                  <p className="text-xs text-gray-500">
                    Display (1.0x):{" "}
                    <span className="font-bold text-green-700">$6,000</span>
                    &nbsp;|&nbsp; Video (2.2x):{" "}
                    <span className="font-bold text-green-700">$13,200</span>
                    &nbsp;|&nbsp; Rich Media (2.5x):{" "}
                    <span className="font-bold text-green-700">$15,000</span>
                    &nbsp;|&nbsp; Difference between display and rich media:{" "}
                    <span className="font-bold text-green-700 text-base">
                      $9,000/month
                    </span>
                  </p>
                </div>
              </div>

              <div className="border border-gray-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                    Example 3
                  </span>
                  <h3 className="font-bold text-gray-900 text-sm">
                    New Site — Low Traffic, Realistic Numbers
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[11px] text-gray-400 uppercase font-bold">
                      Impressions
                    </p>
                    <p className="text-sm font-bold text-gray-900">30,000</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[11px] text-gray-400 uppercase font-bold">
                      CPM
                    </p>
                    <p className="text-sm font-bold text-gray-900">$1.50</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[11px] text-gray-400 uppercase font-bold">
                      CPC
                    </p>
                    <p className="text-sm font-bold text-gray-900">$0.10</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[11px] text-gray-400 uppercase font-bold">
                      CTR
                    </p>
                    <p className="text-sm font-bold text-gray-900">0.8%</p>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                  <p className="text-xs text-gray-500">
                    Display:{" "}
                    <span className="font-bold text-green-700">$45</span>
                    &nbsp;|&nbsp; Native (1.3x):{" "}
                    <span className="font-bold text-green-700">$62.10</span>
                    &nbsp;|&nbsp; Popup (0.8x):{" "}
                    <span className="font-bold text-green-700">$40.44</span>
                    &nbsp;|&nbsp; Total all 6 formats combined:{" "}
                    <span className="font-bold text-green-700 text-base">
                      ~$310/month
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Use Cases ─── */}
          <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Who Should Use This Calculator
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              This isn't just for AdSense publishers. Here's who actually gets
              value from running these numbers.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: <Monitor size={20} className="text-sky-600" />,
                  title: "Bloggers & Content Sites",
                  desc: "You're writing posts, getting traffic, but not sure if ads are worth it. Run your numbers — you might be surprised what 50K monthly impressions can earn with the right format mix.",
                },
                {
                  icon: <TrendingUp size={20} className="text-green-600" />,
                  title: "AdOps & Monetization Teams",
                  desc: "Comparing ad networks or testing new placements? Use this to model revenue scenarios before making changes. Quick way to build a business case for switching formats.",
                },
                {
                  icon: <Users size={20} className="text-violet-600" />,
                  title: "Agencies & Freelancers",
                  desc: "Client asks 'how much can we make from ads?' — don't guess. Pull their analytics, plug in the numbers, and show them a real breakdown by ad type.",
                },
                {
                  icon: <Calculator size={20} className="text-amber-600" />,
                  title: "People Planning to Start a Site",
                  desc: "Before you build anything, check if the math works. If your niche gets $2 CPM and you need $2K/month, now you know you need roughly 1 million impressions — that's your traffic target.",
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
          <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Most Ad Revenue Calculators Are Wrong in Calculations
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Most free tools online give you one number — "your site makes
              $X/month." That's useless because it treats all ad formats the
              same. A $5 CPM display banner and a $5 CPM video pre-roll don't
              earn the same in practice. Video ads consistently pay 2x-3x more
              than standard banners. Rich media ads with interactive elements
              pull even higher rates.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              This calculator fixes that by applying category-specific
              multipliers based on real industry benchmarks. When you select
              "Video Ads" with a $5 base CPM, it calculates at $11 (2.2x)
              because that's closer to what ad networks actually pay for video
              inventory. Same logic for native, interstitial, and rich media.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              The CPC calculation works the same way. If you're running ads
              that pay per click, the tool uses your CTR to estimate click
              volume, then multiplies by the effective CPC for each format.
              Native ads, for instance, tend to get higher CTRs and higher
              CPCs than standard display — the 1.5x multiplier reflects that.
            </p>
            <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
              CPM vs CPC vs RPM — What's Actually Different
            </h3>
            <p className="text-gray-600 mb-3 leading-relaxed">
              People mix these up all the time.{" "}
              <strong>CPM</strong> is what the advertiser pays (or what the ad
              network reports) per 1,000 impressions.{" "}
              <strong>CPC</strong> is what you earn each time someone clicks
              an ad.{" "}
              <strong>RPM</strong> is your actual revenue per 1,000 pageviews
              — it's the number that matters to you as a publisher because it
              accounts for fill rate, ad blockers, and other real-world
              factors.
            </p>
            <p className="text-gray-600 mb-3 leading-relaxed">
              If your ad network shows a $10 CPM but you only have 70% fill
              rate and 30% of your visitors use ad blockers, your actual RPM
              might be closer to $4.90. That's why CPM alone is misleading.
              Use our{" "}
              <Link
                href="/tools/cpm-calculator"
                className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
              >
                CPM Calculator
              </Link>{" "}
              to crunch those base numbers, then come here to compare
              formats.
            </p>
            <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
              How to Actually Increase Your Ad Revenue
            </h3>
            <p className="text-gray-600 mb-2 leading-relaxed">
              After running numbers for hundreds of sites, the patterns are
              pretty clear:
            </p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1.5 mb-4 ml-2">
              <li>
                <strong>Switch from display-only to a format mix.</strong>{" "}
                Adding even one video ad unit or native placement can bump
                total revenue 30-50%.
              </li>
              <li>
                <strong>Fix ad placement.</strong> Above-the-fold, in-content
                ads consistently outperform sidebar and footer placements by
                2-3x.
              </li>
              <li>
                <strong>Improve CTR through better ad-text alignment.</strong>{" "}
                When the ad matches what the user is reading, clicks go up
                without being spammy.
              </li>
              <li>
                <strong>Target higher-CPM geographies.</strong> US, UK, and
                Australian traffic pays 3-5x more than Tier-3 countries.
              </li>
              <li>
                <strong>Don't ignore page speed.</strong> Slow-loading ads
                kill user experience and increase bounce rate, which means
                fewer impressions over time.
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              If you're specifically running Google AdSense, check out our{" "}
              <Link
                href="/tools/adsense-revenue-calculator"
                className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
              >
                AdSense Revenue Calculator
              </Link>{" "}
              — it uses niche-specific RPM data for 12+ categories so you
              don't have to guess your CPM. And if you're earning from
              YouTube, the{" "}
              <Link
                href="/tools/youtube-ad-revenue-calculator"
                className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
              >
                YouTube Ad Revenue Calculator
              </Link>{" "}
              handles CPM differences by video category and audience tier.
            </p>
          </section>

          {/* ─── FAQ ─── */}
          <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 max-w-4xl mx-auto">
              {[
                {
                  q: "How do I find my website's actual CPM?",
                  a: "Log into your ad network dashboard — AdSense, Mediavine, Ezoic, whatever you use. Look for 'Page RPM' or 'Estimated earnings per 1000 pageviews.' That's your effective CPM. If your network shows CPM directly, use that number. If it only shows total earnings and impressions, divide earnings by (impressions ÷ 1000) to get your CPM.",
                },
                {
                  q: "Why does the calculator use different multipliers for each ad format?",
                  a: "Because advertisers pay different rates for different formats. A video pre-roll ad is more engaging and harder to ignore than a 728x90 banner — so advertisers bid more for it. Based on industry data from platforms like Google Ad Manager and Headerbid reports, video ads typically earn 2-2.5x what display banners earn, rich media earns 2-2.5x, and native earns about 1.3x. The multipliers reflect these real-world differences.",
                },
                {
                  q: "Are these revenue estimates guaranteed?",
                  a: "No. These are estimates based on the numbers you provide and standard industry multipliers. Your actual earnings depend on fill rate, ad viewability, ad blocker usage, traffic quality, seasonality, and your specific ad network's rates. Use this for planning and comparison, not as a promise of income.",
                },
                {
                  q: "Should I use CPM or CPC — which model earns more?",
                  a: "It depends on your traffic and content. CPM is predictable — you know roughly what you'll earn per 1,000 impressions. CPC can outperform CPM if you have high click-through rates (2%+), especially on product-focused content where ads closely match what readers are looking for. Most publishers earn through a mix of both. This calculator handles both simultaneously so you don't have to choose.",
                },
                {
                  q: "What's a realistic CPM for a new blog with 10K monthly pageviews?",
                  a: "For a new blog, expect $0.50 to $2.00 CPM on display ads. Tier-1 traffic (US, UK, CA, AU) pushes it higher. Tech and finance niches sit at the top end; entertainment and general news at the lower end. At 10K pageviews with a $1.50 CPM, you're looking at roughly $15/month from display alone. Not life-changing, but it scales — hit 100K pageviews and that becomes $150+.",
                },
                {
                  q: "How is this different from the AdSense Revenue Calculator on this site?",
                  a: "The AdSense Revenue Calculator uses niche-specific RPM data (finance, health, tech, etc.) and is built specifically for Google AdSense publishers. This Ad Revenue Calculator is format-agnostic — it compares earnings across display, video, native, popup, interstitial, and rich media ads. Use the AdSense one if you're only on AdSense. Use this one if you're comparing ad formats or working with multiple networks.",
                },
                {
                  q: "Can I use this for YouTube ad revenue?",
                  a: "Not directly — YouTube has its own CPM structure that depends on video category, watch time, and audience geography. Use our YouTube Ad Revenue Calculator for that. This tool is designed for website and app ad inventory where you control the ad format directly.",
                },
                {
                  q: "I only know my RPM, not my CPM. What do I do?",
                  a: "If your ad network reports RPM (revenue per 1,000 pageviews), you can use that number as your CPM input. RPM and CPM are close enough for estimation purposes — the main difference is that RPM accounts for fill rate and ad blockers, which actually makes RPM a more realistic input for this calculator. You can also use our CPM Calculator to convert between CPM, CPC, and total spend.",
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
                  title: "eBay Charges Calculator",
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