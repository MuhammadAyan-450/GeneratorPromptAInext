"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Copy,
  RefreshCw,
  Calendar,
  Home,
  ChevronDown,
  Calculator,
  FileText,
  Heart,
  Briefcase,
  Clock,
} from "lucide-react";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const calculateAge = () => {
    if (!birthDate) {
      setError("Please select your date of birth");
      setResult(null);
      return;
    }

    const today = new Date();
    const birth = new Date(birthDate);

    if (birth > today) {
      setError("Birth date cannot be in the future");
      setResult(null);
      return;
    }

    setError("");

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastDayOfPrevMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0,
      ).getDate();
      days += lastDayOfPrevMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const hours = Math.floor((today - birth) / (1000 * 60 * 60));
    const minutes = Math.floor((today - birth) / (1000 * 60));

    const nextBirthday = new Date(
      today.getFullYear(),
      birth.getMonth(),
      birth.getDate(),
    );
    if (nextBirthday <= today)
      nextBirthday.setFullYear(today.getFullYear() + 1);
    const daysToNext = Math.ceil(
      (nextBirthday - today) / (1000 * 60 * 60 * 24),
    );

    const birthDay = birth.toLocaleDateString("en-US", { weekday: "long" });
    const zodiac = getZodiac(birth.getMonth() + 1, birth.getDate());

    setResult({
      years,
      months,
      days,
      totalDays,
      weeks,
      hours,
      minutes,
      daysToNextBirthday: daysToNext,
      birthDay,
      zodiac,
    });
  };

  const getZodiac = (month, day) => {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
      return "Aries ♈";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
      return "Taurus ♉";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
      return "Gemini ♊";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
      return "Cancer ♋";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
      return "Leo ♌";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
      return "Virgo ♍";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
      return "Libra ♎";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
      return "Scorpio ♏";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
      return "Sagittarius ♐";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
      return "Capricorn ♑";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
      return "Aquarius ♒";
    return "Pisces ♓";
  };

  const copyResult = () => {
    if (!result) return;
    const text =
      `Age: ${result.years} years, ${result.months} months, ${result.days} days\n` +
      `Total days lived: ${result.totalDays.toLocaleString()}\n` +
      `Weeks: ${result.weeks.toLocaleString()}\n` +
      `Hours: ${result.hours.toLocaleString()}\n` +
      `Next birthday in: ${result.daysToNextBirthday} days`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setBirthDate("");
    setResult(null);
    setError("");
    setCopied(false);
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
                Age Calculator
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 pb-20">
        {/* Hero */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-100 mb-4">
            <Calendar className="text-sky-600" size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Age Calculator
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Need to know your exact age down to the day? Or maybe you&apos;re
            excited to see how many hours you&apos;ve been alive. Either way,
            punch in your birthday and get the full breakdown — years, months,
            days, and a countdown to your next one.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Date of Birth
          </label>

          <div className="flex flex-col sm:flex-row gap-3 mb-2">
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-800"
            />
            <button
              onClick={calculateAge}
              className="bg-sky-600 hover:bg-sky-700 active:scale-95 transition-all text-white font-semibold px-8 py-3 rounded-xl"
            >
              Calculate Age
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Result */}
          {result && (
            <div className="mt-8">
              {/* Main Age Display */}
              <div className="text-center py-8 bg-sky-50 rounded-2xl mb-6">
                <p className="text-sm font-medium text-sky-500 uppercase tracking-widest mb-1">
                  Your Exact Age
                </p>
                <h2 className="text-6xl font-bold text-sky-600 mb-2">
                  {result.years}
                  <span className="text-2xl font-medium text-sky-400 ml-2">
                    years
                  </span>
                </h2>
                <p className="text-gray-500 text-lg">
                  {result.months} months &amp; {result.days} days
                </p>
                <div className="mt-3 flex justify-center gap-4 text-sm text-gray-400">
                  <span>
                    Born on a{" "}
                    <strong className="text-gray-600">{result.birthDay}</strong>
                  </span>
                  <span>·</span>
                  <span>
                    <strong className="text-gray-600">{result.zodiac}</strong>
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    label: "Total Days Lived",
                    value: result.totalDays.toLocaleString(),
                    icon: "📅",
                  },
                  {
                    label: "Total Weeks",
                    value: result.weeks.toLocaleString(),
                    icon: "🗓️",
                  },
                  {
                    label: "Total Hours",
                    value: result.hours.toLocaleString(),
                    icon: "🕐",
                  },
                  {
                    label: "Total Minutes",
                    value: result.minutes.toLocaleString(),
                    icon: "⏱️",
                  },
                  {
                    label: "Next Birthday In",
                    value: `${result.daysToNextBirthday} days`,
                    icon: "🎂",
                  },
                  { label: "Zodiac Sign", value: result.zodiac, icon: "⭐" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <p className="text-lg font-bold text-gray-800">
                      {item.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={copyResult}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
                >
                  <Copy size={15} />
                  {copied ? "Copied!" : "Copy Result"}
                </button>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
                >
                  <RefreshCw size={15} />
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ─── How to Use ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Work With the Age Calculator?
          </h2>

          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Select your Date of Birth",
                desc: "Select your Date of Birth from the calendar that pops up upon clicking on the input field. Any future dates will be restricted from selection.",
              },
              {
                step: "2",
                title: "Tap on the Calculate Age button",
                desc: "Pressing the Calculate Age button will display your age immediately without requiring any additional steps.",
              },
              {
                step: "3",
                title: "Read your complete Age data",
                desc: "You will get an exact calculation of your age in terms of years, months, and Days, along with additional information such as the total number of weeks, hours, and minutes since birth, zodiac sign, and countdown timer until your next birthday.",
              },
              {
                step: "4",
                title: "Copy results at any time",
                desc: "Click the copy button to grab your age details in plain text. It’s handy for messages, forms, documents, or quick sharing.",
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
            How Our Age Calculation Actually Works
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            It seems simple — subtract birth year from current year. But months
            and days make it tricky. Here&apos;s the logic this calculator uses.
          </p>

          <div className="space-y-5">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Step 1: Calculate Raw Year Difference
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                rawYears = currentYear - birthYear
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Example: If today is 2025 and you were born in 1990, rawYears =
                35. But this isn't your final answer — we still need to check
                months and days.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Step 2: Adjust for Months
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                monthDiff = currentMonth - birthMonth
                <br />
                if (monthDiff &lt; 0) then years-- and monthDiff += 12
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                If your birth month hasn't happened yet this year, subtract 1
                from years and add 12 to months. Born in August, it's currently
                May? That means you haven't hit your birthday yet this year.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Step 3: Adjust for Days
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                dayDiff = currentDay - birthDay
                <br />
                if (dayDiff &lt; 0) then months-- and dayDiff +=
                daysInPreviousMonth
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Same logic. If today is the 10th and you were born on the 25th,
                your birthday hasn't happened this month. So we borrow days from
                the previous month (28, 29, 30, or 31 depending on which month
                it is).
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                Step 4: Total Days, Hours, Minutes
              </h3>
              <div className="bg-gray-900 text-green-400 font-mono text-sm px-4 py-3 rounded-xl mb-3 overflow-x-auto">
                totalDays = (today - birthDate) / (1000 × 60 × 60 × 24)
                <br />
                totalHours = totalDays × 24
                <br />
                totalMinutes = totalHours × 60
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                This part is straightforward — just convert the millisecond
                difference between the two dates into whatever unit you want.
                JavaScript handles leap years automatically in this calculation.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Real Examples ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Age Calculation Examples
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Walk through these to see exactly how the calculator handles
            different scenarios — including edge cases like leap years and month
            boundaries.
          </p>

          <div className="space-y-5">
            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                  Example 1
                </span>
                <h3 className="font-bold text-gray-900 text-sm">
                  Standard Case — Born January 15, 1990
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    Birth Date
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    Jan 15, 1990
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    Today
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    Jul 10, 2025
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    Result
                  </p>
                  <p className="text-sm font-bold text-green-700">
                    35 years, 5 months, 25 days
                  </p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <p className="text-xs text-gray-500">
                  Total days:{" "}
                  <span className="font-bold text-green-700">12,973</span>
                  &nbsp;|&nbsp; Weeks:{" "}
                  <span className="font-bold text-green-700">1,853</span>
                  &nbsp;|&nbsp; Hours:{" "}
                  <span className="font-bold text-green-700">311,352</span>
                  &nbsp;|&nbsp; Born on a{" "}
                  <span className="font-bold text-green-700">Monday</span>
                  &nbsp;|&nbsp;{" "}
                  <span className="font-bold text-green-700">Capricorn ♑</span>
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                  Example 2
                </span>
                <h3 className="font-bold text-gray-900 text-sm">
                  Leap Year Baby — Born February 29, 2000
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    Birth Date
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    Feb 29, 2000
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    Today
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    Jul 10, 2025
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    Result
                  </p>
                  <p className="text-sm font-bold text-green-700">
                    25 years, 4 months, 11 days
                  </p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <p className="text-xs text-gray-500">
                  Total days:{" "}
                  <span className="font-bold text-green-700">9,270</span>
                  &nbsp;|&nbsp; Leap years lived through:{" "}
                  <span className="font-bold text-green-700">6</span> (2000,
                  2004, 2008, 2012, 2016, 2020, 2024) &nbsp;|&nbsp; Born on a{" "}
                  <span className="font-bold text-green-700">Tuesday</span>
                  &nbsp;|&nbsp;{" "}
                  <span className="font-bold text-green-700">Pisces ♓</span>
                </p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm bg-sky-100 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                  Example 3
                </span>
                <h3 className="font-bold text-gray-900 text-sm">
                  Month Boundary Edge Case — Born December 28, 2010
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    Birth Date
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    Dec 28, 2010
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    Today
                  </p>
                  <p className="text-sm font-bold text-gray-900">Jan 5, 2025</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[11px] text-gray-400 uppercase font-bold">
                    Result
                  </p>
                  <p className="text-sm font-bold text-green-700">
                    14 years, 0 months, 8 days
                  </p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <p className="text-xs text-gray-500">
                  Notice: Even though we crossed into a new year, the birthday
                  (Dec 28) already passed, so it counts as 14 full years. Days =
                  5 (Jan) + 3 (borrowed from Dec's 31 days) ={" "}
                  <span className="font-bold text-green-700">8 days</span>
                  &nbsp;|&nbsp; Total days:{" "}
                  <span className="font-bold text-green-700">5,120</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Who Actually Needs an Age Calculator?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Not just out of interest. Let's take a look at the reasons why you
            might want to calculate your age accurately.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <FileText size={20} className="text-sky-600" />,
                title: "Government Applications & Documentation",
                desc: "Passport renewals, visa applications, and even retirement documentation may require you to provide your age in years and months, not simply your year of birth. Failure to do so may lead to delayed applications.",
              },
              {
                icon: <Heart size={20} className="text-red-500" />,
                title: "Medical Information",
                desc: "Growth charts, immunization records, and certain health check-ups will require that you specify your age down to the month. You wouldn't say you're two when you're really 23 months or even 27 months old.",
              },
              {
                icon: <Briefcase size={20} className="text-amber-600" />,
                title: "Age Requirements for Employment",
                desc: "There is a minimum age requirement for certain professions and a maximum age for retirement, among other age-specific policies. For example, 18+ and 65+ age groups will have different pensions and other benefits.",
              },
              {
                icon: <Clock size={20} className="text-violet-600" />,
                title: "Legal Age Verification",
                desc: "Driving permits, alcohol purchases, marriage consent laws — these all have specific age cutoffs. If you're close to the line, you need to know exactly how many days you have.",
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
            Why Basic Subtraction Is Not Sufficient For Determining Age
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Calculating your age may be as simple as "current year minus birth
            year," but this is only applicable if your birthday has occurred in
            the current year. If your birthday happens to be in November, and
            it's currently only March, then your age will be one year off.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            This difficulty is also encountered while counting days. In case you
            were born on the 25th day of the month, and today is the 10th, then
            it is impossible to calculate 10 – 25 = -15 days. It will require
            some "loaning" of days to be taken from the previous month, which
            may contain 28, 29, 30 or 31 days.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            This is the reason why most people tend to make errors in
            calculating their age either by a few days or even a month due to
            some exceptions in the number of days in certain months or in a year
            itself. The application does it all for you as the date object in
            JavaScript has everything sorted out.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-8">
            February 29 Babies and Leap Year Birthdays
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            If you happen to be born on February 29, you will really have a
            proper birthday once every four years, since there isn't a February
            29 on any other day but leap years. But when it comes to legalities
            and figuring out how old you are, you are considered to be born on
            March 1st.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Did you know that for people born on February 29th, 2000, they have
            only celebrated their birthday seven times until now? But they are
            not 7 years old; they would still be considered to be 25 years old.
          </p>
          <p className="text-gray-600 leading-relaxed">
            If you need to convert between time zones after calculating your age
            (maybe you were born at 11 PM in one timezone but it was already the
            next day in another), check out our{" "}
            <Link
              href="/tools/time-zone-converter"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              Time Zone Converter
            </Link>
            . And if you&apos;re calculating ages for a group or event and need
            to figure out percentages (like &quot;what percentage of attendees
            are under 18?&quot;), our{" "}
            <Link
              href="/tools/percentage-calculator"
              className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              Percentage Calculator
            </Link>{" "}
            can help with that math.
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
                q: "How do I calculate my current age in years, months, and days?",
                a: "Enter your date of birth in the calculator above and click 'Calculate Age'. The tool handles all the edge cases — month boundaries, leap years, varying month lengths — so you get a precise result without doing any math yourself. The calculation happens instantly in your browser.",
              },
              {
                q: "How many days old am I?",
                a: "Just enter your birth date and the calculator will show your total days lived right in the results grid. For example, if you're 30 years old, you've lived roughly 10,950 to 10,958 days depending on how many leap years fell in that period.",
              },
              {
                q: "How do I find out how many days until my next birthday?",
                a: "The calculator does this automatically. After you enter your birth date and hit calculate, look for the 'Next Birthday In' card in the results — it shows the exact number of days until your next birthday based on today's date.",
              },
              {
                q: "Does this calculator handle leap years correctly?",
                a: "Yes. It uses JavaScript's native Date object, which correctly accounts for leap years (years divisible by 4, except century years not divisible by 400). So February 29 birthdays and age calculations spanning leap years are all accurate.",
              },
              {
                q: "What if I was born on February 29?",
                a: "Your age is calculated normally — you don't stay the same age for 4 years. In non-leap years, the calculator treats your birthday as having passed on March 1 for age calculation purposes. Your total days lived will still be correct.",
              },
              {
                q: "Is my date of birth stored or sent anywhere?",
                a: "No. The entire calculation runs in your browser using JavaScript. Your birth date never leaves your device — it's not sent to a server, not stored in a database, not logged anywhere. Check your browser's network tab if you want to verify; there are zero outbound requests.",
              },
              {
                q: "Why does my age show different days than I expected?",
                a: "This usually happens when your birthday is near a month boundary. For example, if you were born on the 30th and the current month only has 28 or 29 days, the calculator has to 'borrow' days from the previous month. The result is mathematically correct even if it looks surprising at first.",
              },
              {
                q: "Can I use this to calculate someone else's age?",
                a: "Absolutely. There's no verification or login — just enter any date of birth and you'll get the age as of today. It works for anyone: your kids, your parents, historical figures, fictional characters, whatever you need.",
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
            Related Calculators You Might Need
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/percentage-calculator",
                title: "Percentage Calculator",
                desc: "Calculate percentage increase, decrease, and difference instantly.",
              },
              {
                href: "/tools/time-zone-converter",
                title: "Time Zone Converter",
                desc: "Convert time between cities and global time zones accurately.",
              },
              {
                href: "/tools/unix-timestamp",
                title: "Unix Timestamp Converter",
                desc: "Convert Unix timestamps to human-readable dates and vice versa.",
              },
              {
                href: "/tools/currency-converter",
                title: "Currency Converter",
                desc: "Convert between 170+ currencies with real-time exchange rates.",
              },
              {
                href: "/tools/cpm-calculator",
                title: "CPM Calculator",
                desc: "Calculate cost per 1,000 impressions for ad campaigns.",
              },
              {
                href: "/tools/ebay-charges-calculator",
                title: "eBay Charges Calculator",
                desc: "Calculate eBay fees, final value fee, and net profit on sales.",
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

export default AgeCalculator;
