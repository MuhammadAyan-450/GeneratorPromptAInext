"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Copy,
  RefreshCw,
  Star,
  Trash2,
  Sparkles,
  ExternalLink,
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

const claudePrompts = [
  "Act as an expert and explain {topic} in extreme detail with step-by-step reasoning.",
  "Write a comprehensive guide on {topic} including examples, common mistakes, and advanced techniques.",
  "Create a detailed blog post about {topic} with headings, subheadings, and practical tips.",
  "Compare {topic} with similar concepts and explain differences clearly.",
  "Provide a motivational speech/script about mastering {topic}.",
  "Write a humorous take on the challenges of learning {topic}.",
  "Break down {topic} into beginner, intermediate, and expert levels.",
  "Create 10 viral social media captions about {topic}.",
  "Act as a tutor and teach me {topic} like I'm a complete beginner.",
];

const USE_CASES = [
  { value: "general", label: "🧠 General", hint: "Any topic or task" },
  { value: "coding", label: "💻 Coding", hint: "Debug, write, explain code" },
  { value: "writing", label: "✍️ Writing", hint: "Blog, email, copy, scripts" },
  {
    value: "analysis",
    label: "📊 Analysis",
    hint: "Research, summarize, evaluate",
  },
  {
    value: "creative",
    label: "🎨 Creative",
    hint: "Ideas, stories, brainstorming",
  },
  {
    value: "business",
    label: "💼 Business",
    hint: "Strategy, reports, proposals",
  },
];

const DEPTH_OPTIONS = [
  { value: "detailed", label: "Detailed", desc: "Clear & well-structured" },
  {
    value: "comprehensive",
    label: "Comprehensive",
    desc: "In-depth with examples",
  },
  { value: "expert", label: "Expert", desc: "PhD-level advanced insights" },
];

const TONE_OPTIONS = [
  { value: "neutral", label: "Neutral" },
  { value: "friendly", label: "Friendly" },
  { value: "professional", label: "Professional" },
  { value: "academic", label: "Academic" },
];

const FORMAT_OPTIONS = [
  { value: "default", label: "Default", desc: "Let Claude decide" },
  { value: "bullets", label: "Bullet Points", desc: "Quick scannable lists" },
  { value: "steps", label: "Step-by-Step", desc: "Numbered instructions" },
  { value: "table", label: "Table", desc: "Structured comparison" },
  { value: "xml", label: "XML Tags", desc: "Claude's native format" },
  { value: "markdown", label: "Markdown", desc: "Headers & formatting" },
];

const ClaudePromptGenerator = () => {
  const [topic, setTopic] = useState("");
  const [useCase, setUseCase] = useState("general");
  const [depth, setDepth] = useState("detailed");
  const [tone, setTone] = useState("neutral");
  const [format, setFormat] = useState("default");
  const [result, setResult] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [copied, setCopied] = useState(false);
  const [favCopied, setFavCopied] = useState(-1);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const generatePrompt = () => {
    setError("");
    if (!topic.trim()) {
      setError("Please enter a topic or task first.");
      return;
    }

    let base = claudePrompts[Math.floor(Math.random() * claudePrompts.length)];
    let prompt = base.replaceAll("{topic}", topic.trim());

    const useCaseMap = {
      coding:
        " You are an expert software engineer. Focus on clean, efficient, well-commented code with error handling and best practices.",
      writing:
        " You are a skilled writer and editor. Focus on clarity, engagement, strong structure, and compelling language.",
      analysis:
        " You are a rigorous analyst. Focus on evidence-based reasoning, key insights, data interpretation, and clear conclusions.",
      creative:
        " You are a creative director with a bold imagination. Focus on original ideas, unexpected angles, and creative depth.",
      business:
        " You are a senior business consultant. Focus on strategic thinking, ROI, actionable recommendations, and professional framing.",
    };
    if (useCaseMap[useCase]) prompt += useCaseMap[useCase];

    const depthMap = {
      detailed:
        " Provide a clear, well-structured, detailed response. Use headings and bullet points where helpful. Be thorough but concise.",
      comprehensive:
        " Deliver a comprehensive, in-depth answer with step-by-step reasoning, real-world examples, pros/cons, edge cases, and practical applications.",
      expert:
        " Act as a world-class domain expert. Provide advanced, nuanced insights including relevant frameworks, case studies, potential pitfalls, and actionable strategies. Use precise, professional language.",
    };
    prompt += depthMap[depth] || "";

    const toneMap = {
      friendly:
        " Use a warm, friendly, conversational tone — like explaining to a trusted colleague.",
      professional:
        " Use a polished, professional, confident tone suitable for business or technical contexts.",
      academic:
        " Use a formal, academic tone with precise terminology and logical structure.",
      neutral: " Maintain an objective, neutral, and factual tone throughout.",
    };
    prompt += toneMap[tone] || "";

    const formatMap = {
      bullets:
        " Format your entire response using bullet points and concise sub-bullets for clarity.",
      steps:
        " Format your response as clearly numbered steps. Start each step on a new line.",
      table:
        " Where possible, present information in a well-structured markdown table with clear column headers.",
      xml: " Structure your response using Claude's native XML tags. Use <thinking> for your reasoning process and <output> for the final answer.",
      markdown:
        " Format your response using rich markdown: use ## headings, **bold** for key terms, bullet lists, and code blocks where relevant.",
    };
    if (formatMap[format]) prompt += " " + formatMap[format];

    setResult(prompt);
    setCopied(false);
  };

  const copyPrompt = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openInClaude = () => {
    if (!result) return;
    const url = `https://claude.ai/new?q=${encodeURIComponent(result)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const addToFavorites = () => {
    if (!result || favorites.some((f) => f.text === result)) return;
    setFavorites([
      { text: result, useCase, tone, depth, format, topic },
      ...favorites,
    ]);
  };

  const removeFavorite = (index) => {
    setFavorites(favorites.filter((_, i) => i !== index));
  };

  const copyFavorite = (text, index) => {
    navigator.clipboard.writeText(text);
    setFavCopied(index);
    setTimeout(() => setFavCopied(-1), 2000);
  };

  const clearAll = () => {
    setTopic("");
    setUseCase("general");
    setDepth("detailed");
    setTone("neutral");
    setFormat("default");
    setResult("");
    setError("");
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 hover:text-orange-500 transition-colors"
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
                className="hover:text-orange-500 transition-colors"
              >
                All Tools
              </Link>
            </li>
            <li>
              <span className="text-gray-300">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-semibold">
                Claude Prompt Generator
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-100 mb-4">
            <Sparkles className="text-orange-500" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Claude Prompt Generator
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Claude AI responds differently than other models. It thrives on
            structured instructions and explicit roles. Instead of guessing,
            just enter your topic, pick a use case, and let this tool structure
            the perfect request for you.
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
              placeholder="e.g., Analyze this business strategy, Write a Python script..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800"
            />
          </div>

          {/* Use Case Grid */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Use Case
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {USE_CASES.map((uc) => (
                <button
                  key={uc.value}
                  onClick={() => setUseCase(uc.value)}
                  className={`flex flex-col items-start px-4 py-3 rounded-xl border text-left transition-all ${useCase === uc.value ? "border-orange-400 bg-orange-50 text-orange-700" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}
                >
                  <span className="text-sm font-medium">{uc.label}</span>
                  <span className="text-xs text-gray-400 mt-0.5">
                    {uc.hint}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Depth + Tone Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Depth
              </label>
              <select
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800"
              >
                {DEPTH_OPTIONS.map((o) => (
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
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800"
              >
                {TONE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Format Grid */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Output Format
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {FORMAT_OPTIONS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFormat(f.value)}
                  className={`flex flex-col items-start px-4 py-3 rounded-xl border text-left transition-all ${format === f.value ? "border-orange-400 bg-orange-50 text-orange-700" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}
                >
                  <span className="text-sm font-medium">{f.label}</span>
                  <span className="text-xs text-gray-400 mt-0.5">{f.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={generatePrompt}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles size={18} /> Generate
            </button>
            <button
              onClick={clearAll}
              className="bg-white border-2 border-orange-100 text-orange-700 hover:bg-orange-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
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
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 mb-6">
              <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-3">
                Generated Prompt
              </p>
              <p className="whitespace-pre-wrap text-gray-800 leading-relaxed text-sm">
                {result}
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={copyPrompt}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
                >
                  <Copy size={15} /> {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={openInClaude}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-sm font-semibold transition-all"
                >
                  <ExternalLink size={15} /> Open in Claude
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
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
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
            How to Generate Better Claude Prompts
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Enter your topic or task",
                desc: "Be as specific or broad as you need. 'Analyze this business strategy' works. So does 'Explain quantum computing'. The tool adapts.",
              },
              {
                step: "2",
                title: "Pick your use case",
                desc: "Coding for software help. Writing for blog posts. Analysis for research. Creative for brainstorming. Match the role to your goal.",
              },
              {
                step: "3",
                title: "Set depth, tone & format",
                desc: "Detailed for structure. Expert for PhD-level insights. XML tags for Claude's native format. Match voice and structure to your needs.",
              },
              {
                step: "4",
                title: "Copy and paste into Claude",
                desc: "Hit Generate, copy the prompt, paste it into Claude.ai. Watch how much better the response is compared to a vague request.",
              },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="w-8 h-8 bg-orange-100 text-orange-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
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
            How Claude Prompt Engineering Actually Works
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
                const base = claudePrompts[randomIndex];
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Picks one of 9 proven prompt templates based on your use case —
                coding, writing, analysis, etc.
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
                Use Case Role Assignment
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                if (useCase === "coding") prompt += " You are an expert software
                engineer...";
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Assigns a specific expert role to Claude — software engineer,
                writer, analyst — so it responds with the right expertise.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                XML Tags for Native Format
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                if (format === "xml") prompt += " Use {"<"}thinking{">"} for
                reasoning and {"<"}output{">"} for answer.";
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Adds Claude's native XML tags to separate reasoning from final
                answer — dramatically improves accuracy on complex tasks.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
              <h3 className="font-bold text-orange-900 text-sm mb-2">
                Full Formula
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl overflow-x-auto">
                base_template + topic + use_case_role + depth + tone + format
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
                <span className="text-sm bg-orange-100 text-orange-700 font-bold px-2.5 py-1 rounded-lg">
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
                  Use Case: Writing, Depth: Comprehensive, Tone: Professional,
                  Format: Markdown
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-orange-100 text-orange-700 font-bold px-2.5 py-1 rounded-lg">
                  Output
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="font-mono text-sm text-gray-800 break-all">
                  Create a detailed blog post about sustainable fashion with
                  headings, subheadings, and practical tips. You are a skilled
                  writer and editor. Focus on clarity, engagement, strong
                  structure, and compelling language. Deliver a comprehensive,
                  in-depth answer with step-by-step reasoning, real-world
                  examples, pros/cons, edge cases, and practical applications.
                  Use a polished, professional, confident tone suitable for
                  business or technical contexts. Format your response using
                  rich markdown: use ## headings, **bold** for key terms, bullet
                  lists, and code blocks where relevant.
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-orange-100 text-orange-700 font-bold px-2.5 py-1 rounded-lg">
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
                  Use Case: Coding, Depth: Expert, Tone: Academic, Format: XML
                </p>
                <p className="text-xs text-green-600 font-mono break-all mt-3">
                  Output:
                </p>
                <p className="font-mono text-sm text-gray-800 break-all">
                  Act as an expert and explain Python list comprehensions in
                  extreme detail with step-by-step reasoning. You are an expert
                  software engineer. Focus on clean, efficient, well-commented
                  code with error handling and best practices. Act as a
                  world-class domain expert. Provide advanced, nuanced insights
                  including relevant frameworks, case studies, potential
                  pitfalls, and actionable strategies. Use precise, professional
                  language. Structure your response using Claude's native XML
                  tags. Use {"<"}thinking{">"} for your reasoning process and{" "}
                  {"<"}output{">"} for the final answer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Actually Uses Claude Prompt Generators?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Not just developers. Here's where structured prompts show up in real
            work.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Code size={20} className="text-orange-500" />,
                title: "Coding Help",
                desc: "Generate precise prompts for debugging, code reviews, or learning new frameworks. Get better answers from Claude as your pair programmer.",
              },
              {
                icon: <FileText size={20} className="text-green-600" />,
                title: "Blog Writing",
                desc: "Structure prompts for outlines, drafts, or SEO optimization. Save hours of prompt tweaking with pre-built templates.",
              },
              {
                icon: <Zap size={20} className="text-violet-600" />,
                title: "Business Analysis",
                desc: "Create prompts for strategy docs, reports, or proposals. Match tone to professional standards automatically.",
              },
              {
                icon: <HelpCircle size={20} className="text-amber-600" />,
                title: "Learning & Research",
                desc: "Ask complex questions with the right depth. Get expert-level explanations without writing PhD-level prompts yourself.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl p-5 hover:border-orange-200 transition-colors"
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
            Why Prompt Structure Matters for Claude Responses
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            There's a reason some people get amazing results from Claude while
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
            the prompt engineering — use cases, depth levels, tone modifiers,
            XML tags — so you get better responses without learning prompt
            syntax.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            XML Tags: Claude's Secret Weapon
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Claude responds best when you separate its thinking from its output.
            Using {"<"}thinking{">"} for reasoning and {"<"}output{">"} for the
            final answer dramatically improves accuracy on complex tasks. This
            tool adds these tags automatically when you select the XML format.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Use Case Roles for Expert Responses
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Your prompt needs a role. "You are an expert software engineer" gets
            better code than "Write some code". "You are a senior business
            consultant" gets better strategy than "Give me business advice".
            This tool assigns the right role automatically.
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
            Need prompts for ChatGPT instead? Try the{" "}
            <Link
              href="/tools/chatgpt-prompt-generator"
              className="text-orange-500 underline underline-offset-2 hover:text-orange-600"
            >
              ChatGPT Prompt Generator
            </Link>
            . Working on video scripts? The{" "}
            <Link
              href="/tools/youtube-script-prompt-generator"
              className="text-orange-500 underline underline-offset-2 hover:text-orange-600"
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
                q: "How do I write better prompts for Claude 3.5 Sonnet?",
                a: "Be specific about your goal, provide context, assign a role, and specify the output format. Use this tool to automatically add use case roles, depth levels, tone modifiers, and XML tags to your basic topic.",
              },
              {
                q: "What are XML tags in Claude prompts?",
                a: "XML tags like <thinking> and <output> are Claude's native way of organizing information. Prompting Claude to use <thinking> for its reasoning process and <output> for the final answer dramatically improves accuracy on complex tasks.",
              },
              {
                q: "Can I generate prompts for coding and data analysis?",
                a: "Yes. Select the 'Coding' or 'Analysis' use case in our tool. It will automatically assign an expert software engineer or rigorous analyst role to the prompt to get the best results from Claude.",
              },
              {
                q: "Is this Claude prompt format builder free?",
                a: "Yes, 100% free. No signup, no account, no limits. Generate unlimited custom Claude prompts with specific tones, depths, and formats.",
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
                a: "Yes. Enter your topic in any language. The tool injects it into the prompt template. Note: Claude's response quality depends on the model's language support, not this tool.",
              },
              {
                q: "What if I don't like the generated prompt?",
                a: "No problem. Click Regenerate to get a different template, or manually edit the prompt before copying. The tool is a starting point — you're always in control.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-orange-200 transition-colors duration-300"
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
                    className={`text-orange-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
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
                href: "/tools/chatgpt-prompt-generator",
                title: "ChatGPT Prompt Generator",
                desc: "Optimized prompts for OpenAI's GPT-4 models.",
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
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-orange-400 transition-all"
              >
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-orange-500 transition-colors">
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

export default ClaudePromptGenerator;
