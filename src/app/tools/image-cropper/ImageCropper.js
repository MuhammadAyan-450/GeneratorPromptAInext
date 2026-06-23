'use client'

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Upload, Download, Crop as CropIcon, X, Home, ChevronDown,
  Ruler, FileImage, RotateCcw, RotateCw, RefreshCw, Shield,
  Globe, HelpCircle, CheckCircle, Image as ImageIcon
} from "lucide-react";

import ResponsiveAd from "../../../components/ResponsiveAd";


// ─── Helpers ──────────────────────────────────────────────────────────────────
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(makeAspectCrop({ unit: "%", width: 90 }, aspect, mediaWidth, mediaHeight), mediaWidth, mediaHeight);
}

// ─── Presets ──────────────────────────────────────────────────────────────────
const SOCIAL_PRESETS = [
  { label: "Free", aspect: null },
  { label: "Square 1:1", aspect: 1 },
  { label: "Instagram Post", aspect: 1 },
  { label: "Instagram Story", aspect: 9 / 16 },
  { label: "TikTok", aspect: 9 / 16 },
  { label: "YouTube Thumb", aspect: 16 / 9 },
  { label: "Twitter Header", aspect: 3 / 1 },
  { label: "Facebook Cover", aspect: 205 / 78 },
  { label: "WhatsApp DP", aspect: 1 },
  { label: "Landscape 16:9", aspect: 16 / 9 },
  { label: "Classic 4:3", aspect: 4 / 3 },
  { label: "Photo 3:2", aspect: 3 / 2 },
];

const FORMAT_OPTIONS = [
  { value: "image/jpeg", label: "JPG", ext: "jpg" },
  { value: "image/png", label: "PNG", ext: "png" },
  { value: "image/webp", label: "WebP", ext: "webp" },
];

// ─── Single Preview Card ──────────────────────────────────────────────────────
const CropPreview = ({ completedCrop, imgRef, rotation, outputFormat }) => {
  const canvasRef = useRef(null);

  useCallback(() => {
    if (!completedCrop || !imgRef?.current || !canvasRef.current) return;
    const image = imgRef.current;
    const canvas = canvasRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const rad = (rotation * Math.PI) / 180;
    const sin = Math.abs(Math.sin(rad));
    const cos = Math.abs(Math.cos(rad));
    const srcW = completedCrop.width * scaleX;
    const srcH = completedCrop.height * scaleY;
    canvas.width = srcW * cos + srcH * sin;
    canvas.height = srcW * sin + srcH * cos;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rad);
    ctx.drawImage(image, completedCrop.x * scaleX, completedCrop.y * scaleY, srcW, srcH, -srcW / 2, -srcH / 2, srcW, srcH);
  }, [completedCrop, imgRef, rotation]);

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-100 min-h-[200px] flex items-center justify-center p-3">
      {completedCrop ? (
        <canvas ref={canvasRef} className="max-w-full max-h-[280px] object-contain rounded-lg shadow-sm" />
      ) : (
        <div className="text-center text-gray-300">
          <CropIcon size={36} className="mx-auto mb-2" />
          <p className="text-sm">Crop box preview appears here</p>
        </div>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ImageCropper() {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [activePreset, setActivePreset] = useState("Free");
  const [aspectRatio, setAspectRatio] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [outputFormat, setOutputFormat] = useState("image/jpeg");
  const [quality, setQuality] = useState(0.92);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const imgRef = useRef(null);
  const fileInputRef = useRef(null);

  const onSelectFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.addEventListener("load", () => setImgSrc(reader.result?.toString() || ""));
    reader.readAsDataURL(file);
    setCompletedCrop(null);
    setRotation(0);
  };

  const onImageLoad = useCallback((e) => {
    if (aspectRatio && imgRef.current) {
      const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
      setCrop(centerAspectCrop(w, h, aspectRatio));
    }
  }, [aspectRatio]);

  const applyPreset = (preset) => {
    setActivePreset(preset.label);
    setAspectRatio(preset.aspect);
    if (imgRef.current && preset.aspect) {
      const { naturalWidth: w, naturalHeight: h } = imgRef.current;
      setCrop(centerAspectCrop(w, h, preset.aspect));
    }
  };

  const rotate = (deg) => setRotation((r) => (r + deg + 360) % 360);

  const getCroppedDataUrl = useCallback(() => {
    if (!completedCrop || !imgRef.current) return null;
    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const rad = (rotation * Math.PI) / 180;
    const sin = Math.abs(Math.sin(rad));
    const cos = Math.abs(Math.cos(rad));
    const srcW = completedCrop.width * scaleX;
    const srcH = completedCrop.height * scaleY;
    canvas.width = srcW * cos + srcH * sin;
    canvas.height = srcW * sin + srcH * cos;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rad);
    ctx.drawImage(image, completedCrop.x * scaleX, completedCrop.y * scaleY, srcW, srcH, -srcW / 2, -srcH / 2, srcW, srcH);
    return canvas.toDataURL(outputFormat, outputFormat === "image/png" ? undefined : quality);
  }, [completedCrop, rotation, outputFormat, quality]);

  const handleDownload = () => {
    const dataUrl = getCroppedDataUrl();
    if (!dataUrl) return;
    const ext = FORMAT_OPTIONS.find((f) => f.value === outputFormat)?.ext || "jpg";
    const link = document.createElement("a");
    link.download = `cropped-${Date.now()}.${ext}`;
    link.href = dataUrl;
    link.click();
  };

  const reset = () => {
    setImgSrc(""); setCrop(undefined); setCompletedCrop(null);
    setError(null); setAspectRatio(null); setActivePreset("Free"); setRotation(0);
  };

  const onCropComplete = (c) => { setCompletedCrop(c); };

  const cropPxW = completedCrop && imgRef.current ? Math.round(completedCrop.width * (imgRef.current.naturalWidth / imgRef.current.width)) : 0;
  const cropPxH = completedCrop && imgRef.current ? Math.round(completedCrop.height * (imgRef.current.naturalHeight / imgRef.current.height)) : 0;

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
            <li><span className="text-gray-900 font-semibold">Image Cropper</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-5xl mx-auto w-full px-4 pb-20">

        {/* ── Hero ── */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <CropIcon className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Crop Image to 1:1 for Instagram Profile Picture Online –{" "}
            <span className="text-sky-600">Free Aspect Ratio Tool</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Crop photos to any aspect ratio with social media presets for Instagram, TikTok, YouTube and more. Rotate, preview and download as JPG, PNG or WebP.
          </p>
        </div>

        <ResponsiveAd />

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">

          {/* Upload State */}
          {!imgSrc ? (
            <div className={`border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer transition-all ${isDragging ? "border-sky-500 bg-sky-50" : "border-gray-300 hover:border-sky-400 hover:bg-sky-50/30"}`}
              onClick={() => fileInputRef.current?.click()}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); onSelectFile(e.dataTransfer.files?.[0]); }}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => onSelectFile(e.target.files?.[0])} className="hidden" />
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="text-sky-600" size={28} />
              </div>
              <p className="text-xl font-semibold text-gray-800 mb-2">Drop image here or click to upload</p>
              <p className="text-gray-400 text-sm">JPG, PNG, WebP supported</p>
              {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}
            </div>
          ) : (
            <div className="space-y-5">

              {/* Social Presets */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Social Media Presets</label>
                <div className="flex flex-wrap gap-2">
                  {SOCIAL_PRESETS.map((preset) => (
                    <button key={preset.label} onClick={() => applyPreset(preset)}
                      className={`px-3 py-2 rounded-xl border text-sm font-medium transition-all ${activePreset === preset.label ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-600 border-gray-200 hover:border-sky-400"}`}>
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Crop + Preview Grid */}
              <div className="grid lg:grid-cols-2 gap-5">
                {/* Left: Crop Canvas */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-sm"><CropIcon size={16} className="text-sky-600" /> Drag to crop</h3>
                    <div className="flex items-center gap-2">
                      <button onClick={() => rotate(-90)} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors" title="Rotate left"><RotateCcw size={15} /></button>
                      <span className="text-xs text-gray-400">{rotation}deg</span>
                      <button onClick={() => rotate(90)} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors" title="Rotate right"><RotateCw size={15} /></button>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                    <div style={{ transform: `rotate(${rotation}deg)`, transition: "transform 0.3s" }}>
                      <ReactCrop crop={crop} onChange={(_, pct) => setCrop(pct)} onComplete={onCropComplete} ruleOfThirds aspect={aspectRatio ?? undefined} minWidth={40} minHeight={40}>
                        <img ref={imgRef} src={imgSrc} onLoad={onImageLoad} alt="Image to crop" className="w-full max-h-[480px] object-contain" />
                      </ReactCrop>
                    </div>
                  </div>
                  {completedCrop && <p className="text-xs text-gray-400 mt-2 text-center">Selection: <strong className="text-gray-600">{cropPxW} x {cropPxH} px</strong>{activePreset !== "Free" && <span className="ml-2 text-sky-500">({activePreset})</span>}</p>}
                </div>

                {/* Right: Preview + Settings */}
                <div className="space-y-4">
                  {/* Preview */}
                  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
                    <h3 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2"><ImageIcon size={15} className="text-sky-600" /> Preview</h3>
                    <CropPreview completedCrop={completedCrop} imgRef={imgRef} rotation={rotation} outputFormat={outputFormat} />
                  </div>

                  {/* Stats Grid */}
                  {completedCrop && (
                    <div className="grid grid-cols-4 gap-3">
                      <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center"><div className="flex justify-center text-sky-500 mb-1"><Ruler size={16} /></div><p className="text-sm font-bold text-gray-800">{cropPxW}</p><p className="text-xs text-gray-500 mt-0.5">Width</p></div>
                      <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center"><div className="flex justify-center text-sky-500 mb-1"><Ruler size={16} /></div><p className="text-sm font-bold text-gray-800">{cropPxH}</p><p className="text-xs text-gray-500 mt-0.5">Height</p></div>
                      <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center"><div className="flex justify-center text-sky-500 mb-1"><FileImage size={16} /></div><p className="text-sm font-bold text-gray-800">{FORMAT_OPTIONS.find((f) => f.value === outputFormat)?.label}</p><p className="text-xs text-gray-500 mt-0.5">Format</p></div>
                      <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center"><div className="flex justify-center text-sky-500 mb-1"><RotateCw size={16} /></div><p className="text-sm font-bold text-gray-800">{rotation}deg</p><p className="text-xs text-gray-500 mt-0.5">Rotation</p></div>
                    </div>
                  )}

                  {/* Output Settings */}
                  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Output Settings</label>
                    <div className="mb-4">
                      <div className="flex gap-2">
                        {FORMAT_OPTIONS.map((f) => (
                          <button key={f.value} onClick={() => setOutputFormat(f.value)}
                            className={`flex-1 py-2 rounded-xl border text-sm font-medium transition-all ${outputFormat === f.value ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-600 border-gray-200 hover:border-sky-400"}`}>
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    {outputFormat !== "image/png" && (
                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Quality — <span className="text-sky-600">{Math.round(quality * 100)}%</span></label>
                        <input type="range" min="0.5" max="1.0" step="0.01" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-sky-600" />
                        <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Smaller file</span><span>Best quality</span></div>
                      </div>
                    )}
                    <div className="flex flex-col gap-3">
                      <button onClick={handleDownload} disabled={!completedCrop} className="w-full bg-sky-600 hover:bg-sky-700 active:scale-95 transition-all text-white font-semibold px-8 py-3 rounded-xl disabled:opacity-40 flex items-center justify-center gap-2">
                        <Download size={17} /> Crop and Download
                      </button>
                      <div className="flex gap-3">
                        <button onClick={() => fileInputRef.current?.click()} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"><Upload size={14} /> New Image</button>
                        <button onClick={reset} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"><RefreshCw size={14} /> Reset</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => fileInputRef.current?.click()} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                  <Upload size={18} /> Upload New Image
                </button>
                <button onClick={reset} className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  <X size={18} /> Clear & Start Over
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!imgSrc && !error && (
            <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mt-4">
              <CropIcon size={32} className="mx-auto mb-3 text-gray-300" />
              <p>Drop your image above or click to browse. We'll help you crop it perfectly — no upload required.</p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Crop Images for Social Media in 3 Simple Steps</h2>
          <ol className="space-y-5">
            {[
              { step: "1", title: "Pick Your Platform Preset", desc: "Choose Instagram Post, TikTok, YouTube Thumbnail, or any other preset. The crop box locks to the correct aspect ratio automatically." },
              { step: "2", title: "Adjust & Rotate", desc: "Drag the crop handles to frame your subject. Use rotate buttons if your photo is sideways. See live preview as you adjust." },
              { step: "3", title: "Download Your Cropped Image", desc: "Choose JPG, PNG, or WebP format. Click Crop and Download — your image is ready to upload anywhere." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How Browser-Based Cropping Works</h2>
          <p className="text-gray-500 text-sm mb-6">No server upload. No waiting. Everything happens on your device.</p>
          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">HTML5 Canvas API</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">ctx.drawImage() + ctx.rotate() → cropped output</div>
              <p className="text-gray-500 text-xs leading-relaxed">We draw your selected crop area onto an invisible canvas, apply rotation if needed, then export the result. The pixel data stays intact — only the visible area changes.</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Aspect Ratio Locking</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">aspect: 1 → 1:1 square • aspect: 9/16 → vertical story</div>
              <p className="text-gray-500 text-xs leading-relaxed">When you pick a preset like Instagram Post or TikTok, the crop box maintains that exact ratio. Drag anywhere — the shape stays perfect for your target platform.</p>
            </div>
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">Privacy First</h3>
              <p className="text-sky-800 text-xs leading-relaxed">All cropping and rotation happens locally in your browser using JavaScript. No images are uploaded, stored, or sent anywhere. Close the tab and your data is gone. 100% private by design.</p>
            </div>
          </div>
        </section>

        {/* ─── Sample Results ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What Kind of Results Can You Expect?</h2>
          <p className="text-gray-500 text-sm mb-6">Real examples with different presets and platforms.</p>
          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-pink-100 text-pink-700 font-bold px-2.5 py-1 rounded-lg">Instagram Post (1:1)</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Original</p><p className="font-semibold text-gray-800">1920x1080px</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Cropped</p><p className="font-semibold text-green-600">1080x1080px</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Best For</p><p className="font-semibold text-gray-800">Feed posts, profile pics</p></div>
              </div>
            </div>
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-sm bg-purple-100 text-purple-700 font-bold px-2.5 py-1 rounded-lg">TikTok / Reels (9:16)</span></div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Original</p><p className="font-semibold text-gray-800">1080x1080px</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Cropped</p><p className="font-semibold text-green-600">1080x1920px area</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Best For</p><p className="font-semibold text-gray-800">Vertical short videos</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Who Uses This Image Cropper?</h2>
          <p className="text-gray-500 text-sm mb-6">From creators to businesses — the right crop makes content look professional.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Globe size={20} className="text-sky-600" />, title: "Social Media Creators", desc: "Crop photos to exact platform specs — Instagram squares, TikTok verticals, YouTube thumbnails — without guessing dimensions." },
              { icon: <FileImage size={20} className="text-green-600" />, title: "Small Business Owners", desc: "Prepare product photos, team headshots, and promotional graphics for different social channels in minutes." },
              { icon: <CropIcon size={20} className="text-amber-600" />, title: "Photographers", desc: "Quickly crop client photos to requested aspect ratios. Rotate and fine-tune composition before delivery." },
              { icon: <Shield size={20} className="text-violet-600" />, title: "Privacy-Conscious Users", desc: "Crop personal photos without uploading to third-party servers. Everything stays on your device — always." },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Crop Images in Your Browser?</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Most online image croppers ask you to upload files to their servers. That means waiting for uploads, worrying about privacy, and sometimes dealing with watermarks or limits. Our free image cropper works differently — everything happens <strong>inside your browser</strong> using the HTML5 Canvas API.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Pick a preset like Instagram Post (1:1) or TikTok (9:16) and the crop box locks to that exact ratio. Drag to frame your subject, rotate if needed, and see a live preview of the final result. No guesswork, no re-uploads.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Output as JPG for smallest file size, PNG for transparency support, or WebP for modern web optimization. Quality slider lets you balance file size vs visual fidelity for lossy formats.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">Privacy Note</h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No images are uploaded to any server. No data is stored or tracked. Your photos stay on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need to shrink image file size after cropping? Try the{" "}
            <Link href="/tools/image-compressor" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Image Compressor</Link>. 
            Want exact pixel dimensions? The{" "}
            <Link href="/tools/image-resizer" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Image Resizer</Link> has you covered.
          </p>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              { q: "How to crop image to 1:1 for Instagram profile picture online?", a: "Upload your photo, click the Instagram Post or Square 1:1 preset, then drag to adjust the crop area. The tool locks the 1:1 aspect ratio automatically so your profile picture fits perfectly. Download as JPG, PNG or WebP." },
              { q: "What aspect ratio for YouTube thumbnail 1280x720?", a: "YouTube thumbnails use 16:9 aspect ratio at 1280x720 pixels. Select the YouTube Thumb preset in our tool and it automatically sets the correct 16:9 crop ratio." },
              { q: "How to crop image to 9:16 for TikTok video cover?", a: "Upload your image, click the TikTok preset (9:16), and drag to position the crop area. The 9:16 vertical ratio matches TikTok's full-screen format perfectly." },
              { q: "Can I crop and rotate image at the same time online?", a: "Yes. Use the rotate buttons to turn your image 90 degrees left or right, then drag the crop handles to select the area. Both rotation and cropping happen in real-time with a live preview." },
              { q: "Does this image cropper upload my photos to a server?", a: "No. All cropping and rotation happens entirely in your browser using JavaScript and the HTML5 Canvas API. Your images are never uploaded, stored, or sent to any server." },
              { q: "How to crop WhatsApp profile picture to square without cutting?", a: "Upload your photo and select the WhatsApp DP preset (1:1 square). Position the crop box over the area you want to keep — the face should be centered. Download and set as your WhatsApp profile picture." },
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
              { href: "/tools/image-resizer", title: "Image Resizer", desc: "Resize images to exact pixel dimensions for any platform." },
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