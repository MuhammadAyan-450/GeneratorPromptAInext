"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Copy,
  RefreshCw,
  Download,
  Fingerprint,
  Home,
  ChevronDown,
  Hash,
  Type,
  Layers,
  Settings,
  Zap,
  Shield,
  HelpCircle,
  FileText,
  Globe,
} from "lucide-react";

import ResponsiveAd from "../../../components/ResponsiveAd";

// ─── Helper Functions (Outside Component) ─────────────────────────────────────
const generateSingleUUID = (uppercase, removeHyphens) => {
  let id = crypto.randomUUID();
  if (removeHyphens) id = id.replace(/-/g, "");
  if (uppercase) id = id.toUpperCase();
  return id;
};

// ─── FAQ Data (Sync with page.js JSON-LD) ─────────────────────────────────────
const FAQS = [
  {
    q: "How to generate a random UUID v4 online free?",
    a: "Set the quantity (default 1), optionally check Uppercase or Remove Hyphens, then click Generate UUID. The tool uses the browser's crypto.randomUUID() API for cryptographically secure random generation. Copy or download the result.",
  },
  {
    q: "What is a UUID and is it truly unique?",
    a: "A UUID (Universally Unique Identifier) is a 128-bit number. Version 4 UUIDs are randomly generated. While collisions are theoretically possible, the probability is so infinitesimally small (1 in 2^122) that they are considered practically unique for all real-world use cases.",
  },
  {
    q: "Can I generate multiple UUIDs at once for database seeding?",
    a: "Yes. Set the quantity field to the number you need (up to 5000) and click Generate. All UUIDs appear one per line, ready to copy or download as a .txt file for direct use in SQL INSERT statements or seed scripts.",
  },
  {
    q: "What is the difference between UUID and GUID?",
    a: "Functionally they are the same. UUID is the standard term (RFC 4122), while GUID (Globally Unique Identifier) is Microsoft's terminology. Version 4 UUIDs and GUIDs have identical structure — 32 hex digits in 5 groups separated by hyphens.",
  },
  {
    q: "Why would I remove hyphens from a UUID?",
    a: 'Some systems, APIs, and databases require IDs without hyphens — a continuous 32-character hex string (e.g. 550e8400e29b41d4a716446655440000). Check "Remove Hyphens" to generate this compact format.',
  },
  {
    q: "Is my generated UUID data stored or shared?",
    a: "Never. All generation happens locally in your browser using the native crypto API. Your UUIDs are never sent to servers, stored, or tracked.",
  },
];

// ─── Related Tools (6 Items from your tools array) ────────────────────────────
const RELATED_TOOLS = [
  {
    href: "/tools/unix-timestamp",
    title: "Unix Timestamp Converter",
    desc: "Convert epoch seconds to human-readable dates and vice versa.",
  },
  {
    href: "/tools/base64-encode",
    title: "Base64 Encoder / Decoder",
    desc: "Encode and decode text to Base64 format for data transmission.",
  },
  {
    href: "/tools/json-formatter",
    title: "JSON Formatter",
    desc: "Beautify, minify and validate JSON data with syntax highlighting.",
  },
  {
    href: "/tools/password-generator",
    title: "Password Generator",
    desc: "Create cryptographically secure random passwords and passphrases.",
  },
  {
    href: "/tools/url-encoder",
    title: "URL Encoder",
    desc: "Encode special characters in URLs for safe web use.",
  },
  {
    href: "/tools/fake-data-generator",
    title: "Fake Data Generator",
    desc: "Generate realistic dummy data for testing APIs and databases.",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const UUIDGenerator = () => {
  const [uuids, setUuids] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Settings
  const [quantity, setQuantity] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [removeHyphens, setRemoveHyphens] = useState(false);

  const handleGenerate = () => {
    const ids = [];
    for (let i = 0; i < quantity; i++) {
      ids.push(generateSingleUUID(uppercase, removeHyphens));
    }
    setUuids(ids.join("\n"));
    setCopied(false);
  };

  const copyText = () => {
    if (!uuids) return;
    navigator.clipboard.writeText(uuids);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    if (!uuids) return;
    const blob = new Blob([uuids], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `uuids-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetAll = () => {
    setUuids("");
    setCopied(false);
  };

  // Stats
  const uuidList = uuids ? uuids.split("\n").filter(Boolean) : [];
  const uuidCount = uuidList.length;
  const charsPerUuid = uuidList[0] ? uuidList[0].length : 0;
  const totalChars = uuids.length;
  const hasResult = uuids.length > 0;

  const stats = hasResult
    ? [
        {
          icon: Hash,
          label: "UUIDs Generated",
          value: uuidCount,
          color: "text-gray-800",
        },
        {
          icon: Fingerprint,
          label: "Version",
          value: "v4",
          color: "text-sky-600",
        },
        {
          icon: Type,
          label: "Per UUID",
          value: `${charsPerUuid} chars`,
          color: "text-gray-800",
        },
        {
          icon: Layers,
          label: "Total Chars",
          value: totalChars,
          color: "text-gray-800",
        },
      ]
    : [];

  const inputCls =
    "w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800";
  const labelCls = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Breadcrumb ── */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 hover:text-sky-600 transition-colors"
              >
                <Home size={14} /> Home
              </Link>
            </li>
            <li>
              <span className="text-gray-300">/</span>
            </li>
            <li>
              <Link
                href="/pages/all-tools"
                className="hover:text-sky-600 transition-colors"
              >
                All Tools
              </Link>
            </li>
            <li>
              <span className="text-gray-300">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-semibold">
                UUID Generator
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        {/* ── Hero ── */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <Fingerprint className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Generate Random UUID v4 Online Free –{" "}
            <span className="text-sky-600">
              Bulk Unique Identifier Maker No Hyphens
            </span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Create cryptographically secure UUID v4 identifiers. Bulk
            generation, uppercase, no-hyphen formats. Perfect for database keys.
          </p>
        </div>

        <ResponsiveAd />

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          {/* Settings */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="text-gray-600" size={18} />
              <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Generation Settings
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              <div>
                <label className={labelCls}>Quantity</label>
                <input
                  type="number"
                  min="1"
                  max="5000"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(
                        1,
                        Math.min(5000, parseInt(e.target.value) || 1),
                      ),
                    )
                  }
                  className={inputCls}
                />
                <p className="text-xs text-gray-400 mt-1">1 to 5,000</p>
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 pb-3">
                  <input
                    type="checkbox"
                    checked={uppercase}
                    onChange={(e) => setUppercase(e.target.checked)}
                    className="h-4 w-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500"
                  />
                  Uppercase
                </label>
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 pb-3">
                  <input
                    type="checkbox"
                    checked={removeHyphens}
                    onChange={(e) => setRemoveHyphens(e.target.checked)}
                    className="h-4 w-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500"
                  />
                  Remove Hyphens
                </label>
              </div>
            </div>
          </div>

          {/* Generate + Reset */}
          <div className="flex flex-col sm:flex-row gap-3 mb-2">
            <button
              onClick={handleGenerate}
              className="bg-sky-600 hover:bg-sky-700 active:scale-95 transition-all text-white font-semibold px-8 py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Zap size={18} /> Generate{" "}
              {quantity > 1 ? `${quantity} UUIDs` : "UUID"}
            </button>
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
                  <div
                    key={i}
                    className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"
                  >
                    <div className="flex justify-center text-sky-500 mb-1">
                      <stat.icon size={20} />
                    </div>
                    <p className={`text-lg font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Dark Output Block */}
              <div className="bg-gray-900 rounded-2xl p-6 mb-6 overflow-x-auto">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-semibold">
                  Generated UUID{uuidCount !== 1 ? "s" : ""} — Version 4
                </p>
                <pre className="text-sm font-mono leading-relaxed text-gray-200 max-h-72 overflow-y-auto whitespace-pre-wrap">
                  {uuids}
                </pre>
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={copyText}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
                >
                  <Copy size={15} />
                  {copied ? "Copied!" : "Copy Result"}
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
              <Fingerprint size={32} className="mx-auto mb-3 text-gray-300" />
              <p>
                Click <strong className="text-gray-500">Generate UUID</strong>{" "}
                to create unique identifiers
              </p>
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
            How to Generate Random UUID v4 Online Free
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Set Quantity",
                desc: "Choose how many UUIDs you need, from 1 up to 5,000 for bulk database seeding.",
              },
              {
                step: "2",
                title: "Configure Format",
                desc: "Optionally enable Uppercase or Remove Hyphens to match your API or database requirements.",
              },
              {
                step: "3",
                title: "Generate IDs",
                desc: "Click the generate button to create cryptographically secure v4 UUIDs instantly.",
              },
              {
                step: "4",
                title: "Copy or Download",
                desc: "Copy the list to clipboard or download as a .txt file for offline use.",
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

        {/* ── How It Works ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How UUID Generation Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Secure randomness, standard format. Here's the logic.
          </p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Zap size={16} className="text-sky-600" />
                Cryptographically Secure Randomness
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                crypto.randomUUID() → 128-bit secure ID
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                We use the browser's native crypto API which generates true
                random numbers based on entropy sources. This is far more secure
                than Math.random() and suitable for security-sensitive
                applications.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Fingerprint size={16} className="text-sky-600" />
                Version 4 Structure
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                V4 UUIDs follow RFC 4122 standard. The '4' indicates random
                generation, and 'y' is always 8, 9, A, or B. This structure
                ensures global uniqueness across distributed systems.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2 flex items-center gap-2">
                <Shield size={16} className="text-sky-600" />
                Privacy Note
              </h3>
              <p className="text-sky-800 text-xs leading-relaxed">
                All UUID generation happens locally in your browser. No IDs are
                ever sent to any server. 100% private.
              </p>
            </div>
          </div>
        </section>

        {/* ── Sample Results ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Real Example: Database Primary Keys
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            See how UUIDs look in different formats.
          </p>

          <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Standard Format (with hyphens)
                </p>
                <p className="font-mono text-xs text-gray-800 break-all">
                  550e8400-e29b-41d4-a716-446655440000
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Compact Format (no hyphens)
                </p>
                <p className="font-mono text-xs text-gray-800 break-all">
                  550e8400e29b41d4a716446655440000
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Result: Both formats represent the same 128-bit value. Use
              standard for readability, compact for storage efficiency in some
              NoSQL databases.
            </p>
          </div>
        </section>

        {/* ── Use Cases ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses UUID Generators?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            From backend devs to QA testers — unique IDs are essential.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Zap size={20} className="text-sky-600" />,
                title: "Backend Developers",
                desc: "Generate primary keys for PostgreSQL, MySQL, or MongoDB collections where auto-increment integers are insufficient.",
              },
              {
                icon: <Globe size={20} className="text-sky-600" />,
                title: "API Developers",
                desc: "Create unique request IDs for tracing, debugging, and correlating logs across microservices architectures.",
              },
              {
                icon: <FileText size={20} className="text-sky-600" />,
                title: "QA Testers",
                desc: "Generate bulk test data for seeding databases, creating user accounts, or simulating high-volume transaction scenarios.",
              },
              {
                icon: <HelpCircle size={20} className="text-sky-600" />,
                title: "Session Managers",
                desc: "Create secure, unpredictable session tokens and CSRF tokens for web application security.",
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

        {/* ── SEO Content ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why UUIDs Matter for Modern Web Development
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            A <strong>UUID (Universally Unique Identifier)</strong> is a 128-bit
            label used to uniquely identify information in computer systems. The
            term <strong>GUID (Globally Unique Identifier)</strong> is used
            interchangeably in Microsoft ecosystems. Our generator creates{" "}
            <strong>Version 4 UUIDs</strong>, which are randomly generated using
            the browser's native{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
              crypto.randomUUID()
            </code>{" "}
            API — far more secure than Math.random().
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The probability of generating two identical v4 UUIDs is
            approximately <strong>1 in 5.3 × 10^36</strong> — so small that
            collisions are considered impossible in practice. This makes UUIDs
            ideal for database primary keys, session tokens, API request IDs,
            and distributed system identifiers where uniqueness across servers
            is critical.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Built for speed and privacy — all processing happens in your browser
            using JavaScript. Your UUIDs never leave your device. Just secure
            IDs, instantly.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Privacy Note
          </h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No UUIDs are
            uploaded to any server. No data is stored or tracked. Your info
            stays on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need more developer tools? Try the{" "}
            <Link
              href="/tools/unix-timestamp"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              Unix Timestamp Converter
            </Link>{" "}
            for time handling, or the{" "}
            <Link
              href="/tools/base64-encode"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              Base64 Encoder
            </Link>{" "}
            for data encoding.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {FAQS.map((item, i) => (
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
                    className={`text-sky-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related Tools ── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related Developer &amp; ID Tools
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

export default UUIDGenerator;
