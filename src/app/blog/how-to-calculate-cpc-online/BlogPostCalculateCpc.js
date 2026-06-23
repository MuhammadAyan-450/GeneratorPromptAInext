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
    id: 14,
    slug: "how-to-calculate-cpc-online",
    title: "How to Calculate CPC Online (Without Wasting Ad Budget)",
    excerpt:
        "I blew $200 on 10 clicks before I understood CPC. Here's the dead-simple formula and the free tools to track it.",
    category: "Advertising",
    tag: "CPC",
    readTime: 5,
    date: "June 28, 2026",
    dateISO: "2026-06-28",
    featured: false,
    color: "from-pink-500 to-fuchsia-600",
    emoji: "💸",
};

const TOC_ITEMS = [
    { id: "the-mistake", label: "My $200 Mistake" },
    { id: "the-formula", label: "The CPC Formula" },
    { id: "real-examples", label: "Real Math Examples" },
    { id: "how-online", label: "How to Do It Online" },
    { id: "good-cpc", label: "What is a Good CPC?" },
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

const BlogPostCalculateCpc = () => {
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
            id: 3,
            slug: "cpm-formula-how-to-calculate",
            title: "CPM Formula — How to Calculate Cost Per Mille",
            category: "Advertising",
            color: "from-emerald-500 to-teal-600",
            emoji: "🧮",
            readTime: 5,
            date: "May 20, 2026",
        },
        {
            id: 5,
            slug: "chatgpt-prompt-generator-guide",
            title: "ChatGPT Prompt Generator Guide: Stop Guessing, Start Controlling",
            category: "Prompt Engineering",
            color: "from-indigo-500 to-purple-600",
            emoji: "⚡",
            readTime: 7,
            date: "June 15, 2026",
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
                    <span className="text-gray-600 truncate max-w-xs inline-block align-bottom">Calculate CPC Online</span>
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

                        <div className="mt-6 bg-gradient-to-br from-pink-500 to-fuchsia-600 rounded-2xl p-5 text-white">
                            <p className="text-sm font-bold mb-1">Free AI Text Humanizer</p>
                            <p className="text-xs text-pink-100 mb-3">Make any AI text sound naturally human-written.</p>
                            <Link href="/tools/ai-text-humanizer" className="block text-center py-2 bg-white text-fuchsia-700 text-xs font-semibold rounded-lg hover:bg-fuchsia-50 transition-colors">
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
                            How to Calculate CPC Online:{" "}
                            <span className="bg-gradient-to-r from-pink-500 to-fuchsia-600 bg-clip-text text-transparent">
                                Stop Wasting Ad Budget
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
                            I once spent $200 on a Facebook ad campaign and felt pretty good about it. 
                        </p>

                        <p>
                            The dashboard showed lots of activity. People were seeing my ad. But when I checked my bank account and my website analytics, I realized something horrifying. 
                        </p>

                        <p>
                            I had paid $200 for exactly 10 clicks. 
                        </p>

                        <p>
                            I didn’t know how to calculate CPC (Cost Per Click). I was blindly trusting the ad platform’s "optimization" and burning cash. If I had known the simple math behind CPC, I would have turned that campaign off on day one.
                        </p>

                        {/* The Mistake */}
                        <h2 id="the-mistake" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">
                            <span className="text-fuchsia-600">01.</span> The Mistake Most Beginners Make
                        </h2>

                        <p>
                            Beginners look at the total budget. "I spent $50 today, that’s not bad." 
                        </p>

                        <p>
                            But spending $50 is irrelevant if you got zero clicks. Or worse, if you paid $10 for a single click to a blog post that makes you $0. 
                        </p>

                        <p>
                            CPC strips away the vanity metrics. It tells you exactly what you are paying for the only thing that actually matters—someone taking action.
                        </p>

                        {/* The Formula */}
                        <h2 id="the-formula" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">
                            <span className="text-fuchsia-600">02.</span> The CPC Formula
                        </h2>

                        <p>
                            You don't need an accounting degree for this. The formula is incredibly straightforward.
                        </p>

                        <div className="bg-gray-900 text-white rounded-2xl p-6 my-6 text-center">
                            <p className="text-sm text-gray-400 mb-2 font-medium">THE FORMULA</p>
                            <p className="text-2xl md:text-3xl font-extrabold font-mono tracking-wide">
                                CPC = Total Cost ÷ Total Clicks
                            </p>
                        </div>

                        <p>
                            That’s it. You take the total amount of money you spent, divide it by the number of clicks you received, and you get your exact cost per click. No multiplying by a thousand like CPM. Just simple division.
                        </p>

                        {/* Real Examples */}
                        <h2 id="real-examples" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">
                            <span className="text-fuchsia-600">03.</span> Let’s Look at the Math
                        </h2>

                        <p>
                            Let’s go back to my $200 disaster, and compare it to a campaign I ran later after I learned what I was doing.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 my-6">
                            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                                <p className="text-sm font-bold text-red-600 mb-3">❌ The Expensive Campaign</p>
                                <ul className="text-sm text-red-800 space-y-1 font-mono">
                                    <li>• Total Spend: $200</li>
                                    <li>• Total Clicks: 10</li>
                                    <li>• CPC = $200 ÷ 10</li>
                                    <li className="font-bold text-lg mt-2">• CPC = $20.00</li>
                                </ul>
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                                <p className="text-sm font-bold text-green-600 mb-3">✅ The Profitable Campaign</p>
                                <ul className="text-sm text-green-800 space-y-1 font-mono">
                                    <li>• Total Spend: $50</li>
                                    <li>• Total Clicks: 250</li>
                                    <li>• CPC = $50 ÷ 250</li>
                                    <li className="font-bold text-lg mt-2">• CPC = $0.20</li>
                                </ul>
                            </div>
                        </div>

                        <p>
                            In the first example, I was paying $20 for a single visitor. In the second, I was paying 20 cents. The second campaign brought me actual customers because the math made sense from the start.
                        </p>

                        {/* How online */}
                        <h2 id="how-online" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">
                            <span className="text-fuchsia-600">04.</span> How to Calculate It Online
                        </h2>

                        <p>
                            Honestly, you usually don't have to do the math yourself. 
                        </p>

                        <p>
                            If you are running ads on Google or Facebook, they calculate CPC for you in real-time right inside the dashboard. You just look at the "CPC" column.
                        </p>

                        <p>
                            But if you are buying ads directly from a website or a newsletter, you’ll need to calculate it yourself. Just punch the numbers into a free online calculator like <a href="https://www.omnicalculator.com/finance/cpc" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium">OmniCalculator</a> or Calculator.net. You plug in your spend and clicks, and it spits out the number instantly.
                        </p>

                        <p>
                            I still do the manual math in my head sometimes just to keep my brain sharp, but using an online tool is faster and prevents silly division errors.
                        </p>

                        {/* Good CPC */}
                        <h2 id="good-cpc" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20">
                            <span className="text-fuchsia-600">05.</span> What is a "Good" CPC?
                        </h2>

                        <p>
                            It completely depends on what you are selling. 
                        </p>

                        <p>
                            If you sell a $2,000 software subscription, a $10 CPC is fantastic. You only need one sale out of 200 clicks to break even. If you sell a $15 ebook, a $10 CPC means you are losing money on every single click.
                        </p>

                        <p>
                            A good rule of thumb: your CPC should be at most 10% to 20% of your profit per sale. If you make $50 profit per sale, your CPC should ideally stay under $5 to $10.
                        </p>

                        <p className="text-lg font-semibold text-gray-900 mt-8">
                            Don’t let ad platforms spend your money blindly. Know your CPC, know your numbers, and turn off the campaigns that are bleeding you dry.
                        </p>

                        {/* ── FAQ ── */}
                        <h2 id="faq" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20">
                            <span className="text-fuchsia-600">06.</span> Frequently Asked Questions
                        </h2>

                        <div className="space-y-4 my-6">
                            <FAQItem
                                question="Is CPC the same as PPC?"
                                answer="No. PPC (Pay-Per-Click) is the name of the advertising model where you pay for clicks. CPC (Cost Per Click) is the actual metric—the dollar amount you end up paying for each of those clicks."
                            />
                            <FAQItem
                                question="Should I aim for the lowest CPC possible?"
                                answer="Not always. A super low CPC might mean your ad is showing to the wrong audience who aren't actually interested in buying. A slightly higher CPC with a high conversion rate is much better than a rock-bottom CPC with zero sales."
                            />
                            <FAQItem
                                question="Why is my CPC so high?"
                                answer="Usually, it comes down to three things: your industry is highly competitive (like insurance or legal), your ad relevance score is low, or your targeting is too broad. Tighten your audience and rewrite your ad copy to match their search intent."
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

export default BlogPostCalculateCpc;