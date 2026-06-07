import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  AlertTriangle,
  Globe,
  Lock,
  Mail,
  Clock,
  Shield,
  Users,
  CheckCircle,
} from "lucide-react";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service — GeneratorPromptAI",
  url: "https://www.generatorpromptai.com/terms-of-service",
  description:
    "Terms of Service for GeneratorPromptAI. Free online tools — no signup required. Read our acceptable use policy, liability limitations, and your rights.",
  isPartOf: {
    "@type": "WebSite",
    name: "GeneratorPromptAI",
    url: "https://www.generatorpromptai.com",
  },
  dateModified: "2026-06-01",
};

export const metadata = {
  title: "Terms of Service | GeneratorPromptAI — Free Online Tools",
  description:
    "Terms of Service for GeneratorPromptAI. Free online tools, no signup required. Read our acceptable use policy, your rights, and how we handle your data.",
  alternates: {
    canonical: "https://www.generatorpromptai.com/terms-of-service",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Terms of Service | GeneratorPromptAI",
    description:
      "Terms of Service for GeneratorPromptAI. Free online tools, no signup required.",
    url: "https://www.generatorpromptai.com/terms-of-service",
    type: "website",
    siteName: "GeneratorPromptAI",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | GeneratorPromptAI",
    description:
      "Terms of Service for GeneratorPromptAI. Free online tools, no signup required.",
  },
};

const sections = [
  "What This Site Does",
  "Using the Site",
  "No Account Needed",
  "What You Cannot Do",
  "Who Owns What",
  "Your Files",
  "Ads & Data",
  "No Warranties",
  "Liability Limits",
  "Third-Party Links",
  "Changes to These Terms",
  "Ending Your Access",
  "Governing Law",
  "Contact",
];

export default function TermsOfServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Back */}
        <div className="max-w-5xl mx-auto w-full px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-sky-600 text-sm font-medium group transition-colors"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          {/* ── HEADER ── */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl mb-5 shadow-lg shadow-sky-200">
              <FileText className="text-white" size={30} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
              Terms of{" "}
              <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            <p className="text-gray-500 text-sm mb-4">
              Last updated: June 2026 · GeneratorPromptAI
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400 flex-wrap">
              <span className="flex items-center gap-1">
                <Clock size={12} /> 8 min read
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="flex items-center gap-1">
                <Globe size={12} /> English
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <Link
                href="/privacy-policy"
                className="flex items-center gap-1 hover:text-sky-600 transition-colors"
              >
                <Lock size={12} /> Privacy Policy
              </Link>
            </div>
          </div>

          {/* ── PLAIN ENGLISH SUMMARY ── */}
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 mb-8">
            <p className="font-bold text-sky-900 mb-3 flex items-center gap-2">
              <CheckCircle size={18} className="text-sky-600" />
              The Short Version — Plain English
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Every tool is free. No hidden costs.",
                "No signup required for any tool.",
                "Don't use the site to do illegal things.",
                "Your files stay on your device — we don't upload them.",
                "We show ads via Google AdSense to keep this free.",
                "We're not responsible if a tool gives wrong results.",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-sm text-sky-800"
                >
                  <span className="text-sky-500 flex-shrink-0 mt-0.5">→</span>
                  {item}
                </div>
              ))}
            </div>
            <p className="text-xs text-sky-600 mt-4">
              The full version below has the legal details. But this summary
              covers the main points.
            </p>
          </div>

          {/* ── TABLE OF CONTENTS ── */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Contents
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {sections.map((item, i) => (
                <a
                  key={i}
                  href={`#section-${i + 1}`}
                  className="text-sm text-sky-600 hover:text-sky-700 hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span className="text-gray-300 text-xs">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* ── MAIN CONTENT ── */}
          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden mb-8">
            <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500" />

            <div className="p-8 md:p-12 space-y-12">
              {/* Agreement notice */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <p className="text-gray-700 text-sm leading-relaxed">
                  By using any tool on <strong>GeneratorPromptAI</strong>,
                  you're agreeing to these terms. If you don't agree, please
                  don't use the site. That's it — no need to sign anything, and
                  no account is required.
                </p>
              </div>

              {/* Section 1 */}
              <section id="section-1">
                <SectionHeader
                  number="1"
                  color="sky"
                  title="What This Site Does"
                />
                <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                  GeneratorPromptAI is a free platform with 40+ online tools —
                  AI prompt generators, image tools, calculators, developer
                  utilities, text tools, and more. Everything is free to use for
                  personal and commercial purposes.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm">
                  I built and maintain this site alone. Tools may occasionally
                  be unavailable for maintenance or updates. I can add, change,
                  or remove any tool at any time — but I'll try not to remove
                  anything people actually rely on without a good reason.
                </p>
              </section>

              {/* Section 2 */}
              <section id="section-2">
                <SectionHeader number="2" color="sky" title="Using the Site" />
                <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                  You need to be at least 13 years old to use this site. If
                  you're using it on behalf of a company or organization, you're
                  confirming you have the authority to agree to these terms on
                  their behalf.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Continued use of the site after terms are updated means you
                  accept the new version. The date at the top of this page shows
                  when it was last changed.
                </p>
              </section>

              {/* Section 3 */}
              <section id="section-3">
                <SectionHeader
                  number="3"
                  color="green"
                  title="No Account Needed"
                />
                <p className="text-gray-600 leading-relaxed text-sm">
                  Most tools work without any account. Just open and use. For
                  any features that do require an account in the future, the
                  same common sense rules apply — use a real email, don't share
                  your password, and let us know immediately if you think
                  someone else has access to your account.
                </p>
              </section>

              {/* Section 4 */}
              <section id="section-4">
                <SectionHeader
                  number="4"
                  color="red"
                  title="What You Cannot Do"
                />
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                  Most people use this site perfectly fine and none of this
                  applies to them. But to be clear — you cannot use
                  GeneratorPromptAI to:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-5">
                  {[
                    "Upload or process content that is illegal, harmful, or violates anyone's rights",
                    "Try to break into, overload, or disrupt any part of the site or its infrastructure",
                    "Scrape or copy tool code, designs, or content without permission",
                    "Distribute malware or anything designed to damage other people's systems",
                    "Use the tools to generate content that violates applicable laws",
                    "Resell or rebrand our tools as your own product without written permission",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-red-50 border border-red-100 rounded-xl p-3.5 flex items-start gap-2.5"
                    >
                      <span className="text-red-400 flex-shrink-0 text-base mt-0.5">
                        ✕
                      </span>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle
                    size={16}
                    className="text-amber-600 flex-shrink-0 mt-0.5"
                  />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    If you break these rules, I'll remove your access. In
                    serious cases — like illegal activity — I may also report it
                    to the relevant authorities.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section id="section-5">
                <SectionHeader
                  number="5"
                  color="purple"
                  title="Who Owns What"
                />
                <div className="space-y-3 text-sm text-gray-600">
                  <p className="leading-relaxed">
                    The GeneratorPromptAI name, logo, site design, and code are
                    mine. You can't copy them, rebrand them, or use them without
                    asking first.
                  </p>
                  <p className="leading-relaxed">
                    Your stuff stays yours. Any file you upload, any text you
                    type, any output the tools generate — that belongs to you. I
                    don't claim ownership of anything you create or process
                    using these tools. Use it however you want.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section id="section-6">
                <SectionHeader number="6" color="blue" title="Your Files" />
                <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                  Here's what actually happens to files you upload or text you
                  enter:
                </p>
                <div className="space-y-2.5">
                  {[
                    {
                      label: "Most tools",
                      desc: "Process everything in your browser. Your files never leave your device. The image compressor, JSON formatter, word counter, and most other tools work this way.",
                      color: "bg-green-50 border-green-200 text-green-800",
                    },
                    {
                      label: "AI tools",
                      desc: "The AI Agent and AI Humanizer send your text to the Groq API to generate responses. This is necessary for them to work. The API doesn't permanently store your messages.",
                      color: "bg-blue-50 border-blue-200 text-blue-800",
                    },
                    {
                      label: "Currency Converter",
                      desc: "Fetches live exchange rates from a public API. No personal data is sent — just a request for today's rates.",
                      color: "bg-amber-50 border-amber-200 text-amber-800",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`${item.color} border rounded-xl p-4`}
                    >
                      <p className="font-semibold text-sm mb-1">{item.label}</p>
                      <p className="text-xs leading-relaxed opacity-90">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-500 text-xs mt-3 leading-relaxed">
                  You're responsible for making sure you have the right to
                  process any content you run through these tools.
                </p>
              </section>

              {/* Section 7 — ADS (Important for AdSense) */}
              <section id="section-7">
                <SectionHeader number="7" color="amber" title="Ads & Data" />
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                  The site is free because it shows ads. That's the deal — you
                  get free tools, Google shows you ads. Here's what that means
                  in practice:
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-4">
                  <p className="font-semibold text-amber-900 mb-2 text-sm">
                    Google AdSense
                  </p>
                  <p className="text-amber-800 text-xs leading-relaxed mb-3">
                    This site uses <strong>Google AdSense</strong> to display
                    advertisements. Google AdSense uses cookies to show ads
                    relevant to your browsing history. This means Google may use
                    data from your visits here and other websites to decide
                    which ads to show you.
                  </p>
                  <p className="text-amber-800 text-xs leading-relaxed">
                    You can opt out of personalized ads at{" "}
                    <a
                      href="https://www.google.com/settings/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold underline"
                    >
                      google.com/settings/ads
                    </a>
                    . For more on how Google uses data, see{" "}
                    <a
                      href="https://policies.google.com/technologies/partner-sites"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold underline"
                    >
                      Google's partner site policy
                    </a>
                    .
                  </p>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We also use Google Analytics to see anonymous traffic data —
                  which countries visitors come from, which tools get used most,
                  how fast pages load. This is aggregated and doesn't identify
                  you personally. Our full{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-sky-600 hover:underline font-medium"
                  >
                    Privacy Policy
                  </Link>{" "}
                  covers this in more detail.
                </p>
              </section>

              {/* Section 8 */}
              <section id="section-8">
                <SectionHeader number="8" color="gray" title="No Warranties" />
                <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                  The tools are provided as-is. I build them carefully and test
                  them, but I can't promise they'll always be perfect.
                  Specifically:
                </p>
                <ul className="space-y-2 text-xs text-gray-600 pl-4">
                  {[
                    "Tools may occasionally have bugs or produce incorrect results",
                    "The site may be unavailable during maintenance",
                    "AI tools generate outputs based on your input — the results aren't guaranteed to be accurate",
                    "Currency rates are fetched from third-party APIs and may not reflect real-time rates",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 leading-relaxed"
                    >
                      <span className="text-gray-400 flex-shrink-0 mt-0.5">
                        →
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-500 text-xs mt-3">
                  Use your own judgment when relying on tool outputs for
                  important decisions.
                </p>
              </section>

              {/* Section 9 */}
              <section id="section-9">
                <SectionHeader
                  number="9"
                  color="orange"
                  title="Liability Limits"
                />
                <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                  To be direct: GeneratorPromptAI is a free site run by one
                  person. I'm not liable for:
                </p>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {[
                    "Loss of files during processing",
                    "Incorrect results from any tool",
                    "Downtime or service interruptions",
                    "Actions you take based on tool output",
                    "Content generated by AI tools",
                    "Any indirect or consequential damages",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-orange-50 border border-orange-100 rounded-lg p-3 text-xs text-gray-700 flex items-start gap-2"
                    >
                      <span className="text-orange-400 flex-shrink-0">•</span>
                      {item}
                    </div>
                  ))}
                </div>
                <p className="text-gray-500 text-xs mt-3">
                  Since all tools are free, our maximum liability is $0 — which
                  is what you paid. Some regions don't allow this limitation, in
                  which case we're liable to the minimum extent required by law.
                </p>
              </section>

              {/* Section 10 */}
              <section id="section-10">
                <SectionHeader
                  number="10"
                  color="gray"
                  title="Third-Party Links"
                />
                <p className="text-gray-600 leading-relaxed text-sm">
                  Some pages link to external sites or tools. These links are
                  there for your convenience — they don't mean we endorse those
                  sites or are responsible for their content. When you leave
                  this site, their own terms and privacy policies apply.
                </p>
              </section>

              {/* Section 11 */}
              <section id="section-11">
                <SectionHeader
                  number="11"
                  color="sky"
                  title="Changes to These Terms"
                />
                <p className="text-gray-600 leading-relaxed text-sm">
                  If anything important changes — like how ads work, what data
                  is collected, or the acceptable use rules — I'll update this
                  page and change the date at the top. Continuing to use the
                  site after an update means you accept the new terms. For
                  significant changes, I'll try to add a notice on the site.
                </p>
              </section>

              {/* Section 12 */}
              <section id="section-12">
                <SectionHeader
                  number="12"
                  color="red"
                  title="Ending Your Access"
                />
                <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                  If you break these terms — especially the acceptable use rules
                  — I'll remove your access to the site without warning. You can
                  also stop using the site at any time; that's it, no
                  cancellation needed since there's no account or subscription
                  to cancel.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The sections on intellectual property, liability, and
                  governing law survive even after your access ends.
                </p>
              </section>

              {/* Section 13 */}
              <section id="section-13">
                <SectionHeader
                  number="13"
                  color="indigo"
                  title="Governing Law"
                />
                <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                  These terms are governed by the laws of Pakistan. If there's
                  ever a dispute, here's the order of how we'd try to resolve
                  it:
                </p>
                <ol className="space-y-2 text-sm text-gray-600 pl-4 list-decimal">
                  <li className="leading-relaxed">
                    <strong>Email first</strong> — contact me and I'll try to
                    sort it out within 14 days
                  </li>
                  <li className="leading-relaxed">
                    <strong>Mediation</strong> — through a neutral third party
                    if needed
                  </li>
                  <li className="leading-relaxed">
                    <strong>Courts in Pakistan</strong> — only if nothing else
                    works
                  </li>
                </ol>
                <p className="text-gray-500 text-xs mt-3">
                  If any part of these terms turns out to be unenforceable, the
                  rest still applies.
                </p>
              </section>

              {/* Section 14 — Contact */}
              <section id="section-14">
                <SectionHeader number="14" color="sky" title="Contact" />
                <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                  Questions about these terms? Something unclear? Just email me.
                  I'm one person — not a legal department — so you'll get a real
                  answer.
                </p>
                <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail size={16} className="text-sky-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-0.5">
                          Email
                        </p>
                        <a
                          href="mailto:generatorpromptai@gmail.com"
                          className="text-sky-600 hover:text-sky-700 font-semibold text-sm transition-colors"
                        >
                          generatorpromptai@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Globe size={16} className="text-sky-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-0.5">
                          Website
                        </p>
                        <Link
                          href="/"
                          className="text-sky-600 hover:text-sky-700 font-semibold text-sm transition-colors"
                        >
                          generatorpromptai.com
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock size={16} className="text-sky-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-0.5">
                          Response Time
                        </p>
                        <p className="text-gray-700 text-sm">
                          Usually within 24 hours. Legal questions within 7
                          business days.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* ── RELATED PAGES ── */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Related Pages
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                {
                  href: "/privacy-policy",
                  label: "Privacy Policy",
                  icon: Lock,
                },
                { href: "/about", label: "About Us", icon: Users },
                { href: "/contact", label: "Contact", icon: Mail },
                {
                  href: "/pages/all-tools",
                  label: "All Free Tools",
                  icon: Shield,
                },
                { href: "/blog", label: "Blog", icon: FileText },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={i}
                    href={item.href}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-50 hover:bg-sky-50 hover:border-sky-200 text-gray-700 hover:text-sky-700 text-sm rounded-xl border border-gray-200 transition-all"
                  >
                    <Icon size={13} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ── RELATED TOOLS ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5 text-center">
              Free Tools — Try These
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  href: "/tools/password-generator",
                  title: "Password Generator",
                  desc: "Generate strong passwords instantly. Nothing gets stored or uploaded.",
                },
                {
                  href: "/tools/image-compressor",
                  title: "Image Compressor",
                  desc: "Compress images locally in your browser. Your photos never leave your device.",
                },
                {
                  href: "/tools/json-formatter",
                  title: "JSON Formatter",
                  desc: "Format and validate JSON code. 100% client-side — completely private.",
                },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-sky-400 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-sky-600 transition-colors text-sm">
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
    </>
  );
}

// ── Section Header Component ──────────────────────────────────────────────────
function SectionHeader({ number, color, title }) {
  const colors = {
    sky: "bg-sky-100 text-sky-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    purple: "bg-purple-100 text-purple-700",
    blue: "bg-blue-100 text-blue-700",
    amber: "bg-amber-100 text-amber-700",
    orange: "bg-orange-100 text-orange-700",
    indigo: "bg-indigo-100 text-indigo-700",
    gray: "bg-gray-100 text-gray-600",
  };
  return (
    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
      <span
        className={`w-8 h-8 ${colors[color]} rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0`}
      >
        {number}
      </span>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    </div>
  );
}
