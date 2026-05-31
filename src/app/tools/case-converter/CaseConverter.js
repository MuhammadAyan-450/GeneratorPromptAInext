'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Copy, RefreshCw, Type, FileText, Hash, AlignLeft, Home, ChevronDown,
  Code, HelpCircle, ArrowRight, Zap, Shield, UserCheck
} from "lucide-react";

const CaseConverter = () => {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(text.length);
    setWordCount(text.trim() === "" ? 0 : text.trim().split(/\s+/).length);
  }, [text]);

  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());

  const toTitleCase = () => {
    const titleCase = text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setText(titleCase);
  };

  const toSentenceCase = () => {
    // Fixed: Proper regex with safe arrow function
    const sentenceCase = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, function(c) {
      return c.toUpperCase();
    });
    setText(sentenceCase);
  };

  const toInverseCase = () => {
    const inverse = text
      .split("")
      .map((char) => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
      .join("");
    setText(inverse);
  };

  const toCamelCase = () => {
    // Fixed: Safe regex group handling
    const camel = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr) {
      return chr.toUpperCase();
    });
    setText(camel);
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
    setCopied(false);
  };

  const handleDownload = () => {
    if (!text) return;
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "converted-text.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Breadcrumb */}
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
            <li><span className="text-gray-900 font-semibold">Case Converter</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <Type className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Case Converter
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Caps lock on karke poora paragraph type kar diya? Ya variable name camelCase mein chahiye? Bas paste karo, button dabao, ho gaya. Koi signup nahi, koi limit nahi.
          </p>
        </div>

        {/* Tool Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Yahan apna text paste karo
          </label>

          <div className="mb-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-64 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 resize-none"
              placeholder="Type ya paste karo yahan..."
            ></textarea>
          </div>

          {/* Stats Bar */}
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 mb-6 flex items-center gap-3">
            <Hash className="text-sky-600" size={20} />
            <div>
              <p className="text-xs text-sky-500 uppercase font-bold tracking-wider">Total Characters</p>
              <p className="text-2xl font-bold text-sky-700">{charCount}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <button onClick={toUpperCase} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">
              UPPERCASE
            </button>
            <button onClick={toLowerCase} className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
              lowercase
            </button>
            <button onClick={toTitleCase} className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
              Title Case
            </button>
            <button onClick={toSentenceCase} className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
              Sentence
            </button>
            <button onClick={toInverseCase} className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
              iNVERSE
            </button>
            <button onClick={toCamelCase} className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
              camelCase
            </button>
          </div>

          {/* Utility Actions */}
          <div className="flex flex-wrap justify-center gap-3 border-t border-gray-100 pt-6">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
            >
              <Copy size={16} />
              {copied ? "Copied!" : "Copy Text"}
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold transition-all"
            >
              <AlignLeft size={16} />
              Download .txt
            </button>
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-red-600 rounded-xl text-sm font-semibold transition-all"
            >
              <RefreshCw size={16} />
              Clear
            </button>
          </div>
        </div>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Convert Text Case
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Paste your text",
                desc: "Type directly or paste from anywhere — essay, code, social media caption, email draft. Doesn't matter if it's UPPERCASE, lowercase, or a messy mix. The tool handles it all.",
              },
              {
                step: "2",
                title: "Pick your target case",
                desc: "Need everything in caps for emphasis? Hit UPPERCASE. Writing a blog heading? Title Case is your friend. Coding a variable? camelCase removes spaces automatically. Don't overthink — just click and see.",
              },
              {
                step: "3",
                title: "Copy or download the result",
                desc: "The converted text appears instantly. Hit copy to grab it for your document, code editor, or social post. Or download as a .txt file if you're saving it for later.",
              },
              {
                step: "4",
                title: "Done",
                desc: "That's it. No signup, no API call, no waiting. Everything runs in your browser and nothing gets sent anywhere. Your text stays yours.",
              },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="w-8 h-8 bg-sky-100 text-sky-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">
                    {item.title}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ─── Formulas ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How Case Conversion Actually Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            It's not magic — just simple string manipulation. Here's exactly what happens when you click each button.
          </p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                UPPERCASE / lowercase
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                text.toUpperCase() // or .toLowerCase()
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Every character gets converted using JavaScript's built-in methods. Numbers and symbols stay unchanged — only letters are affected.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Title Case
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                word[0].toUpperCase() + word.slice(1).toLowerCase()
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Splits text by spaces, capitalizes first letter of each word, lowercases the rest. Articles like "the" or "a" also get capitalized here.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Sentence Case
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, function(c) {'{'} return c.toUpperCase(); {'}'})
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Uses regex to find sentence starters (beginning of text or after . ! ?) and capitalizes only those letters. Rest stays lowercase.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                camelCase
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(m, c) {'{'} return c.toUpperCase(); {'}'})
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Removes all non-alphanumeric separators (spaces, underscores, dashes), then capitalizes the first letter of each subsequent word. First word stays lowercase.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">
                Full Formula Reference
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl overflow-x-auto">
                UPPERCASE: text.toUpperCase()<br/>
                lowercase: text.toLowerCase()<br/>
                Title Case: split + map + join logic<br/>
                Sentence: regex replace on sentence boundaries<br/>
                iNVERSE: char-by-char toggle<br/>
                camelCase: regex + capitalize logic
              </div>
            </div>
          </div>
        </section>

        {/* ─── Real Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Case Conversion Examples
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            These aren't made up — run them yourself to see the tool in action.
          </p>

          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                  Input
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs text-green-700 font-medium mb-1">Original Text:</p>
                <p className="font-mono text-sm text-gray-800 break-all">
                  the quick brown fox jumps over the lazy dog
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                  UPPERCASE
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs text-green-600 font-mono break-all">
                  THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                  Title Case
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs text-green-600 font-mono break-all">
                  The Quick Brown Fox Jumps Over The Lazy Dog
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                  camelCase
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs text-green-600 font-mono break-all">
                  theQuickBrownFoxJumpsOverTheLazyDog
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                  iNVERSE (mixed input)
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs text-green-700 font-medium mb-1">Input:</p>
                <p className="font-mono text-sm text-gray-800 break-all">Hello World</p>
                <p className="text-xs text-green-600 font-mono break-all mt-2">Output:</p>
                <p className="font-mono text-sm text-gray-800 break-all">hELLO wORLD</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            When Do You Actually Need Case Conversion?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Not as often as you might think. Here's where case conversion actually shows up in real work.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Code size={20} className="text-sky-600" />,
                title: "Fixing Caps Lock Mistakes",
                desc: "Typed with caps lock on? Paste here, hit lowercase, done.",
              },
              {
                icon: <UserCheck size={20} className="text-green-600" />,
                title: "Writing Blog Headings",
                desc: "Title Case makes headings look professional and consistent.",
              },
              {
                icon: <Zap size={20} className="text-violet-600" />,
                title: "JavaScript Variable Names",
                desc: "camelCase is JS standard. Convert 'user login' to 'userLogin'.",
              },
              {
                icon: <HelpCircle size={20} className="text-amber-600" />,
                title: "Cleaning Scraped Data",
                desc: "Convert scraped text to lowercase for consistency before analysis.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl p-5 hover:border-sky-200 transition-colors"
              >
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SEO Content ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What Case Conversion Is (And What It Isn't)
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            There's a lot of confusion around text case because people think "Title Case" and "Sentence case" are the same thing. They're not.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Title Case capitalizes the first letter of every word — great for headings, titles, and formal documents. Sentence case only capitalizes the first letter of each sentence — that's how normal paragraphs look in books and articles.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            camelCase is different altogether — it's for programming. Spaces get removed, first word stays lowercase, and every new word starts with a capital letter. That's why 'my variable name' becomes 'myVariableName'.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Why Case Matters for SEO
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Search engines don't care about case in your content — but humans do. A heading in Title Case looks more professional and is easier to scan. A paragraph in Sentence case reads more naturally.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            For code, case is critical. JavaScript is case-sensitive — 'UserName' and 'username' are two different variables. Getting case wrong can break your entire app.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Privacy Note
          </h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser. Your text never leaves your device — no server upload, no logging, no tracking. Close the tab and it's gone. That's how it should be.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need to count words while you're at it? Try the{" "}
            <Link
              href="/tools/word-counter"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              Word Counter
            </Link>
            . Working with JSON data? The{" "}
            <Link
              href="/tools/json-formatter"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              JSON Formatter
            </Link>{" "}
            has your back.
          </p>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              {
                q: "What's the difference between Title Case and Sentence case?",
                a: "Title Case capitalizes the first letter of every word — like 'The Quick Brown Fox'. Sentence case only capitalizes the first letter of each sentence — like 'The quick brown fox.' Use Title Case for headings, Sentence case for normal paragraphs.",
              },
              {
                q: "Does this tool work on mobile phones?",
                a: "Yes, absolutely. It runs entirely in your browser using JavaScript. Phone, tablet, laptop — doesn't matter. No app download, no installation. Just open the URL and start converting.",
              },
              {
                q: "Is there a limit to how much text I can convert?",
                a: "No hard limit. Your browser handles the processing, so it depends on your device's memory. Practically, you can convert 50,000-100,000 characters smoothly. More than that might slow things down but should still work.",
              },
              {
                q: "Is my text saved or sent anywhere?",
                a: "No. Everything happens locally in your browser. Nothing gets uploaded to a server, nothing gets stored in a database. Close the tab and your text is gone. Your privacy is protected by design.",
              },
              {
                q: "Why does camelCase remove spaces?",
                a: "Because programming variable names can't contain spaces. camelCase removes all separators (spaces, underscores, dashes) and capitalizes the first letter of each new word. 'user login page' becomes 'userLoginPage' — a valid JavaScript variable.",
              },
              {
                q: "Is inverse case just for fun or does it have real uses?",
                a: "Both. People use it for fun on social media — like writing 'hELLO wORLD' for emphasis. But it's also useful for debugging: if you're not sure which letters are capitalized in a string, invert the case and check.",
              },
              {
                q: "Can I convert non-English text?",
                a: "Yes, as long as the characters have uppercase/lowercase variants. Latin-based languages (Spanish, French, German) work perfectly. Languages without case distinctions (like Arabic or Chinese) won't change — but the tool won't break either.",
              },
              {
                q: "What if I click the wrong button?",
                a: "No problem. Just click a different case button — the tool works on whatever text is currently in the box. Or hit Clear to start fresh. There's no undo, but you can always re-paste your original text.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-sky-200 transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={openFaq === i}
                >
                  <h3 className="text-sm md:text-base font-bold text-gray-900 pr-4">
                    {item.q}
                  </h3>
                  <ChevronDown
                    size={22}
                    className={`text-sky-500 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i
                      ? "max-h-[600px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Related Tools (Short Descriptions) ─── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related Developer Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/tools/word-counter", title: "Word Counter", desc: "Count words, characters, and reading time instantly." },
              { href: "/tools/uppercase-to-lowercase", title: "Uppercase to Lowercase", desc: "Simple two-way case converter for quick fixes." },
              { href: "/tools/remove-duplicate-lines", title: "Remove Duplicate Lines", desc: "Clean lists by removing duplicate entries instantly." },
              { href: "/tools/lorem-ipsum-generator", title: "Lorem Ipsum Generator", desc: "Generate placeholder text for design mockups." },
              { href: "/tools/json-formatter", title: "JSON Formatter", desc: "Format and validate JSON code with syntax highlighting." },
              { href: "/tools/base64-encode", title: "Base64 Encoder", desc: "Encode text to Base64 or decode Base64 strings." },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-sky-400 transition-all"
              >
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-sky-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
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

export default CaseConverter;