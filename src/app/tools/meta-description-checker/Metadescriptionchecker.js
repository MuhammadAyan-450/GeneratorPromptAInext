'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FileText, Copy, RefreshCw, Home, ChevronDown,
  CheckCircle, AlertTriangle, XCircle, Sparkles,
  Search, Globe, Info, BarChart2, Eye, Shield, Zap, HelpCircle
} from 'lucide-react'

import ResponsiveAd from "../../../components/ResponsiveAd";


// ─── Pixel width estimator ────────────────────────────────────────────────────
function estimatePixelWidth(text) {
  let width = 0
  for (const char of text) {
    if ('fijlrt!|'.includes(char)) width += 5.5
    else if ('mwMW'.includes(char)) width += 13
    else if ('ABCDEFGHIJKLNOPQRSUVXYZ'.includes(char)) width += 10.5
    else if (char === ' ') width += 4
    else width += 8.5
  }
  return Math.round(width)
}

const DESKTOP_MAX_PX = 960
const MOBILE_MAX_PX = 680
const IDEAL_MIN = 120
const IDEAL_MAX = 158

function analyzeDescription(text) {
  if (!text.trim()) return null

  const chars = text.length
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const pxDesktop = estimatePixelWidth(text)
  const pxMobile = estimatePixelWidth(text)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length

  // Check for power words
  const powerWords = ['free', 'best', 'easy', 'fast', 'instant', 'top', 'proven', 'trusted', 'online', 'simple', 'quick', 'new', 'now', 'get', 'try', 'no signup', 'no login']
  const foundPowerWords = powerWords.filter(w => text.toLowerCase().includes(w))

  // Check for CTA
  const ctaWords = ['learn more', 'try now', 'get started', 'discover', 'find out', 'start', 'download', 'explore', 'see', 'check']
  const hasCTA = ctaWords.some(w => text.toLowerCase().includes(w))

  // Check for numbers
  const hasNumbers = /\d/.test(text)

  // Score
  let score = 0
  let issues = []
  let good = []

  // Length check
  if (chars < IDEAL_MIN) { score += 10; issues.push({ type: 'error', msg: `Too short (${chars} chars). Aim for 120-158 characters.` }) }
  else if (chars > IDEAL_MAX && chars <= 170) { score += 60; issues.push({ type: 'warning', msg: `Slightly long (${chars} chars). May be truncated on some devices.` }) }
  else if (chars > 170) { score += 20; issues.push({ type: 'error', msg: `Too long (${chars} chars). Will be cut off in Google results.` }) }
  else { score += 100; good.push('Perfect length — will display in full on desktop and mobile.') }

  // Power words
  if (foundPowerWords.length === 0) { issues.push({ type: 'warning', msg: 'No power words found. Add words like "free", "best", or "instant" to boost CTR.' }) }
  else { score += 20; good.push(`Contains ${foundPowerWords.length} power word(s): ${foundPowerWords.slice(0, 3).join(', ')}.`) }

  // CTA
  if (!hasCTA) { issues.push({ type: 'info', msg: 'No call-to-action detected. Adding one (e.g. "Try now", "Learn more") improves clicks.' }) }
  else { score += 10; good.push('Contains a call-to-action — great for click-through rate!') }

  // Numbers
  if (hasNumbers) { score += 10; good.push('Contains numbers — numbers in descriptions increase CTR.') }

  // Duplicate words check
  const wordArr = text.toLowerCase().match(/\b\w+\b/g) || []
  const freq = {}
  wordArr.forEach(w => { if (w.length > 3) freq[w] = (freq[w] || 0) + 1 })
  const duplicates = Object.entries(freq).filter(([, c]) => c > 2).map(([w]) => w)
  if (duplicates.length > 0) {
    issues.push({ type: 'warning', msg: `Word "${duplicates[0]}" repeated too many times. Avoid keyword stuffing.` })
  }

  const finalScore = Math.min(Math.round(score), 100)

  return {
    chars, words, pxDesktop, pxMobile, sentences,
    foundPowerWords, hasCTA, hasNumbers,
    score: finalScore, issues, good,
    desktopStatus: pxDesktop > DESKTOP_MAX_PX ? 'truncated' : 'full',
    mobileStatus: pxMobile > MOBILE_MAX_PX ? 'truncated' : 'full',
  }
}

const scoreColor = (s) => {
  if (s >= 80) return { text: 'text-green-600', bg: 'bg-green-500', ring: 'ring-green-100', label: 'Excellent', badge: 'bg-green-50 text-green-700 border-green-200' }
  if (s >= 60) return { text: 'text-yellow-600', bg: 'bg-yellow-500', ring: 'ring-yellow-100', label: 'Good', badge: 'bg-yellow-50 text-yellow-700 border-yellow-200' }
  if (s >= 30) return { text: 'text-orange-600', bg: 'bg-orange-500', ring: 'ring-orange-100', label: 'Needs Work', badge: 'bg-orange-50 text-orange-700 border-orange-200' }
  return { text: 'text-red-600', bg: 'bg-red-500', ring: 'ring-red-100', label: 'Poor', badge: 'bg-red-50 text-red-700 border-red-200' }
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MetaDescriptionChecker() {
  const [text, setText] = useState('')
  const [keyword, setKeyword] = useState('')
  const [copied, setCopied] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [view, setView] = useState('desktop')

  const result = analyzeDescription(text)
  const sc = result ? scoreColor(result.score) : null

  // Keyword check
  const keywordFound = keyword.trim()
    ? text.toLowerCase().includes(keyword.toLowerCase().trim())
    : null

  // Display description (truncated if too long)
  const displayDesc = (maxPx) => {
    const px = estimatePixelWidth(text)
    if (px > maxPx) {
      const ratio = maxPx / px
      return text.slice(0, Math.floor(text.length * ratio)) + '...'
    }
    return text
  }

  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => { setText(''); setKeyword('') }

  const charCount = text.length
  const charColor = !result ? 'text-gray-400'
    : charCount < IDEAL_MIN ? 'text-red-600'
    : charCount > 170 ? 'text-red-600'
    : charCount > IDEAL_MAX ? 'text-yellow-600'
    : 'text-green-600'

  const barColor = !result ? 'bg-gray-200'
    : charCount < IDEAL_MIN ? 'bg-red-400'
    : charCount > 170 ? 'bg-red-500'
    : charCount > IDEAL_MAX ? 'bg-yellow-500'
    : 'bg-green-500'

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
            <li><span className="text-gray-900 font-semibold">Meta Description Checker</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-5xl mx-auto w-full px-4 pb-20">

        {/* ── Hero ── */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <FileText className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Free Meta Description Checker –{" "}
            <span className="text-sky-600">Check SEO Score & Length Instantly</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Analyze your meta description length, pixel width, power words, CTR score and keyword placement — all in real-time. No signup needed.
          </p>
        </div>

        <ResponsiveAd />

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-8">

          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-sky-600 rounded-xl flex items-center justify-center">
                <FileText size={15} className="text-white" />
              </div>
              <span className="font-semibold text-gray-800">Meta Description Analyzer</span>
            </div>
            <div className="flex gap-2">
              <button onClick={copy} disabled={!text} className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 rounded-xl text-xs font-medium text-gray-700 transition-colors shadow-sm">
                <Copy size={13} /> {copied ? '✓ Copied!' : 'Copy Text'}
              </button>
              <button onClick={reset} className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-medium text-gray-700 transition-colors shadow-sm">
                <RefreshCw size={13} /> Reset
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

            {/* LEFT — Input (3 cols) */}
            <div className="lg:col-span-3 p-6 md:p-8 flex flex-col gap-5">

              {/* Textarea */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Meta Description</label>
                  <span className={`text-xs font-semibold ${charColor}`}>
                    {charCount} / 158 chars
                  </span>
                </div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste or type your meta description here to analyze it instantly..."
                  rows={5}
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm text-gray-800 resize-none bg-gray-50/50 leading-relaxed"
                />
                {/* Progress bar */}
                <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                    style={{ width: `${Math.min((charCount / 170) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1.5 text-xs text-gray-400">
                  <span>0</span>
                  <span className="text-green-600 font-medium">120 (min)</span>
                  <span className="text-green-600 font-medium">158 (ideal)</span>
                  <span className="text-red-500">170+ (too long)</span>
                </div>
              </div>

              {/* Keyword input */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Target Keyword <span className="text-gray-400 normal-case font-normal">(optional — check if included)</span>
                </label>
                <div className="relative">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="e.g. free meta description checker"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm text-gray-800 bg-gray-50/50"
                  />
                </div>
                {keyword.trim() && text && (
                  <div className={`mt-2 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border ${keywordFound ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    {keywordFound
                      ? <><CheckCircle size={12} /> Keyword found in description ✅</>
                      : <><XCircle size={12} /> Keyword NOT found — add it for better SEO ❌</>
                    }
                  </div>
                )}
              </div>

              {/* Quick stats row */}
              {result && (
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: 'Characters', value: result.chars, sub: `/ 158 ideal` },
                    { label: 'Words', value: result.words, sub: 'words' },
                    { label: 'Desktop px', value: result.pxDesktop, sub: `/ ${DESKTOP_MAX_PX}px max` },
                    { label: 'Mobile px', value: result.pxMobile, sub: `/ ${MOBILE_MAX_PX}px max` },
                  ].map((s, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                      <p className="text-base font-bold text-gray-800">{s.value}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-tight">{s.label}</p>
                      <p className="text-xs text-gray-400 leading-tight">{s.sub}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Issues & Good */}
              {result && (
                <div className="space-y-2">
                  {result.issues.map((issue, i) => (
                    <div key={i} className={`flex items-start gap-2.5 px-4 py-3 rounded-xl border text-sm ${
                      issue.type === 'error' ? 'bg-red-50 border-red-200 text-red-700'
                      : issue.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-700'
                      : 'bg-blue-50 border-blue-200 text-blue-700'
                    }`}>
                      {issue.type === 'error' ? <XCircle size={15} className="flex-shrink-0 mt-0.5" />
                        : issue.type === 'warning' ? <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" />
                        : <Info size={15} className="flex-shrink-0 mt-0.5" />}
                      <span>{issue.msg}</span>
                    </div>
                  ))}
                  {result.good.map((g, i) => (
                    <div key={i} className="flex items-start gap-2.5 px-4 py-3 rounded-xl border bg-green-50 border-green-200 text-green-700 text-sm">
                      <CheckCircle size={15} className="flex-shrink-0 mt-0.5" />
                      <span>{g}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button onClick={copy} disabled={!text} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-40">
                  <Copy size={18} /> {copied ? 'Copied!' : 'Copy Text'}
                </button>
                <button onClick={reset} className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  <RefreshCw size={18} /> Reset
                </button>
              </div>
            </div>

            {/* RIGHT — Score + Preview (2 cols) */}
            <div className="lg:col-span-2 p-6 md:p-8 bg-gray-50/40 flex flex-col gap-5">

              {/* Score Ring */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">SEO Score</p>
                {result ? (
                  <>
                    <div className={`mx-auto w-24 h-24 rounded-full border-4 ${sc.ring} ring-4 flex items-center justify-center mb-3`} style={{ borderColor: result.score >= 80 ? '#16a34a' : result.score >= 60 ? '#ca8a04' : result.score >= 30 ? '#ea580c' : '#dc2626' }}>
                      <div>
                        <p className={`text-3xl font-bold ${sc.text}`}>{result.score}</p>
                        <p className="text-xs text-gray-400">/ 100</p>
                      </div>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${sc.badge}`}>
                      {sc.label}
                    </span>
                    {/* Mini score bars */}
                    <div className="mt-4 space-y-2 text-left">
                      {[
                        { label: 'Length', val: result.chars >= IDEAL_MIN && result.chars <= IDEAL_MAX ? 100 : result.chars > 170 ? 10 : 50 },
                        { label: 'Power Words', val: result.foundPowerWords.length > 0 ? Math.min(result.foundPowerWords.length * 30, 100) : 0 },
                        { label: 'CTA', val: result.hasCTA ? 100 : 0 },
                        { label: 'Numbers', val: result.hasNumbers ? 100 : 0 },
                      ].map((b, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">{b.label}</span>
                            <span className={b.val >= 70 ? 'text-green-600 font-medium' : b.val >= 40 ? 'text-yellow-600' : 'text-red-500'}>{b.val >= 70 ? '✓' : b.val >= 40 ? '~' : '✗'}</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${b.val >= 70 ? 'bg-green-500' : b.val >= 40 ? 'bg-yellow-500' : 'bg-red-400'}`} style={{ width: `${b.val}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="py-6">
                    <div className="w-24 h-24 rounded-full border-4 border-gray-100 flex items-center justify-center mx-auto mb-3">
                      <p className="text-2xl font-bold text-gray-300">—</p>
                    </div>
                    <p className="text-sm text-gray-400">Type your meta description to see the score</p>
                  </div>
                )}
              </div>

              {/* Google Preview */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Eye size={14} className="text-sky-600" /> Google Preview
                  </div>
                  <div className="flex bg-white border border-gray-200 rounded-lg p-0.5">
                    {['desktop', 'mobile'].map(v => (
                      <button key={v} onClick={() => setView(v)}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${view === v ? 'bg-sky-600 text-white' : 'text-gray-500'}`}>
                        {v === 'desktop' ? '🖥' : '📱'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center flex-shrink-0">
                        <Globe size={8} className="text-white" />
                      </div>
                      <p className="text-xs text-gray-500">www.yoursite.com › page</p>
                    </div>
                    <p className="text-sky-700 text-base font-normal leading-snug">Your Page Title Here</p>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {text
                        ? displayDesc(view === 'desktop' ? DESKTOP_MAX_PX : MOBILE_MAX_PX)
                        : <span className="text-gray-300 italic">Your meta description will appear here...</span>
                      }
                    </p>
                  </div>
                  {result && (
                    <div className={`mt-3 text-center py-1.5 rounded-lg text-xs font-semibold border ${
                      (view === 'desktop' ? result.desktopStatus : result.mobileStatus) === 'full'
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-red-50 border-red-200 text-red-700'
                    }`}>
                      {(view === 'desktop' ? result.desktopStatus : result.mobileStatus) === 'full'
                        ? `✅ Shows in full on ${view}`
                        : `⚠️ Will be truncated on ${view}`}
                    </div>
                  )}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4">
                <p className="text-xs font-bold text-sky-700 mb-2.5 flex items-center gap-1.5">
                  <Sparkles size={12} /> Quick SEO Tips
                </p>
                <ul className="space-y-1.5">
                  {[
                    'Keep between 120-158 characters',
                    'Include your main target keyword',
                    'Add a clear call-to-action',
                    'Use numbers to increase CTR',
                    'Make every character count',
                  ].map((tip, i) => (
                    <li key={i} className="text-xs text-sky-600 flex items-start gap-1.5">
                      <span className="flex-shrink-0 mt-0.5">→</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Empty State */}
          {!text && (
            <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mt-6">
              <FileText size={32} className="mx-auto mb-3 text-gray-300" />
              <p>Paste your meta description above to analyze it instantly — no signup required.</p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Check Meta Description for SEO in 3 Simple Steps</h2>
          <ol className="space-y-5">
            {[
              { step: "1", title: "Paste Your Meta Description", desc: "Copy your meta description from your CMS or SEO plugin and paste it into the text area. Or type it directly." },
              { step: "2", title: "Review Score & Suggestions", desc: "See your real-time SEO score, character count, pixel width, and actionable suggestions to improve CTR." },
              { step: "3", title: "Preview & Optimize", desc: "Check the Google preview for desktop and mobile. Fix any issues, then copy the optimized description to your site." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How Meta Description Analysis Works</h2>
          <p className="text-gray-500 text-sm mb-6">No server upload. No waiting. Everything happens on your device.</p>
          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Pixel Width Estimation</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                estimatePixelWidth(text) → desktop: 960px, mobile: 680px
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">Google truncates meta descriptions by pixel width, not character count. We estimate pixel width using average character widths to predict exactly how your description will appear in search results.</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">SEO Scoring Algorithm</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                score = length(100) + powerWords(20) + CTA(10) + numbers(10) → max 100
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">Your SEO score is calculated based on ideal length (120-158 chars), presence of power words, call-to-action phrases, and numbers — all proven to improve click-through rates.</p>
            </div>
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">Privacy First</h3>
              <p className="text-sky-800 text-xs leading-relaxed">All analysis happens locally in your browser using JavaScript. No meta descriptions are uploaded, stored, or sent anywhere. Close the tab and your content is gone. 100% private by design.</p>
            </div>
          </div>
        </section>

        {/* ─── Sample Results ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What Kind of Results Can You Expect?</h2>
          <p className="text-gray-500 text-sm mb-6">Real examples with different SEO scores and suggestions.</p>
          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-lg">Excellent (90/100)</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Description</p><p className="font-semibold text-gray-800">152 chars, 3 power words</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Result</p><p className="font-semibold text-green-600">✓ Full display, high CTR</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Best For</p><p className="font-semibold text-gray-800">Homepage, landing pages</p></div>
              </div>
            </div>
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-red-100 text-red-700 font-bold px-2.5 py-1 rounded-lg">Needs Work (35/100)</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Description</p><p className="font-semibold text-gray-800">85 chars, no CTA</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Result</p><p className="font-semibold text-red-600">⚠️ Too short, low CTR</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Fix</p><p className="font-semibold text-gray-800">Add 35+ chars + CTA</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Who Uses This Meta Description Checker?</h2>
          <p className="text-gray-500 text-sm mb-6">From SEOs to bloggers — better descriptions drive more clicks.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Zap size={20} className="text-sky-600" />, title: "SEO Specialists", desc: "Optimize meta descriptions for client websites. Get instant feedback on length, keywords, and CTR factors before publishing." },
              { icon: <FileText size={20} className="text-green-600" />, title: "Content Writers", desc: "Write compelling meta descriptions that rank and convert. Check power words, CTAs, and keyword placement in real-time." },
              { icon: <Globe size={20} className="text-amber-600" />, title: "Bloggers & Publishers", desc: "Ensure every blog post has an optimized meta description that attracts clicks from Google search results." },
              { icon: <Shield size={20} className="text-violet-600" />, title: "Privacy-Conscious Users", desc: "Analyze meta descriptions without uploading to third-party servers. Everything stays on your device — always." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Check Meta Descriptions in Your Browser?</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Most online meta description checkers ask you to paste content into a web form that sends your data to their servers. That means waiting for responses, worrying about privacy, and sometimes dealing with ads or limits. Our free meta description checker works differently — everything happens <strong>inside your browser</strong> using pure JavaScript.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Google displays approximately <strong>155-160 characters</strong> of a meta description on desktop and around <strong>120 characters</strong> on mobile. Going over the limit does not hurt rankings, but your description will be cut off — potentially reducing your click-through rate. Our tool shows you exactly how your description appears on both desktop and mobile before you publish.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The SEO score is calculated based on proven CTR factors: ideal length (120-158 chars), power words like "free" or "instant", clear call-to-action phrases, and the presence of numbers. See real-time suggestions to improve your description before you publish.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">Privacy Note</h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No meta descriptions are uploaded to any server. No data is stored or tracked. Your content stays on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need to preview your full SERP snippet? Try the{" "}
            <Link href="/tools/serp-snippet-preview" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">SERP Snippet Preview</Link>. 
            Want to count words in your description? The{" "}
            <Link href="/tools/word-counter" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Word Counter</Link> has you covered.
          </p>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              { q: "What is the ideal meta description length for SEO?", a: "The ideal meta description length is between 120 and 158 characters. Google typically shows up to 155-160 characters on desktop and around 120 characters on mobile before truncating. Descriptions that are too short miss an opportunity to attract clicks, while those that are too long get cut off mid-sentence in search results." },
              { q: "Does meta description length affect Google rankings?", a: "Meta descriptions do not directly affect Google rankings, but they significantly impact click-through rate (CTR). A well-written, properly-length meta description with relevant keywords and a clear call-to-action can increase clicks from search results, which indirectly signals quality to Google." },
              { q: "What are power words in meta descriptions?", a: "Power words are persuasive words that increase emotional impact and click rates. Examples include 'free', 'instant', 'proven', 'easy', 'best', 'new', 'trusted', and 'fast'. Including 1-2 power words in your meta description can make your search result listing more compelling and increase CTR." },
              { q: "Should I include the target keyword in my meta description?", a: "Yes. Including your target keyword in the meta description is recommended because Google often bolds matching words when a user searches for that keyword. This visual highlight makes your result stand out and can improve click-through rates. Our tool lets you check if your keyword is included." },
              { q: "Why does Google sometimes rewrite my meta description?", a: "Google may rewrite your meta description when it determines that a different snippet from your page content better matches the user search query. This happens most often when the meta description is too short, too generic, keyword-stuffed, or does not adequately describe the page content." },
              { q: "Does this tool work offline?", a: "Yes. Once the page loads, all analysis happens locally in your browser. You can use it without an internet connection after the initial load." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related SEO Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/tools/serp-snippet-preview", title: "SERP Snippet Preview", desc: "Preview exactly how your full search result snippet looks in Google." },
              { href: "/tools/word-counter", title: "Word Counter", desc: "Count words, characters and reading time instantly." },
              { href: "/tools/sitemap-generator", title: "Sitemap Generator", desc: "Generate XML sitemaps to improve Google crawling and indexing." },
              { href: "/tools/chatgpt-prompt-generator", title: "ChatGPT Prompt Generator", desc: "Generate optimized prompts to write better meta descriptions with AI." },
              { href: "/tools/hashtag-generator", title: "Hashtag Generator", desc: "Generate trending hashtags for Instagram, TikTok and Twitter." },
              { href: "/tools/case-converter", title: "Case Converter", desc: "Convert text to Title Case, UPPERCASE, lowercase and more." },
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
  )
}