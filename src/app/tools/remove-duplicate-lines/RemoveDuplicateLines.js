'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Copy, RefreshCw, Download, List, Home, ChevronDown,
  Hash, Layers, Trash2, ArrowUp, ArrowDown, FileText,
  Zap, Shield, HelpCircle, CheckCircle2, Globe
} from 'lucide-react';

// ─── Helper Functions (Outside Component) ─────────────────────────────────────
const processText = (text, action) => {
  const lines = text.split('\n');
  
  switch (action) {
    case 'duplicates': {
      return [...new Set(lines)];
    }
    case 'duplicates-empty': {
      const filtered = lines.filter((line) => line.trim() !== '');
      return [...new Set(filtered)];
    }
    case 'empty': {
      return lines.filter((line) => line.trim() !== '');
    }
    case 'sort-asc': {
      const sorted = [...lines];
      sorted.sort((a, b) => a.localeCompare(b));
      return sorted;
    }
    case 'sort-desc': {
      const sorted = [...lines];
      sorted.sort((a, b) => b.localeCompare(a));
      return sorted;
    }
    default:
      return lines;
  }
};

const countStats = (inputText, outputText) => {
  const inputLines = inputText ? inputText.split('\n') : [];
  const outputLines = outputText ? outputText.split('\n') : [];
  const uniqueInput = new Set(inputLines);
  
  return {
    totalInput: inputLines.length,
    totalOutput: outputLines.length,
    duplicatesRemoved: inputLines.length - uniqueInput.size,
    emptyRemoved: inputLines.filter((l) => l.trim() === '').length - outputLines.filter((l) => l.trim() === '').length,
  };
};

// ─── FAQ Data (Sync with page.js JSON-LD) ─────────────────────────────────────
const FAQS = [
  {
    q: 'How to remove duplicate lines from a text list online free?',
    a: 'Paste your list into the text area and click "Remove Duplicates Only". The tool instantly scans every line, keeps the first occurrence, and deletes all repeated lines. Copy or download the cleaned result.',
  },
  {
    q: 'Can I remove duplicate lines and empty lines at the same time?',
    a: 'Yes. Click "Remove Duplicates & Empty Lines" to perform both actions in one step. This removes all repeated entries and all blank lines, giving you a completely clean list.',
  },
  {
    q: 'How to sort lines alphabetically after removing duplicates?',
    a: 'First click "Remove Duplicates" to clean the list, then click "Sort A-Z" to alphabetize. The result in the output block will be both deduplicated and sorted in ascending order.',
  },
  {
    q: 'Is my text data safe when using this tool?',
    a: 'Yes. All processing happens entirely in your browser using JavaScript. No text is ever sent to any server. Your data remains 100% private.',
  },
  {
    q: 'Can I remove duplicates from a large list with thousands of lines?',
    a: 'Yes. The tool handles large lists efficiently using JavaScript Set operations. For extremely large files (multiple megabytes), there is no strict limit, though very large inputs may cause a slight delay depending on your device.',
  },
  {
    q: 'Does this tool preserve the original order of first occurrences?',
    a: 'Yes. When removing duplicates, we keep the first occurrence of each line and remove later repeats. This maintains your original list order while eliminating redundancy.',
  },
];

// ─── Related Tools (6 Items from your tools array) ────────────────────────────
const RELATED_TOOLS = [
  { href: '/tools/case-converter', title: 'Case Converter', desc: 'Convert text to Uppercase, Lowercase, Title Case and more formats.' },
  { href: '/tools/word-counter', title: 'Word Counter', desc: 'Count words, characters, sentences and lines in your text instantly.' },
  { href: '/tools/json-formatter', title: 'JSON Formatter', desc: 'Beautify, minify and validate JSON data with syntax highlighting.' },
  { href: '/tools/remove-duplicate-lines', title: 'Remove Duplicate Lines', desc: 'Clean up text lists by removing repeated entries and blank lines.' },
  { href: '/tools/url-encoder', title: 'URL Encoder', desc: 'Encode or decode URL strings for safe web use.' },
  { href: '/tools/base64-encode', title: 'Base64 Encoder', desc: 'Encode and decode Base64 strings for data transmission.' },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const RemoveDuplicateLines = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [activeAction, setActiveAction] = useState('');
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const runAction = (action) => {
    if (!inputText.trim()) return;
    const result = processText(inputText, action);
    setOutputText(result.join('\n'));
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
    link.download = `cleaned-list-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetAll = () => {
    setInputText('');
    setOutputText('');
    setActiveAction('');
    setCopied(false);
  };

  const stats = countStats(inputText, outputText);
  const hasResult = outputText.length > 0;

  const resultStats = hasResult
    ? [
        { icon: List, label: 'Input Lines', value: stats.totalInput, color: 'text-gray-800' },
        { icon: Layers, label: 'Output Lines', value: stats.totalOutput, color: 'text-emerald-600' },
        { icon: Trash2, label: 'Duplicates Removed', value: Math.max(0, stats.duplicatesRemoved), color: 'text-orange-500' },
        { icon: Hash, label: 'Empty Lines Removed', value: Math.max(0, stats.emptyRemoved), color: 'text-sky-600' },
      ]
    : [];

  const actionLabels = {
    duplicates: 'Remove Duplicates Only',
    'duplicates-empty': 'Remove Duplicates & Empty Lines',
    empty: 'Remove Empty Lines Only',
    'sort-asc': 'Sort A-Z (Ascending)',
    'sort-desc': 'Sort Z-A (Descending)',
  };

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
            <li><span className="text-gray-900 font-semibold">Remove Duplicate Lines</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        
        {/* ── Hero ── */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <List className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Remove Duplicate Lines from Text List Online Free –{' '}
            <span className="text-sky-600">Sort and Clean Data Instantly</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Clean up text lists by removing repeated entries, blank lines, and sorting alphabetically. Download the result as .txt.
          </p>
        </div>

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          
          {/* Text Input */}
          <div className="mb-6">
            <label className={labelCls}>Paste Your List</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-52 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 resize-none font-mono text-sm"
              placeholder="apple&#10;banana&#10;apple&#10;orange&#10;banana&#10;grape&#10;&#10;orange"
            />
            <p className="text-xs text-gray-400 mt-1">
              {inputText ? inputText.split('\n').length : 0} line{inputText && inputText.split('\n').length !== 1 ? 's' : ''} in input
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            <button
              onClick={() => runAction('duplicates')}
              disabled={!inputText.trim()}
              className="bg-sky-600 hover:bg-sky-700 active:scale-95 disabled:opacity-40 transition-all text-white font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm"
            >
              <Trash2 size={16} /> Remove Duplicates
            </button>
            <button
              onClick={() => runAction('duplicates-empty')}
              disabled={!inputText.trim()}
              className="bg-sky-600 hover:bg-sky-700 active:scale-95 disabled:opacity-40 transition-all text-white font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm"
            >
              <Trash2 size={16} /> Duplicates + Empty
            </button>
            <button
              onClick={() => runAction('empty')}
              disabled={!inputText.trim()}
              className="bg-white border-2 border-sky-100 hover:bg-sky-50 disabled:opacity-40 text-sky-700 font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
            >
              <FileText size={16} /> Remove Empty
            </button>
            <button
              onClick={() => runAction('sort-asc')}
              disabled={!inputText.trim()}
              className="bg-white border-2 border-sky-100 hover:bg-sky-50 disabled:opacity-40 text-sky-700 font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
            >
              <ArrowUp size={16} /> Sort A-Z
            </button>
            <button
              onClick={() => runAction('sort-desc')}
              disabled={!inputText.trim()}
              className="bg-white border-2 border-sky-100 hover:bg-sky-50 disabled:opacity-40 text-sky-700 font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
            >
              <ArrowDown size={16} /> Sort Z-A
            </button>
            <button
              onClick={resetAll}
              className="bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors flex items-center justify-center gap-2 px-4 py-3"
            >
              <RefreshCw size={15} /> Reset
            </button>
          </div>

          {/* ── Results Section ── */}
          {hasResult && (
            <div className="mt-8">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {resultStats.map((stat, i) => (
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
              <List size={32} className="mx-auto mb-3 text-gray-300" />
              <p>Paste a list and click <strong className="text-gray-500">Remove Duplicates</strong> to clean it up</p>
            </div>
          )}
        </div>

        {/* ── How to Use ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Remove Duplicate Lines from Text List Online Free
          </h2>
          <ol className="space-y-5">
            {[
              { step: '1', title: 'Paste Your List', desc: 'Copy and paste your text list into the input area — one item per line works best.' },
              { step: '2', title: 'Choose an Action', desc: 'Click "Remove Duplicates" to delete repeats, or "Duplicates + Empty" for a full cleanup.' },
              { step: '3', title: 'Sort if Needed', desc: 'Use "Sort A-Z" or "Sort Z-A" to alphabetize your cleaned list in ascending or descending order.' },
              { step: '4', title: 'Copy or Download', desc: 'Get your result via one-click copy to clipboard, or download as a .txt file for offline use.' },
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
            How Duplicate Removal Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">Simple logic, powerful cleanup. Here's what happens behind the scenes.</p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Zap size={16} className="text-sky-600" />
                Set-Based Deduplication
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                [...new Set(lines)] → keeps first occurrence only
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                We use JavaScript's native Set data structure to identify unique lines. This preserves the order of first occurrences while removing all later duplicates — fast and memory-efficient.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <ArrowUp size={16} className="text-sky-600" />
                Locale-Aware Sorting
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                lines.sort((a, b) = a.localeCompare(b))
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Sorting uses localeCompare() for accurate alphabetical ordering that respects special characters and international text — not just basic ASCII comparison.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2 flex items-center gap-2">
                <Shield size={16} className="text-sky-600" />
                Privacy Note
              </h3>
              <p className="text-sky-800 text-xs leading-relaxed">
                All text processing happens locally in your browser. No list data is ever sent to any server. 100% private.
              </p>
            </div>
          </div>
        </section>

        {/* ── Sample Results ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Real Example: Email List Cleanup
          </h2>
          <p className="text-gray-500 text-sm mb-6">See how duplicate removal works in practice.</p>

          <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Input (with duplicates)</p>
                <p className="font-mono text-xs text-gray-800 break-all">
                  john@example.com&#10;jane@example.com&#10;john@example.com&#10;bob@example.com&#10;&#10;jane@example.com
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Output (after "Duplicates + Empty")</p>
                <p className="font-mono text-xs text-gray-800 break-all">
                  john@example.com&#10;jane@example.com&#10;bob@example.com
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Result: 3 unique emails kept (first occurrences), 2 duplicates + 1 blank line removed. Ready for your email campaign.
            </p>
          </div>
        </section>

        {/* ── Use Cases ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses Duplicate Line Removers?
          </h2>
          <p className="text-gray-500 text-sm mb-6">From marketers to developers — clean lists save time everywhere.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Zap size={20} className="text-sky-600" />, title: 'Email Marketers', desc: 'Clean subscriber lists before campaigns to avoid sending duplicates and improve deliverability rates.' },
              { icon: <List size={20} className="text-sky-600" />, title: 'SEO Specialists', desc: 'Deduplicate keyword lists, backlink data, or competitor URLs for accurate analysis and reporting.' },
              { icon: <Globe size={20} className="text-sky-600" />, title: 'Data Analysts', desc: 'Pre-process CSV exports or log files by removing repeated entries before importing into spreadsheets or databases.' },
              { icon: <HelpCircle size={20} className="text-sky-600" />, title: 'Developers', desc: 'Clean up config files, dependency lists, or test data without manual find-and-replace operations.' },
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
            Why Remove Duplicate Lines Online?
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Messy lists waste time and cause errors. Whether you're managing email subscribers, SEO keywords, product SKUs, or user IDs, duplicate entries lead to wasted effort, skewed analytics, and frustrated users. Our free <strong>Remove Duplicate Lines</strong> tool fixes this instantly.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Unlike spreadsheet software that requires formulas, filters, and manual steps, our tool works with a single click. Paste your list, choose an action, and get a clean result. The built-in sort feature lets you alphabetize your list in A-Z or Z-A order after cleaning.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Built for speed and privacy — all processing happens in your browser using JavaScript. Your text never leaves your device. Just clean data, instantly.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">Privacy Note</h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No list data is uploaded to any server. No data is stored or tracked. Your text stays on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need more text tools? Try the{' '}
            <Link href="/tools/case-converter" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Case Converter</Link> for formatting, or the{' '}
            <Link href="/tools/word-counter" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Word Counter</Link> for quick stats.
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
            Related Text & Data Tools
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

export default RemoveDuplicateLines;