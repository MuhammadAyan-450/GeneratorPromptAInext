'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  RefreshCw, MailCheck, MailX, Globe, AtSign, Home, ChevronDown,
  Code, HelpCircle, Zap, Shield, BarChart3, FileText, Copy, Download
} from "lucide-react";

const EmailValidator = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    setCharCount(email.length);
  }, [email]);

  const validateEmail = () => {
    if (!email.trim()) {
      setResult({ isValid: false, message: "Please enter an email address." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email.trim());

    if (isValid) {
      const [name, domain] = email.trim().split("@");
      setResult({
        isValid: true,
        message: "Valid Email Format",
        details: {
          username: name,
          provider: domain,
          type: domain.includes(".") ? "Standard" : "Likely Local",
        },
      });
    } else {
      setResult({
        isValid: false,
        message: "Invalid Email Format",
        details: null,
      });
    }
  };

  const handleClear = () => {
    setEmail("");
    setResult(null);
    setCopied(false);
  };

  const copyResult = () => {
    if (!result) return;
    const text = result.isValid 
      ? `Valid Email: ${email}\nUsername: ${result.details.username}\nDomain: ${result.details.provider}`
      : `Invalid Email: ${email}\nReason: Invalid format`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <li><span className="text-gray-900 font-semibold">Email Validator</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <AtSign className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Email Validator
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Check if an email address format is valid instantly. Detect missing @ symbols, invalid domains, and bad characters without sending any emails. 100% private & browser-based.
          </p>
        </div>

        {/* Tool Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          
          {/* Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Enter Email Address</label>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 text-lg"
                placeholder="example@domain.com"
                onKeyDown={(e) => e.key === "Enter" && validateEmail()}
              />
              <button
                onClick={validateEmail}
                className="bg-sky-600 hover:bg-sky-700 active:scale-95 transition-all text-white font-semibold px-8 py-3 rounded-xl whitespace-nowrap"
              >
                Validate Format
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 mb-6 flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Length</span>
            <span className="text-sm font-bold text-gray-700">{charCount} characters</span>
          </div>

          {/* Result Display */}
          {result && (
            <div className={`rounded-2xl p-6 md:p-8 mb-6 flex flex-col md:flex-row items-center gap-6 ${result.isValid ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
              <div className={`p-4 rounded-full ${result.isValid ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>
                {result.isValid ? <MailCheck size={40} /> : <MailX size={40} />}
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className={`text-2xl font-bold mb-1 ${result.isValid ? "text-green-800" : "text-red-800"}`}>
                  {result.message}
                </h2>
                {result.isValid && result.details && (
                  <div className="text-sm text-green-700 space-y-1 mt-2">
                    <p><strong>Username:</strong> {result.details.username}</p>
                    <p className="flex items-center justify-center md:justify-start gap-1">
                      <strong>Provider:</strong> <Globe size={14} /> {result.details.provider}
                    </p>
                  </div>
                )}
                {!result.isValid && (
                  <p className="text-sm text-red-600 mt-1">
                    Please check the syntax (e.g., user@domain.com)
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Utility Actions */}
          <div className="flex flex-wrap justify-center gap-3 border-t border-gray-100 pt-6">
            <button onClick={copyResult} disabled={!result} className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md">
              <Copy size={16} /> {copied ? "Copied!" : "Copy Result"}
            </button>
            <button onClick={handleClear} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-red-600 rounded-xl text-sm font-semibold transition-all">
              <RefreshCw size={16} /> Clear
            </button>
          </div>
        </div>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Validate Email Format
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Enter the email address",
                desc: "Type or paste the email you want to check into the input box.",
              },
              {
                step: "2",
                title: "Click Validate Format",
                desc: "Hit the button or press Enter. The tool checks syntax instantly using regex.",
              },
              {
                step: "3",
                title: "Review the result",
                desc: "See if it's valid. If yes, you'll see the username and domain breakdown. If no, fix the syntax.",
              },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="w-8 h-8 bg-sky-100 text-sky-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ─── Formulas / How It Works ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How Email Validation Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">It uses standard Regex patterns to check structure. Here's what it looks for.</p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Regex Pattern</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">Checks for: No spaces, one @ symbol, valid characters before/after @, and a dot in the domain.</p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Structure Check</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                username @ domain . com
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">Splits the email into parts. Ensures 'username' has no illegal chars and 'domain' has a valid extension.</p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">Privacy Note</h3>
              <p className="text-sky-800 text-xs leading-relaxed">
                All validation happens locally in your browser. Your email is never sent to any server. 100% private.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Real Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Validation Examples
          </h2>
          <p className="text-gray-500 text-sm mb-6">See what valid and invalid emails look like.</p>

          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-lg">Valid</span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="font-mono text-sm text-gray-800">john.doe@gmail.com</p>
                <p className="text-xs text-green-600 mt-2">✅ Has @, valid domain, no spaces.</p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-red-100 text-red-700 font-bold px-2.5 py-1 rounded-lg">Invalid</span>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                <p className="font-mono text-sm text-gray-800">john.doe@gmail</p>
                <p className="text-xs text-red-600 mt-2">❌ Missing top-level domain (.com).</p>
              </div>
            </div>
            
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-red-100 text-red-700 font-bold px-2.5 py-1 rounded-lg">Invalid</span>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                <p className="font-mono text-sm text-gray-800">john doe@gmail.com</p>
                <p className="text-xs text-red-600 mt-2">❌ Contains a space in the username.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses Email Validators?
          </h2>
          <p className="text-gray-500 text-sm mb-6">Not just developers. Here's where accurate validation matters.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Code size={20} className="text-sky-600" />,
                title: "Web Developers",
                desc: "Validate form inputs on the client-side before sending data to the server.",
              },
              {
                icon: <BarChart3 size={20} className="text-green-600" />,
                title: "Digital Marketers",
                desc: "Clean up mailing lists by removing typos and invalid formats before campaigns.",
              },
              {
                icon: <Zap size={20} className="text-violet-600" />,
                title: "QA Testers",
                desc: "Quickly test edge cases and invalid formats during software testing.",
              },
              {
                icon: <HelpCircle size={20} className="text-amber-600" />,
                title: "General Users",
                desc: "Double-check your own email address before signing up for important services.",
              },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Email Syntax Validation Matters
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Sending an email to an invalid address bounces back, hurting your sender reputation. Our <strong>Email Syntax Checker</strong> allows you to test if an email address is formatted correctly without actually sending a message.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            It uses standard regex pattern matching to instantly verify the structure of the email, ensuring it has a valid username, <code>@</code> symbol, and proper domain extension. This is particularly useful for developers building <strong>HTML forms</strong> who need to validate user inputs on the client side.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            For marketers, cleaning up mailing lists to remove typos and fake emails before sending out campaigns can significantly improve open rates and reduce bounce rates.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Privacy Note
          </h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser. Your email addresses are never sent to any server — no logging, no tracking, no storage. Close the tab and it's gone. That's how it should be.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need to encode URLs for web requests? Try the{" "}
            <Link href="/tools/url-encoder" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">URL Encoder</Link>. Cleaning up text lists? The{" "}
            <Link href="/tools/remove-duplicate-lines" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Remove Duplicate Lines</Link> tool has your back.
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
                q: "How to check if email format is valid online without sending an email?",
                a: "Paste the email address into our tool and click 'Validate'. It uses standard regex pattern matching to instantly check the syntax and format of the email entirely in your browser, without sending or receiving any actual emails.",
              },
              {
                q: "Does this email syntax checker detect missing @ symbol or domain?",
                a: "Yes. Our tool checks for the presence and correct placement of the '@' symbol, ensures a valid domain extension is present (like .com), and flags any invalid characters like spaces or illegal symbols.",
              },
              {
                q: "Can I use this regex email format checker for HTML forms?",
                a: "Absolutely. The validation logic used by this tool is based on standard regex patterns that you can easily copy and implement in JavaScript, HTML5 (using the 'type=email' attribute), PHP, Python, or any other backend language for your website forms.",
              },
              {
                q: "Is it safe to enter real email addresses in this tool?",
                a: "Yes, 100% safe. All validation happens locally inside your web browser. We do not store, process, or transmit your email addresses to any external server.",
              },
              {
                q: "What makes an email format invalid?",
                a: "Common issues include: missing @ symbol, spaces in the address, missing domain extension (like .com), or using special characters that aren't allowed in email usernames.",
              },
              {
                q: "Does this check if the email inbox actually exists?",
                a: "No. This tool only checks the *format* (syntax) of the email. To check if an inbox actually exists and can receive mail, you would need a dedicated email verification service that pings the mail server.",
              },
              {
                q: "Is this tool free?",
                a: "Yes, 100% free. No signup, no account, no limits. Validate as many emails as you need.",
              },
              {
                q: "Can I validate multiple emails at once?",
                a: "Currently, this tool validates one email at a time. For bulk validation, you would need to paste them one by one or use a dedicated bulk verification tool.",
              },
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

        {/* ─── Related Tools (Short Descriptions) ─── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related Developer & Text Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/tools/url-encoder", title: "URL Encoder", desc: "Encode/decode URLs safely." },
              { href: "/tools/remove-duplicate-lines", title: "Remove Duplicates", desc: "Clean up text lists." },
              { href: "/tools/case-converter", title: "Case Converter", desc: "Change text case formats." },
              { href: "/tools/json-formatter", title: "JSON Formatter", desc: "Beautify JSON code." },
              { href: "/tools/base64-encode", title: "Base64 Encoder", desc: "Encode text to Base64." },
              { href: "/tools/word-counter", title: "Word Counter", desc: "Count words & characters." },
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
};

export default EmailValidator;