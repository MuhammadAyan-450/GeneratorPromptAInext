import Base64Encoder from "./Base64Encoder";

export const metadata = {
  title: "Base64 Encoder & Decoder – Encode or Decode Text Free",
  description:
    "Encode and decode Base64 text instantly with our free Base64 Encoder & Decoder. Fast, secure, and easy to use online. ✅",
  keywords:
    "encode text to base64 online, decode base64 to utf-8 text, base64 string converter with emojis, how to convert text to base64 manually, base64 encoding for utf-8 special characters, decode base64 string to readable text, free base64 encoder decoder tool, base64 to text converter online",
  alternates: {
    canonical:
      "https://www.generatorpromptai.com/tools/base64-encode",
  },
  openGraph: {
    title: "Base64 Encoder & Decoder",
    description:
      "Encode and decode Base64 text instantly with our free Base64 Encoder & Decoder. Fast, secure, and easy to use online. ✅",
    url: "https://www.generatorpromptai.com/tools/base64-encode",
    siteName: "GeneratorPromptAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Encoder & Decoder",
    description:
      "Encode and decode Base64 text instantly with our free Base64 Encoder & Decoder. Fast, secure, and easy to use online. ✅",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Encode Text to Base64 Online & Decode Base64 to UTF-8",
  url: "https://www.generatorpromptai.com/tools/base64-encode",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "All",
  description:
    "Encode and decode Base64 text instantly with our free Base64 Encoder & Decoder. Fast, secure, and easy to use online. ✅",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  creator: {
    "@type": "Organization",
    name: "GeneratorPromptAI",
  },
  featureList:
    "MCQ/SAQ/DBQ/LEQ input, weighted composite calculation, AP score prediction (1-5), section-by-section breakdown, personalized study tips, mobile responsive, no signup required",
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.generatorpromptai.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "All Free Tools",
      item: "https://www.generatorpromptai.com/pages/all-tools",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Base64 Encoder & Decoder",
      item: "https://www.generatorpromptai.com/tools/base64-encode",
    },
  ],
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How to encode text to Base64 online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste your plain text into the tool above and click 'Encode to Base64'. Your text will instantly be converted into a Base64 string that you can copy or download.",
      },
    },
    {
      "@type": "Question",
      name: "How to decode a Base64 string back to readable text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste your Base64 encoded string into the tool and click 'Decode from Base64'. The tool converts it back to readable plain text instantly.",
      },
    },
    {
      "@type": "Question",
      name: "Does this Base64 converter support emojis and UTF-8?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Unlike basic encoders that break on special characters, our tool uses advanced UTF-8 encoding logic. You can safely encode and decode emojis, non-English text, and special symbols without any corruption.",
      },
    },
    {
      "@type": "Question",
      name: "Is Base64 the same as encryption?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, Base64 is an encoding format, not encryption. It simply converts binary data into a text string using a public algorithm. Anyone can easily decode a Base64 string, so never use it to hide sensitive data like passwords.",
      },
    },
    {
      "@type": "Question",
      name: "Can I encode special characters to Base64?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our tool handles all special characters, symbols, and unicode text properly. It converts them into Base64 format accurately and decodes them back without losing any data.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my decoded Base64 look like random characters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "That means the input wasn't valid Base64, or it's a different type of encoding (like hex or hex). Valid Base64 only uses these characters: A-Z, a-z, 0-9, +, /, =. If you see characters like spaces, line breaks, or special symbols mixed in, something went wrong either during encoding or someone pasted it wrong.",
      },
    },
    {
      "@type": "Question",
      name: "Can I encode a file directly to Base64?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not with this tool — it's text-only. But you can convert a file to Base64 in your terminal with one line: `base64 -i image.png > output.txt`. Then paste the Base64 string here to decode it back to readable text.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my encoded Base64 have padding with = signs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Base64 works in chunks of 3 bytes (24 bits → 4 characters). If the input length isn't a multiple of 3, padding characters (=) get added to fill the last chunk. Our decoder handles this automatically when you decode.",
      },
    },
    {
      "@type": "Can this decode Base64 from other languages (Arabic, Chinese, etc.)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Only if the original text was properly UTF-8 encoded before Base64 encoding. If someone skipped that step, the decoded output will be garbled. Our encoder handles UTF-8 correctly, so encoding non-English text through this tool and then decoding should work fine.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
      />
      <Base64Encoder />
    </>
  );
}