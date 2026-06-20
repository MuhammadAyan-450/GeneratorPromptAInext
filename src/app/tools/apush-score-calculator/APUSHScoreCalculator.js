"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  Calculator,
  Copy,
  RefreshCw,
  Home,
  ChevronDown,
  CheckCircle,
  AlertTriangle,
  Info,
  BookOpen,
  Target,
  TrendingUp,
  Sparkles,
  GraduationCap,
  FileText,
  Clock,
  HelpCircle,
} from "lucide-react";
import { ResponsiveAd } from "../../../components/ResponsiveAd";

// ─── APUSH Scoring Logic (2024-2026 Exam Structure) ─────────────────────────
function calculateAPUSHScore(inputs) {
  const { mcq, saq, dbq, leq } = inputs;

  if (mcq < 0 || mcq > 55) return { error: "MCQ score must be 0-55" };
  if (saq < 0 || saq > 9) return { error: "SAQ score must be 0-9" };
  if (dbq < 0 || dbq > 7) return { error: "DBQ score must be 0-7" };
  if (leq < 0 || leq > 6) return { error: "LEQ score must be 0-6" };

  const mcqWeighted = mcq * 1.0;
  const saqWeighted = saq * (20 / 9);
  const dbqWeighted = dbq * (25 / 7);
  const leqWeighted = leq * (15 / 6);

  const composite = mcqWeighted + saqWeighted + dbqWeighted + leqWeighted;
  const compositeRounded = Math.round(composite * 10) / 10;

  let apScore, apLabel, color;
  if (composite >= 86) {
    apScore = 5;
    apLabel = "Extremely Well Qualified";
    color = "text-emerald-600";
  } else if (composite >= 69) {
    apScore = 4;
    apLabel = "Well Qualified";
    color = "text-blue-600";
  } else if (composite >= 52) {
    apScore = 3;
    apLabel = "Qualified";
    color = "text-yellow-600";
  } else if (composite >= 38) {
    apScore = 2;
    apLabel = "Possibly Qualified";
    color = "text-orange-600";
  } else {
    apScore = 1;
    apLabel = "No Recommendation";
    color = "text-red-600";
  }

  const breakdown = {
    mcq: {
      raw: mcq,
      max: 55,
      weighted: mcqWeighted.toFixed(1),
      percent: ((mcqWeighted / 55) * 100).toFixed(0),
    },
    saq: {
      raw: saq,
      max: 9,
      weighted: saqWeighted.toFixed(1),
      percent: ((saqWeighted / 20) * 100).toFixed(0),
    },
    dbq: {
      raw: dbq,
      max: 7,
      weighted: dbqWeighted.toFixed(1),
      percent: ((dbqWeighted / 25) * 100).toFixed(0),
    },
    leq: {
      raw: leq,
      max: 6,
      weighted: leqWeighted.toFixed(1),
      percent: ((leqWeighted / 15) * 100).toFixed(0),
    },
  };

  const tips = [];
  if (breakdown.mcq.percent < 60)
    tips.push(
      "MCQ is dragging you down. Focus on content review — especially Periods 3-8 which make up most questions. Practice identifying stimulus types.",
    );
  if (breakdown.saq.percent < 60)
    tips.push(
      "SAQ room for improvement. Each one has 3 parts (a, b, c) — make sure you're hitting all three. Keep answers under the lines.",
    );
  if (breakdown.dbq.percent < 60)
    tips.push(
      "DBQ needs work. The rubric rewards thesis clarity, document usage (aim for 6+), outside evidence, and sourcing. Practice timed writes.",
    );
  if (breakdown.leq.percent < 60)
    tips.push(
      "LEQ is your weak spot. Focus on argument development — don't just describe events, explain WHY they happened (causation, continuity, comparison).",
    );
  if (tips.length === 0)
    tips.push(
      "Solid across the board. Keep doing timed practice exams and review any mistakes — that's how you push from a 4 to a 5.",
    );

  return {
    composite: compositeRounded,
    compositeMax: 115,
    apScore,
    apLabel,
    color,
    breakdown,
    tips,
    inputSummary: `MCQ: ${mcq}/55 | SAQ: ${saq}/9 | DBQ: ${dbq}/7 | LEQ: ${leq}/6`,
  };
}

export default function APUSHScoreCalculator() {
  const [inputs, setInputs] = useState({ mcq: "", saq: "", dbq: "", leq: "" });
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = useCallback((field, value) => {
    const num = value === "" ? "" : Math.max(0, parseInt(value) || 0);
    setInputs((prev) => ({ ...prev, [field]: num }));
    setResult(null);
    setError("");
  }, []);

  const calculate = useCallback(() => {
    const numericInputs = {
      mcq: inputs.mcq === "" ? 0 : parseInt(inputs.mcq),
      saq: inputs.saq === "" ? 0 : parseInt(inputs.saq),
      dbq: inputs.dbq === "" ? 0 : parseInt(inputs.dbq),
      leq: inputs.leq === "" ? 0 : parseInt(inputs.leq),
    };

    const calcResult = calculateAPUSHScore(numericInputs);
    if (calcResult.error) {
      setError(calcResult.error);
      setResult(null);
    } else {
      setError("");
      setResult(calcResult);
    }
  }, [inputs]);

  const copyResult = useCallback(() => {
    if (!result) return;
    const text = `APUSH Score Estimate:
Composite Score: ${result.composite}/115
Estimated AP Score: ${result.apScore} (${result.apLabel})

Section Breakdown:
• MCQ: ${result.breakdown.mcq.raw}/55 → ${result.breakdown.mcq.weighted} pts (${result.breakdown.mcq.percent}%)
• SAQ: ${result.breakdown.saq.raw}/9 → ${result.breakdown.saq.weighted} pts (${result.breakdown.saq.percent}%)
• DBQ: ${result.breakdown.dbq.raw}/7 → ${result.breakdown.dbq.weighted} pts (${result.breakdown.dbq.percent}%)
• LEQ: ${result.breakdown.leq.raw}/6 → ${result.breakdown.leq.weighted} pts (${result.breakdown.leq.percent}%)

Tips:
 ${result.tips.map((t) => `• ${t}`).join("\n")}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [result]);

  const reset = useCallback(() => {
    setInputs({ mcq: "", saq: "", dbq: "", leq: "" });
    setResult(null);
    setError("");
    setCopied(false);
  }, []);

  const getBarColor = (percent) => {
    const p = parseInt(percent);
    if (p >= 80) return "bg-emerald-500";
    if (p >= 60) return "bg-blue-500";
    if (p >= 40) return "bg-yellow-500";
    return "bg-red-500";
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
                APUSH Score Calculator
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-100 mb-4">
            <BookOpen className="text-indigo-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            APUSH Score Calculator
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Just took a practice APUSH exam and want to know where you stand?
            Put in your section scores and you&apos;ll get a predicted AP score
            plus tips on what to focus on next.
          </p>
        </div>

        <ResponsiveAd />

        {/* Calculator Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          {/* Input Grid */}
          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Multiple Choice (0-55)
              </label>
              <input
                type="number"
                min="0"
                max="55"
                value={inputs.mcq}
                onChange={(e) => handleInputChange("mcq", e.target.value)}
                placeholder="e.g., 42"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              />
              <p className="text-xs text-gray-400 mt-1">
                55 questions &bull; 50% of exam
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Short Answer (0-9)
              </label>
              <input
                type="number"
                min="0"
                max="9"
                value={inputs.saq}
                onChange={(e) => handleInputChange("saq", e.target.value)}
                placeholder="e.g., 7"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              />
              <p className="text-xs text-gray-400 mt-1">
                3 questions &times; 3 pts each &bull; 20% of exam
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                DBQ (0-7)
              </label>
              <input
                type="number"
                min="0"
                max="7"
                value={inputs.dbq}
                onChange={(e) => handleInputChange("dbq", e.target.value)}
                placeholder="e.g., 5"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              />
              <p className="text-xs text-gray-400 mt-1">
                Document-Based Question &bull; 25% of exam
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                LEQ (0-6)
              </label>
              <input
                type="number"
                min="0"
                max="6"
                value={inputs.leq}
                onChange={(e) => handleInputChange("leq", e.target.value)}
                placeholder="e.g., 4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              />
              <p className="text-xs text-gray-400 mt-1">
                Long Essay Question &bull; 15% of exam
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={calculate}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
            >
              <Calculator size={18} /> Calculate AP Score
            </button>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
            >
              <RefreshCw size={15} /> Reset
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertTriangle
                size={16}
                className="text-red-600 flex-shrink-0 mt-0.5"
              />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Result Section */}
          {result && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-6">
              {/* Main Score Display */}
              <div className="text-center py-4 mb-5">
                <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
                  Estimated AP Score
                </p>
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-indigo-200">
                  <Target size={24} className={result.color} />
                  <div className="text-left">
                    <p className={`text-4xl font-bold ${result.color}`}>
                      {result.apScore}
                    </p>
                    <p className="text-sm text-gray-600">{result.apLabel}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Composite Score: {result.composite}/{result.compositeMax}
                </p>
              </div>

              {/* Section Breakdown */}
              <div className="space-y-3 mb-5">
                {[
                  {
                    label: "Multiple Choice (MCQ)",
                    data: result.breakdown.mcq,
                    maxWeight: 55,
                  },
                  {
                    label: "Short Answer (SAQ)",
                    data: result.breakdown.saq,
                    maxWeight: 20,
                  },
                  {
                    label: "Document-Based Question (DBQ)",
                    data: result.breakdown.dbq,
                    maxWeight: 25,
                  },
                  {
                    label: "Long Essay Question (LEQ)",
                    data: result.breakdown.leq,
                    maxWeight: 15,
                  },
                ].map((section, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg p-4 border border-indigo-100"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {section.label}
                      </span>
                      <span className="text-sm font-semibold text-indigo-600">
                        {section.data.weighted}/{section.maxWeight} pts (
                        {section.data.percent}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${getBarColor(section.data.percent)}`}
                        style={{
                          width: `${Math.min(
                            parseInt(section.data.percent),
                            100,
                          )}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Raw: {section.data.raw}/{section.data.max}
                    </p>
                  </div>
                ))}
              </div>

              {/* Study Tips */}
              <div className="bg-white rounded-lg p-4 border border-indigo-100">
                <h4 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-600" />
                  What to Focus On
                </h4>
                <ul className="space-y-1.5">
                  {result.tips.map((tip, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-600 flex items-start gap-2"
                    >
                      <CheckCircle
                        size={14}
                        className="text-emerald-500 mt-0.5 flex-shrink-0"
                      />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Copy Button */}
              <div className="mt-4 flex justify-center">
                <button
                  onClick={copyResult}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
                >
                  <Copy size={15} /> {copied ? "Copied!" : "Copy Results"}
                </button>
              </div>
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

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Calculate Your APUSH Score
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Take a Practice Test (preferably a full-length one)",
                desc: "The College Board provides free practice exams. You can find plenty of other prep material, including practice tests, in any preparation book you buy. Take it in conditions similar to the actual exam – MCQ for 95 minutes, and FRQ for 100 minutes. Even though it will take a lot of energy, do all the questions!",
              },
              {
                step: "2",
                title: "Calculate Scores by Using Rubric Guidelines",
                desc: "MCQ is the easiest one because all you need is to count the right answers. SAQ consists of three short tasks per question, worth 1 point each. DBQ and LEQ are scored between 0 and 7, and 0 and 6, respectively, according to the rubrics provided. Be objective! It is useless to overestimate.",
              },
              {
                step: "3",
                title: "Input Your Results Above",
                desc: "Type MCQ score into the first cell (0-55). Next, type the SAQ score into the second cell (0-9). Then, input DBQ (0-7) and LEQ score (0-6).",
              },
              {
                step: "4",
                title: "Consider the Breakdown, Not Only the Final Score",
                desc: "Even though receiving an AP 3 can be disappointing, when you see that the MCQ score is 75%, while FRQ scores are below 40% gives you a specific direction of improvement.",
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

        {/* ─── Formulas ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            The Math Behind APUSH Scoring
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            It&apos;s not just adding numbers together. Each section has a
            different weight based on how much it counts toward your final
            score.
          </p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Composite Score Formula
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                Composite = (MCQ × 1.0) + (SAQ × 2.222) + (DBQ × 3.571) + (LEQ ×
                2.5)
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                The weird multipliers (2.222, 3.571, 2.5) exist because SAQ,
                DBQ, and LEQ have different raw score scales but need to add up
                to specific point values in the composite. MCQ doesn&apos;t need
                a multiplier because it&apos;s already on a 55-point scale that
                represents 50% of the total.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Converting Composite to AP Score (1-5)
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                86+ → AP 5 (Extremely Well Qualified)
                <br />
                69-85 → AP 4 (Well Qualified)
                <br />
                52-68 → AP 3 (Qualified)
                <br />
                38-51 → AP 2 (Possibly Qualified)
                <br />
                0-37 → AP 1 (No Recommendation)
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                These cutoffs aren&apos;t official — College Board adjusts them
                every year based on how hard the exam was. But they&apos;re
                close enough for planning purposes. The ranges above are based
                on historical data from 2020-2024.
              </p>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
              <h3 className="font-bold text-indigo-900 text-sm mb-2">
                Why 115 and Not 100?
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Good question — it confuses a lot of students. The composite
                scale (0-115) is just a weighted sum of raw scores before they
                get converted to the 1-5 scale. Think of it like a &quot;raw
                total&quot; that then gets curved into a letter grade.
                Don&apos;t try to convert it to a percentage — that&apos;s not
                what it represents.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Real Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Score Calculation Examples
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Walk through these to see how the math works before you plug in your
            own numbers.
          </p>

          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-indigo-100 text-indigo-700 font-bold px-2.5 py-1 rounded-lg">
                  Example 1
                </span>
                <h3 className="font-bold text-gray-900 text-sm">
                  Strong MCQ, Okay Essays
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    MCQ
                  </p>
                  <p className="text-sm font-bold text-gray-900">42/55</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    SAQ
                  </p>
                  <p className="text-sm font-bold text-gray-900">6/9</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    DBQ
                  </p>
                  <p className="text-sm font-bold text-gray-900">5/7</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    LEQ
                  </p>
                  <p className="text-sm font-bold text-gray-900">4/6</p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <p className="text-xs text-gray-500">
                  Weighted: 42 + 13.3 + 17.9 + 10.0 ={" "}
                  <span className="font-bold text-green-700">
                    83.2 composite
                  </span>
                  &nbsp;→ <span className="font-bold text-green-700">AP 4</span>
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-indigo-100 text-indigo-700 font-bold px-2.5 py-1 rounded-lg">
                  Example 2
                </span>
                <h3 className="font-bold text-gray-900 text-sm">
                  Weaker MCQ, Strong Essays
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    MCQ
                  </p>
                  <p className="text-sm font-bold text-gray-900">30/55</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    SAQ
                  </p>
                  <p className="text-sm font-bold text-gray-900">8/9</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    DBQ
                  </p>
                  <p className="text-sm font-bold text-gray-900">6/7</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    LEQ
                  </p>
                  <p className="text-sm font-bold text-gray-900">5/6</p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <p className="text-xs text-gray-500">
                  Weighted: 30 + 17.8 + 21.4 + 12.5 ={" "}
                  <span className="font-bold text-green-700">
                    81.7 composite
                  </span>
                  &nbsp;→ <span className="font-bold text-green-700">AP 4</span>
                  &nbsp;(close to 5)
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-indigo-100 text-indigo-700 font-bold px-2.5 py-1 rounded-lg">
                  Example 3
                </span>
                <h3 className="font-bold text-gray-900 text-sm">
                  Barely Passing
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    MCQ
                  </p>
                  <p className="text-sm font-bold text-gray-900">35/55</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    SAQ
                  </p>
                  <p className="text-sm font-bold text-gray-900">5/9</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    DBQ
                  </p>
                  <p className="text-sm font-bold text-gray-900">4/7</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    LEQ
                  </p>
                  <p className="text-sm font-bold text-gray-900">3/6</p>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                <p className="text-xs text-gray-500">
                  Weighted: 35 + 11.1 + 14.3 + 7.5 ={" "}
                  <span className="font-bold text-yellow-700">
                    67.9 composite
                  </span>
                  &nbsp;→{" "}
                  <span className="font-bold text-yellow-700">AP 3</span>
                  &nbsp;(borderline — could go either way depending on that
                  year&apos;s curve)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Actually Uses This
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            This is not solely designed for students preparing for their tests.
            Let’s find out who this really helps:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <GraduationCap size={20} className="text-indigo-600" />,
                title: "Practice Test Takers Among APUSH Students",
                desc: "Use it after each test you’ve done. You must see your composite score improving over time; otherwise, the detailed results will help to figure out which parts need to be focused on.",
              },
              {
                icon: <FileText size={20} className="text-green-600" />,
                title: "Teachers Monitoring Their Students’ Performance",
                desc: "In case you are marking your students’ practice tests, use it to turn their raw scores into the standard score used by colleges, much quicker than calculating manually for dozens of students.",
              },
              {
                icon: <Target size={20} className="text-amber-600" />,
                title: "Tutors Planning Sessions With Students",
                desc: "When you’ve seen the student scoring well on MCQs, but badly on the DBQ part, you already know what you are going to do during your next meeting.",
              },
              {
                icon: <Clock size={20} className="text-violet-600" />,
                title: "Students Working Out Their Targets",
                desc: "Want to get a 4 to enter a particular university? Well, you need to have a composite score of at least 69. Enter other numbers and see if it works out.",
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

        {/* ─── SEO Content ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How the APUSH Exam for 2024-2026 Really Works
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The College Board has revised the format of the APUSH exam since
            2024. In particular, it now has 55 MCQs and an altered essay
            section. It also consists of 55 multiple-choice questions like
            before, only in that case, the order is different – SAQ comes first,
            followed by DBQ and LEQ. The point allocations remain unchanged;
            therefore, you can use past papers to estimate your score.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            One thing people often forget is that MCQ previously featured a
            penalty for incorrect answers (-0.25 per each). Guessing is now
            rewarded; hence, you won't get penalized if your answer is
            incorrect. There's no reason not to try answering every question
            because there's nothing to lose here.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Regarding the essays, the College Board has rubrics posted on their
            site where all the requirements are spelled out. DBQ requires a
            clear thesis statement, correct use of evidence, analysis of
            documents, and a complex understanding of what you discuss. LEQ is
            quite similar, but it involves two prompts from which you need to
            choose one. Select the topic based on your strengths (e.g., in
            causation).
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Why MCQ Matters More Than You Think
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Here&apos;s the math: MCQ is 50% of your score. Even if you write
            decent essays, bombing the multiple choice makes it almost
            impossible to get a 4 or 5. A student who gets 50/55 on MCQ but only
            4/9 on SAQ, 4/7 on DBQ, and 3/6 on LEQ still scores around 78
            composite — solidly in AP 4 territory. Meanwhile, someone with
            perfect essays but only 30/55 on MCQ is looking at maybe a 68
            composite — borderline AP 3.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The takeaway? Don&apos;t neglect multiple choice practice. It&apos;s
            boring compared to writing essays, but it&apos;s half your score.
            Use our{" "}
            <Link
              href="/tools/percentage-calculator"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700"
            >
              Percentage Calculator
            </Link>{" "}
            if you need help figuring out how many you need to get right to hit
            a target percentage.
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
                q: "How accurate is this calculator compared to the real thing?",
                a: "Honestly? Close enough for planning. We use the official section weights and reasonable composite-to-AP cutoffs. But College Board adjusts the actual cutoffs every year based on exam difficulty. If you get a 73 composite, you might end up with a 3 or a 4 depending on that year's curve. It's an estimate, not a guarantee.",
              },
              {
                q: "What's considered a good APUSH score for college credit?",
                a: "A 3 is the minimum that most colleges accept for credit. But honestly? Competitive schools and selective colleges often want a 4 or higher. A 5 is rare and impressive. If you're aiming for a specific school, check their AP credit policy — some only accept 4s and 5s for certain subjects.",
              },
              {
                q: "I got a 3 on the practice test. Is that bad?",
                a: "It's not great, but it's not terrible either. A 3 means you demonstrated basic competence. The good news is that there's usually a clear path to a 4 — look at your section breakdown. If your MCQ is low, focus there. If your DBQ is low, practice document analysis. Small improvements in one section can push you over the threshold.",
              },
              {
                q: "What's the difference between DBQ and LEQ?",
                a: "DBQ gives you 7 documents and asks you to write an argument using them plus outside knowledge. The rubric specifically scores how well you use and analyze those documents. LEQ gives you a choice between two prompts — pick the one you're more confident about. Both test historical thinking, but DBQ is more structured.",
              },
              {
                q: "Do colleges see the composite score or just the 1-5?",
                a: "Just the 1-5 AP score. Colleges don't see your raw section scores or composite number. When you send your scores through College Board, they convert everything to that final 1-5. So if you're reporting your score to a college, just say 'I got a 4 on APUSH' — don't say 'I got an 83 composite.'",
              },
              {
                q: "Can this calculator work for AP World History or AP Euro?",
                a: "Nope. World and Euro have different structures — different number of MCQs, different essay formats, different weights. Using this calculator for those would give you wrong numbers. We might build calculators for those later, but for now it's APUSH-specific.",
              },
              {
                q: "I left some SAQ parts blank. How do I score that?",
                a: "Count what you wrote, not what was possible. If a SAQ has 3 parts (a, b, c) and you only answered (a) and (b), that's 2 points, not 3. Be honest with yourself here — if you didn't write it, don't count it. Inflating your score doesn't help you prepare.",
              },
              {
                q: "Is it possible to get a 5 with weak essays but strong MCQ?",
                a: "Yeah, actually. If you get 50-52/55 on MCQ (around 90%+) but only mediocre essays (maybe 12-14 combined out of 13 possible points), you can still hit 86+ composite. That's why MCQ is so important. Students who ace the multiple choice have a huge buffer for weaker essays.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-indigo-200 transition-colors"
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
                    className={`text-indigo-500 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i
                      ? "max-h-[600px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
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
            Related Calculators
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/percentage-calculator",
                title: "Percentage Calculator",
                desc: "Calculate percentage change, increase, decrease, and difference. Handy for figuring out 'how many MCQs do I need to get right.'",
              },
              {
                href: "/tools/cpm-calculator",
                title: "CPM Calculator",
                desc: "If you're curious about ad revenue, this connects to understanding how numbers work with different metrics.",
              },
              {
                href: "/tools/age-calculator",
                title: "Age Calculator",
                desc: "Not history-related, but hey, you might need to calculate your age for college applications.",
              },
              {
                href: "/tools/time-zone-converter",
                title: "Time Zone Converter",
                desc: "If you're studying for AP World too, you might need to convert times for international exams.",
              },
              {
                href: "/tools/currency-converter",
                title: "Currency Converter",
                desc: "Unrelated to APUSH, but useful for understanding historical exchange rates in economic history topics.",
              },
              {
                href: "/tools/profit-margin-calculator",
                title: "Profit Margin Calculator",
                desc: "Connects to the economic history themes in Periods 6-9 of the APUSH curriculum.",
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
