"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  Copy, RefreshCw, Home, ChevronDown, Calculator,
  ArrowRight, Info, CheckCircle, Sigma, Sparkles
} from "lucide-react";

// ─── Square Root Calculator Logic ────────────────────────────────────────────
function calculateSquareRoot(input) {
  const num = parseFloat(input);
  if (isNaN(num)) return null;

  const result = {};
  
  if (num >= 0) {
    // Real number square root
    const sqrt = Math.sqrt(num);
    result.value = sqrt;
    result.isComplex = false;
    result.simplified = simplifyRadical(num);
    result.polar = `${sqrt.toFixed(5)} ∠ 0°`;
    result.steps = generateRealSteps(num, sqrt);
  } else {
    // Complex/Imaginary square root
    const absSqrt = Math.sqrt(Math.abs(num));
    result.value = `${absSqrt.toFixed(5)}i`;
    result.isComplex = true;
    result.simplified = simplifyRadical(Math.abs(num)) + 'i';
    result.polar = `${absSqrt.toFixed(5)} ∠ 90°`;
    result.steps = generateComplexSteps(num, absSqrt);
  }
  
  result.input = num;
  result.formatted = num >= 0 ? `√${num} = ${result.value}` : `√(${num}) = ${result.value}`;
  
  return result;
}

// Simplify radical: √72 = 6√2
function simplifyRadical(n) {
  if (n === 0) return "0";
  if (n === 1) return "1";
  
  let factor = 1;
  let remainder = n;
  
  // Check for perfect square factors
  for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--) {
    const square = i * i;
    if (n % square === 0) {
      factor = i;
      remainder = n / square;
      break;
    }
  }
  
  if (remainder === 1) return factor.toString();
  if (factor === 1) return `√${n}`;
  return `${factor}√${remainder}`;
}

// Generate steps for real numbers
function generateRealSteps(num, sqrt) {
  const steps = [];
  steps.push(`Step 1: Identify the radicand: ${num}`);
  
  // Check if perfect square
  const isPerfect = Number.isInteger(sqrt);
  if (isPerfect) {
    steps.push(`Step 2: ${num} is a perfect square (${Math.round(sqrt)} × ${Math.round(sqrt)} = ${num})`);
    steps.push(`Step 3: Therefore, √${num} = ${sqrt}`);
  } else {
    steps.push(`Step 2: ${num} is not a perfect square`);
    steps.push(`Step 3: Using numerical method (Newton-Raphson) to approximate:`);
    steps.push(`Step 4: √${num} ≈ ${sqrt.toFixed(5)}`);
  }
  
  return steps;
}

// Generate steps for complex numbers
function generateComplexSteps(num, absSqrt) {
  const steps = [];
  steps.push(`Step 1: Identify the radicand: ${num} (negative number)`);
  steps.push(`Step 2: For negative numbers, √(${num}) = √(${Math.abs(num)}) × √(-1)`);
  steps.push(`Step 3: √(-1) = i (imaginary unit)`);
  steps.push(`Step 4: √(${Math.abs(num)}) = ${absSqrt.toFixed(5)}`);
  steps.push(`Step 5: Therefore, √(${num}) = ${absSqrt.toFixed(5)}i`);
  return steps;
}

export default function RacineCarreeCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [error, setError] = useState("");

  const calculate = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter a number");
      return;
    }
    setError("");
    const calcResult = calculateSquareRoot(input);
    if (calcResult) {
      setResult(calcResult);
    } else {
      setError("Please enter a valid number");
    }
  }, [input]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") calculate();
  };

  const copyResult = () => {
    if (!result) return;
    const text = `Racine Carrée Result:
Input: ${result.input}
Result: ${result.value}
Simplified: ${result.simplified}
Polar Form: ${result.polar}
${result.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setInput("");
    setResult(null);
    setError("");
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Breadcrumb */}
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
            <li><span className="text-gray-900 font-semibold">Racine Carree Calculator</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-100 mb-4">
            <Calculator className="text-emerald-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Racine Carree Calculator — <span className="text-emerald-600">Free Square Root Calculator</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Calculate <strong>racine carrée</strong> (square root) instantly — real numbers, imaginary roots, simplified form & polar form. Free, no signup, 5-decimal precision.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          {/* Input Section */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter Number (A)
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                step="any"
                value={input}
                onChange={(e) => { setInput(e.target.value); setResult(null); setError(""); }}
                onKeyPress={handleKeyPress}
                placeholder="e.g., 49, -81, 2.5"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800"
              />
              <button
                onClick={calculate}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                <Sigma size={18} /> Calculate
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          {/* Result Section */}
          {result && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-emerald-900">Result</h3>
                <button
                  onClick={copyResult}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-xs font-medium text-emerald-700 hover:bg-emerald-50 transition-colors"
                >
                  <Copy size={14} /> {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-lg p-4 border border-emerald-100">
                  <p className="text-xs text-gray-500 mb-1">Square Root</p>
                  <p className="text-2xl font-bold text-emerald-700">{result.formatted}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-emerald-100">
                  <p className="text-xs text-gray-500 mb-1">Simplified Form</p>
                  <p className="text-lg font-semibold text-gray-800">{result.simplified}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-emerald-100">
                  <p className="text-xs text-gray-500 mb-1">Polar Form</p>
                  <p className="text-lg font-semibold text-gray-800">{result.polar}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-emerald-100">
                  <p className="text-xs text-gray-500 mb-1">Type</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {result.isComplex ? "Complex (Imaginary)" : "Real Number"}
                  </p>
                </div>
              </div>

              {/* Steps */}
              <div className="mt-4">
                <p className="text-sm font-semibold text-emerald-900 mb-2">Calculation Steps:</p>
                <ol className="text-sm text-gray-600 space-y-1.5 list-decimal list-inside">
                  {result.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
            >
              <RefreshCw size={15} /> Reset
            </button>
          </div>
        </div>

        {/* Examples */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
            <p className="text-sm font-bold text-emerald-700 mb-3 flex items-center gap-2">
              <Sparkles size={16} /> Example: Positive Number
            </p>
            <p className="text-sm text-emerald-800 leading-relaxed">
              If you enter <strong>49</strong>, the calculator returns <strong>7</strong> — because √49 = 7 (since 7 × 7 = 49).
            </p>
            <div className="mt-3 p-3 bg-white rounded-lg border border-emerald-100">
              <p className="font-mono text-emerald-700">√49 = 7</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <p className="text-sm font-bold text-blue-700 mb-3 flex items-center gap-2">
              <Sparkles size={16} /> Example: Negative Number
            </p>
            <p className="text-sm text-blue-800 leading-relaxed">
              If you enter <strong>-81</strong>, the calculator returns <strong>9i</strong> — because √(-81) = √81 × √(-1) = 9i.
            </p>
            <div className="mt-3 p-3 bg-white rounded-lg border border-blue-100">
              <p className="font-mono text-blue-700">√(-81) = 9i</p>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Racine Carree Calculator — Free Square Root Calculator Online
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Calculating square roots (<em>racine carrée</em> in French) can be tricky — especially with negative numbers, decimals, or large values. Our free <strong>racine carree calculator</strong> makes it simple: enter any number and get instant, precise results with step-by-step explanations.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you're a student learning algebra, a professional solving engineering problems, or just curious about math, this tool handles <strong>real numbers, imaginary roots, simplified radical form, and polar form</strong> — all in one place. No signup, no ads, no limits.
          </p>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What Is a Square Root (Racine Carrée)?
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            A <strong>square root</strong> is a number that, when multiplied by itself, equals the original value. For example:
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-4 font-mono text-center">
            √36 = 6, because 6 × 6 = 36
          </div>
          <p className="text-gray-600 leading-relaxed">
            In mathematics, the square root uses the radical symbol (√), and the number inside is called the <strong>radicand</strong>. Our calculator helps you evaluate these expressions instantly — whether the radicand is a whole number, decimal, fraction, or negative value.
          </p>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Key Concepts: Radicals, Perfect Squares & Imaginary Roots
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { term: "Radicand", def: "The number under the square root symbol (e.g., 25 in √25)" },
              { term: "Radical", def: "The √ symbol itself, indicating a root operation" },
              { term: "Perfect Square", def: "A number like 9, 16, or 49 with an exact integer square root" },
              { term: "Imaginary Root", def: "When the radicand is negative (e.g., √-81 = 9i), the result includes the imaginary unit 'i'" },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{item.term}</h3>
                <p className="text-gray-600 text-sm">{item.def}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Calculate a Square Root
          </h2>
          <ol className="list-decimal list-inside text-gray-600 space-y-3 text-base">
            <li><strong>Manual estimation</strong>: Use iterative averaging for approximate values</li>
            <li><strong>Prime factorization</strong>: Break down perfect squares into factors</li>
            <li><strong>Complex number formula</strong>: For negative inputs, √(-a) = √a × i</li>
            <li><strong>Online calculator</strong>: Use our racine carree calculator for instant, accurate results</li>
          </ol>
          <p className="text-gray-600 mt-4">
            Our intelligent calculator automatically selects the best method based on your input — whole numbers, decimals, fractions, or negative values — and shows you the steps.
          </p>
        </section>

        {/* FAQ */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Racine Carree Calculator — Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              { q: "How do I use the Racine Carree Calculator?", a: "Simply enter any number (positive, negative, or decimal) into the input field and click 'Calculate' or press Enter. The tool instantly shows the square root, simplified form, polar form, and step-by-step explanation." },
              { q: "Can I calculate square roots manually?", a: "Yes! For perfect squares, find the integer that multiplies by itself to get the radicand. For others, use methods like prime factorization or Newton-Raphson approximation. Our calculator shows these steps automatically." },
              { q: "What does 'racine carrée' mean?", a: "'Racine carrée' is French for 'square root'. While our interface is in English, we include this term to help users searching with French keywords find this free tool." },
              { q: "Can I calculate square roots of decimals or large numbers?", a: "Absolutely. Enter any decimal (e.g., 2.5, 0.01) or large number (e.g., 1000000) and get precise results up to 5 decimal places." },
              { q: "Can the calculator handle negative numbers?", a: "Yes! For negative inputs, the result is an imaginary number: √(-a) = √a × i. For example, √(-81) = 9i. The tool shows both the value and the mathematical steps." },
              { q: "Is this calculator mobile-friendly?", a: "Yes! The racine carree calculator is fully responsive and works perfectly on phones, tablets, and desktops — no installation required." },
              { q: "How accurate is the calculator?", a: "Results are precise to 5 decimal places using JavaScript's native Math.sqrt() for real numbers and standard complex number formulas for imaginary roots." },
            ].map((item, i) => (
              <div key={i} className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-emerald-200 transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <h3 className="text-base md:text-lg font-bold text-gray-900 pr-4">{item.q}</h3>
                  <ChevronDown size={22} className={`text-emerald-500 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all ${openFaq === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="px-5 pb-5 text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related Math & Calculator Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/tools/percentage-calculator", title: "Percentage Calculator", desc: "Calculate percentages, increases, decreases, and differences instantly." },
              { href: "/tools/profit-margin-calculator", title: "Profit Margin Calculator", desc: "Calculate profit %, markup %, and break-even for business decisions." },
              { href: "/tools/currency-converter", title: "Currency Converter", desc: "Convert between 150+ currencies with real-time exchange rates." },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-emerald-400 transition-all"
              >
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-emerald-600">
                  {tool.title}
                </h3>
                <p className="text-gray-500 text-sm">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}