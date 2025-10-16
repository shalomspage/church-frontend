// components/shared/ShareModal.tsx
'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  shareText?: string
  url: string
}

export default function ShareModal({ isOpen, onClose, title, shareText, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-sm mx-auto">
        <h3 className="text-lg font-semibold mb-3 sm:mb-4">Share {title}</h3>
        
        {shareText && (
          <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
            {shareText}
          </p>
        )}
        
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={url}
              readOnly
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm truncate bg-gray-50"
            />
            <button 
              onClick={handleCopy}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm sm:text-base whitespace-nowrap flex items-center gap-2 min-w-[100px] justify-center"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy
                </>
              )}
            </button>
          </div>
          
          <button 
            onClick={onClose}
            className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}