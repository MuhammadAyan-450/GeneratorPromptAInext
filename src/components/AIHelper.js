'use client'

import { useState } from 'react'
import { Sparkles, X, Loader } from 'lucide-react'

export default function AIHelper({ toolName, prompt }) {
  const [isOpen, setIsOpen] = useState(false)
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const askAI = async () => {
    setIsOpen(true)
    setLoading(true)
    setResponse('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              // ✅ Auto language detect — English by default
              content: `You are a helpful AI assistant for a free online tools website.
Always respond in the same language the user is writing in.
If the user writes in English → respond in English.
If the user writes in Urdu → respond in Urdu.
If the user writes in any other language → respond in that language.
Default language is English.
Keep responses short, practical and helpful. Max 150 words. Use bullet points when listing tips.`
            },
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      })

      const data = await res.json()
      setResponse(data?.content || 'No response received. Please try again.')
    } catch (error) {
      setResponse('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="my-5">

      {/* ── Animated AI Button ── */}
      {!isOpen && (
        <div className="relative inline-block">
          <span className="absolute inset-0 rounded-xl bg-indigo-400 opacity-20 animate-ping" />
          <span className="absolute inset-0 rounded-xl bg-purple-400 opacity-10 animate-pulse" />
          <button
            onClick={askAI}
            className="relative inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-medium text-sm transition-all shadow-lg hover:shadow-indigo-300 hover:scale-105 active:scale-95"
          >
            <Sparkles size={16} className="animate-pulse" />
            <span>✨ Ask AI — Free!</span>
            <span className="ml-1 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
              AI
            </span>
          </button>
        </div>
      )}

      {/* ── AI Response Panel ── */}
      {isOpen && (
        <div className="border border-indigo-200 rounded-2xl overflow-hidden shadow-lg">

          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-white animate-pulse" />
              <span className="text-white font-semibold text-sm">
                AI Assistant — {toolName}
              </span>
            </div>
            <button
              onClick={() => { setIsOpen(false); setResponse('') }}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X size={17} />
            </button>
          </div>

          {/* Body */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 min-h-[80px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-3 py-4">
                <div className="flex items-center gap-2 text-indigo-600">
                  <Loader size={18} className="animate-spin" />
                  <span className="text-sm font-medium">AI is thinking...</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {response}
                </p>
                <button
                  onClick={askAI}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                >
                  <Sparkles size={12} /> Ask Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}