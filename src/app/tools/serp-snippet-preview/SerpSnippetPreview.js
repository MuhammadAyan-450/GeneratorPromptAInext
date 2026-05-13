'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Search, Copy, RefreshCw, Home, ChevronDown,
  Eye, Globe, Smartphone, Monitor, Sparkles,
  CheckCircle, AlertTriangle, XCircle, Info
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

const TITLE_MAX = 600
const DESC_MAX = 960
const TITLE_WARN = 520
const DESC_WARN = 800

export default function SerpSnippetPreview() {
  const [url, setUrl] = useState('https://www.example.com/your-page')
  const [siteName, setSiteName] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [boldKeywords, setBoldKeywords] = useState('')
  const [showDate, setShowDate] = useState(false)
  const [view, setView] = useState('desktop')
  const [copied, setCopied] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [capitalize, setCapitalize] = useState(false)

  const titlePx = estimatePixelWidth(title)
  const descPx = estimatePixelWidth(description)

  const capitalizedTitle = capitalize
    ? title.replace(/\b\w/g, (c) => c.toUpperCase())
    : title

  const boldify = (text) => {
    if (!boldKeywords.trim()) return text
    const keywords = boldKeywords.split(/[, ]+/).filter(Boolean)
    const parts = text.split(new RegExp(`(${keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi'))
    return parts.map((part, i) => {
      const isKw = keywords.some(kw => kw.toLowerCase() === part.toLowerCase())
      return isKw ? <strong key={i} className="font-bold text-gray-900">{part}</strong> : part
    })
  }

  const displayTitle = titlePx > TITLE_MAX
    ? capitalizedTitle.slice(0, Math.floor(capitalizedTitle.length * (TITLE_MAX / titlePx))) + '...'
    : capitalizedTitle

  const displayDesc = descPx > DESC_MAX
    ? description.slice(0, Math.floor(description.length * (DESC_MAX / descPx))) + '...'
    : description

  const urlParts = (url || 'https://www.example.com/your-page').replace(/https?:\/\//, '').split('/')
  const domain = urlParts[0]
  const breadcrumb = urlParts.slice(1).filter(Boolean).join(' › ')

  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  const getTitleStatus = () => {
    if (!title) return null
    if (titlePx > TITLE_MAX) return { icon: XCircle, label: 'Too Long', color: 'text-red-600', bg: 'bg-red-50 border-red-200', bar: 'bg-red-500' }
    if (titlePx > TITLE_WARN) return { icon: AlertTriangle, label: 'Almost Full', color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200', bar: 'bg-yellow-500' }
    return { icon: CheckCircle, label: 'Perfect', color: 'text-green-600', bg: 'bg-green-50 border-green-200', bar: 'bg-green-500' }
  }

  const getDescStatus = () => {
    if (!description) return null
    if (descPx > DESC_MAX) return { icon: XCircle, label: 'Too Long', color: 'text-red-600', bg: 'bg-red-50 border-red-200', bar: 'bg-red-500' }
    if (descPx > DESC_WARN) return { icon: AlertTriangle, label: 'Almost Full', color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200', bar: 'bg-yellow-500' }
    return { icon: CheckCircle, label: 'Perfect', color: 'text-green-600', bg: 'bg-green-50 border-green-200', bar: 'bg-green-500' }
  }

  const titleStatus = getTitleStatus()
  const descStatus = getDescStatus()

  const reset = () => {
    setUrl('https://www.example.com/your-page')
    setSiteName('')
    setTitle('')
    setDescription('')
    setBoldKeywords('')
    setShowDate(false)
    setCapitalize(false)
  }

  const copyAll = () => {
    navigator.clipboard.writeText(`Title: ${capitalizedTitle}\nDescription: ${description}\nURL: ${url}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto w-full px-4 pt-6">
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
            <li><span className="text-gray-900 font-semibold">SERP Snippet Preview</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-6xl mx-auto w-full px-4 pb-20">

        {/* Hero */}
        <div className="text-center mb-10 mt-6">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <Sparkles size={13} /> Free SEO Tool
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
            SERP Snippet Preview Tool —{' '}
            <span className="text-indigo-600">Google Search Result Live Preview</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            See exactly how your page looks in Google search results. Check meta title pixel width, description length, URL breadcrumb and bold keywords — live.
          </p>
        </div>

        {/* ── MAIN TOOL CARD ── */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden mb-6">

          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Search size={15} className="text-white" />
              </div>
              <span className="font-semibold text-gray-800">SERP Preview Editor</span>
            </div>
            <div className="flex gap-2">
              <button onClick={copyAll} className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-medium text-gray-700 transition-colors shadow-sm">
                <Copy size={13} /> {copied ? '✓ Copied!' : 'Copy All'}
              </button>
              <button onClick={reset} className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-medium text-gray-700 transition-colors shadow-sm">
                <RefreshCw size={13} /> Reset
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

            {/* LEFT — Input Panel (3 cols) */}
            <div className="lg:col-span-3 p-6 md:p-8 flex flex-col gap-5">

              {/* URL */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Page URL</label>
                <div className="relative">
                  <Globe size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.yoursite.com/page"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-800 bg-gray-50/50"
                  />
                </div>
              </div>

              {/* Site Name */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Site Name <span className="text-gray-400 normal-case font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="Example"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-800 bg-gray-50/50"
                />
              </div>

              {/* Title */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Meta Title</label>
                  <div className="flex items-center gap-2">
                    {titleStatus && (
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${titleStatus.color}`}>
                        <titleStatus.icon size={12} /> {titleStatus.label}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">{title.length} chars · {titlePx}px / {TITLE_MAX}px</span>
                  </div>
                </div>
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Your page title here — keep under 600px for full display in Google"
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-800 resize-none bg-gray-50/50"
                />
                {/* Progress bar */}
                <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${titleStatus?.bar || 'bg-gray-300'}`}
                    style={{ width: `${Math.min((titlePx / TITLE_MAX) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <button
                    onClick={() => setCapitalize(!capitalize)}
                    className={`text-xs font-medium transition-colors ${capitalize ? 'text-indigo-600' : 'text-gray-400 hover:text-indigo-600'}`}
                  >
                    {capitalize ? '✓ Title Case On' : 'Apply Title Case'}
                  </button>
                  <span className="text-xs text-gray-400">Recommended: 50-60 chars</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Meta Description</label>
                  <div className="flex items-center gap-2">
                    {descStatus && (
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${descStatus.color}`}>
                        <descStatus.icon size={12} /> {descStatus.label}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">{description.length} chars · {descPx}px</span>
                  </div>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write your meta description here — keep under 155-160 characters for full display"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-800 resize-none bg-gray-50/50"
                />
                <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${descStatus?.bar || 'bg-gray-300'}`}
                    style={{ width: `${Math.min((descPx / DESC_MAX) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1.5 text-right">Recommended: 155-160 chars</p>
              </div>

              {/* Bold Keywords */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Bold Keywords <span className="text-gray-400 normal-case font-normal">(comma separated)</span>
                </label>
                <input
                  type="text"
                  value={boldKeywords}
                  onChange={(e) => setBoldKeywords(e.target.value)}
                  placeholder="free, seo tool, google"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-800 bg-gray-50/50"
                />
                <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                  <Info size={11} /> Google bolds matching keywords in search results
                </p>
              </div>

              {/* Options */}
              <label className="flex items-center gap-2.5 cursor-pointer group w-fit">
                <div
                  onClick={() => setShowDate(!showDate)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${showDate ? 'bg-indigo-600' : 'bg-gray-200'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow absolute top-0.5 transition-all ${showDate ? 'left-5' : 'left-0.5'}`} />
                </div>
                <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">Show date in snippet</span>
              </label>

            </div>

            {/* RIGHT — Preview Panel (2 cols) */}
            <div className="lg:col-span-2 p-6 md:p-8 bg-gray-50/40 flex flex-col">

              {/* View Toggle */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Eye size={15} className="text-indigo-600" /> Live Preview
                </div>
                <div className="flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                  <button
                    onClick={() => setView('desktop')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${view === 'desktop' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <Monitor size={12} /> Desktop
                  </button>
                  <button
                    onClick={() => setView('mobile')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${view === 'mobile' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <Smartphone size={12} /> Mobile
                  </button>
                </div>
              </div>

              {/* Google SERP Preview */}
              <div className={`bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex-1 ${view === 'mobile' ? 'max-w-[360px] mx-auto w-full' : ''}`}>

                {/* Google bar */}
                <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
                  <span className="text-lg font-bold tracking-tight">
                    <span className="text-blue-500">G</span>
                    <span className="text-red-500">o</span>
                    <span className="text-yellow-500">o</span>
                    <span className="text-blue-500">g</span>
                    <span className="text-green-500">l</span>
                    <span className="text-red-500">e</span>
                  </span>
                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-400 flex items-center gap-1.5">
                    <Search size={10} className="text-gray-300" />
                    your keyword here
                  </div>
                </div>

                {/* Result snippet */}
                <div className="space-y-1.5">
                  {/* Favicon + Domain */}
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <Globe size={9} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      {siteName && (
                        <p className="text-xs font-medium text-gray-800 leading-none mb-0.5 truncate">{siteName}</p>
                      )}
                      <p className="text-xs text-gray-500 leading-none truncate">
                        {domain}
                        {breadcrumb && <span> › {breadcrumb}</span>}
                      </p>
                    </div>
                  </div>

                  {/* Title */}
                  <p className={`text-blue-700 font-normal leading-snug cursor-pointer hover:underline ${view === 'mobile' ? 'text-base' : 'text-[1.15rem]'}`}>
                    {displayTitle || <span className="text-gray-300 italic text-sm">Your title will appear here...</span>}
                  </p>

                  {/* Description */}
                  <p className={`text-gray-600 leading-relaxed ${view === 'mobile' ? 'text-xs' : 'text-sm'}`}>
                    {showDate && <span className="text-gray-500 font-medium">{today} — </span>}
                    {displayDesc
                      ? boldify(displayDesc)
                      : <span className="text-gray-300 italic text-xs">Your meta description will appear here. Aim for 155-160 characters.</span>
                    }
                  </p>
                </div>

                {/* Status badges */}
                <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2">
                  <div className={`rounded-xl px-3 py-2.5 border text-center ${titleStatus?.bg || 'bg-gray-50 border-gray-100'}`}>
                    {titleStatus
                      ? <p className={`text-xs font-bold ${titleStatus.color}`}>{titleStatus.label}</p>
                      : <p className="text-xs text-gray-400">No title</p>
                    }
                    <p className="text-xs text-gray-500 mt-0.5">Title</p>
                  </div>
                  <div className={`rounded-xl px-3 py-2.5 border text-center ${descStatus?.bg || 'bg-gray-50 border-gray-100'}`}>
                    {descStatus
                      ? <p className={`text-xs font-bold ${descStatus.color}`}>{descStatus.label}</p>
                      : <p className="text-xs text-gray-400">No description</p>
                    }
                    <p className="text-xs text-gray-500 mt-0.5">Description</p>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
                <p className="text-xs font-bold text-indigo-700 mb-2 flex items-center gap-1.5">
                  <Sparkles size={12} /> Quick SEO Tips
                </p>
                <ul className="space-y-1.5">
                  {[
                    'Keep title under 600px (~55 chars)',
                    'Include main keyword in title',
                    'Description: 155-160 chars ideal',
                    'Add call-to-action in description',
                  ].map((tip, i) => (
                    <li key={i} className="text-xs text-indigo-600 flex items-start gap-1.5">
                      <span className="mt-0.5 flex-shrink-0">→</span> {tip}
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
            Free Google SERP Snippet Preview Tool — Check Meta Title & Description Online
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Our free SERP snippet preview tool lets you see <strong>exactly how your page will appear in Google search results</strong> before you publish. Check your meta title pixel width, meta description length, URL structure, and keyword highlighting — all in real-time with both desktop and mobile previews.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Google uses pixel width — not character count — to determine title truncation. Our tool calculates the <strong>exact pixel width</strong> of your title and description so you never get cut off in search results. The recommended title limit is <strong>600px</strong> and meta description limit is <strong>960px</strong>.
          </p>
        </div>

        {/* How to Use */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Preview Your Google Search Result Snippet</h2>
          <ol className="list-decimal list-inside text-gray-600 space-y-3 text-base">
            <li>Enter your <strong>page URL</strong> — the breadcrumb path updates live in the preview.</li>
            <li>Type your <strong>meta title</strong> — the pixel bar turns green, yellow or red instantly.</li>
            <li>Write your <strong>meta description</strong> — aim for 155-160 characters for full display.</li>
            <li>Add <strong>bold keywords</strong> to simulate how Google highlights matched words.</li>
            <li>Toggle <strong>Desktop / Mobile</strong> to check both search result views.</li>
            <li>Click <strong>Copy All</strong> to copy your optimized title and description.</li>
          </ol>
        </div>

        {/* Features */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Google SERP Preview Tool — Key Features</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: 'Pixel-Accurate Title Measurement', desc: 'Unlike character-only counters, our tool estimates pixel width — the actual measure Google uses to truncate titles. Green, yellow and red indicators show your status at a glance.' },
              { title: 'Desktop & Mobile Preview Toggle', desc: 'Switch between desktop and mobile Google search result previews instantly. See how your snippet adapts to different screen sizes before publishing.' },
              { title: 'Bold Keyword Highlighter', desc: 'Enter your target keywords and see them bolded in the description — exactly like Google highlights matching words when users search for your content.' },
              { title: 'Live Real-Time Preview', desc: 'Every character you type instantly updates the SERP preview. No submit button needed — your changes are reflected in the Google snippet as you type.' },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">SERP Snippet Preview — Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              { q: 'What is a SERP snippet preview tool?', a: 'A SERP snippet preview tool shows you exactly how your webpage will appear in Google search results before you publish. It displays your meta title, meta description, and URL exactly as Google would show them — including truncation if your content is too long.' },
              { q: 'How long should my meta title be for Google?', a: 'Google truncates titles exceeding approximately 600 pixels in width — roughly 50-60 characters for typical text. Our tool calculates the exact pixel width so you can optimize your title without guessing.' },
              { q: 'How long should my meta description be?', a: 'Google shows up to 960 pixels of meta description on desktop — around 155-160 characters. On mobile it is shorter at roughly 680 pixels. Keep your most important content within the first 155 characters.' },
              { q: 'Why does Google bold certain words in search results?', a: 'Google automatically bolds words in your meta description that match the user search query. Including your target keywords naturally in your description can improve click-through rates because matched words stand out visually.' },
              { q: 'Does this SERP preview tool show mobile results?', a: 'Yes. Toggle between Desktop and Mobile preview to see how your snippet appears on both screen sizes. Mobile search results have a narrower display so titles and descriptions may appear slightly shorter.' },
            ].map((item, i) => (
              <div key={i} className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-indigo-200 transition-colors duration-300">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left" aria-expanded={openFaq === i}>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 pr-4">{item.q}</h3>
                  <ChevronDown size={22} className={`text-indigo-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related SEO & Developer Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/tools/sitemap-generator', title: 'Sitemap Generator', desc: 'Generate XML sitemaps for your website to improve Google indexing and crawling.' },
              { href: '/tools/hashtag-generator', title: 'Hashtag Generator', desc: 'Generate trending hashtags for Instagram, TikTok and Twitter growth.' },
              { href: '/tools/json-formatter', title: 'JSON Formatter', desc: 'Beautify, minify and validate JSON code instantly for developers.' },
            ].map((tool) => (
              <Link key={tool.href} href={tool.href} className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-indigo-400 transition-all">
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-indigo-600 transition-colors">{tool.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

