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
  Zap,
  Shield,
  FileText,
  Brain,
  Wand2,
  BookOpen,
  Target,
  Users,
  TrendingUp,
  MessageSquare,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import ResponsiveAd from "../../../components/ResponsiveAd";

export default function ChatGptPromptGenerator() {
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState("detailed");
  const [tone, setTone] = useState("professional");
  const [useCase, setUseCase] = useState("blog-writing");
  const [audience, setAudience] = useState("general");
  const [outputFormat, setOutputFormat] = useState("structured-article");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [copied, setCopied] = useState(false);
  const [favCopied, setFavCopied] = useState(-1);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const depthOptions = [
    { value: "beginner", label: "🟢 Beginner — Simple & clear" },
    { value: "detailed", label: "🔵 Detailed — Well-structured" },
    { value: "comprehensive", label: "🟡 Comprehensive — With examples" },
    { value: "expert", label: "🔴 Expert — PhD-level depth" },
  ];

  const toneOptions = [
    { value: "professional", label: "💼 Professional" },
    { value: "friendly", label: "😊 Friendly & Casual" },
    { value: "academic", label: "🎓 Academic" },
    { value: "motivational", label: "🚀 Motivational" },
    { value: "humorous", label: "😄 Humorous" },
    { value: "neutral", label: "⚖️ Neutral" },
  ];

  const useCaseOptions = [
    { value: "blog-writing", label: "✍️ Blog Writing" },
    { value: "social-media", label: "📱 Social Media Posts" },
    { value: "coding", label: "💻 Coding & Development" },
    { value: "marketing", label: "📣 Marketing Copy" },
    { value: "research", label: "🔬 Research & Analysis" },
    { value: "email", label: "📧 Email Writing" },
    { value: "youtube-script", label: "🎬 YouTube Script" },
    { value: "seo-content", label: "🔍 SEO Content" },
    { value: "education", label: "📚 Teaching & Education" },
    { value: "business", label: "📊 Business Strategy" },
    { value: "creative-writing", label: "🎨 Creative Writing" },
    { value: "customer-service", label: "🤝 Customer Service" },
  ];

  const audienceOptions = [
    { value: "general", label: "General Public" },
    { value: "beginners", label: "Complete Beginners" },
    { value: "professionals", label: "Industry Professionals" },
    { value: "students", label: "Students" },
    { value: "executives", label: "C-Suite / Executives" },
    { value: "developers", label: "Developers / Tech" },
    { value: "marketers", label: "Marketers" },
    { value: "small-business", label: "Small Business Owners" },
  ];

  const outputFormatOptions = [
    { value: "structured-article", label: "Structured Article" },
    { value: "bullet-points", label: "Bullet Point List" },
    { value: "step-by-step", label: "Step-by-Step Guide" },
    { value: "table", label: "Comparison Table" },
    { value: "qa-format", label: "Q&A Format" },
    { value: "pros-cons", label: "Pros & Cons" },
    { value: "short-paragraph", label: "Short Paragraph" },
    { value: "script", label: "Script / Dialogue" },
  ];

  // ─── API call to our internal route ───────────────────────────────────────
  const handleGenerate = async () => {
    setError("");
    if (!topic.trim()) {
      setError("Please enter a topic or task first.");
      return;
    }
    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          depth,
          tone,
          useCase,
          audience,
          outputFormat,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      if (!data.prompt) {
        throw new Error("No prompt returned from server.");
      }

      setResult(data.prompt);
      setCopied(false);
    } catch (err) {
      console.error("Generation error:", err);
      setError(
        err.message || "Something went wrong. Please try again in a moment.",
      );
    } finally {
      setLoading(false);
    }
  };

  const copyPrompt = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addToFavorites = () => {
    if (!result || favorites.includes(result)) return;
    setFavorites([result, ...favorites]);
  };

  const removeFavorite = (p) => setFavorites(favorites.filter((f) => f !== p));

  const copyFavorite = (text, index) => {
    navigator.clipboard.writeText(text);
    setFavCopied(index);
    setTimeout(() => setFavCopied(-1), 2000);
  };

  const clearAll = () => {
    setTopic("");
    setDepth("detailed");
    setTone("professional");
    setUseCase("blog-writing");
    setAudience("general");
    setOutputFormat("structured-article");
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
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Zap size={12} /> AI-Powered by Groq — Real Prompts, Not Templates
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            ChatGPT Prompt Generator — AI-Powered Prompt Writer Free
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Generate professional, ready-to-use ChatGPT prompts in seconds. This
            isn't a template filler — it uses real AI to craft custom prompts
            tailored to your topic, tone, use case, and audience. Copy and paste
            directly into ChatGPT, Claude, or Gemini.
          </p>
        </div>

        <ResponsiveAd />

        {/* Tool Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          {/* Topic Input */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Topic or Task <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="e.g. Write a blog post about sustainable fashion, Explain machine learning, Create a sales email for SaaS..."
              className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 placeholder:text-gray-400"
            />
            <p className="text-xs text-gray-400 mt-1.5">
              Be specific for better results. "Write a LinkedIn post about B2B
              sales" beats "marketing".
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Depth Level
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

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Use Case
              </label>
              <select
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-800"
              >
                {useCaseOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Target Audience
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-800"
              >
                {audienceOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Desired Output Format
              </label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-800"
              >
                {outputFormatOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <button
              onClick={handleGenerate}
              disabled={loading || !topic.trim()}
              className="bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 size={18} /> Generate Prompt
                </>
              )}
            </button>
            <button
              onClick={clearAll}
              className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} /> Clear All
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Loading animation */}
          {loading && (
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-6 text-center mb-5">
              <div className="flex justify-center mb-3">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 bg-sky-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sky-600 text-sm font-medium">
                AI is crafting your prompt...
              </p>
              <p className="text-sky-400 text-xs mt-1">
                Analyzing your topic, tone, and use case
              </p>
            </div>
          )}

          {/* Result */}
          {result && !loading && (
            <div className="bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-200 rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-sky-600 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> Your AI-Generated ChatGPT Prompt
                </p>
                <span className="text-xs text-gray-400">
                  {result.split(" ").length} words
                </span>
              </div>
              <div className="bg-white rounded-xl border border-sky-100 p-4 mb-4">
                <p className="text-gray-800 leading-relaxed text-sm whitespace-pre-wrap">
                  {result}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={copyPrompt}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
                >
                  <Copy size={15} /> {copied ? "Copied!" : "Copy Prompt"}
                </button>
                <button
                  onClick={addToFavorites}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-xl text-sm font-semibold transition-all"
                >
                  <Star size={15} fill="currentColor" /> Save
                </button>
                <button
                  onClick={handleGenerate}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold transition-all"
                >
                  <RefreshCw size={15} /> Regenerate
                </button>
              </div>
            </div>
          )}

          {/* Favorites */}
          {favorites.length > 0 && (
            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                <Star
                  size={15}
                  className="text-yellow-500"
                  fill="currentColor"
                />
                Saved Prompts ({favorites.length})
              </h3>
              <div className="space-y-3">
                {favorites.map((fav, i) => (
                  <div
                    key={i}
                    className="bg-yellow-50 border border-yellow-100 rounded-xl p-4"
                  >
                    <p className="text-gray-700 text-xs leading-relaxed mb-3 line-clamp-3">
                      {fav}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyFavorite(fav, i)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 text-white rounded-lg text-xs font-medium"
                      >
                        <Copy size={12} />{" "}
                        {favCopied === i ? "Copied!" : "Copy"}
                      </button>
                      <button
                        onClick={() => removeFavorite(fav)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-600 rounded-lg text-xs font-medium hover:bg-red-200"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Native ad */}
        <script
          async="async"
          data-cfasync="false"
          src="https://pl29796844.effectivecpmnetwork.com/4c385cac6f0784aa3165d3a9e7478f20/invoke.js"
        ></script>
        <div id="container-4c385cac6f0784aa3165d3a9e7478f20"></div>

        {/* ─── What Is This ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What Is a ChatGPT Prompt Generator and Why Do You Need One?
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            A ChatGPT prompt generator is a tool that writes the instruction you
            give to ChatGPT — so instead of staring at a blank text box trying
            to figure out how to phrase your request, you describe what you want
            and the tool crafts a structured, detailed prompt for you.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            This matters more than most people realize. The same topic asked two
            different ways produces dramatically different results from ChatGPT.
            "Tell me about marketing" gets you a surface-level overview. "Act as
            a senior B2B marketing strategist. Write a LinkedIn post targeted at
            SaaS founders explaining why most cold outreach fails, using a
            professional tone with one data point and a clear call to action"
            gets you something you can actually publish.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Unlike template-based generators that just swap in your topic word,
            this tool uses real AI (powered by Groq's fast inference) to craft
            each prompt from scratch based on your specific topic, depth, tone,
            use case, target audience, and desired output format. Every prompt
            is unique and ready to paste into ChatGPT, Claude, Gemini, or any
            other large language model.
          </p>
        </section>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How to Use This AI Prompt Generator
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Six inputs, one click, and you get a professional prompt ready to
            copy.
          </p>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Enter your topic or task — be specific",
                desc: "The more specific you are, the better the prompt. 'Write a blog post about sustainable fashion for Gen Z consumers' produces a dramatically better prompt than 'sustainable fashion'. Include your goal, any key points you want covered, and any constraints.",
              },
              {
                step: "2",
                title: "Choose your depth level",
                desc: "Beginner gets you simple, jargon-free explanations. Detailed gives you well-structured answers. Comprehensive adds examples, comparisons, and practical applications. Expert delivers PhD-level analysis with case studies — use this for research or high-stakes content.",
              },
              {
                step: "3",
                title: "Set the tone to match your purpose",
                desc: "Professional for business content and client-facing material. Friendly for blog posts and social media. Academic for research papers. Motivational for training materials. Humorous for entertainment content. The tone modifier tells ChatGPT exactly how to communicate.",
              },
              {
                step: "4",
                title: "Select your use case and target audience",
                desc: "The use case (blog writing, coding, YouTube script, etc.) tells the AI what kind of output you need. The audience setting adjusts vocabulary and framing — a prompt for developers looks completely different from one for small business owners on the same topic.",
              },
              {
                step: "5",
                title: "Pick your output format",
                desc: "Tell ChatGPT exactly how you want the answer structured. Step-by-step for how-to content. Bullet points for quick reference. Table for comparisons. Script for videos. The format specification is one of the most powerful elements of a good prompt.",
              },
              {
                step: "6",
                title: "Generate, copy, and paste into ChatGPT",
                desc: "Click Generate and the AI crafts your prompt in seconds. Read it over — it should be ready to use as-is. Copy it and paste into ChatGPT, Claude, Gemini, or any LLM. If it's not quite right, hit Regenerate or adjust your settings.",
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

        {/* ─── What Makes a Good Prompt ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What Makes a Good ChatGPT Prompt? The 4 Elements That Matter
          </h2>
          <p className="text-gray-600 mb-5 leading-relaxed">
            Most people use ChatGPT like a search engine — short phrase, hope
            for good answer. The people who get exceptional results treat it
            like briefing a capable freelancer. Here's what separates great
            prompts from generic ones.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Brain size={20} className="text-indigo-600" />,
                title: "Role Assignment",
                bad: '"Tell me about email marketing"',
                good: '"Act as an email marketing specialist with B2B SaaS experience. Write..."',
                desc: 'Starting with "Act as a [specific expert]" dramatically improves output quality. The model contextualizes everything through that expertise lens.',
              },
              {
                icon: <Target size={20} className="text-sky-600" />,
                title: "Specific Task Description",
                bad: '"Write a blog post about Python"',
                good: '"Write a 1,000-word beginner guide to Python for non-programmers who want to automate Excel tasks"',
                desc: "Vague tasks produce vague answers. The more precisely you describe what you want — goal, constraints, context — the more accurately ChatGPT delivers it.",
              },
              {
                icon: <FileText size={20} className="text-green-600" />,
                title: "Output Format Instructions",
                bad: '"Explain the pros and cons of remote work"',
                good: '"Create a comparison table with 5 rows: productivity, collaboration, work-life balance, costs, career growth — remote vs in-office"',
                desc: 'Without format guidance, ChatGPT picks a structure that may not match your needs. Specify "bullet points," "numbered steps," or "table" to get exactly what you need.',
              },
              {
                icon: <Users size={20} className="text-amber-600" />,
                title: "Audience Specification",
                bad: '"Explain blockchain"',
                good: '"Explain blockchain to a 55-year-old small business owner with no technical background"',
                desc: "The same information needs to be communicated very differently to a CEO vs. a student. Specifying your audience adjusts vocabulary, assumed knowledge, and framing automatically.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl p-5 hover:border-sky-200 transition-colors"
              >
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-3">
                  {item.desc}
                </p>
                <div className="space-y-2">
                  <div className="bg-red-50 rounded-lg p-2.5">
                    <p className="text-xs text-red-500 font-semibold mb-0.5">
                      ❌ Weak
                    </p>
                    <p className="text-xs text-red-700 font-mono">{item.bad}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2.5">
                    <p className="text-xs text-green-600 font-semibold mb-0.5">
                      ✅ Strong
                    </p>
                    <p className="text-xs text-green-700 font-mono">
                      {item.good}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses a ChatGPT Prompt Generator?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Anyone who uses ChatGPT regularly and wants better results faster.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <FileText size={20} className="text-sky-600" />,
                title: "Content Writers & Bloggers",
                desc: "Generate prompts for article drafts, outlines, or SEO sections. Instead of spending 20 minutes crafting the perfect prompt, generate one in seconds and get back to writing.",
              },
              {
                icon: <Code size={20} className="text-green-600" />,
                title: "Developers & Engineers",
                desc: "Create prompts for code reviews, debugging help, or architecture discussions. Expert depth + technical audience = prompts that get you code-level answers.",
              },
              {
                icon: <TrendingUp size={20} className="text-violet-600" />,
                title: "Marketers & Copywriters",
                desc: "Generate prompts for ad copy, email sequences, social posts, and product descriptions. Match tone to brand voice and audience to customer profile.",
              },
              {
                icon: <BookOpen size={20} className="text-amber-600" />,
                title: "Students & Researchers",
                desc: "Get expert-depth prompts for research papers, study guides, and concept explanations. Academic tone + expert depth gets you responses beyond Wikipedia summaries.",
              },
              {
                icon: <Users size={20} className="text-red-500" />,
                title: "Business Owners",
                desc: "Generate prompts for business plans, competitive analysis, pitch decks, and strategic frameworks. Executive audience setting produces board-room-ready language.",
              },
              {
                icon: <Lightbulb size={20} className="text-indigo-600" />,
                title: "Educators & Teachers",
                desc: "Create prompts for lesson plans, quiz questions, and student feedback templates. Specify student grade level as the audience for age-appropriate output.",
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

        {/* ─── FAQ ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            ChatGPT Prompt Generator — Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              {
                q: "How do I write better prompts for ChatGPT?",
                a: "The four elements that matter most: a role assignment ('Act as a [expert]'), a specific task description, an audience specification, and an output format instruction. This generator handles all four automatically — just enter your topic and click Generate.",
              },
              {
                q: "What's the difference between this and a basic prompt template tool?",
                a: "Template tools fill blanks in pre-written sentences. This tool uses real AI to generate each prompt from scratch based on your specific inputs — topic, depth, tone, use case, audience, and format. Every prompt is unique, not a mad-lib.",
              },
              {
                q: "Do these prompts work with GPT-4o, Claude, and Gemini?",
                a: "Yes. The prompts follow prompt engineering principles that apply across all major LLMs — GPT-3.5, GPT-4, GPT-4o, Claude, Google Gemini, and Llama. Just paste the generated prompt into whichever AI assistant you prefer.",
              },
              {
                q: "What is the best way to prompt ChatGPT for blog writing?",
                a: "Set Use Case to 'Blog Writing', Depth to 'Comprehensive', and specify your target reader clearly. Include word count, the angle or hook you want, and key sections to cover. This generator structures all of that automatically.",
              },
              {
                q: "How do I generate ChatGPT prompts for coding help?",
                a: "Set Use Case to 'Coding & Development', Audience to 'Developers / Tech', and Depth to 'Expert'. Enter your specific problem — not just 'Python' but 'optimizing a slow SQL query in Django'. The more specific the problem, the more actionable the prompt.",
              },
              {
                q: "Can I use AI-generated prompts for commercial content?",
                a: "Yes. The prompts generated here are your inputs to ChatGPT — instructions, not the final content. You own whatever ChatGPT produces in response. Using prompts for commercial content is standard practice across agencies and content teams.",
              },
              {
                q: "What does 'depth level' mean in prompt engineering?",
                a: "Depth level tells ChatGPT how thorough and advanced to make the response. Beginner = jargon-free, simple. Detailed = structured with clear flow. Comprehensive = adds examples and comparisons. Expert = PhD-level analysis with case studies and advanced nuance.",
              },
              {
                q: "How many prompts can I generate?",
                a: "Unlimited. There's no usage cap, no account required, and no daily limit. Generate as many prompts as you need, save your favorites, and regenerate for different variations of the same topic.",
              },
              {
                q: "What is prompt engineering and why does it matter?",
                a: "Prompt engineering is the practice of writing instructions to AI language models that reliably produce high-quality, specific outputs. It matters because the same AI model can produce dramatically different results depending on how the question is framed. This generator applies those principles automatically.",
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
                    className={`text-sky-500 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i
                      ? "max-h-[600px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Related Tools ─── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related AI Prompt Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/claude-prompt-generator",
                title: "Claude Prompt Generator",
                desc: "AI-powered prompts optimized for Anthropic's Claude.",
              },
              {
                href: "/tools/midjourney-prompt-generator",
                title: "Midjourney Prompt Builder",
                desc: "Craft detailed image generation prompts with style controls.",
              },
              {
                href: "/tools/youtube-script-prompt-generator",
                title: "YouTube Script Prompt Builder",
                desc: "Generate video script prompts and structured outlines.",
              },
              {
                href: "/tools/ai-text-humanizer",
                title: "AI Text Humanizer",
                desc: "Make AI-generated content sound more naturally human.",
              },
              {
                href: "/tools/ai-content-detector",
                title: "AI Content Detector",
                desc: "Check whether text was written by AI or a human.",
              },
              {
                href: "/tools/word-counter",
                title: "Word Counter",
                desc: "Count words, characters, and estimated reading time.",
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
}
