'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useSearch } from '../context/SearchContext'
import { Playfair_Display, Poppins } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function Header() {
  const [inputValue, setInputValue] = useState('')
  const { updateSearch } = useSearch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      updateSearch(inputValue.trim())
    }
  }

  return (
    <header className="relative min-h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-banner-medium.jpg"
          alt="Food background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto pt-20">
        <div className="mb-8">
          <h1 className={`${playfair.className} text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg`}>
            Your desired dish?
          </h1>
        </div>

        <div className="mb-8">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter your dish name"
              className={`${poppins.className} px-6 py-3 rounded-lg text-gray-800 w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-orange-500`}
            />
            <button 
              type="submit"
              className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              Search
            </button>
          </form>
        </div>

        <div>
          <p className={`${poppins.className} text-gray-200 text-lg drop-shadow`}>
            Search any recipe e.g: burger, pizza, sandwich, toast.
          </p>
        </div>
      </div>
    </header>
  )
}
