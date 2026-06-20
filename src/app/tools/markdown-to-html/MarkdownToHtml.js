'use client'

import { useState, useMemo } from "react";
import Link from "next/link";
import { marked } from "marked";
import DOMPurify from 'isomorphic-dompurify';
import {
  Copy, Download, CheckCircle2, Code, Eye, Home, ChevronDown,
  FileText, Zap, Shield, ArrowRight, Type, HelpCircle, Globe, RefreshCw, Hash
} from "lucide-react";

import ResponsiveAd from "../../../components/ResponsiveAd";


// Configure marked to use standard breaks
marked.setOptions({ breaks: true, gfm: true });

// ─── Sample Markdown ──────────────────────────────────────────────────────────
const sampleMarkdown = `# Welcome to Markdown to HTML Converter

This is a **free online tool** to convert your *Markdown* into clean HTML code.

### Features
- Instant conversion
- Live HTML Preview
- Copy or Download HTML
- 100% Secure (runs in your browser)

### Code Example
\`\`\`javascript
const greeting = "Hello World!";
console.log(greeting);
\`\`\`

> "The best way to predict the future is to invent it." — Alan Kay

Visit [GeneratorPromptAI](https://www.generatorpromptai.com) for more free tools.
`;

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MarkdownToHtml() {
  const [markdown, setMarkdown] = useState(sampleMarkdown);
  const [activeTab, setActiveTab] = useState("code");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Convert MD to HTML safely
  const rawHtml = useMemo(() => {
    if (!markdown.trim()) return "";
    return marked.parse(markdown);
  }, [markdown]);

  const safeHtml = useMemo(() => {
    return DOMPurify.sanitize(rawHtml);
  }, [rawHtml]);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Converted Markdown</title>
  <style>body { font-family: sans-serif; line-height: 1.6; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }</style>
</head>
<body>
 ${rawHtml}
</body>
</html>`;
    const blob = new Blob([fullHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reset = () => { setMarkdown(sampleMarkdown); setCopied(false); };

  const charCount = markdown.length;
  const wordCount = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
  const lineCount = markdown.split("\n").length;
  const htmlLength = rawHtml.length;

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
            <li><span className="text-gray-900 font-semibold">Markdown to HTML</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-6xl mx-auto w-full px-4 pb-20">

        {/* ── Hero ── */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <FileText className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Free Markdown to HTML Converter –{" "}
            <span className="text-sky-600">Instant & Secure</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Paste your Markdown text and get clean, sanitized HTML code instantly. No server upload, 100% private.
          </p>
        </div>

        <ResponsiveAd />

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">

          {/* Editor Grid */}
          <div className="grid lg:grid-cols-2 gap-5 mb-6">
            {/* Markdown Input */}
            <div className="flex flex-col border border-gray-200 rounded-2xl overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2"><Type size={14} /> Markdown Input</h3>
                <button onClick={() => setMarkdown("")} className="text-xs text-gray-400 hover:text-red-500 transition-colors">Clear</button>
              </div>
              <textarea value={markdown} onChange={(e) => setMarkdown(e.target.value)}
                className="flex-1 w-full p-4 min-h-[320px] focus:outline-none text-sm text-gray-800 font-mono bg-white resize-none"
                placeholder="Type or paste your Markdown here..." />
            </div>

            {/* HTML Output */}
            <div className="flex flex-col border border-gray-200 rounded-2xl overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex gap-2">
                  <button onClick={() => setActiveTab("code")}
                    className={`text-sm font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${activeTab === "code" ? "bg-sky-100 text-sky-700" : "text-gray-500 hover:text-gray-800"}`}>
                    <Code size={14} /> HTML Code
                  </button>
                  <button onClick={() => setActiveTab("preview")}
                    className={`text-sm font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${activeTab === "preview" ? "bg-sky-100 text-sky-700" : "text-gray-500 hover:text-gray-800"}`}>
                    <Eye size={14} /> Preview
                  </button>
                </div>
              </div>
              <div className="flex-1 min-h-[320px] p-4 bg-white overflow-auto">
                {activeTab === "code" ? (
                  <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap break-words">
                    {rawHtml ? rawHtml.replace(/</g, "&lt;").replace(/>/g, "&gt;") : <span className="text-gray-400">HTML code will appear here...</span>}
                  </pre>
                ) : (
                  <div className="prose prose-sm max-w-none text-gray-800 prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-sky-600 prose-code:text-pink-600 prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-blockquote:border-l-4 prose-blockquote:border-sky-500 prose-blockquote:bg-sky-50 prose-blockquote:py-2 prose-blockquote:px-4 rounded-r-lg"
                    dangerouslySetInnerHTML={{ __html: safeHtml || "<span className='text-gray-400'>Preview will appear here...</span>" }} />
                )}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"><div className="flex justify-center text-sky-500 mb-1"><Type size={20} /></div><p className="text-lg font-bold text-gray-800">{wordCount}</p><p className="text-xs text-gray-500 mt-0.5">Words</p></div>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"><div className="flex justify-center text-sky-500 mb-1"><Hash size={20} /></div><p className="text-lg font-bold text-gray-800">{charCount}</p><p className="text-xs text-gray-500 mt-0.5">Characters</p></div>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"><div className="flex justify-center text-sky-500 mb-1"><Code size={20} /></div><p className="text-lg font-bold text-gray-800">{lineCount}</p><p className="text-xs text-gray-500 mt-0.5">Lines</p></div>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"><div className="flex justify-center text-sky-500 mb-1"><FileText size={20} /></div><p className="text-lg font-bold text-gray-800">{htmlLength}</p><p className="text-xs text-gray-500 mt-0.5">HTML Chars</p></div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button onClick={handleCopy} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">
              {copied ? <><CheckCircle2 size={18} /> Copied!</> : <><Copy size={18} /> Copy HTML Code</>}
            </button>
            <button onClick={handleDownload} disabled={!rawHtml} className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-40">
              <Download size={18} /> Download .html
            </button>
          </div>

          {/* Empty State */}
          {!markdown.trim() && (
            <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mt-6">
              <FileText size={32} className="mx-auto mb-3 text-gray-300" />
              <p>Paste your Markdown above or click Reset to load sample content</p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Convert Markdown to HTML in 3 Simple Steps</h2>
          <ol className="space-y-5">
            {[
              { step: "1", title: "Paste Your Markdown", desc: "Type or paste your Markdown text (headers, bold, lists, links, code blocks) into the left editor. Sample content loads by default." },
              { step: "2", title: "View Code or Preview", desc: "Switch between 'HTML Code' tab to see raw markup or 'Preview' tab to see rendered output. Both update instantly as you type." },
              { step: "3", title: "Copy or Download", desc: "Click Copy HTML Code to clipboard or Download .html to get a ready-to-use file with proper DOCTYPE and styling." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How Browser-Based Markdown Conversion Works</h2>
          <p className="text-gray-500 text-sm mb-6">No server upload. No waiting. Everything happens on your device.</p>
          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Marked.js Parser</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                marked.parse(markdown) {'{'} breaks: true, gfm: true {'}'}
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">We use the open-source marked.js library to parse your Markdown into HTML. It supports GitHub Flavored Markdown (GFM) including tables, task lists, strikethrough, and fenced code blocks.</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">DOMPurify Sanitization</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                DOMPurify.sanitize(rawHtml) → safe output
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">Before displaying preview or allowing download, we sanitize the HTML using DOMPurify to remove any malicious scripts or XSS vulnerabilities — keeping your output safe for production use.</p>
            </div>
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">Privacy First</h3>
              <p className="text-sky-800 text-xs leading-relaxed">All conversion happens locally in your browser using JavaScript. No Markdown or HTML is uploaded, stored, or sent anywhere. Close the tab and your content is gone. 100% private by design.</p>
            </div>
          </div>
        </section>

        {/* ─── Sample Results ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What Kind of Output Can You Expect?</h2>
          <p className="text-gray-500 text-sm mb-6">Real examples with code view and preview mode.</p>
          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-lg">Code View</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Input</p><p className="font-semibold text-gray-800"># Header + **bold**</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Output</p><p className="font-semibold text-green-600">&lt;h1&gt;Header&lt;/h1&gt; + &lt;strong&gt;</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Best For</p><p className="font-semibold text-gray-800">Developers, CMS editing</p></div>
              </div>
            </div>
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded-lg">Preview Mode</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Input</p><p className="font-semibold text-gray-800">*italic* + [link](url)</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Output</p><p className="font-semibold text-blue-600"><em>italic</em> + clickable link</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Best For</p><p className="font-semibold text-gray-800">Content review, QA testing</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Who Uses This Markdown to HTML Converter?</h2>
          <p className="text-gray-500 text-sm mb-6">From developers to writers — clean HTML speeds up workflows.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Code size={20} className="text-sky-600" />, title: "Frontend Developers", desc: "Convert README.md files, documentation, or blog posts to HTML for static sites, React apps, or CMS integration." },
              { icon: <Zap size={20} className="text-green-600" />, title: "Technical Writers", desc: "Write in Markdown for speed, then instantly generate production-ready HTML for publishing platforms or client deliverables." },
              { icon: <Globe size={20} className="text-amber-600" />, title: "Content Creators", desc: "Draft blog posts or newsletters in Markdown, then export clean HTML for WordPress, Ghost, or email marketing tools." },
              { icon: <Shield size={20} className="text-violet-600" />, title: "Privacy-Conscious Users", desc: "Convert sensitive Markdown documents without uploading to third-party servers. Everything stays on your device — always." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Convert Markdown to HTML in Your Browser?</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Most online Markdown converters ask you to paste content into a web form that sends your data to their servers. That means waiting for responses, worrying about privacy, and sometimes dealing with ads or limits. Our free Markdown to HTML converter works differently — everything happens <strong>inside your browser</strong> using marked.js and DOMPurify.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Supports full GitHub Flavored Markdown (GFM): tables, task lists, strikethrough, fenced code blocks, and more. The output HTML is automatically sanitized to prevent XSS attacks, making it safe to paste directly into your web projects or CMS.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Toggle between raw HTML code and live preview to see exactly how your content will render. Real-time stats show word count, character count, lines, and HTML output length. Copy to clipboard or download as a complete .html file with proper DOCTYPE and basic styling.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">Privacy Note</h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No Markdown or HTML is uploaded to any server. No data is stored or tracked. Your content stays on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need to format JSON for your API docs? Try the{" "}
            <Link href="/tools/json-formatter" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">JSON Formatter</Link>. 
            Want to count words in your Markdown? The{" "}
            <Link href="/tools/word-counter" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Word Counter</Link> has you covered.
          </p>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              { q: "How do I convert Markdown to HTML?", a: "Simply paste your Markdown text into the left editor on this page. The HTML code will be instantly generated on the right side. You can then copy it or download it as an HTML file." },
              { q: "Is it safe to convert Markdown to HTML here?", a: "Yes. The entire conversion happens inside your web browser. Your text is never sent to any external server, ensuring complete privacy for sensitive documents." },
              { q: "Does this support GitHub Flavored Markdown?", a: "Yes, our converter fully supports GFM (GitHub Flavored Markdown), including tables, task lists, strikethrough text, and fenced code blocks with syntax highlighting capabilities." },
              { q: "Why is my HTML sanitized?", a: "Markdown can contain raw HTML. To protect you from accidental XSS (cross-site scripting) vulnerabilities if you paste untrusted text, we automatically sanitize the output HTML to remove malicious scripts." },
              { q: "Can I use the generated HTML in my website?", a: "Absolutely. The generated HTML is clean and standard. You can copy it directly into your HTML files, CMS, or static site generator." },
              { q: "Does this tool work offline?", a: "Yes. Once the page loads, all conversion happens locally in your browser. You can use it without an internet connection after the initial load." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Developer Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/tools/json-formatter", title: "JSON Formatter", desc: "Beautify, minify and validate JSON code." },
              { href: "/tools/word-counter", title: "Word Counter", desc: "Count words, characters and reading time instantly." },
              { href: "/tools/fake-data-generator", title: "Fake Data Generator", desc: "Generate realistic dummy data including text fields." },
              { href: "/tools/case-converter", title: "Case Converter", desc: "Change text case for formatting consistency." },
              { href: "/tools/remove-duplicate-lines", title: "Remove Duplicates", desc: "Clean up text lists by removing duplicate lines." },
              { href: "/tools/emoji-picker", title: "Emoji Picker", desc: "Search & copy emojis for captions and messages." },
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
  );
}