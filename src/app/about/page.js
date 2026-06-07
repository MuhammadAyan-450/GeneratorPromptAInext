import Link from 'next/link'
import { ArrowLeft, Sparkles, ShieldCheck, Users, Globe2, Heart, Zap, Code, Lock } from 'lucide-react'

export const metadata = {
  title: 'About Us – Free AI Tools Platform | GeneratorPromptAI',
  description: 'Learn about GeneratorPromptAI: 40+ free AI tools, no signup, no ads. Built with ❤️ in Karachi by Ayan. Privacy-first, fast, mobile-friendly.',
  alternates: { canonical: 'https://www.generatorpromptai.com/about' },
  openGraph: {
    title: 'About Us – Free AI Tools Platform | GeneratorPromptAI',
    description: 'Learn about GeneratorPromptAI: 40+ free AI tools, no signup, no ads. Built with ❤️ in Karachi by Ayan.',
    url: 'https://www.generatorpromptai.com/about',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [{ url: 'https://www.generatorpromptai.com/og/about.png', width: 1200, height: 630, alt: 'About GeneratorPromptAI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us – Free AI Tools Platform | GeneratorPromptAI',
    description: 'Learn about GeneratorPromptAI: 40+ free AI tools, no signup, no ads. Built with ❤️ in Karachi by Ayan.',
    images: ['https://www.generatorpromptai.com/og/about.png'],
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  keywords: 'about generatorpromptai, free ai tools platform, no signup tools, privacy-first calculators, made in pakistan, ayan developer, karachi tech project',
}

const schemaAboutPage = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About GeneratorPromptAI – Free AI Tools Platform",
  "url": "https://www.generatorpromptai.com/about",
  "description": "GeneratorPromptAI is a free platform with 40+ AI tools and calculators. Built in Karachi, Pakistan by Ayan. No signup, no ads, privacy-first.",
  "mainEntity": {
    "@type": "Organization",
    "name": "GeneratorPromptAI",
    "url": "https://www.generatorpromptai.com",
    "logo": "https://www.generatorpromptai.com/logo.png",
    "founder": {
      "@type": "Person",
      "name": "Ayan",
      "jobTitle": "Founder & Developer",
      "address": { "@type": "PostalAddress", "addressLocality": "Karachi", "addressCountry": "PK" }
    },
    "foundingDate": "2024",
    "description": "Free online platform offering 40+ AI tools, calculators, and utilities. No signup, no ads, 100% browser-based for maximum privacy.",
    "sameAs": ["https://twitter.com/generatorpromptai", "https://github.com/generatorpromptai"]
  }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://www.generatorpromptai.com/about" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is GeneratorPromptAI really free?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, 100% free. No hidden costs, no premium plans, no watermarks. All 40+ tools are completely free to use as often as you need." }
    },
    {
      "@type": "Question",
      "name": "Do I need to sign up or create an account?",
      "acceptedAnswer": { "@type": "Answer", "text": "No signup required at all. Just open any tool and start using it. No email, no password, no account — nothing." }
    },
    {
      "@type": "Question",
      "name": "Is my data private and secure?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Everything runs in your browser. Your files, text, and data never get uploaded to any server. We don't store or share anything." }
    },
    {
      "@type": "Question",
      "name": "Who built GeneratorPromptAI?",
      "acceptedAnswer": { "@type": "Answer", "text": "GeneratorPromptAI was built by Ayan, a developer from Karachi, Pakistan. Started as a personal project and grew into a platform used by people worldwide." }
    },
    {
      "@type": "Question",
      "name": "Can I request a new tool?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes! Email generatorpromptai@gmail.com with your idea. Every suggestion gets read and the most requested tools get built first." }
    }
  ]
}

export default function AboutPage() {

  const values = [
    { icon: Zap, title: "Free. Always.", desc: "Not free for 14 days. Not free with limits. Free forever. Every tool, every time, no strings attached." },
    { icon: Lock, title: "Your Data Stays With You", desc: "Everything runs in your browser. Nothing gets uploaded. No server ever sees your files or your text." },
    { icon: Users, title: "Built for Real People", desc: "Students pulling all-nighters. Freelancers on tight deadlines. Developers who just need a quick JSON fix. This is for you." },
    { icon: Globe2, title: "Made in Karachi", desc: "Built from Pakistan, used worldwide. Proof that good tools don't need to come from Silicon Valley." }
  ]

  const tools = [
    { icon: Code, name: "JSON Formatter", desc: "Beautify & validate JSON instantly" },
    { icon: ShieldCheck, name: "Password Generator", desc: "Strong, secure passwords in one click" },
    { icon: Sparkles, name: "AI Prompt Generators", desc: "ChatGPT, Claude & Midjourney prompts" },
    { icon: Globe2, name: "Currency Converter", desc: "Live USD to PKR, AED to PKR & 170+ pairs" }
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaAboutPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1.5s" }} />
        </div>

        {/* Back link */}
        <div className="relative max-w-7xl mx-auto w-full px-4 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors text-sm font-medium group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 pb-20">

          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 mb-6 shadow-sm">
              <Sparkles className="text-indigo-600" size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              About{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                GeneratorPromptAI
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              40+ free tools. No signup. No nonsense. Just open and use.
            </p>
          </div>

          {/* ── STORY SECTION ── */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 mb-10 shadow-sm">

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              The Real Story Behind This Site
            </h2>

            {/* Para 1 — Personal hook */}
            <p className="text-gray-700 mb-5 leading-relaxed text-base">
             Hi My name is Muhammad Ayan. I'm a Web developer from Karachi, Pakistan — and I built this site
              because I kept running into the same annoying problem. Every time I needed a simple
              free tool online, the site either wanted my email, showed me five popups, or put
              the actual feature behind a "Pro" plan. For a basic age calculator. Or a JSON
              formatter. Come on.
            </p>

            {/* Para 2 — The decision */}
            <p className="text-gray-700 mb-5 leading-relaxed text-base">
              So I decided to built my own website. One tool turned into five. Five turned into twenty. Now
              GeneratorPromptAI has 40+ tools — and not a single one asks you to sign up or
              pay anything. That was the whole point from day one, and it's not changing.
            </p>

            {/* Para 3 — What it is now */}
            <p className="text-gray-700 mb-5 leading-relaxed text-base">
              Today the platform covers a lot of ground: AI prompt generators for ChatGPT,
              Claude and Midjourney, live currency converters, image compressors, developer
              utilities like JSON formatters and UUID generators, SEO tools, calculators, and
              more. If there's something missing that you actually need, email me — I read
              every message and build the most requested tools first.
            </p>

            {/* Para 4 — Privacy commitment */}
            <p className="text-gray-700 mb-6 leading-relaxed text-base">
              One thing I care about a lot: your privacy. Every single tool on this site runs
              in your browser. Nothing gets uploaded to a server. I don't see your files,
              your text, or your data. It processes locally and that's it. That's not a
              marketing line — it's just how the code works.
            </p>

            {/* Highlight box */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
              <p className="text-indigo-800 font-medium flex items-center gap-2 text-sm">
                <Heart size={16} className="text-indigo-600 flex-shrink-0" />
                Built solo in Karachi · Used by people in 50+ countries · Still free after all this time
              </p>
            </div>
          </div>

          {/* ── WHY I BUILT THIS ── */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 mb-10 shadow-sm">

            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              Why Free? Why No Signup?
            </h2>

            <p className="text-gray-700 mb-4 leading-relaxed text-base">
              Honest answer: because I needed these tools myself and couldn't find good free
              versions. As a student and developer in Pakistan, paying $20/month for basic
              utilities doesn't make sense. And I figured if I needed them, a lot of other
              people probably did too.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed text-base">
              The no-signup rule came from personal frustration. I've abandoned so many tools
              halfway through because they asked for an account just to download a result.
              It's unnecessary friction for things that should just work. So here — nothing
              asks for your email. Open the tool, use it, close the tab. Done.
            </p>

            <p className="text-gray-700 leading-relaxed text-base">
              Will it always be free? Yes. The tools might get better, the design might
              improve, new ones will keep getting added — but the core promise doesn't
              change. Free means free.
            </p>
          </div>

          {/* ── VALUES GRID ── */}
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-indigo-300 transition-all duration-300">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.desc}</p>
                </div>
              )
            })}
          </div>

          {/* ── POPULAR TOOLS ── */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 mb-10 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              A Few Tools People Use Every Day
            </h2>
            <p className="text-gray-500 text-sm text-center mb-6">
              There are 40+ in total — these are just the ones that get used the most.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {tools.map((tool, index) => {
                const Icon = tool.icon
                return (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{tool.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{tool.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="text-center mt-6">
              <Link href="/pages/all-tools" className="inline-flex items-center gap-1.5 text-indigo-600 font-medium hover:text-indigo-700 hover:underline text-sm">
                See all 40+ free tools <ArrowLeft size={14} className="rotate-180" />
              </Link>
            </div>
          </div>

          {/* ── PROMISE ── */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-8 mb-10">
            <h2 className="text-2xl font-bold text-indigo-900 mb-5 text-center">
              What I Promise You
            </h2>
            <ul className="space-y-4 text-indigo-800">
              <li className="flex items-start gap-3">
                <ShieldCheck size={20} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">
                  <strong>Free forever.</strong> Not a trial. Not limited. The whole thing, free, always.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Lock size={20} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">
                  <strong>Your data stays with you.</strong> Browser-only processing. No uploads, no logs, nothing stored.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap size={20} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">
                  <strong>Fast on any device.</strong> Works on a basic Android phone on mobile data. No excuses.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Heart size={20} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">
                  <strong>New tools regularly.</strong> Something new gets added every week based on what people actually ask for.
                </span>
              </li>
            </ul>
          </div>

          {/* ── FAQ ── */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 mb-10 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Questions People Ask
            </h2>
            <div className="space-y-5">
              {[
                {
                  q: "Is it actually free or is there a catch?",
                  a: "Actually free. No catch. I'm not going to suddenly introduce a paywall or put the good features behind a Pro plan. The whole site runs on the same promise it started with."
                },
                {
                  q: "Do you store anything I type into the tools?",
                  a: "No. The tools run in your browser — your text, your files, your numbers never leave your device. I genuinely have no way to see what you're doing because nothing gets sent to a server."
                },
                {
                  q: "Can I suggest a tool?",
                  a: "Yes, please do. Email generatorpromptai@gmail.com with what you need. I read every message. If multiple people ask for the same thing, it moves to the top of the build list."
                },
                {
                  q: "Why did you build this instead of just using existing tools?",
                  a: "Because the existing ones kept asking for signups, showing popups, or locking basic features. I got frustrated enough to build my own. Turns out a lot of people felt the same way."
                },
                {
                  q: "Who is this site for?",
                  a: "Students, developers, freelancers, content creators, small business owners — basically anyone who needs a quick, reliable online tool and doesn't want to jump through hoops to use it."
                }
              ].map((item, i) => (
                <div key={i} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                  <h3 className="font-semibold text-gray-900 mb-2 text-base">{item.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="text-center">
            <p className="text-gray-600 mb-3 text-base">
              Got a question, a suggestion, or just want to say hello?
            </p>
            <p className="text-gray-500 text-sm mb-6">
              I personally read and reply to every message.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Get in Touch <ArrowLeft size={18} className="rotate-180" />
              </Link>
              <Link
                href="/pages/all-tools"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 hover:border-indigo-300 text-gray-700 font-semibold rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                Browse All Tools
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}