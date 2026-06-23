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
            CPC Calculator — Calculate Cost Per Click, Budget & Clicks Free
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            The fastest free CPC calculator online. Find your cost per click
            from campaign spend and clicks, calculate your total budget from CPC
            and click target, or estimate how many clicks your budget will buy.
            Add impressions to get CTR and CPM too — all in one tool, no signup
            needed.
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

          {/* Inputs */}
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
              Total Impressions{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="number"
              placeholder="e.g. 10000"
              value={impressions}
              onChange={(e) => setImpressions(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800"
            />
            <p className="text-xs text-gray-500 mt-1">
              Add impressions to automatically calculate CTR and equivalent CPM
              alongside your CPC.
            </p>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={calculate}
              disabled={isDisabled}
              className="bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <Calculator size={18} /> Calculate CPC
            </button>
            <button
              onClick={handleReset}
              className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Clear All
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all"
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

          <div className="flex flex-wrap justify-center gap-3 border-t border-gray-100 pt-6">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all"
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

        {/* Native ad — position unchanged */}
        <script
          async="async"
          data-cfasync="false"
          src="https://pl29796844.effectivecpmnetwork.com/4c385cac6f0784aa3165d3a9e7478f20/invoke.js"
        ></script>
        <div id="container-4c385cac6f0784aa3165d3a9e7478f20"></div>

        {/* ─── What Is CPC ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What Is CPC and Why Does It Matter?
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            CPC stands for Cost Per Click. It's the amount an advertiser pays
            each time someone clicks on their ad — whether that's a Google
            search ad, a Facebook sponsored post, an Amazon product ad, or a
            LinkedIn promoted piece of content. If your campaign spent $500 and
            received 200 clicks, your CPC is $2.50.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            CPC is the core metric for pay-per-click (PPC) advertising. Unlike
            CPM, where you pay for impressions regardless of engagement, CPC
            means you only pay when someone actually takes the action of
            clicking through to your site or landing page. That makes it the
            preferred model for direct response campaigns — where you're trying
            to drive traffic, leads, or sales rather than just build awareness.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Knowing your CPC lets you plan budgets precisely, compare the
            efficiency of different platforms and campaigns, and calculate
            whether a channel is profitable. If your average customer is worth
            $50 and you convert 5% of clicks, you can afford up to $2.50 CPC to
            break even — anything below that is profit. This calculator helps
            you find that number fast, in three different directions.
          </p>
        </section>

        {/* ─── CPC Formula ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            CPC Formula — How to Calculate Cost Per Click
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Three versions of the CPC calculation formula depending on what
            you're trying to find. All three are built into the calculator
            above.
          </p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                CPC Formula — Find Your Cost Per Click
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                CPC = Total Campaign Cost ÷ Total Clicks
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                This is the standard CPC calculation. Divide what you spent by
                how many clicks your campaign received. Example: you spent $500
                and got 200 clicks. CPC = $500 ÷ 200 =
                <strong className="text-gray-700"> $2.50 per click</strong>.
                This tells you exactly what each visitor to your site cost you.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Calculate Campaign Cost from CPC and Clicks
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Total Cost = CPC × Total Clicks
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Use this when planning a campaign. If you know the average CPC
                on a platform and you want to drive a specific number of clicks,
                this tells you the budget you need. Example: $2.50 CPC × 1,000
                clicks ={" "}
                <strong className="text-gray-700">$2,500 budget</strong>.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Calculate Total Clicks from CPC and Budget
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Total Clicks = Campaign Budget ÷ CPC
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Use this to estimate traffic from a fixed budget. If you have
                $500 to spend and the platform's average CPC is $2.50, you can
                expect roughly $500 ÷ $2.50 =
                <strong className="text-gray-700"> 200 clicks</strong>. Useful
                for setting realistic traffic expectations before a campaign
                launches.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">
                Bonus — CTR and CPM Formulas (with Impressions)
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl overflow-x-auto">
                CTR = (Clicks ÷ Impressions) × 100{"\n"}
                Equivalent CPM = (Cost ÷ Impressions) × 1,000
              </div>
              <p className="text-sky-800 text-xs leading-relaxed mt-2">
                Enter your impressions in the optional field above and the
                calculator adds CTR and equivalent CPM to your results
                automatically. This lets you compare your CPC campaign directly
                against CPM-based alternatives.
              </p>
            </div>
          </div>
        </section>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How to Use This CPC Calculator
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Pick your calculation mode, enter two values, and get your answer
            plus bonus metrics in one click.
          </p>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Choose what you want to calculate",
                desc: "There are three modes. 'Calculate CPC' finds your cost per click from what you spent and how many clicks you got. 'Calculate Cost' finds the total budget needed for a target number of clicks at a given CPC. 'Calculate Clicks' tells you how many clicks a fixed budget will buy at a specific CPC rate. The input fields switch automatically.",
              },
              {
                step: "2",
                title: "Enter your two known values",
                desc: "For CPC mode: enter your total campaign spend and total clicks received. For cost mode: enter your CPC rate and how many clicks you want. For clicks mode: enter CPC rate and your budget. All values are in dollars — no special formatting needed.",
              },
              {
                step: "3",
                title: "Optionally add impressions for more data",
                desc: "If you enter your total impressions in the optional field, the calculator adds two extra metrics: your Click-Through Rate (CTR) and the equivalent CPM for your campaign. This is useful when comparing a CPC-based campaign against a CPM-based alternative to see which is more cost-efficient.",
              },
              {
                step: "4",
                title: "Click Calculate and read your full breakdown",
                desc: "Your main result appears at the top. Below that you get four supporting metrics — estimated conversions, equivalent CPM, CTR, or budget projections depending on your mode. Copy the result or download it as a text file if you need to share it or save it for a report.",
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

        {/* ─── CPC Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            CPC Calculation Examples — Real Campaign Scenarios
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Three real-world examples showing how the CPC formula works in
            practice.
          </p>

          <div className="space-y-5">
            {[
              {
                label: "Example 1",
                title: "Google Ads — Calculate CPC from Spend and Clicks",
                inputs: [
                  ["Campaign Cost", "$750"],
                  ["Total Clicks", "300"],
                  ["Impressions", "15,000"],
                ],
                formula: "CPC = $750 ÷ 300 = $2.50",
                result:
                  "CPC: $2.50 | CTR: 2.0% | Equivalent CPM: $50.00 | Est. Conversions (3%): 9",
                note: "A $2.50 CPC with 2% CTR is solid performance for a Google Search campaign in a mid-competition niche. Finance and legal keywords often run $10–$50+ CPC.",
              },
              {
                label: "Example 2",
                title: "Facebook Ads — Calculate Budget from CPC Target",
                inputs: [
                  ["CPC Rate", "$1.20"],
                  ["Target Clicks", "5,000"],
                ],
                formula: "Cost = $1.20 × 5,000 = $6,000",
                result:
                  "Total Budget: $6,000 | Budget for 10,000 clicks: $12,000 | Est. Conversions (3%): 150",
                note: "Facebook typically runs $0.50–$2.00 CPC for broad audiences. At $1.20 CPC and 3% conversion, 5,000 clicks produces 150 leads — know this before you set your budget.",
              },
              {
                label: "Example 3",
                title: "Amazon Ads — Calculate Clicks from Budget and CPC",
                inputs: [
                  ["CPC Rate", "$0.85"],
                  ["Campaign Budget", "$425"],
                ],
                formula: "Clicks = $425 ÷ $0.85 = 500 clicks",
                result:
                  "Total Clicks: 500 | Est. Impressions (2% CTR): 25,000 | Est. Conversions (3%): 15",
                note: "Amazon CPC varies by product category. Sponsored product ads often run $0.50–$1.50. Knowing your expected click volume before launch helps you set daily budgets correctly.",
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
                  {item.inputs.map(([label, val], j) => (
                    <div key={j} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-[11px] text-gray-400 uppercase font-bold">
                        {label}
                      </p>
                      <p className="text-sm font-bold text-gray-900">{val}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-900 text-green-400 font-mono text-xs px-4 py-2 rounded-lg mb-2">
                  {item.formula}
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

        {/* ─── Average CPC by Platform ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Average CPC by Platform — What's a Good CPC?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            CPC varies enormously depending on where you advertise, what
            industry you're in, and how competitive your keywords are. Here are
            realistic benchmarks to compare your numbers against.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="text-left px-4 py-3 font-semibold">
                    Platform
                  </th>
                  <th className="text-center px-4 py-3 font-semibold">
                    Avg CPC Range
                  </th>
                  <th className="text-center px-4 py-3 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Google Search Ads",
                    "$1 – $10+",
                    "Highly keyword-dependent",
                  ],
                  [
                    "Google Display Network",
                    "$0.30 – $1.50",
                    "Lower intent, cheaper clicks",
                  ],
                  [
                    "Facebook & Instagram",
                    "$0.50 – $2.00",
                    "Varies by audience targeting",
                  ],
                  [
                    "LinkedIn Ads",
                    "$5 – $15+",
                    "Expensive but high B2B quality",
                  ],
                  [
                    "Amazon Sponsored Products",
                    "$0.50 – $1.50",
                    "Strong purchase intent",
                  ],
                  ["Twitter / X Ads", "$0.30 – $1.00", "Lower competition"],
                  [
                    "YouTube Ads (TrueView)",
                    "$0.05 – $0.30",
                    "Cost per view, not click",
                  ],
                  [
                    "Microsoft / Bing Ads",
                    "$0.80 – $5",
                    "Often 20–30% cheaper than Google",
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
                    <td className="px-4 py-3 text-center text-xs text-gray-500">
                      {row[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-3">
            Average CPC by Industry — Google Ads Benchmarks
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="text-left px-4 py-3 font-semibold">
                    Industry
                  </th>
                  <th className="text-center px-4 py-3 font-semibold">
                    Avg CPC (Google)
                  </th>
                  <th className="text-center px-4 py-3 font-semibold">
                    Why So High/Low
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Legal Services",
                    "$6 – $50+",
                    "High customer lifetime value",
                  ],
                  ["Insurance", "$8 – $40", "Fierce advertiser competition"],
                  [
                    "Finance & Loans",
                    "$5 – $30",
                    "High conversion value per lead",
                  ],
                  ["Real Estate", "$3 – $15", "High transaction values"],
                  ["Healthcare", "$3 – $10", "Regulated but high demand"],
                  [
                    "E-commerce (general)",
                    "$0.50 – $3",
                    "High volume, lower margin",
                  ],
                  ["Education", "$2 – $8", "Competitive for online courses"],
                  ["Travel", "$1 – $5", "Seasonal, moderate competition"],
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
                    <td className="px-4 py-3 text-center text-xs text-gray-500">
                      {row[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── CPC vs CPM ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            CPC vs CPM — Which Should You Use?
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            The choice between CPC and CPM depends on what you're trying to
            achieve with your campaign. Here's a practical breakdown.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-5">
              <h3 className="font-bold text-sky-800 text-sm mb-3">
                Use CPC when you want:
              </h3>
              <ul className="space-y-2 text-xs text-sky-700">
                <li>• Website traffic and page visits</li>
                <li>• Form fills, sign-ups, or leads</li>
                <li>• Product purchases or conversions</li>
                <li>• App installs or downloads</li>
                <li>• Predictable cost per visitor</li>
              </ul>
              <p className="text-sky-600 text-xs mt-3 leading-relaxed">
                CPC is performance-focused. You pay for action, not exposure.
                Better when you can measure the value of each click against a
                conversion goal.
              </p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-xl p-5">
              <h3 className="font-bold text-green-800 text-sm mb-3">
                Use CPM when you want:
              </h3>
              <ul className="space-y-2 text-xs text-green-700">
                <li>• Brand awareness at scale</li>
                <li>• Maximum reach within a budget</li>
                <li>• Retargeting audiences with display ads</li>
                <li>• Video views and brand recall</li>
                <li>• Predictable impression volume</li>
              </ul>
              <p className="text-green-600 text-xs mt-3 leading-relaxed">
                CPM is reach-focused. You pay for eyeballs regardless of what
                they do. Better when your goal is visibility rather than a
                specific trackable action.
              </p>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            Most campaigns use both at different stages. CPM for top-of-funnel
            awareness, CPC for mid and bottom-funnel where you're pushing toward
            a specific action. Use our{" "}
            <Link
              href="/tools/cpm-calculator"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              CPM Calculator
            </Link>{" "}
            alongside this one to compare the cost efficiency of both models for
            your specific campaign.
          </p>
        </section>

        {/* ─── How to Reduce CPC ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How to Reduce Your CPC — What Actually Works
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            High CPC isn't always a platform problem — it's often a campaign
            structure or targeting problem. Here's what genuinely moves the
            number down.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Target size={20} className="text-sky-600" />,
                title: "Improve your Quality Score",
                desc: "On Google Ads, Quality Score is the single biggest lever on CPC. A higher score means lower cost for the same position. It's driven by expected CTR, ad relevance, and landing page experience. Tighten your ad groups so each ad is highly relevant to a small, specific set of keywords.",
              },
              {
                icon: <TrendingUp size={20} className="text-green-600" />,
                title: "Target long-tail keywords",
                desc: "Broad, competitive keywords like 'insurance' cost far more per click than specific phrases like 'car insurance for new drivers in Texas'. Long-tail keywords have lower search volume but much lower CPC and higher conversion intent. A $1.50 CPC on a converting long-tail beats a $20 CPC on a generic term every time.",
              },
              {
                icon: <Zap size={20} className="text-violet-600" />,
                title: "Use negative keywords aggressively",
                desc: "Negative keywords stop your ads from showing for irrelevant searches. If you sell premium software, adding 'free' as a negative keyword prevents clicks from people who will never buy. Fewer wasted clicks means your budget goes further and your average CPC drops.",
              },
              {
                icon: <HelpCircle size={20} className="text-amber-600" />,
                title: "Test ad copy to improve CTR",
                desc: "On Google, ads with higher CTR get rewarded with better Quality Scores and lower CPCs. Write ads that speak directly to the intent behind the search. Use numbers, strong calls to action, and match the language your audience uses. Even a 0.5% CTR improvement can meaningfully reduce your CPC.",
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

        {/* ─── Who Uses This ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses a CPC Calculator?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Anyone running paid traffic — or planning to — needs to calculate
            CPC regularly.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Zap size={20} className="text-sky-600" />,
                title: "PPC Managers & Media Buyers",
                desc: "Before any campaign goes live, PPC managers calculate expected CPC to forecast clicks from the budget. After a campaign runs, they calculate actual CPC to evaluate performance against the target. This calculator handles both in seconds.",
              },
              {
                icon: <TrendingUp size={20} className="text-green-600" />,
                title: "Small Business Owners Running Ads",
                desc: "If you're managing your own Google Ads or Facebook campaigns, knowing your CPC is the difference between scaling a profitable channel and burning budget without realizing it. This tool gives you the number without needing to log into an analytics dashboard.",
              },
              {
                icon: <Code size={20} className="text-violet-600" />,
                title: "Affiliate Marketers",
                desc: "Affiliate marketers need to know their break-even CPC before running paid traffic to an offer. If an offer pays $20 commission at 4% conversion, your maximum profitable CPC is $0.80. This calculator helps you find that ceiling fast.",
              },
              {
                icon: <HelpCircle size={20} className="text-amber-600" />,
                title: "Marketing Students & Learners",
                desc: "CPC is one of the foundational metrics taught in every digital marketing course. This calculator lets you work through CPC calculation examples with real numbers — much more useful than reading the formula in a textbook.",
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

        {/* ─── FAQ ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            CPC Calculator — Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              {
                q: "How do you calculate CPC?",
                a: "The CPC formula is: CPC = Total Campaign Cost ÷ Total Clicks. Divide what you spent on the campaign by the total number of clicks it received. Example: $500 spent and 200 clicks received gives a CPC of $500 ÷ 200 = $2.50 per click. Use the calculator above to get the result instantly without manual math.",
              },
              {
                q: "What does CPC stand for in advertising?",
                a: "CPC stands for Cost Per Click. It's the amount an advertiser pays each time a user clicks on their ad. CPC is the primary pricing model for Google Search Ads, Amazon Sponsored Products, Facebook Ads, and most other pay-per-click (PPC) platforms.",
              },
              {
                q: "What is a good average CPC for Google Ads?",
                a: "A good average CPC depends heavily on your industry. E-commerce typically runs $0.50–$3. Finance and legal keywords can reach $20–$50+. The Google Ads average across all industries is roughly $2–$4 on the Search network. The most useful benchmark isn't the platform average — it's your own break-even CPC based on your conversion rate and average order value.",
              },
              {
                q: "How do I calculate cost per click from impressions and CTR?",
                a: "If you know your impressions, CTR, and total spend, you can calculate CPC this way: first find clicks = Impressions × (CTR ÷ 100), then CPC = Total Cost ÷ Clicks. Example: 50,000 impressions at 2% CTR = 1,000 clicks. $500 spent ÷ 1,000 clicks = $0.50 CPC. Enter impressions in the optional field in this calculator and it handles this automatically.",
              },
              {
                q: "What is the difference between CPC and CPM?",
                a: "CPC (Cost Per Click) means you pay only when someone clicks your ad — you're buying traffic. CPM (Cost Per Mille) means you pay for every 1,000 impressions — you're buying exposure. CPC is better for direct response campaigns where you want a specific action. CPM is better for brand awareness where reach is the goal.",
              },
              {
                q: "How do I convert CPC to CPM?",
                a: "To convert CPC to equivalent CPM, you need your CTR. Formula: CPM = CPC × CTR × 10. Example: $2 CPC with 2% CTR = $2 × 2 × 10 = $40 equivalent CPM. If you enter impressions in the optional field of this calculator, it automatically shows your equivalent CPM alongside your CPC.",
              },
              {
                q: "What is a good CPC for Amazon ads?",
                a: "Amazon Sponsored Products typically run $0.50–$1.50 CPC, though competitive categories like electronics or supplements can reach $3–$5. The key metric on Amazon isn't CPC in isolation — it's ACoS (Advertising Cost of Sale). A $1.50 CPC on a $50 product with 10% conversion means your ACoS is 30%, which may or may not be profitable depending on your margins.",
              },
              {
                q: "Why is my CPC so high?",
                a: "High CPC is usually caused by one of four things: competitive keywords with many advertisers bidding (especially in finance, legal, or insurance), low Quality Score on Google Ads (poor ad relevance or landing page experience), narrow targeting that puts you in expensive audience segments, or simply being in a high-value niche where each customer is worth a lot. Start by checking Quality Score if you're on Google — improving it is usually the fastest way to lower CPC.",
              },
              {
                q: "How do I calculate my maximum CPC?",
                a: "Your maximum profitable CPC = (Average Order Value × Conversion Rate). Example: if your product sells for $100 and 3% of visitors buy, your break-even CPC = $100 × 0.03 = $3.00. Any CPC below $3 is profitable, above $3 is a loss. Subtract your desired profit margin to find your target CPC — if you want 50% margin, your target CPC = $1.50.",
              },
              {
                q: "Is this CPC calculator free?",
                a: "Yes, completely free. No account, no signup, no usage limits. Calculate CPC, total campaign cost, or total clicks as many times as you need. The calculation runs entirely in your browser — your data is never sent to any server.",
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

        {/* ─── Related Tools ─── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related Ad & Marketing Calculators
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/cpm-calculator",
                title: "CPM Calculator",
                desc: "Calculate cost per 1,000 impressions, campaign cost, or total impressions.",
              },
              {
                href: "/tools/ad-revenue-calculator",
                title: "Ad Revenue Calculator",
                desc: "Estimate website ad income across 6 formats with CPM and CPC.",
              },
              {
                href: "/tools/adsense-revenue-calculator",
                title: "AdSense Revenue Calculator",
                desc: "Estimate Google AdSense earnings by niche with real RPM data.",
              },
              {
                href: "/tools/youtube-ad-revenue-calculator",
                title: "YouTube Revenue Calculator",
                desc: "Estimate YouTube ad income by video category and CPM.",
              },
              {
                href: "/tools/percentage-calculator",
                title: "Percentage Calculator",
                desc: "Calculate percentage increases, decreases, and ratios.",
              },
              {
                href: "/tools/profit-margin-calculator",
                title: "Profit Margin Calculator",
                desc: "Calculate profit margin and markup from cost and selling price.",
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
