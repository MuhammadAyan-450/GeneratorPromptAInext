'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Copy, RefreshCw, Star, Trash2, Home, ChevronDown,
  Hash, Type, Code, Layers, Settings, Shield, Zap, Globe, HelpCircle, CheckCircle
} from "lucide-react";

// ─── Configuration Constants ──────────────────────────────────────────────────────
const OPTIONS = {
  realism: [
    { value: "realistic", label: "Realistic / Photorealistic" },
    { value: "artistic", label: "Artistic / Illustrated" },
  ],
  moods: [
    { value: "neutral", label: "Neutral" },
    { value: "dramatic", label: "Dramatic / Epic" },
    { value: "peaceful", label: "Peaceful / Serene" },
    { value: "dark", label: "Dark / Moody" },
    { value: "vibrant", label: "Vibrant / Colorful" },
    { value: "mysterious", label: "Mysterious / Ethereal" },
  ],
  lighting: [
    { value: "neutral", label: "Neutral" },
    { value: "dramatic", label: "Dramatic" },
    { value: "golden hour", label: "Golden Hour" },
    { value: "neon", label: "Neon / Cyber" },
    { value: "soft", label: "Soft / Diffused" },
    { value: "backlit", label: "Backlit / Silhouette" },
  ],
  angles: [
    { value: "eye level", label: "Eye Level" },
    { value: "low angle", label: "Low Angle (heroic)" },
    { value: "high angle", label: "High Angle (vulnerable)" },
    { value: "aerial", label: "Aerial / Drone" },
    { value: "close-up", label: "Close-up / Macro" },
  ],
  details: [
    { value: "medium", label: "Medium Detail" },
    { value: "high", label: "High Detail" },
    { value: "ultra", label: "Ultra Detailed / Cinematic" },
    { value: "masterpiece", label: "Masterpiece / 8k" },
  ],
  ratios: [
    { value: "--ar 3:2", label: "3:2 (classic photo)" },
    { value: "--ar 16:9", label: "16:9 (cinematic)" },
    { value: "--ar 9:16", label: "9:16 (vertical)" },
    { value: "--ar 1:1", label: "1:1 (square)" },
    { value: "--ar 2:3", label: "2:3 (portrait)" },
    { value: "--ar 4:5", label: "4:5 (mobile portrait)" },
  ],
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MidjourneyPromptGenerator() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("cinematic");
  const [mood, setMood] = useState("dramatic");
  const [detailLevel, setDetailLevel] = useState("ultra");
  const [realisticArtistic, setRealisticArtistic] = useState("realistic");
  const [lighting, setLighting] = useState("dramatic");
  const [cameraAngle, setCameraAngle] = useState("eye level");
  const [aspectRatio, setAspectRatio] = useState("--ar 3:2");
  const [result, setResult] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("favoriteMidjourneyPrompts");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favoriteMidjourneyPrompts", JSON.stringify(favorites));
    }
  }, [favorites]);

  const buildPrompt = (topicStr, config) => {
    const parts = [];
    if (config.realisticArtistic === "realistic") {
      parts.push(`Ultra-realistic photograph of ${topicStr}, photorealistic, shot on Canon EOS R5, 85mm lens, shallow depth of field, cinematic color grading, 8k resolution, hyper detailed, masterpiece, best quality`);
    } else {
      parts.push(`Highly detailed digital art of ${topicStr}, concept art, intricate details, vibrant colors, epic composition, trending on ArtStation, masterpiece, 8k`);
    }
    if (config.mood !== "neutral") { parts.push(`${config.mood} mood`, `${config.mood} atmosphere`); }
    if (config.lighting !== "neutral") {
      parts.push(`${config.lighting} lighting`);
      if (config.lighting === "dramatic") parts.push("strong shadows and highlights");
      else parts.push(`${config.lighting} tones`);
    }
    if (config.cameraAngle !== "eye level") { parts.push(`${config.cameraAngle} angle shot`); }
    switch (config.detailLevel) {
      case "ultra": parts.push("ultra detailed", "extremely intricate", "razor sharp focus", "8k resolution", "cinematic lighting", "professional photography quality"); break;
      case "high": parts.push("highly detailed", "sharp focus", "4k quality", "professional rendering"); break;
      case "masterpiece": parts.push("masterpiece", "best quality", "ultra-detailed", "8k", "HDR"); break;
      default: parts.push("detailed", "good composition", "sharp"); break;
    }
    parts.push(`${config.aspectRatio} --v 6 --stylize 750 --q 2 --chaos 15`);
    return parts.join(", ");
  };

  const getActiveParams = () => {
    let count = 0;
    if (mood !== "neutral") count++;
    if (lighting !== "neutral") count++;
    if (cameraAngle !== "eye level") count++;
    if (detailLevel !== "medium") count++;
    return count;
  };

  const generatePrompt = () => {
    setError("");
    if (!topic.trim()) { setError("Please enter an image idea or topic first."); setResult(""); return; }
    setIsGenerating(true);
    setTimeout(() => {
      setResult(buildPrompt(topic.trim(), { realisticArtistic, mood, lighting, cameraAngle, detailLevel, aspectRatio }));
      setIsGenerating(false);
    }, 300);
  };

  const copyPrompt = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addToFavorites = () => {
    if (!result || favorites.includes(result)) return;
    setFavorites([...favorites, result]);
  };

  const removeFavorite = (promptToRemove) => {
    setFavorites((prev) => prev.filter((p) => p !== promptToRemove));
  };

  const clearAll = () => { setTopic(""); setResult(""); setError(""); setCopied(false); };

  const wordCount = result.trim() ? result.trim().split(/\s+/).length : 0;
  const charCount = result.length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ── Breadcrumb ── */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="inline-flex items-center gap-1.5 hover:text-sky-600 transition-colors"><Home size={14} /> Home</Link></li>
            <li><span className="text-gray-300">/</span></li>
            <li><Link href="/pages/all-tools" className="hover:text-sky-600 transition-colors">All Tools</Link></li>
            <li><span className="text-gray-300">/</span></li>
            <li><span className="text-gray-900 font-semibold">Midjourney Prompt Generator</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">

        {/* ── Hero ── */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <Settings className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Generate Realistic Midjourney Prompts for Cinematic Photos –{" "}
            <span className="text-sky-600">Free AI Art Prompt Builder</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Create optimized prompts with mood, lighting, camera angle, detail level and aspect ratio. Save your favorites for later.
          </p>
        </div>

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">

          {/* Controls + Output Grid */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Left: Controls */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image Idea / Subject</label>
                <textarea value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. cyberpunk samurai in rainy neon city at night..." rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 text-sm resize-y" />
                {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Style</label>
                  <select value={realisticArtistic} onChange={(e) => setRealisticArtistic(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-800 text-sm">
                    {OPTIONS.realism.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mood</label>
                  <select value={mood} onChange={(e) => setMood(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-800 text-sm">
                    {OPTIONS.moods.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Lighting</label>
                  <select value={lighting} onChange={(e) => setLighting(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-800 text-sm">
                    {OPTIONS.lighting.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Camera Angle</label>
                  <select value={cameraAngle} onChange={(e) => setCameraAngle(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-800 text-sm">
                    {OPTIONS.angles.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Detail Level</label>
                  <select value={detailLevel} onChange={(e) => setDetailLevel(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-800 text-sm">
                    {OPTIONS.details.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Aspect Ratio</label>
                  <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-800 text-sm">
                    {OPTIONS.ratios.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button onClick={generatePrompt} disabled={isGenerating} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-50">
                  {isGenerating ? <RefreshCw size={18} className="animate-spin" /> : <Settings size={18} />}
                  {isGenerating ? "Generating..." : "Generate Prompt"}
                </button>
                <button onClick={clearAll} className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  <RefreshCw size={18} /> Reset
                </button>
              </div>
            </div>

            {/* Right: Output + Favorites */}
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">Generated Prompt</span>
              {result ? (
                <>
                  <div className="bg-gray-900 rounded-2xl p-5 mb-4 flex-1 overflow-x-auto">
                    <pre className="text-sm font-mono leading-relaxed text-green-400 whitespace-pre-wrap">{result}</pre>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={copyPrompt} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-medium transition-colors">
                      <Copy size={14} /> {copied ? "Copied!" : "Copy Prompt"}
                    </button>
                    <button onClick={addToFavorites} disabled={favorites.includes(result)} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors disabled:opacity-40">
                      <Star size={14} fill={favorites.includes(result) ? "currentColor" : "none"} className="text-yellow-500" />
                      {favorites.includes(result) ? "Saved" : "Save"}
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 min-h-[280px] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
                  <Settings size={32} className="mb-3 text-gray-300" />
                  <p className="text-sm">Describe your image idea and click Generate</p>
                </div>
              )}

              {/* Favorites */}
              {favorites.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Star size={16} className="text-yellow-500" fill="currentColor" />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Saved Prompts ({favorites.length})</span>
                  </div>
                  <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                    {favorites.map((fav, i) => (
                      <div key={i} className="group flex justify-between items-start gap-2 p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm hover:border-sky-200 transition-colors">
                        <p className="flex-1 whitespace-pre-wrap font-mono text-xs text-gray-600 pr-3 line-clamp-2" title={fav}>{fav}</p>
                        <button onClick={() => removeFavorite(fav)} className="text-gray-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0" title="Remove">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          {result && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"><div className="flex justify-center text-sky-500 mb-1"><Type size={20} /></div><p className="text-lg font-bold text-gray-800">{wordCount}</p><p className="text-xs text-gray-500 mt-0.5">Words</p></div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"><div className="flex justify-center text-sky-500 mb-1"><Hash size={20} /></div><p className="text-lg font-bold text-gray-800">{charCount}</p><p className="text-xs text-gray-500 mt-0.5">Characters</p></div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"><div className="flex justify-center text-sky-500 mb-1"><Layers size={20} /></div><p className="text-lg font-bold text-gray-800">{getActiveParams()}</p><p className="text-xs text-gray-500 mt-0.5">Parameters</p></div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"><div className="flex justify-center text-sky-500 mb-1"><Code size={20} /></div><p className="text-lg font-bold text-gray-800">{aspectRatio.replace("--ar ", "")}</p><p className="text-xs text-gray-500 mt-0.5">Ratio</p></div>
            </div>
          )}

          {/* Empty State */}
          {!result && !error && (
            <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mt-6">
              <Settings size={32} className="mx-auto mb-3 text-gray-300" />
              <p>Describe your image idea above and click Generate to create your Midjourney prompt</p>
            </div>
          )}
        </div>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Generate Midjourney Prompts in 3 Simple Steps</h2>
          <ol className="space-y-5">
            {[
              { step: "1", title: "Describe Your Subject", desc: "Type your image idea in the text area. Be specific — e.g. 'cyberpunk samurai in rainy neon city at night' works better than just 'samurai'." },
              { step: "2", title: "Customize Settings", desc: "Choose Realistic or Artistic style, pick a mood, lighting, camera angle, detail level, and aspect ratio. Each selection adds optimized keywords to your prompt." },
              { step: "3", title: "Generate & Use", desc: "Click Generate Prompt. Copy the result and paste directly into Midjourney Discord. Save favorites for quick reuse later." },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="w-8 h-8 bg-sky-100 text-sky-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">{item.step}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ─── How It Works ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How Prompt Generation Works</h2>
          <p className="text-gray-500 text-sm mb-6">No server upload. No waiting. Everything happens on your device.</p>
          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Keyword Assembly Engine</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                subject + style + mood + lighting + angle + detail + --ar + --v 6
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">We combine your subject with professionally curated keywords for each setting. Realistic mode uses photography terms (Canon EOS R5, 85mm lens). Artistic mode uses concept art terms (ArtStation, vibrant colors).</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Midjourney v6 Optimization</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                --v 6 --stylize 750 --q 2 --chaos 15
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">Every prompt includes the latest Midjourney v6 parameters with balanced stylization, quality, and chaos settings for consistent, high-quality results across different subjects.</p>
            </div>
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">Privacy First</h3>
              <p className="text-sky-800 text-xs leading-relaxed">All prompt generation happens locally in your browser using JavaScript. No prompts are uploaded, stored, or sent anywhere. Favorites save to your browser's localStorage only. 100% private by design.</p>
            </div>
          </div>
        </section>

        {/* ─── Sample Results ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What Kind of Prompts Can You Generate?</h2>
          <p className="text-gray-500 text-sm mb-6">Real examples with different styles and settings.</p>
          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-lg">Realistic + Dramatic</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Subject</p><p className="font-semibold text-gray-800">cyberpunk samurai</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Settings</p><p className="font-semibold text-gray-800">Dramatic, Low Angle, Ultra</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Best For</p><p className="font-semibold text-gray-800">Epic character art</p></div>
              </div>
            </div>
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded-lg">Artistic + Golden Hour</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Subject</p><p className="font-semibold text-gray-800">forest fairy at dawn</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Settings</p><p className="font-semibold text-blue-600">Golden Hour, Aerial, Masterpiece</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Best For</p><p className="font-semibold text-gray-800">Fantasy concept art</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Who Uses This Midjourney Prompt Generator?</h2>
          <p className="text-gray-500 text-sm mb-6">From artists to marketers — better prompts create better images.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Zap size={20} className="text-sky-600" />, title: "Digital Artists", desc: "Generate consistent, high-quality prompts for character designs, landscapes, and concept art without memorizing Midjourney syntax." },
              { icon: <Code size={20} className="text-green-600" />, title: "Content Creators", desc: "Create stunning visuals for social media, blogs, and videos with cinematic prompts that match your brand aesthetic." },
              { icon: <Globe size={20} className="text-amber-600" />, title: "Marketing Teams", desc: "Produce on-brand AI imagery for campaigns, ads, and presentations with controlled lighting, mood, and composition settings." },
              { icon: <Shield size={20} className="text-violet-600" />, title: "Privacy-Conscious Users", desc: "Generate prompts without uploading to third-party servers. Everything stays on your device — favorites save to localStorage only." },
            ].map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-5 hover:border-sky-200 transition-colors">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SEO Content ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Generate Midjourney Prompts in Your Browser?</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Most online Midjourney prompt generators ask you to paste settings into a web form that sends your request to their servers. That means waiting for responses, worrying about privacy, and sometimes dealing with ads or limits. Our free Midjourney prompt generator works differently — everything happens <strong>inside your browser</strong> using pure JavaScript.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Control every important variable: <strong>realism vs artistic style</strong>, <strong>mood and atmosphere</strong>, <strong>lighting direction</strong>, <strong>camera angle</strong>, <strong>detail level</strong>, and <strong>aspect ratio</strong>. The tool automatically combines your selections into an optimized prompt string ready to paste into Discord.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Each parameter is based on what actually works best in Midjourney v6. Dramatic lighting with Low Angle creates epic, cinematic results. Golden Hour lighting gives warm, natural-looking photos. Masterpiece detail adds keywords like "8k" and "HDR" that push quality to the maximum.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">Privacy Note</h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No prompts are uploaded to any server. No data is stored or tracked. Your content stays on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need prompts for ChatGPT or Claude? Try the{" "}
            <Link href="/tools/chatgpt-prompt-generator" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">ChatGPT Prompt Generator</Link>. 
            Want to extract text from images? The{" "}
            <Link href="/tools/image-to-text" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Image to Text</Link> has you covered.
          </p>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              { q: "How to write a good Midjourney prompt for realistic photos?", a: "Describe your subject clearly, select Realistic mode, choose Dramatic or Golden Hour lighting, set detail to Ultra or Masterpiece, and pick a cinematic aspect ratio like 16:9. Our prompt builder combines all these automatically into an optimized prompt string." },
              { q: "What is the best detail level for Midjourney v6?", a: "For Midjourney v6, Ultra Detailed or Masterpiece detail level produces the best results. These settings add keywords like '8k resolution', 'razor sharp focus', and 'HDR' that help the AI render maximum detail and quality." },
              { q: "Can I save and organize my Midjourney prompts?", a: "Yes. Our tool saves your favorite prompts in your browser's local storage. You can save as many as you want and remove them anytime. No account or signup required." },
              { q: "What aspect ratio should I use for Midjourney?", a: "Use 16:9 for cinematic landscapes, 3:2 for classic photos, 1:1 for Instagram posts, 9:16 for vertical stories, and 2:3 or 4:5 for portrait images. Our tool adds the --ar parameter automatically." },
              { q: "What lighting works best for cinematic Midjourney images?", a: "Dramatic lighting with strong shadows and highlights creates the most cinematic look. Golden Hour lighting gives warm, natural-looking results. Backlit creates striking silhouettes. Soft or Neutral lighting works best for product photos and portraits." },
              { q: "Does this tool work offline?", a: "Yes. Once the page loads, all prompt generation happens locally in your browser. You can use it without an internet connection after the initial load." },
            ].map((item, i) => (
              <div key={i} className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-sky-200 transition-colors duration-300">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left" aria-expanded={openFaq === i}>
                  <h3 className="text-sm md:text-base font-bold text-gray-900 pr-4">{item.q}</h3>
                  <ChevronDown size={22} className={`text-sky-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Related Tools ─── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related AI Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/tools/chatgpt-prompt-generator", title: "ChatGPT Prompt Generator", desc: "Create powerful text prompts for ChatGPT and Claude AI models." },
              { href: "/tools/claude-prompt-generator", title: "Claude Prompt Generator", desc: "Optimized prompts specifically for Claude AI models." },
              { href: "/tools/image-to-text", title: "Image to Text", desc: "Extract text from images and screenshots using OCR." },
              { href: "/tools/emoji-picker", title: "Emoji Picker", desc: "Search & copy emojis for captions and messages." },
              { href: "/tools/word-counter", title: "Word Counter", desc: "Count characters for bios, tweets, and meta descriptions." },
              { href: "/tools/qr-code-generator", title: "QR Code Generator", desc: "Create custom QR codes for links, text, or contact info." },
            ].map((tool) => (
              <Link key={tool.href} href={tool.href} className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-sky-400 transition-all">
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-sky-600 transition-colors">{tool.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}