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
  LayoutGrid,
  Zap,
  Shield,
  Eye,
  Layers,
  CheckCircle2,
  TrendingUp,
  Calculator,
  Lightbulb,
  Target,
  BarChart3,
} from "lucide-react";

const AdSenseRevenueCalculator = () => {
  const [pageViews, setPageViews] = useState("");
  const [adUnits, setAdUnits] = useState("3");
  const [customRpm, setCustomRpm] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    { id: "tech", name: "Technology", icon: "💻", rpm: 4.5 },
    { id: "finance", name: "Finance & Insurance", icon: "🏦", rpm: 12.0 },
    { id: "health", name: "Health & Medical", icon: "🏥", rpm: 8.5 },
    { id: "legal", name: "Legal", icon: "⚖️", rpm: 15.0 },
    { id: "realestate", name: "Real Estate", icon: "🏠", rpm: 10.0 },
    { id: "education", name: "Education", icon: "📚", rpm: 5.0 },
    { id: "entertainment", name: "Entertainment", icon: "🎬", rpm: 2.0 },
    { id: "food", name: "Food & Recipes", icon: "🍕", rpm: 3.5 },
    { id: "travel", name: "Travel", icon: "✈️", rpm: 6.0 },
    { id: "sports", name: "Sports & Fitness", icon: "⚽", rpm: 3.0 },
    { id: "automotive", name: "Automotive", icon: "🚗", rpm: 7.0 },
    { id: "shopping", name: "Shopping & Deals", icon: "🛒", rpm: 5.5 },
  ];

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const calculate = () => {
    if (!pageViews) {
      setError("Please enter monthly page views");
      return;
    }
    if (selectedCategories.length === 0) {
      setError("Please select at least one niche category");
      return;
    }

    const views = parseFloat(pageViews);
    const units = parseInt(adUnits) || 3;
    const results = selectedCategories.map((catId) => {
      const cat = categories.find((c) => c.id === catId);
      const rpm = useCustom ? parseFloat(customRpm) || 0 : cat.rpm;
      const monthlyRevenue = (views / 1000) * rpm;
      const dailyRevenue = monthlyRevenue / 30;
      const yearlyRevenue = monthlyRevenue * 12;
      const perPageRevenue = monthlyRevenue / views;
      return {
        ...cat,
        usedRpm: rpm.toFixed(2),
        monthlyRevenue: monthlyRevenue.toFixed(2),
        dailyRevenue: dailyRevenue.toFixed(2),
        yearlyRevenue: yearlyRevenue.toFixed(2),
        perPageRevenue: perPageRevenue.toFixed(4),
        adUnits: units,
      };
    });

    const grandMonthly = results.reduce(
      (s, r) => s + parseFloat(r.monthlyRevenue),
      0,
    );
    const grandYearly = grandMonthly * 12;

    setError("");
    setResult({
      results,
      grandMonthly: grandMonthly.toFixed(2),
      grandYearly: grandYearly.toFixed(2),
    });
  };

  const copyResult = () => {
    if (!result) return;
    const text = result.results
      .map((r) => `${r.name}: $${r.monthlyRevenue}/mo (RPM: $${r.usedRpm})`)
      .join("\n");
    navigator.clipboard.writeText(
      `AdSense Revenue Estimate\n\n${text}\n\nTotal Monthly: $${result.grandMonthly}\nTotal Yearly: $${result.grandYearly}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    const text = result.results
      .map(
        (r) =>
          `${r.name}: $${r.monthlyRevenue}/mo | Daily: $${r.dailyRevenue} | Yearly: $${r.yearlyRevenue} | RPM: $${r.usedRpm}`,
      )
      .join("\n");
    const file = new Blob(
      [
        `AdSense Revenue Calculation\n\n${text}\n\nTotal Monthly: $${result.grandMonthly}\nTotal Yearly: $${result.grandYearly}`,
      ],
      { type: "text/plain" },
    );
    const el = document.createElement("a");
    el.href = URL.createObjectURL(file);
    el.download = "adsense-revenue-calculation.txt";
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  };

  const reset = () => {
    setPageViews("");
    setAdUnits("3");
    setCustomRpm("");
    setUseCustom(false);
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
            AdSense Revenue Calculator
          </span>
        </nav>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-2xl mb-4">
            <LayoutGrid className="text-sky-600" size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3">
            AdSense Revenue Calculator
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Trying to figure out how much Google AdSense actually pays? The
            number changes wildly depending on your niche. Add in your traffic,
            select a category, and see how much you earn
          </p>
        </div>

        {/* Tool Card */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 md:p-10 mb-8">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Monthly Page Views
              </label>
              <div className="relative">
                <Eye
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="number"
                  placeholder="e.g. 100000"
                  value={pageViews}
                  onChange={(e) => setPageViews(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 bg-gray-50 placeholder:text-gray-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Ad Units Per Page
                </label>
                <div className="relative">
                  <Layers
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="number"
                    min="1"
                    max="10"
                    placeholder="e.g. 3"
                    value={adUnits}
                    onChange={(e) => setAdUnits(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 bg-gray-50 placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Use Custom RPM?
                </label>
                <div className="flex items-center gap-3 h-[50px]">
                  <button
                    onClick={() => setUseCustom(!useCustom)}
                    className={`relative w-12 h-7 rounded-full transition-colors ${
                      useCustom ? "bg-sky-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                        useCustom ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                  <span className="text-sm text-gray-600">
                    {useCustom
                      ? "Yes – using custom RPM"
                      : "No – using niche default RPM"}
                  </span>
                </div>
              </div>
            </div>
            {useCustom && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Custom RPM ($)
                </label>
                <div className="relative">
                  <DollarSign
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 5.00"
                    value={customRpm}
                    onChange={(e) => setCustomRpm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 bg-gray-50 placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Niche Categories
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`p-3 rounded-xl border-2 text-left transition-all text-sm ${
                    selectedCategories.includes(cat.id)
                      ? "border-sky-500 bg-sky-50 text-sky-700"
                      : "border-gray-200 bg-white text-gray-600 hover:border-sky-300 hover:bg-sky-50/50"
                  }`}
                >
                  <span className="text-base block mb-0.5">{cat.icon}</span>
                  <span className="font-medium text-xs leading-tight block">
                    {cat.name}
                  </span>
                  {!useCustom && (
                    <span className="text-[10px] text-gray-400 block mt-0.5">
                      ~${cat.rpm} RPM
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={calculate}
              disabled={!pageViews || selectedCategories.length === 0}
              className="bg-sky-600 hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2.5"
            >
              <TrendingUp size={18} /> Calculate AdSense Revenue
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
                  AdSense Earnings by Niche
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
                          ${r.monthlyRevenue}/mo
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                        <span>RPM: ${r.usedRpm}</span>
                        <span>Daily: ${r.dailyRevenue}</span>
                        <span>Yearly: ${r.yearlyRevenue}</span>
                        <span>Per Page: ${r.perPageRevenue}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
                    <p className="text-xs text-green-500 uppercase font-bold tracking-wider mb-1">
                      Total Monthly
                    </p>
                    <p className="text-2xl md:text-3xl font-extrabold text-green-700">
                      ${result.grandMonthly}
                    </p>
                  </div>
                  <div className="bg-sky-50 border border-sky-200 rounded-xl p-5 text-center">
                    <p className="text-xs text-sky-500 uppercase font-bold tracking-wider mb-1">
                      Total Yearly
                    </p>
                    <p className="text-2xl md:text-3xl font-extrabold text-sky-700">
                      ${result.grandYearly}
                    </p>
                  </div>
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
              title: "12+ Niches",
              desc: "Pre-loaded RPM data for technology, finance, health, legal, and more.",
            },
            {
              icon: <TrendingUp size={20} className="text-green-600" />,
              title: "Daily/Monthly/Yearly",
              desc: "See earnings breakdown across daily, monthly, and yearly timeframes.",
            },
            {
              icon: <Shield size={20} className="text-sky-600" />,
              title: "100% Free",
              desc: "No signup, no limits, completely free to use forever.",
            },
            {
              icon: <Layers size={20} className="text-violet-600" />,
              title: "Custom RPM",
              desc: "Toggle custom RPM mode to use your own actual AdSense data.",
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
              <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Calculate AdSense Revenue
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Your Monthly Page Views",
                desc: "Get your total page views for the month in Google Analytics or your AdSense interface. Do not use sessions and/or users, just pageviews – that's all that counts.",
              },
              {
                step: "2",
                title: "Ad Units per Page Viewed",
                desc: "How many AdSense ads do you normally display per page? Normally, between 2 and 4 ads will be shown. You can keep it as the default 3 for better accuracy.",
              },
              {
                step: "3",
                title: "Choose Niche (or Enable Custom RPM)",
                desc: "Choose the niches that apply to your website content. If you know your actual RPM value, enable the custom RPM option and enter it here.",
              },
              {
                step: "4",
                title: "See the Results",
                desc: "You will receive earnings stats for each month, day, year, and even per page for each chosen niche. Compare and understand which niche earns you more money.",
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
            AdSense Revenue Formulas
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Google doesn&apos;t explicitly tell you these formulas, but this is
            exactly how RPM translates to actual dollars.
          </p>
          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Monthly Revenue
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Monthly Revenue = (Page Views ÷ 1000) × RPM
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                RPM stands for Revenue Per Mille — how much you earn per 1,000
                page views. This is the core formula. Everything else is derived
                from it.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Daily & Yearly Revenue
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Daily Revenue = Monthly Revenue ÷ 30
                <br />
                Yearly Revenue = Monthly Revenue × 12
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Simple time conversions. Keep in mind that real daily earnings
                fluctuate — weekdays usually earn more than weekends, and
                holidays can spike or drop depending on your niche.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Per-Page Revenue
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Per-Page Revenue = Monthly Revenue ÷ Total Page Views
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                This tells you how much each individual pageview is worth. It's
                a useful number when you're buying traffic or doing outreach —
                if you pay $0.005 per visit and earn $0.008 per page, you're in
                the green.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Real Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            AdSense Earnings Examples by Niche
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            These aren't made-up numbers. They're based on actual RPM averages
            that publishers report.
          </p>

          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                  Example 1
                </span>
                <h3 className="font-bold text-gray-900 text-sm">
                  Tech Blog with 100K Monthly Views
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    Page Views
                  </p>
                  <p className="text-sm font-bold text-gray-900">100,000</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    Niche RPM
                  </p>
                  <p className="text-sm font-bold text-gray-900">$4.50</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    Ad Units
                  </p>
                  <p className="text-sm font-bold text-gray-900">3</p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <p className="text-xs text-gray-500">
                  Monthly: (100,000 ÷ 1,000) × $4.50 ={" "}
                  <span className="font-bold text-green-700">$450</span>
                  &nbsp;|&nbsp; Daily:{" "}
                  <span className="font-bold text-green-700">$15</span>
                  &nbsp;|&nbsp; Yearly:{" "}
                  <span className="font-bold text-green-700">$5,400</span>
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                  Example 2
                </span>
                <h3 className="font-bold text-gray-900 text-sm">
                  Finance Site with 50K Views (High RPM)
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    Page Views
                  </p>
                  <p className="text-sm font-bold text-gray-900">50,000</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    Niche RPM
                  </p>
                  <p className="text-sm font-bold text-gray-900">$12.00</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    Ad Units
                  </p>
                  <p className="text-sm font-bold text-gray-900">4</p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <p className="text-xs text-gray-500">
                  Monthly: (50,000 ÷ 1,000) × $12.00 ={" "}
                  <span className="font-bold text-green-700">$600</span>
                  &nbsp;|&nbsp; Half the traffic of the tech blog, but earns 33%
                  more because finance RPM is nearly 3x higher.
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                  Example 3
                </span>
                <h3 className="font-bold text-gray-900 text-sm">
                  Entertainment Site with 500K Views (Volume Play)
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    Page Views
                  </p>
                  <p className="text-sm font-bold text-gray-900">500,000</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    Niche RPM
                  </p>
                  <p className="text-sm font-bold text-gray-900">$2.00</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    Ad Units
                  </p>
                  <p className="text-sm font-bold text-gray-900">3</p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <p className="text-xs text-gray-500">
                  Monthly: (500,000 ÷ 1,000) × $2.00 ={" "}
                  <span className="font-bold text-green-700">$1,000</span>
                  &nbsp;|&nbsp; Yearly:{" "}
                  <span className="font-bold text-green-700">$12,000</span>
                  &nbsp;|&nbsp; Low RPM but high volume makes it work. Per-page
                  earning: $0.002.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            When You Actually Need This Calculator
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Not everybody needs an AdSense calculator. Who can really benefit
            from it?
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Lightbulb size={20} className="text-amber-500" />,
                title: " Before Picking a Niche",
                desc: "You're about to spend 6 months building a blog. Use this to understand how much 50,000 pageviews in tech, finances, or food pays. The discrepancy may be 5-10x.",
              },
              {
                icon: <Target size={20} className="text-red-500" />,
                title: "Traffic Goals Planning",
                desc: "Need $2,000/mo AdSense income with your niche's RPM being $5? Now you know that you should aim at 400,000 pageviews – a very specific metric, not 'get more traffic'.'",
              },
              {
                icon: <BarChart3 size={20} className="text-sky-600" />,
                title: "Affiliate Links VS AdSense",
                desc: "Perhaps affiliate marketing or sponsorships would provide a higher income. Plug your actual niche's RPM in there and see where the scale tips in.",
              },
              {
                icon: <Calculator size={20} className="text-green-600" />,
                title: "Client Proposals & Reports",
                desc: "If you run an agency or consult for publishers, showing a niche-specific revenue projection carries way more weight than a generic 'you'll make some money.'",
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
            Why AdSense RPM Varies So Much Between Niches
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            It all depends on how much money advertisers are willing to pay you
            for traffic. In the case of the finance niche, one customer
            generated from an AdWords campaign may cost banks a couple of
            hundred dollars in fees. It causes higher CPC rates for the whole
            niche, making RPM higher as well. Therefore, the highest AdSense RPM
            is typical for such niches as finance and legal.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Unlike in entertainment and sports sections, where there is little
            business intentionality, a person looking for information about
            movies is not out to purchase an expensive commodity. The
            advertisers are aware of this fact, and as such, they make small
            bids. How come? You get RPMs between $1 and $3.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The mistake that many first-time publishers make is to chase
            high-traffic niches such as entertainment without verifying whether
            the numbers add up. 500K pageviews in the entertainment niche at $2
            RPM equals $1,000 monthly, but even 80K pageviews in the financial
            niche at $12 RPM equal $960 monthly, with 6 times less work needed
            for content creation.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Finding Your True RPM in AdSense
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Don't get stuck using niche averages indefinitely. Once you have
            accumulated two to three months' worth of AdSense data, take a look
            at your true RPM from AdSense → Reports → Performance reports → Page
            RPM (the table). This is the RPM you need. Use this switch in the
            RPM calculator to input your true RPM, and make all your
            calculations more accurate.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            If you want to understand the CPM side of things (what advertisers
            pay before Google takes its cut), use our{" "}
            <Link
              href="/tools/cpm-calculator"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              CPM Calculator
            </Link>
            . And if you&apos;re running ads outside of AdSense — like direct
            deals, Mediavine, or Raptive — the{" "}
            <Link
              href="/tools/ad-revenue-calculator"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              Ad Revenue Calculator
            </Link>{" "}
            lets you compare earnings across display, video, native, and other
            formats.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Does Revenue Improve If More Units Are Added?
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Yes, for a while at least. Adding from one ad unit to three results
            in a considerable boost in overall revenues as the number of
            impressions is much higher. However, adding from three to five or
            six units often does not bring additional benefits since the added
            ad spaces attract less valuable advertisements, as well as make the
            page load slower, which negatively affects SEO performance. Besides,
            Google limits the number of units of Adsense that can be placed on
            the page.
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
                q: "How do I calculate my AdSense revenue manually?",
                a: "Take your monthly page views, divide by 1,000, and multiply by your RPM. Example: 100,000 page views × $5 RPM ÷ 1,000 = $500/month. That's it. If you don't know your RPM, use the niche defaults in this calculator — they're based on what actual publishers report.",
              },
              {
                q: "What's a good AdSense RPM in 2024?",
                a: "It completely depends on the niche. $1-3 is normal for entertainment, sports, and food. $4-8 is solid for tech, education, and travel. $10-25 is achievable in finance, legal, real estate, and insurance. If you're getting below $1 RPM with decent traffic, something's wrong with your ad placement or traffic quality.",
              },
              {
                q: "Which niche pays the most for Google AdSense?",
                a: "Legal and finance consistently top the charts. Legal content (lawyers, lawsuits, divorce) can hit $15-25 RPM. Finance and insurance ($10-18 RPM) and real estate ($8-14 RPM) follow close behind. The pattern is always the same: high advertiser competition + expensive customer acquisition = high publisher RPM.",
              },
              {
                q: "How much does AdSense pay per 1,000 page views?",
                a: "Anywhere from $1 to $25 depending on niche. The average across all niches is roughly $3-5 per 1,000 views. But a finance site at $15 RPM earns 10x more per 1,000 views than an entertainment site at $1.50 RPM. That's why niche selection matters more than traffic volume.",
              },
              {
                q: "Why is my actual AdSense income lower than this calculator shows?",
                a: "A few reasons. Ad blockers reduce your actual impressions by 20-40%. Fill rate isn't always 100% — sometimes there's no ad to show. Traffic from low-value countries (Tier 3) drags down your RPM. And if your ad placement is poor (below the fold, sidebar only), you'll earn less than someone with in-content ads. The calculator gives you a best-case estimate based on niche RPM.",
              },
              {
                q: "Should I pick a niche based on AdSense RPM alone?",
                a: "No, that's a mistake. High RPM niches are competitive and hard to rank for in Google. A finance blog competing with Forbes and Bankrate is going to struggle for traffic. A niche like food or travel might have lower RPM, but it's easier to get traffic. The best approach: pick a niche you can actually compete in, then maximize RPM through good ad placement and traffic quality.",
              },
              {
                q: "How is this different from the Ad Revenue Calculator?",
                a: "The Ad Revenue Calculator compares earnings across ad formats (display, video, native, popup, etc.) using CPM and CPC. This AdSense Revenue Calculator is niche-focused — it uses RPM data for 12+ content categories to show how much the same traffic would earn in different niches. Use both if you're planning your full monetization strategy.",
              },
              {
                q: "Does the number of ad units per page actually affect my RPM?",
                a: "It can, but not directly. More ad units means more total impressions per pageview, which increases total revenue. However, if you stuff too many ads, the lowest-performing units get cheap ads that drag down your average RPM. Plus, Google penalizes pages with excessive ads in their core web updates. Stick to 3-4 well-placed units.",
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
                    className={`text-sky-500 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i
                      ? "max-h-[600px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
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
                href: "/tools/ad-revenue-calculator",
                title: "Ad Revenue Calculator",
                desc: "Compare earnings across display, video, native, and other ad formats using CPM & CPC.",
              },
              {
                href: "/tools/youtube-ad-revenue-calculator",
                title: "YouTube Ad Revenue Calculator",
                desc: "Estimate YouTube earnings by video category, CPM, and audience geography tier.",
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
  );
};

export default AdSenseRevenueCalculator;
