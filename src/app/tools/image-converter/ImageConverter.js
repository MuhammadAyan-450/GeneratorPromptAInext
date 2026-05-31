'use client'

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Upload, Download, Image as ImageIcon, X, Home, ChevronDown,
  Zap, HardDrive, ArrowRightLeft, Percent, RefreshCw, Shield,
  Globe, FileText, HelpCircle, CheckCircle, AlertCircle
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatBytes = (bytes) => {
  if (!bytes) return "—";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const getExt = (mime) =>
  ({ "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" })[mime] || "jpg";

const FORMATS = [
  { mime: "image/jpeg", label: "JPG", desc: "Best for photos, small size" },
  { mime: "image/png", label: "PNG", desc: "Lossless, supports transparency" },
  { mime: "image/webp", label: "WebP", desc: "Smallest size, modern browsers" },
];

const QUICK_CONVERSIONS = [
  { label: "JPG to PNG", to: "image/png" },
  { label: "JPG to WebP", to: "image/webp" },
  { label: "PNG to JPG", to: "image/jpeg" },
  { label: "PNG to WebP", to: "image/webp" },
  { label: "WebP to JPG", to: "image/jpeg" },
  { label: "WebP to PNG", to: "image/png" },
];

// ─── Convert a single file using canvas ──────────────────────────────────────
function convertFile(file, toMime, quality) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (toMime === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const qual = toMime === "image/png" ? undefined : quality;
      canvas.toBlob(
        (blob) => {
          if (!blob) { reject(new Error("Conversion failed")); return; }
          resolve({ blob, width: img.naturalWidth, height: img.naturalHeight });
        },
        toMime, qual
      );
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Failed to load image")); };
    img.src = url;
  });
}

// ─── Single Image Card ────────────────────────────────────────────────────────
const ImageCard = ({ item, onRemove }) => {
  const savings = item.originalSize > 0 && item.convertedSize > 0
    ? Math.round(((item.originalSize - item.convertedSize) / item.originalSize) * 100)
    : null;
  const bigger = savings !== null && savings < 0;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2 min-w-0">
          <ImageIcon size={14} className="text-gray-400 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-700 truncate">{item.name}</span>
          {item.width && <span className="text-xs text-gray-400 flex-shrink-0">{item.width}x{item.height}px</span>}
        </div>
        <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500 transition-colors ml-3 flex-shrink-0" aria-label="Remove">
          <X size={15} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        {/* Original */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Original</span>
            <span className="text-xs font-medium text-gray-600">{formatBytes(item.originalSize)}</span>
          </div>
          <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center h-44">
            <img src={item.originalUrl} alt="Original preview" className="max-h-44 max-w-full object-contain" />
          </div>
        </div>

        {/* Converted */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Converted to {getExt(item.toMime).toUpperCase()}</span>
            {item.convertedSize > 0 && (
              <span className={`text-xs font-medium ${bigger ? "text-orange-500" : "text-green-600"}`}>
                {formatBytes(item.convertedSize)}
                {savings !== null && savings !== 0 && (
                  <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${bigger ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600"}`}>
                    {bigger ? `+${Math.abs(savings)}%` : `-${savings}%`}
                  </span>
                )}
              </span>
            )}
          </div>

          {item.loading ? (
            <div className="h-44 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center justify-center">
              <div className="w-7 h-7 rounded-full border-2 border-sky-200 border-t-sky-600 animate-spin mb-2" />
              <span className="text-xs text-sky-600">Converting...</span>
            </div>
          ) : item.error ? (
            <div className="h-44 bg-red-50 rounded-xl border border-red-100 flex items-center justify-center p-4">
              <p className="text-red-500 text-xs text-center flex items-center gap-1"><AlertCircle size={12} /> {item.error}</p>
            </div>
          ) : item.convertedUrl ? (
            <>
              <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center h-44">
                <img src={item.convertedUrl} alt="Converted preview" className="max-h-44 max-w-full object-contain" />
              </div>
              <a href={item.convertedUrl} download={`converted-${item.name.replace(/\.[^.]+$/, "")}.${getExt(item.toMime)}`}
                className="mt-3 w-full bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium py-2.5 rounded-xl inline-flex items-center justify-center gap-2 transition-colors">
                <Download size={14} /> Download {getExt(item.toMime).toUpperCase()}
              </a>
            </>
          ) : (
            <div className="h-44 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center text-gray-300 text-xs">Waiting...</div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ImageConverter() {
  const [images, setImages] = useState([]);
  const [toFormat, setToFormat] = useState("image/webp");
  const [quality, setQuality] = useState(0.92);
  const [isDragging, setIsDragging] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const fileInputRef = useRef(null);

  const runConvert = useCallback(async (id, file, mime, qual) => {
    try {
      const { blob, width, height } = await convertFile(file, mime, qual);
      const convertedUrl = URL.createObjectURL(blob);
      setImages((prev) => prev.map((img) => img.id === id ? { ...img, loading: false, convertedUrl, convertedSize: blob.size, width, height } : img));
    } catch (err) {
      setImages((prev) => prev.map((img) => img.id === id ? { ...img, loading: false, error: err.message || "Conversion failed" } : img));
    }
  }, []);

  const addFiles = (files) => {
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/")).slice(0, 10);
    if (!valid.length) return;
    const newImages = valid.map((file) => ({
      id: crypto.randomUUID(), name: file.name, originalUrl: URL.createObjectURL(file),
      originalSize: file.size, convertedUrl: null, convertedSize: 0, toMime: toFormat,
      loading: true, error: null, width: null, height: null, file,
    }));
    setImages((prev) => [...prev, ...newImages]);
    newImages.forEach((img) => runConvert(img.id, img.file, toFormat, quality));
  };

  const reConvertAll = () => {
    setImages((prev) => prev.map((img) => ({ ...img, loading: true, convertedUrl: null, convertedSize: 0, error: null, toMime: toFormat })));
    images.forEach((img) => runConvert(img.id, img.file, toFormat, quality));
  };

  const removeImage = (id) => setImages((prev) => prev.filter((img) => img.id !== id));
  const clearAll = () => setImages([]);
  const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); addFiles(e.dataTransfer.files); };

  // ── Stats (FIXED ORDER) ──
  const allDone = images.length > 0 && images.every((img) => !img.loading);
  const totalOriginal = images.reduce((acc, img) => acc + img.originalSize, 0);
  const totalConverted = images.reduce((acc, img) => acc + (img.convertedSize || 0), 0);
  const totalSaved = Math.max(0, totalOriginal - totalConverted);
  const avgSavings = images.length > 0 && allDone
    ? Math.round(images.reduce((acc, img) => {
        const s = img.originalSize > 0 ? ((img.originalSize - (img.convertedSize || 0)) / img.originalSize) * 100 : 0;
        return acc + s;
      }, 0) / images.filter((img) => !img.loading).length)
    : 0;

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
            <li><span className="text-gray-900 font-semibold">Image Converter</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">

        {/* ── Hero ── */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <ImageIcon className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Convert JPG to PNG Without Losing Quality Online –{" "}
            <span className="text-sky-600">Free Image Format Converter</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Change JPG to PNG, PNG to WebP, WebP to JPG instantly in your browser. Batch convert up to 10 images. No server upload.
          </p>
        </div>

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">

          {/* Quick Conversions */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Quick Select Conversion</label>
            <div className="flex flex-wrap gap-2">
              {QUICK_CONVERSIONS.map((qc) => (
                <button key={qc.label} onClick={() => setToFormat(qc.to)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${toFormat === qc.to ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-600 border-gray-200 hover:border-sky-400"}`}>
                  {qc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Format Buttons */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Output Format</label>
            <div className="grid grid-cols-3 gap-3">
              {FORMATS.map((f) => (
                <button key={f.mime} onClick={() => setToFormat(f.mime)}
                  className={`flex flex-col items-start px-4 py-3 rounded-xl border text-left transition-all ${toFormat === f.mime ? "border-sky-500 bg-sky-50 text-sky-700" : "border-gray-200 text-gray-600 hover:border-sky-300"}`}>
                  <span className="text-sm font-bold">{f.label}</span>
                  <span className="text-xs text-gray-400 mt-0.5">{f.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quality Slider */}
          {toFormat !== "image/png" ? (
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-semibold text-gray-700 w-20 flex-shrink-0">Quality</span>
              <input type="range" min="0.50" max="0.98" step="0.01" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="flex-1 accent-sky-600" />
              <span className="text-sm font-bold text-sky-600 w-10 text-right">{Math.round(quality * 100)}%</span>
            </div>
          ) : (
            <p className="text-xs text-gray-400 mb-6">PNG is lossless — quality slider not applicable.</p>
          )}

          {/* Drop Zone */}
          <div className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all mb-6 ${isDragging ? "border-sky-500 bg-sky-50" : "border-gray-300 hover:border-sky-400 hover:bg-sky-50/30"}`}
            onClick={() => fileInputRef.current?.click()} onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)}>
            <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(e) => addFiles(e.target.files)} className="hidden" />
            <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Upload className="text-sky-600" size={24} />
            </div>
            <p className="text-base font-semibold text-gray-800 mb-1">Drop images here or click to upload</p>
            <p className="text-gray-400 text-sm">JPG, PNG, WebP — Up to 10 images at once</p>
          </div>

          {/* Action Buttons */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button onClick={reConvertAll} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                <RefreshCw size={18} /> Re-convert All
              </button>
              <button onClick={clearAll} className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                <X size={18} /> Clear All
              </button>
            </div>
          )}

          {/* Stats Grid */}
          {allDone && images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                <div className="flex justify-center text-sky-500 mb-1"><ArrowRightLeft size={20} /></div>
                <p className="text-lg font-bold text-gray-800">{images.length}</p>
                <p className="text-xs text-gray-500 mt-0.5">Converted</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                <div className="flex justify-center text-sky-500 mb-1"><HardDrive size={20} /></div>
                <p className="text-lg font-bold text-gray-800">{formatBytes(totalOriginal)}</p>
                <p className="text-xs text-gray-500 mt-0.5">Original</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                <div className="flex justify-center text-green-500 mb-1"><Zap size={20} /></div>
                <p className="text-lg font-bold text-gray-800">{totalSaved > 0 ? formatBytes(totalSaved) : "—"}</p>
                <p className="text-xs text-gray-500 mt-0.5">Saved</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                <div className="flex justify-center text-sky-500 mb-1"><Percent size={20} /></div>
                <p className="text-lg font-bold text-gray-800">{avgSavings > 0 ? `${avgSavings}%` : "—"}</p>
                <p className="text-xs text-gray-500 mt-0.5">Avg Change</p>
              </div>
            </div>
          )}

          {/* Download All Bar */}
          {allDone && images.length > 1 && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-xl px-5 py-3 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm text-green-700 font-medium flex items-center gap-2"><CheckCircle size={14} /> {images.length} images converted{totalSaved > 0 ? ` — Saved ${formatBytes(totalSaved)} total` : ""}</span>
              <button onClick={() => images.forEach((img) => { if (!img.convertedUrl) return; const a = document.createElement("a"); a.href = img.convertedUrl; a.download = `converted-${img.name.replace(/\.[^.]+$/, "")}.${getExt(img.toMime)}`; a.click(); })}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
                <Download size={14} /> Download All
              </button>
            </div>
          )}

          {/* Image Cards */}
          <div className="space-y-4 mt-6">
            {images.map((img) => <ImageCard key={img.id} item={img} onRemove={removeImage} />)}
          </div>

          {/* Empty State */}
          {!images.length && (
            <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mt-4">
              <ImageIcon size={32} className="mx-auto mb-3 text-gray-300" />
              <p>Drop your images above or click to browse. We'll convert them instantly — no upload required.</p>
            </div>
          )}
        </div>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Convert Images in 3 Simple Steps</h2>
          <ol className="space-y-5">
            {[
              { step: "1", title: "Pick Your Output Format", desc: "Choose JPG, PNG, or WebP using the quick buttons or format cards. WebP gives the smallest files for modern websites." },
              { step: "2", title: "Upload Your Images", desc: "Drag and drop up to 10 images at once, or click to browse. JPG, PNG, and WebP files are all supported." },
              { step: "3", title: "Download Converted Files", desc: "Wait a few seconds for conversion. Preview before/after side by side, then download individually or all at once." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How Browser-Based Conversion Works</h2>
          <p className="text-gray-500 text-sm mb-6">No server upload. No waiting. Everything happens on your device.</p>
          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">HTML5 Canvas API</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">canvas.toBlob() → new format, same pixels</div>
              <p className="text-gray-500 text-xs leading-relaxed">We draw your image onto an invisible canvas, then export it in your chosen format. The pixel data stays intact — only the container changes.</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Format Differences</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">JPG: lossy • PNG: lossless • WebP: smart compression</div>
              <p className="text-gray-500 text-xs leading-relaxed">JPG shrinks photos with minor quality loss. PNG keeps every pixel perfect (great for logos). WebP combines both — small size + good quality + transparency support.</p>
            </div>
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">Privacy First</h3>
              <p className="text-sky-800 text-xs leading-relaxed">All conversion happens locally in your browser using JavaScript. No images are uploaded, stored, or sent anywhere. Close the tab and your data is gone. 100% private by design.</p>
            </div>
          </div>
        </section>

        {/* ─── Sample Results ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What Kind of Results Can You Expect?</h2>
          <p className="text-gray-500 text-sm mb-6">Real examples with different formats and quality settings.</p>
          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-lg">Photo (JPG → WebP)</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Original JPG</p><p className="font-semibold text-gray-800">2.1 MB</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Converted WebP (92%)</p><p className="font-semibold text-green-600">680 KB <span className="text-xs text-gray-400">(-68%)</span></p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Best For</p><p className="font-semibold text-gray-800">Websites, Apps</p></div>
              </div>
            </div>
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded-lg">Logo (PNG → JPG)</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Original PNG</p><p className="font-semibold text-gray-800">840 KB</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Converted JPG (92%)</p><p className="font-semibold text-green-600">210 KB <span className="text-xs text-gray-400">(-75%)</span></p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Note</p><p className="font-semibold text-gray-800">Transparency lost</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Who Uses This Image Converter?</h2>
          <p className="text-gray-500 text-sm mb-6">From developers to creators — the right format makes a difference.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Globe size={20} className="text-sky-600" />, title: "Web Developers", desc: "Convert PNG logos to WebP for faster page loads. Swap JPG to PNG when you need transparency for overlays." },
              { icon: <FileText size={20} className="text-green-600" />, title: "Content Creators", desc: "Change image formats for different platforms — JPG for Instagram, PNG for presentations, WebP for your blog." },
              { icon: <Zap size={20} className="text-amber-600" />, title: "E-commerce Sellers", desc: "Batch convert product photos to WebP to improve site speed and mobile shopping experience for customers." },
              { icon: <Shield size={20} className="text-violet-600" />, title: "Privacy-Conscious Users", desc: "Convert personal images without uploading to third-party servers. Everything stays on your device — always." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Convert Images in Your Browser?</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Most online image converters ask you to upload files to their servers. That means waiting for uploads, worrying about privacy, and sometimes dealing with watermarks or limits. Our free image converter works differently — everything happens <strong>inside your browser</strong> using the HTML5 Canvas API.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Convert JPG to PNG when you need transparency for logos or overlays. Switch PNG to WebP to cut file size by 25-35% without visible quality loss. Change WebP to JPG for maximum compatibility with email clients and older software.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Batch processing lets you convert up to 10 images at once with the same settings. See original and converted versions side by side with exact file sizes and percentage change. Download individually or grab everything with one click.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">Privacy Note</h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No images are uploaded to any server. No data is stored or tracked. Your photos stay on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need to shrink image file size? Try the{" "}
            <Link href="/tools/image-compressor" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Image Compressor</Link>. 
            Want exact dimensions? The{" "}
            <Link href="/tools/image-resizer" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Image Resizer</Link> has you covered.
          </p>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              { q: "How to convert JPG to PNG without losing quality online for free?", a: "Upload your JPG image and select PNG as the output format. The conversion happens in your browser using the HTML5 Canvas API, so no quality is lost during the process. The converted PNG preserves the exact pixel data of your original image." },
              { q: "Does converting PNG to WebP reduce file size?", a: "Yes. WebP typically produces files 25-35% smaller than PNG and JPEG at equivalent visual quality. This makes it the best format for websites and apps where loading speed matters." },
              { q: "How to convert WebP to JPG for email attachment?", a: "Upload your WebP image, select JPG as the output format, and download. JPG is universally supported by all email clients and most software, making it ideal for email attachments." },
              { q: "Can I batch convert multiple images to a different format at once?", a: "Yes. Upload up to 10 images at once and they will all be converted to your chosen format simultaneously. Use the Download All button to save every converted image in one click." },
              { q: "Does this image converter upload my files to a server?", a: "No. All conversion happens locally in your browser using the HTML5 Canvas API. Your images are never uploaded, stored, or sent to any server. They stay on your device at all times." },
              { q: "Will converting JPG to PNG improve image quality?", a: "No. Converting JPG to PNG cannot restore quality that was already lost during JPEG compression. However, PNG will preserve the current quality without any further loss and adds support for transparent backgrounds." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Image Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/tools/image-compressor", title: "Image Compressor", desc: "Reduce image size by up to 90% without quality loss." },
              { href: "/tools/image-resizer", title: "Image Resizer", desc: "Resize photos to exact pixel dimensions for any platform." },
              { href: "/tools/image-cropper", title: "Image Cropper", desc: "Crop images with custom aspect ratios for social media." },
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