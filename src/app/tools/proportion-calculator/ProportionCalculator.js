"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  Copy,
  RefreshCw,
  Home,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Zap,
  BookOpen,
  Target,
  BarChart3,
  HelpCircle,
  Lightbulb,
  Scale,
} from "lucide-react";
import ResponsiveAd from "../../../components/ResponsiveAd";

// ─── Proportion Solving Logic ─────────────────────────────────────────────────
function solveProportion(a, b, c, d) {
  const vals = [a, b, c, d];
  const blanks = vals.filter((v) => v === "" || v === null || v === undefined);

  if (blanks.length !== 1) {
    return { error: "Please leave exactly one field blank to solve for." };
  }

  const num = (v) => parseFloat(v);

  // a/b = c/d → cross multiply: a*d = b*c
  if (a === "" || a === null) {
    // a = (b * c) / d
    if (num(d) === 0) return { error: "Denominator d cannot be zero." };
    const result = (num(b) * num(c)) / num(d);
    return {
      solved: "a",
      result,
      steps: [
        `Set up the proportion: a / ${b} = ${c} / ${d}`,
        `Cross multiply: a × ${d} = ${b} × ${c}`,
        `Simplify: a × ${d} = ${num(b) * num(c)}`,
        `Divide both sides by ${d}: a = ${num(b) * num(c)} ÷ ${d}`,
        `Answer: a = ${result}`,
      ],
    };
  }

  if (b === "" || b === null) {
    // b = (a * d) / c
    if (num(c) === 0)
      return { error: "Numerator c cannot be zero when solving for b." };
    const result = (num(a) * num(d)) / num(c);
    return {
      solved: "b",
      result,
      steps: [
        `Set up the proportion: ${a} / b = ${c} / ${d}`,
        `Cross multiply: ${a} × ${d} = b × ${c}`,
        `Simplify: ${num(a) * num(d)} = b × ${c}`,
        `Divide both sides by ${c}: b = ${num(a) * num(d)} ÷ ${c}`,
        `Answer: b = ${result}`,
      ],
    };
  }

  if (c === "" || c === null) {
    // c = (a * d) / b
    if (num(b) === 0) return { error: "Denominator b cannot be zero." };
    const result = (num(a) * num(d)) / num(b);
    return {
      solved: "c",
      result,
      steps: [
        `Set up the proportion: ${a} / ${b} = c / ${d}`,
        `Cross multiply: ${a} × ${d} = ${b} × c`,
        `Simplify: ${num(a) * num(d)} = ${b} × c`,
        `Divide both sides by ${b}: c = ${num(a) * num(d)} ÷ ${b}`,
        `Answer: c = ${result}`,
      ],
    };
  }

  if (d === "" || d === null) {
    // d = (b * c) / a
    if (num(a) === 0)
      return { error: "Numerator a cannot be zero when solving for d." };
    const result = (num(b) * num(c)) / num(a);
    return {
      solved: "d",
      result,
      steps: [
        `Set up the proportion: ${a} / ${b} = ${c} / d`,
        `Cross multiply: ${a} × d = ${b} × ${c}`,
        `Simplify: ${a} × d = ${num(b) * num(c)}`,
        `Divide both sides by ${a}: d = ${num(b) * num(c)} ÷ ${a}`,
        `Answer: d = ${result}`,
      ],
    };
  }

  return { error: "Unexpected error. Please check your inputs." };
}

export default function ProportionCalculator() {
  const [values, setValues] = useState({ a: "", b: "", c: "", d: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [showSteps, setShowSteps] = useState(true);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (field, val) => {
    setValues((prev) => ({ ...prev, [field]: val }));
    setResult(null);
    setError("");
  };

  const calculate = () => {
    const { a, b, c, d } = values;
    const calc = solveProportion(a, b, c, d);
    if (calc.error) {
      setError(calc.error);
      setResult(null);
    } else {
      setError("");
      setResult(calc);
    }
  };

  const reset = () => {
    setValues({ a: "", b: "", c: "", d: "" });
    setResult(null);
    setError("");
    setCopied(false);
  };

  const copyResult = () => {
    if (!result) return;
    const text = `Proportion: ${values.a || "?"} / ${values.b || "?"} = ${values.c || "?"} / ${values.d || "?"}\n\nSolved for ${result.solved}: ${result.result}\n\nSteps:\n${result.steps.join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 text-center text-lg font-semibold transition-all ${
      values[field] === ""
        ? "border-indigo-300 bg-indigo-50 placeholder:text-indigo-300"
        : "border-gray-300 bg-white"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
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
                className="hover:text-indigo-600 transition-colors"
              >
                All Tools
              </Link>
            </li>
            <li>
              <span className="text-gray-300">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-semibold">
                Proportion Calculator
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-100 mb-4">
            <Scale className="text-indigo-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Proportion Calculator — Solve Proportions Instantly Online
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Solve any proportion problem in seconds. Enter three known values in
            a/b = c/d, leave one blank, and get the missing value with full
            step-by-step working shown. Free, instant, no signup required.
          </p>
        </div>

        <ResponsiveAd />

        {/* Tool Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          {/* Proportion Visual */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-4">
              Enter three values and leave the unknown blank. The calculator
              solves for any of a, b, c, or d.
            </p>
            <div className="inline-flex items-center gap-4 bg-indigo-50 border border-indigo-100 rounded-2xl px-6 py-5">
              {/* a/b */}
              <div className="flex flex-col items-center gap-1">
                <input
                  type="number"
                  placeholder="a"
                  value={values.a}
                  onChange={(e) => handleChange("a", e.target.value)}
                  className={`${inputClass("a")} w-20`}
                />
                <div className="w-20 h-0.5 bg-gray-400" />
                <input
                  type="number"
                  placeholder="b"
                  value={values.b}
                  onChange={(e) => handleChange("b", e.target.value)}
                  className={`${inputClass("b")} w-20`}
                />
              </div>

              <span className="text-2xl font-bold text-indigo-600">=</span>

              {/* c/d */}
              <div className="flex flex-col items-center gap-1">
                <input
                  type="number"
                  placeholder="c"
                  value={values.c}
                  onChange={(e) => handleChange("c", e.target.value)}
                  className={`${inputClass("c")} w-20`}
                />
                <div className="w-20 h-0.5 bg-gray-400" />
                <input
                  type="number"
                  placeholder="d"
                  value={values.d}
                  onChange={(e) => handleChange("d", e.target.value)}
                  className={`${inputClass("d")} w-20`}
                />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Leave one field blank (it turns blue) — that's what the calculator
              will solve for
            </p>
          </div>

          {/* Options */}
          <div className="flex items-center gap-3 mb-6 justify-center">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showSteps}
                onChange={(e) => setShowSteps(e.target.checked)}
                className="w-4 h-4 accent-indigo-600"
              />
              Show step-by-step solution
            </label>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={calculate}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <Calculator size={18} /> Solve Proportion
            </button>
            <button
              onClick={reset}
              className="bg-white border-2 border-indigo-100 text-indigo-700 hover:bg-indigo-50 font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} /> Reset
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertTriangle
                size={16}
                className="text-red-600 flex-shrink-0 mt-0.5"
              />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
              <div className="text-center mb-5">
                <p className="text-xs text-indigo-500 uppercase tracking-wider font-semibold mb-2">
                  Solved for{" "}
                  <span className="font-bold text-indigo-700">
                    {result.solved}
                  </span>
                </p>
                <p className="text-4xl font-bold text-indigo-700">
                  {Number.isInteger(result.result)
                    ? result.result
                    : result.result.toFixed(4).replace(/\.?0+$/, "")}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Proportion: {values.a || result.result.toFixed(4)} /{" "}
                  {values.b || result.result.toFixed(4)} ={" "}
                  {values.c || result.result.toFixed(4)} /{" "}
                  {values.d || result.result.toFixed(4)}
                </p>
              </div>

              {/* Steps */}
              {showSteps && result.steps && (
                <div className="bg-white border border-indigo-100 rounded-xl p-4 mb-4">
                  <h4 className="font-semibold text-indigo-900 text-sm mb-3 flex items-center gap-2">
                    <BookOpen size={15} className="text-indigo-600" />
                    Step-by-Step Solution
                  </h4>
                  <ol className="space-y-2">
                    {result.steps.map((step, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span className="w-5 h-5 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="font-mono">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={copyResult}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all"
                >
                  <Copy size={15} /> {copied ? "Copied!" : "Copy Result"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Native ad */}
        <script
          async="async"
          data-cfasync="false"
          src="https://pl29796844.effectivecpmnetwork.com/4c385cac6f0784aa3165d3a9e7478f20/invoke.js"
        ></script>
        <div id="container-4c385cac6f0784aa3165d3a9e7478f20"></div>

        {/* ─── What Is a Proportion ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What Is a Proportion? Definition and Formula
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            A proportion is a statement that two ratios are equal. Written in
            math notation it looks like this: <strong>a/b = c/d</strong>. This
            reads as "a is to b as c is to d." The four numbers in a proportion
            have names — a and d are called the <em>extremes</em>, and b and c
            are called the <em>means</em>.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The fundamental property that makes proportion problems solvable is
            this: in any true proportion, the product of the means always equals
            the product of the extremes. In equation form:{" "}
            <strong>a × d = b × c</strong>. This is called cross multiplication,
            and it's the engine behind every proportion calculation this tool
            makes.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Proportions show up everywhere — scaling a recipe, reading a map,
            converting currencies, calculating medication doses, mixing paint
            colors, and hundreds of other everyday tasks. If you know three of
            the four numbers, you can always find the fourth, and that's exactly
            what this calculator does.
          </p>
        </section>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How to Use This Proportion Calculator
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Three steps. Takes about ten seconds.
          </p>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Set up your proportion as a/b = c/d",
                desc: "Write out the proportion you're trying to solve so you know which values are a, b, c, and d. For example, if the problem is '3 is to 4 as x is to 12', that means a=3, b=4, c=x (blank), d=12. The key is keeping the relationship consistent — numerators should represent the same kind of quantity, and so should the denominators.",
              },
              {
                step: "2",
                title: "Enter three known values and leave the unknown blank",
                desc: "Type your three known values into the corresponding fields. Leave the field you want to solve for completely empty — it will turn blue to show it's the target. The calculator can solve for any of the four positions: a, b, c, or d.",
              },
              {
                step: "3",
                title: "Click Solve and read the answer",
                desc: "The missing value appears at the top of the results, along with full step-by-step working so you can see exactly how the cross multiplication and division was done. If you're checking work for a class or exam, the steps show the exact method your teacher expects.",
              },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
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

        {/* ─── The Formula ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            The Proportion Formula — How Cross Multiplication Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            This is the math the calculator runs automatically. Understanding it
            means you can solve proportions on paper too.
          </p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                The Core Proportion Formula
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                a / b = c / d{"\n"}↓ Cross multiply{"\n"}a × d = b × c
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                The rule is simple: multiply the numerator of each fraction by
                the denominator of the other. Set those products equal to each
                other. Then solve for the unknown by dividing.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Solving for Each Variable
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Solve for a: a = (b × c) ÷ d{"\n"}
                Solve for b: b = (a × d) ÷ c{"\n"}
                Solve for c: c = (a × d) ÷ b{"\n"}
                Solve for d: d = (b × c) ÷ a
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Each formula comes from the same cross multiplication rule —
                just rearranged to isolate a different variable. The calculator
                detects which field is blank and applies the correct formula
                automatically.
              </p>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
              <h3 className="font-bold text-indigo-900 text-sm mb-2">
                Quick Example
              </h3>
              <p className="text-indigo-800 text-xs leading-relaxed">
                Problem: 2/5 = x/15. Solve for x.{"\n"}
                Cross multiply: 2 × 15 = 5 × x → 30 = 5x → x = 6.{"\n"}
                Check: 2/5 = 6/15 → 0.4 = 0.4 ✓
              </p>
            </div>
          </div>
        </section>

        {/* ─── Worked Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Proportion Examples — Solved Step by Step
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Three real-world proportion problems showing exactly how the
            calculation works.
          </p>

          <div className="space-y-5">
            {[
              {
                label: "Example 1",
                title: "Scaling a Recipe",
                problem:
                  "A recipe for 4 people uses 300g of flour. How much flour do you need for 10 people?",
                setup: "4/300 = 10/x → x = (300 × 10) ÷ 4",
                inputs: [
                  ["a", "4"],
                  ["b", "300"],
                  ["c", "10"],
                  ["d", "x (blank)"],
                ],
                result: "x = 750g",
                note: "Use the same unit relationship in both ratios: people/flour = people/flour. Keep numerators and denominators consistent.",
              },
              {
                label: "Example 2",
                title: "Map Distance",
                problem:
                  "On a map, 2cm represents 50km. A road measures 7cm on the map. How long is it in real life?",
                setup: "2/50 = 7/x → x = (50 × 7) ÷ 2",
                inputs: [
                  ["a", "2"],
                  ["b", "50"],
                  ["c", "7"],
                  ["d", "x (blank)"],
                ],
                result: "x = 175km",
                note: "Scale problems are pure proportions. The ratio of map distance to real distance stays constant across the whole map.",
              },
              {
                label: "Example 3",
                title: "Missing Value — Solve for b",
                problem: "If 15/b = 5/3, what is b?",
                setup: "15/b = 5/3 → b = (15 × 3) ÷ 5",
                inputs: [
                  ["a", "15"],
                  ["b", "blank"],
                  ["c", "5"],
                  ["d", "3"],
                ],
                result: "b = 9",
                note: "Notice that b is in the denominator position, not the numerator. The calculator handles all four positions correctly.",
              },
            ].map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm bg-indigo-100 text-indigo-700 font-bold px-2.5 py-1 rounded-lg">
                    {item.label}
                  </span>
                  <h3 className="font-bold text-gray-900 text-sm">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-3 italic">
                  {item.problem}
                </p>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {item.inputs.map(([label, val], j) => (
                    <div
                      key={j}
                      className="bg-gray-50 rounded-lg p-2.5 text-center"
                    >
                      <p className="text-[11px] text-gray-400 uppercase font-bold">
                        {label}
                      </p>
                      <p className="text-sm font-bold text-gray-900">{val}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-900 text-green-400 font-mono text-xs px-4 py-2 rounded-lg mb-2">
                  {item.setup}
                </div>
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 mb-2">
                  <p className="text-sm font-bold text-indigo-700">
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

        {/* ─── Types of Proportions ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Types of Proportions — Direct, Inverse, and More
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Not all proportions work the same way. Understanding the type helps
            you set up the equation correctly before calculating.
          </p>

          <div className="space-y-4">
            {[
              {
                type: "Direct Proportion",
                formula: "y = kx (or a/b = c/d)",
                color: "indigo",
                desc: "Two quantities that increase or decrease together at the same rate. If you double one, the other doubles too. Examples: the more hours you work, the more you earn; the more fuel in the tank, the farther you can drive. This is the most common type and the one this calculator is built for.",
                example:
                  "3 apples cost $2.40. How much do 7 apples cost? → 3/2.40 = 7/x → x = $5.60",
              },
              {
                type: "Inverse Proportion",
                formula: "xy = k (or x₁y₁ = x₂y₂)",
                color: "green",
                desc: "One quantity increases as the other decreases, and their product stays constant. Examples: more workers on a job means fewer days to finish; driving faster means fewer hours to reach the destination. For inverse proportions, rearrange to x₁y₁ = x₂y₂ before solving.",
                example:
                  "5 workers finish a job in 12 days. How long for 4 workers? → 5×12 = 4×x → x = 15 days",
              },
              {
                type: "Continued Proportion",
                formula: "a/b = b/c (b² = ac)",
                color: "amber",
                desc: "Three quantities where the ratio of the first to the second equals the ratio of the second to the third. The middle term is called the geometric mean of the other two. Used in geometry, photography (aspect ratios), and music theory.",
                example:
                  "Find b if a=4 and c=16 are in continued proportion. → b² = 4×16 = 64 → b = 8",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`border border-${item.color}-100 bg-${item.color}-50 rounded-xl p-5`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`font-mono font-bold text-${item.color}-700 bg-${item.color}-100 px-3 py-1 rounded-lg text-xs`}
                  >
                    {item.type}
                  </span>
                  <span className="text-gray-600 text-xs font-mono">
                    {item.formula}
                  </span>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed mb-2">
                  {item.desc}
                </p>
                <p className="text-xs text-gray-500 italic">{item.example}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Real World Uses ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Real-World Uses of Proportions — Where You'll Actually Need This
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Proportions aren't just a math class concept. Here's where they show
            up in real life.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Lightbulb size={20} className="text-amber-500" />,
                title: "Cooking and Recipes",
                desc: "Scaling a recipe is a proportion problem. A recipe for 4 serves calls for 2 cups of flour. For 6 serves: 4/2 = 6/x → x = 3 cups. Every ingredient scales by the same ratio.",
              },
              {
                icon: <Target size={20} className="text-sky-600" />,
                title: "Maps and Scale Drawings",
                desc: "Every map uses a scale ratio. If 1cm = 5km and a road is 8cm on the map, the real distance is 40km. Engineers use the same logic for blueprints and architectural drawings.",
              },
              {
                icon: <BarChart3 size={20} className="text-green-600" />,
                title: "Currency Conversion",
                desc: "If 1 USD = 280 PKR, how many PKR is 45 USD? 1/280 = 45/x → x = 12,600 PKR. Currency exchange is a direct proportion with the exchange rate as the constant.",
              },
              {
                icon: <BookOpen size={20} className="text-violet-600" />,
                title: "Medicine and Dosage",
                desc: "A 60kg patient needs 150mg of a drug. What dose for a 75kg patient? 60/150 = 75/x → x = 187.5mg. Dosage calculations are life-critical proportion problems.",
              },
              {
                icon: <Scale size={20} className="text-indigo-600" />,
                title: "Chemistry and Stoichiometry",
                desc: "Chemical reactions work in fixed ratios. If 2 moles of H₂ react with 1 mole of O₂, how much O₂ do you need for 5 moles of H₂? 2/1 = 5/x → x = 2.5 moles of O₂.",
              },
              {
                icon: <HelpCircle size={20} className="text-red-500" />,
                title: "Photography and Aspect Ratios",
                desc: "Resizing an image without distorting it uses proportion. A 1920×1080 image resized to 1280 wide: 1920/1080 = 1280/x → x = 720. Same aspect ratio, different size.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl p-5 hover:border-indigo-200 transition-colors"
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
            Proportion Calculator — Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              {
                q: "How do you solve a proportion?",
                a: "Set up the proportion as a/b = c/d with the unknown in one position. Then cross multiply: multiply the numerator of each fraction by the denominator of the other and set them equal (a × d = b × c). Finally, divide both sides by the number next to the unknown to isolate it. Enter three values above and the calculator does this automatically with steps shown.",
              },
              {
                q: "What is the proportion formula?",
                a: "The core proportion formula is a/b = c/d, which rearranges via cross multiplication to a × d = b × c. To solve for each variable: a = (b × c) ÷ d, b = (a × d) ÷ c, c = (a × d) ÷ b, d = (b × c) ÷ a. This calculator applies the correct formula based on which field you leave blank.",
              },
              {
                q: "What is cross multiplication?",
                a: "Cross multiplication is the standard technique for solving proportions. When you have a/b = c/d, you multiply 'across' the equals sign diagonally: multiply a by d and b by c, then set the results equal. So a × d = b × c. This works because both sides of the original proportion represent the same value, so multiplying them by the same quantities keeps the equation balanced.",
              },
              {
                q: "What is the difference between a ratio and a proportion?",
                a: "A ratio compares two quantities — like 3:5 or 3/5. A proportion is a statement that two ratios are equal — like 3/5 = 6/10. Ratios describe a relationship between two things. Proportions say that two different ratios describe the same relationship. You need a proportion (not just a ratio) when you're solving for a missing value.",
              },
              {
                q: "What is a direct proportion?",
                a: "A direct proportion means that as one quantity increases, the other increases at the same rate, and vice versa. If you double one, you double the other. The formula is a/b = c/d or y = kx where k is the constant of proportionality. Most everyday proportion problems — scaling recipes, map distances, speed calculations — are direct proportions.",
              },
              {
                q: "What is an inverse proportion?",
                a: "An inverse proportion means that as one quantity increases, the other decreases, and their product stays constant. The formula is x₁y₁ = x₂y₂. Classic examples: more workers on a job means fewer days to finish; a higher driving speed means less time to reach a destination. For inverse proportions, use the formula x₁y₁ = x₂y₂ rather than the direct proportion format a/b = c/d.",
              },
              {
                q: "How do I check if two ratios form a proportion?",
                a: "Two ratios a/b and c/d form a proportion if their cross products are equal: a × d = b × c. If the products match, the ratios are proportional. For example, 3/4 and 9/12: 3 × 12 = 36 and 4 × 9 = 36. Equal products → it's a proportion. You can also simplify both fractions — if they reduce to the same fraction, they're proportional.",
              },
              {
                q: "Can proportions have decimals or fractions?",
                a: "Yes. Proportions work with any real numbers — whole numbers, decimals, or negative numbers. The cross multiplication method works the same way regardless of whether the values are whole numbers or decimals. This calculator accepts decimal inputs and returns decimal answers where needed.",
              },
              {
                q: "What is the constant of proportionality?",
                a: "In a direct proportion y = kx, k is the constant of proportionality. It's the fixed ratio between the two quantities — the value that stays the same while y and x change. For example, if apples cost $0.80 each, the constant of proportionality is 0.80: total cost = 0.80 × number of apples. You can find k by dividing any y value by its corresponding x value.",
              },
              {
                q: "How is proportion used in geometry?",
                a: "Similar figures have sides in proportion — if two triangles are similar, the ratios of their corresponding sides are all equal. This is the basis for scale drawings, maps, and architectural plans. The Law of Sines in trigonometry is a proportion: a/sin(A) = b/sin(B) = c/sin(C). Proportion is also fundamental to the Golden Ratio, which appears throughout geometry and art.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-indigo-200 transition-colors duration-300"
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
                    className={`text-indigo-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
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
            Related Math Calculators
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/percentage-calculator",
                title: "Percentage Calculator",
                desc: "Calculate percentage increases, decreases, and what percent one number is of another.",
              },
              {
                href: "/tools/apush-score-calculator",
                title: "APUSH Score Calculator",
                desc: "Calculate your estimated APUSH exam score (1-5).",
              },
              {
                href: "/tools/cpc-calculator",
                title: "CPC Calculator",
                desc: "Calculate the CPC online free. Find cost per click, campaign cost, or total clicks instantly with CTR and CPM metrics.",
              },
              {
                href: "/tools/excel-formula-beautifier",
                title: "Excel Formula Beautifier",
                desc: "Format messy Excel and Google Sheets formulas with clean indents, line breaks, and syntax highlighting.",
              },
              {
                href: "/tools/unit-converter",
                title: "Unit Converter",
                desc: "Convert between measurement units — many unit conversions are proportion problems.",
              },
              {
                href: "/tools/profit-margin-calculator",
                title: "Profit Margin Calculator",
                desc: "Calculate profit margins and markups — financial proportions in practice.",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-indigo-400 transition-all"
              >
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-indigo-600 transition-colors">
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
