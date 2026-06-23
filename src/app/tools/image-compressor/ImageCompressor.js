"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import imageCompression from "browser-image-compression";
import {
  Upload,
  Download,
  Image as ImageIcon,
  X,
  Home,
  ChevronDown,
  HardDrive,
  Percent,
  Layers,
  RefreshCw,
  Zap,
  Shield,
  Globe,
  FileText,
  HelpCircle,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import ResponsiveAd from "../../../components/ResponsiveAd";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatBytes = (bytes) => {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const QUALITY_PRESETS = [
  { label: "Maximum", value: 0.92, desc: "Best quality, larger file" },
  { label: "Balanced", value: 0.8, desc: "Great quality, good savings" },
  { label: "Aggressive", value: 0.65, desc: "Smaller file, slight loss" },
  { label: "Minimum", value: 0.5, desc: "Smallest size, visible loss" },
];

const DIMENSION_OPTIONS = [
  { label: "1200px (Social media)", value: 1200 },
  { label: "1600px (HD ready)", value: 1600 },
  { label: "1920px (Full HD)", value: 1920 },
  { label: "2560px (2K)", value: 2560 },
  { label: "3840px (4K)", value: 3840 },
  { label: "Original size", value: 9999 },
];

const FORMAT_OPTIONS = [
  { label: "Keep original", value: "original" },
  { label: "Convert to WebP (best compression)", value: "image/webp" },
  { label: "Convert to JPEG", value: "image/jpeg" },
  { label: "Convert to PNG", value: "image/png" },
];

// ─── Single Image Item ────────────────────────────────────────────────────────
const ImageItem = ({ item, onRemove }) => {
  const savings =
    item.originalSize && item.compressedSize
      ? Math.round(
          ((item.originalSize - item.compressedSize) / item.originalSize) * 100,
        )
      : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2 min-w-0">
          <ImageIcon size={14} className="text-gray-400 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-700 truncate">
            {item.name}
          </span>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="text-gray-400 hover:text-red-500 transition-colors ml-3 flex-shrink-0"
          aria-label="Remove image"
        >
          <X size={15} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        {/* Original */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Original
            </span>
            <span className="text-sm font-medium text-gray-700">
              {formatBytes(item.originalSize)}
            </span>
          </div>
          <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
            <img
              src={item.originalUrl}
              alt="Original preview"
              className="w-full h-48 object-contain"
            />
          </div>
        </div>

        {/* Compressed */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Compressed
            </span>
            {item.compressedSize > 0 && (
              <span className="text-sm font-medium text-green-600">
                {formatBytes(item.compressedSize)}
                {savings > 0 && (
                  <span className="ml-1 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                    -{savings}%
                  </span>
                )}
              </span>
            )}
          </div>

          {item.loading ? (
            <div className="h-48 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center justify-center">
              <div
                className="w-8 h-8 border-3 border-sky-200 border-t-sky-600 rounded-full animate-spin mb-2"
                style={{ borderWidth: 3 }}
              />
              <p className="text-xs text-sky-600">Compressing...</p>
            </div>
          ) : item.compressedUrl ? (
            <>
              <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                <img
                  src={item.compressedUrl}
                  alt="Compressed preview"
                  className="w-full h-48 object-contain"
                />
              </div>
              {savings > 0 && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Size saved</span>
                    <span>{savings}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${savings}%` }}
                    />
                  </div>
                </div>
              )}
              <a
                href={item.compressedUrl}
                download={item.downloadName || `compressed-${item.name}`}
                className="mt-3 w-full bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium py-2.5 rounded-xl inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Download size={15} /> Download
              </a>
            </>
          ) : (
            <div className="h-48 bg-red-50 rounded-xl border border-red-100 flex items-center justify-center">
              <p className="text-red-500 text-sm flex items-center gap-2">
                <AlertCircle size={14} /> Compression failed
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ImageCompressor() {
  const [images, setImages] = useState([]);
  const [quality, setQuality] = useState(0.8);
  const [maxDimension, setMaxDimension] = useState(1920);
  const [outputFormat, setOutputFormat] = useState("original");
  const [isDragging, setIsDragging] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const fileRef = useRef();

  const allDone = images.length > 0 && images.every((i) => !i.loading);
  const totalOriginal = images.reduce((a, b) => a + b.originalSize, 0);
  const totalCompressed = images.reduce((a, b) => a + b.compressedSize, 0);
  const totalSaved = Math.max(0, totalOriginal - totalCompressed);
  const avgSavings =
    allDone && images.length
      ? Math.round(
          images.reduce((acc, img) => {
            const s =
              img.originalSize > 0
                ? ((img.originalSize - img.compressedSize) / img.originalSize) *
                  100
                : 0;
            return acc + s;
          }, 0) / images.length,
        )
      : 0;

  const compress = useCallback(
    async (file, id) => {
      const fileType = outputFormat === "original" ? file.type : outputFormat;
      try {
        const compressed = await imageCompression(file, {
          maxSizeMB: 10,
          maxWidthOrHeight: maxDimension === 9999 ? undefined : maxDimension,
          initialQuality: quality,
          useWebWorker: true,
          fileType,
        });
        const ext =
          fileType === "image/webp"
            ? "webp"
            : fileType === "image/png"
              ? "png"
              : "jpg";
        setImages((prev) =>
          prev.map((img) =>
            img.id === id
              ? {
                  ...img,
                  compressedUrl: URL.createObjectURL(compressed),
                  compressedSize: compressed.size,
                  loading: false,
                  downloadName: `compressed-${img.name.replace(/\.[^.]+$/, "")}.${ext}`,
                }
              : img,
          ),
        );
      } catch (e) {
        setImages((prev) =>
          prev.map((img) => (img.id === id ? { ...img, loading: false } : img)),
        );
      }
    },
    [quality, maxDimension, outputFormat],
  );

  const addFiles = (files) => {
    const list = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 10);
    const newImgs = list.map((file) => {
      const id = crypto.randomUUID();
      return {
        id,
        file,
        name: file.name,
        originalUrl: URL.createObjectURL(file),
        originalSize: file.size,
        compressedUrl: null,
        compressedSize: 0,
        loading: true,
        downloadName: null,
      };
    });
    setImages((p) => [...p, ...newImgs]);
    newImgs.forEach((img) => compress(img.file, img.id));
  };

  const recompressAll = () => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        loading: true,
        compressedUrl: null,
        compressedSize: 0,
      })),
    );
    images.forEach((img) => compress(img.file, img.id));
  };

  const clearAll = () => setImages([]);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Breadcrumb ── */}
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
                Image Compressor
              </span>
            </li>
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
            Compress Images Without Losing Quality Online –{" "}
            <span className="text-sky-600">Free JPG PNG WebP Compressor</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Reduce image file size by up to 90% in your browser. No upload to
            any server. Batch compress up to 10 images at once.
          </p>
        </div>

        <ResponsiveAd />

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          {/* Quality Presets */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Quality Preset
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {QUALITY_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setQuality(preset.value)}
                  className={`flex flex-col items-start px-4 py-3 rounded-xl border text-left transition-all ${
                    quality === preset.value
                      ? "border-sky-500 bg-sky-50 text-sky-700"
                      : "border-gray-200 text-gray-600 hover:border-sky-300"
                  }`}
                >
                  <span className="text-sm font-medium">{preset.label}</span>
                  <span className="text-xs text-gray-400 mt-0.5">
                    {preset.desc}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-xs text-gray-400 w-16">Fine-tune</span>
              <input
                type="range"
                min="0.40"
                max="0.95"
                step="0.01"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="flex-1 accent-sky-600"
              />
              <span className="text-sm font-semibold text-sky-600 w-10 text-right">
                {Math.round(quality * 100)}%
              </span>
            </div>
          </div>

          {/* Dimension + Format */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Max Dimension
              </label>
              <select
                value={maxDimension}
                onChange={(e) => setMaxDimension(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-800"
              >
                {DIMENSION_OPTIONS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Output Format
              </label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-gray-800"
              >
                {FORMAT_OPTIONS.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all mb-6 ${
              isDragging
                ? "border-sky-500 bg-sky-50"
                : "border-gray-300 hover:border-sky-400 hover:bg-sky-50/30"
            }`}
            onClick={() => fileRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              hidden
              onChange={(e) => addFiles(e.target.files)}
            />
            <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="text-sky-600" size={28} />
            </div>
            <p className="text-lg font-semibold text-gray-800 mb-1">
              Drop images here or click to upload
            </p>
            <p className="text-gray-400 text-sm">
              JPG, PNG, WebP — Up to 10 images at once
            </p>
          </div>

          {/* Action Buttons */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={recompressAll}
                className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} /> Re-compress All
              </button>
              <button
                onClick={clearAll}
                className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <X size={18} /> Clear All
              </button>
            </div>
          )}

          {/* Stats Grid */}
          {allDone && images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                <div className="flex justify-center text-sky-500 mb-1">
                  <Layers size={20} />
                </div>
                <p className="text-lg font-bold text-gray-800">
                  {images.length}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Images</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                <div className="flex justify-center text-sky-500 mb-1">
                  <HardDrive size={20} />
                </div>
                <p className="text-lg font-bold text-gray-800">
                  {formatBytes(totalOriginal)}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Original Size</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                <div className="flex justify-center text-green-500 mb-1">
                  <Zap size={20} />
                </div>
                <p className="text-lg font-bold text-gray-800">
                  {formatBytes(totalSaved)}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Total Saved</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                <div className="flex justify-center text-sky-500 mb-1">
                  <Percent size={20} />
                </div>
                <p className="text-lg font-bold text-gray-800">{avgSavings}%</p>
                <p className="text-xs text-gray-500 mt-0.5">Avg Reduction</p>
              </div>
            </div>
          )}

          {/* Download All Bar */}
          {allDone && images.length > 1 && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-xl px-5 py-3 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm text-green-700 font-medium flex items-center gap-2">
                <CheckCircle size={14} />
                {images.length} images compressed — Saved{" "}
                {formatBytes(totalSaved)} total
              </span>
              <button
                onClick={() => {
                  images.forEach((img) => {
                    if (img.compressedUrl) {
                      const a = document.createElement("a");
                      a.href = img.compressedUrl;
                      a.download = img.downloadName || `compressed-${img.name}`;
                      a.click();
                    }
                  });
                }}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                <Download size={15} /> Download All
              </button>
            </div>
          )}

          {/* Image List */}
          <div className="space-y-4 mt-6">
            {images.map((img) => (
              <ImageItem
                key={img.id}
                item={img}
                onRemove={(id) =>
                  setImages((p) => p.filter((i) => i.id !== id))
                }
              />
            ))}
          </div>

          {/* Empty State */}
          {!images.length && (
            <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mt-4">
              <ImageIcon size={32} className="mx-auto mb-3 text-gray-300" />
              <p>
                Drop your images above or click to browse. We'll compress them
                instantly — no upload required.
              </p>
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
            How to Compress Images for Web in 3 Simple Steps
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Upload Your Images",
                desc: "Drag and drop JPG, PNG, or WebP files into the upload area. You can add up to 10 images at once for batch compression.",
              },
              {
                step: "2",
                title: "Adjust Settings",
                desc: "Pick a quality preset or fine-tune the slider. Set max dimension for your use case and choose output format if you want to convert.",
              },
              {
                step: "3",
                title: "Download Compressed Files",
                desc: "Wait a few seconds for processing. Preview before/after side by side, then download individually or all at once.",
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

        {/* ─── How It Works ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How Browser-Based Compression Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            No server upload. No waiting. Everything happens on your device.
          </p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Client-Side Processing
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                browser-image-compression + Web Workers = Fast & Private
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                We use the{" "}
                <code className="bg-gray-100 px-1 py-0.5 rounded">
                  browser-image-compression
                </code>{" "}
                library with Web Workers to handle heavy lifting in the
                background. Your images never leave your browser.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Smart Quality Reduction
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                quality: 0.80 → ~70% smaller file, same visual quality
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                JPEG/WebP compression removes data your eyes barely notice. At
                80% quality, most photos look identical but file size drops
                dramatically.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">
                Privacy First
              </h3>
              <p className="text-sky-800 text-xs leading-relaxed">
                All compression happens locally in your browser. No images are
                uploaded, stored, or sent anywhere. Close the tab and your data
                is gone. 100% private by design.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Sample Results ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            What Kind of Savings Can You Expect?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Real examples with different image types and settings.
          </p>

          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-lg">
                  Photo (JPG)
                </span>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Original</p>
                  <p className="font-semibold text-gray-800">2.4 MB</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Compressed (80%)</p>
                  <p className="font-semibold text-green-600">
                    580 KB <span className="text-xs text-gray-400">(-76%)</span>
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Best For</p>
                  <p className="font-semibold text-gray-800">Websites, Email</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded-lg">
                  Screenshot (PNG)
                </span>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Original</p>
                  <p className="font-semibold text-gray-800">1.8 MB</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">
                    Converted to WebP (80%)
                  </p>
                  <p className="font-semibold text-green-600">
                    420 KB <span className="text-xs text-gray-400">(-77%)</span>
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Best For</p>
                  <p className="font-semibold text-gray-800">
                    WebP-supported sites
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses This Image Compressor?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            From bloggers to businesses — fast images help everyone.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Globe size={20} className="text-sky-600" />,
                title: "Website Owners",
                desc: "Speed up page load times by compressing hero images, product photos, and blog graphics before uploading.",
              },
              {
                icon: <FileText size={20} className="text-green-600" />,
                title: "Content Creators",
                desc: "Reduce image size for email newsletters, social media posts, and WhatsApp without losing visual quality.",
              },
              {
                icon: <Zap size={20} className="text-amber-600" />,
                title: "E-commerce Sellers",
                desc: "Compress product images to improve site performance and mobile shopping experience for customers.",
              },
              {
                icon: <Shield size={20} className="text-violet-600" />,
                title: "Privacy-Conscious Users",
                desc: "Compress personal photos without uploading to third-party servers. Everything stays on your device.",
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
            Why Compress Images Before Uploading?
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Large images slow down websites, eat up mobile data, and sometimes
            fail to send over email or messaging apps. Our free image compressor
            solves this by shrinking JPG, PNG, and WebP files directly in your
            browser — no upload required.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Most photos can be reduced by 60-80% with barely any visible
            difference. Pick the <strong>Balanced (80%)</strong> preset for the
            best mix of quality and savings. Need smaller files for WhatsApp?
            Try <strong>Aggressive (65%)</strong> with 1200px max dimension.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Converting to <strong>WebP</strong> while compressing gives you even
            more savings — typically 25-35% smaller than JPEG at the same
            quality. Modern browsers like Chrome, Firefox, Safari, and Edge all
            support WebP now.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Privacy Note
          </h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No images are
            uploaded to any server. No data is stored or tracked. Your photos
            stay on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need to resize images to exact dimensions? Try the{" "}
            <Link
              href="/tools/image-resizer"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              Image Resizer
            </Link>
            . Want to crop for social media? The{" "}
            <Link
              href="/tools/image-cropper"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              Image Cropper
            </Link>{" "}
            has you covered.
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
                q: "How to compress image without losing quality online for free?",
                a: "Upload your image and select the Maximum (92%) or Balanced (80%) quality preset. The tool compresses in your browser without uploading to any server, preserving visual quality while reducing file size significantly.",
              },
              {
                q: "Does this image compressor upload my photos to a server?",
                a: "No. Our tool works 100% in your browser using JavaScript. Your images never leave your device. No data is uploaded, stored, or sent to any server.",
              },
              {
                q: "How to reduce JPG file size for WhatsApp without losing quality?",
                a: "Upload your JPG photo, select Balanced (80%) quality and 1200px max dimension, then compress and download. The result will be a much smaller file that WhatsApp sends instantly without visible quality loss.",
              },
              {
                q: "Can I batch compress multiple images at once for free?",
                a: "Yes. You can upload up to 10 images at once and they will all be compressed simultaneously with the same quality and dimension settings. Use the Download All button to save them all at once.",
              },
              {
                q: "How to compress PNG to WebP for faster website loading?",
                a: "Upload your PNG images, select WebP as the output format, choose Balanced or Aggressive quality, and compress. WebP produces files 25-35% smaller than PNG at the same visual quality and is supported by all modern browsers.",
              },
              {
                q: "How much can I reduce image file size?",
                a: "Depending on the original image and settings, you can reduce file size by 50-90%. Most photos compress 60-80% with the Balanced (80%) preset while maintaining excellent visual quality.",
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
                    className={`text-sky-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
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

        {/* ─── Related Tools ─── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related Image Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/image-resizer",
                title: "Image Resizer",
                desc: "Resize photos to exact dimensions for any platform.",
              },
              {
                href: "/tools/image-cropper",
                title: "Image Cropper",
                desc: "Crop images with custom aspect ratios for social media.",
              },
              {
                href: "/tools/image-converter",
                title: "Image Converter",
                desc: "Convert between JPG, PNG and WebP formats instantly.",
              },
              {
                href: "/tools/emoji-picker",
                title: "Emoji Picker",
                desc: "Search & copy emojis for captions and messages.",
              },
              {
                href: "/tools/word-counter",
                title: "Word Counter",
                desc: "Count characters for bios, tweets, and meta descriptions.",
              },
              {
                href: "/tools/qr-code-generator",
                title: "QR Code Generator",
                desc: "Create custom QR codes for links, text, or contact info.",
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
}
