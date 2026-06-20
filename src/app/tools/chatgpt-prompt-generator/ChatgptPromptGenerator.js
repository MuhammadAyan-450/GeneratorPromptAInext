"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Copy,
  Star,
  Trash2,
  RefreshCw,
  Sparkles,
  Home,
  ChevronDown,
  Code,
  HelpCircle,
  ArrowRight,
  Zap,
  Shield,
  UserCheck,
  FileText,
} from "lucide-react";

import ResponsiveAd from "../../../components/ResponsiveAd";

const chatgptPrompts = [
  "Write a detailed blog post about {topic} aimed at beginners.",
  "Explain {topic} like I'm 5 years old.",
  "Create 10 viral Instagram captions about {topic}.",
  "Write a professional LinkedIn post about my experience with {topic}.",
  "Give me a step-by-step guide to mastering {topic} in 30 days.",
  "Write a funny skit/dialogue featuring {topic}.",
  "Act as an expert and give advanced tips on {topic}.",
  "Create a YouTube video script for a 10-minute video on {topic}.",
  "Write a persuasive sales email promoting a course on {topic}.",
  "Compare {topic} with similar concepts in simple terms.",
];

const ChatGptPromptGenerator = () => {
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState("detailed");
  const [tone, setTone] = useState("neutral");
  const [result, setResult] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [copied, setCopied] = useState(false);
  const [favCopied, setFavCopied] = useState(-1);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const generatePrompt = () => {
    setError("");
    if (!topic.trim()) {
      setError("Please enter a topic first.");
      return;
    }

    let base =
      chatgptPrompts[Math.floor(Math.random() * chatgptPrompts.length)];
    let prompt = base.replaceAll("{topic}", topic.trim());

    if (depth === "detailed")
      prompt +=
        " Provide a detailed, well-structured answer with clear explanations, bullet points where helpful, and logical flow.";
    if (depth === "comprehensive")
      prompt +=
        " Deliver a comprehensive, in-depth response: include step-by-step explanations, real-world examples, pros & cons, comparisons, and practical applications.";
    if (depth === "expert")
      prompt +=
        " Respond as a world-class expert with PhD-level depth: include advanced concepts, case studies, cutting-edge techniques, potential pitfalls, and actionable insights.";

    if (tone === "friendly")
      prompt +=
        " Use a warm, friendly, conversational tone like talking to a smart friend.";
    if (tone === "professional")
      prompt += " Use a polished, professional, business-like tone.";
    if (tone === "motivational")
      prompt +=
        " Use an uplifting, motivational tone to inspire and energize the reader.";
    if (tone === "academic")
      prompt +=
        " Use a formal, academic tone with precise language and proper structure.";
    if (tone === "humorous")
      prompt +=
        " Incorporate light, clever humor where it fits naturally without forcing it.";

    setResult(prompt);
    setCopied(false);
  };

  const copyPrompt = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyFavorite = (text, index) => {
    navigator.clipboard.writeText(text);
    setFavCopied(index);
    setTimeout(() => setFavCopied(-1), 2000);
  };

  const addToFavorites = () => {
    if (!result || favorites.includes(result)) return;
    setFavorites([result, ...favorites]);
  };

  const removeFavorite = (promptToRemove) => {
    setFavorites(favorites.filter((p) => p !== promptToRemove));
  };

  const clearAll = () => {
    setTopic("");
    setDepth("detailed");
    setTone("neutral");
    setResult("");
    setError("");
    setCopied(false);
  };

  const depthOptions = [
    { value: "detailed", label: "Detailed" },
    { value: "comprehensive", label: "Comprehensive" },
    { value: "expert", label: "Expert / Advanced" },
  ];

  const toneOptions = [
    { value: "neutral", label: "Neutral" },
    { value: "friendly", label: "Friendly" },
    { value: "professional", label: "Professional" },
    { value: "motivational", label: "Motivational" },
    { value: "academic", label: "Academic" },
    { value: "humorous", label: "Humorous" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Breadcrumb */}
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
                ChatGPT Prompt Generator
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <Sparkles className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            ChatGPT Prompt Generator
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Getting great responses from ChatGPT starts with knowing how to
            write better prompts. Instead of guessing, just enter your topic,
            pick a tone, and let this tool structure the perfect request for
            you.
          </p>
        </div>

        <ResponsiveAd />

        {/* Tool Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Enter Your Topic or Task
          </label>

          <div className="mb-4">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generatePrompt()}
              placeholder="e.g., Write a blog post about sustainable fashion"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800"
            />
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Depth
              </label>
              <select
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-800"
              >
                {depthOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-800"
              >
                {toneOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={generatePrompt}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} /> Generate
            </button>
            <button
              onClick={clearAll}
              className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Clear All
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-5 mb-6">
              <p className="text-xs font-semibold text-sky-500 uppercase tracking-wider mb-3">
                Generated Prompt
              </p>
              <p className="whitespace-pre-wrap text-gray-800 leading-relaxed text-sm">
                {result}
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={copyPrompt}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
                >
                  <Copy size={15} /> {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={addToFavorites}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-xl text-sm font-semibold transition-all"
                >
                  <Star size={15} fill="currentColor" /> Save
                </button>
              </div>
            </div>
          )}

          {/* Utility Actions */}
          <div className="flex flex-wrap justify-center gap-3 border-t border-gray-100 pt-6">
            <button
              onClick={copyPrompt}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
            >
              <Copy size={16} /> {copied ? "Copied!" : "Copy Prompt"}
            </button>
            <button
              onClick={addToFavorites}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold transition-all"
            >
              <Star size={16} /> Save to Favorites
            </button>
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-red-600 rounded-xl text-sm font-semibold transition-all"
            >
              <RefreshCw size={16} /> Clear
            </button>
          </div>
        </div>

          {/* Native ad here */}

          <script
            async="async"
            data-cfasync="false"
            src="https://pl29796844.effectivecpmnetwork.com/4c385cac6f0784aa3165d3a9e7478f20/invoke.js"
          ></script>
          <div id="container-4c385cac6f0784aa3165d3a9e7478f20"></div>


        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Create Better ChatGPT Prompts
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Enter your topic or task",
                desc: "It can be general or specific. Examples include 'Write a blog about sustainable fashion' and 'Discuss quantum computing'. The model adapts accordingly.",
              },
              {
                step: "2",
                title: "Select your level of depth",
                desc: "Detailed if you want a structured answer. Comprehensive for more examples and comparisons. Expert for deep, PhD-level analysis with case studies. It depends on your audience.",
              },
              {
                step: "3",
                title: "Choose the appropriate tone",
                desc: "Friendly when the tone should be informal. Professional for business-oriented content. Academic if it's a research paper. Humorous for social media platforms. Tone it to match your branding.",
              },
              {
                step: "4",
                title: "Paste your prompt to ChatGPT",
                desc: "Press Generate, copy your prompt, and then paste it into ChatGPT, Claude, or Gemini. Notice the difference from a poorly created prompt.",
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

        {/* ─── Formulas / How It Works ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How Prompt Engineering Actually Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            It's not magic — just structured instructions. Here's what happens
            when you click Generate.
          </p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Base Template Selection
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                const base = chatgptPrompts[randomIndex];
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Picks one of 10 proven prompt templates based on your use case —
                blog writing, coding, marketing, etc.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Topic Injection
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                prompt = base.replaceAll("{"{"}topic{"}"}", userTopic);
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Replaces the {"{"}topic{"}"} placeholder with your actual input.
                Safe string replacement — no code injection risks.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Depth Modifier
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                if (depth === "expert") prompt += " Respond as a world-class
                expert...";
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Appends specific instructions that tell the AI how deep to go.
                Expert mode adds case studies, pitfalls, and advanced
                techniques.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Tone Modifier
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                if (tone === "friendly") prompt += " Use a warm, conversational
                tone...";
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Adds voice guidance so the AI matches your brand voice —
                professional for B2B, humorous for social, academic for
                research.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">
                Full Formula
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl overflow-x-auto">
                base_template + topic_injection + depth_modifier + tone_modifier
              </div>
            </div>
          </div>
        </section>

        {/* ─── Real Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Prompt Examples — See What You'll Get
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            These are real outputs from the tool. Try them yourself above.
          </p>

          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                  Input
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs text-green-700 font-medium mb-1">
                  Topic:
                </p>
                <p className="font-mono text-sm text-gray-800">
                  sustainable fashion
                </p>
                <p className="text-xs text-green-600 font-mono break-all mt-2">
                  Depth: Comprehensive, Tone: Professional
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                  Output
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="font-mono text-sm text-gray-800 break-all">
                  Write a detailed blog post about sustainable fashion aimed at
                  beginners. Deliver a comprehensive, in-depth response: include
                  step-by-step explanations, real-world examples, pros & cons,
                  comparisons, and practical applications. Use a polished,
                  professional, business-like tone.
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                  Another Example
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs text-green-700 font-medium mb-1">
                  Topic:
                </p>
                <p className="font-mono text-sm text-gray-800">
                  Python list comprehensions
                </p>
                <p className="text-xs text-green-600 font-mono break-all mt-2">
                  Depth: Expert, Tone: Academic
                </p>
                <p className="text-xs text-green-600 font-mono break-all mt-3">
                  Output:
                </p>
                <p className="font-mono text-sm text-gray-800 break-all">
                  Act as an expert and give advanced tips on Python list
                  comprehensions. Respond as a world-class expert with PhD-level
                  depth: include advanced concepts, case studies, cutting-edge
                  techniques, potential pitfalls, and actionable insights. Use a
                  formal, academic tone with precise language and proper
                  structure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Actually Uses Prompt Generators?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Not just developers. Here's where structured prompts show up in real
            work.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Code size={20} className="text-sky-600" />,
                title: "Coding Help",
                desc: "Generate precise prompts for debugging, code reviews, or learning new frameworks. Get better answers from AI pair programmers.",
              },
              {
                icon: <FileText size={20} className="text-green-600" />,
                title: "Blog Writing",
                desc: "Structure prompts for outlines, drafts, or SEO optimization. Save hours of prompt tweaking with pre-built templates.",
              },
              {
                icon: <Zap size={20} className="text-violet-600" />,
                title: "Marketing Copy",
                desc: "Create prompts for ad copy, email sequences, or social media. Match tone to brand voice automatically.",
              },
              {
                icon: <HelpCircle size={20} className="text-amber-600" />,
                title: "Learning & Research",
                desc: "Ask complex questions with the right depth. Get expert-level explanations without writing PhD-level prompts yourself.",
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

        {/* ─── SEO Content ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Prompt Structure Matters for AI Responses
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            There's a reason some people get amazing results from ChatGPT while
            others get generic fluff. It's not the AI — it's the prompt.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Vague prompts get vague answers. "Tell me about marketing" gives you
            a Wikipedia summary. "Write a LinkedIn post about my experience with
            B2B SaaS marketing, professional tone, include 3 actionable tips"
            gives you publish-ready content.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            This tool removes the guesswork. You focus on your topic. It handles
            the prompt engineering — depth levels, tone modifiers, structural
            cues — so you get better responses without learning prompt syntax.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Depth Levels Explained
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            <strong>Detailed</strong> gives clear structure with bullet points
            and logical flow — perfect for beginners or quick answers.{" "}
            <strong>Comprehensive</strong> adds examples, pros/cons, and
            comparisons — ideal for blog posts or tutorials.{" "}
            <strong>Expert</strong> delivers PhD-level analysis with case
            studies and advanced techniques — use this for research or deep
            dives.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Tone Matching for Brand Voice
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Your brand has a voice. Your prompts should too. Friendly tone for
            casual content. Professional for B2B. Academic for research papers.
            Humorous for social media. This tool lets you set it once and reuse
            it everywhere.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Privacy Note
          </h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser. Your topics and prompts never
            leave your device — no server upload, no logging, no tracking. Close
            the tab and it's gone. That's how it should be.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need prompts for Claude instead? Try the{" "}
            <Link
              href="/tools/claude-prompt-generator"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              Claude Prompt Generator
            </Link>
            . Working on video scripts? The{" "}
            <Link
              href="/tools/youtube-script-prompt-generator"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              YouTube Script Prompt Builder
            </Link>{" "}
            has your back.
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
                q: "How do I write better prompts for ChatGPT?",
                a: "Be specific about your goal, provide context, and specify the output format. Use this tool to automatically add depth (Detailed, Comprehensive, Expert) and tone (Professional, Academic, Friendly) to your basic topic.",
              },
              {
                q: "Can I generate prompts for blog writing with a specific tone?",
                a: "Yes. Enter your blog topic, select 'Detailed' or 'Comprehensive' depth, and choose a tone like 'Professional' or 'Friendly'. The tool generates a structured prompt tailored for blog writing.",
              },
              {
                q: "Does this work with GPT-4 and GPT-4o?",
                a: "Yes. The prompts are optimized for all OpenAI models including GPT-3.5, GPT-4, and GPT-4o. They also work well with Claude, Gemini, and other LLMs.",
              },
              {
                q: "What's the difference between Detailed, Comprehensive, and Expert depth?",
                a: "Detailed gives a clear, structured answer. Comprehensive adds examples, pros/cons, and comparisons. Expert provides PhD-level analysis with case studies and advanced techniques.",
              },
              {
                q: "Can I save and copy the generated prompts?",
                a: "Yes. Copy any prompt to your clipboard with one click, or save it to your favorites list within the tool for quick access later. Favorites are stored locally in your browser.",
              },
              {
                q: "Is my topic or prompt data stored anywhere?",
                a: "No. Everything happens locally in your browser. Nothing gets uploaded to a server, nothing gets stored in a database. Close the tab and your data is gone.",
              },
              {
                q: "Can I use this for non-English topics?",
                a: "Yes. Enter your topic in any language. The tool injects it into the prompt template. Note: ChatGPT's response quality depends on the model's language support, not this tool.",
              },
              {
                q: "What if I don't like the generated prompt?",
                a: "No problem. Click Regenerate to get a different template, or manually edit the prompt before copying. The tool is a starting point — you're always in control.",
              },
            ].map((item, i) => (
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

        {/* ─── Related Tools (Short Descriptions) ─── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related AI Prompt Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/claude-prompt-generator",
                title: "Claude Prompt Generator",
                desc: "Optimized prompts for Anthropic's Claude AI.",
              },
              {
                href: "/tools/midjourney-prompt-generator",
                title: "Midjourney Prompt Builder",
                desc: "Craft detailed image prompts with styles.",
              },
              {
                href: "/tools/youtube-script-prompt-generator",
                title: "YouTube Script Prompt Builder",
                desc: "Generate video script prompts and outlines.",
              },
              {
                href: "/tools/ai-text-humanizer",
                title: "AI Text Humanizer",
                desc: "Convert AI text to sound more human-written.",
              },
              {
                href: "/tools/ai-content-detector",
                title: "AI Content Detector",
                desc: "Check if text was written by AI or human.",
              },
              {
                href: "/tools/word-counter",
                title: "Word Counter",
                desc: "Count words, characters, and reading time.",
              },
            ].map((tool) => (
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

export default ChatGptPromptGenerator;
