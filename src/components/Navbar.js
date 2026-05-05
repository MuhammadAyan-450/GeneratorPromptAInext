"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/pages/all-tools", label: "All Tools" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const legalLinks = [
    { href: "/privacy-policy", label: "Privacy" },
    { href: "/terms-of-service", label: "Terms" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-lg font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              GeneratorPromptAI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Divider */}
            <div className="w-px h-5 bg-gray-200 mx-2" />

            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-50 text-xs font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-gray-100 pt-2 mt-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-50 text-xs font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}