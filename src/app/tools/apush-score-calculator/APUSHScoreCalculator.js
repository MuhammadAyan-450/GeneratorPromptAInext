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
import ResponsiveAd from "../../../components/ResponsiveAd";

// ─── APUSH Scoring Logic (2026 Exam — Bluebook Digital Format) ──────────────
// Official weights: MCQ 40%, SAQ 20%, DBQ 25%, LEQ 15%
// Composite scale: 0–130 points
function calculateAPUSHScore(inputs) {
  const { mcq, saq, dbq, leq } = inputs;

  if (mcq < 0 || mcq > 55) return { error: "MCQ score must be 0–55" };
  if (saq < 0 || saq > 9) return { error: "SAQ score must be 0–9" };
  if (dbq < 0 || dbq > 7) return { error: "DBQ score must be 0–7" };
  if (leq < 0 || leq > 6) return { error: "LEQ score must be 0–6" };

  // Convert each section to its weighted contribution out of 130
  const mcqWeighted = (mcq / 55) * 52; // 40% of 130 = 52 pts
  const saqWeighted = (saq / 9) * 26; // 20% of 130 = 26 pts
  const dbqWeighted = (dbq / 7) * 32.5; // 25% of 130 = 32.5 pts
  const leqWeighted = (leq / 6) * 19.5; // 15% of 130 = 19.5 pts

  const composite = mcqWeighted + saqWeighted + dbqWeighted + leqWeighted;
  const compositeRounded = Math.round(composite * 10) / 10;

  // Score cutoffs based on 2025 released data (shift ±3–4 pts each year)
  let apScore, apLabel, color;
  if (composite >= 100) {
    apScore = 5;
    apLabel = "Extremely Well Qualified";
    color = "text-emerald-600";
  } else if (composite >= 80) {
    apScore = 4;
    apLabel = "Well Qualified";
    color = "text-blue-600";
  } else if (composite >= 60) {
    apScore = 3;
    apLabel = "Qualified";
    color = "text-yellow-600";
  } else if (composite >= 48) {
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
      maxWeighted: 52,
      percent: ((mcq / 55) * 100).toFixed(0),
    },
    saq: {
      raw: saq,
      max: 9,
      weighted: saqWeighted.toFixed(1),
      maxWeighted: 26,
      percent: ((saq / 9) * 100).toFixed(0),
    },
    dbq: {
      raw: dbq,
      max: 7,
      weighted: dbqWeighted.toFixed(1),
      maxWeighted: 32.5,
      percent: ((dbq / 7) * 100).toFixed(0),
    },
    leq: {
      raw: leq,
      max: 6,
      weighted: leqWeighted.toFixed(1),
      maxWeighted: 19.5,
      percent: ((leq / 6) * 100).toFixed(0),
    },
  };

  // Points needed to reach next score band
  let ptsToNext = null;
  if (apScore < 5) {
    const nextCutoff =
      apScore === 4 ? 100 : apScore === 3 ? 80 : apScore === 2 ? 60 : 48;
    ptsToNext = Math.max(0, nextCutoff - compositeRounded).toFixed(1);
  }

  const tips = [];
  if (breakdown.mcq.percent < 60)
    tips.push(
      "MCQ is your biggest opportunity — it's 40% of your score. Focus on Periods 3–8, practice stimulus-based sets, and answer every question (no penalty for wrong answers).",
    );
  if (breakdown.saq.percent < 60)
    tips.push(
      "SAQ has 3 parts per question (a, b, c) worth 1 point each. Make sure you're hitting all three parts with specific evidence. Leaving any part blank costs you a full point.",
    );
  if (breakdown.dbq.percent < 60)
    tips.push(
      "DBQ is 25% of your score — the single highest-weight section. Aim to use at least 6 of 7 documents, write a clear thesis, include outside evidence, and practice sourcing. Those are the most commonly missed points.",
    );
  if (breakdown.leq.percent < 60)
    tips.push(
      "LEQ rewards argument development, not description. Pick the prompt you're most confident on (causation, comparison, or continuity), write a strong thesis, and use specific historical evidence to support each claim.",
    );
  if (tips.length === 0)
    tips.push(
      "Solid performance across all four sections. Keep taking timed practice exams, review every mistake carefully, and focus on the DBQ sourcing and complexity points — those are the most reliable path from a 4 to a 5.",
    );

  return {
    composite: compositeRounded,
    compositeMax: 130,
    apScore,
    apLabel,
    color,
    breakdown,
    tips,
    ptsToNext,
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
    const text = `APUSH Score Estimate (2026 Exam)\n\nComposite Score: ${result.composite}/130\nEstimated AP Score: ${result.apScore} (${result.apLabel})\n\nSection Breakdown:\n• MCQ: ${result.breakdown.mcq.raw}/55 → ${result.breakdown.mcq.weighted}/${result.breakdown.mcq.maxWeighted} pts (${result.breakdown.mcq.percent}%)\n• SAQ: ${result.breakdown.saq.raw}/9 → ${result.breakdown.saq.weighted}/${result.breakdown.saq.maxWeighted} pts (${result.breakdown.saq.percent}%)\n• DBQ: ${result.breakdown.dbq.raw}/7 → ${result.breakdown.dbq.weighted}/${result.breakdown.dbq.maxWeighted} pts (${result.breakdown.dbq.percent}%)\n• LEQ: ${result.breakdown.leq.raw}/6 → ${result.breakdown.leq.weighted}/${result.breakdown.leq.maxWeighted} pts (${result.breakdown.leq.percent}%)\n\nStudy Tips:\n${result.tips.map((t) => `• ${t}`).join("\n")}`;

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
            APUSH Score Calculator 2026 — AP US History Score Predictor
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Enter your MCQ, SAQ, DBQ, and LEQ scores from a practice exam and
            get your estimated AP US History score (1–5) instantly. Updated for
            the 2026 fully digital Bluebook exam format with the latest College
            Board scoring weights.
          </p>
        </div>

        <ResponsiveAd />

        {/* Calculator Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          {/* Score Weight Info Bar */}
          <div className="grid grid-cols-4 gap-2 mb-6 p-3 bg-indigo-50 rounded-xl">
            {[
              { label: "MCQ", weight: "40%", pts: "52 pts" },
              { label: "SAQ", weight: "20%", pts: "26 pts" },
              { label: "DBQ", weight: "25%", pts: "32.5 pts" },
              { label: "LEQ", weight: "15%", pts: "19.5 pts" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <p className="font-bold text-indigo-700 text-sm">
                  {item.label}
                </p>
                <p className="text-xs text-indigo-500 font-semibold">
                  {item.weight}
                </p>
                <p className="text-xs text-gray-400">{item.pts}</p>
              </div>
            ))}
          </div>

          {/* Input Grid */}
          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Multiple Choice Score (0–55)
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
                55 stimulus-based questions • 40% of exam • no penalty for wrong
                answers
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Short Answer Score (0–9)
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
                3 questions × 3 pts each • 20% of exam
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                DBQ Score (0–7)
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
                Document-Based Question • 25% of exam — highest weight section
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                LEQ Score (0–6)
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
                Long Essay Question • 15% of exam
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
                  Composite: {result.composite}/130
                </p>
                {result.ptsToNext && result.apScore < 5 && (
                  <p className="text-xs text-indigo-600 font-semibold mt-1">
                    {result.ptsToNext} more composite points needed for a{" "}
                    {result.apScore + 1}
                  </p>
                )}
              </div>

              {/* Section Breakdown */}
              <div className="space-y-3 mb-5">
                {[
                  {
                    label: "Multiple Choice (MCQ)",
                    data: result.breakdown.mcq,
                  },
                  { label: "Short Answer (SAQ)", data: result.breakdown.saq },
                  {
                    label: "Document-Based Question (DBQ)",
                    data: result.breakdown.dbq,
                  },
                  {
                    label: "Long Essay Question (LEQ)",
                    data: result.breakdown.leq,
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
                        {section.data.weighted}/{section.data.maxWeighted} pts (
                        {section.data.percent}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${getBarColor(section.data.percent)}`}
                        style={{
                          width: `${Math.min(parseInt(section.data.percent), 100)}%`,
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
                  What to Focus On Next
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

        {/* Native ad — position unchanged */}
        <script
          async="async"
          data-cfasync="false"
          src="https://pl29796844.effectivecpmnetwork.com/4c385cac6f0784aa3165d3a9e7478f20/invoke.js"
        ></script>
        <div id="container-4c385cac6f0784aa3165d3a9e7478f20"></div>

        {/* ─── 2026 Exam Update ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            APUSH 2026 Exam — What Changed and What Stayed the Same
          </h2>
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-5">
            <p className="text-indigo-800 text-sm font-semibold mb-1">
              🖥️ 2026 Update: Fully Digital on Bluebook
            </p>
            <p className="text-indigo-700 text-xs leading-relaxed">
              Starting May 2025, the APUSH exam moved to College Board's
              Bluebook app. You now type all essays instead of handwriting them.
              The content, timing, section weights, and rubrics are identical to
              the previous paper format — only the delivery changed.
            </p>
          </div>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The 2026 AP US History exam is 3 hours and 15 minutes long. Section
            I has 55 multiple-choice questions (55 minutes) followed by 3 short
            answer questions (40 minutes). Section II opens with a 15-minute
            reading period, then 45 minutes for the DBQ, and 40 minutes for the
            LEQ. All MCQ questions are stimulus-based — they're presented in
            sets of 3–4 questions built around a primary source, secondary
            source, image, map, or chart.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The scoring weights haven't changed: MCQ is 40% of your score, DBQ
            is 25%, SAQ is 20%, and LEQ is 15%. What this calculator updates is
            the composite scale — the 2026 exam uses a 130-point composite (not
            115), based on how the official section weights add up under the
            current format.
          </p>
          <p className="text-gray-600 leading-relaxed">
            In 2025, over 516,000 students took APUSH. The mean score was 3.23,
            the pass rate (score 3 or higher) was 73%, and 14% of students
            earned a 5. About 36% earned a 4 — a dramatic jump from 15.9% in
            2021, suggesting students are better prepared than in previous
            years.
          </p>
        </section>

        {/* ─── Score Distribution ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            APUSH Score Distribution 2025 — What Score Do You Need?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Here's how over 516,000 students actually scored on the 2025 AP US
            History exam, plus what composite score typically corresponds to
            each band.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="text-center px-4 py-3 font-semibold">
                    AP Score
                  </th>
                  <th className="text-left px-4 py-3 font-semibold">Label</th>
                  <th className="text-center px-4 py-3 font-semibold">
                    Composite Range
                  </th>
                  <th className="text-center px-4 py-3 font-semibold">
                    % of Students (2025)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "5",
                    "Extremely Well Qualified",
                    "100–130",
                    "14%",
                    "text-emerald-600",
                  ],
                  ["4", "Well Qualified", "80–99", "36%", "text-blue-600"],
                  ["3", "Qualified", "60–79", "23%", "text-yellow-600"],
                  [
                    "2",
                    "Possibly Qualified",
                    "48–59",
                    "19%",
                    "text-orange-600",
                  ],
                  ["1", "No Recommendation", "0–47", "8%", "text-red-600"],
                ].map((row, i) => (
                  <tr
                    key={i}
                    className={`${i % 2 === 1 ? "bg-gray-50" : "bg-white"} border-b border-gray-100`}
                  >
                    <td
                      className={`px-4 py-3 text-center font-bold text-xl ${row[4]}`}
                    >
                      {row[0]}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {row[1]}
                    </td>
                    <td className="px-4 py-3 text-center font-mono text-gray-600">
                      {row[2]}
                    </td>
                    <td className="px-4 py-3 text-center font-semibold text-gray-700">
                      {row[3]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400">
            Composite cutoffs are estimates based on 2025 released data. College
            Board adjusts them ±3–4 points each year based on exam difficulty.
            Use these as planning benchmarks, not guarantees.
          </p>
        </section>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How to Use This APUSH Score Calculator
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Four steps. Takes about two minutes after you finish scoring your
            practice test.
          </p>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title:
                  "Take a full-length APUSH practice exam under timed conditions",
                desc: "College Board releases free practice exams on AP Classroom. Use those first — they're written by the same people who write the real exam. Take Section I (MCQ + SAQ) for 95 minutes and Section II (DBQ + LEQ) for 100 minutes without stopping. The more realistic the conditions, the more useful the score estimate.",
              },
              {
                step: "2",
                title: "Score each section using the official rubrics",
                desc: "MCQ is straightforward — count correct answers out of 55. SAQ has three parts per question (a, b, c), worth 1 point each, for a max of 9. DBQ is scored 0–7 using the official rubric: thesis, contextualization, document evidence, outside evidence, sourcing, and complexity. LEQ is 0–6: thesis, contextualization, evidence, and analysis. Be honest — inflating your score defeats the purpose.",
              },
              {
                step: "3",
                title: "Enter your four raw scores above",
                desc: "Type each section score into the corresponding field. You don't need to know the weighted scores or do any math — the calculator converts everything automatically using the official 2026 section weights (MCQ 40%, SAQ 20%, DBQ 25%, LEQ 15%).",
              },
              {
                step: "4",
                title: "Read the breakdown, not just the final number",
                desc: "The composite score and predicted AP score (1–5) are at the top. Below that, each section shows exactly how many weighted points you earned and what percentage you hit. The study tips at the bottom are generated based on your weakest section. That's where to spend your next study session.",
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

        {/* ─── Scoring Formula ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How APUSH Is Scored — The Full Formula Explained
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            College Board doesn't publish the exact conversion math, but here's
            how the scoring works based on the official section weights.
          </p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                The Composite Score Formula (0–130)
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                MCQ: (correct/55) × 52 pts{"\n"}
                SAQ: (raw/9) × 26 pts{"\n"}
                DBQ: (raw/7) × 32.5 pts{"\n"}
                LEQ: (raw/6) × 19.5 pts{"\n"}
                ─────────────────────{"\n"}
                Composite = sum of all four (max 130)
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Each section's raw score gets converted to its share of the
                130-point composite based on the official weight. MCQ earns up
                to 52 points (40%), DBQ earns up to 32.5 points (25%), SAQ up to
                26 points (20%), and LEQ up to 19.5 points (15%).
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Why DBQ Is Your Biggest Opportunity
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                The DBQ is worth 25% of your total score — more than any other
                single section except MCQ. Going from a 3/7 on the DBQ to a 5/7
                adds roughly 9.3 composite points. That's the same as answering
                11 additional MCQ questions correctly. Students who practice DBQ
                rubric points — especially sourcing and contextualization, which
                are the most commonly missed — see the fastest score
                improvements.
              </p>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
              <h3 className="font-bold text-indigo-900 text-sm mb-2">
                What Score Do You Need for a 4 or 5?
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                For a 5 on APUSH, you typically need around 70–75% of all
                available composite points — roughly 91–98 out of 130. In
                practice that means: 45+ correct on MCQ, 7–8 SAQ points, 5–6 DBQ
                points, and 4–5 LEQ points. For a 4, you need about 80–99
                composite, which usually looks like 38–43 MCQ, 6–7 SAQ, 4–5 DBQ,
                and 3–4 LEQ.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            APUSH Score Calculation Examples — Walk Through the Math
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Three realistic practice test scenarios showing exactly how raw
            scores convert to a predicted AP score.
          </p>

          <div className="space-y-5">
            {[
              {
                label: "Example 1",
                labelColor: "bg-emerald-100 text-emerald-700",
                title: "Strong All-Around — Targeting a 5",
                inputs: [
                  ["MCQ", "48/55"],
                  ["SAQ", "8/9"],
                  ["DBQ", "6/7"],
                  ["LEQ", "5/6"],
                ],
                calc: "(48/55)×52 + (8/9)×26 + (6/7)×32.5 + (5/6)×19.5",
                result: "45.3 + 23.1 + 27.9 + 16.3 = 112.6 composite",
                score: "AP 5",
                scoreColor: "text-emerald-700",
                note: "This is a very strong performance. The 48/55 on MCQ is the foundation — without it, the great essays alone wouldn't reach a 5.",
              },
              {
                label: "Example 2",
                labelColor: "bg-blue-100 text-blue-700",
                title: "Good MCQ, Average Essays — AP 4",
                inputs: [
                  ["MCQ", "42/55"],
                  ["SAQ", "6/9"],
                  ["DBQ", "5/7"],
                  ["LEQ", "4/6"],
                ],
                calc: "(42/55)×52 + (6/9)×26 + (5/7)×32.5 + (4/6)×19.5",
                result: "39.7 + 17.3 + 23.2 + 13.0 = 93.2 composite",
                score: "AP 4",
                scoreColor: "text-blue-700",
                note: "Classic solid AP 4. Improving the DBQ from 5 to 6 would add 4.6 composite points — pushing toward the 5 threshold.",
              },
              {
                label: "Example 3",
                labelColor: "bg-yellow-100 text-yellow-700",
                title: "Uneven Performance — Borderline AP 3",
                inputs: [
                  ["MCQ", "33/55"],
                  ["SAQ", "5/9"],
                  ["DBQ", "4/7"],
                  ["LEQ", "3/6"],
                ],
                calc: "(33/55)×52 + (5/9)×26 + (4/7)×32.5 + (3/6)×19.5",
                result: "31.2 + 14.4 + 18.6 + 9.8 = 74.0 composite",
                score: "AP 3",
                scoreColor: "text-yellow-700",
                note: "At 74 composite, this is solidly in the 3 range but not near a 4. The MCQ at 33/55 (60%) is the main limiting factor — that's where to focus practice time.",
              },
            ].map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-sm font-bold px-2.5 py-1 rounded-lg ${item.labelColor}`}
                  >
                    {item.label}
                  </span>
                  <h3 className="font-bold text-gray-900 text-sm">
                    {item.title}
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                  {item.inputs.map(([label, val], j) => (
                    <div key={j} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-[11px] text-gray-400 uppercase font-bold">
                        {label}
                      </p>
                      <p className="text-sm font-bold text-gray-900">{val}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-900 text-green-400 font-mono text-xs px-4 py-2 rounded-lg mb-2">
                  {item.calc}
                </div>
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 mb-2">
                  <p className="text-xs text-gray-600">
                    {item.result} →{" "}
                    <span className={`font-bold ${item.scoreColor}`}>
                      {item.score}
                    </span>
                  </p>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── DBQ and LEQ Tips ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How to Score Higher on APUSH DBQ and LEQ — Rubric Breakdown
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            The free response sections are where most students leave points on
            the table. Here's exactly what the rubric rewards and the most
            commonly missed points.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-3">
                DBQ Rubric — 7 Points Total
              </h3>
              <div className="space-y-2">
                {[
                  [
                    "Thesis/Claim",
                    "1 pt",
                    "Must make a historically defensible claim that establishes a line of reasoning",
                  ],
                  [
                    "Contextualization",
                    "1 pt",
                    "Explain broader context before, during, or after — most commonly missed point",
                  ],
                  [
                    "Evidence: Documents",
                    "2 pts",
                    "Use content of 3+ docs (1 pt) or use 6+ docs with explanation (2 pts)",
                  ],
                  [
                    "Evidence: Beyond Docs",
                    "1 pt",
                    "Use at least one piece of specific outside evidence not in the documents",
                  ],
                  [
                    "Analysis & Reasoning",
                    "1 pt",
                    "Sourcing, corroboration, or situating the argument",
                  ],
                  [
                    "Complexity",
                    "1 pt",
                    "Demonstrate complex understanding — hardest point, often worth attempting",
                  ],
                ].map(([title, pts, desc], j) => (
                  <div key={j} className="flex gap-3 text-xs">
                    <span className="font-bold text-indigo-600 whitespace-nowrap">
                      {pts}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-800">{title}</p>
                      <p className="text-gray-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-3">
                LEQ Rubric — 6 Points Total
              </h3>
              <div className="space-y-2">
                {[
                  [
                    "Thesis/Claim",
                    "1 pt",
                    "Respond to the prompt with a defensible thesis that establishes a line of reasoning",
                  ],
                  [
                    "Contextualization",
                    "1 pt",
                    "Describe a broader historical context — same as DBQ, often missed",
                  ],
                  [
                    "Evidence",
                    "2 pts",
                    "Use specific examples (1 pt) or use specific examples with explanation (2 pts)",
                  ],
                  [
                    "Analysis & Reasoning",
                    "2 pts",
                    "Demonstrate the historical reasoning skill — causation, comparison, or CCOT",
                  ],
                ].map(([title, pts, desc], j) => (
                  <div key={j} className="flex gap-3 text-xs">
                    <span className="font-bold text-indigo-600 whitespace-nowrap">
                      {pts}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-800">{title}</p>
                      <p className="text-gray-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-indigo-50 rounded-lg p-3">
                <p className="text-xs text-indigo-700 font-medium">
                  Pro tip: Choose the LEQ prompt on the topic you know best —
                  causation, comparison, or continuity and change over time. You
                  get to pick, so use that advantage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Who Uses This ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses This APUSH Score Predictor?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Not just students cramming the night before — here's who actually
            finds this useful.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <GraduationCap size={20} className="text-indigo-600" />,
                title: "Students Taking Practice Tests",
                desc: "The most direct use case. After every full practice exam, plug in your scores and see where you stand. The section-by-section breakdown tells you exactly where you're losing points — so you know what to study next instead of reviewing everything randomly.",
              },
              {
                icon: <FileText size={20} className="text-green-600" />,
                title: "AP Teachers and Instructors",
                desc: "If you're grading practice exams for a class, this calculator converts raw section scores to estimated AP scores instantly. Useful for giving students a concrete target and for identifying which sections your class as a whole needs more work on.",
              },
              {
                icon: <Target size={20} className="text-amber-600" />,
                title: "Tutors Planning Study Sessions",
                desc: "When a student brings in practice test results, this tool shows you in seconds whether the problem is MCQ content knowledge, essay structure, or document analysis skills — so you can focus your session on the highest-impact work.",
              },
              {
                icon: <Clock size={20} className="text-violet-600" />,
                title: "Students Setting Score Goals",
                desc: "Want to know exactly what you need to hit a 4? Enter your current scores, then adjust the sliders mentally: 'what if I improve my DBQ from 4 to 6?' The composite math shows you what's achievable and which improvements move the needle most.",
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
            APUSH Score Calculator — Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              {
                q: "How accurate is this APUSH score calculator?",
                a: "It's accurate enough for planning purposes. The section weights (MCQ 40%, SAQ 20%, DBQ 25%, LEQ 15%) are official College Board figures. The composite cutoffs are estimates based on 2025 released scoring data — College Board adjusts them by ±3–4 points each year based on exam difficulty. If you score an 82 composite, you're likely looking at a 4, but the actual cutoff that year might be 79 or 85. Use it as a guide, not a guarantee.",
              },
              {
                q: "What is a good APUSH score for college credit?",
                a: "Most colleges accept a 3 as the minimum for AP credit. State universities and large public schools generally grant credit for a 3. Selective private universities often require a 4 or 5. Ivy League schools and some top liberal arts colleges may not grant history credit at all, regardless of score — they prefer students take their own courses. Check each school's AP credit policy on the College Board website before setting your target.",
              },
              {
                q: "What score do I need for a 5 on APUSH in 2026?",
                a: "Based on 2025 data, you typically need around 100–130 composite points for a 5. In practice that means: 45+ correct on MCQ (out of 55), 7–8 SAQ points (out of 9), 5–6 DBQ points (out of 7), and 4–5 LEQ points (out of 6). Only 14% of students earned a 5 in 2025, so it's a genuinely high bar — but achievable with strong MCQ performance and solid essay rubric execution.",
              },
              {
                q: "Is the 2026 APUSH exam digital?",
                a: "Yes. Since May 2025, APUSH has been fully digital through College Board's Bluebook app. You type all essays instead of handwriting them. The format, timing, section weights, and rubrics are identical to the paper exam. One practical implication: practice typing your essays if you're not used to writing analytical paragraphs on a keyboard under time pressure.",
              },
              {
                q: "What's the difference between DBQ and LEQ on APUSH?",
                a: "The DBQ gives you 7 primary or secondary source documents and asks you to write an argument using them plus outside historical knowledge. The rubric specifically scores document use, sourcing, and outside evidence. The LEQ gives you a choice between two prompts (you pick one) and asks you to write a full argument without any provided documents — just your own knowledge. Both test historical thinking skills, but DBQ is more structured and worth 25% vs. LEQ's 15%.",
              },
              {
                q: "Is there a penalty for wrong answers on APUSH MCQ?",
                a: "No. As of recent years, there is no penalty for incorrect answers on the APUSH multiple-choice section. Always answer every single question — never leave blanks. With 4 answer choices per question, a random guess gives you a 25% chance. On a 55-question section, guessing on the 10 hardest questions will statistically earn you about 2–3 extra points compared to leaving them blank.",
              },
              {
                q: "I got an AP 3 on the practice test. How do I get to a 4?",
                a: "First, look at your section breakdown. A 3 typically means you're in the 60–79 composite range. The fastest path to a 4 (80+) depends on your weakest section. If MCQ is below 60%, that's where to focus — it's 40% of your score and a 10-point improvement in MCQ adds roughly 9.5 composite points. If essays are weak, work specifically on the DBQ rubric points — contextualization and sourcing are the most commonly missed and directly teachable.",
              },
              {
                q: "Can this calculator work for AP World History or AP European History?",
                a: "No — World and Euro have different exam structures with different MCQ counts, different essay formats, and different point weights. Using this calculator for those exams would give you incorrect results. This calculator is built specifically for AP US History (APUSH). The scoring structure is meaningfully different across AP History exams.",
              },
              {
                q: "Do colleges see my composite score or just the 1–5?",
                a: "Just the 1–5 AP score. When you send scores through College Board, they only transmit the final 1–5. Colleges never see your raw section scores, composite number, or percentile. So when reporting to a school, you simply say 'I scored a 4 on AP US History' — the internal math is invisible to admissions.",
              },
              {
                q: "What was the average APUSH score in 2025?",
                a: "The mean AP US History score in 2025 was 3.23, with a pass rate (score 3 or higher) of approximately 73%. Score distribution: 5 = 14%, 4 = 36%, 3 = 23%, 2 = 19%, 1 = 8%. Over 516,000 students took the exam. The 4-score percentage jumped dramatically from 15.9% in 2021 to 36% in 2025 — one of the biggest year-over-year improvements in recent AP history.",
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
            Related Calculators
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/percentage-calculator",
                title: "Percentage Calculator",
                desc: "Calculate what percentage of MCQ questions you need correct to hit your target composite score.",
              },
              {
                href: "/tools/excel-formula-beautifier",
                title: "Excel Formula Beautifier",
                desc: "Format and beautify your Excel formulas for better readability and debugging.",
              },
              {
                href: "/tools/racine-carree-calculator",
                title: "Racine Carree Calculator",
                desc: "Calculate square roots instantly — real & imaginary numbers.",
              },
              {
                href: "/tools/age-calculator",
                title: "Age Calculator",
                desc: "Calculate exact age or date differences — useful for historical context questions in APUSH.",
              },
              {
                href: "/tools/word-counter",
                title: "Word Counter",
                desc: "Check the length and word count of your DBQ and LEQ essays before the exam.",
              },
              {
                href: "/tools/profit-margin-calculator",
                title: "Profit Margin Calculator",
                desc: "Connects to economic history themes — industrialization, commerce, and capitalism in APUSH Periods 6–9.",
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
