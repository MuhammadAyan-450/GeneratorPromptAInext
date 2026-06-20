"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Send,
  RefreshCw,
  Copy,
  Star,
  Brain,
  Bot,
  Home,
  ChevronDown,
  Lightbulb,
  Code,
  PenTool,
  Users,
  GraduationCap,
  Zap,
  MessageSquare,
} from "lucide-react";
import ResponsiveAd from "../../../components/ResponsiveAd";

const AIAgent = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! 👋 I'm your free AI Agent. Ask me anything, generate prompts, or brainstorm ideas!",
    },
  ]);

  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingSteps, setThinkingSteps] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(-1);
  const [openFaq, setOpenFaq] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinkingSteps]);

  const simulateThinking = async () => {
    setIsThinking(true);
    setThinkingSteps([]);
    const steps = [
      "Reading your message...",
      "Understanding context...",
      "Planning best response...",
      "Generating detailed answer...",
    ];
    for (const step of steps) {
      await new Promise((r) => setTimeout(r, 600));
      setThinkingSteps((prev) => [...prev, step]);
    }
    setIsThinking(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || isThinking) return;
    const userMsg = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    await simulateThinking();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Server error");
      }

      const data = await res.json();
      if (!data?.role || !data?.content)
        throw new Error("Invalid response from API");
      setMessages((prev) => [...prev, data]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Couldn't connect right now. Please check your connection and try again.",
        },
      ]);
    }
  };

  const copyMsg = (content, index) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(-1), 2000);
  };

  const favoriteMsg = (msg) => {
    if (favorites.some((f) => f.content === msg.content)) return;
    setFavorites([...favorites, msg]);
  };

  const newChat = () => {
    setMessages([
      { role: "assistant", content: "New chat started! 👋 Ask me anything." },
    ]);
  };

  const tryExample = (text) => {
    setInput(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Top Nav */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2 flex items-center justify-between">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
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
                className="hover:text-indigo-600 transition-colors"
              >
                All Tools
              </Link>
            </li>
            <li>
              <span className="text-gray-300">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-semibold">AI Agent</span>
            </li>
          </ol>
        </nav>
        <button
          onClick={newChat}
          className="px-4 py-2 bg-white shadow hover:shadow-md rounded-xl flex items-center gap-2 text-sm text-gray-700 transition-all"
        >
          <RefreshCw size={15} /> New Chat
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-10">
        {/* Page Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-100 mb-3">
            <Bot className="text-indigo-600" size={24} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            Free AI Agent
          </h1>
          <p className="text-gray-500 text-sm">
            Need help writing something, debugging code, or just bouncing ideas
            around? Type your question below and get a response in seconds. No
            account, no limits.
          </p>
        </div>

       <ResponsiveAd />

        {/* Chat Window */}
        <div className="bg-white/95 rounded-3xl shadow-2xl border border-gray-200 overflow-hidden h-[72vh] flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-5 py-4 rounded-3xl relative break-words shadow-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                      : "bg-white text-gray-900 border border-gray-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>

                  {msg.role === "assistant" && (
                    <div className="absolute -bottom-7 right-2 flex gap-2">
                      <button
                        onClick={() => copyMsg(msg.content, i)}
                        title="Copy message"
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Copy size={14} />
                      </button>
                      <button
                        onClick={() => favoriteMsg(msg)}
                        title="Save to favorites"
                        className="text-yellow-400 hover:text-yellow-500 transition-colors"
                      >
                        <Star size={14} />
                      </button>
                    </div>
                  )}

                  {copiedIndex === i && (
                    <span className="absolute -top-6 right-0 text-xs text-green-600 font-medium">
                      Copied!
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Thinking Animation */}
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-indigo-50 border border-indigo-100 px-6 py-4 rounded-3xl max-w-[80%] shadow-sm">
                  <div className="flex items-center gap-3 mb-3 text-indigo-600 font-medium text-sm">
                    <Brain size={18} className="animate-pulse" />
                    Thinking...
                  </div>
                  <div className="space-y-2 pl-2">
                    {thinkingSteps.map((step, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-gray-600 text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-gray-100 bg-white/90 flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                !e.shiftKey &&
                (e.preventDefault(), sendMessage())
              }
              placeholder="Ask me anything, or type 'generate a prompt for...'"
              className="flex-1 px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-sm"
            />
            <button
              onClick={sendMessage}
              disabled={isThinking || !input.trim()}
              className={`px-6 py-3.5 rounded-2xl flex items-center justify-center transition-all ${
                isThinking || !input.trim()
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 active:scale-95"
              }`}
            >
              {isThinking ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Favorites */}
        {favorites.length > 0 && (
          <div className="mt-6 bg-white border border-yellow-200 rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Star size={15} className="text-yellow-400" /> Saved Responses
            </h2>
            <div className="space-y-2">
              {favorites.map((fav, i) => (
                <p
                  key={i}
                  className="text-sm text-gray-600 bg-yellow-50 rounded-xl px-4 py-2 leading-relaxed"
                >
                  {fav.content}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Native ad here */}

        <script
          async="async"
          data-cfasync="false"
          src="https://pl29796844.effectivecpmnetwork.com/4c385cac6f0784aa3165d3a9e7478f20/invoke.js"
        ></script>
        <div id="container-4c385cac6f0784aa3165d3a9e7478f20"></div>

        {/* ─── How to Use ─── */}
        <section className="mt-10 bg-white border border-gray-200 rounded-2xl p-6 md:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Using the AI Agent Effectively
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Type your query or confusion",
                desc: "Ask a question, get a prompt, input your code for debugging, or tell us what you want help with. The more precise you are, the better our output.",
              },
              {
                step: "2",
                title: "Be patient for the answer",
                desc: "It only takes a few seconds. As it is generating your answer, you will see an animation indicating that the AI is processing your query.",
              },
              {
                step: "3",
                title: "Copy or bookmark the answer",
                desc: "If the generated response was helpful, use the copy button to save the response to your clipboard or use the bookmark option.",
              },
              {
                step: "4",
                title: "Keep the conversation going",
                desc: "Ask a follow-up question, change something in your request, or move on to a different subject. We remember the context of the chat.",
              },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
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

        {/* ─── Prompt Examples ─── */}
        <section className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 md:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Prompt Examples to Try Right Now
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Click any example to load it into the input field. These work well
            and give you a sense of what this AI agent can do.
          </p>
          <div className="space-y-4">
            {[
              {
                category: "Prompt Generation",
                icon: <Zap size={18} className="text-amber-500" />,
                examples: [
                  "Generate a detailed ChatGPT prompt for writing a 2000-word blog post about remote work productivity",
                  "Write a Midjourney prompt for a cyberpunk city at night with neon signs and rain",
                  "Create a YouTube script prompt for a 10-minute video about cryptocurrency for beginners",
                ],
              },
              {
                category: "Content Writing",
                icon: <PenTool size={18} className="text-sky-600" />,
                examples: [
                  "Write a professional email declining a job offer politely",
                  "Create 5 Instagram caption options for a coffee shop launch",
                  "Draft a product description for wireless earbuds under $50",
                ],
              },
              {
                category: "Code Help",
                icon: <Code size={18} className="text-green-600" />,
                examples: [
                  "Explain what a REST API is in simple terms with an example",
                  "Find the bug in this JavaScript function and explain the fix",
                  "Write a Python function to check if a string is a palindrome",
                ],
              },
              {
                category: "Brainstorming",
                icon: <Lightbulb size={18} className="text-violet-600" />,
                examples: [
                  "Give me 10 YouTube video ideas for a tech review channel",
                  "Brainstorm 15 blog post titles about personal finance for millennials",
                  "Suggest 8 side hustle ideas for college students with no startup money",
                ],
              },
            ].map((group, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 mb-2">
                  {group.icon}
                  <h3 className="font-bold text-gray-900 text-sm">
                    {group.category}
                  </h3>
                </div>
                <div className="space-y-2 mb-4 ml-7">
                  {group.examples.map((ex, j) => (
                    <button
                      key={j}
                      onClick={() => tryExample(ex)}
                      className="block w-full text-left text-sm text-gray-600 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-700 border border-gray-100 hover:border-indigo-200 rounded-xl px-4 py-3 transition-colors"
                    >
                      &quot;{ex}&quot;
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 md:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Needs This AI Tool?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            This is not a developer tool. Here are some real-world use cases:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <PenTool size={20} className="text-sky-600" />,
                title: "Content Writers & Bloggers",
                desc: "Create outlines for your blogs, generate social media posts, create email drafts, and generate product descriptions without having to stare at a blank screen.",
              },
              {
                icon: <Code size={20} className="text-green-600" />,
                title: "Developers & Programmers",
                desc: "Fix code issues, learn about programming concepts, write programming code, or prepare for technical interviews. Supports Python, JavaScript, and many other coding languages.",
              },
              {
                icon: <Users size={20} className="text-violet-600" />,
                title: "Marketers & Business Owners",
                desc: "Brainstorm marketing campaigns, write marketing content, generate ideas for landing pages, or generate customer personas.",
              },
              {
                icon: <GraduationCap size={20} className="text-amber-600" />,
                title: "Researchers & Students",
                desc: "Summarize long pieces of content, clarify difficult topics, write lecture notes, and more.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl p-5 hover:border-indigo-200 transition-colors"
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

        {/* ─── Features ─── */}
        <section className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 md:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why Is This Unique{" "}
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: "No Account Necessary",
                desc: "All other AI chatbots require registration or login. This particular AI is fully functional the moment you land on the page without having to sign in or enter any details.",
              },
              {
                title: "Contextually Aware Chats",
                desc: "This AI bot is contextually aware and uses information from previous conversations to engage with users better and help them achieve their goals more efficiently.",
              },
              {
                title: "Save & Copy Responses",
                desc: "Star any response from the chat to bookmark it for future use or use one-click copy to send it to the clipboard directly without any hassle.",
              },
              {
                title: "Purposefully Designed For Prompt Creation",
                desc: "As opposed to general-purpose chatbots, this AI bot has been designed with prompt generation in mind, specifically for ChatGPT, Claude, Midjourney, etc.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-5 border border-gray-100"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SEO Content ─── */}
        <section className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 md:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Chatting With AI For Free (Almost)
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Not many "free AI" services really are free. You have to sign up,
            confirm your email address, and after sending 5 queries, you will be
            behind the paywall. Not this agent. Once you enter the page, ask
            your question, and receive the answer. It doesn't get easier than
            that.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The principal application is prompt creation. If you have been
            working with ChatGPT and Claude, you understand that the quality of
            results depends much on your prompt. A poor one like "talk about
            SEO" yields junk, but with a proper prompt containing a description,
            a certain tone, format, and even limitations, you get a decent
            result. And this AI agent will help you craft the prompts. However,
            this service works well as a universal assistant too. Ask it for
            debugging code, generate new ideas, compose emails, create a
            summary, and clarify concepts just like you would ask ChatGPT to.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            When to Use This vs. Dedicated Prompt Tools
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            If you need a prompt for a specific AI model, the dedicated tools
            are usually better. Our{" "}
            <Link
              href="/tools/chatgpt-prompt-generator"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700"
            >
              ChatGPT Prompt Generator
            </Link>{" "}
            gives you structured prompts optimized specifically for GPT models.
            The{" "}
            <Link
              href="/tools/midjourney-prompt-generator"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700"
            >
              Midjourney Prompt Generator
            </Link>{" "}
            handles image generation prompts with style, lighting, and camera
            settings. Use this AI agent when you need something more flexible —
            a conversation, a brainstorm, or a task that doesn't fit neatly into
            a form.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            If you're generating content that needs to pass AI detection, check
            out our{" "}
            <Link
              href="/tools/ai-text-humanizer"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700"
            >
              AI Text Humanizer
            </Link>
            . It takes AI-generated text and rewrites it to sound more natural.
            And if you want to check if text is AI-generated, the{" "}
            <Link
              href="/tools/ai-content-detector"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700"
            >
              AI Content Detector
            </Link>{" "}
            analyzes text and gives you a confidence score.
          </p>
        </section>

        {/* ─── FAQ ─── */}
        <section className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              {
                q: "Is this AI agent actually free, or is there a catch?",
                a: "It's free. No signup, no credit card, no message limits that kick in after 3 uses. The page loads, you type a question, you get an answer. We monetize through ads on the page, not by charging you or selling your data.",
              },
              {
                q: "Can I use this to generate prompts for ChatGPT, Claude, and Midjourney?",
                a: "Yes, that's one of the main use cases. Tell the AI what you need a prompt for — 'Write a ChatGPT prompt for a blog post about remote work' — and it'll generate a structured prompt you can paste directly into that tool.",
              },
              {
                q: "How is this different from just using ChatGPT directly?",
                a: "ChatGPT requires an account and has usage limits on the free tier. This AI agent has no login requirement and no hard message caps. The tradeoff is that ChatGPT's underlying model (GPT-4) is more capable than most free-tier alternatives. Use this when you need quick answers without friction; use ChatGPT when you need maximum quality.",
              },
              {
                q: "Are my conversations saved or used for training?",
                a: "Your chats aren't permanently stored in a database tied to your identity (since there's no account). The AI processes your message to generate a response, and that's it. We don't sell chat logs or use them to train models.",
              },
              {
                q: "Can this AI agent write code and debug errors?",
                a: "Yes. You can paste code and ask it to find bugs, explain what a function does, or write new code from scratch. It handles Python, JavaScript, and most common languages. It won't replace a senior developer, but it's solid for quick debugging and boilerplate.",
              },
              {
                q: "Why does it take a few seconds to respond?",
                a: "The AI needs to read your message, process it, and generate a response token by token. That takes a few seconds depending on the length of your question and the complexity of the answer. The thinking animation shows progress while you wait.",
              },
              {
                q: "Can I use this for work or commercial projects?",
                a: "Yes. The responses you get are yours to use however you want — in blog posts, marketing materials, code, emails, whatever. There's no licensing restriction on the output.",
              },
              {
                q: "What happens if I click 'New Chat'?",
                a: "It clears the conversation history and starts fresh. The AI won't remember anything from the previous chat. Saved favorites stay even after starting a new chat, so you won't lose those.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-indigo-200 transition-colors duration-300"
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
                    className={`text-indigo-500 flex-shrink-0 transition-transform duration-300 ${
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
            Related AI & Prompt Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/chatgpt-prompt-generator",
                title: "ChatGPT Prompt Generator",
                desc: "Build structured prompts specifically optimized for ChatGPT responses.",
              },
              {
                href: "/tools/claude-prompt-generator",
                title: "Claude Prompt Generator",
                desc: "Create high-quality prompts designed for Claude AI's strengths.",
              },
              {
                href: "/tools/midjourney-prompt-generator",
                title: "Midjourney Prompt Builder",
                desc: "Create detailed image prompts with art styles, lighting, and camera angles.",
              },
              {
                href: "/tools/youtube-script-prompt-generator",
                title: "YouTube Script Prompt Generator",
                desc: "Generate prompts optimized for YouTube video scripts and outlines.",
              },
              {
                href: "/tools/ai-text-humanizer",
                title: "AI Text Humanizer",
                desc: "Rewrite AI-generated text to sound more natural and human-written.",
              },
              {
                href: "/tools/ai-content-detector",
                title: "AI Content Detector",
                desc: "Check if text is AI-generated or human-written with confidence scores.",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-indigo-400 transition-all"
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
  );
};

export default AIAgent;
