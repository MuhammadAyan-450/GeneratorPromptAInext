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
  Eye,
  Calculator,
  Zap,
  Shield,
  BarChart3,
  CheckCircle2,
  Target,
  Code,
  HelpCircle,
  ArrowRight,
  FileText,
} from "lucide-react";

import ResponsiveAd from "../../../components/ResponsiveAd";

const CpmCalculator = () => {
  const [mode, setMode] = useState("cpm");
  const [cost, setCost] = useState("");
  const [impressions, setImpressions] = useState("");
  const [cpm, setCpm] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    setError("");
  }, [mode]);

  const calculate = () => {
    if (mode === "cpm") {
      if (!cost || !impressions) {
        setError("Please enter both campaign cost and total impressions.");
        return;
      }
      const c = parseFloat(cost);
      const i = parseFloat(impressions);
      if (i <= 0) {
        setError("Impressions must be greater than 0.");
        return;
      }
      const calcCpm = (c / i) * 1000;
      const costPerClick = i > 0 ? c / (i * 0.015) : 0;
      setResult({
        label: "CPM (Cost Per 1,000 Impressions)",
        value: `$${calcCpm.toFixed(2)}`,
        raw: calcCpm.toFixed(2),
        extras: [
          { label: "Campaign Cost", value: `$${c.toFixed(2)}` },
          { label: "Total Impressions", value: i.toLocaleString() },
          { label: "Cost Per Impression", value: `$${(c / i).toFixed(5)}` },
<<<<<<< HEAD
          { label: "Est. Cost Per Click (1.5% CTR)", value: `$${costPerClick.toFixed(2)}` },
=======
          {
            label: "Est. Cost Per Click (1.5% CTR)",
            value: `$${costPerClick.toFixed(2)}`,
          },
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
        ],
      });
    } else if (mode === "cost") {
      if (!cpm || !impressions) {
        setError("Please enter both CPM and total impressions.");
        return;
      }
      const cp = parseFloat(cpm);
      const i = parseFloat(impressions);
      if (i <= 0) {
        setError("Impressions must be greater than 0.");
        return;
      }
      const calcCost = (cp * i) / 1000;
      setResult({
        label: "Total Campaign Cost",
        value: `$${calcCost.toFixed(2)}`,
        raw: calcCost.toFixed(2),
        extras: [
          { label: "CPM Rate", value: `$${cp.toFixed(2)}` },
          { label: "Total Impressions", value: i.toLocaleString() },
<<<<<<< HEAD
          { label: "Cost Per Impression", value: `$${(calcCost / i).toFixed(5)}` },
          { label: "Est. Budget for 1M Impressions", value: `$${(cp * 1000).toFixed(2)}` },
=======
          {
            label: "Cost Per Impression",
            value: `$${(calcCost / i).toFixed(5)}`,
          },
          {
            label: "Est. Budget for 1M Impressions",
            value: `$${(cp * 1000).toFixed(2)}`,
          },
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
        ],
      });
    } else if (mode === "impressions") {
      if (!cpm || !cost) {
        setError("Please enter both CPM and campaign cost.");
        return;
      }
      const cp = parseFloat(cpm);
      const c = parseFloat(cost);
      if (cp <= 0) {
        setError("CPM must be greater than 0.");
        return;
      }
      const calcImpressions = (c / cp) * 1000;
      setResult({
        label: "Total Impressions",
        value: Math.round(calcImpressions).toLocaleString(),
        raw: Math.round(calcImpressions),
        extras: [
          { label: "CPM Rate", value: `$${cp.toFixed(2)}` },
          { label: "Campaign Cost", value: `$${c.toFixed(2)}` },
<<<<<<< HEAD
          { label: "Cost Per Impression", value: `$${(c / calcImpressions).toFixed(5)}` },
          { label: "Est. Clicks (1.5% CTR)", value: Math.round(calcImpressions * 0.015).toLocaleString() },
=======
          {
            label: "Cost Per Impression",
            value: `$${(c / calcImpressions).toFixed(5)}`,
          },
          {
            label: "Est. Clicks (1.5% CTR)",
            value: Math.round(calcImpressions * 0.015).toLocaleString(),
          },
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
        ],
      });
    }
    setError("");
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `${result.label}: ${result.value}\n\n${result.extras.map((e) => `${e.label}: ${e.value}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    const text = `CPM Calculation Result\n\n${result.label}: ${result.value}\n\n${result.extras.map((e) => `${e.label}: ${e.value}`).join("\n")}`;
    const file = new Blob([text], { type: "text/plain" });
    const el = document.createElement("a");
    el.href = URL.createObjectURL(file);
    el.download = "cpm-calculation.txt";
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  };

  const handleReset = () => {
    setCost("");
    setImpressions("");
    setCpm("");
    setResult(null);
    setError("");
    setCopied(false);
  };

  const modes = [
<<<<<<< HEAD
    { id: "cpm", label: "Calculate CPM", desc: "From Cost & Impressions", icon: <Target size={16} /> },
    { id: "cost", label: "Calculate Cost", desc: "From CPM & Impressions", icon: <DollarSign size={16} /> },
    { id: "impressions", label: "Calculate Impressions", desc: "From CPM & Cost", icon: <Eye size={16} /> },
=======
    {
      id: "cpm",
      label: "Calculate CPM",
      desc: "From Cost & Impressions",
      icon: <Target size={16} />,
    },
    {
      id: "cost",
      label: "Calculate Cost",
      desc: "From CPM & Impressions",
      icon: <DollarSign size={16} />,
    },
    {
      id: "impressions",
      label: "Calculate Impressions",
      desc: "From CPM & Cost",
      icon: <Eye size={16} />,
    },
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
  ];

  const isDisabled =
    (mode === "cpm" && (!cost || !impressions)) ||
    (mode === "cost" && (!cpm || !impressions)) ||
    (mode === "impressions" && (!cpm || !cost));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
<<<<<<< HEAD
              <Link href="/" className="inline-flex items-center gap-1.5 hover:text-sky-600 transition-colors">
                <Home size={14} /> Home
              </Link>
            </li>
            <li><span className="text-gray-300">/</span></li>
            <li>
              <Link href="/pages/all-tools" className="hover:text-sky-600 transition-colors">
                All Tools
              </Link>
            </li>
            <li><span className="text-gray-300">/</span></li>
            <li><span className="text-gray-900 font-semibold">CPM Calculator</span></li>
=======
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
                CPM Calculator
              </span>
            </li>
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
<<<<<<< HEAD

=======
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
        {/* Hero */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <BarChart3 className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
<<<<<<< HEAD
            CPM Calculator — Calculate CPM, Cost & Impressions Free
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            The fastest free CPM calculator online. Calculate cost per thousand
            impressions, find your total campaign cost from CPM and impressions,
            or work out how many impressions your budget buys. Enter two values,
            get your answer in one click — no signup needed.
=======
            CPM Calculator
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Calculate cost per 1,000 impressions, campaign cost, or total
            impressions instantly. Just enter two values, hit calculate, and get
            your CPM metrics plus bonus cost-per-impression data.
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
          </p>
        </div>

        <ResponsiveAd />

        {/* Tool Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            What do you want to calculate?
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {modes.map((m) => (
              <button
                key={m.id}
<<<<<<< HEAD
                onClick={() => { setMode(m.id); setResult(null); setError(""); }}
=======
                onClick={() => {
                  setMode(m.id);
                  setResult(null);
                  setError("");
                }}
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
                className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                  mode === m.id
                    ? "border-sky-500 bg-sky-50 text-sky-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-sky-300 hover:bg-sky-50/50"
                }`}
              >
<<<<<<< HEAD
                <span className={mode === m.id ? "text-sky-600" : "text-gray-400"}>{m.icon}</span>
                <div>
                  <span className="font-semibold text-sm block">{m.label}</span>
                  <span className="text-[11px] text-gray-400 block">{m.desc}</span>
=======
                <span
                  className={mode === m.id ? "text-sky-600" : "text-gray-400"}
                >
                  {m.icon}
                </span>
                <div>
                  <span className="font-semibold text-sm block">{m.label}</span>
                  <span className="text-[11px] text-gray-400 block">
                    {m.desc}
                  </span>
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
                </div>
              </button>
            ))}
          </div>

          {/* Inputs Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {mode === "cpm" && (
              <>
                <div>
<<<<<<< HEAD
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Campaign Cost ($)</label>
=======
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Campaign Cost ($)
                  </label>
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 500"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800"
                  />
                </div>
                <div>
<<<<<<< HEAD
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Impressions</label>
=======
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Impressions
                  </label>
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
                  <input
                    type="number"
                    placeholder="e.g. 100000"
                    value={impressions}
                    onChange={(e) => setImpressions(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800"
                  />
                </div>
              </>
            )}
<<<<<<< HEAD
            {mode === "cost" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">CPM Rate ($)</label>
=======

            {mode === "cost" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CPM Rate ($)
                  </label>
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 5.00"
                    value={cpm}
                    onChange={(e) => setCpm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800"
                  />
                </div>
                <div>
<<<<<<< HEAD
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Impressions</label>
=======
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Impressions
                  </label>
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
                  <input
                    type="number"
                    placeholder="e.g. 100000"
                    value={impressions}
                    onChange={(e) => setImpressions(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800"
                  />
                </div>
              </>
            )}
<<<<<<< HEAD
            {mode === "impressions" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">CPM Rate ($)</label>
=======

            {mode === "impressions" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CPM Rate ($)
                  </label>
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 5.00"
                    value={cpm}
                    onChange={(e) => setCpm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800"
                  />
                </div>
                <div>
<<<<<<< HEAD
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Campaign Cost ($)</label>
=======
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Campaign Cost ($)
                  </label>
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 500"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800"
                  />
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={calculate}
              disabled={isDisabled}
              className="bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
<<<<<<< HEAD
              <Calculator size={18} /> Calculate CPM
=======
              <Calculator size={18} /> Calculate
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
            </button>
            <button
              onClick={handleReset}
              className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Clear All
            </button>
          </div>

          {error && (
<<<<<<< HEAD
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
=======
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-5 mb-6">
              <p className="text-xs font-semibold text-sky-500 uppercase tracking-wider mb-3">
                {result.label}
              </p>
<<<<<<< HEAD
              <p className="text-3xl font-bold text-gray-900 mb-4">{result.value}</p>
              <div className="grid grid-cols-2 gap-3">
                {result.extras.map((e, i) => (
                  <div key={i} className="bg-white rounded-lg p-3 border border-sky-100">
=======
              <p className="text-3xl font-bold text-gray-900 mb-4">
                {result.value}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {result.extras.map((e, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg p-3 border border-sky-100"
                  >
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
                    <p className="text-xs text-gray-500 mb-1">{e.label}</p>
                    <p className="font-semibold text-gray-800">{e.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={handleCopy}
<<<<<<< HEAD
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all"
=======
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
                >
                  <Copy size={15} /> {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold transition-all"
                >
                  <Download size={15} /> Download
                </button>
              </div>
            </div>
          )}

<<<<<<< HEAD
          <div className="flex flex-wrap justify-center gap-3 border-t border-gray-100 pt-6">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all"
=======
          {/* Utility Actions */}
          <div className="flex flex-wrap justify-center gap-3 border-t border-gray-100 pt-6">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
            >
              <Copy size={16} /> {copied ? "Copied!" : "Copy Result"}
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold transition-all"
            >
              <Download size={16} /> Download .txt
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-red-600 rounded-xl text-sm font-semibold transition-all"
            >
              <RefreshCw size={16} /> Clear
            </button>
          </div>
        </div>

<<<<<<< HEAD
        {/* Native ad — position unchanged */}
=======
        {/* Native ad here */}

>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
        <script
          async="async"
          data-cfasync="false"
          src="https://pl29796844.effectivecpmnetwork.com/4c385cac6f0784aa3165d3a9e7478f20/invoke.js"
        ></script>
        <div id="container-4c385cac6f0784aa3165d3a9e7478f20"></div>

<<<<<<< HEAD
        {/* ─── What Is CPM ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What Is CPM and How Does It Work?
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            CPM stands for Cost Per Mille — "mille" being the Latin word for
            thousand. In digital advertising, CPM is the price an advertiser
            pays for every 1,000 times their ad is shown to users. It's the
            standard pricing model for brand awareness campaigns, display
            advertising, video pre-rolls, and most programmatic inventory.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The reason CPM is expressed per thousand rather than per impression
            is purely practical — individual impression costs are tiny fractions
            of a cent, and working with those numbers would be unwieldy. At a
            $5 CPM, you're paying $0.005 per impression. Multiply that by a
            million impressions and you get $5,000. The math stays cleaner when
            you work in thousands.
          </p>
          <p className="text-gray-600 leading-relaxed">
            CPM matters to two different groups of people. Advertisers use it to
            understand how much reach their budget is buying and to compare the
            cost efficiency of different platforms. Publishers use it to
            understand how much revenue their inventory is generating per 1,000
            pageviews. This calculator handles both use cases — you can calculate
            the CPM from your spend and impressions, find total cost from a CPM
            rate, or figure out how many impressions a given budget will buy.
          </p>
        </section>

        {/* ─── CPM Formula ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            CPM Formula — How to Calculate CPM Manually
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Three formulas, depending on which variable you need to find. All
            three are built into the calculator above.
          </p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                CPM Calculation Formula — Find Your CPM
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                CPM = (Total Cost ÷ Total Impressions) × 1,000
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                This is the standard CPM formula. Divide what you spent by how
                many times the ad was shown, then multiply by 1,000. Example:
                you spent $500 on a campaign that delivered 100,000 impressions.
                CPM = ($500 ÷ 100,000) × 1,000 = <strong className="text-gray-700">$5.00 CPM</strong>.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Calculate Total Cost from CPM and Impressions
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Total Cost = (CPM × Impressions) ÷ 1,000
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Use this when you know the CPM rate and want to know how much a
                campaign will cost. Example: a publisher offers $5 CPM and you
                want 200,000 impressions. Cost = ($5 × 200,000) ÷ 1,000 =
                <strong className="text-gray-700"> $1,000</strong>.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Calculate Impressions from CPM and Budget
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Impressions = (Total Cost ÷ CPM) × 1,000
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Use this to find out how much reach your budget buys at a given
                CPM. Example: you have a $500 budget and the platform charges
                $5 CPM. Impressions = ($500 ÷ $5) × 1,000 =
                <strong className="text-gray-700"> 100,000 impressions</strong>.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">
                Bonus — Cost Per Impression and eCPM Formula
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl overflow-x-auto">
                Cost Per Impression = Total Cost ÷ Total Impressions{"\n"}
                eCPM = (Total Revenue ÷ Total Impressions) × 1,000
              </div>
              <p className="text-sky-800 text-xs leading-relaxed mt-2">
                eCPM (effective CPM) is used by publishers to measure actual
                revenue per 1,000 impressions across all ad units — including
                CPC ads. It lets you compare the performance of different ad
                formats on a level playing field.
              </p>
            </div>
          </div>
        </section>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How to Use This CPM Calculator Online
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Pick what you want to calculate, enter two values, and get your answer instantly.
          </p>
=======
        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Calculate CPM Online
          </h2>
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
          <ol className="space-y-5">
            {[
              {
                step: "1",
<<<<<<< HEAD
                title: "Choose your calculation mode",
                desc: "The calculator has three modes. 'Calculate CPM' finds your cost per thousand from spend and impressions. 'Calculate Cost' finds your total spend from CPM and impressions. 'Calculate Impressions' tells you how many impressions your budget will buy at a given CPM. Pick the one that fits what you're trying to figure out.",
              },
              {
                step: "2",
                title: "Enter your two known values",
                desc: "Each mode needs exactly two inputs. For CPM: enter your campaign cost in dollars and your total impression count. For cost: enter CPM rate and impressions. For impressions: enter CPM rate and campaign cost. The input fields adjust automatically based on which mode you selected.",
              },
              {
                step: "3",
                title: "Click Calculate and read the full breakdown",
                desc: "Your main result appears at the top — CPM, total cost, or impressions depending on your mode. Below that you get four additional metrics: cost per individual impression, estimated cost per click at 1.5% CTR, and two other context figures that help you evaluate the numbers. Copy or download the result if you need to save it.",
=======
                title: "Select what to calculate",
                desc: "Choose CPM, Cost, or Impressions based on what metric you need. The tool adapts the input fields automatically.",
              },
              {
                step: "2",
                title: "Enter the known values",
                desc: "Fill in the two required fields. For example, enter cost and impressions to find CPM. The tool handles the math instantly.",
              },
              {
                step: "3",
                title: "Click Calculate",
                desc: "Get your result instantly. The tool also shows cost per impression and estimated CPC for a complete view of your ad spend.",
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
              },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="w-8 h-8 bg-sky-100 text-sky-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {item.step}
                </span>
                <div>
<<<<<<< HEAD
                  <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
=======
                  <p className="font-semibold text-gray-900 text-sm mb-1">
                    {item.title}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
                </div>
              </li>
            ))}
          </ol>
        </section>

<<<<<<< HEAD
        {/* ─── CPM Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            CPM Calculation Examples — Real Scenarios
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Walk through these before plugging in your own numbers.
          </p>

          <div className="space-y-5">
            {[
              {
                label: "Example 1",
                title: "Calculate CPM from Campaign Spend",
                inputs: [["Campaign Cost", "$500"], ["Impressions", "100,000"]],
                formula: "CPM = ($500 ÷ 100,000) × 1,000",
                result: "CPM: $5.00 | Cost Per Impression: $0.005 | Est. CPC (1.5% CTR): $3.33",
                note: "A $5 CPM is a reasonable benchmark for general display advertising on many networks.",
              },
              {
                label: "Example 2",
                title: "Calculate Total Cost from CPM and Impressions",
                inputs: [["CPM Rate", "$8.00"], ["Impressions", "500,000"]],
                formula: "Cost = ($8 × 500,000) ÷ 1,000",
                result: "Total Cost: $4,000 | Cost Per Impression: $0.008 | Budget for 1M Impressions: $8,000",
                note: "At $8 CPM with half a million impressions, you need $4,000. Useful for planning campaign budgets before launch.",
              },
              {
                label: "Example 3",
                title: "Calculate Impressions from Budget and CPM",
                inputs: [["CPM Rate", "$12.00"], ["Campaign Budget", "$1,200"]],
                formula: "Impressions = ($1,200 ÷ $12) × 1,000",
                result: "Total Impressions: 100,000 | Est. Clicks (1.5% CTR): 1,500",
                note: "$12 CPM is typical for LinkedIn or premium publisher inventory. Your $1,200 budget buys exactly 100K impressions and roughly 1,500 clicks.",
              },
            ].map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">{item.label}</span>
                  <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {item.inputs.map(([label, val], j) => (
                    <div key={j} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-[11px] text-gray-400 uppercase font-bold">{label}</p>
                      <p className="text-sm font-bold text-gray-900">{val}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-900 text-green-400 font-mono text-xs px-4 py-2 rounded-lg mb-2">
                  {item.formula}
                </div>
                <div className="bg-green-50 border border-green-100 rounded-lg p-3 mb-2">
                  <p className="text-xs font-semibold text-green-700">{item.result}</p>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CPM Benchmarks by Platform ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Average CPM by Platform — What's a Good CPM?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            CPM varies widely depending on where you advertise, what industry
            you're in, and who your target audience is. Here are realistic
            benchmarks to compare your numbers against.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="text-left px-4 py-3 font-semibold">Platform / Ad Type</th>
                  <th className="text-center px-4 py-3 font-semibold">Avg CPM Range</th>
                  <th className="text-center px-4 py-3 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Google Display Network", "$1 – $5", "Brand awareness, remarketing"],
                  ["Facebook & Instagram Ads", "$5 – $12", "Targeted social campaigns"],
                  ["LinkedIn Ads", "$10 – $30", "B2B, professional audiences"],
                  ["YouTube Pre-Roll", "$4 – $10", "Video brand campaigns"],
                  ["Twitter / X Ads", "$3 – $8", "News, trending content"],
                  ["Programmatic Display", "$0.50 – $3", "Scale and volume"],
                  ["Premium Publisher Direct", "$10 – $50", "High-quality placements"],
                  ["Google AdSense (Publisher)", "$1 – $15", "Content monetization"],
                ].map((row, i) => (
                  <tr key={i} className={`${i % 2 === 1 ? "bg-gray-50" : "bg-white"} border-b border-gray-100`}>
                    <td className="px-4 py-3 font-medium text-gray-800">{row[0]}</td>
                    <td className="px-4 py-3 text-center font-bold text-sky-600">{row[1]}</td>
                    <td className="px-4 py-3 text-center text-xs text-gray-500">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            These are averages — your actual CPM depends heavily on your
            industry, targeting parameters, ad creative quality, and time of
            year. Q4 (October through December) consistently sees CPMs 30–50%
            higher than the rest of the year because advertisers compete for
            holiday inventory. If your CPM is significantly below these ranges,
            you may be getting lower-quality placements. If it's significantly
            above, check whether your targeting is too narrow or your audience
            is in a high-competition niche like finance or legal.
          </p>
        </section>

        {/* ─── CPM vs CPC vs eCPM ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            CPM vs CPC vs eCPM — What's the Difference?
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            These three metrics get confused constantly, especially by people
            new to digital advertising. Here's a clear breakdown of what each
            one means and when to use it.
          </p>

          <div className="space-y-4">
            {[
              {
                term: "CPM",
                color: "sky",
                full: "Cost Per Mille — per 1,000 impressions",
                desc: "You pay a fixed rate for every 1,000 times your ad is displayed, regardless of whether anyone clicks. CPM campaigns are best for brand awareness — you're paying for eyeballs, not actions. Advertisers use CPM to maximize reach within a budget. Publishers use CPM to price their ad inventory.",
                example: "You buy 500,000 impressions at $5 CPM = $2,500 total. Whether 500 or 5,000 people click doesn't change what you pay.",
              },
              {
                term: "CPC",
                color: "green",
                full: "Cost Per Click — pay only when someone clicks",
                desc: "You pay nothing for impressions — only when a user actually clicks your ad. CPC is better for direct response campaigns where you want traffic, leads, or sales. Google Search ads are primarily CPC. The risk is that a low-CTR ad can make CPC expensive relative to how many people saw it.",
                example: "At $0.50 CPC with 1,000 clicks, you pay $500. If your ad was shown 200,000 times to generate those clicks, your effective CPM would be $2.50.",
              },
              {
                term: "eCPM",
                color: "violet",
                full: "Effective CPM — actual revenue per 1,000 impressions",
                desc: "Used by publishers to compare the performance of different ad units and formats on a fair basis — even if some pay CPM and others pay CPC. eCPM converts all revenue to a per-thousand-impression figure. A CPC ad that generates $50 from 10,000 impressions has an eCPM of $5.00.",
                example: "If your CPC ads generated $200 from 40,000 impressions, your eCPM = ($200 ÷ 40,000) × 1,000 = $5 eCPM.",
              },
            ].map((item, i) => (
              <div key={i} className={`border border-${item.color}-100 bg-${item.color}-50 rounded-xl p-5`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`font-mono font-bold text-${item.color}-700 bg-${item.color}-100 px-3 py-1 rounded-lg text-sm`}>{item.term}</span>
                  <span className="text-gray-700 text-sm font-semibold">{item.full}</span>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed mb-2">{item.desc}</p>
                <p className="text-gray-500 text-xs italic">{item.example}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Is Lower CPM Better ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Is a Lower CPM Always Better?
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            This is one of the most common misconceptions in digital advertising.
            A lower CPM means you're paying less per thousand impressions — but
            it says nothing about the quality of those impressions or whether
            they're reaching people who will actually do anything.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            A $1 CPM on a low-quality network might deliver 100,000 impressions
            to bots, accidental clicks, and completely mismatched audiences. A
            $20 CPM on LinkedIn might deliver 5,000 impressions to exactly the
            decision-makers you need to reach. The $20 CPM campaign might
            generate 10x the revenue at a fifth of the scale.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The metric that actually matters is cost per conversion — how much
            you spend to get one customer, lead, or sale. CPM is a useful input
            for comparing platforms and planning budgets, but it's the output
            that determines whether a campaign was worth running. Use CPM to
            plan and estimate; use conversion data to evaluate.
          </p>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>Rule of thumb:</strong> compare CPMs only between campaigns
              targeting the same audience on the same platform. Comparing a $2
              CPM on a generic display network with a $15 CPM on a premium
              publisher isn't apples to apples — the audiences, placements, and
              conversion rates are completely different.
            </p>
          </div>
        </section>

        {/* ─── Who Uses This ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses a CPM Calculator?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Anyone who buys or sells digital ad inventory runs CPM calculations regularly.
=======
        {/* ─── Formulas / How It Works ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            CPM Formula Explained
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            It's simple math. Here's exactly what happens when you click
            Calculate.
          </p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Calculate CPM
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                CPM = (Total Cost ÷ Total Impressions) × 1,000
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Divides your total spend by impressions, then multiplies by
                1,000. Example: $500 / 100,000 × 1,000 = $5.00 CPM.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Calculate Total Cost
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Total Cost = (CPM × Impressions) ÷ 1,000
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Multiplies CPM by impressions, then divides by 1,000 to find
                budget. Example: $5 × 100,000 / 1,000 = $500 budget.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Calculate Total Impressions
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Impressions = (Total Cost ÷ CPM) × 1,000
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Divides budget by CPM, then multiplies by 1,000 to estimate
                reach. Example: $500 / $5 × 1,000 = 100,000 impressions.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">
                Bonus Metrics
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl overflow-x-auto">
                Cost Per Impression = Cost ÷ Impressions
                <br />
                Est. CPC = Cost ÷ (Impressions × 0.015 CTR)
              </div>
            </div>
          </div>
        </section>

        {/* ─── Real Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            CPM Calculation Examples
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Real-world scenarios to help you understand the metrics.
          </p>

          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                  Scenario 1
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs text-green-700 font-medium mb-1">
                  Input:
                </p>
                <p className="font-mono text-sm text-gray-800">
                  Cost: $500, Impressions: 100,000
                </p>
                <p className="text-xs text-green-600 font-mono break-all mt-2">
                  Output:
                </p>
                <p className="font-mono text-sm text-gray-800 break-all">
                  CPM: $5.00
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                  Scenario 2
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs text-green-700 font-medium mb-1">
                  Input:
                </p>
                <p className="font-mono text-sm text-gray-800">
                  CPM: $5.00, Impressions: 1,000,000
                </p>
                <p className="text-xs text-green-600 font-mono break-all mt-2">
                  Output:
                </p>
                <p className="font-mono text-sm text-gray-800 break-all">
                  Total Cost: $5,000.00, Cost Per Impression: $0.005
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses CPM Calculators?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            It’s not just marketing. Here are the places where CPM calculations
            get used in practice.{" "}
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Zap size={20} className="text-sky-600" />,
<<<<<<< HEAD
                title: "Media Buyers & Advertisers",
                desc: "Before launching any display or video campaign, media buyers calculate CPM to compare platforms and forecast how much reach a given budget will deliver. This calculator handles that in seconds.",
              },
              {
                icon: <BarChart3 size={20} className="text-green-600" />,
                title: "Social Media Marketers",
                desc: "Facebook, Instagram, LinkedIn, and Twitter all use CPM-based pricing for awareness campaigns. Calculating and comparing CPMs across these platforms helps marketers allocate budgets to the most efficient channels.",
              },
              {
                icon: <Code size={20} className="text-violet-600" />,
                title: "Publishers & Website Owners",
                desc: "Publishers use CPM to price their ad inventory, compare ad network payouts, and understand how much their audience is worth per 1,000 pageviews. The eCPM formula is especially useful here.",
              },
              {
                icon: <HelpCircle size={20} className="text-amber-600" />,
                title: "Students & Marketing Learners",
                desc: "CPM is one of the foundational metrics in digital advertising. This calculator is useful for anyone studying marketing who wants to practice the formula with real numbers rather than just reading it in a textbook.",
              },
            ].map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-5 hover:border-sky-200 transition-colors">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
=======
                title: "Display Advertising Professionals",
                desc: "Use CPM comparisons between various networks to get the best deal for your brand campaigns.",
              },
              {
                icon: <BarChart3 size={20} className="text-green-600" />,
                title: "Social Media Marketing Specialists",
                desc: "Calculate Facebook and Instagram ad costs using the CPM metric.",
              },
              {
                icon: <Code size={20} className="text-violet-600" />,
                title: "Real-Time Bidding Specialists",
                desc: "Predict the number of impressions in RTB campaigns using CPM bids.",
              },
              {
                icon: <HelpCircle size={20} className="text-amber-600" />,
                title: "Educational Institutions and Students",
                desc: "Learn about online advertising metrics for studying purposes.",
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
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
              </div>
            ))}
          </div>
        </section>

<<<<<<< HEAD
        {/* ─── FAQ ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            CPM Calculator — Frequently Asked Questions
=======
        {/* ─── SEO Content ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            The Importance of CPM for Your Advertising Efforts
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The CPM (cost per mille) is the most widely used form of pricing for
            digital advertising. This pricing method will inform you of the cost
            of placing your advertisement for every thousand impressions,
            irrespective of clicks.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            With a basic understanding of the CPM formula, you can evaluate the
            various ad platforms available to make informed decisions on which
            platform would suit your budget. If your campaign on Facebook has a
            cost of $3 per CPM while that on LinkedIn is $12 CPM, the second may
            well be worth the extra amount if it produces better quality
            leads.{" "}
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Apart from the CPM formula, the tool provides the cost per
            impression of the ad and estimates of CPC (cost per click) based on
            a click-through rate of 1.5%.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Is Lower CPM Always Good?
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Not always. A lower CPM from a low-quality website may lead to bad
            results. The key is cost per conversion, not just CPM. A $20 CPM
            with 5% conversion is better than a $2 CPM with 0.1% conversion.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Privacy Notice
          </h3>
          <p className="text-gray-600 leading-relaxed">
            It works entirely in your browser and doesn't transfer your data
            anywhere. Not to any servers, databases, or anything else. Just
            close the tab, and it's all done. That's the way it ought to be.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need to calculate CPC instead? Try the{" "}
            <Link
              href="/tools/cpc-calculator"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              CPC Calculator
            </Link>
            . Estimating overall revenue? The{" "}
            <Link
              href="/tools/ad-revenue-calculator"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              Ad Revenue Calculator
            </Link>{" "}
            has your back.
          </p>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              {
<<<<<<< HEAD
                q: "How do you calculate CPM?",
                a: "The CPM formula is: CPM = (Total Cost ÷ Total Impressions) × 1,000. Divide your campaign spend by the total number of impressions it delivered, then multiply by 1,000. Example: $500 spent on 100,000 impressions = ($500 ÷ 100,000) × 1,000 = $5.00 CPM. Use the calculator above to get the result instantly without doing the math manually.",
              },
              {
                q: "What does CPM stand for in advertising?",
                a: "CPM stands for Cost Per Mille. 'Mille' is the Latin word for thousand, so CPM literally means the cost per thousand impressions. It's the standard pricing unit for display, video, and most programmatic advertising. When a platform says the CPM is $5, it means you'll pay $5 every time your ad is shown 1,000 times.",
              },
              {
                q: "How do I calculate impressions from CPM and budget?",
                a: "Use the formula: Impressions = (Budget ÷ CPM) × 1,000. If you have a $1,000 budget and the CPM is $10, your impressions = ($1,000 ÷ $10) × 1,000 = 100,000 impressions. Select 'Calculate Impressions' mode in the calculator above and enter your CPM and budget to get the result.",
              },
              {
                q: "How do I calculate cost from CPM and impressions?",
                a: "Total Cost = (CPM × Impressions) ÷ 1,000. If a campaign has a $5 CPM and you want 200,000 impressions, your cost = ($5 × 200,000) ÷ 1,000 = $1,000. Select 'Calculate Cost' mode in the tool above and enter your CPM and impression target.",
              },
              {
                q: "What is a good CPM for digital advertising?",
                a: "It depends on the platform and your industry. Google Display Network typically ranges from $1–$5. Facebook and Instagram are $5–$12. LinkedIn is $10–$30. YouTube pre-rolls are $4–$10. Premium publisher placements can reach $30–$50+. Finance and insurance niches consistently have higher CPMs because advertisers compete aggressively for those audiences.",
              },
              {
                q: "What is eCPM and how is it different from CPM?",
                a: "CPM is what advertisers pay — the cost of buying 1,000 impressions. eCPM (effective CPM) is what publishers earn — the actual revenue generated per 1,000 impressions across all ad formats, including CPC ads. Formula: eCPM = (Total Revenue ÷ Total Impressions) × 1,000. Publishers use eCPM to compare the performance of different ad units and networks on an equal basis.",
              },
              {
                q: "What is the difference between CPM and CPC?",
                a: "CPM is cost per thousand impressions — you pay for views regardless of clicks. CPC is cost per click — you pay only when someone clicks your ad. CPM is better for brand awareness at scale. CPC is better for direct response campaigns where you need traffic or conversions. Many campaigns use both — CPM for reach, CPC for conversion-focused placements.",
              },
              {
                q: "How many impressions do I get for $1,000 at a $5 CPM?",
                a: "Impressions = ($1,000 ÷ $5) × 1,000 = 200,000 impressions. At a 1.5% CTR, that's roughly 3,000 estimated clicks. Use the 'Calculate Impressions' mode in the calculator above to run these numbers instantly for any CPM and budget combination.",
              },
              {
                q: "Is this CPM calculator free to use?",
                a: "Yes, completely free. No account, no signup, no limits. Calculate CPM, total cost, or total impressions as many times as you need. All calculations run in your browser — your data is never sent to any server.",
              },
              {
                q: "Can I use this calculator for eCPM?",
                a: "Yes. To calculate your eCPM as a publisher, use the 'Calculate CPM' mode and enter your total ad revenue as the cost field and your total impressions. The result will be your eCPM — how much revenue you're generating per 1,000 impressions across all your ad units combined.",
=======
                q: "How to calculate CPM online?",
                a: "Divide your total campaign cost by total impressions, then multiply by 1000. CPM = (Cost / Impressions) × 1000. Or use this free CPM calculator — just enter cost and impressions.",
              },
              {
                q: "What is a good CPM for digital advertising?",
                a: "A good CPM varies by platform and industry. Display ads average $2-5 CPM, social media $5-12, Google Search $10-30. Finance and tech niches have higher CPMs.",
              },
              {
                q: "What does CPM stand for?",
                a: "CPM stands for Cost Per Mille (Mille = thousand in Latin). It means the cost an advertiser pays for 1,000 impressions of their ad.",
              },
              {
                q: "What is the difference between CPM and CPC?",
                a: "CPM is cost per 1,000 impressions — you pay for views. CPC is cost per click — you pay only when someone clicks your ad. CPM is better for brand awareness, CPC for direct response.",
              },
              {
                q: "How to calculate campaign cost from CPM?",
                a: "Multiply CPM by number of impressions, then divide by 1000. Cost = (CPM × Impressions) / 1000. Example: $5 CPM × 100,000 impressions = $500 cost.",
              },
              {
                q: "Is a lower CPM always better?",
                a: "Not necessarily. A low CPM on a low-quality platform might generate poor results. Focus on cost-per-conversion rather than just CPM. A $20 CPM with 5% conversion rate beats a $2 CPM with 0.1% conversion.",
              },
              {
                q: "How many impressions is 1 CPM?",
                a: "1 CPM equals exactly 1,000 impressions. If your CPM is $5, you pay $5 for every 1,000 times your ad is shown to users.",
              },
              {
                q: "Is this calculator free?",
                a: "Yes, 100% free. No signup, no account, no limits. Calculate CPM, cost, or impressions as many times as you need.",
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
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
<<<<<<< HEAD
                  <h3 className="text-sm md:text-base font-bold text-gray-900 pr-4">{item.q}</h3>
=======
                  <h3 className="text-sm md:text-base font-bold text-gray-900 pr-4">
                    {item.q}
                  </h3>
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
                  <ChevronDown
                    size={22}
                    className={`text-sky-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
                >
<<<<<<< HEAD
                  <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{item.a}</p>
=======
                  <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                    {item.a}
                  </p>
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
                </div>
              </div>
            ))}
          </div>
        </section>

<<<<<<< HEAD
        {/* ─── Related Tools ─── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related Ad & Marketing Calculators
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/tools/cpc-calculator", title: "CPC Calculator", desc: "Calculate cost per click for ad campaigns." },
              { href: "/tools/ad-revenue-calculator", title: "Ad Revenue Calculator", desc: "Estimate website ad income across 6 formats." },
              { href: "/tools/adsense-revenue-calculator", title: "AdSense Revenue Calculator", desc: "Estimate Google AdSense earnings by niche." },
              { href: "/tools/youtube-ad-revenue-calculator", title: "YouTube Revenue Calculator", desc: "Estimate YouTube ad income by category." },
              { href: "/tools/percentage-calculator", title: "Percentage Calculator", desc: "Calculate increases, decreases and ratios." },
              { href: "/tools/profit-margin-calculator", title: "Profit Margin Calculator", desc: "Calculate profit % and markup from cost." },
=======
        {/* ─── Related Tools (Short Descriptions) ─── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related Ad Marketing Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/cpc-calculator",
                title: "CPC Calculator",
                desc: "Calculate cost per click for ad campaigns.",
              },
              {
                href: "/tools/ad-revenue-calculator",
                title: "Ad Revenue Calculator",
                desc: "Estimate income from display ads.",
              },
              {
                href: "/tools/percentage-calculator",
                title: "Percentage Calculator",
                desc: "Calculate increases and decreases.",
              },
              {
                href: "/tools/adsense-revenue-calculator",
                title: "AdSense Revenue Calculator",
                desc: "Estimate Google AdSense earnings.",
              },
              {
                href: "/tools/youtube-ad-revenue-calculator",
                title: "YouTube Revenue Calculator",
                desc: "Estimate YouTube ad income.",
              },
              {
                href: "/tools/profit-margin-calculator",
                title: "Profit Margin Calculator",
                desc: "Calculate profit % and markup.",
              },
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-sky-400 transition-all"
              >
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-sky-600 transition-colors">
                  {tool.title}
                </h3>
<<<<<<< HEAD
                <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
=======
                <p className="text-gray-500 text-sm leading-relaxed">
                  {tool.desc}
                </p>
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
              </Link>
            ))}
          </div>
        </section>
<<<<<<< HEAD

=======
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default CpmCalculator;
=======
export default CpmCalculator;
>>>>>>> 8da083c1a9a4babb5a845443cd94970488005ec2
