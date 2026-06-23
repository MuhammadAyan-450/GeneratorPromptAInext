'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Copy, RefreshCw, Download, Globe, Home, ChevronDown,
  Hash, Type, Layers, Lock, Unlock, Zap, Shield, HelpCircle, FileText, ArrowRightLeft
} from 'lucide-react';

import ResponsiveAd from "../../../components/ResponsiveAd";


// ─── Helper Functions (Outside Component) ─────────────────────────────────────
const encodeURL = (text) => {
  try {
    return encodeURIComponent(text);
  } catch {
    return null;
  }
};

const decodeURL = (text) => {
  try {
    return decodeURIComponent(text);
  } catch {
    return null;
  }
};

// ─── FAQ Data (Sync with page.js JSON-LD) ─────────────────────────────────────
const FAQS = [
  {
    q: 'How to encode URL special characters online free?',
    a: "Paste your URL or text into the input area and click 'Encode URL'. The tool converts all unsafe characters (spaces, ?, &, =, etc.) into percent-encoded format (e.g. space becomes %20). Copy or download the result.",
  },
  {
    q: 'What is URL encoding or percent encoding?',
    a: 'URL encoding (percent encoding) converts unsafe ASCII characters into a % followed by two hexadecimal digits so they can be safely transmitted over the Internet. For example, a space becomes %20, ? becomes %3F, and & becomes %26.',
  },
  {
    q: 'When should I URL-encode a string?',
    a: 'Use URL encoding whenever you pass user input as part of a URL query parameter — like search queries, form data, or API request parameters. This prevents browsers from misinterpreting special characters.',
  },
  {
    q: 'What is the difference between encodeURI and encodeURIComponent?',
    a: "encodeURI() encodes characters not allowed in a full URL but leaves URL structure characters like /, :, ?, &, = intact. encodeURIComponent() encodes ALL special characters including these — making it safe for query parameter values. Our tool uses encodeURIComponent for maximum safety.",
  },
  {
    q: 'How to decode a percent-encoded URL back to readable text?',
    a: "Paste the encoded URL (e.g. 'hello%20world%3F') into the input area and click 'Decode URL'. The tool converts all %XX sequences back to their original characters (e.g. 'hello world?').",
  },
  {
    q: 'Is my URL data stored or shared?',
    a: 'Never. All processing happens locally in your browser. Your URL inputs are never sent to servers, stored, or tracked.',
  },
];

// ─── Related Tools (6 Items from your tools array) ────────────────────────────
const RELATED_TOOLS = [
  { href: '/tools/base64-encode', title: 'Base64 Encoder / Decoder', desc: 'Encode and decode text to Base64 format for data transmission.' },
  { href: '/tools/uuid-generator', title: 'UUID Generator', desc: 'Generate unique UUID v4 identifiers for API keys and tokens.' },
  { href: '/tools/json-formatter', title: 'JSON Formatter', desc: 'Beautify, minify and validate JSON data with syntax highlighting.' },
  { href: '/tools/qr-code-generator', title: 'QR Code Generator', desc: 'Create custom QR codes for URLs, WiFi, WhatsApp, and more.' },
  { href: '/tools/case-converter', title: 'Case Converter', desc: 'Convert text to Title Case, Sentence Case, CamelCase and more formats.' },
  { href: '/tools/remove-duplicate-lines', title: 'Remove Duplicate Lines', desc: 'Clean up lists by removing repeated and blank entries.' },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const URLEncoder = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [activeAction, setActiveAction] = useState('');
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleEncode = () => {
    if (!inputText.trim()) return;
    const result = encodeURL(inputText);
    if (result) {
      setOutputText(result);
      setActiveAction('encode');
    } else {
      setOutputText('Error: Could not encode the provided text.');
      setActiveAction('encode');
    }
  };

  const handleDecode = () => {
    if (!inputText.trim()) return;
    const result = decodeURL(inputText);
    if (result) {
      setOutputText(result);
      setActiveAction('decode');
    } else {
      setOutputText('Error: Invalid percent-encoded string. Check for malformed % sequences.');
      setActiveAction('decode');
    }
  };

  const copyText = () => {
    if (!outputText || outputText.startsWith('Error:')) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    if (!outputText || outputText.startsWith('Error:')) return;
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `url-${activeAction}-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetAll = () => {
    setInputText('');
    setOutputText('');
    setActiveAction('');
    setCopied(false);
  };

  const inputChars = inputText.length;
  const outputChars = outputText.length;
  const encodedChars = outputChars - inputChars;
  const hasResult = outputText.length > 0;
  const isError = outputText.startsWith('Error:');

  const stats = hasResult
    ? [
        { icon: Type, label: 'Input Chars', value: inputChars, color: 'text-gray-800' },
        { icon: Hash, label: 'Output Chars', value: outputChars, color: 'text-gray-800' },
        { icon: Layers, label: encodedChars >= 0 ? 'Chars Added' : 'Chars Removed', value: Math.abs(encodedChars), color: encodedChars >= 0 ? 'text-orange-500' : 'text-green-600' },
        { icon: activeAction === 'encode' ? Lock : Unlock, label: 'Status', value: activeAction === 'encode' ? 'Encoded' : 'Decoded', color: 'text-sky-600' },
      ]
    : [];

  const actionLabels = {
    encode: 'Percent-Encoded Output',
    decode: 'Decoded Output',
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
            <li><span className="text-gray-900 font-semibold">URL Encoder / Decoder</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        
        {/* ── Hero ── */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <Globe className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Encode URL Special Characters Online Free –{' '}
            <span className="text-sky-600">Percent Encoding Decoder Tool</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Convert special characters to percent-encoded format and back. Safe for query params, APIs, and web transmission.
          </p>
        </div>
        
        <ResponsiveAd />

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          
          {/* Input */}
          <div className="mb-6">
            <label className={labelCls}>Enter URL or Text</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 resize-none font-mono text-sm"
              placeholder="https://example.com/search?q=hello world&lang=en&#10;&#10;Or any text with special chars: hello@world! #tag & more"
            />
            <p className="text-xs text-gray-400 mt-1">
              {inputChars} character{inputChars !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={handleEncode}
              disabled={!inputText.trim()}
              className="bg-sky-600 hover:bg-sky-700 active:scale-95 disabled:opacity-40 transition-all text-white font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm"
            >
              <Lock size={16} /> Encode URL
            </button>
            <button
              onClick={handleDecode}
              disabled={!inputText.trim()}
              className="bg-white border-2 border-sky-100 hover:bg-sky-50 disabled:opacity-40 text-sky-700 font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
            >
              <Unlock size={16} /> Decode URL
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
                <pre className={`text-sm font-mono leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap break-all ${
                  isError ? 'text-red-400' : 'text-sky-400'
                }`}>
                  {outputText}
                </pre>
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={copyText}
                  disabled={isError}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 rounded-xl text-sm font-medium text-gray-700 transition-colors"
                >
                  <Copy size={15} />
                  {copied ? 'Copied!' : 'Copy Result'}
                </button>
                <button
                  onClick={downloadText}
                  disabled={isError}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  <Download size={15} /> Download .txt
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!hasResult && (
            <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mt-4">
              <Globe size={32} className="mx-auto mb-3 text-gray-300" />
              <p>Paste a URL or text and click <strong className="text-gray-500">Encode URL</strong> or <strong className="text-gray-500">Decode URL</strong></p>
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
            How to Encode URL Special Characters Online Free
          </h2>
          <ol className="space-y-5">
            {[
              { step: '1', title: 'Paste URL or Text', desc: 'Enter the full URL, query string, or any text containing special characters into the input area.' },
              { step: '2', title: 'Choose Action', desc: 'Click "Encode URL" to convert to percent-encoding, or "Decode URL" to revert to readable text.' },
              { step: '3', title: 'View Results', desc: 'See the converted output in the dark block along with character count stats.' },
              { step: '4', title: 'Copy or Download', desc: 'Copy the result to clipboard for immediate use, or download as a .txt file.' },
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
            How URL Encoding Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">Standard protocol, safe transmission. Here's the logic.</p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Zap size={16} className="text-sky-600" />
                Percent-Encoding Standard
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                encodeURIComponent("hello world") → "hello%20world"
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                We use JavaScript's native encodeURIComponent() which replaces unsafe ASCII characters with a % followed by two hexadecimal digits. This ensures URLs are valid for web transmission.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <ArrowRightLeft size={16} className="text-sky-600" />
                Decoding Process
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                decodeURIComponent("hello%20world") → "hello world"
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Decoding reverses the process by identifying %XX sequences and converting them back to their original UTF-8 characters. Error handling catches malformed sequences to prevent crashes.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2 flex items-center gap-2">
                <Shield size={16} className="text-sky-600" />
                Privacy Note
              </h3>
              <p className="text-sky-800 text-xs leading-relaxed">
                All encoding/decoding happens locally in your browser. No URL inputs are ever sent to any server. 100% private.
              </p>
            </div>
          </div>
        </section>

        {/* ── Sample Results ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Real Example: API Query Parameter Encoding
          </h2>
          <p className="text-gray-500 text-sm mb-6">See how encoding protects special characters in URLs.</p>

          <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Input (Raw Text)</p>
                <p className="font-mono text-xs text-gray-800 break-all">
                  search query: "best coffee shops & cafes"
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Output (Encoded)</p>
                <p className="font-mono text-xs text-gray-800 break-all">
                  search%20query%3A%20%22best%20coffee%20shops%20%26%20cafes%22
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Result: Spaces, colons, quotes, and ampersands are safely encoded, preventing API errors when sending this as a query parameter.
            </p>
          </div>
        </section>

        {/* ── Use Cases ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses URL Encoders?
          </h2>
          <p className="text-gray-500 text-sm mb-6">From developers to marketers — safe URLs matter everywhere.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Zap size={20} className="text-sky-600" />, title: 'Web Developers', desc: 'Encode query parameters for API requests, form submissions, and dynamic URL generation in React/Vue apps.' },
              { icon: <Globe size={20} className="text-sky-600" />, title: 'SEO Specialists', desc: 'Ensure URLs with special characters are properly formatted for search engine crawling and indexing.' },
              { icon: <FileText size={20} className="text-sky-600" />, title: 'Data Analysts', desc: 'Clean and normalize URL datasets by decoding percent-encoded strings for readable analysis.' },
              { icon: <HelpCircle size={20} className="text-sky-600" />, title: 'QA Testers', desc: 'Verify that applications correctly handle encoded vs. decoded URLs in edge cases and error scenarios.' },
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
            Why URL Encoding Matters for Web Development
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            URLs can only be sent over the Internet using the <strong>ASCII character-set</strong>. Since URLs often contain characters outside this set — spaces, non-Latin characters, emojis, or symbols like <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">?</code> <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">&amp;</code> <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">=</code> — they must be converted into a valid ASCII format. This process is called <strong>URL Encoding</strong> or <strong>Percent-Encoding</strong>.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Our tool uses <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">encodeURIComponent()</code> which encodes all special characters for maximum safety — ideal for query parameter values in API requests. The decode function reverses the process, converting all <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">%XX</code> sequences back to their original characters.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Built for speed and privacy — all processing happens in your browser using JavaScript. Your URLs never leave your device. Just accurate encoding, instantly.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">Privacy Note</h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No URL inputs are uploaded to any server. No data is stored or tracked. Your info stays on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need more developer tools? Try the{' '}
            <Link href="/tools/base64-encode" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Base64 Encoder</Link> for data encoding, or the{' '}
            <Link href="/tools/json-formatter" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">JSON Formatter</Link> for API debugging.
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
            Related Developer &amp; Encoding Tools
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

export default URLEncoder;