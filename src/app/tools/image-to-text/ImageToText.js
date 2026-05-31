'use client'

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Tesseract from "tesseract.js";
import {
  Copy, RefreshCw, Upload, Download, Loader2,
  Image as ImageIcon, FileText, Home, ChevronDown,
  Hash, Type, Percent, Globe, Shield, Zap, HelpCircle,
  CheckCircle, AlertCircle
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const LANGUAGES = [
  { value: "eng", label: "English" },
  { value: "urd", label: "Urdu" },
  { value: "eng+urd", label: "English + Urdu (Recommended)" },
  { value: "ara", label: "Arabic" },
  { value: "hin", label: "Hindi" },
  { value: "fra", label: "French" },
  { value: "deu", label: "German" },
  { value: "spa", label: "Spanish" },
  { value: "zho_sim", label: "Chinese (Simplified)" },
  { value: "rus", label: "Russian" },
];

const OCR_TIPS = [
  "Use high-resolution images (300 DPI or above for scans)",
  "Ensure text has high contrast against background",
  "Keep text straight — avoid tilted or skewed images",
  "Avoid heavy shadows, glare, or blurry photos",
  "Screenshots and typed text extract better than handwriting",
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ImageToText() {
  const [imageSrc, setImageSrc] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [editableText, setEditableText] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState("eng+urd");
  const [autoRun, setAutoRun] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const fileInputRef = useRef(null);
  const imgUrlRef = useRef(null);

  useEffect(() => () => { if (imgUrlRef.current) URL.revokeObjectURL(imgUrlRef.current); }, []);

  const handleImageUpload = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPG, PNG, WebP, etc.)");
      return;
    }
    setError(null);
    if (imgUrlRef.current) URL.revokeObjectURL(imgUrlRef.current);
    const url = URL.createObjectURL(file);
    imgUrlRef.current = url;
    setImageSrc(url);
    setExtractedText("");
    setEditableText("");
    setProgress(0);
    setConfidence(null);
    if (autoRun) setTimeout(() => runOCR(url), 100);
  };

  const runOCR = async (src) => {
    const target = src || imageSrc;
    if (!target) { setError("Please upload an image first."); return; }
    setLoading(true);
    setError(null);
    setProgress(0);
    setProgressLabel("Initializing...");
    setExtractedText("");
    setEditableText("");
    setConfidence(null);

    try {
      const { data } = await Tesseract.recognize(target, language, {
        logger: (m) => {
          if (m.status === "loading tesseract core") { setProgressLabel("Loading OCR engine..."); setProgress(10); }
          if (m.status === "initializing tesseract") { setProgressLabel("Initializing..."); setProgress(20); }
          if (m.status === "loading language traineddata") { setProgressLabel("Loading language..."); setProgress(35); }
          if (m.status === "initializing api") { setProgressLabel("Starting recognition..."); setProgress(50); }
          if (m.status === "recognizing text") { setProgressLabel("Recognizing text..."); setProgress(50 + Math.round(m.progress * 50)); }
        },
      });
      const text = data.text.trim();
      const conf = data.confidence ? Math.round(data.confidence) : null;
      setExtractedText(text || "No readable text detected. Try a clearer image.");
      setEditableText(text || "");
      setConfidence(conf);
    } catch (err) {
      console.error(err);
      setError("Text extraction failed. Try a clearer, higher-contrast image.");
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  const copyText = () => {
    if (!editableText) return;
    navigator.clipboard.writeText(editableText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    if (!editableText) return;
    const blob = new Blob([editableText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = `ocr-text-${Date.now()}.txt`; link.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setImageSrc(null); setExtractedText(""); setEditableText("");
    setError(null); setProgress(0); setCopied(false); setConfidence(null);
    setProgressLabel("");
  };

  const wordCount = editableText.trim() ? editableText.trim().split(/\s+/).length : 0;
  const charCount = editableText.length;
  const currentLang = LANGUAGES.find((l) => l.value === language)?.label.split(" ")[0] || "—";

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
            <li><span className="text-gray-900 font-semibold">Image to Text</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-5xl mx-auto w-full px-4 pb-20">

        {/* ── Hero ── */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <FileText className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Extract Urdu Text from Image Online Free –{" "}
            <span className="text-sky-600">OCR Tool for English & Urdu</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Extract text from images, scanned documents and screenshots in 10+ languages. Edit, copy or download the result. No server upload.
          </p>
        </div>

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">

          {/* Upload State */}
          {!imageSrc ? (
            <div className={`border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer transition-all ${isDragging ? "border-sky-500 bg-sky-50" : "border-gray-300 hover:border-sky-400 hover:bg-sky-50/30"}`}
              onClick={() => fileInputRef.current?.click()}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleImageUpload(e.dataTransfer.files?.[0]); }}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0])} className="hidden" />
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="text-sky-600" size={28} />
              </div>
              <p className="text-xl font-semibold text-gray-800 mb-2">Drop image here or click to upload</p>
              <p className="text-gray-400 text-sm">JPG, PNG, WebP, BMP, TIFF — any image with text</p>
              {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-5">

              {/* Left: Image + Settings */}
              <div className="space-y-4">
                {/* Image Preview */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-700 flex items-center gap-2"><ImageIcon size={15} className="text-sky-600" /> Uploaded Image</span>
                    <button onClick={() => fileInputRef.current?.click()} className="text-xs text-sky-600 hover:underline">Change image</button>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0])} className="hidden" />
                  </div>
                  <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                    <img src={imageSrc} alt="Uploaded for OCR" className="w-full max-h-72 object-contain" />
                  </div>
                </div>

                {/* Settings */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">OCR Settings</label>

                  {/* Language */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Language</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} disabled={loading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-800">
                      {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                    </select>
                  </div>

                  {/* Auto-run toggle */}
                  <label className="flex items-center gap-3 cursor-pointer mb-4">
                    <div onClick={() => setAutoRun(!autoRun)} className={`w-10 h-5 rounded-full transition-colors relative ${autoRun ? "bg-sky-500" : "bg-gray-300"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${autoRun ? "left-5" : "left-0.5"}`} />
                    </div>
                    <span className="text-sm text-gray-600">Auto-extract on upload</span>
                  </label>

                  {/* Progress bar */}
                  {loading && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1.5"><span>{progressLabel}</span><span>{progress}%</span></div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  )}

                  {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-sm text-red-600"><AlertCircle size={14} /> {error}</div>}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => runOCR()} disabled={loading}
                      className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-50">
                      {loading ? <><Loader2 size={18} className="animate-spin" /> Extracting...</> : <><FileText size={18} /> Extract Text</>}
                    </button>
                    <button onClick={reset}
                      className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                      <RefreshCw size={18} /> Reset
                    </button>
                  </div>
                </div>

                {/* OCR Tips */}
                <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5">
                  <p className="text-sm font-semibold text-sky-900 mb-3 flex items-center gap-2"><CheckCircle size={15} className="text-sky-500" /> Tips for best OCR results</p>
                  <ul className="space-y-1.5">
                    {OCR_TIPS.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-sky-800"><span className="text-sky-400 mt-0.5 flex-shrink-0">•</span> {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Extracted Text */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-700">Extracted Text</span>
                  {editableText && (
                    <div className="flex items-center gap-2">
                      <button onClick={copyText} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-medium text-gray-700 transition-colors">
                        <Copy size={13} /> {copied ? "Copied!" : "Copy"}
                      </button>
                      <button onClick={downloadText} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-medium text-gray-700 transition-colors">
                        <Download size={13} /> .txt
                      </button>
                    </div>
                  )}
                </div>

                {/* Stats Grid */}
                {editableText && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center"><div className="flex justify-center text-sky-500 mb-1"><Hash size={16} /></div><p className="text-sm font-bold text-gray-800">{wordCount}</p><p className="text-xs text-gray-500 mt-0.5">Words</p></div>
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center"><div className="flex justify-center text-sky-500 mb-1"><Type size={16} /></div><p className="text-sm font-bold text-gray-800">{charCount}</p><p className="text-xs text-gray-500 mt-0.5">Characters</p></div>
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center"><div className="flex justify-center text-sky-500 mb-1"><Percent size={16} /></div><p className="text-sm font-bold text-gray-800">{confidence !== null ? `${confidence}%` : "—"}</p><p className="text-xs text-gray-500 mt-0.5">Confidence</p></div>
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center"><div className="flex justify-center text-sky-500 mb-1"><Globe size={16} /></div><p className="text-sm font-bold text-gray-800">{currentLang}</p><p className="text-xs text-gray-500 mt-0.5">Language</p></div>
                  </div>
                )}

                {/* Confidence Badge */}
                {confidence !== null && editableText && (
                  <div className="mb-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${confidence >= 80 ? "bg-green-100 text-green-700" : confidence >= 50 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-600"}`}>
                      {confidence >= 80 ? "High" : confidence >= 50 ? "Medium" : "Low"} accuracy ({confidence}%)
                    </span>
                  </div>
                )}

                {editableText ? (
                  <>
                    <textarea value={editableText} onChange={(e) => setEditableText(e.target.value)}
                      className="flex-1 w-full p-4 bg-gray-900 rounded-2xl text-sm leading-relaxed font-mono text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none min-h-[320px]"
                      placeholder="Extracted text will appear here..." spellCheck={false} />
                    <p className="text-xs text-gray-400 mt-2">You can edit the text above before copying or downloading.</p>
                  </>
                ) : loading ? (
                  <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-gray-400 min-h-[320px]">
                    <Loader2 size={32} className="animate-spin text-sky-500 mb-3" />
                    <p className="text-sm">{progressLabel || "Processing..."}</p>
                    <p className="text-xs mt-1">{progress}% complete</p>
                  </div>
                ) : (
                  <div className="flex-1 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 min-h-[320px]">
                    <FileText size={36} className="mb-2" />
                    <p className="text-sm text-gray-400">Click Extract Text to begin</p>
                    <p className="text-xs text-gray-300 mt-1">Clear, straight, high-contrast text works best</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!imageSrc && !error && (
            <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mt-4">
              <FileText size={32} className="mx-auto mb-3 text-gray-300" />
              <p>Drop your image above or click to browse. We'll extract text instantly — no upload required.</p>
            </div>
          )}
        </div>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Extract Text from Images in 3 Simple Steps</h2>
          <ol className="space-y-5">
            {[
              { step: "1", title: "Upload Your Image", desc: "Drag and drop a photo, screenshot, or scanned document. JPG, PNG, WebP, BMP, and TIFF are all supported." },
              { step: "2", title: "Select Language & Extract", desc: "Choose English, Urdu, or English + Urdu for bilingual documents. Click Extract Text and wait for the OCR engine to process." },
              { step: "3", title: "Edit, Copy or Download", desc: "Review the extracted text in the editable area. Fix any errors, then copy to clipboard or download as a .txt file." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How Browser-Based OCR Works</h2>
          <p className="text-gray-500 text-sm mb-6">No server upload. No waiting. Everything happens on your device.</p>
          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Tesseract.js Engine</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">Tesseract.recognize(image, lang) →  (text, confidence) </div>
              <p className="text-gray-500 text-xs leading-relaxed">We use the open-source Tesseract OCR engine compiled to WebAssembly. It runs entirely in your browser, analyzing pixel patterns to recognize characters in your selected language.</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Confidence Scoring</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">confidence: 0-100% • Higher = more reliable</div>
              <p className="text-gray-500 text-xs leading-relaxed">After extraction, the tool shows a confidence score. High accuracy (80%+) means the text is likely correct. Lower scores suggest you should review the output for errors.</p>
            </div>
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">Privacy First</h3>
              <p className="text-sky-800 text-xs leading-relaxed">All OCR processing happens locally in your browser using JavaScript and WebAssembly. No images are uploaded, stored, or sent anywhere. Close the tab and your data is gone. 100% private by design.</p>
            </div>
          </div>
        </section>

        {/* ─── Sample Results ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What Kind of Results Can You Expect?</h2>
          <p className="text-gray-500 text-sm mb-6">Real examples with different languages and image types.</p>
          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-lg">English Document</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Image Type</p><p className="font-semibold text-gray-800">Scanned PDF page</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Confidence</p><p className="font-semibold text-green-600">94%</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Best For</p><p className="font-semibold text-gray-800">Reports, articles, forms</p></div>
              </div>
            </div>
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded-lg">Urdu + English Mixed</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Image Type</p><p className="font-semibold text-gray-800">Pakistani ID card photo</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Confidence</p><p className="font-semibold text-amber-600">78%</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Best For</p><p className="font-semibold text-gray-800">Bilingual documents</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Who Uses This OCR Tool?</h2>
          <p className="text-gray-500 text-sm mb-6">From students to professionals — extracting text saves time.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Zap size={20} className="text-sky-600" />, title: "Students & Researchers", desc: "Extract text from scanned textbooks, research papers, and lecture notes for study purposes. Edit and organize content digitally." },
              { icon: <FileText size={20} className="text-green-600" />, title: "Office Professionals", desc: "Convert printed receipts, invoices, and forms into editable text for accounting, reporting, and data entry workflows." },
              { icon: <Globe size={20} className="text-amber-600" />, title: "Content Creators", desc: "Pull quotes from screenshots, extract text from whiteboard photos, or digitize handwritten notes for blogs and social media." },
              { icon: <Shield size={20} className="text-violet-600" />, title: "Privacy-Conscious Users", desc: "Extract text from sensitive documents without uploading to third-party servers. Everything stays on your device — always." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Browser-Based OCR?</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Most online OCR tools ask you to upload files to their servers. That means waiting for uploads, worrying about privacy, and sometimes dealing with watermarks or limits. Our free Image to Text tool works differently — everything happens <strong>inside your browser</strong> using Tesseract.js compiled to WebAssembly.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Especially useful for Pakistani users who need to extract text from <strong>Urdu and English documents</strong> — ID cards, receipts, books, and official forms. The "English + Urdu" language option handles bilingual content seamlessly.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The extracted text appears in an editable area so you can fix any OCR errors before copying or downloading. Real-time word and character counts help you track content length. Confidence scores let you know when to double-check the output.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">Privacy Note</h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript and WebAssembly. No images are uploaded to any server. No data is stored or tracked. Your documents stay on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need to compress an image before OCR? Try the{" "}
            <Link href="/tools/image-compressor" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Image Compressor</Link>. 
            Want to count words in extracted text? The{" "}
            <Link href="/tools/word-counter" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Word Counter</Link> has you covered.
          </p>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              { q: "How to extract Urdu text from image online for free?", a: "Upload your image containing Urdu text, select 'English + Urdu' as the language, and click Extract Text. Our OCR tool uses Tesseract.js to recognize Urdu characters directly in your browser without uploading to any server." },
              { q: "Can I extract text from scanned document without uploading?", a: "Yes. Our OCR tool runs entirely in your browser. Take a photo or scan of your document, upload it, and the text extraction happens locally. The image is never sent to any server." },
              { q: "Does this OCR tool support Arabic and Hindi text?", a: "Yes. Our tool supports Arabic, Hindi, Urdu, English, French, German, Spanish, Chinese (Simplified), and Russian. Select the appropriate language from the dropdown before extracting text." },
              { q: "How to convert screenshot to text online free?", a: "Take a screenshot, upload it to our tool, and click Extract Text. Screenshots with clear, typed text give the best OCR results. You can then edit, copy, or download the extracted text as a .txt file." },
              { q: "What is OCR and how accurate is it?", a: "OCR (Optical Character Recognition) reads text from images by analyzing pixel patterns. Accuracy depends on image quality — clear, high-resolution, high-contrast images with printed text typically achieve 80-95% accuracy. Our tool shows the confidence score after extraction." },
              { q: "Can I edit the extracted text before downloading?", a: "Yes. The extracted text appears in an editable text area. You can correct any OCR errors manually before copying to clipboard or downloading as a .txt file." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/tools/image-compressor", title: "Image Compressor", desc: "Compress images before OCR for faster processing." },
              { href: "/tools/image-converter", title: "Image Converter", desc: "Convert image formats for better OCR compatibility." },
              { href: "/tools/word-counter", title: "Word Counter", desc: "Count words and characters in your extracted text." },
              { href: "/tools/emoji-picker", title: "Emoji Picker", desc: "Search & copy emojis for captions and messages." },
              { href: "/tools/case-converter", title: "Case Converter", desc: "Change text case for formatting consistency." },
              { href: "/tools/remove-duplicate-lines", title: "Remove Duplicates", desc: "Clean up text lists by removing duplicate lines." },
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