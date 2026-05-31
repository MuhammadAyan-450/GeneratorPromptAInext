'use client'

import { useState } from "react";
import Link from "next/link";
import {
  Copy, RefreshCw, Download, Shield, Home, ChevronDown,
  Hash, Type, Layers, Clock, Eye, EyeOff, CheckCircle2, FileText,
  Zap, Globe, HelpCircle, AlertCircle
} from "lucide-react";

// ─── Word list for passphrase mode ───────────────────────────────────────────
const WORDS = [
  "apple", "bridge", "castle", "dragon", "eagle", "forest", "garden", "harbor",
  "island", "jungle", "kitten", "lemon", "mango", "north", "ocean", "planet",
  "queen", "river", "silver", "tiger", "uncle", "valley", "winter", "yellow",
  "zebra", "anchor", "butter", "candle", "dancer", "engine", "falcon", "golden",
  "hunter", "ignite", "jester", "kelvin", "lantern", "marble", "noble", "orange",
  "pepper", "quiet", "rocket", "shadow", "thunder", "ultra", "velvet", "walnut",
  "xenon", "yonder", "zephyr", "arrow", "blade", "cloud", "dawn", "ember",
  "flame", "grace", "haven", "ivory", "jewel", "knight", "lunar", "mystic",
];

// ─── Strength helpers ─────────────────────────────────────────────────────────
function calcStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8) score += 1;
  if (pwd.length >= 12) score += 2;
  if (pwd.length >= 16) score += 2;
  if (pwd.length >= 20) score += 1;
  if (/[A-Z]/.test(pwd)) score += 1;
  if (/[a-z]/.test(pwd)) score += 1;
  if (/[0-9]/.test(pwd)) score += 1;
  if (/[^A-Za-z0-9]/.test(pwd)) score += 2;
  const pct = Math.round((score / 11) * 100);
  if (score >= 9) return { label: "Very Strong", pct, color: "bg-green-500", text: "text-green-600" };
  if (score >= 7) return { label: "Strong", pct, color: "bg-emerald-500", text: "text-emerald-600" };
  if (score >= 5) return { label: "Medium", pct, color: "bg-yellow-500", text: "text-yellow-600" };
  if (score >= 3) return { label: "Weak", pct, color: "bg-orange-500", text: "text-orange-600" };
  return { label: "Very Weak", pct, color: "bg-red-500", text: "text-red-600" };
}

function crackTime(pwd) {
  const charsets = [
    { regex: /[a-z]/, size: 26 },
    { regex: /[A-Z]/, size: 26 },
    { regex: /[0-9]/, size: 10 },
    { regex: /[^A-Za-z0-9]/, size: 32 },
  ];
  const poolSize = charsets.reduce((acc, c) => acc + (c.regex.test(pwd) ? c.size : 0), 0);
  const combinations = Math.pow(poolSize || 1, pwd.length);
  const seconds = combinations / 10_000_000_000;
  if (seconds < 1) return "< 1 second";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 2592000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000) return `${Math.round(seconds / 2592000)} months`;
  if (seconds < 1e9) return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 1e12) return `${(seconds / 1e9).toFixed(1)} billion years`;
  return "millions of years";
}

function secureRandInt(max) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [bulkPasswords, setBulkPasswords] = useState([]);
  const [history, setHistory] = useState([]);
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [passphraseMode, setPassphraseMode] = useState(false);
  const [wordCount, setWordCount] = useState(4);
  const [bulkCount, setBulkCount] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const buildCharset = () => {
    const ambiguous = "0Ol1I";
    const filter = (s) => excludeAmbiguous ? s.split("").filter((c) => !ambiguous.includes(c)).join("") : s;
    let chars = "";
    if (includeLowercase) chars += filter("abcdefghijklmnopqrstuvwxyz");
    if (includeUppercase) chars += filter("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if (includeNumbers) chars += filter("0123456789");
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
    return chars;
  };

  const generateSingle = () => {
    if (passphraseMode) {
      const words = Array.from({ length: wordCount }, () => WORDS[secureRandInt(WORDS.length)]);
      return words.join("-");
    }
    const chars = buildCharset();
    if (!chars) return "Select at least one character type";
    return Array.from({ length }, () => {
      const arr = new Uint32Array(1);
      crypto.getRandomValues(arr);
      return chars[arr[0] % chars.length];
    }).join("");
  };

  const generate = () => {
    setBulkPasswords([]);
    if (bulkCount > 0) {
      const passwords = Array.from({ length: bulkCount }, generateSingle);
      setBulkPasswords(passwords);
      setPassword(passwords[0]);
      setHistory((prev) => [passwords[0], ...prev].slice(0, 5));
    } else {
      const pwd = generateSingle();
      setPassword(pwd);
      setHistory((prev) => [pwd, ...prev].slice(0, 5));
    }
    setCopied(false);
  };

  const reset = () => { setPassword(""); setBulkPasswords([]); setHistory([]); setCopied(false); };

  const copyText = () => {
    if (!password) return;
    const textToCopy = bulkPasswords.length > 1 ? bulkPasswords.join("\n") : password;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copySingle = (pwd) => { navigator.clipboard.writeText(pwd); };

  const downloadText = () => {
    if (!password) return;
    const content = bulkPasswords.length > 1 ? bulkPasswords.join("\n") : password;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `passwords-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const strength = password ? calcStrength(password) : null;
  const timeToBreak = password && !passphraseMode ? crackTime(password) : null;
  const charsetSize = buildCharset().length;

  const stats = passphraseMode
    ? [
        { icon: Type, value: wordCount, label: "Words", colorClass: "text-gray-800" },
        { icon: Hash, value: password.length, label: "Characters", colorClass: "text-gray-800" },
        { icon: Layers, value: WORDS.length, label: "Word Pool", colorClass: "text-gray-800" },
        { icon: Shield, value: strength?.label || "—", label: "Strength", colorClass: strength?.text || "text-gray-800" },
      ]
    : [
        { icon: Hash, value: password.length, label: "Characters", colorClass: "text-gray-800" },
        { icon: Shield, value: strength?.label || "—", label: "Strength", colorClass: strength?.text || "text-gray-800" },
        { icon: Layers, value: charsetSize, label: "Charset Size", colorClass: "text-gray-800" },
        { icon: Clock, value: timeToBreak || "—", label: "Time to Crack", colorClass: "text-gray-800" },
      ];

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
            <li><span className="text-gray-900 font-semibold">Password Generator</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">

        {/* ── Hero ── */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <Shield className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Generate Strong Random Password Online Free –{" "}
            <span className="text-sky-600">Secure Password Maker with Strength Meter</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Create cryptographically secure passwords or memorable passphrases. Real-time strength meter, time-to-crack estimate, and bulk generation.
          </p>
        </div>

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">

          {/* Mode Toggle */}
          <div className="flex gap-2 mb-6">
            <button onClick={() => setPassphraseMode(false)} className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all ${!passphraseMode ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-600 border-gray-200 hover:border-sky-400"}`}>🔐 Random Password</button>
            <button onClick={() => setPassphraseMode(true)} className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all ${passphraseMode ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-600 border-gray-200 hover:border-sky-400"}`}>💬 Passphrase</button>
          </div>

          {/* Settings */}
          {!passphraseMode ? (
            <div className="space-y-5 mb-6">
              {/* Length Slider */}
              <div>
                <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                  <span>Password Length</span>
                  <span className="text-sky-600">{length} characters</span>
                </div>
                <input type="range" min="8" max="64" value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="w-full accent-sky-600" />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>8</span><span>64</span></div>
              </div>

              {/* Character Types Grid */}
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} className="h-4 w-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500" />
                  Uppercase (A-Z)
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input type="checkbox" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} className="h-4 w-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500" />
                  Lowercase (a-z)
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className="h-4 w-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500" />
                  Numbers (0-9)
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className="h-4 w-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500" />
                  Symbols (!@#$...)
                </label>
              </div>

              {/* Exclude Ambiguous */}
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input type="checkbox" checked={excludeAmbiguous} onChange={(e) => setExcludeAmbiguous(e.target.checked)} className="h-4 w-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500" />
                Exclude ambiguous characters (0, O, l, 1, I) — easier to type manually
              </label>
            </div>
          ) : (
            <div className="mb-6">
              <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                <span>Number of Words</span>
                <span className="text-sky-600">{wordCount} words</span>
              </div>
              <input type="range" min="3" max="8" value={wordCount} onChange={(e) => setWordCount(parseInt(e.target.value))} className="w-full accent-sky-600" />
              <p className="text-xs text-gray-400 mt-2">Example: <em>tiger-castle-river-lamp</em> — easy to remember, hard to crack</p>
            </div>
          )}

          {/* Bulk Mode */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Generate Mode</label>
            <div className="flex gap-2 flex-wrap">
              {[
                { label: "Single", value: 0 },
                { label: "5 at once", value: 5 },
                { label: "10 at once", value: 10 },
              ].map((m) => (
                <button key={m.value} onClick={() => setBulkCount(m.value)} className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${bulkCount === m.value ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-600 border-gray-200 hover:border-sky-400"}`}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button onClick={generate} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">
              <Shield size={18} /> Generate {passphraseMode ? "Passphrase" : "Password"}
            </button>
            <button onClick={reset} className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
              <RefreshCw size={18} /> Reset
            </button>
          </div>

          {/* Result Section */}
          {password && (
            <div className="mt-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                    <div className="flex justify-center text-sky-500 mb-1"><stat.icon size={20} /></div>
                    <p className={`text-lg font-bold ${stat.colorClass}`}>{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Strength Bar */}
              {strength && !passphraseMode && (
                <div className="mb-6">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${strength.color}`} style={{ width: `${strength.pct}%` }} />
                  </div>
                </div>
              )}

              {/* Dark Output Block */}
              <div className="bg-gray-900 rounded-2xl p-6 mb-6 overflow-x-auto">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-semibold">
                  {passphraseMode ? "Generated Passphrase" : "Generated Password"}
                </p>
                {bulkPasswords.length > 1 ? (
                  <div className="space-y-2">
                    {bulkPasswords.map((pwd, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <pre className="text-sm font-mono leading-relaxed text-gray-200 truncate flex-1">
                          {showPassword ? pwd : "•".repeat(Math.min(pwd.length, 24))}
                        </pre>
                        <button onClick={() => copySingle(pwd)} className="ml-3 text-gray-400 hover:text-sky-400 flex-shrink-0 transition-colors" title="Copy">
                          <Copy size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <pre className="text-lg md:text-xl font-mono leading-relaxed text-gray-200 break-all">
                      {showPassword ? password : "•".repeat(password.length)}
                    </pre>
                    <button onClick={() => setShowPassword(!showPassword)} className="ml-4 text-gray-400 hover:text-sky-400 flex-shrink-0 transition-colors" title={showPassword ? "Hide" : "Show"}>
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-3">
                <button onClick={copyText} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors">
                  <Copy size={15} /> {copied ? "Copied!" : bulkPasswords.length > 1 ? "Copy All" : "Copy Password"}
                </button>
                <button onClick={downloadText} className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-medium transition-colors">
                  <Download size={15} /> Download .txt
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!password && (
            <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mt-4">
              <Shield size={32} className="mx-auto mb-3 text-gray-300" />
              <p>Click <strong className="text-gray-500">Generate Password</strong> to create a secure password</p>
            </div>
          )}
        </div>

        {/* ─── History Section ─── */}
        {history.length > 1 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-8">
            <p className="text-sm font-semibold text-gray-700 mb-3">Recent Passwords (this session)</p>
            <div className="space-y-2">
              {history.slice(1).map((pwd, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-2">
                  <span className="font-mono text-xs text-gray-500 truncate flex-1">{"•".repeat(Math.min(pwd.length, 30))}</span>
                  <button onClick={() => copySingle(pwd)} className="ml-3 text-gray-400 hover:text-sky-500 flex-shrink-0 transition-colors">
                    <Copy size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Generate a Strong Password in 3 Simple Steps</h2>
          <ol className="space-y-5">
            {[
              { step: "1", title: "Choose Your Mode", desc: "Pick Random Password for maximum security or Passphrase for memorable master passwords. Set length or word count using the slider." },
              { step: "2", title: "Customize Settings", desc: "Enable character types (uppercase, lowercase, numbers, symbols) or exclude ambiguous characters for easier manual typing." },
              { step: "3", title: "Generate & Secure", desc: "Click Generate. See real-time strength meter and crack time estimate. Copy or download your secure password instantly." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How Cryptographically Secure Generation Works</h2>
          <p className="text-gray-500 text-sm mb-6">No server upload. No waiting. Everything happens on your device.</p>
          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">crypto.getRandomValues() API</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                crypto.getRandomValues(Uint32Array) → true randomness
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">We use your browser's built-in cryptographic API to generate truly unpredictable random numbers. This is the same standard used by professional security tools — far more secure than Math.random().</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Strength Scoring Algorithm</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                score = length(6) + uppercase(1) + lowercase(1) + numbers(1) + symbols(2) → max 11
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">Your password strength is calculated based on length, character variety, and symbol usage. The time-to-crack estimate shows how long a modern GPU cluster would take to brute-force your password.</p>
            </div>
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">Privacy First</h3>
              <p className="text-sky-800 text-xs leading-relaxed">All password generation happens locally in your browser using JavaScript. No passwords are uploaded, stored, or sent anywhere. Close the tab and your passwords are gone. 100% private by design.</p>
            </div>
          </div>
        </section>

        {/* ─── Sample Results ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What Kind of Passwords Can You Generate?</h2>
          <p className="text-gray-500 text-sm mb-6">Real examples with different modes and settings.</p>
          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-lg">Random Password (16 chars)</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Example</p><p className="font-semibold text-gray-800">K7#mP9$xL2@nQ4!w</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Strength</p><p className="font-semibold text-green-600">Very Strong (95%)</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Best For</p><p className="font-semibold text-gray-800">Banking, email, crypto</p></div>
              </div>
            </div>
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded-lg">Passphrase (4 words)</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Example</p><p className="font-semibold text-blue-600">tiger-castle-river-lamp</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Strength</p><p className="font-semibold text-blue-600">Strong (78%)</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Best For</p><p className="font-semibold text-gray-800">Password manager master</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Who Uses This Password Generator?</h2>
          <p className="text-gray-500 text-sm mb-6">From individuals to teams — strong passwords protect everyone.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Zap size={20} className="text-sky-600" />, title: "Security-Conscious Users", desc: "Generate cryptographically secure passwords for banking, email, and crypto wallets. Real-time strength meter ensures maximum protection." },
              { icon: <Shield size={20} className="text-green-600" />, title: "Password Manager Users", desc: "Create memorable passphrases for your master password. Easy to type, hard to crack — perfect for Bitwarden, 1Password, or KeePass." },
              { icon: <Globe size={20} className="text-amber-600" />, title: "Developers & IT Teams", desc: "Generate bulk passwords for testing, staging environments, or team accounts. Download as .txt for secure offline distribution." },
              { icon: <AlertCircle size={20} className="text-violet-600" />, title: "Privacy-Conscious Users", desc: "Generate passwords without uploading to third-party servers. Everything stays on your device — always." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Generate Passwords in Your Browser?</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Most online password generators ask you to paste settings into a web form that sends your request to their servers. That means waiting for responses, worrying about privacy, and sometimes dealing with ads or limits. Our free password generator works differently — everything happens <strong>inside your browser</strong> using the cryptographic API.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Choose between <strong>random passwords</strong> (maximum security with mixed characters) or <strong>memorable passphrases</strong> (random words joined by hyphens). The real-time strength meter and time-to-crack estimate give you instant feedback on how secure your password really is against modern GPU-based attacks.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Generate single passwords or bulk lists of 5 or 10 at once. Copy to clipboard with one click or download as a .txt file for offline use. Exclude ambiguous characters (0, O, l, 1, I) for easier manual typing.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">Privacy Note</h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No passwords are uploaded to any server. No data is stored or tracked. Your passwords stay on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need unique identifiers for your app? Try the{" "}
            <Link href="/tools/uuid-generator" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">UUID Generator</Link>. 
            Want to encode sensitive data? The{" "}
            <Link href="/tools/base64-encode" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Base64 Encoder</Link> has you covered.
          </p>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              { q: "How to generate a strong random password online free?", a: "Set the password length to 16 or more, enable all character types (uppercase, lowercase, numbers, symbols), and click Generate. Copy or download the result. No signup or installation needed." },
              { q: "Is this password generator safe to use?", a: "Yes. Our tool uses the browser's crypto.getRandomValues() API which produces cryptographically secure random numbers. Passwords are generated entirely in your browser and are never transmitted to any server." },
              { q: "What is a passphrase and when should I use one?", a: "A passphrase is a string of random words separated by hyphens (e.g. 'tiger-castle-river-lamp'). Use passphrases for master passwords — they are easier to remember and type while still being highly secure against brute-force attacks." },
              { q: "How many characters should a secure password be?", a: "A minimum of 12 characters for standard accounts. For high-security accounts like banking, email, or crypto wallets, use 16–20+ characters with a mix of uppercase, lowercase, numbers, and symbols." },
              { q: "Can I generate multiple passwords at once free?", a: "Yes. Select '5 at once' or '10 at once' in the Generate Mode section before clicking Generate. All passwords will appear in a list that you can copy individually or download as a text file." },
              { q: "Does this tool work offline?", a: "Yes. Once the page loads, all password generation happens locally in your browser. You can use it without an internet connection after the initial load." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Security & Utility Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/tools/uuid-generator", title: "UUID Generator", desc: "Generate unique UUID v4 identifiers for secure tokens and database keys." },
              { href: "/tools/base64-encode", title: "Base64 Encoder / Decoder", desc: "Encode and decode Base64 strings for secure data transmission." },
              { href: "/tools/fake-data-generator", title: "Fake Data Generator", desc: "Generate test emails, passwords, names, and user data for development." },
              { href: "/tools/emoji-picker", title: "Emoji Picker", desc: "Search & copy emojis for captions and messages." },
              { href: "/tools/word-counter", title: "Word Counter", desc: "Count characters for bios, tweets, and meta descriptions." },
              { href: "/tools/qr-code-generator", title: "QR Code Generator", desc: "Create custom QR codes for links, text, or contact info." },
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