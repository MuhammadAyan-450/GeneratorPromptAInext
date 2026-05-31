'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Copy, RefreshCw, Download, Shuffle, Home, ChevronDown,
  ArrowDown, ArrowUp, Type, Hash, Layers, FileText,
  Zap, Shield, HelpCircle, CheckCircle2, Globe
} from 'lucide-react';

// ─── Helper Functions (Outside Component) ─────────────────────────────────────
const toLowerCase = (text) => text.toLowerCase();
const toUpperCase = (text) => text.toUpperCase();
const toToggleCase = (text) =>
  text
    .split('')
    .map((char) => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
    .join('');

const countStats = (text) => {
  const trimmed = text.trim();
  return {
    words: trimmed === '' ? 0 : trimmed.split(/\s+/).length,
    chars: text.length,
  };
};

// ─── FAQ Data (Sync with page.js JSON-LD) ─────────────────────────────────────
const FAQS = [
  {
    q: 'How to convert uppercase text to lowercase online free?',
    a: "Paste your uppercase text into the input area and click 'Lowercase'. The converted text appears instantly in the output block below. Copy or download the result.",
  },
  {
    q: 'How to fix text typed with caps lock on?',
    a: "Paste the accidentally caps-locked text into the tool and click 'Lowercase'. The entire text will be converted to normal lowercase instantly. This is the fastest way to fix caps lock mistakes without retyping.",
  },
  {
    q: 'What does swap case or toggle case do?',
    a: "Swap Case (Toggle Case) inverts every letter — uppercase becomes lowercase and lowercase becomes uppercase. For example, 'Hello World' becomes 'hELLO wORLD'. Useful for reversing accidental case changes.",
  },
  {
    q: 'Can I convert lowercase to uppercase as well?',
    a: "Yes. Click 'Uppercase' to convert any text to all capital letters. This is useful for formatting headers, constants in programming code, or emphasizing important text.",
  },
  {
    q: 'Does this tool remove formatting from my text?',
    a: 'No. The tool only changes the letter case (uppercase/lowercase). It does not remove bold, italics, links, or any other formatting. Only alphabetical characters are affected — numbers and symbols stay unchanged.',
  },
  {
    q: 'Is my text data stored or shared?',
    a: 'Never. All processing happens locally in your browser. Your text inputs are never sent to servers, stored, or tracked.',
  },
];

// ─── Related Tools (6 Items from your tools array) ────────────────────────────
const RELATED_TOOLS = [
  { href: '/tools/case-converter', title: 'Case Converter', desc: 'Convert text to Title Case, Sentence Case, CamelCase and more formats.' },
  { href: '/tools/word-counter', title: 'Word Counter', desc: 'Count words, characters, sentences and reading time instantly.' },
  { href: '/tools/remove-duplicate-lines', title: 'Remove Duplicate Lines', desc: 'Clean up lists by removing repeated and blank entries.' },
  { href: '/tools/json-formatter', title: 'JSON Formatter', desc: 'Beautify, minify and validate JSON code instantly for developers.' },
  { href: '/tools/base64-encode', title: 'Base64 Encoder', desc: 'Encode and decode Base64 strings for data transmission.' },
  { href: '/tools/url-encoder', title: 'URL Encoder', desc: 'Encode special characters in URLs for safe web use.' },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const UppercaseToLowercase = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [activeAction, setActiveAction] = useState('');
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleConvert = (action) => {
    if (!inputText.trim()) return;
    let result = '';
    if (action === 'lowercase') result = toLowerCase(inputText);
    else if (action === 'uppercase') result = toUpperCase(inputText);
    else if (action === 'toggle') result = toToggleCase(inputText);
    
    setOutputText(result);
    setActiveAction(action);
    setCopied(false);
  };

  const copyText = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `converted-case-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetAll = () => {
    setInputText('');
    setOutputText('');
    setActiveAction('');
    setCopied(false);
  };

  const inputStats = countStats(inputText);
  const outputStats = countStats(outputText);
  const hasResult = outputText.length > 0;

  const stats = hasResult
    ? [
        { icon: Type, label: 'Input Words', value: inputStats.words, color: 'text-gray-800' },
        { icon: Hash, label: 'Input Chars', value: inputStats.chars, color: 'text-gray-800' },
        { icon: Layers, label: 'Output Words', value: outputStats.words, color: 'text-sky-600' },
        { icon: FileText, label: 'Output Chars', value: outputStats.chars, color: 'text-sky-600' },
      ]
    : [];

  const actionLabels = {
    lowercase: 'Converted to Lowercase',
    uppercase: 'Converted to Uppercase',
    toggle: 'Case Swapped (Toggle)',
  };

  const inputCls = 'w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800';
  const labelCls = 'block text-sm font-semibold text-gray-700 mb-2';

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
            <li><span className="text-gray-900 font-semibold">Uppercase to Lowercase</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        
        {/* ── Hero ── */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <Shuffle className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Convert Uppercase to Lowercase Text Online Free –{' '}
            <span className="text-sky-600">Fix Caps Lock Instantly</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Change text to lowercase, uppercase, or swap case of every letter. The fastest way to fix caps lock mistakes.
          </p>
        </div>

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          
          {/* Input */}
          <div className="mb-6">
            <label className={labelCls}>Enter Text</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 resize-none font-mono text-sm"
              placeholder="Type or paste text here to convert..."
            />
            <p className="text-xs text-gray-400 mt-1">
              {inputStats.words} word{inputStats.words !== 1 ? 's' : ''} · {inputStats.chars} character{inputStats.chars !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button
              onClick={() => handleConvert('lowercase')}
              disabled={!inputText.trim()}
              className="bg-sky-600 hover:bg-sky-700 active:scale-95 disabled:opacity-40 transition-all text-white font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm"
            >
              <ArrowDown size={16} /> Lowercase
            </button>
            <button
              onClick={() => handleConvert('uppercase')}
              disabled={!inputText.trim()}
              className="bg-white border-2 border-sky-100 hover:bg-sky-50 disabled:opacity-40 text-sky-700 font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
            >
              <ArrowUp size={16} /> Uppercase
            </button>
            <button
              onClick={() => handleConvert('toggle')}
              disabled={!inputText.trim()}
              className="bg-white border-2 border-sky-100 hover:bg-sky-50 disabled:opacity-40 text-sky-700 font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
            >
              <Shuffle size={16} /> Swap Case
            </button>
          </div>

          {/* Reset */}
          <div className="mb-2">
            <button
              onClick={resetAll}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
            >
              <RefreshCw size={15} /> Reset
            </button>
          </div>

          {/* ── Results Section ── */}
          {hasResult && (
            <div className="mt-8">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                    <div className="flex justify-center text-sky-500 mb-1">
                      <stat.icon size={20} />
                    </div>
                    <p className={`text-lg font-bold ${stat.color || 'text-gray-800'}`}>{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Dark Output Block */}
              <div className="bg-gray-900 rounded-2xl p-6 mb-6 overflow-x-auto">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-semibold">
                  {actionLabels[activeAction] || 'Result'}
                </p>
                <pre className="text-sm font-mono leading-relaxed text-gray-200 max-h-72 overflow-y-auto whitespace-pre-wrap">
                  {outputText}
                </pre>
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={copyText}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
                >
                  <Copy size={15} />
                  {copied ? 'Copied!' : 'Copy Result'}
                </button>
                <button
                  onClick={downloadText}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  <Download size={15} /> Download .txt
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!hasResult && (
            <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mt-4">
              <Shuffle size={32} className="mx-auto mb-3 text-gray-300" />
              <p>Paste text and click <strong className="text-gray-500">Lowercase</strong>, <strong className="text-gray-500">Uppercase</strong>, or <strong className="text-gray-500">Swap Case</strong></p>
            </div>
          )}
        </div>

        {/* ── How to Use ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Convert Uppercase to Lowercase Text Online Free
          </h2>
          <ol className="space-y-5">
            {[
              { step: '1', title: 'Paste Your Text', desc: 'Copy and paste the text you want to convert into the input area.' },
              { step: '2', title: 'Choose Conversion', desc: 'Click "Lowercase" to fix caps lock, "Uppercase" for headers, or "Swap Case" to invert.' },
              { step: '3', title: 'View Results', desc: 'See the converted text in the dark output block along with word/char counts.' },
              { step: '4', title: 'Copy or Download', desc: 'Copy the result to clipboard or download as a .txt file for offline use.' },
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
            How Text Case Conversion Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">Simple string manipulation, instant results. Here's the logic.</p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Zap size={16} className="text-sky-600" />
                Native String Methods
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                text.toLowerCase() → "HELLO" → "hello"
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                We use JavaScript's native string methods which handle Unicode characters correctly. This ensures that special characters and accented letters are converted properly across different languages.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Shuffle size={16} className="text-sky-600" />
                Toggle Case Logic
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                char === upper ? lower : upper
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                For toggle case, we iterate through each character and check if it's uppercase. If so, we convert to lowercase, and vice versa. Non-alphabetical characters remain unchanged.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2 flex items-center gap-2">
                <Shield size={16} className="text-sky-600" />
                Privacy Note
              </h3>
              <p className="text-sky-800 text-xs leading-relaxed">
                All text processing happens locally in your browser. No text inputs are ever sent to any server. 100% private.
              </p>
            </div>
          </div>
        </section>

        {/* ── Sample Results ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Real Example: Fixing Caps Lock Mistakes
          </h2>
          <p className="text-gray-500 text-sm mb-6">See how conversion helps in real-world scenarios.</p>

          <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Input (Caps Lock On)</p>
                <p className="font-mono text-xs text-gray-800">
                  HELLO WORLD, THIS IS A TEST MESSAGE.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Output (Lowercase)</p>
                <p className="font-mono text-xs text-gray-800">
                  hello world, this is a test message.
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Result: Instantly readable text without manual retyping. Perfect for emails, documents, or social media posts.
            </p>
          </div>
        </section>

        {/* ── Use Cases ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses Case Converters?
          </h2>
          <p className="text-gray-500 text-sm mb-6">From writers to developers — proper casing matters everywhere.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Zap size={20} className="text-sky-600" />, title: 'Writers & Editors', desc: 'Fix accidental caps lock errors in drafts, emails, or articles without tedious manual correction.' },
              { icon: <Type size={20} className="text-sky-600" />, title: 'Developers', desc: 'Convert variable names, constants, or code snippets between uppercase and lowercase for consistent styling.' },
              { icon: <Globe size={20} className="text-sky-600" />, title: 'Social Media Managers', desc: 'Format hashtags, captions, or headlines to match brand guidelines using consistent casing.' },
              { icon: <HelpCircle size={20} className="text-sky-600" />, title: 'Students', desc: 'Correct essay titles, headings, or quoted text to proper case before submission.' },
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
            Why Case Conversion Matters for Productivity
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            If you've accidentally left <strong>Caps Lock</strong> on and typed an entire paragraph, email, or document in uppercase, our tool is the fastest way to fix it. Simply paste the text, click <strong>"To Lowercase"</strong>, and get perfectly formatted text in under a second. No retyping needed.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The tool also supports the reverse — converting any text to <strong>all uppercase</strong> for headers, code constants, or emphasis. The <strong>Swap Case</strong> feature inverts every letter's case individually, which is useful for correcting mixed-case text or creating stylistic effects. All processing happens in your browser — your text is never sent to any server.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Built for speed and privacy — all processing happens in your browser using JavaScript. Your text never leaves your device. Just accurate conversions, instantly.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">Privacy Note</h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No text inputs are uploaded to any server. No data is stored or tracked. Your info stays on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need more text tools? Try the{' '}
            <Link href="/tools/case-converter" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Case Converter</Link> for title/sentence case, or the{' '}
            <Link href="/tools/word-counter" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Word Counter</Link> for content analysis.
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
            Related Text &amp; Formatting Tools
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

export default UppercaseToLowercase;