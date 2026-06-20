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
  MousePointerClick,
  Eye,
  Calculator,
  Zap,
  Shield,
  Target,
  CheckCircle2,
  TrendingUp,
  Code,
  HelpCircle,
  ArrowRight,
  FileText,
} from "lucide-react";
import ResponsiveAd from "../../../components/ResponsiveAd";

const CpcCalculator = () => {
  const [mode, setMode] = useState("cpc");
  const [cost, setCost] = useState("");
  const [clicks, setClicks] = useState("");
  const [cpc, setCpc] = useState("");
  const [impressions, setImpressions] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    setError("");
  }, [mode]);

  const calculate = () => {
    const imp = parseFloat(impressions) || 0;
    const hasImpressions = imp > 0;

    if (mode === "cpc") {
      if (!cost || !clicks) {
        setError("Please enter both campaign cost and total clicks.");
        return;
      }
      const c = parseFloat(cost);
      const cl = parseFloat(clicks);
      if (cl <= 0) {
        setError("Clicks must be greater than 0.");
        return;
      }
      const calcCpc = c / cl;
      const extras = [
        { label: "Total Cost", value: `$${c.toFixed(2)}` },
        { label: "Total Clicks", value: cl.toLocaleString() },
      ];
      if (hasImpressions) {
        extras.push({
          label: "CTR (Click-Through Rate)",
          value: `${((cl / imp) * 100).toFixed(2)}%`,
        });
        extras.push({
          label: "Equivalent CPM",
          value: `$${((c / imp) * 1000).toFixed(2)}`,
        });
      } else {
        extras.push({
          label: "Cost Per 1,000 Clicks",
          value: `$${(calcCpc * 1000).toFixed(2)}`,
        });
        extras.push({
          label: "Est. Conversions (3% Rate)",
          value: Math.round(cl * 0.03).toLocaleString(),
        });
      }
      setResult({
        label: "CPC (Cost Per Click)",
        value: `$${calcCpc.toFixed(2)}`,
        raw: calcCpc.toFixed(2),
        extras,
      });
    } else if (mode === "cost") {
      if (!cpc || !clicks) {
        setError("Please enter both CPC rate and total clicks.");
        return;
      }
      const cp = parseFloat(cpc);
      const cl = parseFloat(clicks);
      if (cp <= 0 || cl <= 0) {
        setError("CPC and clicks must be greater than 0.");
        return;
      }
      const calcCost = cp * cl;
      const extras = [
        { label: "CPC Rate", value: `$${cp.toFixed(2)}` },
        { label: "Total Clicks", value: cl.toLocaleString() },
      ];
      if (hasImpressions) {
        extras.push({
          label: "CTR (Click-Through Rate)",
          value: `${((cl / imp) * 100).toFixed(2)}%`,
        });
        extras.push({
          label: "Equivalent CPM",
          value: `$${((calcCost / imp) * 1000).toFixed(2)}`,
        });
      } else {
        extras.push({
          label: "Budget for 10,000 Clicks",
          value: `$${(cp * 10000).toFixed(2)}`,
        });
        extras.push({
          label: "Est. Conversions (3% Rate)",
          value: Math.round(cl * 0.03).toLocaleString(),
        });
      }
      setResult({
        label: "Total Campaign Cost",
        value: `$${calcCost.toFixed(2)}`,
        raw: calcCost.toFixed(2),
        extras,
      });
    } else if (mode === "clicks") {
      if (!cpc || !cost) {
        setError("Please enter both CPC rate and campaign cost.");
        return;
      }
      const cp = parseFloat(cpc);
      const c = parseFloat(cost);
      if (cp <= 0) {
        setError("CPC must be greater than 0.");
        return;
      }
      const calcClicks = c / cp;
      const extras = [
        { label: "CPC Rate", value: `$${cp.toFixed(2)}` },
        { label: "Campaign Cost", value: `$${c.toFixed(2)}` },
      ];
      if (hasImpressions) {
        extras.push({
          label: "CTR (Click-Through Rate)",
          value: `${((calcClicks / imp) * 100).toFixed(2)}%`,
        });
        extras.push({
          label: "Equivalent CPM",
          value: `$${((c / imp) * 1000).toFixed(2)}`,
        });
      } else {
        extras.push({
          label: "Est. Impressions (2% CTR)",
          value: Math.round(calcClicks / 0.02).toLocaleString(),
        });
        extras.push({
          label: "Est. Conversions (3% Rate)",
          value: Math.round(calcClicks * 0.03).toLocaleString(),
        });
      }
      setResult({
        label: "Total Clicks",
        value: Math.round(calcClicks).toLocaleString(),
        raw: Math.round(calcClicks),
        extras,
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
    const text = `CPC Calculation Result\n\n${result.label}: ${result.value}\n\n${result.extras.map((e) => `${e.label}: ${e.value}`).join("\n")}`;
    const file = new Blob([text], { type: "text/plain" });
    const el = document.createElement("a");
    el.href = URL.createObjectURL(file);
    el.download = "cpc-calculation.txt";
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  };

  const handleReset = () => {
    setCost("");
    setClicks("");
    setCpc("");
    setImpressions("");
    setResult(null);
    setError("");
    setCopied(false);
  };

  const modes = [
    {
      id: "cpc",
      label: "Calculate CPC",
      desc: "From Cost & Clicks",
      icon: <Target size={16} />,
    },
    {
      id: "cost",
      label: "Calculate Cost",
      desc: "From CPC & Clicks",
      icon: <DollarSign size={16} />,
    },
    {
      id: "clicks",
      label: "Calculate Clicks",
      desc: "From CPC & Cost",
      icon: <MousePointerClick size={16} />,
    },
  ];

  const isDisabled =
    (mode === "cpc" && (!cost || !clicks)) ||
    (mode === "cost" && (!cpc || !clicks)) ||
    (mode === "clicks" && (!cpc || !cost));

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
                CPC Calculator
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <Target className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            CPC Calculator
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Calculate cost per click, campaign cost, or total clicks instantly.
            Just enter two values, hit calculate, and get your CPC metrics plus
            bonus CTR and CPM data.
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
            {mode === "cpc" && (
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
                    Total Clicks
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 100"
                    value={clicks}
                    onChange={(e) => setClicks(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800"
                  />
                </div>
              </>
            )}

            {mode === "cost" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CPC Rate ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 2.50"
                    value={cpc}
                    onChange={(e) => setCpc(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Clicks
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 1000"
                    value={clicks}
                    onChange={(e) => setClicks(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800"
                  />
                </div>
              </>
            )}

            {mode === "clicks" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CPC Rate ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 2.50"
                    value={cpc}
                    onChange={(e) => setCpc(e.target.value)}
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

          {/* Optional Impressions */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Total Impressions (Optional)
            </label>
            <input
              type="number"
              placeholder="e.g. 10000"
              value={impressions}
              onChange={(e) => setImpressions(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800"
            />
            <p className="text-xs text-gray-500 mt-1">
              Add impressions to auto-calculate CTR & CPM.
            </p>
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
            How to Calculate CPC Online
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Select what to calculate",
                desc: "Choose CPC, Cost, or Clicks based on what metric you need. The tool adapts the input fields automatically.",
              },
              {
                step: "2",
                title: "Enter the known values",
                desc: "Fill in the two required fields. For example, enter cost and clicks to find CPC. Add impressions for bonus CTR data.",
              },
              {
                step: "3",
                title: "Click Calculate",
                desc: "Get your result instantly. The tool also shows estimated conversions and equivalent CPM if you provided impressions.",
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
            CPC Formula Explained
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            It's simple math. Here's exactly what happens when you click
            Calculate.
          </p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Calculate CPC
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                CPC = Total Cost ÷ Total Clicks
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Divides your total spend by the number of clicks received.
                Example: $500 / 100 clicks = $5.00 CPC.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Calculate Total Cost
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Total Cost = CPC × Total Clicks
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Multiplies your target CPC by desired clicks to find budget.
                Example: $2.50 × 1000 clicks = $2,500 budget.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Calculate Total Clicks
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Total Clicks = Total Cost ÷ CPC
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Divides your budget by CPC to estimate traffic. Example: $500 /
                $2.50 CPC = 200 clicks.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">
                Bonus Metrics (with Impressions)
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl overflow-x-auto">
                CTR = (Clicks ÷ Impressions) × 100
                <br />
                CPM = (Cost ÷ Impressions) × 1000
              </div>
            </div>
          </div>
        </section>

        {/* ─── Real Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            CPC Calculation Examples
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
                  Cost: $500, Clicks: 100
                </p>
                <p className="text-xs text-green-600 font-mono break-all mt-2">
                  Output:
                </p>
                <p className="font-mono text-sm text-gray-800 break-all">
                  CPC: $5.00
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
                  CPC: $2.50, Clicks: 1000, Impressions: 50,000
                </p>
                <p className="text-xs text-green-600 font-mono break-all mt-2">
                  Output:
                </p>
                <p className="font-mono text-sm text-gray-800 break-all">
                  Total Cost: $2,500.00, CTR: 2.00%, CPM: $50.00
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses CPC Calculators?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Not just marketers. Here's where CPC metrics show up in real work.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Zap size={20} className="text-sky-600" />,
                title: "PPC Managers",
                desc: "Plan budgets and forecast clicks for Google Ads and Facebook campaigns.",
              },
              {
                icon: <TrendingUp size={20} className="text-green-600" />,
                title: "Small Business Owners",
                desc: "Estimate ad costs before launching campaigns to avoid overspending.",
              },
              {
                icon: <Code size={20} className="text-violet-600" />,
                title: "Affiliate Marketers",
                desc: "Calculate break-even CPC based on commission rates and conversion rates.",
              },
              {
                icon: <HelpCircle size={20} className="text-amber-600" />,
                title: "Students & Learners",
                desc: "Understand digital marketing metrics for courses and certifications.",
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
            Why CPC Matters for Your Ad Campaigns
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            <strong>CPC (Cost Per Click)</strong> is the amount you pay each
            time a user clicks on your digital ad. It is the most important
            metric for pay-per-click (PPC) campaigns on platforms like Google
            Ads, Facebook Ads, and LinkedIn Ads.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Knowing your CPC helps you plan budgets. If your target CPC is $3
            and you want 500 clicks, your budget should be $3 × 500 = $1,500.
            This calculator handles all three directions instantly.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            If you also enter your total impressions, this tool goes beyond
            basic CPC calculation and automatically computes your{" "}
            <strong>Click-Through Rate (CTR)</strong> and{" "}
            <strong>CPM (Cost Per Mille)</strong>. This gives you a complete
            picture of your ad performance without needing multiple separate
            tools.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            How to Reduce Your CPC
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            High CPC is usually caused by bidding on competitive short-tail
            keywords, low Quality Score, poor landing page experience, or
            targeting high-competition audiences. Improve your ad relevance, use
            long-tail keywords, and optimize your landing pages to lower costs.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Privacy Note
          </h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser. Your data never leaves your
            device — no server upload, no logging, no tracking. Close the tab
            and it's gone. That's how it should be.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need to calculate CPM instead? Try the{" "}
            <Link
              href="/tools/cpm-calculator"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              CPM Calculator
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
                q: "How to calculate CPC online?",
                a: "Divide total campaign cost by total clicks. CPC = Cost / Clicks. Example: $500 cost / 100 clicks = $5.00 CPC. Use this free calculator to do it instantly.",
              },
              {
                q: "What is a good CPC for Google Ads?",
                a: "A good CPC on Google Ads varies by industry. Legal and finance can be $5-50+, while e-commerce averages $1-3. The global average across all industries is around $2-$4.",
              },
              {
                q: "What does CPC stand for?",
                a: "CPC stands for Cost Per Click. It is the amount an advertiser pays each time a user clicks on their ad. It is the primary pricing model for Google Ads and social media ads.",
              },
              {
                q: "What is the difference between CPC and CPM?",
                a: "CPC (Cost Per Click) means you pay when someone clicks your ad. CPM (Cost Per Mille) means you pay per 1,000 impressions regardless of clicks. CPC is better for direct response, CPM for brand awareness.",
              },
              {
                q: "How to reduce CPC?",
                a: "Improve Quality Score (relevance of ads, keywords, landing page), use long-tail keywords, add negative keywords, optimize ad copy for higher CTR, and run A/B tests on your campaigns.",
              },
              {
                q: "Why is my CPC so high?",
                a: "High CPC is usually caused by bidding on competitive short-tail keywords, low Quality Score, poor landing page experience, or targeting high-competition audiences/locations.",
              },
              {
                q: "Can I calculate CTR with this tool?",
                a: "Yes. If you optionally enter your total impressions along with cost and clicks, the tool will automatically calculate your CTR (Click-Through Rate) and CPM alongside your CPC.",
              },
              {
                q: "Is this calculator free?",
                a: "Yes, 100% free. No signup, no account, no limits. Calculate CPC, cost, or clicks as many times as you need.",
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
                href: "/tools/cpm-calculator",
                title: "CPM Calculator",
                desc: "Calculate cost per 1000 impressions.",
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

export default CpcCalculator;
