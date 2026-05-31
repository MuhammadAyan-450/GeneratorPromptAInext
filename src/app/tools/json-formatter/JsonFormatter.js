'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Copy, RefreshCw, Download, AlertCircle, FileJson, Home, ChevronDown,
  Hash, Layers, Code, FileText, Shield, Zap, Globe, HelpCircle, CheckCircle
} from "lucide-react";

// ─── Sample JSON ──────────────────────────────────────────────────────────────
const sampleJson = JSON.stringify({
  "name": "Generator Prompt AI",
  "version": "2.0",
  "isFree": true,
  "features": ["AI Prompts", "Calculators", "Converters", "Formatters"],
  "author": { "name": "Developer", "tools_built": 30 }
}, null, 2);

// ─── Syntax Highlighting ──────────────────────────────────────────────────────
function HighlightedJson({ json }) {
  const regex = /("(?:[^"\\]|\\.)*")(\s*:)?|(-?\d+\.?\d*(?:[eE][+-]?\d+)?)|(true|false|null)|([{}[\],])/g;
  let match, lastIndex = 0, keyIdx = 0;
  const parts = [];
  while ((match = regex.exec(json)) !== null) {
    if (match.index > lastIndex) parts.push(<span key={`w${lastIndex}`} className="text-gray-400">{json.slice(lastIndex, match.index)}</span>);
    const k = keyIdx++;
    if (match[1] && match[2]) { parts.push(<span key={k} className="text-sky-400">{match[1]}</span>); parts.push(<span key={`${k}c`} className="text-gray-500">{match[2]}</span>); }
    else if (match[1]) parts.push(<span key={k} className="text-green-400">{match[1]}</span>);
    else if (match[3]) parts.push(<span key={k} className="text-orange-400">{match[3]}</span>);
    else if (match[4]) parts.push(<span key={k} className="text-purple-400">{match[4]}</span>);
    else if (match[5]) parts.push(<span key={k} className="text-gray-500">{match[5]}</span>);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < json.length) parts.push(<span key={`e${lastIndex}`} className="text-gray-400">{json.slice(lastIndex)}</span>);
  return <>{parts}</>;
}

// ─── Stats Calculator ─────────────────────────────────────────────────────────
function getJsonStats(jsonStr) {
  if (!jsonStr) return null;
  try {
    const parsed = JSON.parse(jsonStr);
    let keyCount = 0, maxDepth = 0;
    function traverse(obj, depth) {
      if (depth > maxDepth) maxDepth = depth;
      if (Array.isArray(obj)) obj.forEach((item) => traverse(item, depth + 1));
      else if (obj && typeof obj === "object") { const keys = Object.keys(obj); keyCount += keys.length; keys.forEach((k) => traverse(obj[k], depth + 1)); }
    }
    traverse(parsed, 0);
    return { keys: keyCount, depth: maxDepth, chars: jsonStr.length, lines: jsonStr.split("\n").length };
  } catch { return null; }
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function JsonFormatter() {
  const [inputJson, setInputJson] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [error, setError] = useState(null);
  const [isMinified, setIsMinified] = useState(false);
  const [autoFormat, setAutoFormat] = useState(true);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const formatAndValidate = (jsonStr = inputJson, minify = isMinified) => {
    if (!jsonStr.trim()) { setFormattedJson(""); setError(null); return; }
    try {
      const parsed = JSON.parse(jsonStr);
      const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
      setFormattedJson(formatted); setError(null);
    } catch (err) {
      let message = err.message;
      if (err instanceof SyntaxError) {
        const match = err.message.match(/position (\d+)/);
        if (match) {
          const pos = parseInt(match[1], 10);
          const lines = jsonStr.split("\n");
          let lineNum = 1, charCount = 0;
          for (const line of lines) {
            if (charCount + line.length >= pos) { message = `${err.message} (line ${lineNum}, column ${pos - charCount + 1})`; break; }
            charCount += line.length + 1; lineNum++;
          }
        }
      }
      setFormattedJson(""); setError(message || "Invalid JSON");
    }
  };

  useEffect(() => { if (autoFormat) formatAndValidate(inputJson, isMinified); }, [inputJson, isMinified, autoFormat]);

  const handleKeyDown = (e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); formatAndValidate(inputJson, isMinified); } };
  const handleCopy = () => { if (!formattedJson) return; navigator.clipboard.writeText(formattedJson); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => { if (!formattedJson) return; const blob = new Blob([formattedJson], { type: "application/json" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = `formatted-${Date.now()}.json`; link.click(); URL.revokeObjectURL(url); };
  const loadSample = () => setInputJson(sampleJson);
  const clearAll = () => { setInputJson(""); setFormattedJson(""); setError(null); };
  const reset = () => { clearAll(); setIsMinified(false); setAutoFormat(true); };

  const stats = getJsonStats(formattedJson);

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
            <li><span className="text-gray-900 font-semibold">JSON Formatter</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-6xl mx-auto w-full px-4 pb-20">

        {/* ── Hero ── */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <FileJson className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Fix JSON Formatting Errors Online –{" "}
            <span className="text-sky-600">Free Beautify Minify Validate Tool</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Format, beautify, minify and validate JSON with real-time error detection showing exact line and column. Syntax highlighted output.
          </p>
        </div>

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-8">

          <div className="grid lg:grid-cols-2 gap-0">
            {/* Input Editor */}
            <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <label className="font-semibold text-gray-700 text-sm">Paste your JSON here</label>
                <div className="flex flex-wrap gap-2">
                  <button onClick={loadSample} className="px-3 py-1.5 text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 rounded-xl transition">Load Sample</button>
                  <button onClick={() => setIsMinified(!isMinified)} className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${isMinified ? "bg-sky-600 text-white border-sky-600" : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700"}`}>{isMinified ? "Minified" : "Pretty Print"}</button>
                  <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer"><input type="checkbox" checked={autoFormat} onChange={(e) => setAutoFormat(e.target.checked)} className="h-3.5 w-3.5 text-sky-600 rounded border-gray-300" /> Auto</label>
                </div>
              </div>

              <textarea value={inputJson} onChange={(e) => setInputJson(e.target.value)} onKeyDown={handleKeyDown} placeholder={'Paste or type JSON here...\ne.g. {"name":"John","skills":["React","Node"]}'} rows={16} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 font-mono text-sm resize-y" spellCheck={false} aria-label="JSON input editor" />

              {error && (
                <div className="mt-3 flex items-start gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                  <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <div><strong className="font-semibold">Validation Error:</strong><p className="mt-0.5 font-mono text-xs">{error}</p></div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button onClick={() => formatAndValidate(inputJson, isMinified)} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"><Code size={18} /> Format JSON</button>
                <button onClick={reset} className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"><RefreshCw size={18} /> Reset</button>
              </div>
            </div>

            {/* Output Panel */}
            <div className="p-6 md:p-8 flex flex-col bg-gray-50/50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Formatted Output</span>
                <div className="flex gap-2">
                  <button onClick={handleCopy} disabled={!formattedJson} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-medium text-gray-700 transition-colors disabled:opacity-40"><Copy size={13} /> {copied ? "Copied!" : "Copy"}</button>
                  <button onClick={handleDownload} disabled={!formattedJson} className="inline-flex items-center gap-1.5 px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-medium transition-colors disabled:opacity-40"><Download size={13} /> Download .json</button>
                </div>
              </div>

              {formattedJson ? (
                <div className="bg-gray-900 rounded-2xl p-6 flex-1 overflow-auto min-h-[420px]">
                  <pre className="text-sm font-mono leading-relaxed"><HighlightedJson json={formattedJson} /></pre>
                </div>
              ) : (
                <div className="flex-1 bg-gray-900 rounded-2xl p-6 flex items-center justify-center min-h-[420px]">
                  <p className="text-gray-500 text-sm font-mono">{error ? "" : "// Paste JSON on the left to format and validate"}</p>
                </div>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 border-t border-gray-200">
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"><div className="flex justify-center text-sky-500 mb-1"><Code size={20} /></div><p className="text-lg font-bold text-gray-800">{stats.keys}</p><p className="text-xs text-gray-500 mt-0.5">Keys</p></div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"><div className="flex justify-center text-sky-500 mb-1"><Layers size={20} /></div><p className="text-lg font-bold text-gray-800">{stats.depth}</p><p className="text-xs text-gray-500 mt-0.5">Max Depth</p></div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"><div className="flex justify-center text-sky-500 mb-1"><Hash size={20} /></div><p className="text-lg font-bold text-gray-800">{stats.chars}</p><p className="text-xs text-gray-500 mt-0.5">Characters</p></div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"><div className="flex justify-center text-sky-500 mb-1"><FileText size={20} /></div><p className="text-lg font-bold text-gray-800">{stats.lines}</p><p className="text-xs text-gray-500 mt-0.5">Lines</p></div>
            </div>
          )}

          {/* Empty State */}
          {!inputJson && !error && (
            <div className="text-center py-8 text-gray-400 border-t border-dashed border-gray-200">
              <FileJson size={32} className="mx-auto mb-3 text-gray-300" />
              <p>Paste your JSON above or click Load Sample. We'll format and validate it instantly — no upload required.</p>
            </div>
          )}
        </div>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Format JSON in 3 Simple Steps</h2>
          <ol className="space-y-5">
            {[
              { step: "1", title: "Paste Your JSON", desc: "Copy your raw or broken JSON into the left editor. Or click Load Sample to see how it works with example data." },
              { step: "2", title: "Choose Format Style", desc: "Toggle between Pretty Print (indented for readability) or Minified (compact for production). Enable Auto for real-time formatting." },
              { step: "3", title: "Copy or Download", desc: "Review the syntax-highlighted output. Fix any errors shown with exact line/column. Copy to clipboard or download as .json file." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How Browser-Based JSON Formatting Works</h2>
          <p className="text-gray-500 text-sm mb-6">No server upload. No waiting. Everything happens on your device.</p>
          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">JSON.parse() + JSON.stringify()</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">JSON.parse(input) → validate → JSON.stringify(output, null, 2)</div>
              <p className="text-gray-500 text-xs leading-relaxed">We parse your input using the native JSON parser. If valid, we re-stringify with your chosen spacing. If invalid, we catch the SyntaxError and calculate the exact line/column position.</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Syntax Highlighting Logic</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">regex: keys→blue, strings→green, numbers→orange, bools→purple</div>
              <p className="text-gray-500 text-xs leading-relaxed">A regular expression scans the formatted JSON and wraps different token types in styled spans. This gives you instant visual parsing without external libraries.</p>
            </div>
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">Privacy First</h3>
              <p className="text-sky-800 text-xs leading-relaxed">All JSON parsing and formatting happens locally in your browser using JavaScript. No data is uploaded, stored, or sent anywhere. Close the tab and your JSON is gone. 100% private by design.</p>
            </div>
          </div>
        </section>

        {/* ─── Sample Results ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What Kind of Results Can You Expect?</h2>
          <p className="text-gray-500 text-sm mb-6">Real examples with different JSON structures and error types.</p>
          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-lg">Valid Nested JSON</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Input</p><p className="font-semibold text-gray-800">Minified API response</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Output</p><p className="font-semibold text-green-600">Pretty printed + highlighted</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Best For</p><p className="font-semibold text-gray-800">Debugging, documentation</p></div>
              </div>
            </div>
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-red-100 text-red-700 font-bold px-2.5 py-1 rounded-lg">Invalid JSON (Missing Comma)</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Error</p><p className="font-semibold text-red-600">Unexpected token at position 45</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Position</p><p className="font-semibold text-amber-600">Line 3, Column 12</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Fix</p><p className="font-semibold text-gray-800">Add comma after value</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Who Uses This JSON Formatter?</h2>
          <p className="text-gray-500 text-sm mb-6">From developers to analysts — clean JSON saves time.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Code size={20} className="text-sky-600" />, title: "Frontend Developers", desc: "Format API responses, config files, and state objects for debugging. Syntax highlighting makes nested structures easy to read." },
              { icon: <Zap size={20} className="text-green-600" />, title: "Backend Engineers", desc: "Minify JSON payloads before sending to clients. Validate request bodies and catch syntax errors before they break production." },
              { icon: <Globe size={20} className="text-amber-600" />, title: "Data Analysts", desc: "Clean and format exported JSON data for analysis. Count keys and lines to understand dataset structure at a glance." },
              { icon: <Shield size={20} className="text-violet-600" />, title: "Privacy-Conscious Users", desc: "Format sensitive JSON containing API keys or tokens without uploading to third-party servers. Everything stays on your device." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Format JSON in Your Browser?</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Most online JSON formatters ask you to paste code into a web form that sends your data to their servers. That means waiting for uploads, worrying about privacy, and sometimes dealing with size limits. Our free JSON formatter works differently — everything happens <strong>inside your browser</strong> using native JavaScript.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            When JSON is invalid, we don't just say "syntax error" — we calculate the <strong>exact line and column number</strong> where the problem occurs. Missing comma? Trailing comma? Unclosed string? The tool tells you precisely where to look, saving minutes of manual debugging.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Toggle between Pretty Print for human-readable debugging and Minified for production-ready payloads. Real-time stats show key count, max depth, character count, and line count — useful for understanding complex nested structures.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">Privacy Note</h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No JSON data is uploaded to any server. No data is stored or tracked. Your code stays on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need to generate test JSON data? Try the{" "}
            <Link href="/tools/fake-data-generator" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Fake Data Generator</Link>. 
            Want to validate JSON schema? The{" "}
            <Link href="/tools/json-validator" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">JSON Validator</Link> has you covered.
          </p>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              { q: "How to fix JSON formatting errors online?", a: "Paste your broken JSON into our formatter. If there is a syntax error, the tool will show the exact issue with the line and column number where it is invalid, such as a missing comma, extra comma, or unclosed quote. Fix the error in the input editor and the output updates in real-time." },
              { q: "How to minify JSON for production API?", a: "Paste your JSON, click the Minified toggle, and the tool removes all unnecessary whitespace and line breaks to produce the smallest possible file size. Copy or download the minified JSON for use in production APIs and web applications." },
              { q: "Is my JSON data safe in this formatter?", a: "Yes, 100% safe. Our JSON formatter runs entirely in your browser using JavaScript. Your data is never sent to any server, making it completely private and secure. This is important when formatting JSON that contains API keys, tokens, or sensitive data." },
              { q: "What is the difference between pretty print and minified JSON?", a: "Pretty Print adds indentation and line breaks to make JSON readable for humans. Minified JSON removes all unnecessary whitespace to produce the smallest possible file size, which is ideal for production APIs, reducing bandwidth and improving load times." },
              { q: "Can I format very large JSON files online?", a: "Yes. Because the tool runs entirely in your browser without server-side processing limits, it can handle large JSON arrays and nested objects smoothly without timing out. Very large files may be slightly slower depending on your device." },
              { q: "Does this tool support JSON5 or other extensions?", a: "This tool follows the official JSON specification (RFC 8259). It does not support JSON5 features like comments or trailing commas. For strict JSON validation and formatting, this is the correct tool to use." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Developer Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/tools/fake-data-generator", title: "Fake Data Generator", desc: "Generate realistic dummy JSON data for testing." },
              { href: "/tools/json-validator", title: "JSON Validator", desc: "Validate JSON against schema with detailed error reports." },
              { href: "/tools/word-counter", title: "Word Counter", desc: "Count characters and words in JSON strings." },
              { href: "/tools/excel-formula-beautifier", title: "Excel Formula Beautifier", desc: "Format messy Excel formulas for readability." },
              { href: "/tools/case-converter", title: "Case Converter", desc: "Change text case for formatting consistency." },
              { href: "/tools/remove-duplicate-lines", title: "Remove Duplicates", desc: "Clean up text lists by removing duplicate lines." },
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