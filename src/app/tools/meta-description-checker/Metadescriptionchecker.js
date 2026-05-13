'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FileText, Copy, RefreshCw, Home, ChevronDown,
  CheckCircle, AlertTriangle, XCircle, Sparkles,
  Search, Globe, Info, BarChart2, Eye
} from 'lucide-react'

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

  const charColor = !result ? 'text-gray-400'
    : result.chars < IDEAL_MIN ? 'text-red-600'
    : result.chars > 170 ? 'text-red-600'
    : result.chars > IDEAL_MAX ? 'text-yellow-600'
    : 'text-green-600'

  const barColor = !result ? 'bg-gray-200'
    : result.chars < IDEAL_MIN ? 'bg-red-400'
    : result.chars > 170 ? 'bg-red-500'
    : result.chars > IDEAL_MAX ? 'bg-yellow-500'
    : 'bg-green-500'

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto w-full px-4 pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="inline-flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                <Home size={14} /> Home
              </Link>
            </li>
            <li><span className="text-gray-300">/</span></li>
            <li><Link href="/pages/all-tools" className="hover:text-indigo-600 transition-colors">All Tools</Link></li>
            <li><span className="text-gray-300">/</span></li>
            <li><span className="text-gray-900 font-semibold">Meta Description Checker</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-5xl mx-auto w-full px-4 pb-20">

        {/* Hero */}
        <div className="text-center mb-10 mt-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <Sparkles size={13} /> Free SEO Tool — No Signup Required
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
            Free Meta Description Checker —{' '}
            <span className="text-blue-600">Check SEO Score & Length Instantly</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Analyze your meta description length, pixel width, power words, CTR score and keyword placement — all in real-time. No signup needed.
          </p>
        </div>

        {/* ── MAIN TOOL ── */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden mb-8">

          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
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
                    {text.length} / 158 chars
                  </span>
                </div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste or type your meta description here to analyze it instantly..."
                  rows={5}
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-800 resize-none bg-gray-50/50 leading-relaxed"
                />
                {/* Progress bar */}
                <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                    style={{ width: `${Math.min((text.length / 170) * 100, 100)}%` }}
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-800 bg-gray-50/50"
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
                    <Eye size={14} className="text-blue-600" /> Google Preview
                  </div>
                  <div className="flex bg-white border border-gray-200 rounded-lg p-0.5">
                    {['desktop', 'mobile'].map(v => (
                      <button key={v} onClick={() => setView(v)}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${view === v ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>
                        {v === 'desktop' ? '🖥' : '📱'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <Globe size={8} className="text-white" />
                      </div>
                      <p className="text-xs text-gray-500">www.yoursite.com › page</p>
                    </div>
                    <p className="text-blue-700 text-base font-normal leading-snug">Your Page Title Here</p>
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
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <p className="text-xs font-bold text-blue-700 mb-2.5 flex items-center gap-1.5">
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
                    <li key={i} className="text-xs text-blue-600 flex items-start gap-1.5">
                      <span className="flex-shrink-0 mt-0.5">→</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Free Meta Description Checker — Analyze Length, SEO Score & CTR Instantly
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Our free meta description checker analyzes your meta description in real-time and gives you an <strong>instant SEO score</strong> based on length, pixel width, power words, call-to-action presence, and keyword placement. No login required — just paste your description and get instant results.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Google displays approximately <strong>155-160 characters</strong> of a meta description on desktop and around <strong>120 characters</strong> on mobile. Going over the limit does not hurt rankings, but your description will be cut off — potentially reducing your click-through rate. Our tool shows you exactly how your description appears on both desktop and mobile before you publish.
          </p>
        </div>

        {/* How to Use */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Check Your Meta Description for SEO</h2>
          <ol className="list-decimal list-inside text-gray-600 space-y-3 text-base">
            <li>Paste or type your <strong>meta description</strong> into the text area above.</li>
            <li>Watch the <strong>character count, pixel width and SEO score</strong> update in real-time.</li>
            <li>Enter your <strong>target keyword</strong> to check if it appears in the description.</li>
            <li>Review the <strong>issues and suggestions</strong> to improve your description.</li>
            <li>Check the <strong>Google preview</strong> to see how it looks on desktop and mobile.</li>
            <li>Fix any issues, then <strong>copy the optimized description</strong> to your CMS.</li>
          </ol>
        </div>

        {/* Features */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Meta Description Analyzer — Key Features</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: 'Real-Time SEO Score', desc: 'Get an instant SEO score from 0-100 based on length, power words, call-to-action and more. See exactly where your description needs improvement.' },
              { title: 'Pixel Width Calculator', desc: 'Google uses pixel width — not character count — to truncate descriptions. Our tool calculates exact pixel width for both desktop (960px) and mobile (680px) limits.' },
              { title: 'Keyword Placement Check', desc: 'Enter your target keyword to instantly verify it appears in your meta description. Including the target keyword can improve relevance signals for Google.' },
              { title: 'Desktop & Mobile Preview', desc: 'See exactly how your meta description appears in Google search results on both desktop and mobile — including truncation if it is too long.' },
            ].map((f, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Meta Description Checker — Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              { q: 'What is the ideal meta description length for SEO?', a: 'The ideal meta description length is between 120 and 158 characters. Google typically shows up to 155-160 characters on desktop and around 120 characters on mobile before truncating. Descriptions that are too short miss an opportunity to attract clicks, while those that are too long get cut off mid-sentence in search results.' },
              { q: 'Does meta description length affect Google rankings?', a: 'Meta descriptions do not directly affect Google rankings, but they significantly impact click-through rate (CTR). A well-written, properly-length meta description with relevant keywords and a clear call-to-action can increase clicks from search results, which indirectly signals quality to Google.' },
              { q: 'What are power words in meta descriptions?', a: 'Power words are persuasive words that increase emotional impact and click rates. Examples include "free", "instant", "proven", "easy", "best", "new", "trusted", and "fast". Including 1-2 power words in your meta description can make your search result listing more compelling and increase CTR.' },
              { q: 'Should I include the target keyword in my meta description?', a: 'Yes. Including your target keyword in the meta description is recommended because Google often bolds matching words when a user searches for that keyword. This visual highlight makes your result stand out and can improve click-through rates. Our tool lets you check if your keyword is included.' },
              { q: 'Why does Google sometimes rewrite my meta description?', a: 'Google may rewrite your meta description when it determines that a different snippet from your page content better matches the user search query. This happens most often when the meta description is too short, too generic, keyword-stuffed, or does not adequately describe the page content.' },
            ].map((item, i) => (
              <div key={i} className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-blue-200 transition-colors duration-300">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left" aria-expanded={openFaq === i}>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 pr-4">{item.q}</h3>
                  <ChevronDown size={22} className={`text-blue-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="px-5 pb-5 text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related SEO Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/tools/serp-snippet-preview', title: 'SERP Snippet Preview', desc: 'Preview exactly how your full search result snippet looks in Google.' },
              { href: '/tools/word-counter', title: 'Word Counter', desc: 'Count words, characters, sentences and reading time instantly.' },
              { href: '/tools/sitemap-generator', title: 'Sitemap Generator', desc: 'Generate XML sitemaps to improve Google crawling and indexing.' },
              { href: '/tools/chatgpt-prompt-generator', title: 'ChatGPT Prompt Generator', desc: 'Generate optimized prompts to write better meta descriptions with AI.' },
              { href: '/tools/hashtag-generator', title: 'Hashtag Generator', desc: 'Generate trending hashtags for Instagram, TikTok and Twitter.' },
              { href: '/tools/case-converter', title: 'Case Converter', desc: 'Convert text to Title Case, UPPERCASE, lowercase and more.' },
            ].map((tool) => (
              <Link key={tool.href} href={tool.href} className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-400 transition-all">
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-blue-600 transition-colors">{tool.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}