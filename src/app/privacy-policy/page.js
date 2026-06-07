import Link from 'next/link'
import { ArrowLeft, Shield, Lock, Eye, Database, Cookie, Mail, AlertCircle } from 'lucide-react'

const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy — GeneratorPromptAI",
  url: "https://www.generatorpromptai.com/privacy-policy",
  description: "Privacy Policy for GeneratorPromptAI. We use Google AdSense for ads and Google Analytics for traffic data. All tools run in your browser — your files and text never leave your device.",
  mainEntity: {
    "@type": "Organization",
    name: "GeneratorPromptAI",
    url: "https://www.generatorpromptai.com",
  },
}

export const metadata = {
  title: 'Privacy Policy | GeneratorPromptAI',
  description: 'GeneratorPromptAI Privacy Policy. We use Google AdSense and Analytics. All tool processing happens in your browser — your data never leaves your device.',
  alternates: { canonical: 'https://www.generatorpromptai.com/privacy-policy' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Privacy Policy | GeneratorPromptAI',
    description: 'GeneratorPromptAI Privacy Policy. We use Google AdSense and Analytics. All tool processing happens in your browser.',
    url: 'https://www.generatorpromptai.com/privacy-policy',
    type: 'website',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gray-50 pb-20">

        {/* Back link */}
        <div className="max-w-5xl mx-auto w-full px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors text-sm font-medium group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto px-4">

          {/* ── HEADER ── */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-5 shadow-lg shadow-green-200">
              <Shield className="text-white" size={30} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
              Privacy{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-gray-500 text-sm">
              Last updated: June 2026 &nbsp;·&nbsp; GeneratorPromptAI
            </p>
          </div>

          {/* ── QUICK SUMMARY CARDS ── */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Lock, color: 'green', title: 'No Account Needed', desc: 'We never ask for your name, email, or password to use any tool.' },
              { icon: Database, color: 'blue', title: 'Browser-Only Processing', desc: 'Your files and text stay on your device. Nothing gets uploaded.' },
              { icon: Eye, color: 'purple', title: 'Ads Are Shown', desc: 'We use Google AdSense to display ads. This is how we keep tools free.' },
            ].map((item, i) => {
              const Icon = item.icon
              const colors = {
                green: 'bg-green-50 border-green-200 text-green-600',
                blue: 'bg-blue-50 border-blue-200 text-blue-600',
                purple: 'bg-purple-50 border-purple-200 text-purple-600',
              }
              return (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center hover:shadow-md transition-all">
                  <div className={`w-11 h-11 ${colors[item.color]} border rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon size={20} />
                  </div>
                  <p className="font-bold text-gray-900 text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>

          {/* ── MAIN CONTENT ── */}
          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden mb-8">

            {/* Green top bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />

            <div className="p-8 md:p-12 space-y-10">

              {/* Intro */}
              <div>
                <p className="text-gray-700 leading-relaxed text-base mb-4">
                  I built GeneratorPromptAI to be useful and free. To keep it free, the site shows
                  ads through Google AdSense. That's the honest version of how this works — ads pay
                  for the hosting and time it takes to build and maintain everything.
                </p>
                <p className="text-gray-700 leading-relaxed text-base">
                  This page explains what data gets collected, what Google uses, and what stays
                  completely private on your device. I've tried to write it like a normal person
                  instead of a legal document nobody reads.
                </p>
              </div>

              {/* Section 1 — What we collect */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Database size={16} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">What Data Do We Collect?</h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                  Directly — nothing that identifies you personally. We don't have a signup form,
                  we don't collect your name or email just because you visited, and we don't store
                  anything you type into the tools.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm">
                  We use <strong className="text-gray-800">Google Analytics</strong> to see general
                  traffic data — things like which countries visitors come from, which tools get
                  used most, and how fast pages load. This is anonymous. Google Analytics doesn't
                  tell me who you are — just that someone visited.
                </p>
              </div>

              {/* Section 2 — Google AdSense (IMPORTANT for AdSense approval) */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertCircle size={16} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Google AdSense & Advertising</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                  This site uses <strong>Google AdSense</strong> to display advertisements.
                  Google AdSense is an advertising service provided by Google LLC. When ads are
                  shown on this site, Google may use cookies to serve ads based on your previous
                  visits to this site or other websites.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                  Google's use of advertising cookies enables it and its partners to serve ads
                  based on your visit to our site and other sites on the internet. You can opt
                  out of personalized advertising by visiting{" "}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-700 font-semibold hover:underline"
                  >
                    Google Ads Settings
                  </a>
                  .
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  For more information on how Google uses data when you use our site, visit:{" "}
                  <a
                    href="https://policies.google.com/technologies/partner-sites"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-700 font-semibold hover:underline"
                  >
                    How Google uses data from partner sites
                  </a>
                  .
                </p>
              </div>

              {/* Section 3 — Cookies */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Cookie size={16} className="text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Cookies</h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                  This site uses cookies in two ways:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      title: 'Essential cookies',
                      desc: 'Small bits of data that help the site work properly — like remembering if you\'ve accepted the cookie banner so we don\'t show it to you every single time.',
                      color: 'bg-green-50 border-green-200 text-green-700'
                    },
                    {
                      title: 'Google AdSense cookies',
                      desc: 'Used by Google to show you relevant ads. These may track your browsing across sites to serve personalized advertising. You can turn this off in Google\'s ad settings.',
                      color: 'bg-amber-50 border-amber-200 text-amber-700'
                    },
                    {
                      title: 'Google Analytics cookies',
                      desc: 'Used to track anonymous usage data — page visits, traffic sources, and general site performance. This is aggregated data that doesn\'t identify individual users.',
                      color: 'bg-blue-50 border-blue-200 text-blue-700'
                    },
                  ].map((item, i) => (
                    <div key={i} className={`${item.color} border rounded-xl p-4`}>
                      <p className="font-semibold text-sm mb-1">{item.title}</p>
                      <p className="text-xs leading-relaxed opacity-90">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4 — Browser processing */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock size={16} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Your Files Stay on Your Device</h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                  Every tool on this site processes data locally in your browser. When you use the
                  image compressor, the JSON formatter, the word counter, the age calculator — none
                  of that data gets sent to any server.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm">
                  The only exception is tools that specifically need to fetch external data to work
                  — like the Currency Converter, which fetches live exchange rates from a public
                  API. In those cases, the tool page will make that clear.
                </p>
              </div>

              {/* Section 5 — Third party */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Eye size={16} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Third-Party Services We Use</h2>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Google AdSense', purpose: 'Showing advertisements to keep the site free', link: 'https://policies.google.com/privacy' },
                    { name: 'Google Analytics', purpose: 'Anonymous traffic and usage data', link: 'https://policies.google.com/privacy' },
                    { name: 'Groq API', purpose: 'Powering the AI chat tools (AI Agent, AI Humanizer)', link: 'https://groq.com/privacy-policy' },
                    { name: 'Open Exchange Rates', purpose: 'Live currency exchange rates for the Currency Converter', link: null },
                  ].map((service, i) => (
                    <div key={i} className="flex items-start justify-between gap-4 py-3 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{service.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{service.purpose}</p>
                      </div>
                      {service.link && (
                        <a
                          href={service.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline whitespace-nowrap flex-shrink-0"
                        >
                          Privacy Policy →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 6 — Children */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Children's Privacy</h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                  This site is not directed at children under 13. We do not knowingly collect
                  any personal information from children. If you believe a child has provided
                  us with personal data, please contact us and we'll remove it immediately.
                </p>
              </div>

              {/* Section 7 — Your rights */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Your Rights</h2>
                <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                  Since we don't collect personal data directly, there isn't much to request
                  deletion of. But you do have control over the advertising and analytics cookies:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 flex-shrink-0">→</span>
                    <span>Opt out of personalized Google ads at <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">google.com/settings/ads</a></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 flex-shrink-0">→</span>
                    <span>Opt out of Google Analytics at <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 flex-shrink-0">→</span>
                    <span>Clear cookies from your browser settings at any time</span>
                  </li>
                </ul>
              </div>

              {/* Section 8 — Changes */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Changes to This Policy</h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                  If anything significant changes — like adding a new advertising partner or
                  changing how data is handled — I'll update this page and change the date at
                  the top. Since this site doesn't collect personal information directly, major
                  changes are unlikely. But I'll be transparent if they happen.
                </p>
              </div>

              {/* Contact */}
              <div className="pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Mail size={16} className="text-gray-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Questions?</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  If anything here is unclear or you have a specific question about your data,
                  just email me directly. I'm one person running this site — not a legal
                  department — so you'll get a real answer.
                </p>
                <a
                  href="mailto:generatorpromptai@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all text-sm shadow-md shadow-green-200 hover:-translate-y-0.5"
                >
                  <Mail size={15} />
                  generatorpromptai@gmail.com
                </a>
              </div>

            </div>
          </div>

          {/* ── RELATED TOOLS ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5 text-center">
              Free Tools — No Data Collected
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { href: "/tools/password-generator", title: "Password Generator", desc: "Generate strong passwords. Runs in your browser — we never see them." },
                { href: "/tools/image-compressor", title: "Image Compressor", desc: "Compress images locally. Your photos never leave your device." },
                { href: "/tools/json-formatter", title: "JSON Formatter", desc: "Format and validate JSON. 100% client-side processing." },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-green-400 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-green-600 transition-colors text-sm">
                    {tool.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{tool.desc}</p>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  )
}