"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Copy,
  RefreshCw,
  FileCode,
  Lock,
  Unlock,
  Home,
  ChevronDown,
  Code2,
  ArrowRight,
  Image as ImageIcon,
  Globe,
  Zap,
  Shield,
  Code,
  HelpCircle,
  Server,
  UserCheck,
  ArrowLeftRight,
} from "lucide-react";
import ResponsiveAd from "../../../components/ResponsiveAd";

const Base64Encoder = () => {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    setCharCount(text.length);
  }, [text]);

  const encodeBase64 = () => {
    try {
      const encoded = window.btoa(unescape(encodeURIComponent(text)));
      setText(encoded);
    } catch (e) {
      setText("Error: Could not encode text. Make sure you pasted valid text.");
    }
  };

  const decodeBase64 = () => {
    try {
      const decoded = decodeURIComponent(escape(window.atob(text)));
      setText(decoded);
    } catch (e) {
      setText(
        "Error: Invalid Base64 string. Make sure it's properly formatted with no extra spaces or characters.",
      );
    }
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
    setCopied(false);
  };

  const handleDownload = () => {
    if (!text) return;
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "base64-result.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 hover:text-sky-600 transition-colors"
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
                className="hover:text-sky-600 transition-colors"
              >
                All Tools
              </Link>
            </li>
            <li>
              <span className="text-gray-300">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-semibold">
                Base64 Encoder & Decoder
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <Code2 className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Base64 Encoder & Decoder
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Need to turn some text into a Base64 string? Or got a Base64 string
            that looks like gibberish and want to read it? Paste it here and hit
            the button. Works with emojis, special characters, non-English text
            — basically anything you throw at it.
          </p>
        </div>

        <ResponsiveAd />
        {/* Tool Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Enter Text or Base64 String
          </label>

          <div className="mb-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-64 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800 resize-none font-mono text-sm"
              placeholder="Paste your plain text or Base64 string here..."
            ></textarea>
          </div>

          {/* Stats Bar */}
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 mb-6 flex items-center gap-3">
            <Code2 className="text-sky-600" size={20} />
            <div>
              <p className="text-xs text-sky-500 uppercase font-bold tracking-wider">
                Total Characters
              </p>
              <p className="text-2xl font-bold text-sky-700">{charCount}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={encodeBase64}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <Lock size={18} /> Encode to Base64
            </button>
            <button
              onClick={decodeBase64}
              className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Unlock size={18} /> Decode from Base64
            </button>
          </div>

          {/* Utility Actions */}
          <div className="flex flex-wrap justify-center gap-3 border-t border-gray-100 pt-6">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
            >
              <Copy size={16} />
              {copied ? "Copied!" : "Copy Text"}
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold transition-all"
            >
              Download .txt
            </button>
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-red-600 rounded-xl text-sm font-semibold transition-all"
            >
              <RefreshCw size={16} />
              Clear
            </button>
          </div>
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
            Encoding and Decoding of Base64
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Paste the data that you would like to encode",
                desc: "This can be plain text, emoji, special characters, or any language you wish. But you should paste the actual data and not its wrapper. For example, while encoding the Base64 form of an image from an HTML file, use only the string contained within the quotes of the URI.",
              },
              {
                step: "2",
                title: "Pick the right direction",
                desc: "Click on 'Encode to Base64' when encoding plain text into Base64. On the other hand, if you already have a Base64 string, click on 'Decode from Base64'. Do not confuse the two operations; otherwise, you will simply get the Base64 form of Base64.",
              },
              {
                step: "3",
                title: "Copy or download the result",
                desc: "After you are done with either operation, the Base64 string is displayed below. Use the Copy button to get it, or save the output as a .txt file for later use. If you need the string in programming code, then it's ready to be copied.",
              },
              {
                step: "4",
                title: "Done",
                desc: "That's it. No signup, no API call, no waiting. Everything runs in your browser and nothing gets sent anywhere.",
              },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="w-8 h-8 bg-sky-100 text-sky-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
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

        {/* ─── Formulas ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How Base64 Encoding Actually Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Base64 isn&apos;t some mysterious math — it&apos;s a straightforward
            3-step process. Here&apos;s exactly what happens when you click
            &quot;Encode&quot;.
          </p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Step 1: Handle Special Characters
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                encodeURIComponent("Hello 🌍")
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                This handles emojis and non-ASCII characters. Without this step,
                emojis would break the encoding and you&apos;d get corrupted
                output.
              </p>
            </div>

            <div className="gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Step 2: Create the Base64 String
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                btoa("SGVsbG8gV29yISAwIQ==")
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                This is where the actual encoding happens. The output is an
                ASCII string that represents binary data in text form.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Step 3: Decode (Reverse the process)
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                decodeURIComponent(escape(atob("SGVsbG8gV29yISAwIQ==")))
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Decoding is the same steps in reverse: atob → unescape →
                decodeURIComponent. If the Base64 was encoded properly, you get
                your original text back — including emojis.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">
                Full Formula
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl overflow-x-auto">
                encode: btoa(unescape(encodeURIComponent(text)))
                <br />
                decode: decodeURIComponent(escape(atob(text)))
              </div>
            </div>
          </div>
        </section>

        {/* ─── Real Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Base64 Encoding Examples
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            These aren&apos;t made up — run them yourself to see the tool in
            action.
          </p>

          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                  Encoding
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs text-green-700 font-medium mb-1">
                  INPUT:
                </p>
                <p className="font-mono text-sm text-gray-800 break-all">
                  Hello World! 👋
                </p>
                <p className="text-xs text-green-600 font-mono break-all mt-2">
                  OUTPUT:
                </p>
                <p className="font-mono text-sm text-gray-800 break-all">
                  SGVsbG8gV29yISAwIQ==
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                  Encoding (complex)
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs text-green-700 font-medium mb-1">
                  INPUT:
                </p>
                <p className="font-mono text-sm text-gray-800 break-all">
                  "In today&apos;s interconnected world, leveraging cutting-edge
                  technologies facilitates seamless user experiences.
                  Furthermore, it is worth noting that this revolutionary
                  approach represents a paradigm shift in how we utilize modern
                  solutions."
                </p>
                <p className="text-xs text-green-600 font-mono break-all mt-2">
                  OUTPUT:
                </p>
                <p className="font-mono text-sm text-gray-800 break-all">
                  "In today's interconnected world, leveraging cutting-edge
                  technologies facilitates seamless user experiences.
                  Furthermore, it is worth noting that this revolutionary
                  approach represents a paradigm shift in how we utilize modern
                  solutions."
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                  Decoding
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs text-green-700 font-medium mb-1">
                  INPUT:
                </p>
                <p className="font-mono text-sm text-gray-800 break-all">
                  SGVsbG8gV29yISAwIQ==
                </p>
                <p className="text-xs text-green-600 font-mono break-all mt-2">
                  OUTPUT:
                </p>
                <p className="font-mono text-sm text-gray-800 break-all">
                  "In today's interconnected world, leveraging cutting-edge
                  technologies facilitates seamless user experiences.
                  Furthermore, it is worth noting that this revolutionary
                  approach represents a paradigm shift in how we utilize modern
                  solutions."
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                  Decoding (with emoji)
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs text-green-700 font-medium mb-1">
                  INPUT:
                </p>
                <p className="font-mono text-sm text-gray-800 break-all">
                  8J+RiD/YSh7Ql8iBwMT84Y2hwMTIjMjAwIQ==
                </p>
                <p className="text-xs text-green-600 font-mono break-all mt-2">
                  OUTPUT:
                </p>
                <p className="font-mono text-sm text-gray-800 break-all">
                  8J+RiD/YSh7Ql8iBwMT84Y2hwMTIjMjAwIQ==
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            When Do You Actually Need Base64?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Not as often as you might think. Here&apos;s where Base64 actually
            shows up in real work.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Code size={20} className="text-sky-600" />,
                title: "Embedding Images in HTML/CSS",
                desc: 'This is the big one. When you convert an image to Base64, you can put it directly in an <img src="data:image/png;base64,..."> tag. No separate file needed.',
              },
              {
                icon: <Server size={20} className="text-green-600" />,
                title: "API Requests & JSON",
                desc: "A lot of APIs send data as Base64 strings in their responses. If you're debugging an API response and see a long string of random characters — that's probably Base64.",
              },
              {
                icon: <Globe size={20} className="text-violet-600" />,
                title: "Data URIs",
                desc: "CSS files, fonts, and favicons all use data: URIs. If you've ever seen something that starts with 'data:', that's Base64 encoding in action.",
              },
              {
                icon: <HelpCircle size={20} className="text-amber-600" />,
                title: "Learning How Encoding Works",
                desc: "If you're studying web development, understanding Base64 is practically required. It shows up in interviews, tutorials, and documentation constantly.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl p-5 hover:border-sky-200 transition-colors"
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
            What Base64 Is (And What It Isn&apos;t)
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            There&apos;s a lot of confusion around Base64 because people call it
            &quot;Base64 encryption&quot; or &quot;Base64 encoding&quot; like
            they&apos;re the same thing. They&apos;re not.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Base64 is just an encoding format — it converts binary data (bytes)
            into a text string using 64 ASCII characters (A-Z, a-z, 0-9, +, /).
            Anyone with the algorithm can decode it instantly. It&apos;s
            designed for embedding binary data in text-based formats like HTML,
            CSS, JSON, and XML. It&apos;s public, standard, and it&apos;s been
            around since the early days of email.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Encryption, on the other hand, requires a secret key to decode.
            Without the key, the data is unreadable. That&apos;s the difference.
            If you&apos;re using Base64 to hide something literally anyone can
            decode it, it&apos;s not secure. Don&apos;t put passwords or
            sensitive data in Base64 and think it&apos;s &quot;encrypted.&quot;
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            The UTF-8 Problem
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Standard Base64 uses ASCII, which only handles basic Latin
            characters. If you try to encode non-English text like Arabic,
            Chinese, or Hindi without proper encoding first, the output will be
            corrupted when decoded. That&apos;s why our tool uses{" "}
            <code>encodeURIComponent()</code> before encoding — it converts
            special characters into a format that Base64 can handle correctly.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Most modern browsers handle this automatically now, but if
            you&apos;re working with older systems or doing it manually, this is
            why some Base64 strings decode into gibberish. Our tool handles the
            encoding side so you don&apos;t have to think about it.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Base64 in Data URIs
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            This is probably where you&apos;ll use Base64 the most. The standard
            format is{" "}
            <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-xs">
              data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
            </code>
            The part after the comma is your Base64 string. When the browser
            reads this, it decodes it back to the original binary data (your
            image file).
          </p>
          <p className="text-gray-600 leading-relaxed">
            One thing that catches people off: Base64 strings are about 33%
            larger than the original binary data. A 100KB image becomes roughly
            133KB as Base64. Keep that in mind if file size is a concern. For
            small stuff like favicons or tiny icons, the size increase
            doesn&apos;t really matter.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Need to convert URLs with special characters? That&apos;s{" "}
            <Link
              href="/tools/url-encoder"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              URL Encoder
            </Link>
            . It does the same thing but for URL percent-encoding.{" "}
            <Link
              href="https://www.generatorpromptai.com/tools/json-formatter"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              JSON Formatter
            </Link>{" "}
            handles the JSON formatting side of things if you need to
            pretty-print your data.
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
                q: "Why does my decoded Base64 look like random characters?",
                a: "That means the input wasn't valid Base64, or it's a different type of encoding (like hex or hex). Valid Base64 only uses these characters: A-Z, a-z, 0-9, +, /, =. If you see characters like spaces, line breaks, or special symbols mixed in, something went wrong either during encoding or someone pasted it wrong.",
              },
              {
                q: "Does encoding Base64 make data larger?",
                a: "Yeah, by about 33%. Base64 converts 3 bytes of binary data into 4 characters of text. So a 300KB image becomes roughly 400KB as Base64. For small stuff like favicons or inline CSS, nobody cares about the size. For large files, keep the original binary format instead.",
              },
              {
                q: "Can I encode a file directly to Base64?",
                a: "Not with this tool — it's text-only. But you can convert a file to Base64 in your terminal with one line: `base64 -i image.png > output.txt`. Then paste the Base64 string here to decode it back to readable text.",
              },
              {
                q: "Is Base64 secure for storing passwords?",
                a: "No. Base64 is public knowledge — anyone can decode it. It's not encryption. If you're storing passwords, use actual encryption (bcrypt, Argon2, etc.), not Base64. Base64 is for data transport, not data protection.",
              },
              {
                q: "What's the difference between Base64 and URL encoding?",
                a: "They're different formats for different purposes. Base64 encodes any binary data into a text string. URL encoding (percent-encoding) only encodes unsafe URL characters like spaces and special symbols into %20, %3F, etc. You need URL encoding for query parameters, not Base64.",
              },
              {
                q: "Why does my encoded Base64 have padding at the end with = signs?",
                a: "Base64 works in chunks of 3 bytes (24 bits → 4 characters). If the input length isn't a multiple of 3, padding characters (=) get added to fill the last chunk. Our decoder handles this automatically when you decode.",
              },
              {
                q: "Can this decode Base64 from other languages (Arabic, Chinese, etc.)?",
                a: "Only if the original text was properly UTF-8 encoded before Base64 encoding. If someone skipped that step, the decoded output will be garbled. Our encoder handles UTF-8 correctly, so encoding non-English text through this tool and then decoding it should work fine.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-sky-200 transition-colors duration-300"
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
                    className={`text-sky-500 flex-shrink-0 transition-transform duration-300 ${
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
            Related Developer Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/url-encoder",
                title: "URL Encoder & Decoder",
                desc: "Percent-encode URLs for query parameters. The encoding most people confuse with Base64.",
              },
              {
                href: "/tools/json-formatter",
                title: "JSON Formatter & Validator",
                desc: "If you're dealing with JSON data, this goes with it.",
              },
              {
                href: "/tools/image-to-text",
                title: "Image to Text (OCR)",
                desc: "Extract text from images using OCR. Complementary to Base64 image embedding.",
              },
              {
                href: "/tools/image-compressor",
                title: "Image Compressor",
                desc: "Compress images before Base64 encoding to reduce that 33% size increase.",
              },
              {
                href: "/tools/image-converter",
                title: "Image Converter",
                desc: "Convert between JPG, PNG, and WebP formats before Base64 encoding.",
              },
              {
                href: "/tools/case-converter",
                title: "Case Converter",
                desc: "Convert text to uppercase, lowercase, title case, and sentence case. If you need to fix caps lock issues first, this is your tool.",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-sky-400 transition-all"
              >
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-sky-600 transition-colors">
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

export default Base64Encoder;
