"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { marked } from "marked";
import DOMPurify from 'isomorphic-dompurify'
import {
  Copy,
  Download,
  CheckCircle2,
  Code,
  Eye,
  Home,
  ChevronRight,
  FileText,
  Zap,
  Shield,
  ArrowRight,
  Type,
} from "lucide-react";

// Configure marked to use standard breaks
marked.setOptions({ breaks: true, gfm: true });

const MarkdownToHtml = () => {
  const [markdown, setMarkdown] =
    useState(`# Welcome to Markdown to HTML Converter

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
`);
  const [activeTab, setActiveTab] = useState("code");
  const [copied, setCopied] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-sky-600 transition-colors"
          >
            <Home size={14} /> Home
          </Link>
          <ChevronRight size={12} />
          <Link
            href="/pages/all-tools"
            className="hover:text-sky-600 transition-colors"
          >
            All Tools
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-semibold">Markdown to HTML</span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-2xl mb-4">
            <FileText className="text-sky-600" size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Free Markdown to HTML Converter –{" "}
            <span className="text-sky-600">Instant & Secure</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Paste your Markdown text and get clean, sanitized HTML code
            instantly. No server upload, 100% private.
          </p>
        </div>

        {/* Tool Card */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-4 md:p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Markdown Input */}
            <div className="flex flex-col border border-gray-200 rounded-2xl overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Type size={14} /> Markdown Input
                </h3>
                <button
                  onClick={() => setMarkdown("")}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                >
                  Clear
                </button>
              </div>
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="flex-1 w-full p-4 min-h-[400px] focus:outline-none text-sm text-gray-800 font-mono bg-white resize-none"
                placeholder="Type or paste your Markdown here..."
              />
            </div>

            {/* HTML Output */}
            <div className="flex flex-col border border-gray-200 rounded-2xl overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`text-sm font-bold flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${activeTab === "code" ? "bg-sky-100 text-sky-700" : "text-gray-500 hover:text-gray-800"}`}
                  >
                    <Code size={14} /> HTML Code
                  </button>
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`text-sm font-bold flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${activeTab === "preview" ? "bg-sky-100 text-sky-700" : "text-gray-500 hover:text-gray-800"}`}
                  >
                    <Eye size={14} /> Preview
                  </button>
                </div>
              </div>

              <div className="flex-1 min-h-[400px] p-4 bg-white overflow-auto">
                {activeTab === "code" ? (
                  <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap break-words">
                    {rawHtml ? (
                      rawHtml.replace(/</g, "&lt;").replace(/>/g, "&gt;")
                    ) : (
                      <span className="text-gray-400">
                        HTML code will appear here...
                      </span>
                    )}
                  </pre>
                ) : (
                  <div
                    className="prose prose-sm sm:prose-base max-w-none text-gray-800
                      prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-sky-600 
                      prose-code:text-pink-600 prose-pre:bg-gray-900 prose-pre:text-gray-100 
                      prose-blockquote:border-l-4 prose-blockquote:border-sky-500 prose-blockquote:bg-sky-50 prose-blockquote:py-2 prose-blockquote:px-4 rounded-r-lg"
                    dangerouslySetInnerHTML={{
                      __html:
                        safeHtml ||
                        "<span className='text-gray-400'>Preview will appear here...</span>",
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-4">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
            >
              {copied ? (
                <>
                  <CheckCircle2 size={15} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={15} /> Copy HTML Code
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              disabled={!rawHtml}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-40 text-gray-700 rounded-xl text-sm font-semibold transition-all"
            >
              <Download size={15} /> Download .html File
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            {
              icon: <Zap size={20} className="text-amber-500" />,
              title: "Instant Conversion",
              desc: "See clean HTML code generated in milliseconds as you type.",
            },
            {
              icon: <Eye size={20} className="text-sky-500" />,
              title: "Live Preview",
              desc: "Toggle between raw HTML code and a rendered visual preview.",
            },
            {
              icon: <Shield size={20} className="text-green-600" />,
              title: "100% Safe & Private",
              desc: "Runs entirely in your browser. No text is sent to any server.",
            },
            {
              icon: <Code size={20} className="text-violet-600" />,
              title: "Sanitized Output",
              desc: "HTML is cleaned of XSS scripts and malicious tags automatically.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-sky-300 transition-all"
            >
              <div className="mb-3">{f.icon}</div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                {f.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* How to use */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Convert Markdown to HTML Online
          </h2>
          <ol className="space-y-4">
            {[
              {
                step: "1",
                title: "Paste Markdown",
                desc: "Type or paste your Markdown text (headers, bold, lists, links, code blocks) into the left editor.",
              },
              {
                step: "2",
                title: "View HTML Code",
                desc: "Switch to the 'HTML Code' tab to see the generated HTML markup instantly.",
              },
              {
                step: "3",
                title: "Preview Output",
                desc: "Click the 'Preview' tab to see exactly how the HTML will look when rendered on a webpage.",
              },
              {
                step: "4",
                title: "Copy or Download",
                desc: "Click 'Copy HTML Code' to clipboard or 'Download .html' to get a ready-to-use HTML file.",
              },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="w-8 h-8 bg-sky-100 text-sky-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {item.title}
                  </p>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* SEO Content */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Free Online Markdown to HTML Converter – No Signup Required
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            If you are writing documentation, README files, or blog posts in
            Markdown and need to convert them to HTML for a website, this tool
            is for you. Unlike online converters that upload your data to a
            server, our Markdown to HTML converter runs entirely in your browser
            using JavaScript.
          </p>
          <p className="text-gray-600 leading-relaxed">
            It supports standard Markdown syntax (GFM - GitHub Flavored
            Markdown), including tables, task lists, strikethrough, and fenced
            code blocks. The output HTML is automatically sanitized to prevent
            cross-site scripting (XSS) attacks, making it safe to paste directly
            into your web projects.
          </p>
        </section>

        {/* FAQ */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Markdown to HTML Converter – FAQs
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              {
                q: "How do I convert Markdown to HTML?",
                a: "Simply paste your Markdown text into the left editor on this page. The HTML code will be instantly generated on the right side. You can then copy it or download it as an HTML file.",
              },
              {
                q: "Is it safe to convert Markdown to HTML here?",
                a: "Yes. The entire conversion happens inside your web browser. Your text is never sent to any external server, ensuring complete privacy for sensitive documents.",
              },
              {
                q: "Does this support GitHub Flavored Markdown?",
                a: "Yes, our converter fully supports GFM (GitHub Flavored Markdown), including tables, task lists, strikethrough text, and fenced code blocks with syntax highlighting capabilities.",
              },
              {
                q: "Why is my HTML sanitized?",
                a: "Markdown can contain raw HTML. To protect you from accidental XSS (cross-site scripting) vulnerabilities if you paste untrusted text, we automatically sanitize the output HTML to remove malicious scripts.",
              },
              {
                q: "Can I use the generated HTML in my website?",
                a: "Absolutely. The generated HTML is clean and standard. You can copy it directly into your HTML files, CMS, or static site generator.",
              },
            ].map((item, i) => (
              <details
                key={i}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden group"
              >
                <summary className="px-5 py-4 cursor-pointer font-semibold text-gray-900 text-sm flex items-center justify-between hover:bg-gray-50 transition list-none">
                  {item.q}
                  <ChevronRight
                    size={16}
                    className="text-gray-400 group-open:rotate-90 transition-transform"
                  />
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related Free Developer Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/time-zone-converter",
                title: "Time Zone Converter",
                desc: "Convert time between cities and global time zones accurately.",
              },
              {
                href: "/tools/json-formatter",
                title: "JSON Formatter & Validator",
                desc: "Format, validate, and beautify messy JSON data instantly.",
              },
              {
                href: "/tools/word-counter",
                title: "Word Counter",
                desc: "Count words, characters, sentences, and paragraphs in your text.",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-sky-400 transition-all"
              >
                <h3 className="font-bold text-gray-800 text-sm mb-1.5 group-hover:text-sky-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {tool.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MarkdownToHtml;
