"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, RefreshCw, Calculator, Home, ChevronDown } from "lucide-react";

const ProfitMarginCalculator = () => {
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [mode, setMode] = useState("margin"); // 'margin' or 'markup'

  const calculateProfit = () => {
    const cost = parseFloat(costPrice);
    const sell = parseFloat(sellingPrice);

    if (!cost || !sell) {
      setError("Please enter both Cost Price and Selling Price");
      setResult(null);
      return;
    }

    if (cost < 0 || sell < 0) {
      setError("Values cannot be negative");
      setResult(null);
      return;
    }

    if (sell < cost) {
      setError("Selling Price should be greater than Cost Price for profit");
      setResult(null);
      return;
    }

    setError("");

    const profitAmount = sell - cost;
    const profitMargin = (profitAmount / sell) * 100;
    const markup = (profitAmount / cost) * 100;
    const breakEvenUnits = cost > 0 ? Math.ceil(cost / profitAmount) : 0;

    setResult({
      costPrice: cost.toFixed(2),
      sellingPrice: sell.toFixed(2),
      profitAmount: profitAmount.toFixed(2),
      profitMargin: profitMargin.toFixed(2),
      markup: markup.toFixed(2),
      breakEvenUnits,
      currency: "$",
    });
  };

  const copyResult = () => {
    if (!result) return;
    const text =
      `Profit Margin Calculator Result:\n` +
      `Cost Price: ${result.currency}${result.costPrice}\n` +
      `Selling Price: ${result.currency}${result.sellingPrice}\n` +
      `Profit Amount: ${result.currency}${result.profitAmount}\n` +
      `Profit Margin: ${result.profitMargin}%\n` +
      `Markup: ${result.markup}%`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setCostPrice("");
    setSellingPrice("");
    setResult(null);
    setError("");
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Breadcrumb ── */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="inline-flex items-center gap-1.5 hover:text-sky-600 transition-colors">
                <Home size={14} /> Home
              </Link>
            </li>
            <li><span className="text-gray-300">/</span></li>
            <li>
              <Link href="/pages/all-tools" className="hover:text-sky-600 transition-colors">All Tools</Link>
            </li>
            <li><span className="text-gray-300">/</span></li>
            <li><span className="text-gray-900 font-semibold">Profit Margin Calculator</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-100 mb-4">
            <Calculator className="text-emerald-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Calculate <span className="text-emerald-600">Profit Margin %</span> & Markup Online Free
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Find your <strong>gross profit margin percentage</strong>, markup %, and exact profit amount instantly. 
            Perfect for <strong>small business owners</strong>, e-commerce sellers, and freelancers.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          {/* Mode Toggle */}
          <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl w-fit mx-auto">
            <button
              onClick={() => setMode("margin")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === "margin" ? "bg-emerald-600 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Profit Margin
            </button>
            <button
              onClick={() => setMode("markup")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === "markup" ? "bg-emerald-600 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Markup %
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Cost Price ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                placeholder="e.g., 50.00"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Selling Price ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                placeholder="e.g., 80.00"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            onClick={calculateProfit}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all text-white font-semibold px-8 py-3 rounded-xl"
          >
            Calculate Profit
          </button>

          {/* Result */}
          {result && (
            <div className="mt-8">
              {/* Main Result Display */}
              <div className="text-center py-8 bg-emerald-50 rounded-2xl mb-6">
                <p className="text-sm font-medium text-emerald-500 uppercase tracking-widest mb-1">
                  {mode === "margin" ? "Your Profit Margin" : "Your Markup Percentage"}
                </p>
                <h2 className="text-6xl font-bold text-emerald-600 mb-2">
                  {mode === "margin" ? result.profitMargin : result.markup}
                  <span className="text-2xl font-medium text-emerald-400 ml-2">%</span>
                </h2>
                <p className="text-gray-500 text-lg">
                  Profit Amount: <strong className="text-gray-700">${result.profitAmount}</strong>
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Cost Price", value: `$${result.costPrice}`, icon: "💰" },
                  { label: "Selling Price", value: `$${result.sellingPrice}`, icon: "🏷️" },
                  { label: "Profit Amount", value: `$${result.profitAmount}`, icon: "📈" },
                  { label: "Profit Margin", value: `${result.profitMargin}%`, icon: "📊" },
                  { label: "Markup %", value: `${result.markup}%`, icon: "🔼" },
                  { label: "Break-Even Units", value: result.breakEvenUnits, icon: "⚖️" },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <p className="text-lg font-bold text-gray-800">{item.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={copyResult}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
                >
                  <Copy size={15} />
                  {copied ? "Copied!" : "Copy Result"}
                </button>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
                >
                  <RefreshCw size={15} />
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── SEO Content 1 ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Profit Margin Calculator by Cost and Selling Price
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Our free <strong>gross profit margin calculator</strong> helps you instantly compute your profit percentage, 
            markup %, and exact profit amount from cost price and selling price. Whether you run an{" "}
            <strong>e-commerce store</strong>, freelance business, or retail shop, this tool gives you accurate 
            financial insights in seconds.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Unlike basic calculators, our tool also shows <strong>break-even analysis</strong>, compares profit margin 
            vs markup, and works with any currency. All calculations happen in your browser —{" "}
            <strong>100% private and free</strong>.
          </p>
        </section>

        {/* ── How to Use ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Calculate Profit Margin Percentage Online
          </h2>
          <ol className="list-decimal list-inside text-gray-600 space-y-3 text-base">
            <li>Enter your <strong>Cost Price</strong> (what you paid for the product).</li>
            <li>Enter your <strong>Selling Price</strong> (what you sell it for).</li>
            <li>Click <strong>"Calculate Profit"</strong> to see results instantly.</li>
            <li>View your <strong>profit margin %</strong>, markup %, and profit amount.</li>
            <li>Use <strong>"Copy Result"</strong> to save or share your calculation.</li>
          </ol>
        </section>

        {/* ── Features ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Profit Margin vs Markup: Key Business Metrics
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: "Profit Margin %",
                desc: "Shows what percentage of your selling price is profit. Formula: ((Selling Price - Cost) / Selling Price) × 100",
              },
              {
                title: "Markup %",
                desc: "Shows how much you increased the cost to get selling price. Formula: ((Selling Price - Cost) / Cost) × 100",
              },
              {
                title: "Break-Even Analysis",
                desc: "Estimates how many units you need to sell at this margin to cover your initial cost investment.",
              },
              {
                title: "Privacy-First & Free",
                desc: "No data leaves your browser. Use this business calculator safely for sensitive pricing strategies.",
              },
            ].map((feature, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Profit Margin Calculator – Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              {
                q: "What is the difference between profit margin and markup?",
                a: "Profit margin is profit as a % of selling price, while markup is profit as a % of cost. Example: $50 cost, $80 sell → Margin = 37.5%, Markup = 60%. Margin is better for profitability analysis.",
              },
              {
                q: "How to calculate profit margin percentage?",
                a: "Use the formula: ((Selling Price - Cost Price) / Selling Price) × 100. Our calculator does this instantly — just enter your cost and selling price.",
              },
              {
                q: "What is a good profit margin for small business?",
                a: "It varies by industry: retail (5-10%), e-commerce (15-20%), SaaS (70-90%). Use this calculator to benchmark your pricing against industry standards.",
              },
              {
                q: "Does this calculator work for all currencies?",
                a: "Yes! Enter values in any currency (USD, EUR, PKR, etc.). The % results are universal, and you can mentally apply your currency symbol to the profit amount.",
              },
              {
                q: "Is my pricing data stored or shared?",
                a: "Never. All calculations happen locally in your browser. Your cost and selling prices are never sent to servers, stored, or tracked.",
              },
            ].map((item, i) => (
              <div key={i} className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-emerald-200 transition-colors duration-300">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={openFaq === i}
                >
                  <h3 className="text-base md:text-lg font-bold text-gray-900 pr-4">{item.q}</h3>
                  <ChevronDown size={22} className={`text-emerald-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="px-5 pb-5 text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related Tools ── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related Free Business Calculators
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/percentage-calculator",
                title: "Percentage Calculator",
                desc: "Calculate percentage increase, decrease, and difference instantly.",
              },
              {
                href: "/tools/break-even-calculator",
                title: "Break-Even Calculator",
                desc: "Find the sales volume needed to cover costs and start making profit.",
              },
              {
                href: "/tools/invoice-generator",
                title: "Invoice Generator",
                desc: "Create professional, customizable invoices for your clients in seconds.",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-emerald-400 transition-all"
              >
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-emerald-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfitMarginCalculator;