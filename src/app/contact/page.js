import Link from "next/link";
import {
  ArrowLeft, Mail, MessageSquare, Sparkles,
  Clock, Shield, Heart, Bug, Lightbulb, Send
} from "lucide-react";

export const metadata = {
  title: "Contact Us – Support & Feedback | GeneratorPromptAI",
  description: "Get in touch with GeneratorPromptAI. Report bugs, request tools, or say hello. I personally read every message and reply within 24 hours.",
  alternates: { canonical: "https://www.generatorpromptai.com/contact" },
  openGraph: {
    title: "Contact Us – Support & Feedback | GeneratorPromptAI",
    description: "Get in touch with GeneratorPromptAI. Report bugs, request tools, or say hello. I personally read every message and reply within 24 hours.",
    url: "https://www.generatorpromptai.com/contact",
    siteName: "GeneratorPromptAI",
    type: "website",
    images: [{ url: "https://www.generatorpromptai.com/og/contact.png", width: 1200, height: 630, alt: "Contact GeneratorPromptAI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us – Support & Feedback | GeneratorPromptAI",
    description: "Get in touch with GeneratorPromptAI. I personally read every message and reply within 24 hours.",
    images: ["https://www.generatorpromptai.com/og/contact.png"],
  },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  keywords: "contact generatorpromptai, support email, report bug, request new tool, feedback, ai tools support",
}

const schemaContactPage = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Us – GeneratorPromptAI",
  "url": "https://www.generatorpromptai.com/contact",
  "description": "Get in touch with GeneratorPromptAI for support, bug reports, tool requests, or general inquiries.",
  "mainEntity": {
    "@type": "Organization",
    "name": "GeneratorPromptAI",
    "url": "https://www.generatorpromptai.com",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "generatorpromptai@gmail.com",
      "contactType": "customer service",
      "areaServed": "Worldwide",
      "availableLanguage": ["English", "Urdu"],
    }
  }
}

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "Contact Us", "item": "https://www.generatorpromptai.com/contact" }
  ]
}

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How quickly do you respond to emails?",
      "acceptedAnswer": { "@type": "Answer", "text": "Usually within 24 hours. If you're reporting a bug that's breaking a tool completely, I try to get back within a few hours." }
    },
    {
      "@type": "Question",
      "name": "Can I request a new tool?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — and I actually build the most requested ones. Email a short description of what the tool should do and I'll add it to the list." }
    },
    {
      "@type": "Question",
      "name": "Is my contact information kept private?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Your email is only used to reply to you. Nothing gets shared, sold, or stored beyond what's needed to answer your message." }
    },
    {
      "@type": "Question",
      "name": "Do you offer technical support for AI models like ChatGPT?",
      "acceptedAnswer": { "@type": "Answer", "text": "I can help with anything on this site. For issues with ChatGPT, Claude, or Midjourney directly, you'd need to contact their own support teams." }
    }
  ]
}

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaContactPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute top-1/2 -left-32 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: "1.5s" }} />
          <div className="absolute -bottom-32 right-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "3s" }} />
        </div>

        {/* Back link */}
        <div className="relative max-w-5xl mx-auto w-full px-4 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors text-sm font-medium group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 pb-24">

          {/* ── HERO ── */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 shadow-lg shadow-indigo-200">
              <Mail className="text-white" size={30} />
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
              Say Hello to{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                GeneratorPromptAI
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed mb-6">
              Found a bug? Have a tool idea? Or just want to say thanks?
              I personally read every single message that comes in.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-200">
                <Clock size={12} /> Replies within 24 hours
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-200">
                <Shield size={12} /> Your info stays private
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold border border-purple-200">
                <Heart size={12} /> Every message gets read
              </span>
            </div>
          </div>

          {/* ── MAIN CONTACT CARD ── */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm mb-8">

            {/* Top gradient bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            <div className="p-8 md:p-10">

              {/* Personal note */}
              <div className="flex items-start gap-4 mb-8 pb-8 border-b border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-200">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Ayan — Founder, GeneratorPromptAI</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    I built this site alone and I handle all messages personally. No support ticket system,
                    no chatbot, no automated replies. Just me reading your email and actually responding.
                    If something is broken or you need a tool that doesn't exist yet — just send a message.
                  </p>
                </div>
              </div>

              {/* Email CTA */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-6 mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                      <Mail size={18} className="text-indigo-600" />
                      Send an Email
                    </p>
                    <p className="text-sm text-gray-600">
                      Best way to reach me. I check this multiple times a day.
                    </p>
                    <p className="text-indigo-600 font-semibold mt-1 text-sm">
                      generatorpromptai@gmail.com
                    </p>
                  </div>
                  <a
                    href="mailto:generatorpromptai@gmail.com"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-indigo-200 hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap text-sm"
                  >
                    <Send size={15} />
                    Send Email
                  </a>
                </div>
              </div>

              {/* Response time note */}
              <p className="text-xs text-gray-400 text-center">
                I typically reply within 24 hours on weekdays. Weekends might take a bit longer — but I'll get back to you.
              </p>
            </div>
          </div>

          {/* ── WHAT TO CONTACT ABOUT ── */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 mb-8 shadow-sm">

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              What Can I Help You With?
            </h2>
            <p className="text-gray-500 text-sm mb-7">
              Here are the most common reasons people reach out — and what to include in your message.
            </p>

            <div className="grid md:grid-cols-3 gap-5">

              {/* Bug Report */}
              <div className="group bg-red-50 border border-red-100 rounded-2xl p-5 hover:border-red-300 hover:shadow-md transition-all duration-300">
                <div className="w-11 h-11 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Bug size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Report a Bug</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Something not working right? Tell me which tool, what you expected to happen, and what actually happened.
                </p>
                <p className="text-xs text-red-600 font-medium">Include: tool name + browser + steps</p>
              </div>

              {/* Tool Request */}
              <div className="group bg-purple-50 border border-purple-100 rounded-2xl p-5 hover:border-purple-300 hover:shadow-md transition-all duration-300">
                <div className="w-11 h-11 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Lightbulb size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Request a Tool</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Have an idea for something that should exist here? I build the most requested tools first.
                </p>
                <p className="text-xs text-purple-600 font-medium">Include: what it does + who needs it</p>
              </div>

              {/* General */}
              <div className="group bg-green-50 border border-green-100 rounded-2xl p-5 hover:border-green-300 hover:shadow-md transition-all duration-300">
                <div className="w-11 h-11 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Anything Else</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Questions about privacy, partnerships, feedback, or just want to say hi — all welcome.
                </p>
                <p className="text-xs text-green-600 font-medium">No topic too small</p>
              </div>

            </div>
          </div>

          {/* ── QUICK TIPS ── */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-7 mb-8">
            <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2 text-base">
              <Sparkles size={17} className="text-indigo-600" />
              Get a Faster Reply — Quick Tips
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { tip: "Mention the tool name in your subject line", detail: "Makes it much easier to find and fix quickly" },
                { tip: "Describe what you expected vs what happened", detail: "For bug reports — saves a lot of back and forth" },
                { tip: "Check the blog first", detail: "A lot of common questions are already answered there" },
                { tip: "One topic per email", detail: "Easier to track and respond to each thing properly" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 bg-indigo-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-indigo-700 text-xs font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-indigo-900">{item.tip}</p>
                    <p className="text-xs text-indigo-600 mt-0.5">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── FAQ ── */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 mb-10 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-7 text-center">
              Quick Answers
            </h2>
            <div className="space-y-5">
              {[
                {
                  q: "How fast do you actually reply?",
                  a: "Usually within 24 hours on weekdays. If you're reporting something that's completely broken, I try to get back same day. Weekends are slower but I still check."
                },
                {
                  q: "Do you actually build tool requests?",
                  a: "Yes — the most requested tools genuinely get built. I keep a list and when the same idea comes up multiple times, it moves to the top. So if you have an idea, send it."
                },
                {
                  q: "Will you share my email with anyone?",
                  a: "No. Your email is used to reply to you and nothing else. It doesn't go into a newsletter, it doesn't get shared, and it's not stored beyond what's needed to answer your message."
                },
                {
                  q: "I found a tool that's not working at all — what should I include?",
                  a: "Tool name, what you were trying to do, what happened instead, and your browser and device. That information usually lets me reproduce and fix it without needing to go back and forth."
                },
              ].map((item, i) => (
                <div key={i} className="pb-5 border-b border-gray-100 last:border-0 last:pb-0">
                  <h3 className="font-semibold text-gray-900 mb-1.5 text-base">{item.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── LOCATION NOTE ── */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-800 mb-1">
                  📍 Karachi, Pakistan — Serving users worldwide
                </p>
                <p className="text-sm text-gray-500">
                  GeneratorPromptAI is a solo project. One person building and maintaining everything.
                  Your patience and feedback genuinely helps make it better.
                </p>
              </div>
              <div className="flex-shrink-0 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-center">
                <p className="text-2xl font-bold text-indigo-600">50+</p>
                <p className="text-xs text-gray-500">countries served</p>
              </div>
            </div>
          </div>

          {/* ── RELATED TOOLS ── */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5 text-center">
              While you're here — try something free
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { href: "/tools/percentage-calculator", title: "Percentage Calculator", desc: "Calculate discounts, tax, and percentage changes instantly." },
                { href: "/tools/time-zone-converter", title: "Time Zone Converter", desc: "Convert time between countries — useful for remote work and meetings." },
                { href: "/tools/ad-revenue-calculator", title: "Ad Revenue Calculator", desc: "Estimate how much your site could earn from display ads." },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-indigo-400 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-indigo-600 transition-colors text-sm">
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
  );
}