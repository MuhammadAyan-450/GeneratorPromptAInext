"use client";

import { useState, useEffect } from "react";
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
import ResponsiveAd from "../../../components/ResponsiveAd";

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
        {/* ── HEADER ── */}
        <div className="text-center mb-10 mt-6">
          <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <Zap size={13} /> Free Tool — No Signup Required
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">
            Free Google AdSense Revenue Calculator —{" "}
            <span className="text-sky-600">
              Estimate Your AdSense Earnings Instantly
            </span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Curious what your blog or website could earn from AdSense? Punch in
            your monthly page views, choose your niche, and get a breakdown of
            your estimated daily, monthly, and yearly earnings — no account
            needed, completely free.
          </p>
        </div>

        <ResponsiveAd />


        {/* ── TOOL CARD ── */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 md:p-10 mb-8">
          <div className="space-y-5 mb-6">
            {/* Page Views */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Monthly Page Views <span className="text-red-400">*</span>
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
              <p className="text-xs text-gray-400 mt-1.5">
                Check Google Analytics → Audience → Overview → Pageviews for
                this number
              </p>
            </div>

            {/* Ad Units + Custom RPM toggle */}
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
                <p className="text-xs text-gray-400 mt-1.5">
                  3 ads per page is the sweet spot for most sites
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Use Custom RPM?
                </label>
                <div className="flex items-center gap-3 h-[50px]">
                  <button
                    onClick={() => setUseCustom(!useCustom)}
                    className={`relative w-12 h-7 rounded-full transition-colors ${useCustom ? "bg-sky-600" : "bg-gray-300"}`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${useCustom ? "translate-x-5" : ""}`}
                    />
                  </button>
                  <span className="text-sm text-gray-600">
                    {useCustom
                      ? "Yes — using your actual RPM"
                      : "No — using niche averages"}
                  </span>
                </div>
              </div>
            </div>

            {useCustom && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Your Actual RPM ($)
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
                <p className="text-xs text-gray-400 mt-1.5">
                  Find this in AdSense → Reports → Page RPM column
                </p>
              </div>
            )}

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Your Niche <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`p-3 rounded-xl border-2 text-left transition-all text-sm ${selectedCategories.includes(cat.id) ? "border-sky-500 bg-sky-50 text-sky-700" : "border-gray-200 bg-white text-gray-600 hover:border-sky-300 hover:bg-sky-50/50"}`}
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
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={calculate}
                disabled={!pageViews || selectedCategories.length === 0}
                className="bg-sky-600 hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2.5"
              >
                <TrendingUp size={18} /> Calculate AdSense Earnings
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
                    AdSense Earnings Estimate by Niche
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
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all"
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
        </div>

        {/* Native ad here */}

        <script
          async="async"
          data-cfasync="false"
          src="https://pl29796844.effectivecpmnetwork.com/4c385cac6f0784aa3165d3a9e7478f20/invoke.js"
        ></script>
        <div id="container-4c385cac6f0784aa3165d3a9e7478f20"></div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: <Zap size={20} className="text-amber-500" />,
              title: "12 Niche Categories",
              desc: "RPM benchmarks for tech, finance, health, legal, real estate, and 7 more niches — all in one place.",
            },
            {
              icon: <TrendingUp size={20} className="text-green-600" />,
              title: "Daily + Monthly + Yearly",
              desc: "See your full earnings picture at once — not just monthly, but what that adds up to over a year.",
            },
            {
              icon: <Shield size={20} className="text-sky-600" />,
              title: "100% Free",
              desc: "No account, no email, no limits. Run as many estimates as you need without ever signing up.",
            },
            {
              icon: <Layers size={20} className="text-violet-600" />,
              title: "Custom RPM Mode",
              desc: "Already running AdSense? Enter your real Page RPM and the estimates become far more accurate.",
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

        {/* How to Use */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How to Use This AdSense Revenue Calculator
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Four quick steps and you will have a realistic income estimate in
            under a minute.
          </p>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Enter your monthly page views",
                desc: "Head over to Google Analytics and look up your total page views for the past month — not sessions, not users, but page views specifically. That number drives your AdSense impressions. If you haven't launched yet, use your traffic goal and see what the earnings could look like at that level.",
              },
              {
                step: "2",
                title: "Choose how many ad units you show per page",
                desc: "Three is what most publishers run, and it's a solid default. More units means more impressions per visit, but pile on too many and your site starts feeling like a billboard. If you're not sure, stick with three — you can always test more later.",
              },
              {
                step: "3",
                title: "Pick your niche (or enter your actual RPM)",
                desc: "Select the category that best describes your content. Each niche carries a different RPM — finance sites earn far more per thousand views than entertainment blogs, and this calculator reflects those real-world differences. If you've been running AdSense for a while, flip on the Custom RPM toggle and type in your actual Page RPM from your AdSense reports. Your estimates will be much closer to what you actually see in your account.",
              },
              {
                step: "4",
                title: "Hit calculate and review your numbers",
                desc: "You'll get daily, monthly, and yearly estimates for every niche you selected, plus a combined total at the bottom. The per-page figure is worth paying attention to — it tells you the exact dollar value of each additional page view, which is useful if you're ever thinking about running paid traffic or evaluating SEO content ROI.",
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

        {/* Formulas */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            The AdSense Revenue Formula — What's Happening Under the Hood
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Google AdSense pays you based on RPM, which stands for Revenue Per
            Mille — or revenue earned for every 1,000 page views. The math is
            straightforward once you know what the variables mean.
          </p>
          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Monthly AdSense Earnings
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Monthly Revenue = (Page Views ÷ 1,000) × RPM
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Say you're pulling 100,000 page views a month and your niche RPM
                is $5. The calculation looks like this: (100,000 ÷ 1,000) × 5 ={" "}
                <strong className="text-gray-700">$500 per month</strong>. Your
                RPM is the single biggest lever — double your RPM and you double
                your income without gaining a single extra visitor.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Daily and Yearly AdSense Earnings
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Daily = Monthly ÷ 30{"\n"}
                Yearly = Monthly × 12
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Your daily number will vary in practice — weekdays outperform
                weekends, and Q4 is almost always your best quarter because
                advertisers flood the market with holiday budgets. The daily
                figure here is just an average to give you a ballpark.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Per-Page AdSense Earnings
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Per-Page = Monthly Revenue ÷ Total Page Views
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                This one is underrated. It tells you what each individual page
                view puts in your pocket. If you're earning $0.008 per view and
                you can buy traffic at $0.005 a click, you've got a working
                arbitrage. It's also the number to track as you optimize your ad
                layout and placements over time.
              </p>
            </div>
          </div>
        </section>

        {/* Real Examples */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            AdSense Earnings by Niche — Same Traffic, Very Different Paychecks
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            These three examples use real niche RPM averages. Look at how much
            the income gap widens even when traffic numbers are close — it makes
            the case for niche selection better than any argument I could write.
          </p>
          <div className="space-y-5">
            {[
              {
                label: "Example 1",
                title: "Tech Blog — 100K Monthly Views",
                views: "100,000",
                rpm: "$4.50",
                units: "3",
                result:
                  "Monthly: (100,000 ÷ 1,000) × $4.50 = $450 | Daily: $15 | Yearly: $5,400",
                highlight: "$450/month",
              },
              {
                label: "Example 2",
                title: "Finance Site — 50K Views (High RPM Niche)",
                views: "50,000",
                rpm: "$12.00",
                units: "4",
                result:
                  "Monthly: (50,000 ÷ 1,000) × $12.00 = $600 | Half the traffic, but $150 more per month — that's the RPM difference doing the work.",
                highlight: "$600/month",
              },
              {
                label: "Example 3",
                title: "Entertainment Site — 500K Views (Volume Play)",
                views: "500,000",
                rpm: "$2.00",
                units: "3",
                result:
                  "Monthly: $1,000 | Yearly: $12,000 | Low RPM but it's made up with sheer scale. Per-page earning sits at $0.002 — you need a lot of content to sustain this.",
                highlight: "$1,000/month",
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
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {[
                    ["Page Views", item.views],
                    ["Niche RPM", item.rpm],
                    ["Ad Units", item.units],
                  ].map(([label, val], j) => (
                    <div key={j} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-[11px] text-gray-400 uppercase font-bold">
                        {label}
                      </p>
                      <p className="text-sm font-bold text-gray-900">{val}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                  <p className="text-xs text-gray-500">
                    {item.result} →{" "}
                    <span className="font-bold text-green-700">
                      {item.highlight}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How Much Can You Actually Make From Google AdSense?
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Let me give you the honest answer instead of the one designed to
            make you excited. AdSense income is real, it's passive, and it
            scales — but the range is enormous, and most of that range comes
            down to two things: how much traffic you have and what your site is
            about.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            A site getting 100,000 monthly page views in the legal niche can
            earn $1,500 a month. The exact same traffic on a gaming or
            entertainment site earns $200. That's not a small difference —
            that's seven times more money for the same number of visitors. Niche
            selection is the most underrated decision in content publishing, and
            most people don't figure that out until they're already deep into a
            low-RPM space.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            For a typical content site with broad topics, expect somewhere
            between $2 and $8 per 1,000 page views from AdSense. Under $2
            usually points to one of three problems: most of your traffic is
            coming from countries where advertisers don't bid much, your niche
            has weak commercial intent, or your ad placement is keeping viewable
            impressions low. Above $8 and you're in a premium niche with strong
            advertiser competition — finance, insurance, legal, medical.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Finding Your Real AdSense RPM
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            If you already have AdSense running, stop guessing with niche
            averages. Go into your AdSense account, open Reports, and find the
            Page RPM column. That's your actual earnings per 1,000 views after
            Google's 32% cut. Paste that number into the Custom RPM field above
            and your estimates will be far more grounded than anything based on
            industry benchmarks.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Why Finance Sites Earn 5–10x More Than Entertainment Sites
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            It comes down to what advertisers are willing to pay for a click. A
            bank or insurance company that converts one website visitor into a
            customer could earn thousands of dollars from that relationship over
            time. So they bid aggressively for ad placements — $10, $20, even
            $50 per click in some cases. That advertiser competition drives up
            CPM and RPM for everyone publishing in that space. Entertainment
            advertisers are mostly pushing consumer products with thin margins
            and lower conversion values, so they bid less.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Geography is the other factor most people underestimate. A visitor
            from the US or UK is worth dramatically more per impression than a
            visitor from South Asia or Southeast Asia — sometimes 5 to 10 times
            more. Advertisers geo-target their bids, and they pay a premium to
            reach audiences in high-income markets. If you're building a content
            site specifically to earn from AdSense, writing for a US or UK
            audience will move your RPM more than almost any other single
            decision.
          </p>
        </section>

        {/* Use Cases */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            When Does an AdSense Calculator Actually Help?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Not every situation calls for a calculator — but these four are
            where it genuinely saves you from guessing.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Lightbulb size={20} className="text-amber-500" />,
                title: "Before You Pick a Niche",
                desc: "Six months of work feels different after you realize your niche pays $2 RPM instead of $10. Running the numbers upfront doesn't guarantee success, but it at least tells you what you're signing up for before you write a single post.",
              },
              {
                icon: <Target size={20} className="text-red-500" />,
                title: "Setting a Traffic Goal That Makes Sense",
                desc: "Want $500 a month from AdSense? In a tech niche at $4.50 RPM, you need roughly 111,000 monthly views. In finance at $12 RPM, you only need 42,000. Knowing the target makes the goal something you can actually plan toward.",
              },
              {
                icon: <BarChart3 size={20} className="text-sky-600" />,
                title: "AdSense vs. Other Monetization",
                desc: "Sometimes display ads are the wrong call. Use this to see what AdSense would realistically earn you, then compare it against what a sponsorship deal or affiliate commission structure might bring at the same traffic level.",
              },
              {
                icon: <Calculator size={20} className="text-green-600" />,
                title: "Evaluating a Site Before You Buy",
                desc: "If someone is selling a site and claiming AdSense income, plug their reported traffic and niche into this tool. It's a quick sanity check — if the numbers don't match what the seller is claiming, that's worth asking about.",
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

        {/* RPM Benchmarks Table */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            AdSense RPM by Niche — What Publishers Are Actually Reporting
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            These figures are based on what real publishers share in forums,
            case studies, and income reports — not marketing material.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="text-left px-4 py-3 font-semibold">Niche</th>
                  <th className="text-center px-4 py-3 font-semibold">
                    Avg RPM
                  </th>
                  <th className="text-center px-4 py-3 font-semibold">
                    100K Views/Month
                  </th>
                  <th className="text-center px-4 py-3 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "⚖️ Legal",
                    "$15",
                    "$1,500/mo",
                    "Highest RPM niche across the board",
                  ],
                  [
                    "🏦 Finance & Insurance",
                    "$12",
                    "$1,200/mo",
                    "Strong advertiser competition, high CPC",
                  ],
                  [
                    "🏠 Real Estate",
                    "$10",
                    "$1,000/mo",
                    "Property buyers are high-value leads",
                  ],
                  [
                    "🏥 Health & Medical",
                    "$8.50",
                    "$850/mo",
                    "Wide appeal with solid RPM",
                  ],
                  [
                    "🚗 Automotive",
                    "$7",
                    "$700/mo",
                    "Car shoppers convert well",
                  ],
                  ["✈️ Travel", "$6", "$600/mo", "Dips in off-season months"],
                  [
                    "🛒 Shopping & Deals",
                    "$5.50",
                    "$550/mo",
                    "High purchase intent traffic",
                  ],
                  ["📚 Education", "$5", "$500/mo", "Steady year-round RPM"],
                  [
                    "💻 Technology",
                    "$4.50",
                    "$450/mo",
                    "Large but competitive audience",
                  ],
                  [
                    "🍕 Food & Recipes",
                    "$3.50",
                    "$350/mo",
                    "Huge traffic potential, lower CPM",
                  ],
                  [
                    "⚽ Sports & Fitness",
                    "$3",
                    "$300/mo",
                    "Younger demographic, lower bids",
                  ],
                  [
                    "🎬 Entertainment",
                    "$2",
                    "$200/mo",
                    "Needs serious volume to work",
                  ],
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
                    <td className="px-4 py-3 text-center text-xs text-gray-500">
                      {row[3]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Based on US/UK traffic. South Asian and Southeast Asian traffic
            typically earns 5–10x less per impression due to lower advertiser
            bids in those markets.
          </p>
        </section>

        {/* FAQ */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            AdSense Revenue Calculator — Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              {
                q: "How much can you make from Google AdSense?",
                a: "The honest range is wide. A site with 100,000 monthly page views in a technology niche earns around $450/month. The same traffic on a finance site earns roughly $1,200/month. On an entertainment blog, you're looking at maybe $200/month. Your niche RPM does more to determine your income than almost anything else — use this calculator with your specific niche to get a number that actually means something.",
              },
              {
                q: "How do I calculate my AdSense earnings manually?",
                a: "The formula is: Monthly Earnings = (Page Views ÷ 1,000) × RPM. You can find your RPM inside your AdSense account under Reports → Page RPM. If you're not running AdSense yet, use the niche averages in this calculator to estimate what you could earn. The math is simple — what changes everything is the RPM value you plug in.",
              },
              {
                q: "What is a good AdSense RPM in 2026?",
                a: "For a general content site, anywhere from $3–6 RPM is normal. Finance and legal sites regularly hit $10–15 RPM. Entertainment and sports blogs often land under $3 RPM. If you're consistently under $1 RPM with meaningful traffic, that usually points to one of three things: most of your visitors are from lower-bid countries, your niche doesn't attract commercial advertisers, or your ad placements are weak on viewable impressions.",
              },
              {
                q: "How much does AdSense pay per 1,000 page views?",
                a: "Anywhere from $1 to $25, depending on your niche and where your audience is located. The broad average lands around $3–5 per 1,000 views. Finance and legal niches pay the most. Entertainment and general lifestyle content pay the least. Geography matters a lot too — US and UK traffic earns substantially more than traffic from South or Southeast Asia, because advertisers in those markets bid significantly higher.",
              },
              {
                q: "What's the difference between RPM and CPM in AdSense?",
                a: "CPM is what advertisers pay per 1,000 ad impressions — it's their cost. RPM is what you actually receive per 1,000 page views after Google takes its share (around 32%). So if the advertiser CPM is $7, your Page RPM works out to roughly $4.76. This calculator uses RPM throughout because that's the number that shows up in your AdSense account and the one that actually reflects your earnings.",
              },
              {
                q: "How many page views do I need to earn $100 per month from AdSense?",
                a: "It depends on your RPM. At $5 RPM, you need 20,000 monthly views to hit $100. At $3 RPM, that climbs to 33,333 views. In a finance niche at $10 RPM, you only need 10,000 views. Use the calculator above, set your income goal, and work backwards to find out what traffic milestone you're actually building toward.",
              },
              {
                q: "Is Google AdSense still worth using in 2026?",
                a: "For sites under 100,000 monthly views or sites that are still growing, yes — AdSense is still the most accessible display ad option. It's passive income that scales automatically with traffic. The limitation is that for larger sites in premium niches, ad networks like Raptive or Mediavine pay meaningfully better RPMs. But you typically need 50,000+ monthly sessions to qualify for those. Until then, AdSense is the practical starting point for most publishers.",
              },
              {
                q: "Why is my real AdSense income lower than what the calculator shows?",
                a: "A few things cut into the theoretical number. Ad blockers can reduce impressions by 15–40% depending on your audience — tech-savvy readers block more ads. Not every ad slot fills at full price; fill rates fluctuate. Traffic from lower-bid countries brings down your blended RPM even if most visitors are from high-value markets. And ads positioned far down the page generate fewer viewable impressions. In practice, most publishers earn around 70–85% of what a clean estimate suggests — so treat the calculator as an optimistic ceiling, not a guaranteed floor.",
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

        {/* Related Tools */}
        <section className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related Calculators
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/ad-revenue-calculator",
                title: "Ad Revenue Calculator",
                desc: "Compare earnings across display, video, native, and other ad formats.",
              },
              {
                href: "/tools/youtube-ad-revenue-calculator",
                title: "YouTube Revenue Calculator",
                desc: "Estimate YouTube AdSense earnings by niche, views, and RPM.",
              },
              {
                href: "/tools/cpm-calculator",
                title: "CPM Calculator",
                desc: "Calculate cost per 1,000 impressions from campaign spend and impressions.",
              },
              {
                href: "/tools/cpc-calculator",
                title: "CPC Calculator",
                desc: "Find your cost per click from total campaign spend and click data.",
              },
              {
                href: "/tools/profit-margin-calculator",
                title: "Profit Margin Calculator",
                desc: "Calculate gross and net profit margins for your site or business.",
              },
              {
                href: "/tools/percentage-calculator",
                title: "Percentage Calculator",
                desc: "Calculate percentages, increases and decreases instantly.",
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
