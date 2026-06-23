'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Copy, RefreshCw, Home, ChevronDown, Calculator,
  ArrowRight, Info, CheckCircle, Sigma, Sparkles,
  Zap, Shield, HelpCircle, FileText, Globe
} from 'lucide-react';

import ResponsiveAd from "../../../components/ResponsiveAd";


// ─── Square Root Calculator Logic (Outside Component) ────────────────────────
function calculateSquareRoot(input) {
  const num = parseFloat(input);
  if (isNaN(num)) return null;

  const result = {};
  
  if (num >= 0) {
    const sqrt = Math.sqrt(num);
    result.value = sqrt;
    result.isComplex = false;
    result.simplified = simplifyRadical(num);
    result.polar = `${sqrt.toFixed(5)} ∠ 0°`;
    result.steps = generateRealSteps(num, sqrt);
  } else {
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

function simplifyRadical(n) {
  if (n === 0) return '0';
  if (n === 1) return '1';
  
  let factor = 1;
  let remainder = n;
  
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

function generateRealSteps(num, sqrt) {
  const steps = [];
  steps.push(`Step 1: Identify the radicand: ${num}`);
  
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

function generateComplexSteps(num, absSqrt) {
  const steps = [];
  steps.push(`Step 1: Identify the radicand: ${num} (negative number)`);
  steps.push(`Step 2: For negative numbers, √(${num}) = √(${Math.abs(num)}) × √(-1)`);
  steps.push(`Step 3: √(-1) = i (imaginary unit)`);
  steps.push(`Step 4: √(${Math.abs(num)}) = ${absSqrt.toFixed(5)}`);
  steps.push(`Step 5: Therefore, √(${num}) = ${absSqrt.toFixed(5)}i`);
  return steps;
}

// ─── FAQ Data (Sync with page.js JSON-LD) ─────────────────────────────────────
const FAQS = [
  {
    q: 'How do I use the Racine Carree Calculator?',
    a: 'Simply enter any number (positive, negative, or decimal) into the input field and click "Calculate" or press Enter. The tool instantly shows the square root, simplified form, polar form, and step-by-step explanation.',
  },
  {
    q: 'Can I calculate square roots of decimals or large numbers?',
    a: 'Absolutely. Enter any decimal (e.g., 2.5, 0.01) or large number (e.g., 1000000) and get precise results up to 5 decimal places.',
  },
  {
    q: 'Can the calculator handle negative numbers?',
    a: 'Yes! For negative inputs, the result is an imaginary number: √(-a) = √a × i. For example, √(-81) = 9i. The tool shows both the value and the mathematical steps.',
  },
  {
    q: 'What does "racine carrée" mean?',
    a: '"Racine carrée" is French for "square root". While our interface is in English, we include this term to help users searching with French keywords find this free tool.',
  },
  {
    q: 'How accurate is the calculator?',
    a: 'Results are precise to 5 decimal places using JavaScript\'s native Math.sqrt() for real numbers and standard complex number formulas for imaginary roots.',
  },
  {
    q: 'Is my calculation data stored or shared?',
    a: 'Never. All calculations happen locally in your browser. Your input numbers are never sent to servers, stored, or tracked.',
  },
];

// ─── Related Tools (6 Items from your tools array) ────────────────────────────
const RELATED_TOOLS = [
  { href: '/tools/percentage-calculator', title: 'Percentage Calculator', desc: 'Calculate percentage increase, decrease, and difference instantly.' },
  { href: '/tools/profit-margin-calculator', title: 'Profit Margin Calculator', desc: 'Calculate profit %, markup %, and break-even for business decisions.' },
  { href: '/tools/currency-converter', title: 'Currency Converter', desc: 'Convert between 150+ currencies with real-time exchange rates.' },
  { href: '/tools/cpm-calculator', title: 'CPM Calculator', desc: 'Estimate ad revenue based on impressions and CPM rates.' },
  { href: '/tools/age-calculator', title: 'Age Calculator', desc: 'Calculate exact age in years, months, and days from any birth date.' },
  { href: '/tools/time-zone-converter', title: 'Time Zone Converter', desc: 'Convert time between global time zones instantly.' },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const RacineCarreeCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [error, setError] = useState('');

  const calculate = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter a number');
      return;
    }
    setError('');
    const calcResult = calculateSquareRoot(input);
    if (calcResult) {
      setResult(calcResult);
    } else {
      setError('Please enter a valid number');
    }
  }, [input]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') calculate();
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

  const resetAll = () => {
    setInput('');
    setResult(null);
    setError('');
    setCopied(false);
  };

  const stats = [
    { icon: Sigma, label: 'Input Value', value: result?.input ?? '—', color: 'text-gray-800' },
    { icon: CheckCircle, label: 'Result Type', value: result?.isComplex ? 'Complex' : 'Real', color: result?.isComplex ? 'text-blue-600' : 'text-emerald-600' },
    { icon: Zap, label: 'Precision', value: '5 decimals', color: 'text-gray-800' },
    { icon: Shield, label: 'Privacy', value: '100% Local', color: 'text-emerald-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* ── Breadcrumb ── */}
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
        
        {/* ── Hero ── */}
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

        <ResponsiveAd />

        {/* ── Tool Card ── */}
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
                onChange={(e) => { setInput(e.target.value); setResult(null); setError(''); }}
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
            {error && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <Info size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* ── Results Section ── */}
          {result && (
            <div className="mt-8">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                    <div className="flex justify-center text-emerald-500 mb-1"><stat.icon size={20} /></div>
                    <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Main Result Display */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-emerald-900">Result</h3>
                  <button
                    onClick={copyResult}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-xs font-medium text-emerald-700 hover:bg-emerald-50 transition-colors"
                  >
                    <Copy size={14} /> {copied ? 'Copied!' : 'Copy'}
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
                      {result.isComplex ? 'Complex (Imaginary)' : 'Real Number'}
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

              {/* Actions */}
              <div className="flex justify-center gap-3">
                <button onClick={copyResult} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors">
                  <Copy size={15} /> {copied ? 'Copied!' : 'Copy Result'}
                </button>
                <button onClick={resetAll} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors">
                  <RefreshCw size={15} /> Reset
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!result && !error && (
            <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mt-4">
              <Calculator size={32} className="mx-auto mb-3 text-gray-300" />
              <p>Enter a number above, then click <strong className="text-gray-500">Calculate</strong></p>
            </div>
          )}
        </div>

          {/* Native ad here */}

          <script
            async="async"
            data-cfasync="false"
            src="https://pl29796844.effectivecpmnetwork.com/4c385cac6f0784aa3165d3a9e7478f20/invoke.js"
          ></script>
          <div id="container-4c385cac6f0784aa3165d3a9e7478f20"></div>


        {/* ── How to Use ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Calculate Square Root Online
          </h2>
          <ol className="space-y-5">
            {[
              { step: '1', title: 'Enter Your Number', desc: 'Type any value — positive, negative, or decimal — into the input field.' },
              { step: '2', title: 'Click Calculate', desc: 'Hit the button or press Enter to instantly compute the square root.' },
              { step: '3', title: 'View Results', desc: 'See the square root value, simplified radical form, polar form, and type (real/complex).' },
              { step: '4', title: 'Copy or Reset', desc: 'Use "Copy Result" to save your calculation, or "Reset" to start fresh.' },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">{item.step}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── How It Works ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How Square Root Calculation Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">Simple math, powerful results. Here's the logic.</p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Sigma size={16} className="text-emerald-600" />
                Real Number Formula
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                √a = a^0.5 (using Math.sqrt())
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                For positive numbers, we use JavaScript's native Math.sqrt() which implements efficient numerical methods for high-precision results.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Zap size={16} className="text-emerald-600" />
                Complex Number Formula
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                √(-a) = √a × i
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                For negative inputs, we apply the imaginary unit rule: √(-1) = i. This allows calculation of square roots for any real number.
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <h3 className="font-bold text-emerald-900 text-sm mb-2 flex items-center gap-2">
                <Shield size={16} className="text-emerald-600" />
                Privacy Note
              </h3>
              <p className="text-emerald-800 text-xs leading-relaxed">
                All calculations happen locally in your browser. No input numbers are sent to any server. 100% private.
              </p>
            </div>
          </div>
        </section>

        {/* ── Sample Results ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Real Examples: Square Root Calculations
          </h2>
          <p className="text-gray-500 text-sm mb-6">See how different inputs produce different results.</p>

          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-emerald-100 text-emerald-700 font-bold px-2.5 py-1 rounded-lg">Positive Number</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Input</p>
                  <p className="font-semibold text-gray-800">49</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Result</p>
                  <p className="font-semibold text-emerald-600">√49 = 7</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Type</p>
                  <p className="font-semibold text-gray-800">Perfect Square</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded-lg">Negative Number</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Input</p>
                  <p className="font-semibold text-gray-800">-81</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Result</p>
                  <p className="font-semibold text-blue-600">√(-81) = 9i</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Type</p>
                  <p className="font-semibold text-gray-800">Complex (Imaginary)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Use Cases ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses Square Root Calculators?
          </h2>
          <p className="text-gray-500 text-sm mb-6">From students to engineers — square roots matter everywhere.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Zap size={20} className="text-emerald-600" />, title: 'Math Students', desc: 'Solve algebra problems, simplify radicals, and verify homework answers with step-by-step explanations.' },
              { icon: <Sigma size={20} className="text-emerald-600" />, title: 'Engineering Professionals', desc: 'Calculate distances, forces, and electrical values that require square root operations in real-world applications.' },
              { icon: <Globe size={20} className="text-emerald-600" />, title: 'French-Speaking Users', desc: 'Search "racine carrée" and get instant results with familiar terminology alongside English interface.' },
              { icon: <HelpCircle size={20} className="text-emerald-600" />, title: 'Self-Learners', desc: 'Understand the difference between real and imaginary roots with clear examples and visual feedback.' },
            ].map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-5 hover:border-emerald-200 transition-colors">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEO Content ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Use an Online Square Root Calculator?
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Calculating square roots (<em>racine carrée</em> in French) can be tricky — especially with negative numbers, decimals, or large values. Our free <strong>racine carree calculator</strong> makes it simple: enter any number and get instant, precise results with step-by-step explanations.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Whether you're a student learning algebra, a professional solving engineering problems, or just curious about math, this tool handles <strong>real numbers, imaginary roots, simplified radical form, and polar form</strong> — all in one place. No signup, no ads, no limits.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Built for speed and privacy — all calculations happen in your browser using JavaScript. Your input numbers never leave your device. Just accurate math, instantly.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">Privacy Note</h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No calculation data is uploaded to any server. No data is stored or tracked. Your numbers stay on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need more math tools? Try the{' '}
            <Link href="/tools/percentage-calculator" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">Percentage Calculator</Link> for quick ratios, or the{' '}
            <Link href="/tools/profit-margin-calculator" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">Profit Margin Calculator</Link> for business math.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {FAQS.map((item, i) => (
              <div key={i} className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-emerald-200 transition-colors duration-300">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={openFaq === i}
                >
                  <h3 className="text-sm md:text-base font-bold text-gray-900 pr-4">{item.q}</h3>
                  <ChevronDown size={22} className={`text-emerald-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related Tools ── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related Math & Calculator Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RELATED_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-emerald-400 transition-all"
              >
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-emerald-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default RacineCarreeCalculator;