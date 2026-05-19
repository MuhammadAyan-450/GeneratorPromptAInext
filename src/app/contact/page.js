import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Sparkles, Clock, Shield, Heart, Link as LinkIcon, ExternalLink, Globe, Send } from "lucide-react";

// ✅ Perfect SEO Metadata (Title: 56 chars, Description: 159 chars)
export const metadata = {
  title: "Contact Us – Support & Feedback | GeneratorPromptAI",
  
  description: "Get in touch with GeneratorPromptAI. Report bugs, request tools, or say hello. We reply within 24 hours. Free AI tools, no signup required.",
  
  alternates: { canonical: "https://www.generatorpromptai.com/contact" },
  
  openGraph: {
    title: "Contact Us – Support & Feedback | GeneratorPromptAI",
    description: "Get in touch with GeneratorPromptAI. Report bugs, request tools, or say hello. We reply within 24 hours.",
    url: "https://www.generatorpromptai.com/contact",
    siteName: "GeneratorPromptAI",
    type: "website",
    images: [
      {
        url: "https://www.generatorpromptai.com/og/contact.png",
        width: 1200,
        height: 630,
        alt: "Contact GeneratorPromptAI – Support & Feedback",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Contact Us – Support & Feedback | GeneratorPromptAI",
    description: "Get in touch with GeneratorPromptAI. Report bugs, request tools, or say hello. We reply within 24 hours.",
    images: ["https://www.generatorpromptai.com/og/contact.png"],
  },
  
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  
  keywords: "contact generatorpromptai, support email, report bug, request new tool, feedback form, ai tools support, free calculator help",
}

// ─── JSON-LD: ContactPage Schema ────────────────────────────────────────────
const schemaContactPage = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Us – GeneratorPromptAI Support",
  "url": "https://www.generatorpromptai.com/contact",
  "description": "Get in touch with GeneratorPromptAI for support, bug reports, tool requests, or general inquiries. We reply within 24 hours.",
  "mainEntity": {
    "@type": "Organization",
    "name": "GeneratorPromptAI",
    "url": "https://www.generatorpromptai.com",
    "logo": "https://www.generatorpromptai.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "generatorpromptai@gmail.com",
      "contactType": "customer service",
      "areaServed": "Worldwide",
      "availableLanguage": ["English", "Urdu"],
      "contactOption": "TollFree",
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    }
  }
}

// ─── JSON-LD: BreadcrumbList Schema ─────────────────────────────────────────
const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.generatorpromptai.com/" },
    { "@type": "ListItem", "position": 2, "name": "Contact Us", "item": "https://www.generatorpromptai.com/contact" }
  ]
}

// ─── JSON-LD: FAQPage Schema ────────────────────────────────────────────────
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How quickly do you respond to emails?",
      "acceptedAnswer": { "@type": "Answer", "text": "We typically reply within 24 hours on weekdays. For urgent bug reports, we aim to respond within 4-6 hours." }
    },
    {
      "@type": "Question",
      "name": "Can I request a new tool?",
      "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! Email us your idea with a brief description of what the tool should do. We review all suggestions and build the most requested ones." }
    },
    {
      "@type": "Question",
      "name": "Do you offer technical support for AI models?",
      "acceptedAnswer": { "@type": "Answer", "text": "We provide support for the tools on our website. For issues with third-party AI models (ChatGPT, Claude, Midjourney), please contact their official support channels." }
    },
    {
      "@type": "Question",
      "name": "Is my contact information kept private?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. We never share, sell, or store your email or message content. All communications are used solely to assist you and improve our tools." }
    }
  ]
}

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      value: "generatorpromptai@gmail.com",
      href: "mailto:generatorpromptai@gmail.com",
      desc: "Best for bug reports, tool requests, and detailed questions",
      badge: "Replies within 24h",
      color: "sky"
    },
  ]

  const helpCategories = [
    {
      icon: MessageSquare,
      title: "Report a Bug",
      desc: "Found an issue with a tool? Let us know the tool name, steps to reproduce, and expected vs actual behavior.",
      color: "sky",
      action: "Email us with details"
    },
    {
      icon: Sparkles,
      title: "Request a Tool",
      desc: "Have an idea for a new calculator or generator? Describe what problem it solves and who would use it.",
      color: "purple",
      action: "Share your idea"
    },
    {
      icon: Heart,
      title: "General Inquiry",
      desc: "Questions about privacy, partnerships, or just want to say thanks? We'd love to hear from you.",
      color: "pink",
      action: "Send a message"
    }
  ]

  return (
    <>
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaContactPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        {/* Nav Back */}
        <div className="relative max-w-7xl mx-auto w-full px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors text-sm font-medium group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 pb-20">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 mb-6 shadow-sm">
              <Mail className="text-indigo-600" size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Contact{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                GeneratorPromptAI
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Got questions? Found a bug? Have a tool idea? Just want to say thanks? 
              <span className="font-medium text-gray-900"> I read every message personally.</span>
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
                <Clock size={14} /> Typically replies within 24h
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium border border-indigo-200">
                <Shield size={14} /> Your privacy is protected
              </div>
            </div>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid md:grid gap-4 mb-12">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              const colorClasses = {
                sky: "bg-sky-100 text-sky-600 border-sky-200 hover:border-sky-300",
                purple: "bg-purple-100 text-purple-600 border-purple-200 hover:border-purple-300",
                pink: "bg-pink-100 text-pink-600 border-pink-200 hover:border-pink-300",
                gray: "bg-gray-100 text-gray-600 border-gray-200 hover:border-gray-300",
              };
              
              return (
                <a
                  key={index}
                  href={method.href}
                  target={method.external ? "_blank" : undefined}
                  rel={method.external ? "noopener noreferrer" : undefined}
                  className={`group relative bg-white border ${colorClasses[method.color]} rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                >
                  {method.external && (
                    <ExternalLink size={14} className="absolute top-4 right-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  )}
                  
                  <div className={`w-12 h-12 ${colorClasses[method.color].split(' ')[0]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    {method.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3">{method.desc}</p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-900 break-all">{method.value}</p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colorClasses[method.color]}`}>
                      {method.badge}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* How We Can Help */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 mb-12 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              How can we help you today?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {helpCategories.map((category, index) => {
                const Icon = category.icon;
                const colorClasses = {
                  sky: "bg-sky-50 text-sky-600",
                  purple: "bg-purple-50 text-purple-600",
                  pink: "bg-pink-50 text-pink-600",
                };
                
                return (
                  <div key={index} className="text-center p-5 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-200">
                    <div className={`w-14 h-14 ${colorClasses[category.color]} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{category.desc}</p>
                    <span className="text-xs font-medium text-indigo-600 hover:underline cursor-pointer">
                      {category.action} →
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Location & Note */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <p className="text-gray-600 font-medium">
                    📍 Based in Karachi, Pakistan • Serving users worldwide
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    GeneratorPromptAI is a passion project dedicated to providing free, accessible AI tools and utilities.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-lg">
                  <Shield size={14} />
                  <span>No data stored • 100% private</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-6 mb-12">
            <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-indigo-600" />
              Pro Tips for Faster Help
            </h3>
            <ul className="space-y-2 text-sm text-indigo-800">
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-0.5">•</span>
                <span>Include the <strong>tool name</strong> and <strong>browser/device</strong> when reporting bugs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-0.5">•</span>
                <span>For tool requests, describe the <strong>problem it solves</strong> and <strong>who would use it</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-0.5">•</span>
                <span>Check our <Link href="/blog" className="text-indigo-600 hover:underline">Blog</Link> first — your question might already be answered!</span>
              </li>
            </ul>
          </div>

          {/* Related Tools */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              While you're here, try these free tools
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { href: "/tools/percentage-calculator", title: "Percentage Calculator", desc: "Calculate percentages, increases, decreases and more." },
                { href: "/tools/time-zone-converter", title: "Time Zone Converter", desc: "Convert time between cities and global time zones instantly." },
                { href: "/tools/ad-revenue-calculator", title: "Ad Revenue Calculator", desc: "Estimate ad income from display, native, video, and other formats." },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-indigo-400 hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-indigo-600 transition-colors">
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
    </>
  );
}