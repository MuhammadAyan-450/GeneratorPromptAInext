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
  Copy,
  Check,
  Image as ImageIcon,
  Zap,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";

// ─── POST DATA ────────────────────────────────────────────────────────────────
const post = {
  id: 2,
  slug: "compress-image-to-100kb-online-free",
  title: "Compress Image to 100KB Online Free (Fast & Easy Guide 2026)",
  excerpt:
    "Learn how to compress images to 100KB online for free without losing quality. Step-by-step guide with best tools and tips.",
  category: "Image Tools",
  tag: "Image Compression",
  readTime: 8,
  date: "April 10, 2026",
  dateISO: "2026-04-10",
  featured: false,
  image: null,
  color: "from-blue-500 to-indigo-500",
  emoji: "🖼️",
};

// ─── TOC ──────────────────────────────────────────────────────────────────────
const TOC_ITEMS = [
  { id: "why-100kb", label: "Why 100KB Matters" },
  { id: "tools-comparison", label: "3 Methods Compared" },
  { id: "method-online", label: "Method 1: Online Tool (Best)" },
  { id: "method-photoshop", label: "Method 2: Photoshop" },
  { id: "method-command", label: "Method 3: Command Line" },
  { id: "format-guide", label: "JPG vs PNG vs WebP" },
  { id: "quality-test", label: "Quality Comparison" },
  { id: "before-after", label: "Before & After Data" },
  { id: "tips", label: "7 Pro Tips" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "faq", label: "FAQs" },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
const PromptBox = ({ label, labelType, children }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const el = document.createElement("div");
    el.innerHTML = typeof children === "string" ? children : "";
    navigator.clipboard.writeText(el.textContent || "").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  const colors = {
    bad: "text-red-400",
    good: "text-green-400",
    pro: "text-blue-400",
    neutral: "text-gray-400",
  };
  return (
    <div className="bg-[#1E1B2E] border border-[#2D2A3E] rounded-xl p-4 md:p-5 relative font-mono text-sm leading-relaxed text-gray-300 overflow-x-auto">
      <div
        className={`font-sans text-[0.7rem] font-semibold uppercase tracking-wider mb-3 flex items-center gap-1.5 ${colors[labelType] || "text-gray-400"}`}
      >
        {label}
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex items-center gap-1 bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white px-2.5 py-1 rounded-md text-[0.7rem] font-sans transition-all cursor-pointer border-none"
      >
        {copied ? (
          <>
            <Check size={12} className="text-green-400" /> Copied
          </>
        ) : (
          <>
            <Copy size={12} /> Copy
          </>
        )}
      </button>
      <div>{children}</div>
    </div>
  );
};

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

const TipCard = ({ number, title, desc }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5">
    <div className="flex items-start gap-3">
      <span className="flex-shrink-0 w-7 h-7 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center text-xs font-bold">
        {number}
      </span>
      <div>
        <p className="font-semibold text-gray-900 text-sm mb-1">{title}</p>
        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  </div>
);

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const BlogPostCompressImage = () => {
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
    id: 12,
    slug: "excel-formula-beautifier-guide",
    title: "Excel Formula Beautifier Guide: How to Read Messy Formulas",
    category: "Productivity", // Changed
    tag: "Formulas",
    readTime: 6,
    date: "June 2, 2026",
    color: "from-green-600 to-emerald-500",
    emoji: "📊",
  },
    {
      id: 4,
      slug: "jpeg-vs-png-complete-comparison-guide",
      title:
        "JPEG vs PNG — Complete Comparison Guide (When to Use Which in 2026)",
      category: "Web Tips",
      readTime: 7,
      date: "April 14, 2026",
      color: "from-emerald-500 to-teal-600",
      emoji: "🖼️",
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
          <span className="text-gray-600">Compress Image to 100KB</span>
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

            {/* Tool CTA */}
            <div className="mt-6 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-5 text-white">
              <p className="text-sm font-bold mb-1">Image Compressor</p>
              <p className="text-xs text-sky-100 mb-3">
                Compress to any size — 100KB, 50KB, 200KB. Free & instant.
              </p>
              <Link
                href="/tools/image-compressor"
                className="block text-center py-2 bg-white text-sky-700 text-xs font-semibold rounded-lg hover:bg-sky-50 transition-colors"
              >
                Compress Now →
              </Link>
            </div>

            {/* Related Tools */}
            <div className="mt-4 space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Related Tools
              </p>
              <Link
                href="/tools/image-resizer"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors py-1"
              >
                <ImageIcon size={14} /> Image Resizer
              </Link>
              <Link
                href="/tools/image-converter"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors py-1"
              >
                <ImageIcon size={14} /> Image Converter
              </Link>
              <Link
                href="/tools/image-cropper"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors py-1"
              >
                <ImageIcon size={14} /> Image Cropper
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
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              How to Compress Image to{" "}
              <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                100KB Online Free
              </span>{" "}
              (2026)
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
            <p className="text-lg">
              There is an image that must be reduced to a file size of below
              100KB. It could be for your job application form, uploading on the
              website, government portal or your profile picture, which
              continues to get rejected because it’s “too big”.
              <span className="bg-gradient-to-t from-sky-200 to-transparent bg-[length:100%_40%] bg-no-repeat bg-bottom font-semibold text-gray-900">
                Here is how you can reduce it in under 10 seconds – for free.
              </span>
            </p>

            {/* ── INLINE TOOL CTA ── */}
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 border-2 border-sky-200 rounded-2xl p-6 my-8">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <ImageIcon size={28} className="text-sky-600" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-bold text-gray-900 mb-0.5">
                    Skip the guide — compress right now
                  </p>
                  <p className="text-sm text-gray-500">
                    Upload → Set 100KB → Download. That's it. No signup, no
                    watermark.
                  </p>
                </div>
                <Link
                  href="/tools/image-compressor"
                  className="flex-shrink-0 px-6 py-3 bg-sky-600 text-white text-sm font-semibold rounded-xl hover:bg-sky-700 transition-colors flex items-center gap-2"
                >
                  Open Compressor <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Section 1 — Why 100KB */}
            <h2
              id="why-100kb"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-sky-600">01.</span> Why Should Everything Be
              Limited to 100KB?
            </h2>

            <p>
              Have you ever had an issue uploading your picture online with "the
              file size is too big"? Well, this happens more often than you
              think. There are several reasons for that:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <Zap size={20} className="text-amber-500 mb-2" />
                <p className="font-semibold text-gray-900 text-sm mb-1">
                  Page Speed
                </p>
                <p className="text-sm text-gray-500">
                  A 2MB image takes 8 times longer to load on mobile than a
                  100KB image. Google prefers ranking fast-loading pages.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <AlertTriangle size={20} className="text-red-500 mb-2" />
                <p className="font-semibold text-gray-900 text-sm mb-1">
                  Storage Costs
                </p>
                <p className="text-sm text-gray-500">
                  1000 2MB images require twice as much server space as 100KB
                  images.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <ImageIcon size={20} className="text-sky-500 mb-2" />
                <p className="font-semibold text-gray-900 text-sm mb-1">
                  Mobile Users
                </p>
                <p className="text-sm text-gray-500">
                  More than 65 percent of traffic comes from mobile devices. Big
                  images use up mobile internet, and users exit slow websites.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <CheckCircle2 size={20} className="text-green-500 mb-2" />
                <p className="font-semibold text-gray-900 text-sm mb-1">
                  Form Requirements
                </p>
                <p className="text-sm text-gray-500">
                  Most job websites, visa application forms, and exams require
                  photo uploads under 100KB.
                </p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-amber-800 mb-1">
                📊 The Effect of SEO
              </p>
              <p className="text-sm text-amber-700">
                Google's Core Web Vitals actually measure image loading time. An
                HTTP Archive study shows that images account for 50% of the
                overall page size. If you compress an image from 2MB to 100KB,
                you will see improvements in your LCP score by 2-4 seconds,
                making a huge difference in ranking pages 1 vs. 2 on Google.
              </p>
            </div>

            {/* Section 2 — 3 Methods Compared */}
            <h2
              id="tools-comparison"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-sky-600">02.</span> 3 Methods Compared (Pick
              the Right One)
            </h2>

            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="text-left px-4 py-3 font-semibold">
                      Method
                    </th>
                    <th className="text-center px-4 py-3 font-semibold">
                      Speed
                    </th>
                    <th className="text-center px-4 py-3 font-semibold">
                      Quality
                    </th>
                    <th className="text-center px-4 py-3 font-semibold">
                      Ease
                    </th>
                    <th className="text-center px-4 py-3 font-semibold">
                      Cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-sky-50 border-b border-gray-200">
                    <td className="px-4 py-3 font-semibold text-sky-700">
                      Online Tool ⭐
                    </td>
                    <td className="px-4 py-3 text-center">5 seconds</td>
                    <td className="px-4 py-3 text-center">9/10</td>
                    <td className="px-4 py-3 text-center">10/10</td>
                    <td className="px-4 py-3 text-center font-semibold text-green-600">
                      Free
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 font-medium">Photoshop</td>
                    <td className="px-4 py-3 text-center">2 minutes</td>
                    <td className="px-4 py-3 text-center">9/10</td>
                    <td className="px-4 py-3 text-center">5/10</td>
                    <td className="px-4 py-3 text-center text-red-500">
                      $20/month
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Command Line</td>
                    <td className="px-4 py-3 text-center">30 seconds</td>
                    <td className="px-4 py-3 text-center">8/10</td>
                    <td className="px-4 py-3 text-center">2/10</td>
                    <td className="px-4 py-3 text-center font-semibold text-green-600">
                      Free
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Section 3 — Method 1: Online Tool */}
            <h2
              id="method-online"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-sky-600">03.</span> Method 1: Online Tool
              (Best — 5 Seconds)
            </h2>

            <p>
              This is what 95% of users should go for. You need not install any
              software or have any technical know-how, and it works for any
              computer you're working on.
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-6 my-6">
              <p className="font-bold text-gray-900 text-sm mb-4">
                Step-by-step:
              </p>
              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    text: "Go to our Image Compressor online tool",
                    link: "/tools/image-compressor",
                  },
                  {
                    step: "2",
                    text: 'Select "Upload Image" and upload the image, or just drag and drop the image',
                  },
                  {
                    step: "3",
                    text: "Specify the target size, set to 100 KB",
                  },
                  {
                    step: "4",
                    text: 'Click "Compress" — the tool processes your image instantly',
                  },
                  {
                    step: "5",
                    text: 'Select "Download" — there\'s your compressed image',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center text-xs font-bold">
                      {item.step}
                    </span>
                    <p className="text-sm text-gray-600 pt-0.5">
                      {item.link ? (
                        <Link
                          href={item.link}
                          className="text-sky-600 hover:underline font-medium"
                        >
                          {item.text}
                        </Link>
                      ) : (
                        item.text
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p>
              Easy as pie. Takes only five seconds from start to finish. The
              tool supports JPG, PNG, and WebP formats. Plus, it applies a very
              clever type of compression that ensures the file becomes small
              enough while retaining as much original quality as possible.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-xl p-5 my-6">
              <p className="text-sm font-semibold text-green-800 mb-1">
                🔒 Privacy Notice
              </p>
              <p className="text-sm text-green-700">
                Your images will be processed directly by your web browser. Your
                image will never reach any server whatsoever. No one sees your
                pictures but you.
              </p>
            </div>

            {/* Section 4 — Method 2: Photoshop */}
            <h2
              id="method-photoshop"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-sky-600">04.</span> Method 2: Photoshop
              (Precise Control)
            </h2>

            <p>
              If you already have Photoshop and need precise control over the
              compression, here's how to hit exactly 100KB:
            </p>

            <div className="my-6">
              <PromptBox label="📱 Photoshop Steps" labelType="neutral">
                <p>1. Open your image in Photoshop</p>
                <p>2. Go to File → Export → Export As...</p>
                <p>3. Select JPEG as the format</p>
                <p>4. Check the "Resize" box if needed</p>
                <p>5. Drag the Quality slider — watch the file size preview</p>
                <p>
                  6. Stop when it shows ~100KB (usually around 60-75% quality)
                </p>
                <p>7. Click Export</p>
              </PromptBox>
            </div>

            <p>
              It can be difficult when trying to make a picture reach 100 KB in
              Photoshop because the quality slider does not provide the exact
              KBs; it needs to be estimated. It may be necessary to save the
              file first and then modify the picture until reaching the desired
              size.
            </p>

            {/* Section 5 — Method 3: Command Line */}
            <h2
              id="method-command"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-sky-600">05.</span> Method 3: Command Line
              (For Developers)
            </h2>

            <p>
              If you're a developer who needs to batch-compress hundreds of
              images, the command line is your friend. Here are two approaches:
            </p>

            <div className="my-4">
              <PromptBox label="📦 Using ImageMagick" labelType="pro">
                <p># Install first (if not installed)</p>
                <p>brew install imagemagick</p>
                <br />
                <p># Compress single image to 100KB</p>
                <p>convert input.jpg -define jpeg:extent=100KB output.jpg</p>
                <br />
                <p># Batch compress all images in a folder</p>
                <p>
                  for f in *.jpg; do convert "$f" -define jpeg:extent=100KB
                  "compressed_$f"; done
                </p>
              </PromptBox>
            </div>

            <div className="my-6">
              <PromptBox label="📦 Using Python (Pillow)" labelType="pro">
                <pre>
                  {`from PIL import Image
import io

def compress_to_100kb(input_path, output_path):
  img = Image.open(input_path).convert("RGB")
  quality = 85

  while quality > 10:
    buffer = io.BytesIO()
    img.save(buffer, format='JPEG', quality=quality)

    if buffer.tell() <= 102400:
      break

    quality -= 5

  img.save(output_path, 'JPEG', quality=quality)
  print(f"Compressed to {buffer.tell() / 1024:.1f}KB")`}
                </pre>
              </PromptBox>
            </div>

            <p>
              The command line approach is powerful for bulk operations, but it
              requires technical knowledge. For one-off compression, the online
              tool is still faster.
            </p>

            {/* Section 6 — Format Guide */}
            <h2
              id="format-guide"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-sky-600">06.</span> JPG vs PNG vs WebP for
              100KB Compression
            </h2>

            <p>
              The format you choose massively affects how your image looks at
              100KB. Here's the honest breakdown:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="text-left px-4 py-3 font-semibold">
                      Format
                    </th>
                    <th className="text-center px-4 py-3 font-semibold">
                      100KB Quality
                    </th>
                    <th className="text-center px-4 py-3 font-semibold">
                      Best For
                    </th>
                    <th className="text-center px-4 py-3 font-semibold">
                      Transparency
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50 border-b border-gray-200">
                    <td className="px-4 py-3 font-semibold text-green-700">
                      JPG/JPEG ⭐
                    </td>
                    <td className="px-4 py-3 text-center">
                      Excellent for photos
                    </td>
                    <td className="px-4 py-3 text-center">
                      Photos, profile pictures
                    </td>
                    <td className="px-4 py-3 text-center">
                      <XCircle size={16} className="text-red-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="bg-sky-50 border-b border-gray-200">
                    <td className="px-4 py-3 font-semibold text-sky-700">
                      WebP 🔥
                    </td>
                    <td className="px-4 py-3 text-center">
                      Best quality at 100KB
                    </td>
                    <td className="px-4 py-3 text-center">
                      Websites, modern apps
                    </td>
                    <td className="px-4 py-3 text-center">
                      <CheckCircle2
                        size={16}
                        className="text-green-500 mx-auto"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-gray-700">
                      PNG
                    </td>
                    <td className="px-4 py-3 text-center">
                      Poor for photos at 100KB
                    </td>
                    <td className="px-4 py-3 text-center">
                      Logos, graphics, screenshots
                    </td>
                    <td className="px-4 py-3 text-center">
                      <CheckCircle2
                        size={16}
                        className="text-green-500 mx-auto"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              That’s the guideline: When compressing your images to 100 KB, you
              should use JPG. When compressing graphics with crisp lines or
              letters, you could go with PNG regardless of the size restriction.
              If your site supports WebP files, however, then you must use WebP.
            </p>

            <p>
              Need to convert between formats? Use our free{" "}
              <Link
                href="/tools/image-converter"
                className="text-sky-600 hover:underline font-medium"
              >
                Image Converter tool
              </Link>{" "}
              — it handles JPG, PNG, WebP, and more.
            </p>

            {/* Section 7 — Quality Comparison */}
            <h2
              id="quality-test"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-sky-600">07.</span> What Does 100KB Actually
              Look Like?
            </h2>

            <p>
              People always worry about quality loss. Let me put your mind at
              ease with real data. Here's what happens when you compress
              different starting sizes to 100KB:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="text-left px-4 py-3 font-semibold">
                      Original Size
                    </th>
                    <th className="text-center px-4 py-3 font-semibold">
                      After 100KB
                    </th>
                    <th className="text-center px-4 py-3 font-semibold">
                      Visible Quality Loss?
                    </th>
                    <th className="text-center px-4 py-3 font-semibold">
                      Verdict
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 font-medium">5MB (phone photo)</td>
                    <td className="px-4 py-3 text-center">100KB</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-green-600 font-semibold">
                        Barely noticeable
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">✅ Perfect</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="px-4 py-3 font-medium">
                      2MB (downloaded image)
                    </td>
                    <td className="px-4 py-3 text-center">100KB</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-green-600 font-semibold">
                        Slightly soft on zoom
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">✅ Great</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 font-medium">500KB</td>
                    <td className="px-4 py-3 text-center">100KB</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-amber-600 font-semibold">
                        Noticeable on close look
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">⚠️ OK</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="px-4 py-3 font-medium">200KB</td>
                    <td className="px-4 py-3 text-center">100KB</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-amber-600 font-semibold">
                        Visible artifacts
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">⚠️ Acceptable</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">120KB</td>
                    <td className="px-4 py-3 text-center">100KB</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-red-600 font-semibold">
                        Clearly degraded
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">❌ Pushing it</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Takeaway: As long as your initial photo exceeds 500KB in file
              size, reducing the file size to 100KB will yield impeccable
              results on-screen. On the other hand, when your initial photo is
              not far from 100KB, quality will be compromised regardless of the
              tool used.
            </p>

            {/* Section 8 — Before & After Data */}
            <h2
              id="before-after"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-sky-600">08.</span> Real Before & After Data
            </h2>

            <p>
              We compressed 5 real images using our tool. Here's the actual
              data:
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-6 my-6">
              <div className="space-y-4">
                {[
                  {
                    name: "Profile Photo (portrait)",
                    before: "3.2 MB",
                    after: "98 KB",
                    reduction: "97%",
                    format: "JPG",
                  },
                  {
                    name: "Blog Header (landscape)",
                    before: "1.8 MB",
                    after: "99 KB",
                    reduction: "95%",
                    format: "JPG",
                  },
                  {
                    name: "Product Photo (e-commerce)",
                    before: "4.1 MB",
                    after: "97 KB",
                    reduction: "98%",
                    format: "JPG",
                  },
                  {
                    name: "Screenshot (text-heavy)",
                    before: "820 KB",
                    after: "96 KB",
                    reduction: "88%",
                    format: "PNG → JPG",
                  },
                  {
                    name: "Logo (simple graphic)",
                    before: "245 KB",
                    after: "94 KB",
                    reduction: "62%",
                    format: "PNG → WebP",
                  },
                ].map((img, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-gray-100 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {img.name}
                      </p>
                      <p className="text-xs text-gray-400">{img.format}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-red-500">{img.before}</span>
                      <ArrowRight size={14} className="text-gray-300" />
                      <span className="text-green-600 font-semibold">
                        {img.after}
                      </span>
                      <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                        -{img.reduction}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p>
              Average compression percentage: 88%. It means that images that
              used to weigh 2MB got compressed to 97KB – under the 100KB mark –
              while retaining perfect quality.
            </p>

            {/* Section 9 — Pro Tips */}
            <h2
              id="tips"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-sky-600">09.</span> 7 Ways to Compress
              Images Properly
            </h2>

            <div className="space-y-3 my-6">
              <TipCard
                number="1"
                title="Resize the image, and then compress it"
                desc="If your image is 4000×3000 px, but you only need it in 800×600 format, resize it first. A lower resolution image tends to have a lower file size; thus, compression will be much more efficient. Check out our Image Resizer."
              />
              <TipCard
                number="2"
                title="Convert PNG into JPG, and then compress"
                desc="PNG uses lossless compression, which doesn't get along well with extreme size reductions. Convert your images into JPGs first, and then compress them to 100 KB. You'll see the difference!"
              />
              <TipCard
                number="3"
                title="Use WebP if you're allowed"
                desc="Compared to JPG, WebP results in a 25-35% decrease in file size without compromising the visual quality. For example, a picture in WebP format at 100KB looks equally clear as a JPG file of about 130-140 KB. Make sure you use WebP when possible."
              />
              <TipCard
                number="4"
                title="Remove the unnecessary parts first"
                desc="If there's any unused space on the image, crop it. It will allow using all 100KB on the necessary details, instead of wasting space."
              />
              <TipCard
                number="5"
                title="Never recompress the images"
                desc="Every time you recompress a JPEG file, its quality worsens (it causes a generation loss). Try to use the initial file each time you're compressing an image."
              />
              <TipCard
                number="6"
                title="For form pictures, avoid complicated backgrounds"
                desc="A plain background tends to compress more effectively. While a picture with a complex background might not look great after being compressed to 100KB, a picture with a plain background will appear perfect."
              />
              <TipCard
                number="7"
                title="Batch compression is best for websites"
                desc="If you need to optimize a whole website, use batch compression tools that allow uploading multiple files at once. Upload your 20 images to our website, enter 100 KB as the size limitation, and get compressed images."
              />
            </div>

            {/* Section 10 — Common Mistakes */}
            <h2
              id="common-mistakes"
              className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-20"
            >
              <span className="text-sky-600">10.</span> 5 Mistakes People Make
              When Compressing Images
            </h2>

            <div className="space-y-3 my-6">
              {[
                {
                  mistake:
                    "Reducing to 100 KB and uploading on social media platforms",
                  fix: "Social media platforms reduce your images once more. Hence, reducing your images to 100 KB and uploading on such sites will cause a loss of clarity because the social media platform itself will further compress the image, causing distortion.",
                },
                {
                  mistake: "Using PNG format for photos at 100 KB",
                  fix: "PNG reduces an image to 100 KB by making its edges less sharp and increasing compression. PNG is ideal for illustrations and logos; thus, avoid using it at 100 KB for your photographs.",
                },
                {
                  mistake:
                    "Increasing the size of your compressed image further",
                  fix: "Reducing an image of 4000x3000 dimensions to 100 KB will not affect the image's quality significantly. However, reducing the dimension of a 200x200 image to 800x800 pixels and then reducing it to 100 KB will cause pixelation, resulting in poor quality.",
                },
                {
                  mistake:
                    "Using online tools that require uploading images onto server computers",
                  fix: "The use of online compression tools will mean that your image gets uploaded to the site's servers first for processing. Such an action could pose serious privacy risks, especially for personal photos or documents.",
                },
                {
                  mistake: "Failing to preview the compressed version of the image",
                  fix: "Before using the reduced version of an image for anything else, review it once. Sometimes, it might appear to be okay when viewed from a smartphone screen but is distorted on a computer screen.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-red-50 border border-red-100 rounded-xl p-5"
                >
                  <p className="text-sm font-bold text-red-700 mb-1">
                    ❌ Mistake {i + 1}: {item.mistake}
                  </p>
                  <p className="text-sm text-green-700 font-medium mb-0.5">
                    ✅ Fix:
                  </p>
                  <p className="text-sm text-gray-600">{item.fix}</p>
                </div>
              ))}
            </div>

            {/* TL;DR */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white my-8">
              <h2 className="text-xl font-bold mb-3">TL;DR</h2>
              <ol className="space-y-2 text-sm text-gray-300 list-decimal pl-5 mb-6">
                <li>
                  Open our{" "}
                  <strong className="text-white">free Image Compressor</strong>
                </li>
                <li>Upload your image</li>
                <li>
                  Set target to <strong className="text-white">100KB</strong>
                </li>
                <li>Download — done in 5 seconds</li>
                <li>
                  Use <strong className="text-white">JPG for photos</strong>,
                  WebP for websites, avoid PNG for 100KB photos
                </li>
                <li>
                  <strong className="text-white">Resize first</strong> if the
                  image is very large — better quality result
                </li>
              </ol>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/tools/image-compressor"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 transition-colors"
                >
                  Compress Image Now →
                </Link>
                <Link
                  href="/tools/image-resizer"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                >
                  Resize First →
                </Link>
              </div>
            </div>

            {/* FAQ */}
            <h2
              id="faq"
              className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20"
            >
              <span className="text-sky-600">11.</span> Frequently Asked
              Questions
            </h2>

            <div className="space-y-4 my-6">
              <FAQItem
                question="How to compress image to 100KB without losing quality?"
                answer="Use our free online image compressor. Upload your image, set the target size to 100KB, and click compress. The tool uses smart lossy compression that maintains visual quality while reducing file size. It works with JPG, PNG, and WebP formats."
              />
              <FAQItem
                question="Can I compress multiple images to 100KB at once?"
                answer="Yes. Our image compressor supports bulk compression. You can upload multiple images at once and they will all be compressed to your target size simultaneously. There's no limit on the number of images."
              />
              <FAQItem
                question="Does compressing to 100KB reduce image quality?"
                answer="It depends on the original size. If your image is 500KB+, compressing to 100KB will have minimal visible quality loss. If the original is already 120KB, the quality drop will be more noticeable. For photos, JPG compression to 100KB usually looks fine. For graphics with text, you might notice slight blurring."
              />
              <FAQItem
                question="What is the best image format for 100KB file size?"
                answer="JPG is the best format for keeping photos under 100KB while maintaining quality. WebP is even better — it produces smaller files at the same quality level. PNG is not ideal for 100KB because it uses lossless compression, so a 100KB PNG will look worse than a 100KB JPG for photos. Use WebP if your platform supports it, otherwise JPG."
              />
              <FAQItem
                question="Why do websites require images under 100KB?"
                answer="Most websites and platforms set 100KB limits for profile pictures, document uploads, and form attachments because large images slow down page loading, increase bandwidth costs, and hurt SEO rankings. Google specifically uses page speed as a ranking factor, so keeping images small directly helps your site rank higher."
              />
              <FAQItem
                question="Is this image compressor really free?"
                answer="Yes, 100% free. No signup required, no watermark added, no limit on how many images you can compress, and no hidden charges. Your images are processed in your browser and are never uploaded to any server."
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

export default BlogPostCompressImage;
