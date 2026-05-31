"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Copy,
  RefreshCw,
  Table,
  Download,
  Code,
  Database,
  Home,
  ChevronDown,
  Users,
  ShieldCheck,
  Zap,
  Globe,
  CheckCircle2,
  HelpCircle,
  BarChart3,
  FileText,
} from "lucide-react";

// ─── Data pools ──────────────────────────────────────────────────────────────
const DATA = {
  pk: {
    firstNames: [
      "Ayan",
      "Sara",
      "Ali",
      "Fatima",
      "Ahmed",
      "Zara",
      "Hamza",
      "Aisha",
      "Omar",
      "Maryam",
      "Bilal",
      "Hina",
      "Usman",
      "Noor",
      "Rehan",
      "Zainab",
      "Ibrahim",
      "Laiba",
      "Raza",
      "Amna",
      "Hassan",
      "Sana",
      "Tariq",
      "Nimra",
      "Faisal",
      "Sadia",
      "Waqar",
      "Hira",
      "Kamran",
      "Iqra",
    ],
    lastNames: [
      "Khan",
      "Ahmed",
      "Malik",
      "Siddiqui",
      "Hussain",
      "Raza",
      "Shah",
      "Iqbal",
      "Baig",
      "Chaudhry",
      "Ansari",
      "Mirza",
      "Butt",
      "Qureshi",
      "Cheema",
      "Rajput",
      "Niazi",
      "Abbasi",
      "Javed",
      "Nawaz",
    ],
    cities: [
      "Karachi",
      "Lahore",
      "Islamabad",
      "Rawalpindi",
      "Faisalabad",
      "Multan",
      "Hyderabad",
      "Peshawar",
      "Quetta",
      "Sialkot",
      "Gujranwala",
      "Bahawalpur",
      "Sukkur",
      "Larkana",
      "Mardan",
    ],
    streets: [
      "Main Boulevard",
      "Shahrah-e-Faisal",
      "Gulshan-e-Iqbal",
      "Clifton",
      "DHA Phase 2",
      "Johar Town",
      "Bahria Town",
      "Model Town",
      "Gulberg",
      "PECHS",
      "North Nazimabad",
      "Saddar",
      "Blue Area",
      "F-7 Markaz",
      "G-11",
    ],
    companies: [
      "TechVentures Pvt Ltd",
      "NextGen Solutions",
      "AlphaSoft",
      "Packages Ltd",
      "Habib Bank",
      "MCB Bank",
      "Arif Habib Corp",
      "Systems Ltd",
      "NetSol Technologies",
      "TPL Corp",
      "Daraz",
      "Foodpanda Pakistan",
    ],
    jobs: [
      "Software Engineer",
      "Frontend Developer",
      "Data Analyst",
      "Product Manager",
      "UI/UX Designer",
      "DevOps Engineer",
      "QA Engineer",
      "Business Analyst",
      "Full Stack Developer",
      "Project Manager",
      "CTO",
      "Backend Developer",
    ],
    domains: [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "proton.me",
    ],
    phonePrefix: "+92",
    country: "Pakistan",
    zipRange: [10000, 99999],
  },
  intl: {
    firstNames: [
      "James",
      "Emma",
      "Liam",
      "Olivia",
      "Noah",
      "Ava",
      "William",
      "Sophia",
      "Benjamin",
      "Isabella",
      "Lucas",
      "Mia",
      "Mason",
      "Charlotte",
      "Ethan",
      "Amelia",
      "Logan",
      "Harper",
      "Jack",
      "Evelyn",
    ],
    lastNames: [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Garcia",
      "Miller",
      "Davis",
      "Rodriguez",
      "Martinez",
      "Hernandez",
      "Lopez",
      "Wilson",
      "Anderson",
      "Thomas",
      "Taylor",
      "Moore",
      "Jackson",
      "Martin",
      "Lee",
    ],
    cities: [
      "New York",
      "London",
      "Toronto",
      "Sydney",
      "Dubai",
      "Berlin",
      "Paris",
      "Tokyo",
      "Singapore",
      "Amsterdam",
      "Chicago",
      "Los Angeles",
      "Manchester",
      "Melbourne",
      "Vancouver",
    ],
    streets: [
      "Oak Street",
      "Maple Avenue",
      "Cedar Lane",
      "Park Drive",
      "Elm Street",
      "Main Street",
      "Broadway",
      "5th Avenue",
      "Sunset Boulevard",
      "Oxford Street",
      "Kingsway",
      "Victoria Road",
    ],
    companies: [
      "Acme Corp",
      "TechFlow Inc",
      "NovaSoft",
      "Bright Solutions",
      "Apex Systems",
      "Vertex Labs",
      "Quantum Inc",
      "DataBridge",
      "CloudForge",
      "Pixel Works",
      "NextWave",
      "CodeBase",
    ],
    jobs: [
      "Software Engineer",
      "Marketing Manager",
      "Sales Executive",
      "Product Designer",
      "Data Scientist",
      "DevOps Engineer",
      "Financial Analyst",
      "HR Manager",
      "Content Writer",
      "Operations Lead",
      "CTO",
      "Consultant",
    ],
    domains: [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "proton.me",
      "icloud.com",
    ],
    phonePrefix: "+1",
    country: "United States",
    zipRange: [10000, 99999],
  },
};

const BIOS = [
  "Passionate web developer • React & Next.js enthusiast",
  "Coffee lover • Code • Repeat",
  "Building modern apps one commit at a time",
  "Always learning new tech stacks",
  "Frontend developer | UI/UX lover",
  "Open source contributor • Night owl coder",
  "Exploring AI tools and prompt engineering",
  "Clean code advocate • Testing enthusiast",
  "Full stack dev • Dog lover",
  "Remote worker • Digital nomad",
];

const FIELD_CONFIG = [
  { key: "name", label: "Full Name", default: true },
  { key: "username", label: "Username", default: true },
  { key: "email", label: "Email", default: true },
  { key: "phone", label: "Phone", default: true },
  { key: "address", label: "Address", default: true },
  { key: "city", label: "City", default: false },
  { key: "zipCode", label: "ZIP Code", default: false },
  { key: "country", label: "Country", default: false },
  { key: "age", label: "Age", default: true },
  { key: "company", label: "Company", default: false },
  { key: "jobTitle", label: "Job Title", default: false },
  { key: "website", label: "Website URL", default: false },
  { key: "password", label: "Password", default: false },
  { key: "bio", label: "Bio", default: false },
];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(min + Math.random() * (max - min));

function generateRecord(fields, locale) {
  const pool = DATA[locale] || DATA.pk;
  const first = rand(pool.firstNames);
  const last = rand(pool.lastNames);
  const name = `${first} ${last}`;
  const city = rand(pool.cities);
  const entry = {};

  if (fields.name) entry.name = name;
  if (fields.username)
    entry.username = `${first.toLowerCase()}${last.toLowerCase()}${randInt(10, 999)}`;
  if (fields.email)
    entry.email = `${first.toLowerCase()}.${last.toLowerCase()}${randInt(1, 999)}@${rand(pool.domains)}`;
  if (fields.phone)
    entry.phone = `${pool.phonePrefix}${randInt(300, 399)}-${randInt(1000000, 9999999)}`;
  if (fields.address)
    entry.address = `${randInt(1, 999)} ${rand(pool.streets)}, ${city}`;
  if (fields.city) entry.city = city;
  if (fields.zipCode) entry.zipCode = String(randInt(...pool.zipRange));
  if (fields.country) entry.country = pool.country;
  if (fields.age) entry.age = randInt(18, 65);
  if (fields.company) entry.company = rand(pool.companies);
  if (fields.jobTitle) entry.jobTitle = rand(pool.jobs);
  if (fields.website)
    entry.website = `https://www.${first.toLowerCase()}${last.toLowerCase()}.com`;
  if (fields.password)
    entry.password = `${rand(["Pass", "Key", "Secure", "Safe", "My"])}${randInt(1000, 9999)}${rand(["!", "@", "#", "$"])}`;
  if (fields.bio) entry.bio = rand(BIOS);

  return entry;
}

const FakeDataGenerator = () => {
  const defaultFields = Object.fromEntries(
    FIELD_CONFIG.map((f) => [f.key, f.default]),
  );

  const [numRecords, setNumRecords] = useState(10);
  const [fields, setFields] = useState(defaultFields);
  const [locale, setLocale] = useState("pk");
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const [copiedCsv, setCopiedCsv] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedRow, setCopiedRow] = useState(-1);
  const [openFaq, setOpenFaq] = useState(null);

  const toCsv = () => {
    if (!data.length) return "";
    const headers = Object.keys(data[0]).join(",");
    const rows = data
      .map((row) =>
        Object.values(row)
          .map((v) => `"${v}"`)
          .join(","),
      )
      .join("\n");
    return headers + "\n" + rows;
  };

  const toJson = () => JSON.stringify(data, null, 2);

  const generateData = () => {
    const activeFields = Object.fromEntries(
      Object.entries(fields).filter(([, v]) => v),
    );
    if (Object.keys(activeFields).length === 0) return;
    const newData = Array.from({ length: numRecords }, () =>
      generateRecord(activeFields, locale),
    );
    setData(newData);
    setViewMode("table");
  };

  const copyAsCsv = () => {
    navigator.clipboard.writeText(toCsv());
    setCopiedCsv(true);
    setTimeout(() => setCopiedCsv(false), 2000);
  };

  const copyAsJson = () => {
    navigator.clipboard.writeText(toJson());
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const downloadCsv = () => {
    const blob = new Blob([toCsv()], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fake-data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadJson = () => {
    const blob = new Blob([toJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fake-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyRow = (row, index) => {
    navigator.clipboard.writeText(JSON.stringify(row, null, 2));
    setCopiedRow(index);
    setTimeout(() => setCopiedRow(-1), 2000);
  };

  const selectAll = () =>
    setFields(Object.fromEntries(FIELD_CONFIG.map((f) => [f.key, true])));
  const deselectAll = () =>
    setFields(Object.fromEntries(FIELD_CONFIG.map((f) => [f.key, false])));

  const reset = () => {
    setData([]);
    setFields(defaultFields);
    setNumRecords(10);
    setLocale("pk");
    setViewMode("table");
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
                Fake Data Generator
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <Database className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Fake Data Generator
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Generate realistic dummy data with Pakistani or International names,
            addresses, and phone numbers. Perfect for database seeding, API
            testing, and demo accounts. Export to CSV or JSON instantly.
          </p>
        </div>

        {/* Tool Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Records
              </label>
              <input
                type="number"
                value={numRecords}
                onChange={(e) =>
                  setNumRecords(
                    Math.max(1, Math.min(200, parseInt(e.target.value) || 10)),
                  )
                }
                min="1"
                max="200"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-lg font-medium"
              />
              <p className="text-xs text-gray-400 mt-1">
                Max 200 records per batch
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Data Locale
              </label>
              <div className="flex gap-2">
                {[
                  { value: "pk", label: "🇵🇰 Pakistani" },
                  { value: "intl", label: "🌍 International" },
                ].map((l) => (
                  <button
                    key={l.value}
                    onClick={() => setLocale(l.value)}
                    className={`flex-1 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      locale === l.value
                        ? "bg-sky-600 text-white border-sky-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-sky-400"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Fields Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-700">
                Fields to Include
              </label>
              <div className="flex gap-3 text-xs">
                <button
                  onClick={selectAll}
                  className="text-sky-600 hover:underline"
                >
                  Select All
                </button>
                <button
                  onClick={deselectAll}
                  className="text-gray-400 hover:underline"
                >
                  Deselect All
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {FIELD_CONFIG.map((f) => (
                <label
                  key={f.key}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition-all select-none text-sm ${
                    fields[f.key]
                      ? "bg-sky-50 border-sky-400 text-sky-700 font-medium"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={fields[f.key]}
                    onChange={(e) =>
                      setFields({ ...fields, [f.key]: e.target.checked })
                    }
                    className="hidden"
                  />
                  <span
                    className={`w-3 h-3 rounded flex-shrink-0 border-2 ${fields[f.key] ? "bg-sky-600 border-sky-600" : "border-gray-300"}`}
                  />
                  {f.label}
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={generateData}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <Zap size={18} /> Generate {numRecords} Records
            </button>
            <button
              onClick={reset}
              className="bg-white border-2 border-sky-100 text-sky-700 hover:bg-sky-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Clear All
            </button>
          </div>

          {/* Results Section */}
          {data.length > 0 && (
            <div className="mt-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                  <div className="flex justify-center text-sky-500 mb-1">
                    <Database size={20} />
                  </div>
                  <p className="text-lg font-bold text-gray-800">
                    {data.length}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Records</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                  <div className="flex justify-center text-sky-500 mb-1">
                    <Users size={20} />
                  </div>
                  <p className="text-lg font-bold text-gray-800">
                    {Object.keys(data[0]).length}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Fields</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                  <div className="flex justify-center text-sky-500 mb-1">
                    <Globe size={20} />
                  </div>
                  <p className="text-lg font-bold text-gray-800">
                    {locale === "pk" ? "PK" : "INTL"}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Locale</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                  <div className="flex justify-center text-sky-500 mb-1">
                    <BarChart3 size={20} />
                  </div>
                  <p className="text-lg font-bold text-gray-800">
                    {toCsv().split("\n").length - 1}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">CSV Rows</p>
                </div>
              </div>

              {/* View Toggle & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700">
                    Output
                  </span>
                  <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm">
                    <button
                      onClick={() => setViewMode("table")}
                      className={`px-3 py-1.5 flex items-center gap-1 transition-colors ${viewMode === "table" ? "bg-sky-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                      <Table size={13} /> Table
                    </button>
                    <button
                      onClick={() => setViewMode("json")}
                      className={`px-3 py-1.5 flex items-center gap-1 transition-colors ${viewMode === "json" ? "bg-sky-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                      <Code size={13} /> JSON
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={copyAsCsv}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
                  >
                    <Copy size={13} /> {copiedCsv ? "Copied!" : "Copy CSV"}
                  </button>
                  <button
                    onClick={copyAsJson}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
                  >
                    <Copy size={13} /> {copiedJson ? "Copied!" : "Copy JSON"}
                  </button>
                  <button
                    onClick={downloadCsv}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    <Download size={13} /> CSV
                  </button>
                  <button
                    onClick={downloadJson}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    <Download size={13} /> JSON
                  </button>
                </div>
              </div>

              {/* Table View */}
              {viewMode === "table" && (
                <div className="overflow-x-auto border border-gray-200 rounded-xl">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-semibold text-gray-400 uppercase w-8">
                          #
                        </th>
                        {Object.keys(data[0]).map((key) => (
                          <th
                            key={key}
                            className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
                          >
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </th>
                        ))}
                        <th className="px-3 py-3 text-xs font-semibold text-gray-400 uppercase">
                          Copy
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {data.map((row, index) => (
                        <tr
                          key={index}
                          className="hover:bg-sky-50 transition-colors"
                        >
                          <td className="px-3 py-3 text-gray-400 text-xs">
                            {index + 1}
                          </td>
                          {Object.values(row).map((val, i) => (
                            <td
                              key={i}
                              className="px-4 py-3 text-gray-800 whitespace-nowrap"
                            >
                              {val}
                            </td>
                          ))}
                          <td className="px-3 py-3 text-center">
                            <button
                              onClick={() => copyRow(row, index)}
                              className="text-gray-400 hover:text-sky-600 transition-colors"
                              title="Copy row as JSON"
                            >
                              {copiedRow === index ? (
                                <span className="text-xs text-green-600 font-bold">
                                  Done
                                </span>
                              ) : (
                                <Copy size={13} />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* JSON View */}
              {viewMode === "json" && (
                <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto max-h-96">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-semibold">
                    JSON Output
                  </p>
                  <pre className="text-sm font-mono leading-relaxed">
                    {toJson()
                      .split(/"([^"]+)":/)
                      .map((part, i) => {
                        if (i % 2 === 1)
                          return (
                            <span key={i} className="text-sky-400">
                              {part}
                            </span>
                          );
                        if (part.startsWith('"') && part.endsWith('"'))
                          return (
                            <span key={i} className="text-green-400">
                              {part}
                            </span>
                          );
                        return (
                          <span key={i} className="text-gray-300">
                            {part}
                          </span>
                        );
                      })}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!data.length && (
            <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl mt-4">
              <Database size={32} className="mx-auto mb-3 text-gray-300" />
              <p>
                Click{" "}
                <strong className="text-gray-500">Generate Records</strong> to
                create your fake dataset
              </p>
            </div>
          )}
        </div>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Generate Dummy Data
          </h2>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Select Locale & Count",
                desc: "Choose Pakistani or International locale. Set the number of records (up to 200).",
              },
              {
                step: "2",
                title: "Pick Fields",
                desc: "Select which data points you need: Name, Email, Phone, Address, Company, etc.",
              },
              {
                step: "3",
                title: "Generate & Export",
                desc: "Click Generate. View in Table or JSON mode. Download as CSV/JSON or copy to clipboard.",
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

        {/* ─── Formulas / How It Works ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How Fake Data Generation Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            It combines random pools of realistic data. Here's the logic.
          </p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Random Pool Selection
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                const name = rand(firstNames) + " " + rand(lastNames);
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Selects random first and last names from curated lists specific
                to the chosen locale (PK or Intl).
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Pattern-Based Construction
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                {"email = `${first}.${last}${randInt}@${domain}`;"}
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Constructs emails, phones, and addresses using realistic
                patterns (e.g., +92 for Pakistan, DHA for Karachi).
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
              <h3 className="font-bold text-sky-900 text-sm mb-2">
                Privacy Note
              </h3>
              <p className="text-sky-800 text-xs leading-relaxed">
                All data is randomly generated. No real personal information is
                used. Everything happens locally in your browser.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Real Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sample Generated Data
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            See what realistic Pakistani vs International data looks like.
          </p>

          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-lg">
                  Pakistani Locale
                </span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <pre className="font-mono text-sm text-gray-800">
                  {`{
  "name": "Ayan Khan",
  "email": "ayan.khan42@gmail.com",
  "phone": "+92300-1234567",
  "address": "123 Shahrah-e-Faisal, Karachi",
  "company": "Systems Ltd",
  "jobTitle": "Software Engineer"
}`}
                </pre>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded-lg">
                  International Locale
                </span>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <pre className="font-mono text-sm text-gray-800">
                  {`{
  "name": "James Smith",
  "email": "james.smith88@yahoo.com",
  "phone": "+1300-9876543",
  "address": "456 Oak Street, New York",
  "company": "Acme Corp",
  "jobTitle": "Product Manager"
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Uses Fake Data Generators?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Not just developers. Here's where dummy data matters.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Code size={20} className="text-sky-600" />,
                title: "Developers",
                desc: "Seed databases for local development and testing without using real customer data.",
              },
              {
                icon: <BarChart3 size={20} className="text-green-600" />,
                title: "QA Testers",
                desc: "Create diverse test cases with different locales, ages, and formats to find edge cases.",
              },
              {
                icon: <Zap size={20} className="text-violet-600" />,
                title: "Designers",
                desc: "Fill UI mockups with realistic names and addresses instead of 'Lorem Ipsum'.",
              },
              {
                icon: <HelpCircle size={20} className="text-amber-600" />,
                title: "Students",
                desc: "Practice SQL queries and data analysis on safe, dummy datasets.",
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
            Why Realistic Dummy Data Matters
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Most fake data generators only provide Western-style names and
            addresses. If you are building apps for the Pakistani market, using
            data like “John Smith” from “New York” is not realistic. This tool
            solves that problem by offering a dedicated{" "}
            <strong>Pakistani locale</strong> with authentic names such as Ahmed
            Khan, Fatima Siddiqui, and cities like Karachi, Lahore, and
            Islamabad.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Each record includes properly formatted Pakistani phone numbers with
            the{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
              +92
            </code>{" "}
            prefix, local addresses like DHA Phase 2 and Gulshan-e-Iqbal, and
            familiar company names. You can also switch to the international
            locale for US, UK, and global datasets.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Whether you're seeding a MongoDB database, testing an API endpoint,
            or filling a design prototype, having realistic data helps you catch
            bugs that generic Lorem Ipsum text would miss.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Privacy Note
          </h3>
          <p className="text-gray-600 leading-relaxed">
            This tool runs 100% in your browser. No data is sent to any server.
            All generated data is random and does not belong to any real person.
            Close the tab and it's gone. That's how it should be.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Need to format JSON output? Try the{" "}
            <Link
              href="/tools/json-formatter"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              JSON Formatter
            </Link>
            . Generating placeholder text? The{" "}
            <Link
              href="/tools/lorem-ipsum-generator"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              Lorem Ipsum Generator
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
                q: "How to generate fake Pakistani names and addresses for testing?",
                a: "Select the Pakistani locale, choose the fields you need (name, email, phone, address, etc.), set the number of records, and click Generate. The tool creates realistic Pakistani names, Karachi/Lahore/Islamabad addresses, and +92 phone numbers instantly.",
              },
              {
                q: "Can I download fake test data as CSV or JSON file?",
                a: "Yes. After generating data, click the Download CSV or Download JSON button to save the file directly. You can also copy the data to your clipboard in either format.",
              },
              {
                q: "How to create dummy data for database seeding?",
                a: "Select all the fields that match your database schema, generate the records, and download as JSON. You can use the JSON output directly in your seed scripts for MongoDB, PostgreSQL, or any other database.",
              },
              {
                q: "Is the generated data safe to use for testing?",
                a: "Yes, completely safe. All data is randomly generated and does not belong to any real person. No real personal information is used or stored.",
              },
              {
                q: "How many fake records can I generate at once?",
                a: "You can generate up to 200 records per batch. For larger datasets, generate multiple batches and combine the downloaded CSV or JSON files.",
              },
              {
                q: "Does this tool work offline or need an internet connection?",
                a: "The data generation runs entirely in your browser using JavaScript. Once the page is loaded, you can generate data even if your internet connection drops. No data is sent to any server.",
              },
              {
                q: "Can I customize the phone number format?",
                a: "Currently, the tool uses standard formats: +92 for Pakistan and +1 for International. Custom format support is planned for future updates.",
              },
              {
                q: "Are the passwords generated secure?",
                a: "The generated passwords are for testing purposes only. They follow a simple pattern (Word+Number+Symbol) and should NOT be used for real accounts. Always use strong, random passwords for production systems.",
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

        {/* ─── Related Tools (Short Descriptions) ─── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related Developer & Data Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/json-formatter",
                title: "JSON Formatter",
                desc: "Beautify JSON code.",
              },
              {
                href: "/tools/lorem-ipsum-generator",
                title: "Lorem Ipsum Generator",
                desc: "Generate placeholder text.",
              },
              {
                href: "/tools/csv-to-json",
                title: "CSV to JSON",
                desc: "Convert spreadsheet data.",
              },
              {
                href: "/tools/word-counter",
                title: "Word Counter",
                desc: "Count words & chars.",
              },
              {
                href: "/tools/case-converter",
                title: "Case Converter",
                desc: "Change text case.",
              },
              {
                href: "/tools/base64-encode",
                title: "Base64 Encoder",
                desc: "Encode text safely.",
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

export default FakeDataGenerator;
