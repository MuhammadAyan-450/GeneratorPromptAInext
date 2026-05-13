'use client'

import Link from 'next/link'
import {
  Sparkles,
  Mail,
  ArrowUp,
  ExternalLink,
  Heart,
  Globe,
} from 'lucide-react'

const Footer = () => {
  const topTools = [
    { path: "/tools/base64-encode", name: "Base64 Encoder & Decoder" },
    { path: "/tools/lorem-ipsum-generator", name: "Lorem Ipsum Generator" },
    { path: "/tools/adsense-revenue-calculator", name: "AdSense Revenue Calculator" },
    { path: "/tools/youtube-ad-revenue-calculator", name: "YouTube Ad Revenue Calculator" },
    { path: "/tools/json-formatter", name: "JSON Formatter & Validator" },
    { path: "/tools/uuid-generator", name: "Free UUID Generator Online" },
    { path: "/tools/qr-code-generator", name: "QR Code Generator" },
    { path: "/tools/password-generator", name: "Strong Password Generator" },
    { path: "/tools/ai-agent", name: "Ai Agent" },
    { path: "/tools/midjourney-prompt-generator", name: "Midjourney Prompt Builder" },
  ]

  const resourceLinks = [
    { path: "/pages/all-tools", name: "Browse All Free Tools" },
    { path: "/blog", name: "Blog & Tutorials" },
    { path: "/about", name: "About Us" },
    { path: "/contact", name: "Contact Us" },
    { path: "/privacy-policy", name: "Privacy Policy" },
    { path: "/terms-of-service", name: "Terms of Service" },
    { path: "https://www.generatorpromptai.com/sitemap.xml", name: "XML Sitemap", external: true },
  ]

  const seoLinks = [
    { path: "/blog/how-to-calculate-cpm", name: "How to Calculate CPM Guide" },
    { path: "/blog/how-to-generate-lorem-ipsum-text-custom-length", name: "How to Generate Lorem Ipsum" },
    { path: "/tools/cpm-calculator", name: "Free CPM Calculator Online" },
    { path: "/tools/cpc-calculator", name: "Free CPC Calculator Tool" },
    { path: "/tools/ad-revenue-calculator", name: "Ad Revenue Estimator" },
  ]

  return (
    <footer className="relative mt-auto transition-colors duration-300">

      {/* ── Top Accent Line ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      {/* ── Subtle Background Pattern ── */}
      <div className="relative bg-gray-50 dark:bg-gray-950 overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/[0.03] dark:bg-indigo-500/[0.05] rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-500/[0.03] dark:bg-purple-500/[0.05] rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-12 pb-8 md:pt-16 md:pb-10">

          {/* ── Back to Top ── */}
          <div className="flex justify-end mb-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800/80 hover:bg-indigo-50 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-indigo-100 dark:hover:shadow-none border border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-500/30"
            >
              <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
              Back to Top
            </button>
          </div>

          {/* ── Main Footer Grid ── */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-6 pb-12 border-b border-gray-200/70 dark:border-gray-800/70">

            {/* ── Brand Column ── */}
            <div className="col-span-2 md:col-span-3 lg:col-span-4 lg:pr-6">
              <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
                <div className="relative">
                  <Sparkles size={28} className="text-indigo-500 group-hover:text-purple-500 transition-colors duration-300" />
                  <div className="absolute inset-0 bg-indigo-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] group-hover:bg-[length:100%_auto] transition-all duration-500">
                  GeneratorPromptAI
                </span>
              </Link>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
                Free AI prompt generators and powerful online tools for creators, developers, and marketers. No signup, no limits.
              </p>

              {/* Quick Stats */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <p className="text-lg font-extrabold text-gray-900 dark:text-white">30+</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium">Free Tools</p>
                </div>
                <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
                <div className="text-center">
                  <p className="text-lg font-extrabold text-gray-900 dark:text-white">0</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium">Signups</p>
                </div>
                <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
                <div className="text-center">
                  <p className="text-lg font-extrabold text-gray-900 dark:text-white">100%</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium">Free</p>
                </div>
              </div>

              {/* Email Contact */}
              <a
                href="mailto:generatorpromptai@gmail.com"
                className="group/email inline-flex items-center gap-2.5 text-sm text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 bg-white dark:bg-gray-800/60 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:shadow-sm"
              >
                <Mail size={14} className="group-hover/email:scale-110 transition-transform" />
                generatorpromptai@gmail.com
              </a>
            </div>

            {/* ── Popular Tools ── */}
            <div className="col-span-1 lg:col-span-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <h4 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">
                  Popular Tools
                </h4>
              </div>
              <ul className="space-y-1.5">
                {topTools.map((tool, i) => (
                  <li key={tool.path}>
                    <Link
                      href={tool.path}
                      className="group/link relative flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 py-0.5"
                    >
                      <span className="text-[10px] text-gray-300 dark:text-gray-600 font-mono mt-0.5 flex-shrink-0 w-4 text-right">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="group-hover/link:translate-x-0.5 transition-transform duration-200">{tool.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Resources ── */}
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                <h4 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">
                  Resources
                </h4>
              </div>
              <ul className="space-y-1.5">
                {resourceLinks.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 py-0.5"
                      >
                        {link.name}
                        <ExternalLink size={10} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <Link
                        href={link.path}
                        className="group/link inline-block text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 py-0.5 group-hover/link:translate-x-0.5"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Learn & Legal Interlinks ── */}
            <div className="col-span-2 md:col-span-1 lg:col-span-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <h4 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">
                  Learn & Legal
                </h4>
              </div>
              <ul className="space-y-1.5">
                {seoLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="group/link inline-block text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 py-0.5 group-hover/link:translate-x-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mini CTA Card */}
              <div className="mt-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-14 h-14 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <p className="text-xs font-bold mb-1 relative">Want all tools?</p>
                <p className="text-[11px] text-indigo-100 mb-3 relative">Browse our full collection.</p>
                <Link
                  href="/pages/all-tools"
                  className="relative block text-center py-2 bg-white text-indigo-700 text-[11px] font-bold rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
                >
                  Explore All Tools →
                </Link>
              </div>
            </div>
          </div>

          {/* ── SEO Description Block ── */}
          <div className="py-8 text-center">
            <p className="text-gray-400 dark:text-gray-500 text-sm leading-relaxed max-w-3xl mx-auto">
              GeneratorPromptAI offers 30+ free online tools including AI prompt generators for ChatGPT, Claude, and Midjourney, plus image converters, text utilities, developer tools, SEO tools, calculators, and more. No signup required.
            </p>
          </div>

          {/* ── Bottom Bar ── */}
          <div className="pt-6 border-t border-gray-200/70 dark:border-gray-800/70">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                © {new Date().getFullYear()} GeneratorPromptAI. All rights reserved.
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline-flex items-center gap-1">
                  Built with <Heart size={10} className="text-red-400 fill-red-400" /> in Karachi, Pakistan
                </span>
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1">
                {[
                  { path: "/privacy-policy", name: "Privacy" },
                  { path: "/terms-of-service", name: "Terms" },
                  { path: "/about", name: "About" },
                  { path: "/contact", name: "Contact" },
                  { path: "https://www.generatorpromptai.com/sitemap.xml", name: "Sitemap", external: true },
                ].map((link, i) => (
                  <span key={link.name} className="flex items-center">
                    {link.external ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-xs text-gray-400 dark:text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/60"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.path}
                        className="px-3 py-1.5 text-xs text-gray-400 dark:text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/60"
                      >
                        {link.name}
                      </Link>
                    )}
                    {i < 4 && (
                      <span className="w-px h-3 bg-gray-200 dark:bg-gray-700 last:hidden" />
                    )}
                  </span>
                ))}
                <span className="w-px h-3 bg-gray-200 dark:bg-gray-700" />
                <span className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-400 dark:text-gray-500">
                  <Globe size={11} />
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer