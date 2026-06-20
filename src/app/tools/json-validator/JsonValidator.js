"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Copy,
  AlertCircle,
  CheckCircle,
  Eraser,
  FileJson,
  Home,
  ChevronDown,
  Hash,
  Layers,
  Code,
  FileText,
  Shield,
  Zap,
  Globe,
  HelpCircle,
  RefreshCw,
} from "lucide-react";

import ResponsiveAd from "../../../components/ResponsiveAd";

// ─── Sample JSON ──────────────────────────────────────────────────────────────
const sampleJson = JSON.stringify(
  {
    apiStatus: "success",
    user: { id: 847, role: "admin", verified: true },
    data: ["item1", "item2"],
  },
  null,
  2,
);

// ─── Stats Calculator ─────────────────────────────────────────────────────────
function getJsonStats(jsonStr) {
  if (!jsonStr) return null;
  try {
    const parsed = JSON.parse(jsonStr);
    let keyCount = 0,
      maxDepth = 0;
    function traverse(obj, depth) {
      if (depth > maxDepth) maxDepth = depth;
      if (Array.isArray(obj)) obj.forEach((item) => traverse(item, depth + 1));
      else if (obj && typeof obj === "object") {
        const keys = Object.keys(obj);
        keyCount += keys.length;
        keys.forEach((k) => traverse(obj[k], depth + 1));
      }
    }
    traverse(parsed, 0);
    return {
      keys: keyCount,
      depth: maxDepth,
      chars: jsonStr.length,
      lines: jsonStr.split("\n").length,
    };
  } catch {
    return null;
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function JsonValidator() {
  const [inputJson, setInputJson] = useState("");
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(null);
  const [autoValidate, setAutoValidate] = useState(true);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const validate = (jsonStr = inputJson) => {
    setError(null);
    setIsValid(null);
    if (!jsonStr.trim()) {
      setIsValid(null);
      return;
    }
    try {
      JSON.parse(jsonStr);
      setIsValid(true);
      setError(null);
    } catch (err) {
      let message = err.message || "Invalid JSON syntax";
      const match = message.match(/position (\d+)/);
      if (match) {
        const pos = parseInt(match[1], 10);
        const lines = jsonStr.split("\n");
        let lineNum = 1,
          charCount = 0;
        for (const line of lines) {
          if (charCount + line.length >= pos) {
            message = `${message} (line ${lineNum}, column ${pos - charCount + 1})`;
            break;
          }
          charCount += line.length + 1;
          lineNum++;
        }
      }
      setIsValid(false);
      setError(message);
    }
  };

  useEffect(() => {
    if (autoValidate) validate();
  }, [inputJson, autoValidate]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      validate(inputJson);
    }
  };
  const handleCopy = () => {
    if (!inputJson.trim()) return;
    navigator.clipboard.writeText(inputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const loadSample = () => setInputJson(sampleJson);
  const clearAll = () => {
    setInputJson("");
    setError(null);
    setIsValid(null);
    setCopied(false);
  };

  const stats = isValid ? getJsonStats(inputJson) : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Breadcrumb ── */}
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
                JSON Validator
              </span>
            </li>
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
            Check If JSON Is Valid Online{" "}
            <span className="text-sky-600">
              Free Syntax Checker with Line Number
            </span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Validate JSON syntax instantly with exact line and column error
            positions. Real-time checking. No data sent to server.
          </p>
        </div>

        <ResponsiveAd />

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Input & Controls */}
              <div className="lg:col-span-3 flex flex-col">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <label className="font-semibold text-gray-700 text-sm">
                    Paste or type JSON here
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={loadSample}
                      className="px-3 py-1.5 text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 rounded-xl transition"
                    >
                      Load Sample
                    </button>
                    <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoValidate}
                        onChange={(e) => setAutoValidate(e.target.checked)}
                        className="h-3.5 w-3.5 text-sky-600 rounded border-gray-300"
                      />{" "}
                      Auto
                    </label>
                    <button
                      onClick={handleCopy}
                      disabled={!inputJson.trim()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-medium text-gray-700 transition-colors disabled:opacity-40"
                    >
                      <Copy size={13} /> {copied ? "Copied!" : "Copy"}
                    </button>
                    <button
                      onClick={clearAll}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-medium text-gray-700 transition-colors"
                    >
                      <Eraser size={13} /> Clear
                    </button>
                  </div>
                </div>

                <textarea
                  value={inputJson}
                  onChange={(e) => setInputJson(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    'Paste your JSON here...\ne.g. {"name":"John","active":true}'
                  }
                  rows={16}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 font-mono text-sm resize-y"
                  spellCheck={false}
                  aria-label="JSON input for validation"
                />

                {!autoValidate && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <button
                      onClick={() => validate(inputJson)}
                      className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                    >
                      <Code size={18} /> Validate JSON
                    </button>
                    <button
                      onClick={clearAll}
                      className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <RefreshCw size={18} /> Reset
                    </button>
                  </div>
                )}
              </div>

              {/* Result Area */}
              <div className="lg:col-span-2 flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-4">
                  Validation Result
                </span>
                <div className="flex-1 flex items-center">
                  {isValid === null && !error ? (
                    <div className="w-full min-h-[300px] flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
                      <AlertCircle size={36} className="mb-3 text-gray-300" />
                      <p className="text-sm">Paste JSON to validate</p>
                      <p className="text-xs mt-1 text-gray-300">
                        Enable Auto for real-time checking
                      </p>
                    </div>
                  ) : isValid ? (
                    <div className="w-full p-8 bg-green-50 border border-green-200 rounded-2xl flex flex-col items-center text-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle size={36} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-green-800">
                          Valid JSON
                        </h3>
                        <p className="text-green-700 text-sm mt-2">
                          Syntactically correct. Ready for use.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full p-6 bg-red-50 border border-red-200 rounded-2xl">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                          <AlertCircle size={22} className="text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-red-800">
                          Invalid JSON
                        </h3>
                      </div>
                      <div className="bg-white/60 rounded-xl p-4 border border-red-100 mb-4">
                        <p className="text-red-700 font-mono text-sm break-words">
                          {error}
                        </p>
                      </div>
                      <p className="text-xs text-red-600">
                        <strong>Common fixes:</strong> Missing commas, unmatched
                        brackets, single quotes instead of double quotes, or
                        trailing commas.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            {stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200">
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                  <div className="flex justify-center text-sky-500 mb-1">
                    <Code size={20} />
                  </div>
                  <p className="text-lg font-bold text-gray-800">
                    {stats.keys}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Keys</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                  <div className="flex justify-center text-sky-500 mb-1">
                    <Layers size={20} />
                  </div>
                  <p className="text-lg font-bold text-gray-800">
                    {stats.depth}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Max Depth</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                  <div className="flex justify-center text-sky-500 mb-1">
                    <Hash size={20} />
                  </div>
                  <p className="text-lg font-bold text-gray-800">
                    {stats.chars}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Characters</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                  <div className="flex justify-center text-sky-500 mb-1">
                    <FileText size={20} />
                  </div>
                  <p className="text-lg font-bold text-gray-800">
                    {stats.lines}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Lines</p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!inputJson && !error && isValid === null && (
              <div className="text-center py-8 text-gray-400 border-t border-dashed border-gray-200 mt-6">
                <FileJson size={32} className="mx-auto mb-3 text-gray-300" />
                <p>
                  Paste your JSON above or click Load Sample. We'll validate it
                  instantly — no upload required.
                </p>
              </div>
            )}
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
            How to Validate JSON in 3 Simple Steps
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Paste Your JSON",
                desc: "Copy your raw JSON into the editor. Or click Load Sample to see how validation works with example data.",
              },
              {
                step: "2",
                title: "Enable Auto or Click Validate",
                desc: "With Auto mode, validation happens as you type. Or toggle it off and click Validate JSON to check manually. Press Ctrl+Enter for quick validation.",
              },
              {
                step: "3",
                title: "Review Result & Fix Errors",
                desc: "Green check means your JSON is valid. Red error shows exact line and column — fix the issue and see the result update instantly.",
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

        {/* ─── How It Works ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How Browser-Based JSON Validation Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            No server upload. No waiting. Everything happens on your device.
          </p>
          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Native JSON.parse()
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                try {"{"} JSON.parse(input) {"}"} catch (err) {"{"} /* handle
                error */ {"}"}
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                We use the browser's built-in JSON parser. If your input is
                valid, it returns a JavaScript object. If invalid, it throws a
                SyntaxError with the character position of the problem.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Line/Column Calculation
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                position 45 → split(&quot;\n&quot;) → line 3, column 12
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                When an error occurs, we split your JSON by newlines and count
                characters to convert the raw position into human-readable line
                and column numbers — saving you time debugging.
              </p>
            </div>
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">
                Privacy First
              </h3>
              <p className="text-sky-800 text-xs leading-relaxed">
                All validation happens locally in your browser using native
                JavaScript. No JSON data is uploaded, stored, or sent anywhere.
                Close the tab and your code is gone. 100% private by design.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Sample Results ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            What Kind of Results Can You Expect?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Real examples with valid and invalid JSON structures.
          </p>
          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-lg">
                  Valid API Response
                </span>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Input</p>
                  <p className="font-semibold text-gray-800">
                    Nested object with arrays
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Result</p>
                  <p className="font-semibold text-green-600">✓ Valid JSON</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Stats</p>
                  <p className="font-semibold text-gray-800">5 keys, depth 3</p>
                </div>
              </div>
            </div>
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-red-100 text-red-700 font-bold px-2.5 py-1 rounded-lg">
                  Invalid JSON (Trailing Comma)
                </span>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Error</p>
                  <p className="font-semibold text-red-600">
                    Unexpected token {"}"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Position</p>
                  <p className="font-semibold text-amber-600">
                    Line 4, Column 3
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Fix</p>
                  <p className="font-semibold text-gray-800">
                    Remove trailing comma
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses This JSON Validator?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            From developers to students — catching errors early saves hours.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Code size={20} className="text-sky-600" />,
                title: "Frontend Developers",
                desc: "Validate API responses and config files before using them in React, Vue, or vanilla JS apps. Catch syntax errors before they break your UI.",
              },
              {
                icon: <Zap size={20} className="text-green-600" />,
                title: "Backend Engineers",
                desc: "Quickly verify JSON payloads from databases or third-party APIs. Ensure data integrity before processing or forwarding to clients.",
              },
              {
                icon: <Globe size={20} className="text-amber-600" />,
                title: "API Testers",
                desc: "Validate request/response bodies during development and QA. Spot malformed JSON before it causes integration failures in production.",
              },
              {
                icon: <Shield size={20} className="text-violet-600" />,
                title: "Privacy-Conscious Users",
                desc: "Validate sensitive JSON containing API keys or tokens without uploading to third-party servers. Everything stays on your device.",
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
            Why Validate JSON in Your Browser?
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Most online JSON validators ask you to paste code into a web form
            that sends your data to their servers. That means waiting for
            uploads, worrying about privacy, and sometimes dealing with size
            limits. Our free JSON validator works differently — everything
            happens <strong>inside your browser</strong> using native
            JavaScript.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            When JSON is invalid, we don't just say &quot;syntax error&quot; —
            we calculate the <strong>exact line and column number</strong> where
            the problem occurs. Missing comma? Trailing comma? Single quotes
            instead of double? The tool tells you precisely where to look,
            saving minutes of manual debugging.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Enable Auto mode for real-time validation as you type, or toggle it
            off for manual checks. When your JSON is valid, see structure stats
            like key count, max depth, and line count — useful for understanding
            complex nested objects.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Privacy Note
          </h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using native JavaScript. No JSON
            data is uploaded to any server. No data is stored or tracked. Your
            code stays on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need to format valid JSON for readability? Try the{" "}
            <Link
              href="/tools/json-formatter"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              JSON Formatter
            </Link>
            . Want to generate test JSON data? The{" "}
            <Link
              href="/tools/fake-data-generator"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              Fake Data Generator
            </Link>{" "}
            has you covered.
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
                q: "How to check if JSON is valid online with line and column number?",
                a: "Paste your JSON into our validator and it automatically checks syntax in real-time. If invalid, the tool shows the exact error message along with the precise line and column number.",
              },
              {
                q: "What does Invalid JSON mean and how to fix it?",
                a: "Invalid JSON means the text does not follow strict JSON syntax rules. Common causes include missing commas, extra trailing commas, single quotes instead of double quotes, and unmatched brackets.",
              },
              {
                q: "Is my JSON data sent to a server when I validate it?",
                a: "No. The validation runs entirely inside your browser using native JavaScript. Your data never leaves your device.",
              },
              {
                q: "What is the difference between JSON Validator and JSON Formatter?",
                a: "A JSON Validator only checks whether the syntax is correct. A JSON Formatter does the same check but also re-indents the JSON to make it readable.",
              },
              {
                q: "Can I validate large JSON files online for free?",
                a: "Yes. Since the validation runs in your browser without server limits, it can handle large JSON payloads. Performance depends on your device.",
              },
              {
                q: "Does this tool support JSON5 or other extensions?",
                a: "This tool follows the official JSON specification (RFC 8259). It does not support JSON5 features like comments or trailing commas. For strict JSON validation, this is the correct tool to use.",
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
            Related Developer Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/json-formatter",
                title: "JSON Formatter",
                desc: "Beautify, minify and validate JSON with syntax highlighting.",
              },
              {
                href: "/tools/fake-data-generator",
                title: "Fake Data Generator",
                desc: "Generate realistic dummy JSON data for testing.",
              },
              {
                href: "/tools/word-counter",
                title: "Word Counter",
                desc: "Count characters and words in JSON strings.",
              },
              {
                href: "/tools/excel-formula-beautifier",
                title: "Excel Formula Beautifier",
                desc: "Format messy Excel formulas for readability.",
              },
              {
                href: "/tools/case-converter",
                title: "Case Converter",
                desc: "Change text case for formatting consistency.",
              },
              {
                href: "/tools/remove-duplicate-lines",
                title: "Remove Duplicates",
                desc: "Clean up text lists by removing duplicate lines.",
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
}
