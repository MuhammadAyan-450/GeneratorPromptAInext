'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Copy, RefreshCw, Star, Trash2, Home, ChevronDown,
  Zap, Shield, HelpCircle, FileText, Play, BarChart3, Globe, CheckCircle2
} from 'lucide-react';

// ─── High-quality, structured YouTube prompt templates (2025–2026 viral style) ──
const YOUTUBE_TEMPLATES = [
  "Write a high-retention YouTube video script about {topic}. Start with a shocking/curiosity hook in first 5–8 seconds, use storytelling + pattern interrupts every 30–60s, include 5–8 clear value sections, b-roll & visual suggestions, end with very strong benefit-driven CTA (subscribe, like, comment, bell, share). Optimize for 10–18 min watch time.",
  "Create complete YouTube video including: click-worthy title (70 chars), attention-grabbing hook script, detailed outline (timestamps), full spoken script with natural language, b-roll/visual ideas, end-screen & cards suggestions for {topic}. Target 12–20 min length.",
  "Generate 10 high-CTR YouTube video ideas + titles + thumbnail concepts + 3-line hook scripts about {topic}. Focus on curiosity, emotion, controversy, transformation, secrets, lists, challenges — formats proven to go viral in 2025–2026.",
  "Write a fast-paced, vertical YouTube Shorts script (under 60 seconds) about {topic} — extremely strong 3-second hook, quick value delivery, text overlays suggestions, trending sound recommendation, powerful CTA in last 5 seconds.",
  "Create emotional storytelling YouTube script about {topic} — personal anecdote intro, problem-agitation-solution structure, cinematic descriptions, music & pacing cues, deep emotional connection, strong motivational CTA.",
  "Write step-by-step tutorial / how-to YouTube script for {topic} — beginner-friendly, clear timestamps every 30–60s, screen recording & voice-over instructions, pro tips & common mistakes section, final recap & CTA.",
  "Make entertaining reaction/commentary-style script reacting to {topic} — funny commentary, memes & jokes, genuine reactions, trending clips suggestions, community engagement questions, strong subscribe push.",
  "Generate top 10 / listicle video script about {topic} — suspenseful countdown format, surprising facts, visual countdown graphics, smooth transitions, cliffhanger between items, powerful outro CTA.",
  "Write brutally honest product review / comparison script for {topic} — pros/cons table, real usage footage ideas, alternatives comparison, personal verdict, affiliate disclaimer, strong buying CTA.",
  "Create vlog / day-in-the-life script featuring {topic} — casual talking-head style, natural storytelling, behind-the-scenes feel, daily routine integration, emotional/relatable moments, soft CTA.",
  "Write cinematic documentary-style narration script about {topic} — deep voice-over, historical context, expert quote style, b-roll & stock footage suggestions, dramatic music cues, thought-provoking ending.",
  "Generate high-energy challenge / experiment video script testing {topic} — clear rules, before/after footage plan, funny fails & wins, time-lapse ideas, shocking results reveal, viral share CTA.",
  "Create Q&A / myth-busting script answering top 10 viewer questions about {topic} — fast cuts, text overlays for questions, honest answers, myth vs fact graphics, community shoutout, strong subscribe CTA.",
  "Write motivational / self-improvement script about {topic} — emotional story arc, mindset shifts, actionable steps, inspiring quotes, cinematic visuals, very powerful life-changing CTA.",
  "Generate seasonal/trending video script connecting {topic} to current events/holidays/trends — timely hook, relevance explanation, viral angle, shareable moments, urgent CTA."
];

// ─── Helper Functions (Outside Component) ─────────────────────────────────────
const generatePromptLogic = (topic, videoType, lengthFormat, tone, ctaStrength, includeTitlesThumbs) => {
  let templatePool = YOUTUBE_TEMPLATES;

  if (videoType !== 'random') {
    templatePool = YOUTUBE_TEMPLATES.filter(t => t.toLowerCase().includes(videoType.toLowerCase()));
    if (templatePool.length === 0) templatePool = YOUTUBE_TEMPLATES;
  }

  const chosenTemplate = templatePool[Math.floor(Math.random() * templatePool.length)];
  let prompt = chosenTemplate.replaceAll('{topic}', topic.trim());

  // Length / format injection
  if (lengthFormat === 'shorts') {
    prompt += " Format strictly as vertical YouTube Shorts (under 60 seconds), extremely fast-paced, strong 3-second hook, big text overlays, trending sound suggestion.";
  } else if (lengthFormat === 'short') {
    prompt += " Target 4–8 minute length — punchy, high-energy, minimal fluff.";
  } else if (lengthFormat === 'medium') {
    prompt += " Aim for 10–18 minute sweet spot — perfect pacing, chapters/timestamps, high retention structure.";
  } else if (lengthFormat === 'long') {
    prompt += " Write detailed long-form 18–30 minute script — deep dive, storytelling, multiple examples, chapters.";
  }

  // Tone injection
  if (tone !== 'energetic') {
    prompt += ` Use ${tone} tone throughout — make it feel ${tone === 'casual' ? 'like talking to a friend' : tone === 'professional' ? 'polished and authoritative' : tone === 'storytelling' ? 'deeply emotional and cinematic' : 'funny and entertaining with jokes'}.`;
  }

  // CTA strength
  if (ctaStrength === 'soft') {
    prompt += " End with gentle, natural call-to-action.";
  } else if (ctaStrength === 'strong') {
    prompt += " Finish with strong, benefit-focused CTA — ask to like, subscribe, comment specific question, turn on notifications.";
  } else if (ctaStrength === 'very-strong') {
    prompt += " End with extremely powerful, urgent, emotion-driven CTA — push hard for subscribe, bell, comment, share, join community.";
  }

  // Titles & thumbnails
  if (includeTitlesThumbs) {
    prompt += " Also generate: 8 high-CTR title variations (curiosity, number, how-to, emotional), 5 thumbnail concepts (text overlay ideas, color scheme, emotion/face), and 3 hook lines for first 5 seconds.";
  }

  return prompt;
};

// ─── FAQ Data (Sync with page.js JSON-LD) ─────────────────────────────────────
const FAQS = [
  {
    q: 'How to generate viral YouTube video scripts free?',
    a: 'Enter your video topic, choose format (Shorts, Tutorial, Vlog, etc.), select tone and length, then click Generate. The tool creates a highly detailed prompt optimized for ChatGPT/Claude to write a viral-ready script.',
  },
  {
    q: 'Does this tool work for YouTube Shorts?',
    a: 'Yes! Select "YouTube Shorts" in the Video Format dropdown or choose "Shorts (60s)" in Target Length. The generated prompt will specifically request a fast-paced, vertical format with strong hooks.',
  },
  {
    q: 'Can I save my favorite prompts?',
    a: 'Yes. Click the Star icon next to any generated prompt to save it to your Favorites list. These are stored locally in your browser, so they remain private and persist across sessions.',
  },
  {
    q: 'What makes these prompts "viral"?',
    a: 'Our templates are based on 2025-2026 best practices: strong hooks in the first 5 seconds, pattern interrupts, high-retention structures, and psychological triggers for clicks (CTR) and watch time.',
  },
  {
    q: 'Is my data stored or shared?',
    a: 'Never. All generation happens locally in your browser. Your topics and prompts are never sent to any server. 100% private.',
  },
  {
    q: 'Which AI models work best with these prompts?',
    a: 'These prompts are optimized for advanced LLMs like ChatGPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro. They provide enough structural detail to prevent generic outputs.',
  },
];

// ─── Related Tools (6 Items from your tools array) ────────────────────────────
const RELATED_TOOLS = [
  { href: '/tools/midjourney-prompt-generator', title: 'Midjourney Prompt Generator', desc: 'Create stunning thumbnails & video visuals with AI image prompts.' },
  { href: '/tools/word-counter', title: 'Word Counter', desc: 'Count script length & reading time to ensure optimal video duration.' },
  { href: '/tools/chatgpt-prompt-generator', title: 'ChatGPT Prompt Generator', desc: 'Generate better general-purpose prompts for any AI task.' },
  { href: '/tools/claude-prompt-generator', title: 'Claude Prompt Generator', desc: 'Create specialized prompts optimized for Anthropic\'s Claude AI.' },
  { href: '/tools/ai-agent', title: 'AI Agent Builder', desc: 'Design custom AI agents for specific content creation workflows.' },
  { href: '/tools/seo-meta-tags-generator', title: 'SEO Meta Tags Generator', desc: 'Optimize your video description and tags for search visibility.' },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const YoutubeScriptGenerator = () => {
  const [topic, setTopic] = useState('');
  const [videoType, setVideoType] = useState('random');
  const [lengthFormat, setLengthFormat] = useState('medium');
  const [tone, setTone] = useState('energetic');
  const [ctaStrength, setCtaStrength] = useState('strong');
  const [includeTitlesThumbs, setIncludeTitlesThumbs] = useState(false);
  const [result, setResult] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('favoriteYoutubePrompts');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favoriteYoutubePrompts', JSON.stringify(favorites));
    }
  }, [favorites]);

  const handleGenerate = () => {
    setError('');
    if (!topic.trim()) {
      setError('Please enter a video topic first');
      return;
    }

    const prompt = generatePromptLogic(topic, videoType, lengthFormat, tone, ctaStrength, includeTitlesThumbs);
    setResult(prompt);
    setCopied(false);
  };

  const copyPrompt = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const addToFavorites = () => {
    if (!result || favorites.includes(result)) return;
    setFavorites([...favorites, result]);
  };

  const removeFavorite = (promptToRemove) => {
    setFavorites(favorites.filter(p => p !== promptToRemove));
  };

  const resetAll = () => {
    setTopic('');
    setResult('');
    setError('');
    setCopied(false);
  };

  const stats = result
    ? [
        { icon: FileText, label: 'Prompt Length', value: `${result.length} chars`, color: 'text-gray-800' },
        { icon: Play, label: 'Format', value: videoType === 'random' ? 'Mixed' : videoType, color: 'text-sky-600' },
        { icon: BarChart3, label: 'Target Length', value: lengthFormat, color: 'text-gray-800' },
        { icon: Zap, label: 'Tone', value: tone, color: 'text-indigo-600' },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* ── Breadcrumb ── */}
      <div className="max-w-5xl mx-auto w-full px-4 pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="inline-flex items-center gap-1.5 hover:text-red-600 transition-colors">
                <Home size={14} /> Home
              </Link>
            </li>
            <li><span className="text-gray-300">/</span></li>
            <li>
              <Link href="/pages/all-tools" className="hover:text-red-600 transition-colors">All Tools</Link>
            </li>
            <li><span className="text-gray-300">/</span></li>
            <li><span className="text-gray-900 font-semibold">YouTube Script Generator</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-5xl mx-auto w-full px-4 pb-20">
        
        {/* ── Hero ── */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-100 mb-4">
            <Play className="text-red-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            YouTube Script & Prompt Generator –{' '}
            <span className="text-red-600">Viral Scripts, Titles & Ideas</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Generate high-retention YouTube video scripts, titles, hooks, thumbnail ideas, and full outlines instantly. Perfect for Pakistani & global creators.
          </p>
        </div>

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-12">
          <div className="p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Left – Controls */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Video Topic / Keyword
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. how to earn money online in Pakistan 2026, best biryani in Karachi, React 19 new features..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  {topic.trim().length > 0 && topic.trim().length < 8 && (
                    <p className="mt-2 text-amber-600 text-sm">
                      Tip: Use 8+ words for more specific & viral results
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Video Format
                    </label>
                    <select
                      value={videoType}
                      onChange={(e) => setVideoType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    >
                      <option value="random">Random / Mix</option>
                      <option value="explainer">Explainer / Educational</option>
                      <option value="tutorial">Tutorial / How-to</option>
                      <option value="story">Storytelling / Vlog</option>
                      <option value="list">Top 10 / Listicle</option>
                      <option value="review">Review / Comparison</option>
                      <option value="shorts">YouTube Shorts</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Target Length
                    </label>
                    <select
                      value={lengthFormat}
                      onChange={(e) => setLengthFormat(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    >
                      <option value="shorts">Shorts (60s)</option>
                      <option value="short">Short (4–8 min)</option>
                      <option value="medium">Medium (10–18 min)</option>
                      <option value="long">Long-form (18–30+ min)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Tone / Style
                    </label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    >
                      <option value="energetic">Energetic & Viral</option>
                      <option value="casual">Casual / Gen-Z</option>
                      <option value="professional">Professional / Authority</option>
                      <option value="storytelling">Emotional Storytelling</option>
                      <option value="funny">Funny / Entertaining</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      CTA Strength
                    </label>
                    <select
                      value={ctaStrength}
                      onChange={(e) => setCtaStrength(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    >
                      <option value="soft">Soft / Natural</option>
                      <option value="strong">Strong</option>
                      <option value="very-strong">Very Strong / Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeTitlesThumbs}
                    onChange={(e) => setIncludeTitlesThumbs(e.target.checked)}
                    className="h-5 w-5 text-red-600 rounded"
                  />
                  <label className="text-gray-700 cursor-pointer">
                    Also generate viral titles + thumbnail ideas
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleGenerate}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3.5 rounded-lg transition flex items-center justify-center gap-2 shadow-md"
                  >
                    <Zap size={20} />
                    Generate YouTube Prompt
                  </button>

                  <button
                    onClick={resetAll}
                    className="px-8 py-3.5 bg-gray-200 hover:bg-gray-300 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={18} />
                    Clear
                  </button>
                </div>

                {error && <p className="text-red-600 text-center font-medium mt-4">{error}</p>}
              </div>

              {/* Right – Result & Favorites */}
              <div className="space-y-6">
                
                {/* Stats Grid (if result exists) */}
                {result && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    {stats.map((stat, i) => (
                      <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                        <div className="flex justify-center text-red-500 mb-1"><stat.icon size={16} /></div>
                        <p className={`text-sm font-bold ${stat.color}`}>{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                <h3 className="font-semibold text-lg text-gray-900">
                  Generated YouTube Prompt
                </h3>

                {result ? (
                  <div className="bg-gray-50 p-5 rounded-xl border min-h-[340px] flex flex-col">
                    <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed flex-1 max-h-96 overflow-y-auto">
                      {result}
                    </pre>

                    <div className="flex flex-wrap gap-3 mt-6">
                      <button
                        onClick={copyPrompt}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Copy size={18} />
                        {copied ? 'Copied!' : 'Copy Prompt'}
                      </button>

                      <button
                        onClick={addToFavorites}
                        className="px-6 py-3 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg transition flex items-center gap-2"
                      >
                        <Star size={18} fill={favorites.includes(result) ? 'currentColor' : 'none'} />
                        {favorites.includes(result) ? 'Favorited' : 'Favorite'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl border text-gray-500 text-center px-6">
                    Enter topic & settings → click Generate to create viral YouTube prompt
                  </div>
                )}

                {favorites.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-semibold text-lg text-gray-900 mb-3 flex items-center gap-2">
                      <Star className="text-yellow-500" size={20} fill="currentColor" />
                      Saved Prompts ({favorites.length})
                    </h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                      {favorites.map((fav, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-start p-3 bg-gray-50 rounded-lg text-sm border border-gray-200 group"
                        >
                          <pre className="flex-1 whitespace-pre-wrap font-sans text-xs leading-relaxed pr-3">
                            {fav.substring(0, 120)}...
                          </pre>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                            <button
                              onClick={() => navigator.clipboard.writeText(fav)}
                              className="text-sky-600 hover:text-sky-800"
                              title="Copy this prompt"
                            >
                              <Copy size={16} />
                            </button>
                            <button
                              onClick={() => removeFavorite(fav)}
                              className="text-red-500 hover:text-red-700"
                              title="Remove from favorites"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── How to Use ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Use the YouTube Prompt Generator
          </h2>
          <ol className="space-y-5">
            {[
              { step: '1', title: 'Enter Topic', desc: 'Type your video keyword or idea. Specific topics yield better results.' },
              { step: '2', title: 'Choose Format & Length', desc: 'Select Shorts, Tutorial, Vlog, etc., and desired video duration.' },
              { step: '3', title: 'Set Tone & CTA', desc: 'Pick energetic, professional, or funny tone, and how strong your Call-to-Action should be.' },
              { step: '4', title: 'Generate & Copy', desc: 'Click Generate, then copy the prompt to paste into ChatGPT, Claude, or Gemini.' },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="w-8 h-8 bg-red-100 text-red-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">{item.step}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── How It Works ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How Viral Prompt Generation Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">Smart templating, psychological triggers. Here's the logic.</p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Zap size={16} className="text-red-600" />
                Template Selection
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                filter(format) → random(template) → inject(topic)
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                We select from 15+ proven viral structures (Listicles, Storytelling, Tutorials) based on your chosen format, then inject your topic into the critical hook and body sections.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <BarChart3 size={16} className="text-red-600" />
                Retention Optimization
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                add(lengthConstraint + tone + ctaStrength)
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                The prompt explicitly requests pattern interrupts, timestamped chapters, and specific CTA phrasing to maximize Average View Duration (AVD) and Click-Through Rate (CTR).
              </p>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <h3 className="font-bold text-red-900 text-sm mb-2 flex items-center gap-2">
                <Shield size={16} className="text-red-600" />
                Privacy Note
              </h3>
              <p className="text-red-800 text-xs leading-relaxed">
                All prompt generation happens locally in your browser. No topics or scripts are ever sent to any server. 100% private.
              </p>
            </div>
          </div>
        </section>

        {/* ── Sample Results ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Real Example: Tech Review Prompt
          </h2>
          <p className="text-gray-500 text-sm mb-6">See how a specific topic transforms into a viral prompt.</p>

          <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Input</p>
                <p className="font-mono text-xs text-gray-800">
                  Topic: iPhone 16 Pro Max Review<br />
                  Format: Review<br />
                  Tone: Professional<br />
                  Length: Medium (10-18 min)
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Output Snippet</p>
                <p className="font-mono text-xs text-gray-800 break-all">
                  Write brutally honest product review script for iPhone 16 Pro Max... Include pros/cons table, real usage footage ideas... Use professional tone... Aim for 10-18 minute sweet spot...
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Result: A structured prompt ready for AI, ensuring the resulting script covers all critical review elements while maintaining viewer retention.
            </p>
          </div>
        </section>

        {/* ── Use Cases ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses YouTube Script Generators?
          </h2>
          <p className="text-gray-500 text-sm mb-6">From solo creators to agencies — better scripts mean better growth.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Zap size={20} className="text-red-600" />, title: 'YouTubers & Creators', desc: 'Overcome writer\'s block and generate high-retention script structures in seconds for consistent uploads.' },
              { icon: <Globe size={20} className="text-red-600" />, title: 'Pakistani/Global Creators', desc: 'Create content in Urdu/Hindi or English using AI tools that understand local context and viral trends.' },
              { icon: <FileText size={20} className="text-red-600" />, title: 'Content Agencies', desc: 'Scale script production for multiple clients by generating standardized, high-quality briefs for writers.' },
              { icon: <HelpCircle size={20} className="text-red-600" />, title: 'Educators & Coaches', desc: 'Turn complex topics into engaging, step-by-step tutorial scripts that keep students watching.' },
            ].map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-5 hover:border-red-200 transition-colors">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEO Content ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Viral Script Prompts Matter for YouTube Growth
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Generate high-retention YouTube video scripts, titles, hooks, thumbnail ideas, and full outlines instantly. Choose format (Shorts, tutorial, vlog, list, review…), length, tone, and CTA strength — get optimized, viral-ready content prompts for ChatGPT/Claude/Gemini. Perfect for Pakistani & global creators, vloggers, educators, reviewers, and Shorts makers.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Built in Karachi – 100% free, no signup, prompts saved locally. Ideal for faster scripting, better watch time, higher CTR, and explosive channel growth in 2026.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our templates incorporate 2025-2026 best practices: strong hooks in the first 5 seconds, pattern interrupts, high-retention structures, and psychological triggers for clicks (CTR) and watch time.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">Privacy Note</h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No topics or scripts are uploaded to any server. No data is stored or tracked. Your info stays on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need more creator tools? Try the{' '}
            <Link href="/tools/midjourney-prompt-generator" className="text-red-600 underline underline-offset-2 hover:text-red-700">Midjourney Prompt Generator</Link> for thumbnails, or the{' '}
            <Link href="/tools/word-counter" className="text-red-600 underline underline-offset-2 hover:text-red-700">Word Counter</Link> for script length analysis.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {FAQS.map((item, i) => (
              <div key={i} className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-red-200 transition-colors duration-300">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={openFaq === i}
                >
                  <h3 className="text-sm md:text-base font-bold text-gray-900 pr-4">{item.q}</h3>
                  <ChevronDown size={22} className={`text-red-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related Tools ── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related Content Creation Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RELATED_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-red-400 transition-all"
              >
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-red-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default YoutubeScriptGenerator;                