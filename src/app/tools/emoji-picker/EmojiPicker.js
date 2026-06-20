"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Copy,
  Search,
  X,
  Smile,
  Home,
  ChevronDown,
  Code,
  HelpCircle,
  Zap,
  Shield,
  BarChart3,
  FileText,
  Download,
} from "lucide-react";
import ResponsiveAd from "../../../components/ResponsiveAd";

// ─── Emoji Data by Category ──────────────────────────────────────────────────
const EMOJI_DATA = {
  "😀 Smileys": [
    { emoji: "😀", name: "grinning face" },
    { emoji: "😃", name: "grinning big eyes" },
    { emoji: "😄", name: "grinning smiling eyes" },
    { emoji: "😁", name: "beaming smiling eyes" },
    { emoji: "😆", name: "grinning squinting" },
    { emoji: "😅", name: "grinning sweat" },
    { emoji: "😂", name: "tears of joy" },
    { emoji: "🤣", name: "rolling laughing" },
    { emoji: "😊", name: "smiling eyes" },
    { emoji: "😇", name: "smiling halo" },
    { emoji: "🥰", name: "smiling hearts" },
    { emoji: "😍", name: "heart eyes" },
    { emoji: "🤩", name: "star struck" },
    { emoji: "😘", name: "blowing kiss" },
    { emoji: "😋", name: "savoring food" },
    { emoji: "😛", name: "face tongue" },
    { emoji: "😜", name: "winking tongue" },
    { emoji: "🤪", name: "zany face" },
    { emoji: "🤑", name: "money mouth" },
    { emoji: "🤗", name: "hugging face" },
    { emoji: "🤭", name: "hand over mouth" },
    { emoji: "🤫", name: "shushing face" },
    { emoji: "🤔", name: "thinking face" },
    { emoji: "😏", name: "smirking face" },
    { emoji: "🙄", name: "rolling eyes" },
    { emoji: "😬", name: "grimacing face" },
    { emoji: "😌", name: "relieved face" },
    { emoji: "😔", name: "pensive face" },
    { emoji: "😴", name: "sleeping face" },
    { emoji: "😷", name: "masked face" },
    { emoji: "🤢", name: "nauseated face" },
    { emoji: "🤮", name: "vomiting face" },
    { emoji: "🥵", name: "hot face" },
    { emoji: "🥶", name: "cold face" },
    { emoji: "🥴", name: "woozy face" },
    { emoji: "🤯", name: "exploding head" },
    { emoji: "😎", name: "cool sunglasses" },
    { emoji: "🥺", name: "pleading face" },
    { emoji: "😢", name: "crying face" },
    { emoji: "😭", name: "loudly crying" },
    { emoji: "😤", name: "steam nose" },
    { emoji: "😡", name: "pouting angry" },
    { emoji: "🤬", name: "symbols mouth" },
    { emoji: "💀", name: "skull" },
    { emoji: "☠️", name: "skull crossbones" },
    { emoji: "💩", name: "pile of poo" },
    { emoji: "🤡", name: "clown face" },
    { emoji: "👻", name: "ghost" },
    { emoji: "👽", name: "alien" },
    { emoji: "🤖", name: "robot" },
  ],
  "👋 Gestures": [
    { emoji: "👍", name: "thumbs up" },
    { emoji: "👎", name: "thumbs down" },
    { emoji: "👌", name: "ok hand" },
    { emoji: "✌️", name: "victory hand" },
    { emoji: "🤞", name: "crossed fingers" },
    { emoji: "🤟", name: "love you gesture" },
    { emoji: "🤘", name: "sign of horns" },
    { emoji: "🤙", name: "call me hand" },
    { emoji: "👏", name: "clapping hands" },
    { emoji: "🙌", name: "raising hands" },
    { emoji: "🤲", name: "palms up" },
    { emoji: "🙏", name: "folded hands" },
    { emoji: "✊", name: "raised fist" },
    { emoji: "👊", name: "oncoming fist" },
    { emoji: "🤛", name: "left fist" },
    { emoji: "🤜", name: "right fist" },
    { emoji: "💪", name: "flexed bicep" },
    { emoji: "🖐️", name: "hand splayed" },
    { emoji: "✋", name: "raised hand" },
    { emoji: "👋", name: "waving hand" },
    { emoji: "🤚", name: "raised back hand" },
    { emoji: "👆", name: "index pointing up" },
    { emoji: "👇", name: "index pointing down" },
    { emoji: "👈", name: "index pointing left" },
    { emoji: "👉", name: "index pointing right" },
    { emoji: "☝️", name: "index pointing upward" },
    { emoji: "🖕", name: "middle finger" },
    { emoji: "🤏", name: "pinching hand" },
    { emoji: "👐", name: "open hands" },
    { emoji: "🫶", name: "heart hands" },
  ],
  "🐶 Animals": [
    { emoji: "🐶", name: "dog face" },
    { emoji: "🐱", name: "cat face" },
    { emoji: "🐭", name: "mouse face" },
    { emoji: "🐹", name: "hamster" },
    { emoji: "🐰", name: "rabbit face" },
    { emoji: "🦊", name: "fox face" },
    { emoji: "🐻", name: "bear face" },
    { emoji: "🐼", name: "panda face" },
    { emoji: "🐨", name: "koala" },
    { emoji: "🦁", name: "lion face" },
    { emoji: "🐮", name: "cow face" },
    { emoji: "🐷", name: "pig face" },
    { emoji: "🐸", name: "frog face" },
    { emoji: "🐵", name: "monkey face" },
    { emoji: "🙈", name: "see no evil" },
    { emoji: "🙉", name: "hear no evil" },
    { emoji: "🙊", name: "speak no evil" },
    { emoji: "🐔", name: "chicken" },
    { emoji: "🐧", name: "penguin" },
    { emoji: "🦅", name: "eagle" },
    { emoji: "🦆", name: "duck" },
    { emoji: "🦢", name: "swan" },
    { emoji: "🦉", name: "owl" },
    { emoji: "🦚", name: "peacock" },
    { emoji: "🦜", name: "parrot" },
    { emoji: "🦩", name: "flamingo" },
    { emoji: "🐍", name: "snake" },
    { emoji: "🦖", name: "t-rex" },
    { emoji: "🦕", name: "sauropod" },
    { emoji: "🐢", name: "turtle" },
    { emoji: "🦎", name: "lizard" },
    { emoji: "🐊", name: "crocodile" },
    { emoji: "🐬", name: "dolphin" },
    { emoji: "🐳", name: "whale" },
    { emoji: "🦈", name: "shark" },
    { emoji: "🐙", name: "octopus" },
    { emoji: "🦋", name: "butterfly" },
    { emoji: "🐝", name: "honeybee" },
    { emoji: "🦄", name: "unicorn" },
    { emoji: "🐉", name: "dragon" },
  ],
  "🍕 Food": [
    { emoji: "🍎", name: "red apple" },
    { emoji: "🍌", name: "banana" },
    { emoji: "🍇", name: "grapes" },
    { emoji: "🍉", name: "watermelon" },
    { emoji: "🍓", name: "strawberry" },
    { emoji: "🥝", name: "kiwi" },
    { emoji: "🍑", name: "peach" },
    { emoji: "🍒", name: "cherries" },
    { emoji: "🥭", name: "mango" },
    { emoji: "🍍", name: "pineapple" },
    { emoji: "🥥", name: "coconut" },
    { emoji: "🌽", name: "corn" },
    { emoji: "🥕", name: "carrot" },
    { emoji: "🧄", name: "garlic" },
    { emoji: "🍕", name: "pizza" },
    { emoji: "🍔", name: "hamburger" },
    { emoji: "🍟", name: "french fries" },
    { emoji: "🌭", name: "hot dog" },
    { emoji: "🌮", name: "taco" },
    { emoji: "🌯", name: "burrito" },
    { emoji: "🍣", name: "sushi" },
    { emoji: "🍜", name: "noodles" },
    { emoji: "🍛", name: "curry rice" },
    { emoji: "🍲", name: "pot of food" },
    { emoji: "🥘", name: "paella" },
    { emoji: "🍰", name: "shortcake" },
    { emoji: "🧁", name: "cupcake" },
    { emoji: "🍩", name: "doughnut" },
    { emoji: "🍫", name: "chocolate" },
    { emoji: "🍬", name: "candy" },
    { emoji: "🍭", name: "lollipop" },
    { emoji: "☕", name: "hot coffee" },
    { emoji: "🍵", name: "tea cup" },
    { emoji: "🧋", name: "bubble tea" },
    { emoji: "🥤", name: "cup with straw" },
    { emoji: "🍺", name: "beer mug" },
    { emoji: "🍻", name: "clinking beers" },
  ],
  "❤️ Hearts": [
    { emoji: "❤️", name: "red heart" },
    { emoji: "🧡", name: "orange heart" },
    { emoji: "💛", name: "yellow heart" },
    { emoji: "💚", name: "green heart" },
    { emoji: "💙", name: "blue heart" },
    { emoji: "💜", name: "purple heart" },
    { emoji: "🖤", name: "black heart" },
    { emoji: "🤍", name: "white heart" },
    { emoji: "🤎", name: "brown heart" },
    { emoji: "💔", name: "broken heart" },
    { emoji: "❤️‍🔥", name: "heart on fire" },
    { emoji: "❤️‍🩹", name: "mending heart" },
    { emoji: "💕", name: "two hearts" },
    { emoji: "💞", name: "revolving hearts" },
    { emoji: "💓", name: "beating heart" },
    { emoji: "💗", name: "growing heart" },
    { emoji: "💖", name: "sparkling heart" },
    { emoji: "💘", name: "heart with arrow" },
    { emoji: "💝", name: "heart with ribbon" },
    { emoji: "💟", name: "heart decoration" },
    { emoji: "♥️", name: "heart suit" },
    { emoji: "😍", name: "heart eyes" },
    { emoji: "🥰", name: "hearts face" },
    { emoji: "💌", name: "love letter" },
    { emoji: "💑", name: "couple with heart" },
  ],
  "🔥 Symbols": [
    { emoji: "🔥", name: "fire" },
    { emoji: "💯", name: "hundred points" },
    { emoji: "⭐", name: "star" },
    { emoji: "🌟", name: "glowing star" },
    { emoji: "✨", name: "sparkles" },
    { emoji: "⚡", name: "lightning bolt" },
    { emoji: "💥", name: "collision" },
    { emoji: "🚀", name: "rocket" },
    { emoji: "🎯", name: "bullseye" },
    { emoji: "🏆", name: "trophy" },
    { emoji: "🥇", name: "gold medal" },
    { emoji: "🎖️", name: "military medal" },
    { emoji: "💎", name: "gem stone" },
    { emoji: "💰", name: "money bag" },
    { emoji: "💸", name: "flying money" },
    { emoji: "💡", name: "light bulb" },
    { emoji: "🔑", name: "key" },
    { emoji: "🗝️", name: "old key" },
    { emoji: "⚙️", name: "gear" },
    { emoji: "🔧", name: "wrench" },
    { emoji: "🛡️", name: "shield" },
    { emoji: "⚔️", name: "crossed swords" },
    { emoji: "🧲", name: "magnet" },
    { emoji: "🎵", name: "musical note" },
    { emoji: "🎶", name: "musical notes" },
    { emoji: "📱", name: "mobile phone" },
    { emoji: "💻", name: "laptop" },
    { emoji: "🖥️", name: "desktop" },
    { emoji: "📷", name: "camera" },
    { emoji: "🎮", name: "video game" },
    { emoji: "📚", name: "books" },
    { emoji: "✏️", name: "pencil" },
    { emoji: "📝", name: "memo" },
    { emoji: "📌", name: "pushpin" },
    { emoji: "🔔", name: "bell" },
    { emoji: "✅", name: "check mark" },
    { emoji: "❌", name: "cross mark" },
    { emoji: "⚠️", name: "warning" },
    { emoji: "🚫", name: "no entry" },
    { emoji: "♻️", name: "recycling" },
  ],
  "✈️ Travel": [
    { emoji: "✈️", name: "airplane" },
    { emoji: "🚀", name: "rocket" },
    { emoji: "🚗", name: "car" },
    { emoji: "🚕", name: "taxi" },
    { emoji: "🚌", name: "bus" },
    { emoji: "🚂", name: "train" },
    { emoji: "🚢", name: "ship" },
    { emoji: "⛵", name: "sailboat" },
    { emoji: "🏖️", name: "beach" },
    { emoji: "🏔️", name: "mountain" },
    { emoji: "🗻", name: "mount fuji" },
    { emoji: "🏕️", name: "camping" },
    { emoji: "🗼", name: "tokyo tower" },
    { emoji: "🗽", name: "statue liberty" },
    { emoji: "🏰", name: "castle" },
    { emoji: "🕌", name: "mosque" },
    { emoji: "⛩️", name: "shinto shrine" },
    { emoji: "🕍", name: "synagogue" },
    { emoji: "⛪", name: "church" },
    { emoji: "🌍", name: "globe europe africa" },
    { emoji: "🌎", name: "globe americas" },
    { emoji: "🌏", name: "globe asia" },
    { emoji: "🗺️", name: "world map" },
    { emoji: "🧭", name: "compass" },
    { emoji: "🌐", name: "globe meridians" },
    { emoji: "🎒", name: "backpack" },
    { emoji: "🧳", name: "luggage" },
    { emoji: "🎫", name: "ticket" },
    { emoji: "🏨", name: "hotel" },
    { emoji: "⛽", name: "fuel pump" },
  ],
  "🇵🇰 Flags": [
    { emoji: "🇵🇰", name: "flag Pakistan" },
    { emoji: "🇮🇳", name: "flag India" },
    { emoji: "🇦🇪", name: "flag UAE" },
    { emoji: "🇸🇦", name: "flag Saudi Arabia" },
    { emoji: "🇺🇸", name: "flag United States" },
    { emoji: "🇬🇧", name: "flag United Kingdom" },
    { emoji: "🇨🇦", name: "flag Canada" },
    { emoji: "🇦🇺", name: "flag Australia" },
    { emoji: "🇩🇪", name: "flag Germany" },
    { emoji: "🇫🇷", name: "flag France" },
    { emoji: "🇨🇳", name: "flag China" },
    { emoji: "🇯🇵", name: "flag Japan" },
    { emoji: "🇰🇷", name: "flag South Korea" },
    { emoji: "🇧🇩", name: "flag Bangladesh" },
    { emoji: "🇲🇾", name: "flag Malaysia" },
    { emoji: "🇹🇷", name: "flag Turkey" },
    { emoji: "🇮🇷", name: "flag Iran" },
    { emoji: "🇪🇬", name: "flag Egypt" },
    { emoji: "🇳🇬", name: "flag Nigeria" },
    { emoji: "🇧🇷", name: "flag Brazil" },
    { emoji: "🇲🇽", name: "flag Mexico" },
    { emoji: "🇷🇺", name: "flag Russia" },
    { emoji: "🇮🇹", name: "flag Italy" },
    { emoji: "🇪🇸", name: "flag Spain" },
    { emoji: "🇰🇼", name: "flag Kuwait" },
    { emoji: "🇶🇦", name: "flag Qatar" },
    { emoji: "🇴🇲", name: "flag Oman" },
    { emoji: "🇧🇭", name: "flag Bahrain" },
    { emoji: "🇮🇩", name: "flag Indonesia" },
    { emoji: "🌍", name: "globe" },
  ],
};

const ALL_EMOJIS = Object.values(EMOJI_DATA).flat();
const CATEGORIES = ["All", ...Object.keys(EMOJI_DATA)];

const EmojiPicker = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState([]);
  const [recent, setRecent] = useState([]);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1500);
  };

  const filteredEmojis = useMemo(() => {
    const pool =
      activeCategory === "All" ? ALL_EMOJIS : EMOJI_DATA[activeCategory] || [];
    if (!search.trim()) return pool;
    return ALL_EMOJIS.filter((e) =>
      e.name.toLowerCase().includes(search.toLowerCase().trim()),
    );
  }, [search, activeCategory]);

  const addToSelected = (emoji) => {
    if (!selected.includes(emoji)) setSelected([...selected, emoji]);
    setRecent((prev) =>
      [emoji, ...prev.filter((e) => e !== emoji)].slice(0, 16),
    );
  };

  const copySingle = (emoji, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(emoji);
    showToast(`${emoji} Copied!`);
  };

  const removeFromSelected = (emoji) =>
    setSelected(selected.filter((e) => e !== emoji));

  const copySelected = () => {
    if (!selected.length) return;
    navigator.clipboard.writeText(selected.join(""));
    setCopied(true);
    showToast(
      `Copied ${selected.length} emoji${selected.length > 1 ? "s" : ""}!`,
    );
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-lg">
          {toast}
        </div>
      )}

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 hover:text-yellow-500 transition-colors"
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
                className="hover:text-yellow-500 transition-colors"
              >
                All Tools
              </Link>
            </li>
            <li>
              <span className="text-gray-300">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-semibold">Emoji Picker</span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-yellow-100 mb-4">
            <Smile className="text-yellow-500" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Emoji Picker
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Search, select, and copy 500+ emojis instantly. Organized by
            category with a smart search bar. Perfect for WhatsApp, Instagram,
            Discord, and more.
          </p>
        </div>

        <ResponsiveAd />

        {/* Tool Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveCategory("All");
              }}
              placeholder="Search emojis… heart, fire, cat, food, pakistan"
              className="w-full px-5 py-3.5 pl-11 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent shadow-sm"
            />
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          {!search && (
            <div className="flex gap-2 flex-wrap justify-center mb-6">
              {CATEGORIES.map((cat) => {
                const count =
                  cat === "All"
                    ? ALL_EMOJIS.length
                    : EMOJI_DATA[cat]?.length || 0;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                      activeCategory === cat
                        ? "bg-yellow-400 text-gray-900 border-yellow-400"
                        : "bg-white text-gray-600 border-gray-200 hover:border-yellow-300"
                    }`}
                  >
                    {cat} <span className="text-xs opacity-60">{count}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Recent Emojis */}
          {recent.length > 0 && !search && (
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 text-center">
                Recently Used
              </p>
              <div className="flex flex-wrap gap-1 justify-center">
                {recent.map((e, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      addToSelected(e);
                      showToast(`${e} Added!`);
                    }}
                    className="text-3xl p-2 rounded-xl hover:bg-yellow-50 hover:scale-110 transition-all"
                    title={`Add ${e}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Emoji Grid */}
          <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-14 gap-1 mb-8">
            {filteredEmojis.length > 0 ? (
              filteredEmojis.map((item, i) => (
                <div key={i} className="relative group">
                  <button
                    onClick={() => {
                      addToSelected(item.emoji);
                      showToast(`${item.emoji} Added!`);
                    }}
                    className="w-full text-3xl md:text-4xl p-2 rounded-xl hover:bg-yellow-50 hover:scale-110 transition-all active:scale-95"
                    title={item.name}
                    aria-label={item.name}
                  >
                    {item.emoji}
                  </button>
                  {/* Hover: instant copy button */}
                  <button
                    onClick={(e) => copySingle(item.emoji, e)}
                    className="absolute -top-1 -right-1 bg-gray-800 text-white rounded-full w-5 h-5 items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition hidden sm:flex"
                    title="Copy instantly"
                  >
                    <Copy size={10} />
                  </button>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center py-12 text-gray-400">
                No emojis found for "{search}"
              </p>
            )}
          </div>

          {/* Selected Collection */}
          {selected.length > 0 && (
            <div className="mt-8 border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-700">
                  Your collection ({selected.length})
                </p>
                <button
                  onClick={() => setSelected([])}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4">
                {selected.map((e, i) => (
                  <div key={i} className="relative group">
                    <span className="text-4xl cursor-default">{e}</span>
                    <button
                      onClick={() => removeFromSelected(e)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={copySelected}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl font-semibold transition-all active:scale-95"
              >
                <Copy size={17} />
                {copied ? "Copied!" : `Copy All ${selected.length} Emojis`}
              </button>
            </div>
          )}
        </div>

        {/* Native ad here */}

        <script
          async="async"
          data-cfasync="false"
          src="https://pl29796844.effectivecpmnetwork.com/4c385cac6f0784aa3165d3a9e7478f20/invoke.js"
        ></script>
        <div id="container-4c385cac6f0784aa3165d3a9e7478f20"></div>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Use the Emoji Picker
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Search or Browse",
                desc: "Type a keyword like 'heart' or 'cat' in the search bar, or click a category tab to browse.",
              },
              {
                step: "2",
                title: "Click to Add",
                desc: "Click any emoji to add it to your collection at the bottom. Or hover and click the copy icon for instant single copy.",
              },
              {
                step: "3",
                title: "Copy All",
                desc: "Once you've selected your emojis, click 'Copy All' to grab them as a string. Paste anywhere!",
              },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="w-8 h-8 bg-yellow-100 text-yellow-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
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

        {/* ─── Formulas / How It Works ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How Emoji Copying Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            It's simple JavaScript clipboard magic. Here's what happens.
          </p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Clipboard API
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                navigator.clipboard.writeText(emoji)
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Uses the modern browser Clipboard API to copy text instantly
                without Flash or hidden inputs.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Unicode Characters
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                😀 = U+1F600
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Emojis are just special Unicode characters. When you copy them,
                you're copying the character code, which renders as the image on
                supported devices.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
              <h3 className="font-bold text-yellow-900 text-sm mb-2">
                Privacy Note
              </h3>
              <p className="text-yellow-800 text-xs leading-relaxed">
                This tool runs 100% in your browser. No data is sent to any
                server. Your recent emojis are stored only in memory for this
                session.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Real Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Popular Emoji Combinations
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Try these popular combos for social media.
          </p>

          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-yellow-100 text-yellow-700 font-bold px-2.5 py-1 rounded-lg">
                  Love
                </span>
              </div>
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                <p className="font-mono text-2xl text-gray-800">❤️😍🥰💕</p>
                <p className="text-xs text-yellow-600 mt-2">
                  Perfect for romantic posts.
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-yellow-100 text-yellow-700 font-bold px-2.5 py-1 rounded-lg">
                  Party
                </span>
              </div>
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                <p className="font-mono text-2xl text-gray-800">🎉🥳🎈🎂</p>
                <p className="text-xs text-yellow-600 mt-2">
                  Great for birthdays and celebrations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses Emoji Pickers?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Not just casual chatters. Here's where emojis matter.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Zap size={20} className="text-yellow-500" />,
                title: "Social Media Managers",
                desc: "Add personality to captions for Instagram, Twitter, and LinkedIn posts.",
              },
              {
                icon: <BarChart3 size={20} className="text-green-600" />,
                title: "Marketers",
                desc: "Increase engagement rates in emails and ads with eye-catching emojis.",
              },
              {
                icon: <Code size={20} className="text-violet-600" />,
                title: "Developers",
                desc: "Add fun to commit messages, documentation, and UI prototypes.",
              },
              {
                icon: <HelpCircle size={20} className="text-amber-600" />,
                title: "General Users",
                desc: "Express emotions clearly in WhatsApp, Telegram, and Discord chats.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl p-5 hover:border-yellow-200 transition-colors"
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

        {/* ─── SEO Content ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Use an Online Emoji Picker?
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            While most keyboards have built-in emojis, they can be hard to find.
            Our <strong>Free Emoji Picker</strong> gives you instant access to
            500+ emojis organized into 8 categories — Smileys, Gestures,
            Animals, Food, Hearts, Symbols, Travel, and Flags.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Search by name (e.g., "heart", "cat", "pakistan") to find exactly
            what you need in seconds. Click to add to your collection, then copy
            them all at once. It works perfectly for WhatsApp, Instagram,
            Facebook, Twitter, Discord, Slack, and any other platform.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Unlike system pickers, our tool lets you build a custom string of
            multiple emojis before copying, saving you time when crafting the
            perfect message.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Privacy Note
          </h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser. No data is sent to any server.
            Your recent emojis are stored only in memory for this session. Close
            the tab and it's gone. That's how it should be.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need to generate hashtags for your posts? Try the{" "}
            <Link
              href="/tools/hashtag-generator"
              className="text-yellow-500 underline underline-offset-2 hover:text-yellow-600"
            >
              Hashtag Generator
            </Link>
            . Counting characters for Twitter? The{" "}
            <Link
              href="/tools/word-counter"
              className="text-yellow-500 underline underline-offset-2 hover:text-yellow-600"
            >
              Word Counter
            </Link>{" "}
            has your back.
          </p>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              {
                q: "How do I copy and paste emojis from this picker?",
                a: "Click any emoji to add it to your collection at the bottom, then click 'Copy All Emojis' to copy them at once. Or hover over any emoji and click the tiny copy icon for an instant single copy.",
              },
              {
                q: "Can I use these emojis on WhatsApp and Instagram?",
                a: "Yes. Simply copy the emojis and paste them directly into WhatsApp, Instagram, Facebook, Twitter/X, Discord, Telegram, Slack, or anywhere else that supports emojis.",
              },
              {
                q: "Does this emoji picker work on mobile phones?",
                a: "Yes, our emoji picker is fully responsive and works perfectly on all mobile phones, tablets, and desktop browsers without needing to install any app.",
              },
              {
                q: "How to find the Pakistan flag emoji to copy and paste?",
                a: "Click the 'Flags' category tab or search 'pakistan' in the search bar above. You will find the Pakistan flag emoji (🇵🇰) which you can copy with one click.",
              },
              {
                q: "Are these emojis free to use?",
                a: "Yes, emojis are standard Unicode characters and are free to use anywhere. There are no copyright restrictions on using standard emojis in personal or commercial communication.",
              },
              {
                q: "Why do some emojis look different on my phone?",
                a: "Emojis are rendered by your device's operating system (iOS, Android, Windows). While the character code is the same, the visual design varies between Apple, Google, Samsung, and Microsoft.",
              },
              {
                q: "Can I search for emojis by color?",
                a: "Currently, you can search by name (e.g., 'red heart', 'blue circle'). We are working on adding color-based filtering in future updates.",
              },
              {
                q: "Is there a limit to how many emojis I can copy?",
                a: "No limit. You can add as many emojis as you like to your collection and copy them all at once. However, some platforms may have character limits for messages.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-yellow-200 transition-colors duration-300"
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
                    className={`text-yellow-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Related Tools (Short Descriptions) ─── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related Social & Text Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/hashtag-generator",
                title: "Hashtag Generator",
                desc: "Generate IG/TikTok tags.",
              },
              {
                href: "/tools/word-counter",
                title: "Word Counter",
                desc: "Count words & chars.",
              },
              {
                href: "/tools/lorem-ipsum-generator",
                title: "Lorem Ipsum Generator",
                desc: "Generate placeholder text.",
              },
              {
                href: "/tools/case-converter",
                title: "Case Converter",
                desc: "Change text case formats.",
              },
              {
                href: "/tools/remove-duplicate-lines",
                title: "Remove Duplicates",
                desc: "Clean up text lists.",
              },
              {
                href: "/tools/json-formatter",
                title: "JSON Formatter",
                desc: "Beautify JSON code.",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-yellow-400 transition-all"
              >
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-yellow-500 transition-colors">
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

export default EmojiPicker;
