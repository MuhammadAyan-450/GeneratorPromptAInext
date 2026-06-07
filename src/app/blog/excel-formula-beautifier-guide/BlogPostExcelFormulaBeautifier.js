'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Clock,
    Calendar,
    Eye,
    ChevronRight,
    ChevronDown,
} from "lucide-react";

const post = {
    id: 12,
    slug: "excel-formula-beautifier-guide",
    title: "Excel Formula Beautifier Guide: How to Read Messy Formulas",
    excerpt:
        "I once stared at a 400-character nested IF statement and cried a little inside. Here’s how formula beautifiers saved my sanity.",
    category: "Excel",
    tag: "Formulas",
    readTime: 6,
    date: "June 2, 2026",
    dateISO: "2026-06-02",
    featured: false,
    color: "from-green-600 to-emerald-500",
    emoji: "📊",
    views: "5.5K",
};

const TOC_ITEMS = [
    { id: "the-problem", label: "The Problem" },
    { id: "what-it-does", label: "What is a Beautifier?" },
    { id: "method-1", label: "Method 1: Online Tools" },
    { id: "method-2", label: "Method 2: Excel Labs Add-in" },
    { id: "method-3", label: "Method 3: Manual Formatting" },
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

const BlogPostExcelFormulaBeautifier = () => {
    const [activeTOC, setActiveTOC] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const headings = TOC_ITEMS.map((item) =>
                document.getElementById(item.id)
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
            id: 3,
            slug: "cpm-formula-how-to-calculate",
            title: "CPM Formula — How to Calculate Cost Per Mille",
            category: "Advertising",
            color: "from-emerald-500 to-teal-600",
            emoji: "🧮",
            readTime: 5,
            date: "May 20, 2026",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* ── Breadcrumb ── */}
            <div className="max-w-6xl mx-auto px-4 pt-6">
                <nav className="flex items-center gap-2 text-xs text-gray-400">
                    <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                    <ChevronRight size={12} />
                    <Link href="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link>
                    <ChevronRight size={12} />
                    <span className="text-gray-600 truncate max-w-xs inline-block align-bottom">Excel Formula Beautifier</span>
                </nav>
            </div>

            {/* ── Layout ── */}
            <div className="max-w-6xl mx-auto px-4 py-8 flex gap-10">

                {/* ── TOC Sidebar ── */}
                <aside className="hidden lg:block w-56 flex-shrink-0">
                    <div className="sticky top-20">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">On this page</p>
                        <div className="flex flex-col gap-0.5">
                            {TOC_ITEMS.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className={`text-sm py-1.5 px-3 rounded-r-lg transition-all border-l-2 ${activeTOC === item.id
                                            ? "border-l-indigo-600 text-indigo-600 bg-indigo-50 font-medium"
                                            : "border-l-transparent text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
                                        }`}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        <div className="mt-6 bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl p-5 text-white">
                            <p className="text-sm font-bold mb-1">Free AI Text Humanizer</p>
                            <p className="text-xs text-green-100 mb-3">Make any AI text sound naturally human-written.</p>
                            <Link href="/tools/ai-text-humanizer" className="block text-center py-2 bg-white text-green-700 text-xs font-semibold rounded-lg hover:bg-green-50 transition-colors">
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
                            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">{post.category}</span>
                            <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">#{post.tag}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                            Excel Formula Beautifier Guide:{" "}
                            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                                How to Read Messy Formulas
                            </span>
                        </h1>
                        <p className="text-lg text-gray-500 leading-relaxed mb-5">
                            {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-400 border-t border-gray-100 pt-4">
                            <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime} min read</span>
                            <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                            <span className="flex items-center gap-1.5"><Eye size={14} /> {post.views} views</span>
                        </div>
                    </header>

                    {/* Hero */}
                    <div className={`bg-gradient-to-br ${post.color} rounded-2xl h-64 md:h-80 flex items-center justify-center mb-10`}>
                        <span className="text-8xl md:text-9xl">{post.emoji}</span>
                    </div>

                    {/* ═══════════════ CONTENT ═══════════════ */}
                    <div className="text-gray-600 leading-relaxed space-y-5">

                        {/* Intro */}
                        <p className="text-lg">
                            I once inherited a spreadsheet from a coworker who quit. 
                        </p>

                        <p>
                            In cell B2, there was a formula that was over 400 characters long. It had 6 nested IFs, a couple of VLOOKUPs, and an ISERROR wrapped around the whole thing like a blanket. 
                        </p>

                        <p>
                            I stared at it for 20 minutes and cried a little inside.
                        </p>

                        <p>
                            If you’ve ever tried to debug a massive Excel formula smashed into a single line, you know the pain. The brackets all blur together. You lose track of which comma belongs to which function. 
                        </p>

                        <p>
                            That’s where an Excel formula beautifier saves your life.
                        </p>

                        {/* The Problem */}
                        <h2 id="the-problem" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">
                            <span className="text-green-600">01.</span> The Problem With Long Formulas
                        </h2>

                        <p>
                            Look at this monster. This is how Excel displays formulas by default:
                        </p>

                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 my-6 font-mono text-sm text-red-800 break-all">
                            =IF(ISERROR(VLOOKUP(A2,Sheet2!A:D,4,FALSE)),"Not Found",IF(VLOOKUP(A2,Sheet2!A:D,4,FALSE)100,"High",IF(VLOOKUP(A2,Sheet2!A:D,4,FALSE)50,"Medium","Low")))
                        </div>

                        <p>
                            Good luck figuring out where the second IF statement starts. 
                        </p>

                        {/* What it does */}
                        <h2 id="what-it-does" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">
                            <span className="text-green-600">02.</span> What a Beautifier Actually Does
                        </h2>

                        <p>
                            A formula beautifier simply takes that messy string of text and adds line breaks and indentation. It doesn’t change how the formula works. It just makes it readable for humans.
                        </p>

                        <p>
                            When you run that same nightmare formula through a beautifier, it turns into this:
                        </p>

                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 my-6 font-mono text-sm text-green-900 whitespace-pre-wrap leading-relaxed">
{`=IF(
  ISERROR(
    VLOOKUP(A2, Sheet2!A:D, 4, FALSE)
  ), 
  "Not Found", 
  IF(
    VLOOKUP(A2, Sheet2!A:D, 4, FALSE) > 100, 
    "High", 
    IF(
      VLOOKUP(A2, Sheet2!A:D, 4, FALSE) > 50, 
      "Medium", 
      "Low"
    )
  )
)`}
                        </div>

                        <p>
                            See the difference? You can instantly see the structure. You know exactly which IF handles the errors, which one checks for 100, and which one checks for 50. Debugging this takes 30 seconds instead of 30 minutes.
                        </p>

                        {/* Method 1 */}
                        <h2 id="method-1" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">
                            <span className="text-green-600">03.</span> Method 1: Free Online Tools
                        </h2>

                        <p>
                            If you just need to quickly format a formula and paste it back, use a website. 
                        </p>

                        <p>
                            Sites like <a href="https://www.excelformulabeautifier.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium">ExcelFormulaBeautifier.com</a> do exactly what you’d expect. You paste the ugly formula into the left box. Click "Beautify." The clean version appears on the right. You copy it and paste it back into Excel.
                        </p>

                        <p>
                            I use this method probably 3 times a week when I’m writing complex dashboards for clients. It’s fast and requires zero setup.
                        </p>

                        {/* Method 2 */}
                        <h2 id="method-2" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">
                            <span className="text-green-600">04.</span> Method 2: The Excel Labs Add-in
                        </h2>

                        <p>
                            If you want to do this without leaving Excel, you need the <strong>Excel Labs</strong> add-in. 
                        </p>

                        <p>
                            It’s completely free, built by Microsoft Garage. Once you install it, it adds a new tab to your Excel ribbon. You click on a cell with a long formula, hit the "Format Formula" button, and it automatically indents and breaks the formula right there in the formula bar.
                        </p>

                        <p>
                            This is the best option if you’re building sheets full-time because you don’t have to switch back and forth between your browser and Excel.
                        </p>

                        {/* Method 3 */}
                        <h2 id="method-3" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">
                            <span className="text-green-600">05.</span> Method 3: The Manual Way (Alt + Enter)
                        </h2>

                        <p>
                            You can also format formulas yourself. It takes a bit more work, but you don’t need any tools.
                        </p>

                        <p>
                            Click into the formula bar. Put your cursor right before a comma or an opening bracket. Press <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-bold">Alt + Enter</code> (or <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-bold">Option + Return</code> on Mac). 
                        </p>

                        <p>
                            This forces a line break inside the formula without breaking the actual code. Add a few spaces for indentation, and you’ve manually beautified it. 
                        </p>

                        <p className="text-lg font-semibold text-gray-900 mt-8">
                            Stop trying to read spaghetti formulas. Run them through a beautifier, save your eyesight, and get back to actual work.
                        </p>

                        {/* ── FAQ ── */}
                        <h2 id="faq" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20">
                            <span className="text-green-600">06.</span> Frequently Asked Questions
                        </h2>

                        <div className="space-y-4 my-6">
                            <FAQItem
                                question="Will adding line breaks break my Excel formula?"
                                answer="No. Excel fully supports line breaks inside formulas using Alt + Enter. The formula will calculate exactly the same way it did on a single line. It just looks better to you while you're editing it."
                            />
                            <FAQItem
                                question="Can I beautify an entire worksheet at once?"
                                answer="Not automatically. Most beautifiers work on a single formula at a time. If you have a sheet with 50 messy formulas, you'll need to format them one by one. Excel Labs makes this faster since you don't have to leave the spreadsheet."
                            />
                            <FAQItem
                                question="Does this work in Google Sheets?"
                                answer="Yes and no. The manual method (Alt + Enter) works perfectly in Google Sheets. The online beautifier tools will also format the text for you to paste back in. However, the Excel Labs add-in obviously only works in Microsoft Excel."
                            />
                        </div>

                    </div>
                    {/* ═══════════════ CONTENT END ═══════════════ */}

                    {/* ── Related Posts ── */}
                    <div className="mt-16 border-t border-gray-200 pt-10">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Continue Reading</h2>
                        <div className="grid sm:grid-cols-2 gap-5">
                            {relatedPosts.map((rp) => (
                                <Link
                                    key={rp.id}
                                    href={`/blog/${rp.slug}`}
                                    className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className={`flex items-center justify-center bg-gradient-to-br ${rp.color} h-32`}>
                                        <span className="text-5xl">{rp.emoji}</span>
                                    </div>
                                    <div className="p-5">
                                        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{rp.category}</span>
                                        <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mt-2 mb-1">{rp.title}</h3>
                                        <p className="text-xs text-gray-400">{rp.readTime} min read · {rp.date}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 text-center">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-600 transition-colors">
                            <ArrowLeft size={14} /> Back to all articles
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default BlogPostExcelFormulaBeautifier;