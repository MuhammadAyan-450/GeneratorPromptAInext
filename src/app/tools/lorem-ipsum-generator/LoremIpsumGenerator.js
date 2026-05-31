'use client'

import { useState } from "react";
import Link from "next/link";
import {
  Copy, RefreshCw, FileText, Download, AlignLeft, Home, ChevronDown,
  Hash, Type, Layers, Code, Shield, Zap, Globe, HelpCircle, CheckCircle
} from "lucide-react";

// ─── Base Words ───────────────────────────────────────────────────────────────
const baseWords = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation",
  "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat",
  "duis", "aute", "irure", "reprehenderit", "voluptate", "velit", "esse", "cillum",
  "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat",
  "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt",
  "mollit", "anim", "id", "est", "laborum"
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(4);
  const [wordsPerPara, setWordsPerPara] = useState(80);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [includeHtml, setIncludeHtml] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const generateLorem = () => {
    let text = "";
    const getRandomSentence = () => {
      const length = Math.floor(Math.random() * 12) + 6;
      let sentence = "";
      for (let i = 0; i < length; i++) {
        const word = baseWords[Math.floor(Math.random() * baseWords.length)];
        sentence += (i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word) + " ";
      }
      return sentence.trim() + ".";
    };

    for (let p = 0; p < paragraphs; p++) {
      let para = "";
      let wordCount = 0;
      while (wordCount < wordsPerPara) {
        const sentence = getRandomSentence();
        const sentenceWords = sentence.split(" ").length;
        if (wordCount + sentenceWords > wordsPerPara) break;
        para += sentence + " ";
        wordCount += sentenceWords;
      }
      if (includeHtml) {
        const headingLevel = Math.floor(Math.random() * 3) + 2;
        text += `<h${headingLevel}>Section ${p + 1}</h${headingLevel}>\n<p>${para.trim()}</p>\n\n`;
      } else {
        text += para.trim() + "\n\n";
      }
    }
    if (startWithLorem && !includeHtml) {
      text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " + text;
    }
    setGeneratedText(text.trim());
  };

  const copyText = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    if (!generatedText) return;
    const blob = new Blob([generatedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `lorem-ipsum-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => { setGeneratedText(""); setCopied(false); };

  const totalWords = generatedText.trim() ? generatedText.trim().split(/\s+/).length : 0;
  const totalChars = generatedText.length;
  const totalSentences = generatedText.trim() ? generatedText.split(/[.!?]+/).filter(Boolean).length : 0;

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
            <li><span className="text-gray-900 font-semibold">Lorem Ipsum Generator</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">

        {/* ── Hero ── */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <AlignLeft className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Generate Placeholder Text for Website Design Free –{" "}
            <span className="text-sky-600">Lorem Ipsum with HTML Tags</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Create customizable dummy text for wireframes, mockups and prototypes. Set paragraph count, word density, and HTML output.
          </p>
        </div>

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">

          {/* Settings Grid */}
          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Paragraphs</label>
              <input type="number" value={paragraphs} onChange={(e) => setParagraphs(Math.max(1, Math.min(20, parseInt(e.target.value) || 4)))} min="1" max="20" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800" />
              <p className="text-xs text-gray-400 mt-1">1 to 20 paragraphs</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Words per Paragraph</label>
              <input type="number" value={wordsPerPara} onChange={(e) => setWordsPerPara(Math.max(20, Math.min(300, parseInt(e.target.value) || 80)))} min="20" max="300" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800" />
              <p className="text-xs text-gray-400 mt-1">20 to 300 words</p>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
              <input type="checkbox" checked={startWithLorem} onChange={(e) => setStartWithLorem(e.target.checked)} className="h-4 w-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500" />
              Start with &quot;Lorem ipsum...&quot;
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
              <input type="checkbox" checked={includeHtml} onChange={(e) => setIncludeHtml(e.target.checked)} className="h-4 w-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500" />
              Wrap in HTML tags
            </label>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button onClick={generateLorem} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"><FileText size={18} /> Generate Text</button>
            <button onClick={reset} className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"><RefreshCw size={18} /> Reset</button>
          </div>

          {/* Result Section */}
          {generatedText && (
            <div className="mt-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"><div className="flex justify-center text-sky-500 mb-1"><Layers size={20} /></div><p className="text-lg font-bold text-gray-800">{paragraphs}</p><p className="text-xs text-gray-500 mt-0.5">Paragraphs</p></div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"><div className="flex justify-center text-sky-500 mb-1"><Type size={20} /></div><p className="text-lg font-bold text-gray-800">{totalWords}</p><p className="text-xs text-gray-500 mt-0.5">Words</p></div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"><div className="flex justify-center text-sky-500 mb-1"><Hash size={20} /></div><p className="text-lg font-bold text-gray-800">{totalChars}</p><p className="text-xs text-gray-500 mt-0.5">Characters</p></div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"><div className="flex justify-center text-sky-500 mb-1"><Code size={20} /></div><p className="text-lg font-bold text-gray-800">{totalSentences}</p><p className="text-xs text-gray-500 mt-0.5">Sentences</p></div>
              </div>

              {/* Output */}
              <div className="bg-gray-900 rounded-2xl p-6 mb-6 overflow-x-auto">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-semibold">{includeHtml ? "Generated HTML Output" : "Generated Placeholder Text"}</p>
                {includeHtml ? (
                  <pre className="text-sm font-mono leading-relaxed">
                    {generatedText.split(/(<[^>]+>)/).map((part, i) => {
                      if (i % 2 === 1) return <span key={i} className="text-sky-400">{part}</span>;
                      return <span key={i} className="text-gray-300">{part}</span>;
                    })}
                  </pre>
                ) : (
                  <pre className="text-sm font-mono leading-relaxed text-gray-200">{generatedText}</pre>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-3">
                <button onClick={copyText} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"><Copy size={15} /> {copied ? "Copied!" : "Copy Result"}</button>
                <button onClick={downloadText} className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-medium transition-colors"><Download size={15} /> Download .txt</button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!generatedText && (
            <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mt-4">
              <FileText size={32} className="mx-auto mb-3 text-gray-300" />
              <p>Click <strong className="text-gray-500">Generate Text</strong> to create placeholder text</p>
            </div>
          )}
        </div>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Generate Lorem Ipsum in 3 Simple Steps</h2>
          <ol className="space-y-5">
            {[
              { step: "1", title: "Set Your Parameters", desc: "Choose how many paragraphs you need (1-20) and words per paragraph (20-300). Toggle HTML mode if you need tagged output." },
              { step: "2", title: "Generate & Preview", desc: "Click Generate Text. See real-time stats: word count, characters, sentences. Preview the output in a syntax-highlighted box." },
              { step: "3", title: "Copy or Download", desc: "Copy the text to clipboard with one click, or download as a .txt file for offline use in Figma, VS Code, or your design tool." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How Lorem Ipsum Generation Works</h2>
          <p className="text-gray-500 text-sm mb-6">No server upload. No waiting. Everything happens on your device.</p>
          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Random Word Assembly</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                baseWords[] → random sentence → paragraph → full text
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">We randomly select words from the classic Lorem Ipsum vocabulary, assemble them into grammatically plausible sentences, then group sentences into paragraphs matching your word count target.</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">HTML Tag Wrapping</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                &lt;h2&gt;Section 1&lt;/h2&gt;\n&lt;p&gt;Lorem ipsum...&lt;/p&gt;
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">When HTML mode is enabled, each paragraph gets wrapped in &lt;p&gt; tags with a randomly chosen heading (&lt;h2&gt;, &lt;h3&gt;, or &lt;h4&gt;) before it. Perfect for pasting directly into code editors.</p>
            </div>
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">Privacy First</h3>
              <p className="text-sky-800 text-xs leading-relaxed">All text generation happens locally in your browser using JavaScript. No data is uploaded, stored, or sent anywhere. Close the tab and your generated text is gone. 100% private by design.</p>
            </div>
          </div>
        </section>

        {/* ─── Sample Results ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What Kind of Output Can You Expect?</h2>
          <p className="text-gray-500 text-sm mb-6">Real examples with plain text and HTML modes.</p>
          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-lg">Plain Text Mode</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Settings</p><p className="font-semibold text-gray-800">4 paras, 80 words each</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Output</p><p className="font-semibold text-gray-800">~320 words, classic opening</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Best For</p><p className="font-semibold text-gray-800">Wireframes, print mockups</p></div>
              </div>
            </div>
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded-lg">HTML Mode</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Settings</p><p className="font-semibold text-gray-800">HTML tags enabled</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Output</p><p className="font-semibold text-blue-600">&lt;h3&gt; + &lt;p&gt; structure</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Best For</p><p className="font-semibold text-gray-800">Web prototypes, code editors</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Who Uses This Lorem Ipsum Generator?</h2>
          <p className="text-gray-500 text-sm mb-6">From designers to developers — placeholder text speeds up workflows.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Zap size={20} className="text-sky-600" />, title: "UI/UX Designers", desc: "Fill Figma, Sketch, or Adobe XD wireframes with realistic-looking text so stakeholders focus on layout, not content." },
              { icon: <Code size={20} className="text-green-600" />, title: "Frontend Developers", desc: "Prototype React, Vue, or vanilla JS layouts with dummy text. HTML mode outputs ready-to-paste &lt;p&gt; and &lt;h&gt; tags." },
              { icon: <Globe size={20} className="text-amber-600" />, title: "Print Designers", desc: "Create magazine layouts, brochures, or posters with classic Lorem Ipsum that clients recognize and trust." },
              { icon: <Shield size={20} className="text-violet-600" />, title: "Privacy-Conscious Users", desc: "Generate placeholder text without uploading to third-party servers. Everything stays on your device — always." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Generate Lorem Ipsum in Your Browser?</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Most online Lorem Ipsum generators ask you to paste settings into a web form that sends your request to their servers. That means waiting for responses, worrying about privacy, and sometimes dealing with ads or limits. Our free Lorem Ipsum generator works differently — everything happens <strong>inside your browser</strong> using pure JavaScript.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Control the <strong>exact number of paragraphs</strong> and <strong>words per paragraph</strong> to match your design needs. Toggle the classic &quot;Lorem ipsum dolor sit amet...&quot; opening for instant recognition. Enable HTML mode to get properly structured &lt;p&gt; and &lt;h2&gt;-&lt;h4&gt; tags ready for your code editor.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            See real-time stats: total words, characters, and sentences. Copy to clipboard with one click or download as a .txt file for offline use. No signup, no tracking, no watermarks.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">Privacy Note</h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No text is uploaded to any server. No data is stored or tracked. Your generated content stays on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need to count words in your generated text? Try the{" "}
            <Link href="/tools/word-counter" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Word Counter</Link>. 
            Want to generate fake user data? The{" "}
            <Link href="/tools/fake-data-generator" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Fake Data Generator</Link> has you covered.
          </p>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              { q: "How to generate placeholder text for website design free?", a: "Set the number of paragraphs and words per paragraph in our Lorem Ipsum generator, then click Generate Text. Copy or download the result and paste it directly into your design mockup or prototype." },
              { q: "Can I generate Lorem Ipsum with HTML tags?", a: "Yes. Check the 'Wrap in HTML tags' option and the tool will output your paragraphs wrapped in &lt;p&gt; tags with randomly generated &lt;h2&gt;, &lt;h3&gt;, or &lt;h4&gt; headings between sections." },
              { q: "What is Lorem Ipsum and why do designers use it?", a: "Lorem Ipsum is dummy text used in the printing and web design industries since the 1500s. Designers use it to fill layouts with realistic-looking text so clients and stakeholders focus on the visual design rather than reading the content." },
              { q: "How many paragraphs of Lorem Ipsum should I use for a wireframe?", a: "For a typical website wireframe, 3-5 paragraphs per section works well. For a full-page mockup, 10-20 paragraphs total gives a realistic feel. Use shorter paragraphs (40-60 words) for tighter layouts." },
              { q: "Can I generate dummy text with a specific word count?", a: "Yes. Set the 'Words per Paragraph' input to your desired count (20-300 words) and the tool will generate paragraphs that match that target as closely as possible." },
              { q: "Is my generated text sent to a server?", a: "No. All text generation happens entirely inside your browser using JavaScript. Your content never leaves your device." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Text & Design Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/tools/word-counter", title: "Word Counter", desc: "Count words, characters and reading time instantly." },
              { href: "/tools/fake-data-generator", title: "Fake Data Generator", desc: "Generate realistic dummy data including text fields." },
              { href: "/tools/json-formatter", title: "JSON Formatter", desc: "Beautify, minify and validate JSON code." },
              { href: "/tools/emoji-picker", title: "Emoji Picker", desc: "Search & copy emojis for captions and messages." },
              { href: "/tools/case-converter", title: "Case Converter", desc: "Change text case for formatting consistency." },
              { href: "/tools/remove-duplicate-lines", title: "Remove Duplicates", desc: "Clean up text lists by removing duplicate lines." },
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