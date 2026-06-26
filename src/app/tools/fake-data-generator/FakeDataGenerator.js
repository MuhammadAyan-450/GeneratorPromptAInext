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

import ResponsiveAd from "../../../components/ResponsiveAd";

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
            Fake Data Generator — Generate Dummy & Mock Data Free Online
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Generate realistic fake data instantly — names, emails, phone
            numbers, addresses, job titles, and more. Choose Pakistani or
            International data, pick your fields, set the record count, and
            export to CSV or JSON. Free, private, no signup needed.
          </p>
        </div>

        <ResponsiveAd />

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
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700"
                  >
                    <Copy size={13} /> {copiedCsv ? "Copied!" : "Copy CSV"}
                  </button>
                  <button
                    onClick={copyAsJson}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700"
                  >
                    <Copy size={13} /> {copiedJson ? "Copied!" : "Copy JSON"}
                  </button>
                  <button
                    onClick={downloadCsv}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-medium"
                  >
                    <Download size={13} /> CSV
                  </button>
                  <button
                    onClick={downloadJson}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-xl text-sm font-medium"
                  >
                    <Download size={13} /> JSON
                  </button>
                </div>
              </div>

              {viewMode === "table" ? (
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-900 text-white">
                        <th className="px-3 py-2.5 text-left font-semibold text-xs">
                          #
                        </th>
                        {Object.keys(data[0]).map((key) => (
                          <th
                            key={key}
                            className="px-3 py-2.5 text-left font-semibold text-xs capitalize whitespace-nowrap"
                          >
                            {key}
                          </th>
                        ))}
                        <th className="px-3 py-2.5 text-left font-semibold text-xs">
                          Copy
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, i) => (
                        <tr
                          key={i}
                          className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-100 hover:bg-sky-50 transition-colors`}
                        >
                          <td className="px-3 py-2.5 text-gray-400 text-xs">
                            {i + 1}
                          </td>
                          {Object.values(row).map((val, j) => (
                            <td
                              key={j}
                              className="px-3 py-2.5 text-gray-700 whitespace-nowrap max-w-[160px] truncate"
                            >
                              {String(val)}
                            </td>
                          ))}
                          <td className="px-3 py-2.5">
                            <button
                              onClick={() => copyRow(row, i)}
                              className="text-xs text-sky-600 hover:underline whitespace-nowrap"
                            >
                              {copiedRow === i ? "Copied!" : "Copy"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <pre className="bg-gray-900 text-green-400 rounded-xl p-5 text-xs overflow-auto max-h-[500px] leading-relaxed">
                  {toJson()}
                </pre>
              )}
            </div>
          )}
        </div>

        {/* Native ad — position unchanged */}
        <script
          async="async"
          data-cfasync="false"
          src="https://pl29796844.effectivecpmnetwork.com/4c385cac6f0784aa3165d3a9e7478f20/invoke.js"
        ></script>
        <div id="container-4c385cac6f0784aa3165d3a9e7478f20"></div>

        {/* ─── What Is Fake Data ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What Is a Fake Data Generator and Why Do Developers Need One?
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            A fake data generator — also called a dummy data generator, mock
            data generator, or test data generator — is a tool that creates
            realistic-looking but completely fabricated data records. The output
            looks like real people with real contact details, but none of it
            belongs to an actual person. That's the whole point.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Developers need this because real user data is almost always
            off-limits during development. You can't populate your staging
            database with actual customer emails and phone numbers — that's a
            privacy violation and, depending on your jurisdiction, potentially a
            legal problem. You also can't always wait for real users to sign up
            before you can test your interface, your API, or your database
            queries. Fake data solves this by giving you a realistic dataset
            right now, generated in seconds.
          </p>
          <p className="text-gray-600 leading-relaxed">
            This tool generates random user data across 14 field types — names,
            usernames, emails, phone numbers, addresses, ages, job titles,
            companies, websites, passwords, and bios. You choose exactly which
            fields you need, set how many records to generate, pick Pakistani or
            International data, and export to CSV or JSON. No libraries to
            install, no account to create, and it all runs in your browser.
          </p>
        </section>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How to Generate Fake Data Online — Step by Step
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Four steps to a ready-to-use dummy dataset.
          </p>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Set the number of records",
                desc: "Enter how many fake data records you want — from 1 to 200 per batch. Need to seed a database with thousands of rows? Run multiple batches and combine the CSV files. Most API testing scenarios work well with 10–50 records.",
              },
              {
                step: "2",
                title: "Choose Pakistani or International data",
                desc: "Pakistani locale generates names, addresses, cities, and phone numbers in Pakistani format (Karachi, Lahore, +92 prefix, streets like Gulberg and DHA Phase 2). International locale generates US-style data with names, cities, and +1 phone numbers. Pick whichever matches your application's target audience.",
              },
              {
                step: "3",
                title: "Select the fields you need",
                desc: "Check the fields you want included in your dataset — name, email, phone, address, age, company, job title, username, website, password, bio, city, ZIP code, country. Uncheck anything you don't need. You can also hit Select All to include every field in one go.",
              },
              {
                step: "4",
                title: "Generate and export",
                desc: "Click Generate and your records appear instantly in a table view. Switch to JSON view if you prefer. Download the data as CSV for spreadsheets and databases, or JSON for APIs and JavaScript projects. You can also copy individual rows or the entire dataset to clipboard.",
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

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            What Can You Use Fake Data For? — Real Use Cases
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Dummy data shows up in more places than most people expect.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Database size={20} className="text-sky-600" />,
                title: "Database Seeding",
                desc: "When you're setting up a new application or staging environment, you need rows in your tables before you can test your queries, joins, or UI components. Generating 100–200 fake user records and importing them via CSV is the fastest way to get your dev database populated with realistic-looking data.",
              },
              {
                icon: <Code size={20} className="text-green-600" />,
                title: "API Testing and Mocking",
                desc: "When your API endpoints expect user objects — with names, emails, phone numbers, and addresses — you need test payloads that look realistic. Export this tool's output as JSON and paste it directly into Postman, Insomnia, or your test files. No more manually writing fake user objects by hand.",
              },
              {
                icon: <BarChart3 size={20} className="text-violet-600" />,
                title: "UI Prototyping and Demos",
                desc: "A user list with 'Test User 1', 'Test User 2' looks unfinished in a demo. Replace it with 50 rows of realistic names, job titles, and companies and your prototype suddenly looks production-ready. This is especially useful for client presentations and investor demos.",
              },
              {
                icon: <ShieldCheck size={20} className="text-amber-600" />,
                title: "Privacy-Safe Development",
                desc: "GDPR, CCPA, and similar regulations restrict what you can do with real user data in non-production environments. Fake data gives you realistic test datasets that are legally safe to use anywhere — staging, CI/CD pipelines, local development, and shared demo environments.",
              },
              {
                icon: <FileText size={20} className="text-red-500" />,
                title: "Form and Input Testing",
                desc: "Testing form validation, character limits, or special character handling? Generate a dataset with varied names, long email addresses, and international formats to check edge cases your form might not handle well with clean test data.",
              },
              {
                icon: <Users size={20} className="text-indigo-600" />,
                title: "Machine Learning and Data Analysis",
                desc: "Need a sample dataset to practice SQL queries, test a pandas script, or build a demo analytics dashboard? A CSV of 200 fake user records with names, ages, cities, and job titles is a useful starting point for data science practice and portfolio projects.",
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

        {/* ─── CSV vs JSON ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            CSV vs JSON — Which Export Format Should You Use?
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Both formats export exactly the same data — the difference is in how
            you'll use it. Here's a simple guide.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 border border-green-100 rounded-xl p-5">
              <h3 className="font-bold text-green-800 text-sm mb-3">
                Use CSV when:
              </h3>
              <ul className="space-y-2 text-xs text-green-700">
                <li>• Importing into a database (MySQL, PostgreSQL, SQLite)</li>
                <li>• Opening in Excel or Google Sheets</li>
                <li>• Loading into pandas with pd.read_csv()</li>
                <li>• Seeding a database using a CSV import script</li>
                <li>• Working with data analysis or BI tools</li>
              </ul>
            </div>
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-5">
              <h3 className="font-bold text-sky-800 text-sm mb-3">
                Use JSON when:
              </h3>
              <ul className="space-y-2 text-xs text-sky-700">
                <li>• Testing REST APIs with Postman or Insomnia</li>
                <li>• Seeding a MongoDB or Firestore database</li>
                <li>• Using as mock data in React or Next.js projects</li>
                <li>• Writing unit tests that need user object fixtures</li>
                <li>• Working with any JavaScript or Node.js project</li>
              </ul>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            If you're not sure which to pick, download both — they're generated
            from the same data and the download is instant either way.
          </p>
        </section>

        {/* ─── Pakistani vs International ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Pakistani vs International Locale — What's the Difference?
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Most fake data generators online only generate US or European data.
            This tool is one of the few that generates realistic Pakistani dummy
            data — names, cities, streets, companies, and phone numbers that
            actually look like they belong to a Pakistani user.
          </p>

          <div className="overflow-x-auto mb-5">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="text-left px-4 py-3 font-semibold">Field</th>
                  <th className="text-left px-4 py-3 font-semibold">
                    🇵🇰 Pakistani
                  </th>
                  <th className="text-left px-4 py-3 font-semibold">
                    🌍 International
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Names",
                    "Ayan Khan, Fatima Malik, Omar Hussain",
                    "James Smith, Emma Johnson, Noah Garcia",
                  ],
                  [
                    "Cities",
                    "Karachi, Lahore, Islamabad, Faisalabad",
                    "New York, London, Toronto, Sydney",
                  ],
                  [
                    "Streets",
                    "DHA Phase 2, Gulberg, Bahria Town",
                    "Oak Street, Broadway, 5th Avenue",
                  ],
                  ["Phone", "+92-3XX-XXXXXXX format", "+1-XXX-XXXXXXX format"],
                  [
                    "Companies",
                    "NetSol Technologies, Daraz, Habib Bank",
                    "Acme Corp, TechFlow Inc, Vertex Labs",
                  ],
                  ["Country", "Pakistan", "United States"],
                ].map((row, i) => (
                  <tr
                    key={i}
                    className={`${i % 2 === 1 ? "bg-gray-50" : "bg-white"} border-b border-gray-100`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {row[0]}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      {row[1]}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      {row[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            If you're building an app for a Pakistani audience — an e-commerce
            platform, a fintech app, a delivery service — the Pakistani locale
            gives you test data that actually looks like your real users. The
            international locale works for any project targeting US, UK, or
            global audiences.
          </p>
        </section>

        {/* ─── SEO Content ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Use an Online Fake Data Generator Instead of Writing Test Data
            Manually?
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Writing test data by hand gets tedious fast. If you need 50 fake
            user records for a database seed script, manually typing names,
            emails, and phone numbers for each one takes twenty minutes and the
            result still looks fake — because you used the same first name three
            times and all the emails follow the same pattern. A generator solves
            both problems: it's instant, and the output is actually varied
            enough to look realistic.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Alternatively, some developers use Python's Faker library or
            JavaScript's faker.js directly in their code. Those are great tools
            if you're comfortable writing scripts. But for quick one-off needs —
            you need 100 rows of test data right now, you don't want to set up a
            script, and you just need a CSV file — a browser-based tool is
            faster. No terminal, no package installs, no code to write.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The data generated here is random but structured. Every email is
            valid in format (but doesn't belong to a real inbox). Every phone
            number follows the right format for the selected locale. Names are
            drawn from realistic pools, not random character strings. The result
            is mock data that won't break your validation logic and looks
            realistic enough for demos and prototypes.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            Privacy — Your Data Never Leaves Your Browser
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Everything runs locally in your browser. When you click Generate,
            JavaScript creates the records on your device — no data is ever sent
            to any server. There's no logging, no tracking, and nothing is
            stored anywhere. Close the tab and the data is gone. That matters if
            you're generating data that represents sensitive business scenarios,
            even with fake values.
          </p>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Fake Data Generator — Frequently Asked Questions
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              {
                q: "What is a fake data generator?",
                a: "A fake data generator is a tool that creates realistic-looking but completely fabricated data records — names, emails, phone numbers, addresses, and more. The data is randomly generated and doesn't belong to any real person. It's used by developers and testers who need realistic datasets for development, testing, and demos without using actual user data.",
              },
              {
                q: "What's the difference between fake data, dummy data, and mock data?",
                a: "They all mean essentially the same thing in practice — artificially generated data used in place of real data. 'Fake data' is the most common casual term. 'Dummy data' is often used in the context of database seeding and placeholder content. 'Mock data' is frequently used in API testing and unit testing contexts. This tool generates all three — the terminology just depends on how you're using it.",
              },
              {
                q: "Can I use this as a random user generator?",
                a: "Yes. Enable the name, email, username, age, phone, address, and job title fields and generate as many records as you need. Each record is a distinct fake user profile with internally consistent fields — the email uses the same name as the name field, for example. This makes it suitable for user list testing, signup form testing, and user profile demos.",
              },
              {
                q: "How do I generate fake data for database seeding?",
                a: "Select the fields matching your database schema, set your record count, click Generate, and download the CSV. Import the CSV into your database using your platform's CSV import feature — MySQL Workbench, pgAdmin, TablePlus, and most database tools support this directly. For MongoDB or Firestore, download JSON instead and import that.",
              },
              {
                q: "Is the generated data good for API testing?",
                a: "Yes. Export to JSON and the output is a valid JSON array of objects — paste it directly into Postman as a request body, or use it as fixture data in your test files. Each object contains the fields you selected with realistic-looking values that will pass basic format validation.",
              },
              {
                q: "Does this generate Pakistani fake data?",
                a: "Yes — this is one of the few online fake data generators that produces realistic Pakistani data. The Pakistani locale generates names like Ayan Khan and Fatima Malik, cities like Karachi and Lahore, streets like DHA Phase 2 and Bahria Town, and phone numbers in +92-3XX-XXXXXXX format. Useful for apps targeting Pakistani users.",
              },
              {
                q: "Is the generated data private?",
                a: "Completely. The generation happens in your browser using JavaScript — no data is sent to any server. Your inputs and generated records never leave your device. There's no logging, no account, and nothing is stored anywhere. This makes it safe to use even when generating data that represents sensitive business scenarios.",
              },
              {
                q: "Can I generate fake emails with this tool?",
                a: "Yes. Enable the email field and the generator creates addresses in the format firstname.lastname###@domain.com, using domains like gmail.com, yahoo.com, outlook.com, and proton.me. The emails are valid in format but don't belong to real inboxes — perfect for form testing, UI demos, and database seeding.",
              },
              {
                q: "How many records can I generate at once?",
                a: "Up to 200 records per batch. For larger datasets, run multiple batches and combine the CSV files. Most development and testing scenarios work well within 200 records — if you need thousands of rows for performance testing, you'll get better results using a server-side tool like Faker.js or Python's Faker library.",
              },
              {
                q: "What formats can I export the data in?",
                a: "CSV and JSON. CSV is best for importing into databases, spreadsheets, and data analysis tools. JSON is best for API testing, JavaScript projects, and NoSQL databases. Both formats export the same data — just structured differently. You can also copy individual rows to clipboard directly from the table view.",
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
            Related Developer & Data Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/json-formatter",
                title: "JSON Formatter & Validator",
                desc: "Beautify, minify and validate JSON — useful after exporting fake data as JSON.",
              },
              {
                href: "/tools/markdown-to-html",
                title: "Markdown to HTML Converter",
                desc: "Convert your Markdown content into HTML for web display.",
              },
              {
                href: "/tools/xml-sitemap-generator",
                title: "XML Sitemap Generator",
                desc: "Generate sitemap.xml files for SEO — another useful developer tool.",
              },
              {
                href: "/tools/seo-meta-tags-generator",
                title: "SEO Meta Tags Generator",
                desc: "Create optimized meta titles and descriptions with live preview.",
              },
              {
                href: "/tools/word-counter",
                title: "Word Counter",
                desc: "Count words and characters — useful for testing text input fields.",
              },
              {
                href: "/tools/url-encoder",
                title: "URL Encoder",
                desc: "Encode special characters in URLs — handy for API query parameters.",
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
