'use client'

import { useState } from "react";
import Link from "next/link";
import {
  Copy, RefreshCw, DollarSign, Home, ChevronDown, Download,
  Calculator, TrendingUp, Shield, Zap, CheckCircle2, Percent,
  Truck, Code, HelpCircle, ArrowRight, FileText, BarChart3
} from "lucide-react";

const EbayChargesCalculator = () => {
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState("");
  const [feePercent, setFeePercent] = useState(13);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const calculateFees = () => {
    if (!price) {
      setError("Please enter item price");
      return;
    }

    const total = parseFloat(price) + parseFloat(shipping || 0);
    const fee = (total * feePercent) / 100;
    const profit = total - fee;

    setError("");
    setResult({ total, fee, profit });
  };

  const copyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `Total: $${result.total.toFixed(2)}\neBay Fee: $${result.fee.toFixed(2)}\nProfit: $${result.profit.toFixed(2)}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    const element = document.createElement("a");
    const file = new Blob(
      [
        `eBay Fee Calculation\n\nTotal: $${result.total.toFixed(2)}\neBay Fee: $${result.fee.toFixed(2)}\nProfit: $${result.profit.toFixed(2)}`,
      ],
      { type: "text/plain" },
    );
    element.href = URL.createObjectURL(file);
    element.download = "ebay-fee-calculation.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const reset = () => {
    setPrice("");
    setShipping("");
    setResult(null);
    setError("");
    setCopied(false);
  };

  const isDisabled = !price.trim();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Breadcrumb */}
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
            <li><span className="text-gray-900 font-semibold">eBay Charges Calculator</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <DollarSign className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            eBay Charges Calculator
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Calculate eBay seller fees, final value fee, and profit instantly. Just enter your item price and shipping cost to see exactly what you'll keep.
          </p>
        </div>

        {/* Tool Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          
          {/* Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Item Price ($)</label>
              <input type="number" placeholder="e.g. 99.99" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Shipping Cost ($)</label>
              <input type="number" placeholder="e.g. 5.99 (optional)" value={shipping} onChange={(e) => setShipping(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">eBay Fee Percentage (%)</label>
            <input type="number" placeholder="Default: 13%" value={feePercent} onChange={(e) => setFeePercent(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800" />
            <p className="text-xs text-gray-500 mt-1">Standard is ~13% for most categories. Adjust if your category differs.</p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button onClick={calculateFees} disabled={isDisabled} className="bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">
              <Calculator size={18} /> Calculate Fees
            </button>
            <button onClick={reset} className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
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
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div className="bg-white rounded-lg p-3 border border-sky-100 text-center">
                  <p className="text-xs text-gray-500 mb-1">Total Sale</p>
                  <p className="font-bold text-gray-800">${result.total.toFixed(2)}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 border border-red-100 text-center">
                  <p className="text-xs text-red-500 mb-1">eBay Fee</p>
                  <p className="font-bold text-red-600">-${result.fee.toFixed(2)}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 border border-green-100 text-center">
                  <p className="text-xs text-green-500 mb-1">Your Profit</p>
                  <p className="font-bold text-green-600">${result.profit.toFixed(2)}</p>
                </div>
              </div>
              
              {/* Profit Bar Visual */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                  <span>Fee: {((result.fee / result.total) * 100).toFixed(1)}%</span>
                  <span>Profit: {((result.profit / result.total) * 100).toFixed(1)}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden flex">
                  <div className="bg-red-400 h-full rounded-l-full transition-all duration-500" style={{ width: `${(result.fee / result.total) * 100}%` }} />
                  <div className="bg-green-400 h-full rounded-r-full transition-all duration-500" style={{ width: `${(result.profit / result.total) * 100}%` }} />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={copyResult} className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md">
                  <Copy size={15} /> {copied ? "Copied!" : "Copy"}
                </button>
                <button onClick={handleDownload} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold transition-all">
                  <Download size={15} /> Download
                </button>
              </div>
            </div>
          )}

          {/* Utility Actions */}
          <div className="flex flex-wrap justify-center gap-3 border-t border-gray-100 pt-6">
            <button onClick={copyResult} className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md">
              <Copy size={16} /> {copied ? "Copied!" : "Copy Result"}
            </button>
            <button onClick={handleDownload} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold transition-all">
              <Download size={16} /> Download .txt
            </button>
            <button onClick={reset} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-red-600 rounded-xl text-sm font-semibold transition-all">
              <RefreshCw size={16} /> Clear
            </button>
          </div>
        </div>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Calculate eBay Fees
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Enter your item price",
                desc: "Type in the selling price of your item. This is what the buyer pays for the product itself.",
              },
              {
                step: "2",
                title: "Add shipping cost",
                desc: "Optionally add the shipping charge. Note that eBay fees are calculated on the total sale amount, including shipping.",
              },
              {
                step: "3",
                title: "Hit Calculate",
                desc: "Instantly see total sale, eBay fee, and your actual profit. The visual bar shows the fee vs profit split.",
              },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="w-8 h-8 bg-sky-100 text-sky-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
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

        {/* ─── Formulas / How It Works ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            eBay Fee Formula Explained
          </h2>
          <p className="text-gray-500 text-sm mb-6">It's simple math based on total sale value. Here's exactly what happens.</p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Total Sale Value</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Total = Item Price + Shipping Cost
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">Adds your item price and shipping cost together. Example: $100 + $10 shipping = $110 Total.</p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Final Value Fee</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Fee = Total × (Fee Percentage / 100)
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">Calculates eBay's cut. Example: $110 × 13% = $14.30 Fee.</p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Your Profit</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Profit = Total - Fee
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">Subtracts the fee from total to show what you keep. Example: $110 - $14.30 = $95.70 Profit.</p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">Full Formula</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl overflow-x-auto">
                Profit = (Price + Shipping) - ((Price + Shipping) × Fee%)
              </div>
            </div>
          </div>
        </section>

        {/* ─── Real Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Fee Calculation Examples
          </h2>
          <p className="text-gray-500 text-sm mb-6">Real-world scenarios to help you understand the costs.</p>

          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">Scenario 1</span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs text-green-700 font-medium mb-1">Input:</p>
                <p className="font-mono text-sm text-gray-800">Price: $50, Shipping: $0, Fee: 13%</p>
                <p className="text-xs text-green-600 font-mono break-all mt-2">Output:</p>
                <p className="font-mono text-sm text-gray-800 break-all">Fee: $6.50, Profit: $43.50</p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">Scenario 2</span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs text-green-700 font-medium mb-1">Input:</p>
                <p className="font-mono text-sm text-gray-800">Price: $200, Shipping: $20, Fee: 13%</p>
                <p className="text-xs text-green-600 font-mono break-all mt-2">Output:</p>
                <p className="font-mono text-sm text-gray-800 break-all">Total: $220, Fee: $28.60, Profit: $191.40</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses eBay Fee Calculators?
          </h2>
          <p className="text-gray-500 text-sm mb-6">Not just casual sellers. Here's where accurate fee estimation matters.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Zap size={20} className="text-sky-600" />,
                title: "Resellers & Flippers",
                desc: "Quickly check profit margins before buying inventory to resell on eBay.",
              },
              {
                icon: <BarChart3 size={20} className="text-green-600" />,
                title: "Small Business Owners",
                desc: "Forecast revenue and account for platform fees in monthly budgets.",
              },
              {
                icon: <Code size={20} className="text-violet-600" />,
                title: "Dropshippers",
                desc: "Calculate net profit after eBay fees and supplier costs to ensure viability.",
              },
              {
                icon: <HelpCircle size={20} className="text-amber-600" />,
                title: "Casual Sellers",
                desc: "Understand how much money you'll actually receive from selling old items.",
              },
            ].map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-5 hover:border-sky-200 transition-colors">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SEO Content ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Accurate Fee Calculation Matters
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Many sellers make the mistake of only looking at the item price. But eBay charges fees on the <strong>total sale amount</strong>, which includes shipping. If you ignore this, your profit estimates will be wrong.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The <strong>eBay final value fee</strong> varies by category but typically ranges from 10% to 15%. Our calculator lets you adjust this percentage to match your specific category, giving you a precise profit estimate.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Whether you're selling electronics, clothing, or collectibles, knowing your exact take-home pay helps you price items competitively while maintaining healthy margins.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Privacy Note
          </h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser. Your sales data never leaves your device — no server upload, no logging, no tracking. Close the tab and it's gone. That's how it should be.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need to convert currencies for international sales? Try the{" "}
            <Link href="/tools/currency-converter" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Currency Converter</Link>. Calculating profit margins? The{" "}
            <Link href="/tools/profit-margin-calculator" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Profit Margin Calculator</Link> has your back.
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
                q: "How to calculate eBay fees?",
                a: "Enter item price and shipping cost. The calculator automatically applies the eBay final value fee percentage and shows your profit.",
              },
              {
                q: "What is eBay final value fee?",
                a: "It is the percentage eBay charges on total sale including shipping. Usually around 10–15% depending on category.",
              },
              {
                q: "How to calculate profit after eBay fees?",
                a: "Subtract eBay fee from total sale amount. This tool does it automatically.",
              },
              {
                q: "Does eBay charge fees on shipping?",
                a: "Yes. eBay final value fees are calculated on the total amount of the sale, which includes the item price plus shipping and handling costs.",
              },
              {
                q: "What is the standard eBay fee percentage?",
                a: "For most categories, the final value fee is around 13%. However, it can vary from 10% to 15% depending on what you're selling. Check your specific category for exact rates.",
              },
              {
                q: "Is this calculator free?",
                a: "Yes, 100% free. No signup, no account, no limits. Calculate eBay fees as many times as you need.",
              },
              {
                q: "Can I use this for other marketplaces?",
                a: "While designed for eBay, you can adjust the fee percentage to estimate fees for other platforms like Mercari, Poshmark, or Etsy by entering their specific fee rates.",
              },
              {
                q: "Why is my profit lower than expected?",
                a: "Remember that this calculator only accounts for eBay fees. You may also have costs for packaging, supplies, and taxes that further reduce your net profit.",
              },
            ].map((item, i) => (
              <div key={i} className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-sky-200 transition-colors duration-300">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left" aria-expanded={openFaq === i}>
                  <h3 className="text-sm md:text-base font-bold text-gray-900 pr-4">{item.q}</h3>
                  <ChevronDown size={22} className={`text-sky-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Related Tools (Short Descriptions) ─── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related E-commerce & Finance Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/tools/profit-margin-calculator", title: "Profit Margin Calculator", desc: "Calculate profit % and markup." },
              { href: "/tools/currency-converter", title: "Currency Converter", desc: "Convert international currencies." },
              { href: "/tools/percentage-calculator", title: "Percentage Calculator", desc: "Calculate increases/decreases." },
              { href: "/tools/cpm-calculator", title: "CPM Calculator", desc: "Calculate ad cost per 1000 views." },
              { href: "/tools/cpc-calculator", title: "CPC Calculator", desc: "Calculate cost per click." },
              { href: "/tools/ad-revenue-calculator", title: "Ad Revenue Calculator", desc: "Estimate website earnings." },
            ].map((tool) => (
              <Link key={tool.href} href={tool.href} className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-sky-400 transition-all">
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-sky-600 transition-colors">{tool.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EbayChargesCalculator;