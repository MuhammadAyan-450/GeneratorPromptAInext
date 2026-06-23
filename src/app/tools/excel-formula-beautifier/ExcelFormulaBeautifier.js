"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Copy,
  RefreshCw,
  Code,
  AlertTriangle,
  Braces,
  Hash,
  Layers,
  Home,
  ChevronDown,
  Zap,
  Shield,
  BarChart3,
  HelpCircle,
  FileText,
  Download,
} from "lucide-react";

import ResponsiveAd from "../../../components/ResponsiveAd";

const ExcelFormulaBeautifier = () => {
  const [formula, setFormula] = useState("");
  const [result, setResult] = useState("");
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const beautifyFormula = () => {
    if (!formula.trim()) {
      setError("Please paste an Excel or Google Sheets formula.");
      setResult("");
      setTokens([]);
      setStats(null);
      return;
    }

    let inString = false;
    let openCount = 0;
    let closeCount = 0;

    for (let i = 0; i < formula.length; i++) {
      if (formula[i] === '"') inString = !inString;
      if (!inString) {
        if (formula[i] === "(") openCount++;
        if (formula[i] === ")") closeCount++;
      }
    }
    if (inString) {
      setError("Syntax Error: Mismatched quotation marks.");
      setResult("");
      setTokens([]);
      setStats(null);
      return;
    }
    if (openCount !== closeCount) {
      setError(
        `Syntax Error: Mismatched parentheses (${openCount} opening, ${closeCount} closing).`,
      );
      setResult("");
      setTokens([]);
      setStats(null);
      return;
    }

    setError("");

    let formatted = "";
    let indent = 0;
    let maxDepth = 0;
    inString = false;

    for (let i = 0; i < formula.length; i++) {
      let char = formula[i];

      if (char === '"') {
        inString = !inString;
        formatted += char;
      } else if (inString) {
        formatted += char;
      } else {
        if (char === "(") {
          indent++;
          if (indent > maxDepth) maxDepth = indent;
          formatted += "(\n" + "  ".repeat(indent);
        } else if (char === ")") {
          indent--;
          formatted += "\n" + "  ".repeat(indent) + ")";
        } else if (char === ",") {
          formatted += ",\n" + "  ".repeat(indent);
        } else if (char === " ") {
          // Skip existing spaces to normalize formatting
        } else {
          formatted += char;
        }
      }
    }

    setResult(formatted);

    const funcMatches = formula.match(/[A-Za-z_]\w*\(/g);
    const funcCount = funcMatches ? funcMatches.length : 0;
    setStats({
      chars: formula.length,
      functions: funcCount,
      depth: maxDepth,
      commas: (formula.match(/,/g) || []).length,
    });

    const regex =
      /("(?:[^"\\]|\\.)*")|([A-Za-z_]\w*\()|([A-Za-z]+\d*:[A-Za-z]+\d*|[A-Za-z]+\d*)|([0-9]+\.?[0-9]*)|([\(\),])|(\s+)|(.)/g;
    let match;
    const tempTokens = [];
    while ((match = regex.exec(formatted)) !== null) {
      if (match[1]) tempTokens.push({ type: "string", val: match[1] });
      else if (match[2]) tempTokens.push({ type: "function", val: match[2] });
      else if (match[3]) tempTokens.push({ type: "ref", val: match[3] });
      else if (match[4]) tempTokens.push({ type: "number", val: match[4] });
      else if (match[5]) tempTokens.push({ type: "punct", val: match[5] });
      else if (match[6]) tempTokens.push({ type: "space", val: match[6] });
      else if (match[7]) tempTokens.push({ type: "operator", val: match[7] });
    }
    setTokens(tempTokens);
  };

  const copyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setFormula("");
    setResult("");
    setTokens([]);
    setError("");
    setCopied(false);
    setStats(null);
  };

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
                Excel Formula Beautifier
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <Code className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Excel Formula Beautifier — Format & Fix Nested Formulas Instantly
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Paste any messy Excel or Google Sheets formula and get a clean,
            indented, color-coded version back in seconds. Catches mismatched
            parentheses, broken syntax, and nested IF logic errors before they
            break your spreadsheet.
          </p>
        </div>

        <ResponsiveAd />

        {/* Tool Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          {/* Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Paste your messy formula here
            </label>
            <textarea
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              placeholder='e.g. =IF(A1>1,SUM(B1:B10),IF(C1="Yes",VLOOKUP(D1,E:F,2,FALSE),0))'
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 font-mono text-sm resize-y"
            />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={beautifyFormula}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <Zap size={18} /> Beautify Formula
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
              <AlertTriangle
                size={16}
                className="text-red-600 flex-shrink-0 mt-0.5"
              />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Result Section */}
          {result && (
            <div className="mt-8">
              <div className="bg-gray-900 rounded-2xl p-6 mb-6 overflow-x-auto">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-semibold">
                  Formatted Output
                </p>
                <pre className="text-sm font-mono leading-relaxed">
                  {tokens.map((token, i) => {
                    if (token.type === "function")
                      return (
                        <span key={i} className="text-sky-400 font-bold">
                          {token.val}
                        </span>
                      );
                    if (token.type === "string")
                      return (
                        <span key={i} className="text-green-400">
                          {token.val}
                        </span>
                      );
                    if (token.type === "ref")
                      return (
                        <span key={i} className="text-purple-400">
                          {token.val}
                        </span>
                      );
                    if (token.type === "number")
                      return (
                        <span key={i} className="text-orange-400">
                          {token.val}
                        </span>
                      );
                    if (token.type === "operator")
                      return (
                        <span key={i} className="text-yellow-300">
                          {token.val}
                        </span>
                      );
                    if (token.type === "punct")
                      return (
                        <span key={i} className="text-gray-500">
                          {token.val}
                        </span>
                      );
                    return <span key={i}>{token.val}</span>;
                  })}
                </pre>
              </div>

              {/* Stats Grid */}
              {stats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
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
                      <Braces size={20} />
                    </div>
                    <p className="text-lg font-bold text-gray-800">
                      {stats.functions}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">Functions</p>
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
                      <AlertTriangle size={20} />
                    </div>
                    <p className="text-lg font-bold text-gray-800">
                      {stats.commas}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">Arguments</p>
                  </div>
                </div>
              )}

              {/* Utility Actions */}
              <div className="flex flex-wrap justify-center gap-3 border-t border-gray-100 pt-6">
                <button
                  onClick={copyResult}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
                >
                  <Copy size={16} /> {copied ? "Copied!" : "Copy Result"}
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

        {/* ─── What Is Excel Formula Beautifier ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What Is an Excel Formula Beautifier?
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            An Excel formula beautifier is a tool that takes a long, compressed,
            single-line formula and reformats it into a structured, indented,
            easy-to-read layout. If you've ever tried to debug a formula like{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
              =IF(A1&gt;10,IF(B1="Yes",SUM(C1:C10),0),VLOOKUP(D1,E:F,2,FALSE))
            </code>{" "}
            written all in one line, you know how painful it is to find the
            exact argument that's causing a problem.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            This tool solves that. Paste in your formula, click Beautify, and
            you instantly see each function on its own line with proper
            indentation that matches the nesting depth. Functions are
            highlighted in blue, cell references in purple, strings in green,
            and numbers in orange — so your eyes don't have to work hard to tell
            the pieces apart.
          </p>
          <p className="text-gray-600 leading-relaxed">
            It also runs a syntax check before formatting. If your parentheses
            don't match up — which is the single most common Excel formula error
            — the tool tells you exactly how many opening brackets it found
            versus how many closing ones, so you know where to start looking.
          </p>
        </section>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How to Format Excel Formulas — Step by Step
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Three steps. Works for any formula in Excel or Google Sheets.
          </p>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Copy your formula from Excel or Google Sheets",
                desc: "Click the cell that has your formula, then click into the formula bar at the top and select all the text. Copy it. If the formula starts with an equals sign, include that too — the tool handles it either way.",
              },
              {
                step: "2",
                title: "Paste it into the box above and click Beautify",
                desc: "Paste your formula into the input area and hit the Beautify Formula button. The tool first checks for mismatched parentheses and unclosed strings. If everything looks clean, it formats the output with proper indentation.",
              },
              {
                step: "3",
                title: "Read the output, spot the problem, fix it",
                desc: "The formatted output shows your formula broken down by line. Each nesting level is indented further right. You can see at a glance where each function starts and ends, which argument belongs to which function, and where the logic branches. Once you've found the issue, fix the original formula in Excel and test it.",
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

        {/* ─── Nested IF Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Nested IF Formula Examples — Before and After
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Nested IF statements are the most common reason people come to this
            tool. Here's what they look like before and after formatting.
          </p>

          <div className="space-y-6">
            {/* Example 1 */}
            <div className="border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-3">
                Example 1 — Grade Calculator with 4 Nested IFs
              </h3>
              <div className="mb-3">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
                  Before
                </p>
                <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                  <code className="font-mono text-xs text-gray-700 break-all">
                    =IF(A1&gt;=90,"A",IF(A1&gt;=80,"B",IF(A1&gt;=70,"C",IF(A1&gt;=60,"D","F"))))
                  </code>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
                  After Beautifying
                </p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="font-mono text-xs text-green-400 leading-relaxed">{`=IF(
  A1>=90,
  "A",
  IF(
    A1>=80,
    "B",
    IF(
      A1>=70,
      "C",
      IF(
        A1>=60,
        "D",
        "F"
      )
    )
  )
)`}</pre>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                Now you can instantly see there are 4 levels of nesting and 5
                possible outcomes. Spotting a missing condition or wrong
                threshold takes seconds instead of minutes.
              </p>
            </div>

            {/* Example 2 */}
            <div className="border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-3">
                Example 2 — IF with AND condition
              </h3>
              <div className="mb-3">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
                  Before
                </p>
                <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                  <code className="font-mono text-xs text-gray-700 break-all">
                    =IF(AND(A1&gt;100,B1="Active"),"Eligible",IF(OR(C1="VIP",D1&gt;50),"Maybe","No"))
                  </code>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
                  After Beautifying
                </p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="font-mono text-xs text-green-400 leading-relaxed">{`=IF(
  AND(
    A1>100,
    B1="Active"
  ),
  "Eligible",
  IF(
    OR(
      C1="VIP",
      D1>50
    ),
    "Maybe",
    "No"
  )
)`}</pre>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                The AND and OR conditions are now clearly separated. You can
                verify each condition independently without losing track of
                which argument belongs to which function.
              </p>
            </div>
          </div>
        </section>

        {/* ─── VLOOKUP Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            VLOOKUP Formula Examples — How to Format and Debug Them
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            VLOOKUP formulas get complicated fast, especially when wrapped in IF
            statements or IFERROR. Here's what the beautifier does with them.
          </p>

          <div className="space-y-6">
            {/* VLOOKUP Example 1 */}
            <div className="border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-3">
                VLOOKUP Wrapped in IFERROR
              </h3>
              <div className="mb-3">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
                  Before
                </p>
                <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                  <code className="font-mono text-xs text-gray-700 break-all">
                    =IFERROR(VLOOKUP(A2,Sheet2!$A:$D,3,FALSE),"Not Found")
                  </code>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
                  After Beautifying
                </p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="font-mono text-xs text-green-400 leading-relaxed">{`=IFERROR(
  VLOOKUP(
    A2,
    Sheet2!$A:$D,
    3,
    FALSE
  ),
  "Not Found"
)`}</pre>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                Now you can clearly see all four VLOOKUP arguments: the lookup
                value (A2), the table range (Sheet2!$A:$D), the column index
                (3), and the exact match flag (FALSE). The IFERROR fallback
                value is also clearly separated on its own line.
              </p>
            </div>

            {/* VLOOKUP Example 2 */}
            <div className="border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-3">
                Nested VLOOKUP Inside an IF Statement
              </h3>
              <div className="mb-3">
                <p className="text-xs text-gray-400 uppercase font-semibond mb-1">
                  Before
                </p>
                <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                  <code className="font-mono text-xs text-gray-700 break-all">
                    =IF(A1="","",IFERROR(VLOOKUP(A1,Products!$A:$C,2,FALSE),"Unknown
                    Product"))
                  </code>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
                  After Beautifying
                </p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="font-mono text-xs text-green-400 leading-relaxed">{`=IF(
  A1="",
  "",
  IFERROR(
    VLOOKUP(
      A1,
      Products!$A:$C,
      2,
      FALSE
    ),
    "Unknown Product"
  )
)`}</pre>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                Three levels deep — IF, then IFERROR, then VLOOKUP. Formatted
                like this you can clearly verify the empty cell check, the error
                fallback, and the lookup parameters all in one view.
              </p>
            </div>
          </div>
        </section>

        {/* ─── XLOOKUP Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            XLOOKUP Formula Examples — Format the Modern Lookup Function
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            XLOOKUP is the replacement for VLOOKUP in newer versions of Excel
            and Google Sheets. It has up to 6 arguments, which makes formatting
            even more important.
          </p>

          <div className="space-y-6">
            <div className="border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-3">
                XLOOKUP with All 6 Arguments
              </h3>
              <div className="mb-3">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
                  Before
                </p>
                <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                  <code className="font-mono text-xs text-gray-700 break-all">
                    =XLOOKUP(A2,Products!A:A,Products!C:C,"Not Found",0,1)
                  </code>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
                  After Beautifying
                </p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="font-mono text-xs text-green-400 leading-relaxed">{`=XLOOKUP(
  A2,
  Products!A:A,
  Products!C:C,
  "Not Found",
  0,
  1
)`}</pre>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                With XLOOKUP's 6 arguments each on their own line, you can
                immediately verify: lookup value, lookup array, return array,
                if-not-found text, match mode, and search mode. Debugging a
                wrong column or match setting takes a second glance instead of
                counting commas in a single-line formula.
              </p>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-3">
                Nested XLOOKUP — Lookup Within a Lookup
              </h3>
              <div className="mb-3">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
                  Before
                </p>
                <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                  <code className="font-mono text-xs text-gray-700 break-all">
                    =XLOOKUP(A2&B2,C2:C100&D2:D100,E2:E100,"Not Found")
                  </code>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
                  After Beautifying
                </p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="font-mono text-xs text-green-400 leading-relaxed">{`=XLOOKUP(
  A2&B2,
  C2:C100&D2:D100,
  E2:E100,
  "Not Found"
)`}</pre>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                This pattern concatenates two columns for a multi-criteria
                lookup. Formatted this way, you can easily verify both the
                lookup key and the lookup array are using the same concatenation
                logic.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Common Formula Errors ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Common Excel Formula Errors and How to Fix Them
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            These are the errors that bring most people to a formula formatter.
            Here's what each one means and how to track it down.
          </p>

          <div className="space-y-4">
            {[
              {
                error: "#VALUE!",
                color: "red",
                cause: "Wrong data type in a formula argument",
                fix: "Usually means you're doing math on a text cell, or a date is stored as text. Beautify the formula and check each cell reference — one of them is returning text where a number is expected.",
              },
              {
                error: "#REF!",
                color: "orange",
                cause: "A cell reference points to a deleted or moved range",
                fix: "Someone deleted a row or column that the formula was pointing to. Format the formula and trace which range reference has gone stale. Common after copy-pasting formulas to a new location.",
              },
              {
                error: "#N/A",
                color: "amber",
                cause: "VLOOKUP or XLOOKUP can't find the lookup value",
                fix: "The value in your lookup column doesn't exist in the lookup table. Check for trailing spaces, different number formats, or case mismatches. Wrap the VLOOKUP in IFERROR to handle it gracefully.",
              },
              {
                error: "#NAME?",
                color: "purple",
                cause: "Excel doesn't recognize a function name or named range",
                fix: "Usually a typo in a function name — VLOKUP instead of VLOOKUP, for example. Could also mean you're using an Excel 365 function (like XLOOKUP) on an older version that doesn't support it.",
              },
              {
                error: "Too many parentheses",
                color: "sky",
                cause: "Opening and closing brackets don't match",
                fix: "This is where this tool really helps. Paste the formula in and it instantly counts your opening vs closing parentheses and flags the mismatch. Then you can see in the formatted output exactly where the missing bracket should go.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-xl p-5 flex gap-4"
              >
                <div
                  className={`bg-${item.color}-100 text-${item.color}-700 font-mono font-bold text-xs px-3 py-1.5 rounded-lg h-fit whitespace-nowrap`}
                >
                  {item.error}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">
                    {item.cause}
                  </p>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {item.fix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── How It Works ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How the Formula Formatter Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            It parses the formula string character by character. Here's the
            logic.
          </p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Parentheses Tracking
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                if (char === '(') indent++;
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Every time the parser hits an opening bracket, it increases the
                indentation level by one. Closing brackets reduce it. The result
                is that each nested function is indented exactly as deep as it
                actually is inside the formula structure.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Comma Separation
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                if (char === ',') addNewLine();
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Every comma triggers a line break. This separates each function
                argument onto its own line at the correct indentation level, so
                you can count arguments and verify them one by one.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">
                100% Private — Runs in Your Browser
              </h3>
              <p className="text-sky-800 text-xs leading-relaxed">
                All formatting and syntax checking happens locally in your
                browser. Your formulas are never sent to any server. Close the
                tab and everything disappears — nothing is stored anywhere.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses a Formula Beautifier?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            More people than you'd think. Here's where it actually helps.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <BarChart3 size={20} className="text-sky-600" />,
                title: "Data Analysts",
                desc: "Debugging a 6-level nested IF inside a SUMPRODUCT at 5pm on a Friday is painful. Formatting it first cuts the time in half.",
              },
              {
                icon: <Zap size={20} className="text-green-600" />,
                title: "Financial Modelers",
                desc: "Financial models have formulas that pull from 4 different sheets and combine 8 functions. A single misplaced argument can break the whole model — formatting helps you verify each piece.",
              },
              {
                icon: <Code size={20} className="text-violet-600" />,
                title: "Excel Developers",
                desc: "When handing off a workbook to a client or colleague, formatted formulas in documentation make it possible for someone else to understand what the logic actually does.",
              },
              {
                icon: <HelpCircle size={20} className="text-amber-600" />,
                title: "Students Learning Excel",
                desc: "Seeing a complex formula broken down line by line is genuinely the best way to understand how nesting works. Much better than staring at a one-liner trying to count brackets.",
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
            Why Formatting Excel Formulas Makes You Faster at Debugging
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The problem with complex Excel formulas isn't that they're hard to
            write — it's that they're nearly impossible to read once they're
            written. A nested IF with three levels, a VLOOKUP, and an IFERROR
            all crammed onto one line looks like a wall of text. Your brain has
            to manually parse where each function starts and ends, which
            argument belongs to which function, and where the logic branches.
            It's slow and error-prone.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Formatted formulas fix this by putting each argument on its own line
            and indenting nested functions. The visual structure matches the
            logical structure. You can scan down the left edge and see exactly
            how deep the nesting goes. You can count arguments by counting lines
            instead of commas. Finding the wrong value or missing bracket
            becomes a matter of seconds instead of minutes.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            This is the same reason programmers format their code with
            indentation. Python enforces it. JavaScript style guides require it.
            Excel doesn't enforce any formatting at all because formulas have to
            be written on a single line — but that doesn't mean you have to
            think about them that way. Use this tool to read the logic, find the
            problem, then go back and fix the single-line version in Excel.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Does This Work for Google Sheets Too?
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Yes, completely. Google Sheets uses the exact same formula syntax as
            Excel — same function names, same parentheses structure, same comma
            separation for arguments. There's no difference from the formatter's
            perspective. Paste a Google Sheets formula and you'll get the same
            clean formatted output.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Can I Paste the Formatted Version Back Into Excel?
          </h3>
          <p className="text-gray-600 leading-relaxed">
            No — Excel and Google Sheets require formulas to be on a single
            line. The formatted output is purely for reading and debugging. Once
            you've identified the issue in the formatted view, make the fix in
            your original single-line formula and paste that back into the cell.
            Some people copy the formatted version into a comment or
            documentation file alongside their workbook so others can understand
            the logic later.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Working with data in other formats? Try the{" "}
            <Link
              href="/tools/json-formatter"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              JSON Formatter
            </Link>{" "}
            for API data, or the CSV to JSON converter if you need to move
            spreadsheet data into a web application.
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
                q: "How to format messy Excel formulas for readability?",
                a: "Paste your formula into the box at the top of this page and click Beautify Formula. The tool adds a line break after every comma and indents each nested function according to how deep it sits inside the formula. You get a structured, readable layout in one click — no manual editing needed.",
              },
              {
                q: "How to format nested IF statements in Excel?",
                a: "Nested IFs are exactly what this tool is designed for. Paste the formula in and the beautifier calculates how deep each IF sits inside the others, then indents accordingly. Each condition and each return value lands on its own line, so you can verify the logic branch by branch.",
              },
              {
                q: "Can I use this Excel formula beautifier for Google Sheets?",
                a: "Yes. Google Sheets uses identical formula syntax to Excel — same functions, same parentheses, same comma-separated arguments. This tool works perfectly for Sheets formulas. There's no difference in how it handles them.",
              },
              {
                q: "How do I fix mismatched parentheses in an Excel formula?",
                a: "Paste your formula into the tool and click Beautify. If your brackets are unbalanced, the tool shows you an error message with the exact count: how many opening parentheses it found versus how many closing ones. That tells you immediately whether you have one too many or one too few. The formatted output also makes it easier to spot visually where the missing bracket belongs.",
              },
              {
                q: "Is my formula data private and secure?",
                a: "Completely. The formatting logic runs inside your browser — there's no server involved at all. Your formulas are never transmitted, stored, or logged anywhere. Close the tab and everything is gone. This matters especially if your formulas reference sensitive business data, proprietary logic, or confidential spreadsheet structures.",
              },
              {
                q: "Can I paste the formatted formula back into Excel or Google Sheets?",
                a: "No — Excel and Google Sheets only accept formulas written on a single line. The formatted multi-line output is for reading and debugging purposes only. Once you've found and fixed the issue by looking at the formatted version, go back and correct the original single-line formula in your spreadsheet.",
              },
              {
                q: "Does this work with XLOOKUP formulas?",
                a: "Yes. XLOOKUP has up to 6 arguments, which makes it one of the most useful formulas to beautify. The formatter puts each argument on its own line: lookup value, lookup array, return array, if-not-found value, match mode, and search mode. Verifying all six at a glance is much easier than counting commas in a single-line version.",
              },
              {
                q: "What functions does the syntax highlighter recognize?",
                a: "Any word followed by an opening parenthesis is treated as a function and highlighted in blue. This means it works for every Excel and Google Sheets function — IF, SUM, VLOOKUP, XLOOKUP, INDEX, MATCH, SUMIFS, COUNTIFS, IFERROR, TEXTJOIN, and any custom named function you've defined. Cell references appear in purple, text strings in green, and numbers in orange.",
              },
              {
                q: "Does it support array formulas with curly braces?",
                a: "It handles the contents of array formulas correctly. For best results, remove the outer curly braces before pasting — the formatter focuses on the function and argument structure inside. Once you've reviewed and fixed the logic, add the braces back in Excel using Ctrl+Shift+Enter, or in Google Sheets using Ctrl+Shift+Enter as well.",
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
            Related Developer & Data Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/json-formatter",
                title: "JSON Formatter",
                desc: "Beautify JSON code.",
              },
              {
                href: "/tools/image-converter",
                title: "Image Converter",
                desc: "Convert between JPG, PNG, WebP formats",
              },
              {
                href: "/tools/currency-converter",
                title: "Currency Converter",
                desc: "Convert between different currencies.",
              },
              {
                href: "/tools/word-counter",
                title: "Word Counter",
                desc: "Count words & chars.",
              },
              {
                href: "/tools/case-converter",
                title: "Case Converter",
                desc: "Change text case.",
              },
              {
                href: "/tools/base64-encode",
                title: "Base64 Encoder",
                desc: "Encode text safely.",
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

export default ExcelFormulaBeautifier;
