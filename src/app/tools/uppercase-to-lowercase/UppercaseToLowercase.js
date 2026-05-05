'use client'

import { useState } from "react";
import Link from "next/link";
import {
  Copy, RefreshCw, Download, Shuffle, Home, ChevronDown,
  ArrowDown, ArrowUp, Type, Hash, Layers, FileText
} from "lucide-react";

// ─── Component ────────────────────────────────────────────────────────────────
const UppercaseToLowercase = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [activeAction, setActiveAction] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // ── Actions ─────────────────────────────────────────────────────────────────
  const toLowerCase = () => {
    setOutputText(inputText.toLowerCase());
    setActiveAction("lowercase");
  };

  const toUpperCase = () => {
    setOutputText(inputText.toUpperCase());
    setActiveAction("uppercase");
  };

  const toToggleCase = () => {
    const toggled = inputText
      .split("")
      .map((char) => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
      .join("");
    setOutputText(toggled);
    setActiveAction("toggle");
  };

  const copyText = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `converted-case-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setInputText("");
    setOutputText("");
    setActiveAction("");
    setCopied(false);
  };

  // ── Stats ───────────────────────────────────────────────────────────────────
  const inputWords = inputText.trim() === "" ? 0 : inputText.trim().split(/\s+/).length;
  const inputChars = inputText.length;
  const outputWords = outputText.trim() === "" ? 0 : outputText.trim().split(/\s+/).length;
  const outputChars = outputText.length;
  const hasResult = outputText.length > 0;

  const stats = hasResult
    ? [
        { icon: Type, value: inputWords, label: "Input Words" },
        { icon: Hash, value: inputChars, label: "Input Characters" },
        { icon: Layers, value: outputWords, label: "Output Words", color: "text-sky-600" },
        { icon: FileText, value: outputChars, label: "Output Characters", color: "text-sky-600" },
      ]
    : [];

  const actionLabels = {
    "lowercase": "Converted to Lowercase",
    "uppercase": "Converted to Uppercase",
    "toggle": "Case Swapped (Toggle)",
  };

  const inputCls = "w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800";
  const labelCls = "block text-sm font-semibold text-gray-700 mb-2";

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
            <li><span className="text-gray-900 font-semibold">Uppercase to Lowercase</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">

        {/* ── Hero ── */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <Shuffle className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Convert Uppercase to Lowercase Text Online Free –{" "}
            <span className="text-sky-600">Fix Caps Lock Instantly</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Change text to lowercase, uppercase, or swap case of every letter. The fastest way to fix caps lock mistakes.
          </p>
        </div>

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">

          {/* Input */}
          <div className="mb-6">
            <label className={labelCls}>Enter Text</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 resize-none font-mono text-sm"
              placeholder="Type or paste text here to convert..."
            />
            <p className="text-xs text-gray-400 mt-1">
              {inputWords} word{inputWords !== 1 ? "s" : ""} · {inputChars} character{inputChars !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button
              onClick={toLowerCase}
              disabled={!inputText.trim()}
              className="bg-sky-600 hover:bg-sky-700 active:scale-95 disabled:opacity-40 transition-all text-white font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm"
            >
              <ArrowDown size={16} /> Lowercase
            </button>
            <button
              onClick={toUpperCase}
              disabled={!inputText.trim()}
              className="bg-white border-2 border-sky-100 hover:bg-sky-50 disabled:opacity-40 text-sky-700 font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
            >
              <ArrowUp size={16} /> Uppercase
            </button>
            <button
              onClick={toToggleCase}
              disabled={!inputText.trim()}
              className="bg-white border-2 border-sky-100 hover:bg-sky-50 disabled:opacity-40 text-sky-700 font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
            >
              <Shuffle size={16} /> Swap Case
            </button>
          </div>

          {/* Reset */}
          <div className="mb-2">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
            >
              <RefreshCw size={15} /> Reset
            </button>
          </div>

          {/* ── Result Section ── */}
          {hasResult && (
            <div className="mt-8">

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                    <div className="flex justify-center text-sky-500 mb-1">
                      <stat.icon size={20} />
                    </div>
                    <p className={`text-lg font-bold ${stat.color || "text-gray-800"}`}>{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Dark Output Block */}
              <div className="bg-gray-900 rounded-2xl p-6 mb-6 overflow-x-auto">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-semibold">
                  {actionLabels[activeAction] || "Result"}
                </p>
                <pre className="text-sm font-mono leading-relaxed text-gray-200 max-h-72 overflow-y-auto whitespace-pre-wrap">
                  {outputText}
                </pre>
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={copyText}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
                >
                  <Copy size={15} />
                  {copied ? "Copied!" : "Copy Result"}
                </button>
                <button
                  onClick={downloadText}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  <Download size={15} /> Download .txt
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!hasResult && (
            <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mt-4">
              <Shuffle size={32} className="mx-auto mb-3 text-gray-300" />
              <p>Paste text and click <strong className="text-gray-500">Lowercase</strong>, <strong className="text-gray-500">Uppercase</strong>, or <strong className="text-gray-500">Swap Case</strong></p>
            </div>
          )}
        </div>

        {/* ── SEO Content 1 ── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Free Online Uppercase to Lowercase Converter — Fix Caps Lock in One Click
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            If you&apos;ve accidentally left <strong>Caps Lock</strong> on and typed an entire paragraph, email, or document in uppercase, our tool is the fastest way to fix it. Simply paste the text, click <strong>&quot;To Lowercase&quot;</strong>, and get perfectly formatted text in under a second. No retyping needed.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The tool also supports the reverse — converting any text to <strong>all uppercase</strong> for headers, code constants, or emphasis. The <strong>Swap Case</strong> feature inverts every letter&apos;s case individually, which is useful for correcting mixed-case text or creating stylistic effects. All processing happens in your browser — your text is never sent to any server.
          </p>
        </div>

        {/* ── How to Use ── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Convert Uppercase to Lowercase Text Online Free
          </h2>
          <ol className="list-decimal list-inside text-gray-600 space-y-3 text-base">
            <li><strong>Paste your text</strong> into the input area — the one you want to convert.</li>
            <li>Click <strong>&quot;Lowercase&quot;</strong> to convert all letters to small case, fixing caps lock mistakes.</li>
            <li>Or click <strong>&quot;Uppercase&quot;</strong> for all caps, or <strong>&quot;Swap Case&quot;</strong> to invert each letter.</li>
            <li>Review the <strong>stats grid</strong> showing input/output word and character counts.</li>
            <li><strong>Copy</strong> the converted text or <strong>download as .txt</strong> for offline use.</li>
          </ol>
        </div>

        {/* ── Features Grid ── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Text Case Changer with Word Count – Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: "3 Case Conversion Modes", desc: "Convert to lowercase (fix caps lock), convert to uppercase (for headers/constants), or swap case (invert every letter). Three distinct operations in one tool." },
              { title: "Separate Input & Output Panels", desc: "Your original text stays intact in the input area while the converted result appears in a separate dark output block. Compare side by side without losing the original." },
              { title: "Real-time Word & Character Count", desc: "See exact word and character counts for both input and output in a 4-stat dashboard. Useful when you have character limits for forms, social media, or SMS." },
              { title: "Copy & Download Converted Text", desc: "One-click copy to clipboard for pasting back into your document or form. Or download the converted text as a .txt file for offline use in any application." }
            ].map((feature, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ Accordion ── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Uppercase to Lowercase Converter – Frequently Asked Questions
          </h2>

          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              {
                q: "How to convert uppercase text to lowercase online free?",
                a: "Paste your uppercase text into the input area and click 'Lowercase'. The converted text appears instantly in the output block below. Copy or download the result."
              },
              {
                q: "How to fix text typed with caps lock on?",
                a: "Paste the accidentally caps-locked text into the tool and click 'Lowercase'. The entire text will be converted to normal lowercase instantly. This is the fastest way to fix caps lock mistakes without retyping."
              },
              {
                q: "What does swap case or toggle case do?",
                a: "Swap Case (Toggle Case) inverts every letter — uppercase becomes lowercase and lowercase becomes uppercase. For example, 'Hello World' becomes 'hELLO wORLD'. Useful for reversing accidental case changes."
              },
              {
                q: "Can I convert lowercase to uppercase as well?",
                a: "Yes. Click 'Uppercase' to convert any text to all capital letters. This is useful for formatting headers, constants in programming code, or emphasizing important text."
              },
              {
                q: "Does this tool remove formatting from my text?",
                a: "No. The tool only changes the letter case (uppercase/lowercase). It does not remove bold, italics, links, or any other formatting. Only alphabetical characters are affected — numbers and symbols stay unchanged."
              }
            ].map((item, i) => (
              <div key={i} className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-sky-200 transition-colors duration-300">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left" aria-expanded={openFaq === i}>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 pr-4">{item.q}</h3>
                  <ChevronDown size={22} className={`text-sky-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="px-5 pb-5 text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Related Tools ── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Text &amp; Formatting Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/tools/case-converter", title: "Case Converter", desc: "Convert text to Title Case, Sentence Case, CamelCase and more formats." },
              { href: "/tools/word-counter", title: "Word Counter", desc: "Count words, characters, sentences and reading time instantly." },
              { href: "/tools/remove-duplicate-lines", title: "Remove Duplicate Lines", desc: "Clean up lists by removing repeated and blank entries." }
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

export default UppercaseToLowercase;