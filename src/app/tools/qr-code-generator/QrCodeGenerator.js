'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import {
  Download, Copy, RefreshCw, QrCode, Home, ChevronDown,
  Hash, Layers, Palette, AlertTriangle, CheckCircle2, Zap,
  Globe, HelpCircle, Shield, FileText
} from 'lucide-react';

import ResponsiveAd from "../../../components/ResponsiveAd";


// ─── Content Type Presets ─────────────────────────────────────────────────────
const PRESETS = [
  { label: '🔗 URL',        template: 'https://',                                       hint: 'Paste your full URL' },
  { label: '📶 WiFi',       template: 'WIFI:T:WPA;S:NetworkName;P:Password;;',          hint: 'Replace NetworkName and Password' },
  { label: '👤 vCard',      template: 'BEGIN:VCARD\nVERSION:3.0\nFN:Full Name\nTEL:+923001234567\nEMAIL:email@example.com\nEND:VCARD', hint: 'Edit name, phone and email' },
  { label: '📧 Email',      template: 'mailto:email@example.com?subject=Hello&body=Hi', hint: 'Replace email and subject' },
  { label: '💬 WhatsApp',   template: 'https://wa.me/923001234567?text=Hello',          hint: 'Replace phone number (with country code)' },
  { label: '📱 Phone',      template: 'tel:+923001234567',                              hint: 'Replace with phone number' },
  { label: '💬 SMS',        template: 'smsto:+923001234567:Hello there!',               hint: 'Replace phone and message' },
  { label: '📝 Plain Text', template: '',                                               hint: 'Type any text' },
];

const SIZE_OPTIONS = [
  { value: 128, label: '128px — thumbnail' },
  { value: 256, label: '256px — screen use' },
  { value: 512, label: '512px — print small' },
  { value: 1024, label: '1024px — print large' },
];

const ERROR_LEVELS = [
  { value: 'L', label: 'Low — 7%',     desc: 'Digital use only' },
  { value: 'M', label: 'Medium — 15%', desc: 'Recommended default' },
  { value: 'Q', label: 'High — 25%',   desc: 'With logo overlay' },
  { value: 'H', label: 'Max — 30%',    desc: 'Print & curved surfaces' },
];

// ─── Contrast Checker Helpers (Outside Component) ─────────────────────────────
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function relativeLuminance([r, g, b]) {
  const c = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hexToRgb(hex1));
  const l2 = relativeLuminance(hexToRgb(hex2));
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

// ─── FAQ Data (Sync with page.js JSON-LD) ─────────────────────────────────────
const FAQS = [
  {
    q: 'How to create a QR code for a website URL free online?',
    a: 'Select the URL preset, paste your website link in the input box, and the QR code generates instantly. Choose your size and error correction level, then download as PNG or SVG. No signup required.',
  },
  {
    q: 'How to make a WiFi QR code for guests?',
    a: "Select the WiFi preset, replace 'NetworkName' with your WiFi SSID and 'Password' with your WiFi password. Guests can scan the QR to connect automatically without typing the password.",
  },
  {
    q: 'What error correction level should I use for QR code with logo?',
    a: 'Use High (25%) if adding a logo overlay in the center. Use Max (30%) for printed QR codes on curved surfaces like cups, bottles, or outdoor signage. Medium (15%) is fine for general digital use.',
  },
  {
    q: 'Can I create a WhatsApp chat QR code free?',
    a: 'Yes. Select the WhatsApp preset, replace the phone number with your number including country code (e.g. 923001234567 for Pakistan), and optionally customize the pre-filled message. Download and share the QR.',
  },
  {
    q: 'What is the best QR code size for printing on business cards?',
    a: 'Download at 512px for business cards and small print items. For A5-A4 prints use 1024px. For best quality on any size, download as SVG format which scales infinitely without quality loss.',
  },
  {
    q: 'Is my QR code data stored or shared?',
    a: 'Never. All QR generation happens locally in your browser. Your URLs, WiFi passwords, and contact info are never sent to servers, stored, or tracked.',
  },
];

// ─── Related Tools (6 Items from your tools array) ────────────────────────────
const RELATED_TOOLS = [
  { href: '/tools/image-to-text', title: 'Image to Text (OCR)', desc: 'Extract text from images to use as QR code content.' },
  { href: '/tools/fake-data-generator', title: 'Fake Data Generator', desc: 'Generate test vCard data and contact info for QR testing.' },
  { href: '/tools/password-generator', title: 'Password Generator', desc: 'Generate secure WiFi passwords before creating a QR code.' },
  { href: '/tools/url-encoder', title: 'URL Encoder', desc: 'Encode special characters in URLs for safe QR code generation.' },
  { href: '/tools/image-compressor', title: 'Image Compressor', desc: 'Compress QR code images for faster web loading.' },
  { href: '/tools/case-converter', title: 'Case Converter', desc: 'Format text to uppercase, lowercase, or title case for QR content.' },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const QRCodeGenerator = () => {
  const [text, setText] = useState('https://generatorpromptai.com');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [level, setLevel] = useState('M');
  const [activePreset, setActivePreset] = useState('🔗 URL');
  const [copied, setCopied] = useState(false);
  const [copiedImg, setCopiedImg] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const qrRef = useRef(null);

  const applyPreset = (preset) => {
    setActivePreset(preset.label);
    setText(preset.template);
  };

  const charCount = text.length;
  const contrast = fgColor.length === 7 && bgColor.length === 7 ? contrastRatio(fgColor, bgColor) : 21;
  const lowContrast = contrast < 3;
  const levelLabel = ERROR_LEVELS.find((l) => l.value === level)?.label.split(' — ')[0] || level;

  const getSVG = () => qrRef.current?.querySelector('svg');

  const getSVGString = (svg) =>
    'data:image/svg+xml;base64,' +
    btoa(unescape(encodeURIComponent(new XMLSerializer().serializeToString(svg))));

  const downloadQR = (format = 'png') => {
    if (!text.trim()) return;
    const svg = getSVG();
    if (!svg) return;

    if (format === 'svg') {
      const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qr-${Date.now()}.svg`;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      const a = document.createElement('a');
      a.download = `qr-${Date.now()}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    img.src = getSVGString(svg);
  };

  const copyText = () => {
    if (!text.trim()) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyQRImage = async () => {
    if (!text.trim()) return;
    const svg = getSVG();
    if (!svg) return;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = async () => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      try {
        const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopiedImg(true);
        setTimeout(() => setCopiedImg(false), 2000);
      } catch {
        // fallback silent
      }
    };
    img.src = getSVGString(svg);
  };

  const resetAll = () => {
    setText('https://www.generatorpromptai.com');
    setSize(256);
    setFgColor('#000000');
    setBgColor('#ffffff');
    setLevel('M');
    setActivePreset('🔗 URL');
    setCopied(false);
    setCopiedImg(false);
  };

  const hasContent = text.trim().length > 0;

  const stats = [
    { icon: Hash, label: 'Characters', value: charCount, color: 'text-gray-800' },
    { icon: Layers, label: 'Download Size', value: `${size}px`, color: 'text-gray-800' },
    { icon: AlertTriangle, label: 'Error Correction', value: levelLabel, color: 'text-gray-800' },
    { icon: Palette, label: 'Contrast Ratio', value: `${contrast.toFixed(1)}:1`, color: lowContrast ? 'text-red-600' : contrast < 4.5 ? 'text-amber-600' : 'text-green-600' },
  ];

  const inputCls = 'w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800';
  const labelCls = 'block text-sm font-semibold text-gray-700 mb-2';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* ── Breadcrumb ── */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="inline-flex items-center gap-1.5 hover:text-sky-600 transition-colors">
                <Home size={14} /> Home
              </Link>
            </li>
            <li><span className="text-gray-300">/</span></li>
            <li>
              <Link href="/pages/all-tools" className="hover:text-sky-600 transition-colors">All Tools</Link>
            </li>
            <li><span className="text-gray-300">/</span></li>
            <li><span className="text-gray-900 font-semibold">QR Code Generator</span></li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        
        {/* ── Hero ── */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <QrCode className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Create Custom QR Code for WiFi URL WhatsApp Free Online –{' '}
            <span className="text-sky-600">Download PNG SVG</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Generate custom QR codes for URLs, WiFi, WhatsApp, vCard, email and SMS. Custom colors, sizes, error correction. 100% private.
          </p>
        </div>

        <ResponsiveAd />

        {/* ── Tool Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          
          {/* Content Type Presets */}
          <div className="mb-6">
            <label className={labelCls}>Content Type</label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => applyPreset(p)}
                  className={`px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
                    activePreset === p.label
                      ? 'bg-sky-600 text-white border-sky-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-sky-400'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            {PRESETS.find((p) => p.label === activePreset)?.hint && (
              <p className="text-xs text-gray-400 mt-2">
                💡 {PRESETS.find((p) => p.label === activePreset).hint}
              </p>
            )}
          </div>

          {/* Text Input */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className={labelCls}>Content</label>
              <span className={`text-xs ${charCount > 900 ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                {charCount} chars {charCount > 900 && '— QR may become complex'}
              </span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter URL, WiFi details, contact info..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent min-h-[130px] resize-y font-mono text-sm text-gray-800"
            />
          </div>

          {/* Size + Error Level */}
          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className={labelCls}>Size</label>
              <select value={size} onChange={(e) => setSize(Number(e.target.value))} className={inputCls}>
                {SIZE_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Error Correction</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)} className={inputCls}>
                {ERROR_LEVELS.map((l) => (
                  <option key={l.value} value={l.value}>{l.label} — {l.desc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Colors */}
          <div className="mb-6">
            <label className={labelCls}>Colors</label>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Foreground (dots)</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer flex-shrink-0" />
                  <input type="text" value={fgColor} onChange={(e) => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setFgColor(e.target.value); }} className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-sky-500" maxLength={7} />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Background</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer flex-shrink-0" />
                  <input type="text" value={bgColor} onChange={(e) => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setBgColor(e.target.value); }} className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-sky-500" maxLength={7} />
                </div>
              </div>
            </div>
            {/* Contrast Feedback */}
            <div className={`mt-3 text-xs px-3 py-2 rounded-xl ${
              lowContrast ? 'bg-red-50 text-red-600 border border-red-200' :
              contrast < 4.5 ? 'bg-amber-50 text-amber-600 border border-amber-200' :
              'bg-green-50 text-green-600 border border-green-200'
            }`}>
              Contrast ratio: <strong>{contrast.toFixed(1)}:1</strong> —{' '}
              {lowContrast ? '⚠️ Too low — QR may not scan' :
               contrast < 4.5 ? '⚠️ Marginal — may struggle in low light' :
               '✅ Good contrast — scannable'}
            </div>
          </div>

          {/* Copy Text + Reset */}
          <div className="flex flex-col sm:flex-row gap-3 mb-2">
            <button onClick={copyText} disabled={!text.trim()} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 rounded-xl text-sm font-medium text-gray-700 transition-colors">
              {copied ? <CheckCircle2 size={15} className="text-green-500" /> : <Copy size={15} />}
              {copied ? 'Copied!' : 'Copy Text'}
            </button>
            <button onClick={resetAll} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors">
              <RefreshCw size={15} /> Reset
            </button>
          </div>

          {/* ── Results Section ── */}
          {hasContent && (
            <div className="mt-8">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                    <div className="flex justify-center text-sky-500 mb-1"><stat.icon size={20} /></div>
                    <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Dark Output Block — QR Preview */}
              <div className="bg-gray-900 rounded-2xl p-6 mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-semibold">Live QR Code Preview</p>
                <div className="flex justify-center">
                  <div ref={qrRef} className="p-5 rounded-xl inline-block" style={{ backgroundColor: bgColor }}>
                    <QRCodeSVG
                      value={text || 'https://generatorpromptai.com'}
                      size={Math.min(size, 240)}
                      fgColor={fgColor}
                      bgColor={bgColor}
                      level={level}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-4">
                  Preview at {Math.min(size, 240)}px · Downloads at {size}px
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button onClick={() => downloadQR('png')} disabled={!text.trim()} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-40">
                  <Download size={15} /> Download PNG
                </button>
                <button onClick={() => downloadQR('svg')} disabled={!text.trim()} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-40">
                  <Download size={15} /> Download SVG
                </button>
                <button onClick={copyQRImage} disabled={!text.trim()} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors disabled:opacity-40">
                  {copiedImg ? <CheckCircle2 size={15} className="text-green-500" /> : <Copy size={15} />}
                  {copiedImg ? 'Copied!' : 'Copy as Image'}
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!hasContent && (
            <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mt-4">
              <QrCode size={32} className="mx-auto mb-3 text-gray-300" />
              <p>Enter content above to <strong className="text-gray-500">generate a QR code</strong></p>
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


        {/* ── How to Use ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Create a QR Code for WiFi URL WhatsApp Free Online
          </h2>
          <ol className="space-y-5">
            {[
              { step: '1', title: 'Pick Content Type', desc: 'Choose from URL, WiFi, WhatsApp, vCard, Email, Phone, SMS, or Plain Text presets.' },
              { step: '2', title: 'Edit the Content', desc: 'Replace placeholder values with your actual data — like your website URL or WiFi password.' },
              { step: '3', title: 'Customize Look', desc: 'Adjust size, error correction level, and colors. The contrast checker warns if scannability is at risk.' },
              { step: '4', title: 'Download or Copy', desc: 'Get your QR as PNG for print/screen, SVG for infinite scaling, or copy directly to clipboard.' },
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

        {/* ── How It Works ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How QR Code Generation Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">Built for flexibility, privacy, and real-world use.</p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Zap size={16} className="text-sky-600" />
                8 Content Type Presets
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                One-click templates for URL, WiFi, vCard, WhatsApp, Email, Phone, SMS, and Plain Text. Each preset pre-fills the correct format so you just edit the values.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Palette size={16} className="text-sky-600" />
                Built-in Contrast Ratio Checker
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Real-time contrast analysis between foreground and background colors warns you if the QR may not scan — preventing unscannable codes from poor color choices.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle size={16} className="text-sky-600" />
                4 Error Correction Levels
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Low (7%) for digital use, Medium (15%) as default, High (25%) for logo overlays, and Max (30%) for printed materials on curved or outdoor surfaces.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2 flex items-center gap-2">
                <Shield size={16} className="text-sky-600" />
                Privacy Note
              </h3>
              <p className="text-sky-800 text-xs leading-relaxed">
                All QR generation happens locally in your browser. No content, URLs, or contact data is ever sent to any server. 100% private.
              </p>
            </div>
          </div>
        </section>

        {/* ── Sample Results ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Real Example: WiFi QR for a Café
          </h2>
          <p className="text-gray-500 text-sm mb-6">See how the preset works in practice.</p>

          <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Input (WiFi Preset)</p>
                <p className="font-mono text-xs text-gray-800 break-all">
                  WIFI:T:WPA;S:CafeGuest;P:Welcome2026;;
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Result</p>
                <p className="text-gray-800 text-sm">
                  Guests scan → phone auto-connects to "CafeGuest" WiFi without typing password.
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Pro tip: Use <strong>High (25%)</strong> error correction if printing this QR on menus or table tents — it survives minor damage or dirt better.
            </p>
          </div>
        </section>

        {/* ── Use Cases ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses QR Code Generators?
          </h2>
          <p className="text-gray-500 text-sm mb-6">More than just marketers — here's where QRs add real value.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Zap size={20} className="text-sky-600" />, title: 'Small Businesses', desc: 'Add WiFi QR to reception, or product QRs that link to manuals, reviews, or reorder pages.' },
              { icon: <Layers size={20} className="text-sky-600" />, title: 'Event Organizers', desc: 'Generate QR codes for tickets, schedules, or feedback forms — no app install needed for attendees.' },
              { icon: <Hash size={20} className="text-sky-600" />, title: 'Freelancers', desc: 'Put a vCard QR on business cards so clients can save your contact with one scan.' },
              { icon: <HelpCircle size={20} className="text-sky-600" />, title: 'Teachers & Trainers', desc: 'Share resource links, assignment portals, or class WhatsApp groups via scannable QR codes.' },
            ].map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-5 hover:border-sky-200 transition-colors">
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
            Why This QR Code Generator Works Different
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Most free QR generators either limit your options or harvest your data. Ours is built the other way: <strong>100% client-side</strong>, no signup, no tracking. Your URL, WiFi password, or contact info never leaves your browser.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            We also added things that actually matter in real use: a <strong>contrast ratio checker</strong> so your colored QRs stay scannable, <strong>4 error correction levels</strong> so your print QRs survive wear and tear, and <strong>8 content presets</strong> so you don't have to memorize WiFi or vCard syntax.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you need a quick URL QR for Instagram bio, a WiFi QR for your shop, or a vCard QR for networking — this tool handles it. Download as PNG for everyday use, or SVG if you need to scale it for banners or packaging.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">Privacy Note</h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser using JavaScript. No content, URLs, or contact data is uploaded to any server. No data is stored or tracked. Your info stays on your device — always.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need more design tools? Try the{' '}
            <Link href="/tools/image-compressor" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Image Compressor</Link> to shrink QR images for web, or the{' '}
            <Link href="/tools/fake-data-generator" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">Fake Data Generator</Link> to test contact QRs safely.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {FAQS.map((item, i) => (
              <div key={i} className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-sky-200 transition-colors duration-300">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={openFaq === i}
                >
                  <h3 className="text-sm md:text-base font-bold text-gray-900 pr-4">{item.q}</h3>
                  <ChevronDown size={22} className={`text-sky-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
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
            Related Design & Utility Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RELATED_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-sky-400 transition-all"
              >
                <h3 className="font-semibold text-gray-800 mb-1.5 group-hover:text-sky-600 transition-colors">
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

export default QRCodeGenerator;