"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  Calculator, Copy, RefreshCw, Home, ChevronDown,
  CheckCircle, AlertTriangle, Info, BookOpen, Target,
  TrendingUp, Sparkles
} from "lucide-react";

// ─── APUSH Scoring Logic (2024-2026 Exam Structure) ─────────────────────────
// Section weights: MCQ 50%, SAQ 20%, DBQ 25%, LEQ 15%
// Total composite scale: 0-115 (then mapped to AP 1-5)

function calculateAPUSHScore(inputs) {
  const { mcq, saq, dbq, leq } = inputs;
  
  // Validate inputs
  if (mcq < 0 || mcq > 55) return { error: "MCQ score must be 0-55" };
  if (saq < 0 || saq > 9) return { error: "SAQ score must be 0-9" };
  if (dbq < 0 || dbq > 7) return { error: "DBQ score must be 0-7" };
  if (leq < 0 || leq > 6) return { error: "LEQ score must be 0-6" };

  // Weighted calculations
  const mcqWeighted = mcq * 1.0;           // 55 max × 1.0 = 55 points (50%)
  const saqWeighted = saq * (20 / 9);      // 9 max × 2.222 = 20 points (20%)
  const dbqWeighted = dbq * (25 / 7);      // 7 max × 3.571 = 25 points (25%)
  const leqWeighted = leq * (15 / 6);      // 6 max × 2.5 = 15 points (15%)
  
  const composite = mcqWeighted + saqWeighted + dbqWeighted + leqWeighted;
  const compositeRounded = Math.round(composite * 10) / 10; // 1 decimal
  
  // AP Score mapping (based on historical cutoffs, approximate)
  let apScore, apLabel, color;
  if (composite >= 86) { apScore = 5; apLabel = "Extremely Well Qualified"; color = "text-emerald-600"; }
  else if (composite >= 69) { apScore = 4; apLabel = "Well Qualified"; color = "text-blue-600"; }
  else if (composite >= 52) { apScore = 3; apLabel = "Qualified"; color = "text-yellow-600"; }
  else if (composite >= 38) { apScore = 2; apLabel = "Possibly Qualified"; color = "text-orange-600"; }
  else { apScore = 1; apLabel = "No Recommendation"; color = "text-red-600"; }
  
  // Percentage breakdown
  const breakdown = {
    mcq: { raw: mcq, max: 55, weighted: mcqWeighted.toFixed(1), percent: ((mcqWeighted / 55) * 100).toFixed(0) },
    saq: { raw: saq, max: 9, weighted: saqWeighted.toFixed(1), percent: ((saqWeighted / 20) * 100).toFixed(0) },
    dbq: { raw: dbq, max: 7, weighted: dbqWeighted.toFixed(1), percent: ((dbqWeighted / 25) * 100).toFixed(0) },
    leq: { raw: leq, max: 6, weighted: leqWeighted.toFixed(1), percent: ((leqWeighted / 15) * 100).toFixed(0) },
  };
  
  // Tips based on performance
  const tips = [];
  if (breakdown.mcq.percent < 60) tips.push("Focus on MCQ practice: review key historical periods, cause/effect relationships, and primary source analysis.");
  if (breakdown.saq.percent < 60) tips.push("Practice SAQs: answer all 3 parts clearly, use specific historical evidence, stay within time limits.");
  if (breakdown.dbq.percent < 60) tips.push("Improve DBQ skills: craft a strong thesis, use 6+ documents, add outside evidence, analyze sourcing.");
  if (breakdown.leq.percent < 60) tips.push("Strengthen LEQ writing: develop clear argument, use specific examples, show causation/continuity/change.");
  if (tips.length === 0) tips.push("Great job! Keep practicing with timed full-length exams to maintain your score.");
  
  return {
    composite: compositeRounded,
    compositeMax: 115,
    apScore,
    apLabel,
    color,
    breakdown,
    tips,
    inputSummary: `MCQ: ${mcq}/55 | SAQ: ${saq}/9 | DBQ: ${dbq}/7 | LEQ: ${leq}/6`
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
    setInputs(prev => ({ ...prev, [field]: num }));
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
${result.tips.map(t => `• ${t}`).join('\n')}`;
    
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
              <Link href="/" className="inline-flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                <Home size={14} /> Home
              </Link>
            </li>
            <li><span className="text-gray-300">/</span></li>
            <li>
              <Link href="/pages/all-tools" className="hover:text-indigo-600 transition-colors">All Tools</Link>
            </li>
            <li><span className="text-gray-300">/</span></li>
            <li><span className="text-gray-900 font-semibold">APUSH Score Calculator</span></li>
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
            APUSH Score Calculator — <span className="text-indigo-600">Estimate Your AP Exam Score (1-5)</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Calculate your estimated <strong>AP U.S. History</strong> exam score. Enter MCQ, SAQ, DBQ & LEQ results to get instant composite score, AP grade prediction (1-5), and personalized study tips.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          {/* Input Grid */}
          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Section I, Part A: Multiple Choice (0-55)
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
              <p className="text-xs text-gray-400 mt-1">55 questions • 50% of exam</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Section I, Part B: Short Answer (0-9)
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
              <p className="text-xs text-gray-400 mt-1">3 questions × 3 pts each • 20% of exam</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Section II, Part A: DBQ (0-7)
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
              <p className="text-xs text-gray-400 mt-1">Document-Based Question • 25% of exam</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Section II, Part B: LEQ (0-6)
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
              <p className="text-xs text-gray-400 mt-1">Long Essay Question • 15% of exam</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={calculate}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
            >
              <Calculator size={18}/> Calculate AP Score
            </button>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
            >
              <RefreshCw size={15}/> Reset
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertTriangle size={16} className="text-red-600 flex-shrink-0 mt-0.5"/>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Result Section */}
          {result && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-6">
              {/* Main Score Display */}
              <div className="text-center py-4 mb-5">
                <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Estimated AP Score</p>
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-indigo-200`}>
                  <Target size={24} className={result.color} />
                  <div className="text-left">
                    <p className={`text-4xl font-bold ${result.color}`}>{result.apScore}</p>
                    <p className="text-sm text-gray-600">{result.apLabel}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">Composite Score: {result.composite}/{result.compositeMax}</p>
              </div>

              {/* Section Breakdown */}
              <div className="space-y-3 mb-5">
                {[
                  { label: "Multiple Choice (MCQ)", data: result.breakdown.mcq, maxWeight: 55 },
                  { label: "Short Answer (SAQ)", data: result.breakdown.saq, maxWeight: 20 },
                  { label: "Document-Based Question (DBQ)", data: result.breakdown.dbq, maxWeight: 25 },
                  { label: "Long Essay Question (LEQ)", data: result.breakdown.leq, maxWeight: 15 },
                ].map((section, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 border border-indigo-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{section.label}</span>
                      <span className="text-sm font-semibold text-indigo-600">
                        {section.data.weighted}/{section.maxWeight} pts ({section.data.percent}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${getBarColor(section.data.percent)}`} style={{ width: `${Math.min(parseInt(section.data.percent), 100)}%` }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Raw: {section.data.raw}/{section.data.max}</p>
                  </div>
                ))}
              </div>

              {/* Study Tips */}
              <div className="bg-white rounded-lg p-4 border border-indigo-100">
                <h4 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-600"/> Personalized Study Tips
                </h4>
                <ul className="space-y-1.5">
                  {result.tips.map((tip, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <CheckCircle size={14} className="text-emerald-500 mt-0.5 flex-shrink-0"/>
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
                  <Copy size={15}/> {copied ? "Copied!" : "Copy Results"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* How APUSH Scoring Works */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How APUSH Scoring Works (2024-2026)</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The AP U.S. History exam has four sections, each weighted differently. Your raw scores are converted to a <strong>composite score (0-115)</strong>, which is then mapped to the final AP score (1-5).
          </p>
          
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm text-left border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-4 py-3 font-bold">Section</th>
                  <th className="px-4 py-3 font-bold">Raw Score Range</th>
                  <th className="px-4 py-3 font-bold">Weight</th>
                  <th className="px-4 py-3 font-bold">Weighted Max</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="text-gray-600"><td className="px-4 py-3 font-medium">Multiple Choice (55 Qs)</td><td className="px-4 py-3">0-55</td><td className="px-4 py-3">50%</td><td className="px-4 py-3">55 pts</td></tr>
                <tr className="text-gray-600"><td className="px-4 py-3 font-medium">Short Answer (3 Qs)</td><td className="px-4 py-3">0-9</td><td className="px-4 py-3">20%</td><td className="px-4 py-3">20 pts</td></tr>
                <tr className="text-gray-600"><td className="px-4 py-3 font-medium">DBQ (1 Essay)</td><td className="px-4 py-3">0-7</td><td className="px-4 py-3">25%</td><td className="px-4 py-3">25 pts</td></tr>
                <tr className="text-gray-600"><td className="px-4 py-3 font-medium">LEQ (1 Essay)</td><td className="px-4 py-3">0-6</td><td className="px-4 py-3">15%</td><td className="px-4 py-3">15 pts</td></tr>
                <tr className="bg-indigo-50 font-bold text-indigo-700"><td className="px-4 py-3">Total</td><td className="px-4 py-3">—</td><td className="px-4 py-3">100%</td><td className="px-4 py-3">115 pts</td></tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-gray-600 leading-relaxed">
            The composite score is then converted to an AP score using historical cutoffs. Note: exact cutoffs vary yearly based on exam difficulty and student performance.
          </p>
        </section>

        {/* AP Score Meaning */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Do AP Scores Mean?</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { score: 5, label: "Extremely Well Qualified", desc: "Equivalent to an A in the corresponding college course. Most colleges grant credit or advanced placement." },
              { score: 4, label: "Well Qualified", desc: "Equivalent to A-, B+, or B in college. Many colleges grant credit or placement." },
              { score: 3, label: "Qualified", desc: "Equivalent to B-, C+, or C in college. Some colleges grant credit or placement." },
              { score: 2, label: "Possibly Qualified", desc: "Equivalent to C- or below. Rarely grants college credit." },
              { score: 1, label: "No Recommendation", desc: "Not equivalent to passing college-level work." },
            ].map((item) => (
              <div key={item.score} className={`rounded-xl p-5 border ${item.score >= 3 ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-2xl font-bold ${item.score >= 3 ? 'text-emerald-600' : 'text-gray-600'}`}>{item.score}</span>
                  <span className="font-semibold text-gray-900">{item.label}</span>
                </div>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips for Better Score */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tips to Improve Your APUSH Score</h2>
          <div className="space-y-4 text-gray-600">
            <div className="flex items-start gap-3">
              <Target className="text-indigo-500 mt-1 flex-shrink-0"/>
              <div>
                <p className="font-semibold text-gray-900">Master the Periods</p>
                <p className="text-sm">Focus on the 9 historical periods (1491-present). Know key events, themes, and cause/effect relationships for each.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Target className="text-indigo-500 mt-1 flex-shrink-0"/>
              <div>
                <p className="font-semibold text-gray-900">Practice DBQ & LEQ Writing</p>
                <p className="text-sm">Use the rubric: strong thesis, document analysis, outside evidence, and complex understanding. Time yourself!</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Target className="text-indigo-500 mt-1 flex-shrink-0"/>
              <div>
                <p className="font-semibold text-gray-900">Review Primary Sources</p>
                <p className="text-sm">APUSH heavily tests document analysis. Practice sourcing, contextualizing, and corroborating historical documents.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Target className="text-indigo-500 mt-1 flex-shrink-0"/>
              <div>
                <p className="font-semibold text-gray-900">Take Full-Length Practice Exams</p>
                <p className="text-sm">Simulate test conditions. Review mistakes thoroughly — understanding why you missed a question is key to improvement.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">APUSH Score Calculator — FAQs</h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              { q: "How accurate is this APUSH score calculator?", a: "This tool uses official College Board section weights and historical composite-to-AP score mappings. However, actual exam cutoffs vary yearly. Use this as an estimate, not a guarantee." },
              { q: "What is a good APUSH score?", a: "A score of 3+ is considered 'passing' and may earn college credit. A 4 or 5 is competitive for selective colleges. Aim for 69+ composite for a 4, or 86+ for a 5." },
              { q: "How do I find my raw scores?", a: "After a practice exam: MCQ = number correct (no penalty for wrong). SAQ = points earned per rubric (0-3 each). DBQ/LEQ = score using official rubrics (DBQ 0-7, LEQ 0-6)." },
              { q: "Does this calculator work for other AP exams?", a: "This tool is specific to AP U.S. History. Other AP exams have different structures and scoring. We're adding more AP calculators soon!" },
              { q: "Can I use this during the real AP exam?", a: "No — this is for practice and study planning only. The real AP exam is proctored and does not allow external tools." },
              { q: "Why is my composite score out of 115, not 100?", a: "The composite scale (0-115) reflects the weighted sum of all sections. It's then converted to the 1-5 AP scale. Don't compare it directly to a percentage." },
            ].map((item, i) => (
              <div key={i} className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-indigo-200 transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <h3 className="text-base md:text-lg font-bold text-gray-900 pr-4">{item.q}</h3>
                  <ChevronDown size={22} className={`text-indigo-500 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Education & Study Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/tools/gpa-calculator", title: "GPA Calculator", desc: "Calculate your high school or college GPA with course weights." },
              { href: "/tools/grade-calculator", title: "Final Grade Calculator", desc: "Find out what score you need on your final to reach your target grade." },
              { href: "/tools/study-timer", title: "Study Timer (Pomodoro)", desc: "Focus with timed study sessions and break reminders." },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-indigo-400 transition-all"
              >
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-indigo-600">
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