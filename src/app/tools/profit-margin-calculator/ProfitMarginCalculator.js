'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Copy, RefreshCw, Calculator, Home, ChevronDown, Zap,
  BarChart2, Target, Shield, FileText, HelpCircle, AlertCircle
} from 'lucide-react';

// ─── Helper Functions (Outside Component) ─────────────────────────────────────
const validateInput = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0;
};

const calculateMetrics = (cost, sell) => {
  const profit = sell - cost;
  const margin = (profit / sell) * 100;
  const markup = (profit / cost) * 100;
  const breakEven = cost > 0 ? Math.ceil(cost / profit) : 0;
  return { profit, margin, markup, breakEven };
};

// ─── FAQ Data (Sync with page.js JSON-LD) ─────────────────────────────────────
const FAQS = [
  {
    q: 'What is the difference between profit margin and markup?',
    a: 'Profit margin is profit as a % of selling price, while markup is profit as a % of cost. Example: $50 cost, $80 sell → Margin = 37.5%, Markup = 60%. Margin is better for profitability analysis.',
  },
  {
    q: 'How to calculate profit margin percentage?',
    a: 'Use the formula: ((Selling Price - Cost Price) / Selling Price) × 100. Our calculator does this instantly — just enter your cost and selling price.',
  },
  {
    q: 'What is a good profit margin for small business?',
    a: 'It varies by industry: retail (5-10%), e-commerce (15-20%), SaaS (70-90%). Use this calculator to benchmark your pricing against industry standards.',
  },
  {
    q: 'Does this calculator work for all currencies?',
    a: 'Yes! Enter values in any currency (USD, EUR, PKR, etc.). The % results are universal, and you can mentally apply your currency symbol to the profit amount.',
  },
  {
    q: 'Is my pricing data stored or shared?',
    a: 'Never. All calculations happen locally in your browser. Your cost and selling prices are never sent to servers, stored, or tracked.',
  },
  {
    q: 'How to use break-even analysis for pricing decisions?',
    a: 'Break-even units show how many items you need to sell to recover your cost investment. Use this to set minimum sales targets before launching a product or campaign.',
  },
];

// ─── Related Tools (6 Items from your tools array) ────────────────────────────
const RELATED_TOOLS = [
  { href: '/tools/percentage-calculator', title: 'Percentage Calculator', desc: 'Calculate percentage increase, decrease, and difference instantly.' },
  { href: '/tools/cpm-calculator', title: 'CPM Calculator', desc: 'Estimate ad revenue based on impressions and CPM rates.' },
  { href: '/tools/cpc-calculator', title: 'CPC Calculator', desc: 'Calculate cost per click and total ad spend for your campaigns.' },
  { href: '/tools/adsense-revenue-calculator', title: 'AdSense Revenue Calculator', desc: 'Estimate your potential AdSense earnings based on RPM and traffic.' },
  { href: '/tools/youtube-ad-revenue-calculator', title: 'YouTube Ad Revenue Calculator', desc: 'Calculate estimated YouTube earnings from views and CPM.' },
  { href: '/tools/currency-converter', title: 'Currency Converter', desc: 'Convert prices between USD, EUR, PKR, and 150+ currencies.' },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const ProfitMarginCalculator = () => {
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [mode, setMode] = useState('margin');

  const handleCalculate = () => {
    setError('');
    
    if (!costPrice.trim() || !sellingPrice.trim()) {
      setError('Please enter both Cost Price and Selling Price');
      return;
    }

    if (!validateInput(costPrice) || !validateInput(sellingPrice)) {
      setError('Please enter valid positive numbers only');
      return;
    }

    const cost = parseFloat(costPrice);
    const sell = parseFloat(sellingPrice);

    if (sell < cost) {
      setError('Selling Price should be greater than Cost Price for profit');
      return;
    }

    const metrics = calculateMetrics(cost, sell);
    setResult({
      cost: cost.toFixed(2),
      sell: sell.toFixed(2),
      profit: metrics.profit.toFixed(2),
      margin: metrics.margin.toFixed(2),
      markup: metrics.markup.toFixed(2),
      breakEven: metrics.breakEven,
      currency: '$',
    });
    setCopied(false);
  };

  const copyResult = () => {
    if (!result) return;
    const text = 
      `Profit Margin Result\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `Cost Price: ${result.currency}${result.cost}\n` +
      `Selling Price: ${result.currency}${result.sell}\n` +
      `Profit Amount: ${result.currency}${result.profit}\n` +
      `Profit Margin: ${result.margin}%\n` +
      `Markup: ${result.markup}%\n` +
      `Break-Even Units: ${result.breakEven}`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAll = () => {
    setCostPrice('');
    setSellingPrice('');
    setResult(null);
    setError('');
    setCopied(false);
    setMode('margin');
  };

  const displayValue = result ? (mode === 'margin' ? result.margin : result.markup) : null;

  const stats = [
    { icon: BarChart2, label: 'Cost Price', value: `${result?.currency}${result?.cost}`, color: 'text-gray-800' },
    { icon: Target, label: 'Selling Price', value: `${result?.currency}${result?.sell}`, color: 'text-gray-800' },
    { icon: Zap, label: 'Profit Amount', value: `${result?.currency}${result?.profit}`, color: 'text-emerald-600' },
    { icon: Shield, label: mode === 'margin' ? 'Profit Margin' : 'Markup %', value: `${displayValue}%`, color: 'text-emerald-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* ── Breadcrumb ── */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="inline-flex items-center gap-1.5 hover:text-emerald-600 transition-colors">
                <Home size={14} /> Home
              </Link>
            </li>
            <li><span className="text-gray-300">/</span></li>
            <li>
              <Link href="/pages/all-tools" className="hover:text-emerald-600 transition-colors">All Tools</Link>
            </li>
            <li><span className="text-gray-300">/</span></li>
            <li><span className="text-gray-900 font-semibold">Profit Margin Calculator</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        
        {/* ── Hero ── */}
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

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          
          {/* Mode Toggle */}
          <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl w-fit mx-auto">
            <button
              onClick={() => setMode('margin')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === 'margin' ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Profit Margin
            </button>
            <button
              onClick={() => setMode('markup')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === 'markup' ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Markup %
            </button>
          </div>

          {/* Inputs */}
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

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button onClick={handleCalculate} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">
              <Zap size={18} /> Calculate Profit
            </button>
            <button onClick={resetAll} className="bg-white border-2 border-emerald-100 text-emerald-700 hover:bg-emerald-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
              <RefreshCw size={18} /> Reset
            </button>
          </div>

          {/* ── Results Section ── */}
          {result && (
            <div className="mt-8">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                    <div className="flex justify-center text-emerald-500 mb-1"><stat.icon size={20} /></div>
                    <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Main Result Display */}
              <div className="text-center py-8 bg-emerald-50 rounded-2xl mb-6">
                <p className="text-sm font-medium text-emerald-500 uppercase tracking-widest mb-1">
                  {mode === 'margin' ? 'Your Profit Margin' : 'Your Markup Percentage'}
                </p>
                <h2 className="text-6xl font-bold text-emerald-600 mb-2">
                  {displayValue}
                  <span className="text-2xl font-medium text-emerald-400 ml-2">%</span>
                </h2>
                <p className="text-gray-500 text-lg">
                  Profit Amount: <strong className="text-gray-700">{result.currency}{result.profit}</strong>
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-3">
                <button onClick={copyResult} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors">
                  <Copy size={15} />
                  {copied ? 'Copied!' : 'Copy Result'}
                </button>
                <button onClick={resetAll} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors">
                  <RefreshCw size={15} />
                  Reset
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!result && !error && (
            <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mt-4">
              <Calculator size={32} className="mx-auto mb-3 text-gray-300" />
              <p>Enter cost and selling price, then click <strong className="text-gray-500">Calculate Profit</strong></p>
            </div>
          )}
        </div>

        {/* ── How to Use ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Calculate Profit Margin Percentage Online
          </h2>
          <ol className="space-y-5">
            {[
              { step: '1', title: 'Enter Cost Price', desc: 'Type what you paid for the product or service (e.g., $50).' },
              { step: '2', title: 'Enter Selling Price', desc: 'Add the price you sell it for (e.g., $80). Must be higher than cost.' },
              { step: '3', title: 'Click Calculate', desc: 'Hit the button to instantly see margin %, markup %, and profit amount.' },
              { step: '4', title: 'Copy or Reset', desc: 'Use "Copy Result" to save your numbers, or "Reset" to start fresh.' },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── How It Works ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How Profit Margin Calculation Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">Simple math, powerful insights. Here's the logic.</p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <BarChart2 size={16} className="text-emerald-600" />
                Profit Margin Formula
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                ((Selling Price - Cost) / Selling Price) × 100
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Answers: "What % of my revenue is actual profit?" Better for comparing profitability across products or businesses.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Target size={16} className="text-emerald-600" />
                Markup Formula
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                ((Selling Price - Cost) / Cost) × 100
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Answers: "How much did I increase the cost to set my price?" Useful for pricing decisions and supplier negotiations.
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <h3 className="font-bold text-emerald-900 text-sm mb-2 flex items-center gap-2">
                <Shield size={16} className="text-emerald-600" />
                Privacy Note
              </h3>
              <p className="text-emerald-800 text-xs leading-relaxed">
                All calculations happen locally in your browser. No cost or pricing data is sent to any server. 100% private.
              </p>
            </div>
          </div>
        </section>

        {/* ── Sample Results ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Real Example: T-Shirt Business
          </h2>
          <p className="text-gray-500 text-sm mb-6">See how the numbers break down.</p>

          <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Input</p>
                <p className="font-mono text-sm text-gray-800">
                  Cost Price: $12.50<br />
                  Selling Price: $29.99
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Output</p>
                <p className="font-mono text-sm text-gray-800">
                  Profit: $17.49<br />
                  Margin: 58.32%<br />
                  Markup: 139.92%<br />
                  Break-Even: 1 unit
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              With a <strong>58% margin</strong>, this product is healthy. But notice: markup looks huge (140%) — that's why margin is better for real profitability checks.
            </p>
          </div>
        </section>

        {/* ── Use Cases ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses Profit Margin Calculators?
          </h2>
          <p className="text-gray-500 text-sm mb-6">Not just accountants. Here's where smart pricing matters.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Zap size={20} className="text-emerald-600" />, title: 'E-commerce Sellers', desc: 'Price products competitively while ensuring healthy margins on Amazon, Shopify, or Etsy.' },
              { icon: <BarChart2 size={20} className="text-emerald-600" />, title: 'Freelancers', desc: 'Calculate hourly rates by factoring in costs, taxes, and desired profit margin.' },
              { icon: <Target size={20} className="text-emerald-600" />, title: 'Small Retailers', desc: 'Quickly test pricing scenarios before updating store shelves or online listings.' },
              { icon: <HelpCircle size={20} className="text-emerald-600" />, title: 'Startup Founders', desc: 'Validate unit economics early — know if your product can be profitable at scale.' },
            ].map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-5 hover:border-emerald-200 transition-colors">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEO Content ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Profit Margin Matters More Than You Think
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Many new business owners mix up profit margin and markup — and that small confusion can cost big. Our free <strong>profit margin calculator</strong> clears that up instantly. Just enter your cost and selling price, and get both metrics side by side.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Whether you sell physical products, digital services, or run a subscription business, knowing your real margin helps you:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1 text-sm">
            <li>Price products without undercharging</li>
            <li>Spot which items actually make money</li>
            <li>Negotiate better with suppliers using hard numbers</li>
            <li>Plan for taxes, ads, and unexpected costs</li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            Built for speed and privacy — no signup, no tracking, no data leaves your browser. Just clean, accurate math.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">Privacy Note</h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No pricing data is uploaded to any server. No data is stored or tracked. Your numbers stay on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need more business tools? Try the{' '}
            <Link href="/tools/cpm-calculator" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">CPM Calculator</Link> for ad revenue estimates, or the{' '}
            <Link href="/tools/percentage-calculator" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">Percentage Calculator</Link> for quick math.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {FAQS.map((item, i) => (
              <div key={i} className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-emerald-200 transition-colors duration-300">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={openFaq === i}
                >
                  <h3 className="text-sm md:text-base font-bold text-gray-900 pr-4">{item.q}</h3>
                  <ChevronDown size={22} className={`text-emerald-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{item.a}</p>
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
            {RELATED_TOOLS.map((tool) => (
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