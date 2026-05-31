"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  RefreshCw,
  Copy,
  Loader2,
  ArrowLeftRight,
  TrendingUp,
  DollarSign,
  Home,
  ChevronDown,
  Code,
  HelpCircle,
  Zap,
  Shield,
  BarChart3,
  FileText,
  Download,
} from "lucide-react";

const CURRENCIES = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "PKR", name: "Pakistani Rupee", flag: "🇵🇰" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦" },
  { code: "TRY", name: "Turkish Lira", flag: "🇹🇷" },
  { code: "BDT", name: "Bangladeshi Taka", flag: "🇧🇩" },
  { code: "MYR", name: "Malaysian Ringgit", flag: "🇲🇾" },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
  { code: "KWD", name: "Kuwaiti Dinar", flag: "🇰🇼" },
  { code: "QAR", name: "Qatari Riyal", flag: "🇶🇦" },
  { code: "OMR", name: "Omani Rial", flag: "🇴🇲" },
  { code: "BHD", name: "Bahraini Dinar", flag: "🇧🇭" },
];

const QUICK_PAIRS = [
  { from: "USD", to: "PKR", label: "USD → PKR" },
  { from: "AED", to: "PKR", label: "AED → PKR" },
  { from: "SAR", to: "PKR", label: "SAR → PKR" },
  { from: "GBP", to: "PKR", label: "GBP → PKR" },
  { from: "EUR", to: "PKR", label: "EUR → PKR" },
  { from: "CAD", to: "PKR", label: "CAD → PKR" },
];

const QUICK_AMOUNTS = [1, 100, 500, 1000, 5000, 10000];
const COMPARE_CURRENCIES = ["USD", "EUR", "GBP", "AED", "SAR", "CAD"];

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [rate, setRate] = useState(null);
  const [allRates, setAllRates] = useState({});
  const [converted, setConverted] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const countdownRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);

  const fetchRate = useCallback(
    async (silent = false) => {
      if (!silent) setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://open.er-api.com/v6/latest/${fromCurrency}`,
        );
        const data = await res.json();
        if (data.result !== "success") throw new Error("API error");

        setAllRates(data.rates);
        const currentRate =
          fromCurrency === toCurrency ? 1 : data.rates[toCurrency];
        if (!currentRate) throw new Error("Currency not available");

        setRate(currentRate);
        setConverted((parseFloat(amount) || 0) * currentRate);
        setLastUpdated(
          new Date(data.time_last_update_utc).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          }),
        );
        setCountdown(60);
      } catch (err) {
        setError("Unable to fetch latest rates. Please try again.");
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [fromCurrency, toCurrency, amount],
  );

  useEffect(() => {
    fetchRate();
  }, [fromCurrency, toCurrency]);
  useEffect(() => {
    if (rate !== null) setConverted((parseFloat(amount) || 0) * rate);
  }, [amount, rate]);

  useEffect(() => {
    countdownRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          fetchRate(true);
          return 60;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(countdownRef.current);
  }, [fetchRate]);

  const handleAmountChange = (e) => {
    const val = e.target.value;
    if (val === "" || (!isNaN(val) && parseFloat(val) >= 0)) setAmount(val);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  const setQuickPair = (from, to) => {
    setFromCurrency(from);
    setToCurrency(to);
  };

  const copyResult = () => {
    if (converted === null) return;
    const text = `${amount || 0} ${fromCurrency} = ${converted.toFixed(2)} ${toCurrency}\nRate: 1 ${fromCurrency} = ${rate?.toFixed(4)} ${toCurrency}\nUpdated: ${lastUpdated}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const compareTargets = COMPARE_CURRENCIES.filter(
    (c) => c !== fromCurrency,
  ).slice(0, 5);
  const hasCompare = Object.keys(allRates).length > 0;
  const getCurrencyInfo = (code) =>
    CURRENCIES.find((c) => c.code === code) || { flag: "💱", name: code };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 hover:text-green-600 transition-colors"
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
                className="hover:text-green-600 transition-colors"
              >
                All Tools
              </Link>
            </li>
            <li>
              <span className="text-gray-300">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-semibold">
                Currency Converter
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 mb-4">
            <DollarSign className="text-green-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Currency Converter
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Convert USD to PKR, AED to PKR, or any of 170+ currencies instantly.
            Live exchange rates auto-refresh every 60 seconds. No signup, This
            is completely free.
          </p>
        </div>

        {/* Quick Pairs */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {QUICK_PAIRS.map((pair) => (
            <button
              key={pair.label}
              onClick={() => setQuickPair(pair.from, pair.to)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                fromCurrency === pair.from && toCurrency === pair.to
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-600"
              }`}
            >
              {pair.label}
            </button>
          ))}
        </div>

        {/* Tool Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          {/* Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Amount & From
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  min="0"
                  step="any"
                  placeholder="0.00"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-medium"
                />
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white font-medium text-gray-800"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={swapCurrencies}
                disabled={loading}
                className="p-3 bg-gray-100 hover:bg-green-100 hover:text-green-600 rounded-full transition-all mt-6"
                title="Swap currencies"
              >
                <ArrowLeftRight size={22} />
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                To
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white font-medium text-gray-800"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} — {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Amounts */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-xs text-gray-400 self-center mr-1">
              Quick:
            </span>
            {QUICK_AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => setAmount(String(a))}
                className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${amount === String(a) ? "bg-green-600 text-white border-green-600" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-green-400"}`}
              >
                {a.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Result Display */}
          <div className="text-center py-8 bg-green-50 rounded-2xl mb-6">
            {loading ? (
              <div className="flex items-center justify-center gap-3 text-green-600">
                <Loader2 size={24} className="animate-spin" />
                <span className="text-lg">Fetching live rates...</span>
              </div>
            ) : converted !== null ? (
              <div className="space-y-3">
                <p className="text-sm text-green-600 font-medium uppercase tracking-widest">
                  {getCurrencyInfo(fromCurrency).flag} {amount || 0}{" "}
                  {fromCurrency} equals
                </p>
                <div className="text-5xl md:text-6xl font-bold text-green-700 tracking-tight">
                  {converted.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  <span className="text-2xl font-medium text-green-500 ml-2">
                    {toCurrency}
                  </span>
                </div>
                <p className="text-gray-500 text-base">
                  1 {fromCurrency} ={" "}
                  <strong className="text-gray-700">{rate?.toFixed(4)}</strong>{" "}
                  {toCurrency}
                </p>
                {lastUpdated && (
                  <p className="text-xs text-gray-400">
                    Rates updated: {lastUpdated} · Auto-refreshing in{" "}
                    {countdown}s
                  </p>
                )}
                <div className="flex justify-center gap-3 mt-4">
                  <button
                    onClick={copyResult}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-medium transition-colors"
                  >
                    <Copy size={15} /> {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={() => fetchRate()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    <RefreshCw size={15} /> Refresh
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">Enter an amount to see conversion</p>
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Utility Actions */}
          <div className="flex flex-wrap justify-center gap-3 border-t border-gray-100 pt-6">
            <button
              onClick={copyResult}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
            >
              <Copy size={16} /> {copied ? "Copied!" : "Copy Result"}
            </button>
            <button
              onClick={() => fetchRate()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold transition-all"
            >
              <RefreshCw size={16} /> Refresh Rate
            </button>
          </div>
        </div>

        {/* Multi-Currency Comparison */}
        {hasCompare && !loading && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-green-600" />
              <h2 className="text-base font-semibold text-gray-800">
                {amount || 1} {fromCurrency} in other currencies
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {compareTargets.map((code) => {
                const info = getCurrencyInfo(code);
                const r = allRates[code];
                if (!r) return null;
                const val = (parseFloat(amount) || 1) * r;
                return (
                  <button
                    key={code}
                    onClick={() => setToCurrency(code)}
                    className="bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-300 rounded-xl p-3 text-center transition-all"
                  >
                    <div className="text-xl mb-1">{info.flag}</div>
                    <div className="text-sm font-bold text-gray-800">
                      {val.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div className="text-xs text-gray-500">{code}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Convert Currency Online
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Enter your amount",
                desc: "Type the amount you want to convert. Use quick buttons for common values like 100, 1000, or 5000.",
              },
              {
                step: "2",
                title: "Select currencies",
                desc: "Choose 'From' and 'To' currencies. Use quick pair buttons for popular conversions like USD to PKR.",
              },
              {
                step: "3",
                title: "See live result",
                desc: "The tool fetches real-time market rates and shows the exact conversion. Rates auto-refresh every 60 seconds.",
              },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="w-8 h-8 bg-green-100 text-green-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
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
            How Exchange Rates Work
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            It's simple math based on live market data. Here's what happens
            behind the scenes.
          </p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Live Rate Fetching
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                fetch('https://open.er-api.com/v6/latest/USD')
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Connects to global forex markets to get the latest mid-market
                exchange rates for 170+ currencies.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Conversion Formula
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Converted Amount = Input Amount × Exchange Rate
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Multiplies your input by the current rate. Example: 100 USD ×
                278.50 PKR = 27,850 PKR.
              </p>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <h3 className="font-bold text-green-900 text-sm mb-2">
                Auto-Refresh Logic
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl overflow-x-auto">
                setInterval(fetchRate, 60000) // Every 60 seconds
              </div>
            </div>
          </div>
        </section>

        {/* ─── Real Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Popular Conversion Examples
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Real-world scenarios to help you understand the values.
          </p>

          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-lg">
                  Scenario 1
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs text-green-700 font-medium mb-1">
                  Input:
                </p>
                <p className="font-mono text-sm text-gray-800">1 USD to PKR</p>
                <p className="text-xs text-green-600 font-mono break-all mt-2">
                  Output:
                </p>
                <p className="font-mono text-sm text-gray-800 break-all">
                  ~278.50 PKR (varies by market)
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-lg">
                  Scenario 2
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs text-green-700 font-medium mb-1">
                  Input:
                </p>
                <p className="font-mono text-sm text-gray-800">
                  1000 AED to PKR
                </p>
                <p className="text-xs text-green-600 font-mono break-all mt-2">
                  Output:
                </p>
                <p className="font-mono text-sm text-gray-800 break-all">
                  ~75,800 PKR (varies by market)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses Currency Converters?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            It’s not only travelers. Here is how currency conversion helps in
            real-life applications.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Zap size={20} className="text-green-600" />,
                title: "Freelancers & Remote Workers",
                desc: "Accurately convert payments from clients from USD/EUR to local currency.",
              },
              {
                icon: <BarChart3 size={20} className="text-blue-600" />,
                title: "Online Store Owners",
                desc: "List your products in various currencies and compute profit margins.",
              },
              {
                icon: <Code size={20} className="text-violet-600" />,
                title: "Software Developers",
                desc: "Implement currency conversion rates in websites and financial software.",
              },
              {
                icon: <HelpCircle size={20} className="text-amber-600" />,
                title: "Travelers & Expatriates",
                desc: "Determine how much your money can purchase when traveling overseas.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl p-5 hover:border-green-200 transition-colors"
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
            Importance of Live Exchange Rates
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Exchange rates keep changing. An exchange rate that was accurate one
            hour ago may not be so now. The above exchange rate calculator takes
            live exchange rates from global foreign exchange markets to give you
            the current rates.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Whether you want to convert US dollars to Pakistani rupees or find
            out how many PKR you will get for 1000 AED or SAR to PKR, the
            exchange rate calculator updates itself automatically every minute.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Unlike websites that only offer fixed rates, the above calculator
            guarantees that you will always have the most up-to-date exchange
            rates at any given time. Click on the button to convert USD to PKR,
            AED to PKR, and SAR to PKR instantly.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Privacy Notice
          </h3>
          <p className="text-gray-600 leading-relaxed">
            The above exchange rate calculator does its work entirely in your
            browser. No information about your conversions is ever shared with
            any other computer or stored anywhere else other than your device.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need to calculate time differences? Try the{" "}
            <Link
              href="/tools/time-zone-converter"
              className="text-green-600 underline underline-offset-2 hover:text-green-700"
            >
              Time Zone Converter
            </Link>
            . Working with percentages? The{" "}
            <Link
              href="/tools/percentage-calculator"
              className="text-green-600 underline underline-offset-2 hover:text-green-700"
            >
              Percentage Calculator
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
                q: "What is 1 dollar to PKR today live rate?",
                a: "The live 1 USD to PKR rate is shown at the top of this page. It automatically refreshes every 60 seconds to ensure you are seeing the most accurate, real-time market exchange rate.",
              },
              {
                q: "How much is 1000 AED in PKR today?",
                a: "To find out how much 1000 AED is in PKR today, click the 'AED → PKR' quick pair button and type 1000 in the amount box. The exact live conversion will be displayed instantly.",
              },
              {
                q: "How to convert USD to PKR online with live exchange rate?",
                a: "Simply enter the USD amount in our converter, make sure 'From' is set to USD and 'To' is set to PKR. The tool automatically calculates the live conversion using real-time market rates without any manual input needed.",
              },
              {
                q: "Is this AED to PKR conversion calculator free?",
                a: "Yes, 100% free. There are no hidden fees, no sign-ups, and no limits. You can convert AED to PKR, SAR to PKR, or any other currency as many times as you want.",
              },
              {
                q: "How often are exchange rates updated?",
                a: "Rates are fetched from live market data and automatically refresh every 60 seconds on this page. You can also click 'Refresh Rate' manually if needed.",
              },
              {
                q: "Can I use this for business transactions?",
                a: "This tool provides mid-market rates for informational purposes. For actual bank transfers or business transactions, check with your financial institution as they may apply their own spread or fees.",
              },
              {
                q: "Does it work offline?",
                a: "No, an internet connection is required to fetch the latest live exchange rates from global forex markets.",
              },
              {
                q: "Which currencies are supported?",
                a: "We support 170+ major and minor currencies including USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR, PKR, AED, SAR, and many more.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-green-200 transition-colors duration-300"
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
                    className={`text-green-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
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
            Related Finance & Utility Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/time-zone-converter",
                title: "Time Zone Converter",
                desc: "Convert time between cities.",
              },
              {
                href: "/tools/percentage-calculator",
                title: "Percentage Calculator",
                desc: "Calculate increases/decreases.",
              },
              {
                href: "/tools/age-calculator",
                title: "Age Calculator",
                desc: "Calculate exact age in years.",
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
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-green-400 transition-all"
              >
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-green-600 transition-colors">
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

export default CurrencyConverter;
