"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Copy,
  RefreshCw,
  DollarSign,
  Home,
  ChevronDown,
  Download,
  Calculator,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle2,
  Percent,
  Truck,
  Code,
  HelpCircle,
  ArrowRight,
  FileText,
  BarChart3,
} from "lucide-react";
import ResponsiveAd from "../../../components/ResponsiveAd";

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
                eBay Fee Calculator
              </span>
            </li>
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
            eBay Fee Calculator — Calculate eBay Seller Fees & Profit Free
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Find out exactly what eBay takes from your sale and what you
            actually keep. Enter your item price and shipping cost, pick your
            fee percentage, and get your profit breakdown in one click — no
            account needed, completely free.
          </p>
        </div>

        <ResponsiveAd />

        {/* Tool Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Item Price ($)
              </label>
              <input
                type="number"
                placeholder="e.g. 99.99"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Shipping Cost ($)
              </label>
              <input
                type="number"
                placeholder="e.g. 5.99 (optional)"
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              eBay Final Value Fee (%)
            </label>
            <input
              type="number"
              placeholder="Default: 13%"
              value={feePercent}
              onChange={(e) => setFeePercent(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800"
            />
            <p className="text-xs text-gray-500 mt-1">
              13% is the standard for most categories. Check the table below to
              find your exact rate.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={calculateFees}
              disabled={isDisabled}
              className="bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <Calculator size={18} /> Calculate Fees
            </button>
            <button
              onClick={reset}
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

          {result && (
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-5 mb-6">
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div className="bg-white rounded-lg p-3 border border-sky-100 text-center">
                  <p className="text-xs text-gray-500 mb-1">Total Sale</p>
                  <p className="font-bold text-gray-800">
                    ${result.total.toFixed(2)}
                  </p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 border border-red-100 text-center">
                  <p className="text-xs text-red-500 mb-1">eBay Fee</p>
                  <p className="font-bold text-red-600">
                    -${result.fee.toFixed(2)}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 border border-green-100 text-center">
                  <p className="text-xs text-green-500 mb-1">Your Profit</p>
                  <p className="font-bold text-green-600">
                    ${result.profit.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                  <span>
                    Fee: {((result.fee / result.total) * 100).toFixed(1)}%
                  </span>
                  <span>
                    Profit: {((result.profit / result.total) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden flex">
                  <div
                    className="bg-red-400 h-full rounded-l-full transition-all duration-500"
                    style={{ width: `${(result.fee / result.total) * 100}%` }}
                  />
                  <div
                    className="bg-green-400 h-full rounded-r-full transition-all duration-500"
                    style={{
                      width: `${(result.profit / result.total) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={copyResult}
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
        </div>

        {/* Native ad — position unchanged */}
        <script
          async="async"
          data-cfasync="false"
          src="https://pl29796844.effectivecpmnetwork.com/4c385cac6f0784aa3165d3a9e7478f20/invoke.js"
        ></script>
        <div id="container-4c385cac6f0784aa3165d3a9e7478f20"></div>

        {/* ─── What Is eBay Final Value Fee ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What Is the eBay Final Value Fee?
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The final value fee is eBay's main charge for using their platform
            to sell. Every time your item sells, eBay takes a percentage of the
            total transaction amount — and "total" means the item price plus
            whatever you charged for shipping. That last part catches a lot of
            sellers off guard.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            So if you sell a jacket for $80 and charge $10 for shipping, eBay
            calculates their fee on $90 — not just $80. At a 13% rate, that's
            $11.70 going to eBay instead of $10.40 if you'd only factored in the
            item price. Small difference on one sale, but it adds up fast across
            dozens of listings.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The fee percentage itself varies by category. Electronics and
            accessories typically sit around 13–14%. Motors and vehicle parts
            are lower. Collectibles and trading cards have their own tiered
            rates. The calculator above defaults to 13%, which covers the
            majority of everyday categories — but check the table below if
            you're selling something specific.
          </p>
        </section>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How to Calculate eBay Seller Fees
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Three inputs, one click, and you have your exact profit breakdown.
          </p>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Enter your item price",
                desc: "Type in what you're charging for the item itself — not including shipping. This is the number the buyer sees on your listing before shipping is added.",
              },
              {
                step: "2",
                title: "Add your shipping cost",
                desc: "This is optional but important. eBay charges their final value fee on the combined total of item price plus shipping. If you're offering free shipping, leave this at zero — eBay still takes a percentage of whatever the buyer pays.",
              },
              {
                step: "3",
                title: "Set the fee percentage and calculate",
                desc: "The default is 13%, which applies to most categories. If you know your category has a different rate — say you're selling motors parts or trading cards — update this number first. Then click Calculate and you'll instantly see your total sale, eBay's cut, and what lands in your pocket.",
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

        {/* ─── Fee By Category Table ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            eBay Final Value Fees by Category — USA (2025)
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            These are the standard final value fee rates for eBay sellers in the
            United States. Rates shown are for sellers with a basic or no eBay
            Store subscription.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="text-left px-4 py-3 font-semibold">
                    Category
                  </th>
                  <th className="text-center px-4 py-3 font-semibold">
                    Final Value Fee
                  </th>
                  <th className="text-center px-4 py-3 font-semibold">
                    + Per Order Fee
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["👟 Clothing, Shoes & Accessories", "15%", "$0.30"],
                  ["💻 Electronics & Computers", "13.25%", "$0.30"],
                  ["📱 Cell Phones & Smartphones", "13.25%", "$0.30"],
                  ["🏠 Home & Garden", "13.25%", "$0.30"],
                  ["🎮 Video Games & Consoles", "13.25%", "$0.30"],
                  ["📚 Books, Movies & Music", "14.95%", "$0.30"],
                  ["🚗 Motors — Parts & Accessories", "10%", "$0.30"],
                  ["🏆 Sports Trading Cards", "13.25% (up to $1,000)", "$0.30"],
                  ["💎 Jewelry & Watches", "15%", "$0.30"],
                  ["🧸 Toys & Hobbies", "13.25%", "$0.30"],
                  ["🏋️ Sporting Goods", "13.25%", "$0.30"],
                  ["🛠️ Business & Industrial", "11.7%", "$0.30"],
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
                    <td className="px-4 py-3 text-center text-gray-500">
                      {row[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Rates are for eBay.com (USA). International rates differ. Always
            verify current rates at ebay.com/help/selling/fees-credits-invoices.
          </p>
        </section>

        {/* ─── Fee Formula ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            eBay Fee Formula — The Exact Math
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Understanding how eBay calculates fees helps you price smarter from
            the start.
          </p>
          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Step 1 — Total Sale Value
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Total = Item Price + Shipping Cost
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                eBay doesn't separate these — they calculate the fee on
                everything the buyer pays. Selling for $100 with $10 shipping
                means the fee is calculated on $110.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Step 2 — Final Value Fee
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Fee = Total × (Fee % ÷ 100) + $0.30
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Most categories also add a flat $0.30 per order on top of the
                percentage. On a $110 sale at 13%: ($110 × 0.13) + $0.30 =
                $14.30 + $0.30 = $14.60 total fee.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Step 3 — Your Actual Profit
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Profit = Total - Fee
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                From a $110 sale with a $14.60 fee, you keep $95.40. That's
                before PayPal or payment processing fees if applicable, and
                before your cost of goods and packaging.
              </p>
            </div>
          </div>
        </section>

        {/* ─── eBay Fees in USA ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            eBay Seller Fees in the USA — What You're Actually Paying
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            If you're selling on eBay in the United States, there are a few
            different fees to know about. The final value fee is the big one —
            it comes out of every completed sale automatically. But it's not the
            only cost.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            eBay also charges an insertion fee if you exceed your monthly free
            listing limit. Most casual sellers get 250 free listings per month,
            and eBay Store subscribers get significantly more. After that, it's
            $0.35 per listing. For high-volume sellers, this adds up.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            There's also a promoted listings fee if you use eBay's advertising
            product to push your items higher in search results. That's a
            separate percentage you set yourself — anywhere from 2% to 100% of
            the sale price — and it only charges when someone buys through your
            promoted ad. Optional, but worth knowing about.
          </p>
          <p className="text-gray-600 leading-relaxed">
            eBay manages payment processing through eBay Managed Payments, which
            means they handle the money directly. There's no separate PayPal fee
            anymore for most US sellers — the payment processing cost is baked
            into the final value fee structure. This simplifies things
            considerably compared to how eBay used to work a few years ago.
          </p>
        </section>

        {/* ─── Real Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            eBay Fee Calculation Examples — Real Numbers
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Three different scenarios to show how fees change with price,
            shipping, and category.
          </p>
          <div className="space-y-5">
            {[
              {
                label: "Example 1",
                title: "Selling a used smartphone for $200",
                inputs: [
                  ["Item Price", "$200"],
                  ["Shipping", "$0 (free)"],
                  ["Fee Rate", "13.25%"],
                ],
                result: "eBay Fee: $26.80 | You Keep: $173.20",
                note: "Free shipping looks attractive to buyers but eBay still takes their cut on the full $200.",
              },
              {
                label: "Example 2",
                title: "Clothing item — $45 with $6 shipping",
                inputs: [
                  ["Item Price", "$45"],
                  ["Shipping", "$6"],
                  ["Fee Rate", "15%"],
                ],
                result: "Total: $51 | eBay Fee: $7.95 | You Keep: $43.05",
                note: "Clothing is one of the higher fee categories at 15%. The fee applies to the combined $51 total.",
              },
              {
                label: "Example 3",
                title: "Car part — $350 with $25 shipping",
                inputs: [
                  ["Item Price", "$350"],
                  ["Shipping", "$25"],
                  ["Fee Rate", "10%"],
                ],
                result: "Total: $375 | eBay Fee: $37.80 | You Keep: $337.20",
                note: "Motors parts have a lower fee rate which is why many vehicle parts sellers prefer eBay over other platforms.",
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
                <div className="bg-green-50 border border-green-100 rounded-lg p-3 mb-2">
                  <p className="text-xs font-bold text-green-700">
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

        {/* ─── Selling Tips ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            eBay Selling Tips to Maximize Your Profit
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Knowing your fees is half the job. Here's how to use that knowledge
            to actually sell smarter.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Calculator size={20} className="text-sky-600" />,
                title: "Price with fees built in",
                desc: "Before you list, run the numbers here first. Work backwards from the profit you want and set your price accordingly. Most new sellers set a price, get excited about the sale, and then realize they barely broke even.",
              },
              {
                icon: <Truck size={20} className="text-green-600" />,
                title: "Be careful with free shipping",
                desc: "Free shipping attracts buyers, but remember you're paying for it out of the sale amount — and eBay still charges their percentage on the total the buyer pays. If you build shipping into the item price, make sure you've accounted for the higher fee base.",
              },
              {
                icon: <TrendingUp size={20} className="text-violet-600" />,
                title: "Understand your category's fee rate",
                desc: "Selling clothing? You're paying 15%, not 13%. That 2% difference on a $500 month in sales is $10 extra going to eBay. Know your category rate and price accordingly — the table above has the current US rates.",
              },
              {
                icon: <Shield size={20} className="text-amber-600" />,
                title: "Track your costs beyond eBay fees",
                desc: "The calculator shows you what eBay takes. But your real profit also depends on what you paid for the item, packaging materials, and your time. Factor everything in before you decide if a listing is worth it.",
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
            Who Uses an eBay Fee Calculator?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Anyone selling on eBay benefits from knowing their numbers upfront.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Zap size={20} className="text-sky-600" />,
                title: "Resellers & Flippers",
                desc: "Before buying something at a thrift store or garage sale to resell, smart flippers run the numbers to make sure the margin is there after eBay takes their cut.",
              },
              {
                icon: <BarChart3 size={20} className="text-green-600" />,
                title: "Small Business Sellers",
                desc: "Businesses that sell through eBay alongside their own website need accurate fee estimates to forecast monthly net revenue and set pricing across channels.",
              },
              {
                icon: <Code size={20} className="text-violet-600" />,
                title: "Dropshippers",
                desc: "When your margin is already thin because you're working with a supplier, knowing the exact eBay fee on each sale is the difference between profit and loss.",
              },
              {
                icon: <HelpCircle size={20} className="text-amber-600" />,
                title: "Casual Sellers Clearing Clutter",
                desc: "Even if you're just selling old electronics or clothes, it's useful to know if that $40 listing will actually net you $33 or $28 after fees before you bother packaging it up.",
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
            eBay Fee Calculator — Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              {
                q: "How do I calculate eBay seller fees?",
                a: "Enter your item price and shipping cost into the calculator above, set the fee percentage for your category, and click Calculate. The tool shows your total sale amount, eBay's final value fee, and exactly what you keep. The formula is: Fee = (Item Price + Shipping) × Fee Percentage.",
              },
              {
                q: "What is the eBay final value fee?",
                a: "The final value fee is the percentage eBay charges on every completed sale. It's calculated on the total amount the buyer pays — item price plus shipping. Most categories in the US fall between 10% and 15%. eBay also adds a flat $0.30 per order on top of the percentage in most categories.",
              },
              {
                q: "Does eBay charge fees on shipping?",
                a: "Yes. eBay calculates their final value fee on the total transaction amount, which includes both the item price and the shipping charge. If you sell an item for $50 and charge $10 shipping, eBay charges their percentage on $60, not just $50. This catches a lot of new sellers off guard.",
              },
              {
                q: "What percentage does eBay take in the USA?",
                a: "In the US, eBay's final value fee varies by category. Clothing and accessories are charged at 15%. Most electronics, home goods, toys, and general merchandise categories sit at 13.25%. Motors parts are lower at around 10%. There's also a $0.30 per order fee added on top in most categories.",
              },
              {
                q: "How much profit will I make after eBay fees?",
                a: "Use the calculator above for an exact answer — enter your price, shipping, and fee rate. As a rough guide: at 13% fees, selling a $100 item with free shipping leaves you about $87 before your own costs. At 15%, you'd keep about $85. Always calculate before listing, not after.",
              },
              {
                q: "What is the eBay fee for a $100 item?",
                a: "At the standard 13.25% rate, eBay's fee on a $100 item with free shipping is $13.25 plus a $0.30 per-order fee, totaling $13.55. That leaves you with $86.45. If you're in a 15% category like clothing, the fee would be $15.30 and you'd keep $84.70.",
              },
              {
                q: "Is this eBay calculator free to use?",
                a: "Yes, completely free. No account, no signup, no limits. You can calculate eBay fees for as many listings as you want. The calculation runs entirely in your browser — your data never gets sent anywhere.",
              },
              {
                q: "Can I use this calculator for other selling platforms?",
                a: "You can use it for any platform by changing the fee percentage. Mercari charges around 10%, Poshmark takes a flat $2.95 on sales under $15 and 20% above that, and Depop charges 10%. Just update the fee percentage field to match whichever platform you're calculating for.",
              },
              {
                q: "Why is my actual eBay profit lower than what the calculator shows?",
                a: "The calculator shows your profit after eBay's final value fee only. Your real take-home is lower once you account for the cost of the item itself, packaging materials, labels, your time, and any taxes. If you're comparing platforms, also check whether the platform charges additional payment processing fees beyond their final value fee.",
              },
              {
                q: "Does eBay charge fees on items that don't sell?",
                a: "No final value fee is charged unless the item actually sells. However, if you exceed your monthly free listing limit (250 for most sellers without a store), eBay charges $0.35 per additional listing whether it sells or not. eBay Store subscribers get much higher free listing limits that vary by subscription tier.",
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
            Related E-commerce & Finance Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/profit-margin-calculator",
                title: "Profit Margin Calculator",
                desc: "Calculate profit % and markup.",
              },
              {
                href: "/tools/currency-converter",
                title: "Currency Converter",
                desc: "Convert international currencies.",
              },
              {
                href: "/tools/percentage-calculator",
                title: "Percentage Calculator",
                desc: "Calculate increases/decreases.",
              },
              {
                href: "/tools/cpm-calculator",
                title: "CPM Calculator",
                desc: "Calculate ad cost per 1000 views.",
              },
              {
                href: "/tools/cpc-calculator",
                title: "CPC Calculator",
                desc: "Calculate cost per click.",
              },
              {
                href: "/tools/ad-revenue-calculator",
                title: "Ad Revenue Calculator",
                desc: "Estimate website earnings.",
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

export default EbayChargesCalculator;
