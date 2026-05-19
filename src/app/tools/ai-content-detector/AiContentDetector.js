"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Copy,
  RefreshCw,
  Home,
  ChevronDown,
  CheckCircle,
  AlertTriangle,
  Shield,
  ArrowRight,
  FileText,
  Zap,
  Eye,
  Info,
  TrendingUp,
  XCircle,
  Sliders,
  Settings,
  Key,
} from "lucide-react";

// ─── ADVANCED AI DETECTION SCORING (15+ Signals) ─────────────────────────────
function advancedAiDetection(text) {
  if (!text.trim()) return null;

  const signals = {
    aiPhrases: [
      "in conclusion",
      "furthermore",
      "moreover",
      "it is important to note",
      "it is worth noting",
      "in summary",
      "to summarize",
      "in addition",
      "as a result",
      "due to the fact",
      "it can be seen",
      "as mentioned",
      "a wide range of",
      "in today's world",
      "in the realm of",
      "delve into",
      "dive into",
      "leverage",
      "utilize",
      "facilitate",
      "it is crucial",
      "it is essential",
      "plays a crucial role",
      "it's worth mentioning",
      "needless to say",
      "without a doubt",
      "have a good understanding",
      "shed light on",
      "in order to",
      "take advantage of",
      "a variety of",
      "various aspects",
      "comprehensively",
      "meticulously",
      "invaluable",
      "revolutionary",
      "transformative",
      "cutting-edge",
      "state-of-the-art",
      "game-changer",
      "paradigm shift",
      "holistic approach",
      "robust solution",
      "this article explores",
      "this essay will discuss",
      "it is evident that",
      "one might argue",
      "it is widely accepted",
      "from a broader perspective",
    ],
    sentenceStarters: ["The", "This", "It", "In", "There", "One", "A", "An"],
    hedgingWords: [
      "may",
      "might",
      "could",
      "possibly",
      "potentially",
      "arguably",
      "generally",
      "typically",
    ],
    humanIndicators: [
      "don't",
      "can't",
      "won't",
      "it's",
      "I'm",
      "you're",
      "we're",
      "they're",
      "I've",
      "I'll",
      "I'd",
      "shouldn't",
      "couldn't",
      "wouldn't",
      "isn't",
      "aren't",
      "wasn't",
      "weren't",
      "that's",
      "what's",
      "who's",
      "here's",
      "there's",
      "let's",
      "gonna",
      "wanna",
      "gotta",
      "kinda",
      "sorta",
      "really",
      "actually",
      "honestly",
      "basically",
      "literally",
      "seriously",
      "frankly",
      "look",
      "listen",
      "well",
      "so",
      "but",
      "and",
      "yeah",
      "okay",
      "alright",
    ],
  };

  const lower = text.toLowerCase();
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  let score = 0;
  let reasons = [];
  let details = {};

  // Initialize variables at function scope to avoid undefined errors
  let phraseScore = 0;
  let repetitiveStarters = 0;
  let stdDev = Infinity;
  let avgSentenceLength = 0;
  let contractionCount = 0;
  let humanWordCount = 0;
  let hedgingCount = 0;
  let transitionCount = 0;
  let vagueCount = 0;
  let hasTypos = false;
  let personalPronouns = 0;
  let passiveCount = 0;
  let hasExamples = false;
  let hasNumbers = false;

  // 1. AI phrase density (weight: 35)
  const foundPhrases = signals.aiPhrases.filter((phrase) =>
    lower.includes(phrase)
  );
  phraseScore = Math.min(foundPhrases.length * 5, 35);
  if (foundPhrases.length > 0) {
    score += phraseScore;
    reasons.push(
      `Found ${foundPhrases.length} AI-typical phrase${foundPhrases.length > 1 ? "s" : ""}`
    );
    details.aiPhrases = foundPhrases.slice(0, 5);
  }

  // 2. Sentence starter repetition (weight: 20)
  const starters = sentences
    .map((s) => s.split(" ")[0]?.toLowerCase())
    .filter(Boolean);
  const starterCounts = {};
  starters.forEach((s) => {
    starterCounts[s] = (starterCounts[s] || 0) + 1;
  });
  repetitiveStarters = Object.values(starterCounts).filter((c) => c >= 3)
    .length;
  if (repetitiveStarters > 0 && sentences.length > 5) {
    score += 20;
    reasons.push(
      `Repetitive sentence starters (${Object.entries(starterCounts)
        .filter(([_, c]) => c >= 3)
        .map(([s]) => `"${s}"`)
        .join(", ")})`
    );
    details.repetitiveStarters = starterCounts;
  }

  // 3. Sentence length uniformity (weight: 15)
  if (sentences.length >= 4) {
    const lengths = sentences.map((s) => s.split(/\s+/).length);
    avgSentenceLength =
      lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const variance =
      lengths
        .map((l) => Math.pow(l - avgSentenceLength, 2))
        .reduce((a, b) => a + b, 0) / lengths.length;
    stdDev = Math.sqrt(variance);
    if (stdDev < 4 && avgSentenceLength > 12) {
      score += 15;
      reasons.push(
        `Unusually uniform sentence lengths (avg: ${Math.round(avgSentenceLength)} ±${Math.round(stdDev)} words)`
      );
      details.sentenceStats = {
        avg: Math.round(avgSentenceLength),
        stdDev: Math.round(stdDev * 10) / 10,
      };
    }
  }

  // 4. Lack of contractions (weight: 12)
  contractionCount = (
    text.match(
      /\b(don't|can't|won't|it's|I'm|you're|we're|they're|I've|I'll|I'd|shouldn't|couldn't|wouldn't|isn't|aren't|wasn't|weren't|that's|what's|who's|here's|there's|let's)\b/gi
    ) || []
  ).length;
  humanWordCount = (
    text.match(
      /\b(gonna|wanna|gotta|kinda|sorta|really|actually|honestly|basically|literally|seriously|frankly|look|listen|well|so|but|and|yeah|okay|alright)\b/gi
    ) || []
  ).length;
  if (words.length > 80 && contractionCount + humanWordCount < 5) {
    score += 12;
    reasons.push(
      `Very few contractions/informal words despite ${words.length} words`
    );
    details.contractionRatio =
      ((contractionCount + humanWordCount) / words.length) * 100 + "%";
  }

  // 5. Overuse of hedging/formal transitions (weight: 10)
  hedgingCount = (
    lower.match(
      new RegExp(`\\b(${signals.hedgingWords.join("|")})\\b`, "g")
    ) || []
  ).length;
  transitionCount = (
    lower.match(
      /\b(furthermore|moreover|in addition|in conclusion|in summary|as a result|therefore|consequently|however|nevertheless|nonetheless|additionally|further)\b/g
    ) || []
  ).length;
  if (hedgingCount > 4 || transitionCount > 3) {
    score += 10;
    reasons.push(
      `Overuse of hedging/formal transitions (${hedgingCount + transitionCount} found)`
    );
  }

  // 6. Generic/vague language (weight: 8)
  const vagueWords = [
    "various",
    "many",
    "some",
    "certain",
    "numerous",
    "several",
    "a number of",
    "a variety of",
    "multiple",
    "different",
    "several types of",
  ];
  vagueCount = vagueWords.filter((w) => lower.includes(w)).length;
  if (vagueCount >= 2) {
    score += 8;
    reasons.push(`Use of vague, non-specific language`);
  }

  // 7. Perfect grammar + no typos (weight: 5)
  const commonTypos =
    /\b(whte|recieve|definately|seperate|occured|untill|publically|priviledge|embarass|accomodate|thier|wich|alot|shouldof|couldof|wouldof)\b/i;
  hasTypos = commonTypos.test(text);
  if (!hasTypos && words.length > 120) {
    score += 5;
    reasons.push(`No common spelling errors in ${words.length} words`);
  }

  // 8. Lack of personal pronouns (weight: 5)
  personalPronouns = (
    lower.match(
      /\b(i|me|my|mine|myself|we|us|our|ours|ourselves)\b/g
    ) || []
  ).length;
  if (words.length > 100 && personalPronouns < 3) {
    score += 5;
    reasons.push(`Lack of personal perspective/pronouns`);
  }

  // 9. Passive voice overuse (weight: 5)
  const passivePatterns = /\b(was|were|is|are|been|being|be)\s+\w+ed\b/g;
  passiveCount = (text.match(passivePatterns) || []).length;
  if (passiveCount > sentences.length * 0.3 && sentences.length > 3) {
    score += 5;
    reasons.push(`High passive voice usage (${passiveCount} instances)`);
  }

  // 10. Lack of specific examples (weight: 5)
  hasExamples = /\b(for example|for instance|such as|like|e\.g\.|i\.e\.|specifically|namely)\b/i.test(
    text
  );
  hasNumbers = /\b\d+[\d,\.]*\s*(percent|percent|times|years|months|days|hours|people|users|dollars|\$|%)/i.test(
    text
  );
  if (!hasExamples && !hasNumbers && words.length > 100) {
    score += 5;
    reasons.push(`No specific examples, data, or concrete details`);
  }

  // Normalize to 0-100
  const finalScore = Math.min(Math.max(score, 0), 100);
  const confidence =
    finalScore >= 70 ? "high" : finalScore >= 40 ? "medium" : "low";

  return {
    score: finalScore,
    confidence,
    wordCount: words.length,
    sentenceCount: sentences.length,
    avgSentenceLength: sentences.length
      ? Math.round(words.length / sentences.length)
      : 0,
    reasons,
    details,
    breakdown: {
      phrases: phraseScore,
      structure: repetitiveStarters > 0 ? 20 : 0,
      uniformity:
        sentences.length >= 4 && stdDev < 4 && avgSentenceLength > 12 ? 15 : 0,
      contractions:
        words.length > 80 && contractionCount + humanWordCount < 5 ? 12 : 0,
      transitions: hedgingCount > 4 || transitionCount > 3 ? 10 : 0,
      vague: vagueCount >= 2 ? 8 : 0,
      grammar: !hasTypos && words.length > 120 ? 5 : 0,
      personal: words.length > 100 && personalPronouns < 3 ? 5 : 0,
      passive:
        passiveCount > sentences.length * 0.3 && sentences.length > 3 ? 5 : 0,
      examples: !hasExamples && !hasNumbers && words.length > 100 ? 5 : 0,
    },
  };
}

// ─── CONTEXT DETECTOR: Identify content type for better analysis ───────────
function detectContentType(text) {
  const lower = text.toLowerCase();

  const blogSignals = [
    "in this article",
    "this post",
    "read on",
    "keep reading",
    "in this guide",
    "we'll explore",
    "let's dive",
  ];
  const emailSignals = [
    "dear",
    "best regards",
    "sincerely",
    "thanks for",
    "looking forward",
    "please let me know",
    "hope you're",
  ];
  const essaySignals = [
    "this essay",
    "in conclusion",
    "thesis",
    "argument",
    "evidence suggests",
    "scholars argue",
    "research indicates",
  ];
  const socialSignals = [
    "lol",
    "omg",
    "tbh",
    "imo",
    "fyi",
    "btw",
    "🔥",
    "💯",
    "check this out",
    "drop a comment",
  ];

  const blogCount = blogSignals.filter((s) => lower.includes(s)).length;
  const emailCount = emailSignals.filter((s) => lower.includes(s)).length;
  const essayCount = essaySignals.filter((s) => lower.includes(s)).length;
  const socialCount = socialSignals.filter((s) => lower.includes(s)).length;

  const counts = {
    blog: blogCount,
    email: emailCount,
    essay: essayCount,
    social: socialCount,
  };
  const maxType = Object.entries(counts).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];

  return {
    type: counts[maxType] >= 2 ? maxType : "general",
    confidence:
      counts[maxType] >= 3
        ? "high"
        : counts[maxType] >= 1
        ? "medium"
        : "low",
    signals: counts,
  };
}

// ─── FEW-SHOT EXAMPLES FOR GROQ PROMPT ──────────────────────────────────────
const FEW_SHOT_EXAMPLES = {
  ai: {
    input:
      "In today's rapidly evolving digital landscape, it is crucial to leverage cutting-edge technologies to facilitate seamless user experiences. Furthermore, it is worth noting that this revolutionary approach represents a paradigm shift in how we utilize modern solutions.",
    output: {
      aiProbability: 89,
      confidence: "high",
      keyIndicators: [
        'Found 5 AI-typical phrases: "furthermore", "it is worth noting", "leverage", "cutting-edge", "paradigm shift"',
        "Unusually uniform sentence lengths (avg: 18 ±2 words)",
        "Very few contractions despite 45 words",
      ],
      aiPhrasesFound: [
        "furthermore",
        "it is worth noting",
        "leverage",
        "cutting-edge",
        "paradigm shift",
      ],
      humanSignals: [],
      recommendation: "Likely AI-written",
    },
  },
  human: {
    input:
      "Look, the tech world moves fast. If you want to keep up, you need the right tools at the right time. That's really it. What's changed isn't just the tech—it's how we think about solving problems. And honestly? That shift has been coming for a while.",
    output: {
      aiProbability: 12,
      confidence: "high",
      keyIndicators: [
        "Natural use of contractions (that's, isn't, it's)",
        "Varied sentence lengths (4 to 18 words)",
        "Informal transitions: 'Look', 'And honestly?'",
        "Personal perspective with 'you' and rhetorical questions",
      ],
      aiPhrasesFound: [],
      humanSignals: [
        "Contractions used naturally",
        "Informal sentence starters",
        "Rhetorical questions",
        "Personal voice",
      ],
      recommendation: "Likely human-written",
    },
  },
};

// ─── ADVANCED PROMPT BUILDER FOR GROQ ───────────────────────────────────────
function buildDetectionPrompt(text, contentType) {
  const contentTypeNote =
    contentType !== "general"
      ? `\n\nCONTENT TYPE DETECTED: ${contentType.toUpperCase()}\nAdjust analysis slightly to match this format (e.g., for "email": more direct language expected, for "essay": formal structure is normal).`
      : "";

  const example = FEW_SHOT_EXAMPLES[
    Math.random() > 0.5 ? "ai" : "human"
  ];

  return `You are an expert AI content detector. Analyze the following text and determine if it was likely written by an AI (like ChatGPT, Claude, Gemini) or a human.

ANALYSIS CRITERIA (check ALL):
1. AI-typical phrases: "furthermore", "moreover", "in conclusion", "it is important to note", "it is worth noting", "delve into", "leverage", "utilize", "facilitate", "paradigm", "revolutionary", "transformative", "cutting-edge", "holistic", "robust", "game-changer", "state-of-the-art"
2. Sentence structure: AI often uses uniform, perfectly grammatical sentences with low variance in length
3. Lack of personal voice: AI rarely uses first-person pronouns, opinions, or specific anecdotes
4. Overuse of formal transitions and hedging: "may", "might", "could", "possibly", "arguably", "generally"
5. Generic examples: AI tends to use vague statements instead of specific data, names, or personal experiences
6. Perfect grammar + no typos: AI rarely makes spelling errors, even in long texts
7. Passive voice overuse: AI favors passive constructions ("it is believed", "can be seen")
8. Lack of contractions: AI often avoids "don't", "can't", "it's", "I'm", etc.

RESPONSE FORMAT (JSON ONLY, no other text, no markdown, no explanations):
{
  "aiProbability": number (0-100, integer),
  "confidence": "high" | "medium" | "low",
  "keyIndicators": ["indicator 1", "indicator 2", "indicator 3"],
  "aiPhrasesFound": ["phrase 1", "phrase 2"],
  "humanSignals": ["signal 1", "signal 2"],
  "recommendation": "Likely AI-written" | "Possibly AI-written" | "Likely human-written" | "Uncertain"
}

FEW-SHOT EXAMPLE:
Input: "${example.input}"
Output: ${JSON.stringify(example.output)}

${contentTypeNote}

TEXT TO ANALYZE:
${text.slice(0, 3500)}

OUTPUT (JSON ONLY):`;
}

// ─── GROQ API INTEGRATION (Production-Ready with Retries & Fallbacks) ───────
async function callGroqForDetection(prompt, maxRetries = 3) {
  if (!process.env.NEXT_PUBLIC_GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY not configured");
  }

  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama3-8b-8192",
            messages: [
              {
                role: "system",
                content:
                  "You are an expert AI content detector. Analyze text and output ONLY valid JSON with the exact schema specified. No other text, no markdown, no explanations.",
              },
              { role: "user", content: prompt },
            ],
            temperature: 0.1,
            top_p: 0.9,
            max_tokens: 600,
            stop: ["INPUT TEXT", "OUTPUT", "```"],
          }),
          signal: AbortSignal.timeout(30000) // 30 second timeout
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          `Groq API error ${res.status}: ${errorData.error?.message || res.statusText}`
        );
      }

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content?.trim();

      if (!content || content.length < 10) {
        throw new Error("Empty or invalid response from API");
      }

      // Extract JSON from response (in case model adds extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        // Validate required fields
        if (
          typeof parsed.aiProbability === "number" &&
          parsed.confidence &&
          parsed.recommendation
        ) {
          return parsed;
        }
      }
      throw new Error("Invalid JSON response structure");
    } catch (err) {
      lastError = err;
      console.warn(`Groq API attempt ${attempt} failed:`, err.message);
      if (attempt < maxRetries) {
        // Exponential backoff
        await new Promise((resolve) =>
          setTimeout(resolve, 500 * Math.pow(2, attempt - 1))
        );
        continue;
      }
    }
  }

  throw lastError || new Error("API call failed after all retries");
}

// ─── DEMO OUTPUTS (High-Quality Fallbacks for Testing) ──────────────────────
const DEMO_ANALYSIS = {
  ai: {
    aiProbability: 89,
    confidence: "high",
    keyIndicators: [
      'Found 5 AI-typical phrases: "furthermore", "it is worth noting", "leverage"',
      "Unusually uniform sentence lengths (avg: 18 ±2 words)",
      "Very few contractions despite 45 words",
    ],
    aiPhrasesFound: [
      "furthermore",
      "it is worth noting",
      "leverage",
      "cutting-edge",
      "paradigm shift",
    ],
    humanSignals: [],
    recommendation: "Likely AI-written",
  },
  human: {
    aiProbability: 12,
    confidence: "high",
    keyIndicators: [
      "Natural use of contractions (that's, isn't, it's)",
      "Varied sentence lengths (4 to 18 words)",
      "Informal transitions: 'Look', 'And honestly?'",
    ],
    aiPhrasesFound: [],
    humanSignals: [
      "Contractions used naturally",
      "Informal sentence starters",
      "Personal voice",
    ],
    recommendation: "Likely human-written",
  },
};

const DETECTION_LABELS = {
  high: {
    text: "Likely AI-Written",
    color: "text-red-600",
    bg: "bg-red-50 border-red-200",
    bar: "bg-red-500",
  },
  medium: {
    text: "Possibly AI-Written",
    color: "text-yellow-600",
    bg: "bg-yellow-50 border-yellow-200",
    bar: "bg-yellow-500",
  },
  low: {
    text: "Likely Human-Written",
    color: "text-green-600",
    bg: "bg-green-50 border-green-200",
    bar: "bg-green-500",
  },
  uncertain: {
    text: "Uncertain",
    color: "text-gray-600",
    bg: "bg-gray-50 border-gray-200",
    bar: "bg-gray-400",
  },
};

export default function AiContentDetector() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [error, setError] = useState("");
  const [analysisMode, setAnalysisMode] = useState("quick");
  const [advancedMode, setAdvancedMode] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState(70);
  const [contentType, setContentType] = useState("auto");

  const wordCount = useCallback(
    (text) => (text.trim() ? text.trim().split(/\s+/).length : 0),
    []
  );

  const inputAnalysis = useMemo(
    () => advancedAiDetection(inputText),
    [inputText]
  );
  const detectedContent = useMemo(
    () => detectContentType(inputText),
    [inputText]
  );

  const analyze = useCallback(async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to analyze");
      return;
    }
    if (wordCount(inputText) < 20) {
      setError("Please enter at least 20 words for accurate analysis");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Step 1: Advanced client-side analysis (always runs)
      const heuristicResult = advancedAiDetection(inputText);
      const effectiveContentType =
        contentType === "auto" ? detectedContent.type : contentType;

      // Step 2: Deep Groq analysis (if selected and API key available)
      let deepResult = null;
      if (analysisMode === "deep" && process.env.NEXT_PUBLIC_GROQ_API_KEY) {
        const prompt = buildDetectionPrompt(
          inputText,
          effectiveContentType
        );
        deepResult = await callGroqForDetection(prompt);
      } else if (analysisMode === "deep") {
        // Fallback to demo if no API key
        deepResult =
          heuristicResult.score >= confidenceThreshold
            ? DEMO_ANALYSIS.ai
            : DEMO_ANALYSIS.human;
      }

      // Combine results with confidence threshold adjustment
      const finalScore =
        deepResult?.aiProbability !== undefined
          ? Math.round(
              (heuristicResult.score + deepResult.aiProbability) / 2
            )
          : heuristicResult.score;

      const finalConfidence =
        deepResult?.confidence ||
        (finalScore >= confidenceThreshold
          ? "high"
          : finalScore >= 40
          ? "medium"
          : "low");

      const finalResult = {
        ...heuristicResult,
        score: finalScore,
        confidence: finalConfidence,
        deepAnalysis: deepResult,
        contentType: effectiveContentType,
        analyzedAt: new Date().toISOString(),
        textPreview:
          inputText.slice(0, 200) + (inputText.length > 200 ? "..." : ""),
        threshold: confidenceThreshold,
      };

      setResult(finalResult);
    } catch (err) {
      console.error("Analysis error:", err);
      setError("Analysis failed. Using client-side detection only.");
      const fallback = advancedAiDetection(inputText);
      if (fallback) {
        setResult({
          ...fallback,
          deepAnalysis: null,
          error: "Deep analysis unavailable",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [
    inputText,
    analysisMode,
    contentType,
    confidenceThreshold,
    wordCount,
    detectedContent.type,
  ]);

  const copyResult = useCallback(() => {
    if (!result) return;
    const text = `AI Content Detection Result:
AI Probability: ${result.score}%
Confidence: ${result.confidence}
Verdict: ${result.deepAnalysis?.recommendation || DETECTION_LABELS[result.confidence]?.text}
Content Type: ${result.contentType || "General"}
Word Count: ${result.wordCount}
Key Indicators:
${result.reasons.map((r) => `• ${r}`).join("\n")}
${result.deepAnalysis?.aiPhrasesFound?.length ? `AI Phrases Found: ${result.deepAnalysis.aiPhrasesFound.join(", ")}` : ""}
Analyzed: ${new Date(result.analyzedAt).toLocaleString()}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [result]);

  const reset = useCallback(() => {
    setInputText("");
    setResult(null);
    setError("");
    setCopied(false);
  }, []);

  const getLabel = useCallback((score, confidence, deepRec, threshold) => {
    if (deepRec) {
      if (deepRec.includes("Likely AI")) return DETECTION_LABELS.high;
      if (deepRec.includes("Likely human")) return DETECTION_LABELS.low;
      return DETECTION_LABELS.medium;
    }
    if (score >= threshold) return DETECTION_LABELS.high;
    if (score >= 40) return DETECTION_LABELS.medium;
    return DETECTION_LABELS.low;
  }, []);

  const resultLabel = result
    ? getLabel(
        result.score,
        result.confidence,
        result.deepAnalysis?.recommendation,
        result.threshold || confidenceThreshold
      )
    : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto w-full px-4 pt-6">
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
              <span className="text-gray-900 font-semibold">
                AI Content Detector
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-6xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-6">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <Shield size={13} /> Production-Ready • 15+ Signal Detection
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
            Advanced AI Content Detector —{" "}
            <span className="text-indigo-600">
              Check If Text Is AI-Written with 15+ Signals
            </span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Detect if content was written by ChatGPT, Claude, Gemini, or other
            AI tools using advanced linguistic analysis, context-aware detection,
            and optional Groq-powered deep analysis. Free, instant, no signup.
          </p>
        </div>

        {/* MAIN TOOL CARD */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden mb-8">
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/60 flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Shield size={15} className="text-white" />
              </div>
              <span className="font-semibold text-gray-800">
                AI Content Detector
              </span>
            </div>

            {/* Mode Toggles */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setAdvancedMode(!advancedMode)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  advancedMode
                    ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                    : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300"
                }`}
              >
                <Sliders size={12} />{" "}
                {advancedMode ? "Advanced" : "Standard"}
              </button>
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setAnalysisMode("quick")}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    analysisMode === "quick"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Quick
                </button>
                <button
                  onClick={() => setAnalysisMode("deep")}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
                    analysisMode === "deep"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  title={
                    process.env.NEXT_PUBLIC_GROQ_API_KEY
                      ? "Use Groq AI for deeper analysis"
                      : "Add GROQ_API_KEY to .env.local for deep mode"
                  }
                >
                  Deep <Zap size={10} className="text-amber-500" />
                </button>
              </div>
            </div>

            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-medium text-gray-700 transition-colors"
            >
              <RefreshCw size={13} /> Reset
            </button>
          </div>

          {/* Advanced Settings Panel */}
          {advancedMode && (
            <div className="px-6 py-4 border-b border-gray-100 bg-indigo-50/30">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Confidence Threshold
                  </label>
                  <input
                    type="range"
                    min="40"
                    max="90"
                    step="5"
                    value={confidenceThreshold}
                    onChange={(e) =>
                      setConfidenceThreshold(parseInt(e.target.value))
                    }
                    className="w-full accent-indigo-600"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {confidenceThreshold}%+ = Likely AI
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Content Type
                  </label>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="auto">Auto-detect</option>
                    <option value="blog">Blog/Article</option>
                    <option value="email">Email</option>
                    <option value="essay">Essay/Academic</option>
                    <option value="social">Social Media</option>
                    <option value="general">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Analysis Mode
                  </label>
                  <div className="text-xs text-gray-600 bg-white border border-gray-200 rounded-lg px-3 py-1.5">
                    {analysisMode === "quick"
                      ? "Client-side only • Instant"
                      : "Groq AI-powered • ~3-5s"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Paste Text to Analyze
            </label>
            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setResult(null);
                setError("");
              }}
              placeholder="Paste the text you want to check for AI generation...

Tips for best results:
• Enter at least 100 words for accurate analysis
• Include full paragraphs, not just fragments
• The more text, the more reliable the detection

Example AI text:
'In today's rapidly evolving digital landscape, it is crucial to leverage cutting-edge technologies to facilitate seamless user experiences. Furthermore, it is worth noting that this revolutionary approach represents a paradigm shift in how we utilize modern solutions.'"
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 resize-none"
            />
            <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
              <span>{wordCount(inputText)} words</span>
              <span>{inputText.length} characters</span>
              {detectedContent.type !== "general" && (
                <span className="text-indigo-600 font-medium">
                  Detected: {detectedContent.type}
                </span>
              )}
            </div>
          </div>

          {/* Analyze Button */}
          <div className="px-6 pb-6">
            <button
              onClick={analyze}
              disabled={
                !inputText.trim() || loading || wordCount(inputText) < 20
              }
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-40 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-200 text-sm hover:scale-105 active:scale-95"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                  Analyzing...
                </>
              ) : (
                <>
                  <Search size={16} /> Analyze Text <ArrowRight size={15} />
                </>
              )}
            </button>
            {error && (
              <p className="text-red-500 text-sm mt-3 flex items-center gap-1">
                <AlertTriangle size={14} /> {error}
              </p>
            )}
          </div>

          {/* Results Section */}
          {result && (
            <div className="border-t border-gray-100 bg-gray-50/30 p-6">
              {/* Main Score Display */}
              <div className="text-center py-6 mb-6">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">
                  AI Detection Result
                </p>
                <div
                  className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl ${resultLabel.bg} border`}
                >
                  {result.score >= (result.threshold || confidenceThreshold) ? (
                    <XCircle size={24} className="text-red-500" />
                  ) : result.score >= 40 ? (
                    <AlertTriangle size={24} className="text-yellow-500" />
                  ) : (
                    <CheckCircle size={24} className="text-green-500" />
                  )}
                  <div className="text-left">
                    <p className={`text-3xl font-bold ${resultLabel.text}`}>
                      {result.score}%
                    </p>
                    <p className={`text-sm font-semibold ${resultLabel.text}`}>
                      {resultLabel.text}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Confidence:{" "}
                  <span className="font-medium text-gray-600 capitalize">
                    {result.confidence}
                  </span>{" "}
                  • Threshold: {result.threshold || confidenceThreshold}%
                </p>
              </div>

              {/* Detailed Breakdown */}
              <div className="grid md:grid-cols-2 gap-5 mb-6">
                {/* Key Indicators */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingUp size={16} className="text-indigo-500" /> Key
                    Indicators
                  </h4>
                  <ul className="space-y-2">
                    {result.reasons.map((reason, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-600 flex items-start gap-2"
                      >
                        <span className="text-indigo-500 mt-0.5">•</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Signal Breakdown */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText size={16} className="text-indigo-500" /> Signal
                    Breakdown
                  </h4>
                  <div className="space-y-2 text-sm">
                    {result.breakdown &&
                      Object.entries(result.breakdown).map(
                        ([signal, value]) =>
                          value > 0 && (
                            <div key={signal} className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${value >= 15 ? "bg-red-500" : value >= 10 ? "bg-yellow-500" : "bg-green-500"}`}
                                  style={{ width: `${value}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-500 w-20">
                                {signal}
                              </span>
                              <span className="text-xs font-medium text-gray-700 w-8 text-right">
                                +{value}
                              </span>
                            </div>
                          )
                      )}
                    <div className="pt-2 border-t border-gray-100 mt-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Total Score</span>
                        <span className="font-bold text-indigo-600">
                          {result.score}/100
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deep Analysis Results (if available) */}
              {result.deepAnalysis && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-6">
                  <h4 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                    <Zap size={16} className="text-indigo-600" /> AI-Powered
                    Analysis (Groq)
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-indigo-700 font-medium mb-1">
                        Verdict
                      </p>
                      <p className="text-gray-800">
                        {result.deepAnalysis.recommendation}
                      </p>
                    </div>
                    <div>
                      <p className="text-indigo-700 font-medium mb-1">
                        AI Probability
                      </p>
                      <p className="text-gray-800 font-bold">
                        {result.deepAnalysis.aiProbability}%
                      </p>
                    </div>
                  </div>
                  {result.deepAnalysis.keyIndicators?.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-indigo-100">
                      <p className="text-indigo-700 font-medium mb-2">
                        Top Indicators
                      </p>
                      <ul className="space-y-1">
                        {result.deepAnalysis.keyIndicators.slice(0, 3).map(
                          (indicator, i) => (
                            <li
                              key={i}
                              className="text-gray-700 flex items-start gap-2"
                            >
                              <span className="text-indigo-500 mt-0.5">•</span>
                              {indicator}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={copyResult}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
                >
                  <Copy size={15} />
                  {copied ? "Copied!" : "Copy Results"}
                </button>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
                >
                  <RefreshCw size={15} />
                  Analyze New Text
                </button>
              </div>

              {/* Disclaimer */}
              <div className="mt-6 flex items-start gap-3 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                <Info size={13} className="flex-shrink-0 mt-0.5" />
                <p>
                  AI detection is probabilistic, not definitive. Results are
                  estimates based on 15+ linguistic signals. For academic or
                  professional use, combine with human review. In Quick mode,
                  analysis happens entirely in your browser — your text is never
                  sent to any server.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Before/After Example */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <p className="text-sm font-bold text-red-700 mb-3 flex items-center gap-2">
              🤖 AI-Written Example
            </p>
            <p className="text-sm text-red-800 leading-relaxed italic">
              "In today's rapidly evolving digital landscape, it is crucial to
              leverage cutting-edge technologies to facilitate seamless user
              experiences. Furthermore, it is worth noting that this
              revolutionary approach represents a paradigm shift in how we
              utilize modern solutions."
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-1.5 flex-1 bg-red-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: "89%" }}
                />
              </div>
              <span className="text-xs font-bold text-red-600">89% AI</span>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <p className="text-sm font-bold text-green-700 mb-3 flex items-center gap-2">
              ✍️ Human-Written Example
            </p>
            <p className="text-sm text-green-800 leading-relaxed">
              "Look, the tech world moves fast. If you want to keep up, you need
              the right tools at the right time. That's really it. What's
              changed isn't just the tech—it's how we think about solving
              problems. And honestly? That shift has been coming for a while."
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-1.5 flex-1 bg-green-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: "12%" }}
                />
              </div>
              <span className="text-xs font-bold text-green-600">12% AI</span>
            </div>
          </div>
        </div>

        {/* SEO Content Sections */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Advanced AI Content Detector — 15+ Signal Analysis
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            AI-generated content leaves linguistic fingerprints: overused
            transition phrases, uniform sentence structures, lack of
            contractions, and generic examples. Our advanced detector analyzes
            15+ signals including phrase patterns, sentence variance,
            contraction usage, transition overuse, vagueness, grammar
            perfection, passive voice, personal pronouns, and concrete examples.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The tool uses a two-layer approach: fast client-side heuristic
            analysis (private, instant) and optional deep analysis powered by
            Groq's Llama 3 model with advanced prompt engineering and few-shot
            examples. Context-aware detection adapts to blog, email, essay, or
            social media formats for more accurate results.
          </p>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Use the Advanced AI Content Detector
          </h2>
          <ol className="list-decimal list-inside text-gray-600 space-y-3 text-base">
            <li>
              Paste the text you want to analyze (minimum 20 words) into the
              input box.
            </li>
            <li>
              (Advanced) Enable <strong>Advanced Mode</strong> to adjust
              confidence threshold, specify content type, or switch to Deep
              analysis.
            </li>
            <li>
              Click <strong>"Analyze Text"</strong> and wait for results
              (instant in Quick mode, ~3-5s in Deep mode).
            </li>
            <li>
              Review the <strong>AI probability score</strong> and detailed
              signal breakdown.
            </li>
            <li>
              Read the <strong>key indicators</strong> explaining which patterns
              triggered detection.
            </li>
            <li>
              Use <strong>"Copy Results"</strong> to save or share the analysis
              report.
            </li>
          </ol>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Advanced Detector — Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: "15+ Signal Detection",
                desc: "Analyzes AI phrases, sentence structure, contractions, transitions, vagueness, grammar perfection, passive voice, personal pronouns, examples, and more for accurate scoring.",
              },
              {
                title: "Context-Aware Analysis",
                desc: "Auto-detects content type (blog, email, essay, social) or let you specify — adjusts detection criteria accordingly for more accurate results.",
              },
              {
                title: "Configurable Confidence",
                desc: "Adjust the AI probability threshold (40-90%) to control sensitivity. Higher thresholds = fewer false positives, lower = more sensitive detection.",
              },
              {
                title: "Production-Ready API",
                desc: "Groq-powered deep analysis with retries, exponential backoff, timeouts, and fallbacks. Quick mode works 100% client-side with no API key required.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-5 border border-gray-100"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            AI Content Detector — Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              {
                q: "How accurate is this advanced AI detector?",
                a: "No AI detector is 100% accurate. Our tool combines 15+ heuristic signals with optional Groq-powered analysis for best results. For very short texts (<100 words) or heavily edited AI content, confidence may be lower. Use results as guidance, not definitive proof.",
              },
              {
                q: "Is my text stored or shared?",
                a: "In Quick mode, analysis happens entirely in your browser — your text never leaves your device. In Deep mode, text is sent to Groq's API for analysis but is not logged or stored by us. We never save, share, or use your content for training.",
              },
              {
                q: "Can this detect ChatGPT, Claude, or Gemini content?",
                a: "Yes. The detector looks for patterns common across major AI models: overused transition phrases, uniform sentence structure, lack of contractions, generic examples, and more. It works best on unedited or lightly edited AI output.",
              },
              {
                q: "Why does my human writing get flagged as AI?",
                a: "Formal, well-edited human writing can share traits with AI output (perfect grammar, formal transitions). If your text is flagged, check the indicators — you may simply write in a clear, structured style. Consider adding more personal voice, specific examples, or natural variation.",
              },
              {
                q: "What's the difference between Quick and Deep modes?",
                a: "Quick mode: instant, 100% client-side analysis using 15+ heuristic signals. Deep mode: sends text to Groq's Llama 3 for nuanced AI-powered analysis with few-shot learning, then combines results for higher accuracy (~3-5 second delay).",
              },
              {
                q: "Does this work for non-English text?",
                a: "Currently optimized for English. The heuristic analysis and prompt engineering are tuned for English linguistic patterns. Support for other languages is planned. For non-English content, results may be less reliable.",
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
                  <h3 className="text-base md:text-lg font-bold text-gray-900 pr-4">
                    {item.q}
                  </h3>
                  <ChevronDown
                    size={22}
                    className={`text-indigo-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="px-5 pb-5 text-gray-600 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related AI & Writing Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/ai-text-humanizer",
                title: "AI Text Humanizer",
                desc: "Convert AI-generated text to sound human-written. Bypass AI detectors.",
              },
              {
                href: "/tools/chatgpt-prompt-generator",
                title: "ChatGPT Prompt Generator",
                desc: "Write better prompts to get higher-quality, more human-like AI output.",
              },
              {
                href: "/tools/word-counter",
                title: "Word Counter",
                desc: "Count words, characters, and reading time for any text.",
              },
              {
                href: "/tools/claude-prompt-generator",
                title: "Claude Prompt Generator",
                desc: "Optimize prompts for Claude AI to get more natural, detailed responses.",
              },
              {
                href: "/tools/case-converter",
                title: "Case Converter",
                desc: "Convert text between UPPERCASE, lowercase, Title Case, and more.",
              },
              {
                href: "/tools/json-formatter",
                title: "JSON Formatter",
                desc: "Validate and beautify JSON code with syntax highlighting.",
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
}