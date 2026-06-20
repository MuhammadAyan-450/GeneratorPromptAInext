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
          {
            label: "Est. Cost Per Click (1.5% CTR)",
            value: `$${costPerClick.toFixed(2)}`,
          },
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
          {
            label: "Cost Per Impression",
            value: `$${(calcCost / i).toFixed(5)}`,
          },
          {
            label: "Est. Budget for 1M Impressions",
            value: `$${(cp * 1000).toFixed(2)}`,
          },
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
          {
            label: "Cost Per Impression",
            value: `$${(c / calcImpressions).toFixed(5)}`,
          },
          {
            label: "Est. Clicks (1.5% CTR)",
            value: Math.round(calcImpressions * 0.015).toLocaleString(),
          },
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
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <BarChart3 className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            CPM Calculator
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Calculate cost per 1,000 impressions, campaign cost, or total
            impressions instantly. Just enter two values, hit calculate, and get
            your CPM metrics plus bonus cost-per-impression data.
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
                onClick={() => {
                  setMode(m.id);
                  setResult(null);
                  setError("");
                }}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                  mode === m.id
                    ? "border-sky-500 bg-sky-50 text-sky-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-sky-300 hover:bg-sky-50/50"
                }`}
              >
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
                </div>
              </button>
            ))}
          </div>

          {/* Inputs Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {mode === "cpm" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Campaign Cost ($)
                  </label>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Impressions
                  </label>
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

            {mode === "cost" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CPM Rate ($)
                  </label>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Impressions
                  </label>
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

            {mode === "impressions" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CPM Rate ($)
                  </label>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Campaign Cost ($)
                  </label>
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
              <Calculator size={18} /> Calculate
            </button>
            <button
              onClick={handleReset}
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

          {/* Result */}
          {result && (
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-5 mb-6">
              <p className="text-xs font-semibold text-sky-500 uppercase tracking-wider mb-3">
                {result.label}
              </p>
              <p className="text-3xl font-bold text-gray-900 mb-4">
                {result.value}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {result.extras.map((e, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg p-3 border border-sky-100"
                  >
                    <p className="text-xs text-gray-500 mb-1">{e.label}</p>
                    <p className="font-semibold text-gray-800">{e.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
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

          {/* Utility Actions */}
          <div className="flex flex-wrap justify-center gap-3 border-t border-gray-100 pt-6">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
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
            How to Calculate CPM Online
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
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
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Zap size={20} className="text-sky-600" />,
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
              </div>
            ))}
          </div>
        </section>

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
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              {
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

export default CpmCalculator;
