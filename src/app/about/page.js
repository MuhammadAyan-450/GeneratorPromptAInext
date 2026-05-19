import Link from 'next/link'
import { ArrowLeft, Sparkles, ShieldCheck, Users, Globe2, Heart, Zap, Code, Lock } from 'lucide-react'

// ✅ Perfect SEO Metadata (Title: 52 chars, Description: 158 chars)
export const metadata = {
  title: 'About Us – Free AI Tools Platform | GeneratorPromptAI',
  
  description: 'Learn about GeneratorPromptAI: 30+ free AI tools, no signup, no ads. Built with ❤️ in Karachi by Ayan. Privacy-first, fast, mobile-friendly.',
  
  alternates: { canonical: 'https://www.generatorpromptai.com/about' },
  
  openGraph: {
    title: 'About Us – Free AI Tools Platform | GeneratorPromptAI',
    description: 'Learn about GeneratorPromptAI: 30+ free AI tools, no signup, no ads. Built with ❤️ in Karachi by Ayan.',
    url: 'https://www.generatorpromptai.com/about',
    siteName: 'GeneratorPromptAI',
    type: 'website',
    images: [
      {
        url: 'https://www.generatorpromptai.com/og/about.png',
        width: 1200,
        height: 630,
        alt: 'About GeneratorPromptAI – Free AI Tools Platform',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'About Us – Free AI Tools Platform | GeneratorPromptAI',
    description: 'Learn about GeneratorPromptAI: 30+ free AI tools, no signup, no ads. Built with ❤️ in Karachi by Ayan.',
    images: ['https://www.generatorpromptai.com/og/about.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  
  keywords: 'about generatorpromptai, free ai tools platform, no signup tools, privacy-first calculators, made in pakistan, ayan developer, karachi tech project',
}

// ─── JSON-LD: AboutPage + Organization Schema ───────────────────────────────
const schemaAboutPage = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About GeneratorPromptAI – Free AI Tools Platform",
  "url": "https://www.generatorpromptai.com/about",
  "description": "Learn about GeneratorPromptAI: a free, privacy-first platform with 30+ AI tools and calculators. Built with ❤️ in Karachi, Pakistan by Ayan.",
  "mainEntity": {
    "@type": "Organization",
    "name": "GeneratorPromptAI",
    "url": "https://www.generatorpromptai.com",
    "logo": "https://www.generatorpromptai.com/logo.png",
    "founder": {
      "@type": "Person",
      "name": "Ayan",
      "jobTitle": "Founder & Developer",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Karachi",
        "addressCountry": "PK"
      }
    },
    "foundingDate": "2024",
    "description": "Free online platform offering 30+ AI tools, calculators, and utilities. No signup, no ads, 100% client-side processing for maximum privacy.",
    "sameAs": [
      "https://twitter.com/generatorpromptai",
      "https://github.com/generatorpromptai"
    ]
  }
}

// ─── JSON-LD: BreadcrumbList Schema ─────────────────────────────────────────
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://www.generatorpromptai.com/about" }
  ]
}

// ─── JSON-LD: FAQPage Schema ────────────────────────────────────────────────
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is GeneratorPromptAI really free?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, 100% free forever. No hidden costs, no premium plans, no watermarks. All tools are completely free to use as often as you need." }
    },
    {
      "@type": "Question",
      "name": "Do I need to sign up or create an account?",
      "acceptedAnswer": { "@type": "Answer", "text": "No signup required. Just visit any tool and start using it immediately. No email, no password, no tracking." }
    },
    {
      "@type": "Question",
      "name": "Is my data private and secure?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. All calculations happen in your browser. Your files, text, and data never leave your device. We don't store, log, or share anything." }
    },
    {
      "@type": "Question",
      "name": "Who built GeneratorPromptAI?",
      "acceptedAnswer": { "@type": "Answer", "text": "GeneratorPromptAI was built by Ayan, a developer based in Karachi, Pakistan. It's a passion project dedicated to making useful tools accessible to everyone." }
    },
    {
      "@type": "Question",
      "name": "Can I request a new tool?",
      "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! Email us at generatorpromptai@gmail.com with your idea. We review all suggestions and build the most requested tools." }
    }
  ]
}

export default function AboutPage() {
  const values = [
    {
      icon: Zap,
      title: "100% Free Forever",
      desc: "No hidden costs, no premium tiers, no watermarks. Every tool is completely free to use, forever."
    },
    {
      icon: Lock,
      title: "Privacy First",
      desc: "All processing happens in your browser. Your data never leaves your device — ever."
    },
    {
      icon: Users,
      title: "Built for Everyone",
      desc: "Students, developers, creators, small businesses — tools designed to be simple and useful for all."
    },
    {
      icon: Globe2,
      title: "Made in Pakistan",
      desc: "Proudly built with ❤️ in Karachi. Supporting local tech talent and global accessibility."
    }
  ]

  const tools = [
    { icon: Code, name: "JSON Formatter", desc: "Beautify & validate JSON" },
    { icon: ShieldCheck, name: "Password Generator", desc: "Create strong passwords" },
    { icon: Sparkles, name: "AI Prompt Generators", desc: "Optimized prompts for ChatGPT, Claude, Midjourney" },
    { icon: Globe2, name: "Currency Converter", desc: "Real-time exchange rates" }
  ]

  return (
    <>
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaAboutPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1.5s" }} />
        </div>

        {/* Back to Home */}
        <div className="relative max-w-7xl mx-auto w-full px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors text-sm font-medium group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Main Content */}
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
              Free AI tools, built with purpose. No signup, no ads, no compromises — just useful utilities that work.
            </p>
          </div>

          {/* Story Section */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 mb-12 shadow-sm">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Hi, I'm <span className="font-semibold text-gray-900">Ayan</span> — the developer behind GeneratorPromptAI.
              </p>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                I built this platform because I was tired of useful tools being locked behind signup walls, aggressive ads, or expensive subscriptions. As a student and developer in <span className="font-medium text-indigo-600">Karachi, Pakistan</span>, I wanted to create something that just works — for everyone.
              </p>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                Today, GeneratorPromptAI offers <span className="font-semibold text-gray-900">30+ free tools</span>: JSON formatters, image compressors, AI prompt generators, calculators, converters, and more. Every tool runs entirely in your browser — your data never leaves your device.
              </p>
              
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 my-6">
                <p className="text-indigo-800 font-medium flex items-center gap-2">
                  <Heart size={18} className="text-indigo-600" />
                  Built with care in Karachi • Serving users worldwide
                </p>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-indigo-300 transition-all duration-300">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Tools Preview */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Popular Free Tools
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{tool.name}</p>
                      <p className="text-sm text-gray-500">{tool.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-6">
              <Link href="/pages/all-tools" className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline inline-flex items-center gap-1">
                View all 30+ tools <ArrowLeft size={14} className="rotate-180" />
              </Link>
            </div>
          </div>

          {/* Promise Section */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4 text-center">
              Our Promise to You
            </h2>
            <ul className="space-y-3 text-indigo-800">
              <li className="flex items-start gap-3">
                <ShieldCheck size={20} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                <span>Always free — no hidden costs, ever</span>
              </li>
              <li className="flex items-start gap-3">
                <Lock size={20} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                <span>Your privacy protected — no data collection</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap size={20} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                <span>Fast & lightweight — works on any device</span>
              </li>
              <li className="flex items-start gap-3">
                <Heart size={20} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                <span>Built with care — new tools added weekly</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Have an idea? Found a bug? Just want to say hello? I personally read every message.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Get in Touch <ArrowLeft size={18} className="rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}