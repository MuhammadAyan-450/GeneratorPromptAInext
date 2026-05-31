'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Copy, RefreshCw, FileText, Clock, Hash, AlignLeft, BookOpen, Home, ChevronDown, Layers, BarChart3, Zap, Shield, HelpCircle, Globe
} from 'lucide-react';

// ─── Helper Functions (Outside Component) ─────────────────────────────────────
const calculateStats = (text) => {
  const trimmed = text.trim();
  if (!trimmed) return { words: 0, charsWithSpaces: 0, charsNoSpaces: 0, sentences: 0, paragraphs: 0, readingTime: 'less than a minute' };

  const words = trimmed.split(/\s+/).filter(Boolean).length;
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
  const paragraphs = text.split(/\n+/).filter((p) => p.trim()).length;
  
  const minutes = Math.ceil(words / 225);
  let readingTime = 'less than a minute';
  if (minutes === 1) readingTime = '1 minute';
  else if (minutes > 1) readingTime = `${minutes} minutes`;

  return { words, charsWithSpaces, charsNoSpaces, sentences, paragraphs, readingTime };
};

const getKeywordDensity = (text, totalWords) => {
  if (totalWords < 10) return [];
  const wordsArr = text.toLowerCase().match(/\b\w+\b/g) || [];
  const freqMap = {};
  wordsArr.forEach((w) => {
    freqMap[w] = (freqMap[w] || 0) + 1;
  });
  return Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => ({
      word,
      count,
      percentage: ((count / totalWords) * 100).toFixed(1),
    }));
};

// ─── FAQ Data (Sync with page.js JSON-LD) ─────────────────────────────────────
const FAQS = [
  {
    q: 'How to count words and characters in text online free?',
    a: 'Paste or type your text into the word counter. Words, characters (with and without spaces), sentences, paragraphs, and reading time are calculated instantly in real-time as you type.',
  },
  {
    q: 'How is reading time calculated?',
    a: 'Reading time is estimated at 225 words per minute — the standard average adult reading speed used by Medium and most publishing platforms. This gives a reliable estimate for most English text.',
  },
  {
    q: 'What is keyword density and why does it matter for SEO?',
    a: 'Keyword density is the percentage of times a word appears compared to total word count. For SEO, a primary keyword density of 1–2% is generally recommended. Our tool shows your top 5 keywords with their density percentage automatically.',
  },
  {
    q: 'Does this tool count characters with or without spaces?',
    a: 'Both. Characters with spaces is the total string length. Characters without spaces counts only letters, numbers, and symbols — excluding all whitespace. This covers the two most common character count formats used by different platforms.',
  },
  {
    q: 'Is my text data private when using this word counter?',
    a: 'Yes. All counting happens entirely in your browser using JavaScript. Your text is never sent to any server. The tool is 100% private and secure — safe for confidential documents.',
  },
  {
    q: 'Can I use this for academic essays or blog posts?',
    a: 'Absolutely. It’s perfect for checking word limits on assignments, optimizing blog post length for SEO, or ensuring social media posts fit within character limits like Twitter/X or LinkedIn.',
  },
];

// ─── Related Tools (6 Items from your tools array) ────────────────────────────
const RELATED_TOOLS = [
  { href: '/tools/lorem-ipsum-generator', title: 'Lorem Ipsum Generator', desc: 'Generate placeholder text for wireframes, mockups and design prototypes.' },
  { href: '/tools/case-converter', title: 'Case Converter', desc: 'Convert text to Uppercase, Lowercase, Title Case and more formats.' },
  { href: '/tools/remove-duplicate-lines', title: 'Remove Duplicate Lines', desc: 'Clean up lists by removing repeated and blank entries instantly.' },
  { href: '/tools/seo-meta-tags-generator', title: 'SEO Meta Tags Generator', desc: 'Create optimized meta titles and descriptions with live preview.' },
  { href: '/tools/serp-snippet-preview', title: 'SERP Snippet Preview', desc: 'Preview how your page appears in Google search results.' },
  { href: '/tools/ai-content-detector', title: 'AI Content Detector', desc: 'Check if your text was written by AI or humans.' },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const WordCounter = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const stats = calculateStats(text);
  const keywords = getKeywordDensity(text, stats.words);

  const copyStats = () => {
    if (!text.trim()) return;
    const statsText = [
      `Words: ${stats.words}`,
      `Characters (with spaces): ${stats.charsWithSpaces}`,
      `Characters (no spaces): ${stats.charsNoSpaces}`,
      `Sentences: ${stats.sentences}`,
      `Paragraphs: ${stats.paragraphs}`,
      `Reading Time: ${stats.readingTime}`,
      keywords.length > 0 ? '\nTop Keywords:' : '',
      ...keywords.map((kw) => `${kw.word}: ${kw.count} (${kw.percentage}%)`),
    ].join('\n');
    
    navigator.clipboard.writeText(statsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const resetAll = () => {
    setText('');
    setCopied(false);
  };

  const statsString = [
    `${stats.words} words`,
    `${stats.charsWithSpaces} chars`,
    `${stats.sentences} sentences`,
    `${stats.paragraphs} paragraphs`,
    stats.readingTime,
  ].join(' • ');

  const statCards = [
    { icon: FileText, label: 'Words', value: stats.words.toLocaleString(), color: 'text-gray-800' },
    { icon: AlignLeft, label: 'Chars (w/ spaces)', value: stats.charsWithSpaces.toLocaleString(), color: 'text-gray-800' },
    { icon: Hash, label: 'Chars (no spaces)', value: stats.charsNoSpaces.toLocaleString(), color: 'text-gray-800' },
    { icon: BookOpen, label: 'Sentences', value: stats.sentences.toLocaleString(), color: 'text-gray-800' },
    { icon: Layers, label: 'Paragraphs', value: stats.paragraphs.toLocaleString(), color: 'text-gray-800' },
    { icon: Clock, label: 'Reading Time', value: stats.readingTime, color: 'text-sky-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* ── Breadcrumb ── */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="inline-flex items-center gap-1.5 hover:text-sky-600 transition-colors">
                <Home size={14} /> Home
              </Link>
            </li>
            <li><span className="text-gray-300">/</span></li>
            <li>
              <Link href="/pages/all-tools" className="hover:text-sky-600 transition-colors">All Tools</Link>
            </li>
            <li><span className="text-gray-300">/</span></li>
            <li><span className="text-gray-900 font-semibold">Word Counter</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        
        {/* ── Hero ── */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <FileText className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Count Words Characters and Reading Time Online Free –{' '}
            <span className="text-sky-600">Keyword Density Checker Tool</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Real-time word count, character count, sentences, paragraphs, reading time estimate, and top keyword density analysis.
          </p>
        </div>

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          
          {/* Textarea */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Paste or Type Your Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your text here..."
              className="w-full h-56 md:h-72 px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 resize-none text-base"
              spellCheck="false"
              aria-label="Text input for word counting"
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {statCards.map((stat, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                <div className="flex justify-center text-sky-500 mb-1">
                  <stat.icon size={20} />
                </div>
                <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Summary Bar */}
          {stats.words > 0 && (
            <div className="bg-gray-100 rounded-xl px-4 py-2.5 mb-6 text-center">
              <p className="text-sm text-gray-600 font-medium">{statsString}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mb-2 justify-center">
            <button
              onClick={copyStats}
              disabled={!text.trim()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 rounded-xl text-sm font-medium text-gray-700 transition-colors"
            >
              <Copy size={15} />
              {copied ? 'Copied!' : 'Copy All Stats'}
            </button>
            <button
              onClick={resetAll}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
            >
              <RefreshCw size={15} /> Reset
            </button>
          </div>
        </div>

        {/* ── Keyword Density (Dark Output Block) ── */}
        {keywords.length > 0 && (
          <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 size={20} className="text-sky-600" /> Top 5 Keywords & Density
            </h2>
            <div className="bg-gray-900 rounded-2xl p-6">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-semibold">
                Keyword Analysis ({stats.words.toLocaleString()} words total)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                {keywords.map((kw, i) => (
                  <div key={i} className="text-center">
                    <p className="text-lg font-bold text-sky-400 font-mono">{kw.word}</p>
                    <p className="text-sm text-gray-400 mt-1">{kw.count} times</p>
                    <p className="text-xs font-semibold text-green-400 mt-1">{kw.percentage}%</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center mt-4">
                SEO tip: Primary keyword density of 1–2% is generally recommended
              </p>
            </div>
          </section>
        )}

        {/* ── Empty State for Keywords ── */}
        {keywords.length === 0 && text.trim().length > 0 && stats.words < 10 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
            <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
              <BarChart3 size={32} className="mx-auto mb-3 text-gray-300" />
              <p>Type at least <strong className="text-gray-500">10 words</strong> to see keyword density analysis</p>
            </div>
          </div>
        )}

        {/* ── How to Use ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Count Words and Characters in Text Online Free
          </h2>
          <ol className="space-y-5">
            {[
              { step: '1', title: 'Paste or Type Text', desc: 'Enter your essay, blog post, tweet, or any content into the textarea.' },
              { step: '2', title: 'View Real-Time Stats', desc: 'See words, characters, sentences, paragraphs, and reading time update instantly.' },
              { step: '3', title: 'Check Keyword Density', desc: 'If you have 10+ words, the top 5 keywords and their density % appear below.' },
              { step: '4', title: 'Copy or Reset', desc: 'Copy all stats to clipboard for reports, or reset to start fresh.' },
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

        {/* ── How It Works ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How Word Counting & Density Analysis Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">Simple logic, instant results. Here's the breakdown.</p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Zap size={16} className="text-sky-600" />
                Real-Time Calculation
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                text.trim().split(/\s+/).length → word count
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                We use JavaScript's native string methods to split text by whitespace for words, and regex for sentences/paragraphs. Calculations happen instantly on every keystroke.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <BarChart3 size={16} className="text-sky-600" />
                Keyword Density Logic
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                (count / totalWords) * 100 → density %
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                We map word frequencies, sort by count, and calculate the percentage of total words. This helps identify overused terms for SEO optimization.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2 flex items-center gap-2">
                <Shield size={16} className="text-sky-600" />
                Privacy Note
              </h3>
              <p className="text-sky-800 text-xs leading-relaxed">
                All text processing happens locally in your browser. No content is ever sent to any server. 100% private.
              </p>
            </div>
          </div>
        </section>

        {/* ── Sample Results ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Real Example: Blog Post Analysis
          </h2>
          <p className="text-gray-500 text-sm mb-6">See how stats look for typical content.</p>

          <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Input</p>
                <p className="font-mono text-xs text-gray-800">
                  SEO is crucial for online visibility. Good SEO practices help websites rank higher...
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Output Stats</p>
                <p className="text-sm text-gray-800">
                  <strong>Words:</strong> 10<br />
                  <strong>Chars:</strong> 68<br />
                  <strong>Reading Time:</strong> less than a minute<br />
                  <strong>Top Keyword:</strong> seo (20.0%)
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Result: Instant feedback on length and keyword usage helps optimize content before publishing.
            </p>
          </div>
        </section>

        {/* ── Use Cases ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses Word Counters?
          </h2>
          <p className="text-gray-500 text-sm mb-6">From students to marketers — precise counts matter everywhere.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Zap size={20} className="text-sky-600" />, title: 'Students & Academics', desc: 'Ensure essays and thesis papers meet strict word count requirements without manual counting.' },
              { icon: <Globe size={20} className="text-sky-600" />, title: 'SEO Writers', desc: 'Monitor keyword density to avoid stuffing and ensure optimal length for search engine ranking.' },
              { icon: <FileText size={20} className="text-sky-600" />, title: 'Social Media Managers', desc: 'Check character limits for Tweets, LinkedIn posts, and Instagram captions to maximize engagement.' },
              { icon: <HelpCircle size={20} className="text-sky-600" />, title: 'Editors & Proofreaders', desc: 'Quickly assess document length, reading time, and paragraph structure for better flow.' },
            ].map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-5 hover:border-sky-200 transition-colors">
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
            Why Accurate Word Counting Matters for Content
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Our free word counter instantly calculates <strong>words, characters (with and without spaces), sentences, paragraphs</strong>, and <strong>estimated reading time</strong> as you type. The built-in keyword density analyzer shows your <strong>top 5 most-used words</strong> with their frequency and percentage — essential for SEO optimization, content analysis, and academic writing.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Reading time is calculated at <strong>225 words per minute</strong>, the standard average adult reading speed used by Medium and most publishing platforms. All processing happens <strong>100% in your browser</strong> — your text is never sent to any server, making it completely private and secure for confidential documents.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Built for speed and privacy — all calculations happen in your browser using JavaScript. Your text never leaves your device. Just accurate stats, instantly.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">Privacy Note</h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No text inputs are uploaded to any server. No data is stored or tracked. Your info stays on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need more writing tools? Try the{' '}
            <Link href="/tools/lorem-ipsum-generator" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Lorem Ipsum Generator</Link> for placeholders, or the{' '}
            <Link href="/tools/case-converter" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Case Converter</Link> for formatting.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {FAQS.map((item, i) => (
              <div key={i} className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-sky-200 transition-colors duration-300">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={openFaq === i}
                >
                  <h3 className="text-sm md:text-base font-bold text-gray-900 pr-4">{item.q}</h3>
                  <ChevronDown size={22} className={`text-sky-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
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
            Related Text &amp; Writing Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RELATED_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-sky-400 transition-all"
              >
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-sky-600 transition-colors">
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

export default WordCounter;