'use client'

import { useState } from "react";
import Link from "next/link";
import {
  Copy, RefreshCw, Download, Percent, Home, ChevronDown,
  Hash, Type, Layers, Calculator, Tag, Receipt, TrendingUp, FileText,
  Shield, Zap, Globe, HelpCircle
} from "lucide-react";

// ─── Tab config ───────────────────────────────────────────────────────────────
const TABS = [
  { id: "percentOf",   label: "X% of Y",         icon: "%" },
  { id: "isWhat",      label: "X is what % of Y", icon: "?" },
  { id: "change",      label: "% Change",         icon: "↑↓" },
  { id: "addSubtract", label: "Add / Subtract %", icon: "+−" },
  { id: "reverse",     label: "Reverse %",        icon: "⟵" },
  { id: "discount",    label: "Discount",         icon: "🏷" },
  { id: "tax",         label: "Tax / VAT",        icon: "📋" },
];

// ─── Round to avoid floating-point artifacts ──────────────────────────────────
const r = (n, decimals = 2) => {
  if (!isFinite(n)) return null;
  return Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

const fmt = (n) => {
  if (n === null || n === undefined) return "—";
  return Number.isInteger(n) ? n.toLocaleString() : n.toLocaleString(undefined, { maximumFractionDigits: 4 });
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PercentageCalculator() {
  const [activeTab, setActiveTab] = useState("percentOf");
  const [history,   setHistory]   = useState([]);
  const [copied,    setCopied]    = useState(false);
  const [openFaq,   setOpenFaq]   = useState(null);

  // Per-tab state
  const [po, setPo]     = useState({ pct: "", num: "" });
  const [iw, setIw]     = useState({ part: "", whole: "" });
  const [pc, setPc]     = useState({ old: "", nw: "" });
  const [as_, setAs]    = useState({ val: "", pct: "", op: "add" });
  const [rv, setRv]     = useState({ final: "", pct: "" });
  const [dc, setDc]     = useState({ price: "", pct: "" });
  const [tx, setTx]     = useState({ price: "", pct: "" });

  // ── Calculators ─────────────────────────────────────────────────────────────
  const calc = {
    percentOf: () => {
      const p = parseFloat(po.pct), n = parseFloat(po.num);
      if (isNaN(p) || isNaN(n)) return null;
      return r(p / 100 * n);
    },
    isWhat: () => {
      const part = parseFloat(iw.part), whole = parseFloat(iw.whole);
      if (isNaN(part) || isNaN(whole) || whole === 0) return null;
      return r((part / whole) * 100);
    },
    change: () => {
      const o = parseFloat(pc.old), n = parseFloat(pc.nw);
      if (isNaN(o) || isNaN(n) || o === 0) return null;
      return r(((n - o) / Math.abs(o)) * 100);
    },
    addSubtract: () => {
      const v = parseFloat(as_.val), p = parseFloat(as_.pct);
      if (isNaN(v) || isNaN(p)) return null;
      return as_.op === "add" ? r(v * (1 + p / 100)) : r(v * (1 - p / 100));
    },
    reverse: () => {
      const f = parseFloat(rv.final), p = parseFloat(rv.pct);
      if (isNaN(f) || isNaN(p)) return null;
      return r(f / (1 + p / 100));
    },
    discount: () => {
      const price = parseFloat(dc.price), pct = parseFloat(dc.pct);
      if (isNaN(price) || isNaN(pct)) return null;
      const saved = r(price * pct / 100);
      const final_ = r(price - saved);
      return { saved, final: final_ };
    },
    tax: () => {
      const price = parseFloat(tx.price), pct = parseFloat(tx.pct);
      if (isNaN(price) || isNaN(pct)) return null;
      const taxAmt = r(price * pct / 100);
      const total = r(price + taxAmt);
      return { taxAmt, total };
    },
  };

  // ── Result + equation strings ────────────────────────────────────────────────
  const getResult = () => {
    switch (activeTab) {
      case "percentOf":   return { value: calc.percentOf(),   eq: `${po.pct}% of ${po.num} = ${fmt(calc.percentOf())}`,       unit: ""   };
      case "isWhat":      return { value: calc.isWhat(),      eq: `${iw.part} is ${fmt(calc.isWhat())}% of ${iw.whole}`,      unit: "%"  };
      case "change": {
        const v = calc.change();
        return { value: v, eq: `From ${pc.old} to ${pc.nw} = ${v !== null ? (v >= 0 ? "+" : "") + fmt(v) + "%" : "—"}`, unit: "%", signed: true };
      }
      case "addSubtract": return { value: calc.addSubtract(), eq: `${as_.val} ${as_.op === "add" ? "+" : "−"} ${as_.pct}% = ${fmt(calc.addSubtract())}`, unit: "" };
      case "reverse":     return { value: calc.reverse(),     eq: `Original of ${rv.final} after ${rv.pct}% change = ${fmt(calc.reverse())}`, unit: "" };
      case "discount": {
        const d = calc.discount();
        return { value: d, eq: d ? `${dc.price} − ${dc.pct}% = ${fmt(d.final)} (saved ${fmt(d.saved)})` : null, unit: "", multi: true };
      }
      case "tax": {
        const t = calc.tax();
        return { value: t, eq: t ? `${tx.price} + ${tx.pct}% tax = ${fmt(t.total)} (tax: ${fmt(t.taxAmt)})` : null, unit: "", multi: true };
      }
      default: return { value: null, eq: null };
    }
  };

  const { value, eq, unit, signed, multi } = getResult();
  const hasResult = value !== null && value !== undefined;

  const resultStr = () => {
    if (!hasResult) return null;
    if (multi) {
      if (activeTab === "discount") return `Sale price: ${fmt(value.final)} (saved ${fmt(value.saved)})`;
      if (activeTab === "tax")      return `Total: ${fmt(value.total)} (tax: ${fmt(value.taxAmt)})`;
    }
    return `${signed && value >= 0 ? "+" : ""}${fmt(value)}${unit}`;
  };

  const getStats = () => {
    const tabLabels = {
      percentOf: "X% of Y", isWhat: "X is what % of Y", change: "% Change",
      addSubtract: "Add / Subtract %", reverse: "Reverse %", discount: "Discount", tax: "Tax / VAT"
    };

    if (!hasResult) return [];

    if (multi && activeTab === "discount") {
      return [
        { icon: Tag,        value: fmt(dc.price),       label: "Original Price" },
        { icon: Percent,    value: `${dc.pct}%`,        label: "Discount" },
        { icon: TrendingUp, value: fmt(value.final),    label: "Sale Price", color: "text-sky-600" },
        { icon: Receipt,    value: fmt(value.saved),    label: "You Save", color: "text-green-600" },
      ];
    }
    if (multi && activeTab === "tax") {
      return [
        { icon: Receipt,    value: fmt(tx.price),       label: "Base Price" },
        { icon: Percent,    value: `${tx.pct}%`,        label: "Tax Rate" },
        { icon: TrendingUp, value: fmt(value.taxAmt),   label: "Tax Amount", color: "text-orange-500" },
        { icon: Calculator, value: fmt(value.total),    label: "Total", color: "text-sky-600" },
      ];
    }

    const displayVal = `${signed && value >= 0 ? "+" : ""}${fmt(value)}${unit}`;
    const colorClass = activeTab === "change" ? (value < 0 ? "text-red-500" : "text-green-600") : "text-sky-600";

    return [
      { icon: Calculator, value: tabLabels[activeTab], label: "Calculation Type" },
      { icon: Type,       value: displayVal,           label: "Result", color: colorClass },
      { icon: Hash,       value: unit || "Number",     label: "Unit" },
      { icon: Layers,     value: "2 inputs",           label: "Values Used" },
    ];
  };

  const stats = getStats();

  const copyText = () => {
    const str = resultStr();
    if (!str) return;
    navigator.clipboard.writeText(str);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (eq) setHistory((prev) => [eq, ...prev].slice(0, 6));
  };

  const downloadText = () => {
    const str = resultStr();
    if (!str) return;
    const content = `${eq}\n${str}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `percentage-calc-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetAll = () => {
    setPo({ pct: "", num: "" }); setIw({ part: "", whole: "" });
    setPc({ old: "", nw: "" }); setAs({ val: "", pct: "", op: "add" });
    setRv({ final: "", pct: "" }); setDc({ price: "", pct: "" });
    setTx({ price: "", pct: "" }); setCopied(false);
  };

  const FORMULAS = {
    percentOf:   "Result = (Percentage ÷ 100) × Number",
    isWhat:      "Result = (Part ÷ Whole) × 100",
    change:      "Change % = ((New − Old) ÷ |Old|) × 100",
    addSubtract: "Add: Value × (1 + % ÷ 100)  |  Subtract: Value × (1 − % ÷ 100)",
    reverse:     "Original = Final Value ÷ (1 + % ÷ 100)",
    discount:    "Sale Price = Price − (Price × Discount% ÷ 100)",
    tax:         "Total = Price + (Price × Tax% ÷ 100)",
  };

  const inputCls = "w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800";
  const labelCls = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ── Breadcrumb ── */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="inline-flex items-center gap-1.5 hover:text-sky-600 transition-colors"><Home size={14} /> Home</Link></li>
            <li><span className="text-gray-300">/</span></li>
            <li><Link href="/pages/all-tools" className="hover:text-sky-600 transition-colors">All Tools</Link></li>
            <li><span className="text-gray-300">/</span></li>
            <li><span className="text-gray-900 font-semibold">Percentage Calculator</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">

        {/* ── Hero ── */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <Percent className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Calculate Percentage of a Number Online Free –{" "}
            <span className="text-sky-600">Discount, Tax, Reverse % Calculator</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            7-in-1 percentage calculator with real-time results. Discount, tax/VAT, % change, reverse percentage, and more.
          </p>
        </div>

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? "bg-sky-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-600"}`}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Formula hint */}
          <div className="bg-sky-50 border border-sky-100 rounded-xl px-4 py-2.5 mb-6 text-xs text-sky-700 font-mono">
            📐 {FORMULAS[activeTab]}
          </div>

          {/* ── Tab Inputs ── */}
          {activeTab === "percentOf" && (
            <div className="grid sm:grid-cols-2 gap-5 mb-6">
              <div><label className={labelCls}>Percentage (%)</label><input type="number" value={po.pct} onChange={(e) => setPo({ ...po, pct: e.target.value })} placeholder="e.g. 20" className={inputCls} /></div>
              <div><label className={labelCls}>Of Number</label><input type="number" value={po.num} onChange={(e) => setPo({ ...po, num: e.target.value })} placeholder="e.g. 500" className={inputCls} /></div>
            </div>
          )}

          {activeTab === "isWhat" && (
            <div className="grid sm:grid-cols-2 gap-5 mb-6">
              <div><label className={labelCls}>Part (X)</label><input type="number" value={iw.part} onChange={(e) => setIw({ ...iw, part: e.target.value })} placeholder="e.g. 75" className={inputCls} /></div>
              <div><label className={labelCls}>Whole (Y)</label><input type="number" value={iw.whole} onChange={(e) => setIw({ ...iw, whole: e.target.value })} placeholder="e.g. 300" className={inputCls} /></div>
            </div>
          )}

          {activeTab === "change" && (
            <div className="grid sm:grid-cols-2 gap-5 mb-6">
              <div><label className={labelCls}>Original / Old Value</label><input type="number" value={pc.old} onChange={(e) => setPc({ ...pc, old: e.target.value })} placeholder="e.g. 200" className={inputCls} /></div>
              <div><label className={labelCls}>New Value</label><input type="number" value={pc.nw} onChange={(e) => setPc({ ...pc, nw: e.target.value })} placeholder="e.g. 250" className={inputCls} /></div>
            </div>
          )}

          {activeTab === "addSubtract" && (
            <div className="grid sm:grid-cols-3 gap-5 mb-6">
              <div><label className={labelCls}>Original Value</label><input type="number" value={as_.val} onChange={(e) => setAs({ ...as_, val: e.target.value })} placeholder="e.g. 1000" className={inputCls} /></div>
              <div><label className={labelCls}>Percentage (%)</label><input type="number" value={as_.pct} onChange={(e) => setAs({ ...as_, pct: e.target.value })} placeholder="e.g. 15" className={inputCls} /></div>
              <div><label className={labelCls}>Operation</label><select value={as_.op} onChange={(e) => setAs({ ...as_, op: e.target.value })} className={inputCls}><option value="add">Add (+%)</option><option value="subtract">Subtract (−%)</option></select></div>
            </div>
          )}

          {activeTab === "reverse" && (
            <div className="grid sm:grid-cols-2 gap-5 mb-6">
              <div><label className={labelCls}>Final Value (after % change)</label><input type="number" value={rv.final} onChange={(e) => setRv({ ...rv, final: e.target.value })} placeholder="e.g. 120" className={inputCls} /></div>
              <div><label className={labelCls}>% Change Applied</label><input type="number" value={rv.pct} onChange={(e) => setRv({ ...rv, pct: e.target.value })} placeholder="e.g. 20" className={inputCls} /></div>
            </div>
          )}

          {activeTab === "discount" && (
            <div className="grid sm:grid-cols-2 gap-5 mb-6">
              <div><label className={labelCls}>Original Price</label><input type="number" value={dc.price} onChange={(e) => setDc({ ...dc, price: e.target.value })} placeholder="e.g. 2500" className={inputCls} /></div>
              <div><label className={labelCls}>Discount (%)</label><input type="number" value={dc.pct} onChange={(e) => setDc({ ...dc, pct: e.target.value })} placeholder="e.g. 30" className={inputCls} /></div>
            </div>
          )}

          {activeTab === "tax" && (
            <div className="grid sm:grid-cols-2 gap-5 mb-6">
              <div><label className={labelCls}>Price (before tax)</label><input type="number" value={tx.price} onChange={(e) => setTx({ ...tx, price: e.target.value })} placeholder="e.g. 5000" className={inputCls} /></div>
              <div><label className={labelCls}>Tax / VAT Rate (%)</label><input type="number" value={tx.pct} onChange={(e) => setTx({ ...tx, pct: e.target.value })} placeholder="e.g. 17" className={inputCls} /></div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
             <button onClick={resetAll} className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 col-span-2 sm:col-span-1">
              <RefreshCw size={18} /> Reset All
            </button>
             {/* Placeholder for symmetry or future 'Calculate' if needed, but this tool is real-time */}
             <div className="hidden sm:block"></div>
          </div>

          {/* ── Result Section ── */}
          {hasResult && (
            <div className="mt-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                    <div className="flex justify-center text-sky-500 mb-1"><stat.icon size={20} /></div>
                    <p className={`text-lg font-bold ${stat.color || "text-gray-800"}`}>{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Dark Output Block */}
              <div className="bg-gray-900 rounded-2xl p-6 mb-6 overflow-x-auto">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-semibold">Calculation Result</p>
                {multi && activeTab === "discount" && value && (
                  <div className="grid grid-cols-2 gap-6">
                    <div><p className="text-xs text-gray-500 mb-1">Sale Price</p><pre className="text-3xl font-bold text-sky-400 font-mono">{fmt(value.final)}</pre></div>
                    <div><p className="text-xs text-gray-500 mb-1">You Save</p><pre className="text-3xl font-bold text-green-400 font-mono">{fmt(value.saved)}</pre></div>
                  </div>
                )}
                {multi && activeTab === "tax" && value && (
                  <div className="grid grid-cols-2 gap-6">
                    <div><p className="text-xs text-gray-500 mb-1">Tax Amount</p><pre className="text-3xl font-bold text-orange-400 font-mono">{fmt(value.taxAmt)}</pre></div>
                    <div><p className="text-xs text-gray-500 mb-1">Total (incl. tax)</p><pre className="text-3xl font-bold text-sky-400 font-mono">{fmt(value.total)}</pre></div>
                  </div>
                )}
                {!multi && (
                  <pre className={`text-4xl md:text-5xl font-bold font-mono ${activeTab === "change" && value < 0 ? "text-red-400" : activeTab === "change" && value >= 0 ? "text-green-400" : "text-sky-400"}`}>
                    {signed && value >= 0 ? "+" : ""}{fmt(value)}{unit}
                  </pre>
                )}
                {eq && <p className="text-sm text-gray-500 font-mono mt-4 border-t border-gray-800 pt-4">{eq}</p>}
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-3">
                <button onClick={copyText} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors">
                  <Copy size={15} /> {copied ? "Copied!" : "Copy Result"}
                </button>
                <button onClick={downloadText} className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-medium transition-colors">
                  <Download size={15} /> Download .txt
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!hasResult && (
            <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mt-4">
              <Percent size={32} className="mx-auto mb-3 text-gray-300" />
              <p>Enter values above to <strong className="text-gray-500">see the result instantly</strong></p>
            </div>
          )}
        </div>

        {/* ─── History Section ─── */}
        {history.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-8">
            <p className="text-sm font-semibold text-gray-700 mb-3">Recent Calculations</p>
            <div className="space-y-2">
              {history.map((entry, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-2">
                  <span className="text-sm font-mono text-gray-600 truncate flex-1">{entry}</span>
                  <button onClick={() => navigator.clipboard.writeText(entry)} className="ml-3 text-gray-400 hover:text-sky-500 flex-shrink-0 transition-colors">
                    <Copy size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Calculate Percentages in 3 Simple Steps</h2>
          <ol className="space-y-5">
            {[
              { step: "1", title: "Select Calculation Type", desc: "Choose from 7 modes: X% of Y, % Change, Discount, Tax/VAT, etc. The formula appears below the tabs for reference." },
              { step: "2", title: "Enter Your Numbers", desc: "Type your values into the input fields. Results update instantly in real-time — no need to click a calculate button." },
              { step: "3", title: "Copy or Download", desc: "Review the stats grid and result. Copy to clipboard or download the full calculation as a .txt file for your records." },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="w-8 h-8 bg-sky-100 text-sky-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">{item.step}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ─── How It Works ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How Real-Time Percentage Calculation Works</h2>
          <p className="text-gray-500 text-sm mb-6">No server upload. No waiting. Everything happens on your device.</p>
          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Smart Rounding Engine</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Math.round(n * 10^decimals) / 10^decimals
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">We use custom rounding logic to avoid floating-point artifacts like 0.1 + 0.2 = 0.30000000004. Results are precise up to 4 decimal places, ensuring accurate financial calculations.</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Real-Time Reactivity</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                useState → onChange → instant recalculation
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">Every keystroke triggers an immediate recalculation using React state. There's no delay, no loading spinner, and no 'Calculate' button needed. Your results appear as you type.</p>
            </div>
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">Privacy First</h3>
              <p className="text-sky-800 text-xs leading-relaxed">All calculations happen locally in your browser using JavaScript. No data is uploaded, stored, or sent anywhere. Close the tab and your calculations are gone. 100% private by design.</p>
            </div>
          </div>
        </section>

        {/* ─── Sample Results ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What Kind of Calculations Can You Perform?</h2>
          <p className="text-gray-500 text-sm mb-6">Real examples with different modes and scenarios.</p>
          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-lg">Discount Calculation</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Input</p><p className="font-semibold text-gray-800">Rs. 2500, 30% off</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Result</p><p className="font-semibold text-green-600">Save Rs. 750</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Best For</p><p className="font-semibold text-gray-800">Shopping, sales</p></div>
              </div>
            </div>
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded-lg">Tax/VAT Calculation</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Input</p><p className="font-semibold text-gray-800">Rs. 5000, 17% GST</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Result</p><p className="font-semibold text-blue-600">Total Rs. 5850</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Best For</p><p className="font-semibold text-gray-800">Invoicing, accounting</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Who Uses This Percentage Calculator?</h2>
          <p className="text-gray-500 text-sm mb-6">From shoppers to accountants — accurate percentages matter.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Zap size={20} className="text-sky-600" />, title: "Shoppers & Consumers", desc: "Quickly calculate discounts, sale prices, and savings while shopping online or in-store. Know exactly how much you're saving." },
              { icon: <Receipt size={20} className="text-green-600" />, title: "Business Owners", desc: "Calculate tax, VAT, GST, and profit margins instantly. Add or subtract percentages from invoices and quotes without errors." },
              { icon: <TrendingUp size={20} className="text-amber-600" />, title: "Students & Teachers", desc: "Learn percentage concepts with visual formulas. Solve homework problems involving % change, reverse percentages, and ratios." },
              { icon: <Shield size={20} className="text-violet-600" />, title: "Privacy-Conscious Users", desc: "Perform sensitive financial calculations without uploading data to third-party servers. Everything stays on your device." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Calculate Percentages in Your Browser?</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Most online percentage calculators ask you to paste numbers into a web form that sends your request to their servers. That means waiting for responses, worrying about privacy, and sometimes dealing with ads or limits. Our free percentage calculator works differently — everything happens <strong>inside your browser</strong> using pure JavaScript.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Whether you're calculating a <strong>discount while shopping</strong>, adding <strong>GST or VAT to an invoice</strong>, figuring out <strong>percentage increase</strong> for your business revenue, or finding the <strong>original price</strong> after a markup — this tool handles it all with precision up to 4 decimal places.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The smart rounding engine avoids floating-point artifacts common in other calculators. Real-time results mean no clicking 'Calculate' — just type and see the answer. Copy to clipboard or download as .txt for your records.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">Privacy Note</h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No calculations are uploaded to any server. No data is stored or tracked. Your numbers stay on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need to convert currencies? Try the{" "}
            <Link href="/tools/currency-converter" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Currency Converter</Link>. 
            Want to calculate age? The{" "}
            <Link href="/tools/age-calculator" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Age Calculator</Link> has you covered.
          </p>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              { q: "How to calculate percentage of a number online free?", a: "Select the 'X% of Y' tab, enter the percentage and the number. The result appears instantly. For example, 20% of 500 = 100. No signup or download needed." },
              { q: "How to calculate percentage increase or decrease between two numbers?", a: "Use the '% Change' tab. Enter the original value and the new value. The calculator shows the percentage change with a positive (increase) or negative (decrease) sign. Formula: ((New − Old) ÷ |Old|) × 100." },
              { q: "How to calculate discount percentage and sale price?", a: "Use the 'Discount' tab. Enter the original price and discount percentage. The calculator shows both the sale price and the amount you save. For example, 30% off Rs. 2500 = Rs. 1750 (save Rs. 750)." },
              { q: "What is reverse percentage and how to calculate it?", a: "Reverse percentage finds the original value before a percentage change. Formula: Original = Final ÷ (1 + % ÷ 100). Example: If a price is 120 after a 20% increase, the original was 100. Use the 'Reverse %' tab." },
              { q: "How to add GST or VAT to a price using percentage calculator?", a: "Use the 'Tax / VAT' tab. Enter the base price and the tax rate. The calculator shows the tax amount and the total price including tax. For example, 17% GST on Rs. 5000 = Rs. 850 tax, total Rs. 5850." },
              { q: "Does this tool work offline?", a: "Yes. Once the page loads, all calculations happen locally in your browser. You can use it without an internet connection after the initial load." },
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

        {/* ─── Related Tools ─── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Calculator & Utility Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/tools/age-calculator", title: "Age Calculator", desc: "Calculate exact age in years, months and days from your date of birth." },
              { href: "/tools/currency-converter", title: "Currency Converter", desc: "Convert between currencies with live real-time exchange rates." },
              { href: "/tools/time-zone-converter", title: "Time Zone Converter", desc: "Convert time across different time zones instantly for scheduling." },
              { href: "/tools/emoji-picker", title: "Emoji Picker", desc: "Search & copy emojis for captions and messages." },
              { href: "/tools/word-counter", title: "Word Counter", desc: "Count characters for bios, tweets, and meta descriptions." },
              { href: "/tools/qr-code-generator", title: "QR Code Generator", desc: "Create custom QR codes for links, text, or contact info." },
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
}