'use client'

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Upload, Download, Image as ImageIcon, X, Home, ChevronDown,
  Lock, Unlock, Maximize2, RefreshCw, Ruler, HardDrive,
  ArrowRightLeft, Percent, Shield, Globe, FileText, HelpCircle
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatBytes = (bytes) => {
  if (!bytes) return "—";
  const k = 1024, sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// ─── Platform Presets ─────────────────────────────────────────────────────────
const PRESETS = [
  { label: "Instagram Post", w: 1080, h: 1080 },
  { label: "Instagram Story", w: 1080, h: 1920 },
  { label: "Facebook Cover", w: 820, h: 312 },
  { label: "Twitter Header", w: 1500, h: 500 },
  { label: "YouTube Thumb", w: 1280, h: 720 },
  { label: "WhatsApp DP", w: 500, h: 500 },
  { label: "LinkedIn Banner", w: 1584, h: 396 },
  { label: "HD Wallpaper", w: 1920, h: 1080 },
];

const FORMAT_OPTIONS = [
  { value: "image/jpeg", label: "JPG", ext: "jpg", hasQuality: true },
  { value: "image/png", label: "PNG", ext: "png", hasQuality: false },
  { value: "image/webp", label: "WebP", ext: "webp", hasQuality: true },
];

const QUICK_SCALES = [25, 50, 75, 100, 150, 200];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ImageResizer() {
  const [originalImage, setOriginalImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [resizedSize, setResizedSize] = useState(0);
  const [origWidth, setOrigWidth] = useState(0);
  const [origHeight, setOrigHeight] = useState(0);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [aspectLocked, setAspectLocked] = useState(true);
  const [usePercent, setUsePercent] = useState(false);
  const [percent, setPercent] = useState(100);
  const [outputFormat, setOutputFormat] = useState("image/jpeg");
  const [quality, setQuality] = useState(0.92);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activePreset, setActivePreset] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const fileInputRef = useRef(null);
  const imgRef = useRef(null);
  const origUrlRef = useRef(null);
  const resizedUrlRef = useRef(null);

  useEffect(() => () => {
    if (origUrlRef.current) URL.revokeObjectURL(origUrlRef.current);
    if (resizedUrlRef.current) URL.revokeObjectURL(resizedUrlRef.current);
  }, []);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setError("Please select a valid image (JPG, PNG, WebP).");
      return;
    }
    setError(null);
    if (origUrlRef.current) URL.revokeObjectURL(origUrlRef.current);
    const url = URL.createObjectURL(file);
    origUrlRef.current = url;
    setOriginalImage(url);
    setOriginalSize(file.size);
    setResizedImage(null);
    setResizedSize(0);
    setActivePreset("");
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setOrigWidth(img.width);
      setOrigHeight(img.height);
      setWidth(String(img.width));
      setHeight(String(img.height));
      setPercent(100);
      imgRef.current = img;
    };
  };

  const handleWidthChange = (val) => {
    setWidth(val);
    setActivePreset("");
    if (aspectLocked && origWidth && origHeight && val) {
      const ratio = origHeight / origWidth;
      setHeight(String(Math.round(parseInt(val, 10) * ratio) || ""));
    }
  };

  const handleHeightChange = (val) => {
    setHeight(val);
    setActivePreset("");
    if (aspectLocked && origWidth && origHeight && val) {
      const ratio = origWidth / origHeight;
      setWidth(String(Math.round(parseInt(val, 10) * ratio) || ""));
    }
  };

  const applyScale = (pct) => {
    setPercent(pct);
    setUsePercent(true);
    setActivePreset("");
    const scale = pct / 100;
    setWidth(String(Math.round(origWidth * scale)));
    setHeight(String(Math.round(origHeight * scale)));
  };

  const applyPreset = (preset) => {
    setActivePreset(preset.label);
    setUsePercent(false);
    setAspectLocked(false);
    setWidth(String(preset.w));
    setHeight(String(preset.h));
  };

  const resize = () => {
    if (!imgRef.current) return;
    let tw = parseInt(width, 10);
    let th = parseInt(height, 10);
    if (usePercent) {
      const scale = percent / 100;
      tw = Math.round(origWidth * scale);
      th = Math.round(origHeight * scale);
      setWidth(String(tw));
      setHeight(String(th));
    }
    if (!tw || !th || tw <= 0 || th <= 0) {
      setError("Please enter valid positive dimensions.");
      return;
    }
    if (tw > 8000 || th > 8000) {
      setError("Max dimension is 8000px to prevent browser crashes.");
      return;
    }
    setLoading(true);
    setError(null);
    const canvas = document.createElement("canvas");
    canvas.width = tw;
    canvas.height = th;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(imgRef.current, 0, 0, tw, th);
    const fmt = outputFormat;
    const qual = FORMAT_OPTIONS.find((f) => f.value === fmt)?.hasQuality ? quality : undefined;
    canvas.toBlob(
      (blob) => {
        if (!blob) { setError("Resize failed. Please try again."); setLoading(false); return; }
        if (resizedUrlRef.current) URL.revokeObjectURL(resizedUrlRef.current);
        const url = URL.createObjectURL(blob);
        resizedUrlRef.current = url;
        setResizedImage(url);
        setResizedSize(blob.size);
        setLoading(false);
      },
      fmt, qual
    );
  };

  const downloadResized = () => {
    if (!resizedImage) return;
    const ext = FORMAT_OPTIONS.find((f) => f.value === outputFormat)?.ext || "jpg";
    const link = document.createElement("a");
    link.href = resizedImage;
    link.download = `resized-${width}x${height}-${Date.now()}.${ext}`;
    link.click();
  };

  const reset = () => {
    setOriginalImage(null); setResizedImage(null);
    setOriginalSize(0); setResizedSize(0);
    setWidth(""); setHeight("");
    setPercent(100); setUsePercent(false);
    setError(null); setLoading(false);
    setActivePreset(""); setAspectLocked(true);
    imgRef.current = null;
  };

  const savingsPct = originalSize > 0 && resizedSize > 0
    ? Math.round(((originalSize - resizedSize) / originalSize) * 100)
    : 0;
  const currentFormat = FORMAT_OPTIONS.find((f) => f.value === outputFormat);

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
            <li><span className="text-gray-900 font-semibold">Image Resizer</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-5xl mx-auto w-full px-4 pb-20">

        {/* ── Hero ── */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <Maximize2 className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Resize Image to 1080x1080 for Instagram Post Online –{" "}
            <span className="text-sky-600">Free Pixel Dimension Tool</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Change JPG, PNG and WebP to any pixel dimension or percentage. Platform presets for Instagram, YouTube, Twitter and more. No upload to server.
          </p>
        </div>

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">

          {/* Upload State */}
          {!originalImage ? (
            <div className={`border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer transition-all ${isDragging ? "border-sky-500 bg-sky-50" : "border-gray-300 hover:border-sky-400 hover:bg-sky-50/30"}`}
              onClick={() => fileInputRef.current?.click()}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files?.[0]); }}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => handleFile(e.target.files?.[0])} className="hidden" />
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="text-sky-600" size={28} />
              </div>
              <p className="text-xl font-semibold text-gray-800 mb-2">Drop image here or click to upload</p>
              <p className="text-gray-400 text-sm">JPG, PNG, WebP — any size</p>
              {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}
            </div>
          ) : (
            <div className="space-y-5">

              {/* Platform Presets */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Platform Size Presets</label>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((p) => (
                    <button key={p.label} onClick={() => applyPreset(p)}
                      className={`px-3 py-2 rounded-xl border text-sm font-medium transition-all ${activePreset === p.label ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-600 border-gray-200 hover:border-sky-400"}`}>
                      {p.label} <span className="ml-1 text-xs opacity-60">{p.w}x{p.h}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Controls Grid */}
              <div className="grid lg:grid-cols-2 gap-5">
                {/* Left: Settings */}
                <div className="space-y-4">
                  {/* Original Preview */}
                  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-semibold text-gray-700">Original</span>
                      <span className="text-xs text-gray-400">{formatBytes(originalSize)} · {origWidth}x{origHeight}px</span>
                    </div>
                    <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                      <img src={originalImage} alt="Original preview" className="w-full max-h-52 object-contain" />
                    </div>
                  </div>

                  {/* Resize Settings */}
                  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-sm font-semibold text-gray-700">Resize Settings</label>
                      <button onClick={() => setAspectLocked(!aspectLocked)}
                        className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${aspectLocked ? "bg-sky-50 border-sky-300 text-sky-600" : "bg-gray-50 border-gray-200 text-gray-500"}`}>
                        {aspectLocked ? <Lock size={13} /> : <Unlock size={13} />}
                        {aspectLocked ? "Ratio locked" : "Ratio unlocked"}
                      </button>
                    </div>

                    {/* Quick Scale */}
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Quick Scale</label>
                      <div className="flex gap-2 flex-wrap">
                        {QUICK_SCALES.map((s) => (
                          <button key={s} onClick={() => applyScale(s)}
                            className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${usePercent && percent === s ? "bg-sky-600 text-white border-sky-600" : "bg-gray-50 border-gray-200 text-gray-600 hover:border-sky-400"}`}>
                            {s}%
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Width / Height */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Width (px)</label>
                        <input type="number" min="1" max="8000" value={width} onChange={(e) => { setUsePercent(false); handleWidthChange(e.target.value); }}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Height (px)</label>
                        <input type="number" min="1" max="8000" value={height} onChange={(e) => { setUsePercent(false); handleHeightChange(e.target.value); }}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800" />
                      </div>
                    </div>

                    {/* Output Format */}
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Output Format</label>
                      <div className="flex gap-2">
                        {FORMAT_OPTIONS.map((f) => (
                          <button key={f.value} onClick={() => setOutputFormat(f.value)}
                            className={`flex-1 py-2 rounded-xl border text-sm font-medium transition-all ${outputFormat === f.value ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-600 border-gray-200 hover:border-sky-400"}`}>
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quality Slider */}
                    {currentFormat?.hasQuality && (
                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                          Quality — <span className="text-sky-600">{Math.round(quality * 100)}%</span>
                        </label>
                        <input type="range" min="0.5" max="1.0" step="0.01" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-sky-600" />
                        <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Smaller file</span><span>Best quality</span></div>
                      </div>
                    )}

                    {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                      <button onClick={resize} disabled={loading || !width || !height}
                        className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-40">
                        <Maximize2 size={18} /> {loading ? "Resizing..." : "Resize Image"}
                      </button>
                      <button onClick={reset}
                        className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                        <RefreshCw size={18} /> Reset
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Resized Output */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-gray-700">Resized Output</span>
                    {resizedSize > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">{formatBytes(resizedSize)}</span>
                        {savingsPct > 0 && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">-{savingsPct}%</span>}
                        {savingsPct < 0 && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">+{Math.abs(savingsPct)}%</span>}
                      </div>
                    )}
                  </div>

                  {loading ? (
                    <div className="h-64 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center justify-center">
                      <div className="w-10 h-10 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mb-3" />
                      <p className="text-sm text-sky-600">Resizing...</p>
                    </div>
                  ) : resizedImage ? (
                    <>
                      {/* Size Comparison Bar */}
                      {resizedSize > 0 && (
                        <div className="mb-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                            <span>Original: {formatBytes(originalSize)} ({origWidth}x{origHeight}px)</span>
                            <span>New: {formatBytes(resizedSize)} ({width}x{height}px)</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${savingsPct >= 0 ? "bg-green-500" : "bg-orange-400"}`}
                              style={{ width: `${Math.min(100, Math.max(5, 100 - Math.abs(savingsPct)))}%` }} />
                          </div>
                        </div>
                      )}

                      {/* Stats Grid */}
                      <div className="grid grid-cols-4 gap-3 mb-4">
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center"><div className="flex justify-center text-sky-500 mb-1"><Ruler size={16} /></div><p className="text-sm font-bold text-gray-800">{origWidth}x{origHeight}</p><p className="text-xs text-gray-500 mt-0.5">Original</p></div>
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center"><div className="flex justify-center text-sky-500 mb-1"><ArrowRightLeft size={16} /></div><p className="text-sm font-bold text-gray-800">{width}x{height}</p><p className="text-xs text-gray-500 mt-0.5">New Size</p></div>
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center"><div className="flex justify-center text-green-500 mb-1"><HardDrive size={16} /></div><p className="text-sm font-bold text-gray-800">{formatBytes(resizedSize)}</p><p className="text-xs text-gray-500 mt-0.5">File Size</p></div>
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center"><div className="flex justify-center text-sky-500 mb-1"><Percent size={16} /></div><p className="text-sm font-bold text-gray-800">{savingsPct > 0 ? `-${savingsPct}%` : savingsPct < 0 ? `+${Math.abs(savingsPct)}%` : "0%"}</p><p className="text-xs text-gray-500 mt-0.5">Change</p></div>
                      </div>

                      <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden mb-4">
                        <img src={resizedImage} alt="Resized preview" className="w-full max-h-64 object-contain" />
                      </div>
                      <button onClick={downloadResized}
                        className="w-full bg-sky-600 hover:bg-sky-700 active:scale-95 transition-all text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                        <Download size={17} /> Download {currentFormat?.label}
                      </button>
                    </>
                  ) : (
                    <div className="h-64 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300">
                      <ImageIcon size={36} className="mb-2" />
                      <p className="text-sm">Resized image appears here</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Empty State */}
              {!originalImage && !error && (
                <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mt-4">
                  <Maximize2 size={32} className="mx-auto mb-3 text-gray-300" />
                  <p>Drop your image above or click to browse. We'll resize it to your exact specs — no upload required.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Resize Images for Social Media in 3 Simple Steps</h2>
          <ol className="space-y-5">
            {[
              { step: "1", title: "Pick a Platform Preset or Enter Custom Dimensions", desc: "Choose Instagram Post, YouTube Thumbnail, or any preset. Or type exact width/height in pixels. Toggle aspect ratio lock to prevent stretching." },
              { step: "2", title: "Adjust Format & Quality", desc: "Select JPG for smallest files, PNG for transparency, or WebP for modern web optimization. Use the quality slider to balance file size vs visual fidelity." },
              { step: "3", title: "Resize & Download", desc: "Click Resize Image. See original vs resized side by side with exact file sizes. Download instantly — no waiting, no upload." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How Browser-Based Resizing Works</h2>
          <p className="text-gray-500 text-sm mb-6">No server upload. No waiting. Everything happens on your device.</p>
          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">HTML5 Canvas API</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">ctx.drawImage(img, 0, 0, newWidth, newHeight)</div>
              <p className="text-gray-500 text-xs leading-relaxed">We draw your image onto an invisible canvas at your target dimensions, then export the result. High-quality smoothing ensures sharp output even when resizing down.</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Aspect Ratio Logic</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">locked: newH = newW × (origH / origW)</div>
              <p className="text-gray-500 text-xs leading-relaxed">When ratio is locked, changing width auto-calculates height (and vice versa) using the original image's proportions. Unlock to set exact non-proportional dimensions.</p>
            </div>
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">Privacy First</h3>
              <p className="text-sky-800 text-xs leading-relaxed">All resizing happens locally in your browser using JavaScript. No images are uploaded, stored, or sent anywhere. Close the tab and your data is gone. 100% private by design.</p>
            </div>
          </div>
        </section>

        {/* ─── Sample Results ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What Kind of Results Can You Expect?</h2>
          <p className="text-gray-500 text-sm mb-6">Real examples with different presets and formats.</p>
          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-pink-100 text-pink-700 font-bold px-2.5 py-1 rounded-lg">Instagram Post (1080x1080)</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Original</p><p className="font-semibold text-gray-800">3000x2000px · 2.1 MB</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Resized (JPG 92%)</p><p className="font-semibold text-green-600">1080x1080px · 280 KB (-87%)</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Best For</p><p className="font-semibold text-gray-800">Feed posts, profile pics</p></div>
              </div>
            </div>
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-purple-100 text-purple-700 font-bold px-2.5 py-1 rounded-lg">YouTube Thumbnail (1280x720)</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Original</p><p className="font-semibold text-gray-800">4000x3000px · 3.8 MB</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Resized (WebP 92%)</p><p className="font-semibold text-green-600">1280x720px · 95 KB (-97%)</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Best For</p><p className="font-semibold text-gray-800">YouTube video covers</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Who Uses This Image Resizer?</h2>
          <p className="text-gray-500 text-sm mb-6">From creators to businesses — the right size makes content look professional.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Globe size={20} className="text-sky-600" />, title: "Social Media Managers", desc: "Resize product photos, team headshots, and promotional graphics to exact platform specs in seconds — no design skills needed." },
              { icon: <FileText size={20} className="text-green-600" />, title: "Bloggers & Writers", desc: "Prepare featured images, inline graphics, and email headers at the exact pixel dimensions your CMS or newsletter requires." },
              { icon: <Maximize2 size={20} className="text-amber-600" />, title: "E-commerce Sellers", desc: "Batch-resize product photos to platform requirements (Amazon, Shopify, Etsy) for consistent, professional-looking listings." },
              { icon: <Shield size={20} className="text-violet-600" />, title: "Privacy-Conscious Users", desc: "Resize personal photos without uploading to third-party servers. Everything stays on your device — always." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Resize Images in Your Browser?</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Most online image resizers ask you to upload files to their servers. That means waiting for uploads, worrying about privacy, and sometimes dealing with watermarks or limits. Our free image resizer works differently — everything happens <strong>inside your browser</strong> using the HTML5 Canvas API.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Pick a preset like Instagram Post (1080x1080) or YouTube Thumbnail (1280x720) and the tool sets exact dimensions automatically. Keep aspect ratio locked to prevent distortion, or unlock for custom non-proportional sizing.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Output as JPG for smallest file size, PNG for transparency support, or WebP for modern web optimization. Quality slider lets you balance file size vs visual fidelity for lossy formats.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">Privacy Note</h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No images are uploaded to any server. No data is stored or tracked. Your photos stay on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need to shrink file size after resizing? Try the{" "}
            <Link href="/tools/image-compressor" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Image Compressor</Link>. 
            Want to crop instead of resize? The{" "}
            <Link href="/tools/image-cropper" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Image Cropper</Link> has you covered.
          </p>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              { q: "How to resize image to 1080x1080 for Instagram post online?", a: "Upload your photo, click the Instagram Post preset (1080x1080), then click Resize Image. The tool automatically sets the correct dimensions and you can download the resized image as JPG, PNG or WebP." },
              { q: "Can I resize an image without losing quality?", a: "Yes, when resizing down (making smaller) quality is preserved very well with high quality output settings. Resizing up (enlarging) will cause some blurriness because pixels are being interpolated — this is a fundamental limitation of all image resizers." },
              { q: "How to resize image to 50 percent online for free?", a: "Upload your image and click the 50% quick scale button. The width and height fields update automatically to half the original dimensions. Then click Resize Image to process and download." },
              { q: "What size for YouTube thumbnail 1280x720?", a: "YouTube thumbnails should be 1280x720 pixels in 16:9 aspect ratio. Select the YouTube Thumb preset in our tool and it sets 1280x720 automatically." },
              { q: "Does this image resizer upload my photos to a server?", a: "No. All resizing happens entirely in your browser using the HTML5 Canvas API. Your images are never uploaded, stored, or sent to any server." },
              { q: "How to resize photo for WhatsApp profile picture 500x500?", a: "Upload your photo, click the WhatsApp DP preset (500x500), then click Resize Image. Download the result and set it as your WhatsApp profile picture." },
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
              { href: "/tools/image-compressor", title: "Image Compressor", desc: "Reduce image file size by up to 90% without quality loss." },
              { href: "/tools/image-cropper", title: "Image Cropper", desc: "Crop images with social media presets and custom ratios." },
              { href: "/tools/image-converter", title: "Image Converter", desc: "Convert between JPG, PNG and WebP formats instantly." },
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