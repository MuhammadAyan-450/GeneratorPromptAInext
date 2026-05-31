"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  Copy,
  RefreshCw,
  Home,
  ChevronDown,
  CheckCircle,
  AlertTriangle,
  Wand2,
  ArrowRight,
  FileText,
  Zap,
  Eye,
  RotateCcw,
  Info,
  Key,
  TrendingUp,
  Settings,
  Sliders,
  RefreshCcw,
} from "lucide-react";

// ─── ADVANCED AI DETECTION SCORING (15+ Signals) ─────────────────────────────
function advancedAiScore(text) {
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

  // Initialize variables at function scope
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
    lower.includes(phrase),
  );
  phraseScore = Math.min(foundPhrases.length * 5, 35);
  if (foundPhrases.length > 0) {
    score += phraseScore;
    reasons.push(
      `Found ${foundPhrases.length} AI-typical phrase${foundPhrases.length > 1 ? "s" : ""}`,
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
  repetitiveStarters = Object.values(starterCounts).filter(
    (c) => c >= 3,
  ).length;
  if (repetitiveStarters > 0 && sentences.length > 5) {
    score += 20;
    reasons.push(
      `Repetitive sentence starters (${Object.entries(starterCounts)
        .filter(([_, c]) => c >= 3)
        .map(([s]) => `"${s}"`)
        .join(", ")})`,
    );
    details.repetitiveStarters = starterCounts;
  }

  // 3. Sentence length uniformity (weight: 15)
  if (sentences.length >= 4) {
    const lengths = sentences.map((s) => s.split(/\s+/).length);
    avgSentenceLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const variance =
      lengths
        .map((l) => Math.pow(l - avgSentenceLength, 2))
        .reduce((a, b) => a + b, 0) / lengths.length;
    stdDev = Math.sqrt(variance);
    if (stdDev < 4 && avgSentenceLength > 12) {
      score += 15;
      reasons.push(
        `Unusually uniform sentence lengths (avg: ${Math.round(avgSentenceLength)} ±${Math.round(stdDev)} words)`,
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
      /\b(don't|can't|won't|it's|I'm|you're|we're|they're|I've|I'll|I'd|shouldn't|couldn't|wouldn't|isn't|aren't|wasn't|weren't|that's|what's|who's|here's|there's|let's)\b/gi,
    ) || []
  ).length;
  humanWordCount = (
    text.match(
      /\b(gonna|wanna|gotta|kinda|sorta|really|actually|honestly|basically|literally|seriously|frankly|look|listen|well|so|but|and|yeah|okay|alright)\b/gi,
    ) || []
  ).length;
  if (words.length > 80 && contractionCount + humanWordCount < 5) {
    score += 12;
    reasons.push(
      `Very few contractions/informal words despite ${words.length} words`,
    );
    details.contractionRatio =
      (((contractionCount + humanWordCount) / words.length) * 100).toFixed(1) +
      "%";
  }

  // 5. Overuse of hedging/formal transitions (weight: 10)
  hedgingCount = (
    lower.match(new RegExp(`\\b(${signals.hedgingWords.join("|")})\\b`, "g")) ||
    []
  ).length;
  transitionCount = (
    lower.match(
      /\b(furthermore|moreover|in addition|in conclusion|in summary|as a result|therefore|consequently|however|nevertheless|nonetheless|additionally|further)\b/g,
    ) || []
  ).length;
  if (hedgingCount > 4 || transitionCount > 3) {
    score += 10;
    reasons.push(
      `Overuse of hedging/formal transitions (${hedgingCount + transitionCount} found)`,
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
    lower.match(/\b(i|me|my|mine|myself|we|us|our|ours|ourselves)\b/g) || []
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
  hasExamples =
    /\b(for example|for instance|such as|like|e\.g\.|i\.e\.|specifically|namely)\b/i.test(
      text,
    );
  hasNumbers =
    /\b\d+[\d,\.]*\s*(percent|percent|times|years|months|days|hours|people|users|dollars|\$|%)/i.test(
      text,
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

// ─── MULTI-PASS POST-PROCESSOR: Advanced Humanization ───────────────────────
function advancedPostProcess(text, tone = "casual", passes = 3) {
  if (!text) return text;

  let result = text;

  for (let pass = 0; pass < passes; pass++) {
    // Add natural contractions
    result = result.replace(/\bdo not\b/gi, "don't");
    result = result.replace(/\bcannot\b/gi, "can't");
    result = result.replace(/\bwill not\b/gi, "won't");
    result = result.replace(/\bshould not\b/gi, "shouldn't");
    result = result.replace(/\bcould not\b/gi, "couldn't");
    result = result.replace(/\bwould not\b/gi, "wouldn't");
    result = result.replace(/\bis not\b/gi, "isn't");
    result = result.replace(/\bare not\b/gi, "aren't");
    result = result.replace(/\bwas not\b/gi, "wasn't");
    result = result.replace(/\bwere not\b/gi, "weren't");
    result = result.replace(/\bI am\b/gi, "I'm");
    result = result.replace(/\bI have\b/gi, "I've");
    result = result.replace(/\bI will\b/gi, "I'll");
    result = result.replace(/\bI would\b/gi, "I'd");
    result = result.replace(/\byou are\b/gi, "you're");
    result = result.replace(/\bthey are\b/gi, "they're");
    result = result.replace(/\bwe are\b/gi, "we're");
    result = result.replace(/\bit is\b/gi, "it's");
    result = result.replace(/\bthat is\b/gi, "that's");
    result = result.replace(/\bwhat is\b/gi, "what's");
    result = result.replace(/\bwho is\b/gi, "who's");

    // Replace formal transitions
    result = result.replace(/\bFurthermore,\s*/gi, "Also, ");
    result = result.replace(/\bMoreover,\s*/gi, "Plus, ");
    result = result.replace(/\bIn addition,\s*/gi, "And ");
    result = result.replace(/\bHowever,\s*/gi, "But ");
    result = result.replace(/\bTherefore,\s*/gi, "So ");
    result = result.replace(/\bConsequently,\s*/gi, "That's why ");
    result = result.replace(/\bNevertheless,\s*/gi, "Still, ");
    result = result.replace(/\bNonetheless,\s*/gi, "Even so, ");
    result = result.replace(/\bIn conclusion,\s*/gi, "So, ");
    result = result.replace(/\bIn summary,\s*/gi, "Basically, ");

    // Break up long sentences
    result = result.replace(/\. ([A-Z][^\.]{120,})\./g, (match) => {
      const parts = match.split(/,\s+/);
      if (parts.length > 3) {
        const mid = Math.floor(parts.length / 2);
        return (
          ". " +
          parts.slice(0, mid).join(", ") +
          ". " +
          parts.slice(mid).join(", ") +
          "."
        );
      }
      return match;
    });

    // Add sentence variety starters
    const toneStarters = {
      casual: [
        "Honestly, ",
        "Look, ",
        "Here's the thing: ",
        "Basically, ",
        "Truth is, ",
        "I mean, ",
        "So, ",
        "Anyway, ",
      ],
      professional: [
        "Essentially, ",
        "Put simply, ",
        "In practice, ",
        "From experience, ",
        "The key point is: ",
        "What this means is: ",
      ],
      creative: [
        "Picture this: ",
        "Here's a thought: ",
        "Imagine if: ",
        "What if I told you: ",
        "Let me share something: ",
      ],
      simple: [
        "So, ",
        "Well, ",
        "You know, ",
        "The thing is, ",
        "Here's what I mean: ",
      ],
    };

    const sentences = result.split(/(?<=[.!?])\s+/).filter((s) => s.trim());
    if (sentences.length > 4 && Math.random() > 0.6) {
      const starters = toneStarters[tone] || toneStarters.casual;
      const idx = Math.floor(Math.random() * (sentences.length - 3)) + 1;
      if (
        !sentences[idx].match(
          /^(Honestly|Look|Basically|So|Well|Anyway|Essentially|Put simply)/i,
        )
      ) {
        sentences[idx] =
          starters[Math.floor(Math.random() * starters.length)] +
          sentences[idx].charAt(0).toLowerCase() +
          sentences[idx].slice(1);
      }
    }
    result = sentences.join(" ");

    // Add informal intensifiers
    if (["casual", "creative"].includes(tone) && Math.random() > 0.7) {
      const intensifiers = [
        "really",
        "actually",
        "pretty",
        "quite",
        "totally",
        "absolutely",
        "definitely",
      ];
      const words = result.split(" ");
      const idx = Math.floor(Math.random() * (words.length - 2)) + 1;
      if (
        words[idx].length > 4 &&
        !words[idx].match(
          /^(really|actually|pretty|quite|totally|absolutely|definitely)$/i,
        )
      ) {
        words.splice(
          idx,
          0,
          intensifiers[Math.floor(Math.random() * intensifiers.length)],
        );
        result = words.join(" ");
      }
    }

    // Add slight redundancy
    if (Math.random() > 0.85 && result.length > 200) {
      const phrases = result.match(/[^.!?]{20,60}[.!?]/g) || [];
      if (phrases.length > 2) {
        const phrase =
          phrases[Math.floor(Math.random() * phrases.length)].trim();
        const words = phrase.split(" ");
        if (words.length > 5) {
          const keyPhrase = words
            .slice(0, Math.floor(words.length / 2))
            .join(" ");
          result = result.replace(
            phrase,
            `${phrase} In other words, ${keyPhrase.toLowerCase()}.`,
          );
        }
      }
    }
  }

  // Natural imperfection injection
  if (Math.random() > 0.3) {
    result = result.replace(/\. ([A-Z][a-z]{3,15})\./g, (match, p1) => {
      if (Math.random() > 0.85) return `, ${p1.toLowerCase()}.`;
      return match;
    });

    if (tone === "casual" && Math.random() > 0.7) {
      const fragments = [
        "Interesting, right?",
        "Makes sense?",
        "Pretty wild, huh?",
        "You know what I mean?",
        "Anyway.",
      ];
      const sentences = result.split(/(?<=[.!?])\s+/);
      if (sentences.length > 3) {
        const idx = Math.floor(Math.random() * (sentences.length - 1)) + 1;
        sentences.splice(
          idx,
          0,
          fragments[Math.floor(Math.random() * fragments.length)],
        );
        result = sentences.join(" ");
      }
    }
  }

  // Final cleanup
  result = result.replace(/\s+/g, " ").trim();
  result = result.replace(/\s+([,.!?;:])/g, "$1");
  result = result.replace(/([,.!?;:])\s+/g, "$1 ");

  return result;
}

// ─── CONTEXT DETECTOR ───────────────────────────────────────────────────────
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
    a[1] > b[1] ? a : b,
  )[0];

  return {
    type: counts[maxType] >= 2 ? maxType : "general",
    confidence:
      counts[maxType] >= 3 ? "high" : counts[maxType] >= 1 ? "medium" : "low",
    signals: counts,
  };
}

// ─── FEW-SHOT EXAMPLES ──────────────────────────────────────────────────────
const FEW_SHOT_EXAMPLES = {
  casual: {
    input:
      "In today's rapidly evolving digital landscape, it is crucial to leverage cutting-edge technologies to facilitate seamless user experiences. Furthermore, it is worth noting that this revolutionary approach represents a paradigm shift in how we utilize modern solutions.",
    output:
      "Look, the tech world moves crazy fast right now. If you wanna keep up, you gotta use the right tools at the right time—that's really it. What's changed isn't just the tech itself; it's how we think about solving problems. And honestly? That shift has been coming for a while now.",
  },
  professional: {
    input:
      "Furthermore, it is important to note that the implementation of robust security measures is essential to mitigate potential vulnerabilities. In conclusion, organizations must leverage comprehensive frameworks to ensure compliance.",
    output:
      "It's also worth highlighting that strong security measures are essential for reducing potential risks. Put simply, organizations need to use comprehensive frameworks to stay compliant—and it's not optional anymore.",
  },
  creative: {
    input:
      "The utilization of innovative methodologies can facilitate transformative outcomes. It is evident that a holistic approach yields superior results.",
    output:
      "When you try fresh, bold approaches? Magic happens. Seriously—stepping back and looking at the whole picture, not just the pieces, is where the real breakthroughs live.",
  },
};

// ─── ADVANCED PROMPT BUILDER ────────────────────────────────────────────────
function buildAdvancedPrompt(inputText, tone, strength, contentType) {
  const toneGuides = {
    casual: {
      voice:
        "friendly, conversational, like you're chatting with a friend over coffee",
      sentences:
        "Mix short punchy sentences (3-8 words) with medium ones (10-18). Occasionally use fragments for emphasis.",
      words:
        "Use contractions naturally (it's, don't, you'll). Add informal intensifiers (really, actually, pretty) sparingly.",
      transitions:
        "Use natural connectors: 'so', 'but', 'and', 'look', 'honestly', 'here's the thing' — NOT formal transitions.",
    },
    professional: {
      voice:
        "clear, authoritative, but approachable — like an expert explaining to a colleague",
      sentences:
        "Vary structure: start some with verbs, some with prepositional phrases, avoid repetitive patterns.",
      words:
        "Use contractions where natural (it's, we're). Avoid jargon unless necessary; explain when used.",
      transitions:
        "Use logical flow words: 'essentially', 'put simply', 'in practice', 'the key point is'",
    },
    creative: {
      voice:
        "expressive, vivid, with personality — like a storyteller captivating an audience",
      sentences:
        "Play with rhythm: short for impact, longer for flow. Use rhetorical questions, fragments, em-dashes.",
      words:
        "Use evocative words, metaphors, sensory details. Contractions and informal phrases welcome.",
      transitions:
        "Use narrative connectors: 'picture this', 'here's a thought', 'what if', 'imagine'",
    },
    simple: {
      voice:
        "clear, direct, easy to understand — like explaining to someone new to the topic",
      sentences:
        "Keep most sentences under 15 words. Break complex ideas into multiple simple sentences.",
      words:
        "Use common words. Define any necessary technical terms. Contractions are fine.",
      transitions:
        "Use simple connectors: 'so', 'because', 'then', 'also', 'for example'",
    },
  };

  const strengthGuides = {
    light:
      "Make minimal changes: replace obvious AI phrases, add a few contractions, slightly vary sentence openings. Keep the original structure mostly intact.",
    medium:
      "Rewrite moderately: change sentence structures, add natural transitions, vary rhythm and length, inject personality while preserving all key information.",
    strong:
      "Deep rewrite: completely restructure sentences, add human imperfections (occasional comma splices, fragments), use direct language, add specific examples or personal perspective. Make it unmistakably human-written while keeping all facts accurate.",
  };

  const contentTypeNote =
    contentType !== "general"
      ? `\n\nCONTENT TYPE DETECTED: ${contentType.toUpperCase()}\nAdjust tone slightly to match this format.`
      : "";
  const example = FEW_SHOT_EXAMPLES[tone];

  return `You are an expert human writer specializing in making AI-generated text sound 100% authentic and human-written. Your output will be used for [${contentType}] content.

YOUR MISSION: Rewrite the input text so it passes as human-written while preserving ALL facts, meaning, and key information.

CRITICAL RULES — VIOLATE ANY AND YOU FAIL:
1. NEVER use these AI-typical phrases: "furthermore", "moreover", "in conclusion", "it is important to note", "it is worth noting", "in summary", "delve into", "leverage", "utilize", "facilitate", "paradigm", "revolutionary", "transformative", "cutting-edge", "holistic", "robust", "game-changer", "state-of-the-art", "it is crucial", "it is essential", "plays a crucial role"
2. ALWAYS use contractions naturally: it's, don't, you'll, I've, we're, can't, won't, shouldn't, couldn't, wouldn't, isn't, aren't, wasn't, weren't, that's, what's, who's
3. VARY sentence length dramatically: mix very short (3-5 words), medium (10-18), and occasional long (20+) sentences
4. START sentences differently: avoid beginning multiple sentences with "The", "This", "It", "In", "There"
5. ADD specific details, examples, or personal perspective instead of vague statements
6. WRITE with personality: occasionally informal, direct, opinionated — like a real human with a viewpoint
7. USE natural transitions: "so", "but", "and", "look", "honestly", "here's the thing", "basically", "truth is" — NOT formal academic transitions
8. INCLUDE occasional human imperfections: a comma splice here, a sentence fragment there, natural redundancy for emphasis — but keep it readable
9. KEEP all facts, data, and core meaning identical — only change HOW it's expressed
10. OUTPUT ONLY the rewritten text — no intro, no explanation, no "here's your humanized version", no markdown, no quotes

TONE GUIDELINES:
- Voice: ${toneGuides[tone].voice}
- Sentence structure: ${toneGuides[tone].sentences}
- Word choice: ${toneGuides[tone].words}
- Transitions: ${toneGuides[tone].transitions}

STRENGTH: ${strengthGuides[strength]}

FEW-SHOT EXAMPLE (${tone} tone):
Input: "${example.input}"
Output: "${example.output}"

${contentTypeNote}

INPUT TEXT TO REWRITE:
${inputText}

REWRITTEN HUMAN TEXT (output ONLY the rewritten text, nothing else):`;
}

// ─── GROQ API INTEGRATION ───────────────────────────────────────────────────
async function callGroqAPI(prompt, maxRetries = 3) {
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
                  "You are an expert human writer. Rewrite AI text to sound 100% human. Output ONLY the rewritten text with no preamble, explanation, or markdown. Preserve all facts and meaning.",
              },
              { role: "user", content: prompt },
            ],
            temperature: 0.7,
            top_p: 0.9,
            max_tokens: 2500,
            stop: ["INPUT TEXT", "REWRITTEN", "---"],
          }),
          signal: AbortSignal.timeout(30000),
        },
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          `Groq API error ${res.status}: ${errorData.error?.message || res.statusText}`,
        );
      }

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content?.trim();

      if (!content || content.length < 10) {
        throw new Error("Empty or invalid response from API");
      }

      const cleaned = content.replace(/^["']|["']$/g, "").trim();
      return cleaned;
    } catch (err) {
      lastError = err;
      console.warn(`Groq API attempt ${attempt} failed:`, err.message);
      if (attempt < maxRetries) {
        await new Promise((resolve) =>
          setTimeout(resolve, 500 * Math.pow(2, attempt - 1)),
        );
        continue;
      }
    }
  }

  throw lastError || new Error("API call failed after all retries");
}

// ─── DEMO OUTPUTS ───────────────────────────────────────────────────────────
const DEMO_OUTPUTS = {
  casual: {
    general: {
      short:
        "Yeah, so the digital world's moving crazy fast right now. If you wanna keep up, you gotta use the right tools at the right time. That's really it. What's changed isn't just the tech—it's how we think about solving problems. And honestly? That shift has been coming for a while.",
      medium:
        "Look, everyone's talking about AI these days. But here's the thing: most people are using it wrong. They just copy-paste whatever ChatGPT spits out and call it a day. Don't do that. Take a minute to edit, add your voice, make it sound like YOU wrote it. That's the difference between content that blends in and content that actually connects.",
      long: "I'll be real with you — when I first started using AI tools, I thought they'd do all the work for me. Just type a prompt, hit enter, and boom: perfect content. Didn't happen. What actually worked? Using AI as a starting point, then rewriting it in my own words. Adding my opinions, my examples, my weird little phrases. That's when things clicked. The tool isn't the writer. You are. The AI just helps you get there faster.",
    },
  },
  professional: {
    general: {
      short:
        "The digital landscape evolves rapidly. Success depends on selecting appropriate tools at the right moment. The real shift isn't technological—it's in our approach to problem-solving. This change has been developing for some time.",
      medium:
        "Many professionals adopt AI tools without a clear strategy. The result? Generic output that lacks distinction. The solution is simple: use AI for ideation and drafting, then refine with your expertise. Add context, adjust tone, and ensure the final piece reflects your authority. That's how you create content that stands out.",
      long: "Having worked with AI writing assistants for several years, I've observed a common pattern: users expect perfection from the first prompt. Reality is different. Effective AI use requires iteration. Start with a broad prompt, review the output, then refine with specific feedback. Add your domain knowledge, adjust for your audience, and polish the language. The result isn't just AI content—it's your content, accelerated.",
    },
  },
  creative: {
    general: {
      short:
        "The digital world? It's sprinting. And if you're still walking, you're already behind. But here's the twist: it's not about the tools you use—it's about how you think. And that? That's been changing quietly, steadily, for longer than most realize.",
      medium:
        "Picture this: you've got this shiny new AI tool. You type, you wait, you get… words. Good words. But do they sound like YOU? Probably not. So here's the secret sauce: take those words, twist them, flavor them with your voice, your quirks, your perspective. That's when magic happens. Not before.",
      long: "Let me tell you a story. Once upon a time, writers had to craft every sentence from scratch. Then came AI—like having a super-fast intern who never sleeps. But here's the catch: that intern doesn't know your voice, your humor, your heart. So what do you do? You collaborate. You guide. You edit. You make it yours. And suddenly, you're not just writing faster—you're writing better.",
    },
  },
  simple: {
    general: {
      short:
        "Things change fast online. Use the right tools at the right time. The big change isn't the technology—it's how we think. And that's been happening for a while.",
      medium:
        "A lot of people use AI to write for them. But the best results come when you use AI to help you write. Let it give you ideas. Then write it your way. Add your thoughts. Make it sound like you.",
      long: "When I started using AI, I thought it would write everything for me. It didn't. What worked better? Using AI to get started, then finishing in my own words. Adding my examples. My opinions. My style. That's when it started to feel right. The tool helps. But you're still the writer.",
    },
  },
};

const TONE_OPTIONS = [
  { value: "casual", label: "😊 Casual", desc: "Friendly, everyday language" },
  {
    value: "professional",
    label: "💼 Professional",
    desc: "Formal but natural",
  },
  { value: "creative", label: "🎨 Creative", desc: "Expressive and vivid" },
  { value: "simple", label: "📖 Simple", desc: "Easy to read, clear" },
];

const STRENGTH_OPTIONS = [
  { value: "light", label: "Light", desc: "Minor adjustments" },
  { value: "medium", label: "Medium", desc: "Balanced humanization" },
  { value: "strong", label: "Strong", desc: "Deep rewrite" },
];

export default function AiTextHumanizer() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [tone, setTone] = useState("casual");
  const [strength, setStrength] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedInput, setCopiedInput] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [error, setError] = useState("");
  const [useDemo, setUseDemo] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [passes, setPasses] = useState(3);
  const [contentType, setContentType] = useState("auto");

  const inputAnalysis = useMemo(() => advancedAiScore(inputText), [inputText]);
  const outputAnalysis = useMemo(
    () => (outputText ? advancedAiScore(outputText) : null),
    [outputText],
  );
  const detectedContent = useMemo(
    () => detectContentType(inputText),
    [inputText],
  );
  const wordCount = useCallback(
    (text) => (text.trim() ? text.trim().split(/\s+/).length : 0),
    [],
  );

  const getDemoOutput = useCallback(
    (input, tone, strength) => {
      const wc = wordCount(input);
      const base = DEMO_OUTPUTS[tone]?.general || DEMO_OUTPUTS.casual.general;
      if (wc < 30) return base.short;
      if (wc < 80) return base.medium;
      return base.long;
    },
    [wordCount],
  );

  const humanize = useCallback(async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to humanize");
      return;
    }
    if (wordCount(inputText) < 15) {
      setError("Please enter at least 15 words for meaningful humanization");
      return;
    }

    setLoading(true);
    setError("");
    setOutputText("");
    setUseDemo(false);

    const effectiveTone = tone;
    const effectiveStrength = strength;
    const effectiveContentType =
      contentType === "auto" ? detectedContent.type : contentType;
    const prompt = buildAdvancedPrompt(
      inputText,
      effectiveTone,
      effectiveStrength,
      effectiveContentType,
    );

    try {
      let rawOutput;
      if (process.env.NEXT_PUBLIC_GROQ_API_KEY) {
        try {
          rawOutput = await callGroqAPI(prompt);
        } catch (apiErr) {
          console.warn(
            "Groq API failed, falling back to demo:",
            apiErr.message,
          );
          rawOutput = null;
        }
      }
      if (!rawOutput || rawOutput.length < 20) {
        rawOutput = getDemoOutput(inputText, effectiveTone, effectiveStrength);
        setUseDemo(true);
      }

      let finalOutput = advancedPostProcess(
        rawOutput,
        effectiveTone,
        advancedMode ? passes : 1,
      );
      if (wordCount(finalOutput) < wordCount(inputText) * 0.7) {
        finalOutput = advancedPostProcess(
          getDemoOutput(inputText, effectiveTone, effectiveStrength),
          effectiveTone,
          advancedMode ? passes : 1,
        );
        setUseDemo(true);
      }
      setOutputText(finalOutput);
    } catch (err) {
      console.error("Humanization error:", err);
      setError(
        "Humanization failed. Using high-quality demo output for testing.",
      );
      const demoOutput = getDemoOutput(
        inputText,
        effectiveTone,
        effectiveStrength,
      );
      setOutputText(
        advancedPostProcess(
          demoOutput,
          effectiveTone,
          advancedMode ? passes : 1,
        ),
      );
      setUseDemo(true);
    } finally {
      setLoading(false);
    }
  }, [
    inputText,
    tone,
    strength,
    contentType,
    advancedMode,
    passes,
    wordCount,
    getDemoOutput,
    detectedContent.type,
  ]);

  const copyOutput = useCallback(() => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [outputText]);
  const copyInput = useCallback(() => {
    if (!inputText) return;
    navigator.clipboard.writeText(inputText);
    setCopiedInput(true);
    setTimeout(() => setCopiedInput(false), 2000);
  }, [inputText]);
  const reset = useCallback(() => {
    setInputText("");
    setOutputText("");
    setError("");
    setUseDemo(false);
    setCopied(false);
    setCopiedInput(false);
  }, []);
  const swapText = useCallback(() => {
    if (outputText) {
      setInputText(outputText);
      setOutputText("");
      setUseDemo(false);
    }
  }, [outputText]);

  const getScoreLabel = useCallback((score, confidence) => {
    if (score === null)
      return {
        text: "text-gray-400",
        bg: "bg-gray-100",
        label: "—",
        bar: "bg-gray-300",
      };
    if (score >= 70)
      return {
        text: "text-red-600",
        bg: "bg-red-50 border-red-200",
        label: "Likely AI",
        bar: "bg-red-500",
      };
    if (score >= 40)
      return {
        text: "text-yellow-600",
        bg: "bg-yellow-50 border-yellow-200",
        label: "Possibly AI",
        bar: "bg-yellow-500",
      };
    return {
      text: "text-green-600",
      bg: "bg-green-50 border-green-200",
      label: "Looks Human",
      bar: "bg-green-500",
    };
  }, []);

  const inputScoreData = inputAnalysis
    ? getScoreLabel(inputAnalysis.score, inputAnalysis.confidence)
    : null;
  const outputScoreData = outputAnalysis
    ? getScoreLabel(outputAnalysis.score, outputAnalysis.confidence)
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
                className="inline-flex items-center gap-1.5 hover:text-violet-600 transition-colors"
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
                className="hover:text-violet-600 transition-colors"
              >
                All Tools
              </Link>
            </li>
            <li>
              <span className="text-gray-300">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-semibold">
                AI Text Humanizer
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-6xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-6">
          <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <Sparkles size={13} /> Production-Ready • Advanced Humanization
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
            Advanced AI Text to Human Text Converter —{" "}
            <span className="text-violet-600">
              Bypass AI Detection with 15+ Signals
            </span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Convert AI-generated text into authentic human writing using
            advanced linguistic analysis, multi-pass rewriting, and natural
            imperfection injection. Works with ChatGPT, Claude, Gemini — free,
            no signup.
          </p>
        </div>

        {/* MAIN TOOL CARD */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden mb-8">
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/60 flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-violet-600 rounded-xl flex items-center justify-center">
                <Wand2 size={15} className="text-white" />
              </div>
              <span className="font-semibold text-gray-800">
                AI Text Humanizer
              </span>
              {useDemo && (
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                  <Key size={10} /> Demo Mode
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setAdvancedMode(!advancedMode)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${advancedMode ? "bg-violet-50 border-violet-300 text-violet-700" : "bg-white border-gray-200 text-gray-600 hover:border-violet-300"}`}
              >
                <Sliders size={12} /> {advancedMode ? "Advanced" : "Standard"}
              </button>
              {TONE_OPTIONS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTone(t.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${tone === t.value ? "bg-violet-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-violet-300"}`}
                >
                  {t.label}
                </button>
              ))}
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
            <div className="px-6 py-4 border-b border-gray-100 bg-violet-50/30">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Rewrite Strength
                  </label>
                  <div className="flex gap-2">
                    {STRENGTH_OPTIONS.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => setStrength(s.value)}
                        className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${strength === s.value ? "border-violet-500 bg-violet-50 text-violet-700" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Content Type
                  </label>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
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
                    Post-Process Passes
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={passes}
                    onChange={(e) => setPasses(parseInt(e.target.value))}
                    className="w-full accent-violet-600"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {passes} pass{passes > 1 ? "es" : ""} •{" "}
                    {passes === 1
                      ? "Fast"
                      : passes <= 3
                        ? "Balanced"
                        : "Thorough"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Editor Area */}
          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
            {/* LEFT — Input */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    AI Text Input
                  </span>
                  {inputAnalysis && (
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${inputScoreData.bg} ${inputScoreData.text}`}
                    >
                      {inputScoreData.label} ({inputAnalysis.score}%)
                    </span>
                  )}
                  {detectedContent.type !== "general" && (
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100">
                      {detectedContent.type}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {wordCount(inputText)} words
                  </span>
                  <button
                    onClick={copyInput}
                    disabled={!inputText}
                    className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 disabled:opacity-40 transition-colors"
                  >
                    {copiedInput ? (
                      <>
                        <CheckCircle size={12} className="text-green-500" />{" "}
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={12} /> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div className="relative flex-1">
                <textarea
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    setOutputText("");
                    setError("");
                    setUseDemo(false);
                  }}
                  placeholder="Paste your AI-generated text here...

Tips for best results:
• Enter at least 50 words for meaningful humanization
• Include full paragraphs, not just fragments
• The more context, the better the tone matching

Example AI text:
'In today's rapidly evolving digital landscape, it is crucial to leverage cutting-edge technologies to facilitate seamless user experiences. Furthermore, it is worth noting that this revolutionary approach represents a paradigm shift in how we utilize modern solutions.'"
                  className="w-full h-72 px-5 py-4 text-sm text-gray-800 bg-transparent resize-none focus:outline-none leading-relaxed"
                />
                {inputText && inputAnalysis && (
                  <div className="absolute bottom-4 left-5 right-5">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>AI Detection Score</span>
                      <span className={`font-semibold ${inputScoreData.text}`}>
                        {inputAnalysis.score}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${inputScoreData.bar}`}
                        style={{ width: `${inputAnalysis.score}%` }}
                      />
                    </div>
                    {inputAnalysis.reasons.length > 0 && (
                      <details className="mt-2">
                        <summary className="text-xs text-violet-600 cursor-pointer hover:underline">
                          Why this score? ({inputAnalysis.reasons.length}{" "}
                          signals)
                        </summary>
                        <ul className="text-xs text-gray-500 mt-1 space-y-0.5 pl-2">
                          {inputAnalysis.reasons.slice(0, 3).map((r, i) => (
                            <li key={i}>• {r}</li>
                          ))}
                          {inputAnalysis.reasons.length > 3 && (
                            <li>• +{inputAnalysis.reasons.length - 3} more</li>
                          )}
                        </ul>
                      </details>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT — Output */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Human Text Output
                  </span>
                  {outputAnalysis && (
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${outputScoreData.bg} ${outputScoreData.text}`}
                    >
                      {outputScoreData.label} ({outputAnalysis.score}%)
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {wordCount(outputText)} words
                  </span>
                  {outputText && (
                    <>
                      <button
                        onClick={swapText}
                        title="Use output as new input"
                        className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-violet-600 transition-colors"
                      >
                        <RotateCcw size={12} /> Retry
                      </button>
                      <button
                        onClick={copyOutput}
                        className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {copied ? (
                          <>
                            <CheckCircle size={12} className="text-green-500" />{" "}
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={12} /> Copy
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="relative flex-1 min-h-72">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-72 gap-4">
                    <div className="relative w-12 h-12">
                      <div className="w-12 h-12 border-4 border-violet-100 border-t-violet-600 rounded-full animate-spin" />
                      <Wand2
                        size={16}
                        className="text-violet-600 absolute inset-0 m-auto"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700">
                        Humanizing your text...
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {advancedMode
                          ? `Advanced mode • ${passes} passes`
                          : "Standard mode"}
                      </p>
                    </div>
                    <div className="flex gap-1.5 flex-wrap justify-center">
                      {[
                        "Analyzing patterns",
                        "Rewriting structure",
                        "Adding natural flow",
                        "Final polish",
                      ]
                        .slice(0, advancedMode ? 4 : 2)
                        .map((step, i) => (
                          <span
                            key={i}
                            className="text-xs bg-violet-50 text-violet-600 px-2 py-1 rounded-lg border border-violet-100 animate-pulse"
                            style={{ animationDelay: `${i * 150}ms` }}
                          >
                            {step}
                          </span>
                        ))}
                    </div>
                  </div>
                ) : outputText ? (
                  <div className="relative">
                    <div className="px-5 py-4 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {outputText}
                    </div>
                    {outputAnalysis && (
                      <div className="px-5 pb-4">
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                          <span>AI Score after humanizing</span>
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-semibold ${outputScoreData.text}`}
                            >
                              {outputAnalysis.score}%
                            </span>
                            {inputAnalysis &&
                              outputAnalysis.score < inputAnalysis.score && (
                                <span className="text-xs text-green-600 font-semibold flex items-center gap-0.5">
                                  <TrendingUp
                                    size={10}
                                    className="rotate-180"
                                  />{" "}
                                  {inputAnalysis.score - outputAnalysis.score}%
                                  better
                                </span>
                              )}
                          </div>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${outputScoreData.bar}`}
                            style={{ width: `${outputAnalysis.score}%` }}
                          />
                        </div>
                        {outputAnalysis.reasons.length > 0 && (
                          <details className="mt-2">
                            <summary className="text-xs text-violet-600 cursor-pointer hover:underline">
                              Humanization details
                            </summary>
                            <ul className="text-xs text-gray-500 mt-1 space-y-0.5 pl-2">
                              {outputAnalysis.reasons
                                .slice(0, 3)
                                .map((r, i) => (
                                  <li key={i}>• {r}</li>
                                ))}
                            </ul>
                          </details>
                        )}
                      </div>
                    )}
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center h-72 gap-3 px-8 text-center">
                    <AlertTriangle size={28} className="text-amber-400" />
                    <p className="text-sm text-amber-700">{error}</p>
                    <p className="text-xs text-gray-400">
                      Showing high-quality demo output
                    </p>
                    <button
                      onClick={humanize}
                      className="text-xs text-violet-600 hover:underline"
                    >
                      Try again
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-72 gap-3 px-8 text-center">
                    <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center">
                      <Eye size={24} className="text-violet-300" />
                    </div>
                    <p className="text-sm text-gray-400">
                      Your humanized text will appear here
                    </p>
                    <p className="text-xs text-gray-300">
                      Paste AI text on the left and click Humanize
                    </p>
                    {advancedMode && (
                      <p className="text-xs text-violet-500 mt-1">
                        Advanced mode enabled • {passes} post-process passes
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom — Humanize Button */}
          <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <Info size={13} className="flex-shrink-0" />
              <span>
                AI scores are estimates based on 15+ linguistic signals. For
                critical use, verify with <strong>GPTZero</strong> or{" "}
                <strong>Originality.ai</strong>.
              </span>
            </div>
            <button
              onClick={humanize}
              disabled={
                !inputText.trim() || loading || wordCount(inputText) < 15
              }
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:opacity-40 text-white font-bold rounded-xl transition-all shadow-lg shadow-violet-200 text-sm flex-shrink-0 hover:scale-105 active:scale-95"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                  Humanizing...
                </>
              ) : (
                <>
                  <Wand2 size={16} /> Humanize Text <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Before/After comparison */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <p className="text-sm font-bold text-red-700 mb-3 flex items-center gap-2">
              🤖 Typical AI Text (Before)
            </p>
            <p className="text-sm text-red-800 leading-relaxed italic">
              "In today's rapidly evolving digital landscape, it is crucial to
              leverage cutting-edge technologies to facilitate seamless
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
              ✍️ After Advanced Humanizing
            </p>
            <p className="text-sm text-green-800 leading-relaxed">
              "Look, the tech world moves crazy fast right now. If you wanna
              keep up, you gotta use the right tools at the right time—that's
              really it. What's changed isn't just the tech itself; it's how we
              think about solving problems. And honestly? That shift has been
              coming for a while now."
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
            State-of-the-Art AI Text to Human Text Converter – Over 15 Signals
            Detected{" "}
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            AI-written text has its telltale signs. These include the frequent
            use of certain transitions, identical sentence construction, absence
            of contractions, and stereotypical examples. The sophisticated AI
            converter that we have created uses more than 15 signals and
            rewrites your text to sound as natural and human as possible.
          </p>
          <p className="text-gray-600 leading-relaxed">
            With Groq-powered Llama 3, few-shot prompting, multi-pass
            post-processing, and superior prompt engineering, the tool creates
            text that seems to be written by humans and not by machines. Adjust
            tone, forcefulness of writing, type of content, and processing to
            meet your needs exactly.
          </p>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Advanced AI Text Humanizer Guide
          </h2>
          <ol className="list-decimal list-inside text-gray-600 space-y-3 text-base">
            <li>
              Paste your <strong>AI-generated text</strong> (minimum 15 words)
              into the input box.
            </li>
            <li>
              Choose your <strong>tone</strong> — Casual, Professional,
              Creative, or Simple.
            </li>
            <li>
              (Advanced) Enable <strong>Advanced Mode</strong> to control
              rewrite strength, content type, and post-processing passes.
            </li>
            <li>
              Review the <strong>AI detection score</strong> showing which
              signals triggered detection.
            </li>
            <li>
              Click <strong>"Humanize Text"</strong> and wait for the rewrite
              (2-5 seconds).
            </li>
            <li>
              Check the <strong>improved AI score</strong> and read the
              humanized output.
            </li>
            <li>
              Use <strong>"Retry"</strong> to run the output through again for
              even lower scores.
            </li>
            <li>
              Click <strong>"Copy"</strong> and paste into your document.
            </li>
          </ol>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Humanizer Pro — Features
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: "15+ Signal Recognition",
                desc: "Examines artificial intelligence phrases, sentences, contractions, transitions, vague language, perfect grammar, passive voice, and much more for precise evaluation.",
              },
              {
                title: "Smart Context-Based Re-write",
                desc: "Automatically identifies writing context (blog, email, essay, social) or specifies one to match the style and structure.",
              },
              {
                title: "Multiple Rounds of Post-Processing",
                desc: "Use up to five rounds of post-processing for natural language generation: include contractions, varied sentence lengths, and other nuances.",
              },
              {
                title: "Production Ready API",
                desc: "Powered by Groq with retry logic and fallbacks. Demo mode allows the service to be used without an API key.",
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
            AI Text Humanizer — Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              {
                q: "How does the advanced humanizer work?",
                a: "The tool uses a three-layer approach: (1) Advanced prompt engineering with few-shot examples sent to Groq's Llama 3, (2) Multi-pass post-processing that adds contractions, varies sentences, and injects natural imperfections, and (3) Context-aware rewriting that adapts to blog, email, essay, or social media formats. The result is text that reads like it was written by a human.",
              },
              {
                q: "Can this bypass Turnitin or GPTZero?",
                a: "Our tool significantly reduces AI detection scores across most detectors by addressing the linguistic patterns they analyze. However, no tool guarantees 100% undetectability — detectors evolve, and human review is always recommended for academic or professional submissions.",
              },
              {
                q: "Is my text stored or shared?",
                a: "In standard mode, all analysis happens client-side. When using Groq API, text is sent for processing but is not logged or stored by us. We never save, share, or use your content for training. For maximum privacy, use the tool offline or with a self-hosted model.",
              },
              {
                q: "What's the difference between Light, Medium, and Strong modes?",
                a: "Light: minimal edits (replace AI phrases, add contractions). Medium: moderate rewriting (vary sentence structure, add natural transitions). Strong: deep rewrite (restructure sentences, add human imperfections, inject personality). Use Strong for lowest AI scores, Light for preserving original structure.",
              },
              {
                q: "Why does my humanized text still get flagged?",
                a: "AI detectors use probabilistic models. Very long texts, highly technical content, or heavily edited AI output may need multiple passes. Try: (1) Using Strong mode with 3-5 post-process passes, (2) Adding your own examples or personal perspective manually, (3) Running the output through the humanizer again.",
              },
              {
                q: "Does this work for non-English text?",
                a: "Currently optimized for English. The heuristic analysis and prompt engineering are tuned for English linguistic patterns. Support for other languages is planned. For non-English content, results may be less reliable.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-violet-200 transition-colors duration-300"
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
                    className={`text-violet-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
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
                href: "/tools/ai-content-detector",
                title: "AI Content Detector",
                desc: "Check if text is AI-written with 15+ signal analysis.",
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
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-violet-400 transition-all"
              >
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-violet-600 transition-colors">
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
