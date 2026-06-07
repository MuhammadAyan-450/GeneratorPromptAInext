"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Eye,
  ChevronRight,
  ChevronDown,
  Zap,
} from "lucide-react";

const post = {
  id: 13,
  slug: "chatgpt-prompt-generator-guide",
  title: "ChatGPT Prompt Generator Guide: Stop Guessing, Start Controlling",
  excerpt:
    "I used to spend 20 minutes rewriting the same prompt. Then I figured out how prompt generators actually work. Here's the exact framework.",
  category: "Prompt Engineering",
  tag: "ChatGPT",
  readTime: 7,
  date: "June 15, 2026",
  dateISO: "2026-06-15",
  featured: true,
  color: "from-indigo-500 to-purple-600",
  emoji: "⚡",
  views: "12.4K",
};

const TOC_ITEMS = [
  { id: "the-cycle", label: "The Guessing Cycle" },
  { id: "what-it-is", label: "What is a Prompt Generator?" },
  { id: "the-framework", label: "The 5-Part Framework" },
  { id: "bad-vs-good", label: "Bad vs Good Prompts" },
  { id: "when-to-use", label: "When to Use One" },
  { id: "faq", label: "FAQs" },
];

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <details
      open={open}
      onToggle={(e) => setOpen(e.target.open)}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden"
    >
      <summary className="px-5 py-4 cursor-pointer font-semibold text-gray-900 text-sm flex items-center justify-between hover:bg-gray-50 transition list-none">
        {question}
        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ml-4 ${open ? "rotate-180" : ""}`}
        />
      </summary>
      <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
        {answer}
      </div>
    </details>
  );
};

const BlogPostChatGPTPromptGenerator = () => {
  const [activeTOC, setActiveTOC] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const headings = TOC_ITEMS.map((item) =>
        document.getElementById(item.id),
      ).filter(Boolean);
      let current = "";
      headings.forEach((h) => {
        if (window.scrollY >= h.offsetTop - 120) current = h.id;
      });
      setActiveTOC(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const relatedPosts = [
    {
      id: 1,
      slug: "claude-vs-chatgpt-which-is-better",
      title: "Claude vs ChatGPT in 2026: Which AI is Actually Better?",
      category: "AI Comparison",
      color: "from-orange-500 to-red-500",
      emoji: "⚔️",
      readTime: 12,
      date: "April 5, 2026",
    },
    {
      id: 7,
      slug: "compress-image-to-100kb-online-free",
      title: "How to Compress Image to 100KB Online Free",
      category: "Web Tips",
      color: "from-sky-500 to-blue-600",
      emoji: "⚡",
      readTime: 6,
      date: "April 12, 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Breadcrumb ── */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link
            href="/blog"
            className="hover:text-indigo-600 transition-colors"
          >
            Blog
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-600 truncate max-w-xs inline-block align-bottom">
            Prompt Generator Guide
          </span>
        </nav>
      </div>

      {/* ── Layout ── */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex gap-10">
        {/* ── TOC Sidebar ── */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-20">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              On this page
            </p>
            <div className="flex flex-col gap-0.5">
              {TOC_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-sm py-1.5 px-3 rounded-r-lg transition-all border-l-2 ${
                    activeTOC === item.id
                      ? "border-l-indigo-600 text-indigo-600 bg-indigo-50 font-medium"
                      : "border-l-transparent text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white">
              <p className="text-sm font-bold mb-1">Free Prompt Generator</p>
              <p className="text-xs text-indigo-100 mb-3">
                Build perfect prompts with our free tool.
              </p>
              <Link
                href="/tools/chatgpt-prompt-generator"
                className="block text-center py-2 bg-white text-indigo-700 text-xs font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Try Free →
              </Link>
            </div>
          </div>
        </aside>

        {/* ── Article ── */}
        <article className="flex-1 max-w-3xl">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                #{post.tag}
              </span>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                ⭐ Featured
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              ChatGPT Prompt Generator Guide:{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Stop Guessing, Start Controlling
              </span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-5">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400 border-t border-gray-100 pt-4">
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {post.readTime} min read
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {post.date}
              </span>
            </div>
          </header>

          {/* Hero */}
          <div
            className={`bg-gradient-to-br ${post.color} rounded-2xl h-64 md:h-80 flex items-center justify-center mb-10`}
          >
            <span className="text-8xl md:text-9xl">{post.emoji}</span>
          </div>

          {/* ═══════════════ CONTENT ═══════════════ */}
          <div className="text-gray-600 leading-relaxed space-y-5">
            {/* Intro */}
            <p className="text-lg">
              Before, it took me 20 minutes to rewrite the same prompt
              repeatedly.
            </p>

            <p>
              For instance, I would write a simple thing such as "blog post on
              SEO," and ChatGPT would give me a boring 500-word article. I was
              frustrated; I would add "improve it" or "make it better," and I
              got an improved version of a boring 500-word article.
            </p>

            <p>
              The process was similar to throwing darts with my eyes closed. I
              would keep writing different prompts in hopes that I'd find the
              right one.
            </p>

            <p>
              But once I sat down and figured out what goes into making a good
              prompt, I was able to stop guessing. And guess what? That is
              precisely what a ChatGPT prompt generator does automatically.
            </p>

            {/* The Cycle */}
            <h2
              id="the-cycle"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-indigo-600">01.</span> The Guessing Cycle
              (And How to Break It)
            </h2>

            <p>
              Almost everyone treats ChatGPT as if it were an intern in need of
              supervision. They ask for something in a very vague way, get
              unsatisfactory results, and criticize the AI.
            </p>

            <p>
              This is not an issue with ChatGPT; rather, the problem is with
              your input.
            </p>

            <p>
              Using a prompt generator forces you to break free from that
              mindset. Rather than entering a stream of consciousness in a
              sentence, you have to explain who, what, why, and in which format
              before you can proceed further.
            </p>

            {/* What it is */}
            <h2
              id="what-it-is"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-indigo-600">02.</span> What is a Prompt
              Generator Actually Doing?
            </h2>

            <p>
              It is not magic. A prompt generator is merely an outline in which
              information can be filled in.
            </p>

            <p>
              You can consider it a game of Mad Libs in which you input key
              concepts in a certain framework. The generator takes care of
              grammatical aspects while you provide the ideas.
            </p>

            <p>
              What you get is a very precise, multi-faceted prompt with no
              leeway left for ChatGPT to interpret anything at all.
            </p>

            {/* The Framework */}
            <h2
              id="the-framework"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-indigo-600">03.</span> The 5-Part Framework
              Every Generator Uses
            </h2>

            <p>
              If you’re planning on creating prompts by yourself without an AI
              tool, remember these components. Any reliable prompt generator is
              built upon some version of these five components:
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-6 my-6 space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-700 font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Role</p>
                  <p className="text-sm text-gray-500">
                    What is the role of the AI? For example: "You are a senior
                    copywriter."
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-700 font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Task</p>
                  <p className="text-sm text-gray-500">
                    What do you want the AI to perform? For instance: "Create a
                    product description."
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-700 font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Context</p>
                  <p className="text-sm text-gray-500">
                    What additional information should it have? Example: "It’s a
                    noise-canceling headphone designed for remote employees."
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-700 font-bold text-sm flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Constraints</p>
                  <p className="text-sm text-gray-500">
                    What shouldn’t the AI include? Sample: "Do not use seamless
                    or revolutionary."
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-700 font-bold text-sm flex-shrink-0">
                  5
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Format</p>
                  <p className="text-sm text-gray-500">
                    What is the format of the output? For instance: "Use bullet
                    points."
                  </p>
                </div>
              </div>
            </div>

            {/* Bad vs Good */}
            <h2
              id="bad-vs-good"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-indigo-600">04.</span> Bad Prompt vs
              Generated Prompt
            </h2>

            <p>
              Let’s look at this in action. Here’s how a normal person asks for
              an email, versus what a prompt generator spits out.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-bold text-red-500 mb-2">
                  ❌ The Normal Way
                </p>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-900 font-mono leading-relaxed">
                  "Write me a cold email to sell marketing services to a gym
                  owner."
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-green-500 mb-2">
                  ✅ Generated Way
                </p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-900 font-mono leading-relaxed">
                  "Act as a seasoned B2B sales expert. Write a cold email to a
                  local gym owner offering social media management. Keep it
                  under 150 words. Focus on the pain point of empty afternoon
                  classes. Do not use corporate jargon. End with a low-friction
                  question, not a request for a call."
                </div>
              </div>
            </div>

            <p>
              The first prompt will get you a generic, boring email. The second
              prompt will get you something you could actually send to a real
              client. That’s the power of structure.
            </p>

            {/* When to use */}
            <h2
              id="when-to-use"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-indigo-600">05.</span> When You Actually
              Need a Generator
            </h2>

            <p>
              Not every task requires a tool. For those cases where you only
              want ChatGPT to provide an explanation of some topic or give you
              some ideas, you can get away with using a single sentence.
            </p>

            <p>However, you do need a prompt generator in case:</p>

            <ul className="space-y-2 my-4">
              <li className="flex items-start gap-2">
                <Zap
                  size={16}
                  className="text-indigo-500 flex-shrink-0 mt-0.5"
                />{" "}
                You write content that is going to be published online (blogs,
                newsletters, copywriting)
              </li>
              <li className="flex items-start gap-2">
                <Zap
                  size={16}
                  className="text-indigo-500 flex-shrink-0 mt-0.5"
                />{" "}
                You require precise formatting (JSON, CSV, strict word counts)
              </li>
              <li className="flex items-start gap-2">
                <Zap
                  size={16}
                  className="text-indigo-500 flex-shrink-0 mt-0.5"
                />{" "}
                You create automated processes that require a reliable AI
                response
              </li>
              <li className="flex items-start gap-2">
                <Zap
                  size={16}
                  className="text-indigo-500 flex-shrink-0 mt-0.5"
                />{" "}
                You constantly receive the same generic responses from AI and
                want to solve this problem
              </li>
            </ul>

            <p className="text-lg font-semibold text-gray-900 mt-8">
              A prompt generator won’t make you an AI expert overnight. But it
              will force you to think clearly about what you actually want. Try
              our{" "}
              <Link
                href="/tools/chatgpt-prompt-generator"
                className="text-indigo-600 hover:underline"
              >
                free generator here
              </Link>{" "}
              and see the difference on your very first try.
            </p>

            {/* ── FAQ ── */}
            <h2
              id="faq"
              className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20"
            >
              <span className="text-indigo-600">06.</span> Frequently Asked
              Questions
            </h2>

            <div className="space-y-4 my-6">
              <FAQItem
                question="Are ChatGPT prompt generators free?"
                answer="Many are, including ours. Some advanced tools charge a subscription for specialized templates (like coding or specific marketing frameworks), but you absolutely do not need to pay money to get 90% of the value."
              />
              <FAQItem
                question="Can ChatGPT generate its own prompts?"
                answer="Yes, actually. You can ask ChatGPT to 'act as a prompt generator' and give it a topic. It will interview you and build a prompt. It's a bit slower than using a dedicated tool, but it works surprisingly well."
              />
              <FAQItem
                question="Do prompt generators work with Claude too?"
                answer="Completely. The 5-part framework (Role, Task, Context, Constraints, Format) works flawlessly with Claude. In fact, Claude follows constraints even better than ChatGPT, so a well-structured prompt goes a lot further with Claude."
              />
            </div>
          </div>
          {/* ═══════════════ CONTENT END ═══════════════ */}

          {/* ── Related Posts ── */}
          <div className="mt-16 border-t border-gray-200 pt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Continue Reading
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/blog/${rp.slug}`}
                  className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`flex items-center justify-center bg-gradient-to-br ${rp.color} h-32`}
                  >
                    <span className="text-5xl">{rp.emoji}</span>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      {rp.category}
                    </span>
                    <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mt-2 mb-1">
                      {rp.title}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {rp.readTime} min read · {rp.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft size={14} /> Back to all articles
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostChatGPTPromptGenerator;
