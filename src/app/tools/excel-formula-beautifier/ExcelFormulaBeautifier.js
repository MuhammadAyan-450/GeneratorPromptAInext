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
            Excel Formula Beautifier
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Turn unreadable nested formulas into clean, properly indented code.
            Check for mismatched parentheses and syntax errors instantly. Works
            for Excel & Google Sheets.
          </p>
        </div>

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

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Format Excel Formulas
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Copy your formula",
                desc: "Select the cell in Excel/Sheets and copy the formula from the formula bar.",
              },
              {
                step: "2",
                title: "Paste and Beautify",
                desc: "Paste it into the input box above and click 'Beautify Formula'. The tool checks syntax and formats it.",
              },
              {
                step: "3",
                title: "Review and Debug",
                desc: "See the color-coded, indented output. Identify nested logic and fix errors easily.",
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

        {/* ─── Formulas / How It Works ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How Formula Formatting Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            It parses the string character by character. Here's the logic.
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
                Increases indentation level for every opening bracket to
                visualize nesting depth.
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
                Adds a line break after every comma to separate function
                arguments clearly.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">
                Privacy Note
              </h3>
              <p className="text-sky-800 text-xs leading-relaxed">
                All formatting happens locally in your browser. Your formulas
                are never sent to any server. 100% private.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Real Examples ─── */}
        {/* ─── Real Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Before & After Examples
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            See how messy formulas become readable.
          </p>

          <div className="space-y-5">
            {/* Before Example */}
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-red-100 text-red-700 font-bold px-2.5 py-1 rounded-lg">
                  Before
                </span>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                <code className="font-mono text-sm text-gray-800 break-all">
                  =IF(A1&gt;10,IF(B1=&quot;Yes&quot;,SUM(C1:C10),0),IF(D1&lt;5,AVERAGE(E1:E10),MAX(F1:F10)))
                </code>
              </div>
            </div>

            {/* After Example */}
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-lg">
                  After
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap">
                  {`
=IF(
  A1>10,
  IF(
    B1="Yes",
    SUM(
      C1:C10
    ),
    0
  ),
  IF(
    D1<5,
    AVERAGE(
      E1:E10
    ),
    MAX(
      F1:F10
    )
  )
)
`.trim()}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses Formula Beautifiers?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Not just accountants. Here's where clean formulas matter.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <BarChart3 size={20} className="text-sky-600" />,
                title: "Data Analysts",
                desc: "Debug complex nested IFs and VLOOKUPs in large datasets quickly.",
              },
              {
                icon: <Zap size={20} className="text-green-600" />,
                title: "Financial Modelers",
                desc: "Ensure accuracy in critical financial models by visually verifying logic.",
              },
              {
                icon: <Code size={20} className="text-violet-600" />,
                title: "Excel Developers",
                desc: "Document and share clean formula logic with team members.",
              },
              {
                icon: <HelpCircle size={20} className="text-amber-600" />,
                title: "Students & Learners",
                desc: "Understand how nested functions work by seeing their structure.",
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
            Why Readable Formulas Matter
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Have you ever opened an Excel file and found a formula that looks
            like a continuous block of text? Nested{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
              IF
            </code>{" "}
            statements, complex{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
              VLOOKUP
            </code>
            s, and massive{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
              SUMIFS
            </code>{" "}
            are almost impossible to debug when written on a single line.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Our free <strong>formula beautifier</strong> takes that messy string
            of text and automatically formats it. It adds line breaks after
            every comma and logical separation, applies proper indentation based
            on how deep the parentheses go, and color-codes the functions,
            references, and text so your eyes can instantly parse the logic.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            While you can't paste the formatted multi-line version back into
            Excel (it requires single-line syntax), this tool is invaluable for
            debugging, documentation, and understanding complex logic before
            implementing it.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Privacy Note
          </h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser. Your formulas are never sent to
            any server — no logging, no tracking, no storage. Close the tab and
            it's gone. That's how it should be.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Working with JSON data? Try the{" "}
            <Link
              href="/tools/json-formatter"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              JSON Formatter
            </Link>
            . Need to count words in your report? The{" "}
            <Link
              href="/tools/word-counter"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              Word Counter
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
                q: "How to format messy Excel formulas for readability?",
                a: "Paste your messy formula into our tool and click 'Beautify Formula'. The tool will automatically add line breaks after every comma and nested parentheses with proper indentation so you can easily read and debug the logic.",
              },
              {
                q: "How to format nested IF statements in Excel formulas?",
                a: "Paste the nested IF formula into our beautifier. The tool calculates the parenthesis depth and automatically indents each nested level on a new line, making complex conditional logic easy to follow.",
              },
              {
                q: "Can I use this with Google Sheets formulas?",
                a: "Yes. Google Sheets and Excel share the exact same formula syntax, so this beautifier works perfectly for formatting both.",
              },
              {
                q: "How to check Excel formula for mismatched parentheses?",
                a: "Simply paste your formula into our tool and click 'Beautify Formula'. If there's a mismatch, it will instantly show you an error telling you exactly how many opening vs closing brackets it found.",
              },
              {
                q: "Is my formula data safe in this tool?",
                a: "Yes, 100% safe. The entire formatting and syntax checking logic runs locally in your web browser. We do not store, read, or send your formulas to any server.",
              },
              {
                q: "Can I put the formatted formula back into Excel?",
                a: "No. Excel and Google Sheets require formulas to be written on a single line. This tool is designed to help you read and debug complex formulas, not to be pasted back into a cell.",
              },
              {
                q: "Does it support array formulas?",
                a: "Yes, it treats array braces {} like any other character. However, for best results, remove the outer {} before pasting, then add them back after reviewing the logic.",
              },
              {
                q: "What functions does it highlight?",
                a: "It highlights any word followed by an opening parenthesis as a function (e.g., SUM, IF, VLOOKUP, XLOOKUP, INDEX, MATCH). It works with custom named functions too.",
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

        {/* ─── Related Tools (Short Descriptions) ─── */}
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
                href: "/tools/csv-to-json",
                title: "CSV to JSON",
                desc: "Convert spreadsheet data.",
              },
              {
                href: "/tools/sql-formatter",
                title: "SQL Formatter",
                desc: "Format database queries.",
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
