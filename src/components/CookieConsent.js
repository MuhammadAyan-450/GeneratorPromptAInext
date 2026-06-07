"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");

    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          We use cookies to improve your experience, analyze site traffic, and
          support website functionality. By clicking "Accept", you consent to
          our use of cookies. Read our Privacy Policy for more information.
        </p>

        <div className="flex gap-2">
          <button
            onClick={declineCookies}
            className="px-4 py-2 rounded-lg border border-gray-500 hover:bg-gray-700"
          >
            Decline
          </button>

          <button
            onClick={acceptCookies}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
